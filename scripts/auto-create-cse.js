/**
 * Fully Automated CSE Creation
 * Uses Puppeteer to automate the entire CSE creation process
 */

import puppeteer from 'puppeteer'

const API_KEY = process.env.GOOGLE_API_KEY || ''
const CSE_CREATE_URL = 'https://programmablesearchengine.google.com/controlpanel/create'

console.log('🤖 Fully Automated CSE Creation')
console.log('=' .repeat(50))
console.log('')

async function createCSE() {
  if (!API_KEY) {
    console.error('GOOGLE_API_KEY not set. Do not hardcode API keys in scripts.')
    console.error('Set env: GOOGLE_API_KEY=your-key (or use SerpAPI: npm run test:google-serpapi)')
    process.exit(1)
  }
  console.log('📝 Launching browser...')
  const browser = await puppeteer.launch({ 
    headless: false, // Show browser
    defaultViewport: { width: 1280, height: 800 },
    args: ['--start-maximized']
  })
  
  const page = await browser.newPage()
  
  try {
    console.log('📝 Navigating to CSE creation page...')
    await page.goto(CSE_CREATE_URL, { waitUntil: 'networkidle2', timeout: 30000 })
    
    // Wait a bit for page to fully load
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    console.log('📝 Looking for form elements...')
    
    // Try multiple selectors for the name field
    const nameSelectors = [
      'input[type="text"]',
      'input[name*="name"]',
      'input[placeholder*="name" i]',
      'input[aria-label*="name" i]',
      '#name',
      '[name="name"]'
    ]
    
    let nameField = null
    for (const selector of nameSelectors) {
      try {
        nameField = await page.$(selector)
        if (nameField) {
          console.log(`   Found name field with selector: ${selector}`)
          break
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (nameField) {
      await nameField.click({ clickCount: 3 }) // Select all if there's existing text
      await nameField.type('Portfolio Keyword Test', { delay: 100 })
      console.log('   ✅ Entered name: Portfolio Keyword Test')
    } else {
      console.log('   ⚠️  Could not find name field automatically')
      console.log('   Please enter "Portfolio Keyword Test" manually in the browser')
      await new Promise(resolve => setTimeout(resolve, 10000)) // Wait 10 seconds
    }
    
    // Look for create/submit button
    console.log('📝 Looking for submit button...')
    
    const submitSelectors = [
      'button[type="submit"]',
      'button:has-text("Create")',
      'button:has-text("Next")',
      '[role="button"]:has-text("Create")',
      'button.primary',
      'input[type="submit"]'
    ]
    
    let submitButton = null
    for (const selector of submitSelectors) {
      try {
        const buttons = await page.$$(selector)
        for (const btn of buttons) {
          const text = await page.evaluate(el => el.textContent, btn)
          if (text && (text.includes('Create') || text.includes('Next') || text.includes('Continue'))) {
            submitButton = btn
            console.log(`   Found submit button: ${text}`)
            break
          }
        }
        if (submitButton) break
      } catch (e) {
        // Continue
      }
    }
    
    if (submitButton) {
      await submitButton.click()
      console.log('   ✅ Clicked submit button')
      await new Promise(resolve => setTimeout(resolve, 5000))
    } else {
      console.log('   ⚠️  Could not find submit button automatically')
      console.log('   Please click "Create" or "Next" manually in the browser')
      await new Promise(resolve => setTimeout(resolve, 15000)) // Wait 15 seconds
    }
    
    // Wait for redirect or CSE ID to appear
    console.log('⏳ Waiting for CSE creation to complete...')
    await new Promise(resolve => setTimeout(resolve, 5000))
    
    // Try to extract CSE ID from current page
    const currentUrl = page.url()
    console.log(`   Current URL: ${currentUrl}`)
    
    // Method 1: Extract from URL
    let cseId = null
    const urlMatch = currentUrl.match(/[?&]cx=([^&]+)/) || currentUrl.match(/\/cse\/([^\/\?]+)/)
    if (urlMatch) {
      cseId = decodeURIComponent(urlMatch[1])
      console.log(`   ✅ Found CSE ID in URL: ${cseId}`)
    }
    
    // Method 2: Extract from page content
    if (!cseId) {
      console.log('   Searching page content for CSE ID...')
      const pageContent = await page.content()
      
      // Look for patterns like: cx="..." or Search Engine ID: ...
      const patterns = [
        /cx["\s:=]+([a-z0-9:]{20,})/i,
        /Search Engine ID[:\s]+([a-z0-9:]{20,})/i,
        /Engine ID[:\s]+([a-z0-9:]{20,})/i,
        /"([a-z0-9]{10,}:[a-z0-9]{10,})"/i
      ]
      
      for (const pattern of patterns) {
        const match = pageContent.match(pattern)
        if (match && match[1]) {
          cseId = match[1]
          console.log(`   ✅ Found CSE ID in page: ${cseId}`)
          break
        }
      }
    }
    
    // Method 3: Look for specific text elements
    if (!cseId) {
      try {
        const textElements = await page.$$eval('*', elements => 
          elements.map(el => el.textContent).filter(text => 
            text && /[a-z0-9]{10,}:[a-z0-9]{10,}/i.test(text)
          )
        )
        
        for (const text of textElements) {
          const match = text.match(/([a-z0-9]{10,}:[a-z0-9]{10,})/i)
          if (match) {
            cseId = match[1]
            console.log(`   ✅ Found CSE ID in text: ${cseId}`)
            break
          }
        }
      } catch (e) {
        // Ignore
      }
    }
    
    if (cseId) {
      console.log('')
      console.log('✅ CSE Created Successfully!')
      console.log(`   CSE ID: ${cseId}`)
      console.log('')
      
      // Keep browser open briefly to show result
      await new Promise(resolve => setTimeout(resolve, 3000))
      await browser.close()
      
      return cseId
    } else {
      console.log('')
      console.log('⚠️  Could not automatically extract CSE ID')
      console.log('   The browser will stay open - please:')
      console.log('   1. Complete the CSE creation if not done')
      console.log('   2. Find the CSE ID (usually shown after creation)')
      console.log('   3. Copy it and paste below')
      console.log('')
      
      // Keep browser open
      const readline = (await import('readline')).default
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })
      
      return new Promise((resolve) => {
        rl.question('   Paste CSE ID here: ', (id) => {
          rl.close()
          setTimeout(() => browser.close(), 1000)
          resolve(id.trim())
        })
      })
    }
    
  } catch (error) {
    console.error('')
    console.error('❌ Error during automation:', error.message)
    console.log('')
    console.log('⚠️  Falling back to manual creation')
    console.log('   Browser is open - please complete manually:')
    console.log('   1. Name: Portfolio Keyword Test')
    console.log('   2. Sites to search: Leave EMPTY')
    console.log('   3. Click Create')
    console.log('   4. Copy the CSE ID')
    console.log('')
    
    const readline = (await import('readline')).default
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    
    return new Promise((resolve) => {
      rl.question('   Paste CSE ID here: ', (id) => {
        rl.close()
        setTimeout(() => browser.close(), 1000)
        resolve(id.trim())
      })
    })
  }
}

// Run automation
createCSE()
  .then(cseId => {
    if (cseId) {
      console.log('')
      console.log('=' .repeat(50))
      console.log('✅ Setup Complete!')
      console.log('')
      console.log('Setting environment variables...')
      
      process.env.GOOGLE_CSE_ID = cseId
      process.env.GOOGLE_API_KEY = API_KEY
      
      console.log(`   GOOGLE_CSE_ID = ${cseId}`)
      console.log(`   GOOGLE_API_KEY = ${API_KEY ? API_KEY.substring(0, 10) + '...' : '(not set)'}`)
      console.log('')
      console.log('Running keyword ranking test...')
      console.log('=' .repeat(50))
      console.log('')
      
      // Import and run test
      import('./test-keyword-rankings.js')
        .catch(err => {
          console.error('Error:', err.message)
          process.exit(1)
        })
    }
  })
  .catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
