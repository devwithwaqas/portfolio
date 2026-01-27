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

const robots = `# robots.txt for Waqas Ahmad Portfolio (Firebase)
# ${baseUrl}
#
# This file: crawl rules for web crawlers (User-agent, Allow, Disallow, Sitemap).
# For AI-oriented content (titles, descriptions, keywords): see /llms.txt .
# AI agents use llms.txt for accurate citing and summarization; it provides both
# descriptions and keywords. robots.txt does not contain descriptions or keywords.

User-agent: *
Allow: /
Allow: /projects/
Allow: /services/
Allow: /llms.txt

Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`

const out = path.join(DIST, 'robots.txt')
fs.writeFileSync(out, robots, 'utf8')
console.log('[OK] Wrote Firebase robots.txt to dist/')
console.log(`    Sitemap: ${baseUrl}/sitemap.xml`)
