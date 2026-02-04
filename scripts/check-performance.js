/**
 * Performance Check Script - Opens PageSpeed Insights
 * 
 * This script opens Google PageSpeed Insights in your browser with your URL pre-filled
 * Much faster than running Lighthouse locally and avoids Chrome setup issues
 * 
 * Usage: node scripts/check-performance.js [url]
 * Example: node scripts/check-performance.js https://devwithwaqas.github.io/portfolio/
 * 
 * If no URL is provided, it will use the default production URL
 */

const { exec } = require('child_process')

const DEFAULT_URL = 'https://devwithwaqas.github.io/portfolio/'

// Get URL from command line or use default
const targetUrl = process.argv[2] || DEFAULT_URL

// Ensure URL is properly formatted
const url = targetUrl.endsWith('/') ? targetUrl : targetUrl + '/'

// PageSpeed Insights URL
const PSI_URL = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(url)}`

console.log('🚀 Performance Check Tool')
console.log('='.repeat(60))
console.log(`📊 Opening PageSpeed Insights for: ${url}`)
console.log('\n⏳ This will open Google PageSpeed Insights in your default browser...')
console.log('   PageSpeed Insights will analyze your site and show detailed performance metrics.')
console.log('\n🔗 Direct link:')
console.log(`   ${PSI_URL}\n`)

// Open in browser based on OS
function openBrowser(url) {
  const platform = process.platform
  
  let command
  if (platform === 'win32') {
    command = `start "" "${url}"`
  } else if (platform === 'darwin') {
    command = `open "${url}"`
  } else {
    command = `xdg-open "${url}"`
  }
  
  exec(command, (error) => {
    if (error) {
      console.error('❌ Could not open browser automatically')
      console.error(`   Please open this URL manually: ${PSI_URL}`)
      return
    }
    
    console.log('✅ Opening PageSpeed Insights in your browser...')
    console.log('\n💡 Tips:')
    console.log('   - PageSpeed Insights will analyze both mobile and desktop performance')
    console.log('   - Results typically appear in 10-30 seconds')
    console.log('   - You\'ll see detailed metrics, opportunities, and diagnostics')
    console.log('   - No API limits - use this as often as you need!')
    console.log('\n📄 The report will show:')
    console.log('   • Performance scores (mobile & desktop)')
    console.log('   • Core Web Vitals (LCP, FID, CLS)')
    console.log('   • Opportunities to improve performance')
    console.log('   • Diagnostics and recommendations')
  })
}

// Run if called directly
if (require.main === module) {
  openBrowser(PSI_URL)
}

module.exports = { openBrowser, PSI_URL }
