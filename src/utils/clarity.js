/**
 * Microsoft Clarity – behavioral analytics (heatmaps, session recordings).
 * Uses @microsoft/clarity npm package. Init from main.js.
 * Project ID: v8ko15lcwu (Bing Webmaster / clarity.microsoft.com)
 */

import Clarity from '@microsoft/clarity'

const PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID || 'v8ko15lcwu'

export function initClarity() {
  if (typeof window === 'undefined') return
  try {
    Clarity.init(PROJECT_ID)
  } catch (e) {
    if (import.meta.env?.DEV) console.warn('[Clarity] init failed:', e)
  }
}
