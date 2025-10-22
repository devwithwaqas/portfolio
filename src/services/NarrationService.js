/**
 * Unified Narration Service
 * Handles text-to-speech and coordinates with highlight service
 */
import highlightService from './HighlightService.js'

class NarrationService {
  constructor() {
    this.isPlaying = false
    this.currentStepIndex = 0
    this.narrationSteps = []
    this.currentUtterance = null
    this.speechSynthesis = window.speechSynthesis
    this.selectedVoice = null
    this.estimatedDuration = 0
  }

  /**
   * Initialize the service
   */
  init() {
    this.selectBestVoice()
  }

  /**
   * Select the best available voice
   */
  selectBestVoice() {
    const voices = this.speechSynthesis.getVoices()
    this.selectedVoice = voices.find(v => 
      /^en/i.test(v.lang) && v.localService
    ) || voices.find(v => 
      /^en/i.test(v.lang)
    ) || voices[0] || null
  }

  /**
   * Set narration steps
   */
  setNarrationSteps(steps) {
    this.narrationSteps = steps
    this.currentStepIndex = 0
  }

  /**
   * Start narration
   */
  start() {
    if (this.isPlaying || this.narrationSteps.length === 0) return

    this.isPlaying = true
    this.currentStepIndex = 0
    this.speakCurrentStep()
  }

  /**
   * Stop narration
   */
  stop() {
    this.isPlaying = false
    this.currentStepIndex = 0
    
    // Stop speech
    if (this.currentUtterance) {
      this.speechSynthesis.cancel()
      this.currentUtterance = null
    }

    // Clear highlights
    highlightService.clearAllHighlights()
  }

  /**
   * Pause narration
   */
  pause() {
    if (this.speechSynthesis.speaking) {
      this.speechSynthesis.pause()
    }
  }

  /**
   * Resume narration
   */
  resume() {
    if (this.speechSynthesis.paused) {
      this.speechSynthesis.resume()
    } else if (!this.isPlaying) {
      this.start()
    }
  }

  /**
   * Go to next step
   */
  next() {
    if (this.currentStepIndex < this.narrationSteps.length - 1) {
      this.currentStepIndex++
      this.speakCurrentStep()
    } else {
      this.stop()
    }
  }

  /**
   * Go to previous step
   */
  previous() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--
      this.speakCurrentStep()
    }
  }

  /**
   * Speak the current step
   */
  speakCurrentStep() {
    if (!this.isPlaying || this.currentStepIndex >= this.narrationSteps.length) return

    const step = this.narrationSteps[this.currentStepIndex]
    if (!step) return

    // Stop any ongoing speech
    if (this.speechSynthesis.speaking) {
      this.speechSynthesis.cancel()
    }

    // Handle highlighting
    this.handleStepHighlighting(step)

    // Prepare speech text
    const speechTitle = step.speechTitle || step.title
    const speechDescription = step.speechDescription || step.description
    const fullText = `${speechTitle}. ${speechDescription}`

    // Calculate estimated duration
    this.estimatedDuration = fullText.length / 14.62 // characters per second

    // Create and configure utterance
    this.currentUtterance = new SpeechSynthesisUtterance()
    this.currentUtterance.text = fullText
    this.currentUtterance.rate = 0.9
    this.currentUtterance.pitch = 1.0
    this.currentUtterance.volume = 0.8

    if (this.selectedVoice) {
      this.currentUtterance.voice = this.selectedVoice
    }

    // Set up event handlers
    this.currentUtterance.onend = () => {
      this.onStepComplete()
    }

    this.currentUtterance.onerror = (event) => {
      console.warn('Speech synthesis error:', event.error)
      this.onStepComplete()
    }

    // Speak
    this.speechSynthesis.speak(this.currentUtterance)
  }

  /**
   * Handle highlighting for the current step
   */
  handleStepHighlighting(step) {
    if (!step) return

    // Clear previous highlights
    highlightService.clearAllHighlights()

    // Handle different types of highlighting
    if (step.highlights && Array.isArray(step.highlights)) {
      // Multiple highlights (flow)
      const selectors = step.highlights.map(h => h.selector || h.id)
      highlightService.highlightFlow(selectors, { zoom: true })
    } else if (step.selector) {
      // Single element highlight
      highlightService.highlightElement(step.selector, { zoom: true })
    } else if (step.id) {
      // Element by ID
      highlightService.highlightElement(`#${step.id}`, { zoom: true })
    }
  }

  /**
   * Called when a step completes
   */
  onStepComplete() {
    if (!this.isPlaying) return

    // Auto-advance to next step after a short delay
    setTimeout(() => {
      if (this.isPlaying) {
        this.next()
      }
    }, 500)
  }

  /**
   * Get current state
   */
  getState() {
    return {
      isPlaying: this.isPlaying,
      currentStepIndex: this.currentStepIndex,
      totalSteps: this.narrationSteps.length,
      currentStep: this.narrationSteps[this.currentStepIndex],
      estimatedDuration: this.estimatedDuration,
      highlightState: highlightService.getState()
    }
  }

  /**
   * Get current step
   */
  getCurrentStep() {
    return this.narrationSteps[this.currentStepIndex]
  }

  /**
   * Check if narration is active
   */
  isActive() {
    return this.isPlaying
  }
}

// Create singleton instance
const narrationService = new NarrationService()

export default narrationService
