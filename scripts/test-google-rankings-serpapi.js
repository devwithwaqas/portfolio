/**
 * Google Search Ranking Test - Using SerpAPI (Authentic Method)
 * 
 * SerpAPI is an official Google search API service that handles:
 * - CAPTCHA solving automatically
 * - Rate limiting
 * - Real Google search results
 * 
 * Usage:
 *   npm run test:google-serpapi
 * 
 * Setup:
 *   1. Get free API key: https://serpapi.com/users/sign_up
 *   2. Free tier: 100 searches/month
 *   3. Set env var: SERPAPI_KEY=your-key
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
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

// Test Configuration
const DEFAULT_TEST_COUNT = 10
const MAX_PAGES_TO_SEARCH = 10
const RESULTS_PER_PAGE = 10

// API Key from environment or .env.local
let SERPAPI_KEY = process.env.SERPAPI_KEY || ''

// Try to load from .env.local if not in environment
if (!SERPAPI_KEY) {
  try {
    const envPath = path.join(PROJECT_ROOT, '.env.local')
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8')
      const match = envContent.match(/SERPAPI_KEY=(.+)/)
      if (match) {
        SERPAPI_KEY = match[1].trim()
      }
    }
  } catch (e) {
    // Ignore if can't read .env.local
  }
}

/**
 * Extract keywords from index.html
 */
function extractKeywordsFromHTML() {
  const htmlPath = path.join(PROJECT_ROOT, 'index.html')
  const html = fs.readFileSync(htmlPath, 'utf-8')
  
  const keywordsMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i)
  if (!keywordsMatch) {
    console.error('❌ Could not find keywords in index.html')
    return []
  }
  
  const keywordsString = keywordsMatch[1]
  const keywords = keywordsString
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 0)
    .filter(k => !k.includes('http'))
  
  console.log(`📝 Extracted ${keywords.length} keywords from index.html`)
  return keywords
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
 * Search Google using SerpAPI
 */
async function searchGoogleSerpAPI(keyword, start = 0) {
  if (!SERPAPI_KEY) {
    throw new Error('SERPAPI_KEY environment variable not set')
  }
  
  const query = encodeURIComponent(keyword)
  const url = `https://serpapi.com/search.json?engine=google&q=${query}&api_key=${SERPAPI_KEY}&start=${start}&num=${RESULTS_PER_PAGE}`
  
  const response = await fetch(url)
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`)
  }
  
  return data
}

/**
 * Test keyword and find portfolio position
 */
async function testKeyword(keyword, maxPages = MAX_PAGES_TO_SEARCH) {
  console.log(`   Searching Google for: "${keyword}"...`)
  
  let found = false
  let position = null
  let pageNumber = null
  let foundUrl = null
  let totalResults = 0
  
  for (let page = 0; page < maxPages; page++) {
    const start = page * RESULTS_PER_PAGE
    
    try {
      console.log(`      Checking page ${page + 1}... (results ${start + 1}-${start + RESULTS_PER_PAGE})`)
      
      const data = await searchGoogleSerpAPI(keyword, start)
      
      if (data.search_information) {
        totalResults = parseInt(data.search_information.total_results) || 0
      }
      
      const organicResults = data.organic_results || []
      
      if (organicResults.length === 0) {
        console.log(`      Reached end of results`)
        break
      }
      
      // Check each result for our site
      for (let i = 0; i < organicResults.length; i++) {
        const result = organicResults[i]
        const resultUrl = (result.link || '').toLowerCase()
        
        // Check if any target URL matches
        const matches = TARGET_URLS.some(target => 
          resultUrl.includes(target.toLowerCase())
        )
        
        if (matches) {
          found = true
          position = start + i + 1 // Global position
          pageNumber = page + 1
          foundUrl = result.link
          console.log(`      ✅ Found at position #${position} (Page ${pageNumber})`)
          break
        }
      }
      
      if (found) {
        break
      }
      
      // Rate limiting: wait 1 second between pages
      if (page < maxPages - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
    } catch (error) {
      console.error(`      ❌ Error on page ${page + 1}:`, error.message)
      if (error.message.includes('Invalid API key') || error.message.includes('quota')) {
        throw error // Stop if API key issue
      }
      break
    }
  }
  
  return {
    keyword,
    found,
    position,
    pageNumber,
    url: foundUrl,
    totalResults,
    searchedPages: Math.min(maxPages, pageNumber || maxPages)
  }
}

/**
 * Print results report
 */
