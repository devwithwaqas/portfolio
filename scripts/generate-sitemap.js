/**
 * Generate sitemap.xml dynamically from Vue Router routes
 * Run this after build: node scripts/generate-sitemap.js
 * 
 * This script:
 * 1. Reads routes from router configuration
 * 2. Generates sitemap.xml with proper formatting
 * 3. Writes to both dist/ and public/ folders
 */

const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://devwithwaqas.github.io/portfolio'
const DIST_DIR = path.resolve(__dirname, '../dist')
const PUBLIC_DIR = path.resolve(__dirname, '../public')

// Routes from router configuration
const routes = [
  {
    path: '/',
    priority: 1.0,
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/projects/heat-exchanger',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    path: '/projects/airasia-id90',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    path: '/projects/bat-inhouse-app',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    path: '/projects/pj-smart-city',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    path: '/projects/gamified-employee-management',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    path: '/projects/valet-parking',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    path: '/projects/mobile-games',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    path: '/projects/uk-property-management',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    path: '/projects/g5-pos',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    path: '/projects/chubb-insurance-applications',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    path: '/services/full-stack-development',
    priority: 0.9,
    changefreq: 'monthly'
  },
  {
    path: '/services/azure-cloud-architecture',
    priority: 0.9,
    changefreq: 'monthly'
  },
  {
    path: '/services/technical-leadership',
    priority: 0.9,
    changefreq: 'monthly'
  },
  {
    path: '/services/microservices-architecture',
    priority: 0.9,
    changefreq: 'monthly'
  },
  {
    path: '/services/agile-project-management',
    priority: 0.9,
    changefreq: 'monthly'
  },
  {
    path: '/services/database-design-optimization',
    priority: 0.9,
    changefreq: 'monthly'
  },
  {
    path: '/services/mobile-development',
    priority: 0.9,
    changefreq: 'monthly'
  }
]

function generateSitemap() {
  // Use current date for lastmod - ensures sitemap is always "fresh"
  const today = new Date().toISOString().split('T')[0]
  
  // Start with XML declaration and root element (no trailing newline in header)
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
  sitemap += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n'
  sitemap += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n'
  sitemap += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n'

  routes.forEach(route => {
    // Ensure path starts with / and ends correctly
    let path = route.path
    if (!path.startsWith('/')) {
      path = '/' + path
    }
    
    // Ensure URL is properly encoded (escape special characters if any)
    const url = `${BASE_URL}${path}`.replace(/&/g, '&amp;')
    const lastmod = route.lastmod || today
    const changefreq = route.changefreq || 'monthly'
    const priority = route.priority || 0.5
    
    // Ensure priority is a valid number between 0.0 and 1.0
    // Format as decimal string (e.g., "1.0" not "1") for better Google compatibility
    const validPriority = Math.max(0.0, Math.min(1.0, priority))
    const formattedPriority = validPriority.toFixed(1) // Always format as "1.0", "0.8", etc.
    
    sitemap += '  <url>\n'
    sitemap += `    <loc>${url}</loc>\n`
    sitemap += `    <lastmod>${lastmod}</lastmod>\n`
    sitemap += `    <changefreq>${changefreq}</changefreq>\n`
    sitemap += `    <priority>${formattedPriority}</priority>\n`
    sitemap += '  </url>\n'
  })

  sitemap += '</urlset>\n'

  // Ensure dist directory exists
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true })
    console.log('✓ Created dist directory')
  }
  
  // Ensure directories exist
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true })
  }
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  }
  
  // Write to dist directory (for deployment)
  const distSitemapPath = path.join(DIST_DIR, 'sitemap.xml')
  fs.writeFileSync(distSitemapPath, sitemap, 'utf8')
  console.log('✓ Generated sitemap.xml at:', distSitemapPath)
  
  // Also write to public directory (as backup and for Vite to copy)
  const publicSitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml')
  fs.writeFileSync(publicSitemapPath, sitemap, 'utf8')
  console.log('✓ Copied sitemap.xml to public/ folder')
  
  console.log('✓ Sitemap URL: https://devwithwaqas.github.io/portfolio/sitemap.xml')
  console.log(`✓ Total URLs: ${routes.length}`)
  console.log(`✓ Last modified: ${today}`)
}

// Run if called directly
if (require.main === module) {
  generateSitemap()
}

module.exports = { generateSitemap }
