import { Response } from 'express';
import slugify from 'slugify';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { generateSitemap } from '../utils/sitemap';

// Get all published portfolios (public)
export const getAllPortfolios = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const portfolios = await prisma.portfolio.findMany({
            where: { published: true },
            orderBy: [
                { featured: 'desc' },
                { order: 'asc' },
                { createdAt: 'desc' },
            ],
        });

        res.json({
            status: 'success',
            data: portfolios,
        });
    } catch (error) {
        console.error('Get portfolios error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// Get all portfolios including drafts (admin only)
export const getAllPortfoliosAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const portfolios = await prisma.portfolio.findMany({
            orderBy: [
                { featured: 'desc' },
                { order: 'asc' },
                { createdAt: 'desc' },
            ],
        });

        res.json({
            status: 'success',
            data: portfolios,
        });
    } catch (error) {
        console.error('Get all portfolios error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// Get single portfolio by id or slug (public)
export const getPortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { slug } = req.params; // We keep the param name 'slug' from routes, but treat it as identifier

        let portfolio = await prisma.portfolio.findFirst({
            where: {
                OR: [
                    { id: slug },
                    { slug: slug }
                ]
            }
        });

        if (!portfolio) {
            res.status(404).json({
                status: 'error',
                message: 'Portfolio not found',
            });
            return;
        }

        // Only show published portfolios to non-admin users
        if (!portfolio.published && req.user?.role !== 'admin') {
            res.status(404).json({
                status: 'error',
                message: 'Portfolio not found',
            });
            return;
        }

        // Check and generate AI summary if missing
        if (!portfolio.summary && portfolio.description) {
            try {
                // Import AI service dynamically to avoid circular dependencies or initialization issues if any
                const { aiService } = await import('../services/ai.service');
                const generatedSummary = await aiService.generateSummary(portfolio.description);

                if (generatedSummary) {
                    // Save to DB
                    portfolio = await prisma.portfolio.update({
                        where: { id: portfolio.id },
                        data: { summary: generatedSummary }
                    });
                }
            } catch (aiError) {
                console.error("Failed to auto-generate summary:", aiError);
                // Continue without summary, don't block the response
            }
        }

        res.json({
            status: 'success',
            data: portfolio,
        });
    } catch (error) {
        console.error('Get portfolio error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// Create portfolio (admin only)
export const createPortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const {
            title,
            description,
            category,
            client,
            completionDate,
            technologies,
            imageUrls,
            projectUrl,
            githubUrl,
            published,
            featured,
            order,
        } = req.body;

        // Validate required fields
        if (!title || !description || !category) {
            res.status(400).json({
                status: 'error',
                message: 'Title, description, and category are required',
            });
            return;
        }

        // Generate slug from title
        const slug = slugify(title, { lower: true, strict: true });

        // Check if slug already exists
        const existing = await prisma.portfolio.findUnique({
            where: { slug },
        });

        if (existing) {
            res.status(400).json({
                status: 'error',
                message: 'A portfolio with this title already exists',
            });
            return;
        }

        const portfolio = await prisma.portfolio.create({
            data: {
                slug,
                title,
                description,
                category,
                client: client || null,
                completionDate: completionDate ? new Date(completionDate) : null,
                technologies: technologies || [],
                imageUrls: imageUrls || [],
                projectUrl,
                githubUrl,
                published: published !== undefined ? published : true,
                featured: featured || false,
                order: order || 0,
            },
        });

        res.status(201).json({
            status: 'success',
            data: portfolio,
        });

        // Regenerate sitemap
        generateSitemap();
    } catch (error) {
        console.error('Create portfolio error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// Update portfolio (admin only)
export const updatePortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            category,
            client,
            completionDate,
            technologies,
            imageUrls,
            projectUrl,
            githubUrl,
            published,
            featured,
            order,
        } = req.body;

        // Check if portfolio exists
        const existing = await prisma.portfolio.findUnique({
            where: { id },
        });

        if (!existing) {
            res.status(404).json({
                status: 'error',
                message: 'Portfolio not found',
            });
            return;
        }

        // Generate new slug if title changed
        let slug = existing.slug;
        if (title && title !== existing.title) {
            slug = slugify(title, { lower: true, strict: true });

            // Check if new slug already exists
            const slugExists = await prisma.portfolio.findUnique({
                where: { slug },
            });

            if (slugExists && slugExists.id !== id) {
                res.status(400).json({
                    status: 'error',
                    message: 'A portfolio with this title already exists',
                });
                return;
            }
        }

        const portfolio = await prisma.portfolio.update({
            where: { id },
            data: {
                slug,
                title: title || existing.title,
                description: description || existing.description,
                category: category || existing.category,
                client: client !== undefined ? client : existing.client,
                completionDate: completionDate !== undefined ? (completionDate ? new Date(completionDate) : null) : existing.completionDate,
                technologies: technologies !== undefined ? technologies : existing.technologies,
                imageUrls: imageUrls !== undefined ? imageUrls : existing.imageUrls,
                projectUrl: projectUrl !== undefined ? projectUrl : existing.projectUrl,
                githubUrl: githubUrl !== undefined ? githubUrl : existing.githubUrl,
                published: published !== undefined ? published : existing.published,
                featured: featured !== undefined ? featured : existing.featured,
                order: order !== undefined ? order : existing.order,
            },
        });

        res.json({
            status: 'success',
            data: portfolio,
        });

        // Regenerate sitemap
        generateSitemap();
    } catch (error) {
        console.error('Update portfolio error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// Delete portfolio (admin only)
export const deletePortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const portfolio = await prisma.portfolio.findUnique({
            where: { id },
        });

        if (!portfolio) {
            res.status(404).json({
                status: 'error',
                message: 'Portfolio not found',
            });
            return;
        }

        await prisma.portfolio.delete({
            where: { id },
        });

        res.json({
            status: 'success',
            message: 'Portfolio deleted successfully',
        });

        // Regenerate sitemap
        generateSitemap();
    } catch (error) {
        console.error('Delete portfolio error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};
