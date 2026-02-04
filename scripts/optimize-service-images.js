/**
 * Optimize Service Page Images
 * Compresses and resizes images in public/assets/img/services/ to reduce memory usage
 * Uses Sharp for image optimization
 */

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const SERVICES_DIR = path.resolve(__dirname, '../public/assets/img/services')
const MAX_WIDTH = 1920 // Max width for hero/banner images
const MAX_HEIGHT = 1080 // Max height for hero/banner images
const QUALITY = 85 // JPEG quality (85 is good balance)
const MAX_FILE_SIZE_KB = 200 // Target max file size in KB

// Image size presets based on usage
const IMAGE_PRESETS = {
  hero: { width: 1920, height: 1080, quality: 85 }, // Hero images - larger
  banner: { width: 1920, height: 600, quality: 85 }, // Banner images - wide
  process: { width: 1200, height: 800, quality: 80 }, // Process images - medium
  cta: { width: 800, height: 600, quality: 80 } // CTA images - smaller
}

/**
 * Determine image preset based on filename
 */
function getImagePreset(filename) {
  const lower = filename.toLowerCase()
  if (lower.includes('hero')) return IMAGE_PRESETS.hero
  if (lower.includes('banner')) return IMAGE_PRESETS.banner
  if (lower.includes('process')) return IMAGE_PRESETS.process
  if (lower.includes('cta')) return IMAGE_PRESETS.cta
  // Default to banner for unknown types
  return IMAGE_PRESETS.banner
}

/**
 * Optimize a single image
 */
async function optimizeImage(filePath) {
  const filename = path.basename(filePath)
  const ext = path.extname(filename).toLowerCase()
  
  // Only process JPEG/JPG images
  if (!['.jpg', '.jpeg'].includes(ext)) {
    console.log(`⏭️  Skipping ${filename} (not a JPEG)`)
    return { skipped: true, filename }
  }

  try {
    const originalStats = fs.statSync(filePath)
    const originalSizeKB = originalStats.size / 1024
    
    // Skip if already small enough
    if (originalSizeKB <= MAX_FILE_SIZE_KB) {
      console.log(`✅ ${filename} already optimized (${originalSizeKB.toFixed(2)} KB)`)
      return { skipped: true, filename, size: originalSizeKB }
    }

    console.log(`🔄 Optimizing ${filename} (${originalSizeKB.toFixed(2)} KB)...`)
    
    const preset = getImagePreset(filename)
    const tempPath = filePath + '.tmp'
    
    // Get image metadata
    const metadata = await sharp(filePath).metadata()
    
    // Calculate dimensions (maintain aspect ratio)
    let width = preset.width
    let height = preset.height
    
    if (metadata.width && metadata.height) {
      const aspectRatio = metadata.width / metadata.height
      if (metadata.width > preset.width) {
        width = preset.width
        height = Math.round(preset.width / aspectRatio)
      } else if (metadata.height > preset.height) {
        height = preset.height
        width = Math.round(preset.height * aspectRatio)
      } else {
        // Image is smaller than preset, keep original size
        width = metadata.width
        height = metadata.height
      }
    }

    // Optimize image
    await sharp(filePath)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({
        quality: preset.quality,
        mozjpeg: true, // Better compression
        progressive: true // Progressive JPEG for better perceived performance
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
 * Main function
 */
async function main() {
  console.log('🚀 Starting service images optimization...\n')

  if (!fs.existsSync(SERVICES_DIR)) {
    console.error(`❌ Directory not found: ${SERVICES_DIR}`)
    process.exit(1)
  }

  const files = fs.readdirSync(SERVICES_DIR)
    .filter(file => /\.(jpg|jpeg)$/i.test(file))
    .map(file => path.join(SERVICES_DIR, file))

  if (files.length === 0) {
    console.log('ℹ️  No JPEG images found in services directory')
    return
  }

  console.log(`📁 Found ${files.length} images to process\n`)

  const results = {
    optimized: [],
    skipped: [],
    errors: []
  }

  // Process all images
  for (const filePath of files) {
    const result = await optimizeImage(filePath)
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

module.exports = { optimizeImage, main }
