<template>
  <!-- Fullscreen Overlay -->
  <Teleport to="body">
    <div v-if="isFullscreen" class="fullscreen-overlay">
      <button class="fullscreen-close-btn" @click="exitFullscreen" title="Exit Fullscreen (ESC)">×</button>
      
      <!-- Loading overlay -->
      <div v-if="isFullscreenLoading" class="fullscreen-loading">
        <CustomLoader />
      </div>
      
      <!-- Toolbar in fullscreen (only show narration controls if narration is enabled) -->
      <div v-if="showNarration" class="fullscreen-toolbar">
        <div class="toolbar-group">
          <button class="toolbar-btn" @click="$refs.narrator?.previous()" title="Previous">
            <img :src="$assetPath('/assets/img/Icons/rewind.png')" alt="Previous" class="icon-md">
          </button>
          <button class="toolbar-btn" @click="$refs.narrator?.resume()" title="Play">
            <img :src="$assetPath('/assets/img/Icons/play.png')" alt="Play" class="icon-md">
          </button>
          <button class="toolbar-btn" @click="$refs.narrator?.next()" title="Next">
            <img :src="$assetPath('/assets/img/Icons/forward.png')" alt="Next" class="icon-md">
          </button>
          <button class="toolbar-btn" @click="$refs.narrator?.pause()" title="Pause">
            <img :src="$assetPath('/assets/img/Icons/pause.png')" alt="Pause" class="icon-md">
          </button>
          <button class="toolbar-btn" @click="stopNarration" title="Stop">
            <img :src="$assetPath('/assets/img/Icons/stop.png')" alt="Stop" class="icon-md">
          </button>
        </div>
      </div>
      
      <div class="fullscreen-diagram-container">
        <div class="diagram-wrapper" ref="fullscreenWrapper">
          <img 
            :src="diagramSrc" 
            alt="Architecture Diagram" 
            class="fullscreen-diagram-img"
          />
          <HighlightOverlay
            v-if="showNarration && narrationSteps.length > 0"
            :visible="isNarrating"
            :highlights="currentHighlights"
            :svg-width="svgWidth"
            :svg-height="svgHeight"
            :highlight-style="highlightStyle"
            :highlight-color="highlightColor"
            :style="{ width: baseDiagramWidth + 'px', height: baseDiagramHeight + 'px' }"
          />
        </div>
      </div>
      
      <!-- Narrator in fullscreen (contains bubble) - only show if narration is enabled -->
      <DiagramNarrator 
        v-if="showNarration && narrationSteps.length > 0"
        ref="narrator"
        :narrationSteps="narrationSteps"
        :svgElement="$refs.fullscreenWrapper"
        :highlightStyle="highlightStyle"
        :highlightColor="highlightColor"
        @narration-started="onNarrationStarted"
        @step-changed="onStepChanged"
        @narration-stopped="onNarrationStopped"
        class="fullscreen-narrator"
      />
    </div>
  </Teleport>
  
  <ReusableCard :title="title" iconName="microservices architecture" class="mb-4" :body-padding="'0'" :card-padding="'20px 20px 0 20px'">
    
    <!-- Compact Diagram Toolbar -->
    <div class="diagram-toolbar-compact">
      <div class="toolbar-main-row">
        <!-- View Controls (Left) -->
        <div class="toolbar-group view-group" :class="{ 'view-group-centered': !showNarration }">
          <button class="toolbar-btn primary" title="Zoom into diagram" @click="zoomIn">
            <img :src="$assetPath('/assets/img/Icons/zoom in.png')" alt="Zoom In" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn primary" title="Zoom out of diagram" @click="zoomOut">
            <img :src="$assetPath('/assets/img/Icons/zoom out.png')" alt="Zoom Out" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn primary" title="Fit diagram to initial size" @click="fitToInitialSize">
            <img :src="$assetPath('/assets/img/Icons/fit to view.png')" alt="Fit to Initial Size" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn primary" title="Reset view to default" @click="resetView">
            <img :src="$assetPath('/assets/img/Icons/reset view.png')" alt="Reset View" class="icon-md icon-wrapper-md">
          </button>
        </div>
        
        <!-- Narration Controls (Right) - only show if narration is enabled -->
        <div v-if="showNarration" class="toolbar-group narration-group">
          <button class="toolbar-btn control" title="Start narration" @click="startNarration">
            <img :src="$assetPath('/assets/img/Icons/narration.png')" alt="Narration" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn control" title="Previous step" @click="previousNarration">
            <img :src="$assetPath('/assets/img/Icons/rewind.png')" alt="Rewind" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn control" title="Play/Resume narration" @click="playNarration">
            <img :src="$assetPath('/assets/img/Icons/play.png')" alt="Play" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn control" title="Next step" @click="nextNarration">
            <img :src="$assetPath('/assets/img/Icons/forward.png')" alt="Forward" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn control" title="Pause narration" @click="pauseNarration">
            <img :src="$assetPath('/assets/img/Icons/pause.png')" alt="Pause" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn control" title="Stop narration" @click="stopNarration">
            <img :src="$assetPath('/assets/img/Icons/stop.png')" alt="Stop" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn control" title="Select voice" @click="toggleVoiceSelection">
            <img :src="$assetPath('/assets/img/Icons/speech.png')" alt="Voice" class="icon-md icon-wrapper-md">
          </button>
        </div>
      </div>
      
      
      <!-- Voice Selection Dropdown - Teleported to body (only show if narration is enabled) -->
      <Teleport to="body">
        <div v-if="showNarration && showVoiceSelection" class="voice-selection-dropdown-global">
          <div class="voice-selection-header">
            <span class="txt-label-sm">Select Voice:</span>
            <button class="close-voice-btn" @click="toggleVoiceSelection">×</button>
          </div>
          <div class="voice-options">
            <button 
              v-for="voice in availableVoices" 
              :key="voice.name"
              class="voice-option"
              :class="{ active: selectedVoice === voice.name }"
              @click="selectVoice(voice)"
            >
              <span class="voice-name txt-label-sm">{{ voice.name }}</span>
              <span class="voice-lang txt-label-xs">({{ voice.lang }})</span>
            </button>
            <div v-if="availableVoices.length === 0" class="no-voices-message">
              <span class="txt-label-sm">No voices available</span>
            </div>
          </div>
        </div>
      </Teleport>
      
      <!-- Optional: Collapsible Labels Row -->
      <div class="toolbar-labels-row">
        <span class="label-group txt-label-xs">View Controls</span>
        <span class="label-group txt-label-xs">Narration & Playback</span>
      </div>
    </div>
    
    <!-- Diagram Container -->
    <div class="diagram-container">
      <div class="diagram-content" id="diagram-content">
        <div class="diagram-wrapper">
          <LazyImage 
            :src="diagramSrc" 
            alt="Architecture Diagram" 
            image-class="architecture-diagram"
            container-class="diagram-image-container"
            :lazy="false"
            priority="high"
            @load="onDiagramImageLoad"
            ref="diagramLazyImage"
          />
          
          <!-- Highlight Overlay - positioned relative to diagram and transforms with zoom -->
          <HighlightOverlay
            v-if="showNarration && narrationSteps.length > 0"
            :visible="isNarrating"
            :highlights="currentHighlights"
            :svg-width="svgWidth"
            :svg-height="svgHeight"
            :highlight-style="highlightStyle"
            :highlight-color="highlightColor"
          />
        </div>
      </div>
    </div>

    
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import DiagramNarrator from './DiagramNarrator.vue'
import HighlightOverlay from './HighlightOverlay.vue'
import CustomLoader from '../common/CustomLoader.vue'
import LazyImage from '../common/LazyImage.vue'
import Panzoom from '@panzoom/panzoom'
import highlightService from '@/services/HighlightService.js'
import narrationService from '@/services/NarrationService.js'
import { assetPath } from '@/utils/assetPath.js'

