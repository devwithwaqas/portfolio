/**
 * Microsoft Clarity – behavioral analytics (heatmaps, session recordings).
 * Firebase site only: waqasahmad-portfolio.web.app (NOT GitHub Pages "Waqas Ahmad portfolio").
 * Use the project ID for your "waqasahmad-portfolio" Clarity project. Delete the old
 * "Waqas Ahmad portfolio" (GitHub Pages) project in clarity.microsoft.com if both show the same URL.
 *
 * Clarity recommendations (dashboard-only): Masking settings; privacy = /privacy + footer.
 */

import Clarity from '@microsoft/clarity'

// Must be the project ID for waqasahmad-portfolio (Firebase). Set VITE_CLARITY_PROJECT_ID if different.
const PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID || 'v8ko15lcwu'

export function initClarity() {
  if (typeof window === 'undefined') return
  try {
    Clarity.init(PROJECT_ID)
  } catch (e) {
    if (import.meta.env?.DEV) console.warn('[Clarity] init failed:', e)
  }
}
