<template>
  <footer id="footer" class="footer" style="background: linear-gradient(135deg, rgba(44, 62, 80, 0.95) 0%, rgba(52, 73, 94, 0.95) 100%); backdrop-filter: blur(10px); border-top: 1px solid rgba(255, 255, 255, 0.1); padding: 50px 0 30px 0; margin-top: 60px;">
    
    <div class="container">
      <!-- Main Footer Content -->
      <div class="row mb-4">
        <!-- About Section -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="footer-section">
            <h5 style="color: #667eea; font-weight: 700; margin-bottom: 20px; font-size: 1.2rem;">
              <i class="bi bi-person-circle me-2"></i>About Me
            </h5>
            <p style="color: rgba(255, 255, 255, 0.8); line-height: 1.6; margin-bottom: 20px; font-size: 0.9rem;">
              Senior Software Engineer passionate about delivering high-quality solutions with expertise in .NET, Azure Cloud, and enterprise architecture.
            </p>
            <div class="contact-info">
              <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 8px; font-size: 0.85rem;">
                <i class="bi bi-geo-alt-fill me-2" style="color: #667eea;"></i>Selangor, Malaysia
              </p>
              <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 8px; font-size: 0.85rem;">
                <i class="bi bi-envelope-fill me-2" style="color: #667eea;"></i>devwithwaqas@gmail.com
              </p>
              <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.85rem;">
                <i class="bi bi-telephone-fill me-2" style="color: #667eea;"></i>+60146806067
              </p>
            </div>
                  </div>
                </div>

        <!-- Quick Links -->
        <div class="col-lg-2 col-md-6 mb-4">
          <div class="footer-section">
            <h5 style="color: #667eea; font-weight: 700; margin-bottom: 20px; font-size: 1.2rem;">
              <i class="bi bi-link-45deg me-2"></i>Quick Links
            </h5>
            <ul class="footer-nav-links">
              <li>
                <router-link to="/" class="footer-nav-link">
                  <i class="bi bi-house me-2"></i>Home
                </router-link>
              </li>
              <li>
                <router-link to="/#about" class="footer-nav-link">
                  <i class="bi bi-person me-2"></i>About
                </router-link>
              </li>
              <li>
                <router-link to="/#resume" class="footer-nav-link">
                  <i class="bi bi-file-earmark-text me-2"></i>Resume
                </router-link>
              </li>
              <li>
                <router-link to="/portfolio" class="footer-nav-link">
                  <i class="bi bi-images me-2"></i>Portfolio
                </router-link>
              </li>
              <li>
                <router-link to="/contact" class="footer-nav-link">
                  <i class="bi bi-envelope me-2"></i>Contact
                </router-link>
              </li>
            </ul>
          </div>
                  </div>

        <!-- Services -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="footer-section">
            <h5 style="color: #667eea; font-weight: 700; margin-bottom: 20px; font-size: 1.2rem;">
              <i class="bi bi-gear-fill me-2"></i>Services
            </h5>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.7); font-size: 0.85rem;">
                <i class="bi bi-check-circle me-2" style="color: #27ae60;"></i>Web Development
              </li>
              <li style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.7); font-size: 0.85rem;">
                <i class="bi bi-check-circle me-2" style="color: #27ae60;"></i>Cloud Solutions
              </li>
              <li style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.7); font-size: 0.85rem;">
                <i class="bi bi-check-circle me-2" style="color: #27ae60;"></i>Enterprise Architecture
              </li>
              <li style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.7); font-size: 0.85rem;">
                <i class="bi bi-check-circle me-2" style="color: #27ae60;"></i>API Development
              </li>
              <li style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.7); font-size: 0.85rem;">
                <i class="bi bi-check-circle me-2" style="color: #27ae60;"></i>Database Design
              </li>
            </ul>
          </div>
                </div>

        <!-- Social & Contact -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="footer-section">
            <h5 style="color: #667eea; font-weight: 700; margin-bottom: 20px; font-size: 1.2rem;">
              <i class="bi bi-share me-2"></i>Connect With Me
            </h5>
            <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 20px; font-size: 0.9rem;">
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
            <router-link to="/contact" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border-radius: 25px; text-decoration: none; font-size: 0.9rem; font-weight: 600; transition: all 0.3s ease; display: inline-block;" @mouseover="$event.target.style.transform='translateY(-2px) scale(1.05)'" @mouseout="$event.target.style.transform='translateY(0) scale(1)'">
              <i class="bi bi-chat-dots me-2"></i>Get In Touch
            </router-link>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="copyright-section">
        <p class="copyright-text">
          © 2024 <strong style="color: #667eea;">Waqas Ahmad</strong>. All rights reserved.<br>
          Designed with <span class="heart">❤️</span> by <a href="https://bootstrapmade.com/" style="color: #667eea; text-decoration: none; font-weight: 500;" @mouseover="$event.target.style.color='#764ba2'" @mouseout="$event.target.style.color='#667eea'">BootstrapMade</a>
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
/* Clean Full Width Footer Layout */
.footer {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Responsive Footer Layout */
@media (min-width: 1200px) {
  .footer {
    margin-left: calc(-50vw + 50%);
    width: 100vw;
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
    font-size: 1.1rem !important;
    margin-bottom: 15px !important;
  }
  
  .contact-info p {
    font-size: 0.8rem !important;
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
}

.footer-nav-links li {
  margin-bottom: 12px;
}

.footer-nav-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.footer-nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  transition: left 0.3s ease;
  z-index: -1;
}

.footer-nav-link:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.15);
  border: 1px solid rgba(102, 126, 234, 0.3);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.footer-nav-link:hover::before {
  left: 0;
}

.footer-nav-link i {
  transition: all 0.3s ease;
  color: inherit;
}

.footer-nav-link:hover i {
  color: #667eea !important;
  transform: scale(1.1);
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
  font-size: 1.2rem;
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
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 30px;
}

.copyright-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.copyright-text .heart {
  color: #e74c3c;
  font-size: 1rem;
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
