/**
 * Browser Notifications Utility
 * Handles notification permissions and showing notifications
 * 
 * HOW TO SEND NOTIFICATIONS IN THE FUTURE:
 * 
 * 1. Programmatic (from your code):
 *    import { showSimpleNotification } from '@/utils/notifications'
 *    showSimpleNotification('Title', 'Message body', '/optional-url')
 * 
 * 2. Push Notifications (from server):
 *    - Set up a push service (Firebase Cloud Messaging, Web Push, etc.)
 *    - Subscribe users to push notifications
 *    - Send push messages from your server
 *    - Service worker will automatically show notifications via 'push' event
 * 
 * 3. Scheduled Notifications:
 *    - Use service worker background sync
 *    - Or trigger from your backend at specific times
 */

/**
 * Request notification permission from user
 * @returns {Promise<string>} 'granted', 'denied', or 'default'
 */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.warn('[Notifications] Browser does not support notifications')
    return 'unsupported'
  }
  
  // Check current permission
  if (Notification.permission === 'granted') {
    return 'granted'
  }
  
  if (Notification.permission === 'denied') {
    console.warn('[Notifications] Permission was previously denied')
    return 'denied'
  }
  
  // Request permission
  try {
    const permission = await Notification.requestPermission()
    return permission
  } catch (error) {
    console.error('[Notifications] Error requesting permission:', error)
    return 'default'
  }
}

/**
 * Check if notifications are supported and permitted
 * @returns {boolean}
 */
export function canShowNotifications() {
  if (!('Notification' in window)) {
    return false
  }
  
  if (!('serviceWorker' in navigator)) {
    return false
  }
  
  return Notification.permission === 'granted'
}

/**
 * Show a notification via service worker
 * @param {string} title - Notification title
 * @param {Object} options - Notification options
 * @returns {Promise<void>}
 */
export async function showNotification(title, options = {}) {
  if (!canShowNotifications()) {
    console.warn('[Notifications] Cannot show notification - permission not granted or not supported')
    return false
  }
  
  try {
    const registration = await navigator.serviceWorker.ready
    
    const notificationOptions = {
      body: options.body || '',
      icon: options.icon || '/assets/img/favicon-192.png',
      badge: options.badge || '/assets/img/favicon.png',
      tag: options.tag || 'portfolio-notification',
      requireInteraction: options.requireInteraction || false,
      data: options.data || { url: window.location.href },
      vibrate: options.vibrate || [200, 100, 200],
      timestamp: Date.now(),
      ...options
    }
    
    // Send message to service worker to show notification
    registration.active?.postMessage({
      type: 'SHOW_NOTIFICATION',
      title,
      options: notificationOptions
    })
    
    return true
  } catch (error) {
    console.error('[Notifications] Error showing notification:', error)
    return false
  }
}

/**
 * Show a simple notification (convenience function)
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 * @param {string} url - URL to open when clicked
 */
export async function showSimpleNotification(title, body, url = '/') {
  return showNotification(title, {
    body,
    data: { url },
    tag: `notification-${Date.now()}`
  })
}

/**
 * Initialize notifications (request permission if needed)
 * Only requests permission after user engagement (e.g., after 30 seconds on page)
 * Shows a friendly message before requesting permission
 * @param {number} delay - Delay in milliseconds before requesting (default: 30000 = 30 seconds)
 */
export function initNotifications(delay = 30000) {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) {
    return
  }
  
  // Don't request if already granted or denied
  if (Notification.permission !== 'default') {
    return
  }
  
  // Request permission after delay (user engagement)
  setTimeout(async () => {
    // Only request if user is still on page and permission is still default
    if (Notification.permission === 'default' && document.visibilityState === 'visible') {
      // Show a friendly message before requesting
      const userWantsNotifications = confirm(
        '🔔 Stay Updated!\n\n' +
        'Would you like to receive notifications about:\n' +
        '• Latest updates and new features\n' +
        '• Important announcements\n' +
        '• Latest trends and insights\n\n' +
        'You can change this anytime in your browser settings.'
      )
      
      if (userWantsNotifications) {
        console.log('[Notifications] User wants notifications, requesting permission...')
        const permission = await requestNotificationPermission()
        if (permission === 'granted') {
          console.log('[Notifications] ✅ Permission granted! Notifications enabled.')
          // Optionally show a welcome notification
          setTimeout(() => {
            showSimpleNotification(
              'Notifications Enabled! 🔔',
              'You\'ll now receive updates about latest features, trends, and important announcements.',
              '/'
            ).catch(() => {
              // Ignore if notification fails
            })
          }, 1000)
        }
      } else {
        console.log('[Notifications] User declined notification permission')
      }
    }
  }, delay)
}
