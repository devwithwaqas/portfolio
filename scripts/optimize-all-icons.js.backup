/**
 * Optimize All Icons for Performance
 * Resizes all icons to 2x their maximum display size and converts to WebP/AVIF
 * 
 * Display sizes from CSS:
 * - xs: 16px (desktop), 12px (mobile)
 * - sm: 20px (desktop), 16px (mobile)
 * - md: 24px (desktop), 20px (mobile)
 * - lg: 28px (desktop), 24px (mobile)
 * - xl: 32px (desktop), 28px (mobile)
 * - 2xl: 36px (desktop), 32px (mobile)
 * - 3xl: 48px (desktop), 40px (mobile)
 * - 4xl: 60px (desktop), 50px (mobile)
 * - 5xl: 72px (desktop), 60px (mobile)
 * - 6xl: 84px (desktop), 70px (mobile)
 * 
 * Max display size: 84px @ 2x = 168px (round to 200px for safety)
 * 
 * Requirements:
 * npm install sharp --save-dev
 * 
 * Usage:
 * node scripts/optimize-all-icons.js
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const ICONS_DIR = path.join(__dirname, '../public/assets/img/Icons')

// Maximum display size is 84px (6xl), so 2x = 168px, round to 200px
const MAX_DISPLAY_SIZE = 200
const QUALITY = 90 // PNG to WebP quality

async function optimizeIcon(iconPath) {
  try {
    const stats = await fs.promises.stat(iconPath)
    const originalSize = (stats.size / 1024).toFixed(2) // KB
    
    // Get image metadata
    const metadata = await sharp(iconPath).metadata()
    
    // Skip if already smaller than target
    if (metadata.width <= MAX_DISPLAY_SIZE && metadata.height <= MAX_DISPLAY_SIZE) {
      return null // Skip this icon
    }
    
    // Calculate resize dimensions (maintain aspect ratio, fit inside)
    const finalWidth = Math.min(MAX_DISPLAY_SIZE, metadata.width)
    const finalHeight = Math.min(MAX_DISPLAY_SIZE, metadata.height)
    
    const basename = path.basename(iconPath, path.extname(iconPath))
    const ext = path.extname(iconPath).toLowerCase()
    
    // Skip if already optimized
    if (basename.endsWith('-optimized')) {
      return null
    }
    
    const results = []
    
    // 1. Create optimized PNG (fallback)
    const optimizedPngPath = path.join(ICONS_DIR, `${basename}-optimized.png`)
    await sharp(iconPath)
      .resize(finalWidth, finalHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({ quality: QUALITY, compressionLevel: 9 })
      .toFile(optimizedPngPath)
    
    const pngStats = await fs.promises.stat(optimizedPngPath)
    const pngSize = (pngStats.size / 1024).toFixed(2)
    
    results.push({
      format: 'png',
      path: optimizedPngPath,
      size: pngSize,
      reduction: pngReduction
    })
    
    // 2. Create WebP version
    const webpPath = path.join(ICONS_DIR, `${basename}-optimized.webp`)
    await sharp(iconPath)
      .resize(finalWidth, finalHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: QUALITY, effort: 6 })
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
    
    // 3. Create AVIF version (best compression)
    try {
      const avifPath = path.join(ICONS_DIR, `${basename}-optimized.avif`)
      await sharp(iconPath)
        .resize(finalWidth, finalHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .avif({ quality: QUALITY, effort: 4 })
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
      console.warn(`⚠️  AVIF conversion failed for ${path.basename(iconPath)}:`, error.message)
    }
    
    console.log(`✅ ${path.basename(iconPath)}:`)
    console.log(`   Original: ${originalSize}KB (${metadata.width}x${metadata.height})`)
    console.log(`   Optimized: ${finalWidth}x${finalHeight} @ 2x`)
    results.forEach(r => {
      console.log(`   ${r.format.toUpperCase()}: ${r.size}KB (${r.reduction}% reduction)`)
    })
    
    return {
      name: path.basename(iconPath),
      originalSize,
      originalDimensions: `${metadata.width}x${metadata.height}`,
      optimizedDimensions: `${finalWidth}x${finalHeight}`,
      results
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${path.basename(iconPath)}:`, error.message)
    return null
  }
}

async function main() {
  console.log('🚀 Starting all icons optimization...\n')
  
  // Check if sharp is installed
  try {
    require('sharp')
  } catch (error) {
    console.error('❌ Error: sharp is not installed!')
    console.log('\n📦 Please install sharp first:')
    console.log('   npm install sharp --save-dev\n')
    process.exit(1)
  }
  
  // Get all PNG files in Icons directory
  const files = fs.readdirSync(ICONS_DIR)
    .filter(file => file.toLowerCase().endsWith('.png'))
    .filter(file => !file.includes('-optimized')) // Skip already optimized
    .map(file => path.join(ICONS_DIR, file))
  
  console.log(`📸 Found ${files.length} icons to optimize...\n`)
  
  const allResults = []
  let skipped = 0
  
  // Optimize each icon
  for (const iconPath of files) {
    const result = await optimizeIcon(iconPath)
    if (result) {
      allResults.push(result)
    } else {
      skipped++
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
    
    console.log(`\nTotal icons optimized: ${allResults.length}`)
    console.log(`Icons skipped (already small): ${skipped}`)
    console.log(`Total original size: ${totalOriginal.toFixed(2)}KB`)
    console.log(`Total optimized size (WebP): ${totalOptimized.toFixed(2)}KB`)
    console.log(`Total reduction: ${totalReduction}%`)
    console.log(`Estimated savings: ${(totalOriginal - totalOptimized).toFixed(2)}KB`)
    
    console.log('\n📝 Notes:')
    console.log('   - Icons are resized to 200x200px max (2x for 84px display)')
    console.log('   - WebP/AVIF versions are automatically used via OptimizedImage component')
    console.log('   - Original PNG files are kept as fallback')
    console.log('   - Test locally to ensure all icons display correctly\n')
  } else {
    console.log('\n✅ All icons are already optimized or too small to optimize!\n')
  }
  
  console.log('✅ Icon optimization complete!\n')
}

// Run the script
main().catch(console.error)
