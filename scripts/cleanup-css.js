/**
 * CSS Cleanup Script
 * 
 * Performs safe CSS cleanup:
 * 1. Removes unused selectors (with safety checks)
 * 2. Consolidates duplicate selectors
 * 3. Resolves conflicts (keeps higher specificity)
 * 4. Creates backups before applying changes
 * 5. Runs tests before and after cleanup
 */

const fs = require('fs')
const path = require('path')
const { analyzeCSS } = require('./analyze-css-usage')
const { runTests } = require('./test-css-cleanup')

// CSS files to clean
const CSS_FILES = [
  'src/assets/css/font-sizes.css',
  'src/assets/css/main.css'
]

// Safety keep list
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

// Utility class patterns
const UTILITY_PATTERNS = [
  /^\.pf-/,           // .pf-* classes
  /^\.col-.*-120-/,    // .col-*-120-* classes
  /^\.mb-.*-120-/      // .mb-*-120-* classes
]

/**
 * Check if selector should be kept
 */
function shouldKeepSelector(selector, properties = '') {
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
  
  // Check if inside @media query (responsive variant - always keep)
  // This is checked at a higher level
  
  // Check if has !important (likely critical)
  if (properties.includes('!important')) {
    return true
  }
  
  return false
}

/**
 * Parse CSS into structured format
 */
function parseCSS(cssContent) {
  const rules = []
  const lines = cssContent.split('\n')
  
  let currentMediaQuery = null
  let braceDepth = 0
  let inMediaQuery = false
  let currentSelectors = []
  let currentProperties = []
  let selectorStartLine = 0
  let inComment = false
  
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
    if (inComment) {
      continue
    }
    
    // Detect @media queries
    const mediaMatch = trimmed.match(mediaQueryPattern)
    if (mediaMatch) {
      // Save previous rule if exists
      if (currentSelectors.length > 0) {
        rules.push({
          type: 'rule',
          selectors: [...currentSelectors],
          properties: currentProperties.join('\n'),
          startLine: selectorStartLine,
          endLine: i,
          mediaQuery: currentMediaQuery,
          originalLines: lines.slice(selectorStartLine - 1, i)
        })
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
    
    // Detect selector
    const selectorMatch = line.match(selectorPattern)
    if (selectorMatch && braceDepth === (inMediaQuery ? 1 : 0)) {
      // Save previous rule if exists
      if (currentSelectors.length > 0) {
        rules.push({
          type: 'rule',
          selectors: [...currentSelectors],
          properties: currentProperties.join('\n'),
          startLine: selectorStartLine,
          endLine: i,
          mediaQuery: currentMediaQuery,
          originalLines: lines.slice(selectorStartLine - 1, i)
        })
      }
      
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
        rules.push({
          type: 'rule',
          selectors: [...currentSelectors],
          properties: currentProperties.join('\n'),
          startLine: selectorStartLine,
          endLine: i + 1,
          mediaQuery: currentMediaQuery,
          originalLines: lines.slice(selectorStartLine - 1, i + 1)
        })
        currentSelectors = []
        currentProperties = []
      }
      
      if (inMediaQuery && braceDepth === 0) {
        // Save media query wrapper
        rules.push({
          type: 'media-end',
          line: i
        })
        inMediaQuery = false
        currentMediaQuery = null
      }
    }
  }
  
  // Save any remaining rule
  if (currentSelectors.length > 0) {
    rules.push({
      type: 'rule',
      selectors: [...currentSelectors],
      properties: currentProperties.join('\n'),
      startLine: selectorStartLine,
      endLine: lines.length,
      mediaQuery: currentMediaQuery,
      originalLines: lines.slice(selectorStartLine - 1)
    })
  }
  
  return { rules, lines }
}

/**
 * Create backup of CSS files
 */
function createBackups() {
  const backups = []
  const rootDir = path.resolve(__dirname, '..')
  
  for (const cssFile of CSS_FILES) {
    const filePath = path.join(rootDir, cssFile)
    if (fs.existsSync(filePath)) {
      const backupPath = filePath + '.backup'
      fs.copyFileSync(filePath, backupPath)
      backups.push(backupPath)
      console.log(`  ✓ Backup created: ${backupPath}`)
    }
  }
  
  return backups
}

/**
 * Calculate specificity for conflict resolution
 */
