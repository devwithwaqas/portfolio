/**
 * Smart CSS Cleanup Script
 * 
 * Improved cleanup that:
 * 1. Distinguishes responsive variants from real conflicts
 * 2. Actually removes unused CSS
 * 3. Consolidates duplicates properly
 * 4. Maintains CSS order
 * 5. Only runs if tests pass
 */

const fs = require('fs')
const path = require('path')
const { analyzeCSS } = require('./analyze-css-usage.js')
const { runTests } = require('./test-css-cleanup.js')

// CSS files to clean
const CSS_FILES = [
  'src/assets/css/font-sizes.css',
  'src/assets/css/main.css'
]

// Safety: Keep these selectors even if marked unused
const SAFE_KEEP_SELECTORS = [
  ':root',
  'html',
  'body',
  '#app',
  '.header',
  '.navmenu',
  '.main-content',
  '.mobile-nav-toggle',
  '.header-show',
  /^\.pf-/,  // Font size utility classes
  /^\.col-.*-120-/,  // Custom grid classes
  /^\.mb-.*-120-/,   // Custom margin classes
  /\.services-grid/,
  /\.isotope-container/,
  /\.epic-card/,
  /\.hero/,
  /\.service-item/
]

/**
 * Check if selector should be kept (safety check)
 */
function shouldKeepSelector(selector) {
  for (const safe of SAFE_KEEP_SELECTORS) {
    if (typeof safe === 'string') {
      if (selector === safe || selector.includes(safe)) return true
    } else if (safe instanceof RegExp) {
      if (safe.test(selector)) return true
    }
  }
  return false
}

/**
 * Check if conflict is actually a responsive variant (intentional)
 */
function isResponsiveVariant(conflict) {
  const { selector, variants } = conflict
  
  // If variants have different media queries, it's intentional responsive design
  const hasMediaQueries = variants.some(v => v.mediaQuery !== null)
  const hasNonMedia = variants.some(v => v.mediaQuery === null)
  
  if (hasMediaQueries && hasNonMedia) {
    // Base style + responsive variants = intentional
    return true
  }
  
  // Check if media queries are complementary (mobile vs desktop)
  const mediaQueries = variants
    .filter(v => v.mediaQuery)
    .map(v => v.mediaQuery.toLowerCase())
  
  if (mediaQueries.length >= 2) {
    const hasMobile = mediaQueries.some(mq => 
      mq.includes('max-width') || mq.includes('pointer: coarse')
    )
      mq.includes('min-width') && parseInt(mq.match(/min-width:\s*(\d+)/)?.[1] || '0') >= 768
    )
    
    if (hasMobile && hasDesktop) {
      return true // Mobile + Desktop = intentional responsive
    }
  }
  
  return false
}

/**
 * Parse CSS maintaining order and structure
 */
