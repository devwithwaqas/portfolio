/**
 * Google Analytics 4 (GA4) Utility
 * Handles page views, events, and conversions
 * Measurement ID: G-1HMMJLP7GK
 */

import { DEBUG_CONFIG } from '../config/constants.js'

// Get GA4 Measurement ID from environment variable (available at build time)
// Also check window.GA4_MEASUREMENT_ID which is set in index.html
const GA4_MEASUREMENT_ID = (typeof window !== 'undefined' && window.GA4_MEASUREMENT_ID) || 
                           import.meta.env.VITE_GA4_MEASUREMENT_ID || ''

// Unified endpoint for both analytics and tracking (bypasses ad blockers)
// Set this to your Google Cloud Function URL in GitHub Secrets
const PORTFOLIO_GA4_API_ENDPOINT = import.meta.env.VITE_PORTFOLIO_GA4_API_ENDPOINT || ''

// TESTING FLAG: Force server-side tracking only (bypasses client-side)
// Set VITE_GA4_FORCE_SERVER_SIDE=true in GitHub Secrets to test server-side endpoint
// When enabled, ALL tracking will go through server-side only (no client-side)
const FORCE_SERVER_SIDE = import.meta.env.VITE_GA4_FORCE_SERVER_SIDE === 'true' || false

const GA4_DEBUG = false
const ga4Log = () => {}
const ga4Warn = () => {}
const ga4Error = () => {}

// Queue for tracking calls made before GA4 is ready
const trackingQueue = []
let isGA4Ready = false
let ga4ReadyCheckInterval = null

/**
 * Check if GA4 is configured and ready
 * Note: We check for window.gtag which is set in index.html
 */
export function isGA4Configured() {
  const hasGtag = typeof window !== 'undefined' && typeof window.gtag === 'function'
  const hasDataLayer = typeof window !== 'undefined' && Array.isArray(window.dataLayer)
  
  if (hasGtag && hasDataLayer) {
    // Debug logging
    if (!isGA4Ready) {
      ga4Log('[GA4] Ready - gtag and dataLayer available')
      isGA4Ready = true
    }
    return true
  }
  
  return false
}

/**
 * Wait for GA4 to be ready, then process queued tracking calls
 */
function waitForGA4Ready(maxAttempts = 50, attempt = 0) {
  if (isGA4Configured()) {
    isGA4Ready = true
    if (ga4ReadyCheckInterval) {
      clearInterval(ga4ReadyCheckInterval)
      ga4ReadyCheckInterval = null
    }
    
    // Process queued tracking calls
    while (trackingQueue.length > 0) {
      const { type, ...args } = trackingQueue.shift()
      if (type === 'pageview') {
        trackPageViewInternal(args.path, args.title)
      } else if (type === 'event') {
        trackEventInternal(args.eventName, args.eventParams)
      }
    }
    return true
  }
  
  if (attempt >= maxAttempts) {
    ga4Warn('GA4 not ready after maximum attempts')
    return false
  }
  
  // Check again in 100ms
  if (!ga4ReadyCheckInterval) {
    ga4ReadyCheckInterval = setInterval(() => {
      waitForGA4Ready(maxAttempts, attempt + 1)
    }, 100)
  }
  
  return false
}

/**
 * Internal function to track page view (assumes GA4 is ready)
 */
function trackPageViewInternal(path, title) {
  if (!isGA4Configured()) {
    ga4Warn('[GA4] Cannot track page view - GA4 not configured')
    return
  }
  
  try {
    // Get Measurement ID - priority: window.GA4_MEASUREMENT_ID > env var > dataLayer
    const measurementId = (typeof window !== 'undefined' && window.GA4_MEASUREMENT_ID) || 
                          GA4_MEASUREMENT_ID || 
                          (window.dataLayer && window.dataLayer.find ? 
                            window.dataLayer.find(item => item[0] === 'config' && item[1] && item[1].startsWith('G-'))?.[1] : null)
    
    if (!measurementId) {
      ga4Warn('[GA4] Measurement ID not found - cannot track page view')
      return
    }
    
    // Use gtag to send page view
    window.gtag('config', measurementId, {
      page_path: path,
      page_title: title
    })
    
    // Verify dataLayer was updated
    if (window.dataLayer && window.dataLayer.length > 0) {
      const configEntry = window.dataLayer.find(item => 
        item[0] === 'config' && item[1] === measurementId
      )
      if (configEntry) {
        ga4Log('[GA4] Page view tracked:', path, title, '| ID:', measurementId)
        ga4Log('[GA4] Config entry added to dataLayer:', configEntry)
      } else {
        ga4Warn('[GA4] Page view call made but config entry not found in dataLayer')
      }
    } else {
      ga4Warn('[GA4] dataLayer is empty - tracking may not work')
    }
  } catch (error) {
    ga4Error('[GA4] Page view tracking error:', error)
  }
}

