/**
 * Keyword Ranking Test Script
 * Tests if portfolio appears in search results for random keywords
 * 
 * Usage:
 *   npm run test:rankings
 * 
 * Setup Required:
 *   1. Google Custom Search API (recommended):
 *      - Create Custom Search Engine: https://cse.google.com/cse/all
 *      - Get API Key: https://console.cloud.google.com/apis/credentials
 *      - Set env vars: GOOGLE_CSE_ID and GOOGLE_API_KEY
 * 
 *   2. OR Bing Web Search API (alternative):
 *      - Get API Key: https://www.microsoft.com/en-us/bing/apis/bing-web-search-api
 *      - Set env var: BING_API_KEY
 * 
 *   3. OR Manual Testing Mode:
 *      - No API keys needed
 *      - Opens browser with search URLs (copy-paste to test)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'
import { getBestKeywordsBalanced, getTopKeywords } from './keyword-scorer.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')

// Configuration
const TARGET_SITE = 'waqasahmad-portfolio.web.app'
const TARGET_URLS = [
  'waqasahmad-portfolio.web.app',
  'waqasahmad-portfolio.firebaseapp.com',
  'devwithwaqas.github.io/portfolio'
]

// API Configuration (from environment)
// Try to load from .env.local if available
import { readFileSync } from 'fs'
import { join } from 'path'

// Load .env.local if exists
let envLocal = {}
try {
  const envPath = join(__dirname, '..', '.env.local')
  const envContent = readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.+)$/)
    if (match) {
      envLocal[match[1].trim()] = match[2].trim()
    }
  })
} catch (e) {
  // .env.local doesn't exist, that's fine
}

const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID || envLocal.GOOGLE_CSE_ID || ''
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || envLocal.GOOGLE_API_KEY || ''
const BING_API_KEY = process.env.BING_API_KEY || envLocal.BING_API_KEY || ''

// Test Configuration
const DEFAULT_TEST_COUNT = 10
const MAX_RESULTS_PER_QUERY = 50 // Google Custom Search max is 10 per page, but we'll check multiple pages

/**
 * Extract keywords from index.html
 */
function extractKeywordsFromHTML() {
  const htmlPath = path.join(PROJECT_ROOT, 'index.html')
  const html = fs.readFileSync(htmlPath, 'utf-8')
  
  // Extract keywords from meta tag
  const keywordsMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i)
  if (!keywordsMatch) {
    console.error('❌ Could not find keywords in index.html')
    return []
  }
  
  const keywordsString = keywordsMatch[1]
  // Split by comma and clean up
  const keywords = keywordsString
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 0)
    .filter(k => !k.includes('http')) // Remove URLs
  
  console.log(`📝 Extracted ${keywords.length} keywords from index.html`)
  return keywords
}

/**
 * Extract keywords from seo.js (if needed for additional keywords)
 */
function extractKeywordsFromSEO() {
  try {
    const seoPath = path.join(PROJECT_ROOT, 'src', 'utils', 'seo.js')
    const seoContent = fs.readFileSync(seoPath, 'utf-8')
    
    // Extract keywords from arrays (basic extraction)
    const keywordMatches = seoContent.matchAll(/'([^']+)'/g)
    const keywords = []
    
    for (const match of keywordMatches) {
      const keyword = match[1].trim()
      // Filter out non-keyword strings (function names, etc.)
      if (keyword.length > 3 && 
          !keyword.includes('function') && 
          !keyword.includes('const') &&
          !keyword.includes('return') &&
          !keyword.includes('import') &&
          !keyword.includes('export') &&
          keyword.match(/^[a-zA-Z0-9\s]+$/)) {
        keywords.push(keyword)
      }
    }
    
    return [...new Set(keywords)] // Deduplicate
  } catch (error) {
    console.warn('⚠️  Could not extract keywords from seo.js:', error.message)
    return []
  }
}

/**
 * Get best/most relevant keywords (not random)
 */
function getBestKeywords(keywords, count = DEFAULT_TEST_COUNT) {
  if (keywords.length <= count) {
    return keywords
  }
  
  // Use balanced selection (best from each category)
  return getBestKeywordsBalanced(keywords, count)
}

/**
 * Test keyword with Google Custom Search API
 */
