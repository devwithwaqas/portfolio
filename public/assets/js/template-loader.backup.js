/**
 * Template Loader - Dynamic Navigation and Footer Loading
 * Loads navigation and footer from embedded content (to avoid CORS issues)
 */

class TemplateLoader {
  // Embedded navigation content (from nav.html)
  static navigationContent = `
<header id="header" class="header d-flex flex-column justify-content-center">

  <i class="header-toggle d-xl-none bi bi-list"></i>

  <nav id="navmenu" class="navmenu">
    <ul>
      <li><a href="index.html#hero" class="nav-link"><i class="bi bi-house navicon"></i><span>Home</span></a></li>
      <li><a href="index.html#about" class="nav-link"><i class="bi bi-person navicon"></i><span>About</span></a></li>
      <li><a href="index.html#resume" class="nav-link"><i class="bi bi-file-earmark-text navicon"></i><span>Resume</span></a></li>
      <li><a href="index.html#portfolio" class="nav-link"><i class="bi bi-images navicon"></i><span>Portfolio</span></a></li>
      <li><a href="index.html#services" class="nav-link"><i class="bi bi-hdd-stack navicon"></i><span>Services</span></a></li>
      <li><a href="index.html#contact" class="nav-link"><i class="bi bi-envelope navicon"></i><span>Contact</span></a></li>
    </ul>
  </nav>

</header>`;

