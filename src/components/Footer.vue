<template>
  <footer id="footer" class="footer">
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
              <div class="contact-info-item">
                <i class="bi bi-geo-alt-fill me-2 footer-icon-purple"></i>{{ location }}
              </div>
              <a :href="contactLinks.email" class="contact-info-item contact-link">
                <i class="bi bi-envelope-fill me-2 footer-icon-purple"></i>{{ email }}
              </a>
              <a :href="contactLinks.phone" class="contact-info-item contact-link">
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
            <p class="footer-connect-text">
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
              <router-link to="/contact" class="get-in-touch-btn">
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
          Designed with <span class="heart">❤️</span> by <a href="https://bootstrapmade.com/" class="footer-bootstrap-link">BootstrapMade</a>
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
      ...APP_CONFIG
    }
  }
}
</script>

<style scoped>
/* Footer Main Background */
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
.contact-info-item {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4px;
  display: block;
  text-decoration: none;
  transition: all 0.3s ease;
  /* Font size handled by font-sizes.css */
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

/* Unique hover backgrounds for each nav link */
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

/* Home Icon - Orange Gradient */
.footer-icon-wrapper.home-icon {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  box-shadow: 0 3px 12px rgba(255, 107, 107, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.home-icon {
  transform: scale(1.08) rotate(2deg);
  box-shadow: 0 4px 16px rgba(255, 107, 107, 0.35);
}

/* About Icon - Green Gradient */
.footer-icon-wrapper.about-icon {
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  box-shadow: 0 3px 12px rgba(0, 184, 148, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.about-icon {
  transform: scale(1.08) rotate(-2deg);
  box-shadow: 0 4px 16px rgba(0, 184, 148, 0.35);
}

/* Resume Icon - Blue Gradient */
.footer-icon-wrapper.resume-icon {
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  box-shadow: 0 3px 12px rgba(116, 185, 255, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.resume-icon {
  transform: scale(1.08) rotate(2deg);
  box-shadow: 0 4px 16px rgba(116, 185, 255, 0.35);
}

/* Portfolio Icon - Purple Gradient */
.footer-icon-wrapper.portfolio-icon {
  background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
  box-shadow: 0 3px 12px rgba(162, 155, 254, 0.25);
}

.footer-nav-link:hover .footer-icon-wrapper.portfolio-icon {
  transform: scale(1.08) rotate(-2deg);
  box-shadow: 0 4px 16px rgba(162, 155, 254, 0.35);
}

/* Contact Icon - Pink Gradient */
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