export default {
  name: 'DiagramViewer',
  components: {
    ReusableCard,
    DiagramNarrator,
    HighlightOverlay,
    CustomLoader,
    LazyImage
  },
  props: {
    title: {
      type: String,
      default: 'System Architecture'
    },
    diagramSrc: {
      type: String,
      default: () => assetPath('/assets/img/heat-exchanger-diagram.svg')
    },
    narrationSteps: {
      type: Array,
      default: () => []
    },
    highlightStyle: {
      type: String,
      default: 'glow', // 'glow', 'pulse', 'dashed', 'solid'
      validator: (value) => ['glow', 'pulse', 'dashed', 'solid'].includes(value)
    },
    highlightColor: {
      type: String,
      default: '#ffeb3b' // Bright Yellow
    },
    svgWidth: {
      type: Number,
      default: 2403 // Default to HeatExchanger dimensions
    },
    svgHeight: {
      type: Number,
      default: 2205 // Default to HeatExchanger dimensions
    },
    iconName: {
      type: String,
      default: 'architecture overview'
    },
    showNarration: {
      type: Boolean,
      default: true // Default to true for backward compatibility
    }
  },
  data() {
    return {
      panzoomInstance: null,
      originalDimensions: {
        width: 0,
        height: 0
      },
      svgElement: null,
      showVoiceSelection: false,
      availableVoices: [],
      selectedVoice: null,
      isNarrating: false,
      // Unified services
      highlightService: null,
      narrationService: null,
      currentHighlights: [],
      isFullscreen: false,
      currentStepIndex: 0,
      baseDiagramWidth: 0,
      baseDiagramHeight: 0,
      // Store the diagram state before narration starts
      preNarrationState: {
        scale: 1,
        translateX: 0,
        translateY: 0
      },
      // Loading state for fullscreen
      isFullscreenLoading: false,
      // Debug flag to control console logging
      debugMode: import.meta.env.DEV // Only debug in development
    }
  },
  computed: {
    currentStep() {
      return this.narrationSteps[this.currentStepIndex] || null
    }
  },
  mounted() {
    this.$nextTick(() => {
      // Don't initialize panzoom here - wait for image to load via onDiagramImageLoad
      // Diagram images load eagerly (lazy=false) so they'll load quickly
      this.initializeUnifiedServices()
    })
  },
  beforeUnmount() {
    if (this.panzoomInstance) {
      this.panzoomInstance.destroy()
    }
    // Ensure page scroll is restored
    this.allowPageScroll()
  },
  methods: {
    enterFullscreen() {
      // Save current diagram state before entering fullscreen (only if panzoom is initialized)
      if (this.panzoomInstance) {
        this.saveCurrentDiagramState()
      } else {
        this.debugWarn('Panzoom not initialized, cannot save diagram state')
      }
      
      this.isFullscreen = true
      document.body.style.overflow = 'hidden'
      
      // Cache base diagram dimensions after entering fullscreen
      this.$nextTick(() => {
        if (this.$refs.fullscreenWrapper) {
          this.$refs.fullscreenWrapper.style.transform = 'scale(1) translate(0px, 0px)'
          
          // Wait for layout and cache the base image size
          this.$nextTick(() => {
            const img = this.$refs.fullscreenWrapper?.querySelector('.fullscreen-diagram-img')
            if (img && img.complete) {
              // Calculate the actual rendered size accounting for aspect ratio and object-fit: contain
              const containerRect = this.$refs.fullscreenWrapper.getBoundingClientRect()
              const imgAspect = this.svgWidth / this.svgHeight
              const containerAspect = containerRect.width / containerRect.height
              
              if (containerAspect > imgAspect) {
                // Container is wider - image is limited by height
                this.baseDiagramHeight = containerRect.height
                this.baseDiagramWidth = containerRect.height * imgAspect
              } else {
                // Container is taller - image is limited by width
                this.baseDiagramWidth = containerRect.width
                this.baseDiagramHeight = containerRect.width / imgAspect
              }
              
              this.debugLog('Cached base diagram size:', this.baseDiagramWidth, 'x', this.baseDiagramHeight)
              this.debugLog('Container size:', containerRect.width, 'x', containerRect.height)
              this.debugLog('SVG aspect:', imgAspect, 'Container aspect:', containerAspect)
            }
          })
        }
      })
    },
    
    exitFullscreen() {
      this.isFullscreen = false
      this.isFullscreenLoading = false
      document.body.style.overflow = ''
      
      // Clean up any narration state (both Vue and inline script)
      if (this.isNarrating) {
        this.stopNarration()
      }
      
      // Always clean up inline script narration state when exiting fullscreen
      try {
        if (window.hxNarratorPro && typeof window.hxNarratorPro.stop === 'function') {
          window.hxNarratorPro.stop()
        }
      } catch (e) {
        this.debugWarn('Error cleaning up inline narration on fullscreen exit:', e)
      }
      
      // Comprehensive cleanup of ALL highlight systems
      this.clearAllHighlights()
      
      // If not narrating but exiting fullscreen, restore previous state
      if (!this.isNarrating) {
        this.restorePreviousDiagramState()
      }
    },
    
    onDiagramImageLoad(event) {
      // Image loaded, now initialize panzoom
      // Get the actual img element from the event or LazyImage component
      const imgElement = event?.target || (this.$refs.diagramLazyImage?.imageElement)
      if (imgElement) {
        this.diagramImage = imgElement
      }
      this.$nextTick(() => {
        this.initializePanzoom()
      })
    },
    initializePanzoom() {
      // Find the ReusableCard element (skip Teleport)
      const cardElement = this.$el?.nodeType === 1 ? this.$el : this.$el?.nextElementSibling
      if (!cardElement) return
      
      const diagramElement = cardElement.querySelector('.architecture-diagram')
      const wrapperElement = cardElement.querySelector('.diagram-wrapper')
      const containerElement = cardElement.querySelector('.diagram-content')
      
      if (!diagramElement || !wrapperElement || !containerElement) return

      // Set the SVG element for narration
      this.svgElement = diagramElement

      // Wait for image to load to get its natural dimensions
      if (diagramElement.complete) {
        this.setupPanzoom(diagramElement, wrapperElement, containerElement)
      } else {
        diagramElement.addEventListener('load', () => {
          this.setupPanzoom(diagramElement, wrapperElement, containerElement)
        })
      }
    },

    setupPanzoom(diagramElement, wrapperElement, containerElement) {
      // Store original dimensions
      this.originalDimensions = {
        width: diagramElement.naturalWidth || diagramElement.offsetWidth,
        height: diagramElement.naturalHeight || diagramElement.offsetHeight
      }

      // Initialize Panzoom on the wrapper (which contains both image and highlights)
      // Use contain: 'outside' for initial fit, but override zoom limits
      this.panzoomInstance = Panzoom(wrapperElement, {
        contain: 'outside',
        cursor: 'move',
        canvas: true,
        // Set very wide zoom limits to effectively make it unlimited
        minScale: 0.001,  // 0.1% of original size
        maxScale: 100     // 10000% of original size
      })
      
      this.debugLog('Panzoom instance created with unlimited zoom (SVG)')

      // Enable zoom with mouse wheel ONLY when Ctrl/Cmd key is pressed
      // This prevents hijacking normal page scroll
      containerElement.addEventListener('wheel', (event) => {
        // Only zoom if Ctrl (Windows/Linux) or Cmd (Mac) key is pressed
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault() // Prevent page zoom
          if (this.panzoomInstance) {
            this.panzoomInstance.zoomWithWheel(event)
          }
        }
        // Otherwise, let the event bubble up for normal page scrolling
      }, { passive: false })

      // Initial fit to view
      this.$nextTick(() => {
        this.fitToView()
      })
    },

    zoomIn() {
      if (this.panzoomInstance) {
        this.panzoomInstance.zoomIn({
          animate: true
        })
      }
    },

    zoomOut() {
      if (this.panzoomInstance) {
        // Get current scale for debugging
        const currentScale = this.getCurrentScale()
        this.debugLog('Zoom out - Current scale:', currentScale)
        
        this.panzoomInstance.zoomOut({
          animate: true
        })
        
        // Check scale after zoom out
        setTimeout(() => {
          const newScale = this.getCurrentScale()
          this.debugLog('Zoom out - New scale:', newScale)
        }, 100)
      }
    },

    fitToView() {
      if (!this.panzoomInstance) return

      const cardElement = this.$el?.nodeType === 1 ? this.$el : this.$el?.nextElementSibling
      if (!cardElement) return
      
      const containerElement = cardElement.querySelector('.diagram-content')
      const diagramElement = cardElement.querySelector('.architecture-diagram')
      
      if (!containerElement || !diagramElement) return

      const containerRect = containerElement.getBoundingClientRect()
      const diagramWidth = this.originalDimensions.width
      const diagramHeight = this.originalDimensions.height

      // Calculate scale to fit
      const scaleX = containerRect.width / diagramWidth // No padding needed
      const scaleY = containerRect.height / diagramHeight
      const scale = Math.min(scaleX, scaleY, 1) // Don't scale up beyond 100%

      // Center the diagram
      const x = (containerRect.width - diagramWidth * scale) / 2
      const y = (containerRect.height - diagramHeight * scale) / 2

      this.panzoomInstance.zoom(scale, {
        animate: true
      })

      this.panzoomInstance.pan(x, y, {
        animate: true
      })
    },

    fitToInitialSize() {
      // Reset to the default panzoom state (which is the initial scale)
      if (!this.panzoomInstance) return
      
      this.debugLog('Fitting to initial size (reset to default)')
      
      // Reset to default state
      this.panzoomInstance.reset({
        animate: true
      })
    },


    resetView() {
      if (this.panzoomInstance) {
        this.panzoomInstance.reset({
          animate: true
        })
        
        // After reset, fit to view
        setTimeout(() => {
          this.fitToView()
        }, 300)
      }
    },


    getCurrentScale() {
      // Get the current scale from panzoom instance
      if (!this.panzoomInstance) return 1
      
      try {
        // Try different methods to get current scale
        if (typeof this.panzoomInstance.getScale === 'function') {
          return this.panzoomInstance.getScale()
        } else if (typeof this.panzoomInstance.getTransform === 'function') {
          const transform = this.panzoomInstance.getTransform()
          return transform.scale || 1
        } else {
          // Fallback: try to get from element style
          const element = this.panzoomInstance.getContainer()
          if (element) {
            const transform = element.style.transform
            const scaleMatch = transform.match(/scale\(([^)]+)\)/)
            return scaleMatch ? parseFloat(scaleMatch[1]) : 1
          }
        }
      } catch (error) {
        this.debugWarn('Could not get current scale:', error)
      }
      
      return 1
    },

    saveCurrentDiagramState() {
      // Save the current panzoom state before narration starts
      if (this.panzoomInstance) {
        try {
          // Try different methods to get the current transform state
          let scale = 1
          let translateX = 0
          let translateY = 0
          
          // Method 1: Try getTransform (newer versions)
          if (typeof this.panzoomInstance.getTransform === 'function') {
            const transform = this.panzoomInstance.getTransform()
            scale = transform.scale || 1
            translateX = transform.x || 0
            translateY = transform.y || 0
          }
          // Method 2: Try getScale and getPan (older versions)
          else if (typeof this.panzoomInstance.getScale === 'function' && typeof this.panzoomInstance.getPan === 'function') {
            scale = this.panzoomInstance.getScale()
            const pan = this.panzoomInstance.getPan()
            translateX = pan.x || 0
            translateY = pan.y || 0
          }
          // Method 3: Try to get from the element's transform style
          else {
            const element = this.panzoomInstance.getContainer()
            if (element) {
              const transform = element.style.transform
              if (transform) {
                // Parse transform string like "scale(1.5) translate(100px, 50px)"
                const scaleMatch = transform.match(/scale\(([^)]+)\)/)
                const translateMatch = transform.match(/translate\(([^)]+)\)/)
                
                if (scaleMatch) scale = parseFloat(scaleMatch[1])
                if (translateMatch) {
                  const coords = translateMatch[1].split(',').map(s => parseFloat(s.trim().replace('px', '')))
                  translateX = coords[0] || 0
                  translateY = coords[1] || 0
                }
              }
            }
          }
          
          this.preNarrationState = {
            scale: scale,
            translateX: translateX,
            translateY: translateY
          }
          this.debugLog('Saved pre-narration state:', this.preNarrationState)
        } catch (error) {
          this.debugWarn('Could not save diagram state:', error)
          // Fallback to default state
          this.preNarrationState = {
            scale: 1,
            translateX: 0,
            translateY: 0
          }
        }
      }
    },

    restorePreviousDiagramState() {
      // Restore the diagram to its state before narration started
      if (this.panzoomInstance && this.preNarrationState) {
        this.debugLog('Restoring pre-narration state:', this.preNarrationState)
        
        try {
          // Method 1: Try setTransform (newer versions)
          if (typeof this.panzoomInstance.setTransform === 'function') {
            this.panzoomInstance.setTransform({
              x: this.preNarrationState.translateX,
              y: this.preNarrationState.translateY,
              scale: this.preNarrationState.scale
            })
            this.debugLog('Successfully restored state using setTransform')
          }
          // Method 2: Try zoomTo and panTo (older versions)
          else if (typeof this.panzoomInstance.zoomTo === 'function' && typeof this.panzoomInstance.panTo === 'function') {
            this.panzoomInstance.zoomTo(this.preNarrationState.scale)
            this.panzoomInstance.panTo(this.preNarrationState.translateX, this.preNarrationState.translateY)
            this.debugLog('Successfully restored state using zoomTo/panTo')
          }
          // Method 3: Try moveTo and zoomTo
          else if (typeof this.panzoomInstance.moveTo === 'function' && typeof this.panzoomInstance.zoomTo === 'function') {
            this.panzoomInstance.zoomTo(this.preNarrationState.scale)
            this.panzoomInstance.moveTo(this.preNarrationState.translateX, this.preNarrationState.translateY)
            this.debugLog('Successfully restored state using moveTo/zoomTo')
          }
          // Method 4: Fallback - reset to default (silent, this is expected behavior)
          else {
            this.debugLog('Using fallback reset to default state')
            if (typeof this.panzoomInstance.reset === 'function') {
              this.panzoomInstance.reset()
            }
          }
        } catch (error) {
          this.debugLog('Error restoring diagram state, using reset fallback:', error.message)
          // Fallback to reset
          if (typeof this.panzoomInstance.reset === 'function') {
            this.panzoomInstance.reset()
          }
        }
        
        // Also reset the fullscreen wrapper transform if in fullscreen
        if (this.isFullscreen && this.$refs.fullscreenWrapper) {
          this.$refs.fullscreenWrapper.style.transform = 'scale(1) translate(0px, 0px)'
        }
      }
    },

    // Narration Controls
    startNarration() {
      this.isFullscreenLoading = true
      this.enterFullscreen()
      
      // Show loading animation for 3.5 seconds, then start narration
      setTimeout(() => {
        this.$nextTick(() => {
          if (this.isFullscreen && this.$refs.narrator) {
            // Ensure base diagram dimensions are cached before starting narration
            if (!this.baseDiagramWidth || !this.baseDiagramHeight) {
              this.cacheBaseDiagramDimensions()
            }
            
            this.$refs.narrator.start()
            this.isNarrating = true
            this.updateHighlights()
            this.isFullscreenLoading = false
          }
        })
      }, 3500)
    },

    playNarration() {
      this.isFullscreenLoading = true
      this.enterFullscreen()
      
      // Show loading animation for 3.5 seconds, then resume narration
      setTimeout(() => {
        this.$nextTick(() => {
          if (this.isFullscreen && this.$refs.narrator) {
            // Ensure base diagram dimensions are cached before resuming narration
            if (!this.baseDiagramWidth || !this.baseDiagramHeight) {
              this.cacheBaseDiagramDimensions()
            }
            
            this.$refs.narrator.resume()
            this.isNarrating = true
            this.isFullscreenLoading = false
          }
        })
      }, 3500)
    },

    pauseNarration() {
      if (this.isFullscreen && this.$refs.narrator) {
        this.$refs.narrator.pause()
      }
    },

    stopNarration() {
      if (this.isFullscreen) {
        // Stop the narrator component first
        if (this.$refs.narrator && typeof this.$refs.narrator.stop === 'function') {
          this.$refs.narrator.stop()
        }
        
        // Use unified narration service
        if (this.narrationService) {
          this.narrationService.stop()
        }
        
        // Fallback: clean up old systems
        try {
          if (window.hxNarratorPro && typeof window.hxNarratorPro.stop === 'function') {
            window.hxNarratorPro.stop()
          }
        } catch (e) {
          this.debugWarn('Error cleaning up legacy narration:', e)
        }
        
        this.isNarrating = false
        this.currentHighlights = []
        
        // Don't call exitFullscreen here - let the caller handle it
      }
    },

    updateHighlights() {
      if (this.isFullscreen && this.$refs.narrator) {
        const currentStep = this.$refs.narrator.currentStep
        if (currentStep && currentStep.highlights) {
          this.debugLog('Updating highlights for step:', currentStep.title)
          this.debugLog('Step description:', currentStep.description)
          this.debugLog('Step highlights:', currentStep.highlights)
          currentStep.highlights.forEach((highlight, index) => {
            this.debugLog(`Highlight ${index}: x=${highlight.x}, y=${highlight.y}, width=${highlight.width}, height=${highlight.height}`)
          })
          this.currentHighlights = currentStep.highlights
        } else {
          this.currentHighlights = []
        }
      }
    },

    // Cache base diagram dimensions
    cacheBaseDiagramDimensions() {
      if (this.$refs.fullscreenWrapper) {
        const img = this.$refs.fullscreenWrapper?.querySelector('.fullscreen-diagram-img')
        if (img && img.complete) {
          // Calculate the actual rendered size accounting for aspect ratio and object-fit: contain
          const containerRect = this.$refs.fullscreenWrapper.getBoundingClientRect()
          const imgAspect = this.svgWidth / this.svgHeight
          const containerAspect = containerRect.width / containerRect.height
          
          if (containerAspect > imgAspect) {
            // Container is wider - image is limited by height
            this.baseDiagramHeight = containerRect.height
            this.baseDiagramWidth = containerRect.height * imgAspect
          } else {
            // Container is taller - image is limited by width
            this.baseDiagramWidth = containerRect.width
            this.baseDiagramHeight = containerRect.width / imgAspect
          }
          
          this.debugLog('Cached base diagram size:', this.baseDiagramWidth, 'x', this.baseDiagramHeight)
          this.debugLog('Container size:', containerRect.width, 'x', containerRect.height)
          this.debugLog('SVG aspect:', imgAspect, 'Container aspect:', containerAspect)
        }
      }
    },

    // Debug logging helper
    debugLog(message, ...args) {
      if (this.debugMode) {
        console.log(`[DiagramViewer] ${message}`, ...args)
      }
    },
    
    debugWarn(message, ...args) {
      if (this.debugMode) {
        console.warn(`[DiagramViewer] ${message}`, ...args)
      }
    },

    initializeUnifiedServices() {
      this.debugLog('Initializing unified services...')
      
      // Initialize highlight service
      this.highlightService = highlightService
      if (this.svgElement && this.panzoomInstance) {
        this.highlightService.init(this.svgElement, this.panzoomInstance)
      }
      
      // Initialize narration service
      this.narrationService = narrationService
      this.narrationService.init()
      this.narrationService.setNarrationSteps(this.narrationSteps)
    },

    clearAllHighlights() {
      this.debugLog('Clearing ALL highlight systems...')
      
      // Use unified service first
      if (this.highlightService) {
        this.highlightService.clearAllHighlights()
      }
      
      // Fallback: Clear legacy systems
      this.currentHighlights = []
      this.isNarrating = false
      
      try {
        // Find all SVG elements in the document
        const svgElements = document.querySelectorAll('svg')
        svgElements.forEach(svg => {
          // Clear all highlight classes from SVG elements
          const highlightedElements = svg.querySelectorAll('.hx-focus, .hx-narrate-focus, .hx-flow, .hx-flow-anim, .unified-highlight, .unified-highlight-flow')
          highlightedElements.forEach(el => {
            el.classList.remove('hx-focus', 'hx-narrate-focus', 'hx-flow', 'hx-flow-anim', 'unified-highlight', 'unified-highlight-flow')
          })
        })
      } catch (e) {
        this.debugWarn('Error clearing SVG highlights:', e)
      }
      
      // Clear any remaining badges or focus rectangles
      try {
        const badges = document.querySelectorAll('#hx-devicon-badge, .hx-badge, [id*="badge"]')
        badges.forEach(badge => {
          if (badge.style) badge.style.display = 'none'
        })
        
        const focusRects = document.querySelectorAll('.hx-focus-rect, [class*="focus-rect"]')
        focusRects.forEach(rect => {
          if (rect.style) rect.style.display = 'none'
        })
      } catch (e) {
        this.debugWarn('Error clearing badges and focus rectangles:', e)
      }
      
      this.$nextTick(() => {
        this.debugLog('Highlight cleanup completed')
      })
    },

    onNarrationStarted() {
      this.debugLog('Narration started')
      this.isNarrating = true
      this.updateHighlights()
    },

    onStepChanged(stepIndex, currentStep) {
      this.currentStepIndex = stepIndex
      this.debugLog('Step changed to:', stepIndex, currentStep)
      if (currentStep && currentStep.highlights) {
        this.currentHighlights = currentStep.highlights
        // Update highlights with debug logging
        this.updateHighlights()
        // Animate to highlight in fullscreen mode
        if (this.isFullscreen && this.currentHighlights.length > 0) {
          this.$nextTick(() => {
            this.animateToHighlight(this.currentHighlights[0])
          })
        }
      } else {
        this.currentHighlights = []
      }
    },

    animateToHighlight(highlight) {
      if (!this.isFullscreen || !this.$refs.fullscreenWrapper) return
      if (!this.baseDiagramWidth || !this.baseDiagramHeight) {
        this.debugWarn('Base diagram dimensions not cached yet')
        return
      }
      
      const wrapper = this.$refs.fullscreenWrapper
      
      // Use cached base dimensions
      const imgWidth = this.baseDiagramWidth
      const imgHeight = this.baseDiagramHeight
      
      // Calculate scale factor from SVG coordinates to rendered image
      const scaleX = imgWidth / this.svgWidth
      const scaleY = imgHeight / this.svgHeight
      
      // Get highlight center in SVG coordinates
      const highlightCenterX = highlight.x + highlight.width / 2
      const highlightCenterY = highlight.y + highlight.height / 2
      
      // Convert to rendered coordinates
      const renderedHighlightX = highlightCenterX * scaleX
      const renderedHighlightY = highlightCenterY * scaleY
      
      // Calculate zoom level based on highlight size
      const highlightArea = (highlight.width * highlight.height) / (this.svgWidth * this.svgHeight) * 100
      
      // Adjust zoom scale based on SVG size ratio (AirAsia needs more zoom than HeatExchanger)
      const svgSizeRatio = (this.svgWidth * this.svgHeight) / (2403 * 2205) // HeatExchanger as baseline
      const baseZoomScale = 2.5 * Math.sqrt(svgSizeRatio) // Square root for smoother scaling
      
      let zoomScale = baseZoomScale // Dynamic default zoom
      
      if (highlightArea > 30) {
        zoomScale = baseZoomScale * 0.48 // Large area, zoom out (1.2 * ratio)
      } else if (highlightArea > 15) {
        zoomScale = baseZoomScale * 0.6 // Medium area (1.5 * ratio)
      } else if (highlightArea > 8) {
        zoomScale = baseZoomScale * 0.8 // Small area (2.0 * ratio)
      } else {
        zoomScale = baseZoomScale // Tiny area, zoom in more (2.5 * ratio)
      }
      
      // SMART FIT-TO-SCREEN: For large highlights (workflows/layers), ensure they fit in view
      const containerRect = wrapper.parentElement.getBoundingClientRect()
      const containerWidth = containerRect.width
      
      // Calculate the maximum zoom that keeps highlight within screen bounds
      // Account for side-based positioning (25% or 75% from left edge)
      const leftHalfCenter = containerWidth * 0.25  // 25% from left edge
      const rightHalfCenter = containerWidth * 0.75 // 75% from left edge
      const diagramCenter = this.svgWidth / 2
      
      // Determine which side the highlight will be positioned on
      const willBeOnLeftSide = highlightCenterX < diagramCenter
      const targetSideCenter = willBeOnLeftSide ? leftHalfCenter : rightHalfCenter
      
      // Calculate max zoom that keeps highlight within bounds on its target side
      const maxZoomForWidth = containerRect.width / (highlight.width * scaleX)
      const maxZoomForHeight = containerRect.height / (highlight.height * scaleY)
      
      // For side positioning, we need extra space to account for the offset from center
      const sideOffset = Math.abs(targetSideCenter - containerRect.width / 2)
      const maxZoomForSide = (containerRect.width - sideOffset * 2) / (highlight.width * scaleX)
      
      const maxZoomForFit = Math.min(maxZoomForWidth, maxZoomForHeight, maxZoomForSide) * 0.95 // 95% for minimal margin
      
      // If calculated zoom would make highlight too big for screen, use fit-to-screen zoom instead
      if (zoomScale > maxZoomForFit) {
        zoomScale = maxZoomForFit
        this.debugLog('Large highlight - using fit-to-screen zoom:', {
          originalZoom: baseZoomScale,
          fitZoom: zoomScale.toFixed(2),
          highlightSize: `${highlight.width}x${highlight.height}`,
          screenSize: `${containerRect.width}x${containerRect.height}`,
          targetSide: willBeOnLeftSide ? 'left' : 'right',
          sideOffset: sideOffset.toFixed(0) + 'px'
        })
      }
      
      // Get container dimensions (reuse containerRect from above)
      const container = wrapper.parentElement
      const centerY = containerRect.height / 2
      
      // SMART HIGHLIGHT POSITIONING: Position highlight in left or right half
      // This creates significant gap between highlight and bubble
      // (containerWidth, leftHalfCenter, rightHalfCenter, diagramCenter already declared above)
      
      let targetX
      if (highlightCenterX < diagramCenter) {
        // Highlight is on left side of diagram, position it in left half of screen
        targetX = leftHalfCenter
      } else {
        // Highlight is on right side of diagram, position it in right half of screen
        targetX = rightHalfCenter
      }
      
      // Calculate offset needed to position the highlight in the chosen half
      // After scaling, the highlight position becomes: renderedHighlightX * zoomScale
      // We want it at targetX, so: targetX = renderedHighlightX * zoomScale + translateX * zoomScale
      // Therefore: translateX = (targetX / zoomScale) - renderedHighlightX
      const translateX = (targetX / zoomScale) - renderedHighlightX
      const translateY = (centerY / zoomScale) - renderedHighlightY
      
      // Apply transform with smooth transition
      wrapper.style.transition = 'transform 0.5s ease-in-out'
      wrapper.style.transform = `scale(${zoomScale}) translate(${translateX}px, ${translateY}px)`
      
      this.debugLog('Animated to highlight:', {
        highlight,
        zoomScale,
        svgSizeRatio: svgSizeRatio.toFixed(2),
        baseZoomScale: baseZoomScale.toFixed(2),
        highlightArea: highlightArea.toFixed(1) + '%',
        imgDimensions: `${imgWidth}x${imgHeight}`,
        svgDimensions: `${this.svgWidth}x${this.svgHeight}`,
        renderedHighlight: `${renderedHighlightX}, ${renderedHighlightY}`,
        translate: `${translateX}px, ${translateY}px`,
        highlightSide: highlightCenterX < diagramCenter ? 'left' : 'right',
        targetPosition: `${targetX}px (${targetX === leftHalfCenter ? 'left half' : 'right half'})`,
        positioningMode: zoomScale === maxZoomForFit ? 'fit-to-screen (side-based)' : 'normal zoom',
        containerWidth: `${containerWidth}px`
      })
    },

    onNarrationStopped() {
      this.debugLog('Narration stopped, clearing highlights')
      this.isNarrating = false
      this.currentHighlights = []
      
      // Restore the diagram to its previous state before narration started
      this.restorePreviousDiagramState()
    },

    nextNarration() {
      if (this.isFullscreen && this.$refs.narrator) {
        this.debugLog('Next narration button pressed')
        this.$refs.narrator.next()
        this.$nextTick(() => {
          this.updateHighlights()
        })
      }
    },

    previousNarration() {
      if (this.isFullscreen && this.$refs.narrator) {
        this.debugLog('Previous narration button pressed')
        this.$refs.narrator.previous()
        this.$nextTick(() => {
          this.updateHighlights()
        })
      }
    },

    toggleVoiceSelection() {
      this.debugLog('Voice button clicked, current state:', this.showVoiceSelection)
      this.showVoiceSelection = !this.showVoiceSelection
      this.debugLog('Voice dropdown now:', this.showVoiceSelection)
      
      if (this.showVoiceSelection && this.availableVoices.length === 0) {
        this.debugLog('Loading available voices...')
        this.loadAvailableVoices()
      }
      
      // Add/remove scroll prevention when dropdown opens/closes
      this.$nextTick(() => {
        if (this.showVoiceSelection) {
          this.preventPageScroll()
          this.positionDropdown()
        } else {
          this.allowPageScroll()
        }
      })
    },
    
    preventPageScroll() {
      // Prevent page scroll when dropdown is open
      document.body.style.overflow = 'hidden'
      document.addEventListener('wheel', this.handleWheel, { passive: false })
    },
    
    allowPageScroll() {
      // Allow page scroll when dropdown is closed
      document.body.style.overflow = ''
      document.removeEventListener('wheel', this.handleWheel)
    },
    
    handleWheel(event) {
      // Only prevent page scroll if we're not scrolling inside the dropdown
      const dropdown = document.querySelector('.voice-selection-dropdown-global')
      if (dropdown && dropdown.contains(event.target)) {
        // Allow scrolling inside dropdown
        return
      }
      // Prevent page scroll
      event.preventDefault()
    },
    
    positionDropdown() {
      // Position dropdown relative to the toolbar
      this.$nextTick(() => {
        const dropdown = document.querySelector('.voice-selection-dropdown-global')
        const cardElement = this.$el?.nodeType === 1 ? this.$el : this.$el?.nextElementSibling
        const toolbar = cardElement?.querySelector('.diagram-toolbar-compact')
        
        if (dropdown && toolbar) {
          const toolbarRect = toolbar.getBoundingClientRect()
          const dropdownHeight = 400 // max-height
          
          // Position below toolbar, but adjust if too close to bottom
          let top = toolbarRect.bottom + 10
          if (top + dropdownHeight > window.innerHeight - 20) {
            top = toolbarRect.top - dropdownHeight - 10
          }
          
          // Center horizontally relative to toolbar
          const left = toolbarRect.left + (toolbarRect.width / 2)
          
          dropdown.style.top = `${top}px`
          dropdown.style.left = `${left}px`
          dropdown.style.transform = 'translateX(-50%)'
        }
      })
    },

    loadAvailableVoices() {
      if ('speechSynthesis' in window) {
        this.debugLog('Speech synthesis supported, loading voices...')
        // Load voices when user opens the dropdown
        const loadVoices = () => {
          const allVoices = window.speechSynthesis.getVoices()
          this.debugLog('Total voices found:', allVoices.length)
          
          this.availableVoices = allVoices.filter(voice => 
            voice.lang.startsWith('en') // Filter for English voices
          ).map(voice => ({
            name: voice.name,
            lang: voice.lang,
            voice: voice
          }))
          
          this.debugLog('English voices found:', this.availableVoices.length)
          this.debugLog('Available voices:', this.availableVoices.map(v => v.name))
          
          // If no English voices found, use all voices
          if (this.availableVoices.length === 0) {
            this.debugLog('No English voices found, using all voices')
            this.availableVoices = allVoices.map(voice => ({
              name: voice.name,
              lang: voice.lang,
              voice: voice
            }))
          }
          
          // Set default voice if none selected
          if (!this.selectedVoice && this.availableVoices.length > 0) {
            this.selectedVoice = this.availableVoices[0].name
            this.debugLog('Default voice set to:', this.selectedVoice)
          }
        }
        
        // Load voices immediately if available
        loadVoices()
        
        // Also listen for voices to be loaded
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = loadVoices
        }
      } else {
        this.debugLog('Speech synthesis not supported')
      }
    },

    selectVoice(voiceObj) {
      this.selectedVoice = voiceObj.name
      this.showVoiceSelection = false
      
      // Pass selected voice to narrator
      if (this.isFullscreen && this.$refs.narrator) {
        this.$refs.narrator.setVoice(voiceObj.voice)
      }
    }
  }
}
</script>

