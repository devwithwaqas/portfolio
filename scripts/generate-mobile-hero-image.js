/**
 * Generate Mobile-Optimized Hero Image
 * Creates smaller, optimized versions of the profile image for mobile devices
 * 
 * Requirements:
 * npm install sharp --save-dev
 * 
 * Usage:
 * node scripts/generate-mobile-hero-image.js
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const IMG_DIR = path.join(__dirname, '../public/assets/img')
const HERO_IMAGE = 'waqas-microsoft-profile-optimized.jpg'
const OUTPUT_DIR = IMG_DIR

// Mobile-optimized hero image settings
// Original: 365x115.7 (aspect ratio ~3.15:1)
const MOBILE_HERO_CONFIG = {
  width: 300,        // Smaller for mobile (82% of original)
  quality: 75,       // Lower quality for mobile (saves bandwidth)
  maintainAspectRatio: true // Keep 3.15:1 aspect ratio
}

// Desktop optimized (already exists, but ensure it's optimized)
const DESKTOP_HERO_CONFIG = {
  width: 365,        // Original width
  quality: 85,       // Higher quality for desktop
  maintainAspectRatio: true
}

async function generateMobileHero() {
  const inputPath = path.join(IMG_DIR, HERO_IMAGE)
  
  // Check if optimized version exists, if not use original
  let sourceImage = inputPath
  if (!fs.existsSync(inputPath)) {
    const originalPath = path.join(IMG_DIR, 'waqas-microsoft-profile.jpg')
    if (fs.existsSync(originalPath)) {
      sourceImage = originalPath
      console.log('⚠️  Using original image (optimized not found)')
    } else {
      console.error(`❌ Error: ${HERO_IMAGE} and waqas-microsoft-profile.jpg not found`)
      return
    }
  }
  
  try {
    const metadata = await sharp(sourceImage).metadata()
    const originalAspectRatio = metadata.width / metadata.height
    
    console.log(`\n📱 Generating mobile-optimized hero image...`)
    console.log(`   Original dimensions: ${metadata.width}x${metadata.height}`)
    console.log(`   Original aspect ratio: ${originalAspectRatio.toFixed(2)}:1`)
    console.log(`   Original file size: ${(fs.statSync(sourceImage).size / 1024).toFixed(2)} KB\n`)
    
    // Calculate mobile height based on aspect ratio
    const mobileHeight = Math.round(MOBILE_HERO_CONFIG.width / originalAspectRatio)
    
    // Generate mobile version
    const mobileOutputPath = path.join(OUTPUT_DIR, 'waqas-microsoft-profile-mobile.jpg')
    
    await sharp(sourceImage)
      .resize(MOBILE_HERO_CONFIG.width, mobileHeight, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ 
        quality: MOBILE_HERO_CONFIG.quality,
        mozjpeg: true // Better compression
      })
      .toFile(mobileOutputPath)
    
    const originalSize = fs.statSync(sourceImage).size / 1024 // KB
    const mobileSize = fs.statSync(mobileOutputPath).size / 1024 // KB
    const reduction = ((1 - mobileSize / originalSize) * 100).toFixed(1)
    
    console.log(`✅ Mobile version created: ${mobileOutputPath}`)
    console.log(`   Dimensions: ${MOBILE_HERO_CONFIG.width}x${mobileHeight}`)
    console.log(`   File size: ${originalSize.toFixed(2)}KB → ${mobileSize.toFixed(2)}KB (${reduction}% reduction)\n`)
    
    // Also generate WebP versions for better compression
    console.log('📦 Generating WebP versions...')
    
    // Mobile WebP
    const mobileWebPPath = path.join(OUTPUT_DIR, 'waqas-microsoft-profile-mobile.webp')
    await sharp(sourceImage)
      .resize(MOBILE_HERO_CONFIG.width, mobileHeight, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ 
        quality: MOBILE_HERO_CONFIG.quality + 5, // Slightly higher for WebP
        effort: 6 // Better compression
      })
      .toFile(mobileWebPPath)
    
    const mobileWebPSize = fs.statSync(mobileWebPPath).size / 1024
    console.log(`✅ Mobile WebP: ${mobileWebPSize.toFixed(2)}KB (${((1 - mobileWebPSize / originalSize) * 100).toFixed(1)}% reduction)`)
    
    // Desktop WebP (for desktop users with WebP support)
    const desktopWebPPath = path.join(OUTPUT_DIR, 'waqas-microsoft-profile-desktop.webp')
    await sharp(sourceImage)
      .resize(DESKTOP_HERO_CONFIG.width, desktopHeight, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ 
        quality: DESKTOP_HERO_CONFIG.quality + 5,
        effort: 6
      })
      .toFile(desktopWebPPath)
    
    const desktopWebPSize = fs.statSync(desktopWebPPath).size / 1024
    console.log(`✅ Desktop WebP: ${desktopWebPSize.toFixed(2)}KB (${((1 - desktopWebPSize / originalSize) * 100).toFixed(1)}% reduction)\n`)
    
    console.log('✨ Mobile hero image optimization complete!')
    console.log('\n📝 Next steps:')
    console.log('   1. Update OptimizedImage.vue to use responsive srcset')
    console.log('   2. Test on mobile device')
    console.log('   3. Verify LCP improvement in PageSpeed Insights\n')
    
  } catch (error) {
    console.error(`❌ Error generating mobile hero image:`, error.message)
  }
}

// Run the script
generateMobileHero().catch(console.error)
