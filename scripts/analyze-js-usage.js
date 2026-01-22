/**
 * Enhanced JavaScript Usage Analyzer
 * 
 * Analyzes JavaScript files to:
 * 1. Extract ALL functions, classes, variables (not just exports)
 * 2. Extract Vue component internals (computed, methods, data, props, lifecycle hooks)
 * 3. Check if they're used across the codebase or within components
 * 4. Detect duplicate code patterns (especially computed/methods across components)
 * 5. Identify unused internal functions/variables
 * 6. Detect functions that only run on page load/document.ready
 */

const fs = require('fs')
const path = require('path')

// Safety keep list - never remove these
const SAFETY_KEEP_LIST = [
  'main.js', 'App.vue', 'router/index.js',
  'createApp', 'createRouter', 'mount', 'use',
  'mounted', 'created', 'beforeMount', 'beforeUnmount', 'unmounted', 'setup',
  'beforeEach', 'afterEach'
]

// Vue lifecycle hooks (always used, don't mark as unused)
const VUE_LIFECYCLE_HOOKS = [
  'beforeCreate', 'created', 'beforeMount', 'mounted',
  'beforeUpdate', 'updated', 'beforeUnmount', 'unmounted',
  'activated', 'deactivated', 'errorCaptured', 'renderTracked', 'renderTriggered'
]

// Event handlers and page load hooks (always used)
const EVENT_HANDLERS = [
  'onClick', 'onSubmit', 'onChange', 'onInput', 'onFocus', 'onBlur',
  'addEventListener', 'document.ready', 'DOMContentLoaded', 'window.onload'
]

// Patterns for utility functions
const UTILITY_PATTERNS = [
  /^get.*SEO$/i, /^set.*SEO$/i, /^track.*View$/i, /^generate.*Data$/i,
  /^.*Resolver$/i, /^.*Service$/i, /^loadComponent$/i
]

/**
 * Find all JavaScript files in the project
 */
function findJSFiles(rootDir = path.resolve(__dirname, '..')) {
  const files = []
  
  function walkDir(dir, relativePath = '') {
    if (!fs.existsSync(dir)) return
    
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      if (entry.name.startsWith('.') || 
          entry.name === 'node_modules' || 
          entry.name === 'dist' ||
          entry.name === 'build' ||
          entry.name === '.firebase') {
        continue
      }
      
      const fullPath = path.join(dir, entry.name)
      const relPath = path.join(relativePath, entry.name).replace(/\\/g, '/')
      
      if (entry.isDirectory()) {
        walkDir(fullPath, relPath)
      } else if (entry.isFile()) {
        if (entry.name.endsWith('.js') || entry.name.endsWith('.vue')) {
          if (relPath.startsWith('src/') || 
              relPath.startsWith('scripts/') || 
              relPath.startsWith('public/assets/js/')) {
            files.push({
              path: fullPath,
              relativePath: relPath,
              name: entry.name
            })
          }
        }
      }
    }
  }
  
  walkDir(rootDir)
  return files
}

/**
 * Extract JavaScript code from Vue files
 */
function extractVueScript(content) {
  const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/i)
  return scriptMatch ? scriptMatch[1] : ''
}

/**
 * Extract Vue component internals (Options API)
 */