<style scoped>
/* Compact Diagram Toolbar */
.diagram-toolbar-compact {
  margin-bottom: 20px;
  padding: 0 20px 20px 20px;
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.9), rgba(40, 35, 65, 0.95));
  border-radius: 16px;
  border: 1px solid rgba(139, 92, 246, 0.4);
  backdrop-filter: blur(15px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.diagram-toolbar-compact::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 25%, #2ed573 75%, #667eea 100%);
  opacity: 0.8;
}

.toolbar-main-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 8px;
}

.toolbar-group {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  position: relative;
}

.toolbar-group::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

.toolbar-group.view-group {
  flex: 1;
  justify-content: flex-start;
  border-left: 3px solid #667eea;
}

.toolbar-group.view-group.view-group-centered {
  justify-content: center;
}

.toolbar-group.narration-group {
  flex: 1;
  justify-content: flex-end;
  border-left: 3px solid #2ed573;
}

.toolbar-labels-row {
  display: flex;
  gap: 15px;
  padding: 8px 12px 0 12px;
  margin-top: 6px;
  position: relative;
}

.label-group {
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  opacity: 0.7;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  padding: 0 12px;
}

.label-group:first-child {
  color: #667eea;
  flex: 1;
  text-align: left;
}

.label-group:last-child {
  color: #2ed573;
  flex: 1;
  text-align: right;
}

