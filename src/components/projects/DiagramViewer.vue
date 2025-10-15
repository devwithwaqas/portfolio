<template>
  <ReusableCard :title="title" class="mb-4">
    
    <!-- Compact Diagram Toolbar -->
    <div class="diagram-toolbar-compact">
      <div class="toolbar-main-row">
        <!-- View Controls (Left) -->
        <div class="toolbar-group view-group">
          <button class="toolbar-btn primary" title="Zoom into diagram" @click="zoomIn">
            <img src="/assets/img/Icons/zoom in.png" alt="Zoom In" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn primary" title="Zoom out of diagram" @click="zoomOut">
            <img src="/assets/img/Icons/zoom out.png" alt="Zoom Out" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn primary" title="Fit diagram to view" @click="fitToView">
            <img src="/assets/img/Icons/fit to view.png" alt="Fit to View" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn primary" title="Reset view to default" @click="resetView">
            <img src="/assets/img/Icons/reset view.png" alt="Reset View" class="icon-md icon-wrapper-md">
          </button>
        </div>
        
        <!-- Narration Controls (Right) -->
                <div class="toolbar-group narration-group">
                  <button class="toolbar-btn control" title="Start narration" @click="startNarration">
                    <img src="/assets/img/Icons/narration.png" alt="Narration" class="icon-md icon-wrapper-md">
                  </button>
                  <button class="toolbar-btn control" title="Previous step" @click="previousNarration">
                    <img src="/assets/img/Icons/rewind.png" alt="Rewind" class="icon-md icon-wrapper-md">
                  </button>
                  <button class="toolbar-btn control" title="Play/Resume narration" @click="playNarration">
                    <img src="/assets/img/Icons/play.png" alt="Play" class="icon-md icon-wrapper-md">
                  </button>
                  <button class="toolbar-btn control" title="Next step" @click="nextNarration">
                    <img src="/assets/img/Icons/forward.png" alt="Forward" class="icon-md icon-wrapper-md">
                  </button>
                  <button class="toolbar-btn control" title="Pause narration" @click="pauseNarration">
                    <img src="/assets/img/Icons/pause.png" alt="Pause" class="icon-md icon-wrapper-md">
                  </button>
                  <button class="toolbar-btn control" title="Stop narration" @click="stopNarration">
                    <img src="/assets/img/Icons/stop.png" alt="Stop" class="icon-md icon-wrapper-md">
                  </button>
                  <button class="toolbar-btn control" title="Select voice" @click="toggleVoiceSelection">
                    <img src="/assets/img/Icons/speech.png" alt="Voice" class="icon-md icon-wrapper-md">
                  </button>
                </div>
      </div>
      
      
      <!-- Voice Selection Dropdown - Teleported to body -->
      <Teleport to="body">
        <div v-if="showVoiceSelection" class="voice-selection-dropdown-global">
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
          <img 
            :src="diagramSrc" 
            alt="Architecture Diagram" 
            class="architecture-diagram"
            ref="diagramImage"
          />
          
          <!-- Highlight Overlay - positioned relative to diagram and transforms with zoom -->
          <HighlightOverlay
            v-if="narrationSteps.length > 0"
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

    <!-- Diagram Narrator -->
    <DiagramNarrator 
      v-if="narrationSteps.length > 0"
      ref="narrator"
      :narrationSteps="narrationSteps"
      :svgElement="svgElement"
      :highlightStyle="highlightStyle"
      :highlightColor="highlightColor"
      @narration-started="onNarrationStarted"
      @step-changed="onStepChanged"
      @narration-stopped="onNarrationStopped"
    />
    
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import DiagramNarrator from './DiagramNarrator.vue'
import HighlightOverlay from './HighlightOverlay.vue'
import Panzoom from '@panzoom/panzoom'

