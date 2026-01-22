/**
 * Enhanced CSS Usage Analyzer
 * 
 * Analyzes CSS files to:
 * 1. Extract all CSS selectors (including complex selectors, pseudo-classes, @media queries)
 * 2. Check if they're used in Vue components, HTML, and JavaScript files
 * 3. Detect duplicate/conflicting styles
 * 4. Identify unused styles (with safety keep list)
 * 5. Maintain CSS order for proper cascade
 */

const fs = require('fs')
const path = require('path')

// CSS files to analyze
const CSS_FILES = [
  'src/assets/css/font-sizes.css',
  'src/assets/css/main.css'
]

// Safety keep list - never remove these selectors
const SAFETY_KEEP_LIST = [
  ':root',
  'html',
  'body',
  '#app',
  '.header',
  '.navmenu',
  '.main-content',
  '.mobile-nav-toggle',
  '.header-show'
]

// Utility class patterns - keep these
const UTILITY_PATTERNS = [
  /^\.pf-/,           // .pf-* classes
  /^\.col-.*-120-/,    // .col-*-120-* classes
  /^\.mb-.*-120-/      // .mb-*-120-* classes
]

// Common HTML elements
const HTML_ELEMENTS = [
  'html', 'body', 'div', 'span', 'p', 'a', 'img', 'ul', 'li', 'ol',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'nav', 'main', 'section',
  'article', 'aside', 'footer', 'button', 'input', 'form', 'label',
  'table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot', 'i', 'em', 'strong',
  'b', 'u', 'small', 'big', 'sub', 'sup', 'code', 'pre', 'blockquote', 'hr', 'br'
]

/**
 * Enhanced selector extraction with support for:
 * - Complex selectors (.class1.class2, #id.class, element.class)
 * - Pseudo-classes (:hover, :active, etc.)
 * - @media queries
 * - Multiple selectors per rule
 */