function extractVueOptionsAPI(content) {
  const internals = {
    data: [],
    computed: [],
    methods: [],
    props: [],
    watch: [],
    lifecycle: []
  }
  
  // Extract data() properties
  const dataMatch = content.match(/data\s*\([^)]*\)\s*\{[\s\S]*?return\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/)
  if (dataMatch) {
    const dataContent = dataMatch[1]
    const propPattern = /(\w+)\s*:/g
    let match
    while ((match = propPattern.exec(dataContent)) !== null) {
      internals.data.push(match[1])
    }
  }
  
  // Extract computed properties
  const computedMatch = content.match(/computed\s*:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/)
  if (computedMatch) {
    const computedContent = computedMatch[1]
    const computedPattern = /(\w+)\s*\([^)]*\)\s*\{/g
    let match
    while ((match = computedPattern.exec(computedContent)) !== null) {
      internals.computed.push(match[1])
    }
  }
  
  // Extract methods
  const methodsMatch = content.match(/methods\s*:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/)
  if (methodsMatch) {
    const methodsContent = methodsMatch[1]
    const methodPattern = /(\w+)\s*\([^)]*\)\s*\{/g
    let match
    while ((match = methodPattern.exec(methodsContent)) !== null) {
      internals.methods.push(match[1])
    }
  }
  
  // Extract props
  const propsMatch = content.match(/props\s*:\s*\[([^\]]+)\]|props\s*:\s*\{([^}]+)\}/)
  if (propsMatch) {
    const propsContent = propsMatch[1] || propsMatch[2]
    const propPattern = /['"]?(\w+)['"]?/g
    let match
    while ((match = propPattern.exec(propsContent)) !== null) {
      if (match[1] !== 'type' && match[1] !== 'default' && match[1] !== 'required') {
        internals.props.push(match[1])
      }
    }
  }
  
  // Extract lifecycle hooks
  for (const hook of VUE_LIFECYCLE_HOOKS) {
    if (new RegExp(`\\b${hook}\\s*\\(`).test(content)) {
      internals.lifecycle.push(hook)
    }
  }
  
  return internals
}

/**
 * Extract Vue Composition API (setup function)
 */
