/**
 * Optimize Critical Images for Performance
 * Optimizes hero image and icons to match display dimensions and converts to WebP
 * 
 * Requirements:
 * npm install sharp --save-dev
 * 
 * Usage:
 * node scripts/optimize-critical-images.js
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const IMG_DIR = path.join(__dirname, '../public/assets/img')
const ICONS_DIR = path.join(IMG_DIR, 'Icons')

// Display dimensions from PageSpeed Insights report
const IMAGE_CONFIGS = [
  {
    name: 'waqas-microsoft-profile-optimized.jpg',
    displayWidth: 613,  // Displayed at 613px
    displayHeight: 199, // Displayed at 199px
    actualWidth: 800,   // Current: 800px
    actualHeight: 260,  // Current: 260px
    retinaMultiplier: 2, // 2x for retina displays
    quality: 85,
    format: 'jpg'
  },
  {
    name: 'Icons/user.png',
    displayWidth: 42,   // Displayed at 42px
    displayHeight: 42,  // Displayed at 42px
    actualWidth: 512,   // Current: 512px
    actualHeight: 512,  // Current: 512px
    retinaMultiplier: 2,
    quality: 90, // PNG to WebP - slightly higher quality
    format: 'png'
  },
  {
    name: 'Icons/framework.png',
    displayWidth: 42,   // Displayed at 42px
    displayHeight: 42,  // Displayed at 42px
    actualWidth: 320,   // Current: 320px
    actualHeight: 322,  // Current: 322px
    retinaMultiplier: 2,
    quality: 90,
    format: 'png'
  }
]

async function optimizeImage(config) {
  try {
    const inputPath = path.join(IMG_DIR, config.name)
    
    if (!fs.existsSync(inputPath)) {
      console.warn(`⚠️  Image not found: ${config.name}`)
      return null
    }
    
    const stats = await fs.promises.stat(inputPath)
    const originalSize = (stats.size / 1024).toFixed(2) // KB
    
    // Calculate optimal dimensions (2x for retina)
    const optimizedWidth = config.displayWidth * config.retinaMultiplier
    const optimizedHeight = config.displayHeight * config.retinaMultiplier
    
    // Don't upscale if already smaller
    const metadata = await sharp(inputPath).metadata()
    const finalWidth = Math.min(optimizedWidth, metadata.width)
    const finalHeight = Math.min(optimizedHeight, metadata.height)
    
    const basename = path.basename(config.name, path.extname(config.name))
    const dirname = path.dirname(config.name)
    const outputDir = path.join(IMG_DIR, dirname)
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    let results = []
    
    // Check if basename already ends with -optimized
    const alreadyOptimized = basename.endsWith('-optimized')
    const optimizedBasename = alreadyOptimized ? basename : `${basename}-optimized`
    
    // 1. Create optimized JPG/PNG (fallback) - only if not already optimized
    let fallbackPath = null
    if (!alreadyOptimized) {
      fallbackPath = path.join(outputDir, `${optimizedBasename}${path.extname(config.name)}`)
    }
    
    let sharpInstance = sharp(inputPath)
    
    if (metadata.width > finalWidth || metadata.height > finalHeight) {
      sharpInstance = sharpInstance.resize(finalWidth, finalHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
    }
    
    // Only create fallback if not already optimized (use original as fallback)
    if (!alreadyOptimized) {
      if (config.format === 'jpg') {
        await sharpInstance
          .jpeg({ quality: config.quality, mozjpeg: true })
          .toFile(fallbackPath)
      } else {
        await sharpInstance
          .png({ quality: config.quality, compressionLevel: 9 })
          .toFile(fallbackPath)
      }
      
      const fallbackStats = await fs.promises.stat(fallbackPath)
      const fallbackSize = (fallbackStats.size / 1024).toFixed(2)
      
      results.push({
        format: config.format,
        path: fallbackPath,
        size: fallbackSize,
        reduction: fallbackReduction
      })
    } else {
      // Already optimized - use original as fallback
      results.push({
        format: config.format,
        path: inputPath,
        size: originalSize,
        reduction: '0.0'
      })
    }
    
    // 2. Create WebP version (modern format)
    const webpPath = path.join(outputDir, `${optimizedBasename}.webp`)
    sharpInstance = sharp(inputPath)
    
    if (metadata.width > finalWidth || metadata.height > finalHeight) {
      sharpInstance = sharpInstance.resize(finalWidth, finalHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
    }
    
    await sharpInstance
      .webp({ quality: config.quality, effort: 6 })
      .toFile(webpPath)
    
    const webpStats = await fs.promises.stat(webpPath)
    const webpSize = (webpStats.size / 1024).toFixed(2)
    const webpReduction = ((1 - webpStats.size / stats.size) * 100).toFixed(1)
    
    results.push({
      format: 'webp',
      path: webpPath,
      size: webpSize,
      reduction: webpReduction
    })
    
    // 3. Create AVIF version (most modern, best compression)
    try {
      const avifPath = path.join(outputDir, `${optimizedBasename}.avif`)
      sharpInstance = sharp(inputPath)
      
      if (metadata.width > finalWidth || metadata.height > finalHeight) {
        sharpInstance = sharpInstance.resize(finalWidth, finalHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
      }
      
      await sharpInstance
        .avif({ quality: config.quality, effort: 4 })
        .toFile(avifPath)
      
      const avifStats = await fs.promises.stat(avifPath)
      const avifSize = (avifStats.size / 1024).toFixed(2)
      const avifReduction = ((1 - avifStats.size / stats.size) * 100).toFixed(1)
      
      results.push({
        format: 'avif',
        path: avifPath,
        size: avifSize,
        reduction: avifReduction
      })
    } catch (error) {
      console.warn(`⚠️  AVIF conversion failed for ${config.name} (may not be supported):`, error.message)
    }
    
    console.log(`✅ ${config.name}:`)
    console.log(`   Original: ${originalSize}KB (${metadata.width}x${metadata.height})`)
    console.log(`   Optimized: ${finalWidth}x${finalHeight} (${config.displayWidth}x${config.displayHeight} @ 2x)`)
    results.forEach(r => {
      console.log(`   ${r.format.toUpperCase()}: ${r.size}KB (${r.reduction}% reduction)`)
    })
    
    return {
      name: config.name,
      originalSize,
      originalDimensions: `${metadata.width}x${metadata.height}`,
      optimizedDimensions: `${finalWidth}x${finalHeight}`,
      displayDimensions: `${config.displayWidth}x${config.displayHeight}`,
      results
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${config.name}:`, error.message)
    return null
  }
}

async function main() {
  console.log('🚀 Starting critical image optimization...\n')
  
  // Check if sharp is installed
  try {
    require('sharp')
  } catch (error) {
    console.error('❌ Error: sharp is not installed!')
    console.log('\n📦 Please install sharp first:')
    console.log('   npm install sharp --save-dev\n')
    process.exit(1)
  }
  
  const allResults = []
  
  // Optimize each image
  for (const config of IMAGE_CONFIGS) {
    console.log(`\n📸 Optimizing ${config.name}...`)
    const result = await optimizeImage(config)
    if (result) {
      allResults.push(result)
    }
  }
  
  // Summary
  console.log('\n' + '═'.repeat(60))
  console.log('📊 Optimization Summary:')
  console.log('═'.repeat(60))
  
  if (allResults.length > 0) {
    let totalOriginal = 0
    let totalOptimized = 0
    
    allResults.forEach(result => {
      totalOriginal += parseFloat(result.originalSize)
      // Use WebP size as the optimized size (best balance)
      const webpResult = result.results.find(r => r.format === 'webp')
      if (webpResult) {
        totalOptimized += parseFloat(webpResult.size)
      }
    })
    
    const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1)
    
    console.log(`\nTotal original size: ${totalOriginal.toFixed(2)}KB`)
    console.log(`Total optimized size (WebP): ${totalOptimized.toFixed(2)}KB`)
    console.log(`Total reduction: ${totalReduction}%`)
    console.log(`Estimated savings: ${(totalOriginal - totalOptimized).toFixed(2)}KB`)
    
    console.log('\n📝 Next steps:')
    console.log('   1. Update components to use WebP with fallback')
    console.log('   2. Use <picture> element with AVIF > WebP > JPG/PNG fallback')
    console.log('   3. Test locally to ensure images display correctly')
    console.log('   4. Verify performance improvements in PageSpeed Insights\n')
  }
  
  console.log('✅ Critical image optimization complete!\n')
}

// Run the script
main().catch(console.error)
