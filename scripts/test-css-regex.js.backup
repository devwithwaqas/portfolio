/**
 * Test CSS Regex Patterns
 * 
 * Tests regex patterns for CSS selector extraction before using in main analyzer
 */

const fs = require('fs')
const path = require('path')

// Test CSS content
const testCSS = `
/* Test CSS */
.header {
  position: fixed;
  top: 0;
}

@media (max-width: 768px) {
  .header {
    left: -100%;
  }
  
  .header.header-show {
    left: 0;
  }
}

.navmenu {
  display: flex;
}

@media (min-width: 1200px) {
  .main-content {
    margin-left: 16.66%;
  }
}

#header {
  z-index: 1000;
}

.mobile-nav-toggle:hover {
  background: red;
}

.mobile-nav-toggle:active {
  transform: scale(0.95);
}
`

// Test patterns
const patterns = {
  selector: /^([^{}]+)\s*\{/,
  mediaQuery: /@media\s+([^{]+)\{/,
  closingBrace: /^\s*\}\s*$/,
  classInSelector: /\.[a-z0-9_-]+/gi,
  idInSelector: /#[a-z0-9_-]+/gi,
  elementInSelector: /^[a-z]+|(?<=\s)[a-z]+/gi
}

console.log('🧪 Testing CSS Regex Patterns\n')
console.log('='.repeat(60))

// Test selector extraction
console.log('\n1️⃣ Testing Selector Pattern:')
const lines = testCSS.split('\n')
let inMediaQuery = false
let currentMediaQuery = null
let braceDepth = 0

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  const trimmed = line.trim()
  
  // Test media query
  const mediaMatch = trimmed.match(patterns.mediaQuery)
  if (mediaMatch) {
    console.log(`  ✓ Line ${i + 1}: Found @media query: ${mediaMatch[1].trim()}`)
    inMediaQuery = true
    currentMediaQuery = mediaMatch[1].trim()
    braceDepth = 0
    continue
  }
  
  // Track braces
  const openBraces = (line.match(/{/g) || []).length
  const closeBraces = (line.match(/}/g) || []).length
  braceDepth += openBraces - closeBraces
  
  // Test selector
  const selectorMatch = line.match(patterns.selector)
  if (selectorMatch && !inMediaQuery) {
    const selector = selectorMatch[1].trim()
    console.log(`  ✓ Line ${i + 1}: Found selector: "${selector}"`)
  } else if (selectorMatch && inMediaQuery) {
    const selector = selectorMatch[1].trim()
    console.log(`  ✓ Line ${i + 1}: Found selector in @media: "${selector}" (media: ${currentMediaQuery})`)
  }
  
  // End of media query
  if (braceDepth === 0 && patterns.closingBrace.test(trimmed) && inMediaQuery) {
    console.log(`  ✓ Line ${i + 1}: End of @media query`)
    inMediaQuery = false
    currentMediaQuery = null
  }
}

// Test class/ID/element extraction
console.log('\n2️⃣ Testing Class/ID/Element Extraction:')
const testSelectors = [
  '.header',
  '.header.header-show',
  '#header',
  'nav.header',
  '.mobile-nav-toggle:hover',
  '.mobile-nav-toggle:active',
  'div.main-content',
  'header#header.navmenu'
]

testSelectors.forEach(selector => {
  console.log(`\n  Selector: "${selector}"`)
  
  const classes = selector.match(patterns.classInSelector) || []
  const ids = selector.match(patterns.idInSelector) || []
  const elements = selector.match(patterns.elementInSelector) || []
  
  console.log(`    Classes: ${classes.length > 0 ? classes.map(c => c.substring(1)).join(', ') : 'none'}`)
  console.log(`    IDs: ${ids.length > 0 ? ids.map(id => id.substring(1)).join(', ') : 'none'}`)
  console.log(`    Elements: ${elements.length > 0 ? elements.join(', ') : 'none'}`)
})

// Test specificity calculation
console.log('\n3️⃣ Testing Specificity Calculation:')

function calculateSpecificity(selector) {
  const cleanSelector = selector.replace(/::?[a-z-]+/gi, '')
  
  const idCount = (cleanSelector.match(/#[a-z0-9_-]+/gi) || []).length
  const classCount = (cleanSelector.match(/\.[a-z0-9_-]+/gi) || []).length
  const elementCount = (cleanSelector.match(/^[a-z]+|(?<=\s)[a-z]+/gi) || []).length
  
  const total = (idCount * 100) + (classCount * 10) + elementCount
  
  return { id: idCount, class: classCount, element: elementCount, total }
}

testSelectors.forEach(selector => {
  const spec = calculateSpecificity(selector)
  console.log(`  "${selector}": id=${spec.id}, class=${spec.class}, element=${spec.element}, total=${spec.total}`)
})

console.log('\n' + '='.repeat(60))
console.log('✅ All pattern tests completed!')
console.log('='.repeat(60))
