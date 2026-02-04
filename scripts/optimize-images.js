/**
 * Image Optimization Script
 * Creates optimized thumbnails for portfolio cards and hero section
 * 
 * Requirements:
 * npm install sharp --save-dev
 * 
 * Usage:
 * node scripts/optimize-images.js
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const IMG_DIR = path.join(__dirname, '../public/assets/img')
const OUTPUT_DIR = IMG_DIR

// Portfolio thumbnail settings (displayed at ~200px height, so 2x for retina = 400px)
const THUMBNAIL_CONFIG = {
  width: 800,  // Max width for portfolio cards
  height: 400, // Max height for portfolio cards
  quality: 80, // Good balance between quality and file size
  fit: 'cover' // Cover the area, maintain aspect ratio
}

// Hero image settings - Maintain aspect ratio, only optimize quality
const HERO_CONFIG = {
  maxWidth: 1600,  // Max width (2x for retina if original is larger)
  quality: 85,     // Slightly higher quality for hero
  maintainAspectRatio: true // Keep original dimensions/aspect ratio
}

// Portfolio thumbnail images to optimize
const PORTFOLIO_IMAGES = [
  'he1.jpg',    // Heat Exchanger
  'aa1.jpg',    // Air Asia
  'bat1.jpg',   // BAT
  'pj1.jpg',    // PJ Smart City
  'sf1.jpg',    // Gamified Employee
  'vp1.jpg',    // Valet Parking
  'gd1.jpg',    // Mobile Games
  'gpc1.jpg',   // UK Property
  'g51.jpg',    // G5 POS
  'in1.jpg'     // Insurance
]

// Hero image to optimize
const HERO_IMAGE = 'waqas-microsoft-profile.jpg'

async function optimizeImage(inputPath, outputPath, config) {
  try {
    const stats = await fs.promises.stat(inputPath)
    const originalSize = (stats.size / 1024).toFixed(2) // KB
    
    let sharpInstance = sharp(inputPath)
    
    // For hero image - maintain aspect ratio, only resize if larger than maxWidth
    if (config.maintainAspectRatio) {
      const metadata = await sharpInstance.metadata()
      if (metadata.width > config.maxWidth) {
        sharpInstance = sharpInstance.resize(config.maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
      }
    } else {
      // For thumbnails - resize with specific dimensions
      sharpInstance = sharpInstance.resize(config.width, config.height, {
        fit: config.fit,
        position: 'center'
      })
    }
    
    await sharpInstance
      .jpeg({ 
        quality: config.quality,
        mozjpeg: true // Better compression
      })
      .toFile(outputPath)
    
    const newStats = await fs.promises.stat(outputPath)
    const newSize = (newStats.size / 1024).toFixed(2) // KB
    const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1)
    
    console.log(`✅ ${path.basename(inputPath)}: ${originalSize}KB → ${newSize}KB (${reduction}% reduction)`)
    return { originalSize, newSize, reduction }
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message)
    return null
  }
}

async function createThumbnails() {
  console.log('🖼️  Creating portfolio thumbnails...\n')
  
  const results = []
  
  // Create thumbnails for portfolio images
  for (const image of PORTFOLIO_IMAGES) {
    const inputPath = path.join(IMG_DIR, image)
    const outputPath = path.join(IMG_DIR, image.replace('.jpg', '-thumb.jpg'))
    
    if (fs.existsSync(inputPath)) {
      const result = await optimizeImage(inputPath, outputPath, THUMBNAIL_CONFIG)
      if (result) {
        results.push({ image, ...result })
      }
    } else {
      console.warn(`⚠️  Image not found: ${image}`)
    }
  }
  
  return results
}

async function optimizeHero() {
  console.log('\n🖼️  Optimizing hero image...\n')
  
  const inputPath = path.join(IMG_DIR, HERO_IMAGE)
  const outputPath = path.join(IMG_DIR, HERO_IMAGE.replace('.jpg', '-optimized.jpg'))
  
  if (fs.existsSync(inputPath)) {
    return await optimizeImage(inputPath, outputPath, HERO_CONFIG)
  } else {
    console.warn(`⚠️  Hero image not found: ${HERO_IMAGE}`)
    return null
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n')
  
  // Check if sharp is installed
  try {
    require('sharp')
  } catch (error) {
    console.error('❌ Error: sharp is not installed!')
    console.log('\n📦 Please install sharp first:')
    console.log('   npm install sharp --save-dev\n')
    process.exit(1)
  }
  
  // Create thumbnails
  const thumbnailResults = await createThumbnails()
  
  // Optimize hero
  const heroResult = await optimizeHero()
  
  // Summary
  console.log('\n📊 Optimization Summary:')
  console.log('═'.repeat(50))
  
  if (thumbnailResults.length > 0) {
    const totalOriginal = thumbnailResults.reduce((sum, r) => sum + parseFloat(r.originalSize), 0)
    const totalNew = thumbnailResults.reduce((sum, r) => sum + parseFloat(r.newSize), 0)
    
    console.log(`\n📦 Portfolio Thumbnails:`)
    console.log(`   Images optimized: ${thumbnailResults.length}`)
    console.log(`   Total size: ${totalOriginal.toFixed(2)}KB → ${totalNew.toFixed(2)}KB`)
    console.log(`   Average reduction: ${avgReduction}%`)
  }
  
  if (heroResult) {
    console.log(`\n🖼️  Hero Image:`)
    console.log(`   ${heroResult.originalSize}KB → ${heroResult.newSize}KB (${heroResult.reduction}% reduction)`)
  }
  
  console.log('\n✅ Image optimization complete!')
  console.log('\n📝 Next steps:')
  console.log('   1. Review the optimized images')
  console.log('   2. Update code to use thumbnail versions')
  console.log('   3. Test locally before committing\n')
}

// Run the script
main().catch(console.error)