/* Voice Selection Dropdown */
.voice-selection-dropdown {
  position: fixed !important;
  top: 200px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  background: red !important;
  border: 5px solid yellow !important;
  border-radius: 12px !important;
  z-index: 999999 !important;
  min-width: 280px !important;
  max-height: 300px !important;
  overflow-y: auto !important;
  visibility: visible !important;
  opacity: 1 !important;
  display: block !important;
}

.voice-selection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
}

.close-voice-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-voice-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.voice-options {
  padding: 8px;
}

.voice-option {
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.voice-option:hover {
  background-color: rgba(139, 92, 246, 0.2);
}

.voice-option.active {
  background-color: rgba(139, 92, 246, 0.4);
  border: 1px solid rgba(139, 92, 246, 0.6);
}

.voice-name {
  font-weight: 500;
  color: #ffffff;
}

.voice-lang {
  color: #a0a0a0;
  font-size: 0.75rem;
}

.no-voices-message {
  padding: 16px;
  text-align: center;
  color: #a0a0a0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .diagram-toolbar-compact {
    padding: 16px;
  }
  
  .toolbar-main-row {
    gap: 12px;
  }
  
  .toolbar-group {
    gap: 4px;
    padding: 6px 10px;
  }
  
  .toolbar-btn {
    width: 36px;
    height: 36px;
  }
  
  .toolbar-labels-row {
    padding: 4px 12px 0 12px;
  }
  
  .voice-selection-dropdown {
    right: 10px;
    left: 10px;
    min-width: auto;
  }
  
  /* Label font size managed by txt-label-xs class */
}

