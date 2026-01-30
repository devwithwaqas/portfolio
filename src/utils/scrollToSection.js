/**
 * Centralized scroll-to-section utility
 * All components should use this for uniform scroll behavior
 */

// Section top at viewport top (0 = exact top)
const VIEWPORT_TOP = 0
const MAX_RETRIES = 12
const RETRY_DELAY = 150
const POSITION_TOLERANCE = 5

/**
 * Scrolls to a section by ID with proper timing and position calculation
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} retryCount - Internal retry counter (don't pass this)
 * @returns {void}
 */
export function scrollToSection(sectionId, retryCount = 0) {
  if (typeof window === 'undefined') return
  
  // Special handling for hero section - just scroll to top
  if (sectionId === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  
  const element = document.getElementById(sectionId)
  
  if (!element) {
    // Element not found - retry if we haven't exceeded max retries
    if (retryCount < MAX_RETRIES) {
      setTimeout(() => scrollToSection(sectionId, retryCount + 1), RETRY_DELAY * (retryCount + 1))
    }
    return
  }
  
  // Use getBoundingClientRect + scrollY for correct document position
  // offsetTop is relative to offsetParent (e.g., .main-content), not document
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect()
      const scrollY = window.pageYOffset || window.scrollY || 0
      const targetScrollPosition = rect.top + scrollY - VIEWPORT_TOP

      // If rect.top is 0 and we're not at the hero section, layout may not be ready
      if (rect.top === 0 && sectionId !== 'hero' && retryCount < MAX_RETRIES) {
        setTimeout(() => scrollToSection(sectionId, retryCount + 1), RETRY_DELAY * (retryCount + 1))
        return
      }

      if (targetScrollPosition >= 0) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: targetScrollPosition, behavior: 'smooth' })

          // After smooth scroll completes, fine-tune so section top is at viewport top
          setTimeout(() => {
            requestAnimationFrame(() => {
              const finalRect = element.getBoundingClientRect()
              const finalScrollY = window.pageYOffset || window.scrollY || 0
              const sectionTopInViewport = finalRect.top

              if (Math.abs(sectionTopInViewport - VIEWPORT_TOP) > POSITION_TOLERANCE) {
                const adjustment = sectionTopInViewport - VIEWPORT_TOP
                window.scrollTo({
                  top: finalScrollY + adjustment,
                  behavior: 'instant' // Instant so user sees final position, no second animation
                })
              }
            })
          }, 600) // Smooth scroll takes ~500ms
        })
      } else if (retryCount < MAX_RETRIES) {
        // Invalid position - retry
        setTimeout(() => scrollToSection(sectionId, retryCount + 1), RETRY_DELAY * (retryCount + 1))
      }
    })
  })
}

/**
 * Navigate to home page and scroll to a section
 * Use this when you're on a different page (service/project/privacy)
 * @param {Object} router - Vue Router instance
 * @param {string} sectionId - The ID of the section to scroll to
 * @returns {Promise<void>}
 */
export async function navigateToSection(router, sectionId) {
  if (!router) {
    console.warn('[scrollToSection] Router not provided')
    return
  }
  
  // If already on home, just scroll
  if (router.currentRoute.value.path === '/') {
    // Use hash to trigger Home.vue's scroll handler (for consistency)
    window.location.hash = sectionId
    // Also trigger scroll directly as fallback
    scrollToSection(sectionId)
    return
  }
  
  // Store section so Home.vue can scroll to it after navigation
  try {
    sessionStorage.setItem('home:hashSection', sectionId)
    sessionStorage.setItem('home:scrollPending', 'true')
  } catch (e) {
    // Ignore storage errors
  }

  // Navigate to home with hash; router scrolls to top first, then Home.vue scrolls to section
  await router.push(`/#${sectionId}`)

  // Fallback: ensure scroll to section happens if Home.vue watchers miss it
  setTimeout(() => {
    if (router.currentRoute.value.path === '/' && router.currentRoute.value.hash === `#${sectionId}`) {
      const element = document.getElementById(sectionId)
      if (element) {
        scrollToSection(sectionId)
      }
    }
  }, 400)
}
