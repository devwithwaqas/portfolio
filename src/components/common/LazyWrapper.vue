<template>
  <div ref="wrapper" class="lazy-wrapper">
    <slot v-if="shouldLoad"></slot>
    <div v-else class="lazy-placeholder" :style="placeholderStyle">
      <div class="lazy-placeholder-content">
        <i class="bi bi-hourglass-split" style="opacity: 0.3; font-size: 1.5rem;"></i>
        <span v-if="showPlaceholderText" style="font-size: 0.875rem; opacity: 0.5; margin-top: 8px;">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LazyWrapper',
  props: {
    rootMargin: { type: String, default: '500px' },
    threshold: { type: Number, default: 0.01 },
    minHeight: { type: String, default: '200px' },
    showPlaceholderText: { type: Boolean, default: false },
    placeholderStyle: { type: Object, default: () => ({}) }
  },
  data() {
    return { shouldLoad: false, observer: null }
  },
  mounted() {
    if (typeof IntersectionObserver === 'undefined') {
      this.shouldLoad = true
      return
    }
    try {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.shouldLoad = true
            if (this.observer && this.$refs.wrapper) {
              this.observer.unobserve(this.$refs.wrapper)
            }
          }
        })
      }, { rootMargin: this.rootMargin, threshold: this.threshold })
      if (this.$refs.wrapper) {
        this.observer.observe(this.$refs.wrapper)
      }
    } catch (error) {
      console.warn('LazyWrapper: IntersectionObserver failed, loading immediately', error)
      this.shouldLoad = true
    }
  },
  beforeUnmount() {
    if (this.observer && this.$refs.wrapper) {
      this.observer.unobserve(this.$refs.wrapper)
      this.observer = null
    }
  }
}
</script>

<style scoped>
.lazy-wrapper { width: 100%; }
.lazy-placeholder { width: 100%; min-height: v-bind(minHeight); display: flex; align-items: center; justify-content: center; background: transparent; transition: opacity 0.3s ease; }
.lazy-placeholder-content { display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(139, 92, 246, 0.3); }
</style>