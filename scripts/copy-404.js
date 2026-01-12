const fs = require('fs')
const path = require('path')

const src404 = path.resolve(__dirname, '../public/404.html')
const dest404 = path.resolve(__dirname, '../dist/404.html')

if (fs.existsSync(src404)) {
  try {
    fs.copyFileSync(src404, dest404)
    console.log('✓ Copied 404.html to dist/')
  } catch (err) {
    console.error('Failed to copy 404.html:', err)
    process.exit(1)
  }
} else {
  console.warn('404.html not found in public/')
}
