
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const escapeXml = (unsafe: string) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};

export const getSitemap = async (req: Request, res: Response) => {
    try {
        // Priority: Host header -> FRONTEND_URL -> Hardcoded fallback
        const host = req.get('host');
        let baseUrl = host ? `https://${host}` : (process.env.FRONTEND_URL || 'https://nicola.id');

        // Normalize URL (remove trailing slash)
        if (baseUrl.endsWith('/')) {
            baseUrl = baseUrl.slice(0, -1);
        }

        // Fetch dynamic data
        const portfolios = await prisma.portfolio.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true, createdAt: true },
        });

        const blogs = await prisma.blog.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true, createdAt: true },
        });

        // Static pages
        const staticPages = [
            '',
            '/about',
            '/portfolio',
            '/blog',
            '/contact',
        ];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        // Add static pages
        staticPages.forEach(page => {
            xml += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
        });

        // Add portfolios
        portfolios.forEach(portfolio => {
            try {
                // Ensure valid date
                const lastMod = portfolio.updatedAt || portfolio.createdAt || new Date();
                const lastModStr = lastMod instanceof Date ? lastMod.toISOString() : new Date(lastMod).toISOString();

                // Ensure slug is safe
                const safeSlug = escapeXml(portfolio.slug);

                xml += `
  <url>
    <loc>${baseUrl}/portfolio/${safeSlug}</loc>
    <lastmod>${lastModStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
            } catch (err) {
                console.error(`Error processing portfolio for sitemap: ${JSON.stringify(portfolio)}`, err);
                // Continue with other items instead of crashing
            }
        });

        // Add blogs
        blogs.forEach(blog => {
            try {
                // Ensure valid date
                const lastMod = blog.updatedAt || blog.createdAt || new Date();
                const lastModStr = lastMod instanceof Date ? lastMod.toISOString() : new Date(lastMod).toISOString();

                // Ensure slug is safe
                const safeSlug = escapeXml(blog.slug);

                xml += `
  <url>
    <loc>${baseUrl}/blog/${safeSlug}</loc>
    <lastmod>${lastModStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
            } catch (err) {
                console.error(`Error processing blog for sitemap: ${JSON.stringify(blog)}`, err);
                // Continue
            }
        });

        xml += `
</urlset>`;

        res.header('Content-Type', 'application/xml');
        res.send(xml);
    } catch (error) {
        console.error('Critical sitemap generation error:', error);
        res.status(500).send('Error generating sitemap');
    }
};
