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
  
  // Detect incognito mode (not 100% reliable, but helpful for debugging)
  try {
    const isIncognito = await new Promise((resolve) => {
      const db = indexedDB.open('test')
      db.onerror = () => resolve(true) // IndexedDB blocked in incognito
      db.onsuccess = () => {
        indexedDB.deleteDatabase('test')
        resolve(false)
      }
    })
    checks.isIncognito = isIncognito
    if (isIncognito) {
      console.warn('[Install Prompt] ⚠️ Incognito mode detected - Chrome may be more restrictive with install prompts')
    }
  } catch (e) {
    // Ignore detection errors
  }
  
  // Check if service worker is registered and ACTIVE
  let swRegistered = false
  let swActive = false
  if (checks.hasServiceWorker) {
    try {
      const reg = await navigator.serviceWorker.getRegistration()
      swRegistered = reg !== null
      console.log('[Install Prompt] Service Worker registered:', swRegistered)
      if (reg) {
        console.log('[Install Prompt] Service Worker scope:', reg.scope)
        console.log('[Install Prompt] Service Worker installing:', reg.installing?.state || 'none')
        console.log('[Install Prompt] Service Worker waiting:', reg.waiting?.state || 'none')
        console.log('[Install Prompt] Service Worker active:', reg.active?.state || 'none')
        
        swActive = reg.active !== null
        if (!swActive && reg.installing) {
          console.log('[Install Prompt] ⚠️ Service Worker is installing, waiting for activation...')
          // Wait for service worker to activate
          return new Promise((resolve) => {
            const checkActive = setInterval(() => {
              reg.update().then(() => {
                if (reg.active) {
                  clearInterval(checkActive)
                  console.log('[Install Prompt] ✅ Service Worker is now active')
                  swActive = true
                  resolve(checks)
                }
              })
            }, 500)
            
            // Timeout after 10 seconds
            setTimeout(() => {
              clearInterval(checkActive)
              console.warn('[Install Prompt] ⚠️ Service Worker activation timeout')
              resolve(checks)
            }, 10000)
          })
        }
      }
    } catch (err) {
      console.warn('[Install Prompt] Error checking service worker:', err)
    }
  }
  
  // Check manifest
  const manifestLink = document.querySelector('link[rel="manifest"]')
  if (manifestLink) {
    const manifestUrl = manifestLink.getAttribute('href')
    console.log('[Install Prompt] Manifest link found:', manifestUrl)
    try {
      const res = await fetch(manifestUrl)
      const manifest = await res.json()
      console.log('[Install Prompt] Manifest valid:', {
        name: manifest.name,
        short_name: manifest.short_name,
        display: manifest.display,
        icons: manifest.icons?.length || 0,
        start_url: manifest.start_url
      })
      
      // Check icon sizes (Chrome requires at least 192x192 and 512x512)
      const iconSizes = manifest.icons?.map(icon => icon.sizes) || []
      const hasRequiredIcons = iconSizes.some(size => 
        size && (size.includes('192') || size.includes('512'))
      )
      if (!hasRequiredIcons) {
        console.warn('[Install Prompt] ⚠️ Manifest may be missing required icon sizes (192x192 or 512x512)')
      }
    } catch (err) {
      console.warn('[Install Prompt] Error loading manifest:', err)
    }
  }
  
  console.log('[Install Prompt] Installability checks:', {
    ...checks,
    swRegistered,
    swActive
  })
  
  if (checks.isStandalone || checks.isIOSStandalone) {
    console.log('[Install Prompt] App appears to be already installed (standalone mode)')
  }
  
  if (!swActive) {
    console.warn('[Install Prompt] ⚠️ Service Worker not active - this may prevent install prompt')
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
  
  // Run installability checks after service worker has time to activate
  // Wait longer to ensure service worker is fully active
  setTimeout(async () => {
    await checkInstallability()
  }, 2000)
  
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
  
  // Log if event doesn't fire after 10 seconds (longer for service worker activation)
  setTimeout(() => {
    if (!deferredPrompt) {
      console.warn('[Install Prompt] ⚠️ beforeinstallprompt event did NOT fire after 10 seconds')
      console.warn('[Install Prompt] Possible reasons:')
      console.warn('  - App already installed or previously dismissed (Chrome remembers)')
      console.warn('  - Incognito mode: Chrome is more restrictive in private browsing')
      console.warn('  - Service worker not fully activated yet')
      console.warn('  - Chrome heuristics: Need 30+ seconds of engagement + interactions')
      console.warn('  - Check installability diagnostics above')
      console.warn('[Install Prompt] Try:')
      console.warn('  - Wait 30+ seconds and interact with the page (scroll, click)')
      console.warn('  - Check address bar for install icon (desktop Chrome)')
      console.warn('  - Try browser menu: 3-dot menu > Install app')
      console.warn('  - Test in regular (non-incognito) window')
      console.warn('[Install Prompt] To reset and see prompt again:')
      console.warn('  - Run: showInstallPromptResetInstructions() in console')
      console.warn('  - Or: Uninstall app + Clear site data')
    }
  }, 10000)
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
    console.warn('[Install Prompt] This means beforeinstallprompt event has not fired yet')
    console.warn('[Install Prompt] Possible reasons:')
    console.warn('  - Chrome hasn\'t determined the app is installable')
    console.warn('  - App was already installed or dismissed')
    console.warn('  - Incognito mode restrictions')
    console.warn('  - Need more user engagement (30+ seconds + interactions)')
    return false
  }
  
  try {
    console.log('[Install Prompt] Showing install prompt...')
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

// Expose to window for console testing (dev/prod)
if (typeof window !== 'undefined') {
  window.showInstallPrompt = showInstallPrompt
  window.isInstallPromptAvailable = isInstallPromptAvailable
  window.isAppInstalled = isAppInstalled
  
  // Helper function to check install prompt status
  window.checkInstallPromptStatus = function() {
    console.log('=== Install Prompt Status ===')
    console.log('Available:', isInstallPromptAvailable())
    console.log('Already Installed:', isAppInstalled())
    console.log('Deferred Prompt:', deferredPrompt ? 'YES' : 'NO')
    if (deferredPrompt) {
      console.log('Platforms:', deferredPrompt.platforms)
    }
    console.log('===========================')
  }
  
  // Helper function to show instructions for resetting install prompt
  window.showInstallPromptResetInstructions = function() {
    console.log('=== How to Reset Install Prompt ===')
    console.log('')
    console.log('Chrome remembers if you installed or dismissed the app.')
    console.log('To see the prompt again, you need to:')
    console.log('')
    console.log('1. UNINSTALL THE APP (if installed):')
    console.log('   Desktop Chrome:')
    console.log('     - Go to chrome://apps/')
    console.log('     - Right-click the app > Uninstall')
    console.log('   OR')
    console.log('     - Settings > Apps > Installed apps > Find your app > Uninstall')
    console.log('')
    console.log('   Mobile Chrome (Android):')
    console.log('     - Long-press app icon > Uninstall')
    console.log('     - OR Settings > Apps > Find app > Uninstall')
    console.log('')
    console.log('2. CLEAR CHROME\'S INSTALL PROMPT MEMORY:')
    console.log('   Desktop Chrome:')
    console.log('     - Open DevTools (F12)')
    console.log('     - Application tab > Storage')
    console.log('     - Click "Clear site data"')
    console.log('     - OR: chrome://settings/content/all')
    console.log('     - Find your site > Delete')
    console.log('')
    console.log('   Mobile Chrome:')
    console.log('     - Settings > Site settings > All sites')
    console.log('     - Find your site > Clear & reset')
    console.log('')
    console.log('3. ALTERNATIVE: Use a new Chrome profile or incognito window')
    console.log('   (Note: Incognito may still be restrictive)')
    console.log('')
    console.log('4. After reset, wait 30+ seconds and interact with the page')
    console.log('   (scroll, click) to trigger the prompt again')
    console.log('')
    console.log('=== End Instructions ===')
  }
}
