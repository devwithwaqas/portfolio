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
    <!-- Sticky CTA: visible after scroll so contact is one click away -->
    <Transition name="sticky-cta">
      <div v-if="showStickyCta" class="sticky-cta-bar">
        <button type="button" class="sticky-cta-btn" @click="goToContact">
          <i class="bi bi-envelope"></i>
          Get in touch
        </button>
      </div>
    </Transition>
  </div>
</template>
<script>
import Breadcrumbs from '../projects/Breadcrumbs.vue'
import { navigateToSection } from '../../utils/scrollToSection.js'

const SCROLL_THRESHOLD = 400

export default {
  name: 'ServicePageTemplate',
  components: { Breadcrumbs },
  props: {
    serviceTitle: { type: String, required: true },
    parentLink: { type: String, default: '/#services' },
    parentLabel: { type: String, default: 'Services' }
  },
  data() {
    return {
      showStickyCta: false
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' })
      if (window.scrollY > 0) {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
      window.addEventListener('scroll', this.onScroll, { passive: true })
      this.onScroll()
    }
  },
  beforeUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll)
    }
  },
  methods: {
    onScroll() {
      this.showStickyCta = window.scrollY > SCROLL_THRESHOLD
    },
    goToContact() {
      navigateToSection(this.$router, 'contact')
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

.sticky-cta-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.98);
  border-top: 2px solid rgba(139, 92, 246, 0.25);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
}

.sticky-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(168, 85, 247, 1));
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.35);
}

.sticky-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.45);
}

.sticky-cta-enter-active,
.sticky-cta-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.sticky-cta-enter-from,
.sticky-cta-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>