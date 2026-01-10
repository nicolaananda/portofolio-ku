import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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

const generateStaticSitemap = async () => {
    try {
        console.log('Generating static sitemap...');

        const baseUrl = process.env.FRONTEND_URL || 'https://nicola.id';
        // Target public directory in the root of the repo
        const sitemapPath = path.join(__dirname, '../../public/sitemap.xml');

        console.log(`Writing sitemap to: ${sitemapPath}`);

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
                const lastMod = portfolio.updatedAt || portfolio.createdAt || new Date();
                const lastModStr = lastMod instanceof Date ? lastMod.toISOString() : new Date(lastMod).toISOString();
                const safeSlug = escapeXml(portfolio.slug);

                xml += `
  <url>
    <loc>${baseUrl}/portfolio/${safeSlug}</loc>
    <lastmod>${lastModStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
            } catch (err) {
                console.error(`Error processing portfolio: ${portfolio.slug}`, err);
            }
        });

        // Add blogs
        blogs.forEach(blog => {
            try {
                const lastMod = blog.updatedAt || blog.createdAt || new Date();
                const lastModStr = lastMod instanceof Date ? lastMod.toISOString() : new Date(lastMod).toISOString();
                const safeSlug = escapeXml(blog.slug);

                xml += `
  <url>
    <loc>${baseUrl}/blog/${safeSlug}</loc>
    <lastmod>${lastModStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
            } catch (err) {
                console.error(`Error processing blog: ${blog.slug}`, err);
            }
        });

        xml += `
</urlset>`;

        fs.writeFileSync(sitemapPath, xml);
        console.log('✅ Sitemap generated successfully!');
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

generateStaticSitemap();
