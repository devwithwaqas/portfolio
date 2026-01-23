<template>
  <footer id="footer" class="footer" :class="{ 'footer-ready': isReady }">
    <div class="container">
      <!-- Main Footer Content -->
      <div class="row mb-4">
        <!-- About Section -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="footer-section">
            <h2 class="footer-section-title txt-footer-header-lg">
              <i class="bi bi-person-circle me-2 footer-icon-purple icon-md"></i>About Me
            </h2>
            <p class="footer-description-text txt-p-md">
              Senior Software Engineer passionate about delivering high-quality solutions with expertise in .NET, Azure Cloud, and enterprise architecture.
            </p>
            <div class="contact-info">
              <a :href="contactLinks.location" target="_blank" class="contact-info-item contact-link">
                <i class="bi bi-geo-alt-fill me-2 footer-icon-purple icon-sm"></i>{{ location }}
              </a>
              <a :href="contactLinks.email" class="contact-info-item contact-link">
                <i class="bi bi-envelope-fill me-2 footer-icon-purple icon-sm"></i>{{ email }}
              </a>
              <a :href="contactLinks.phone" class="contact-info-item contact-link">
                <i class="bi bi-telephone-fill me-2 footer-icon-purple icon-sm"></i>{{ phone }}
              </a>
            </div>
                  </div>
                </div>

        <!-- Quick Links -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="footer-section">
            <h2 class="footer-section-title txt-footer-header-lg">
              <i class="bi bi-link-45deg me-2 footer-icon-purple icon-md"></i>Quick Links
            </h2>
            <ul class="footer-nav-links">
              <li>
                <a 
                  @click.prevent="scrollToSection('hero', $event)" 
                  href="#" 
                  class="footer-nav-link txt-footer-link-md"
                  aria-label="Scroll to home section in footer navigation"
                >
                  <div class="footer-icon-wrapper home-icon">
                    <i class="fas fa-house navicon icon-sm" aria-hidden="true"></i>
                  </div>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a @click.prevent="scrollToSection('about', $event)" href="#" class="footer-nav-link txt-footer-link-md">
                  <div class="footer-icon-wrapper about-icon">
                    <i class="fas fa-user-circle navicon icon-sm"></i>
                  </div>
                  <span>About</span>
                </a>
              </li>
              <li>
                <a @click.prevent="scrollToSection('technology-expertise', $event)" href="#" class="footer-nav-link txt-footer-link-md">
                  <div class="footer-icon-wrapper expertise-icon">
                    <i class="bi bi-star-fill navicon icon-sm"></i>
                  </div>
                  <span>Expertise</span>
                </a>
              </li>
              <li>
                <a @click.prevent="scrollToSection('skills', $event)" href="#" class="footer-nav-link txt-footer-link-md">
                  <div class="footer-icon-wrapper skills-icon">
                    <i class="bi bi-layers-fill navicon icon-sm"></i>
                  </div>
                  <span>Skills</span>
                </a>
              </li>
              <li>
                <a @click.prevent="scrollToSection('resume', $event)" href="#" class="footer-nav-link txt-footer-link-md">
                  <div class="footer-icon-wrapper resume-icon">
                    <i class="fas fa-file-lines navicon icon-sm"></i>
                  </div>
                  <span>Resume</span>
                </a>
              </li>
              <li>
                <a @click.prevent="scrollToSection('portfolio', $event)" href="#" class="footer-nav-link txt-footer-link-md">
                  <div class="footer-icon-wrapper portfolio-icon">
                    <i class="fas fa-briefcase navicon icon-sm"></i>
                  </div>
                  <span>Portfolio</span>
                </a>
              </li>
              <li>
                <a @click.prevent="scrollToSection('services', $event)" href="#" class="footer-nav-link txt-footer-link-md">
                  <div class="footer-icon-wrapper services-icon">
                    <i class="bi bi-gear-fill navicon icon-sm"></i>
                  </div>
                  <span>Services</span>
                </a>
              </li>
              <li>
                <a @click.prevent="scrollToSection('contact', $event)" href="#" class="footer-nav-link txt-footer-link-md">
                  <div class="footer-icon-wrapper contact-icon">
                    <i class="fas fa-paper-plane navicon icon-sm"></i>
                  </div>
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>
                  </div>

        <!-- Services -->
        <div class="col-lg-2 col-md-6 mb-4">
          <div class="footer-section">
            <h2 class="footer-section-title txt-footer-header-lg">
              <i class="bi bi-gear-fill me-2 footer-icon-purple icon-md"></i>Services
            </h2>
            <ul class="footer-list">
              <li class="footer-list-item txt-p-sm">
                <router-link to="/services/full-stack-development" class="footer-service-link">
                  <i class="bi bi-check-circle me-2 footer-list-icon icon-xs"></i>Full Stack Development
                </router-link>
              </li>
              <li class="footer-list-item txt-p-sm">
                <router-link to="/services/azure-cloud-architecture" class="footer-service-link">
                  <i class="bi bi-check-circle me-2 footer-list-icon icon-xs"></i>Azure Cloud Architecture
                </router-link>
              </li>
              <li class="footer-list-item txt-p-sm">
                <router-link to="/services/microservices-architecture" class="footer-service-link">
                  <i class="bi bi-check-circle me-2 footer-list-icon icon-xs"></i>Microservices Architecture
                </router-link>
              </li>
              <li class="footer-list-item txt-p-sm">
                <router-link to="/services/database-design-optimization" class="footer-service-link">
                  <i class="bi bi-check-circle me-2 footer-list-icon icon-xs"></i>Database Design & Optimization
                </router-link>
              </li>
              <li class="footer-list-item txt-p-sm">
                <router-link to="/services/mobile-development" class="footer-service-link">
                  <i class="bi bi-check-circle me-2 footer-list-icon icon-xs"></i>Mobile Development
                </router-link>
              </li>
              <li class="footer-list-item txt-p-sm">
                <router-link to="/services/technical-leadership" class="footer-service-link">
                  <i class="bi bi-check-circle me-2 footer-list-icon icon-xs"></i>Technical Leadership
                </router-link>
              </li>
              <li class="footer-list-item txt-p-sm">
                <router-link to="/services/agile-project-management" class="footer-service-link">
                  <i class="bi bi-check-circle me-2 footer-list-icon icon-xs"></i>Agile Project Management
                </router-link>
              </li>
            </ul>
          </div>
                </div>

        <!-- Social & Contact -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="footer-section">
            <h2 class="footer-section-title txt-footer-header-lg">
              <i class="bi bi-share me-2 footer-icon-purple icon-md"></i>Connect With Me
            </h2>
            <p class="footer-connect-text txt-p-md">
              Let's collaborate and build something amazing together!
            </p>
            <div class="social-links">
              <a :href="linkedin" target="_blank" class="social-btn linkedin" aria-label="Visit my LinkedIn profile">
                <i class="bi bi-linkedin icon-md"></i>
              </a>
              <a :href="github" target="_blank" class="social-btn github" aria-label="Visit my GitHub profile">
                <i class="bi bi-github icon-md"></i>
              </a>
              <a :href="portfolio" class="social-btn portfolio" aria-label="View my portfolio">
                <i class="bi bi-briefcase icon-md"></i>
              </a>
              <a :href="contactLinks.email" class="social-btn email" aria-label="Send me an email">
                <i class="bi bi-envelope icon-md"></i>
              </a>
            </div>
            <div class="footer-button-wrapper">
              <button @click="scrollToContact" class="get-in-touch-btn">
              <i class="bi bi-chat-dots me-2 icon-md"></i>Get In Touch
            </button>
            </div>
          </div>
          </div>
        </div>
      </div>

    <!-- Bottom Section - Outside container for full width -->
      <div class="copyright-section">
      <div class="container">
        <p class="copyright-text">
          © 2024 <strong class="footer-copyright-name">{{ fullName }}</strong>. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { APP_CONFIG } from '../../config/constants.js'

