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

// Read the source sw.js to get the version and use its structure
const sourceSwPath = path.resolve(__dirname, '../public/sw.js')
let serviceWorkerVersion = 'unknown'
let swTemplate = ''

if (fs.existsSync(sourceSwPath)) {
  const sourceSwContent = fs.readFileSync(sourceSwPath, 'utf-8')
  // Extract version from source file
  const versionMatch = sourceSwContent.match(/const SERVICE_WORKER_VERSION = ['"](.*?)['"]/)
  if (versionMatch) {
    serviceWorkerVersion = versionMatch[1]
  }
  
  // Use the source sw.js as template, but replace CORE_ASSETS with dynamic base path
  // Only replace the CORE_ASSETS array, keep everything else intact
  swTemplate = sourceSwContent.replace(
    /const CORE_ASSETS = \[[\s\S]*?\]/,
    `const BASE_PATH = '${basePath}'\nconst CORE_ASSETS = [\n  BASE_PATH,\n  BASE_PATH + 'index.html'\n]`
  )
} else {
  // Fallback if source sw.js doesn't exist
  serviceWorkerVersion = Date.now().toString(36)
  swTemplate = `const SERVICE_WORKER_VERSION = '${serviceWorkerVersion}'
const CACHE_VERSION = \`portfolio-static-\${SERVICE_WORKER_VERSION}\`
const BASE_PATH = '${basePath}'
const CORE_ASSETS = [
  BASE_PATH,
  BASE_PATH + 'index.html'
]

self.serviceWorkerVersion = SERVICE_WORKER_VERSION

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))
      ),
      self.clients.claim(),
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
        clients.forEach((client) => {
          try {
            client.postMessage({
              type: 'SW_UPDATED',
              version: SERVICE_WORKER_VERSION
            })
          } catch (err) {
            // Ignore errors if client is not ready or postMessage fails
            // postMessage doesn't return a Promise, so we use try-catch instead
          }
        })
      }).catch(() => {
        // Ignore errors if matchAll fails
      })
    ])
  )
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({
      type: 'SW_VERSION',
      version: SERVICE_WORKER_VERSION
    })
    event.source?.postMessage({
      type: 'SW_VERSION',
      version: SERVICE_WORKER_VERSION
    })
  }
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  event.respondWith(
    (async () => {
      try {
        const cache = await caches.open(CACHE_VERSION)
        const cached = await cache.match(request)
        
        if (cached) {
          return cached
        }

        try {
          const response = await fetch(request)
          
          if (response && response.ok && response.status === 200) {
            const responseClone = response.clone()
            cache.put(request, responseClone).catch((err) => {
              console.warn('[SW] Cache put failed:', err)
            })
          }
          
          return response
        } catch (fetchErr) {
          console.warn('[SW] Fetch failed:', fetchErr)
          const cachedFallback = await cache.match(request)
          if (cachedFallback) {
            return cachedFallback
          }
          return new Response('Network error', { status: 408, statusText: 'Request Timeout' })
        }
      } catch (cacheErr) {
        console.warn('[SW] Cache operation failed:', cacheErr)
        try {
          return await fetch(request)
        } catch (fetchErr) {
          return new Response('Service unavailable', { status: 503, statusText: 'Service Unavailable' })
        }
      }
    })()
  )
})`
}

const swContent = swTemplate

// Write service worker to dist folder
const swPath = path.resolve(distPath, 'sw.js')

// Ensure dist directory exists
if (!fs.existsSync(distPath)) {
  console.error('dist/ directory not found - build may have failed')
  process.exit(1)
}

try {
  fs.writeFileSync(swPath, swContent, 'utf-8')
  console.log(`[OK] Generated sw.js with base path: ${basePath}`)
} catch (err) {
  console.error('[ERROR] Failed to generate sw.js:', err)
  process.exit(1)
}
