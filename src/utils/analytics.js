/**
 * Google Analytics 4 (GA4) Utility
 * Handles page views, events, and conversions
 * Measurement ID: G-1HMMJLP7GK
 */

// Get GA4 Measurement ID from environment variable (available at build time)
// Also check window.GA4_MEASUREMENT_ID which is set in index.html
const GA4_MEASUREMENT_ID = (typeof window !== 'undefined' && window.GA4_MEASUREMENT_ID) || 
                           import.meta.env.VITE_GA4_MEASUREMENT_ID || ''

// Server-side PHP endpoint for fallback tracking (bypasses ad blockers)
// Set this to your PHP host URL once you set up server-side tracking
// See docs/GA4_PHP_SERVER_SIDE_SETUP.md for setup instructions
const GA4_PHP_ENDPOINT = import.meta.env.VITE_GA4_PHP_ENDPOINT || ''

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
      console.log('[GA4] Ready - gtag and dataLayer available')
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
    console.warn('GA4 not ready after maximum attempts')
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
    console.warn('[GA4] Cannot track page view - GA4 not configured')
    return
  }
  
  try {
    // Get Measurement ID - priority: window.GA4_MEASUREMENT_ID > env var > dataLayer
    const measurementId = (typeof window !== 'undefined' && window.GA4_MEASUREMENT_ID) || 
                          GA4_MEASUREMENT_ID || 
                          (window.dataLayer && window.dataLayer.find ? 
                            window.dataLayer.find(item => item[0] === 'config' && item[1] && item[1].startsWith('G-'))?.[1] : null)
    
    if (!measurementId) {
      console.warn('[GA4] Measurement ID not found - cannot track page view')
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
        console.log('[GA4] Page view tracked:', path, title, '| ID:', measurementId)
        console.log('[GA4] Config entry added to dataLayer:', configEntry)
      } else {
        console.warn('[GA4] Page view call made but config entry not found in dataLayer')
      }
    } else {
      console.warn('[GA4] dataLayer is empty - tracking may not work')
    }
  } catch (error) {
    console.error('[GA4] Page view tracking error:', error)
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
    console.log('[GA4] Queued page view (GA4 not ready yet):', path)
    return
  }
  
  // GA4 is ready, track immediately
  let clientSideSuccess = false
  try {
    trackPageViewInternal(path, title)
    clientSideSuccess = true
  } catch (error) {
    console.warn('[GA4] Client-side page view tracking failed, trying server-side:', error)
    // Fallback to server-side if client-side fails
    if (GA4_PHP_ENDPOINT) {
      trackServerSide('page_view', {
        page_path: path,
        page_title: title
      })
    }
  }
  
  // Only use server-side as backup if client-side is blocked or likely not working
  // This prevents duplicate events when client-side is working properly
  if (GA4_PHP_ENDPOINT && !clientSideSuccess && isClientSideBlocked()) {
    console.log('[GA4] Client-side blocked, using server-side fallback for page view')
    trackServerSide('page_view', {
      page_path: path,
      page_title: title
    }).catch(() => {
      // Silently fail - we already tried client-side
    })
  }
}

/**
 * Internal function to track event (assumes GA4 is ready)
 */
function trackEventInternal(eventName, eventParams = {}) {
  if (!isGA4Configured()) {
    console.warn('[GA4] Cannot track event - GA4 not configured:', eventName)
    return
  }
  
  try {
    // Get Measurement ID to verify it's correct
    const measurementId = (typeof window !== 'undefined' && window.GA4_MEASUREMENT_ID) || GA4_MEASUREMENT_ID
    
    // Send event
    window.gtag('event', eventName, eventParams)
    
    console.log('[GA4] Event tracked:', eventName, eventParams, '| ID:', measurementId || 'using default')
    
    // Also verify dataLayer was updated
    if (window.dataLayer && window.dataLayer.length > 0) {
      const lastEntry = window.dataLayer[window.dataLayer.length - 1]
      if (lastEntry && lastEntry[0] === 'event') {
        console.log('[GA4] Event added to dataLayer:', lastEntry)
      }
    }
  } catch (error) {
    console.error('[GA4] Event tracking error:', error)
  }
}