@media (max-width: 480px) {
  .toolbar-main-row {
    flex-direction: column;
    gap: 8px;
  }
  
  .toolbar-group {
    justify-content: center;
    width: 100%;
  }
  
  .toolbar-group.primary-group,
  .toolbar-group.playback-group {
    justify-content: center;
  }
  
  .toolbar-btn {
    width: 32px;
    height: 32px;
  }
}

.toolbar-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.8), rgba(40, 35, 65, 0.9));
  border-radius: 16px;
  border: 1px solid rgba(139, 92, 246, 0.3);
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.toolbar-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 25%, #ff6b6b 50%, #2ed573 75%, #667eea 100%);
  opacity: 0.8;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
}

.section-title {
  margin: 0;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(124, 58, 237, 0.4));
  border-radius: 8px;
  border: 1px solid rgba(139, 92, 246, 0.5);
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.2);
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
}

.section-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.6s ease;
}

.section-title:hover::before {
  left: 100%;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
}

.toolbar-btn img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  pointer-events: none;
}

.toolbar-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.6s ease;
}

.toolbar-btn:hover::before {
  left: 100%;
}

/* Primary buttons */
.toolbar-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.toolbar-btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Secondary buttons */
.toolbar-btn.secondary {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.3));
  color: #7c3aed;
  border: 1px solid rgba(139, 92, 246, 0.4);
}

