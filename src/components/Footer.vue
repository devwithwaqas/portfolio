<template>
  <footer id="footer" class="footer" style="background: linear-gradient(135deg, rgba(60, 20, 120, 0.6) 0%, rgba(50, 15, 100, 0.65) 50%, rgba(40, 10, 80, 0.7) 100%), radial-gradient(circle at 20% 20%, rgba(80, 30, 140, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(90, 35, 150, 0.12) 0%, transparent 50%); backdrop-filter: blur(40px) saturate(130%) brightness(0.85); -webkit-backdrop-filter: blur(40px) saturate(130%) brightness(0.85); border-top: 1px solid rgba(255, 255, 255, 0.08); padding: 50px 0 30px 0; margin-top: 60px; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.2);">
    
    <div class="container">
      <!-- Main Footer Content -->
      <div class="row mb-4">
        <!-- About Section -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="footer-section">
            <h5 style="color: #ffffff; font-weight: 700; margin-bottom: 20px; text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);">
              <i class="bi bi-person-circle me-2" style="color: #667eea;"></i>About Me
            </h5>
            <p style="color: rgba(255, 255, 255, 0.8); line-height: 1.6; margin-bottom: 20px;">
              Senior Software Engineer passionate about delivering high-quality solutions with expertise in .NET, Azure Cloud, and enterprise architecture.
            </p>
            <div class="contact-info">
              <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 8px;">
                <i class="bi bi-geo-alt-fill me-2" style="color: #667eea;"></i>Selangor, Malaysia
              </p>
              <a href="mailto:devwithwaqas@gmail.com" style="color: rgba(255, 255, 255, 0.7); text-decoration: none; display: block; margin-bottom: 8px; transition: all 0.3s ease;" @mouseover="$event.target.style.color='#667eea'; $event.target.style.textShadow='0 0 8px rgba(102, 126, 234, 0.4)'" @mouseout="$event.target.style.color='rgba(255, 255, 255, 0.7)'; $event.target.style.textShadow='none'">
                <i class="bi bi-envelope-fill me-2" style="color: #667eea;"></i>devwithwaqas@gmail.com
              </a>
              <a href="tel:+60146806067" style="color: rgba(255, 255, 255, 0.7); text-decoration: none; display: block; transition: all 0.3s ease;" @mouseover="$event.target.style.color='#667eea'; $event.target.style.textShadow='0 0 8px rgba(102, 126, 234, 0.4)'" @mouseout="$event.target.style.color='rgba(255, 255, 255, 0.7)'; $event.target.style.textShadow='none'">
                <i class="bi bi-telephone-fill me-2" style="color: #667eea;"></i>+60146806067
              </a>
            </div>
                  </div>
                </div>

        <!-- Quick Links -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="footer-section">
            <h5 style="color: #ffffff; font-weight: 700; margin-bottom: 20px; text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);">
              <i class="bi bi-link-45deg me-2" style="color: #667eea;"></i>Quick Links
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
            <h5 style="color: #ffffff; font-weight: 700; margin-bottom: 20px; text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);">
              <i class="bi bi-gear-fill me-2" style="color: #667eea;"></i>Services
            </h5>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.7);">
                <i class="bi bi-check-circle me-2" style="color: #27ae60;"></i>Web Development
              </li>
              <li style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.7);">
                <i class="bi bi-check-circle me-2" style="color: #27ae60;"></i>Cloud Solutions
              </li>
              <li style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.7);">
                <i class="bi bi-check-circle me-2" style="color: #27ae60;"></i>Enterprise Architecture
              </li>
              <li style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.7);">
                <i class="bi bi-check-circle me-2" style="color: #27ae60;"></i>API Development
              </li>
              <li style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.7);">
                <i class="bi bi-check-circle me-2" style="color: #27ae60;"></i>Database Design
              </li>
            </ul>
          </div>
                </div>

        <!-- Social & Contact -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="footer-section">
            <h5 style="color: #ffffff; font-weight: 700; margin-bottom: 20px; text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);">
              <i class="bi bi-share me-2" style="color: #667eea;"></i>Connect With Me
            </h5>
            <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 20px;">
              Let's collaborate and build something amazing together!
            </p>
            <div class="social-links">
              <a href="https://linkedin.com/in/waqas-ahmad-dev" target="_blank" class="social-btn linkedin">
                <i class="bi bi-linkedin"></i>
              </a>
              <a href="https://github.com/waqas-ahmad-dev" target="_blank" class="social-btn github">
                <i class="bi bi-github"></i>
              </a>
              <a href="https://twitter.com/waqas_ahmad_dev" target="_blank" class="social-btn twitter">
                <i class="bi bi-twitter-x"></i>
              </a>
              <a href="mailto:devwithwaqas@gmail.com" class="social-btn email">
                <i class="bi bi-envelope"></i>
              </a>
            </div>
            <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px; width: 100%;">
              <router-link to="/contact" class="get-in-touch-btn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border-radius: 25px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; display: inline-block; font-size: 1rem;" @mouseover="$event.target.style.transform='translateY(-2px) scale(1.05)'" @mouseout="$event.target.style.transform='translateY(0) scale(1)'">
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
          © 2024 <strong style="color: #ffffff; text-shadow: 0 0 8px rgba(102, 126, 234, 0.4);">Waqas Ahmad</strong>. All rights reserved.<br>
          Designed with <span class="heart">❤️</span> by <a href="https://bootstrapmade.com/" style="color: #667eea; text-decoration: none; font-weight: 500; text-shadow: 0 0 8px rgba(102, 126, 234, 0.3);" @mouseover="$event.target.style.color='#ffffff'; $event.target.style.textShadow='0 0 12px rgba(102, 126, 234, 0.6)'" @mouseout="$event.target.style.color='#667eea'; $event.target.style.textShadow='0 0 8px rgba(102, 126, 234, 0.3)'">BootstrapMade</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
/* Footer Layout - Account for Fixed Navigation */
.footer {
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Desktop Layout - Account for Fixed Navigation Sidebar */
@media (min-width: 1200px) {
  .footer {
    margin-left: 200px; /* Account for navigation width */
    width: calc(100vw - 200px);
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
@media (max-width: 1199.98px) {
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
@media (max-width: 991.98px) {
  .container {
    padding: 0 15px;
  }
  
  /* Better responsive layout for tablets */
  .row.mb-4 .col-lg-3 {
    margin-bottom: 30px;
  }
}

/* Mobile adjustments */
@media (max-width: 767.98px) {
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
  
  /* Center social links on mobile */
  .social-links {
    justify-content: center;
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

.social-btn.twitter {
  background: rgba(29, 161, 242, 0.1);
  color: #1da1f2;
  border-color: rgba(29, 161, 242, 0.3);
}

.social-btn.twitter:hover {
  background: #1da1f2;
  color: white;
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 25px rgba(29, 161, 242, 0.4);
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
