<template>
  <footer id="footer" class="footer footer-main">
    
    <div class="container">
      <!-- Main Footer Content -->
      <div class="row mb-4">
        <!-- About Section -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="footer-section">
            <h5 class="footer-section-title">
              <i class="bi bi-person-circle me-2 footer-icon-purple"></i>About Me
            </h5>
            <p class="footer-description-text">
              Senior Software Engineer passionate about delivering high-quality solutions with expertise in .NET, Azure Cloud, and enterprise architecture.
            </p>
            <div class="contact-info">
              <div class="contact-info-item footer-contact-text">
                <i class="bi bi-geo-alt-fill me-2 footer-icon-purple"></i>{{ location }}
              </div>
              <a :href="contactLinks.email" class="contact-info-item contact-link footer-contact-link" @mouseover="handleContactHover" @mouseout="handleContactOut">
                <i class="bi bi-envelope-fill me-2 footer-icon-purple"></i>{{ email }}
              </a>
              <a :href="contactLinks.phone" class="contact-info-item contact-link footer-contact-link" @mouseover="handleContactHover" @mouseout="handleContactOut">
                <i class="bi bi-telephone-fill me-2 footer-icon-purple"></i>{{ phone }}
              </a>
            </div>
                  </div>
                </div>

        <!-- Quick Links -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="footer-section">
            <h5 class="footer-section-title">
              <i class="bi bi-link-45deg me-2 footer-icon-purple"></i>Quick Links
            </h5>
            <ul class="footer-nav-links">
              <li>
                <router-link to="/" class="footer-nav-link">
                  <div class="footer-icon-wrapper home-icon">
                    <i class="fas fa-house navicon"></i>
                  </div>
                  <span>Home</span>
                </router-link>
              </li>
              <li>
                <router-link to="/#about" class="footer-nav-link">
                  <div class="footer-icon-wrapper about-icon">
                    <i class="fas fa-user-circle navicon"></i>
                  </div>
                  <span>About</span>
                </router-link>
              </li>
              <li>
                <router-link to="/#resume" class="footer-nav-link">
                  <div class="footer-icon-wrapper resume-icon">
                    <i class="fas fa-file-lines navicon"></i>
                  </div>
                  <span>Resume</span>
                </router-link>
              </li>
              <li>
                <router-link to="/portfolio" class="footer-nav-link">
                  <div class="footer-icon-wrapper portfolio-icon">
                    <i class="fas fa-briefcase navicon"></i>
                  </div>
                  <span>Portfolio</span>
                </router-link>
              </li>
              <li>
                <router-link to="/contact" class="footer-nav-link">
                  <div class="footer-icon-wrapper contact-icon">
                    <i class="fas fa-paper-plane navicon"></i>
                  </div>
                  <span>Contact</span>
                </router-link>
              </li>
            </ul>
          </div>
                  </div>

        <!-- Services -->
        <div class="col-lg-2 col-md-6 mb-4">
          <div class="footer-section">
            <h5 class="footer-section-title">
              <i class="bi bi-gear-fill me-2 footer-icon-purple"></i>Services
            </h5>
            <ul class="footer-list">
              <li class="footer-list-item">
                <i class="bi bi-check-circle me-2 footer-list-icon"></i>Web Development
              </li>
              <li class="footer-list-item">
                <i class="bi bi-check-circle me-2 footer-list-icon"></i>Cloud Solutions
              </li>
              <li class="footer-list-item">
                <i class="bi bi-check-circle me-2 footer-list-icon"></i>Enterprise Architecture
              </li>
              <li class="footer-list-item">
                <i class="bi bi-check-circle me-2 footer-list-icon"></i>API Development
              </li>
              <li class="footer-list-item">
                <i class="bi bi-check-circle me-2 footer-list-icon"></i>Database Design
              </li>
            </ul>
          </div>
                </div>

        <!-- Social & Contact -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="footer-section">
            <h5 class="footer-section-title">
              <i class="bi bi-share me-2 footer-icon-purple"></i>Connect With Me
            </h5>
            <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 20px;">
              Let's collaborate and build something amazing together!
            </p>
            <div class="social-links">
              <a :href="linkedin" target="_blank" class="social-btn linkedin">
                <i class="bi bi-linkedin"></i>
              </a>
              <a :href="github" target="_blank" class="social-btn github">
                <i class="bi bi-github"></i>
              </a>
              <a :href="portfolio" class="social-btn portfolio">
                <i class="bi bi-briefcase"></i>
              </a>
              <a :href="contactLinks.email" class="social-btn email">
                <i class="bi bi-envelope"></i>
              </a>
            </div>
            <div class="footer-button-wrapper">
              <router-link to="/contact" class="get-in-touch-btn footer-main-button" @mouseover="handleButtonHover" @mouseout="handleButtonOut">
              <i class="bi bi-chat-dots me-2"></i>Get In Touch
            </router-link>
            </div>
          </div>
          </div>
        </div>
      </div>

    <!-- Bottom Section - Outside container for full width -->
      <div class="copyright-section">
      <div class="container">
        <p class="copyright-text">
          © 2024 <strong class="footer-copyright-name">{{ fullName }}</strong>. All rights reserved.<br>
          Designed with <span class="heart">❤️</span> by <a href="https://bootstrapmade.com/" class="footer-bootstrap-link" @mouseover="handleBootstrapHover" @mouseout="handleBootstrapOut">BootstrapMade</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { APP_CONFIG } from '../config/constants.js'