.toolbar-btn.secondary:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(124, 58, 237, 0.4));
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.25);
}

/* Accent buttons */
.toolbar-btn.accent {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.toolbar-btn.accent:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
}

/* Control buttons */
.toolbar-btn.control {
  background: linear-gradient(135deg, #2ed573 0%, #1e90ff 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(46, 213, 115, 0.3);
}

.toolbar-btn.control:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(46, 213, 115, 0.4);
}

.btn-label {
  font-size: 0.85rem;
  font-weight: 600;
}

/* Diagram Container */
.diagram-container {
  min-height: 90vh !important; /* Increased height for better drag/zoom visibility */
  height: 90vh !important; /* Set explicit height to match min-height */
  background: transparent;
  border: none;
  border-radius: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: auto; /* Allow scrolling if content exceeds container */
  padding: 0;
  position: relative;
  width: 100%;
}

.diagram-content {
  width: 100%;
  height: 100%; /* Fill container height */
  min-height: 100%; /* Ensure it fills min-height of container */
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  padding: 0;
  margin: 0;
}

.diagram-wrapper {
  position: relative;
  display: inline-block;
  /* This wrapper will be transformed by panzoom */
  /* Both image and highlights will transform together */
}

.architecture-diagram {
  max-width: 100%; /* Don't exceed container width */
  width: auto; /* Let it be natural size, not forced to 100% */
  height: auto; /* Maintain aspect ratio */
  display: block;
  border-radius: 0;
  box-shadow: none;
}

