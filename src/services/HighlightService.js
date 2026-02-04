/**
 * Unified Highlight Service
 * Single source of truth for all diagram highlighting
 */
class HighlightService {
  constructor() {
    this.isActive = false
    this.currentHighlights = []
    this.svgElement = null
    this.panzoomInstance = null
  }

  /**
   * Initialize the service with SVG element and panzoom instance
   */
  init(svgElement, panzoomInstance) {
    this.svgElement = svgElement
    this.panzoomInstance = panzoomInstance
    this.injectHighlightStyles()
  }

  /**
   * Inject highlight styles into the SVG document
   */
  injectHighlightStyles() {
    if (!this.svgElement) return

    const doc = this.svgElement.ownerDocument || document
    if (doc.querySelector('style[data-unified-highlight]')) return

    const style = doc.createElement('style')
    style.setAttribute('data-unified-highlight', '1')
    style.textContent = `
      .unified-highlight {
        outline: 3px solid #f59e0b !important;
        outline-offset: 2px !important;
        stroke: #f59e0b !important;
        stroke-width: 3 !important;
        filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.6)) !important;
        transition: all 0.3s ease !important;
      }
      
      .unified-highlight-flow {
        stroke: #22c55e !important;
        stroke-width: 3 !important;
        fill: none !important;
        stroke-dasharray: 6 6 !important;
        animation: unified-dash 1.2s linear infinite !important;
      }
      
      @keyframes unified-dash {
        to { stroke-dashoffset: -12; }
      }
    `

    if (doc.head) {
      doc.head.appendChild(style)
    } else if (this.svgElement.parentNode) {
      this.svgElement.parentNode.insertBefore(style, this.svgElement)
    }
  }

  /**
   * Highlight a specific element
   */
  highlightElement(selector, options = {}) {
    if (!this.svgElement) return

    this.clearAllHighlights()

    const element = this.svgElement.querySelector(selector)
    if (!element) {
      console.warn(`Element not found: ${selector}`)
      return
    }

    // Add highlight class
    element.classList.add('unified-highlight')
    
    // Add to current highlights
    this.currentHighlights.push({
      element,
      selector,
      type: 'element',
      ...options
    })

    // Zoom to element if requested
    if (options.zoom && this.panzoomInstance) {
      this.zoomToElement(element, options.zoomPadding || 64)
    }

    this.isActive = true
    return element
  }

  /**
   * Highlight multiple elements (for flows)
   */
  highlightFlow(selectors, options = {}) {
    if (!this.svgElement) return

    this.clearAllHighlights()

    const elements = selectors.map(selector => {
      const element = this.svgElement.querySelector(selector)
      if (element) {
        element.classList.add('unified-highlight-flow')
        return { element, selector, type: 'flow' }
      }
      return null
    }).filter(Boolean)

    this.currentHighlights = elements

    // Zoom to show all elements if requested
    if (options.zoom && this.panzoomInstance && elements.length > 0) {
      this.zoomToElements(elements.map(e => e.element), options.zoomPadding || 80)
    }

    this.isActive = true
    return elements
  }

  /**
   * Clear all highlights
   */
  clearAllHighlights() {
    if (!this.svgElement) return

    // Remove all highlight classes
    const highlightedElements = this.svgElement.querySelectorAll('.unified-highlight, .unified-highlight-flow')
    highlightedElements.forEach(el => {
      el.classList.remove('unified-highlight', 'unified-highlight-flow')
    })

    // Clear state
    this.currentHighlights = []
    this.isActive = false
  }

  /**
   * Zoom to a specific element
   */
  zoomToElement(element, padding = 64) {
    if (!this.panzoomInstance || !element) return

    try {
      const rect = element.getBoundingClientRect()
      const containerRect = this.panzoomInstance.getContainer().getBoundingClientRect()
      
      const scaleX = (containerRect.width - padding * 2) / rect.width
      const scaleY = (containerRect.height - padding * 2) / rect.height
      const scale = Math.min(scaleX, scaleY, 1)

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      this.panzoomInstance.zoomAtPoint(scale, { x: centerX, y: centerY })
    } catch (error) {
      console.warn('Error zooming to element:', error)
    }
  }

  /**
   * Zoom to show multiple elements
   */
  zoomToElements(elements, padding = 80) {
    if (!this.panzoomInstance || !elements.length) return

    try {
      const rects = elements.map(el => el.getBoundingClientRect())
      const minX = Math.min(...rects.map(r => r.left))
      const minY = Math.min(...rects.map(r => r.top))
      const maxX = Math.max(...rects.map(r => r.right))
      const maxY = Math.max(...rects.map(r => r.bottom))

      const width = maxX - minX
      const height = maxY - minY
      const centerX = minX + width / 2
      const centerY = minY + height / 2

      const containerRect = this.panzoomInstance.getContainer().getBoundingClientRect()
      const scaleX = (containerRect.width - padding * 2) / width
      const scaleY = (containerRect.height - padding * 2) / height
      const scale = Math.min(scaleX, scaleY, 1)

      this.panzoomInstance.zoomAtPoint(scale, { x: centerX, y: centerY })
    } catch (error) {
      console.warn('Error zooming to elements:', error)
    }
  }

  /**
   * Get current highlight state
   */
  getState() {
    return {
      isActive: this.isActive,
      currentHighlights: this.currentHighlights,
      count: this.currentHighlights.length
    }
  }

  /**
   * Destroy the service
   */
  destroy() {
    this.clearAllHighlights()
    this.svgElement = null
    this.panzoomInstance = null
  }
}

// Create singleton instance
const highlightService = new HighlightService()

export default highlightService