/**
 * Check if client-side GA4 is likely blocked
 */
function isClientSideBlocked() {
  if (typeof window === 'undefined') return false
  
  // Check if gtag exists but is still the local queue function
  const gtag = window.gtag
  if (!gtag) return true
  
  const gtagString = gtag.toString()
  // If gtag is still the local 43-char function, Google's script likely didn't load
  // But check if dataLayer is being processed (collect requests working)
  if (gtagString.length < 200) {
    // If we have dataLayer entries but gtag is short, might be blocked
    // However, if collect requests are working, it's fine
    // For now, we'll assume blocked if gtag is short AND no recent collect activity
    return true // Conservative: assume blocked if gtag is short
  }
  
  return false
}

/**
 * Track custom event
 * Uses server-side fallback if client-side is blocked
 */
export function trackEvent(eventName, eventParams = {}) {
  // Check if gtag exists (from index.html) - this is the primary check
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    // Queue the tracking call if GA4 isn't ready yet
    trackingQueue.push({ type: 'event', eventName, eventParams })
    // Start waiting for GA4 if not already waiting
    if (!ga4ReadyCheckInterval) {
      waitForGA4Ready()
    }
    console.log('[GA4] Queued event (GA4 not ready yet):', eventName)
    
    // Also try server-side as fallback
    if (GA4_PHP_ENDPOINT) {
      trackServerSide(eventName, eventParams)
    }
    return
  }
  
  // Try client-side first
  let clientSideSuccess = false
  try {
    trackEventInternal(eventName, eventParams)
    clientSideSuccess = true
  } catch (error) {
    console.warn('[GA4] Client-side tracking failed, trying server-side:', error)
    // Fallback to server-side if client-side fails
    if (GA4_PHP_ENDPOINT) {
      trackServerSide(eventName, eventParams)
    }
  }
  
  // Only use server-side as backup if client-side is blocked or likely not working
  // This prevents duplicate events when client-side is working properly
  if (GA4_PHP_ENDPOINT && !clientSideSuccess && isClientSideBlocked()) {
    console.log('[GA4] Client-side blocked, using server-side fallback for:', eventName)
    // Use server-side as backup (non-blocking, doesn't wait for response)
    trackServerSide(eventName, eventParams).catch(() => {
      // Silently fail - we already tried client-side
    })
  }
}

/**
 * Server-side GA4 tracking fallback (for when client-side is blocked)
 * Uses GA4 Measurement Protocol API
 */
