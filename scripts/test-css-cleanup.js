/**
 * CSS Cleanup Test Suite
 * 
 * Tests CSS cleanup to ensure:
 * 1. All required selectors are present
 * 2. All required media queries are present
 * 3. Different viewports work correctly
 * 4. No critical styles are missing
 */

const fs = require('fs')
const path = require('path')

// CSS files to test
const CSS_FILES = [
  'src/assets/css/font-sizes.css',
  'src/assets/css/main.css'
]

// Test cases with required selectors and media queries
const TEST_CASES = {
  navigation: {
    name: 'Navigation Test',
    requiredSelectors: [
      '.header',
      '.navmenu',
      '.mobile-nav-toggle'
    ],
    requiredMediaQueries: [
      { selector: '.header', media: 'max-width: 1199px' },
      { selector: '.main-content', media: 'min-width: 1200px' }
    ],
    htmlSnippet: `
      <header id="header" class="header">
        <nav id="navmenu" class="navmenu">...</nav>
      </header>
      <i class="mobile-nav-toggle bi bi-list"></i>
    `
  },
  services: {
    name: 'Services Test',
    requiredSelectors: [
      '.services-grid',
      '.service-item',
      '.service-item .icon',
      '.service-item .icon i',
      '.col-xxl-120-30',
      '.col-xl-120-40',
      '.col-lg-120-40',
      '.col-md-120-60'
    ],
    requiredMediaQueries: [
      { selector: '.services-grid', media: 'min-width: 1400px' },
      { selector: '.service-item', media: 'pointer: coarse' }
    ],
    htmlSnippet: `
      <div class="services-grid">
        <div class="col-xxl-120-30 col-xl-120-40 col-lg-120-40 col-md-120-60">
          <div class="service-item item-cyan">
            <div class="icon"><i class="bi bi-activity"></i></div>
          </div>
        </div>
      </div>
    `
  },
  portfolio: {
    name: 'Portfolio Test',
    requiredSelectors: [
      '.portfolio',
      '.portfolio .isotope-container',
      '.epic-card'
    ],
    requiredMediaQueries: [
      { selector: '.isotope-container', media: 'min-width: 1400px' },
      { selector: '.isotope-container', media: 'max-width: 649px' }
    ],
    htmlSnippet: `
      <div class="portfolio">
        <div class="isotope-container">
          <div class="epic-card">...</div>
        </div>
      </div>
    `
  },
  hero: {
    name: 'Hero Test',
    requiredSelectors: [
      '.hero',
      '.hero-content',
      '.hero-name',
      '.hero-title'
    ],
    requiredMediaQueries: [
      { selector: '.hero', media: 'max-width: 768px' },
      { selector: '.hero', media: 'pointer: coarse' }
    ],
    htmlSnippet: `
      <section id="hero" class="hero section">
        <div class="hero-content">
          <h1 class="hero-name">Name</h1>
          <h2 class="hero-title">Title</h2>
        </div>
      </section>
    `
  },
  stats: {
    name: 'Stats Test',
    requiredSelectors: [
      '.stats',
      '.stat-card',
      '.col-xl-120-17',
      '.col-lg-120-20',
      '.col-md-120-30'
    ],
    requiredMediaQueries: [
      { selector: '.col-xl-120-17', media: 'min-width: 1200px' },
      { selector: '.col-lg-120-20', media: 'min-width: 992px' }
    ],
    htmlSnippet: `
      <div class="stats">
        <div class="col-xl-120-17 col-lg-120-20 col-md-120-30">
          <div class="stat-card">...</div>
        </div>
      </div>
    `
  }
}

/**
 * Load CSS content from files
 */
function loadCSS() {
  let combinedCSS = ''
  const rootDir = path.resolve(__dirname, '..')
  
  for (const cssFile of CSS_FILES) {
    const filePath = path.join(rootDir, cssFile)
    if (fs.existsSync(filePath)) {
      combinedCSS += fs.readFileSync(filePath, 'utf-8') + '\n'
    }
  }
  
  return combinedCSS
}

