// Service Worker Version - AUTO-GENERATED ON BUILD (from git commit hash)
// This ensures old service workers are automatically unregistered
// Version is automatically updated by scripts/generate-sw-version.js during build
const SERVICE_WORKER_VERSION = '079376f'
const CACHE_VERSION = `portfolio-static-${SERVICE_WORKER_VERSION}`
const CORE_ASSETS = [
  '/portfolio/',
  '/portfolio/index.html'
]

// Store version in service worker scope for client-side checks
self.serviceWorkerVersion = SERVICE_WORKER_VERSION

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => {
        // Force activation of new service worker immediately
        return self.skipWaiting()
      })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Delete all old caches
      caches.keys().then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))
      ),
      // Claim all clients immediately (no waiting for reload)
      self.clients.claim(),
      // Notify all clients about the new version
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

// Listen for version check messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({
      type: 'SW_VERSION',
      version: SERVICE_WORKER_VERSION
    })
    // Also respond via event.source for broader compatibility
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
          
          // Only cache successful responses
          if (response && response.ok && response.status === 200) {
            // Clone response before caching (response can only be consumed once)
            const responseClone = response.clone()
            // Cache in background - don't block response
            cache.put(request, responseClone).catch((err) => {
              // Silently fail cache operations to avoid breaking the page
              console.warn('[SW] Cache put failed:', err)
            })
          }
          
          return response
        } catch (fetchErr) {
          // If fetch fails, return cached version if available
          console.warn('[SW] Fetch failed:', fetchErr)
          const cachedFallback = await cache.match(request)
          if (cachedFallback) {
            return cachedFallback
          }
          return new Response('Network error', { status: 408, statusText: 'Request Timeout' })
        }
      } catch (cacheErr) {
        // If cache operations fail, try to fetch directly
        console.warn('[SW] Cache operation failed:', cacheErr)
        try {
          return await fetch(request)
        } catch (fetchErr) {
          return new Response('Service unavailable', { status: 503, statusText: 'Service Unavailable' })
        }
      }
    })()
  )
})
