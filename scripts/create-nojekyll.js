/**
 * Create .nojekyll file in dist directory
 * This tells GitHub Pages to skip Jekyll processing and serve files as-is
 * Required for static XML files like sitemap.xml to be served correctly
 */

const fs = require('fs')
const path = require('path')

const DIST_DIR = path.resolve(__dirname, '../dist')

function createNoJekyll() {
  // Ensure dist directory exists
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true })
    console.log('✓ Created dist directory')
  }
  
  // Create .nojekyll file (empty file)
  const nojekyllPath = path.join(DIST_DIR, '.nojekyll')
  fs.writeFileSync(nojekyllPath, '', 'utf8')
  console.log('✓ Created .nojekyll file at:', nojekyllPath)
  console.log('  This ensures GitHub Pages serves static files (like sitemap.xml) correctly')
}

// Run if called directly
if (require.main === module) {
  createNoJekyll()
}

module.exports = { createNoJekyll }