function parseCSSWithOrder(cssContent) {
  const blocks = []
  const lines = cssContent.split('\n')
  
  let currentBlock = null
  let currentMediaQuery = null
  let braceDepth = 0
  let inMediaQuery = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    
    // Detect @media
    const mediaMatch = trimmed.match(/@media\s+([^{]+)\{/)
    if (mediaMatch) {
      if (currentBlock) {
        blocks.push(currentBlock)
        currentBlock = null
      }
      currentMediaQuery = mediaMatch[1].trim()
      inMediaQuery = true
      braceDepth = 0
      currentBlock = {
        type: 'media',
        mediaQuery: currentMediaQuery,
        lineNumber: i + 1,
        content: [line],
        selectors: []
      }
      continue
    }
    
    // Track braces
    const openBraces = (line.match(/{/g) || []).length
    const closeBraces = (line.match(/}/g) || []).length
    braceDepth += openBraces - closeBraces
    
    // Detect selector
    const selectorMatch = line.match(/^([^{}]+)\s*\{/)
    if (selectorMatch) {
      if (currentBlock && currentBlock.type === 'rule') {
        blocks.push(currentBlock)
      }
      
      const selector = selectorMatch[1].trim()
      currentBlock = {
        type: 'rule',
        selector: selector,
        mediaQuery: currentMediaQuery,
        lineNumber: i + 1,
        content: [line],
        fullKey: currentMediaQuery ? `@media ${currentMediaQuery} ${selector}` : selector
      }
    } else if (currentBlock) {
      currentBlock.content.push(line)
    } else if (trimmed && !trimmed.startsWith('/*') && !trimmed.startsWith('*')) {
      // Comment or other content
      blocks.push({
        type: 'other',
        content: [line],
        lineNumber: i + 1
      })
    }
    
    // End of block
    if (braceDepth === 0 && trimmed === '}') {
      if (currentBlock) {
        blocks.push(currentBlock)
        if (inMediaQuery && braceDepth === 0) {
          inMediaQuery = false
          currentMediaQuery = null
        }
        currentBlock = null
      }
    }
  }
  
  if (currentBlock) {
    blocks.push(currentBlock)
  }
  
  return blocks
}

/**
 * Smart cleanup - only remove truly unused, keep responsive variants
 */
function smartCleanCSS(filePath, analysisReport) {
  console.log(`\n🧹 Smart Cleaning: ${filePath}`)
  
  const content = fs.readFileSync(filePath, 'utf-8')
  const blocks = parseCSSWithOrder(content)
  
  // Filter out responsive variants from conflicts
  const realConflicts = analysisReport.conflicts.filter(conflict => 
    !isResponsiveVariant(conflict)
  )
  
  console.log(`  📊 Found ${analysisReport.conflicts.length} conflicts`)
  console.log(`  ✅ ${analysisReport.conflicts.length - realConflicts.length} are responsive variants (keeping)`)
  console.log(`  ⚠️  ${realConflicts.length} are real conflicts (will resolve)`)
  
  // Create lookup maps
  const unusedMap = new Map()
  analysisReport.unused.forEach(item => {
    if (item.file === filePath && !shouldKeepSelector(item.selector)) {
      unusedMap.set(item.key, item)
    }
  })
  
  const duplicateMap = new Map()
  analysisReport.duplicates.forEach(([selector, variants]) => {
    variants.forEach(variant => {
      if (variant.file === filePath) {
        if (!duplicateMap.has(selector)) {
          duplicateMap.set(selector, [])
        }
        duplicateMap.get(selector).push(variant)
      }
    })
  })
  
  // Create conflict removal map (only real conflicts, not responsive variants)
  const conflictRemoveKeys = new Set()
  realConflicts.forEach(conflict => {
    const { variants } = conflict
    // Sort by specificity, keep highest
    variants.sort((a, b) => {
      const specDiff = b.specificity.total - a.specificity.total
      if (specDiff !== 0) return specDiff
      return a.lineNumber - b.lineNumber
    })
    
    // Mark lower specificity variants for removal
    variants.slice(1).forEach(v => {
      if (v.file === filePath) {
        const key = v.mediaQuery ? `@media ${v.mediaQuery} ${v.selector}` : v.selector
        conflictRemoveKeys.add(key)
      }
    })
  })
  
  // Filter blocks
  const cleanedBlocks = []
  const removedCount = { unused: 0, duplicates: 0, conflicts: 0 }
  const seenSelectors = new Map()
  
  for (const block of blocks) {
    if (block.type === 'other' || block.type === 'media') {
      cleanedBlocks.push(block)
      continue
    }
    
    if (block.type === 'rule') {
      const key = block.fullKey
      
      // Check if unused (and not safe to keep)
      if (unusedMap.has(key)) {
        console.log(`  ❌ Removing unused: ${block.selector} (line ${block.lineNumber})`)
        removedCount.unused++
        continue
      }
      
      // Check for duplicates - keep first occurrence
      const baseSelector = block.selector.split(',')[0].trim() // Get first selector
      if (duplicateMap.has(baseSelector)) {
        const selectorKey = block.mediaQuery 
          ? `@media ${block.mediaQuery} ${baseSelector}`
          : baseSelector
        
        if (!seenSelectors.has(selectorKey)) {
          seenSelectors.set(selectorKey, true)
        } else {
          console.log(`  ❌ Removing duplicate: ${block.selector} (line ${block.lineNumber})`)
          removedCount.duplicates++
          continue
        }
      }
      
      // Check for real conflicts (not responsive variants)
      if (conflictRemoveKeys.has(key)) {
        console.log(`  ❌ Removing conflicting: ${block.selector} (line ${block.lineNumber})`)
        removedCount.conflicts++
        continue
      }
    }
    
    cleanedBlocks.push(block)
  }
  
  // Reconstruct CSS maintaining order
  let cleanedContent = ''
  for (const block of cleanedBlocks) {
    cleanedContent += block.content.join('\n') + '\n'
  }
  
  console.log(`  ✅ Removed ${removedCount.unused} unused selectors`)
  console.log(`  ✅ Removed ${removedCount.duplicates} duplicate selectors`)
  console.log(`  ✅ Removed ${removedCount.conflicts} conflicting selectors`)
  console.log(`  📦 Total removed: ${removedCount.unused + removedCount.duplicates + removedCount.conflicts}`)
  
  return { content: cleanedContent, removed: removedCount }
}

/**
 * Main smart cleanup function
 */
async function smartCleanupCSS() {
  console.log('🧹 Smart CSS Cleanup Tool\n')
  console.log('='.repeat(60))
  
  // Run analysis
  console.log('\n📊 Running analysis...')
  const analysisReport = analyzeCSS()
  
  console.log(`\n📈 Analysis Results:`)
  console.log(`  Total selectors: ${analysisReport.summary.totalSelectors}`)
  console.log(`  Unused: ${analysisReport.summary.unusedCount}`)
  console.log(`  Duplicates: ${analysisReport.summary.duplicateCount}`)
  console.log(`  Conflicts: ${analysisReport.summary.conflictCount}`)
  
  // Clean each CSS file
  const results = {}
  const originalContents = {}
  
  for (const cssFile of CSS_FILES) {
    const filePath = path.resolve(__dirname, '..', cssFile)
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${cssFile}`)
      continue
    }
    
    originalContents[cssFile] = fs.readFileSync(filePath, 'utf-8')
    const result = smartCleanCSS(filePath, analysisReport)
    results[cssFile] = result
  }
  
  // Combine cleaned CSS for testing
  let combinedCleanedCSS = ''
  for (const cssFile of CSS_FILES) {
    if (results[cssFile]) {
      combinedCleanedCSS += results[cssFile].content
    }
  }
  
  let combinedOriginalCSS = ''
  for (const cssFile of CSS_FILES) {
    if (originalContents[cssFile]) {
      combinedOriginalCSS += originalContents[cssFile]
    }
  }
  
  // Run tests
  console.log('\n' + '='.repeat(60))
  console.log('🧪 Running Tests...')
  console.log('='.repeat(60))
  
  const testResult = await runTests(combinedOriginalCSS, combinedCleanedCSS)
  
  if (!testResult.passed) {
    console.log('\n❌ TESTS FAILED - Cleanup would break styles!')
    console.log('💡 Review failed tests above and fix cleanup script')
    return { success: false, results, testResult }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 CLEANUP SUMMARY')
  console.log('='.repeat(60))
  
  let totalRemoved = { unused: 0, duplicates: 0, conflicts: 0 }
  for (const [file, result] of Object.entries(results)) {
    console.log(`\n${file}:`)
    console.log(`  Unused removed: ${result.removed.unused}`)
    console.log(`  Duplicates removed: ${result.removed.duplicates}`)
    console.log(`  Conflicts removed: ${result.removed.conflicts}`)
    totalRemoved.unused += result.removed.unused
    totalRemoved.duplicates += result.removed.duplicates
    totalRemoved.conflicts += result.removed.conflicts
  }
  
  const total = totalRemoved.unused + totalRemoved.duplicates + totalRemoved.conflicts
  console.log(`\nTotal removed: ${total} selectors`)
  
  return { success: true, results, testResult, totalRemoved }
}

/**
 * Apply smart cleanup (with test validation)
 */
async function applySmartCleanup(dryRun = true) {
  const cleanupResult = await smartCleanupCSS()
  
  if (!cleanupResult.success) {
    console.log('\n❌ Cleanup aborted - tests failed!')
    return cleanupResult
  }
  
  if (dryRun) {
    console.log('\n⚠️  DRY RUN MODE - No files were modified')
    console.log('💡 Run with --apply flag to actually clean files')
    return cleanupResult
  }
  
  console.log('\n💾 Applying cleanup (creating backups)...')
  
  for (const cssFile of CSS_FILES) {
    const filePath = path.resolve(__dirname, '..', cssFile)
    const backupPath = filePath + '.backup'
    
    if (!fs.existsSync(filePath)) continue
    
    // Create backup
    fs.copyFileSync(filePath, backupPath)
    console.log(`  ✓ Backup created: ${backupPath}`)
    
    // Write cleaned content
    const result = cleanupResult.results[cssFile]
    if (result && result.content) {
      fs.writeFileSync(filePath, result.content, 'utf-8')
      console.log(`  ✓ Cleaned file written: ${filePath}`)
    }
  }
  
  console.log('\n✅ Cleanup applied! Backups saved with .backup extension')
  return cleanupResult
}

// Run cleanup
if (require.main === module) {
  (async () => {
    try {
      const apply = process.argv.includes('--apply')
      if (apply) {
        console.log('⚠️  APPLY MODE - Files will be modified!\n')
        await applySmartCleanup(false)
      } else {
        await applySmartCleanup(true)
      }
    } catch (err) {
      console.error('❌ Cleanup failed:', err)
      process.exit(1)
    }
  })()
}

module.exports = { smartCleanupCSS, applySmartCleanup, isResponsiveVariant }
