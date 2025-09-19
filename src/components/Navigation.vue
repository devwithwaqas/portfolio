<template>
  <header id="header" class="header" :class="{ 'header-show': mobileMenuOpen }">
    <i class="header-toggle d-xl-none bi bi-list" @click="toggleMobileMenu"></i>

    <nav id="navmenu" class="navmenu">
      <div class="nav-header">
        <div class="logo-section">
          <div class="logo-icon">
            <img src="/assets/img/waqas-microsoft-profile.jpg" alt="Waqas Ahmed" class="profile-image">
          </div>
        </div>
      </div>

      <ul>
        <li><a href="#hero" class="nav-link" :class="{ active: activeSection === 'hero' }"
            @click="scrollToSection('hero', $event)">
            <div class="icon-wrapper home-icon">
              <i class="fas fa-house navicon"></i>
            </div>
            <span>Home</span>
            <div class="active-indicator" v-if="activeSection === 'hero'"></div>
          </a></li>
        <li><a href="#about" class="nav-link" :class="{ active: activeSection === 'about' }"
            @click="scrollToSection('about', $event)">
            <div class="icon-wrapper about-icon">
              <i class="fas fa-user-circle navicon"></i>
            </div>
            <span>About</span>
            <div class="active-indicator" v-if="activeSection === 'about'"></div>
          </a></li>
        <li><a href="#resume" class="nav-link" :class="{ active: activeSection === 'resume' }"
            @click="scrollToSection('resume', $event)">
            <div class="icon-wrapper resume-icon">
              <i class="fas fa-file-lines navicon"></i>
            </div>
            <span>Resume</span>
            <div class="active-indicator" v-if="activeSection === 'resume'"></div>
          </a></li>
        <li><a href="#portfolio" class="nav-link" :class="{ active: activeSection === 'portfolio' }"
            @click="scrollToSection('portfolio', $event)">
            <div class="icon-wrapper portfolio-icon">
              <i class="fas fa-briefcase navicon"></i>
            </div>
            <span>Portfolio</span>
            <div class="active-indicator" v-if="activeSection === 'portfolio'"></div>
          </a></li>
        <li><a href="#services" class="nav-link" :class="{ active: activeSection === 'services' }"
            @click="scrollToSection('services', $event)">
            <div class="icon-wrapper services-icon">
              <i class="fas fa-gear navicon"></i>
            </div>
            <span>Services</span>
            <div class="active-indicator" v-if="activeSection === 'services'"></div>
          </a></li>
        <li><a href="#contact" class="nav-link" :class="{ active: activeSection === 'contact' }"
            @click="scrollToSection('contact', $event)">
            <div class="icon-wrapper contact-icon">
              <i class="fas fa-paper-plane navicon"></i>
            </div>
            <span>Contact</span>
            <div class="active-indicator" v-if="activeSection === 'contact'"></div>
          </a></li>
      </ul>

      <div class="nav-footer">
        <div class="theme-toggle">
          <i class="fas fa-moon"></i>
          <span>Dark Theme</span>
        </div>
      </div>
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

<style scoped>
/* ===== COMPACT GLASSMORPHISM NAVIGATION ===== */

