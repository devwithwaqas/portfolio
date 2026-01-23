/**
 * Optimize ALL project gallery images in one go
 * Single source of truth: every project's gallery images listed here.
 * Generates responsive widths (662w, 1324w) + WebP/AVIF. Overwrites originals with optimized JPG.
 * Uses Sharp for image optimization
 */

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const IMG_DIR = path.resolve(__dirname, '../public/assets/img')
const SERVICES_DIR = path.join(IMG_DIR, 'services')

// Display width ~662px (Lighthouse); 2x for retina = 1324
const WIDTHS = [662, 1324]
const QUALITY = { jpg: 82, webp: 82, avif: 65 }
const FIT = { fit: 'inside', withoutEnlargement: true }

// Single source of truth: all project gallery images (basename without ext)
const GALLERY_IMAGES = [
  'he1', 'he2', 'he3', 'he4',           // Heat Exchanger
  'aa1', 'aa2', 'aa3', 'aa4', 'aa5', 'aa6', 'aa7',  // AirAsia
  'bat1', 'bat2', 'bat3', 'bat4',       // BAT
  'gd1', 'gd2', 'gd3', 'gd4',          // Mobile Games
  'pj1', 'pj2',                         // Smart City
  'gpc1', 'gpc2', 'gpc3',              // UK Property
  'sf1', 'sf2', 'sf3', 'sf4', 'sf5',   // Gamified Employee
  'in1', 'in2', 'in3',                  // Insurance
  'vp1', 'vp2', 'vp3', 'vp4',          // Valet Parking
  'g51', 'g52', 'g53', 'g54'           // G5 POS
]

// Service page images (hero, process, cta, banner-1/2/3) - shared components propagate to all service pages
const SERVICE_NAMES = ['agile', 'azure', 'database', 'full-stack', 'leadership', 'microservices', 'mobile']
const SERVICE_IMAGE_TYPES = ['hero', 'process', 'cta', 'banner-1', 'banner-2', 'banner-3']
const SERVICE_IMAGES = []
SERVICE_NAMES.forEach(service => {
  SERVICE_IMAGE_TYPES.forEach(type => {
    SERVICE_IMAGES.push({ basename: `${service}-${type}`, dir: 'services' })
  })
})

/**
 * Optimize a gallery image - generates responsive widths + WebP/AVIF
 */