/* Placeholder Styling */
.diagram-placeholder {
  text-align: center;
  padding: 40px;
}

.placeholder-icon {
  margin-bottom: 20px;
  opacity: 0.3;
}

.diagram-placeholder h4 {
  color: #7c3aed;
  font-weight: 600;
  margin-bottom: 10px;
}

.diagram-placeholder p {
  color: #666;
  margin-bottom: 25px;
}

.placeholder-features {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.placeholder-features span {
  padding: 6px 12px;
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.25);
  border-radius: 6px;
  color: #7c3aed;
}

/* Tablet */
@media (pointer: coarse) and (min-width: 768px) and (max-width: 1199px) {
  .diagram-container {
    min-height: 80vh !important; /* Increased height for better drag/zoom visibility */
    height: 80vh !important; /* Set explicit height */
    padding: 0;
  }
  
  .toolbar-btn {
    padding: 7px 12px;
  }
}

/* Mobile */
@media (pointer: coarse) and (max-width: 767px) {
  .diagram-toolbar {
    gap: 6px;
  }
  
  .toolbar-btn {
    padding: 6px 10px;
    /* Font size managed by font-sizes.css */
  }
  
  .btn-label {
    display: none;
  }
  
  /* Icon size managed by centralized classes */
  
  .diagram-container {
    min-height: 70vh !important; /* Increased height for better drag/zoom visibility */
    height: 70vh !important; /* Set explicit height */
    padding: 0;
  }
  
  .placeholder-icon {
    opacity: 0.7;
    /* Font size managed by font-sizes.css */
  }
}
</style>

