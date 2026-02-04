/**
 * Setup Font Awesome Self-Hosting
 * Copies Font Awesome fonts and CSS to public directory
 * Modifies CSS to use local paths and add font-display: swap
 * 
 * Requirements:
 * npm install @fortawesome/fontawesome-free@6.4.0 --save-dev
 * 
 * Usage:
 * node scripts/setup-font-awesome.js
 */

const fs = require('fs')
const path = require('path')

const FA_PACKAGE_DIR = path.join(__dirname, '../node_modules/@fortawesome/fontawesome-free')
const FONTS_SOURCE = path.join(FA_PACKAGE_DIR, 'webfonts')
const CSS_SOURCE = path.join(FA_PACKAGE_DIR, 'css/all.min.css')
const FONTS_DEST = path.join(__dirname, '../public/assets/fonts/fontawesome/webfonts')
const CSS_DEST = path.join(__dirname, '../public/assets/fonts/fontawesome/all.css')

/**
 * Copy fonts to public directory
 */
function copyFonts() {
  if (!fs.existsSync(FONTS_SOURCE)) {
    console.error(`❌ Font Awesome webfonts directory not found: ${FONTS_SOURCE}`)
    return false
  }
  
  // Create destination directory
  if (!fs.existsSync(FONTS_DEST)) {
    fs.mkdirSync(FONTS_DEST, { recursive: true })
  }
  
  // Copy all font files
  const fontFiles = fs.readdirSync(FONTS_SOURCE)
  let copied = 0
  
  fontFiles.forEach(file => {
    const srcPath = path.join(FONTS_SOURCE, file)
    const destPath = path.join(FONTS_DEST, file)
    
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath)
      copied++
    }
  })
  
  console.log(`✅ Copied ${copied} font files to ${FONTS_DEST}`)
  return true
}

/**
 * Copy and modify CSS
 */
function setupCSS() {
  if (!fs.existsSync(CSS_SOURCE)) {
    console.error(`❌ Font Awesome CSS not found: ${CSS_SOURCE}`)
    return false
  }
  
  let css = fs.readFileSync(CSS_SOURCE, 'utf-8')
  
  // Replace font paths (from ../webfonts/ to relative path)
  // Also handle case where paths might already be absolute
  // Use relative path so it works regardless of base path
  // When CSS is at /portfolio/assets/fonts/fontawesome/all.css,
  // ./webfonts/ resolves to /portfolio/assets/fonts/fontawesome/webfonts/
  css = css.replace(/url\(\.\.\/webfonts\//g, 'url(./webfonts/')
  // Also replace any absolute paths that might exist
  css = css.replace(/url\(\/assets\/fonts\/fontawesome\/webfonts\//g, 'url(./webfonts/')
  
  // Replace font-display: block with font-display: swap
  css = css.replace(/font-display:block/g, 'font-display:swap')
  
  // Write modified CSS
  fs.writeFileSync(CSS_DEST, css, 'utf-8')
  
  const sizeKB = (fs.statSync(CSS_DEST).size / 1024).toFixed(2)
  console.log(`✅ Created modified CSS: ${CSS_DEST} (${sizeKB} KB)`)
  console.log(`   - Font paths updated to relative ./webfonts/`)
  console.log(`   - font-display: swap applied`)
  
  return true
}

/**
 * Main function
 */
function main() {
  console.log('🎨 Setting up Font Awesome self-hosting...\n')
  
  // Check if package exists
  if (!fs.existsSync(FA_PACKAGE_DIR)) {
    console.error(`❌ Font Awesome package not found. Please run:`)
    console.error(`   npm install @fortawesome/fontawesome-free@6.4.0 --save-dev`)
    process.exit(1)
  }
  
  const fontsOk = copyFonts()
  const cssOk = setupCSS()
  
  if (fontsOk && cssOk) {
    console.log(`\n✅ Font Awesome setup complete!`)
    console.log(`\n💡 Next steps:`)
    console.log(`   1. Update index.html to use local CSS instead of CDN`)
    console.log(`   2. Replace CDN link with: /assets/fonts/fontawesome/all.css`)
    console.log(`   3. Font Awesome icons will now use font-display: swap`)
  } else {
    console.error(`\n❌ Setup incomplete. Please check errors above.`)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = { copyFonts, setupCSS, main }
