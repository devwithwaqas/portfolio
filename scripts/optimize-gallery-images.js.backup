/**
 * Optimize Gallery Images
 * Compresses and resizes project gallery images (he2-7, aa2-7, bat2-7, etc.) to reduce file sizes
 * Uses Sharp for image optimization
 */

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const IMG_DIR = path.resolve(__dirname, '../public/assets/img')
const MAX_FILE_SIZE_KB = 200 // Target max file size in KB for gallery images

// Gallery image settings - carousel images should be optimized for web display
const GALLERY_CONFIG = {
  maxWidth: 1920,  // Max width (for large displays)
  maxHeight: 1080, // Max height (16:9 ratio)
  quality: 80,     // Good balance for web (80 is optimal)
  fit: 'inside'    // Maintain aspect ratio, fit inside bounds
}

/**
 * Check if file is a gallery image (he2-9, aa2-9, bat2-9, etc.)
 */
function isGalleryImage(filename) {
  const pattern = /^(he|aa|bat|sf|vp|gd|gpc|g5|in)[2-9]\.(jpg|jpeg|png)$/i
  return pattern.test(filename)
}

/**
 * Optimize a gallery image
 */
async function optimizeGalleryImage(filePath) {
  const filename = path.basename(filePath)
  
  try {
    const originalStats = fs.statSync(filePath)
    const originalSizeKB = originalStats.size / 1024
    
    // Skip if already small enough
    if (originalSizeKB <= MAX_FILE_SIZE_KB) {
      console.log(`✅ ${filename} already optimized (${originalSizeKB.toFixed(2)} KB)`)
      return { skipped: true, filename, size: originalSizeKB }
    }

    console.log(`🔄 Optimizing ${filename} (${originalSizeKB.toFixed(2)} KB)...`)
    
    const tempPath = filePath + '.tmp'
    
    // Get image metadata
    const metadata = await sharp(filePath).metadata()
    
    // Calculate dimensions (maintain aspect ratio)
    let width = metadata.width
    let height = metadata.height
    
    // Resize if larger than max dimensions
    if (metadata.width > GALLERY_CONFIG.maxWidth || metadata.height > GALLERY_CONFIG.maxHeight) {
      const aspectRatio = metadata.width / metadata.height
      
      if (metadata.width > metadata.height) {
        // Landscape or square
        width = GALLERY_CONFIG.maxWidth
        height = Math.round(GALLERY_CONFIG.maxWidth / aspectRatio)
        if (height > GALLERY_CONFIG.maxHeight) {
          height = GALLERY_CONFIG.maxHeight
          width = Math.round(GALLERY_CONFIG.maxHeight * aspectRatio)
        }
      } else {
        // Portrait
        height = GALLERY_CONFIG.maxHeight
        width = Math.round(GALLERY_CONFIG.maxHeight * aspectRatio)
        if (width > GALLERY_CONFIG.maxWidth) {
          width = GALLERY_CONFIG.maxWidth
          height = Math.round(GALLERY_CONFIG.maxWidth / aspectRatio)
        }
      }
    }

    // Optimize image
    await sharp(filePath)
      .resize(width, height, {
        fit: GALLERY_CONFIG.fit,
        withoutEnlargement: true
      })
      .jpeg({
        quality: GALLERY_CONFIG.quality,
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
  console.log('🚀 Starting gallery image optimization...\n')

  if (!fs.existsSync(IMG_DIR)) {
    console.error(`❌ Directory not found: ${IMG_DIR}`)
    process.exit(1)
  }

  // Find all gallery images
  const files = fs.readdirSync(IMG_DIR)
    .filter(file => isGalleryImage(file))
    .map(file => path.join(IMG_DIR, file))

  if (files.length === 0) {
    console.log('ℹ️  No gallery images found')
    return
  }

  console.log(`📁 Found ${files.length} gallery images to process\n`)

  const results = {
    optimized: [],
    skipped: [],
    errors: []
  }

  // Process all gallery images
  for (const filePath of files) {
    const result = await optimizeGalleryImage(filePath)
    
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
  console.log('📊 Gallery Image Optimization Summary')
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

  console.log('\n✅ Gallery image optimization complete!')
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}

module.exports = { optimizeGalleryImage, main }
