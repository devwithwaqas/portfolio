/**
 * Save the 10 best tracking keywords to a file
 * These are the keywords we'll track over time
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getBestKeywordsBalanced } from './keyword-scorer.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')

// Extract keywords from index.html
function extractKeywordsFromHTML() {
  const htmlPath = path.join(PROJECT_ROOT, 'index.html')
  const html = fs.readFileSync(htmlPath, 'utf-8')
  
  const keywordsMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i)
  if (!keywordsMatch) {
    return []
  }
  
  const keywordsString = keywordsMatch[1]
  const keywords = keywordsString
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 0)
    .filter(k => !k.includes('http'))
  
  return keywords
}

// Get best keywords
const allKeywords = extractKeywordsFromHTML()
const trackingKeywords = getBestKeywordsBalanced(allKeywords, 10)

// Save to file
const trackingFile = path.join(PROJECT_ROOT, 'scripts', '.cache', 'tracking-keywords.json')
const trackingDir = path.dirname(trackingFile)
if (!fs.existsSync(trackingDir)) {
  fs.mkdirSync(trackingDir, { recursive: true })
}

const data = {
  timestamp: new Date().toISOString(),
  description: 'Top 10 most relevant keywords for SEO tracking. These keywords are tested regularly to track ranking improvements.',
  keywords: trackingKeywords,
  categories: {
    nameBased: trackingKeywords.filter(k => k.includes('Waqas Ahmad') && !k.includes('AirAsia') && !k.includes('Microsoft') && !k.includes('BAT')),
    companyBased: trackingKeywords.filter(k => k.includes('AirAsia') || k.includes('Microsoft') || k.includes('BAT')),
    technologyBased: trackingKeywords.filter(k => k.includes('.NET') || k.includes('Azure')),
    roleBased: trackingKeywords.filter(k => k.includes('engineer') || k.includes('lead') || k.includes('consultant'))
  }
}

fs.writeFileSync(trackingFile, JSON.stringify(data, null, 2))

console.log('✅ Tracking keywords saved to:', trackingFile)
console.log('\n📋 Top 10 Tracking Keywords:')
trackingKeywords.forEach((kw, i) => {
  console.log(`   ${i + 1}. "${kw}"`)
})
