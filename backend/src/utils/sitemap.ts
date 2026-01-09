import fs from 'fs';
import path from 'path';
import prisma from '../config/database';

export const generateSitemap = async () => {
    try {
        const baseUrl = process.env.FRONTEND_URL || 'https://nicola.id';
        const sitemapPath = process.env.SITEMAP_PATH || path.join(__dirname, '../../../public/sitemap.xml');
        const sitemapDir = path.dirname(sitemapPath);

        // Verify directory exists
        if (!fs.existsSync(sitemapDir)) {
            console.warn('Sitemap directory not found:', sitemapDir);
            return;
        }

        const portfolios = await prisma.portfolio.findMany({
            where: { published: true },
            select: { slug: true, id: true, updatedAt: true }
        });

        const blogs = await prisma.blog.findMany({
            where: { published: true },
            select: { slug: true, id: true, updatedAt: true }
        });

        const staticRoutes = [
            '',
            '/about',
            '/portfolio',
            '/blog',
            '/contact'
        ];

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        // Static Routes
        staticRoutes.forEach(route => {
            sitemap += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
        });

        // Portfolios
        portfolios.forEach(item => {
            sitemap += `
  <url>
    <loc>${baseUrl}/portfolio/${item.slug || item.id}</loc>
    <lastmod>${item.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
        });

        // Blogs
        blogs.forEach(item => {
            sitemap += `
  <url>
    <loc>${baseUrl}/blog/${item.slug || item.id}</loc>
    <lastmod>${item.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
        });

        sitemap += `
</urlset>`;

        fs.writeFileSync(sitemapPath, sitemap);
        console.log('Sitemap generated successfully');

    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
};
