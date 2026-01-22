// Interactive Architecture Diagrams
class ArchitectureDiagram {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error('Diagram container not found:', containerId);
      return;
    }
    
    this.viewport = this.container.querySelector('.diagram-viewport');
    this.svg = this.container.querySelector('.architecture-svg');
    
    if (!this.viewport || !this.svg) {
      console.error('Diagram elements not found in container:', containerId);
      return;
    }
    
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.isDragging = false;
    this.lastX = 0;
    this.lastY = 0;
    
    console.log('Initializing diagram for:', containerId);
    this.init();
    
    // Store instance globally for inline button access
    window.diagramInstance = this;
  }

  init() {
    // Don't create controls automatically since we're using inline buttons
    this.bindEvents();
    this.updateTransform();
    console.log('Diagram initialized successfully');
  }


  bindEvents() {
    // Mouse wheel zoom
    this.viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      this.zoomAtPoint(e.offsetX, e.offsetY, delta);
    });

    // Mouse drag pan
    this.viewport.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.viewport.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const deltaX = e.clientX - this.lastX;
        const deltaY = e.clientY - this.lastY;
        this.translateX += deltaX;
        this.translateY += deltaY;
        this.lastX = e.clientX;
        this.lastY = e.clientY;
        this.updateTransform();
      }
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.viewport.style.cursor = 'grab';
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let initialDistance = 0;

    this.viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        initialDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });

    this.viewport.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        this.translateX += deltaX;
        this.translateY += deltaY;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        this.updateTransform();
      } else if (e.touches.length === 2) {
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const scale = currentDistance / initialDistance;
        this.scale *= scale;
        this.scale = Math.max(0.1, Math.min(3, this.scale));
        initialDistance = currentDistance;
        this.updateTransform();
      }
    });
  }

  zoomIn() {
    this.scale = Math.min(3, this.scale * 1.2);
    this.updateTransform();
  }

  zoomOut() {
    this.scale = Math.max(0.1, this.scale / 1.2);
    this.updateTransform();
  }

  zoomAtPoint(x, y, factor) {
    const oldScale = this.scale;
    this.scale = Math.max(0.1, Math.min(3, this.scale * factor));
    
    if (this.scale !== oldScale) {
      const scaleRatio = this.scale / oldScale;
      this.translateX = x - (x - this.translateX) * scaleRatio;
      this.translateY = y - (y - this.translateY) * scaleRatio;
      this.updateTransform();
    }
  }

  resetView() {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.updateTransform();
    console.log('Reset view executed');
  }

  fitToView() {
    // Get the viewport dimensions
    const viewportWidth = this.viewport.clientWidth;
    const viewportHeight = this.viewport.clientHeight;
    
    // Get the SVG's natural dimensions (viewBox)
    const viewBox = this.svg.getAttribute('viewBox');
    const [, , svgWidth, svgHeight] = viewBox.split(' ').map(Number);
    
    // Calculate the scale to fit the SVG within the viewport
    const scaleX = viewportWidth / svgWidth;
    const scaleY = viewportHeight / svgHeight;
    this.scale = Math.min(scaleX, scaleY) * 0.9; // 90% to leave some margin
    
    // Center the SVG in the viewport
    this.translateX = (viewportWidth - svgWidth * this.scale) / 2;
    this.translateY = (viewportHeight - svgHeight * this.scale) / 2;
    
    this.updateTransform();
    console.log('Fit to view executed', { viewportWidth, viewportHeight, svgWidth, svgHeight, scale: this.scale });
  }

  updateTransform() {
    this.svg.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
  }
}

// Initialize diagrams when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing diagrams...');
  
  // Try to find the specific diagrams first
  const heatExchangerDiagram = document.getElementById('heat-exchanger-diagram');
  const airAsiaDiagram = document.getElementById('air-asia-diagram');
  
  if (heatExchangerDiagram) {
    console.log('Found heat exchanger diagram, initializing...');
    const diagram = new ArchitectureDiagram('heat-exchanger-diagram');
    window.diagramInstance = diagram; // Ensure global access
    console.log('Global diagram instance set:', window.diagramInstance);
  } else if (airAsiaDiagram) {
    console.log('Found Air Asia diagram, initializing...');
    const diagram = new ArchitectureDiagram('air-asia-diagram');
    window.diagramInstance = diagram; // Ensure global access
    console.log('Global diagram instance set:', window.diagramInstance);
  } else {
    console.log('Specific diagrams not found, looking for any diagram containers...');
    const diagramContainers = document.querySelectorAll('.architecture-diagram-container');
    diagramContainers.forEach((container, index) => {
      if (!container.id) {
        container.id = `diagram-${index}`;
      }
      console.log('Initializing diagram:', container.id);
      const diagram = new ArchitectureDiagram(container.id);
      window.diagramInstance = diagram; // Ensure global access
    });
  }
});

// Also try to initialize after a short delay in case DOM is not fully ready
setTimeout(function() {
  const heatExchangerDiagram = document.getElementById('heat-exchanger-diagram');
  const airAsiaDiagram = document.getElementById('air-asia-diagram');
  
  if (heatExchangerDiagram && !window.diagramInstance) {
    console.log('Delayed initialization for heat exchanger diagram...');
    const diagram = new ArchitectureDiagram('heat-exchanger-diagram');
    window.diagramInstance = diagram; // Ensure global access
    console.log('Delayed global diagram instance set:', window.diagramInstance);
  } else if (airAsiaDiagram && !window.diagramInstance) {
    console.log('Delayed initialization for Air Asia diagram...');
    const diagram = new ArchitectureDiagram('air-asia-diagram');
    window.diagramInstance = diagram; // Ensure global access
    console.log('Delayed global diagram instance set:', window.diagramInstance);
  }
}, 1000);
