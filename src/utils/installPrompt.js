/**
 * PWA Install Prompt Handler
 * Handles the beforeinstallprompt event to show custom install button
 */

let deferredPrompt = null

/**
 * Check installability criteria and log diagnostics
 */
function checkInstallability() {
  const checks = {
    isHTTPS: window.location.protocol === 'https:' || window.location.hostname === 'localhost',
    hasServiceWorker: 'serviceWorker' in navigator,
    hasManifest: document.querySelector('link[rel="manifest"]') !== null,
    isStandalone: window.matchMedia('(display-mode: standalone)').matches,
    isIOSStandalone: window.navigator.standalone === true
  }
  
  // Check if service worker is registered
  let swRegistered = false
  if (checks.hasServiceWorker) {
    navigator.serviceWorker.getRegistration().then(reg => {
      swRegistered = reg !== null
      console.log('[Install Prompt] Service Worker registered:', swRegistered)
      if (reg) {
        console.log('[Install Prompt] Service Worker scope:', reg.scope)
        console.log('[Install Prompt] Service Worker state:', reg.active?.state || 'no active worker')
      }
    }).catch(err => {
      console.warn('[Install Prompt] Error checking service worker:', err)
    })
  }
  
  // Check manifest
  const manifestLink = document.querySelector('link[rel="manifest"]')
  if (manifestLink) {
    const manifestUrl = manifestLink.getAttribute('href')
    console.log('[Install Prompt] Manifest link found:', manifestUrl)
    fetch(manifestUrl)
      .then(res => res.json())
      .then(manifest => {
        console.log('[Install Prompt] Manifest valid:', {
          name: manifest.name,
          short_name: manifest.short_name,
          display: manifest.display,
          icons: manifest.icons?.length || 0,
          start_url: manifest.start_url
        })
      })
      .catch(err => {
        console.warn('[Install Prompt] Error loading manifest:', err)
      })
  }
  
  console.log('[Install Prompt] Installability checks:', {
    ...checks,
    swRegistered: 'checking...'
  })
  
  if (checks.isStandalone || checks.isIOSStandalone) {
    console.log('[Install Prompt] App appears to be already installed (standalone mode)')
  }
  
  return checks
}

/**
 * Initialize install prompt handler
 * Listens for beforeinstallprompt event and stores it for later use
 */
export function initInstallPrompt() {
  // Only in production (not in dev mode where service workers are disabled)
  if (import.meta.env.DEV) {
    console.log('[Install Prompt] Disabled in dev mode')
    return
  }
  
  console.log('[Install Prompt] Initializing install prompt handler...')
  
  // Run installability checks after a short delay to ensure everything is loaded
  setTimeout(() => {
    checkInstallability()
  }, 1000)
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // Store the event so it can be triggered later
    deferredPrompt = e
    
    console.log('[Install Prompt] ✅ beforeinstallprompt event captured!')
    console.log('[Install Prompt] Platforms:', e.platforms)
    
    // preventDefault() prevents Chrome's automatic mini-infobar/banner
    // However, Chrome can still show install prompts via:
    // - Address bar install icon (desktop)
    // - Browser menu (3-dot menu > Install app)
    // - Other browser mechanisms
    // So the prompt CAN still appear even with preventDefault()
    e.preventDefault()
    
    // Dispatch custom event so components can listen and show install button
    window.dispatchEvent(new CustomEvent('installprompt-available', {
      detail: { prompt: e }
    }))
    
    console.log('[Install Prompt] Event stored. Install prompt may appear via address bar icon or menu.')
    console.log('[Install Prompt] To manually trigger: call showInstallPrompt() from console')
  })
  
  // Listen for app installed event
  window.addEventListener('appinstalled', () => {
    console.log('[Install Prompt] ✅ PWA was installed')
    deferredPrompt = null
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('app-installed'))
  })
  
  // Log if event doesn't fire after 5 seconds
  setTimeout(() => {
    if (!deferredPrompt) {
      console.warn('[Install Prompt] ⚠️ beforeinstallprompt event did NOT fire after 5 seconds')
      console.warn('[Install Prompt] Possible reasons:')
      console.warn('  - App already installed or previously dismissed')
      console.warn('  - Installability criteria not fully met')
      console.warn('  - Chrome heuristics preventing prompt (need more user engagement)')
      console.warn('  - Check installability diagnostics above')
    }
  }, 5000)
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
  if (!deferredPrompt) {
    console.warn('[Install Prompt] No install prompt available')
    return false
  }
  
  try {
    // Show the install prompt
    deferredPrompt.prompt()
    
    // Wait for user response
    const { outcome } = await deferredPrompt.userChoice
    
    console.log('[Install Prompt] User choice:', outcome)
    
    // Clear the deferred prompt
    deferredPrompt = null
    
    return outcome === 'accepted'
  } catch (error) {
    console.error('[Install Prompt] Error showing prompt:', error)
    deferredPrompt = null
    return false
  }
}