export default {
  name: 'Footer',
  data() {
    return {
      // VUE PROPER: Import constants instead of deleted personalData.js
      ...APP_CONFIG
    }
  },
  methods: {
    handleContactHover(event) {
      event.target.style.color = '#a855f7'
      event.target.style.textShadow = '0 0 8px rgba(168, 85, 247, 0.4)'
    },
    handleContactOut(event) {
      event.target.style.color = 'rgba(255, 255, 255, 0.7)'
      event.target.style.textShadow = 'none'
    },
    handleBootstrapHover(event) {
      event.target.style.color = '#ffffff'
      event.target.style.textShadow = '0 0 12px rgba(102, 126, 234, 0.6)'
    },
    handleBootstrapOut(event) {
      event.target.style.color = '#667eea'
      event.target.style.textShadow = '0 0 8px rgba(102, 126, 234, 0.3)'
    },
    handleButtonHover(event) {
      event.target.style.transform = 'translateY(-2px) scale(1.05)'
      event.target.style.boxShadow = '0 6px 20px rgba(168, 85, 247, 0.4)'
    },
    handleButtonOut(event) {
      event.target.style.transform = 'translateY(0) scale(1)'
      event.target.style.boxShadow = '0 4px 15px rgba(168, 85, 247, 0.3)'
    }
  }
}
</script>

<style scoped>
.footer-main {
  background: linear-gradient(135deg, rgba(20, 0, 40, 0.9) 0%, rgba(15, 0, 30, 0.95) 50%, rgba(10, 0, 20, 1) 100%), radial-gradient(circle at 20% 20%, rgba(40, 10, 80, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(50, 15, 100, 0.08) 0%, transparent 50%);
  backdrop-filter: blur(40px) saturate(130%) brightness(0.6);
  -webkit-backdrop-filter: blur(40px) saturate(130%) brightness(0.6);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 50px 0 30px 0;
  margin-top: 60px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03), 0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.4);
}

/* Footer Section Styles */
.footer-section-title {
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
}

.footer-icon-purple {
  color: #a855f7;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-list-item {
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.7);
}

.footer-list-icon {
  color: #27ae60;
}

/* Footer text patterns */
.footer-description-text {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 20px;
}

.footer-contact-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.7rem;
  
  /* Desktop (fine pointer + hover) - smaller for desktop narrower viewports */
  @media (hover: hover) and (pointer: fine) {
    font-size: 0.65rem !important;
  }
  
  /* Medium desktop - even smaller */
  @media (hover: hover) and (pointer: fine) and (min-width: 992px) and (max-width: 1199px) {
    font-size: 0.6rem !important;
  }
  
  /* Large desktop - small */
  @media (hover: hover) and (pointer: fine) and (min-width: 1200px) {
    font-size: 0.6rem !important;
  }
}

.footer-contact-link {
  display: block;
  margin-bottom: 4px;
  font-size: 0.7rem;
  
  /* Desktop (fine pointer + hover) - smaller for desktop narrower viewports */
  @media (hover: hover) and (pointer: fine) {
    font-size: 0.65rem !important;
  }
  
  /* Medium desktop - even smaller */
  @media (hover: hover) and (pointer: fine) and (min-width: 992px) and (max-width: 1199px) {
    font-size: 0.6rem !important;
  }
  
  /* Large desktop - small */
  @media (hover: hover) and (pointer: fine) and (min-width: 1200px) {
    font-size: 0.6rem !important;
  }
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
}

.footer-button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
}

.footer-main-button {
  background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
}

