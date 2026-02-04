/**
 * CORS Proxy Utility for Local Development
 * Uses Vite's built-in proxy (server-side) to bypass CORS completely
 * Only active in development mode (import.meta.env.DEV)
 */

const isDev = import.meta.env.DEV

/**
 * Convert Cloud Function URL to Vite proxy URL for local development
 * Vite proxy runs server-side and bypasses CORS completely (like Postman)
 * @param {string} url - Original Cloud Function URL
 * @returns {string} - Proxied URL in dev, original URL in production
 */
export function wrapWithCorsProxy(url) {
  if (!isDev || !url) {
    return url
  }

  // Check if URL is already proxied
  if (url.includes('/api/cloud-functions')) {
    return url
  }

  // Extract the function path from the full URL
  // e.g., https://us-central1-robust-builder-484406-b3.cloudfunctions.net/readPortfolioAnalytics
  // becomes /api/cloud-functions/readPortfolioAnalytics
  try {
    const urlObj = new URL(url)
    const functionPath = urlObj.pathname // e.g., /readPortfolioAnalytics
    return `/api/cloud-functions${functionPath}`
  } catch (e) {
    // If URL parsing fails, return original
    console.warn('[CORS Proxy] Failed to parse URL:', url, e)
    return url
  }
}

/**
 * Check if we should use CORS proxy
 * @returns {boolean}
 */
export function shouldUseCorsProxy() {
  return isDev
}