async function testKeywordGoogle(keyword) {
  if (!GOOGLE_CSE_ID || !GOOGLE_API_KEY) {
    return null
  }
  
  try {
    const query = encodeURIComponent(keyword)
    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${query}&num=10`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed')
    }
    
    const items = data.items || []
    let position = null
    let pageNumber = null
    let found = false
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const link = item.link || item.displayLink || ''
      
      // Check if any target URL matches
      const matches = TARGET_URLS.some(target => 
        link.includes(target) || item.displayLink?.includes(target)
      )
      
      if (matches) {
        found = true
        position = i + 1
        pageNumber = 1 // First page (results 1-10)
        break
      }
    }
    
    // If not found on first page, check if there are more pages
    if (!found && data.queries?.request?.[0]?.totalResults) {
      const totalResults = parseInt(data.queries.request[0].totalResults)
      if (totalResults > 10) {
        // Could check page 2, but Google Custom Search free tier limits to 100 queries/day
        // So we'll just note that more results exist
      }
    }
    
    return {
      keyword,
      found,
      position,
      pageNumber,
      totalResults: data.queries?.request?.[0]?.totalResults || 0,
      snippet: found ? items[position - 1]?.snippet : null,
      link: found ? items[position - 1]?.link : null
    }
  } catch (error) {
    console.error(`❌ Error testing keyword "${keyword}":`, error.message)
    return {
      keyword,
      found: false,
      error: error.message
    }
  }
}

/**
 * Test keyword with Bing Web Search API
 */
async function testKeywordBing(keyword) {
  if (!BING_API_KEY) {
    return null
  }
  
  try {
    const query = encodeURIComponent(keyword)
    const url = `https://api.bing.microsoft.com/v7.0/search?q=${query}&count=50`
    
    const response = await fetch(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': BING_API_KEY
      }
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed')
    }
    
    const items = data.webPages?.value || []
    let position = null
    let pageNumber = null
    let found = false
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const url = item.url || ''
      
      const matches = TARGET_URLS.some(target => url.includes(target))
      
      if (matches) {
        found = true
        position = i + 1
        pageNumber = Math.ceil(position / 10) // Bing shows 10 per page
        break
      }
    }
    
    return {
      keyword,
      found,
      position,
      pageNumber,
      totalResults: data.webPages?.totalEstimatedMatches || 0,
      snippet: found ? items[position - 1]?.snippet : null,
      link: found ? items[position - 1]?.url : null
    }
  } catch (error) {
    console.error(`❌ Error testing keyword "${keyword}":`, error.message)
    return {
      keyword,
      found: false,
      error: error.message
    }
  }
}

/**
 * Generate manual test URLs
 */
function generateManualTestURLs(keywords) {
  const urls = keywords.map(keyword => {
    const query = encodeURIComponent(keyword)
    return {
      keyword,
      google: `https://www.google.com/search?q=${query}`,
      bing: `https://www.bing.com/search?q=${query}`
    }
  })
  
  return urls
}

/**
 * Print results report
 */
