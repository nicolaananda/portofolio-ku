import { Response } from 'express';
import slugify from 'slugify';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { generateSitemap } from '../utils/sitemap';

// Get all published blog posts (public)
export const getAllBlogs = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const blogs = await prisma.blog.findMany({
            where: { published: true },
            orderBy: [
                { featured: 'desc' },
                { createdAt: 'desc' },
            ],
        });

        res.json({
            status: 'success',
            data: blogs,
        });
    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// Get all blogs including drafts (admin only)
export const getAllBlogsAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: [
                { featured: 'desc' },
                { createdAt: 'desc' },
            ],
        });

        res.json({
            status: 'success',
            data: blogs,
        });
    } catch (error) {
        console.error('Get all blogs error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// Get single blog by id or slug (public)
export const getBlog = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { slug } = req.params; // keep param name 'slug'

        const blog = await prisma.blog.findFirst({
            where: {
                OR: [
                    { id: slug },
                    { slug: slug }
                ]
            }
        });

        if (!blog) {
            res.status(404).json({
                status: 'error',
                message: 'Blog post not found',
            });
            return;
        }

        // Only show published blogs to non-admin users
        if (!blog.published && req.user?.role !== 'admin') {
            res.status(404).json({
                status: 'error',
                message: 'Blog post not found',
            });
            return;
        }

        // Increment views
        await prisma.blog.update({
            where: { id: blog.id },
            data: { views: blog.views + 1 },
        });

        res.json({
            status: 'success',
            data: { ...blog, views: blog.views + 1 },
        });
    } catch (error) {
        console.error('Get blog error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// Create blog (admin only)
export const createBlog = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const {
            title,
            excerpt,
            content,
            coverImage,
            category,
            tags,
            published,
            featured,
            readTime,
        } = req.body;

        // Validate required fields
        if (!title || !excerpt || !content || !coverImage || !category) {
            res.status(400).json({
                status: 'error',
                message: 'Title, excerpt, content, cover image, and category are required',
            });
            return;
        }

        // Generate slug from title
        const slug = slugify(title, { lower: true, strict: true });

        // Check if slug already exists
        const existing = await prisma.blog.findUnique({
            where: { slug },
        });

        if (existing) {
            res.status(400).json({
                status: 'error',
                message: 'A blog post with this title already exists',
            });
            return;
        }

        const blog = await prisma.blog.create({
            data: {
                slug,
                title,
                excerpt,
                content,
                coverImage,
                category,
                tags: tags || [],
                published: published !== undefined ? published : false,
                featured: featured || false,
                readTime: readTime || '5 min read',
            },
        });

        res.status(201).json({
            status: 'success',
            data: blog,
        });

        // Regenerate sitemap
        generateSitemap();
    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// Update blog (admin only)
export const updateBlog = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const {
            title,
            excerpt,
            content,
            coverImage,
            category,
            tags,
            published,
            featured,
            readTime,
        } = req.body;

        // Check if blog exists
        const existing = await prisma.blog.findUnique({
            where: { id },
        });

        if (!existing) {
            res.status(404).json({
                status: 'error',
                message: 'Blog post not found',
            });
            return;
        }

        // Generate new slug if title changed
        let slug = existing.slug;
        if (title && title !== existing.title) {
            slug = slugify(title, { lower: true, strict: true });

            // Check if new slug already exists
            const slugExists = await prisma.blog.findUnique({
                where: { slug },
            });

            if (slugExists && slugExists.id !== id) {
                res.status(400).json({
                    status: 'error',
                    message: 'A blog post with this title already exists',
                });
                return;
            }
        }

        const blog = await prisma.blog.update({
            where: { id },
            data: {
                slug,
                title: title || existing.title,
                excerpt: excerpt || existing.excerpt,
                content: content || existing.content,
                coverImage: coverImage || existing.coverImage,
                category: category || existing.category,
                tags: tags !== undefined ? tags : existing.tags,
                published: published !== undefined ? published : existing.published,
                featured: featured !== undefined ? featured : existing.featured,
                readTime: readTime || existing.readTime,
            },
        });

        res.json({
            status: 'success',
            data: blog,
        });

        // Regenerate sitemap
        generateSitemap();
    } catch (error) {
        console.error('Update blog error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// Delete blog (admin only)
export const deleteBlog = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const blog = await prisma.blog.findUnique({
            where: { id },
        });

        if (!blog) {
            res.status(404).json({
                status: 'error',
                message: 'Blog post not found',
            });
            return;
        }

        await prisma.blog.delete({
            where: { id },
        });

        res.json({
            status: 'success',
            message: 'Blog post deleted successfully',
        });

        // Regenerate sitemap
        generateSitemap();
    } catch (error) {
        console.error('Delete blog error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};
