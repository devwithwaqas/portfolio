<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="visible" 
        class="image-preview-modal"
        @click.self="close"
      >
        <!-- Close Button -->
        <button class="close-btn" @click="close" aria-label="Close">
          <img :src="$assetPath('/assets/img/Icons/close.png')" alt="Close" class="icon-img-2xl" />
        </button>

        <!-- Zoom Wrapper -->
        <div class="zoom-wrapper">
          <img 
            ref="zoomImage"
            :src="imageSrc" 
            :alt="imageAlt"
            class="preview-image"
            draggable="false"
            @dragstart.prevent
            @dblclick.prevent="reset"
          />
        </div>

        <!-- Toolbar -->
        <div class="toolbar">
          <button @click="zoomIn" class="toolbar-btn" aria-label="Zoom In">
            <i class="bi bi-zoom-in icon-lg"></i>
          </button>
          <button @click="zoomOut" class="toolbar-btn" aria-label="Zoom Out">
            <i class="bi bi-zoom-out icon-lg"></i>
          </button>
          <button @click="reset" class="toolbar-btn" aria-label="Reset">
            <i class="bi bi-arrow-repeat icon-lg"></i>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import Panzoom from '@panzoom/panzoom'

export default {
  name: 'ImagePreview',
  props: {
    imageSrc: {
      type: String,
      required: true
    },
    imageAlt: {
      type: String,
      default: 'Preview'
    }
  },
  data() {
    return {
      visible: false,
      panzoomInstance: null
    }
  },
  methods: {
    show() {
      this.visible = true
      document.body.style.overflow = 'hidden'
      this.$nextTick(() => {
        this.initPanzoom()
      })
    },
    close() {
      this.visible = false
      document.body.style.overflow = ''
      if (this.panzoomInstance) {
        this.panzoomInstance.destroy()
        this.panzoomInstance = null
      }
    },
    initPanzoom() {
      if (!this.$refs.zoomImage) return
      
      const img = this.$refs.zoomImage
      const wrapper = img.parentElement
      
      // Wait for image to load
      if (!img.complete) {
        img.onload = () => this.initPanzoom()
        return
      }
      
      // Calculate scale to fit image in wrapper
      const wrapperRect = wrapper.getBoundingClientRect()
      const widthScale = wrapperRect.width / img.naturalWidth
      const heightScale = wrapperRect.height / img.naturalHeight
      const fitScale = Math.min(widthScale, heightScale)
      
      if (import.meta.env.DEV) {
        console.log('🖼️ PANZOOM INIT:', {
          imageNaturalWidth: img.naturalWidth,
          imageNaturalHeight: img.naturalHeight,
          wrapperWidth: wrapperRect.width,
          wrapperHeight: wrapperRect.height,
          fitScale: fitScale.toFixed(3)
        })
      }
      
      // Initialize panzoom on the IMAGE element
      this.panzoomInstance = Panzoom(img, {
        maxScale: 5,
        minScale: 0.05,
        cursor: 'move',
        canvas: false,
        startScale: fitScale,
        startX: 0,
        startY: 0,
        panOnlyWhenZoomed: true,
        noBind: true  // Disable panzoom's built-in touch/pointer handlers
      })
      
      // Track pinch and pan state
      this.initialPinchDistance = 0
      this.initialPinchScale = fitScale
      this.justFinishedPinch = false
      this.panStartX = null
      this.panStartY = null
      this.panStartImageX = null
      this.panStartImageY = null
      
      // Log scale changes and keep image centered
      img.addEventListener('panzoomchange', (e) => {
        if (import.meta.env.DEV) {
          console.log('📏 SCALE CHANGED:', {
            scale: e.detail.scale.toFixed(3),
            x: e.detail.x.toFixed(1),
            y: e.detail.y.toFixed(1)
          })
        }
        
        // If image is at or below fit scale, reset pan to center
        if (e.detail.scale <= fitScale * 1.1) {
          this.panzoomInstance.pan(0, 0, { force: true })
        }
      })
      
      // Handle wheel events (touchpad pinch) - MUST prevent default
      this.onWheelPreventPinch = (e) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          e.stopPropagation()
          if (import.meta.env.DEV) {
            console.log('🖱️ WHEEL EVENT:', { ctrlKey: e.ctrlKey, deltaY: e.deltaY })
          }
          
          // Manually zoom without pan
          const currentScale = this.panzoomInstance.getScale()
          const delta = e.deltaY > 0 ? 0.9 : 1.1
          const newScale = Math.max(0.05, Math.min(5, currentScale * delta))
          
          this.panzoomInstance.zoom(newScale, { animate: false })
          
          // Force center
          if (newScale <= fitScale * 1.1) {
            this.panzoomInstance.pan(0, 0, { force: true, animate: false })
          }
        }
      }
      
      // Add non-passive wheel listener to wrapper AND image
      wrapper.addEventListener('wheel', this.onWheelPreventPinch, { passive: false })
      img.addEventListener('wheel', this.onWheelPreventPinch, { passive: false })
      
      // Custom touch handlers for clean pinch zoom (no pan)
      const getDistance = (touch1, touch2) => {
        const dx = touch1.clientX - touch2.clientX
        const dy = touch1.clientY - touch2.clientY
        return Math.sqrt(dx * dx + dy * dy)
      }
      
      this.handleTouchStart = (e) => {
        if (e.touches.length === 2) {
          e.preventDefault()
          this.initialPinchDistance = getDistance(e.touches[0], e.touches[1])
          this.initialPinchScale = this.panzoomInstance.getScale()
          this.justFinishedPinch = false
          if (import.meta.env.DEV) {
            console.log('📱 PINCH START:', { scale: this.initialPinchScale.toFixed(3) })
          }
        } else if (e.touches.length === 1 && !this.justFinishedPinch) {
          // Single touch - only if NOT just after pinching
          const currentScale = this.panzoomInstance.getScale()
          if (currentScale > fitScale * 1.1) {
            // Record starting position for pan
            this.panStartX = e.touches[0].clientX
            this.panStartY = e.touches[0].clientY
            const pan = this.panzoomInstance.getPan()
            this.panStartImageX = pan.x
            this.panStartImageY = pan.y
            if (import.meta.env.DEV) {
              console.log('📱 PAN START')
            }
          }
        }
      }
      
      this.handleTouchMove = (e) => {
        if (e.touches.length === 2 && this.initialPinchDistance > 0) {
          e.preventDefault()
          const currentDistance = getDistance(e.touches[0], e.touches[1])
          const scaleChange = currentDistance / this.initialPinchDistance
          const newScale = Math.max(0.05, Math.min(5, this.initialPinchScale * scaleChange))
          
          // Zoom without changing pan position
          this.panzoomInstance.zoom(newScale, { animate: false })
          
          // Force center if near fit scale
          if (newScale <= fitScale * 1.1) {
            this.panzoomInstance.pan(0, 0, { force: true, animate: false })
          }
        } else if (e.touches.length === 1 && !this.justFinishedPinch && this.panStartX !== null) {
          // Single-touch pan - only if we recorded a pan start position
          const currentScale = this.panzoomInstance.getScale()
          if (currentScale > fitScale * 1.1) {
            const deltaX = e.touches[0].clientX - this.panStartX
            const deltaY = e.touches[0].clientY - this.panStartY
            
            const newX = this.panStartImageX + deltaX
            const newY = this.panStartImageY + deltaY
            
            this.panzoomInstance.pan(newX, newY, { force: true, animate: false })
          }
        }
      }
      
      this.handleTouchEnd = (e) => {
        if (e.touches.length === 1 && this.initialPinchDistance > 0) {
          // Just lifted one finger during pinch - image stays exactly where it is
          const currentScale = this.panzoomInstance.getScale()
          if (import.meta.env.DEV) {
            console.log('📱 ONE FINGER LIFTED:', { scale: currentScale.toFixed(3) })
          }
          
          // Reset pinch tracking
          this.initialPinchDistance = 0
          this.initialPinchScale = currentScale
          
          // Mark that we just finished pinching
          this.justFinishedPinch = true
          
          // Record the remaining finger's position as the new pan start
          this.panStartX = e.touches[0].clientX
          this.panStartY = e.touches[0].clientY
          const pan = this.panzoomInstance.getPan()
          this.panStartImageX = pan.x
          this.panStartImageY = pan.y
          
          if (import.meta.env.DEV) {
            console.log('📱 READY - Pan will start from current finger position')
          }
          
          e.preventDefault()
        } else if (e.touches.length === 0) {
          // All fingers lifted - reset everything
          this.justFinishedPinch = false
          this.initialPinchDistance = 0
          this.panStartX = null
          this.panStartY = null
          this.panStartImageX = null
          this.panStartImageY = null
          if (import.meta.env.DEV) {
            console.log('📱 ALL FINGERS LIFTED')
          }
        }
      }
      
      wrapper.addEventListener('touchstart', this.handleTouchStart, { passive: false })
      wrapper.addEventListener('touchmove', this.handleTouchMove, { passive: false })
      wrapper.addEventListener('touchend', this.handleTouchEnd, { passive: false })
    },
    zoomIn() {
      if (this.panzoomInstance) {
        if (import.meta.env.DEV) {
          console.log('🔍 ZOOM IN clicked')
        }
        this.panzoomInstance.zoomIn({ step: 0.2 })
      }
    },
    zoomOut() {
      if (this.panzoomInstance) {
        if (import.meta.env.DEV) {
          console.log('🔍 ZOOM OUT clicked')
        }
        this.panzoomInstance.zoomOut({ step: 0.2 })
      }
    },
    reset() {
      if (this.panzoomInstance) {
        this.panzoomInstance.reset()
      }
    }
  },
  mounted() {
    // Keyboard shortcuts
    this.handleKeydown = (e) => {
      if (!this.visible) return
      if (e.key === 'Escape') this.close()
      else if (e.key === '+' || e.key === '=') this.zoomIn()
      else if (e.key === '-') this.zoomOut()
      else if (e.key === 'r' || e.key === 'R') this.reset()
    }
    
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
    if (this.$refs.zoomImage) {
      const wrapper = this.$refs.zoomImage.parentElement
      if (wrapper) {
        if (this.onWheelPreventPinch) {
          wrapper.removeEventListener('wheel', this.onWheelPreventPinch)
        }
        if (this.handleTouchStart) {
          wrapper.removeEventListener('touchstart', this.handleTouchStart)
        }
        if (this.handleTouchMove) {
          wrapper.removeEventListener('touchmove', this.handleTouchMove)
        }
        if (this.handleTouchEnd) {
          wrapper.removeEventListener('touchend', this.handleTouchEnd)
        }
      }
      if (this.onWheelPreventPinch) {
        this.$refs.zoomImage.removeEventListener('wheel', this.onWheelPreventPinch)
      }
    }
    if (this.panzoomInstance) {
      this.panzoomInstance.destroy()
    }
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
/* Modal Overlay */
.image-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px 100px;
}