function extractSelectors(cssContent, filePath) {
  const selectors = new Map()
  const lines = cssContent.split('\n')
  
  let currentMediaQuery = null
  let braceDepth = 0
  let inMediaQuery = false
  let currentSelectors = []
  let currentProperties = []
  let selectorStartLine = 0
  let inComment = false
  
  // Patterns
  const mediaQueryPattern = /@media\s+([^{]+)\{/
  const selectorPattern = /([^{}]+)\s*\{/
  const commentStartPattern = /\/\*/
  const commentEndPattern = /\*\//
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    
    // Handle comments
    if (commentStartPattern.test(trimmed)) {
      inComment = true
    }
    if (commentEndPattern.test(trimmed)) {
      inComment = false
      continue
    }
    if (inComment) continue
    
    // Detect @media queries
    const mediaMatch = trimmed.match(mediaQueryPattern)
    if (mediaMatch) {
      // Save previous selectors if exists
      if (currentSelectors.length > 0) {
        saveSelectors(currentSelectors, currentProperties, selectorStartLine, currentMediaQuery, selectors, filePath)
        currentSelectors = []
        currentProperties = []
      }
      
      currentMediaQuery = mediaMatch[1].trim()
      inMediaQuery = true
      braceDepth = 0
      continue
    }
    
    // Track brace depth
    const openBraces = (line.match(/{/g) || []).length
    const closeBraces = (line.match(/}/g) || []).length
    braceDepth += openBraces - closeBraces
    
    // Detect selector (handle multiple selectors per line)
    const selectorMatch = line.match(selectorPattern)
    if (selectorMatch && braceDepth === (inMediaQuery ? 1 : 0)) {
      // Save previous selectors if exists
      if (currentSelectors.length > 0) {
        saveSelectors(currentSelectors, currentProperties, selectorStartLine, currentMediaQuery, selectors, filePath)
      }
      
      // Parse multiple selectors (comma-separated)
      const selectorText = selectorMatch[1].trim()
      currentSelectors = selectorText.split(',').map(s => s.trim()).filter(s => s)
      currentProperties = []
      selectorStartLine = i + 1
    } else if (currentSelectors.length > 0 && braceDepth > (inMediaQuery ? 1 : 0)) {
      // Property line
      if (trimmed && !trimmed.startsWith('/*') && !trimmed.startsWith('*') && trimmed !== '}') {
        currentProperties.push(trimmed)
      }
    }
    
    // End of rule block
    if (braceDepth === 0 && trimmed === '}') {
      if (currentSelectors.length > 0) {
        saveSelectors(currentSelectors, currentProperties, selectorStartLine, currentMediaQuery, selectors, filePath)
        currentSelectors = []
        currentProperties = []
      }
      
      if (inMediaQuery && braceDepth === 0) {
        inMediaQuery = false
        currentMediaQuery = null
      }
    }
  }
  
  // Save any remaining selectors
  if (currentSelectors.length > 0) {
    saveSelectors(currentSelectors, currentProperties, selectorStartLine, currentMediaQuery, selectors, filePath)
  }
  
  return selectors
}

/**
 * Save selectors to map
 */
function saveSelectors(selectors, properties, startLine, mediaQuery, selectorMap, filePath) {
  const propsText = properties.join('\n')
  
  for (const selector of selectors) {
    const key = mediaQuery 
      ? `@media ${mediaQuery} ${selector}`
      : selector
    
    // Check if already exists (avoid overwriting)
    if (!selectorMap.has(key)) {
      selectorMap.set(key, {
        selector: selector,
        properties: propsText,
        lineNumber: startLine,
        mediaQuery: mediaQuery,
        specificity: calculateSpecificity(selector),
        file: filePath
      })
    }
  }
}

/**
 * Calculate CSS specificity
 * Returns: { id: count, class: count, element: count, total: number }
 */
function calculateSpecificity(selector) {
  // Remove pseudo-classes and pseudo-elements for counting (but keep them in selector)
  const cleanSelector = selector.replace(/::?[a-z-]+/gi, '')
  
  const idCount = (cleanSelector.match(/#[a-z0-9_-]+/gi) || []).length
  const classCount = (cleanSelector.match(/\.[a-z0-9_-]+/gi) || []).length
  
  // Extract element selectors
  const elementMatches = cleanSelector.match(/\b([a-z][a-z0-9]*)\b/gi) || []
  const elementCount = elementMatches.filter(el => HTML_ELEMENTS.includes(el.toLowerCase())).length
  
  // Specificity formula: (id * 100) + (class * 10) + element
  const total = (idCount * 100) + (classCount * 10) + elementCount
  
  return { id: idCount, class: classCount, element: elementCount, total }
}

/**
 * Enhanced usage detection - searches for:
 * - class="selector"
 * - :class="selector" or :class="{ selector: true }"
 * - id="selector"
 * - Template literals: `class-${variable}`
 * - classList.add('selector')
 * - querySelector('.selector')
 * - getElementById('selector')
 */
function extractUsedClasses() {
  const usedClasses = new Set()
  const usedIds = new Set()
  
  // Patterns
  const classPattern = /class=["']([^"']+)["']/g
  const classBindingPattern = /:class=["']([^"']+)["']|:class=\{([^}]+)\}/g
  const idPattern = /id=["']([^"']+)["']/g
  const templateLiteralPattern = /`[^`]*class-?\$\{[^}]+\}[^`]*`/g
  const classListPattern = /classList\.(add|remove|toggle|contains)\(['"]([^'"]+)['"]\)/g
  const querySelectorPattern = /(querySelector|querySelectorAll)\(['"]([^'"]+)['"]\)/g
  const getElementByIdPattern = /getElementById\(['"]([^'"]+)['"]\)/g
  
  // Find all files to search
  const filesToSearch = []
  
  // Vue files
  function findVueFiles(dir, results = []) {
    if (!fs.existsSync(dir)) return results
    const items = fs.readdirSync(dir)
    for (const item of items) {
      const fullPath = path.join(dir, item)
      try {
        const stat = fs.statSync(fullPath)
        if (stat.isDirectory()) {
          findVueFiles(fullPath, results)
        } else if (item.endsWith('.vue')) {
          results.push(fullPath)
        }
      } catch (err) {
        // Skip if can't access
      }
    }
    return results
  }
  
  // JavaScript files
  function findJsFiles(dir, results = []) {
    if (!fs.existsSync(dir)) return results
    const items = fs.readdirSync(dir)
    for (const item of items) {
      const fullPath = path.join(dir, item)
      try {
        const stat = fs.statSync(fullPath)
        if (stat.isDirectory()) {
          findJsFiles(fullPath, results)
        } else if (item.endsWith('.js') && !item.endsWith('.min.js')) {
          results.push(fullPath)
        }
      } catch (err) {
        // Skip if can't access
      }
    }
    return results
  }
  
  const rootDir = path.resolve(__dirname, '..')
  const srcDir = path.join(rootDir, 'src')
  
  // Collect files
  filesToSearch.push(...findVueFiles(srcDir))
  filesToSearch.push(...findJsFiles(srcDir))
  
  // HTML files
  const htmlFiles = ['index.html']
  for (const htmlFile of htmlFiles) {
    const htmlPath = path.join(rootDir, htmlFile)
    if (fs.existsSync(htmlPath)) {
      filesToSearch.push(htmlPath)
    }
  }
  
  // Process each file
  for (const filePath of filesToSearch) {
    if (!fs.existsSync(filePath)) continue
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      
      // Extract classes from class="..."
      let match
      while ((match = classPattern.exec(content)) !== null) {
        const classes = match[1].split(/\s+/)
        classes.forEach(cls => {
          if (cls && !cls.startsWith('$')) {
            usedClasses.add(cls)
          }
        })
      }
      
      // Extract :class bindings
      while ((match = classBindingPattern.exec(content)) !== null) {
        const binding = match[1] || match[2]
        if (binding) {
          // Extract class names from various binding formats
          // Format: { 'class-name': true }, { class-name: condition }, 'class-name'
          const classMatches = binding.match(/(['"])([^'"]+)\1/g) || []
          classMatches.forEach(cn => {
            const clean = cn.replace(/['"]/g, '')
            clean.split(/\s+/).forEach(cls => {
              if (cls && !cls.startsWith('$')) {
                usedClasses.add(cls)
              }
            })
          })
          
          // Extract from object notation: { className: true }
          const objMatches = binding.match(/([a-z0-9_-]+)\s*:/gi) || []
          objMatches.forEach(m => {
            const className = m.replace(/\s*:/g, '').trim()
            if (className && !className.startsWith('$')) {
              usedClasses.add(className)
            }
          })
        }
      }
      
      // Extract IDs
      while ((match = idPattern.exec(content)) !== null) {
        usedIds.add(match[1])
      }
      
      // Extract from template literals
      while ((match = templateLiteralPattern.exec(content)) !== null) {
        // Extract class names from template literals (simple extraction)
        const classInTemplate = match[0].match(/class-?([a-z0-9_-]+)/gi)
        if (classInTemplate) {
          classInTemplate.forEach(c => {
            const className = c.replace(/class-?/i, '')
            if (className) {
              usedClasses.add(className)
            }
          })
        }
      }
      
      // Extract from classList methods
      while ((match = classListPattern.exec(content)) !== null) {
        usedClasses.add(match[2])
      }
      
      // Extract from querySelector
      while ((match = querySelectorPattern.exec(content)) !== null) {
        const selector = match[2]
        // Extract class names from selector
        const classMatches = selector.match(/\.[a-z0-9_-]+/gi) || []
        classMatches.forEach(c => {
          usedClasses.add(c.substring(1))
        })
        // Extract IDs
        const idMatches = selector.match(/#[a-z0-9_-]+/gi) || []
        idMatches.forEach(id => {
          usedIds.add(id.substring(1))
        })
      }
      
      // Extract from getElementById
      while ((match = getElementByIdPattern.exec(content)) !== null) {
        usedIds.add(match[1])
      }
      
    } catch (err) {
      console.warn(`⚠️  Error reading ${filePath}:`, err.message)
    }
  }
  
  return { classes: usedClasses, ids: usedIds }
}

/**
 * Check if selector should be kept (safety check)
 */
function shouldKeepSelector(selector) {
  // Check safety keep list
  if (SAFETY_KEEP_LIST.some(keep => selector.includes(keep))) {
    return true
  }
  
  // Check utility patterns
  for (const pattern of UTILITY_PATTERNS) {
    if (pattern.test(selector)) {
      return true
    }
  }
  
  // Check if has !important (likely critical)
  // This will be checked in properties, not selector
  
  return false
}

/**
 * Check if selector is used
 */
function isSelectorUsed(selector, usedClasses, usedIds, properties = '') {
  // Safety check - always keep certain selectors
  if (shouldKeepSelector(selector)) {
    return true
  }
  
  // Check if properties contain !important
  if (properties.includes('!important')) {
    return true
  }
  
  // Extract class names and IDs from selector
  const classMatches = selector.match(/\.[a-z0-9_-]+/gi) || []
  const idMatches = selector.match(/#[a-z0-9_-]+/gi) || []
  
  // Check classes
  for (const classMatch of classMatches) {
    const className = classMatch.substring(1) // Remove .
    if (usedClasses.has(className)) {
      return true
    }
  }
  
  // Check IDs
  for (const idMatch of idMatches) {
    const idName = idMatch.substring(1) // Remove #
    if (usedIds.has(idName)) {
      return true
    }
  }
  
  // Element selectors - check if they're common HTML elements
  const elementMatches = selector.match(/\b([a-z][a-z0-9]*)\b/gi) || []
  const validElements = elementMatches.filter(el => HTML_ELEMENTS.includes(el.toLowerCase()))
  if (validElements.length > 0) {
    return true
  }
  
  return false
}

/**
 * Find duplicate/conflicting selectors
 */
function findDuplicates(selectors) {
  const duplicates = []
  const conflicts = []
  
  // Group by base selector (without media query)
  const selectorGroups = new Map()
  
  for (const [fullKey, data] of selectors.entries()) {
    const baseSelector = data.selector
    if (!selectorGroups.has(baseSelector)) {
      selectorGroups.set(baseSelector, [])
    }
    selectorGroups.get(baseSelector).push({ key: fullKey, ...data })
  }
  
  // Find duplicates and conflicts
  for (const [baseSelector, variants] of selectorGroups.entries()) {
    if (variants.length > 1) {
      // Group by properties hash
      const propertyGroups = new Map()
      for (const variant of variants) {
        const propHash = hashProperties(variant.properties)
        if (!propertyGroups.has(propHash)) {
          propertyGroups.set(propHash, [])
        }
        propertyGroups.get(propHash).push(variant)
      }
      
      // Find exact duplicates (same properties)
      for (const [hash, dups] of propertyGroups.entries()) {
        if (dups.length > 1) {
          // Only report if same context (both in media query or both not)
          const contexts = dups.map(d => d.mediaQuery || 'none')
          const uniqueContexts = [...new Set(contexts)]
          if (uniqueContexts.length === 1) {
            duplicates.push({
              selector: baseSelector,
              occurrences: dups
            })
          }
        }
      }
      
      // Find conflicts (same selector, different properties, same context)
      if (propertyGroups.size > 1) {
        // Check for real conflicts (same context)
        const contextGroups = new Map()
        for (const variant of variants) {
          const context = variant.mediaQuery || 'none'
          if (!contextGroups.has(context)) {
            contextGroups.set(context, [])
          }
          contextGroups.get(context).push(variant)
        }
        
        // Conflicts only if same context has different properties
        for (const [context, contextVariants] of contextGroups.entries()) {
          if (contextPropHashes.size > 1) {
            conflicts.push({
              selector: baseSelector,
              variants: contextVariants,
              conflictType: 'different-properties',
              context: context === 'none' ? null : context
            })
          }
        }
      }
    }
  }
  
  return { duplicates, conflicts }
}

/**
 * Hash properties for comparison
 */
function hashProperties(properties) {
  const normalized = properties
    .split('\n')
    .map(p => p.trim())
    .filter(p => p && !p.startsWith('/*') && !p.startsWith('*'))
    .sort()
    .join(';')
  return normalized
}

/**
 * Main analysis function
 */
function analyzeCSS() {
  console.log('🔍 Enhanced CSS Usage Analyzer\n')
  console.log('='.repeat(60))
  
  const allSelectors = new Map()
  
  // Extract selectors from CSS files
  console.log('\n📖 Extracting selectors from CSS files...')
  for (const cssFile of CSS_FILES) {
    const filePath = path.resolve(__dirname, '..', cssFile)
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  CSS file not found: ${cssFile}`)
      continue
    }
    
    const content = fs.readFileSync(filePath, 'utf-8')
    const selectors = extractSelectors(content, cssFile)
    
    console.log(`  ✓ ${cssFile}: ${selectors.size} selectors`)
    
    for (const [key, data] of selectors.entries()) {
      if (!allSelectors.has(key)) {
        allSelectors.set(key, data)
      } else {
        console.warn(`  ⚠️  Duplicate selector key: ${key}`)
      }
    }
  }
  
  console.log(`\n📊 Total unique selectors: ${allSelectors.size}`)
  
  // Extract used classes/IDs from components
  console.log('\n🔎 Extracting used classes/IDs from components...')
  const { classes: usedClasses, ids: usedIds } = extractUsedClasses()
  console.log(`  ✓ Found ${usedClasses.size} unique classes`)
  console.log(`  ✓ Found ${usedIds.size} unique IDs`)
  
  // Find unused selectors
  console.log('\n🚫 Checking for unused selectors...')
  const unused = []
  for (const [key, data] of allSelectors.entries()) {
    if (!isSelectorUsed(data.selector, usedClasses, usedIds, data.properties)) {
      unused.push({ key, ...data })
    }
  }
  
  console.log(`  ⚠️  Found ${unused.length} potentially unused selectors`)
  
  // Find duplicates and conflicts
  console.log('\n🔄 Checking for duplicates and conflicts...')
  const { duplicates, conflicts } = findDuplicates(allSelectors)
  console.log(`  ⚠️  Found ${duplicates.length} duplicate selectors`)
  console.log(`  ⚠️  Found ${conflicts.length} conflicting selectors`)
  
  // Generate report
  console.log('\n📝 Generating report...')
  
  const report = {
    summary: {
      totalSelectors: allSelectors.size,
      unusedCount: unused.length,
      duplicateCount: duplicates.length,
      conflictCount: conflicts.length,
      usedClasses: usedClasses.size,
      usedIds: usedIds.size
    },
    unused: unused,
    duplicates: duplicates,
    conflicts: conflicts
  }
  
  // Write report
  const reportPath = path.resolve(__dirname, '..', 'css-analysis-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`  ✓ Report saved to: ${reportPath}`)
  
  // Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 SUMMARY')
  console.log('='.repeat(60))
  console.log(`Total Selectors: ${report.summary.totalSelectors}`)
  console.log(`Unused: ${report.summary.unusedCount}`)
  console.log(`Duplicates: ${report.summary.duplicateCount}`)
  console.log(`Conflicts: ${report.summary.conflictCount}`)
  console.log('\n💡 Check css-analysis-report.json for details')
  
  return report
}

// Run analysis
if (require.main === module) {
  try {
    analyzeCSS()
  } catch (err) {
    console.error('❌ Analysis failed:', err)
    process.exit(1)
  }
}

module.exports = { analyzeCSS, extractSelectors, findDuplicates, isSelectorUsed, shouldKeepSelector }