function calculateSpecificity(selector) {
  const cleanSelector = selector.replace(/::?[a-z-]+/gi, '')
  const idCount = (cleanSelector.match(/#[a-z0-9_-]+/gi) || []).length
  const classCount = (cleanSelector.match(/\.[a-z0-9_-]+/gi) || []).length
  const elementCount = (cleanSelector.match(/\b([a-z][a-z0-9]*)\b/gi) || []).length
  return (idCount * 100) + (classCount * 10) + elementCount
}

/**
 * Clean CSS based on analysis report
 */
function cleanCSS(report) {
  const rootDir = path.resolve(__dirname, '..')
  const cleanedFiles = {}
  const removalLog = []
  const consolidationLog = []
  const conflictLog = []
  
  // Create map of unused selectors for quick lookup
  const unusedMap = new Map()
  for (const unused of report.unused) {
    const key = unused.mediaQuery 
      ? `@media ${unused.mediaQuery} ${unused.selector}`
      : unused.selector
    unusedMap.set(key, unused)
  }
  
  // Create map of duplicates
  const duplicateMap = new Map()
  for (const dup of report.duplicates) {
    duplicateMap.set(dup.selector, dup.occurrences)
  }
  
  // Create map of conflicts
  const conflictMap = new Map()
  for (const conflict of report.conflicts) {
    conflictMap.set(conflict.selector, conflict)
  }
  
  // Process each CSS file
  for (const cssFile of CSS_FILES) {
    const filePath = path.join(rootDir, cssFile)
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  CSS file not found: ${cssFile}`)
      continue
    }
    
    console.log(`\n🧹 Cleaning ${cssFile}...`)
    
    const originalContent = fs.readFileSync(filePath, 'utf-8')
    const { rules, lines } = parseCSS(originalContent)
    
    const keptRules = []
    let removedCount = 0
    let consolidatedCount = 0
    let resolvedCount = 0
    
    // Process rules
    for (const rule of rules) {
      if (rule.type === 'media-end') {
        // Always keep media query endings
        continue
      }
      
      if (rule.type !== 'rule') {
        continue
      }
      
      // Check each selector in the rule
      let shouldKeepRule = false
      const keptSelectors = []
      
      for (const selector of rule.selectors) {
        const key = rule.mediaQuery 
          ? `@media ${rule.mediaQuery} ${selector}`
          : selector
        
        // Check if unused
        const isUnused = unusedMap.has(key)
        
        // Safety checks
        const isSafe = shouldKeepSelector(selector, rule.properties)
        const isInMediaQuery = rule.mediaQuery !== null
        
        // Decision: keep or remove
        if (isSafe || isInMediaQuery) {
          // Always keep if in safety list or in media query
          shouldKeepRule = true
          keptSelectors.push(selector)
        } else if (!isUnused) {
          // Used selector - keep
          shouldKeepRule = true
          keptSelectors.push(selector)
        } else {
          // Unused and not safe - mark for removal
          removalLog.push({
            file: cssFile,
            selector: selector,
            line: rule.startLine,
            mediaQuery: rule.mediaQuery,
            reason: 'unused'
          })
          removedCount++
        }
      }
      
      // Check for duplicates
      if (keptSelectors.length > 0) {
        for (const selector of keptSelectors) {
          const dupInfo = duplicateMap.get(selector)
          if (dupInfo && dupInfo.length > 1) {
            // Keep first occurrence, mark others for removal
            const firstOccurrence = dupInfo[0]
            const isFirst = firstOccurrence.lineNumber === rule.startLine && 
                           firstOccurrence.file === cssFile
            
            if (!isFirst) {
              // This is a duplicate - remove it
              const index = keptSelectors.indexOf(selector)
              if (index > -1) {
                keptSelectors.splice(index, 1)
              }
              consolidationLog.push({
                file: cssFile,
                selector: selector,
                line: rule.startLine,
                reason: 'duplicate'
              })
              consolidatedCount++
            }
          }
        }
      }
      
      // Check for conflicts
      if (keptSelectors.length > 0) {
        for (const selector of keptSelectors) {
          const conflictInfo = conflictMap.get(selector)
          if (conflictInfo) {
            // Resolve conflict - keep higher specificity
            const currentSpecificity = calculateSpecificity(selector)
            const maxSpecificity = Math.max(
              ...conflictInfo.variants.map(v => 
                (v.specificity?.total || 0)
              )
            )
            
            if (currentSpecificity < maxSpecificity) {
              // Lower specificity - remove
              const index = keptSelectors.indexOf(selector)
              if (index > -1) {
                keptSelectors.splice(index, 1)
              }
              conflictLog.push({
                file: cssFile,
                selector: selector,
                line: rule.startLine,
                reason: 'lower-specificity',
                keptSpecificity: maxSpecificity
              })
              resolvedCount++
            } else {
              conflictLog.push({
                file: cssFile,
                selector: selector,
                line: rule.startLine,
                reason: 'kept-higher-specificity',
                specificity: currentSpecificity
              })
            }
          }
        }
      }
      
      // Keep rule if it has kept selectors
      if (keptSelectors.length > 0) {
        // Reconstruct rule with only kept selectors
        const newRule = {
          ...rule,
          selectors: keptSelectors
        }
        keptRules.push(newRule)
      }
    }
    
    // Reconstruct CSS - use a simpler approach: output original lines for kept rules
    const cleanedContent = reconstructCSSFromOriginal(keptRules, originalContent)
    cleanedFiles[cssFile] = {
      original: originalContent,
      cleaned: cleanedContent,
      removedCount,
      consolidatedCount,
      resolvedCount
    }
    
    console.log(`  ✓ Removed ${removedCount} unused selectors`)
    console.log(`  ✓ Consolidated ${consolidatedCount} duplicates`)
    console.log(`  ✓ Resolved ${resolvedCount} conflicts`)
  }
  
  return {
    cleanedFiles,
    removalLog,
    consolidationLog,
    conflictLog
  }
}

/**
 * Reconstruct CSS from kept rules using original content
 * Simple approach: output originalLines for each kept rule, preserving everything
 */
function reconstructCSSFromOriginal(rules, originalContent) {
  const originalLines = originalContent.split('\n')
  const output = []
  const keepLineSet = new Set()
  const modifyLineMap = new Map() // line index -> modified content
  
  // Sort rules by start line
  const sortedRules = rules
    .filter(r => r.type === 'rule' && r.selectors.length > 0)
    .sort((a, b) => a.startLine - b.startLine)
  
  // Track media query context
  const mediaQueryRanges = []
  let currentMediaStart = -1
  let braceDepth = 0
  
  // First pass: identify media query ranges
  for (let i = 0; i < originalLines.length; i++) {
    const trimmed = originalLines[i].trim()
    if (trimmed.startsWith('@media')) {
      currentMediaStart = i
      braceDepth = 0
    }
    if (currentMediaStart >= 0) {
      const openBraces = (originalLines[i].match(/{/g) || []).length
      const closeBraces = (originalLines[i].match(/}/g) || []).length
      braceDepth += openBraces - closeBraces
      if (braceDepth === 0 && trimmed === '}') {
        mediaQueryRanges.push({ start: currentMediaStart, end: i })
        currentMediaStart = -1
      }
    }
  }
  
  // Mark lines to keep from rules
  for (const rule of sortedRules) {
    if (rule.originalLines && rule.originalLines.length > 0) {
      const startIdx = rule.startLine - 1
      const endIdx = Math.min(rule.endLine - 1, startIdx + rule.originalLines.length - 1)
      
      // Check if selector line needs modification
      const selectorLine = rule.originalLines[0]
      const originalSelectors = selectorLine.split(',').map(s => {
        const clean = s.trim()
        return clean.replace(/\s*\{.*$/, '')
      }).filter(s => s)
      
      if (rule.selectors.length < originalSelectors.length && rule.selectors.length > 0) {
        // Modify selector line
        const braceMatch = selectorLine.match(/(\s*\{)/)
        const brace = braceMatch ? braceMatch[1] : ' {'
        modifyLineMap.set(startIdx, indent + rule.selectors.join(', ') + brace)
      }
      
      // Mark all lines in this rule to keep
      for (let i = startIdx; i <= endIdx; i++) {
        keepLineSet.add(i)
      }
    }
  }
  
  // Mark media query lines if they contain kept rules
  for (const range of mediaQueryRanges) {
    let hasKeptRule = false
    for (let i = range.start; i <= range.end; i++) {
      if (keepLineSet.has(i)) {
        hasKeptRule = true
        break
      }
    }
    if (hasKeptRule) {
      // Keep entire media query block
      for (let i = range.start; i <= range.end; i++) {
        keepLineSet.add(i)
      }
    }
  }
  
  // Keep all comments and structural elements
  for (let i = 0; i < originalLines.length; i++) {
    const trimmed = originalLines[i].trim()
    if (trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.endsWith('*/')) {
      keepLineSet.add(i)
    }
  }
  
  // Output lines in order
  for (let i = 0; i < originalLines.length; i++) {
    if (keepLineSet.has(i)) {
      if (modifyLineMap.has(i)) {
        output.push(modifyLineMap.get(i))
      } else {
        output.push(originalLines[i])
      }
    }
  }
  
  return output.join('\n')
}

/**
 * Main cleanup function
 */
function performCleanup(dryRun = false) {
  console.log('🧹 CSS Cleanup Script\n')
  console.log('='.repeat(60))
  
  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n')
  }
  
  // Step 1: Run analysis
  console.log('📊 Step 1: Running CSS analysis...')
  const report = analyzeCSS()
  
  // Step 2: Run tests on original CSS
  console.log('\n🧪 Step 2: Running tests on original CSS...')
  const testsPassed = runTests()
  
  if (!testsPassed) {
    console.error('\n❌ Tests failed! Aborting cleanup.')
    return false
  }
  
  // Step 3: Create backups
  if (!dryRun) {
    console.log('\n💾 Step 3: Creating backups...')
    createBackups()
  } else {
    console.log('\n💾 Step 3: Would create backups (dry run)')
  }
  
  // Step 4: Perform cleanup
  console.log('\n🧹 Step 4: Performing cleanup...')
  const cleanupResult = cleanCSS(report)
  
  // Step 5: Calculate file sizes
  const rootDir = path.resolve(__dirname, '..')
  const beforeSizes = {}
  const afterSizes = {}
  
  for (const cssFile of CSS_FILES) {
    const filePath = path.join(rootDir, cssFile)
    if (fs.existsSync(filePath)) {
      beforeSizes[cssFile] = fs.statSync(filePath).size
    }
  }
  
  // Step 6: Apply cleaned CSS (if not dry run)
  if (!dryRun) {
    console.log('\n💾 Step 5: Applying cleaned CSS...')
    for (const [cssFile, data] of Object.entries(cleanupResult.cleanedFiles)) {
      const filePath = path.join(rootDir, cssFile)
      fs.writeFileSync(filePath, data.cleaned, 'utf-8')
      afterSizes[cssFile] = fs.statSync(filePath).size
      console.log(`  ✓ Updated ${cssFile}`)
    }
  } else {
    console.log('\n💾 Step 5: Would apply cleaned CSS (dry run)')
    for (const [cssFile, data] of Object.entries(cleanupResult.cleanedFiles)) {
      afterSizes[cssFile] = Buffer.byteLength(data.cleaned, 'utf-8')
    }
  }
  
  // Step 7: Run tests on cleaned CSS
  if (!dryRun) {
    console.log('\n🧪 Step 6: Running tests on cleaned CSS...')
    const testsPassedAfter = runTests()
    
    if (!testsPassedAfter) {
      console.error('\n❌ Tests failed after cleanup! Restoring backups...')
      // Restore backups
      for (const cssFile of CSS_FILES) {
        const filePath = path.join(rootDir, cssFile)
        const backupPath = filePath + '.backup'
        if (fs.existsSync(backupPath)) {
          fs.copyFileSync(backupPath, filePath)
          console.log(`  ✓ Restored ${cssFile}`)
        }
      }
      return false
    }
  } else {
    console.log('\n🧪 Step 6: Would run tests on cleaned CSS (dry run)')
  }
  
  // Step 8: Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 CLEANUP SUMMARY')
  console.log('='.repeat(60))
  
  let totalRemoved = 0
  let totalConsolidated = 0
  let totalResolved = 0
  
  for (const [cssFile, data] of Object.entries(cleanupResult.cleanedFiles)) {
    totalRemoved += data.removedCount
    totalConsolidated += data.consolidatedCount
    totalResolved += data.resolvedCount
    
    const beforeSize = beforeSizes[cssFile] || 0
    const afterSize = afterSizes[cssFile] || 0
    const reduction = beforeSize - afterSize
    const reductionPercent = beforeSize > 0 ? ((reduction / beforeSize) * 100).toFixed(2) : 0
    
    console.log(`\n${cssFile}:`)
    console.log(`  Removed: ${data.removedCount} selectors`)
    console.log(`  Consolidated: ${data.consolidatedCount} duplicates`)
    console.log(`  Resolved: ${data.resolvedCount} conflicts`)
    console.log(`  Size: ${(beforeSize / 1024).toFixed(2)} KB → ${(afterSize / 1024).toFixed(2)} KB (${reductionPercent}% reduction)`)
  }
  
  const totalBefore = Object.values(beforeSizes).reduce((a, b) => a + b, 0)
  const totalAfter = Object.values(afterSizes).reduce((a, b) => a + b, 0)
  const totalReduction = totalBefore - totalAfter
  const totalReductionPercent = totalBefore > 0 ? ((totalReduction / totalBefore) * 100).toFixed(2) : 0
  
  console.log(`\nTotal:`)
  console.log(`  Removed: ${totalRemoved} selectors`)
  console.log(`  Consolidated: ${totalConsolidated} duplicates`)
  console.log(`  Resolved: ${totalResolved} conflicts`)
  console.log(`  Size: ${(totalBefore / 1024).toFixed(2)} KB → ${(totalAfter / 1024).toFixed(2)} KB (${totalReductionPercent}% reduction)`)
  
  if (dryRun) {
    console.log('\n💡 This was a dry run. Use --apply to actually perform cleanup.')
  } else {
    console.log('\n✅ Cleanup completed successfully!')
    console.log('💡 Backups saved with .backup extension')
  }
  
  return true
}

// Run cleanup
if (require.main === module) {
  const args = process.argv.slice(2)
  const dryRun = !args.includes('--apply')
  
  try {
    const success = performCleanup(dryRun)
    process.exit(success ? 0 : 1)
  } catch (err) {
    console.error('❌ Cleanup failed:', err)
    process.exit(1)
  }
}

module.exports = { performCleanup, cleanCSS, createBackups }
