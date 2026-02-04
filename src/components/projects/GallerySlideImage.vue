<template>
  <ResponsiveImage
    :src="src"
    :alt="alt"
    :lazy="lazy"
    :priority="priority"
    sizes="(max-width: 768px) 100vw, 662px"
    :container-class="['gallery-slide-image', containerClass].filter(Boolean).join(' ')"
    :image-class="imageClass"
    :image-style="{ width: '100%', height: '100%', objectFit: 'cover' }"
  />
</template>

<script>
import ResponsiveImage from '../common/ResponsiveImage.vue'

export default {
  name: 'GallerySlideImage',
  components: {
    ResponsiveImage
  },
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: 'Gallery image' },
    lazy: { type: Boolean, default: true },
    priority: { type: String, default: 'auto', validator: (v) => ['high', 'low', 'auto'].includes(v) },
    containerClass: { type: String, default: '' },
    imageClass: { type: String, default: '' }
  }
}
</script>

<style scoped>
.gallery-slide-image {
  width: 100%;
  height: 100%;
}
</style>