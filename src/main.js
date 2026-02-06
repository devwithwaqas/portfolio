import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { assetPath } from './utils/assetPath.js'
import { trackPageView } from './utils/analytics.js'
import { handleError } from './utils/errorHandler.js'
import { initNotifications } from './utils/notifications.js'
import { initInstallPrompt } from './utils/installPrompt.js'
import { initClarity } from './utils/clarity.js'
import { logError, shouldPreventReload, recordReloadAttempt, getErrorLog } from './utils/errorTracker.js'

// Log each app boot + pagehide to dev server (survives reloads)
// Also detect reload loops and stop them
if (typeof window !== 'undefined' && import.meta.env?.DEV) {
  const BOOT_COUNT_KEY = 'portfolio_boot_count'
  const BOOT_TIMEOUT = 5000 // 5 seconds
  const MAX_BOOTS = 5
  
  try {
    const bootData = JSON.parse(sessionStorage.getItem(BOOT_COUNT_KEY) || '{}')
    const now = Date.now()
    const lastBoot = bootData.lastBoot || 0
    const bootCount = bootData.count || 0
    
    // If we've booted too many times recently, STOP EVERYTHING
    if (bootCount >= MAX_BOOTS && (now - lastBoot) < BOOT_TIMEOUT) {
      console.error('🚨 RELOAD LOOP DETECTED! Stopping app to prevent infinite reloads.')
      console.error(`Boot count: ${bootCount} in ${((now - lastBoot) / 1000).toFixed(1)}s`)
      console.error('Check dev-error-log.txt for error details')
      
      // Show error overlay
      document.body.innerHTML = `
        <div style="padding: 40px; text-align: center; font-family: system-ui; max-width: 800px; margin: 100px auto;">
          <h1 style="color: #ef4444;">⚠️ Reload Loop Detected</h1>
          <p>The page has reloaded ${bootCount} times in ${((now - lastBoot) / 1000).toFixed(1)} seconds.</p>
          <p style="margin-top: 20px;">Check <code>dev-error-log.txt</code> in the project root for error details.</p>
          <p style="margin-top: 10px; color: #666;">Open DevTools → Console to see error logs.</p>
          <button onclick="sessionStorage.clear(); location.reload();" style="margin-top: 30px; padding: 10px 20px; font-size: 16px; cursor: pointer;">
            Clear Storage & Reload
          </button>
        </div>
      `
      // Prevent any further execution
      throw new Error('Reload loop detected - app stopped')
    }
    
    // Update boot count
    sessionStorage.setItem(BOOT_COUNT_KEY, JSON.stringify({
      count: bootCount + 1,
      lastBoot: now
    }))
    
    // Clear boot count after timeout
    setTimeout(() => {
      try {
        sessionStorage.removeItem(BOOT_COUNT_KEY)
      } catch {}
    }, BOOT_TIMEOUT)
  } catch (e) {
    // If we're in a reload loop, the error above will stop execution
    console.error('[Boot Loop Detector]', e)
  }
  
  const devLog = (context, message) => {
    try {
      const payload = JSON.stringify({
        context,
        message,
        stack: '',
        url: window.location.href,
        timestamp: new Date().toISOString()
      })
      navigator.sendBeacon(`${window.location.origin}/__dev-log-error`, new Blob([payload], { type: 'application/json' }))
    } catch (_) {}
  }
  devLog('boot', 'App boot')
  window.addEventListener('pagehide', () => devLog('pagehide', 'Page unloading (reload or close)'))
  window.addEventListener('beforeunload', () => devLog('beforeunload', 'Page about to unload'))
}

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
  // Always log errors persistently
  logError(err, `Vue.${info || 'unknown'}`)
  
  // In DEV mode, prevent errors from causing reload loops
  if (import.meta.env.DEV) {
    console.warn(`[Vue Error Handler] ${info || ''}:`, err)
    // Don't let errors propagate in DEV to prevent reload loops
    return
  }
  handleError(err, `Vue ${info || ''}`)
}

// Unhandled promise rejections: generic message in prod, prevent default logging
window.addEventListener('unhandledrejection', (event) => {
  // Always log errors persistently
  logError(event.reason, 'unhandledrejection')
  
  // In DEV mode, log but prevent default to avoid reload loops
  if (import.meta.env.DEV) {
    console.warn('[Unhandled Rejection]:', event.reason)
    event.preventDefault()
    return
  }
  handleError(event.reason, 'unhandledrejection')
  event.preventDefault()
})

