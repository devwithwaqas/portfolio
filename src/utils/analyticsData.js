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

const PORTFOLIO_GA4_API_ENDPOINT = import.meta.env.VITE_PORTFOLIO_GA4_API_ENDPOINT || ''
const CACHE_KEY = 'analytics_data_cache'
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

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
        console.log('[Analytics] Using cached data (age: ' + Math.round(age / 1000 / 60) + ' minutes)')
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
      // Direct fetch failed (CORS blocked by Cloudflare) - try CORS proxies
      // Try multiple CORS proxy services as fallbacks
      const proxies = [
        {
          name: 'corsproxy.io',
          url: `https://corsproxy.io/?${encodeURIComponent(PORTFOLIO_GA4_API_ENDPOINT)}`
        },
        {
          name: 'allorigins.win',
          url: `https://api.allorigins.win/raw?url=${encodeURIComponent(PORTFOLIO_GA4_API_ENDPOINT)}`
        },
        {
          name: 'cors-anywhere (herokuapp)',
          url: `https://cors-anywhere.herokuapp.com/${PORTFOLIO_GA4_API_ENDPOINT}`
        }
      ]
      
      let lastError = directError
      for (const proxy of proxies) {
        try {
          response = await fetch(proxy.url, {
            method: 'GET',
            cache: 'default',
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
          })
          // If we get a response, break out of the loop
          if (response && response.status !== 500) {
            break
          } else {
            throw new Error(`Proxy ${proxy.name} returned ${response.status}`)
          }
        } catch (proxyError) {
          lastError = proxyError
          continue // Try next proxy
        }
      }
      
      // If all proxies failed, throw the last error
      if (!response || response.status === 500) {
        throw lastError
      }
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
      console.log('[Analytics] Data cached for 1 hour')
    } catch (e) {
      // Ignore cache errors (quota, private mode, etc.)
    }
    
    return result
  } catch (error) {
    // Fallback to mock data on error
    console.warn('[Analytics] Fetch failed, using mock data:', error.message)
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