async function optimizeGalleryImage(inputPath, basename, subdir = '') {
  const ext = path.extname(inputPath).toLowerCase()
  const valid = ['.jpg', '.jpeg', '.png']
  if (!valid.includes(ext)) {
    console.warn(`⏭️  Skip ${basename}${ext}: not jpg/png`)
    return { skipped: true, basename, reason: 'format' }
  }

  if (!fs.existsSync(inputPath)) {
    console.warn(`⏭️  Skip ${basename}: file not found`)
    return { skipped: true, basename, reason: 'missing' }
  }

  try {
    const results = { basename, files: [], originalKB: 0, totalKB: 0 }
    const origStats = fs.statSync(inputPath)
    const origKB = origStats.size / 1024
    results.originalKB = origKB

    // Generate responsive widths (662w, 1324w) + WebP/AVIF
    for (const w of WIDTHS) {
      const pipe = sharp(inputPath).resize(w, null, FIT)
      const suffix = `-${w}w`

      const [jpegBuf, webpBuf, avifBuf] = await Promise.all([
        pipe.clone().jpeg({ quality: QUALITY.jpg, mozjpeg: true, progressive: true }).toBuffer(),
        pipe.clone().webp({ quality: QUALITY.webp, effort: 5 }).toBuffer(),
        pipe.clone().avif({ quality: QUALITY.avif, effort: 4 }).toBuffer().catch(() => null)
      ])

      const outputDir = subdir ? path.join(IMG_DIR, subdir) : IMG_DIR
      fs.writeFileSync(path.join(outputDir, `${basename}${suffix}.jpg`), jpegBuf)
      fs.writeFileSync(path.join(outputDir, `${basename}${suffix}.webp`), webpBuf)
      if (avifBuf) {
        fs.writeFileSync(path.join(outputDir, `${basename}${suffix}.avif`), avifBuf)
        results.totalKB += avifBuf.length / 1024
      }
      results.totalKB += jpegBuf.length / 1024 + webpBuf.length / 1024
    }

    // Overwrite original with optimized 1324w JPG (fallback for existing refs)
    // Use copyFileSync instead of rename to avoid EPERM if file is open
    const tempPath = inputPath + '.tmp'
    try {
      await sharp(inputPath)
        .resize(1324, null, FIT)
        .jpeg({ quality: QUALITY.jpg, mozjpeg: true, progressive: true })
        .toFile(tempPath)
      // Try rename first, fallback to copy+unlink if locked
      try {
        fs.renameSync(tempPath, inputPath)
      } catch (renameErr) {
        if (renameErr.code === 'EPERM' || renameErr.code === 'EBUSY') {
          fs.copyFileSync(tempPath, inputPath)
          fs.unlinkSync(tempPath)
        } else {
          throw renameErr
        }
      }
    } catch (err) {
      // If overwrite fails (file locked), that's OK - responsive files are what matter
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath)
      if (err.code !== 'EPERM' && err.code !== 'EBUSY') throw err
    }

    // Check if overwrite succeeded (might fail if file is locked)
    let fallbackKB = 0
    if (fs.existsSync(inputPath)) {
      fallbackKB = (fs.statSync(inputPath).size / 1024).toFixed(2)
      results.totalKB += Number(fallbackKB)
    } else if (fs.existsSync(tempPath)) {
      // Temp file exists but rename failed - use temp size
      fallbackKB = (fs.statSync(tempPath).size / 1024).toFixed(2)
      results.totalKB += Number(fallbackKB)
    }
    results.optimized = true
    results.fallbackKB = fallbackKB
    const status = fs.existsSync(tempPath) ? ' (original locked, responsive files created)' : ''
    console.log(`✅ ${basename}: ${origKB.toFixed(2)} KB → fallback ${fallbackKB} KB + 662w/1324w (webp/avif)${status}`)
    return results
  } catch (error) {
    // If error is just EPERM on overwrite, that's OK - responsive files were created
    if (error.code === 'EPERM' || error.code === 'EBUSY') {
      const responsiveFiles = []
      const checkDir = subdir ? path.join(IMG_DIR, subdir) : IMG_DIR
      for (const w of WIDTHS) {
        const jpg = path.join(checkDir, `${basename}-${w}w.jpg`)
        if (fs.existsSync(jpg)) responsiveFiles.push(`${w}w`)
      }
      if (responsiveFiles.length > 0) {
        console.log(`✅ ${basename}: responsive files created (${responsiveFiles.join(', ')}) - original locked`)
        return { optimized: true, basename, totalKB: 0, fallbackKB: 0, locked: true }
      }
    }
    console.error(`❌ Error optimizing ${basename}:`, error.message)
    return { error: true, basename, message: error.message }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Optimizing ALL project gallery images (one go)\n')
  console.log(`📁 ${IMG_DIR}\n`)

  if (!fs.existsSync(IMG_DIR)) {
    console.error(`❌ Directory not found: ${IMG_DIR}`)
    process.exit(1)
  }

  let totalOriginal = 0
  let totalNew = 0
  const done = []
  const skipped = []
  const errors = []

  // Process project gallery images
  for (const basename of GALLERY_IMAGES) {
    const candidates = [`${basename}.jpg`, `${basename}.jpeg`, `${basename}.png`]
    let inputPath = null
    for (const c of candidates) {
      const p = path.join(IMG_DIR, c)
      if (fs.existsSync(p)) {
        inputPath = p
        break
      }
    }
    if (!inputPath) {
      skipped.push(basename)
      continue
    }
    const origKB = fs.statSync(inputPath).size / 1024
    totalOriginal += origKB
    const res = await optimizeGalleryImage(inputPath, basename, '')
    if (res.error) {
      errors.push(res)
    } else if (res.optimized) {
      done.push(res)
      totalNew += res.totalKB || 0
    } else {
      skipped.push(basename)
    }
  }

  // Process service page images (shared components - changes propagate to all service pages)
  console.log('\n📦 Processing service page images (shared components)...\n')
  for (const { basename, dir } of SERVICE_IMAGES) {
    const candidates = [`${basename}.jpg`, `${basename}.jpeg`, `${basename}.png`]
    let inputPath = null
    for (const c of candidates) {
      const p = path.join(IMG_DIR, dir, c)
      if (fs.existsSync(p)) {
        inputPath = p
        break
      }
    }
    if (!inputPath) {
      skipped.push(`${dir}/${basename}`)
      continue
    }
    const origKB = fs.statSync(inputPath).size / 1024
    totalOriginal += origKB
    const res = await optimizeGalleryImage(inputPath, basename, dir)
    if (res.error) {
      errors.push(res)
    } else if (res.optimized) {
      done.push(res)
      totalNew += res.totalKB || 0
    } else {
      skipped.push(`${dir}/${basename}`)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 Summary')
  console.log('='.repeat(60))
  console.log(`✅ Optimized: ${done.length} images`)
  if (skipped.length) console.log(`⏭️  Skipped: ${skipped.join(', ')}`)
  if (errors.length) {
    console.log(`❌ Errors: ${errors.length}`)
    errors.forEach(err => console.log(`   - ${err.basename}: ${err.message}`))
  }
  console.log(`💾 Original total: ${(totalOriginal / 1024).toFixed(2)} MB`)
  console.log(`💾 New total: ${(totalNew / 1024).toFixed(2)} MB`)
  console.log(`📉 Est. savings: ${((totalOriginal - totalNew) / 1024).toFixed(2)} MB`)
  console.log('\n✅ Done. ProjectGallery & Service pages use ResponsiveImage (<picture> + srcset) for responsive delivery.')
  
  if (errors.length > 0) {
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}

module.exports = { optimizeGalleryImage, main, GALLERY_IMAGES, WIDTHS }
