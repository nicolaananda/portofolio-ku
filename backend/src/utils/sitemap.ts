import fs from 'fs';
import path from 'path';
import prisma from '../config/database';

export const generateSitemap = async () => {
    try {
        const baseUrl = process.env.FRONTEND_URL || 'https://nicola.id';
        const publicDir = path.join(__dirname, '../../../public'); // Adjust based on dist structure? No, dev structure.
        // In Prod, it might be different. But user is running dev.
        // Actually, user path: /Users/nicola.../SE/portofolio-ku/backend/src/utils
        // Public is /Users/nicola.../SE/portofolio-ku/public
        // So ../../../public is correct.

        // Verify public dir exists
        if (!fs.existsSync(publicDir)) {
            // If public doesn't exist (e.g. focused backend), maybe just log or skip
            console.warn('Public directory not found for sitemap generation:', publicDir);
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

        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
        console.log('Sitemap generated successfully');

    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
};
