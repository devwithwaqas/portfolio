<template>
  <div class="service-page">
    <Breadcrumbs 
      :currentPage="serviceTitle"
      :parentLink="parentLink"
      :parentLabel="parentLabel"
    />
    <div class="container service-container">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Breadcrumbs from '../projects/Breadcrumbs.vue'
export default {
  name: 'ServicePageTemplate',
  components: { Breadcrumbs },
  props: {
    serviceTitle: { type: String, required: true },
    parentLink: { type: String, default: '/#services' },
    parentLabel: { type: String, default: 'Services' }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' })
      if (window.scrollY > 0) {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
    }
  }
}
</script>
<style scoped>
.service-page {
  min-height: 100vh;
  background: transparent;
  padding: 0;
}
.service-container {
  max-width: 1200px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.service-container > :first-child :deep(.reusable-card.mb-4) {
  margin-top: 0 !important;
}
.service-container > :last-child :deep(.reusable-card.mb-4) {
  margin-bottom: 0 !important;
}
</style>