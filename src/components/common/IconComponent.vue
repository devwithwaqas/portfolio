<template>
  <span :class="wrapperClass" ref="iconContainer">
    <!-- Show placeholder while loading (only for lazy local images) -->
    <span v-if="!isLoaded && !hasError && iconData && iconData.type === 'local' && lazy" class="icon-placeholder" :class="iconClass">
      <i class="bi bi-image" style="opacity: 0.3;"></i>
    </span>
    
    <!-- Devicon -->
    <i v-if="iconData && iconData.type === 'devicon'" :class="deviconClass + ' ' + iconClass"></i>
    
    <!-- Local Image with optional lazy loading and WebP/AVIF support -->
    <OptimizedImage
      v-else-if="iconData && iconData.type === 'local' && (isLoaded || !lazy)"
      :src="iconData.src"
      :alt="iconData.alt"
      :image-class="imageClass"
      :container-class="''"
      :lazy="lazy"
      :threshold="threshold"
      :root-margin="rootMargin"
      @load="onImageLoad"
    />
    
    <!-- Emoji Fallback -->
    <span v-else-if="iconData && iconData.type === 'emoji'" :class="iconClass">{{ iconData.src }}</span>
    <span v-else :class="iconClass">{{ fallbackEmoji }}</span>
    
    <!-- Error state -->
    <span v-if="hasError" :class="iconClass" style="opacity: 0.5;">
      {{ fallbackEmoji }}
    </span>
  </span>
</template>

<script>
import { resolveIcon, getDeviconClass } from '../../utils/iconResolver.js'
import OptimizedImage from './OptimizedImage.vue'

export default {
  name: 'IconComponent',
  components: {
    OptimizedImage
  },
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
      default: 'md', // xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'].includes(value)
    },
    lazy: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 0.1
    },
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
    this.iconData = resolveIcon(this.iconName)
    
    // For devicons and emojis, load immediately (no lazy loading needed)
    if (this.iconData && (this.iconData.type === 'devicon' || this.iconData.type === 'emoji')) {
      this.isLoaded = true
      return
    }
    
    // For local images, use IntersectionObserver for lazy loading
    if (this.iconData && this.iconData.type === 'local') {
      if (!this.lazy) {
        this.isLoaded = true
      } else {
        this.setupLazyLoading()
      }
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

.icon-wrapper-xs, .icon-wrapper-sm, .icon-wrapper-md, 
.icon-wrapper-lg, .icon-wrapper-xl, .icon-wrapper-2xl,
.icon-wrapper-3xl, .icon-wrapper-4xl, .icon-wrapper-5xl, .icon-wrapper-6xl {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  flex-shrink: 0;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.12) 0%, 
    rgba(236, 72, 153, 0.1) 100%
  );
  border-radius: 10px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Size-specific vertical alignment adjustments using transform for optical centering */
.icon-wrapper-xs {
  transform: translateY(1px);
}

.icon-wrapper-sm {
  transform: translateY(1px);
}

.icon-wrapper-md {
  transform: translateY(2px);
}

.icon-wrapper-lg {
  transform: translateY(2px);
}

.icon-wrapper-xl {
  transform: translateY(3px);
}

.icon-wrapper-2xl {
  transform: translateY(3px);
}

.icon-wrapper-3xl {
  transform: translateY(4px);
}

.icon-wrapper-4xl {
  transform: translateY(4px);
}

.icon-wrapper-5xl {
  transform: translateY(5px);
}

.icon-wrapper-6xl {
  transform: translateY(5px);
}

/* Hover effects with preserved translateY for each size */
.icon-wrapper-xs:hover, .icon-wrapper-sm:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.16) 100%);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(1px) scale(1.1) rotate(-3deg);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.icon-wrapper-md:hover, .icon-wrapper-lg:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.16) 100%);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(2px) scale(1.1) rotate(-3deg);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.icon-wrapper-xl:hover, .icon-wrapper-2xl:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.16) 100%);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(3px) scale(1.1) rotate(-3deg);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.icon-wrapper-3xl:hover, .icon-wrapper-4xl:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.16) 100%);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(4px) scale(1.1) rotate(-3deg);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.icon-wrapper-5xl:hover, .icon-wrapper-6xl:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.16) 100%);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(5px) scale(1.1) rotate(-3deg);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}
</style>
