/**
 * Validate sitemap.xml structure and URLs
 * Run: node scripts/validate-sitemap.js
 */

const fs = require('fs')
const path = require('path')

const PUBLIC_SITEMAP = path.resolve(__dirname, '../public/sitemap.xml')
const DIST_SITEMAP = path.resolve(__dirname, '../dist/sitemap.xml')
const DIST_NOJEKYLL = path.resolve(__dirname, '../dist/.nojekyll')

// Check both locations, prioritize dist (what gets deployed)
let sitemapPath = DIST_SITEMAP
if (!fs.existsSync(sitemapPath)) {
  sitemapPath = PUBLIC_SITEMAP
  console.warn('[WARN] Sitemap not found in dist/, checking public/ folder...')
}

if (!fs.existsSync(sitemapPath)) {
  console.error('[ERROR] Sitemap not found at:', PUBLIC_SITEMAP)
  console.error('[ERROR] Sitemap not found at:', DIST_SITEMAP)
  process.exit(1)
}

// Check for .nojekyll file (critical for GitHub Pages)
if (!fs.existsSync(DIST_NOJEKYLL)) {
  console.warn('[WARN] .nojekyll file not found in dist/ folder!')
  console.warn('       This may cause GitHub Pages to not serve sitemap.xml correctly.')
  console.warn('       Run: node scripts/create-nojekyll.js')
} else {
  console.log('[OK] .nojekyll file found in dist/ folder')
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8')

// Basic validation
console.log('[VALIDATE] Validating sitemap.xml...\n')

// Check 1: Valid XML structure (basic checks)
if (!sitemapContent.includes('<?xml')) {
  console.error('[ERROR] Missing XML declaration')
  process.exit(1)
}

if (!sitemapContent.includes('<urlset')) {
  console.error('[ERROR] Missing <urlset> root element')
  process.exit(1)
}

if (!sitemapContent.includes('</urlset>')) {
  console.error('[ERROR] Missing closing </urlset> tag')
  process.exit(1)
}

// Count URLs
const urlMatches = sitemapContent.match(/<url>/g)
const urlCount = urlMatches ? urlMatches.length : 0

if (urlCount === 0) {
  console.error('[ERROR] No <url> elements found')
  process.exit(1)
}

console.log('[OK] Valid XML structure')
console.log(`[OK] Found ${urlCount} URLs\n`)

// Check 2: Validate URLs
const urlRegex = /<loc>(.*?)<\/loc>/g
const urls = []
let match

while ((match = urlRegex.exec(sitemapContent)) !== null) {
  urls.push(match[1])
}

console.log('[VALIDATE] Validating URLs...\n')

let validCount = 0
let invalidCount = 0

// Validate Firebase URLs only (GitHub Pages now redirects to Firebase)
const FIREBASE_URL = process.env.VITE_FIREBASE_SITE_URL || 'https://waqasahmad-portfolio.web.app'
const isValidBaseUrl = (url) => url.startsWith(FIREBASE_URL)

urls.forEach((url, index) => {
  const isValid = isValidBaseUrl(url)
  const isHome = url === `${FIREBASE_URL}/` || url === FIREBASE_URL || 
                 url === `${FIREBASE_URL}/` || url === FIREBASE_URL
  
  if (isValid) {
    validCount++
    console.log(`[OK] [${index + 1}] ${url}`)
  } else {
    invalidCount++
    console.error(`[ERROR] [${index + 1}] Invalid URL: ${url}`)
  }
})

console.log(`\n[SUMMARY]`)
console.log(`    [OK] Valid URLs: ${validCount}`)
console.log(`    [ERROR] Invalid URLs: ${invalidCount}`)

// Check 3: Check for required elements
const requiredElements = ['<loc>', '<lastmod>', '<changefreq>', '<priority>']
let missingElements = []

requiredElements.forEach(element => {
  if (!sitemapContent.includes(element)) {
    missingElements.push(element)
  }
})

if (missingElements.length > 0) {
  console.error(`\n[ERROR] Missing required elements: ${missingElements.join(', ')}`)
  process.exit(1)
} else {
  console.log(`\n[OK] All required elements present`)
}

// Check 4: Validate priorities (should be 0.0 to 1.0)
const priorityRegex = /<priority>(.*?)<\/priority>/g
const priorities = []
while ((match = priorityRegex.exec(sitemapContent)) !== null) {
  const priority = parseFloat(match[1])
  if (priority < 0 || priority > 1) {
    console.error(`[ERROR] Invalid priority: ${priority} (must be 0.0 to 1.0)`)
    invalidCount++
  } else {
    priorities.push(priority)
  }
}

// Check 5: Validate changefreq values
const changefreqRegex = /<changefreq>(.*?)<\/changefreq>/g
const validFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
const changefreqs = []
while ((match = changefreqRegex.exec(sitemapContent)) !== null) {
  const freq = match[1].toLowerCase()
  if (!validFreqs.includes(freq)) {
    console.error(`[ERROR] Invalid changefreq: ${freq}`)
    invalidCount++
  } else {
    changefreqs.push(freq)
  }
}

// Check 6: Validate lastmod format (YYYY-MM-DD)
const dateRegex = /^\d{4}-\d{2}-\d{2}$/
const lastmodRegex = /<lastmod>(.*?)<\/lastmod>/g
while ((match = lastmodRegex.exec(sitemapContent)) !== null) {
  const date = match[1]
  if (!dateRegex.test(date)) {
    console.error(`[ERROR] Invalid lastmod format: ${date} (should be YYYY-MM-DD)`)
    invalidCount++
  }
}

// Final result
if (invalidCount === 0) {
  console.log(`\n[OK] Sitemap validation PASSED!`)
  console.log(`\n[NEXT_STEPS]`)
  console.log(`    1. Submit to Google Search Console: sitemap.xml`)
  console.log(`    2. Wait 24-48 hours for Google to process`)
  console.log(`    3. Check status in Search Console`)
  process.exit(0)
} else {
  console.error(`\n[ERROR] Sitemap validation FAILED with ${invalidCount} error(s)`)
  process.exit(1)
}
