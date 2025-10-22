<template>
  <div class="diagram-narrator">
    <!-- Narration Bubble -->
    <NarrationBubble
      :visible="isNarrating && !!currentStep"
      :step="currentStep"
      :step-index="currentStepIndex"
      :total-steps="narrationSteps.length"
      :is-auto-playing="isAutoPlaying"
      :is-narrating="isNarrating"
      :estimated-duration="estimatedDuration"
      :speech-progress="speechProgress"
      :estimated-time-remaining="estimatedTimeRemaining"
      :container-element="containerElement"
    />

  </div>
</template>

<script>
import NarrationBubble from './NarrationBubble.vue'

export default {
  name: 'DiagramNarrator',
  components: {
    NarrationBubble
  },
  props: {
    narrationSteps: {
      type: Array,
      required: true
    },
    svgElement: {
      type: Object,
      default: null
    },
    autoAdvanceDelay: {
      type: Number,
      default: 5000 // 5 seconds per step
    },
    highlightStyle: {
      type: String,
      default: 'glow', // 'glow', 'pulse', 'dashed', 'solid'
      validator: (value) => ['glow', 'pulse', 'dashed', 'solid'].includes(value)
    },
    highlightColor: {
      type: String,
      default: '#8b5cf6' // Purple
    }
  },
  data() {
    return {
      isNarrating: false,
      isAutoPlaying: false,
      currentStepIndex: 0,
      svgWidth: 2400,
      svgHeight: 2200,
      currentUtterance: null,
      selectedVoice: null,
      speechProgress: 0,
      estimatedDuration: 0,
      speechStartTime: null,
      progressInterval: null,
      currentTime: Date.now(), // Add reactive time trigger
      containerElement: null, // Container element for bubble positioning
      // Debug flag to control console logging
      debugMode: false
    }
  },
  computed: {
    currentStep() {
      return this.narrationSteps[this.currentStepIndex] || null
    },
    currentHighlights() {
      if (!this.currentStep || !this.currentStep.highlights) return []
      return this.currentStep.highlights
    },
    progressBarWidth() {
      return `${this.speechProgress}%`
    },
    estimatedTimeRemaining() {
      if (this.estimatedDuration === 0 || !this.speechStartTime) return 0
      // Use reactive currentTime to trigger updates
      const elapsed = (this.currentTime - this.speechStartTime) / 1000
      const remaining = Math.max(0, this.estimatedDuration - elapsed)
      return Math.ceil(remaining) // Use ceil to show remaining seconds more clearly
    }
  },
  watch: {
    svgElement: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.extractSvgDimensions()
        }
        // Container element is now passed to NarrationBubble component
        this.containerElement = newVal
      }
    },
    currentStepIndex() {
      // Bubble positioning is now handled by NarrationBubble component
    }
  },
  mounted() {
    // Add keyboard navigation
    window.addEventListener('keydown', this.handleKeyPress)
  },
  beforeUnmount() {
    this.stopSpeaking()
    this.stopProgressTracking()
    window.removeEventListener('keydown', this.handleKeyPress)
  },
  methods: {
    // Debug logging helper
    debugLog(message, ...args) {
      if (this.debugMode) {
        console.log(`[DiagramNarrator] ${message}`, ...args)
      }
    },
    
    debugWarn(message, ...args) {
      if (this.debugMode) {
        console.warn(`[DiagramNarrator] ${message}`, ...args)
      }
    },

    handleKeyPress(event) {
      if (!this.isNarrating) return
      
      switch(event.key) {
        case 'ArrowRight':
        case 'n':
        case 'N':
          event.preventDefault()
          this.next()
          break
        case 'ArrowLeft':
        case 'p':
        case 'P':
          event.preventDefault()
          this.previous()
          break
        case ' ':
        case 'Spacebar':
          event.preventDefault()
          if (this.isAutoPlaying) {
            this.pause()
          } else {
            this.resume()
          }
          break
        case 'Escape':
          event.preventDefault()
          this.stop()
          break
      }
    },
    start() {
      this.debugLog('Starting narration with auto-play')
      this.isNarrating = true
      this.isAutoPlaying = true
      this.currentStepIndex = 0
      this.$emit('narration-started')
      this.$emit('step-changed', this.currentStepIndex, this.currentStep)
      this.speakCurrentStep()
    },
    pause() {
      this.debugLog('Pausing auto-play')
      this.isAutoPlaying = false
      this.stopSpeaking()
    },
    resume() {
      this.debugLog('Resuming auto-play')
      if (!this.isNarrating) {
        this.debugLog('Not narrating, starting narration instead')
        this.start()
        return
      }
      this.isAutoPlaying = true
      this.speakCurrentStep()
    },
    stop() {
      this.debugLog('Stopping narration')
      this.isNarrating = false
      this.isAutoPlaying = false
      this.currentStepIndex = 0
      this.stopSpeaking()
      this.$emit('narration-stopped')
    },
    next() {
      this.debugLog('Next step (manual)')
      if (this.currentStepIndex < this.narrationSteps.length - 1) {
        this.currentStepIndex++
        this.speakCurrentStep()
      } else {
        this.stop()
      }
    },
    previous() {
      this.debugLog('Previous step (manual)')
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--
        this.speakCurrentStep()
      }
    },
    advanceToNextStep() {
      this.debugLog('Auto-advancing to next step')
      if (this.currentStepIndex < this.narrationSteps.length - 1) {
        this.currentStepIndex++
        this.$emit('step-changed', this.currentStepIndex, this.currentStep)
        this.speakCurrentStep()
      } else {
        this.debugLog('Reached last step, stopping')
        this.stop()
      }
    },
    speakCurrentStep() {
      if (!this.currentStep) return
      
      // Stop any ongoing speech from previous step
      if (window.speechSynthesis.speaking) {
        this.debugLog('Canceling previous speech')
        window.speechSynthesis.cancel()
      }
      
      // Calculate estimated duration based on character count
      const speechTitle = this.currentStep.speechTitle || this.currentStep.title
      const speechDescription = this.currentStep.speechDescription || this.currentStep.description
      const fullText = `${speechTitle}. ${speechDescription}`
      
      // Count ALL characters including spaces
      const characterCount = fullText.length
      
      // API Gateway slide: "Application Programming Interface Gateway Layer. OpenShift Application Programming Interface Gateway serves as the secure entry point, handling authentication using JSON Web Token and OAuth2, authorization, Transport Layer Security termination, and web application firewall protection."
      // Total characters: 285 characters in 19.5 seconds (updated measurement)
      // So rate = 285 characters ÷ 19.5 seconds = 14.62 characters/second
      const charactersPerSecond = 14.62
      this.estimatedDuration = characterCount / charactersPerSecond
      
      this.debugLog('Title:', speechTitle)
      this.debugLog('Description:', speechDescription.substring(0, 50) + '...')
      this.debugLog('Full text:', fullText)
      this.debugLog('Total character count:', characterCount, 'Estimated duration:', this.estimatedDuration.toFixed(1), 'seconds')
      this.debugLog('Rate used:', charactersPerSecond, 'characters/second')
      
      // Use Web Speech API for text-to-speech
      if ('speechSynthesis' in window) {
        // Small delay to ensure cancel completes
        setTimeout(() => {
        this.currentUtterance = new SpeechSynthesisUtterance()
        this.currentUtterance.text = fullText
        this.currentUtterance.rate = 0.9 // Slightly slower for clarity
        this.currentUtterance.pitch = 1.0
        this.currentUtterance.volume = 0.8
        
        // Use selected voice if available
        if (this.selectedVoice) {
          this.currentUtterance.voice = this.selectedVoice
        }
          
          this.debugLog('Speaking:', this.currentUtterance.text.substring(0, 50) + '...')
          this.debugLog('Full text length:', this.currentUtterance.text.length, 'characters')
          
          // Log when speech starts
          this.currentUtterance.onstart = () => {
            this.debugLog('Speech started')
            this.speechStartTime = Date.now()
            this.speechProgress = 0
            this.startProgressTracking()
          }
          
          // When speech ends, auto-advance to next step if auto-playing
          this.currentUtterance.onend = () => {
            this.debugLog('Speech finished naturally')
            this.stopProgressTracking()
            this.speechProgress = 100
            
            // Immediately advance to next step
            if (this.isAutoPlaying && this.isNarrating) {
              this.advanceToNextStep()
            }
          }
          
          this.currentUtterance.onerror = (event) => {
            this.debugLog('Speech event:', event.error, '- This is normal during navigation')
            this.stopProgressTracking()
            // Don't advance on "interrupted" errors - they're expected during navigation
            if (event.error !== 'interrupted' && this.isAutoPlaying && this.isNarrating) {
              this.debugLog('Real error, advancing to next step')
              this.advanceToNextStep()
            }
          }
          
          window.speechSynthesis.speak(this.currentUtterance)
        }, 100)
      } else {
        this.debugWarn('Speech synthesis not supported')
      }
    },
    stopSpeaking() {
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        this.debugLog('Stopping speech (user action)')
        window.speechSynthesis.cancel()
        this.currentUtterance = null
      }
    },
    extractSvgDimensions() {
      if (!this.svgElement) return
      
      const viewBox = this.svgElement.getAttribute('viewBox')
      if (viewBox) {
        const [, , width, height] = viewBox.split(' ').map(Number)
        this.svgWidth = width
        this.svgHeight = height
      }
    },

    // New methods for navigation and voice control
    next() {
      this.debugLog('Next button pressed, current index:', this.currentStepIndex)
      if (this.currentStepIndex < this.narrationSteps.length - 1) {
        // Stop current speech first
        this.stopSpeaking()
        // Wait a moment for speech to fully stop
        setTimeout(() => {
          this.currentStepIndex++
          this.debugLog('Advanced to step:', this.currentStepIndex + 1)
          this.$emit('step-changed', this.currentStepIndex, this.currentStep)
          this.speakCurrentStep()
        }, 200)
      } else {
        this.debugLog('Already at last step')
      }
    },

    previous() {
      this.debugLog('Previous button pressed, current index:', this.currentStepIndex)
      if (this.currentStepIndex > 0) {
        // Stop current speech first
        this.stopSpeaking()
        // Wait a moment for speech to fully stop
        setTimeout(() => {
          this.currentStepIndex--
          this.debugLog('Moved back to step:', this.currentStepIndex + 1)
          this.$emit('step-changed', this.currentStepIndex, this.currentStep)
          this.speakCurrentStep()
        }, 200)
      } else {
        this.debugLog('Already at first step')
      }
    },

    stopSpeaking() {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        this.debugLog('Stopping current speech immediately')
        window.speechSynthesis.cancel()
        // Clear any pending utterances
        this.currentUtterance = null
      }
    },

    setVoice(voice) {
      this.selectedVoice = voice
      this.debugLog('Voice set to:', voice?.name || 'Default')
    },
    
    startProgressTracking() {
      this.stopProgressTracking() // Clear any existing interval
      this.progressInterval = setInterval(() => {
        if (this.speechStartTime && this.estimatedDuration > 0) {
          this.currentTime = Date.now() // Update reactive time
          const elapsed = (this.currentTime - this.speechStartTime) / 1000
          this.speechProgress = Math.min(100, (elapsed / this.estimatedDuration) * 100)
        }
      }, 50) // Update every 50ms for smooth progress bar
    },
    
    stopProgressTracking() {
      if (this.progressInterval) {
        clearInterval(this.progressInterval)
        this.progressInterval = null
      }
    }
  }
}
</script>

<style scoped>
.diagram-narrator {
  position: relative;
}



</style>

