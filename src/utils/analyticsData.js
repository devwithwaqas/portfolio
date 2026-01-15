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

const ANALYTICS_API_ENDPOINT = import.meta.env.VITE_ANALYTICS_API_ENDPOINT || ''

/**
 * Fetch analytics data from backend
 * @returns {Promise<{totalViews: number, topItems: Array}>}
 */
export async function fetchAnalyticsData() {
  // If no endpoint configured, return mock data for development
  if (!ANALYTICS_API_ENDPOINT) {
    console.warn('[Analytics] No API endpoint configured. Using mock data.')
    console.warn('[Analytics] Set VITE_ANALYTICS_API_ENDPOINT in GitHub Secrets')
    return getMockAnalyticsData()
  }

  try {
    console.log('[Analytics] Fetching from endpoint:', ANALYTICS_API_ENDPOINT)
    const response = await fetch(ANALYTICS_API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache for 5 minutes to avoid excessive API calls
      cache: 'default'
    })

    console.log('[Analytics] Response status:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Analytics] API error response:', errorText)
      throw new Error(`Analytics API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('[Analytics] Parsed data:', data)
    return {
      totalViews: data.totalViews || 0,
      topItems: data.topItems || []
    }
  } catch (error) {
    console.error('[Analytics] Failed to fetch analytics data:', error)
    console.error('[Analytics] Error details:', error.message)
    // Fallback to mock data on error
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
 * Format number with K/M suffixes for large numbers
 * @param {number} num 
 * @returns {string}
 */
export function formatViews(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}