export default {
  name: 'Footer',
  data() {
    return {
      ...APP_CONFIG,
      isReady: false
    }
  },
  mounted() {
    // Make footer visible immediately to prevent CLS
    this.isReady = true
  },
  methods: {
    scrollToSection(sectionId, event) {
      if (event) {
        event.preventDefault()
      }
      
      // Navigate to home if not already there
      if (this.$route.path !== '/') {
        this.$router.push('/').then(() => {
          this.$nextTick(() => {
            const element = document.getElementById(sectionId)
            if (element) {
              const headerOffset = 100
              // OPTIMIZATION: Read layout inside RAF to avoid forced reflow
              requestAnimationFrame(() => {
                // Batch layout reads in one synchronous operation
                const elementPosition = element.getBoundingClientRect().top
                const scrollY = window.pageYOffset || window.scrollY || 0
                const offsetPosition = elementPosition + scrollY - headerOffset
                
                // Scroll in next frame
                requestAnimationFrame(() => {
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                })
              })
            }
          })
        })
      } else {
        // Already on home page, just scroll
        const element = document.getElementById(sectionId)
        if (element) {
          const headerOffset = 100
          // Read layout BEFORE RAF
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
          
          requestAnimationFrame(() => {
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          })
        }
      }
    },
    scrollToContact() {
      this.scrollToSection('contact')
    }
  }
}
</script>