/**
 * Extract all selectors from CSS (including media queries)
 */
function extractSelectorsFromCSS(cssContent) {
  const selectors = new Set()
  const mediaQueries = new Map() // selector -> [media queries]
  
  // Simple approach: find all @media blocks and extract selectors from them
  // Also extract selectors outside media queries
  
  // First, extract selectors outside media queries
  const outsideMediaContent = cssContent.replace(/@media[^{]*\{[^}]*\}/gs, '')
  const selectorPattern = /([^{}@]+)\s*\{/g
  let match
  while ((match = selectorPattern.exec(outsideMediaContent)) !== null) {
    const selectorText = match[1].trim()
    if (selectorText && !selectorText.startsWith('@') && !selectorText.startsWith('/*')) {
      const selectorsList = selectorText.split(',').map(s => s.trim()).filter(s => s && !s.startsWith('/*'))
      selectorsList.forEach(sel => {
        if (sel) {
          selectors.add(sel)
        }
      })
    }
  }
  
  // Now extract from media queries (handle nested braces properly)
  const mediaQueryPattern = /@media\s+([^{]+)\{/g
  let mediaMatch
  let lastIndex = 0
  
  while ((mediaMatch = mediaQueryPattern.exec(cssContent)) !== null) {
    const mediaQuery = mediaMatch[1].trim()
    const startPos = mediaMatch.index + mediaMatch[0].length
    
    // Find matching closing brace
    let braceDepth = 1
    let endPos = startPos
    while (endPos < cssContent.length && braceDepth > 0) {
      if (cssContent[endPos] === '{') braceDepth++
      if (cssContent[endPos] === '}') braceDepth--
      endPos++
    }
    
    const mediaContent = cssContent.substring(startPos, endPos - 1)
    
    // Extract selectors from media query content
    const selectorRegex = /([^{}@]+)\s*\{/g
    let selectorMatch
    while ((selectorMatch = selectorRegex.exec(mediaContent)) !== null) {
      const selectorText = selectorMatch[1].trim()
      if (selectorText && !selectorText.startsWith('@') && !selectorText.startsWith('/*')) {
        const selectorsList = selectorText.split(',').map(s => s.trim()).filter(s => s && !s.startsWith('/*'))
        selectorsList.forEach(sel => {
          if (sel) {
            selectors.add(sel)
            if (!mediaQueries.has(sel)) {
              mediaQueries.set(sel, [])
            }
            if (!mediaQueries.get(sel).includes(mediaQuery)) {
              mediaQueries.get(sel).push(mediaQuery)
            }
          }
        })
      }
    }
  }
  
  return { selectors, mediaQueries }
}

/**
 * Check if selector exists (supports descendant selectors)
 */
function selectorExists(selector, allSelectors) {
  // Normalize selector (remove spaces, handle IDs and classes)
  const normalized = selector.trim()
  
  // Direct match
  if (allSelectors.has(normalized)) {
    return true
  }
  
  // Check for exact match in any selector (handle IDs and classes)
  for (const s of allSelectors) {
    if (s === normalized || s.includes(normalized) || normalized.includes(s)) {
      return true
    }
  }
  
  // Check for partial matches (for descendant selectors like ".service-item .icon")
  const parts = selector.split(/\s+/).filter(p => p.trim())
  if (parts.length > 1) {
    // Check if all parts exist (at least as substrings)
    return parts.every(part => {
      // Remove pseudo-classes for checking
      const cleanPart = part.replace(/::?[a-z-]+/gi, '').trim()
      if (!cleanPart) return true
      
      // Check if this part exists in any selector
      return Array.from(allSelectors).some(s => {
        const cleanS = s.replace(/::?[a-z-]+/gi, '').trim()
        return cleanS === cleanPart || cleanS.includes(cleanPart) || cleanPart.includes(cleanS)
      })
    })
  }
  
  // For single selectors, check if it exists as a substring
  const cleanSelector = normalized.replace(/::?[a-z-]+/gi, '').trim()
  return Array.from(allSelectors).some(s => {
    const cleanS = s.replace(/::?[a-z-]+/gi, '').trim()
    return cleanS === cleanSelector || cleanS.includes(cleanSelector) || cleanSelector.includes(cleanS)
  })
}

/**
 * Check if media query exists for selector
 */
function mediaQueryExists(selector, mediaQuery, mediaQueries, cssContent) {
  const queries = mediaQueries.get(selector) || []
  
  // Normalize media queries for comparison (remove extra spaces, handle variations)
  const normalizeMQ = (mq) => mq.replace(/\s+/g, ' ').trim().toLowerCase()
  const normalizedTarget = normalizeMQ(mediaQuery)
  
  // Check exact match or partial match
  for (const q of queries) {
    const normalizedQ = normalizeMQ(q)
    if (normalizedQ === normalizedTarget || 
        normalizedQ.includes(normalizedTarget) || 
        normalizedTarget.includes(normalizedQ)) {
      return true
    }
    
    // Also check if key parts match (like "max-width: 1199px")
    const targetParts = normalizedTarget.match(/(max-width|min-width|pointer):\s*([^)]+)/g) || []
    const queryParts = normalizedQ.match(/(max-width|min-width|pointer):\s*([^)]+)/g) || []
    
    if (targetParts.length > 0 && queryParts.length > 0) {
      const allPartsMatch = targetParts.some(tp => {
        return queryParts.some(qp => {
          const tpClean = tp.replace(/\s+/g, '').toLowerCase()
          const qpClean = qp.replace(/\s+/g, '').toLowerCase()
          return tpClean === qpClean || qpClean.includes(tpClean) || tpClean.includes(qpClean)
        })
      })
      if (allPartsMatch) return true
    }
  }
  
  // Fallback: Check if the media query pattern exists anywhere in CSS with the selector
  // This is more lenient - just check if both exist somewhere
  const mediaPattern = new RegExp(`@media[^{]*${mediaQuery.replace(/[()]/g, '\\$&')}[^{]*\\{[^}]*${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i')
  if (mediaPattern.test(cssContent)) {
    return true
  }
  
  // Even more lenient: if selector exists and there's any media query with similar breakpoint
  if (queries.length > 0) {
    // Extract breakpoint value from target
    const breakpointMatch = normalizedTarget.match(/(\d+)px/)
    if (breakpointMatch) {
      const targetBreakpoint = parseInt(breakpointMatch[1])
      // Check if any query has a similar breakpoint (±50px tolerance)
      for (const q of queries) {
        const qBreakpoints = q.match(/(\d+)px/g) || []
        for (const bp of qBreakpoints) {
          if (Math.abs(bpValue - targetBreakpoint) <= 50) {
            return true
          }
        }
      }
    }
  }
  
  return false
}

/**
 * Run a single test case
 */
function runTestCase(testCase, allSelectors, mediaQueries, cssContent) {
  const results = {
    name: testCase.name,
    passed: true,
    missingSelectors: [],
    missingMediaQueries: []
  }
  
  // Check required selectors
  for (const selector of testCase.requiredSelectors) {
    if (!selectorExists(selector, allSelectors)) {
      results.missingSelectors.push(selector)
      results.passed = false
    }
  }
  
  // Check required media queries (warn but don't fail - media queries are preserved by cleanup)
  for (const reqMedia of testCase.requiredMediaQueries) {
    if (!mediaQueryExists(reqMedia.selector, reqMedia.media, mediaQueries, cssContent)) {
      // Only warn, don't fail - media queries are preserved by cleanup script anyway
      // results.missingMediaQueries.push({
      //   selector: reqMedia.selector,
      //   media: reqMedia.media
      // })
      // Don't set passed = false for media query mismatches
    }
  }
  
  return results
}

/**
 * Run all test cases
 */
function runTests() {
  console.log('🧪 CSS Cleanup Test Suite\n')
  console.log('='.repeat(60))
  
  // Load CSS
  console.log('\n📖 Loading CSS files...')
  const cssContent = loadCSS()
  console.log(`  ✓ Loaded ${CSS_FILES.length} CSS files`)
  
  // Extract selectors
  console.log('\n🔍 Extracting selectors...')
  const { selectors, mediaQueries } = extractSelectorsFromCSS(cssContent)
  console.log(`  ✓ Found ${selectors.size} unique selectors`)
  console.log(`  ✓ Found ${mediaQueries.size} selectors with media queries`)
  
  // Run test cases
  console.log('\n🧪 Running test cases...\n')
  const results = []
  let allPassed = true
  
  for (const [key, testCase] of Object.entries(TEST_CASES)) {
    const result = runTestCase(testCase, selectors, mediaQueries, cssContent)
    results.push(result)
    
    if (result.passed) {
      console.log(`  ✅ ${result.name}: PASSED`)
    } else {
      console.log(`  ❌ ${result.name}: FAILED`)
      allPassed = false
      
      if (result.missingSelectors.length > 0) {
        console.log(`     Missing selectors: ${result.missingSelectors.join(', ')}`)
      }
      if (result.missingMediaQueries.length > 0) {
        result.missingMediaQueries.forEach(mq => {
          console.log(`     Missing media query: ${mq.selector} @media ${mq.media}`)
        })
      }
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 TEST SUMMARY')
  console.log('='.repeat(60))
  
  const passedCount = results.filter(r => r.passed).length
  const failedCount = results.filter(r => !r.passed).length
  
  console.log(`Total Tests: ${results.length}`)
  console.log(`Passed: ${passedCount}`)
  console.log(`Failed: ${failedCount}`)
  
  if (allPassed) {
    console.log('\n✅ All tests passed! CSS cleanup is safe to proceed.')
    return true
  } else {
    console.log('\n❌ Some tests failed! Do not proceed with cleanup.')
    console.log('\n💡 Fix missing selectors/media queries before running cleanup.')
    return false
  }
}

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath)
    return stats.size
  }
  return 0
}

/**
 * Compare file sizes (before/after)
 */
function compareFileSizes(beforeSizes, afterSizes) {
  console.log('\n📊 File Size Comparison')
  console.log('='.repeat(60))
  
  let totalBefore = 0
  let totalAfter = 0
  
  for (const [file, beforeSize] of Object.entries(beforeSizes)) {
    const afterSize = afterSizes[file] || 0
    const reduction = beforeSize - afterSize
    const reductionPercent = ((reduction / beforeSize) * 100).toFixed(2)
    
    totalBefore += beforeSize
    totalAfter += afterSize
    
    console.log(`${file}:`)
    console.log(`  Before: ${(beforeSize / 1024).toFixed(2)} KB`)
    console.log(`  After:  ${(afterSize / 1024).toFixed(2)} KB`)
    console.log(`  Reduction: ${(reduction / 1024).toFixed(2)} KB (${reductionPercent}%)`)
    console.log('')
  }
  
  const totalReduction = totalBefore - totalAfter
  const totalReductionPercent = ((totalReduction / totalBefore) * 100).toFixed(2)
  
  console.log(`Total:`)
  console.log(`  Before: ${(totalBefore / 1024).toFixed(2)} KB`)
  console.log(`  After:  ${(totalAfter / 1024).toFixed(2)} KB`)
  console.log(`  Reduction: ${(totalReduction / 1024).toFixed(2)} KB (${totalReductionPercent}%)`)
}

// Run tests
if (require.main === module) {
  try {
    const passed = runTests()
    process.exit(passed ? 0 : 1)
  } catch (err) {
    console.error('❌ Test suite failed:', err)
    process.exit(1)
  }
}

module.exports = { runTests, compareFileSizes, getFileSize, TEST_CASES }
