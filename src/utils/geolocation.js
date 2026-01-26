/**
 * Geolocation Utility
 * Detects user's country based on IP address
 * Uses free IP geolocation API (ipapi.co)
 */

const GEO_CACHE_KEY = 'portfolio_geo_cache'
const GEO_CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

/**
 * Get cached geolocation data
 */
function getCachedGeo() {
  try {
    const cached = sessionStorage.getItem(GEO_CACHE_KEY)
    if (cached) {
      const data = JSON.parse(cached)
      const now = Date.now()
      if (now - data.timestamp < GEO_CACHE_DURATION) {
        return data.country
      }
    }
  } catch (error) {
    // Ignore cache errors
  }
  return null
}

/**
 * Cache geolocation data
 */
function setCachedGeo(country) {
  try {
    sessionStorage.setItem(GEO_CACHE_KEY, JSON.stringify({
      country,
      timestamp: Date.now()
    }))
  } catch (error) {
    // Ignore cache errors
  }
}

/**
 * Detect if user is from Malaysia
 * @returns {Promise<boolean>} True if user is from Malaysia, false otherwise
 */
export async function isUserFromMalaysia() {
  // Check cache first
  const cached = getCachedGeo()
  if (cached !== null) {
    return cached === 'MY'
  }

  try {
    // Use ipapi.co free API (no API key required, 1000 requests/day)
    // Fallback to ip-api.com if first fails
    const response = await Promise.race([
      fetch('https://ipapi.co/json/', { 
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      }).catch(() => null),
      // Fallback with timeout
      new Promise((resolve) => setTimeout(() => resolve(null), 3000))
    ])

    if (response && response.ok) {
      const data = await response.json()
      const country = data.country_code || data.country
      
      if (country) {
        setCachedGeo(country)
        return country === 'MY'
      }
    }

    // Fallback to ip-api.com (use HTTPS)
    const fallbackResponse = await fetch('https://ip-api.com/json/?fields=countryCode', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    }).catch(() => null)

    if (fallbackResponse && fallbackResponse.ok) {
      const data = await fallbackResponse.json()
      const country = data.countryCode
      
      if (country) {
        setCachedGeo(country)
        return country === 'MY'
      }
    }
  } catch (error) {
    // Silently fail - default to global
    console.warn('[Geolocation] Failed to detect location:', error.message)
  }

  // Default to global (not Malaysia) if detection fails
  return false
}

/**
 * Get resume file paths based on location
 * @returns {Object} Object with fullResume and onePageResume paths
 * Note: Paths are relative to public folder, will be processed by assetPath utility
 */
export function getResumePaths(isMalaysia) {
  if (isMalaysia) {
    return {
      fullResume: 'downloads/Waqas_Ahmad_Resume_myf.pdf',
      onePageResume: 'downloads/Waqas_Ahmad_Resume_myf1.pdf',
      fullResumeName: 'Waqas_Ahmad_Resume_myf.pdf',
      onePageResumeName: 'Waqas_Ahmad_Resume_myf1.pdf'
    }
  } else {
    return {
      fullResume: 'downloads/Waqas_Ahmad_Resume_glf.pdf',
      onePageResume: 'downloads/Waqas_Ahmad_Resume_gl1.pdf',
      fullResumeName: 'Waqas_Ahmad_Resume_glf.pdf',
      onePageResumeName: 'Waqas_Ahmad_Resume_gl1.pdf'
    }
  }
}