function extractVueCompositionAPI(content) {
  const internals = {
    refs: [],
    computed: [],
    functions: [],
    constants: []
  }
  
  // Extract ref() declarations
  const refPattern = /(?:const|let|var)\s+(\w+)\s*=\s*ref\s*\(/g
  let match
  while ((match = refPattern.exec(content)) !== null) {
    internals.refs.push(match[1])
  }
  
  // Extract computed()
  const computedPattern = /(?:const|let|var)\s+(\w+)\s*=\s*computed\s*\(/g
  while ((match = computedPattern.exec(content)) !== null) {
    internals.computed.push(match[1])
  }
  
  // Extract functions in setup
  const setupMatch = content.match(/setup\s*\([^)]*\)\s*\{([\s\S]*?)(?:return\s*\{|$)/)
  if (setupMatch) {
    const setupContent = setupMatch[1]
    const funcPattern = /(?:const|let|var|function)\s+(\w+)\s*[=(]/g
    while ((match = funcPattern.exec(setupContent)) !== null) {
      if (!internals.refs.includes(match[1]) && !internals.computed.includes(match[1])) {
        internals.functions.push(match[1])
      }
    }
  }
  
  return internals
}

/**
 * Extract ALL functions from a file (not just exports)
 */
function extractAllFunctions(content) {
  const functions = []
  
  // Function declarations
  const funcDeclPattern = /(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*\(/g
  let match
  while ((match = funcDeclPattern.exec(content)) !== null) {
    functions.push({
      name: match[1],
      type: 'function',
      isExported: content.substring(0, match.index).includes('export')
    })
  }
  
  // Arrow functions assigned to variables
  const arrowFuncPattern = /(?:export\s+)?(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?\([^)]*\)\s*=>/g
  while ((match = arrowFuncPattern.exec(content)) !== null) {
    functions.push({
      name: match[1],
      type: 'arrow_function',
      isExported: content.substring(0, match.index).includes('export')
    })
  }
  
  // Methods in objects
  const methodPattern = /(\w+)\s*\([^)]*\)\s*\{/g
  while ((match = methodPattern.exec(content)) !== null) {
    // Skip if it's part of a class or already captured
    const beforeMatch = content.substring(Math.max(0, match.index - 50), match.index)
    if (!beforeMatch.match(/(?:class|function|=>)\s*$/) && 
        !functions.some(f => f.name === match[1])) {
      functions.push({
        name: match[1],
        type: 'method',
        isExported: false
      })
    }
  }
  
  return functions
}

/**
 * Extract ALL variables from a file
 */
function extractAllVariables(content) {
  const variables = []
  
  // const/let/var declarations
  const varPattern = /(?:export\s+)?(?:const|let|var)\s+(\w+)\s*=/g
  let match
  while ((match = varPattern.exec(content)) !== null) {
    // Skip function assignments (handled separately)
    const afterMatch = content.substring(match.index, match.index + 100)
    if (!afterMatch.match(/^\s*=\s*(?:async\s+)?\(/)) {
      variables.push({
        name: match[1],
        type: 'variable',
        isExported: content.substring(0, match.index).includes('export')
      })
    }
  }
  
  return variables
}

/**
 * Check if a function/variable is used
 */
function isUsed(name, filePath, allFiles, isLifecycleHook = false, isEventHandler = false) {
  // Lifecycle hooks and event handlers are always considered used
  if (isLifecycleHook || isEventHandler || VUE_LIFECYCLE_HOOKS.includes(name)) {
    return { used: true, reason: 'lifecycle_or_event' }
  }
  
  // Check safety keep list
  if (SAFETY_KEEP_LIST.some(pattern => {
    if (typeof pattern === 'string') {
      return filePath.includes(pattern) || name === pattern
    }
    return pattern.test(name)
  })) {
    return { used: true, reason: 'safety_keep_list' }
  }
  
  // Check utility patterns
  if (UTILITY_PATTERNS.some(pattern => pattern.test(name))) {
    const usage = checkUsage(name, filePath, allFiles)
    if (usage.used) {
      return { ...usage, reason: 'utility_pattern' }
    }
  }
  
  return checkUsage(name, filePath, allFiles)
}

/**
 * Check actual usage across files and within the same file
 */
function checkUsage(name, filePath, allFiles) {
  const usage = {
    used: false,
    locations: [],
    reason: 'not_found',
    usedInTemplate: false
  }
  
  // First, check within the same file (for Vue components, check template too)
  const currentFile = allFiles.find(f => f.path === filePath)
  if (currentFile) {
    let content = fs.readFileSync(filePath, 'utf-8')
    
    // For Vue files, check template usage
    if (filePath.endsWith('.vue')) {
      const templateMatch = content.match(/<template[^>]*>([\s\S]*?)<\/template>/i)
      if (templateMatch) {
        const template = templateMatch[1]
        // Check if used in template (v-bind, v-on, {{ }}, @click, etc.)
        if (new RegExp(`(?:\\{\\{|v-bind:|v-on:|@|:)\\s*${name}\\b`).test(template)) {
          usage.used = true
          usage.usedInTemplate = true
          usage.locations.push(`${currentFile.relativePath} (template)`)
          usage.reason = 'used_in_template'
          return usage
        }
      }
      
      content = extractVueScript(content)
    }
    
    // Check if used in script (but not in definition)
    // First, find all occurrences of the name
    const allMatches = []
    const namePattern = new RegExp(`\\b${name}\\b`, 'g')
    let match
    while ((match = namePattern.exec(content)) !== null) {
      allMatches.push({
        index: match.index,
        before: content.substring(Math.max(0, match.index - 30), match.index),
        after: content.substring(match.index, match.index + name.length + 30)
      })
    }
    
    // Check each match to see if it's a usage (not a definition)
    let usageFound = false
    for (const match of allMatches) {
      const before = match.before.trim()
      const after = match.after.substring(name.length).trim()
      
      // Check if it's a definition
      const isDefinition = (
        before.match(/(?:^|[\s;])(?:const|let|var|function|class|export|async)\s+$/) ||
        before.match(/(?:^|[\s;])export\s+default\s+$/) ||
        (before.match(/(?:^|[\s;])export\s+$/) && after.match(/^\s*\{/))
      ) && (
        after.match(/^\s*[=:(]/) || 
        after.match(/^\s*=>/) ||
        after.match(/^\s*\{/)
      )
      
      // If it's NOT a definition, it's a usage
      if (!isDefinition) {
        // Check if it's a function call, property access, or assignment target
        if (after.match(/^\s*\(/) ||           // function call: name()
            after.match(/^\s*:/) ||            // object property: name:
            after.match(/^\s*\[/) ||           // bracket access: name[
            before.match(/\.$/) ||             // method access: .name
            before.match(/:\s*$/) ||           // object value: key: name
            after.match(/^\s*;/) ||            // reference: name;
            after.match(/^\s*,/) ||            // array/object element: name,
            before.match(/return\s+$/) ||      // return name
            before.match(/=\s*$/)              // assignment: x = name
          ) {
          usageFound = true
          break
        }
      }
    }
    
    if (usageFound) {
      usage.used = true
      usage.locations.push(`${currentFile.relativePath} (internal)`)
      usage.reason = 'used_internally'
      return usage
    }
  }
  
  // Check usage in other files
  for (const file of allFiles) {
    if (file.path === filePath) continue
    
    let content = fs.readFileSync(file.path, 'utf-8')
    
    if (file.name.endsWith('.vue')) {
      // Check template
      const templateMatch = content.match(/<template[^>]*>([\s\S]*?)<\/template>/i)
      if (templateMatch) {
        const template = templateMatch[1]
        if (new RegExp(`(?:\\{\\{|v-bind:|v-on:|@|:)\\s*${name}\\b`).test(template)) {
          usage.used = true
          usage.locations.push(`${file.relativePath} (template)`)
          usage.reason = 'found_usage'
          return usage
        }
      }
      
      content = extractVueScript(content)
      if (!content) continue
    }
    
    // Check for usage patterns
    const patterns = [
      new RegExp(`\\b${name}\\b`, 'g'),
      new RegExp(`import.*\\b${name}\\b`, 'g'),
      new RegExp(`from\\s+['"].*${name}`, 'g'),
      new RegExp(`require\\(['"].*${name}`, 'g'),
      new RegExp(`\\{.*\\b${name}\\b.*\\}`, 'g')
    ]
    
    for (const pattern of patterns) {
      if (pattern.test(content)) {
        usage.used = true
        usage.locations.push(file.relativePath)
        usage.reason = 'found_usage'
        break
      }
    }
    
    if (usage.used) break
  }
  
  return usage
}

/**
 * Find duplicate computed properties and methods across Vue components
 */
function findDuplicateComponentInternals(allFiles) {
  const duplicates = {
    computed: new Map(),
    methods: new Map()
  }
  
  for (const file of allFiles) {
    if (!file.name.endsWith('.vue')) continue
    
    let content = fs.readFileSync(file.path, 'utf-8')
    const scriptContent = extractVueScript(content)
    if (!scriptContent) continue
    
    const vueInternals = extractVueOptionsAPI(scriptContent)
    
    // Track computed properties
    for (const computed of vueInternals.computed) {
      if (!duplicates.computed.has(computed)) {
        duplicates.computed.set(computed, [])
      }
      duplicates.computed.get(computed).push({
        file: file.relativePath,
        type: 'computed'
      })
    }
    
    // Track methods
    for (const method of vueInternals.methods) {
      if (!duplicates.methods.has(method)) {
        duplicates.methods.set(method, [])
      }
      duplicates.methods.get(method).push({
        file: file.relativePath,
        type: 'method'
      })
    }
  }
  
  // Filter to only show duplicates (appearing in 2+ files)
  const duplicateComputed = []
  const duplicateMethods = []
  
  for (const [name, files] of duplicates.computed.entries()) {
    if (files.length > 1) {
      duplicateComputed.push({ name, files })
    }
  }
  
  for (const [name, files] of duplicates.methods.entries()) {
    if (files.length > 1) {
      duplicateMethods.push({ name, files })
    }
  }
  
  return { computed: duplicateComputed, methods: duplicateMethods }
}

/**
 * Main analysis function
 */
function analyzeJS() {
  console.log('🔍 Enhanced JavaScript Usage Analyzer\n')
  console.log('='.repeat(60))
  
  const rootDir = path.resolve(__dirname, '..')
  console.log(`\n📂 Scanning directory: ${rootDir}`)
  
  // Find all JS files
  console.log('\n📄 Finding JavaScript files...')
  const allFiles = findJSFiles(rootDir)
  console.log(`  ✓ Found ${allFiles.length} JavaScript/Vue files`)
  
  // Extract everything
  console.log('\n🔍 Extracting code elements...')
  const allFunctions = []
  const allVariables = []
  const vueComponents = []
  
  for (const file of allFiles) {
    let content = fs.readFileSync(file.path, 'utf-8')
    let scriptContent = content
    
    if (file.name.endsWith('.vue')) {
      scriptContent = extractVueScript(content)
      if (!scriptContent) continue
      
      // Extract Vue component internals
      const vueInternals = extractVueOptionsAPI(scriptContent)
      const vueComposition = extractVueCompositionAPI(scriptContent)
      
      vueComponents.push({
        file: file.relativePath,
        path: file.path,
        optionsAPI: vueInternals,
        compositionAPI: vueComposition
      })
    }
    
    // Extract all functions and variables
    const functions = extractAllFunctions(scriptContent)
    const variables = extractAllVariables(scriptContent)
    
    functions.forEach(f => {
      allFunctions.push({ ...f, file: file.path, relativePath: file.relativePath })
    })
    
    variables.forEach(v => {
      allVariables.push({ ...v, file: file.path, relativePath: file.relativePath })
    })
  }
  
  console.log(`  ✓ Found ${allFunctions.length} functions`)
  console.log(`  ✓ Found ${allVariables.length} variables`)
  console.log(`  ✓ Found ${vueComponents.length} Vue components`)
  
  // Check usage
  console.log('\n🔎 Checking usage...')
  const functionUsage = []
  const variableUsage = []
  let checked = 0
  const total = allFunctions.length + allVariables.length
  
  for (const func of allFunctions) {
    process.stdout.write(`\r  Checking ${++checked}/${total}...`)
    const isLifecycle = VUE_LIFECYCLE_HOOKS.includes(func.name)
    const usage = isUsed(func.name, func.file, allFiles, isLifecycle, false)
    functionUsage.push({ ...func, ...usage })
  }
  
  for (const variable of allVariables) {
    process.stdout.write(`\r  Checking ${++checked}/${total}...`)
    const usage = isUsed(variable.name, variable.file, allFiles, false, false)
    variableUsage.push({ ...variable, ...usage })
  }
  
  process.stdout.write('\r' + ' '.repeat(50) + '\r')
  console.log(`  ✓ Checked ${total} code elements`)
  
  // Find duplicates in Vue components
  console.log('\n🔍 Finding duplicate component internals...')
  const componentDuplicates = findDuplicateComponentInternals(allFiles)
  console.log(`  ✓ Found ${componentDuplicates.computed.length} duplicate computed properties`)
  console.log(`  ✓ Found ${componentDuplicates.methods.length} duplicate methods`)
  
  // Generate report
  const unusedFunctions = functionUsage.filter(f => !f.used && f.reason !== 'safety_keep_list')
  const unusedVariables = variableUsage.filter(v => !v.used && v.reason !== 'safety_keep_list')
  const usedFunctions = functionUsage.filter(f => f.used)
  const usedVariables = variableUsage.filter(v => v.used)
  
  // Check for unused Vue component internals
  const unusedVueInternals = []
  for (const component of vueComponents) {
    // Check computed properties
    for (const computed of component.optionsAPI.computed) {
      const usage = checkUsage(computed, component.path, allFiles)
      if (!usage.used) {
        unusedVueInternals.push({
          name: computed,
          type: 'computed',
          file: component.file
        })
      }
    }
    
    // Check methods
    for (const method of component.optionsAPI.methods) {
      const usage = checkUsage(method, component.path, allFiles)
      if (!usage.used) {
        unusedVueInternals.push({
          name: method,
          type: 'method',
          file: component.file
        })
      }
    }
    
    // Check data properties
    for (const dataProp of component.optionsAPI.data) {
      const usage = checkUsage(dataProp, component.path, allFiles)
      if (!usage.used) {
        unusedVueInternals.push({
          name: dataProp,
          type: 'data',
          file: component.file
        })
      }
    }
  }
  
  const report = {
    summary: {
      totalFiles: allFiles.length,
      totalFunctions: allFunctions.length,
      usedFunctions: usedFunctions.length,
      unusedFunctions: unusedFunctions.length,
      totalVariables: allVariables.length,
      usedVariables: usedVariables.length,
      unusedVariables: unusedVariables.length,
      vueComponents: vueComponents.length,
      unusedVueInternals: unusedVueInternals.length,
      duplicateComputed: componentDuplicates.computed.length,
      duplicateMethods: componentDuplicates.methods.length
    },
    unusedFunctions: unusedFunctions.map(f => ({
      name: f.name,
      type: f.type,
      file: f.relativePath,
      reason: f.reason
    })),
    unusedVariables: unusedVariables.map(v => ({
      name: v.name,
      type: v.type,
      file: v.relativePath,
      reason: v.reason
    })),
    unusedVueInternals: unusedVueInternals,
    duplicateComponentInternals: {
      computed: componentDuplicates.computed,
      methods: componentDuplicates.methods
    }
  }
  
  // Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 ANALYSIS SUMMARY')
  console.log('='.repeat(60))
  console.log(`Total Files: ${report.summary.totalFiles}`)
  console.log(`Total Functions: ${report.summary.totalFunctions}`)
  console.log(`  Used: ${report.summary.usedFunctions}`)
  console.log(`  Unused: ${report.summary.unusedFunctions}`)
  console.log(`Total Variables: ${report.summary.totalVariables}`)
  console.log(`  Used: ${report.summary.usedVariables}`)
  console.log(`  Unused: ${report.summary.unusedVariables}`)
  console.log(`Vue Components: ${report.summary.vueComponents}`)
  console.log(`  Unused Internals: ${report.summary.unusedVueInternals}`)
  console.log(`  Duplicate Computed: ${report.summary.duplicateComputed}`)
  console.log(`  Duplicate Methods: ${report.summary.duplicateMethods}`)
  
  if (unusedFunctions.length > 0) {
    console.log('\n⚠️  UNUSED FUNCTIONS (first 20):')
    unusedFunctions.slice(0, 20).forEach(f => {
      console.log(`  - ${f.name} (${f.type}) in ${f.file}`)
    })
    if (unusedFunctions.length > 20) {
      console.log(`  ... and ${unusedFunctions.length - 20} more`)
    }
  }
  
  if (unusedVariables.length > 0) {
    console.log('\n⚠️  UNUSED VARIABLES (first 20):')
    unusedVariables.slice(0, 20).forEach(v => {
      console.log(`  - ${v.name} (${v.type}) in ${v.file}`)
    })
    if (unusedVariables.length > 20) {
      console.log(`  ... and ${unusedVariables.length - 20} more`)
    }
  }
  
  if (unusedVueInternals.length > 0) {
    console.log('\n⚠️  UNUSED VUE COMPONENT INTERNALS (first 20):')
    unusedVueInternals.slice(0, 20).forEach(u => {
      console.log(`  - ${u.name} (${u.type}) in ${u.file}`)
    })
    if (unusedVueInternals.length > 20) {
      console.log(`  ... and ${unusedVueInternals.length - 20} more`)
    }
  }
  
  if (componentDuplicates.computed.length > 0) {
    console.log('\n🔄 DUPLICATE COMPUTED PROPERTIES:')
    componentDuplicates.computed.slice(0, 10).forEach(d => {
      console.log(`  - ${d.name} appears in ${d.files.length} components:`)
      d.files.forEach(f => console.log(`    • ${f.file}`))
    })
  }
  
  if (componentDuplicates.methods.length > 0) {
    console.log('\n🔄 DUPLICATE METHODS:')
    componentDuplicates.methods.slice(0, 10).forEach(d => {
      console.log(`  - ${d.name} appears in ${d.files.length} components:`)
      d.files.forEach(f => console.log(`    • ${f.file}`))
    })
  }
  
  // Save report
  const reportPath = path.join(rootDir, 'js-analysis-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`\n💾 Report saved to: ${reportPath}`)
  
  return report
}

// Run if called directly
if (require.main === module) {
  try {
    analyzeJS()
  } catch (error) {
    console.error('❌ Analysis failed:', error)
    process.exit(1)
  }
}

module.exports = { analyzeJS, findJSFiles, extractVueOptionsAPI, extractVueCompositionAPI, isUsed }
