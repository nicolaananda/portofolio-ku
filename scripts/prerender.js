const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const routes = [
  '/',
  '/about',
  '/portfolio',
  '/portfolio/1',
  '/portfolio/2',
  '/portfolio/3',
  '/portfolio/4',
  '/portfolio/5',
  '/portfolio/6',
  '/portfolio/7',
  '/portfolio/8',
  '/blog',
  '/contact'
];

const prerender = async () => {
  const browser = await puppeteer.launch();
  const distPath = path.join(__dirname, '../dist');
  
  console.log('🚀 Starting pre-rendering process...');
  
  for (const route of routes) {
    try {
      const page = await browser.newPage();
      
      // Set viewport and user agent
      await page.setViewport({ width: 1200, height: 800 });
      await page.setUserAgent('Mozilla/5.0 (compatible; SEO Bot; +https://nicola.id)');
      
      console.log(`📄 Pre-rendering: ${route}`);
      
      // Navigate to the route
      const url = `file://${distPath}/index.html${route === '/' ? '' : '#' + route}`;
      await page.goto(url, { waitUntil: 'networkidle0' });
      
      // Wait for content to load
      await page.waitForSelector('body', { timeout: 5000 });
      
      // Get the rendered HTML
      const html = await page.content();
      
      // Create directory structure if needed
      const routePath = route === '/' ? '/index' : route;
      const filePath = path.join(distPath, routePath);
      
      if (route !== '/') {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }
      
      // Write the pre-rendered HTML
      const outputPath = route === '/' ? path.join(distPath, 'index.html') : path.join(filePath, 'index.html');
      fs.writeFileSync(outputPath, html);
      
      console.log(`✅ Generated: ${outputPath}`);
      
      await page.close();
    } catch (error) {
      console.error(`❌ Error pre-rendering ${route}:`, error.message);
    }
  }
  
  await browser.close();
  console.log('🎉 Pre-rendering completed!');
};

// Check if puppeteer is installed
try {
  require.resolve('puppeteer');
  prerender().catch(console.error);
} catch (e) {
  console.log('⚠️  Puppeteer not installed. Run: npm install puppeteer --save-dev');
  console.log('💡 For now, we\'ll skip pre-rendering. Your site will still work with client-side rendering.');
} 