<template>
  <div ref="imageContainer" class="lazy-image-container" :class="containerClass">
    <!-- Placeholder while loading - always rendered to maintain layout space -->
    <div v-show="!isLoaded && !hasError" class="lazy-image-placeholder" :style="placeholderStyle">
      <i class="bi bi-image" style="opacity: 0.1; font-size: 0.75rem;"></i>
    </div>
    
    <!-- Actual image - load when shouldLoad is true -->
    <img 
      v-if="shouldLoad"
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
      default: '200px' // Increased default to start loading earlier, before scroll reaches element
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
      imageElement: null,
      shouldLoad: false // Separate flag to control when to actually load the image
    }
  },
  expose: ['imageElement'],
  watch: {
    // Watch lazy prop changes - if it becomes false, load immediately
    lazy(newValue, oldValue) {
      // If lazy was true and now is false, start loading immediately
      if (oldValue === true && newValue === false && !this.shouldLoad) {
        // Stop observing since we're loading eagerly now
        if (this.observer && this.$refs.imageContainer) {
          this.observer.unobserve(this.$refs.imageContainer)
          this.observer = null
        }
        // Start loading
        this.shouldLoad = true
      }
    }
  },
  mounted() {
    // If lazy is disabled, load immediately
    if (!this.lazy) {
      this.isLoaded = true
      this.shouldLoad = true
      // Get image element reference immediately for eager loading
      this.$nextTick(() => {
        if (this.$refs.imageElementRef) {
          this.imageElement = this.$refs.imageElementRef
        }
      })
      return
    }
    
    // For lazy loading, show placeholder immediately but start observing
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
          this.shouldLoad = true
          this.isLoaded = true
          return
        }
        
        // Create IntersectionObserver with larger rootMargin to start loading earlier
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // Image is visible or near viewport, start loading
                this.shouldLoad = true
                // Stop observing once we've decided to load
                if (this.observer) {
                  this.observer.unobserve(entry.target)
                }
              }
            })
          },
          {
            threshold: this.threshold,
            rootMargin: this.rootMargin || '100px' // Default to larger margin for earlier loading
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
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  line-height: 0;
}

.lazy-image-placeholder,
.lazy-image-error {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  line-height: 1;
  vertical-align: top;
  opacity: 0.3;
  font-size: 0.75rem;
}

.lazy-image-container img {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  display: block;
  max-width: 100%;
  max-height: 100%;
}

.lazy-image-container img[src] {
  opacity: 1;
}
</style>