/**
 * Track page view
 */
export function trackPageView(path, title) {
  // Check if gtag exists (from index.html) - this is the primary check
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    // Queue the tracking call if GA4 isn't ready yet
    trackingQueue.push({ type: 'pageview', path, title })
    // Start waiting for GA4 if not already waiting
    if (!ga4ReadyCheckInterval) {
      waitForGA4Ready()
    }
    ga4Log('[GA4] Queued page view (GA4 not ready yet):', path)
    return
  }
  
  // GA4 is ready, track immediately
  let clientSideSuccess = false
  try {
    trackPageViewInternal(path, title)
    clientSideSuccess = true
  } catch (error) {
    ga4Warn('[GA4] Client-side page view tracking failed, trying server-side:', error)
    // Fallback to server-side if client-side fails
    if (PORTFOLIO_GA4_API_ENDPOINT) {
      trackServerSide('page_view', {
        page_path: path,
        page_title: title
      })
    }
  }
  
  // Always use server-side as backup when endpoint is configured
  // GA4 will deduplicate events with same client_id and timestamp
  // This ensures we capture events even if collect requests fail silently (e.g., cookies blocked)
  if (PORTFOLIO_GA4_API_ENDPOINT) {
    ga4Log('[GA4] API endpoint configured:', PORTFOLIO_GA4_API_ENDPOINT)
    // Use a small delay to let client-side try first, then send server-side
    // This helps with deduplication (same timestamp)
    setTimeout(() => {
      ga4Log('[GA4] Using server-side backup for page view')
      trackServerSide('page_view', {
        page_path: path,
        page_title: title
      }).catch((err) => {
        ga4Warn('[GA4] Server-side backup failed:', err)
      })
    }, 100) // 100ms delay to let client-side go first
  } else {
    ga4Warn('[GA4] API endpoint NOT configured - server-side backup disabled')
    ga4Warn('[GA4] Set VITE_PORTFOLIO_GA4_API_ENDPOINT in GitHub Secrets to enable server-side tracking')
  }
}

/**
 * Internal function to track event (assumes GA4 is ready)
 */
function trackEventInternal(eventName, eventParams = {}) {
  if (!isGA4Configured()) {
    ga4Warn('[GA4] Cannot track event - GA4 not configured:', eventName)
    return
  }
  
  try {
    // Get Measurement ID to verify it's correct
    const measurementId = (typeof window !== 'undefined' && window.GA4_MEASUREMENT_ID) || GA4_MEASUREMENT_ID
    
    // Send event
    window.gtag('event', eventName, eventParams)
    
    ga4Log('[GA4] Event tracked:', eventName, eventParams, '| ID:', measurementId || 'using default')
    
    // Also verify dataLayer was updated
    if (window.dataLayer && window.dataLayer.length > 0) {
      const lastEntry = window.dataLayer[window.dataLayer.length - 1]
      if (lastEntry && lastEntry[0] === 'event') {
        ga4Log('[GA4] Event added to dataLayer:', lastEntry)
      }
    }
  } catch (error) {
    ga4Error('[GA4] Event tracking error:', error)
  }
}

/**
 * Check if client-side GA4 is likely blocked or not working
 * This checks multiple indicators to detect blocking
 * 
 * Note: Even if gtag loads, collect requests might fail if cookies are blocked.
 * We can't detect failed collect requests from JS, so we use heuristics.
 */
function isClientSideBlocked() {
  if (typeof window === 'undefined') return false
  
  // Check if gtag exists
  const gtag = window.gtag
  if (!gtag) {
    ga4Log('[GA4] Blocking detected: gtag function not found')
    return true
  }
  
  const gtagString = gtag.toString()
  
  // If gtag is still the local queue function (short), Google's script didn't load
  if (gtagString.length < 200) {
    ga4Log('[GA4] Blocking detected: gtag is still local queue function')
    return true
  }
  
  // Check if dataLayer exists and has entries
  if (!window.dataLayer || window.dataLayer.length === 0) {
    ga4Log('[GA4] Blocking detected: dataLayer is empty')
    return true
  }
  
  // Check if third-party cookies are likely blocked
  // We can't directly check, but we can look for indicators:
  // 1. Check if localStorage/sessionStorage work (if blocked, might indicate cookie issues)
  // 2. Check if navigator.cookieEnabled (but this only checks first-party cookies)
  
  // More aggressive: If user removed cookie exceptions, assume blocking is possible
  // and use server-side as backup. We'll rely on GA4's deduplication if both succeed.
  
  // For now, we'll be conservative and only return true if we're sure it's blocked
  // The error handler will catch actual failures
  return false
}