/* Desktop Navigation */
@media (min-width: 1200px) {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 200px;
    background: 
      linear-gradient(135deg, rgba(60, 20, 120, 0.6) 0%, rgba(50, 15, 100, 0.65) 50%, rgba(40, 10, 80, 0.7) 100%),
      radial-gradient(circle at 20% 20%, rgba(80, 30, 140, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(90, 35, 150, 0.12) 0%, transparent 50%);
    backdrop-filter: blur(40px) saturate(130%) brightness(0.85);
    -webkit-backdrop-filter: blur(40px) saturate(130%) brightness(0.85);
    z-index: 997;
    padding: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.05), 
      0 12px 40px rgba(0, 0, 0, 0.3), 
      inset 0 1px 0 rgba(255, 255, 255, 0.1), 
      inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  }

  .navmenu {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px 0;
  }

  .nav-header {
    padding: 8px 20px 24px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    margin-bottom: 20px;
  }

  .logo-section {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .logo-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-shadow: 
      0 0 0 3px rgba(102, 126, 234, 0.8), 
      0 0 20px rgba(102, 126, 234, 0.6), 
      0 0 40px rgba(118, 75, 162, 0.4), 
      0 0 60px rgba(255, 107, 107, 0.3), 
      inset 0 0 20px rgba(255, 255, 255, 0.1);
    overflow: hidden;
    border: 2px solid rgba(102, 126, 234, 0.9);
    background: 
      linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 30%, rgba(255, 107, 107, 0.1) 60%, rgba(0, 184, 148, 0.05) 100%),
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 60%),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    position: relative;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .logo-icon::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 100%),
      radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 60%);
    border-radius: 25px;
    z-index: 1;
    transition: all 0.4s ease;
  }

  .logo-icon::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(45deg,
        rgba(102, 126, 234, 0.7) 0%,
        rgba(118, 75, 162, 0.7) 20%,
        rgba(255, 107, 107, 0.7) 40%,
        rgba(0, 184, 148, 0.7) 60%,
        rgba(253, 203, 110, 0.7) 80%,
        rgba(102, 126, 234, 0.7) 100%);
    border-radius: 33px;
    z-index: -1;
    opacity: 0;
    transition: all 0.4s ease;
    animation: rotate 3s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .logo-icon:hover {
    transform: scale(1.15) rotate(5deg);
    box-shadow: 
      0 0 0 4px rgba(102, 126, 234, 1), 
      0 0 30px rgba(102, 126, 234, 0.8), 
      0 0 60px rgba(118, 75, 162, 0.6), 
      0 0 90px rgba(255, 107, 107, 0.5), 
      0 0 120px rgba(0, 184, 148, 0.4), 
      inset 0 0 30px rgba(255, 255, 255, 0.2);
  }

  .logo-icon:hover::after {
    opacity: 1;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    border-radius: 50%;
    position: relative;
    z-index: 2;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    filter: 
      drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) 
      drop-shadow(0 0 20px rgba(255, 255, 255, 0.4)) 
      drop-shadow(0 0 40px rgba(102, 126, 234, 0.3)) 
      drop-shadow(0 0 60px rgba(118, 75, 162, 0.2));
  }

  .logo-icon:hover .profile-image {
    transform: scale(1.05) rotate(2deg);
    filter: 
      drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4)) 
      drop-shadow(0 0 25px rgba(255, 255, 255, 0.6)) 
      drop-shadow(0 0 50px rgba(102, 126, 234, 0.5)) 
      drop-shadow(0 0 75px rgba(118, 75, 162, 0.4)) 
      drop-shadow(0 0 100px rgba(255, 107, 107, 0.3));
  }

  .logo-text {
    color: rgba(255, 255, 255, 0.9);
    /* Font size handled by font-sizes.css */
    font-weight: 600;
  }


  .navmenu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .navmenu a {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    border-radius: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    /* Font size handled by font-sizes.css */
    font-weight: 500;
    margin: 0 12px;
    border-radius: 10px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.03);
  }

  .navmenu a::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
    transition: left 0.6s ease;
  }

  .navmenu a:hover::before {
    left: 100%;
  }

  .navmenu a:hover {
    color: white;
    transform: translateX(3px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  /* Unique hover backgrounds for each button - 3x darker */
  .navmenu li:nth-child(1) a:hover {
    background: rgba(255, 107, 107, 0.45);
  }

  .navmenu li:nth-child(2) a:hover {
    background: rgba(0, 184, 148, 0.45);
  }

  .navmenu li:nth-child(3) a:hover {
    background: rgba(116, 185, 255, 0.45);
  }

  .navmenu li:nth-child(4) a:hover {
    background: rgba(162, 155, 254, 0.45);
  }

  .navmenu li:nth-child(5) a:hover {
    background: rgba(253, 203, 110, 0.45);
  }

  .navmenu li:nth-child(6) a:hover {
    background: rgba(253, 121, 168, 0.45);
  }

  .navmenu a.active {
    color: white;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transform: translateX(6px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
  }

  /* Compact Colorful Icon Wrappers */
  .icon-wrapper {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    border-radius: 8px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .icon-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .navmenu a:hover .icon-wrapper::before {
    opacity: 1;
  }

  .navmenu a.active .icon-wrapper::before {
    opacity: 0;
  }

  /* Home - Orange Gradient */
  .home-icon {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    box-shadow: 0 3px 12px rgba(255, 107, 107, 0.25);
  }

  .navmenu a:hover .home-icon {
    transform: scale(1.08) rotate(2deg);
    box-shadow: 0 4px 16px rgba(255, 107, 107, 0.35);
  }

  .navmenu a.active .home-icon {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    box-shadow: 0 4px 16px rgba(255, 107, 107, 0.4);
    transform: scale(1.05);
  }

  /* About - Green Gradient */
  .about-icon {
    background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
    box-shadow: 0 3px 12px rgba(0, 184, 148, 0.25);
  }

  .navmenu a:hover .about-icon {
    transform: scale(1.08) rotate(-2deg);
    box-shadow: 0 4px 16px rgba(0, 184, 148, 0.35);
  }

  .navmenu a.active .about-icon {
    background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
    box-shadow: 0 4px 16px rgba(0, 184, 148, 0.4);
    transform: scale(1.05);
  }

  /* Resume - Blue Gradient */
  .resume-icon {
    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
    box-shadow: 0 3px 12px rgba(116, 185, 255, 0.25);
  }

  .navmenu a:hover .resume-icon {
    transform: scale(1.08) rotate(2deg);
    box-shadow: 0 4px 16px rgba(116, 185, 255, 0.35);
  }

  .navmenu a.active .resume-icon {
    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
    box-shadow: 0 4px 16px rgba(116, 185, 255, 0.4);
    transform: scale(1.05);
  }

  /* Portfolio - Purple Gradient */
  .portfolio-icon {
    background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
    box-shadow: 0 3px 12px rgba(162, 155, 254, 0.25);
  }

  .navmenu a:hover .portfolio-icon {
    transform: scale(1.08) rotate(-2deg);
    box-shadow: 0 4px 16px rgba(162, 155, 254, 0.35);
  }

  .navmenu a.active .portfolio-icon {
    background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
    box-shadow: 0 4px 16px rgba(162, 155, 254, 0.4);
    transform: scale(1.05);
  }

  /* Services - Yellow Gradient */
  .services-icon {
    background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%);
    box-shadow: 0 3px 12px rgba(253, 203, 110, 0.25);
  }

  .navmenu a:hover .services-icon {
    transform: scale(1.08) rotate(2deg);
    box-shadow: 0 4px 16px rgba(253, 203, 110, 0.35);
  }

  .navmenu a.active .services-icon {
    background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%);
    box-shadow: 0 4px 16px rgba(253, 203, 110, 0.4);
    transform: scale(1.05);
  }

  /* Contact - Pink Gradient */
  .contact-icon {
    background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
    box-shadow: 0 3px 12px rgba(253, 121, 168, 0.25);
  }

  .navmenu a:hover .contact-icon {
    transform: scale(1.08) rotate(-2deg);
    box-shadow: 0 4px 16px rgba(253, 121, 168, 0.35);
  }

  .navmenu a.active .contact-icon {
    background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
    box-shadow: 0 4px 16px rgba(253, 121, 168, 0.4);
    transform: scale(1.05);
  }

  .navicon {
    /* Font size handled by font-sizes.css */
    color: white;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
  }

  .active-indicator {
    width: 4px;
    height: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
    margin-left: auto;
    box-shadow: 0 0 8px rgba(102, 126, 234, 0.5);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {

    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0.6;
    }
  }

  .nav-footer {
    padding: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    margin-top: auto;
  }


  .theme-toggle {
    display: flex;
    align-items: center;
    padding: 10px 14px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.7);
    /* Font size handled by font-sizes.css */
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.06);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .theme-toggle i {
    margin-right: 6px;
    /* Font size handled by font-sizes.css */
  }

  /* Hide hamburger on desktop */
  .header-toggle {
    display: none !important;
  }
}

