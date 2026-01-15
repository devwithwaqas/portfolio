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
    
    // Try direct fetch first (no custom headers to avoid preflight)
    // Cloudflare blocks OPTIONS preflight, so direct fetch will likely fail
    let response
    try {
      response = await fetch(ANALYTICS_API_ENDPOINT, {
        method: 'GET',
        // No custom headers to avoid OPTIONS preflight that Cloudflare blocks
        cache: 'default',
        mode: 'cors' // Explicitly request CORS
      })
    } catch (directError) {
      // Direct fetch failed (CORS blocked by Cloudflare) - try CORS proxies
      console.warn('[Analytics] Direct fetch blocked by CORS, trying proxies:', directError.message)
      
      // Try multiple CORS proxy services as fallbacks
      const proxies = [
        {
          name: 'corsproxy.io',
          url: `https://corsproxy.io/?${encodeURIComponent(ANALYTICS_API_ENDPOINT)}`
        },
        {
          name: 'allorigins.win',
          url: `https://api.allorigins.win/raw?url=${encodeURIComponent(ANALYTICS_API_ENDPOINT)}`
        },
        {
          name: 'cors-anywhere (herokuapp)',
          url: `https://cors-anywhere.herokuapp.com/${ANALYTICS_API_ENDPOINT}`
        }
      ]
      
      let lastError = directError
      for (const proxy of proxies) {
        try {
          console.log(`[Analytics] Trying proxy: ${proxy.name}`)
          response = await fetch(proxy.url, {
            method: 'GET',
            cache: 'default',
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
          })
          // If we get a response, break out of the loop
          if (response && response.status !== 500) {
            console.log(`[Analytics] Success with proxy: ${proxy.name}`)
            break
          } else {
            throw new Error(`Proxy ${proxy.name} returned ${response.status}`)
          }
        } catch (proxyError) {
          console.warn(`[Analytics] Proxy ${proxy.name} failed:`, proxyError.message)
          lastError = proxyError
          continue // Try next proxy
        }
      }
      
      // If all proxies failed, throw the last error
      if (!response || response.status === 500) {
        throw lastError
      }
    }

    console.log('[Analytics] Response status:', response.status, response.statusText)
    console.log('[Analytics] Response Content-Type:', response.headers.get('content-type'))

    // Check if response is actually JSON
    const contentType = response.headers.get('content-type') || ''
    const responseText = await response.text()
    
    if (!contentType.includes('application/json')) {
      // Response is not JSON - likely an HTML error page
      console.error('[Analytics] Non-JSON response received. Content-Type:', contentType)
      console.error('[Analytics] Response preview (first 500 chars):', responseText.substring(0, 500))
      throw new Error(`PHP endpoint returned HTML instead of JSON. Check server logs or PHP file.`)
    }

    if (!response.ok) {
      console.error('[Analytics] API error response:', responseText)
      throw new Error(`Analytics API error: ${response.status} - ${responseText.substring(0, 200)}`)
    }

    // Parse JSON response
    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error('[Analytics] Failed to parse JSON. Response:', responseText.substring(0, 500))
      throw new Error(`Invalid JSON response: ${parseError.message}`)
    }
    
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