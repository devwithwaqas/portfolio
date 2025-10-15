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
          <button class="toolbar-btn control" title="Start narration">
            <img src="/assets/img/Icons/narration.png" alt="Narration" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn control" title="Play narration">
            <img src="/assets/img/Icons/play.png" alt="Play" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn control" title="Pause narration">
            <img src="/assets/img/Icons/pause.png" alt="Pause" class="icon-md icon-wrapper-md">
          </button>
          <button class="toolbar-btn control" title="Stop narration">
            <img src="/assets/img/Icons/stop.png" alt="Stop" class="icon-md icon-wrapper-md">
          </button>
        </div>
      </div>
      
      <!-- Optional: Collapsible Labels Row -->
      <div class="toolbar-labels-row">
        <span class="label-group txt-label-xs">View Controls</span>
        <span class="label-group txt-label-xs">Narration & Playback</span>
      </div>
    </div>
    
    <!-- Diagram Container -->
    <div class="diagram-container">
      <div class="diagram-content" id="diagram-content">
        <img 
          :src="diagramSrc" 
          alt="Architecture Diagram" 
          class="architecture-diagram"
        />
      </div>
    </div>
    
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import Panzoom from '@panzoom/panzoom'

export default {
  name: 'DiagramViewer',
  components: {
    ReusableCard
  },
  props: {
    title: {
      type: String,
      default: '🏛️ System Architecture'
    },
    diagramSrc: {
      type: String,
      default: '/assets/img/heat-exchanger-diagram.svg'
    }
  },
  data() {
    return {
      panzoomInstance: null,
      originalDimensions: {
        width: 0,
        height: 0
      }
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
  },
  methods: {
    initializePanzoom() {
      const diagramElement = this.$el.querySelector('.architecture-diagram')
      const containerElement = this.$el.querySelector('.diagram-content')
      
      if (!diagramElement || !containerElement) return

      // Wait for image to load to get its natural dimensions
      if (diagramElement.complete) {
        this.setupPanzoom(diagramElement, containerElement)
      } else {
        diagramElement.addEventListener('load', () => {
          this.setupPanzoom(diagramElement, containerElement)
        })
      }
    },

    setupPanzoom(diagramElement, containerElement) {
      // Store original dimensions
      this.originalDimensions = {
        width: diagramElement.naturalWidth || diagramElement.offsetWidth,
        height: diagramElement.naturalHeight || diagramElement.offsetHeight
      }

      // Initialize Panzoom
      this.panzoomInstance = Panzoom(diagramElement, {
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
    /* Font size managed by font-sizes.css */
  }
}
</style>

