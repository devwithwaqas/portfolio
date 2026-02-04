<template>
  <picture ref="pictureElement" :class="containerClass" class="optimized-image-container">
    <!-- AVIF (best compression, newer browsers) -->
    <source 
      v-if="avifSrc"
      :srcset="avifSrc"
      type="image/avif"
    />
    
    <!-- WebP (good compression, good browser support) -->
    <source 
      v-if="webpSrc"
      :srcset="webpSrc"
      type="image/webp"
    />
    
    <!-- Fallback (JPG/PNG) -->
    <LazyImage
      :src="fallbackSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :image-class="imageClass"
      :container-class="''"
      :lazy="lazy"
      :priority="priority"
      :threshold="threshold"
      :root-margin="rootMargin"
      :image-style="imageStyle"
      :placeholder-style="placeholderStyle"
      :show-error-text="showErrorText"
      @load="$emit('load', $event)"
    />
  </picture>
</template>

<script>
import LazyImage from './LazyImage.vue'

export default {
  name: 'OptimizedImage',
  components: {
    LazyImage
  },
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Image'
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    },
    lazy: {
      type: Boolean,
      default: true
    },
    priority: {
      type: String,
      default: 'auto',
      validator: (value) => ['high', 'low', 'auto'].includes(value)
    },
    threshold: {
      type: Number,
      default: 0.1
    },
    rootMargin: {
      type: String,
      default: '200px'
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
  computed: {
    // Generate WebP version path
    webpSrc() {
      if (!this.src) return null
      // Replace extension with .webp
      const base = this.src.replace(/\.(jpg|jpeg|png)$/i, '')
      // Handle both cases: already has -optimized or needs it added
      if (base.endsWith('-optimized')) {
        return `${base}.webp`
      } else if (base.endsWith('-optimized-optimized')) {
        // Fix double -optimized case
        return `${base.replace('-optimized-optimized', '-optimized')}.webp`
      } else {
        return `${base}-optimized.webp`
      }
    },
    
    // Generate AVIF version path
    avifSrc() {
      if (!this.src) return null
      const base = this.src.replace(/\.(jpg|jpeg|png)$/i, '')
      // Handle both cases: already has -optimized or needs it added
      if (base.endsWith('-optimized')) {
        return `${base}.avif`
      } else if (base.endsWith('-optimized-optimized')) {
        // Fix double -optimized case
        return `${base.replace('-optimized-optimized', '-optimized')}.avif`
      } else {
        return `${base}-optimized.avif`
      }
    },
    
    // Fallback to original if optimized doesn't exist, otherwise use optimized
    fallbackSrc() {
      if (!this.src) return ''
      // If src already has -optimized, use it, otherwise try -optimized version
      if (this.src.includes('-optimized')) {
        return this.src
      }
      // Try optimized version (fallback will handle if doesn't exist)
      const base = this.src.replace(/\.(jpg|jpeg|png)$/i, '')
      return `${base}-optimized${this.getExtension(this.src)}`
    }
  },
  methods: {
    getExtension(filename) {
      const match = filename.match(/\.(jpg|jpeg|png)$/i)
      return match ? match[0] : '.jpg'
    }
  }
}
</script>

<style scoped>
.optimized-image-container {
  display: inline-block;
  width: 100%;
  height: 100%;
}

/* Ensure picture element works properly */
picture {
  display: contents;
}
</style>