/* Footer Layout - Account for Fixed Navigation */
.footer {
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Desktop Layout - Account for Fixed Navigation Sidebar */
@media (hover: hover) and (pointer: fine) and (min-width: 1200px) {
  .footer {
    margin-left: 0; /* Use Bootstrap grid instead */
    width: 100%;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
  }
  
  /* Center the 4-column row */
  .row.mb-4 {
    max-width: 1000px;
    margin: 0 auto 2rem auto;
  }
}

/* Tablet Layout - Full width since navigation is hidden */
@media (pointer: coarse) or (max-width: 1199.98px) {
  .footer {
    margin-left: calc(-50vw + 50%);
    width: 100vw;
  }
  
  .container {
    max-width: 100%;
    margin: 0 auto;
    padding: 0 15px;
    box-sizing: border-box;
  }
  
  .row.mb-4 {
    max-width: none;
    margin: 0 0 2rem 0;
  }
}

/* Tablet adjustments */
@media (pointer: coarse) and (max-width: 991.98px) {
  .container {
    padding: 0 15px;
  }
  
  /* Better responsive layout for tablets */
  .row.mb-4 .col-lg-3 {
    margin-bottom: 30px;
  }
}

/* Mobile adjustments */
@media (pointer: coarse) and (max-width: 767.98px) {
  .container {
    padding: 0 10px;
  }
  
  .footer-section {
    margin-bottom: 30px;
    text-align: center;
  }
  
  .footer-section h5 {
    /* Font size handled by font-sizes.css */
    margin-bottom: 15px !important;
  }
  
  .contact-info p {
    margin-bottom: 6px !important;
  }

  .contact-info-item {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 4px;
    display: block;
    text-decoration: none;
    transition: all 0.3s ease;
    /* Font size handled by font-sizes.css */
  }

  .contact-link:hover {
    color: #667eea !important;
    text-shadow: 0 0 8px rgba(102, 126, 234, 0.4);
  }
  
  /* Center social links on mobile */
  .social-links {
    justify-content: center;
  }
}

/* Responsive font sizes for contact info - 30% bigger */
@media (hover: hover) and (pointer: fine) and (min-width: 1200px) {
  .contact-info-item {
    font-size: 0.78rem !important; /* Desktop - 0.6rem + 30% = 0.78rem */
  }
  
  /* Override for contact text specifically on desktop */
  .contact-info-item.footer-contact-text,
  .contact-info-item.footer-contact-link {
    font-size: 0.6rem !important; /* Smaller for desktop */
  }
}

@media (hover: hover) and (pointer: fine) and (min-width: 992px) and (max-width: 1199px) {
  .contact-info-item {
    font-size: 0.845rem !important; /* Large tablet - 0.65rem + 30% = 0.845rem */
  }
  
  /* Override for contact text specifically on medium desktop */
  .contact-info-item.footer-contact-text,
  .contact-info-item.footer-contact-link {
    font-size: 0.6rem !important; /* Smaller for medium desktop */
  }
}

@media (pointer: coarse) and (min-width: 768px) and (max-width: 991px) {
  .contact-info-item {
    font-size: 0.91rem !important; /* Tablet - 0.7rem + 30% = 0.91rem */
  }
}

@media (pointer: coarse) and (max-width: 767px) {
  .contact-info-item {
    font-size: 0.975rem !important; /* Mobile - 0.75rem + 30% = 0.975rem */
  }
}

/* Footer Navigation Links */
.footer-nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%; /* Ensure container takes full width */
}

