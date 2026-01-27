/**
 * PWA Install Prompt Handler
 * Handles the beforeinstallprompt event to show custom install button
 */

let deferredPrompt = null

/**
 * Check installability criteria and log diagnostics
 */
async function checkInstallability() {
  const checks = {
    isHTTPS: window.location.protocol === 'https:' || window.location.hostname === 'localhost',
    hasServiceWorker: 'serviceWorker' in navigator,
    hasManifest: document.querySelector('link[rel="manifest"]') !== null,
    isStandalone: window.matchMedia('(display-mode: standalone)').matches,
    isIOSStandalone: window.navigator.standalone === true,
    isIncognito: false
  }
  
  // Detect incognito mode (not 100% reliable - IndexedDB method can give false positives)
  // Only log if we're confident it's incognito
  try {
    const isIncognito = await new Promise((resolve) => {
      const db = indexedDB.open('test')
      db.onerror = () => resolve(true) // IndexedDB blocked in incognito
      db.onsuccess = () => {
        indexedDB.deleteDatabase('test')
        resolve(false)
      }
      // Timeout after 100ms - if IndexedDB is slow, it's probably not incognito
      setTimeout(() => resolve(false), 100)
    })
    // Only mark as incognito if we're confident (IndexedDB method can be unreliable)
    // Don't show warning unless we're very sure
    checks.isIncognito = isIncognito
    // Note: This detection is not 100% reliable, so we don't show warnings
    // as it can give false positives
  } catch (e) {
    // Ignore detection errors - assume not incognito
    checks.isIncognito = false
  }
  
  let swRegistered = false
  let swActive = false
  if (checks.hasServiceWorker) {
    try {
      const reg = await navigator.serviceWorker.getRegistration()
      swRegistered = reg !== null
      if (reg) {
        swActive = reg.active !== null
        if (!swActive && reg.installing) {
          return new Promise((resolve) => {
            const checkActive = setInterval(() => {
              reg.update().then(() => {
                if (reg.active) {
                  clearInterval(checkActive)
                  swActive = true
                  resolve(checks)
                }
              })
            }, 500)
            setTimeout(() => {
              clearInterval(checkActive)
              resolve(checks)
            }, 10000)
          })
        }
      }
    } catch (_err) {
      /* ignore */
    }
  }

  const manifestLink = document.querySelector('link[rel="manifest"]')
  if (manifestLink) {
    try {
      const res = await fetch(manifestLink.getAttribute('href'))
      const manifest = await res.json()
      const iconSizes = manifest.icons?.map(icon => icon.sizes) || []
      const hasRequiredIcons = iconSizes.some(size =>
        size && (size.includes('192') || size.includes('512'))
      )
      if (!hasRequiredIcons) {
        checks._missingIcons = true
      }
    } catch (_err) {
      /* ignore */
    }
  }

  return checks
}

/**
 * Initialize install prompt handler
 * Listens for beforeinstallprompt event and stores it for later use
 */
export function initInstallPrompt() {
  if (import.meta.env.DEV) return

  setTimeout(() => { checkInstallability() }, 2000)

  window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('installprompt-available', { detail: { prompt: e } }))
  })

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
    window.dispatchEvent(new CustomEvent('app-installed'))
  })
}

/**
 * Check if app is already installed
 * @returns {boolean}
 */
export function isAppInstalled() {
  // Check if running in standalone mode (installed)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true
  }
  
  // Check if navigator.standalone (iOS Safari)
  if (window.navigator.standalone === true) {
    return true
  }
  
  return false
}

/**
 * Check if install prompt is available
 * @returns {boolean}
 */
export function isInstallPromptAvailable() {
  return deferredPrompt !== null
}

/**
 * Show the install prompt
 * This will trigger Chrome's install dialog
 * @returns {Promise<boolean>} true if user accepted, false if dismissed
 */
export async function showInstallPrompt() {
  if (!deferredPrompt) return false
  try {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    deferredPrompt = null
    return outcome === 'accepted'
  } catch (_err) {
    deferredPrompt = null
    return false
  }
}

// Expose to window for console testing (dev/prod)
if (typeof window !== 'undefined') {
  window.showInstallPrompt = showInstallPrompt
  window.isInstallPromptAvailable = isInstallPromptAvailable
  window.isAppInstalled = isAppInstalled
  
  window.checkInstallPromptStatus = function() {
    console.log('Install prompt available:', isInstallPromptAvailable(), '| Installed:', isAppInstalled(), '| Deferred:', !!deferredPrompt)
  }
  window.showInstallPromptResetInstructions = function() {
    console.log(
      'Reset install prompt: 1) Uninstall app (chrome://apps). 2) DevTools > Application > Clear site data. 3) New session, wait 30s + interact.'
    )
  }
}