/**
 * Check if we should use server-side as backup (even if client-side seems to work)
 * This is more aggressive and helps catch cases where collect requests fail silently
 */
function shouldUseServerSideBackup() {
  // Always use server-side as backup if endpoint is configured
  // GA4 will deduplicate events with same client_id and timestamp
  // This ensures we capture events even if collect requests fail silently
  return true
}

/**
 * Track custom event
 * Uses server-side fallback if client-side is blocked
 */
export function trackEvent(eventName, eventParams = {}) {
  // TESTING MODE: Force server-side only
  if (FORCE_SERVER_SIDE) {
    ga4Log('[GA4] ⚠️ FORCE SERVER-SIDE MODE: Skipping client-side, using server-side only for:', eventName)
    if (PORTFOLIO_GA4_API_ENDPOINT) {
      trackServerSide(eventName, eventParams)
    } else {
      ga4Error('[GA4] ❌ FORCE SERVER-SIDE enabled but API endpoint not configured!')
    }
    return
  }
  
  // Check if gtag exists (from index.html) - this is the primary check
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    // Queue the tracking call if GA4 isn't ready yet
    trackingQueue.push({ type: 'event', eventName, eventParams })
    // Start waiting for GA4 if not already waiting
    if (!ga4ReadyCheckInterval) {
      waitForGA4Ready()
    }
    ga4Log('[GA4] Queued event (GA4 not ready yet):', eventName)
    
    // Also try server-side as fallback
    if (PORTFOLIO_GA4_API_ENDPOINT) {
      trackServerSide(eventName, eventParams)
    }
    return
  }
  
  // Try client-side first
  let clientSideSuccess = false
  let clientSideError = null
  
  try {
    trackEventInternal(eventName, eventParams)
    clientSideSuccess = true
  } catch (error) {
    clientSideError = error
    ga4Warn('[GA4] Client-side tracking failed, trying server-side:', error)
    // Fallback to server-side if client-side fails
    if (PORTFOLIO_GA4_API_ENDPOINT) {
      ga4Log('[GA4] Using server-side fallback due to client-side error:', eventName)
      trackServerSide(eventName, eventParams)
    }
  }
  
  // Also check if client-side is blocked (even if no error thrown)
  // This handles cases where cookies are blocked but gtag still loads
  if (PORTFOLIO_GA4_API_ENDPOINT && isClientSideBlocked()) {
    ga4Log('[GA4] Client-side blocked detected, using server-side fallback for:', eventName)
    // Use server-side as backup (non-blocking, doesn't wait for response)
    trackServerSide(eventName, eventParams).catch(() => {
      // Silently fail - we already tried client-side
    })
  }
  
  // ALWAYS use server-side as backup when cookies might be blocked
  // Even if client-side seems to work, collect requests might fail silently
  // GA4 will deduplicate events with same client_id and timestamp
  if (PORTFOLIO_GA4_API_ENDPOINT && shouldUseServerSideBackup()) {
    // Use a small delay to let client-side try first, then send server-side
    // This helps with deduplication (same timestamp)
    setTimeout(() => {
      ga4Log('[GA4] Using server-side backup for:', eventName)
      trackServerSide(eventName, eventParams).catch((err) => {
        ga4Warn('[GA4] Server-side backup failed:', err)
      })
    }, 100) // 100ms delay to let client-side go first
  } else if (!PORTFOLIO_GA4_API_ENDPOINT) {
    ga4Warn('[GA4] API endpoint NOT configured - server-side backup disabled for:', eventName)
  }
}

/**
 * Server-side GA4 tracking fallback (for when client-side is blocked)
 * Uses GA4 Measurement Protocol API
 */