  // Embedded footer content (from footer.html)
  static footerContent = `
<footer id="footer" class="footer position-relative light-background" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); position: relative; overflow: hidden; padding: 60px 0 30px 0;">
  <!-- Subtle Background Pattern -->
  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%); opacity: 0.3;"></div>
  
  <!-- Floating Orbs -->
  <div style="position: absolute; top: 30px; left: 30px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%); border-radius: 50%; animation: float 10s ease-in-out infinite;"></div>
  <div style="position: absolute; bottom: 40px; right: 40px; width: 80px; height: 80px; background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%); border-radius: 50%; animation: float 12s ease-in-out infinite reverse;"></div>
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%); border-radius: 50%; animation: float 15s ease-in-out infinite;"></div>
  
  <div class="container" style="position: relative; z-index: 2;">
    <!-- Main Footer Card -->
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 25px; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2); padding: 50px;">
          
          <!-- Card Header -->
          <div class="card-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: -50px -50px 40px -50px; padding: 30px 50px; border-radius: 25px 25px 0 0; border: none; text-align: center;">
            <h3 style="color: white; margin: 0; font-weight: 700; font-size: 2rem;">🌟 Let's Connect & Collaborate</h3>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 1.1rem;">Ready to bring your ideas to life with cutting-edge technology</p>
          </div>

          <!-- Card Body -->
          <div class="card-body" style="padding: 0;">
            <div class="row align-items-center">
              <!-- Profile Section -->
              <div class="col-lg-3 text-center mb-5 mb-lg-0">
                <div style="position: relative; display: inline-block;">
                  <!-- Profile Image with Glow Effect -->
                  <div style="width: 140px; height: 140px; margin: 0 auto; border-radius: 50%; overflow: hidden; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3); border: 5px solid rgba(255, 255, 255, 0.3); background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); padding: 5px; position: relative;">
                    <img src="assets/img/waqas-profile.jpg" alt="Waqas Ahmad" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                  </div>
                  <!-- Floating Badge -->
                  <div style="position: absolute; top: -10px; right: -10px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4); border: 3px solid white;">👨‍💻</div>
                </div>
                <h4 style="color: #2c3e50; font-weight: 700; font-size: 1.5rem; margin: 20px 0 10px 0; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">Waqas Ahmad</h4>
                <p style="color: #34495e; font-size: 0.95rem; margin: 0; font-weight: 600;">Senior Software Engineer</p>
              </div>

              <!-- Main Content -->
              <div class="col-lg-6 text-center mb-5 mb-lg-0">
                <h3 style="color: #2c3e50; font-weight: 700; font-size: 2.2rem; margin-bottom: 20px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">🚀 Ready to Build Something Amazing?</h3>
                <p style="color: #34495e; font-size: 1.15rem; line-height: 1.7; margin-bottom: 30px; font-weight: 500;">Passionate about delivering high-quality software solutions with expertise in .NET, Azure Cloud, and enterprise architecture. Let's transform your vision into reality!</p>
                
                <!-- Enhanced Social Links -->
                <div class="social-links d-flex justify-content-center" style="gap: 20px; margin-bottom: 30px;">
                  <a href="" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: all 0.4s ease; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4); font-size: 1.3rem;" onmouseover="this.style.transform='translateY(-5px) scale(1.15) rotate(5deg)'" onmouseout="this.style.transform='translateY(0) scale(1) rotate(0deg)'"><i class="bi bi-twitter-x"></i></a>
                  <a href="" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: all 0.4s ease; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4); font-size: 1.3rem;" onmouseover="this.style.transform='translateY(-5px) scale(1.15) rotate(-5deg)'" onmouseout="this.style.transform='translateY(0) scale(1) rotate(0deg)'"><i class="bi bi-facebook"></i></a>
                  <a href="" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: all 0.4s ease; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4); font-size: 1.3rem;" onmouseover="this.style.transform='translateY(-5px) scale(1.15) rotate(5deg)'" onmouseout="this.style.transform='translateY(0) scale(1) rotate(0deg)'"><i class="bi bi-instagram"></i></a>
                  <a href="" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: all 0.4s ease; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4); font-size: 1.3rem;" onmouseover="this.style.transform='translateY(-5px) scale(1.15) rotate(-5deg)'" onmouseout="this.style.transform='translateY(0) scale(1) rotate(0deg)'"><i class="bi bi-skype"></i></a>
                  <a href="" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: all 0.4s ease; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4); font-size: 1.3rem;" onmouseover="this.style.transform='translateY(-5px) scale(1.15) rotate(5deg)'" onmouseout="this.style.transform='translateY(0) scale(1) rotate(0deg)'"><i class="bi bi-linkedin"></i></a>
                </div>

                <!-- Call to Action Button -->
                <a href="#contact" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 35px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 1.1rem; transition: all 0.4s ease; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); display: inline-block;" onmouseover="this.style.transform='translateY(-3px) scale(1.05)'" onmouseout="this.style.transform='translateY(0) scale(1)'">
                  <i class="bi bi-chat-dots-fill" style="margin-right: 10px;"></i>Start a Project
                </a>
              </div>

              <!-- Quick Contact Card -->
              <div class="col-lg-3 text-center">
                <div style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%); border-radius: 20px; padding: 25px; border: 1px solid rgba(255, 255, 255, 0.4); backdrop-filter: blur(15px); box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);">
                  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; font-size: 1.5rem; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);">
                    <i class="bi bi-lightning-charge-fill"></i>
                  </div>
                  <h4 style="color: #2c3e50; font-weight: 700; margin-bottom: 15px; font-size: 1.2rem;">Quick Contact</h4>
                  <div style="text-align: left;">
                    <p style="color: #34495e; margin-bottom: 12px; font-size: 0.95rem; display: flex; align-items: center;">
                      <i class="bi bi-envelope-fill" style="color: #667eea; margin-right: 10px; font-size: 1.1rem;"></i>
                      <span>devwithwaqas@gmail.com</span>
                    </p>
                    <p style="color: #34495e; margin-bottom: 12px; font-size: 0.95rem; display: flex; align-items: center;">
                      <i class="bi bi-telephone-fill" style="color: #667eea; margin-right: 10px; font-size: 1.1rem;"></i>
                      <span>+60146806067</span>
                    </p>
                    <p style="color: #34495e; font-size: 0.95rem; display: flex; align-items: center;">
                      <i class="bi bi-geo-alt-fill" style="color: #667eea; margin-right: 10px; font-size: 1.1rem;"></i>
                      <span>Selangor, Malaysia</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright Section -->
    <div class="row justify-content-center mt-4">
      <div class="col-12">
        <div style="background: rgba(255, 255, 255, 0.2); border-radius: 15px; padding: 20px; backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.3); text-align: center;">
          <div class="copyright" style="color: rgba(255, 255, 255, 0.9); font-weight: 600; font-size: 1rem; margin-bottom: 10px;">
            <span>© 2024 Copyright</span> <strong style="color: white; margin: 0 5px;">Waqas Ahmad</strong> <span>• All Rights Reserved</span>
          </div>
          <div class="credits" style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">
            Designed with ❤️ by <a href="https://bootstrapmade.com/" style="color: rgba(255, 255, 255, 0.9); text-decoration: none; font-weight: 600;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255, 255, 255, 0.9)'">BootstrapMade</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

<!-- Scroll Top -->
<a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Preloader -->
<div id="preloader"></div>`;

