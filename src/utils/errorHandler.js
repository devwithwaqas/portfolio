/**
 * Global error handler.
 * - Dev: log full error to console for debugging.
 * - Prod: log only a generic message; never expose real errors on frontend.
 *   Optionally report to backend: set VITE_ERROR_REPORT_URL (e.g. Cloud Function
 *   or Firebase Crashlytics endpoint) to POST errors for logging.
 *
 * "Dev" = Vite dev server (import.meta.env.DEV) OR firebase-dev build (deploy:firebase:dev).
 * Both show full errors in console. Prod (firebase) hides them and reports to backend.
 */

const isDev = import.meta.env.DEV || import.meta.env.MODE === 'firebase-dev'
const REPORT_URL = import.meta.env.VITE_ERROR_REPORT_URL || ''

function reportToBackend(err, context) {
  if (!REPORT_URL || typeof fetch !== 'function') return
  try {
    const payload = {
      message: err?.message || String(err),
      context: context || 'app',
      url: typeof location !== 'undefined' ? location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    }
    fetch(REPORT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  } catch (_) {}
}

/**
 * Handle an error. In prod: generic console message only; never show real error.
 * @param {Error|unknown} err
 * @param {string} [context] - e.g. 'Vue', 'unhandledrejection', 'error'
 */
export function handleError(err, context = 'app') {
  if (isDev) {
    if (context && context !== 'app') {
      console.warn(`[${context}]`, err)
    } else {
      console.warn('[App]', err)
    }
    return
  }

  reportToBackend(err, context)
  // Prod: single generic message only; actual error never shown on frontend
  console.error('[App] An error occurred. It has been reported.')
}

export default handleError
