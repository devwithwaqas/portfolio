/**
 * Validate sitemap.xml structure and URLs
 * Run: node scripts/validate-sitemap.js
 */

const fs = require('fs')
const path = require('path')

const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml')

if (!fs.existsSync(sitemapPath)) {
  console.error('❌ Sitemap not found at:', sitemapPath)
  process.exit(1)
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8')

// Basic validation
console.log('🔍 Validating sitemap.xml...\n')

// Check 1: Valid XML structure (basic checks)
if (!sitemapContent.includes('<?xml')) {
  console.error('❌ Missing XML declaration')
  process.exit(1)
}

if (!sitemapContent.includes('<urlset')) {
  console.error('❌ Missing <urlset> root element')
  process.exit(1)
}

if (!sitemapContent.includes('</urlset>')) {
  console.error('❌ Missing closing </urlset> tag')
  process.exit(1)
}

// Count URLs
const urlMatches = sitemapContent.match(/<url>/g)
const urlCount = urlMatches ? urlMatches.length : 0

if (urlCount === 0) {
  console.error('❌ No <url> elements found')
  process.exit(1)
}

console.log('✅ Valid XML structure')
console.log(`✅ Found ${urlCount} URLs\n`)

// Check 2: Validate URLs
const urlRegex = /<loc>(.*?)<\/loc>/g
const urls = []
let match

while ((match = urlRegex.exec(sitemapContent)) !== null) {
  urls.push(match[1])
}

console.log('🔗 Validating URLs...\n')

let validCount = 0
let invalidCount = 0

urls.forEach((url, index) => {
  const isValid = url.startsWith('https://devwithwaqas.github.io/portfolio/')
  const isHome = url === 'https://devwithwaqas.github.io/portfolio/' || url === 'https://devwithwaqas.github.io/portfolio'
  
  if (isValid) {
    validCount++
    console.log(`✅ [${index + 1}] ${url}`)
  } else {
    invalidCount++
    console.error(`❌ [${index + 1}] Invalid URL: ${url}`)
  }
})

console.log(`\n📊 Summary:`)
console.log(`   ✅ Valid URLs: ${validCount}`)
console.log(`   ❌ Invalid URLs: ${invalidCount}`)

// Check 3: Check for required elements
const requiredElements = ['<loc>', '<lastmod>', '<changefreq>', '<priority>']
let missingElements = []

requiredElements.forEach(element => {
  if (!sitemapContent.includes(element)) {
    missingElements.push(element)
  }
})

if (missingElements.length > 0) {
  console.error(`\n❌ Missing required elements: ${missingElements.join(', ')}`)
  process.exit(1)
} else {
  console.log(`\n✅ All required elements present`)
}

// Check 4: Validate priorities (should be 0.0 to 1.0)
const priorityRegex = /<priority>(.*?)<\/priority>/g
const priorities = []
while ((match = priorityRegex.exec(sitemapContent)) !== null) {
  const priority = parseFloat(match[1])
  if (priority < 0 || priority > 1) {
    console.error(`❌ Invalid priority: ${priority} (must be 0.0 to 1.0)`)
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
    console.error(`❌ Invalid changefreq: ${freq}`)
    invalidCount++
  } else {
    changefreqs.push(freq)
  }
}

// Check 6: Validate lastmod format (YYYY-MM-DD)
const lastmodRegex = /<lastmod>(.*?)<\/lastmod>/g
const dateRegex = /^\d{4}-\d{2}-\d{2}$/
while ((match = lastmodRegex.exec(sitemapContent)) !== null) {
  const date = match[1]
  if (!dateRegex.test(date)) {
    console.error(`❌ Invalid lastmod format: ${date} (should be YYYY-MM-DD)`)
    invalidCount++
  }
}

// Final result
if (invalidCount === 0) {
  console.log(`\n✅ Sitemap validation PASSED!`)
  console.log(`\n📝 Next steps:`)
  console.log(`   1. Submit to Google Search Console: sitemap.xml`)
  console.log(`   2. Wait 24-48 hours for Google to process`)
  console.log(`   3. Check status in Search Console`)
  process.exit(0)
} else {
  console.error(`\n❌ Sitemap validation FAILED with ${invalidCount} error(s)`)
  process.exit(1)
}
