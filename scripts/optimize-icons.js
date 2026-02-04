/**
 * Optimize Icons (PNG and SVG)
 * Compresses and optimizes icons in public/assets/img/Icons/ to reduce file sizes
 * Uses Sharp for PNG optimization and SVGO for SVG optimization
 */

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const ICONS_DIR = path.resolve(__dirname, '../public/assets/img/Icons')
const MAX_ICON_SIZE_KB = 30 // Target max file size for icons (30KB is reasonable for icons)
const PNG_QUALITY = 85 // PNG quality (85 is good balance)
const PNG_MAX_DIMENSION = 512 // Max width/height for PNG icons (icons don't need to be huge)

/**
 * Optimize a PNG icon
 */
async function optimizePNG(filePath) {
  const filename = path.basename(filePath)
  
  try {
    const originalStats = fs.statSync(filePath)
    const originalSizeKB = originalStats.size / 1024
    
    // Skip if already small enough
    if (originalSizeKB <= MAX_ICON_SIZE_KB) {
      console.log(`✅ ${filename} already optimized (${originalSizeKB.toFixed(2)} KB)`)
      return { skipped: true, filename, size: originalSizeKB }
    }

    console.log(`🔄 Optimizing ${filename} (${originalSizeKB.toFixed(2)} KB)...`)
    
    const tempPath = filePath + '.tmp'
    
    // Get image metadata
    const metadata = await sharp(filePath).metadata()
    
    // Calculate dimensions (maintain aspect ratio, max 512px)
    let width = metadata.width
    let height = metadata.height
    
    if (metadata.width > PNG_MAX_DIMENSION || metadata.height > PNG_MAX_DIMENSION) {
      if (metadata.width > metadata.height) {
        width = PNG_MAX_DIMENSION
        height = Math.round((PNG_MAX_DIMENSION / metadata.width) * metadata.height)
      } else {
        height = PNG_MAX_DIMENSION
        width = Math.round((PNG_MAX_DIMENSION / metadata.height) * metadata.width)
      }
    }

    // Optimize PNG
    await sharp(filePath)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({
        quality: PNG_QUALITY,
        compressionLevel: 9, // Maximum compression
        adaptiveFiltering: true,
        palette: true // Use palette if possible (reduces size for icons)
      })
      .toFile(tempPath)

    // Check new file size
    const newStats = fs.statSync(tempPath)
    const newSizeKB = newStats.size / 1024
    const savings = originalSizeKB - newSizeKB
    const savingsPercent = ((savings / originalSizeKB) * 100).toFixed(1)

    // Replace original if optimization was successful
    if (newSizeKB < originalSizeKB) {
      fs.renameSync(tempPath, filePath)
      console.log(`✅ ${filename}: ${originalSizeKB.toFixed(2)} KB → ${newSizeKB.toFixed(2)} KB (saved ${savings.toFixed(2)} KB, ${savingsPercent}%)`)
      return { 
        optimized: true, 
        filename, 
        originalSize: originalSizeKB, 
        newSize: newSizeKB, 
        savings,
        savingsPercent 
      }
    } else {
      // New file is larger, keep original
      fs.unlinkSync(tempPath)
      console.log(`⚠️  ${filename}: Optimization increased size, keeping original`)
      return { skipped: true, filename, size: originalSizeKB }
    }

  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message)
    return { error: true, filename, message: error.message }
  }
}

/**
 * Optimize an SVG icon (basic optimization - remove comments, whitespace)
 * Note: For full SVG optimization, you'd need SVGO, but we'll do basic cleanup
 */
