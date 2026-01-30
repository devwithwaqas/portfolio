/**
 * Google Search Ranking Test - Web Crawling Method
 * Crawls actual Google search results to find portfolio rankings
 * 
 * Usage:
 *   npm run test:google-rankings
 * 
 * This crawls Google.com search results directly (no API needed)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'

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
const DELAY_BETWEEN_REQUESTS = 2000 // 2 seconds to avoid rate limiting

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
 * Get random sample of keywords
 */
function getRandomKeywords(keywords, count = DEFAULT_TEST_COUNT) {
  if (keywords.length <= count) {
    return keywords
  }
  
  const shuffled = [...keywords].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

/**
 * Parse Google search results from HTML
 */
function parseGoogleResults(html) {
  const results = []
  const seenUrls = new Set()
  
  // Google uses various patterns, try multiple approaches
  
  // Pattern 1: Look for result containers with class "g" or "tF2Cxc"
  // Modern Google: <div class="g"> or <div class="tF2Cxc">
  const resultPatterns = [
    /<div[^>]*class=["'][^"']*\bg\b[^"']*["'][^>]*>[\s\S]*?<a[^>]+href=["']([^"']+)["']/gi,
    /<div[^>]*class=["'][^"']*tF2Cxc[^"']*["'][^>]*>[\s\S]*?<a[^>]+href=["']([^"']+)["']/gi,
    /<h3[^>]*>[\s\S]*?<a[^>]+href=["']([^"']+)["']/gi,
  ]
  
  for (const pattern of resultPatterns) {
    let match
    while ((match = pattern.exec(html)) !== null) {
      let url = match[1]
      
      // Handle Google redirect URLs
      if (url.startsWith('/url?q=')) {
        const decoded = decodeURIComponent(url)
        const urlMatch = decoded.match(/url=([^&]+)/)
        if (urlMatch) {
          url = urlMatch[1]
        }
      }
      
      // Filter valid external URLs
      if (url && 
          url.startsWith('http') && 
          !url.includes('google.com') &&
          !url.includes('googleusercontent.com') &&
          !url.includes('gstatic.com') &&
          !seenUrls.has(url)) {
        seenUrls.add(url)
        results.push({
          url: url,
          position: results.length + 1
        })
      }
    }
    
    if (results.length > 0) break // Use first pattern that finds results
  }
  
  // Pattern 2: Look for all links and filter (fallback)
  if (results.length === 0) {
    const linkPattern = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi
    let match
    
    while ((match = linkPattern.exec(html)) !== null && results.length < 20) {
      let url = match[1]
      
      // Handle Google redirect
      if (url.startsWith('/url?q=')) {
        const decoded = decodeURIComponent(url)
        const urlMatch = decoded.match(/url=([^&]+)/)
        if (urlMatch) {
          url = urlMatch[1]
        }
      }
      
      if (url && 
          url.startsWith('http') && 
          !url.includes('google.com') &&
          !url.includes('googleusercontent.com') &&
          !url.includes('gstatic.com') &&
          !url.includes('youtube.com') && // Filter common non-result links
          !url.includes('facebook.com') &&
          !url.includes('twitter.com') &&
          !seenUrls.has(url)) {
        seenUrls.add(url)
        results.push({
          url: url,
          position: results.length + 1
        })
      }
    }
  }
  
  return results
}

/**
 * Search Google for a keyword and find portfolio position using Puppeteer
 */
async function searchGoogleForKeyword(keyword, maxPages = MAX_PAGES_TO_SEARCH, browser) {
  console.log(`   Searching Google for: "${keyword}"...`)
  
  const page = await browser.newPage()
  
  try {
    // Set viewport and user agent (stealth mode)
    await page.setViewport({ width: 1920, height: 1080 })
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    
    // Remove webdriver property
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
      })
    })
    
    // Add Chrome property
    await page.evaluateOnNewDocument(() => {
      window.chrome = {
        runtime: {},
      }
    })
    
    // Override permissions
    await page.evaluateOnNewDocument(() => {
      const originalQuery = window.navigator.permissions.query
      window.navigator.permissions.query = (parameters) => (
        parameters.name === 'notifications' ?
          Promise.resolve({ state: Notification.permission }) :
          originalQuery(parameters)
      )
    })
    
    let found = false
    let position = null
    let pageNumber = null
    let foundUrl = null
    
    for (let pageNum = 0; pageNum < maxPages; pageNum++) {
      const start = pageNum * RESULTS_PER_PAGE
      const query = encodeURIComponent(keyword)
      const url = `https://www.google.com/search?q=${query}&start=${start}&num=${RESULTS_PER_PAGE}`
      
      // Add delay to avoid rate limiting
      if (pageNum > 0) {
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_REQUESTS))
      }
      
      console.log(`      Checking page ${pageNum + 1}... (results ${start + 1}-${start + RESULTS_PER_PAGE})`)
      
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
        
        // Wait for results to load
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Wait a bit more for results to render
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Extract result URLs from the page - simpler approach
        const results = await page.evaluate(() => {
          const resultLinks = []
          const seenUrls = new Set()
          
          // Get all links with href
          const allLinks = Array.from(document.querySelectorAll('a[href]'))
          
          for (const link of allLinks) {
            let url = link.getAttribute('href') || link.href
            
            if (!url) continue
            
            // Handle relative URLs that start with /url
            if (url.startsWith('/url?q=')) {
              try {
                const urlMatch = url.match(/url\?q=([^&]+)/)
                if (urlMatch) {
                  url = decodeURIComponent(urlMatch[1])
                }
              } catch (e) {
                continue
              }
            }
            
            // Handle full Google redirect URLs
            if (url.includes('google.com/url?q=')) {
              try {
                const urlMatch = url.match(/url\?q=([^&]+)/)
                if (urlMatch) {
                  url = decodeURIComponent(urlMatch[1])
                }
              } catch (e) {
                continue
              }
            }
            
            // Must be http/https
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
              continue
            }
            
            // Skip Google domains
            const urlLower = url.toLowerCase()
            if (urlLower.includes('google.') || 
                urlLower.includes('youtube.com') ||
                urlLower.includes('gmail.com') ||
                urlLower.includes('blogger.com')) {
              continue
            }
            
            // Check if link is in a result container (div.g, div with data-ved, etc.)
            let element = link
            let foundContainer = false
            for (let i = 0; i < 6; i++) {
              if (!element) break
              
              const className = element.className || ''
              const hasDataVed = element.hasAttribute('data-ved')
              
              if (className.includes(' g ') || 
                  className === 'g' ||
                  className.includes('tF2Cxc') ||
                  className.includes('yuRUbf') ||
                  hasDataVed) {
                foundContainer = true
                break
              }
              
              element = element.parentElement
            }
            
            // Add if in result container or if it's a valid external URL
            if (foundContainer || (url.match(/^https?:\/\/[^\/]+\.[a-z]{2,}/) && !seenUrls.has(url))) {
              seenUrls.add(url)
              resultLinks.push(url)
              
              if (resultLinks.length >= 10) break
            }
          }
          
          return resultLinks
        })
        
        // Debug: log what we found
        if (results.length > 0) {
          console.log(`      Found ${results.length} result URLs`)
        } else {
          // Try to see what's on the page
          const pageTitle = await page.title()
          console.log(`      Page title: ${pageTitle}`)
          const hasResults = await page.evaluate(() => {
            return document.querySelector('div.g, div[data-ved], #search') !== null
          })
          console.log(`      Has result containers: ${hasResults}`)
        }
        
        if (results.length === 0) {
          console.log(`      ⚠️  No results found on page ${pageNum + 1}`)
          break
        }
        
        console.log(`      Found ${results.length} results on page ${pageNum + 1}`)
        
        // Check each result for our site
        for (let i = 0; i < results.length; i++) {
          const resultUrl = results[i].toLowerCase()
          
          // Check if any target URL matches
          const matches = TARGET_URLS.some(target => 
            resultUrl.includes(target.toLowerCase())
          )
          
          if (matches) {
            found = true
            position = start + i + 1 // Global position across all pages
            pageNumber = pageNum + 1
            foundUrl = results[i]
            console.log(`      ✅ Found at position #${position} (Page ${pageNumber})`)
            break
          }
        }
        
        if (found) {
          break
        }
        
        // If we got fewer results than expected, we've reached the end
        if (results.length < RESULTS_PER_PAGE) {
          console.log(`      Reached end of results (only ${results.length} results on this page)`)
          break
        }
        
      } catch (error) {
        console.error(`      ❌ Error on page ${pageNum + 1}:`, error.message)
        if (error.message.includes('timeout') || error.message.includes('Navigation')) {
          console.log(`      ⚠️  Page load timeout. Continuing...`)
          continue
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
      searchedPages: Math.min(maxPages, pageNumber || maxPages)
    }
    
  } finally {
    await page.close()
  }
}

