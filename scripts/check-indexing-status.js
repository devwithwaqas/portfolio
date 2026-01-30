/**
 * Check Google Indexing Status
 * Verifies if portfolio pages are indexed by Google
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const TARGET_URLS = [
  'https://waqasahmad-portfolio.web.app/',
  'https://waqasahmad-portfolio.web.app/#about',
  'https://waqasahmad-portfolio.web.app/#projects',
  'https://waqasahmad-portfolio.web.app/#services'
]

/**
 * Check if URL is indexed using Google's site: operator via SerpAPI
 */
async function checkIndexed(url, serpApiKey) {
  if (!serpApiKey) {
    return { indexed: null, error: 'No SerpAPI key' }
  }
  
  try {
    const query = encodeURIComponent(`site:${url}`)
    const apiUrl = `https://serpapi.com/search.json?engine=google&q=${query}&api_key=${serpApiKey}`
    
    const response = await fetch(apiUrl)
    const data = await response.json()
    
    if (data.error) {
      return { indexed: null, error: data.error }
    }
    
    const results = data.organic_results || []
    const isIndexed = results.length > 0
    
    return {
      indexed: isIndexed,
      resultCount: results.length,
      firstResult: results[0]?.link || null
    }
  } catch (error) {
    return { indexed: null, error: error.message }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Checking Google Indexing Status')
  console.log('='.repeat(80))
  console.log('')
  
  // Try to get SerpAPI key from env or .env.local
  let serpApiKey = process.env.SERPAPI_KEY || ''
  
  if (!serpApiKey) {
    try {
      const envPath = path.join(__dirname, '..', '.env.local')
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8')
        const match = envContent.match(/SERPAPI_KEY=(.+)/)
        if (match) {
          serpApiKey = match[1].trim()
        }
      }
    } catch (e) {
      // Ignore
    }
  }
  
  console.log('📋 Checking indexing status for portfolio URLs...\n')
  
  for (const url of TARGET_URLS) {
    console.log(`Checking: ${url}`)
    
    if (serpApiKey) {
      const result = await checkIndexed(url, serpApiKey)
      
      if (result.error) {
        console.log(`   ⚠️  Error: ${result.error}`)
      } else if (result.indexed) {
        console.log(`   ✅ Indexed! Found ${result.resultCount} result(s)`)
        if (result.firstResult) {
          console.log(`   First result: ${result.firstResult}`)
        }
      } else {
        console.log(`   ❌ Not indexed (or not found in search)`)
      }
    } else {
      const query = encodeURIComponent(`site:${url}`)
      const manualUrl = `https://www.google.com/search?q=${query}`
      console.log(`   📋 Manual check: ${manualUrl}`)
    }
    
    console.log('')
  }
  
  console.log('='.repeat(80))
  console.log('')
  console.log('💡 Indexing Tips:')
  console.log('   1. Submit sitemap in Google Search Console')
  console.log('   2. Request indexing for important pages')
  console.log('   3. Ensure robots.txt allows crawling')
  console.log('   4. Wait 1-7 days for new content to be indexed')
  console.log('   5. Check: https://search.google.com/search-console')
  console.log('')
  console.log('📊 If keywords were added today:')
  console.log('   - Google needs to re-crawl and re-index')
  console.log('   - This can take 1-7 days')
  console.log('   - Use "Request Indexing" in Search Console to speed up')
  console.log('')
}

main().catch(error => {
  console.error('❌ Error:', error)
  process.exit(1)
})
