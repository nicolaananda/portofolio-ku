
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
            select: { slug: true, updatedAt: true },
        });

        const blogs = await prisma.blog.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true },
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
            xml += `
  <url>
    <loc>${baseUrl}/portfolio/${portfolio.slug}</loc>
    <lastmod>${portfolio.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
        });

        // Add blogs
        blogs.forEach(blog => {
            xml += `
  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${blog.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
        });

        xml += `
</urlset>`;

        res.header('Content-Type', 'application/xml');
        res.send(xml);
    } catch (error) {
        console.error('Sitemap generation error:', error);
        res.status(500).send('Error generating sitemap');
    }
};