/**
 * Print results report
 */
function printReport(results) {
  console.log('\n' + '='.repeat(80))
  console.log('📊 GOOGLE RANKING TEST REPORT (Crawled Results)')
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
      console.log(`   Position: #${result.position} (Page ${result.pagesNumber})`)
      if (result.url) {
        console.log(`   URL: ${result.url}`)
      }
      console.log(`   Pages Searched: ${result.searchedPages}`)
      if (result.pageNumber) {
        console.log(`   Page Number: ${result.pageNumber}`)
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
  console.log('🔍 Google Ranking Test - Web Crawling Method')
  console.log('='.repeat(80))
  console.log('')
  console.log('⚠️  This crawls Google.com search results directly.')
  console.log('   Be respectful: 2 second delay between requests.')
  console.log('   Google may block if too many requests are made.\n')
  
  // Extract keywords
  console.log('📝 Extracting keywords...')
  const keywords = extractKeywordsFromHTML()
  
  if (keywords.length === 0) {
    console.error('❌ No keywords found. Exiting.')
    process.exit(1)
  }
  
  // Get test count from command line or use default
  const testCount = parseInt(process.argv[2]) || DEFAULT_TEST_COUNT
  const testKeywords = getRandomKeywords(keywords, testCount)
  
  console.log(`\n🎲 Testing ${testKeywords.length} random keywords...`)
  console.log(`   Keywords: ${testKeywords.map(k => `"${k}"`).join(', ')}\n`)
  console.log(`   Max pages per keyword: ${MAX_PAGES_TO_SEARCH} (${MAX_PAGES_TO_SEARCH * RESULTS_PER_PAGE} results max)\n`)
  
  // Launch browser with stealth options
  console.log('🌐 Launching browser...')
  const browser = await puppeteer.launch({ 
    headless: false, // Set to false to see what's happening (can change to true later)
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  })
  
  try {
    // Test keywords
    const results = []
    
    for (let i = 0; i < testKeywords.length; i++) {
      const keyword = testKeywords[i]
      console.log(`[${i + 1}/${testKeywords.length}] Testing: "${keyword}"...`)
      
      const result = await searchGoogleForKeyword(keyword, MAX_PAGES_TO_SEARCH, browser)
      results.push(result)
      
      if (result.found) {
        console.log(`   ✅ Found at position #${result.position} (Page ${result.pageNumber})`)
      } else {
        console.log(`   ❌ Not found in top ${result.searchedPages * RESULTS_PER_PAGE} results`)
      }
      
      // Delay between keywords to avoid rate limiting
      if (i < testKeywords.length - 1) {
        console.log(`   ⏳ Waiting ${DELAY_BETWEEN_REQUESTS / 1000} seconds before next keyword...\n`)
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_REQUESTS))
      }
    }
    
    // Print report
    printReport(results)
    
    // Save report to file (in git-ignored .cache directory)
    const reportPath = path.join(PROJECT_ROOT, 'scripts', '.cache', 'google-rankings-crawl-report.json')
    const reportDir = path.dirname(reportPath)
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true })
    }
    
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      targetSite: TARGET_SITE,
      totalKeywords: keywords.length,
      testedKeywords: testKeywords.length,
      maxPagesSearched: MAX_PAGES_TO_SEARCH,
      results: results
    }, null, 2))
    
    console.log(`\n💾 Report saved to: ${reportPath}`)
    
  } finally {
    await browser.close()
  }
}

// Run main function
main().catch(error => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