<style scoped>
/* Footer Main Background - CLS FIX: Reserve space BEFORE render */
.footer {
  background: linear-gradient(135deg, rgba(20, 0, 40, 0.9) 0%, rgba(15, 0, 30, 0.95) 50%, rgba(10, 0, 20, 1) 100%), 
              radial-gradient(circle at 20% 20%, rgba(40, 10, 80, 0.1) 0%, transparent 50%), 
              radial-gradient(circle at 80% 80%, rgba(50, 15, 100, 0.08) 0%, transparent 50%);
  backdrop-filter: blur(40px) saturate(130%) brightness(0.6);
  -webkit-backdrop-filter: blur(40px) saturate(130%) brightness(0.6);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 50px 0 30px 0;
  margin-top: 60px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03), 
              0 12px 40px rgba(0, 0, 0, 0.5), 
              inset 0 1px 0 rgba(255, 255, 255, 0.05), 
              inset 0 -1px 0 rgba(0, 0, 0, 0.4);
  
  /* CLS FIX: Reserve exact height and hide until ready */
  min-height: 680px;
  height: auto;
  overflow: visible;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.1s ease, visibility 0.1s ease;
}

/* Show footer when Vue is ready */
.footer.footer-ready {
  opacity: 1;
  visibility: visible;
}

/* Section Titles */
.footer-section-title {
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
  /* Font size handled by font-sizes.css */
}

.footer-icon-purple {
  color: #a855f7;
}

/* About Section Text */
.footer-description-text {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 20px;
}

/* Contact Info */
/* ACCESSIBILITY: Ensure touch targets are at least 44x44px */
.contact-info-item {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  display: block;
  text-decoration: none;
  transition: all 0.3s ease;
  /* Font size handled by font-sizes.css */
  /* Add padding to ensure minimum 44px touch target */
  padding: 8px 4px;
  min-height: 44px;
  line-height: 1.5;
}

.contact-link:hover {
  color: #a855f7;
  text-shadow: 0 0 8px rgba(168, 85, 247, 0.4);
}

/* Services List */
.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-list-item {
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.7);
}

.footer-service-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.footer-service-link:hover {
  color: rgba(255, 255, 255, 1);
  text-shadow: 0 0 8px rgba(168, 85, 247, 0.4);
}

.footer-list-icon {
  color: #27ae60;
}

/* Connect With Me Text */
.footer-connect-text {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
}

/* Navigation Links */
.footer-nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-nav-links li {
  margin-bottom: 12px;
}

.footer-nav-link {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  /* Font size handled by font-sizes.css */
  font-weight: 500;
  margin: 0 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
}

.footer-nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
  transition: left 0.6s ease;
}

.footer-nav-link:hover::before {
  left: 100%;
}

