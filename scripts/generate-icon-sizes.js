/**
 * Generate Multiple Icon Sizes
 * Creates optimized icon sizes from existing PNG icons for responsive images
 * 
 * Requirements:
 * npm install sharp --save-dev
 * 
 * Usage:
 * node scripts/generate-icon-sizes.js
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const ICONS_DIR = path.join(__dirname, '../public/assets/img/Icons')
const OUTPUT_DIR = ICONS_DIR

// Icon size configurations
const ICON_SIZES = [
  { name: '1x', size: 42, suffix: '' },      // Standard display (1x)
  { name: '2x', size: 84, suffix: '-2x' },   // Retina display (2x)
  // Keep original 512x512 for scalability (no suffix)
]

// Quality settings
const PNG_QUALITY = 90
const WEBP_QUALITY = 85
const AVIF_QUALITY = 80

/**
 * Generate multiple sizes for a single icon
 */
async function generateIconSizes(iconPath) {
  const filename = path.basename(iconPath)
  const ext = path.extname(filename)
  const baseName = filename.replace(ext, '')
  
  // Skip if already has size suffix or is optimized version
  if (baseName.includes('-2x') || baseName.includes('-optimized') || baseName.includes('-backup')) {
    return { skipped: true, filename }
  }
  
  // Skip SVG files (handled by convert-svgs-to-webp.js)
  if (ext.toLowerCase() === '.svg') {
    return { skipped: true, filename, reason: 'SVG' }
  }
  
  // Only process PNG/JPG files
  if (!['.png', '.jpg', '.jpeg'].includes(ext.toLowerCase())) {
    return { skipped: true, filename, reason: 'Not PNG/JPG' }
  }
  
  const results = {
    filename,
    sizes: [],
    errors: []
  }
  
  try {
    // Read original image
    const imageBuffer = fs.readFileSync(iconPath)
    const metadata = await sharp(imageBuffer).metadata()
    
    // Generate each size
    for (const sizeConfig of ICON_SIZES) {
      try {
        const outputFilename = `${baseName}${sizeConfig.suffix}${ext}`
        const outputPath = path.join(OUTPUT_DIR, outputFilename)
        
        // Skip if file already exists and is up-to-date
        if (fs.existsSync(outputPath)) {
          const outputStats = fs.statSync(outputPath)
          
          // If output is newer than input, skip
          if (outputStats.mtime > inputStats.mtime) {
            results.sizes.push({ size: sizeConfig.name, filename: outputFilename, status: 'skipped (up-to-date)' })
            continue
          }
        }
        
        // Resize image
        await sharp(imageBuffer)
          .resize(sizeConfig.size, sizeConfig.size, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
          })
          .png({ quality: PNG_QUALITY, compressionLevel: 9, adaptiveFiltering: true })
          .toFile(outputPath)
        
        const outputStats = fs.statSync(outputPath)
        results.sizes.push({
          size: sizeConfig.name,
          filename: outputFilename,
          sizeBytes: outputStats.size,
          status: 'created'
        })
        
        // Also generate WebP and AVIF versions for each size
        const baseOutput = outputPath.replace(ext, '')
        
        // WebP version
        const webpPath = `${baseOutput}.webp`
        await sharp(imageBuffer)
          .resize(sizeConfig.size, sizeConfig.size, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .webp({ quality: WEBP_QUALITY, effort: 6 })
          .toFile(webpPath)
        
        // AVIF version
        const avifPath = `${baseOutput}.avif`
        await sharp(imageBuffer)
          .resize(sizeConfig.size, sizeConfig.size, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .avif({ quality: AVIF_QUALITY, effort: 6 })
          .toFile(avifPath)
        
        results.sizes.push(
          { size: sizeConfig.name, filename: `${baseName}${sizeConfig.suffix}.webp`, status: 'created' },
          { size: sizeConfig.name, filename: `${baseName}${sizeConfig.suffix}.avif`, status: 'created' }
        )
      } catch (error) {
        results.errors.push({ size: sizeConfig.name, error: error.message })
      }
    }
  } catch (error) {
    results.errors.push({ error: error.message })
  }
  
  return results
}

/**
 * Main function
 */
async function main() {
  console.log('🎨 Generating optimized icon sizes...\n')
  
  if (!fs.existsSync(ICONS_DIR)) {
    console.error(`❌ Icons directory not found: ${ICONS_DIR}`)
    process.exit(1)
  }
  
  // Get all PNG/JPG files in Icons directory
  const files = fs.readdirSync(ICONS_DIR)
    .filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.png', '.jpg', '.jpeg'].includes(ext) &&
             !file.includes('-2x') &&
             !file.includes('-optimized') &&
             !file.includes('-backup')
    })
    .map(file => path.join(ICONS_DIR, file))
  
  if (files.length === 0) {
    console.log('ℹ️  No icons found to process')
    return
  }
  
  console.log(`📦 Found ${files.length} icons to process\n`)
  
  const allResults = []
  let totalProcessed = 0
  let totalSkipped = 0
  
  for (const file of files) {
    const result = await generateIconSizes(file)
    allResults.push(result)
    
    if (result.skipped) {
      totalSkipped++
    } else {
      totalProcessed++
      if (result.sizes.length > 0) {
        console.log(`✅ ${result.filename}`)
        result.sizes.forEach(size => {
          if (size.status === 'created') {
            const sizeKB = (size.sizeBytes / 1024).toFixed(2)
            console.log(`   └─ ${size.size}: ${size.filename} (${sizeKB} KB)`)
          }
        })
      }
      if (result.errors.length > 0) {
        console.log(`   ⚠️  Errors: ${result.errors.map(e => e.error).join(', ')}`)
      }
    }
  }
  
  console.log(`\n📊 Summary:`)
  console.log(`   Processed: ${totalProcessed}`)
  console.log(`   Skipped: ${totalSkipped}`)
  console.log(`\n✅ Icon size generation complete!`)
  console.log(`\n💡 Next steps:`)
  console.log(`   1. Icons now have 1x (42px) and 2x (84px) versions`)
  console.log(`   2. Each size has PNG, WebP, and AVIF formats`)
  console.log(`   3. Update IconComponent to use responsive srcset`)
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error)
    process.exit(1)
  })
}

module.exports = { generateIconSizes, main }