/* Mobile Navigation */
@media (max-width: 1199px) {
  .header {
    position: fixed;
    top: 0;
    left: -100%;
    bottom: 0;
    width: 220px;
    background: 
      linear-gradient(135deg, rgba(60, 20, 120, 0.6) 0%, rgba(50, 15, 100, 0.65) 50%, rgba(40, 10, 80, 0.7) 100%),
      radial-gradient(circle at 20% 20%, rgba(80, 30, 140, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(90, 35, 150, 0.12) 0%, transparent 50%);
    backdrop-filter: blur(40px) saturate(130%) brightness(0.85);
    -webkit-backdrop-filter: blur(40px) saturate(130%) brightness(0.85);
    z-index: 997;
    padding: 0;
    transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.05), 
      0 12px 40px rgba(0, 0, 0, 0.3), 
      inset 0 1px 0 rgba(255, 255, 255, 0.1), 
      inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  }

  .header.header-show {
    left: 0;
  }

  /* Compact Glassmorphism Hamburger Button */
  .header-toggle {
    position: fixed !important;
    top: 18px !important;
    left: 18px !important;
    z-index: 9999 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 44px !important;
    height: 44px !important;
    background: rgba(102, 126, 234, 0.15) !important;
    backdrop-filter: blur(25px) saturate(200%) !important;
    -webkit-backdrop-filter: blur(25px) saturate(200%) !important;
    color: white !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    border-radius: 10px !important;
    /* Font size handled by font-sizes.css */
    cursor: pointer !important;
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.15) !important, inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  .header-toggle:hover {
    background: rgba(102, 126, 234, 0.25) !important;
    transform: scale(1.05) !important;
    box-shadow: 
      0 8px 25px rgba(102, 126, 234, 0.25) !important, 
      inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
  }

  .navmenu {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px 0;
  }

  .nav-header {
    padding: 8px 20px 24px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    margin-bottom: 20px;
  }

  .logo-section {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .logo-icon {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-shadow: 
      0 0 0 3px rgba(102, 126, 234, 0.8), 
      0 0 20px rgba(102, 126, 234, 0.6), 
      0 0 40px rgba(118, 75, 162, 0.4), 
      0 0 60px rgba(255, 107, 107, 0.3), 
      inset 0 0 20px rgba(255, 255, 255, 0.1);
    overflow: hidden;
    border: 2px solid rgba(102, 126, 234, 0.9);
    background: 
      linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 30%, rgba(255, 107, 107, 0.1) 60%, rgba(0, 184, 148, 0.05) 100%),
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 60%),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    position: relative;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .logo-icon::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 100%),
      radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 60%);
    border-radius: 25px;
    z-index: 1;
    transition: all 0.4s ease;
  }

  .logo-icon::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(45deg,
        rgba(102, 126, 234, 0.7) 0%,
        rgba(118, 75, 162, 0.7) 20%,
        rgba(255, 107, 107, 0.7) 40%,
        rgba(0, 184, 148, 0.7) 60%,
        rgba(253, 203, 110, 0.7) 80%,
        rgba(102, 126, 234, 0.7) 100%);
    border-radius: 33px;
    z-index: -1;
    opacity: 0;
    transition: all 0.4s ease;
    animation: rotate 3s linear infinite;
  }

  .logo-icon:hover {
    transform: scale(1.15) rotate(5deg);
    box-shadow: 
      0 0 0 4px rgba(102, 126, 234, 1), 
      0 0 30px rgba(102, 126, 234, 0.8), 
      0 0 60px rgba(118, 75, 162, 0.6), 
      0 0 90px rgba(255, 107, 107, 0.5), 
      0 0 120px rgba(0, 184, 148, 0.4), 
      inset 0 0 30px rgba(255, 255, 255, 0.2);
  }

  .logo-icon:hover::after {
    opacity: 1;
  }

  .logo-text {
    color: rgba(255, 255, 255, 0.9);
    /* Font size handled by font-sizes.css */
    font-weight: 600;
  }


  .navmenu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .navmenu a {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    border-radius: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    /* Font size handled by font-sizes.css */
    font-weight: 500;
    margin: 0 12px;
    border-radius: 10px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.03);
  }

  .navmenu a::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
    transition: left 0.6s ease;
  }

  .navmenu a:hover::before {
    left: 100%;
  }

  .navmenu a:hover {
    color: white;
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  /* Unique hover backgrounds for each button - Mobile - 3x darker */
  .navmenu li:nth-child(1) a:hover {
    background: rgba(255, 107, 107, 0.54);
  }

  .navmenu li:nth-child(2) a:hover {
    background: rgba(0, 184, 148, 0.54);
  }

  .navmenu li:nth-child(3) a:hover {
    background: rgba(116, 185, 255, 0.54);
  }

  .navmenu li:nth-child(4) a:hover {
    background: rgba(162, 155, 254, 0.54);
  }

  .navmenu li:nth-child(5) a:hover {
    background: rgba(253, 203, 110, 0.54);
  }

  .navmenu li:nth-child(6) a:hover {
    background: rgba(253, 121, 168, 0.54);
  }

  .navmenu a.active {
    color: white;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transform: translateX(8px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
  }

  /* Mobile Colorful Icons - Same as desktop but slightly larger */
  .icon-wrapper {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 14px;
    border-radius: 9px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .icon-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 9px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .navmenu a:hover .icon-wrapper::before {
    opacity: 1;
  }

  .navmenu a.active .icon-wrapper::before {
    opacity: 0;
  }

  /* Same colorful gradients for mobile with enhanced effects */
  .home-icon {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    box-shadow: 0 3px 12px rgba(255, 107, 107, 0.25);
  }

  .navmenu a:hover .home-icon {
    transform: scale(1.1) rotate(3deg);
    box-shadow: 0 4px 16px rgba(255, 107, 107, 0.35);
  }

  .navmenu a.active .home-icon {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    box-shadow: 0 4px 16px rgba(255, 107, 107, 0.4);
    transform: scale(1.05);
  }

  .about-icon {
    background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
    box-shadow: 0 3px 12px rgba(0, 184, 148, 0.25);
  }

  .navmenu a:hover .about-icon {
    transform: scale(1.1) rotate(-3deg);
    box-shadow: 0 4px 16px rgba(0, 184, 148, 0.35);
  }

  .navmenu a.active .about-icon {
    background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
    box-shadow: 0 4px 16px rgba(0, 184, 148, 0.4);
    transform: scale(1.05);
  }

  .resume-icon {
    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
    box-shadow: 0 3px 12px rgba(116, 185, 255, 0.25);
  }

  .navmenu a:hover .resume-icon {
    transform: scale(1.1) rotate(3deg);
    box-shadow: 0 4px 16px rgba(116, 185, 255, 0.35);
  }

  .navmenu a.active .resume-icon {
    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
    box-shadow: 0 4px 16px rgba(116, 185, 255, 0.4);
    transform: scale(1.05);
  }

  .portfolio-icon {
    background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
    box-shadow: 0 3px 12px rgba(162, 155, 254, 0.25);
  }

  .navmenu a:hover .portfolio-icon {
    transform: scale(1.1) rotate(-3deg);
    box-shadow: 0 4px 16px rgba(162, 155, 254, 0.35);
  }

  .navmenu a.active .portfolio-icon {
    background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
    box-shadow: 0 4px 16px rgba(162, 155, 254, 0.4);
    transform: scale(1.05);
  }

  .services-icon {
    background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%);
    box-shadow: 0 3px 12px rgba(253, 203, 110, 0.25);
  }

  .navmenu a:hover .services-icon {
    transform: scale(1.1) rotate(3deg);
    box-shadow: 0 4px 16px rgba(253, 203, 110, 0.35);
  }

  .navmenu a.active .services-icon {
    background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%);
    box-shadow: 0 4px 16px rgba(253, 203, 110, 0.4);
    transform: scale(1.05);
  }

  .contact-icon {
    background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
    box-shadow: 0 3px 12px rgba(253, 121, 168, 0.25);
  }

  .navmenu a:hover .contact-icon {
    transform: scale(1.1) rotate(-3deg);
    box-shadow: 0 4px 16px rgba(253, 121, 168, 0.35);
  }

  .navmenu a.active .contact-icon {
    background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
    box-shadow: 0 4px 16px rgba(253, 121, 168, 0.4);
    transform: scale(1.05);
  }

  .navicon {
    /* Font size handled by font-sizes.css */
    color: white;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
  }

  .active-indicator {
    width: 5px;
    height: 22px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
    margin-left: auto;
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    animation: pulse 2s infinite;
  }

  .nav-footer {
    padding: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    margin-top: auto;
  }


  .theme-toggle {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.7);
    /* Font size handled by font-sizes.css */
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.06);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .theme-toggle i {
    margin-right: 8px;
    /* Font size handled by font-sizes.css */
  }
}

/* Tablet Styles */
@media (max-width: 768px) {
  .header {
    width: 240px;
  }

  .navmenu a {
    padding: 10px 16px;
    /* Font size handled by font-sizes.css */
  }

  .icon-wrapper {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }

  .navicon {
    /* Font size handled by font-sizes.css */
  }
}

/* Mobile Styles */
@media (max-width: 480px) {
  .header {
    width: 220px;
  }

  .navmenu a {
    padding: 8px 14px;
    /* Font size handled by font-sizes.css */
  }

  .icon-wrapper {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  .navicon {
    /* Font size handled by font-sizes.css */
  }
}
</style>