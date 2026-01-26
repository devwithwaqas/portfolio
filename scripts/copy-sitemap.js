/**
 * Copy sitemap.xml from public/ to dist/ as backup
 * Vite should copy it automatically, but this ensures it's there
 */

const fs = require('fs')
const path = require('path')

const srcSitemap = path.resolve(__dirname, '../public/sitemap.xml')
const destSitemap = path.resolve(__dirname, '../dist/sitemap.xml')
const distDir = path.resolve(__dirname, '../dist')

if (fs.existsSync(srcSitemap)) {
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true })
    console.log('[OK] Created dist directory')
  }
  
  try {
    fs.copyFileSync(srcSitemap, destSitemap)
    console.log('[OK] Copied sitemap.xml from public/ to dist/')
  } catch (err) {
    console.error('[ERROR] Failed to copy sitemap.xml:', err)
    process.exit(1)
  }
} else {
  console.warn('[WARN] sitemap.xml not found in public/ - using generated one only')
}