function printReport(results) {
  console.log('\n' + '='.repeat(80))
  console.log('📊 GOOGLE RANKING TEST REPORT (SerpAPI)')
  console.log('='.repeat(80))
  
  const found = results.filter(r => r.found)
  const notFound = results.filter(r => !r.found)
  
  console.log(`\n📈 Summary:`)
  console.log(`   Total Keywords Tested: ${results.length}`)
  console.log(`   ✅ Found: ${found.length} (${((found.length / results.length) * 100).toFixed(1)}%)`)
  console.log(`   ❌ Not Found: ${notFound.length}`)
  
  if (found.length > 0) {
    console.log(`\n✅ FOUND KEYWORDS:`)
    console.log('-'.repeat(80))
    
    found.forEach((result, index) => {
      console.log(`\n${index + 1}. "${result.keyword}"`)
      console.log(`   Position: #${result.position} (Page ${result.pageNumber})`)
      if (result.totalResults) {
        console.log(`   Total Results: ${result.totalResults.toLocaleString()}`)
      }
      if (result.url) {
        console.log(`   URL: ${result.url}`)
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
      console.log(`${index + 1}. "${result.keyword}" (searched ${result.searchedPages} pages)`)
    })
  }
  
  console.log('\n' + '='.repeat(80))
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Google Ranking Test - SerpAPI (Authentic Method)')
  console.log('='.repeat(80))
  console.log('')
  
  if (!SERPAPI_KEY) {
    console.log('❌ SERPAPI_KEY environment variable not set!')
    console.log('')
    console.log('Setup:')
    console.log('  1. Get free API key: https://serpapi.com/users/sign_up')
    console.log('  2. Free tier: 100 searches/month')
    console.log('  3. Set environment variable:')
    console.log('     PowerShell: $env:SERPAPI_KEY="your-key"')
    console.log('     CMD: set SERPAPI_KEY=your-key')
    console.log('     Linux/Mac: export SERPAPI_KEY="your-key"')
    console.log('')
    console.log('Or save to .env.local:')
    console.log('  SERPAPI_KEY=your-key')
    console.log('')
    process.exit(1)
  }
  
  console.log('✅ SerpAPI key configured')
  console.log('   This uses authentic Google search API (handles CAPTCHA automatically)')
  console.log('')
  
  // Extract keywords
  console.log('📝 Extracting keywords...')
  const keywords = extractKeywordsFromHTML()
  
  if (keywords.length === 0) {
    console.error('❌ No keywords found. Exiting.')
    process.exit(1)
  }
  
  // Get test count from command line or use default
  const testCount = parseInt(process.argv[2]) || DEFAULT_TEST_COUNT
  const testKeywords = getBestKeywords(keywords, testCount)
  
  console.log(`\n🎯 Testing ${testKeywords.length} BEST/MOST RELEVANT keywords...`)
  console.log(`   (Selected based on relevance scoring, not random)`)
  console.log(`   Keywords: ${testKeywords.map(k => `"${k}"`).join(', ')}\n`)
  console.log(`   Max pages per keyword: ${MAX_PAGES_TO_SEARCH} (${MAX_PAGES_TO_SEARCH * RESULTS_PER_PAGE} results max)\n`)
  
  // Test keywords
  const results = []
  
  for (let i = 0; i < testKeywords.length; i++) {
    const keyword = testKeywords[i]
    console.log(`[${i + 1}/${testKeywords.length}] Testing: "${keyword}"...`)
    
    try {
      const result = await testKeyword(keyword, MAX_PAGES_TO_SEARCH)
      results.push(result)
      
      if (result.found) {
        console.log(`   ✅ Found at position #${result.position} (Page ${result.pageNumber})`)
      } else {
        console.log(`   ❌ Not found in top ${result.searchedPages * RESULTS_PER_PAGE} results`)
      }
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`)
      results.push({
        keyword,
        found: false,
        error: error.message
      })
    }
    
    // Delay between keywords
    if (i < testKeywords.length - 1) {
      console.log(`   ⏳ Waiting 1 second before next keyword...\n`)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
  
  // Print report
  printReport(results)
  
  // Save report to file
  const reportPath = path.join(PROJECT_ROOT, 'scripts', '.cache', 'google-rankings-serpapi-report.json')
  const reportDir = path.dirname(reportPath)
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true })
  }
  
  // Save detailed report
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    targetSite: TARGET_SITE,
    totalKeywords: keywords.length,
    testedKeywords: testKeywords.length,
    maxPagesSearched: MAX_PAGES_TO_SEARCH,
    note: 'These are the TOP 10 MOST RELEVANT keywords (not random) - tracked for SEO improvements',
    keywords: testKeywords,
    results: results
  }, null, 2))
  
  console.log(`\n💾 Report saved to: ${reportPath}`)
  
  // Also save tracking keywords list
  const trackingFile = path.join(PROJECT_ROOT, 'scripts', '.cache', 'tracking-keywords.json')
  fs.writeFileSync(trackingFile, JSON.stringify({
    timestamp: new Date().toISOString(),
    description: 'Top 10 most relevant keywords for SEO tracking',
    keywords: testKeywords
  }, null, 2))
  
  console.log(`💾 Tracking keywords saved to: ${trackingFile}`)
}

// Run main function
main().catch(error => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