async function trackServerSide(eventName, eventParams = {}) {
  ga4Log('[GA4] trackServerSide called for:', eventName, '| Endpoint:', PORTFOLIO_GA4_API_ENDPOINT)
  
  const measurementId = (typeof window !== 'undefined' && window.GA4_MEASUREMENT_ID) || GA4_MEASUREMENT_ID
  
  if (!measurementId) {
    ga4Warn('[GA4] Server-side tracking: No Measurement ID available')
    return false
  }
  
  if (!PORTFOLIO_GA4_API_ENDPOINT) {
    ga4Warn('[GA4] Server-side tracking: API endpoint not configured')
    return false
  }
  
  try {
    // Generate a client ID (persistent identifier)
    let clientId = localStorage.getItem('ga4_client_id')
    if (!clientId) {
      clientId = `${Date.now()}.${Math.random().toString(36).substring(2, 15)}`
      localStorage.setItem('ga4_client_id', clientId)
    }
    
    // Prepare payload for GA4 Measurement Protocol
    const payload = {
      client_id: clientId,
      events: [{
        name: eventName,
        params: {
          ...eventParams,
          page_location: window.location.href,
          page_title: document.title,
          engagement_time_msec: 100
        }
      }]
    }
    
    // Prepare payload for API endpoint
    const apiPayload = {
      event_name: eventName,
      event_params: eventParams,
      client_id: clientId,
      page_location: window.location.href,
      page_title: document.title
    }
    
    ga4Log('[GA4] Sending POST request to:', PORTFOLIO_GA4_API_ENDPOINT)
    ga4Log('[GA4] Payload:', JSON.stringify(apiPayload, null, 2))
    
    // Send to unified API endpoint (handles CORS properly)
    const response = await fetch(PORTFOLIO_GA4_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiPayload)
    })
    
    if (response.ok) {
      const result = await response.json()
      ga4Log('[GA4] Server-side tracking successful:', result)
      return true
    } else {
      ga4Warn('[GA4] Server-side tracking failed:', response.status, response.statusText)
      return false
    }
  } catch (error) {
    ga4Warn('[GA4] Server-side tracking error:', error)
    return false
  }
}

/**
 * Check if client-side GA4 is blocked
 */
function isGA4Blocked() {
  // Check if gtag function exists but is still the local queue function
  const gtag = window.gtag
  if (!gtag) return true
  
  const gtagString = gtag.toString()
  // If gtag is still the local 43-char function, Google's script didn't load
  if (gtagString.length < 200) {
    // Check if collect requests are actually working
    // If dataLayer has entries but no collect requests, it's blocked
    const hasDataLayer = window.dataLayer && window.dataLayer.length > 0
    if (hasDataLayer) {
      // Wait a bit and check if requests appeared
      return false // Assume working if dataLayer has entries
    }
    return true
  }
  
  return false
}

/**
 * Track contact form submission (Conversion)
 * 
 * Note: For users with ad blockers, client-side tracking may be blocked (~20-30% of users).
 * Current setup works for ~70-80% of visitors.
 * 
 * To achieve 100% coverage, implement server-side tracking via serverless function.
 * See docs/GA4_AD_BLOCKER_SOLUTIONS.md for implementation guide.
 */
export function trackContactFormSubmission(formData = {}) {
  // Try client-side first
  trackEvent('contact_form_submit', {
    event_category: 'engagement',
    event_label: 'Contact Form',
    value: 1,
    form_subject: formData.subject || 'Unknown',
    // Don't send PII (personally identifiable information)
    // form_name: formData.name, // Excluded for privacy
    // form_email: formData.email // Excluded for privacy
  })
  
  // Track as conversion
  trackEvent('conversion', {
    send_to: GA4_MEASUREMENT_ID,
    event_category: 'conversion',
    event_label: 'Contact Form Submission'
  })
  
  // If client-side might be blocked, try server-side fallback
  // Note: Server-side requires API secret, which we don't have in static site
  // For now, we'll rely on client-side only
  // TODO: Implement serverless function for server-side tracking
}

/**
 * Track service page view
 */
export function trackServicePageView(serviceName) {
  trackEvent('service_page_view', {
    event_category: 'engagement',
    event_label: serviceName,
    service_name: serviceName
  })
}

/**
 * Track project page view
 */
export function trackProjectPageView(projectName) {
  trackEvent('project_page_view', {
    event_category: 'engagement',
    event_label: projectName,
    project_name: projectName
  })
}

/**
 * Track download/action
 */
export function trackDownload(resourceName, resourceType = 'file') {
  trackEvent('file_download', {
    event_category: 'engagement',
    event_label: resourceName,
    resource_type: resourceType
  })
}

/**
 * Track external link click
 */
export function trackExternalLink(url, linkText) {
  trackEvent('external_link_click', {
    event_category: 'outbound',
    event_label: linkText,
    link_url: url
  })
}

/**
 * Diagnostic function to check GA4 setup
 * Call this in browser console: window.checkGA4Setup()
 */