<style>
/* Global Voice Selection Dropdown - Not scoped */
.voice-selection-dropdown-global {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.95), rgba(40, 35, 65, 0.98)) !important;
  border: 1px solid rgba(139, 92, 246, 0.4) !important;
  border-radius: 16px !important;
  backdrop-filter: blur(15px) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
  z-index: 9999999 !important;
  min-width: 320px !important;
  max-height: 400px !important;
  overflow: hidden !important;
  visibility: visible !important;
  opacity: 1 !important;
  display: block !important;
  padding: 0 !important;
}

.voice-selection-dropdown-global .voice-selection-header {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 12px 16px !important;
  border-bottom: 1px solid rgba(139, 92, 246, 0.2) !important;
  color: white !important;
}

.voice-selection-dropdown-global .close-voice-btn {
  background: none !important;
  border: none !important;
  color: white !important;
  font-size: 20px !important;
  cursor: pointer !important;
  padding: 0 !important;
  width: 24px !important;
  height: 24px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 50% !important;
  transition: background-color 0.2s !important;
}

.voice-selection-dropdown-global .voice-options {
  padding: 8px !important;
  max-height: 300px !important;
  overflow-y: auto !important;
  scrollbar-width: thin !important;
  scrollbar-color: rgba(139, 92, 246, 0.4) transparent !important;
}

.voice-selection-dropdown-global .voice-options::-webkit-scrollbar {
  width: 6px !important;
}

.voice-selection-dropdown-global .voice-options::-webkit-scrollbar-track {
  background: transparent !important;
}

.voice-selection-dropdown-global .voice-options::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.4) !important;
  border-radius: 3px !important;
}

.voice-selection-dropdown-global .voice-options::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.6) !important;
}

.voice-selection-dropdown-global .voice-option {
  width: 100% !important;
  padding: 12px 16px !important;
  background: none !important;
  border: none !important;
  border-radius: 8px !important;
  color: white !important;
  cursor: pointer !important;
  text-align: left !important;
  transition: background-color 0.2s !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 4px !important;
  margin-bottom: 8px !important;
}

.voice-selection-dropdown-global .voice-option:hover {
  background-color: rgba(139, 92, 246, 0.2) !important;
}

.voice-selection-dropdown-global .voice-option.active {
  background-color: rgba(139, 92, 246, 0.4) !important;
  border: 1px solid rgba(139, 92, 246, 0.6) !important;
}

.voice-selection-dropdown-global .voice-name {
  font-weight: 500 !important;
  color: white !important;
}

.voice-selection-dropdown-global .voice-lang {
  color: #a0a0a0 !important;
  font-size: 0.75rem !important;
}

/* === FULLSCREEN MODE === */
.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

.fullscreen-toolbar {
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.fullscreen-toolbar .toolbar-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.fullscreen-toolbar .toolbar-btn {
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.4);
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-toolbar .toolbar-btn:hover {
  background: rgba(139, 92, 246, 0.4);
  transform: translateY(-2px);
}

.fullscreen-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: white;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  z-index: 10001;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.fullscreen-diagram-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.fullscreen-diagram-container .diagram-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transform-origin: top left;
}

.fullscreen-diagram-img {
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
}

.fullscreen-overlay .highlight-overlay {
  position: absolute !important;
  top: 0;
  left: 0;
  /* Size will be set by Vue based on actual image dimensions */
  pointer-events: none;
  z-index: 10;
}

.fullscreen-narrator {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 10000;
}

.fullscreen-narrator > * {
  pointer-events: auto;
}

/* Fullscreen Loading Animation */
.fullscreen-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  backdrop-filter: blur(10px);
}
</style>

<style>
/* Global overrides for diagram container height - must be outside scoped */
/* Force diagram container height globally - INCREASED for better drag/zoom visibility */
.portfolio-details .diagram-container,
.diagram-container {
  min-height: 90vh !important;
  height: 90vh !important;
}

@media (pointer: coarse) and (min-width: 768px) and (max-width: 1199px) {
  .portfolio-details .diagram-container,
  .diagram-container {
    min-height: 80vh !important;
    height: 80vh !important;
  }
}

@media (pointer: coarse) and (max-width: 767px) {
  .portfolio-details .diagram-container,
  .diagram-container {
    min-height: 70vh !important;
    height: 70vh !important;
  }
}
</style>


