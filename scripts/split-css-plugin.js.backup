/**
 * Vite Plugin: Split Mobile/Desktop CSS
 * 
 * CRITICAL: Preserves CSS order/sequence - this is essential for cascade to work correctly
 * 
 * Strategy:
 * 1. Parse CSS files in import order (font-sizes.css → main.css)
 * 2. Extract mobile rules (@media (max-width: 768px)) to mobile.css
 * 3. Extract desktop rules (@media (min-width: 769px)) to desktop.css
 * 4. Keep shared rules (no media queries, @keyframes, :root) in main.css
 * 5. Preserve original sequence within each file
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// CSS files to process (in import order - CRITICAL!)
const CSS_FILES = [
  'src/assets/css/font-sizes.css',
  'src/assets/css/main.css'
]

// Breakpoint for mobile/desktop split
const MOBILE_BREAKPOINT = 768

/**
 * Parse CSS and split into mobile/desktop/shared while preserving order
 */
function parseAndSplitCSS(cssContent, filePath) {
  const shared = []      // Rules without media queries (including :root, @keyframes)
  const mobile = []      // Mobile media queries (max-width: 768px)
  const desktop = []     // Desktop media queries (min-width: 769px)
  const other = []       // Other media queries (pointer, prefers-reduced-motion, etc.)
  
  let currentMedia = null
  let currentMediaContent = []
  let inMediaQuery = false
  let braceDepth = 0
  let currentRule = ''
  
  const lines = cssContent.split('\n')
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    
    // Detect @media queries
    if (trimmed.startsWith('@media')) {
      // Save previous rule if any
      if (currentRule.trim()) {
        if (inMediaQuery) {
          currentMediaContent.push(currentRule)
        } else {
          shared.push(currentRule)
        }
        currentRule = ''
      }
      
      // Extract media query
      const mediaMatch = line.match(/@media\s+([^{]+)/)
      if (mediaMatch) {
        currentMedia = mediaMatch[1].trim()
        inMediaQuery = true
        braceDepth = 0
        currentMediaContent = []
        
        // Check if it's mobile, desktop, or other
        // Mobile: max-width <= 768px or (pointer: coarse) or (max-width: 1199px)
        const isMobile = (
          (/max-width:\s*(\d+)px/.test(currentMedia) && 
           parseInt(currentMedia.match(/max-width:\s*(\d+)px/)[1]) <= MOBILE_BREAKPOINT) ||
          /max-width:\s*1199px/.test(currentMedia) ||
          /pointer:\s*coarse/.test(currentMedia)
        ) && !/min-width:\s*1200px/.test(currentMedia) // Exclude desktop-first queries
        
        // Desktop: min-width > 768px or (hover: hover) and (pointer: fine) or min-width: 1200px
        const isDesktop = (
          (/min-width:\s*(\d+)px/.test(currentMedia) && 
           parseInt(currentMedia.match(/min-width:\s*(\d+)px/)[1]) > MOBILE_BREAKPOINT) ||
          /min-width:\s*1200px/.test(currentMedia) ||
          (/hover:\s*hover/.test(currentMedia) && /pointer:\s*fine/.test(currentMedia))
        ) && !/max-width:\s*768px/.test(currentMedia) // Exclude mobile-first queries
        
        if (isMobile) {
          mobile.push({ media: currentMedia, content: [] })
        } else if (isDesktop) {
          desktop.push({ media: currentMedia, content: [] })
        } else {
          // Other media queries (pointer, prefers-reduced-motion, etc.) - keep in shared
          other.push({ media: currentMedia, content: [] })
        }
      }
      continue
    }
    
    // Track brace depth to know when media query ends
    if (inMediaQuery) {
      const openBraces = (line.match(/{/g) || []).length
      const closeBraces = (line.match(/}/g) || []).length
      braceDepth += openBraces - closeBraces
      
      // Add to current media query content (including the opening brace)
      currentMediaContent.push(line)
      
      if (braceDepth === 0 && trimmed === '}') {
        // End of media query - find which array this belongs to
        let targetArray = null
        let targetIndex = -1
        
        // Find the most recently added media query block
        if (mobile.length > 0 && mobile[mobile.length - 1].media === currentMedia) {
          targetArray = mobile
          targetIndex = mobile.length - 1
        } else if (desktop.length > 0 && desktop[desktop.length - 1].media === currentMedia) {
          targetArray = desktop
          targetIndex = desktop.length - 1
        } else if (other.length > 0 && other[other.length - 1].media === currentMedia) {
          targetArray = other
          targetIndex = other.length - 1
        }
        
        if (targetArray && targetIndex >= 0) {
          // Set the content for this media query block
          targetArray[targetIndex].content = [...currentMediaContent]
        }
        
        inMediaQuery = false
        currentMedia = null
        currentMediaContent = []
        continue
      }
      
      continue
    }
    
    // Regular rules (not in media query)
    currentRule += line + '\n'
    
    // Check for @keyframes, @font-face, :root, @import - these must stay in shared
    if (trimmed.startsWith('@keyframes') || 
        trimmed.startsWith('@font-face') || 
        trimmed.startsWith('@import') ||
        trimmed.startsWith(':root') ||
        trimmed.startsWith('@charset')) {
      // These are special - keep accumulating until closing brace
      if (trimmed.includes('}') && !trimmed.includes('{')) {
        shared.push(currentRule)
        currentRule = ''
      }
    } else if (trimmed === '}' && currentRule.includes('{')) {
      // End of a rule block
      shared.push(currentRule)
      currentRule = ''
    }
  }
  
  // Add any remaining rule
  if (currentRule.trim()) {
    shared.push(currentRule)
  }
  
  return { shared, mobile, desktop, other }
}

