const fs = require('fs')
const path = require('path')

// Determine base path from environment or by detecting from built index.html
// Check if we're building for Firebase (base: '/') or GitHub Pages (base: '/portfolio/')
// Priority: 1. Explicit env var, 2. Detect from index.html, 3. Default to GitHub Pages
const explicitBase = process.env.SW_BASE_PATH || process.env.npm_config_sw_base_path
const distPath = path.resolve(__dirname, '../dist')
const indexHtmlPath = path.resolve(distPath, 'index.html')

let basePath = '/portfolio/' // Default to GitHub Pages

if (explicitBase) {
  basePath = explicitBase
} else if (fs.existsSync(indexHtmlPath)) {
  // Try to detect base path from index.html
  try {
    const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8')
    // Check for Firebase base path indicators (root paths like href="/assets/")
    // vs GitHub Pages (href="/portfolio/assets/")
    if (indexHtml.includes('href="/assets/') && !indexHtml.includes('href="/portfolio/assets/')) {
      basePath = '/' // Firebase uses root
    } else if (indexHtml.includes('href="/portfolio/assets/')) {
      basePath = '/portfolio/' // GitHub Pages
    }
  } catch (err) {
    console.warn('Could not read index.html to detect base path, using default:', err.message)
  }
}

// Service worker content with dynamic base path
const swContent = `const CACHE_VERSION = 'portfolio-static-v4'
const BASE_PATH = '${basePath}'
const CORE_ASSETS = [
  BASE_PATH,
  BASE_PATH + 'index.html'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Network-first for HTML and CSS (ensures fresh content on Firebase)
  // This is CRITICAL - cache-first was serving stale CSS causing layout issues
  const isHTML = request.headers.get('accept')?.includes('text/html')
  const isCSS = url.pathname.endsWith('.css')
  
  if (isHTML || isCSS) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses for offline use
          if (response && response.ok) {
            caches.open(CACHE_VERSION).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request)
        })
    )
  } else {
    // Cache-first for other assets (images, JS, fonts, etc.)
    event.respondWith(
      caches.open(CACHE_VERSION).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached
          return fetch(request).then((response) => {
            if (response && response.ok) {
              cache.put(request, response.clone())
            }
            return response
          })
        })
      )
    )
  }
})
`

// Write service worker to dist folder
const swPath = path.resolve(distPath, 'sw.js')

// Ensure dist directory exists
if (!fs.existsSync(distPath)) {
  console.error('dist/ directory not found - build may have failed')
  process.exit(1)
}

try {
  fs.writeFileSync(swPath, swContent, 'utf-8')
  console.log(`✓ Generated sw.js with base path: ${basePath}`)
} catch (err) {
  console.error('Failed to generate sw.js:', err)
  process.exit(1)
}