export default {
  name: 'DiagramViewer',
  components: {
    ReusableCard,
    DiagramNarrator,
    HighlightOverlay
  },
  props: {
    title: {
      type: String,
      default: '🏛️ System Architecture'
    },
    diagramSrc: {
      type: String,
      default: '/assets/img/heat-exchanger-diagram.svg'
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
      currentHighlights: [],
      svgWidth: 2400,
      svgHeight: 2200
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initializePanzoom()
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
    initializePanzoom() {
      const diagramElement = this.$el.querySelector('.architecture-diagram')
      const wrapperElement = this.$el.querySelector('.diagram-wrapper')
      const containerElement = this.$el.querySelector('.diagram-content')
      
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
      this.panzoomInstance = Panzoom(wrapperElement, {
        maxScale: 5,
        minScale: 0.5,
        contain: 'outside',
        cursor: 'move',
        canvas: true
      })

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
        this.panzoomInstance.zoomOut({
          animate: true
        })
      }
    },

    fitToView() {
      if (!this.panzoomInstance) return

      const containerElement = this.$el.querySelector('.diagram-content')
      const diagramElement = this.$el.querySelector('.architecture-diagram')
      
      if (!containerElement || !diagramElement) return

      const containerRect = containerElement.getBoundingClientRect()
      const diagramWidth = this.originalDimensions.width
      const diagramHeight = this.originalDimensions.height

      // Calculate scale to fit
      const scaleX = (containerRect.width - 40) / diagramWidth // 40px for padding
      const scaleY = (containerRect.height - 40) / diagramHeight
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

    // Narration Controls
    startNarration() {
      if (this.$refs.narrator) {
        this.$refs.narrator.start()
        this.isNarrating = true
        this.updateHighlights()
      }
    },

    playNarration() {
      if (this.$refs.narrator) {
        this.$refs.narrator.resume()
        // If narration wasn't active, resume() calls start() which emits 'narration-started'
        // The event handler will update the state and highlights
      }
    },

    pauseNarration() {
      if (this.$refs.narrator) {
        this.$refs.narrator.pause()
      }
    },

    stopNarration() {
      if (this.$refs.narrator) {
        this.$refs.narrator.stop()
        this.isNarrating = false
        this.currentHighlights = []
      }
    },

    updateHighlights() {
      if (this.$refs.narrator) {
        const currentStep = this.$refs.narrator.currentStep
        if (currentStep && currentStep.highlights) {
          this.currentHighlights = currentStep.highlights
        } else {
          this.currentHighlights = []
        }
      }
    },

    onNarrationStarted() {
      console.log('[DiagramViewer] Narration started')
      this.isNarrating = true
      this.updateHighlights()
    },

    onStepChanged(stepIndex, currentStep) {
      console.log('[DiagramViewer] Step changed to:', stepIndex, currentStep)
      if (currentStep && currentStep.highlights) {
        this.currentHighlights = currentStep.highlights
      } else {
        this.currentHighlights = []
      }
    },

    onNarrationStopped() {
      console.log('[DiagramViewer] Narration stopped, clearing highlights')
      this.isNarrating = false
      this.currentHighlights = []
    },

    nextNarration() {
      if (this.$refs.narrator) {
        console.log('[DiagramViewer] Next narration button pressed')
        this.$refs.narrator.next()
        this.$nextTick(() => {
          this.updateHighlights()
        })
      }
    },

    previousNarration() {
      if (this.$refs.narrator) {
        console.log('[DiagramViewer] Previous narration button pressed')
        this.$refs.narrator.previous()
        this.$nextTick(() => {
          this.updateHighlights()
        })
      }
    },

    toggleVoiceSelection() {
      console.log('[DiagramViewer] Voice button clicked, current state:', this.showVoiceSelection)
      this.showVoiceSelection = !this.showVoiceSelection
      console.log('[DiagramViewer] Voice dropdown now:', this.showVoiceSelection)
      
      if (this.showVoiceSelection && this.availableVoices.length === 0) {
        console.log('[DiagramViewer] Loading available voices...')
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
        const toolbar = this.$el.querySelector('.diagram-toolbar-compact')
        
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
        console.log('[DiagramViewer] Speech synthesis supported, loading voices...')
        // Load voices when user opens the dropdown
        const loadVoices = () => {
          const allVoices = window.speechSynthesis.getVoices()
          console.log('[DiagramViewer] Total voices found:', allVoices.length)
          
          this.availableVoices = allVoices.filter(voice => 
            voice.lang.startsWith('en') // Filter for English voices
          ).map(voice => ({
            name: voice.name,
            lang: voice.lang,
            voice: voice
          }))
          
          console.log('[DiagramViewer] English voices found:', this.availableVoices.length)
          console.log('[DiagramViewer] Available voices:', this.availableVoices.map(v => v.name))
          
          // If no English voices found, use all voices
          if (this.availableVoices.length === 0) {
            console.log('[DiagramViewer] No English voices found, using all voices')
            this.availableVoices = allVoices.map(voice => ({
              name: voice.name,
              lang: voice.lang,
              voice: voice
            }))
          }
          
          // Set default voice if none selected
          if (!this.selectedVoice && this.availableVoices.length > 0) {
            this.selectedVoice = this.availableVoices[0].name
            console.log('[DiagramViewer] Default voice set to:', this.selectedVoice)
          }
        }
        
        // Load voices immediately if available
        loadVoices()
        
        // Also listen for voices to be loaded
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = loadVoices
        }
      } else {
        console.log('[DiagramViewer] Speech synthesis not supported')
      }
    },

    selectVoice(voiceObj) {
      this.selectedVoice = voiceObj.name
      this.showVoiceSelection = false
      
      // Pass selected voice to narrator
      if (this.$refs.narrator) {
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
  padding: 20px;
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
  min-height: 600px;
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.95), rgba(45, 30, 70, 0.9));
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 20px;
  position: relative;
}

.diagram-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.diagram-wrapper {
  position: relative;
  display: inline-block;
  /* This wrapper will be transformed by panzoom */
  /* Both image and highlights will transform together */
}

.architecture-diagram {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
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
    min-height: 500px;
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
    min-height: 400px;
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
</style>

