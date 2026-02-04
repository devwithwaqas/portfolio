/**
 * Audit all blog articles for SEO/crawl compliance.
 * Ensures: slug, title, excerpt, topic, keywords present and safe; no crawl issues.
 * Run: node scripts/audit-blog-seo-compliance.js
 */

const fs = require('fs')
const path = require('path')

const ARTICLES_DIR = path.resolve(__dirname, '../src/config/blog/articles')

function extractString(content, key) {
  const patterns = [
    new RegExp(`${key}:\\s*["']([^"']*)["']`, 'm'),
    new RegExp(`${key}:\\s*["\`]([^"\`]*)["\`]`, 'm')
  ]
  for (const re of patterns) {
    const m = content.match(re)
    if (m) return m[1].trim()
  }
  return null
}

function hasKey(content, key) {
  return new RegExp(`\\b${key}\\s*:`).test(content)
}

function extractKeywordsArray(content) {
  const start = content.indexOf('keywords:')
  if (start === -1) return null
  const after = content.slice(start + 9)
  const bracket = after.indexOf('[')
  if (bracket === -1) return null
  let depth = 1
  let i = bracket + 1
  while (depth > 0 && i < after.length) {
    if (after[i] === '[') depth++
    else if (after[i] === ']') depth--
    i++
  }
  const arrStr = after.slice(0, i)
  const count = (arrStr.match(/["'][^"']*["']/g) || []).length
  return count
}

function audit() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.error('Articles dir not found:', ARTICLES_DIR)
    process.exit(1)
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.js'))
  const issues = []
  const warnings = []
  const ok = []

  for (const file of files.sort()) {
    const filePath = path.join(ARTICLES_DIR, file)
    const content = fs.readFileSync(filePath, 'utf8')
    const expectedSlug = file.replace(/\.js$/, '')
    const slug = extractString(content, 'slug')
    const title = extractString(content, 'title')
    const excerpt = extractString(content, 'excerpt')
    const topic = extractString(content, 'topic')
    const date = extractString(content, 'date')
    const hasKeywords = hasKey(content, 'keywords')
    const keywordCount = extractKeywordsArray(content)

    const slugMismatch = slug !== expectedSlug
    if (slugMismatch) issues.push({ file, msg: `slug "${slug}" does not match filename (expected ${expectedSlug})` })
    if (!slug) issues.push({ file, msg: 'missing slug' })
    if (!title) issues.push({ file, msg: 'missing title (breaks meta title and schema)' })
    if (!excerpt) warnings.push({ file, msg: 'missing excerpt (meta description falls back to title)' })
    if (!topic) warnings.push({ file, msg: 'missing topic (semantic keywords and related-articles affected)' })
    if (!date) warnings.push({ file, msg: 'missing date (schema uses current date)' })
    if (!hasKeywords) warnings.push({ file, msg: 'missing keywords array (meta/schema still get title+topic+semantic)' })
    else if (keywordCount !== null && keywordCount < 10) warnings.push({ file, msg: `very few keywords (${keywordCount}); aim 200–1200 for SEO plan` })

    if (!issues.some((i) => i.file === file)) ok.push(file.replace(/\.js$/, ''))
  }

  const total = files.length
  console.log('=== Blog articles SEO/crawl compliance audit ===\n')
  console.log(`Total articles: ${total}`)

  if (issues.length) {
    console.log('\n--- FAIL (crawl/SEO issues) ---')
    issues.forEach(({ file, msg }) => console.log(`  ${file}: ${msg}`))
  }
  if (warnings.length) {
    console.log('\n--- Warnings (recommended) ---')
    warnings.forEach(({ file, msg }) => console.log(`  ${file}: ${msg}`))
  }

  const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml')
  let sitemapCount = 0
  if (fs.existsSync(sitemapPath)) {
    const sitemap = fs.readFileSync(sitemapPath, 'utf8')
    sitemapCount = (sitemap.match(/<loc>[^<]*\/blog\/[^<]+<\/loc>/g) || []).length
  }
  console.log(`\nSitemap blog URLs: ${sitemapCount} (expected ${total})`)
  if (sitemapCount !== total) {
    console.log('  ⚠ Sitemap blog count does not match article count. Run: node scripts/generate-sitemap.js')
  }

  console.log('\n--- Summary ---')
  console.log(`  OK: ${ok.length}`)
  console.log(`  Warnings: ${warnings.length}`)
  console.log(`  Fail: ${issues.length}`)
  if (issues.length > 0) {
    console.log('\nFix failures so crawlers get valid meta and schema for every article.')
    process.exit(1)
  }
  console.log('\nAll articles pass required SEO/crawl checks.')
}

audit()
