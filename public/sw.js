// Service Worker Version - AUTO-GENERATED ON BUILD (from git commit hash)
// This ensures old service workers are automatically unregistered
// Version is automatically updated by scripts/generate-sw-version.js during build
const SERVICE_WORKER_VERSION = '7ad4d40'
const CACHE_VERSION = `portfolio-static-${SERVICE_WORKER_VERSION}`
// Do NOT cache index.html or / — otherwise after deploy users get stale HTML
// and request old chunk URLs (CSS/JS) that no longer exist → 404 → index.html → MIME type errors.
const CORE_ASSETS = []

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
  
  // Handle notification permission requests
  if (event.data && event.data.type === 'REQUEST_NOTIFICATION_PERMISSION') {
    // Forward to client - service worker can't request permission directly
    event.source?.postMessage({
      type: 'NOTIFICATION_PERMISSION_REQUESTED'
    })
  }
  
  // Handle show notification requests from client
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, options } = event.data
    self.registration.showNotification(title, options).catch(err => {
      console.error('[SW] Error showing notification:', err)
    })
  }
})

// Handle push events (for push notifications from server)
self.addEventListener('push', (event) => {
  console.log('[SW] Push event received:', event)
  
  let notificationData = {
    title: 'Waqas Ahmad',
    body: 'You have a new update!',
    icon: '/assets/img/favicon-192.png',
    badge: '/assets/img/favicon.png',
    tag: 'portfolio-update',
    requireInteraction: false,
    data: {
      url: '/'
    }
  }
  
  // Parse push data if available
  if (event.data) {
    try {
      const data = event.data.json()
      notificationData = {
        ...notificationData,
        ...data
      }
    } catch (e) {
      // If not JSON, use as text
      notificationData.body = event.data.text() || notificationData.body
    }
  }
  
  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon || '/assets/img/favicon-192.png',
      badge: notificationData.badge || '/assets/img/favicon.png',
      tag: notificationData.tag || 'portfolio-notification',
      requireInteraction: notificationData.requireInteraction || false,
      data: notificationData.data || { url: '/' },
      vibrate: [200, 100, 200],
      timestamp: Date.now()
    })
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event)
  
  event.notification.close()
  
  const urlToOpen = event.notification.data?.url || '/'
  
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {
      // Check if there's already a window open
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i]
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus()
        }
      }
      
      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen)
      }
    })
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  const isDocument = request.mode === 'navigate' || request.destination === 'document'
  const pathname = url.pathname
  // Manifest and PWA icons: network-first so we never serve cached 404/HTML (avoids "icon isn't a valid image").
  const isManifestOrIcon = pathname === '/site.webmanifest' ||
    /^\/assets\/img\/(favicon|apple-touch-icon)/.test(pathname) ||
    /^\/favicon(-?\d*x\d*)?\.(png|ico)$/.test(pathname)

  event.respondWith(
    (async () => {
      try {
        const cache = await caches.open(CACHE_VERSION)

        if (isDocument) {
          // Network-first for HTML: never cache so deploy always serves fresh index.html
          // and correct chunk URLs (avoids "MIME type text/html" for CSS when old chunks 404).
          try {
            const response = await fetch(request)
            return response
          } catch (fetchErr) {
            const fallback = await cache.match(request)
            if (fallback) return fallback
            return new Response('Network error', { status: 408, statusText: 'Request Timeout' })
          }
        }

        if (isManifestOrIcon) {
          try {
            const response = await fetch(request)
            return response
          } catch (fetchErr) {
            const fallback = await cache.match(request)
            if (fallback) return fallback
            return new Response('Network error', { status: 408, statusText: 'Request Timeout' })
          }
        }

        const cached = await cache.match(request)
        if (cached) return cached

        try {
          const response = await fetch(request)
          if (response && response.ok && response.status === 200) {
            const clone = response.clone()
            cache.put(request, clone).catch(function () {})
          }
          return response
        } catch (fetchErr) {
          const fallback = await cache.match(request)
          if (fallback) return fallback
          return new Response('Network error', { status: 408, statusText: 'Request Timeout' })
        }
      } catch (cacheErr) {
        try {
          return await fetch(request)
        } catch (fetchErr) {
          return new Response('Service unavailable', { status: 503, statusText: 'Service Unavailable' })
        }
      }
    })()
  )
})