export function checkGA4Setup() {
  ga4Log('=== GA4 Diagnostic Check ===')
  
  // Check Measurement ID
  const measurementId = (typeof window !== 'undefined' && window.GA4_MEASUREMENT_ID) || GA4_MEASUREMENT_ID
  ga4Log('1. Measurement ID:', measurementId || '❌ NOT FOUND')
  
  // Check gtag function
  const hasGtag = typeof window !== 'undefined' && typeof window.gtag === 'function'
  const gtagString = hasGtag ? window.gtag.toString() : ''
  const isRealGtag = gtagString.length > 100 && gtagString.includes('dataLayer')
  ga4Log('2. gtag function:', hasGtag ? (isRealGtag ? '✅ Available (Real Google version)' : '⚠️ Available (Local version - script may not have loaded)') : '❌ NOT FOUND')
  if (hasGtag) {
    ga4Log('   gtag function length:', gtagString.length, 'chars')
    ga4Log('   gtag function preview:', gtagString.substring(0, 100) + '...')
  }
  
  // Check dataLayer
  const hasDataLayer = typeof window !== 'undefined' && Array.isArray(window.dataLayer)
  ga4Log('3. dataLayer:', hasDataLayer ? `✅ Available (${window.dataLayer?.length || 0} entries)` : '❌ NOT FOUND')
  
  // Check for GA4 script in DOM
  const ga4Script = document.querySelector('script[src*="googletagmanager.com/gtag/js"]')
  ga4Log('4. GA4 script tag in DOM:', ga4Script ? `✅ Found (${ga4Script.src})` : '❌ NOT FOUND')
  
  // Check if script actually loaded (check for Google's gtag object)
  const hasGoogleGtag = typeof window !== 'undefined' && window.gtag && 
                        window.gtag.toString().includes('dataLayer') &&
                        window.gtag.toString().length > 200
  ga4Log('5. Google gtag.js loaded:', hasGoogleGtag ? '✅ YES (Real Google script is active)' : '❌ NO (Only local queue function)')
  
  // Check dataLayer entries
  if (hasDataLayer && window.dataLayer.length > 0) {
    ga4Log('6. dataLayer entries:')
    window.dataLayer.forEach((entry, index) => {
      ga4Log(`   [${index}]:`, entry)
    })
  } else {
    ga4Log('6. dataLayer entries: ❌ EMPTY')
  }
  
  // Check for network requests (user needs to check Network tab manually)
  ga4Log('7. Network requests: Check Network tab for requests to:')
  ga4Log('   - googletagmanager.com/gtag/js?id=' + measurementId)
  ga4Log('   - google-analytics.com/g/collect')
  ga4Log('   If you see NOTHING, the script is likely blocked by:')
  ga4Log('   - Ad blocker (uBlock Origin, AdBlock Plus, etc.)')
  ga4Log('   - Privacy extension (Privacy Badger, Ghostery, etc.)')
  ga4Log('   - Browser privacy settings')
  ga4Log('   - Corporate firewall')
  
  // Test tracking call
  ga4Log('8. Testing tracking call...')
  if (hasGtag && measurementId) {
    try {
      window.gtag('event', 'diagnostic_test', {
        event_category: 'diagnostic',
        event_label: 'Manual diagnostic check'
      })
      ga4Log('   ✅ Test event sent to gtag')
      ga4Log('   Check Network tab for google-analytics.com/g/collect request')
    } catch (error) {
      ga4Error('   ❌ Error sending test event:', error)
    }
  } else {
    ga4Log('   ❌ Cannot test - gtag or Measurement ID missing')
  }
  
  // Final diagnosis
  ga4Log('\n=== DIAGNOSIS ===')
  if (!ga4Script) {
    ga4Log('❌ CRITICAL: Script tag not in DOM - script was never added!')
  } else if (!hasGoogleGtag) {
    ga4Log('❌ CRITICAL: Script tag exists but Google gtag.js did not load!')
    ga4Log('   This means the script request was BLOCKED or FAILED')
    ga4Log('   Check Network tab for blocked/failed requests to googletagmanager.com')
  } else if (hasGoogleGtag && hasDataLayer) {
    ga4Log('✅ Script loaded correctly - if no collect requests, check Network tab for blocks')
  }
  
  ga4Log('=== End Diagnostic ===')
  ga4Log('💡 TIP: Open Network tab, filter by "collect" or "gtag", and refresh page')
  ga4Log('💡 TIP: Disable ad blockers and test in Incognito mode')
}

// Make diagnostic function available globally
if (typeof window !== 'undefined') {
  window.checkGA4Setup = checkGA4Setup
}
