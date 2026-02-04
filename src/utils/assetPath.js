/**
 * Asset Path Utility
 * Ensures all asset paths respect Vite's base URL configuration
 * This is critical for GitHub Pages deployment where the app is served from a subpath
 */

/**
 * Get the base URL from Vite's environment
 * In development: '/'
 * In production with base: '/portfolio/': '/portfolio/'
 */
const BASE_URL = import.meta.env.BASE_URL || '/'

/**
 * Resolves an asset path relative to the base URL
 * @param {string} path - Asset path (e.g., '/assets/img/icon.png' or 'assets/img/icon.png')
 * @returns {string} - Resolved path with base URL prepended
 * 
 * @example
 * assetPath('/assets/img/icon.png') // '/portfolio/assets/img/icon.png' (in production)
 * assetPath('assets/img/icon.png')  // '/portfolio/assets/img/icon.png' (in production)
 */
export function assetPath(path) {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Ensure base URL ends with / and path doesn't start with /
  const base = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`
  
  return `${base}${cleanPath}`
}

/**
 * Resolves an asset path (alias for assetPath for convenience)
 */
export const getAssetPath = assetPath
