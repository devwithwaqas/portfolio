<template>
  <span :class="wrapperClass" ref="iconContainer">
    <!-- Show placeholder while loading -->
    <span v-if="!isLoaded && !hasError" class="icon-placeholder" :class="iconClass">
      <i class="bi bi-image" style="opacity: 0.3;"></i>
    </span>
    
    <!-- Devicon -->
    <i v-if="isLoaded && iconData && iconData.type === 'devicon'" :class="deviconClass + ' ' + iconClass"></i>
    
    <!-- Local Image with lazy loading -->
    <img 
      v-else-if="isLoaded && iconData && iconData.type === 'local'" 
      :src="iconData.src" 
      :alt="iconData.alt" 
      :class="imageClass"
      @load="onImageLoad"
      @error="onImageError"
      loading="lazy"
    />
    
    <!-- Emoji Fallback -->
    <span v-else-if="isLoaded" :class="iconClass">
      {{ iconData && iconData.type === 'emoji' ? iconData.src : fallbackEmoji }}
    </span>
    
    <!-- Error state -->
    <span v-if="hasError" :class="iconClass" style="opacity: 0.5;">
      {{ fallbackEmoji }}
    </span>
  </span>
</template>

<script>
import { resolveIcon, getDeviconClass } from '../../utils/iconResolver.js'

export default {
  name: 'LazyIcon',
  props: {
    iconName: {
      type: String,
      required: true
    },
    fallbackEmoji: {
      type: String,
      default: '📋'
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'].includes(value)
    },
    // Threshold for IntersectionObserver (0.1 = load when 10% visible)
    threshold: {
      type: Number,
      default: 0.1
    },
    // Root margin for IntersectionObserver (load slightly before entering viewport)
    rootMargin: {
      type: String,
      default: '50px'
    }
  },
  data() {
    return {
      iconData: null,
      isLoaded: false,
      hasError: false,
      observer: null
    }
  },
  mounted() {
    // Resolve icon data
    this.iconData = resolveIcon(this.iconName)
    
    // For devicons and emojis, load immediately (no lazy loading needed)
    if (this.iconData && (this.iconData.type === 'devicon' || this.iconData.type === 'emoji')) {
      this.isLoaded = true
      return
    }
    
    // For local images, use IntersectionObserver for lazy loading
    if (this.iconData && this.iconData.type === 'local') {
      this.setupLazyLoading()
    } else {
      // No icon data found, show fallback immediately
      this.isLoaded = true
    }
  },
  beforeUnmount() {
    // Clean up IntersectionObserver
    if (this.observer && this.$refs.iconContainer) {
      this.observer.unobserve(this.$refs.iconContainer)
      this.observer = null
    }
  },
  methods: {
    setupLazyLoading() {
      // Use Vue's $nextTick to ensure DOM is ready
      this.$nextTick(() => {
        if (!this.$refs.iconContainer) return
        
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
                // Icon is visible, load it
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
        this.observer.observe(this.$refs.iconContainer)
      })
    },
    onImageLoad() {
      // Image loaded successfully
      this.hasError = false
    },
    onImageError() {
      // Image failed to load
      this.hasError = true
      this.isLoaded = true // Show fallback
    }
  },
  computed: {
    deviconClass() {
      if (this.iconData && this.iconData.type === 'devicon') {
        return getDeviconClass(this.iconData.src)
      }
      return null
    },
    wrapperClass() {
      return `icon-wrapper-${this.size}`
    },
    iconClass() {
      return `icon-${this.size}`
    },
    imageClass() {
      return `icon-img-${this.size}`
    }
  }
}
</script>

<style scoped>
.icon-placeholder {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1em;
  min-height: 1em;
}

/* Smooth transition when icon loads */
img {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

img[src] {
  opacity: 1;
}
</style>
