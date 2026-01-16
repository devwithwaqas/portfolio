<template>
  <div ref="imageContainer" class="lazy-image-container" :class="containerClass">
    <!-- Placeholder while loading -->
    <div v-if="!isLoaded && !hasError" class="lazy-image-placeholder" :style="placeholderStyle">
      <i class="bi bi-image" style="opacity: 0.2; font-size: 2rem;"></i>
    </div>
    
    <!-- Actual image -->
    <img 
      v-if="isLoaded || !lazy"
      :src="src" 
      :alt="alt"
      :class="imageClass"
      :style="imageStyle"
      @load="onImageLoad"
      @error="onImageError"
      :loading="lazy ? 'lazy' : 'eager'"
      :fetchpriority="priority"
      ref="imageElementRef"
    />
    
    <!-- Error fallback -->
    <div v-if="hasError" class="lazy-image-error" :style="placeholderStyle">
      <i class="bi bi-image" style="opacity: 0.3;"></i>
      <span v-if="showErrorText" style="font-size: 0.875rem; opacity: 0.5;">Failed to load</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LazyImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Image'
    },
    lazy: {
      type: Boolean,
      default: true
    },
    priority: {
      type: String,
      default: 'auto', // 'high', 'low', 'auto'
      validator: (value) => ['high', 'low', 'auto'].includes(value)
    },
    threshold: {
      type: Number,
      default: 0.1
    },
    rootMargin: {
      type: String,
      default: '50px'
    },
    containerClass: {
      type: String,
      default: ''
    },
    imageClass: {
      type: String,
      default: ''
    },
    imageStyle: {
      type: Object,
      default: () => ({})
    },
    placeholderStyle: {
      type: Object,
      default: () => ({})
    },
    showErrorText: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoaded: false,
      hasError: false,
      observer: null,
      imageElement: null
    }
  },
  expose: ['imageElement'],
  mounted() {
    // If lazy is disabled, load immediately
    if (!this.lazy) {
      this.isLoaded = true
      // Get image element reference immediately for eager loading
      this.$nextTick(() => {
        if (this.$refs.imageElementRef) {
          this.imageElement = this.$refs.imageElementRef
        }
      })
      return
    }
    
    // Setup lazy loading with IntersectionObserver
    this.setupLazyLoading()
  },
  beforeUnmount() {
    // Clean up IntersectionObserver
    if (this.observer && this.$refs.imageContainer) {
      this.observer.unobserve(this.$refs.imageContainer)
      this.observer = null
    }
  },
  methods: {
    setupLazyLoading() {
      this.$nextTick(() => {
        if (!this.$refs.imageContainer) return
        
        // Check if IntersectionObserver is supported
        if (typeof IntersectionObserver === 'undefined') {
          // Fallback: load immediately if IntersectionObserver not supported
          this.isLoaded = true
          return
        }
        
        // Create IntersectionObserver
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // Image is visible, load it
                this.isLoaded = true
                // Stop observing once loaded
                if (this.observer) {
                  this.observer.unobserve(entry.target)
                }
              }
            })
          },
          {
            threshold: this.threshold,
            rootMargin: this.rootMargin
          }
        )
        
        // Start observing
        this.observer.observe(this.$refs.imageContainer)
      })
    },
    onImageLoad(event) {
      // Image loaded successfully
      this.hasError = false
      // Store reference to image element for parent access
      this.imageElement = event.target
      // Emit load event for parent components (passes the event with target)
      this.$emit('load', event)
    },
    onImageError() {
      // Image failed to load
      this.hasError = true
      this.isLoaded = true // Show error state
    }
  }
}
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.lazy-image-placeholder,
.lazy-image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 200px;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.05) 0%, 
    rgba(236, 72, 153, 0.05) 100%
  );
  border-radius: 8px;
}

.lazy-image-container img {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.lazy-image-container img[src] {
  opacity: 1;
}
</style>