  /**
   * Load a template from embedded content
   * @param {string} templateType - Type of template ('navigation' or 'footer')
   * @param {string} targetId - ID of the element to insert the template into
   * @param {Function} callback - Optional callback function to run after loading
   */
  static loadEmbeddedTemplate(templateType, targetId, callback = null) {
    try {
      console.log(`🔄 Loading embedded template: ${templateType}`);
      
      let content = '';
      if (templateType === 'navigation') {
        content = this.navigationContent;
      } else if (templateType === 'footer') {
        content = this.footerContent;
      } else {
        throw new Error(`Unknown template type: ${templateType}`);
      }
      
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.innerHTML = content;
        console.log(`✅ ${templateType} template loaded into ${targetId}`);
        
        // Reinitialize any scripts that might be needed
        this.reinitializeScripts();
        
        if (callback && typeof callback === 'function') {
          callback();
        }
      } else {
        console.error(`❌ Target element with ID '${targetId}' not found`);
      }
    } catch (error) {
      console.error(`❌ Error loading ${templateType} template:`, error);
    }
  }

  /**
   * Load navigation template
   */
  static async loadNavigation() {
    return new Promise((resolve) => {
      this.loadEmbeddedTemplate('navigation', 'nav-placeholder', () => {
        console.log('✅ Navigation loaded successfully');
        this.initializeNavigation();
        console.log('✅ Navigation functionality initialized');
        resolve();
      });
    });
  }

  /**
   * Load footer template
   */
  static async loadFooter() {
    return new Promise((resolve) => {
      this.loadEmbeddedTemplate('footer', 'footer-placeholder', () => {
        console.log('✅ Footer loaded successfully');
        resolve();
      });
    });
  }

  /**
   * Load both navigation and footer
   */
  static async loadAllTemplates() {
    await Promise.all([
      this.loadNavigation(),
      this.loadFooter()
    ]);
  }

  /**
   * Reinitialize scripts that might be needed after template loading
   */
  static reinitializeScripts() {
    // Reinitialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }

    // Reinitialize any Bootstrap components
    if (typeof bootstrap !== 'undefined') {
      // Reinitialize tooltips
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });

      // Reinitialize popovers
      const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
      popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
      });
    }

    // Reinitialize any custom scripts
    if (typeof initializeCustomScripts === 'function') {
      initializeCustomScripts();
    }
    
    // Initialize main.js functionality after templates load
    this.initializeMainJSFunctionality();
    
    // Fix main content positioning after navigation loads
    this.fixMainContentPositioning();
    
    // Hide preloader after everything is loaded
    this.hidePreloader();
    
    // Update navigation active state
    this.updateNavigationActiveState();
  }
  
  /**
   * Initialize main.js functionality after templates load
   */
  static initializeMainJSFunctionality() {
    console.log('🔧 Initializing main.js functionality...');
    
    // Initialize header functionality
    if (typeof initializeHeaderFunctionality === 'function') {
      initializeHeaderFunctionality();
      console.log('✅ Header functionality initialized');
    }
    
    // Initialize scroll top functionality
    if (typeof initializeScrollTop === 'function') {
      initializeScrollTop();
      console.log('✅ Scroll top functionality initialized');
    }
  }
  
  /**
   * Hide the preloader
   */
  static hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
      console.log('✅ Preloader hidden');
    }
  }
  
  /**
   * Fix main content positioning after navigation loads
   */
  static fixMainContentPositioning() {
    const mainElement = document.querySelector('main');
    const headerElement = document.querySelector('#header');
    
    console.log('🔧 Checking main content positioning...');
    console.log('📍 Main element found:', !!mainElement);
    console.log('📍 Header element found:', !!headerElement);
    
    if (mainElement) {
      const mainStyles = getComputedStyle(mainElement);
      console.log('📍 Main element styles:', {
        display: mainStyles.display,
        visibility: mainStyles.visibility,
        marginLeft: mainStyles.marginLeft,
        width: mainStyles.width,
        height: mainStyles.height,
        position: mainStyles.position,
        top: mainStyles.top,
        left: mainStyles.left,
        zIndex: mainStyles.zIndex
      });
      
      // Check sections within main
      const sections = mainElement.querySelectorAll('section');
      console.log('📍 Number of sections found:', sections.length);
      sections.forEach((section, index) => {
        const sectionStyles = getComputedStyle(section);
        console.log(`📍 Section ${index + 1}:`, section.id, {
          display: sectionStyles.display,
          visibility: sectionStyles.visibility,
          height: sectionStyles.height,
          position: sectionStyles.position,
          top: sectionStyles.top,
          left: sectionStyles.left,
          zIndex: sectionStyles.zIndex
        });
      });
      
      // Ensure main content is visible
      mainElement.style.display = 'block';
      mainElement.style.visibility = 'visible';
      mainElement.style.opacity = '1';
      mainElement.style.position = 'relative';
      mainElement.style.zIndex = '1';
      
      // Ensure all sections are visible
      sections.forEach(section => {
        section.style.display = 'block';
        section.style.visibility = 'visible';
        section.style.opacity = '1';
      });
      
      console.log('✅ Main content visibility ensured');
    }
    
    if (mainElement && headerElement) {
      console.log('🔧 Fixing main content positioning...');
      
      // Force the CSS rules to be applied
      const style = document.createElement('style');
      style.textContent = `
        main {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          z-index: 1 !important;
        }
        
        main section {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
        }
        
        @media (min-width: 1200px) and (max-width: 1600px) {
          main {
            margin-left: 160px !important;
          }
          main .hero {
            margin-left: -160px !important;
            width: 100vw !important;
          }
        }
        @media (min-width: 1600px) {
          main {
            margin-left: 200px !important;
          }
          main .hero {
            margin-left: -200px !important;
            width: 100vw !important;
          }
        }
      `;
      document.head.appendChild(style);
      
      console.log('✅ Main content positioning fixed');
    }
  }

  /**
   * Update navigation active state based on current page
   */
  static updateNavigationActiveState() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#navmenu a');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      // Check if this link corresponds to the current page
      const href = link.getAttribute('href');
      if (href === '#' + currentPage.replace('.html', '') || 
          (currentPage === 'index.html' && href === '#hero')) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Initialize navigation functionality after loading
   */
  static initializeNavigation() {
    // Handle current page highlighting
    this.highlightCurrentPage();
    
    // Add click handlers for smooth scrolling (only for same-page links)
    const navLinks = document.querySelectorAll('#navmenu a[href*="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.includes('#')) {
          // Check if this is a same-page link or cross-page link
          const isSamePage = !href.includes('.html');
          if (isSamePage) {
            e.preventDefault();
            const targetId = href.split('#')[1];
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
          // For cross-page links (like index.html#portfolio), let the browser handle navigation
        }
      });
    });

    // Initialize mobile menu toggle
    const headerToggle = document.querySelector('.header-toggle');
    if (headerToggle) {
      headerToggle.addEventListener('click', function() {
        const navmenu = document.querySelector('.navmenu');
        if (navmenu) {
          navmenu.classList.toggle('navmenu-mobile');
        }
      });
    }
  }

  /**
   * Highlight the current page in navigation
   */
  static highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#navmenu a');
    
    // Remove all active classes first
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Determine which navigation item should be active
    if (currentPage === 'index.html') {
      // On index page, highlight Home by default
      const homeLink = document.querySelector('#navmenu a[href="index.html#hero"]');
      if (homeLink) homeLink.classList.add('active');
    } else if (currentPage.includes('portfolio') || currentPage.includes('details')) {
      // On portfolio pages, highlight Portfolio
      const portfolioLink = document.querySelector('#navmenu a[href="index.html#portfolio"]');
      if (portfolioLink) portfolioLink.classList.add('active');
    } else if (currentPage.includes('service')) {
      // On service pages, highlight Services
      const servicesLink = document.querySelector('#navmenu a[href="index.html#services"]');
      if (servicesLink) servicesLink.classList.add('active');
    }
  }
}

