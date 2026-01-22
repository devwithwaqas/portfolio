/**
 * Create _headers file in dist directory
 * This sets cache headers for static assets
 * Note: GitHub Pages doesn't support this, but it's useful for:
 * - Netlify deployments (automatically picks up _headers)
 * - Future platform migrations
 * - Documentation purposes
 */

const fs = require('fs')
const path = require('path')

const DIST_DIR = path.resolve(__dirname, '../dist')

function createHeaders() {
  // Ensure dist directory exists
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true })
    console.log('✓ Created dist directory')
  }
  
  // Cache headers configuration
  // Long cache for hashed assets (1 year) - safe because hash changes when content changes
  // Medium cache for images/icons (6 months)
  // Short cache for HTML (10 minutes)
  const headersContent = `# Cache Headers for Static Assets
# Note: GitHub Pages doesn't support custom headers, but this is useful for Netlify/other platforms

# Long cache for hashed assets (JS/CSS with content hash in filename)
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Images and icons (6 months cache)
/assets/img/*
  Cache-Control: public, max-age=15552000

/assets/vendor/**/*
  Cache-Control: public, max-age=31536000, immutable

# Fonts (1 year cache)
/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable

# HTML files (short cache, always revalidate)
/*.html
  Cache-Control: public, max-age=600, must-revalidate

# XML files (sitemap, robots.txt equivalent)
/*.xml
  Cache-Control: public, max-age=86400

# JSON/manifest files (1 hour cache)
/*.json
  Cache-Control: public, max-age=3600

# Favicon and manifest
/favicon.ico
  Cache-Control: public, max-age=604800

/site.webmanifest
  Cache-Control: public, max-age=86400
`
  
  const headersPath = path.join(DIST_DIR, '_headers')
  fs.writeFileSync(headersPath, headersContent, 'utf8')
  console.log('✓ Created _headers file at:', headersPath)
  console.log('  Note: GitHub Pages ignores this file, but it works with Netlify/Vercel')
}

// Run if called directly
if (require.main === module) {
  createHeaders()
}

module.exports = { createHeaders }