function printReport(results) {
  console.log('\n' + '='.repeat(80))
  console.log('📊 KEYWORD RANKING TEST REPORT')
  console.log('='.repeat(80))
  
  const found = results.filter(r => r.found)
  const notFound = results.filter(r => !r.found && !r.error)
  const errors = results.filter(r => r.error)
  
  console.log(`\n📈 Summary:`)
  console.log(`   Total Keywords Tested: ${results.length}`)
  console.log(`   ✅ Found: ${found.length} (${((found.length / results.length) * 100).toFixed(1)}%)`)
  console.log(`   ❌ Not Found: ${notFound.length}`)
  if (errors.length > 0) {
    console.log(`   ⚠️  Errors: ${errors.length}`)
  }
  
  if (found.length > 0) {
    console.log(`\n✅ FOUND KEYWORDS:`)
    console.log('-'.repeat(80))
    
    found.forEach((result, index) => {
      console.log(`\n${index + 1}. "${result.keyword}"`)
      console.log(`   Position: #${result.position} (Page ${result.pageNumber})`)
      if (result.totalResults) {
        console.log(`   Total Results: ${result.totalResults.toLocaleString()}`)
      }
      if (result.snippet) {
        console.log(`   Snippet: ${result.snippet.substring(0, 100)}...`)
      }
      if (result.link) {
        console.log(`   Link: ${result.link}`)
      }
    })
    
    // Statistics
    const positions = found.map(r => r.position).filter(p => p !== null)
    if (positions.length > 0) {
      const avgPosition = positions.reduce((a, b) => a + b, 0) / positions.length
      const bestPosition = Math.min(...positions)
      const worstPosition = Math.max(...positions)
      
      console.log(`\n📊 Position Statistics:`)
      console.log(`   Average Position: ${avgPosition.toFixed(1)}`)
      console.log(`   Best Position: #${bestPosition}`)
      console.log(`   Worst Position: #${worstPosition}`)
    }
  }
  
  if (notFound.length > 0) {
    console.log(`\n❌ NOT FOUND KEYWORDS (${notFound.length}):`)
    console.log('-'.repeat(80))
    notFound.forEach((result, index) => {
      console.log(`${index + 1}. "${result.keyword}"`)
    })
  }
  
  if (errors.length > 0) {
    console.log(`\n⚠️  ERRORS (${errors.length}):`)
    console.log('-'.repeat(80))
    errors.forEach((result, index) => {
      console.log(`${index + 1}. "${result.keyword}": ${result.error}`)
    })
  }
  
  console.log('\n' + '='.repeat(80))
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Keyword Ranking Test Script')
  console.log('='.repeat(80))
  
  // Check API availability
  const hasGoogleAPI = !!(GOOGLE_CSE_ID && GOOGLE_API_KEY)
  const hasBingAPI = !!BING_API_KEY
  const useAPI = hasGoogleAPI || hasBingAPI
  
  if (!useAPI) {
    console.log('\n⚠️  No API keys configured. Running in MANUAL TEST MODE.')
    console.log('   This mode generates Google search URLs for manual testing.')
    console.log('   ⚠️  IMPORTANT: For Google rankings, manual testing is recommended!')
    console.log('   Google does not provide a public web search API.')
    console.log('\n   Alternative: Bing API (searches Bing, not Google):')
    console.log('   - Set BING_API_KEY for automated Bing search testing')
    console.log('   - Note: Bing results ≠ Google results\n')
  } else {
    if (hasBingAPI) {
      console.log(`\n⚠️  API Mode: Bing Web Search API`)
      console.log('   ⚠️  IMPORTANT: This searches BING, not GOOGLE!')
      console.log('   Bing rankings are different from Google rankings.')
      console.log('   For Google rankings, use MANUAL TEST MODE (no API keys).\n')
    } else if (hasGoogleAPI) {
      console.log(`\n✅ API Mode: Google Custom Search`)
      console.log('   ⚠️  Note: "Search entire web" is deprecated - results may be limited')
      console.log('   This uses Google Custom Search API (different from google.com search)\n')
    }
  }
  
  // Extract keywords
  console.log('\n📝 Extracting keywords...')
  const htmlKeywords = extractKeywordsFromHTML()
  const seoKeywords = extractKeywordsFromSEO()
  
  // Combine and deduplicate
  const allKeywords = [...new Set([...htmlKeywords, ...seoKeywords])]
  console.log(`   Total unique keywords: ${allKeywords.length}`)
  
  if (allKeywords.length === 0) {
    console.error('❌ No keywords found. Exiting.')
    process.exit(1)
  }
  
  // Get test count from command line or use default
  const testCount = parseInt(process.argv[2]) || DEFAULT_TEST_COUNT
  const testKeywords = getBestKeywords(allKeywords, testCount)
  
  console.log(`\n🎯 Testing ${testKeywords.length} BEST/MOST RELEVANT keywords...`)
  console.log(`   (Selected based on relevance scoring, not random)`)
  console.log(`   Keywords: ${testKeywords.map(k => `"${k}"`).join(', ')}\n`)
  
  if (!useAPI) {
    // Manual mode: generate URLs (RECOMMENDED for Google rankings)
    console.log('📋 MANUAL TEST MODE - Google Search URLs\n')
    console.log('   ✅ This is a reliable way to test Google rankings!')
    console.log('   Google does not provide a free public web search API.\n')
    console.log('   💡 Alternative: Use SerpAPI for automated testing:')
    console.log('      npm run setup:serpapi')
    console.log('      npm run test:google-serpapi\n')
    
    const urls = generateManualTestURLs(testKeywords)
    
    urls.forEach((item, index) => {
      console.log(`${index + 1}. "${item.keyword}"`)
      console.log(`   🔍 Google: ${item.google}`)
      console.log(`   🔍 Bing:   ${item.bing}`)
      console.log('')
    })
    
    console.log('\n💡 Instructions for Google Rankings:')
    console.log('   1. Open each Google URL in your browser')
    console.log('   2. Search for "waqasahmad-portfolio.web.app" in the results')
    console.log('   3. Note the position (e.g., #3) and page number (e.g., Page 1)')
    console.log('   4. Record your findings manually')
    console.log('\n   ⚠️  Note: Bing URLs are provided for comparison, but Google rankings are what matter for SEO.')
    console.log('   💡 For automated testing with CAPTCHA handling, use SerpAPI (see above).\n')
    
    return
  }
  
  // API mode: test keywords
  const results = []
  
  for (let i = 0; i < testKeywords.length; i++) {
    const keyword = testKeywords[i]
    console.log(`[${i + 1}/${testKeywords.length}] Testing: "${keyword}"...`)
    
    let result = null
    if (hasBingAPI) {
      result = await testKeywordBing(keyword)
      // Note: This searches Bing, not Google!
    } else if (hasGoogleAPI) {
      result = await testKeywordGoogle(keyword)
    }
    
    if (result) {
      results.push(result)
      if (result.found) {
        console.log(`   ✅ Found at position #${result.position} (Page ${result.pageNumber})`)
      } else {
        console.log(`   ❌ Not found in top results`)
      }
    }
    
    // Rate limiting: wait 1 second between requests
    if (i < testKeywords.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
  
  // Print report
  printReport(results)
  
  // Save report to file
  const reportPath = path.join(PROJECT_ROOT, 'scripts', '.cache', 'keyword-rankings-report.json')
  const reportDir = path.dirname(reportPath)
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true })
  }
  
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    targetSite: TARGET_SITE,
    totalKeywords: allKeywords.length,
    testedKeywords: testKeywords.length,
    results: results
  }, null, 2))
  
  console.log(`\n💾 Report saved to: ${reportPath}`)
}

// Run main function
main().catch(error => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
