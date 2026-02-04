/**
 * Persistent Error Tracker
 * Logs errors to localStorage so they survive page reloads
 * Helps debug infinite reload loops
 */

const ERROR_LOG_KEY = 'portfolio_error_log'
const MAX_ERRORS = 50
const RELOAD_COUNT_KEY = 'portfolio_reload_count'
const MAX_RELOADS = 3
const RELOAD_COOLDOWN = 10000 // 10 seconds

const DEV_LOG_URL = '/__dev-log-error'

export function logError(error, context = 'unknown') {
  try {
    // Skip logging "boot" entries to localStorage - they're not real errors
    // They're already logged to dev-error-log.txt via sendBeacon
    const isBoot = context === 'boot' || context === 'pagehide' || context === 'beforeunload'
    
    const message = error?.message || String(error)
    const stack = error?.stack || ''
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const timestamp = new Date().toISOString()

    const errorEntry = {
      timestamp,
      context,
      message,
      stack,
      url,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
    }

    // In DEV: send to Vite dev server so it's written to dev-error-log.txt
    // Use sendBeacon so it fires even right before reload/unload
    if (typeof window !== 'undefined' && import.meta.env?.DEV) {
      try {
        const payload = JSON.stringify({ context, message, stack, url, timestamp })
        const blob = new Blob([payload], { type: 'application/json' })
        const target = `${window.location.origin}${DEV_LOG_URL}`
        navigator.sendBeacon(target, blob)
      } catch (_) {}
    }

    // Only store real errors in localStorage (not boot/pagehide events)
    if (!isBoot) {
      const errorLog = JSON.parse(localStorage.getItem(ERROR_LOG_KEY) || '[]')
      errorLog.push(errorEntry)
      if (errorLog.length > MAX_ERRORS) {
        errorLog.shift()
      }
      localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(errorLog))
    }

    // Only log to console if it's a real error (not boot)
    if (!isBoot) {
      console.error(`[Error Tracker] [${context}]:`, errorEntry)
    }

    return errorEntry
  } catch (e) {
    console.error(`[Error Tracker] Failed to log error:`, e)
    console.error(`[Error Tracker] Original error [${context}]:`, error)
  }
}

export function getErrorLog() {
  try {
    return JSON.parse(localStorage.getItem(ERROR_LOG_KEY) || '[]')
  } catch {
    return []
  }
}

export function clearErrorLog() {
  try {
    localStorage.removeItem(ERROR_LOG_KEY)
    localStorage.removeItem(RELOAD_COUNT_KEY)
  } catch {}
}

export function shouldPreventReload() {
  try {
    const reloadData = JSON.parse(localStorage.getItem(RELOAD_COUNT_KEY) || '{}')
    const now = Date.now()
    
    // Check if we've reloaded too many times recently
    if (reloadData.count >= MAX_RELOADS) {
      const timeSinceLastReload = now - (reloadData.lastReload || 0)
      
      if (timeSinceLastReload < RELOAD_COOLDOWN) {
        console.error('[Error Tracker] BLOCKING RELOAD: Too many reloads detected!')
        console.error('[Error Tracker] Reload count:', reloadData.count)
        console.error('[Error Tracker] Last reload:', new Date(reloadData.lastReload).toISOString())
        console.error('[Error Tracker] Error log:', getErrorLog())
        return true
      } else {
        // Reset counter after cooldown
        localStorage.setItem(RELOAD_COUNT_KEY, JSON.stringify({ count: 0, lastReload: 0 }))
      }
    }
    
    return false
  } catch {
    return false
  }
}

export function recordReloadAttempt() {
  try {
    const reloadData = JSON.parse(localStorage.getItem(RELOAD_COUNT_KEY) || '{}')
    const now = Date.now()
    
    reloadData.count = (reloadData.count || 0) + 1
    reloadData.lastReload = now
    
    localStorage.setItem(RELOAD_COUNT_KEY, JSON.stringify(reloadData))
    
    console.warn(`[Error Tracker] Reload attempt #${reloadData.count} recorded`)
  } catch {}
}

export function resetReloadCounter() {
  try {
    localStorage.setItem(RELOAD_COUNT_KEY, JSON.stringify({ count: 0, lastReload: 0 }))
  } catch {}
}

// Auto-clear error log on successful page load (after 30 seconds)
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      // If page loaded successfully and stayed loaded, reset reload counter
      resetReloadCounter()
      
      // Also clear old errors if page has been stable for 30 seconds
      // This prevents old errors from cluttering the console
      try {
        const errors = getErrorLog()
        const now = Date.now()
        const OLD_ERROR_THRESHOLD = 5 * 60 * 1000 // 5 minutes
        
        // Filter out errors older than 5 minutes
        const recentErrors = errors.filter(err => {
          const errorTime = new Date(err.timestamp).getTime()
          return (now - errorTime) < OLD_ERROR_THRESHOLD
        })
        
        // If we have old errors, clear them
        if (recentErrors.length < errors.length) {
          if (recentErrors.length === 0) {
            clearErrorLog()
            console.log('[Error Tracker] Cleared old error log (page stable for 30s)')
          } else {
            localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(recentErrors))
            console.log(`[Error Tracker] Cleared ${errors.length - recentErrors.length} old error(s), kept ${recentErrors.length} recent`)
          }
        }
      } catch (_) {}
    }, 30000)
  })
}
