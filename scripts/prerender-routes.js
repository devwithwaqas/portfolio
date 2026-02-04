/**
 * Pre-render script for SEO
 * Generates static HTML for all routes so Google sees full content without JavaScript
 * Uses Puppeteer to render each page and save the HTML
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../dist');

// All routes to pre-render
const ROUTES = [
  '/',
  '/services/full-stack-development',
  '/services/azure-cloud-architecture',
  '/services/technical-leadership',
  '/services/microservices-architecture',
  '/services/agile-project-management',
  '/services/database-design-optimization',
  '/services/mobile-development',
  '/projects/heat-exchanger',
  '/projects/airasia-id90',
  '/projects/bat-inhouse-app',
  '/projects/pj-smart-city',
  '/projects/gamified-employee-management',
  '/projects/valet-parking',
  '/projects/mobile-games',
  '/projects/uk-property-management',
  '/projects/g5-pos',
  '/projects/chubb-insurance'
];

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

async function startServer() {
  return new Promise((resolve, reject) => {
    console.log('Starting preview server...');
    
    const server = spawn('npx', ['vite', 'preview', '--port', PORT.toString()], {
      cwd: path.join(__dirname, '..'),
      shell: true,
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let started = false;
    
    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:') && !started) {
        started = true;
        console.log('Preview server started on port', PORT);
        resolve(server);
      }
    });
    
    server.stderr.on('data', (data) => {
      if (!started) {
        console.error('Server stderr:', data.toString());
      }
    });
    
    server.on('error', (err) => {
      reject(err);
    });
    
    // Timeout after 30 seconds
    setTimeout(() => {
      if (!started) {
        server.kill();
        reject(new Error('Server failed to start within 30 seconds'));
      }
    }, 30000);
  });
}

async function prerender() {
  let server = null;
  let browser = null;
  
  try {
    // Start the preview server
    server = await startServer();
    
    // Wait a bit for server to fully initialize
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Launch browser
    console.log('\nLaunching browser...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport for desktop rendering
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Pre-render each route
    for (const route of ROUTES) {
      const url = `${BASE_URL}${route}`;
      console.log(`\nPre-rendering: ${route}`);
      
      try {
        // Navigate to the page
        await page.goto(url, { 
          waitUntil: 'networkidle0',
          timeout: 30000 
        });
        
        // Wait for Vue to fully render
        await page.waitForSelector('#app', { timeout: 10000 });
        
        // Wait a bit more for dynamic content
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get the rendered HTML
        const html = await page.content();
        
        // Determine the output path
        let outputPath;
        if (route === '/') {
          outputPath = path.join(DIST_DIR, 'index.html');
        } else {
          // Create directory structure
          const routeDir = path.join(DIST_DIR, route);
          if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
          }
          outputPath = path.join(routeDir, 'index.html');
        }
        
        // Save the HTML
        fs.writeFileSync(outputPath, html);
        console.log(`✓ Saved: ${outputPath.replace(DIST_DIR, 'dist')}`);
        
      } catch (err) {
        console.error(`✗ Failed to pre-render ${route}:`, err.message);
      }
    }
    
    console.log('\n✅ Pre-rendering complete!');
    
  } catch (err) {
    console.error('Pre-rendering failed:', err);
    process.exit(1);
  } finally {
    // Cleanup
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.kill();
    }
  }
}

// Run
prerender();
