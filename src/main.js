import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { assetPath } from './utils/assetPath.js'
import { trackPageView } from './utils/analytics.js'
import { handleError } from './utils/errorHandler.js'
import { initNotifications } from './utils/notifications.js'

// Import CSS (font-sizes first so nav sizes apply; main second)
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

// Global error handler: prod = generic console message only, never real error on frontend
app.config.errorHandler = (err, instance, info) => {
  handleError(err, `Vue ${info || ''}`)
}

// Unhandled promise rejections: generic message in prod, prevent default logging
window.addEventListener('unhandledrejection', (event) => {
  handleError(event.reason, 'unhandledrejection')
  event.preventDefault()
})

// Uncaught errors: generic message in prod, prevent browser default logging
window.addEventListener('error', (event) => {
  handleError(event.error || event.message, 'error')
  event.preventDefault()
})

app.use(router)
app.mount('#app')

// Initialize notifications (request permission after user engagement)
// Only in production - notifications disabled in dev mode
if (import.meta.env.PROD) {
  // Initialize notifications after 30 seconds of user engagement
  initNotifications(30000)
}

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
const EXPECTED_SW_VERSION = '2b7d9d2'

if ('serviceWorker' in navigator) {
  // CRITICAL: In dev mode, unregister ALL service workers to prevent reload loops
  if (import.meta.env.DEV) {
    window.addEventListener('load', async () => {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations()
        for (const registration of registrations) {
          await registration.unregister()
          console.log('[SW] Unregistered service worker in dev mode:', registration.scope)
        }
      } catch (err) {
        console.warn('[SW] Error unregistering service workers in dev mode:', err)
      }
    })
  }
  
  if (import.meta.env.PROD) {
    // Register service worker ONLY in production (not in dev mode)
    // In dev mode, service worker can interfere with HMR and cause connection issues
    window.addEventListener('load', async () => {
      try {
        // Use dynamic base URL: '/' for Firebase
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
              // Service worker version is stored in self.serviceWorkerVersion.
              // We postMessage GET_VERSION and wait for SW_VERSION reply.
              // Use 800ms timeout: 100ms was too short (e.g. on hard refresh), so we
              // often unregistered + re-registered on every load.
              const versionCheck = new Promise((resolve) => {
                const timeout = setTimeout(() => {
                  navigator.serviceWorker.removeEventListener('message', messageHandler)
                  resolve(null)
                }, 800)
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
            
            // Unregister only when version mismatch or no active SW (e.g. new build deployed)
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
          
          // CRITICAL: Prevent infinite reload loops
          // Use sessionStorage to track if we've already reloaded for this SW update
          const SW_RELOAD_KEY = 'sw_reload_attempted'
          const SW_RELOAD_COOLDOWN = 5000 // 5 seconds cooldown
          const lastReloadTime = sessionStorage.getItem('sw_last_reload_time')
          const now = Date.now()
          
          // Only allow reload if we haven't reloaded recently (cooldown period)
          const canReload = !lastReloadTime || (now - parseInt(lastReloadTime)) > SW_RELOAD_COOLDOWN
          
          // Listen for service worker updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'activated') {
                  // Check if we've already attempted a reload for this update
                  const reloadAttempted = sessionStorage.getItem(SW_RELOAD_KEY)
                  
                  if (!reloadAttempted && canReload) {
                    // Mark that we're about to reload
                    sessionStorage.setItem(SW_RELOAD_KEY, '1')
                    sessionStorage.setItem('sw_last_reload_time', now.toString())
                    console.log('[SW] New service worker activated, reloading once...')
                    
                    // Clear the flag after a delay (in case reload doesn't happen)
                    setTimeout(() => {
                      sessionStorage.removeItem(SW_RELOAD_KEY)
                    }, 1000)
                    
                    // Reload only once
                    window.location.reload()
                  } else {
                    console.log('[SW] New service worker activated, but skipping reload (already reloaded or in cooldown)')
                  }
                }
              })
            }
          })
          
          // Listen for messages from service worker
          // NOTE: We don't reload on SW_UPDATED message to prevent loops
          // The updatefound event above handles reloads safely
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'SW_UPDATED') {
              console.log('[SW] Service worker updated to version:', event.data.version)
              // DO NOT reload here - let the updatefound event handle it safely
              // This prevents infinite reload loops
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
