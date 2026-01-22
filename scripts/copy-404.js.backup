const fs = require('fs')
const path = require('path')

// For GitHub Pages SPA routing, 404.html should be identical to index.html
// This allows Vue Router to handle routes correctly when GitHub Pages serves 404.html
const indexHtml = path.resolve(__dirname, '../dist/index.html')
const dest404 = path.resolve(__dirname, '../dist/404.html')

if (fs.existsSync(indexHtml)) {
  try {
    // Copy index.html to 404.html so Vue Router can handle all routes
    fs.copyFileSync(indexHtml, dest404)
    console.log('✓ Copied index.html to 404.html for GitHub Pages SPA routing')
  } catch (err) {
    console.error('Failed to copy index.html to 404.html:', err)
    process.exit(1)
  }
} else {
  console.error('index.html not found in dist/ - build may have failed')
  process.exit(1)
}