// Auto-load templates when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
  console.log('🚀 DOM loaded, checking for template placeholders...');
  
  // Hide preloader immediately to prevent it from getting stuck
  TemplateLoader.hidePreloader();
  
  // Check if placeholder elements exist
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  
  console.log('📍 Nav placeholder found:', !!navPlaceholder);
  console.log('📍 Footer placeholder found:', !!footerPlaceholder);
  
  // Check if main content is visible
  const mainContent = document.querySelector('main');
  console.log('📍 Main content found:', !!mainContent);
  
  if (mainContent) {
    console.log('📍 Main content sections:', mainContent.children.length);
  }
  
  try {
    // Load templates in parallel
    const loadPromises = [];
    
    if (navPlaceholder) {
      console.log('🔄 Loading navigation...');
      loadPromises.push(TemplateLoader.loadNavigation());
    } else {
      console.error('❌ Navigation placeholder not found!');
    }
    
    if (footerPlaceholder) {
      console.log('🔄 Loading footer...');
      loadPromises.push(TemplateLoader.loadFooter());
    } else {
      console.error('❌ Footer placeholder not found!');
    }
    
    // Wait for all templates to load
    await Promise.all(loadPromises);
    
    console.log('✅ All templates loaded successfully');
    
    // Final check and cleanup
    console.log('🔍 Final check:');
    console.log('📍 Navigation loaded:', !!document.querySelector('#header'));
    console.log('📍 Footer loaded:', !!document.querySelector('#footer'));
    console.log('📍 Main content visible:', !!document.querySelector('main'));
    
  } catch (error) {
    console.error('❌ Error loading templates:', error);
    
    // Fallback: If navigation didn't load, ensure main content is visible
    const header = document.querySelector('#header');
    const main = document.querySelector('main');
    
    if (!header && main) {
      console.log('⚠️ Navigation failed to load, ensuring main content is visible...');
      main.style.marginLeft = '0';
      main.style.display = 'block';
    }
  }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TemplateLoader;
}