async function trackServerSide(eventName, eventParams = {}) {
  const measurementId = (typeof window !== 'undefined' && window.GA4_MEASUREMENT_ID) || GA4_MEASUREMENT_ID
  
  if (!measurementId) {
    console.warn('[GA4] Server-side tracking: No Measurement ID available')
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
    
    // Send to PHP endpoint (which proxies to GA4 Measurement Protocol)
    if (!GA4_PHP_ENDPOINT) {
      console.warn('[GA4] Server-side tracking: PHP endpoint not configured')
      return false
    }
    
    // Prepare payload for PHP endpoint (matches PHP file format)
    const phpPayload = {
      event_name: eventName,
      event_params: eventParams,
      client_id: clientId,
      page_location: window.location.href,
      page_title: document.title
    }
    
    const response = await fetch(GA4_PHP_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(phpPayload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      console.log('[GA4] Server-side tracking successful:', eventName)
      return true
    } else {
      console.warn('[GA4] Server-side tracking failed:', response.status)
      return false
    }
  } catch (error) {
    console.warn('[GA4] Server-side tracking error:', error)
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
  console.log('=== GA4 Diagnostic Check ===')
  
  // Check Measurement ID
  const measurementId = (typeof window !== 'undefined' && window.GA4_MEASUREMENT_ID) || GA4_MEASUREMENT_ID
  console.log('1. Measurement ID:', measurementId || '❌ NOT FOUND')
  
  // Check gtag function
  const hasGtag = typeof window !== 'undefined' && typeof window.gtag === 'function'
  const gtagString = hasGtag ? window.gtag.toString() : ''
  const isRealGtag = gtagString.length > 100 && gtagString.includes('dataLayer')
  console.log('2. gtag function:', hasGtag ? (isRealGtag ? '✅ Available (Real Google version)' : '⚠️ Available (Local version - script may not have loaded)') : '❌ NOT FOUND')
  if (hasGtag) {
    console.log('   gtag function length:', gtagString.length, 'chars')
    console.log('   gtag function preview:', gtagString.substring(0, 100) + '...')
  }
  
  // Check dataLayer
  const hasDataLayer = typeof window !== 'undefined' && Array.isArray(window.dataLayer)
  console.log('3. dataLayer:', hasDataLayer ? `✅ Available (${window.dataLayer?.length || 0} entries)` : '❌ NOT FOUND')
  
  // Check for GA4 script in DOM
  const ga4Script = document.querySelector('script[src*="googletagmanager.com/gtag/js"]')
  console.log('4. GA4 script tag in DOM:', ga4Script ? `✅ Found (${ga4Script.src})` : '❌ NOT FOUND')
  
  // Check if script actually loaded (check for Google's gtag object)
  const hasGoogleGtag = typeof window !== 'undefined' && window.gtag && 
                        window.gtag.toString().includes('dataLayer') &&
                        window.gtag.toString().length > 200
  console.log('5. Google gtag.js loaded:', hasGoogleGtag ? '✅ YES (Real Google script is active)' : '❌ NO (Only local queue function)')
  
  // Check dataLayer entries
  if (hasDataLayer && window.dataLayer.length > 0) {
    console.log('6. dataLayer entries:')
    window.dataLayer.forEach((entry, index) => {
      console.log(`   [${index}]:`, entry)
    })
  } else {
    console.log('6. dataLayer entries: ❌ EMPTY')
  }
  
  // Check for network requests (user needs to check Network tab manually)
  console.log('7. Network requests: Check Network tab for requests to:')
  console.log('   - googletagmanager.com/gtag/js?id=' + measurementId)
  console.log('   - google-analytics.com/g/collect')
  console.log('   If you see NOTHING, the script is likely blocked by:')
  console.log('   - Ad blocker (uBlock Origin, AdBlock Plus, etc.)')
  console.log('   - Privacy extension (Privacy Badger, Ghostery, etc.)')
  console.log('   - Browser privacy settings')
  console.log('   - Corporate firewall')
  
  // Test tracking call
  console.log('8. Testing tracking call...')
  if (hasGtag && measurementId) {
    try {
      window.gtag('event', 'diagnostic_test', {
        event_category: 'diagnostic',
        event_label: 'Manual diagnostic check'
      })
      console.log('   ✅ Test event sent to gtag')
      console.log('   Check Network tab for google-analytics.com/g/collect request')
    } catch (error) {
      console.error('   ❌ Error sending test event:', error)
    }
  } else {
    console.log('   ❌ Cannot test - gtag or Measurement ID missing')
  }
  
  // Final diagnosis
  console.log('\n=== DIAGNOSIS ===')
  if (!ga4Script) {
    console.log('❌ CRITICAL: Script tag not in DOM - script was never added!')
  } else if (!hasGoogleGtag) {
    console.log('❌ CRITICAL: Script tag exists but Google gtag.js did not load!')
    console.log('   This means the script request was BLOCKED or FAILED')
    console.log('   Check Network tab for blocked/failed requests to googletagmanager.com')
  } else if (hasGoogleGtag && hasDataLayer) {
    console.log('✅ Script loaded correctly - if no collect requests, check Network tab for blocks')
  }
  
  console.log('=== End Diagnostic ===')
  console.log('💡 TIP: Open Network tab, filter by "collect" or "gtag", and refresh page')
  console.log('💡 TIP: Disable ad blockers and test in Incognito mode')
}

// Make diagnostic function available globally
if (typeof window !== 'undefined') {
  window.checkGA4Setup = checkGA4Setup
}
