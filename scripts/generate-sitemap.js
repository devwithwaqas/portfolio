/**
 * Generate sitemap.xml dynamically from Vue Router routes
 * Run this after build: node scripts/generate-sitemap.js
 * 
 * This script:
 * 1. Automatically reads routes from router configuration
 * 2. Filters out redirects and 404 routes
 * 3. Generates sitemap.xml with proper formatting
 * 4. Writes to both dist/ and public/ folders
 */

const fs = require('fs')
const path = require('path')

// Detect build mode from environment or check dist/index.html for base path
// Primary site: Firebase (waqasahmad-portfolio). GitHub Pages was legacy and redirects to Firebase.
const DIST_DIR = path.resolve(__dirname, '../dist')
const PUBLIC_DIR = path.resolve(__dirname, '../public')
const ROUTER_FILE = path.resolve(__dirname, '../src/router/index.js')

// Default to Firebase – single source of truth. No GitHub Pages default.
let BASE_URL = 'https://waqasahmad-portfolio.web.app'

// Priority 1: Explicit environment variable
if (process.env.FIREBASE_SITE_URL) {
  BASE_URL = process.env.FIREBASE_SITE_URL.replace(/\/$/, '')
  console.log(`[Sitemap] Using FIREBASE_SITE_URL: ${BASE_URL}`)
} 
// Priority 2: Check dist/index.html for base path (most reliable after build)
else {
  const indexPath = path.join(DIST_DIR, 'index.html')
  if (fs.existsSync(indexPath)) {
    const htmlContent = fs.readFileSync(indexPath, 'utf8')
    // Firebase builds: base="/" or no base tag (defaults to "/")
    // GitHub Pages builds: base="/portfolio/"
    const hasPortfolioBase = htmlContent.includes('base="/portfolio/"') || htmlContent.includes('base="/portfolio"')
    const hasRootBase = htmlContent.includes('base="/"') || htmlContent.includes('base="/"') || !htmlContent.includes('<base')
    
    if (hasRootBase && !hasPortfolioBase) {
      // Firebase build detected
      BASE_URL = process.env.VITE_FIREBASE_SITE_URL || 'https://waqasahmad-portfolio.web.app'
      BASE_URL = BASE_URL.replace(/\/$/, '')
      console.log(`[Sitemap] Firebase build detected from index.html, using: ${BASE_URL}`)
    } else if (hasPortfolioBase) {
      // Legacy GitHub Pages build (redirect only)
      BASE_URL = 'https://waqasahmad-portfolio.web.app'
      console.log(`[Sitemap] Legacy build detected, using Firebase URL: ${BASE_URL}`)
    } else {
      // Fallback: check environment
      if (process.env.MODE === 'firebase' || process.env.NODE_ENV === 'firebase') {
        BASE_URL = process.env.VITE_FIREBASE_SITE_URL || 'https://waqasahmad-portfolio.web.app'
        BASE_URL = BASE_URL.replace(/\/$/, '')
        console.log(`[Sitemap] Firebase mode from env, using: ${BASE_URL}`)
      } else {
        BASE_URL = (process.env.VITE_FIREBASE_SITE_URL || 'https://waqasahmad-portfolio.web.app').replace(/\/$/, '')
        console.log(`[Sitemap] Defaulting to Firebase: ${BASE_URL}`)
      }
    }
  } else {
    // dist/index.html doesn't exist yet - use Firebase
    BASE_URL = (process.env.VITE_FIREBASE_SITE_URL || 'https://waqasahmad-portfolio.web.app').replace(/\/$/, '')
    console.log(`[Sitemap] No dist yet, using Firebase: ${BASE_URL}`)
  }
}

/**
 * Extract routes from router file
 * Parses the router configuration to get all valid routes
 */
function extractRoutesFromRouter() {
  const routerContent = fs.readFileSync(ROUTER_FILE, 'utf8')
  const routes = []
  
  // Match route objects in the routes array
  // Pattern: { path: '...', name: '...', component: ... }
  const routePattern = /\{\s*path:\s*['"`]([^'"`]+)['"`]\s*,\s*name:\s*['"`]([^'"`]+)['"`]\s*(?:,\s*component:\s*[^}]+)?\s*\}/g
  const redirectPattern = /\{\s*path:\s*['"`]([^'"`]+)['"`]\s*,\s*redirect:/g
  const catchAllPattern = /path:\s*['"`]\/:pathMatch\(\.\*\)\*['"`]/g
  
  let match
  
  // Extract all route definitions
  const allRoutes = []
  while ((match = routePattern.exec(routerContent)) !== null) {
    const routePath = match[1]
    const routeName = match[2]
    
    // Skip if it's a catch-all route (404)
    if (routePath.includes('pathMatch')) {
      continue
    }
    
    allRoutes.push({ path: routePath, name: routeName })
  }
  
  // Check for redirects and exclude them
  const redirectPaths = new Set()
  while ((match = redirectPattern.exec(routerContent)) !== null) {
    redirectPaths.add(match[1])
  }
  
  // Filter out redirects and assign priorities
  allRoutes.forEach(route => {
    // Skip redirects
    if (redirectPaths.has(route.path)) {
      return
    }
    
    // Skip 404 route
    if (route.name === 'NotFound' || route.path.includes('pathMatch')) {
      return
    }
    
    // Determine priority and changefreq based on path
    let priority = 0.5
    let changefreq = 'monthly'
    
    if (route.path === '/') {
      priority = 1.0
      changefreq = 'weekly'
    } else if (route.path.startsWith('/projects/')) {
      priority = 0.8
      changefreq = 'monthly'
    } else if (route.path.startsWith('/services/')) {
      priority = 0.9
      changefreq = 'monthly'
    }
    
    const routeEntry = {
      path: route.path,
      priority,
      changefreq
    }
    
    // Add lastmod for home page
    if (route.path === '/') {
      routeEntry.lastmod = new Date().toISOString().split('T')[0]
    }
    
    routes.push(routeEntry)
  })
  
  return routes
}

function generateSitemap() {
  // Automatically extract routes from router
  const routes = extractRoutesFromRouter()
  
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
    let routePath = route.path
    if (!routePath.startsWith('/')) {
      routePath = '/' + routePath
    }
    
    // Ensure URL is properly encoded (escape special characters if any)
    const url = `${BASE_URL}${routePath}`.replace(/&/g, '&amp;')
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
    console.log('[OK] Created dist directory')
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
  console.log('[OK] Generated sitemap.xml at:', distSitemapPath)
  
  // Also write to public directory (as backup and for Vite to copy)
  const publicSitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml')
  fs.writeFileSync(publicSitemapPath, sitemap, 'utf8')
  console.log('[OK] Copied sitemap.xml to public/ folder')
  
  console.log(`[OK] Sitemap URL: ${BASE_URL}/sitemap.xml`)
  console.log(`[OK] Total URLs: ${routes.length} (auto-discovered from router)`)
  console.log(`[OK] Last modified: ${today}`)
}

// Run if called directly
if (require.main === module) {
  generateSitemap()
}

module.exports = { generateSitemap }
