/**
 * Google Analytics 4 (GA4) Utility
 * Handles page views, events, and conversions
 * Measurement ID: G-1HMMJLP7GK
 */

// Get GA4 Measurement ID from environment variable (available at build time)
// Also check window.GA4_MEASUREMENT_ID which is set in index.html
const GA4_MEASUREMENT_ID = (typeof window !== 'undefined' && window.GA4_MEASUREMENT_ID) || 
                           import.meta.env.VITE_GA4_MEASUREMENT_ID || ''

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
  trackPageViewInternal(path, title)
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
 * Track custom event
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
    return
  }
  
  // GA4 is ready, track immediately
  trackEventInternal(eventName, eventParams)
}

/**
 * Track contact form submission (Conversion)
 */
export function trackContactFormSubmission(formData = {}) {
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
  console.log('2. gtag function:', hasGtag ? '✅ Available' : '❌ NOT FOUND')
  
  // Check dataLayer
  const hasDataLayer = typeof window !== 'undefined' && Array.isArray(window.dataLayer)
  console.log('3. dataLayer:', hasDataLayer ? `✅ Available (${window.dataLayer?.length || 0} entries)` : '❌ NOT FOUND')
  
  // Check for GA4 script in DOM
  const ga4Script = document.querySelector('script[src*="googletagmanager.com/gtag/js"]')
  console.log('4. GA4 script tag:', ga4Script ? `✅ Found (${ga4Script.src})` : '❌ NOT FOUND')
  
  // Check dataLayer entries
  if (hasDataLayer && window.dataLayer.length > 0) {
    console.log('5. dataLayer entries:')
    window.dataLayer.forEach((entry, index) => {
      console.log(`   [${index}]:`, entry)
    })
  } else {
    console.log('5. dataLayer entries: ❌ EMPTY')
  }
  
  // Check for network requests (user needs to check Network tab manually)
  console.log('6. Network requests: Check Network tab for requests to:')
  console.log('   - googletagmanager.com/gtag/js?id=' + measurementId)
  console.log('   - google-analytics.com/g/collect')
  
  // Test tracking call
  console.log('7. Testing tracking call...')
  if (hasGtag && measurementId) {
    try {
      window.gtag('event', 'diagnostic_test', {
        event_category: 'diagnostic',
        event_label: 'Manual diagnostic check'
      })
      console.log('   ✅ Test event sent to gtag')
    } catch (error) {
      console.error('   ❌ Error sending test event:', error)
    }
  } else {
    console.log('   ❌ Cannot test - gtag or Measurement ID missing')
  }
  
  console.log('=== End Diagnostic ===')
  console.log('💡 TIP: Open Network tab, filter by "collect" or "gtag", and refresh page to see if requests are being sent')
}

// Make diagnostic function available globally
if (typeof window !== 'undefined') {
  window.checkGA4Setup = checkGA4Setup
}
