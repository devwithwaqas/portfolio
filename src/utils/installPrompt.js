/**
 * PWA Install Prompt Handler
 * Handles the beforeinstallprompt event to show custom install button
 */

let deferredPrompt = null

/**
 * Initialize install prompt handler
 * Listens for beforeinstallprompt event and stores it for later use
 */
export function initInstallPrompt() {
  // Only in production (not in dev mode where service workers are disabled)
  if (import.meta.env.DEV) {
    return
  }
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default mini-infobar from appearing
    e.preventDefault()
    
    // Store the event so it can be triggered later
    deferredPrompt = e
    
    console.log('[Install Prompt] beforeinstallprompt event captured')
    
    // Dispatch custom event so components can listen and show install button
    window.dispatchEvent(new CustomEvent('installprompt-available', {
      detail: { prompt: e }
    }))
  })
  
  // Listen for app installed event
  window.addEventListener('appinstalled', () => {
    console.log('[Install Prompt] PWA was installed')
    deferredPrompt = null
    
    // Dispatch custom event
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
