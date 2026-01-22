/**
 * Convert SVG Icons to PNG/WebP/AVIF
 * Converts SVG icons to optimized PNG (primary), WebP, and AVIF formats
 * Keeps original SVGs as backup with .svg.backup extension
 * 
 * Strategy:
 * 1. Convert to PNG (optimized, high quality) - primary format
 * 2. Convert to WebP (better compression) - modern browsers
 * 3. Convert to AVIF (best compression) - newest browsers
 * 
 * Usage: node scripts/convert-svgs-to-webp.js
 */

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const ICONS_DIR = path.resolve(__dirname, '../public/assets/img/Icons')
const DIAGRAMS_DIR = path.resolve(__dirname, '../public/assets/diagrams')
const PNG_QUALITY = 90 // High quality for PNG
const WEBP_QUALITY = 85
const AVIF_QUALITY = 80
const MAX_DIMENSION = 512 // Max size for icons (keep diagrams larger if needed)
const BACKUP_EXTENSION = '.svg.backup'

/**
 * Convert SVG to PNG, WebP, and AVIF
 */
async function convertSVGToOptimized(svgPath) {
  const filename = path.basename(svgPath)
  const dir = path.dirname(svgPath)
  const nameWithoutExt = path.basename(svgPath, '.svg')
  const pngPath = path.join(dir, `${nameWithoutExt}.png`)
  const webpPath = path.join(dir, `${nameWithoutExt}-optimized.webp`)
  const avifPath = path.join(dir, `${nameWithoutExt}-optimized.avif`)
  const backupPath = `${svgPath}${BACKUP_EXTENSION}`

  try {
    const originalStats = fs.statSync(svgPath)
    const originalSizeKB = originalStats.size / 1024

    // Check if all formats already exist and are newer
    const allExist = fs.existsSync(pngPath) && fs.existsSync(webpPath) && fs.existsSync(avifPath)
    if (allExist) {
      const pngStats = fs.statSync(pngPath)
      const webpStats = fs.statSync(webpPath)
      const avifStats = fs.statSync(avifPath)
      if (pngStats.mtime >= originalStats.mtime &&
          webpStats.mtime >= originalStats.mtime &&
          avifStats.mtime >= originalStats.mtime) {
        console.log(`⏭️  ${filename}: All formats already exist and are up to date`)
        return { skipped: true, filename, reason: 'already_exists' }
      }
    }

    console.log(`🔄 Converting ${filename} (${originalSizeKB.toFixed(2)} KB)...`)

    // Read SVG and get dimensions
    const svgBuffer = fs.readFileSync(svgPath)
    const metadata = await sharp(svgBuffer).metadata()

    // Determine dimensions
    let width = metadata.width || MAX_DIMENSION
    let height = metadata.height || MAX_DIMENSION

    // Scale down if too large (for icons, not diagrams)
    if (svgPath.includes('/Icons/')) {
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          width = MAX_DIMENSION
          height = Math.round((MAX_DIMENSION / width) * height)
        } else {
          height = MAX_DIMENSION
          width = Math.round((MAX_DIMENSION / height) * width)
        }
      }
    }

    const sharpInstance = sharp(svgBuffer)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })

    // 1. Convert to PNG (primary format, optimized)
    await sharpInstance
      .png({
        quality: PNG_QUALITY,
        compressionLevel: 9, // Maximum compression
        adaptiveFiltering: true,
        palette: true // Use palette if possible for smaller files
      })
      .toFile(pngPath)

    const pngStats = fs.statSync(pngPath)
    const pngSizeKB = pngStats.size / 1024

    // 2. Convert to WebP (better compression)
    await sharpInstance
      .webp({
        quality: WEBP_QUALITY,
        effort: 6 // Higher effort = better compression but slower (0-6)
      })
      .toFile(webpPath)

    const webpStats = fs.statSync(webpPath)
    const webpSizeKB = webpStats.size / 1024

    // 3. Convert to AVIF (best compression)
    await sharpInstance
      .avif({
        quality: AVIF_QUALITY,
        effort: 6
      })
      .toFile(avifPath)

    const avifStats = fs.statSync(avifPath)
    const avifSizeKB = avifStats.size / 1024

    // Create backup of original SVG (only once)
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(svgPath, backupPath)
      console.log(`   💾 Backed up original SVG`)
    }

    const savings = originalSizeKB - pngSizeKB // Compare PNG to original
    const savingsPercent = ((savings / originalSizeKB) * 100).toFixed(1)

    console.log(`✅ ${filename}:`)
    console.log(`   PNG:  ${originalSizeKB.toFixed(2)} KB → ${pngSizeKB.toFixed(2)} KB (${savingsPercent}% ${savings >= 0 ? 'saved' : 'increase'})`)
    console.log(`   WebP: ${webpSizeKB.toFixed(2)} KB (${((1 - webpSizeKB / pngSizeKB) * 100).toFixed(1)}% vs PNG)`)
    console.log(`   AVIF: ${avifSizeKB.toFixed(2)} KB (${((1 - avifSizeKB / pngSizeKB) * 100).toFixed(1)}% vs PNG)`)

    return {
      converted: true,
      filename,
      originalSize: originalSizeKB,
      pngSize: pngSizeKB,
      webpSize: webpSizeKB,
      avifSize: avifSizeKB,
      savings,
      savingsPercent
    }

  } catch (error) {
    console.error(`❌ Error converting ${filename}:`, error.message)
    return { error: true, filename, message: error.message }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting SVG to PNG/WebP/AVIF conversion...\n')
  console.log(`📁 Scanning: ${ICONS_DIR}\n`)

  if (!fs.existsSync(ICONS_DIR)) {
    console.error(`❌ Directory not found: ${ICONS_DIR}`)
    process.exit(1)
  }

  // Get all SVG files
  const svgFiles = fs.readdirSync(ICONS_DIR)
    .filter(file => file.toLowerCase().endsWith('.svg'))
    .filter(file => !file.endsWith(BACKUP_EXTENSION)) // Skip backup files
    .map(file => path.join(ICONS_DIR, file))

  if (svgFiles.length === 0) {
    console.log('ℹ️  No SVG files found in Icons directory')
    return
  }

  console.log(`📄 Found ${svgFiles.length} SVG files to convert\n`)

  const results = {
    converted: [],
    skipped: [],
    errors: []
  }

  // Process all SVG files
  for (const svgPath of svgFiles) {
    const result = await convertSVGToOptimized(svgPath)

    if (result.error) {
      results.errors.push(result)
    } else if (result.converted) {
      results.converted.push(result)
    } else {
      results.skipped.push(result)
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 Conversion Summary')
  console.log('='.repeat(60))
  console.log(`✅ Converted: ${results.converted.length}`)
  console.log(`⏭️  Skipped: ${results.skipped.length}`)
  console.log(`❌ Errors: ${results.errors.length}`)

  if (results.converted.length > 0) {
    const totalOriginal = results.converted.reduce((sum, r) => sum + r.originalSize, 0)
    const totalPng = results.converted.reduce((sum, r) => sum + r.pngSize, 0)
    const totalWebp = results.converted.reduce((sum, r) => sum + r.webpSize, 0)
    const totalAvif = results.converted.reduce((sum, r) => sum + r.avifSize, 0)
    const totalSavings = totalOriginal - totalPng
    const totalSavingsPercent = ((totalSavings / totalOriginal) * 100).toFixed(1)

    console.log(`\n💾 Total File Sizes:`)
    console.log(`   Original SVG: ${totalOriginal.toFixed(2)} KB`)
    console.log(`   PNG:          ${totalPng.toFixed(2)} KB (${totalSavingsPercent}% ${totalSavings >= 0 ? 'saved' : 'increase'})`)
    console.log(`   WebP:         ${totalWebp.toFixed(2)} KB (${((1 - totalWebp / totalPng) * 100).toFixed(1)}% vs PNG)`)
    console.log(`   AVIF:         ${totalAvif.toFixed(2)} KB (${((1 - totalAvif / totalPng) * 100).toFixed(1)}% vs PNG)`)
  }

  if (results.errors.length > 0) {
    console.log('\n❌ Errors:')
    results.errors.forEach(err => {
      console.log(`   - ${err.filename}: ${err.message}`)
    })
  }

  console.log('\n✅ Conversion complete!')
  console.log('\n📝 Next steps:')
  console.log('   1. Icon resolver will now prefer PNG over SVG')
  console.log('   2. OptimizedImage component will use WebP/AVIF when available')
  console.log('   3. Original SVGs are backed up with .svg.backup extension')
  console.log('   4. Test that all icons display correctly')
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}

module.exports = { convertSVGToOptimized, main }
