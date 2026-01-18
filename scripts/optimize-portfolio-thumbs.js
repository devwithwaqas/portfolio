/**
 * Optimize portfolio banner thumbnails for cards.
 * Creates -optimized JPG plus WebP/AVIF variants.
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const IMG_DIR = path.join(__dirname, '../public/assets/img')

const THUMB_IMAGES = [
  'he1-thumb.jpg',
  'aa1-thumb.jpg',
  'bat1-thumb.jpg',
  'pj1-thumb.jpg',
  'sf1-thumb.jpg',
  'vp1-thumb.jpg',
  'gd1-thumb.jpg',
  'gpc1-thumb.jpg',
  'g51-thumb.jpg',
  'in1-thumb.jpg'
]

const OUTPUT_CONFIG = {
  maxWidth: 800,
  maxHeight: 320,
  quality: 80
}

async function optimizeThumb(filename) {
  const inputPath = path.join(IMG_DIR, filename)
  if (!fs.existsSync(inputPath)) {
    console.warn(`⚠️  Missing: ${filename}`)
    return
  }

  const base = filename.replace(/\.(jpg|jpeg|png)$/i, '')
  const optimizedJpg = path.join(IMG_DIR, `${base}-optimized.jpg`)
  const optimizedWebp = path.join(IMG_DIR, `${base}-optimized.webp`)
  const optimizedAvif = path.join(IMG_DIR, `${base}-optimized.avif`)

  const image = sharp(inputPath)
  const metadata = await image.metadata()
  const resizeNeeded = metadata.width > OUTPUT_CONFIG.maxWidth || metadata.height > OUTPUT_CONFIG.maxHeight

  const pipeline = resizeNeeded
    ? image.resize(OUTPUT_CONFIG.maxWidth, OUTPUT_CONFIG.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
    : image

  await pipeline.clone()
    .jpeg({ quality: OUTPUT_CONFIG.quality, mozjpeg: true })
    .toFile(optimizedJpg)

  await pipeline.clone()
    .webp({ quality: OUTPUT_CONFIG.quality })
    .toFile(optimizedWebp)

  await pipeline.clone()
    .avif({ quality: OUTPUT_CONFIG.quality })
    .toFile(optimizedAvif)

  console.log(`✅ Optimized ${filename}`)
}

async function main() {
  console.log('🚀 Optimizing portfolio thumbs...\n')
  for (const filename of THUMB_IMAGES) {
    // eslint-disable-next-line no-await-in-loop
    await optimizeThumb(filename)
  }
  console.log('\n✅ Done.')
}

if (require.main === module) {
  main().catch((err) => {
    console.error('❌ Optimization failed:', err)
    process.exit(1)
  })
}
