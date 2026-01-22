/**
 * Simple CSS Cleanup - Removes entire unused rule blocks
 * Safer approach: preserves all formatting and only removes complete unused rules
 */

const fs = require('fs')
const path = require('path')
const { analyzeCSS, isSelectorUsed, shouldKeepSelector } = require('./analyze-css-usage')
const { runTests } = require('./test-css-cleanup')

const CSS_FILES = [
  'src/assets/css/font-sizes.css',
  'src/assets/css/main.css'
]

/**
 * Simple cleanup: remove entire rule blocks if all selectors are unused
 */
function simpleCleanup(report) {
  const rootDir = path.resolve(__dirname, '..')
  const cleanedFiles = {}
  
  // Create unused selector set for quick lookup
  const unusedSet = new Set()
  for (const unused of report.unused) {
    const key = unused.mediaQuery 
      ? `@media ${unused.mediaQuery} ${unused.selector}`
      : unused.selector
    unusedSet.add(key)
  }
  
  // Extract used classes/IDs for checking
  const { extractUsedClasses } = require('./analyze-css-usage')
  const { classes: usedClasses, ids: usedIds } = extractUsedClasses()
  
  for (const cssFile of CSS_FILES) {
    const filePath = path.join(rootDir, cssFile)
    if (!fs.existsSync(filePath)) continue
    
    const originalContent = fs.readFileSync(filePath, 'utf-8')
    const lines = originalContent.split('\n')
    const output = []
    
    let i = 0
    let removedCount = 0
    
    while (i < lines.length) {
      const line = lines[i]
      const trimmed = line.trim()
      
      // Check if this line starts a CSS rule
      const ruleMatch = trimmed.match(/^([^{}]+)\s*\{/)
      if (ruleMatch && !trimmed.startsWith('@media') && !trimmed.startsWith('/*') && !trimmed.startsWith('*')) {
        const selectorText = ruleMatch[1].trim()
        const selectors = selectorText.split(',').map(s => s.trim()).filter(s => s)
        
        // Find the end of this rule block
        let braceDepth = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length
        let ruleEnd = i
        let ruleLines = [line]
        
        // Skip if it's a media query
        if (trimmed.startsWith('@media')) {
          output.push(line)
          i++
          continue
        }
        
        // Find closing brace
        for (let j = i + 1; j < lines.length && braceDepth > 0; j++) {
          ruleLines.push(lines[j])
          const openBraces = (lines[j].match(/{/g) || []).length
          const closeBraces = (lines[j].match(/}/g) || []).length
          braceDepth += openBraces - closeBraces
          ruleEnd = j
        }
        
        // Check if all selectors in this rule are unused
        let allUnused = true
        let shouldKeep = false
        
        for (const selector of selectors) {
          const key = selector
          const isUnused = unusedSet.has(key)
          const isSafe = shouldKeepSelector(selector, ruleLines.join('\n'))
          
          // Check if actually used
          const isUsed = !isUnused || isSafe
          
          if (isUsed || isSafe) {
            allUnused = false
            break
          }
          
          // Also check if selector is actually used in code
          if (!isUnused) {
            allUnused = false
            break
          }
        }
        
        // Keep rule if any selector should be kept or is used
        if (!allUnused || selectors.some(s => shouldKeepSelector(s, ruleLines.join('\n')))) {
          // Keep the entire rule
          ruleLines.forEach(l => output.push(l))
        } else {
          // Remove the entire rule
          removedCount++
        }
        
        i = ruleEnd + 1
      } else {
        // Not a rule start, just keep the line
        output.push(line)
        i++
      }
    }
    
    cleanedFiles[cssFile] = {
      original: originalContent,
      cleaned: output.join('\n'),
      removedCount
    }
    
    console.log(`  ✓ Removed ${removedCount} unused rule blocks`)
  }
  
  return cleanedFiles
}

/**
 * Main cleanup with simple approach
 */
function performSimpleCleanup(dryRun = false) {
  console.log('🧹 Simple CSS Cleanup Script\n')
  console.log('='.repeat(60))
  
  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n')
  }
  
  // Step 1: Run analysis
  console.log('📊 Step 1: Running CSS analysis...')
  const report = analyzeCSS()
  
  // Step 2: Run tests
  console.log('\n🧪 Step 2: Running tests...')
  const testsPassed = runTests()
  if (!testsPassed) {
    console.error('\n❌ Tests failed! Aborting cleanup.')
    return false
  }
  
  // Step 3: Create backups
  if (!dryRun) {
    console.log('\n💾 Step 3: Creating backups...')
    const rootDir = path.resolve(__dirname, '..')
    for (const cssFile of CSS_FILES) {
      const filePath = path.join(rootDir, cssFile)
      if (fs.existsSync(filePath)) {
        const backupPath = filePath + '.backup'
        fs.copyFileSync(filePath, backupPath)
        console.log(`  ✓ Backup created: ${backupPath}`)
      }
    }
  }
  
  // Step 4: Perform cleanup
  console.log('\n🧹 Step 4: Performing cleanup...')
  const cleanedFiles = simpleCleanup(report)
  
  // Step 5: Apply cleaned CSS
  const rootDir = path.resolve(__dirname, '..')
  const beforeSizes = {}
  const afterSizes = {}
  
  for (const cssFile of CSS_FILES) {
    const filePath = path.join(rootDir, cssFile)
    if (fs.existsSync(filePath)) {
      beforeSizes[cssFile] = fs.statSync(filePath).size
    }
  }
  
  if (!dryRun) {
    console.log('\n💾 Step 5: Applying cleaned CSS...')
    for (const [cssFile, data] of Object.entries(cleanedFiles)) {
      const filePath = path.join(rootDir, cssFile)
      fs.writeFileSync(filePath, data.cleaned, 'utf-8')
      afterSizes[cssFile] = fs.statSync(filePath).size
      console.log(`  ✓ Updated ${cssFile}`)
    }
  } else {
    for (const [cssFile, data] of Object.entries(cleanedFiles)) {
      afterSizes[cssFile] = Buffer.byteLength(data.cleaned, 'utf-8')
    }
  }
  
  // Step 6: Run tests on cleaned CSS
  if (!dryRun) {
    console.log('\n🧪 Step 6: Running tests on cleaned CSS...')
    const testsPassedAfter = runTests()
    if (!testsPassedAfter) {
      console.error('\n❌ Tests failed after cleanup! Restoring backups...')
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
  }
  
  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 CLEANUP SUMMARY')
  console.log('='.repeat(60))
  
  let totalRemoved = 0
  for (const [cssFile, data] of Object.entries(cleanedFiles)) {
    totalRemoved += data.removedCount
    const beforeSize = beforeSizes[cssFile] || 0
    const afterSize = afterSizes[cssFile] || 0
    const reduction = beforeSize - afterSize
    const reductionPercent = beforeSize > 0 ? ((reduction / beforeSize) * 100).toFixed(2) : 0
    
    console.log(`\n${cssFile}:`)
    console.log(`  Removed: ${data.removedCount} rule blocks`)
    console.log(`  Size: ${(beforeSize / 1024).toFixed(2)} KB → ${(afterSize / 1024).toFixed(2)} KB (${reductionPercent}% reduction)`)
  }
  
  const totalBefore = Object.values(beforeSizes).reduce((a, b) => a + b, 0)
  const totalAfter = Object.values(afterSizes).reduce((a, b) => a + b, 0)
  const totalReduction = totalBefore - totalAfter
  const totalReductionPercent = totalBefore > 0 ? ((totalReduction / totalBefore) * 100).toFixed(2) : 0
  
  console.log(`\nTotal:`)
  console.log(`  Removed: ${totalRemoved} rule blocks`)
  console.log(`  Size: ${(totalBefore / 1024).toFixed(2)} KB → ${(totalAfter / 1024).toFixed(2)} KB (${totalReductionPercent}% reduction)`)
  
  if (!dryRun) {
    console.log('\n✅ Cleanup completed successfully!')
    console.log('💡 Backups saved with .backup extension')
  }
  
  return true
}

if (require.main === module) {
  const args = process.argv.slice(2)
  const dryRun = !args.includes('--apply')
  
  try {
    const success = performSimpleCleanup(dryRun)
    process.exit(success ? 0 : 1)
  } catch (err) {
    console.error('❌ Cleanup failed:', err)
    process.exit(1)
  }
}

module.exports = { performSimpleCleanup }
