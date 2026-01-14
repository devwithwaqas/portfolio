/**
 * Generate sitemap.xml dynamically from Vue Router routes
 * Run this after build: node scripts/generate-sitemap.js
 */

const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://devwithwaqas.github.io/portfolio'
const DIST_DIR = path.resolve(__dirname, '../dist')

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
  const today = new Date().toISOString().split('T')[0]
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`

  routes.forEach(route => {
    const url = `${BASE_URL}${route.path}`
    const lastmod = route.lastmod || today
    const changefreq = route.changefreq || 'monthly'
    const priority = route.priority || 0.5
    
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`
  })

  sitemap += `</urlset>`

  // Ensure dist directory exists
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true })
    console.log('✓ Created dist directory')
  }
  
  // Write to dist directory
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml')
  fs.writeFileSync(sitemapPath, sitemap, 'utf8')
  console.log('✓ Generated sitemap.xml at:', sitemapPath)
  console.log('✓ Sitemap URL: https://devwithwaqas.github.io/portfolio/sitemap.xml')
}

// Run if called directly
if (require.main === module) {
  generateSitemap()
}

module.exports = { generateSitemap }
