<template>
  <a 
    href="#" 
    class="scroll-top"
    :class="{ active: isVisible }"
    @click.prevent="scrollToTop"
    title="Back to Top"
  >
    <i class="bi bi-arrow-up"></i>
  </a>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      // Show button when scrolled down 100px
      this.isVisible = window.scrollY > 100
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
/* The CSS is already defined in main.css */
</style>
