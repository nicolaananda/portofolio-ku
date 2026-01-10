import { generateSitemap } from '../src/utils/sitemap';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

// Fix path issue when running from scripts/ folder vs src/utils/
// The utility assumes relative path from its location.
// When running ts-node scripts/generate-sitemap.ts, __dirname is .../backend/scripts
// Inside src/utils/sitemap.ts, __dirname depends on where it is compiled or run.
// If run via ts-node, src/utils/sitemap.ts __dirname is .../backend/src/utils

// We can set SITEMAP_PATH explicitly here to be safe
process.env.SITEMAP_PATH = path.join(__dirname, '../../public/sitemap.xml');

generateSitemap()
    .then(() => {
        console.log('Script completed.');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Script failed:', err);
        process.exit(1);
    });
