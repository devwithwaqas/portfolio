import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { assetPath } from './utils/assetPath.js'
import { trackPageView } from './utils/analytics.js'

// Import CSS
import './assets/css/font-sizes.css'
import './assets/css/main.css'

// PERF: Load fonts early and apply gradient when ready
if ('fonts' in document) {
  document.fonts.ready.then(() => {
    document.documentElement.classList.add('fonts-loaded')
  }).catch(() => {
    // Silently fail - fonts are optional
  })
}

const app = createApp(App)

// Add global asset path helper for use in templates
app.config.globalProperties.$assetPath = assetPath

// Global error handler for unhandled promise rejections (prevents console errors)
window.addEventListener('unhandledrejection', (event) => {
  // Only log in development, silently fail in production
  if (import.meta.env.DEV) {
    console.warn('[Unhandled Promise Rejection]', event.reason)
  }
  // Prevent default error logging to console
  event.preventDefault()
})

// Global error handler for uncaught errors (prevents console errors)
window.addEventListener('error', (event) => {
  // Only log in development, silently fail in production
  if (import.meta.env.DEV) {
    console.warn('[Uncaught Error]', event.error)
  }
  // Don't prevent default - let Vue handle it
})

app.use(router)
app.mount('#app')

// Track initial page view after app mounts (ensures GA4 is loaded)
// MOBILE OPTIMIZATION: Defer analytics on mobile to prioritize content loading
router.isReady().then(() => {
  const isMobile = window.innerWidth <= 768
  const delay = isMobile ? 3000 : 500 // 3s on mobile, 500ms on desktop
  
  setTimeout(() => {
    try {
      trackPageView(window.location.pathname + window.location.search, document.title)
    } catch (error) {
      // Silently fail - analytics are optional
      if (import.meta.env.DEV) {
        console.warn('[Analytics] Failed to track page view:', error.message)
      }
    }
  }, delay)
}).catch((error) => {
  // Silently fail if router isn't ready - analytics are optional
  if (import.meta.env.DEV) {
    console.warn('[Router] Router not ready:', error.message)
  }
})

// Service Worker Management with Automatic Version Checking
// Expected service worker version - AUTO-GENERATED ON BUILD (from git commit hash)
// Version is automatically updated by scripts/generate-sw-version.js during build
// MUST MATCH the version in public/sw.js
const EXPECTED_SW_VERSION = '9ad2eb7'

if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    // Register service worker ONLY in production (not in dev mode)
    // In dev mode, service worker can interfere with HMR and cause connection issues
    window.addEventListener('load', async () => {
      try {
        // Use dynamic base URL: '/' for Firebase, '/portfolio/' for GitHub Pages
        const baseUrl = import.meta.env.BASE_URL || '/'
        const swPath = `${baseUrl}sw.js`
        
        // Check for existing registrations and unregister old versions
        const registrations = await navigator.serviceWorker.getRegistrations()
        let hasMatchingVersion = false
        
        for (const registration of registrations) {
          // Try to get the version from the service worker
          // If we can't determine the version or it doesn't match, unregister
          try {
            // Check if service worker is active and has version info
            if (registration.active) {
              // Service worker version is stored in self.serviceWorkerVersion
              // We can't directly access it, so we'll check by attempting to get a message
              // If the SW responds with version, we'll keep it; otherwise unregister
              const versionCheck = new Promise((resolve) => {
                const timeout = setTimeout(() => resolve(null), 100)
                const messageHandler = (event) => {
                  if (event.data && event.data.type === 'SW_VERSION') {
                    clearTimeout(timeout)
                    navigator.serviceWorker.removeEventListener('message', messageHandler)
                    resolve(event.data.version)
                  }
                }
                navigator.serviceWorker.addEventListener('message', messageHandler)
                registration.active.postMessage({ type: 'GET_VERSION' })
              })
              
              const version = await versionCheck
              if (version === EXPECTED_SW_VERSION) {
                hasMatchingVersion = true
                continue
              }
            }
            
            // Unregister old service worker
            const unregistered = await registration.unregister()
            if (unregistered) {
              console.log('[SW] Unregistered old service worker:', registration.scope)
            }
          } catch (err) {
            // If we can't check version, unregister to be safe
            try {
              await registration.unregister()
              console.log('[SW] Unregistered service worker (version check failed):', registration.scope)
            } catch (unregErr) {
              // Ignore unregister errors
            }
          }
        }
        
        // Register new service worker if we don't have a matching one
        if (!hasMatchingVersion) {
          const registration = await navigator.serviceWorker.register(swPath)
          
          // Listen for service worker updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'activated') {
                  // New service worker activated - reload to use it
                  console.log('[SW] New service worker activated, reloading...')
                  window.location.reload()
                }
              })
            }
          })
          
          // Listen for messages from service worker
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'SW_UPDATED') {
              console.log('[SW] Service worker updated to version:', event.data.version)
              // Optionally reload to use new service worker immediately
              // window.location.reload()
            }
          })
        }
      } catch (error) {
        // Silent fail; caching is optional
        if (import.meta.env.DEV) {
          console.warn('[SW] Registration failed:', error)
        }
      }
    })
  } else {
    // In dev mode: IMMEDIATELY unregister any existing service workers to prevent interference
    // Don't wait for 'load' - do it immediately to prevent caching issues
    ;(async () => {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations()
        for (const registration of registrations) {
          const unregistered = await registration.unregister()
          if (unregistered) {
            console.log('[Dev] Unregistered service worker:', registration.scope)
          }
        }
        // Also clear all caches to prevent stale cached content
        if ('caches' in window) {
          const cacheNames = await caches.keys()
          await Promise.all(cacheNames.map(name => caches.delete(name)))
          if (cacheNames.length > 0) {
            console.log('[Dev] Cleared all caches:', cacheNames)
          }
        }
      } catch (error) {
        // Silent fail
      }
    })()
  }
}