// Uncaught errors: generic message in prod, prevent browser default logging
window.addEventListener('error', (event) => {
  // Always log errors persistently
  logError(event.error || event.message, 'uncaught')
  
  // In DEV mode, log but prevent default to avoid reload loops
  if (import.meta.env.DEV) {
    console.warn('[Uncaught Error]:', event.error || event.message)
    event.preventDefault()
    return
  }
  handleError(event.error || event.message, 'error')
  event.preventDefault()
})

// Prevent reloads by intercepting at the source
// Since window.location.reload is read-only, we'll prevent reloads in other ways
// The circuit breaker will be checked in router and service worker code

// Expose error tracker to window for debugging
if (typeof window !== 'undefined') {
  window.__portfolioErrorTracker = {
    getLog: getErrorLog,
    clearLog: () => {
      try {
        localStorage.removeItem('portfolio_error_log')
        localStorage.removeItem('portfolio_reload_count')
        console.log('[Error Tracker] Log cleared')
      } catch {}
    },
    shouldPreventReload,
    recordReloadAttempt
  }
  
  // Show error log on page load if there are recent errors; auto-clear old log after stable load
  if (import.meta.env.DEV) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const errors = getErrorLog()
        if (errors.length > 0) {
          const now = Date.now()
          const RECENT_THRESHOLD = 2 * 60 * 1000 // 2 minutes
          const recentErrors = errors.filter(err => {
            const errorTime = new Date(err.timestamp).getTime()
            return (now - errorTime) < RECENT_THRESHOLD
          })
          if (recentErrors.length > 0) {
            console.group('%c[Error Tracker] Recent Errors Detected', 'color: #ef4444; font-weight: bold; font-size: 14px;')
            console.log(`Found ${recentErrors.length} recent error(s) (${errors.length} total in localStorage)`)
            console.log('Run: window.__portfolioErrorTracker.getLog() to see all errors')
            console.log('Run: window.__portfolioErrorTracker.clearLog() to clear all errors')
            console.table(recentErrors.slice(-10))
            console.groupEnd()
          } else {
            // Only old errors: clear log so next load is clean
            try {
              localStorage.removeItem('portfolio_error_log')
            } catch {}
          }
        }
      }, 1000)
    })
  }
}

app.use(router)
app.mount('#app')

// Initialize PWA install prompt handler
// Only in production - install prompt disabled in dev mode
if (import.meta.env.PROD) {
  initInstallPrompt()
}

// Microsoft Clarity – heatmaps, session recordings (Bing Webmaster integration)
if (import.meta.env.PROD) {
  initClarity()
}

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
    } catch (_err) {
      /* analytics optional */
    }
  }, delay)
}).catch(() => {
  /* router optional */
})

// Service Worker Management with Automatic Version Checking
// Expected service worker version - AUTO-GENERATED ON BUILD (from git commit hash)
// Version is automatically updated by scripts/generate-sw-version.js during build
// MUST MATCH the version in public/sw.js
const EXPECTED_SW_VERSION = '1234'

if ('serviceWorker' in navigator) {
  // CRITICAL: In dev mode, unregister ALL service workers immediately (not on load)
  // to prevent reload loops from any SW controlling the page
  if (import.meta.env.DEV) {
    ;(async () => {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations()
        for (const r of registrations) {
          await r.unregister()
        }
        if ('caches' in window) {
          const names = await caches.keys()
          await Promise.all(names.map((n) => caches.delete(n)))
        }
      } catch (e) {
        logError(e, 'serviceWorker.unregister')
      }
    })()
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
            
            const unregistered = await registration.unregister()
            if (unregistered) { /* old SW removed */ }
          } catch (err) {
            try {
              await registration.unregister()
            } catch (_unregErr) {}
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
                    // Check circuit breaker before reloading
                    if (shouldPreventReload()) {
                      console.error('[Service Worker] Reload blocked by circuit breaker')
                      logError(new Error('Service worker reload blocked by circuit breaker'), 'serviceWorker.reload')
                      return
                    }
                    
                    recordReloadAttempt()
                    sessionStorage.setItem(SW_RELOAD_KEY, '1')
                    sessionStorage.setItem('sw_last_reload_time', now.toString())
                    setTimeout(() => sessionStorage.removeItem(SW_RELOAD_KEY), 1000)
                    window.location.reload()
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
              /* reload handled by updatefound */
            }
          })
        }
      } catch (_err) {
        /* caching optional */
      }
    })
  } else {
    // In dev mode: IMMEDIATELY unregister any existing service workers to prevent interference
    // Don't wait for 'load' - do it immediately to prevent caching issues
    ;(async () => {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations()
        for (const registration of registrations) {
          await registration.unregister()
        }
        if ('caches' in window) {
          const cacheNames = await caches.keys()
          await Promise.all(cacheNames.map(name => caches.delete(name)))
        }
      } catch (_err) {}
    })()
  }
}
