/**
 * Generate sitemap.xml for SEO
 * Run with: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://nicola.id';
const API_URL = process.env.VITE_API_URL || 'https://be.nicola.id/api';

// Static pages with their priorities and change frequencies
const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/portfolio', priority: 0.9, changefreq: 'weekly' },
    { url: '/blog', priority: 0.9, changefreq: 'daily' },
    { url: '/contact', priority: 0.7, changefreq: 'monthly' },
];

function formatDate(date) {
    return new Date(date).toISOString().split('T')[0];
}

function generateSitemapXML(urls) {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${BASE_URL}${url}</loc>
    ${lastmod ? `<lastmod>${formatDate(lastmod)}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return xml;
}

async function fetchDynamicPages() {
    const urls = [...staticPages];

    try {
        // Fetch portfolio items
        console.log('Fetching portfolio items from:', `${API_URL}/portfolio`);
        const portfolioRes = await fetch(`${API_URL}/portfolio`);
        if (portfolioRes.ok) {
            const portfolio = await portfolioRes.json();
            portfolio.forEach(item => {
                urls.push({
                    url: `/portfolio/${item.id}`,
                    lastmod: item.updatedAt || item.createdAt,
                    changefreq: 'monthly',
                    priority: 0.7
                });
            });
            console.log(`✓ Added ${portfolio.length} portfolio items`);
        }
    } catch (error) {
        console.warn('⚠ Could not fetch portfolio items:', error.message);
    }

    try {
        // Fetch blog posts
        console.log('Fetching blog posts from:', `${API_URL}/blog`);
        const blogRes = await fetch(`${API_URL}/blog`);
        if (blogRes.ok) {
            const blog = await blogRes.json();
            blog.forEach(post => {
                urls.push({
                    url: `/blog/${post.id}`,
                    lastmod: post.updatedAt || post.createdAt,
                    changefreq: 'weekly',
                    priority: 0.8
                });
            });
            console.log(`✓ Added ${blog.length} blog posts`);
        }
    } catch (error) {
        console.warn('⚠ Could not fetch blog posts:', error.message);
    }

    return urls;
}

async function generateSitemap() {
    console.log('🗺️  Generating sitemap.xml...\n');

    try {
        const urls = await fetchDynamicPages();
        const xml = generateSitemapXML(urls);

        const outputPath = path.join(__dirname, '../public/sitemap.xml');
        fs.writeFileSync(outputPath, xml, 'utf-8');

        console.log(`\n✅ Sitemap generated successfully!`);
        console.log(`📄 Location: ${outputPath}`);
        console.log(`📊 Total URLs: ${urls.length}`);
        console.log(`🌐 Base URL: ${BASE_URL}\n`);
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    generateSitemap();
}

module.exports = { generateSitemap };