/**
 * Generate CSS file content from parsed rules
 */
function generateCSS(shared, mobile, desktop, other) {
  let output = ''
  
  // 1. Shared rules first (variables, @keyframes, base styles)
  output += shared.join('')
  
  // 2. Other media queries (pointer, prefers-reduced-motion, etc.) - keep in shared
  other.forEach(mediaBlock => {
    output += `@media ${mediaBlock.media} {\n`
    output += mediaBlock.content.join('')
    output += '}\n'
  })
  
  // 3. Mobile media queries
  mobile.forEach(mediaBlock => {
    output += `@media ${mediaBlock.media} {\n`
    output += mediaBlock.content.join('')
    output += '}\n'
  })
  
  // 4. Desktop media queries
  desktop.forEach(mediaBlock => {
    output += `@media ${mediaBlock.media} {\n`
    output += mediaBlock.content.join('')
    output += '}\n'
  })
  
  return output
}

/**
 * Vite plugin to split CSS into mobile/desktop
 */
export default function splitMobileCSS() {
  return {
    name: 'split-mobile-css',
    enforce: 'post', // Run after other plugins
    
    closeBundle() {
      // Run in closeBundle to ensure all Vite plugins have finished
      const distDir = path.resolve(__dirname, '../dist')
      const assetsDir = path.join(distDir, 'assets')
      
      // Ensure assets directory exists
      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true })
      }
      
      let allShared = []
      let allMobile = []
      let allDesktop = []
      let allOther = []
      
      // Process each CSS file in import order
      CSS_FILES.forEach(cssFile => {
        const filePath = path.resolve(__dirname, '..', cssFile)
        
        if (!fs.existsSync(filePath)) {
          console.warn(`[split-css] CSS file not found: ${filePath}`)
          return
        }
        
        const cssContent = fs.readFileSync(filePath, 'utf-8')
        const { shared, mobile, desktop, other } = parseAndSplitCSS(cssContent, filePath)
        
        // Preserve order by appending in sequence
        allShared.push(...shared)
        allMobile.push(...mobile)
        allDesktop.push(...desktop)
        allOther.push(...other)
      })
      
      // Generate split CSS files
      const sharedCSS = generateCSS(allShared, [], [], allOther)
      const mobileCSS = generateCSS([], allMobile, [], [])
      const desktopCSS = generateCSS([], [], allDesktop, [])
      
      // Write split CSS files
      const sharedPath = path.join(assetsDir, 'css', 'shared.css')
      const mobilePath = path.join(assetsDir, 'css', 'mobile.css')
      const desktopPath = path.join(assetsDir, 'css', 'desktop.css')
      
      // Ensure css directory exists
      const cssDir = path.dirname(sharedPath)
      if (!fs.existsSync(cssDir)) {
        fs.mkdirSync(cssDir, { recursive: true })
      }
      
      fs.writeFileSync(sharedPath, sharedCSS, 'utf-8')
      fs.writeFileSync(mobilePath, mobileCSS, 'utf-8')
      fs.writeFileSync(desktopPath, desktopCSS, 'utf-8')
      
      console.log(`[split-css] ✅ Generated split CSS files:`)
      console.log(`  - shared.css: ${(sharedCSS.length / 1024).toFixed(2)} KB`)
      console.log(`  - mobile.css: ${(mobileCSS.length / 1024).toFixed(2)} KB`)
      console.log(`  - desktop.css: ${(desktopCSS.length / 1024).toFixed(2)} KB`)
      
      // Update HTML to load split CSS
      const htmlPath = path.join(distDir, 'index.html')
      if (fs.existsSync(htmlPath)) {
        let html = fs.readFileSync(htmlPath, 'utf-8')
        
        // Detect base path - check for Firebase build (base: '/') vs GitHub Pages (base: '/portfolio/')
        // CRITICAL: Check multiple indicators to be absolutely sure
        let basePath = '/portfolio/' // Default to GitHub Pages
        
        // Method 1: Check script src path (most reliable - Vite always transforms this)
        const scriptSrcMatch = html.match(/<script[^>]*src=["']([^"']*\/assets\/[^"']*index-[^"']*\.js)/)
        if (scriptSrcMatch && scriptSrcMatch[1]) {
          const scriptPath = scriptSrcMatch[1]
          if (scriptPath.startsWith('/assets/') && !scriptPath.startsWith('/portfolio/')) {
            basePath = '/' // Firebase - script is at /assets/... (no /portfolio/ prefix)
          } else if (scriptPath.startsWith('/portfolio/assets/')) {
            basePath = '/portfolio/' // GitHub Pages - script is at /portfolio/assets/...
          }
        }
        
        // Method 2: Double-check with asset links (if script check didn't work)
        if (basePath === '/portfolio/') {
          // Check for Firebase pattern: href="/assets/" without /portfolio/ prefix
          const firebasePattern = /href=["']\/assets\//g
          const githubPattern = /href=["']\/portfolio\/assets\//g
          const firebaseMatches = (html.match(firebasePattern) || []).length
          const githubMatches = (html.match(githubPattern) || []).length
          
          // If we see /assets/ links but NO /portfolio/assets/ links, it's Firebase
          if (firebaseMatches > 0 && githubMatches === 0) {
            basePath = '/' // Firebase
          } else if (githubMatches > 0) {
            basePath = '/portfolio/' // GitHub Pages
          }
        }
        
        // Verify base path by checking if files would exist at that path
        // This is a safety check - if wrong base path, CSS won't load
        if (!fs.existsSync(testSharedPath)) {
          console.warn(`[split-css] ⚠️  Warning: shared.css not found at expected path, but will be generated`)
        }
        
        console.log(`[split-css] ✅ Detected base path: "${basePath}"`)
        
        // Remove ALL existing split CSS links if they exist (to avoid duplicates)
        // This includes incorrect ones with wrong base path
        html = html.replace(/<!-- Split CSS:.*?-->/g, '')
        html = html.replace(/<link[^>]*\/assets\/css\/(shared|mobile|desktop)\.css[^>]*>[\s\S]*?<\/noscript>/gi, '')
        html = html.replace(/<link[^>]*\/assets\/css\/(shared|mobile|desktop)\.css[^>]*>/gi, '')
        // Also remove incorrect ones with wrong base path (portfolioassets)
        html = html.replace(/<link[^>]*portfolioassets\/css\/(shared|mobile|desktop)\.css[^>]*>[\s\S]*?<\/noscript>/gi, '')
        html = html.replace(/<link[^>]*portfolioassets\/css\/(shared|mobile|desktop)\.css[^>]*>/gi, '')
        
        // CRITICAL: DO NOT remove index-*.css - it contains component-specific styles
        // Vite bundles component CSS into index-*.css, and we need those styles
        // The split CSS files (shared/mobile/desktop) will ADD to the base styles
        // We only remove duplicate split CSS links, not the base index.css
        
        // Remove empty noscript tags left behind
        html = html.replace(/<noscript>\s*<\/noscript>/gi, '')
        html = html.replace(/<\/noscript><\/noscript>/gi, '')
        html = html.replace(/<\/noscript><\/noscript><\/noscript>/gi, '')
        
        // Find where to insert new CSS links
        // CRITICAL: Load split CSS AFTER index-*.css so split styles can override/add to base styles
        // Look for index-*.css link and insert after it
        const indexCssMatch = html.match(/<link[^>]*index-[^"']*\.css[^>]*>/i)
        if (indexCssMatch) {
          // Insert after index.css (after the closing tag, including noscript if present)
          const insertPos = indexCssMatch.index + indexCssMatch[0].length
          // Check if there's a noscript tag after it
          const afterMatch = html.slice(insertPos).match(/^[\s\S]*?<\/noscript>/i)
          const finalInsertPos = afterMatch ? insertPos + afterMatch[0].length : insertPos
          
          const cssLinks = `
  <!-- Split CSS: Shared (loaded on all devices) - Loads AFTER index.css -->
  <link href="${basePath}assets/css/shared.css" rel="stylesheet">
  
  <!-- Split CSS: Mobile (loaded on mobile only) -->
  <link href="${basePath}assets/css/mobile.css" rel="stylesheet" media="(max-width: 768px)">
  
  <!-- Split CSS: Desktop (loaded on desktop only) -->
  <link href="${basePath}assets/css/desktop.css" rel="stylesheet" media="(min-width: 769px)">
  
`
          html = html.slice(0, finalInsertPos) + cssLinks + html.slice(finalInsertPos)
        } else {
          // Fallback: insert before script tag or </head>
          const scriptMatch = html.match(/<script[^>]*type=["']module["'][^>]*src=["'][^"']*index-[^"']*\.js/)
          if (scriptMatch) {
            const insertPos = scriptMatch.index
            const cssLinks = `
  <!-- Split CSS: Shared (loaded on all devices) -->
  <link href="${basePath}assets/css/shared.css" rel="stylesheet">
  
  <!-- Split CSS: Mobile (loaded on mobile only) -->
  <link href="${basePath}assets/css/mobile.css" rel="stylesheet" media="(max-width: 768px)">
  
  <!-- Split CSS: Desktop (loaded on desktop only) -->
  <link href="${basePath}assets/css/desktop.css" rel="stylesheet" media="(min-width: 769px)">
  
`
            html = html.slice(0, insertPos) + cssLinks + html.slice(insertPos)
          } else {
            // Last resort: insert before </head>
            const headEnd = html.indexOf('</head>')
            if (headEnd !== -1) {
              const cssLinks = `
  <!-- Split CSS: Shared (loaded on all devices) -->
  <link href="${basePath}assets/css/shared.css" rel="stylesheet">
  
  <!-- Split CSS: Mobile (loaded on mobile only) -->
  <link href="${basePath}assets/css/mobile.css" rel="stylesheet" media="(max-width: 768px)">
  
  <!-- Split CSS: Desktop (loaded on desktop only) -->
  <link href="${basePath}assets/css/desktop.css" rel="stylesheet" media="(min-width: 769px)">
`
              html = html.slice(0, headEnd) + cssLinks + html.slice(headEnd)
            }
          }
        }
        
        fs.writeFileSync(htmlPath, html, 'utf-8')
        console.log(`[split-css] ✅ Updated index.html with split CSS links`)
      }
    }
  }
}