/* Close Button */
.close-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 8px;
  cursor: pointer;
  z-index: 1000001;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(220, 38, 38, 0.3);
  border-color: rgba(220, 38, 38, 0.5);
  transform: scale(1.1);
}

/* Zoom Wrapper - KEY STYLES */
.zoom-wrapper {
  width: 90%;
  max-width: 1200px;
  height: calc(100vh - 180px);
  height: calc(100dvh - 180px);
  max-height: 800px;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* CRITICAL: Capture touch/pointer gestures */
  touch-action: none;
  pointer-events: auto;
  user-select: none;
  -webkit-user-select: none;
  
  position: relative;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
  border-radius: 20px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
  
  /* Prevent browser drag/select */
  -webkit-user-drag: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}

/* Toolbar */
.toolbar {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(15px);
  border-radius: 12px;
  padding: 12px 20px;
  display: flex;
  gap: 10px;
  z-index: 1000001;
}

.toolbar-btn {
  width: 44px;
  height: 44px;
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.4);
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.toolbar-btn:hover {
  background: rgba(139, 92, 246, 0.4);
  border-color: rgba(139, 92, 246, 0.6);
  transform: scale(1.1);
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Mobile */
@media (max-width: 768px) {
  .image-preview-modal {
    padding: 70px 10px 90px;
  }
  
  .close-btn {
    top: 15px;
    right: 15px;
  }
  
  .zoom-wrapper {
    width: 95%;
    height: calc(100vh - 160px);
    height: calc(100dvh - 160px);
  }
  
  .toolbar {
    bottom: 20px;
    padding: 10px 15px;
    gap: 8px;
  }
  
  .toolbar-btn {
    width: 40px;
    height: 40px;
  }
}
</style>