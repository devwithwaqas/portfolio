<template>
  <Teleport to="body">
    <div 
      v-if="visible && step" 
      class="narration-bubble"
      :style="bubbleStyle"
    >
      <div class="bubble-header">
        <img 
          v-if="step.icon"
          :src="`/assets/img/Icons/${step.icon}`"
          alt="Icon"
          class="bubble-icon icon-2xl icon-wrapper-2xl"
        />
        <h4 class="bubble-title txt-h4-lg">{{ step.title }}</h4>
      </div>
      <p class="bubble-description txt-p-md">{{ step.description }}</p>
      <div class="bubble-footer">
        <div class="bubble-progress">
          <span class="txt-label-sm">Step {{ stepIndex + 1 }} of {{ totalSteps }}</span>
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
    isAutoPlaying: {
      type: Boolean,
      default: false
    },
    isNarrating: {
      type: Boolean,
      default: false
    },
    estimatedDuration: {
      type: Number,
      default: 0
    },
    speechProgress: {
      type: Number,
      default: 0
    },
    estimatedTimeRemaining: {
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
      bubbleStyle: {}
    }
  },
  computed: {
    progressBarWidth() {
      return `${this.speechProgress}%`
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
    containerElement: {
      immediate: true,
      handler() {
        if (this.visible) {
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
            console.log('[NarrationBubble] Step changed, recalculating position')
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
            console.log('[NarrationBubble] Step index changed to:', newVal)
            this.updateBubblePosition()
          })
        }
      }
    }
  },
  methods: {
    updateBubblePosition() {
      if (!this.containerElement || !this.step || !this.step.highlights || this.step.highlights.length === 0) {
        // Fallback to default positioning if no highlights
        this.positionBubbleDefault()
        return
      }
      
      // Get the first highlight area (primary focus)
      const highlight = this.step.highlights[0]
      
      // Calculate the best position to avoid covering the highlight
      const bestPosition = this.calculateBestPosition(highlight)
      
      console.log(`[NarrationBubble] Positioning bubble at ${bestPosition.position}: left: ${bestPosition.left}px, top: ${bestPosition.top}px`)
      
      this.bubbleStyle = {
        position: 'fixed',
        left: `${bestPosition.left}px`,
        top: `${bestPosition.top}px`,
        zIndex: 10000
      }
    },
    
    calculateBestPosition(highlight) {
      const containerRect = this.containerElement.getBoundingClientRect()
      
      // Calculate highlight position in screen coordinates
      const svgWidth = containerRect.width
      const svgHeight = containerRect.height
      
      // Convert SVG coordinates to screen coordinates
      const scaleX = svgWidth / 2400  // Assuming SVG viewBox width is 2400
      const scaleY = svgHeight / 2200 // Assuming SVG viewBox height is 2200
      
      const highlightScreenX = containerRect.left + (highlight.x * scaleX)
      const highlightScreenY = containerRect.top + (highlight.y * scaleY)
      const highlightScreenWidth = highlight.width * scaleX
      const highlightScreenHeight = highlight.height * scaleY
      
      // Bubble dimensions
      const bubbleWidth = 400
      const bubbleHeight = 200
      const padding = 20
      
      // Define possible positions (priority order)
      const positions = [
        {
          name: 'right',
          left: highlightScreenX + highlightScreenWidth + padding,
          top: highlightScreenY + (highlightScreenHeight / 2) - (bubbleHeight / 2)
        },
        {
          name: 'left',
          left: highlightScreenX - bubbleWidth - padding,
          top: highlightScreenY + (highlightScreenHeight / 2) - (bubbleHeight / 2)
        },
        {
          name: 'bottom',
          left: highlightScreenX + (highlightScreenWidth / 2) - (bubbleWidth / 2),
          top: highlightScreenY + highlightScreenHeight + padding
        },
        {
          name: 'top',
          left: highlightScreenX + (highlightScreenWidth / 2) - (bubbleWidth / 2),
          top: highlightScreenY - bubbleHeight - padding
        },
        {
          name: 'top-right',
          left: highlightScreenX + highlightScreenWidth + padding,
          top: highlightScreenY - bubbleHeight - padding
        },
        {
          name: 'top-left',
          left: highlightScreenX - bubbleWidth - padding,
          top: highlightScreenY - bubbleHeight - padding
        },
        {
          name: 'bottom-right',
          left: highlightScreenX + highlightScreenWidth + padding,
          top: highlightScreenY + highlightScreenHeight + padding
        },
        {
          name: 'bottom-left',
          left: highlightScreenX - bubbleWidth - padding,
          top: highlightScreenY + highlightScreenHeight + padding
        }
      ]
      
      // Score each position based on available space and visibility
      const scoredPositions = positions.map(pos => {
        const score = this.scorePosition(pos, bubbleWidth, bubbleHeight, highlightScreenX, highlightScreenY, highlightScreenWidth, highlightScreenHeight)
        return { ...pos, score }
      })
      
      // Sort by score (highest first)
      scoredPositions.sort((a, b) => b.score - a.score)
      
      // Return the best position with constraints applied
      const bestPos = scoredPositions[0]
      return {
        position: bestPos.name,
        left: Math.max(10, Math.min(window.innerWidth - bubbleWidth - 10, bestPos.left)),
        top: Math.max(10, Math.min(window.innerHeight - bubbleHeight - 10, bestPos.top))
      }
    },
    
    scorePosition(pos, bubbleWidth, bubbleHeight, highlightX, highlightY, highlightWidth, highlightHeight) {
      let score = 100
      
      // Check if position is within viewport
      const isInViewportX = pos.left >= 0 && (pos.left + bubbleWidth) <= window.innerWidth
      const isInViewportY = pos.top >= 0 && (pos.top + bubbleHeight) <= window.innerHeight
      
      if (!isInViewportX) score -= 50
      if (!isInViewportY) score -= 50
      
      // Check if bubble overlaps with highlight
      const bubbleRight = pos.left + bubbleWidth
      const bubbleBottom = pos.top + bubbleHeight
      const highlightRight = highlightX + highlightWidth
      const highlightBottom = highlightY + highlightHeight
      
      const overlapsX = !(bubbleRight < highlightX || pos.left > highlightRight)
      const overlapsY = !(bubbleBottom < highlightY || pos.top > highlightBottom)
      
      if (overlapsX && overlapsY) {
        score -= 80 // Heavy penalty for covering the highlight
      }
      
      // Prefer right and bottom positions (more natural reading flow)
      if (pos.name === 'right') score += 20
      if (pos.name === 'bottom') score += 15
      if (pos.name === 'bottom-right') score += 10
      
      // Prefer positions with more space
      const spaceLeft = pos.left
      const spaceRight = window.innerWidth - (pos.left + bubbleWidth)
      const spaceTop = pos.top
      const spaceBottom = window.innerHeight - (pos.top + bubbleHeight)
      
      const minSpace = Math.min(spaceLeft, spaceRight, spaceTop, spaceBottom)
      score += Math.min(minSpace / 10, 20) // Bonus for having space (capped at 20)
      
      return score
    },
    
    positionBubbleDefault() {
      if (!this.containerElement) return
      
      const containerRect = this.containerElement.getBoundingClientRect()
      
      // Default: position on the right side of the screen, vertically centered
      const bubbleLeft = Math.min(window.innerWidth - 450, containerRect.right + 20)
      const bubbleTop = Math.max(100, Math.min(window.innerHeight - 300, containerRect.top + 100))
      
      this.bubbleStyle = {
        position: 'fixed',
        left: `${bubbleLeft}px`,
        top: `${bubbleTop}px`,
        zIndex: 10000
      }
    }
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
  flex: 1;
  font-weight: 600;
}

.bubble-description {
  color: #e0e7ff;
  margin: 0 0 16px 0;
  line-height: 1.6;
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

.auto-play-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #2ed573;
  font-weight: 500;
}

.auto-play-indicator i {
  font-size: 14px;
}

/* Dynamic Speech Progress Bar */
.speech-progress-container {
  margin-top: 12px;
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