async function optimizeSVG(filePath) {
  const filename = path.basename(filePath)
  
  try {
    const originalStats = fs.statSync(filePath)
    const originalSizeKB = originalStats.size / 1024
    
    // Skip if already small enough
    if (originalSizeKB <= MAX_ICON_SIZE_KB) {
      console.log(`✅ ${filename} already optimized (${originalSizeKB.toFixed(2)} KB)`)
      return { skipped: true, filename, size: originalSizeKB }
    }

    console.log(`🔄 Optimizing ${filename} (${originalSizeKB.toFixed(2)} KB)...`)
    
    // Read SVG content
    let svgContent = fs.readFileSync(filePath, 'utf8')
    
    // Basic SVG optimization (remove comments, extra whitespace)
    svgContent = svgContent
      .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/>\s+</g, '><') // Remove whitespace between tags
      .trim()
    
    // Write optimized SVG
    fs.writeFileSync(filePath, svgContent, 'utf8')
    
    const newStats = fs.statSync(filePath)
    const newSizeKB = newStats.size / 1024
    const savings = originalSizeKB - newSizeKB
    const savingsPercent = ((savings / originalSizeKB) * 100).toFixed(1)
    
    if (newSizeKB < originalSizeKB) {
      console.log(`✅ ${filename}: ${originalSizeKB.toFixed(2)} KB → ${newSizeKB.toFixed(2)} KB (saved ${savings.toFixed(2)} KB, ${savingsPercent}%)`)
      return { 
        optimized: true, 
        filename, 
        originalSize: originalSizeKB, 
        newSize: newSizeKB, 
        savings,
        savingsPercent 
      }
    } else {
      console.log(`⚠️  ${filename}: Optimization didn't reduce size`)
      return { skipped: true, filename, size: originalSizeKB }
    }

  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message)
    return { error: true, filename, message: error.message }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting icon optimization...\n')

  if (!fs.existsSync(ICONS_DIR)) {
    console.error(`❌ Directory not found: ${ICONS_DIR}`)
    process.exit(1)
  }

  const files = fs.readdirSync(ICONS_DIR)
    .filter(file => /\.(png|svg)$/i.test(file))
    .map(file => path.join(ICONS_DIR, file))

  if (files.length === 0) {
    console.log('ℹ️  No PNG or SVG icons found')
    return
  }

  console.log(`📁 Found ${files.length} icons to process\n`)

  const results = {
    optimized: [],
    skipped: [],
    errors: []
  }

  // Process all icons
  for (const filePath of files) {
    const ext = path.extname(filePath).toLowerCase()
    let result
    
    if (ext === '.png') {
      result = await optimizePNG(filePath)
    } else if (ext === '.svg') {
      result = await optimizeSVG(filePath)
    } else {
      continue
    }
    
    if (result.error) {
      results.errors.push(result)
    } else if (result.optimized) {
      results.optimized.push(result)
    } else {
      results.skipped.push(result)
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 Optimization Summary')
  console.log('='.repeat(60))
  console.log(`✅ Optimized: ${results.optimized.length}`)
  console.log(`⏭️  Skipped: ${results.skipped.length}`)
  console.log(`❌ Errors: ${results.errors.length}`)
  
  if (results.optimized.length > 0) {
    const totalOriginal = results.optimized.reduce((sum, r) => sum + r.originalSize, 0)
    const totalNew = results.optimized.reduce((sum, r) => sum + r.newSize, 0)
    const totalSavings = totalOriginal - totalNew
    const totalSavingsPercent = ((totalSavings / totalOriginal) * 100).toFixed(1)
    
    console.log(`\n💾 Total Savings: ${totalSavings.toFixed(2)} KB (${totalSavingsPercent}%)`)
    console.log(`   Before: ${totalOriginal.toFixed(2)} KB`)
    console.log(`   After:  ${totalNew.toFixed(2)} KB`)
  }

  if (results.errors.length > 0) {
    console.log('\n❌ Errors:')
    results.errors.forEach(err => {
      console.log(`   - ${err.filename}: ${err.message}`)
    })
    process.exit(1)
  }

  console.log('\n✅ Optimization complete!')
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}

module.exports = { optimizePNG, optimizeSVG, main }