.footer-nav-link:hover {
  color: white;
  transform: translateX(3px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Unique hover backgrounds for each nav link - matching icon wrapper colors */
.footer-nav-links li:nth-child(1) .footer-nav-link:hover {
  background: rgba(236, 72, 153, 0.45);
}

.footer-nav-links li:nth-child(2) .footer-nav-link:hover {
  background: rgba(16, 185, 129, 0.45);
}

.footer-nav-links li:nth-child(3) .footer-nav-link:hover {
  background: rgba(5, 99, 187, 0.45);
}

.footer-nav-links li:nth-child(4) .footer-nav-link:hover {
  background: rgba(147, 51, 234, 0.45);
}

.footer-nav-links li:nth-child(5) .footer-nav-link:hover {
  background: rgba(255, 215, 0, 0.45);
}

.footer-nav-links li:nth-child(6) .footer-nav-link:hover {
  background: rgba(6, 182, 212, 0.45);
}

.footer-nav-links li:nth-child(7) .footer-nav-link:hover {
  background: rgba(251, 146, 60, 0.45);
}

.footer-nav-links li:nth-child(8) .footer-nav-link:hover {
  background: rgba(139, 92, 246, 0.45);
}

/* Icon Wrappers */
.footer-icon-wrapper {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border-radius: 6px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.footer-icon-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.footer-nav-link:hover .footer-icon-wrapper::before {
  opacity: 1;
}

/* Home Icon - Pink Gradient (matches nav: 236, 72, 153) */
.footer-icon-wrapper.home-icon {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
  box-shadow: 0 3px 12px rgba(236, 72, 153, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.home-icon {
  transform: scale(1.08) rotate(2deg);
  box-shadow: 0 4px 16px rgba(236, 72, 153, 0.35);
}

/* About Icon - Green Gradient (matches nav: 16, 185, 129) */
.footer-icon-wrapper.about-icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 3px 12px rgba(16, 185, 129, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.about-icon {
  transform: scale(1.08) rotate(-2deg);
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35);
}

/* Resume Icon - Gold/Yellow Gradient (matches nav: 255, 215, 0) */
.footer-icon-wrapper.resume-icon {
  background: linear-gradient(135deg, #ffd700 0%, #ffb800 100%);
  box-shadow: 0 3px 12px rgba(255, 215, 0, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.resume-icon {
  transform: scale(1.08) rotate(2deg);
  box-shadow: 0 4px 16px rgba(255, 215, 0, 0.35);
}

/* Portfolio Icon - Cyan Gradient (matches nav: 6, 182, 212) */
.footer-icon-wrapper.portfolio-icon {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  box-shadow: 0 3px 12px rgba(6, 182, 212, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.portfolio-icon {
  transform: scale(1.08) rotate(-2deg);
  box-shadow: 0 4px 16px rgba(6, 182, 212, 0.35);
}

/* Expertise Icon - Blue Gradient (matches nav: 5, 99, 187) */
.footer-icon-wrapper.expertise-icon {
  background: linear-gradient(135deg, #0563bb 0%, #034a94 100%);
  box-shadow: 0 3px 12px rgba(5, 99, 187, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.expertise-icon {
  transform: scale(1.08) rotate(2deg);
  box-shadow: 0 4px 16px rgba(5, 99, 187, 0.35);
}

/* Skills Icon - Purple Gradient (matches nav: 147, 51, 234) */
.footer-icon-wrapper.skills-icon {
  background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%);
  box-shadow: 0 3px 12px rgba(147, 51, 234, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.skills-icon {
  transform: scale(1.08) rotate(-2deg);
  box-shadow: 0 4px 16px rgba(147, 51, 234, 0.35);
}

/* Services Icon - Orange Gradient (matches nav: 251, 146, 60) */
.footer-icon-wrapper.services-icon {
  background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
  box-shadow: 0 3px 12px rgba(251, 146, 60, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.services-icon {
  transform: scale(1.08) rotate(2deg);
  box-shadow: 0 4px 16px rgba(251, 146, 60, 0.35);
}

/* Contact Icon - Purple Gradient (matches nav: 139, 92, 246) - different shade from Skills */
.footer-icon-wrapper.contact-icon {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  box-shadow: 0 3px 12px rgba(139, 92, 246, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.contact-icon {
  transform: scale(1.08) rotate(-2deg);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.35);
}

.footer-nav-link .navicon {
  /* Font size handled by font-sizes.css */
  color: white;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

/* Social Media Buttons */
.social-links {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

/* ACCESSIBILITY: Ensure touch targets are at least 44x44px */
.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  border-radius: 50%;
  text-decoration: none;
  /* Font size handled by font-sizes.css */
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.social-btn.linkedin {
  background: rgba(0, 119, 181, 0.1);
  color: #0077b5;
  border-color: rgba(0, 119, 181, 0.3);
}

.social-btn.linkedin:hover {
  background: #0077b5;
  color: white;
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 25px rgba(0, 119, 181, 0.4);
}

.social-btn.github {
  background: rgba(51, 51, 51, 0.1);
  color: #333;
  border-color: rgba(51, 51, 51, 0.3);
}

.social-btn.github:hover {
  background: #333;
  color: white;
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 25px rgba(51, 51, 51, 0.4);
}

.social-btn.portfolio {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border-color: rgba(102, 126, 234, 0.3);
}

.social-btn.portfolio:hover {
  background: #667eea;
  color: white;
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.social-btn.email {
  background: rgba(234, 67, 53, 0.1);
  color: #ea4335;
  border-color: rgba(234, 67, 53, 0.3);
}

.social-btn.email:hover {
  background: #ea4335;
  color: white;
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 25px rgba(234, 67, 53, 0.4);
}

/* Get In Touch Button */
.footer-button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.get-in-touch-btn {
  background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  /* Font size handled by font-sizes.css */
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
}

.get-in-touch-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(168, 85, 247, 0.4);
}

/* Copyright Section */
.copyright-section {
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 30px;
}

.copyright-text {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
}

.footer-copyright-name {
  color: #ffffff;
  text-shadow: 0 0 8px rgba(102, 126, 234, 0.4);
}

.footer-bootstrap-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  text-shadow: 0 0 8px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.footer-bootstrap-link:hover {
  color: #ffffff;
  text-shadow: 0 0 12px rgba(102, 126, 234, 0.6);
}

.copyright-text .heart {
  color: #e74c3c;
  /* Font size handled by font-sizes.css */
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-section {
    text-align: center;
  }
  
  .footer-nav-links {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
  
  .footer-nav-link {
    width: 100%;
    justify-content: center;
    margin: 0;
  }
  
  /* Center Services List on Mobile */
  .footer-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .footer-list-item {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .footer-service-link {
    justify-content: center;
  }
  
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .footer-nav-link {
    padding: 8px 10px;
  }
  
  .footer-icon-wrapper {
    width: 24px;
    height: 24px;
  }
}
</style>