<template>
  <div ref="placeholder">
    <slot v-if="isVisible"></slot>
  </div>
</template>

<script>
export default {
  name: 'LazyRender',
  props: {
    rootMargin: {
      type: String,
      default: '200px'
    },
    threshold: {
      type: Number,
      default: 0.1
    }
  },
  data() {
    return {
      isVisible: false,
      observer: null
    }
  },
  mounted() {
    if (this.isVisible) return
    if (typeof IntersectionObserver === 'undefined') {
      this.isVisible = true
      return
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true
            if (this.observer) {
              this.observer.disconnect()
              this.observer = null
            }
          }
        })
      },
      {
        rootMargin: this.rootMargin,
        threshold: this.threshold
      }
    )

    this.observer.observe(this.$refs.placeholder)
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
  }
}
</script>
