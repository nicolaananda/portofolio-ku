import fs from 'fs';
import path from 'path';
import prisma from '../config/database';

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

export const generateSitemap = async () => {
    try {
        const baseUrl = process.env.FRONTEND_URL || 'https://nicola.id';
        // Ensure we point to the correct public location relative to the compiled dist/utils or src/utils
        // If running from dist/utils, we need to go up to root.
        // Safer to rely on process.cwd() or absolute path if possible, but keeping relative for now.
        // Note: The script used join(__dirname, '../../public/sitemap.xml') inside scripts/ folder.
        // Inside src/utils or dist/utils, we are 2 levels deep from backend root.
        // backend/src/utils -> backend/ -> public/ is ../../../public from here?
        // Wait, the structure is:
        // root/
        //   public/
        //   backend/
        //     src/
        //       utils/
        //
        // So from src/utils, we need: ../../../public

        const sitemapPath = process.env.SITEMAP_PATH || path.join(__dirname, '../../../public/sitemap.xml');
        const sitemapDir = path.dirname(sitemapPath);

        // Verify directory exists
        if (!fs.existsSync(sitemapDir)) {
            console.warn('Sitemap directory not found:', sitemapDir);
            // Try creating it if it doesn't exist? Or just fail?
            // On the server, public_html might be different. 
            // Better to log and return than crash.
            return;
        }

        console.log(`Generating sitemap to: ${sitemapPath}`);

        const portfolios = await prisma.portfolio.findMany({
            where: { published: true },
            select: { slug: true, id: true, updatedAt: true, createdAt: true }
        });

        const blogs = await prisma.blog.findMany({
            where: { published: true },
            select: { slug: true, id: true, updatedAt: true, createdAt: true }
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
            try {
                const lastMod = item.updatedAt || item.createdAt || new Date();
                const lastModStr = lastMod instanceof Date ? lastMod.toISOString() : new Date(lastMod).toISOString();
                const safeSlug = escapeXml(item.slug || item.id);

                sitemap += `
  <url>
    <loc>${baseUrl}/portfolio/${safeSlug}</loc>
    <lastmod>${lastModStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
            } catch (err) {
                console.error(`Error processing portfolio for sitemap: ${item.slug}`, err);
            }
        });

        // Blogs
        blogs.forEach(item => {
            try {
                const lastMod = item.updatedAt || item.createdAt || new Date();
                const lastModStr = lastMod instanceof Date ? lastMod.toISOString() : new Date(lastMod).toISOString();
                const safeSlug = escapeXml(item.slug || item.id);

                sitemap += `
  <url>
    <loc>${baseUrl}/blog/${safeSlug}</loc>
    <lastmod>${lastModStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
            } catch (err) {
                console.error(`Error processing blog for sitemap: ${item.slug}`, err);
            }
        });

        sitemap += `
</urlset>`;

        fs.writeFileSync(sitemapPath, sitemap);
        console.log('✅ Sitemap generated successfully');

    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
};
