<template>
  <div ref="placeholder">
    <slot></slot>
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
    },
    forceVisible: {
      type: Boolean,
      default: false
    },
    minHeight: {
      type: String,
      default: '1px'
    }
  }
}
</script>
