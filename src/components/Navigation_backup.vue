<template>
  <header id="header" class="header d-flex flex-column justify-content-center" :class="{ 'header-show': mobileMenuOpen }">
    <i class="header-toggle d-xl-none bi bi-list" @click="toggleMobileMenu"></i>

    <nav id="navmenu" class="navmenu" :class="{ 'mobile-nav-open': mobileMenuOpen }">
      <ul>
        <li><a href="#hero" class="nav-link" :class="{ active: activeSection === 'hero' }" @click="scrollToSection('hero', $event)"><i class="fas fa-home navicon"></i><span>Home</span></a></li>
        <li><a href="#about" class="nav-link" :class="{ active: activeSection === 'about' }" @click="scrollToSection('about', $event)"><i class="fas fa-user-circle navicon"></i><span>About</span></a></li>
        <li><a href="#resume" class="nav-link" :class="{ active: activeSection === 'resume' }" @click="scrollToSection('resume', $event)"><i class="fas fa-file-alt navicon"></i><span>Resume</span></a></li>
        <li><a href="#portfolio" class="nav-link" :class="{ active: activeSection === 'portfolio' }" @click="scrollToSection('portfolio', $event)"><i class="fas fa-briefcase navicon"></i><span>Portfolio</span></a></li>
        <li><a href="#services" class="nav-link" :class="{ active: activeSection === 'services' }" @click="scrollToSection('services', $event)"><i class="fas fa-cogs navicon"></i><span>Services</span></a></li>
        <li><a href="#contact" class="nav-link" :class="{ active: activeSection === 'contact' }" @click="scrollToSection('contact', $event)"><i class="fas fa-envelope navicon"></i><span>Contact</span></a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      mobileMenuOpen: false,
      activeSection: 'hero'
    }
  },
  mounted() {
    this.setupScrollSpy()
    this.setupIntersectionObserver()
  },
  watch: {
    activeSection(newSection, oldSection) {
      if (newSection !== oldSection) {
        this.$nextTick(() => {
          this.$forceUpdate()
        })
      }
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
    scrollToSection(sectionId, event) {
      event.preventDefault()
      this.closeMobileMenu()
      
      if (this.$route.path === '/') {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        this.$router.push({ path: '/', hash: `#${sectionId}` })
      }
    },
    setupScrollSpy() {
      window.addEventListener('scroll', this.updateActiveSection)
    },
    setupIntersectionObserver() {
      const sections = ['hero', 'about', 'resume', 'portfolio', 'services', 'contact']
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            if (sections.includes(sectionId)) {
              this.activeSection = sectionId
              this.$nextTick(() => {
                this.$forceUpdate()
              })
            }
          }
        })
      }, {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
      })
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId)
        if (element) {
          observer.observe(element)
        }
      })
    },
    updateActiveSection() {
      const sections = ['hero', 'about', 'resume', 'portfolio', 'services', 'contact']
      const scrollPosition = window.scrollY + 100
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          this.activeSection = sections[i]
          this.$nextTick(() => {
            this.$forceUpdate()
          })
          break
        }
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.updateActiveSection)
  }
}
</script>

<style>
/* Mobile Navigation */
@media (max-width: 1199px) {
  .navmenu.mobile-nav-open {
    transform: translateX(0) !important;
  }
}
</style>
