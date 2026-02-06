/**
 * Microsoft Clarity – behavioral analytics (heatmaps, session recordings).
 *
 * Primary install: script tag in index.html (clarity.ms/tag/vcvk2ym4an). That’s what the dashboard
 * checks for “set up” and what sends POSTs to https://www.clarity.ms/collect. See:
 * https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup
 * https://learn.microsoft.com/en-us/clarity/setup-and-installation/troubleshooting-installation
 *
 * This module (NPM) runs in prod after app mount; if the script tag already loaded Clarity, init is
 * effectively a no-op. Kept for optional use of Identify/Custom Tags APIs later.
 *
 * "Not yet configured with analytics": Link GA4 in the Clarity dashboard (Settings → Setup →
 * Google Analytics integration → Get Started). Not in code.
 * https://learn.microsoft.com/en-us/clarity/ga-integration/ga4-integration
 */

import Clarity from '@microsoft/clarity'

const PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID || 'vcvk2ym4an'

export function initClarity() {
  if (typeof window === 'undefined') return
  try {
    Clarity.init(PROJECT_ID)
  } catch (e) {
    if (import.meta.env?.DEV) console.warn('[Clarity] init failed:', e)
  }
}
