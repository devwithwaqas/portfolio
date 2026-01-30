/**
 * Automated Custom Search Engine Creation
 * Uses Puppeteer to automate CSE creation via browser
 */

import puppeteer from 'puppeteer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const API_KEY = 'AIzaSyAmIX_YGbwJGtvazRucyq1ZDrnbvAWlTPQ'
const CSE_URL = 'https://programmablesearchengine.google.com/controlpanel/create'

console.log('🤖 Starting automated CSE creation...')
console.log('   This will open a browser and automate the process\n')

async function createCSE() {
  const browser = await puppeteer.launch({ 
    headless: false, // Show browser so user can see what's happening
    defaultViewport: { width: 1280, height: 720 }
  })
  
  try {
    const page = await browser.newPage()
    
    console.log('📝 Navigating to CSE creation page...')
    await page.goto(CSE_URL, { waitUntil: 'networkidle2' })
    
    // Wait for the form to load
    await page.waitForTimeout(2000)
    
    console.log('📝 Filling in CSE details...')
    
    // Fill in the search engine name
    const nameSelector = 'input[type="text"], input[name*="name"], input[placeholder*="name" i]'
    await page.waitForSelector(nameSelector, { timeout: 10000 })
    await page.type(nameSelector, 'Portfolio Keyword Test', { delay: 50 })
    
    // Leave "Sites to search" empty (searches entire web)
    // This field might not exist or might be optional
    
    console.log('📝 Submitting form...')
    
    // Look for create/submit button
    const submitButton = await page.$('button[type="submit"], button:has-text("Create"), button:has-text("Next"), [role="button"]:has-text("Create")')
    
    if (submitButton) {
      await submitButton.click()
      console.log('✅ Form submitted!')
    } else {
      console.log('⚠️  Could not find submit button. Please complete manually.')
      console.log('   The browser is open - please complete the form manually.')
      await page.waitForTimeout(30000) // Wait 30 seconds for manual completion
    }
    
    // Wait for the CSE to be created and get the ID
    console.log('⏳ Waiting for CSE creation...')
    await page.waitForTimeout(5000)
    
    // Try to extract CSE ID from the page
    const currentUrl = page.url()
    console.log('   Current URL:', currentUrl)
    
    // CSE ID might be in the URL or on the page
    const cseIdMatch = currentUrl.match(/cx=([^&]+)/) || currentUrl.match(/\/cse\/([^\/]+)/)
    
    if (cseIdMatch) {
      const cseId = cseIdMatch[1]
      console.log(`\n✅ CSE Created!`)
      console.log(`   CSE ID: ${cseId}`)
      return cseId
    } else {
      // Try to find it in page content
      const pageContent = await page.content()
      const idMatch = pageContent.match(/cx["\s:=]+([a-z0-9:]+)/i)
      
      if (idMatch) {
        const cseId = idMatch[1]
        console.log(`\n✅ CSE Created!`)
        console.log(`   CSE ID: ${cseId}`)
        return cseId
      } else {
        console.log('\n⚠️  Could not automatically extract CSE ID.')
        console.log('   Please copy the CSE ID from the page and paste it here:')
        
        // Keep browser open for user to copy CSE ID
        const readline = (await import('readline')).default
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        })
        
        return new Promise((resolve) => {
          rl.question('   CSE ID: ', (cseId) => {
            rl.close()
            resolve(cseId.trim())
          })
        })
      }
    }
  } catch (error) {
    console.error('❌ Error during automation:', error.message)
    console.log('\n⚠️  Falling back to manual creation.')
    console.log('   Please visit: https://programmablesearchengine.google.com/controlpanel/create')
    console.log('   Create a CSE with:')
    console.log('   - Name: Portfolio Keyword Test')
    console.log('   - Sites to search: Leave EMPTY')
    console.log('   - Copy the CSE ID after creation\n')
    
    const readline = (await import('readline')).default
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    
    return new Promise((resolve) => {
      rl.question('   Paste CSE ID here: ', (cseId) => {
        rl.close()
        resolve(cseId.trim())
      })
    })
  } finally {
    // Don't close browser immediately - let user see the result
    console.log('\n💡 Browser will stay open for 10 seconds...')
    await new Promise(resolve => setTimeout(resolve, 10000))
    await browser.close()
  }
}

// Run the automation
createCSE()
  .then(cseId => {
    if (cseId) {
      console.log(`\n✅ Setup Complete!`)
      console.log(`   API Key: ${API_KEY}`)
      console.log(`   CSE ID: ${cseId}`)
      console.log(`\n💾 Setting environment variables...`)
      
      // Set environment variables
      process.env.GOOGLE_CSE_ID = cseId
      process.env.GOOGLE_API_KEY = API_KEY
      
      console.log(`   ✅ Environment variables set!`)
      console.log(`\n🧪 Running test...\n`)
      
      // Import and run the test script
      import('./test-keyword-rankings.js')
        .then(() => {
          console.log('\n✅ All done!')
        })
        .catch(err => {
          console.error('Error running test:', err)
        })
    }
  })
  .catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
