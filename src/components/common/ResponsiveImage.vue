<template>
  <div :class="['responsive-image-container', containerClass]">
    <picture>
      <source
        type="image/avif"
        :srcset="srcsetAvif"
        :sizes="sizes"
      >
      <source
        type="image/webp"
        :srcset="srcsetWebp"
        :sizes="sizes"
      >
      <img
        :src="src"
        :srcset="srcsetJpg"
        :sizes="sizes"
        :alt="alt"
        :class="imageClass"
        :style="imageStyle"
        :loading="lazy ? 'lazy' : 'eager'"
        :fetchpriority="priority"
        decoding="async"
      >
    </picture>
  </div>
</template>

<script>
export default {
  name: 'ResponsiveImage',
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: 'Image' },
    lazy: { type: Boolean, default: true },
    priority: { type: String, default: 'auto', validator: (v) => ['high', 'low', 'auto'].includes(v) },
    sizes: { type: String, default: '(max-width: 768px) 100vw, 662px' },
    containerClass: { type: String, default: '' },
    imageClass: { type: String, default: '' },
    imageStyle: { type: Object, default: () => ({}) }
  },
  computed: {
    base() {
      return (this.src || '').replace(/\.(jpe?g|png|webp|avif)$/i, '')
    },
    srcsetAvif() {
      const b = this.base
      return `${b}-662w.avif 662w, ${b}-1324w.avif 1324w`
    },
    srcsetWebp() {
      const b = this.base
      return `${b}-662w.webp 662w, ${b}-1324w.webp 1324w`
    },
    srcsetJpg() {
      const b = this.base
      return `${b}-662w.jpg 662w, ${b}-1324w.jpg 1324w`
    }
  }
}
</script>

<style scoped>
.responsive-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.responsive-image-container img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>