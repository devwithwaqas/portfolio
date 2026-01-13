<template>
  <Teleport to="body">
    <div 
      v-if="visible && step" 
      class="narration-bubble"
      :style="bubbleStyle"
    >
      <div class="bubble-header">
        <img 
          v-if="resolvedIcon"
          :src="resolvedIcon"
          alt="Icon"
          class="bubble-icon icon-2xl icon-wrapper-2xl"
        />
        <h4 class="bubble-title txt-h4-lg">{{ step.title }}</h4>
      </div>
      <p class="bubble-description txt-p-md">{{ step.description }}</p>
      <div class="bubble-footer">
        <div class="bubble-progress">
          <span class="txt-label-sm step-counter">Step {{ (stepIndex || 0) + 1 }} of {{ totalSteps || 0 }}</span>
          <span v-if="isAutoPlaying" class="txt-label-sm auto-play-indicator">
            <i class="bi bi-play-circle-fill"></i> Auto
          </span>
        </div>
        
        <!-- Dynamic Speech Progress Bar -->
        <div v-if="isNarrating && estimatedDuration > 0" class="speech-progress-container">
          <div class="speech-progress-bar">
            <div 
              class="speech-progress-fill" 
              :style="{ width: progressBarWidth }"
            ></div>
          </div>
          <div class="speech-progress-info">
            <span class="txt-label-xs">{{ Math.round(estimatedTimeRemaining) }}s remaining</span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { DEBUG_CONFIG } from '@/config/constants'
import { resolveIcon, getDeviconSvgUrl } from '@/utils/iconResolver'

export default {
  name: 'NarrationBubble',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    step: {
      type: Object,
      default: null
    },
    stepIndex: {
      type: Number,
      default: 0
    },
    totalSteps: {
      type: Number,
      default: 0
    },
    isNarrating: {
      type: Boolean,
      default: false
    },
    isAutoPlaying: {
      type: Boolean,
      default: false
    },
    estimatedDuration: {
      type: Number,
      default: 0
    },
    estimatedTimeRemaining: {
      type: Number,
      default: 0
    },
    speechProgress: {
      type: Number,
      default: 0
    },
    containerElement: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      bubbleStyle: {},
      // Debug flag to control console logging
      debugMode: import.meta.env.DEV // Only debug in development
    }
  },
  computed: {
    DEBUG() {
      return DEBUG_CONFIG.FullscreenDiagramIssue
    },
    progressBarWidth() {
      return `${this.speechProgress}%`
    },
    resolvedIcon() {
      if (!this.step) return null
      
      // Use the generic icon resolver
      const iconText = this.step.icon || this.step.title || ''
      
      try {
        const iconResult = resolveIcon(iconText, this.step.title)
        
        if (iconResult && iconResult.src) {
          // Handle devicon types by generating the full CDN URL
          if (iconResult.type === 'devicon') {
            return getDeviconSvgUrl(iconResult.src)
          }
          // For local icons, use the src directly
          return iconResult.src
        }
      } catch (error) {
        console.warn('[NarrationBubble] Icon resolution failed:', error)
      }
      
      return null
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            this.updateBubblePosition()
          })
        }
      }
    },
    step: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (newVal && this.visible) {
          this.$nextTick(() => {
            this.debugLog('Step changed, recalculating position')
            this.updateBubblePosition()
          })
        }
      }
    },
    stepIndex: {
      immediate: true,
      handler(newVal) {
        if (this.visible) {
          this.$nextTick(() => {
            this.debugLog('Step index changed to:', newVal)
            this.updateBubblePosition()
          })
        }
      }
    }
  },
  methods: {
    // Debug logging helper
    debugLog(message, ...args) {
      if (this.debugMode) {
        console.log(`[NarrationBubble] ${message}`, ...args)
      }
    },
    
    debugWarn(message, ...args) {
      if (this.debugMode) {
        console.warn(`[NarrationBubble] ${message}`, ...args)
      }
    },

    updateBubblePosition() {
      if (!this.visible || !this.step) return
      
      const bubbleWidth = 400
      const bubbleHeight = 200
      const padding = 20
      const toolbarHeight = 100
      
      // Get highlight position in SVG coordinates to determine which half it's in
      let highlightSide = 'center'
      if (this.step.highlights && this.step.highlights.length > 0) {
        const highlight = this.step.highlights[0]
        const highlightCenterX = highlight.x + highlight.width / 2
        
        // Get actual SVG dimensions from parent DiagramViewer
        let svgWidth = 2403  // Default HeatExchanger width
        if (this.containerElement) {
          const svg = this.containerElement.querySelector('svg')
          if (svg) {
            const viewBox = svg.getAttribute('viewBox')
            if (viewBox) {
              const [, , width] = viewBox.split(' ').map(Number)
              svgWidth = width
            }
          }
        }
        
        const diagramCenter = svgWidth / 2
        
        // Use the same logic as DiagramViewer to determine highlight side
        if (highlightCenterX < diagramCenter) {
          highlightSide = 'left'  // Highlight is in left half of diagram
        } else {
          highlightSide = 'right' // Highlight is in right half of diagram
        }
      }
      
      // Position bubble opposite to highlight side
      if (highlightSide === 'left') {
        // Highlight is in left half, position bubble on right side
        this.bubbleStyle = {
          position: 'fixed',
          right: `${padding}px`,
          top: `${toolbarHeight + padding}px`,
          zIndex: 10001,
          maxWidth: `${bubbleWidth}px`,
          minWidth: '300px',
          maxHeight: 'calc(100vh - 140px)',
          overflowY: 'auto'
        }
      } else if (highlightSide === 'right') {
        // Highlight is in right half, position bubble on left side
        this.bubbleStyle = {
          position: 'fixed',
          left: `${padding}px`,
          top: `${toolbarHeight + padding}px`,
          zIndex: 10001,
          maxWidth: `${bubbleWidth}px`,
          minWidth: '300px',
          maxHeight: 'calc(100vh - 140px)',
          overflowY: 'auto'
        }
      } else {
        // Default to top-right if we can't determine
        this.bubbleStyle = {
          position: 'fixed',
          right: `${padding}px`,
          top: `${toolbarHeight + padding}px`,
          zIndex: 10001,
          maxWidth: `${bubbleWidth}px`,
          minWidth: '300px',
          maxHeight: 'calc(100vh - 140px)',
          overflowY: 'auto'
        }
      }
      
      if (this.DEBUG) {
        this.debugLog('Dynamic positioning:', {
          highlightSide: highlightSide,
          bubblePosition: highlightSide === 'left' ? 'right' : 'left',
          highlightCenterX: this.step.highlights?.[0] ? this.step.highlights[0].x + this.step.highlights[0].width / 2 : 'none',
          svgWidth: this.containerElement ? this.containerElement.querySelector('svg')?.getAttribute('viewBox')?.split(' ')[2] : 'default',
          diagramCenter: this.containerElement ? this.containerElement.querySelector('svg')?.getAttribute('viewBox')?.split(' ')[2] / 2 : 1201.5
        })
      }
    },
  }
}
</script>

