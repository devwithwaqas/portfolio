/**
 * Generate PWA Icon Sizes
 * Creates optimized icon sizes for PWA manifest (192x192, 512x512)
 * 
 * Requirements:
 * npm install sharp --save-dev (already installed)
 * 
 * Usage:
 * node scripts/generate-pwa-icons.js [source-file]
 * 
 * If no source file provided, looks for:
 * - favicon-512.png (512x512 source)
 * - favicon.png (existing, will be used as source)
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const ICONS_DIR = path.join(__dirname, '../public/assets/img')
const OUTPUT_DIR = ICONS_DIR

// PWA icon sizes required by manifest
const PWA_ICON_SIZES = [
  { size: 128, filename: 'favicon.png' },
  { size: 192, filename: 'favicon-192.png' },
  { size: 512, filename: 'favicon-512.png' }
]

// iOS Safari apple-touch-icon sizes (for "Add to Home Screen")
// Modern best practice: 180x180 is sufficient, but generating all for comprehensive support
const IOS_ICON_SIZES = [
  { size: 180, filename: 'apple-touch-icon.png' },      // iPhone 6 Plus and newer (3× display)
  { size: 152, filename: 'apple-touch-icon-152.png' }, // iPad with 2× display
  { size: 120, filename: 'apple-touch-icon-120.png' }, // iPhone 4s-6 (2× display)
  { size: 76, filename: 'apple-touch-icon-76.png' }    // iPad with 1× display (legacy)
]

/**
 * Generate PWA icons from source
 */
async function generatePWAIcons(sourcePath) {
  console.log('🎨 Generating PWA icons...\n')
  
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source file not found: ${sourcePath}`)
    process.exit(1)
  }
  
  // Check source image dimensions
  const metadata = await sharp(sourcePath).metadata()
  console.log(`📐 Source image: ${metadata.width}x${metadata.height}px\n`)
  
  if (metadata.width < 512 || metadata.height < 512) {
    console.warn('⚠️  Warning: Source image is smaller than 512x512. Icons may be upscaled.')
  }
  
  const results = []
  
  // Generate PWA manifest icons
  for (const iconConfig of PWA_ICON_SIZES) {
    try {
      const outputPath = path.join(OUTPUT_DIR, iconConfig.filename)
      
      // Resize and optimize
      await sharp(sourcePath)
        .resize(iconConfig.size, iconConfig.size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 } // White background for icons
        })
        .png({ 
          quality: 90, 
          compressionLevel: 9,
          adaptiveFiltering: true 
        })
        .toFile(outputPath)
      
      const stats = fs.statSync(outputPath)
      const sizeKB = (stats.size / 1024).toFixed(2)
      
      results.push({
        size: iconConfig.size,
        filename: iconConfig.filename,
        sizeKB: sizeKB,
        status: 'created'
      })
      
      console.log(`✅ Created ${iconConfig.filename} (${iconConfig.size}x${iconConfig.size}px, ${sizeKB}KB)`)
    } catch (error) {
      console.error(`❌ Error creating ${iconConfig.filename}:`, error.message)
      results.push({
        size: iconConfig.size,
        filename: iconConfig.filename,
        status: 'error',
        error: error.message
      })
    }
  }
  
  // Generate iOS Safari apple-touch-icons (skip if source is already the output file)
  console.log('\n🍎 Generating iOS Safari icons...\n')
  for (const iconConfig of IOS_ICON_SIZES) {
    try {
      const outputPath = path.join(OUTPUT_DIR, iconConfig.filename)
      
      // Skip if trying to overwrite source file
      if (path.resolve(outputPath) === path.resolve(sourcePath)) {
        console.log(`⏭️  Skipped ${iconConfig.filename} (source file)`)
        results.push({
          size: iconConfig.size,
          filename: iconConfig.filename,
          status: 'skipped',
          reason: 'source file'
        })
        continue
      }
      
      // Resize and optimize
      await sharp(sourcePath)
        .resize(iconConfig.size, iconConfig.size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 } // White background for icons
        })
        .png({ 
          quality: 90, 
          compressionLevel: 9,
          adaptiveFiltering: true 
        })
        .toFile(outputPath)
      
      const stats = fs.statSync(outputPath)
      const sizeKB = (stats.size / 1024).toFixed(2)
      
      results.push({
        size: iconConfig.size,
        filename: iconConfig.filename,
        sizeKB: sizeKB,
        status: 'created'
      })
      
      console.log(`✅ Created ${iconConfig.filename} (${iconConfig.size}x${iconConfig.size}px, ${sizeKB}KB)`)
    } catch (error) {
      console.error(`❌ Error creating ${iconConfig.filename}:`, error.message)
      results.push({
        size: iconConfig.size,
        filename: iconConfig.filename,
        status: 'error',
        error: error.message
      })
    }
  }
  
  console.log('\n📊 Summary:')
  const created = results.filter(r => r.status === 'created')
  const errors = results.filter(r => r.status === 'error')
  
  console.log(`   ✅ Created: ${created.length} icons`)
  if (errors.length > 0) {
    console.log(`   ❌ Errors: ${errors.length}`)
  }
  
  console.log('\n✅ PWA and iOS icon generation complete!')
  console.log('\n💡 Next steps:')
  console.log('   1. PWA icons ready: favicon.png (128px), favicon-192.png (192px), favicon-512.png (512px)')
  console.log('   2. iOS icons ready: apple-touch-icon.png (180px) + additional sizes for comprehensive support')
  console.log('   3. Update index.html to reference apple-touch-icon.png if needed')
  
  return results
}

/**
 * Main function
 */
async function main() {
  // Check if sharp is installed
  try {
    require('sharp')
  } catch (error) {
    console.error('❌ Error: sharp is not installed!')
    console.log('\n📦 Please install sharp first:')
    console.log('   npm install sharp --save-dev\n')
    process.exit(1)
  }
  
  // Get source file from command line or use defaults
  const sourceFile = process.argv[2] || null
  
  let sourcePath
  
  if (sourceFile) {
    // Use provided file
    sourcePath = path.isAbsolute(sourceFile) 
      ? sourceFile 
      : path.join(process.cwd(), sourceFile)
  } else {
    // Look for common source files
    const possibleSources = [
      path.join(ICONS_DIR, 'favicon-512.png'),
      path.join(ICONS_DIR, 'favicon.png'),
      path.join(ICONS_DIR, 'logo-512.png'),
      path.join(ICONS_DIR, 'icon-512.png')
    ]
    
    sourcePath = possibleSources.find(p => fs.existsSync(p))
    
    if (!sourcePath) {
      console.error('❌ No source file found!')
      console.log('\n📝 Please provide a source file:')
      console.log('   node scripts/generate-pwa-icons.js path/to/your-512x512-icon.png')
      console.log('\n   Or place one of these files in public/assets/img/:')
      console.log('   - favicon-512.png')
      console.log('   - favicon.png (will be used as source)')
      console.log('   - logo-512.png')
      console.log('   - icon-512.png\n')
      process.exit(1)
    }
  }
  
  await generatePWAIcons(sourcePath)
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error)
    process.exit(1)
  })
}

module.exports = { generatePWAIcons }
