/**
 * Google Analytics 4 (GA4) Utility
 * Handles page views, events, and conversions
 */

// Get GA4 Measurement ID from environment variable
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || ''

/**
 * Check if GA4 is configured
 */
export function isGA4Configured() {
  return GA4_MEASUREMENT_ID && GA4_MEASUREMENT_ID !== '' && typeof window !== 'undefined' && typeof window.gtag !== 'undefined'
}

/**
 * Track page view
 */
export function trackPageView(path, title) {
  if (!isGA4Configured()) return
  
  window.gtag('config', GA4_MEASUREMENT_ID, {
    page_path: path,
    page_title: title
  })
}

/**
 * Track custom event
 */
export function trackEvent(eventName, eventParams = {}) {
  if (!isGA4Configured()) return
  
  window.gtag('event', eventName, eventParams)
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
