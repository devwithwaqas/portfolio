/**
 * Write Firebase-specific robots.txt to dist/
 * Run during Firebase build only. Overwrites public/robots.txt with Firebase sitemap.
 */

const fs = require('fs')
const path = require('path')

const DIST = path.resolve(__dirname, '../dist')
const indexPath = path.join(DIST, 'index.html')

let baseUrl = (process.env.FIREBASE_SITE_URL || process.env.VITE_FIREBASE_SITE_URL || 'https://waqasahmad-portfolio.web.app').replace(/\/$/, '')

const isFirebase = () => {
  if (process.env.FIREBASE_SITE_URL || process.env.VITE_FIREBASE_SITE_URL) return true
  if (!fs.existsSync(indexPath)) return false
  const html = fs.readFileSync(indexPath, 'utf8')
  const hasRoot = html.includes('base="/"') || (!html.includes('base="/portfolio') && html.includes('href="/assets/'))
  return !!hasRoot
}

if (!isFirebase()) {
  console.log('[SKIP] write-robots-firebase: not a Firebase build, skipping')
  process.exit(0)
}

// Minimal, standards-compliant robots.txt. Allow: / permits all; sub-allows removed as redundant.
// Bingbot inherits User-agent: *; duplicate block removed.
const robots = `# robots.txt for ${baseUrl}
# Crawl rules only. /llms.txt is optional for some agents; not an official standard.

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`

const out = path.join(DIST, 'robots.txt')
fs.writeFileSync(out, robots, 'utf8')
console.log('[OK] Wrote Firebase robots.txt to dist/')
console.log(`    Sitemap: ${baseUrl}/sitemap.xml`)