<style scoped>
.narration-bubble {
  position: fixed;
  background: linear-gradient(135deg, rgba(30, 20, 50, 0.98), rgba(45, 30, 70, 0.95));
  border: 1px solid rgba(139, 92, 246, 0.6);
  border-radius: 16px;
  padding: 20px;
  max-width: 400px;
  min-width: 320px;
  backdrop-filter: blur(20px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  pointer-events: none;
  animation: bubbleIn 0.3s ease-out;
  z-index: 10000;
}

@keyframes bubbleIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.bubble-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.bubble-icon {
  flex-shrink: 0;
  object-fit: contain;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bubble-title {
  color: #ffffff;
  margin: 0;
  font-weight: 600;
  line-height: 1.3;
}

.bubble-description {
  color: #e0e0e0;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.bubble-footer {
  border-top: 1px solid rgba(139, 92, 246, 0.3);
  padding-top: 12px;
}

.bubble-progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.step-counter {
  color: #ffffff;
  font-weight: 500;
}

.auto-play-indicator {
  color: #22c55e;
  display: flex;
  align-items: center;
  gap: 4px;
}

.auto-play-indicator i {
  font-size: 0.8rem;
}

/* Speech Progress Bar */
.speech-progress-container {
  margin-top: 8px;
}

.speech-progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(139, 92, 246, 0.2);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 6px;
}

.speech-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8b5cf6, #22c55e);
  border-radius: 3px;
  transition: width 0.05s linear;
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.4);
}

.speech-progress-info {
  display: flex;
  justify-content: center;
  align-items: center;
}

.speech-progress-info .txt-label-xs {
  color: #a0a0a0;
  font-size: 0.7rem;
}
</style>