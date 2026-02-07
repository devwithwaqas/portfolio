/**
 * Generate all favicons and PWA/apple-touch icons from a single source image.
 * Source: public/favicon-sample.png (or first CLI arg).
 * Creates: root favicon.ico + PNGs; assets/img favicon.png, favicon-192, favicon-512, apple-touch-*.
 * Run: node scripts/generate-all-favicons.js [source-path]
 * Build: build:firebase runs this so Google Search, address bar, manifest, PWA, and iOS all use the same icon.
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const PUBLIC = path.join(__dirname, '../public')
const ASSETS_IMG = path.join(PUBLIC, 'assets/img')

const DEFAULT_SOURCE = path.join(PUBLIC, 'favicon-sample.png')

const ROOT_ICONS = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' }
]

const PWA_ICONS = [
  { size: 128, name: 'favicon.png' },
  { size: 192, name: 'favicon-192.png' },
  { size: 512, name: 'favicon-512.png' }
]

const APPLE_TOUCH_ICONS = [
  { size: 76, name: 'apple-touch-icon-76.png' },
  { size: 120, name: 'apple-touch-icon-120.png' },
  { size: 152, name: 'apple-touch-icon-152.png' },
  { size: 180, name: 'apple-touch-icon.png' }
]

const resizeOpts = { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }

function createIcoFromPngs(pngBuffers) {
  const numImages = pngBuffers.length
  const headerSize = 6 + numImages * 16
  let totalDataSize = 0
  const imageSizes = pngBuffers.map((buf) => {
    totalDataSize += buf.length
    return buf.length
  })
  const icoBuffer = Buffer.alloc(headerSize + totalDataSize)
  icoBuffer.writeUInt16LE(0, 0)
  icoBuffer.writeUInt16LE(1, 2)
  icoBuffer.writeUInt16LE(numImages, 4)
  let dataOffset = headerSize
  const sizes = [16, 32, 48]
  for (let i = 0; i < numImages; i++) {
    const entryOffset = 6 + i * 16
    const size = sizes[i]
    icoBuffer.writeUInt8(size, entryOffset)
    icoBuffer.writeUInt8(size, entryOffset + 1)
    icoBuffer.writeUInt8(0, entryOffset + 2)
    icoBuffer.writeUInt8(0, entryOffset + 3)
    icoBuffer.writeUInt16LE(1, entryOffset + 4)
    icoBuffer.writeUInt16LE(32, entryOffset + 6)
    icoBuffer.writeUInt32LE(imageSizes[i], entryOffset + 8)
    icoBuffer.writeUInt32LE(dataOffset, entryOffset + 12)
    pngBuffers[i].copy(icoBuffer, dataOffset)
    dataOffset += imageSizes[i]
  }
  return icoBuffer
}

async function generateAll(sourcePath) {
  if (!fs.existsSync(sourcePath)) {
    console.error('Source image not found:', sourcePath)
    console.error('Place your icon in public/favicon-sample.png or pass a path.')
    process.exit(1)
  }

  const meta = await sharp(sourcePath).metadata()
  console.log('Generate all favicons from:', sourcePath)
  console.log('Source size:', meta.width + 'x' + meta.height)
  if ((meta.width || 0) < 512 || (meta.height || 0) < 512) {
    console.warn('Warning: source smaller than 512px; icons will be upscaled.')
  }
  console.log('')

  const buf = await sharp(sourcePath).resize(512, 512, resizeOpts).png().toBuffer()
  const sourceBuffer = buf

  for (const { size, name } of ROOT_ICONS) {
    const out = path.join(PUBLIC, name)
    await sharp(sourceBuffer).resize(size, size, resizeOpts).png().toFile(out)
    console.log('  public/' + name + ' (' + size + 'x' + size + ')')
  }

  const png16 = await sharp(sourceBuffer).resize(16, 16).png().toBuffer()
  const png32 = await sharp(sourceBuffer).resize(32, 32).png().toBuffer()
  const png48 = await sharp(sourceBuffer).resize(48, 48).png().toBuffer()
  const ico = createIcoFromPngs([png16, png32, png48])
  fs.writeFileSync(path.join(PUBLIC, 'favicon.ico'), ico)
  console.log('  public/favicon.ico (16, 32, 48)')

  if (!fs.existsSync(ASSETS_IMG)) {
    fs.mkdirSync(ASSETS_IMG, { recursive: true })
  }

  for (const { size, name } of PWA_ICONS) {
    const out = path.join(ASSETS_IMG, name)
    await sharp(sourceBuffer).resize(size, size, resizeOpts).png().toFile(out)
    console.log('  public/assets/img/' + name + ' (' + size + 'x' + size + ')')
  }

  for (const { size, name } of APPLE_TOUCH_ICONS) {
    const out = path.join(ASSETS_IMG, name)
    await sharp(sourceBuffer).resize(size, size, resizeOpts).png().toFile(out)
    console.log('  public/assets/img/' + name + ' (' + size + 'x' + size + ')')
  }

  console.log('')
  console.log('Done. Favicons: address bar, Google Search, manifest (512/192), PWA, apple-touch.')
}

const source = process.argv[2]
  ? (path.isAbsolute(process.argv[2]) ? process.argv[2] : path.join(process.cwd(), process.argv[2]))
  : DEFAULT_SOURCE

generateAll(source).catch((e) => {
  console.error(e)
  process.exit(1)
})
