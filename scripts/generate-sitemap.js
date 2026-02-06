/**
 * Generate sitemap.xml from Vue Router routes and blog articles.
 * Run after build: node scripts/generate-sitemap.js
 *
 * Follows sitemap protocol: namespace, schemaLocation, UTF-8, YYYY-MM-DD lastmod.
 * Priority: home 1.0, services 0.8, projects 0.7, blog index 0.8, blog posts 0.6, privacy 0.3 (max 5 distinct).
 * Changefreq: / and /blog weekly; /blog/*, /services/*, /projects/* monthly; /privacy yearly.
 * Order: Homepage → core (blog, privacy) → services → projects → blog posts.
 * Preserves existing lastmod from public/sitemap.xml; does not auto-update dates.
 */

const fs = require('fs')
const path = require('path')

const BLOG_ARTICLES_DIR = path.resolve(__dirname, '../src/config/blog/articles')
const DIST_DIR = path.resolve(__dirname, '../dist')
const PUBLIC_DIR = path.resolve(__dirname, '../public')
const ROUTER_FILE = path.resolve(__dirname, '../src/router/index.js')

// Canonical site URL (sitemap and IndexNow should use the same base)
let BASE_URL = 'https://waqas.ragnorx.com'
if (process.env.FIREBASE_SITE_URL) {
  BASE_URL = process.env.FIREBASE_SITE_URL.replace(/\/$/, '')
} else {
  const indexPath = path.join(DIST_DIR, 'index.html')
  if (fs.existsSync(indexPath)) {
    const htmlContent = fs.readFileSync(indexPath, 'utf8')
    const hasPortfolioBase = htmlContent.includes('base="/portfolio/"') || htmlContent.includes('base="/portfolio"')
    if (!hasPortfolioBase) {
      BASE_URL = (process.env.VITE_FIREBASE_SITE_URL || BASE_URL).replace(/\/$/, '')
    }
  } else {
    BASE_URL = (process.env.VITE_FIREBASE_SITE_URL || BASE_URL).replace(/\/$/, '')
  }
}
BASE_URL = BASE_URL.replace(/\/$/, '')

/** When set, only write sitemap to dist/ (used at deploy time per target). Do not overwrite public/. */
const DIST_ONLY = process.env.DEPLOY_SITEMAP_DIST_ONLY === '1' || process.env.DEPLOY_SITEMAP_DIST_ONLY === 'true'

/** Parse existing public/sitemap.xml for lastmod by URL. Returns Map<normalizedUrl, YYYY-MM-DD>. Keeps existing dates unchanged. */
function parseExistingLastmod() {
  const p = path.join(PUBLIC_DIR, 'sitemap.xml')
  if (!fs.existsSync(p)) return new Map()
  const xml = fs.readFileSync(p, 'utf8')
  const map = new Map()
  const locRe = /<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g
  let m
  while ((m = locRe.exec(xml)) !== null) {
    const raw = m[1].trim()
    const norm = raw.replace(/\/$/, '') || raw
    const lastmod = m[2].trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
      map.set(norm, lastmod)
      if (raw !== norm) map.set(raw, lastmod)
    }
  }
  return map
}

/** Normalize path: lowercase, no query, no fragment, single leading slash. */
function normalizePath(routePath) {
  let p = (routePath || '').split('?')[0].split('#')[0].trim().toLowerCase()
  if (!p.startsWith('/')) p = '/' + p
  return p.replace(/\/+/g, '/')
}

/** Build full URL for sitemap (no trailing slash except for home). */
function toLoc(path) {
  const base = BASE_URL.replace(/\/$/, '')
  if (path === '/' || path === '') return base + '/'
  return base + normalizePath(path)
}

/**
 * Extract static routes from router (no redirects, no 404, no /blog/:slug).
 * Returns array of { path }.
 */
