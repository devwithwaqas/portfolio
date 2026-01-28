/**
 * Google Analytics Data Fetcher
 * Fetches analytics data from PHP backend endpoint (ga4-analytics.php)
 * 
 * NOTE: GA4 data cannot be fetched directly from the frontend for security reasons.
 * Requires a PHP backend (ga4-analytics.php) that queries the Google Analytics Data API.
 * 
 * Setup: See docs/GA4_ANALYTICS_PHP_SETUP.md for ProFreeHost setup instructions
 * 
 * Backend endpoint should return:
 * {
 *   totalViews: number,
 *   topItems: [
 *     { name: string, views: number, url: string, type: 'project' | 'service' }
 *   ],
 *   cached: boolean
 * }
 */

import { wrapWithCorsProxy } from './corsProxy.js'

const PORTFOLIO_GA4_API_ENDPOINT_RAW = import.meta.env.VITE_PORTFOLIO_GA4_API_ENDPOINT || ''
// Wrap with CORS proxy for local development only
const PORTFOLIO_GA4_API_ENDPOINT = wrapWithCorsProxy(PORTFOLIO_GA4_API_ENDPOINT_RAW)
const CACHE_KEY = 'analytics_data_cache_v2' // v2: updated for combined Firebase+GitHub totals
const CACHE_DURATION = 2 * 60 * 1000 // 2 minutes in milliseconds (backend updates every minute, shorter cache for fresh data)

/**
 * Fetch analytics data from backend with caching to prevent rate limiting
 * @returns {Promise<{totalViews: number, topItems: Array}>}
 */
export async function fetchAnalyticsData() {
  // If no endpoint configured, return mock data for development
  if (!PORTFOLIO_GA4_API_ENDPOINT) {
    return getMockAnalyticsData()
  }

  // Check cache first
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      const age = Date.now() - timestamp
      if (age < CACHE_DURATION) {
        // Only log in development to avoid console spam
        if (import.meta.env.DEV) {
          console.log('[Analytics] Using cached data (age: ' + Math.round(age / 1000 / 60) + ' minutes)')
        }
        return data
      }
    }
  } catch (e) {
    // Ignore cache errors
  }

  try {
    // Try direct fetch first (no custom headers to avoid preflight)
    // Cloudflare blocks OPTIONS preflight, so direct fetch will likely fail
    let response
    try {
      response = await fetch(PORTFOLIO_GA4_API_ENDPOINT, {
        method: 'GET',
        // No custom headers to avoid OPTIONS preflight that Cloudflare blocks
        cache: 'default',
        mode: 'cors' // Explicitly request CORS
      })
    } catch (directError) {
      // Direct fetch failed (CORS blocked) - analytics are optional, fail gracefully
      // No proxy fallbacks - they require payment or are unreliable
      // Only log warning in development to avoid console spam in production
      if (import.meta.env.DEV) {
        console.warn('[Analytics] Direct fetch failed (CORS issue). Analytics are optional and will be skipped.', directError.message)
      }
      throw directError // Let it fall through to mock data gracefully
    }

    // Check if response is actually JSON
    const contentType = response.headers.get('content-type') || ''
    const responseText = await response.text()
    
    if (!contentType.includes('application/json')) {
      // Response is not JSON - likely an HTML error page
      throw new Error(`PHP endpoint returned HTML instead of JSON. Check server logs or PHP file.`)
    }

    if (!response.ok) {
      throw new Error(`Analytics API error: ${response.status} - ${responseText.substring(0, 200)}`)
    }

    // Parse JSON response
    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      throw new Error(`Invalid JSON response: ${parseError.message}`)
    }
    
    const result = {
      totalViews: data.totalViews || 0,
      topItems: data.topItems || []
    }
    
    // Cache the successful result
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: result,
        timestamp: Date.now()
      }))
      // Only log in development to avoid console spam
      if (import.meta.env.DEV) {
        console.log('[Analytics] Data cached for 5 minutes')
      }
    } catch (e) {
      // Ignore cache errors (quota, private mode, etc.)
    }
    
    return result
  } catch (error) {
    // Fallback to mock data on error
    // Only log warning in development to avoid console spam in production
    if (import.meta.env.DEV) {
      console.warn('[Analytics] Fetch failed, using mock data:', error.message)
    }
    return getMockAnalyticsData()
  }
}

/**
 * Mock analytics data for development/testing
 * Replace this with actual API call once backend is set up
 */
function getMockAnalyticsData() {
  return {
    totalViews: 0, // Will show 0 until backend is connected
    topItems: []
  }
}

/**
 * Format number as full integer (no K/M suffixes)
 * @param {number} num 
 * @returns {string}
 */
export function formatViews(num) {
  if (typeof num !== 'number' || isNaN(num)) {
    return '0'
  }
  // Return full number with thousand separators for readability
  return Math.round(num).toLocaleString('en-US')
}