.footer-nav-links li {
  margin-bottom: 12px;
  width: 100%; /* Ensure list items take full width */
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
  width: 100%; /* Expand to full width of column */
  box-sizing: border-box; /* Include padding in width calculation */
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

/* Unique hover backgrounds for each footer nav link - Same as sidebar */
.footer-nav-links li:nth-child(1) .footer-nav-link:hover {
  background: rgba(255, 107, 107, 0.45);
}

.footer-nav-links li:nth-child(2) .footer-nav-link:hover {
  background: rgba(0, 184, 148, 0.45);
}

.footer-nav-links li:nth-child(3) .footer-nav-link:hover {
  background: rgba(116, 185, 255, 0.45);
}

.footer-nav-links li:nth-child(4) .footer-nav-link:hover {
  background: rgba(162, 155, 254, 0.45);
}

.footer-nav-links li:nth-child(5) .footer-nav-link:hover {
  background: rgba(253, 121, 168, 0.45);
}

/* Footer Icon Wrappers - Same as Navigation */
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

/* Home - Orange Gradient */
.footer-icon-wrapper.home-icon {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  box-shadow: 0 3px 12px rgba(255, 107, 107, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.home-icon {
  transform: scale(1.08) rotate(2deg);
  box-shadow: 0 4px 16px rgba(255, 107, 107, 0.35);
}

/* About - Green Gradient */
.footer-icon-wrapper.about-icon {
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  box-shadow: 0 3px 12px rgba(0, 184, 148, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.about-icon {
  transform: scale(1.08) rotate(-2deg);
  box-shadow: 0 4px 16px rgba(0, 184, 148, 0.35);
}

/* Resume - Blue Gradient */
.footer-icon-wrapper.resume-icon {
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  box-shadow: 0 3px 12px rgba(116, 185, 255, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.resume-icon {
  transform: scale(1.08) rotate(2deg);
  box-shadow: 0 4px 16px rgba(116, 185, 255, 0.35);
}

/* Portfolio - Purple Gradient */
.footer-icon-wrapper.portfolio-icon {
  background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
  box-shadow: 0 3px 12px rgba(162, 155, 254, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.portfolio-icon {
  transform: scale(1.08) rotate(-2deg);
  box-shadow: 0 4px 16px rgba(162, 155, 254, 0.35);
}

/* Contact - Pink Gradient */
.footer-icon-wrapper.contact-icon {
  background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
  box-shadow: 0 3px 12px rgba(253, 121, 168, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.contact-icon {
  transform: scale(1.08) rotate(-2deg);
  box-shadow: 0 4px 16px rgba(253, 121, 168, 0.35);
}

.footer-nav-link .navicon {
  /* Font size handled by font-sizes.css */
  color: white;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

/* Responsive Footer Layout */
@media (max-width: 768px) {
  .footer-section {
    text-align: center;
  }
  
  .footer-nav-links {
    display: flex;
    flex-direction: column;
    align-items: stretch; /* Allow full width expansion */
    width: 100%;
  }
  
  .footer-nav-link {
    width: 100%;
    max-width: 100%; /* Allow full width on tablet */
    justify-content: center;
    margin: 0; /* Remove margins for full width */
  }
  
  /* Ensure copyright text is centered on tablet */
  .copyright-section {
    text-align: center !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 100% !important;
  }
  
  .copyright-section .container {
    text-align: center !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 100% !important;
  }
  
  .copyright-text {
    text-align: center !important;
    width: 100% !important;
    margin: 0 auto !important;
    display: block !important;
  }
}

@media (max-width: 576px) {
  .footer-nav-links {
    align-items: stretch; /* Ensure full width on mobile */
    width: 100%;
  }
  
  .footer-nav-link {
    padding: 8px 10px;
    font-size: 0.9rem;
    width: 100%; /* Ensure full width on mobile */
    margin: 0; /* No margins for full width */
  }
  
  .footer-icon-wrapper {
    width: 24px;
    height: 24px;
  }
  
  /* Ensure copyright text is centered on mobile */
  .copyright-section {
    text-align: center !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 100% !important;
  }
  
  .copyright-section .container {
    text-align: center !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 100% !important;
  }
  
  .copyright-text {
    text-align: center !important;
    width: 100% !important;
    margin: 0 auto !important;
    display: block !important;
  }
}

/* Social Media Buttons */
.social-links {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
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

/* Copyright section styling */
.copyright-section {
  text-align: center !important;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 30px;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
}

.copyright-section .container {
  text-align: center !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
}

.copyright-text {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0 auto !important;
  text-align: center !important;
  width: 100% !important;
  display: block !important;
}

.copyright-text .heart {
  color: #e74c3c;
  /* Font size handled by font-sizes.css */
}

/* Debug: Force centering with maximum specificity */
#footer .copyright-section .container .copyright-text {
  text-align: center !important;
  margin: 0 auto !important;
  display: block !important;
  width: 100% !important;
  max-width: none !important;
}

/* Force Get In Touch button font size for mobile */
@media (max-width: 768px) {
  .get-in-touch-btn {
    font-size: 0.9rem !important; /* Override inline style for tablet */
  }
  
  .footer-nav-link {
    font-size: 0.9rem !important; /* Footer navigation links - tablet size */
  }
}

@media (max-width: 576px) {
  .get-in-touch-btn {
    font-size: 1.17rem !important; /* Override inline style for mobile - increased by 30% */
  }
  
  .footer-nav-link {
    font-size: 1.17rem !important; /* Footer navigation links - mobile size increased by 30% */
  }
}

/* Smooth transitions */
.footer {
  transition: all 0.3s ease;
}

.container {
  transition: all 0.3s ease;
}

/* Ensure no horizontal scroll */
* {
  box-sizing: border-box;
}
</style>