function extractRoutesFromRouter() {
  const routerContent = fs.readFileSync(ROUTER_FILE, 'utf8')
  const routePattern = /\{\s*path:\s*['"`]([^'"`]+)['"`]\s*,\s*name:\s*['"`]([^'"`]+)['"`]\s*(?:,\s*component:\s*[^}]+)?\s*\}/g
  const redirectPattern = /\{\s*path:\s*['"`]([^'"`]+)['"`]\s*,\s*redirect:/g
  const allRoutes = []
  let match
  while ((match = routePattern.exec(routerContent)) !== null) {
    const routePath = match[1]
    const routeName = match[2]
    if (routePath.includes('pathMatch')) continue
    allRoutes.push({ path: routePath, name: routeName })
  }
  const redirectPaths = new Set()
  while ((match = redirectPattern.exec(routerContent)) !== null) redirectPaths.add(match[1])
  return allRoutes
    .filter((r) => !redirectPaths.has(r.path) && r.name !== 'NotFound' && r.path !== '/blog/:slug')
    .map((r) => ({ path: r.path }))
}

/**
 * Extract blog article slugs from blog/articles/*.js (one file per article; filename = slug)
 */
function getBlogArticleSlugs() {
  if (!fs.existsSync(BLOG_ARTICLES_DIR)) return []
  return fs.readdirSync(BLOG_ARTICLES_DIR)
    .filter((f) => f.endsWith('.js'))
    .map((f) => f.replace(/\.js$/, ''))
    .sort()
}

function generateSitemap() {
  const existingLastmod = parseExistingLastmod()
  const fallbackDate = '2026-02-04' // Used only for new URLs; do not auto-update existing.

  const staticRoutes = extractRoutesFromRouter()
  const blogSlugs = getBlogArticleSlugs()

  // Build ordered entries: Home → core (blog, privacy) → services → projects → blog posts.
  // Priority: home 1.0, services 0.8, projects 0.7, blog index 0.8, blog posts 0.6, privacy 0.3.
  // Changefreq: / and /blog weekly; /blog/*, /services/*, /projects/* monthly; /privacy yearly.
  const entries = []

  const home = staticRoutes.find((r) => r.path === '/')
  if (home) {
    entries.push({ path: '/', priority: 1.0, changefreq: 'weekly' })
  }

  const blogIndex = staticRoutes.find((r) => r.path === '/blog')
  if (blogIndex) {
    entries.push({ path: '/blog', priority: 0.8, changefreq: 'weekly' })
  }

  const privacy = staticRoutes.find((r) => r.path === '/privacy')
  if (privacy) {
    entries.push({ path: '/privacy', priority: 0.3, changefreq: 'yearly' })
  }

  const services = staticRoutes.filter((r) => r.path.startsWith('/services/')).sort((a, b) => a.path.localeCompare(b.path))
  services.forEach((r) => entries.push({ path: r.path, priority: 0.8, changefreq: 'monthly' }))

  const projects = staticRoutes.filter((r) => r.path.startsWith('/projects/')).sort((a, b) => a.path.localeCompare(b.path))
  projects.forEach((r) => entries.push({ path: r.path, priority: 0.7, changefreq: 'monthly' }))

  blogSlugs.sort().forEach((slug) => {
    entries.push({ path: `/blog/${slug}`, priority: 0.6, changefreq: 'monthly' })
  })

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
  sitemap += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n'
  sitemap += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n'
  sitemap += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n'

  entries.forEach((entry) => {
    const loc = toLoc(entry.path)
    const locNorm = loc.replace(/\/$/, '') || loc
    const lastmod = existingLastmod.get(loc) ?? existingLastmod.get(locNorm) ?? fallbackDate
    const changefreq = entry.changefreq
    const priority = Math.max(0, Math.min(1, entry.priority)).toFixed(1)
    const locEscaped = loc.replace(/&/g, '&amp;')
    sitemap += '  <url>\n'
    sitemap += `    <loc>${locEscaped}</loc>\n`
    sitemap += `    <lastmod>${lastmod}</lastmod>\n`
    sitemap += `    <changefreq>${changefreq}</changefreq>\n`
    sitemap += `    <priority>${priority}</priority>\n`
    sitemap += '  </url>\n'
  })

  sitemap += '</urlset>\n'

  if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true })

  const distPath = path.join(DIST_DIR, 'sitemap.xml')
  fs.writeFileSync(distPath, sitemap, 'utf8')
  console.log('[OK] Generated sitemap.xml at:', distPath, DIST_ONLY ? '(dist only)' : '')
  if (!DIST_ONLY) {
    if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true })
    const publicPath = path.join(PUBLIC_DIR, 'sitemap.xml')
    fs.writeFileSync(publicPath, sitemap, 'utf8')
    console.log('[OK] Wrote sitemap.xml to public/')
  }
  console.log(`[OK] Base URL: ${BASE_URL} | Total URLs: ${entries.length}`)
}

// Run if called directly
if (require.main === module) {
  generateSitemap()
}

module.exports = { generateSitemap }
