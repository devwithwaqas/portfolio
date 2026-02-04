/**
 * Copy llms.txt to dist directory
 * llms.txt already contains Firebase URLs (GitHub Pages redirects to Firebase)
 * llms.txt helps AI search engines (Google SGE, Perplexity, Bing Chat) understand your content
 */

const fs = require('fs')
const path = require('path')

const srcLlms = path.resolve(__dirname, '../public/llms.txt')
const destLlms = path.resolve(__dirname, '../dist/llms.txt')
const distDir = path.resolve(__dirname, '../dist')

if (fs.existsSync(srcLlms)) {
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true })
    console.log('[OK] Created dist directory')
  }
  
  try {
    fs.copyFileSync(srcLlms, destLlms)
    console.log('[OK] Copied llms.txt to dist/')
    console.log('    This helps AI search engines (Google SGE, Perplexity, Bing Chat) understand your content')
  } catch (err) {
    console.error('Failed to copy llms.txt:', err)
    process.exit(1)
  }
} else {
  console.warn('[WARN] llms.txt not found in public/')
}
