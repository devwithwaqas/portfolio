<template>
  <section id="portfolio" class="portfolio section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      
      <!-- Portfolio Card -->
      <ReusableCard 
        title="Project Portfolio" 
        icon="🎨"
        body-padding="0"
      >

              <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">

                <!-- Portfolio Filters Removed - All projects are Enterprise Projects -->

                <div class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">

                  <!-- Heat Exchanger Portal - Epic Redesign -->
                  <div class="col-xxl-120-30 col-xl-120-40 col-lg-120-40 col-md-120-60 col-sm-120-60 col-xs-120-60 col-us-120-60 col-120-120 portfolio-item isotope-item filter-app">
                    <div class="card-wrapper">
                      <div class="card-container">
                        <div class="epic-card">
                      <!-- SVG Border Animation -->
                      <svg class="border-overlay" viewBox="0 0 400 570" preserveAspectRatio="none">
                        <defs>
                          <filter id="glow" x="-300%" y="-300%" width="600%" height="600%">
                            <feGaussianBlur stdDeviation="8" result="b"/>
                            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                          </filter>
                          <linearGradient id="gA" x1="0" x2="1">
                            <stop offset="0" stop-color="#00e5ff"/>
                            <stop offset="1" stop-color="#00ffd6"/>
                          </linearGradient>
                          <linearGradient id="gB" x1="0" x2="1">
                            <stop offset="0" stop-color="#ff2aff"/>
                            <stop offset="1" stop-color="#ff6bf5"/>
                          </linearGradient>
                        </defs>
                        <path ref="track" d="" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="3" />
                        <path ref="seg1" d="" stroke="url(#gA)" stroke-width="14" fill="none" stroke-linecap="round" filter="url(#glow)" />
                        <path ref="seg2" d="" stroke="url(#gB)" stroke-width="14" fill="none" stroke-linecap="round" filter="url(#glow)" />
                      </svg>
                      
                      <!-- Tech Stack Row -->
                      <div class="tech-stack-section">
                        <div class="built-with-text">Built with</div>
                        <div class="tech-stack-row">
                          <div class="tech-icon-box">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" alt="Angular" class="tech-stack-icon">
                          </div>
                          <div class="tech-icon-box">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" alt=".NET Core" class="tech-stack-icon">
                          </div>
                          <div class="tech-icon-box">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg" alt="SQL Server" class="tech-stack-icon">
                          </div>
                          <div class="tech-icon-box">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" class="tech-stack-icon">
                          </div>
                          <div class="tech-icon-box">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis" class="tech-stack-icon">
                          </div>
                        </div>
                      </div>
                      
                      <!-- Main Banner -->
                      <div class="banner-section">
                        <img src="/assets/img/he1.jpg" alt="Heat Exchanger Portal" class="banner-img">
                        <div class="banner-overlay">
                          </div>
                        </div>
                      
          <!-- Content Section -->
          <div class="content-section">
            <div class="project-header">
              <div class="text-overlay"></div>
              <h3 class="project-title">Heat Exchanger Portal</h3>
              <p class="project-subtitle">Enterprise Thermal Management</p>
                      </div>
                        
                        
            <!-- Action Buttons -->
    <div class="action-section">
      <div class="epic-buttons">
        <a href="/assets/img/he1.jpg" data-gallery="portfolio-gallery" class="glightbox button preview-btn">
          <span class="button_lg">
            <span class="button_sl"></span>
            <span class="button_text">Preview</span>
          </span>
        </a>
        <a href="heat-exchanger-portal.html" title="More Details" class="button details-btn">
          <span class="button_lg">
            <span class="button_sl"></span>
            <span class="button_text">Details</span>
          </span>
        </a>
                          </div>
    </div>
                      </div>
                      
                      <!-- Glow Effect -->
                      <div class="card-glow"></div>
                        </div>
                      </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- Air Asia ID90 -->
                  <div class="col-xxl-120-30 col-xl-120-40 col-lg-120-40 col-md-120-60 col-sm-120-60 col-xs-120-60 col-us-120-60 col-120-120 portfolio-item isotope-item filter-app">
                    <div class="polaroid-card" style="background: #f5f5f5; padding: 30px; border-radius: 15px; position: relative; transition: all 0.4s ease; transform: rotate(1deg);" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                      <!-- Custom Shadow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.08); border-radius: 15px; transform: translate(-4px, 4px) rotate(1deg); z-index: -1; filter: blur(4px);"></div>
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.05); border-radius: 15px; transform: translate(-8px, 8px) rotate(1deg); z-index: -2; filter: blur(6px);"></div>
                      <!-- Pin -->
                      <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: linear-gradient(135deg, #f093fb, #f5576c); border-radius: 50%; box-shadow: 0 4px 8px rgba(240, 147, 251, 0.3); z-index: 10; border: 2px solid #fff;"></div>
                      
                      <!-- Polaroid Frame -->
                      <div style="background: white; padding: 15px 15px 25px 15px; border-radius: 8px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; position: relative;">
                        <!-- Image -->
                            <img src="/assets/img/aa1.jpg" class="img-fluid" alt="Air Asia ID90 Application" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; transition: all 0.3s ease;">
                        
                        <!-- Polaroid Text Area -->
                        <div style="text-align: center; padding: 10px 0;">
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; /* Font size handled by font-sizes.css */ font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">✈️ Air Asia ID90</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; /* Font size handled by font-sizes.css */ font-style: italic; font-family: 'Georgia', serif;">Allstars Portal & Refund System</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/aa1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="air-asia-id90.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- BAT Inhouse App -->
                  <div class="col-xxl-120-30 col-xl-120-40 col-lg-120-40 col-md-120-60 col-sm-120-60 col-xs-120-60 col-us-120-60 col-120-120 portfolio-item isotope-item filter-app">
                    <div class="polaroid-card" style="background: #f5f5f5; padding: 30px; border-radius: 15px; position: relative; transition: all 0.4s ease; transform: rotate(-1deg);" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                      <!-- Custom Shadow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.08); border-radius: 15px; transform: translate(4px, 4px) rotate(-1deg); z-index: -1; filter: blur(4px);"></div>
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.05); border-radius: 15px; transform: translate(8px, 8px) rotate(-1deg); z-index: -2; filter: blur(6px);"></div>
                      <!-- Pin -->
                      <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: linear-gradient(135deg, #4facfe, #00f2fe); border-radius: 50%; box-shadow: 0 4px 8px rgba(79, 172, 254, 0.3); z-index: 10; border: 2px solid #fff;"></div>
                      
                      <!-- Polaroid Frame -->
                      <div style="background: white; padding: 15px 15px 25px 15px; border-radius: 8px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; position: relative;">
                        <!-- Image -->
                            <img src="/assets/img/bat1.jpg" class="img-fluid" alt="BAT Inhouse App" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; transition: all 0.3s ease;">
                        
                        <!-- Polaroid Text Area -->
                        <div style="text-align: center; padding: 10px 0;">
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; /* Font size handled by font-sizes.css */ font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🏢 BAT Inhouse App</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; /* Font size handled by font-sizes.css */ font-style: italic; font-family: 'Georgia', serif;">British American Tobacco Management</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/bat1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="bat-inhouse-app.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- PJ Smart City -->
                  <div class="col-xxl-120-30 col-xl-120-40 col-lg-120-40 col-md-120-60 col-sm-120-60 col-xs-120-60 col-us-120-60 col-120-120 portfolio-item isotope-item filter-app">
                    <div class="polaroid-card" style="background: #f5f5f5; padding: 30px; border-radius: 15px; position: relative; transition: all 0.4s ease; transform: rotate(2deg);" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                      <!-- Custom Shadow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.08); border-radius: 15px; transform: translate(-5px, 5px) rotate(2deg); z-index: -1; filter: blur(4px);"></div>
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.05); border-radius: 15px; transform: translate(-10px, 10px) rotate(2deg); z-index: -2; filter: blur(6px);"></div>
                      <!-- Pin -->
                      <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: linear-gradient(135deg, #43e97b, #38f9d7); border-radius: 50%; box-shadow: 0 4px 8px rgba(67, 233, 123, 0.3); z-index: 10; border: 2px solid #fff;"></div>
                      
                      <!-- Polaroid Frame -->
                      <div style="background: white; padding: 15px 15px 25px 15px; border-radius: 8px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; position: relative;">
                        <!-- Image -->
                        <img src="/assets/img/pj1.jpg" class="img-fluid" alt="PJ Smart City" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; transition: all 0.3s ease;">
                        
                        <!-- Polaroid Text Area -->
                        <div style="text-align: center; padding: 10px 0;">
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; /* Font size handled by font-sizes.css */ font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🏙️ PJ Smart City</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; /* Font size handled by font-sizes.css */ font-style: italic; font-family: 'Georgia', serif;">Petaling Jaya Smart City Platform</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/pj1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #43e97b, #38f9d7); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="pj-smart-city.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #43e97b, #38f9d7); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- G5 POS -->
                  <div class="col-xxl-120-30 col-xl-120-40 col-lg-120-40 col-md-120-60 col-sm-120-60 col-xs-120-60 col-us-120-60 col-120-120 portfolio-item isotope-item filter-app">
                    <div class="polaroid-card" style="background: #f5f5f5; padding: 30px; border-radius: 15px; position: relative; transition: all 0.4s ease; transform: rotate(-3deg);" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                      <!-- Custom Shadow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.08); border-radius: 15px; transform: translate(6px, 6px) rotate(-3deg); z-index: -1; filter: blur(4px);"></div>
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.05); border-radius: 15px; transform: translate(12px, 12px) rotate(-3deg); z-index: -2; filter: blur(6px);"></div>
                      <!-- Pin -->
                      <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: linear-gradient(135deg, #FF6B35, #F7931E); border-radius: 50%; box-shadow: 0 4px 8px rgba(255, 107, 53, 0.3); z-index: 10; border: 2px solid #fff;"></div>
                      
                      <!-- Polaroid Frame -->
                      <div style="background: white; padding: 15px 15px 25px 15px; border-radius: 8px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; position: relative;">
                        <!-- Image -->
                        <img src="/assets/img/g51.jpg" class="img-fluid" alt="G5 POS" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; transition: all 0.3s ease;">
                        
                        <!-- Polaroid Text Area -->
                        <div style="text-align: center; padding: 10px 0;">
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; /* Font size handled by font-sizes.css */ font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">💳 G5 POS</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; /* Font size handled by font-sizes.css */ font-style: italic; font-family: 'Georgia', serif;">Squad Cell Point of Sale System</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/g51.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #FF6B35, #F7931E); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="g5-pos.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #FF6B35, #F7931E); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- Gamified Employee Management -->
                  <div class="col-xxl-120-30 col-xl-120-40 col-lg-120-40 col-md-120-60 col-sm-120-60 col-xs-120-60 col-us-120-60 col-120-120 portfolio-item isotope-item filter-app">
                    <div class="polaroid-card" style="background: #f5f5f5; padding: 30px; border-radius: 15px; position: relative; transition: all 0.4s ease; transform: rotate(1.5deg);" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                      <!-- Custom Shadow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.08); border-radius: 15px; transform: translate(-4px, 4px) rotate(1.5deg); z-index: -1; filter: blur(8px);"></div>
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.05); border-radius: 15px; transform: translate(-8px, 8px) rotate(1.5deg); z-index: -2; filter: blur(12px);"></div>
                      <!-- Pin -->
                      <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: linear-gradient(135deg, #11998e, #38ef7d); border-radius: 50%; box-shadow: 0 4px 8px rgba(17, 153, 142, 0.3); z-index: 10; border: 2px solid #fff;"></div>
                      
                      <!-- Polaroid Frame -->
                      <div style="background: white; padding: 15px 15px 25px 15px; border-radius: 8px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; position: relative;">
                        <!-- Image -->
                        <img src="/assets/img/sf1.jpg" class="img-fluid" alt="Gamified Employee Management" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; transition: all 0.3s ease;">
                        
                        <!-- Polaroid Text Area -->
                        <div style="text-align: center; padding: 10px 0;">
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; /* Font size handled by font-sizes.css */ font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🎮 Gamified Employee Management</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; /* Font size handled by font-sizes.css */ font-style: italic; font-family: 'Georgia', serif;">Syntronic Employee Engagement Platform</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/sf1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #11998e, #38ef7d); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="gamified-employee-management.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #11998e, #38ef7d); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- Valet Parking -->
                  <div class="col-xxl-120-30 col-xl-120-40 col-lg-120-40 col-md-120-60 col-sm-120-60 col-xs-120-60 col-us-120-60 col-120-120 portfolio-item isotope-item filter-app">
                    <div class="polaroid-card" style="background: #f5f5f5; padding: 30px; border-radius: 15px; position: relative; transition: all 0.4s ease; transform: rotate(-1.5deg);" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                      <!-- Custom Shadow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.08); border-radius: 15px; transform: translate(4px, 4px) rotate(-1.5deg); z-index: -1; filter: blur(8px);"></div>
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.05); border-radius: 15px; transform: translate(8px, 8px) rotate(-1.5deg); z-index: -2; filter: blur(12px);"></div>
                      <!-- Pin -->
                      <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3); z-index: 10; border: 2px solid #fff;"></div>
                      
                      <!-- Polaroid Frame -->
                      <div style="background: white; padding: 15px 15px 25px 15px; border-radius: 8px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; position: relative;">
                        <!-- Image -->
                        <img src="/assets/img/vp1.jpg" class="img-fluid" alt="Valet Parking" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; transition: all 0.3s ease;">
                        
                        <!-- Polaroid Text Area -->
                        <div style="text-align: center; padding: 10px 0;">
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; /* Font size handled by font-sizes.css */ font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🚗 Valet Parking</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; /* Font size handled by font-sizes.css */ font-style: italic; font-family: 'Georgia', serif;">Secure Parking UAE Management System</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/vp1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="valet-parking.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                    </div>
                  </div>
                </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- Mobile Games Collection -->
                  <div class="col-xxl-120-30 col-xl-120-40 col-lg-120-40 col-md-120-60 col-sm-120-60 col-xs-120-60 col-us-120-60 col-120-120 portfolio-item isotope-item filter-app">
                    <div class="polaroid-card" style="background: #f5f5f5; padding: 30px; border-radius: 15px; position: relative; transition: all 0.4s ease; transform: rotate(2.5deg);" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                      <!-- Custom Shadow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.08); border-radius: 15px; transform: translate(-5px, 5px) rotate(2.5deg); z-index: -1; filter: blur(8px);"></div>
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.05); border-radius: 15px; transform: translate(-10px, 10px) rotate(2.5deg); z-index: -2; filter: blur(12px);"></div>
                      <!-- Pin -->
                      <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: linear-gradient(135deg, #f093fb, #f5576c); border-radius: 50%; box-shadow: 0 4px 8px rgba(240, 147, 251, 0.3); z-index: 10; border: 2px solid #fff;"></div>
                      
                      <!-- Polaroid Frame -->
                      <div style="background: white; padding: 15px 15px 25px 15px; border-radius: 8px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; position: relative;">
                        <!-- Image -->
                        <img src="/assets/img/gd1.jpg" class="img-fluid" alt="Mobile Games Collection" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; transition: all 0.3s ease;">
                        
                        <!-- Polaroid Text Area -->
                        <div style="text-align: center; padding: 10px 0;">
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; /* Font size handled by font-sizes.css */ font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🎮 Mobile Games Collection</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; /* Font size handled by font-sizes.css */ font-style: italic; font-family: 'Georgia', serif;">Geniteam Java & AndEngine Games</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/gd1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="mobile-games.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                    </div>
                  </div>
                </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- Confidential Insurance Clients -->
                  <div class="col-xxl-120-30 col-xl-120-40 col-lg-120-40 col-md-120-60 col-sm-120-60 col-xs-120-60 col-us-120-60 col-120-120 portfolio-item isotope-item filter-app">
                    <div class="polaroid-card" style="background: #f5f5f5; padding: 30px; border-radius: 15px; position: relative; transition: all 0.4s ease; transform: rotate(-2deg);" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                      <!-- Custom Shadow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.08); border-radius: 15px; transform: translate(6px, 6px) rotate(-2deg); z-index: -1; filter: blur(8px);"></div>
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.05); border-radius: 15px; transform: translate(12px, 12px) rotate(-2deg); z-index: -2; filter: blur(12px);"></div>
                      <!-- Pin -->
                      <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: linear-gradient(135deg, #4facfe, #00f2fe); border-radius: 50%; box-shadow: 0 4px 8px rgba(79, 172, 254, 0.3); z-index: 10; border: 2px solid #fff;"></div>
                      
                      <!-- Polaroid Frame -->
                      <div style="background: white; padding: 15px 15px 25px 15px; border-radius: 8px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; position: relative;">
                        <!-- Image -->
                        <img src="/assets/img/in1.jpg" class="img-fluid" alt="Confidential Insurance Clients" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; transition: all 0.3s ease;">
                        
                        <!-- Polaroid Text Area -->
                        <div style="text-align: center; padding: 10px 0;">
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; /* Font size handled by font-sizes.css */ font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🛡️ Confidential Insurance Clients</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; /* Font size handled by font-sizes.css */ font-style: italic; font-family: 'Georgia', serif;">Enterprise Insurance Management Platform</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/in1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="chubb-insurance-applications.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                  </div>
                        </div>
                      </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- UK Property Management Platform -->
                  <div class="col-xxl-120-30 col-xl-120-40 col-lg-120-40 col-md-120-60 col-sm-120-60 col-xs-120-60 col-us-120-60 col-120-120 portfolio-item isotope-item filter-app">
                    <div class="polaroid-card" style="background: #f5f5f5; padding: 30px; border-radius: 15px; position: relative; transition: all 0.4s ease; transform: rotate(3deg);" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                      <!-- Custom Shadow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.08); border-radius: 15px; transform: translate(-5px, 5px) rotate(3deg); z-index: -1; filter: blur(8px);"></div>
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.05); border-radius: 15px; transform: translate(-10px, 10px) rotate(3deg); z-index: -2; filter: blur(12px);"></div>
                      <!-- Pin -->
                      <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: linear-gradient(135deg, #43e97b, #38f9d7); border-radius: 50%; box-shadow: 0 4px 8px rgba(67, 233, 123, 0.3); z-index: 10; border: 2px solid #fff;"></div>
                      
                      <!-- Polaroid Frame -->
                      <div style="background: white; padding: 15px 15px 25px 15px; border-radius: 8px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; position: relative;">
                        <!-- Image -->
                        <img src="/assets/img/gpc1.jpg" class="img-fluid" alt="UK Property Management Platform" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; transition: all 0.3s ease;">
                        
                        <!-- Polaroid Text Area -->
                        <div style="text-align: center; padding: 10px 0;">
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; /* Font size handled by font-sizes.css */ font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🏠 UK Property Management Platform</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; /* Font size handled by font-sizes.css */ font-style: italic; font-family: 'Georgia', serif;">Azure-Based Residential Property Management System</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/gpc1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #43e97b, #38f9d7); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="uk-property-management.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #43e97b, #38f9d7); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; /* Font size handled by font-sizes.css */ font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                </div>
              </div>
            </div>
          </div>
                  </div><!-- End Portfolio Item -->

                </div><!-- End Portfolio Container -->

              </div><!-- End Isotope Layout -->

      </ReusableCard>

    </div>
  </section><!-- /Portfolio Section -->
</template>

<script>
import ReusableCard from './ReusableCard.vue'

// Debug logging flags - set to true to enable specific debug logs
const DEBUG_FLAGS = {
  BORDER_ANIMATION: true,     // Border animation and aspect ratio adjustments
  RESIZE_OBSERVER: false,     // Resize observer events
  TOUCH_EVENTS: false,        // Touch and hover events
  PERFORMANCE: false,         // Performance and timing logs
  GENERAL: false              // General component logs
}

// Debug logging function
function debugLog(flag, ...args) {
  if (DEBUG_FLAGS[flag]) {
    console.log(`[${flag}]`, ...args);
  }
}

// Helper function for border adjustments (outside component scope)
function calculateBorderAdjustments(aspectRatio, baseRadius) {
  // Mathematical formula based on aspect ratio
  // The key insight: we need to adjust based on how far the aspect ratio is from 1.0
  
  // Calculate deviation from perfect square (1.0)
  const deviation = Math.abs(aspectRatio - 1.0);
  
  // Width adjustment formula: 
  // - For narrow cards (aspectRatio < 1): move inward (positive adjustment)
  // - For wide cards (aspectRatio > 1): move outward (negative adjustment)
  // - The further from 1.0, the more adjustment needed
  let widthAdjustment = 0;
  if (aspectRatio < 1.0) {
    // Narrow cards: move border inward to close the gap (reduced multiplier)
    widthAdjustment = deviation * 20; // Reduced from 80 to 20px per unit deviation
  } else {
    // Wide cards: move border outward to follow card edges (much stronger multiplier)
    widthAdjustment = -deviation * 400; // Increased from 200 to 400px per unit deviation (outward)
  }
  
  // Vertical adjustment: always move closer to edges for better alignment
  const verticalAdjustment = 4;
  
  // Radius adjustment: maintain proportional radius based on aspect ratio
  let radius = baseRadius;
  if (aspectRatio < 0.6) {
    // Very narrow cards: reduce radius significantly
    radius = Math.max(15, baseRadius * (0.5 + aspectRatio * 0.5));
  } else if (aspectRatio > 1.4) {
    // Very wide cards: increase radius slightly
    radius = Math.min(35, baseRadius * (1 + (aspectRatio - 1.4) * 0.2));
  }
  
  return {
    widthAdjustment,
    verticalAdjustment,
    radius
  };
}

export default {
  name: 'Portfolio',
  components: {
    ReusableCard
  },
  methods: {
    handleMouseOver(event) {
      const card = event.currentTarget;
      const transform = card.style.transform;
      if (transform.includes('rotate(-2deg)')) {
        card.style.transform = 'rotate(0deg) translateY(0) scale(1.02)';
      } else if (transform.includes('rotate(1deg)')) {
        card.style.transform = 'rotate(0deg) translateY(0) scale(1.02)';
      } else if (transform.includes('rotate(-1deg)')) {
        card.style.transform = 'rotate(0deg) translateY(0) scale(1.02)';
      } else if (transform.includes('rotate(2deg)')) {
        card.style.transform = 'rotate(0deg) translateY(0) scale(1.02)';
      } else if (transform.includes('rotate(-3deg)')) {
        card.style.transform = 'rotate(0deg) translateY(0) scale(1.02)';
      } else if (transform.includes('rotate(1.5deg)')) {
        card.style.transform = 'rotate(0deg) translateY(0) scale(1.02)';
      } else if (transform.includes('rotate(-1.5deg)')) {
        card.style.transform = 'rotate(0deg) translateY(0) scale(1.02)';
      } else if (transform.includes('rotate(2.5deg)')) {
        card.style.transform = 'rotate(0deg) translateY(0) scale(1.02)';
      } else if (transform.includes('rotate(3deg)')) {
        card.style.transform = 'rotate(0deg) translateY(0) scale(1.02)';
      }
    },
    handleMouseOut(event) {
      const card = event.currentTarget;
      const originalTransform = card.getAttribute('data-original-transform');
      if (originalTransform) {
        card.style.transform = originalTransform;
      } else {
        // Fallback to default transforms
        const cardIndex = Array.from(card.parentNode.children).indexOf(card);
        const transforms = [
          'rotate(-2deg) translateY(0) scale(1)', 'rotate(1deg) translateY(0) scale(1)', 'rotate(-1deg) translateY(0) scale(1)',
          'rotate(2deg) translateY(0) scale(1)', 'rotate(-3deg) translateY(0) scale(1)', 'rotate(1.5deg) translateY(0) scale(1)',
          'rotate(-1.5deg) translateY(0) scale(1)', 'rotate(2.5deg) translateY(0) scale(1)', 'rotate(-2deg) translateY(0) scale(1)',
          'rotate(3deg) translateY(0) scale(1)'
        ];
        card.style.transform = transforms[cardIndex] || 'rotate(0deg) translateY(0) scale(1)';
      }
    },
    handleButtonHover(event) {
      event.currentTarget.style.transform = 'scale(1.05)';
    },
    handleButtonLeave(event) {
      event.currentTarget.style.transform = 'scale(1)';
    },
    openImageOverlay(imageSrc) {
      const overlay = document.createElement('div');
      overlay.className = 'image-overlay-modal';
      overlay.innerHTML = `
        <div class="overlay-backdrop" onclick="this.parentElement.remove()"></div>
        <div class="overlay-content">
          <img src="${imageSrc}" alt="Project Image" class="overlay-image">
          <button class="close-btn" onclick="this.closest('.image-overlay-modal').remove()">×</button>
        </div>
      `;
      document.body.appendChild(overlay);
      
      // Add overlay styles
      const style = document.createElement('style');
      style.textContent = `
        .image-overlay-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        .overlay-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          cursor: pointer;
        }
        .overlay-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          z-index: 10000;
        }
        .overlay-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 15px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }
        .close-btn {
          position: absolute;
          top: -15px;
          right: -15px;
          width: 40px;
          height: 40px;
          background: #ff4757;
          color: white;
          border: none;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(255, 71, 87, 0.4);
          transition: all 0.3s ease;
        }
        .close-btn:hover {
          background: #ff3742;
          transform: scale(1.1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    },
  },
  mounted() {
    // Store original transforms for mouse out events
    this.$nextTick(() => {
      if (this.$el && this.$el.querySelectorAll) {
        const cards = this.$el.querySelectorAll('.polaroid-card');
        cards.forEach((card, index) => {
          const transforms = [
            'rotate(-2deg)', 'rotate(1deg)', 'rotate(-1deg)', 
            'rotate(2deg)', 'rotate(-3deg)', 'rotate(1.5deg)', 
            'rotate(-1.5deg)', 'rotate(2.5deg)', 'rotate(-2deg)', 
            'rotate(3deg)'
          ];
          card.setAttribute('data-original-transform', transforms[index] || 'rotate(0deg)');
        });
      }
    });

    // PROPER VUE INTEGRATION: Initialize GLightbox within Vue lifecycle instead of global
    this.initGLightbox()
    
    // Restore original SVG border animation with proper optimizations
    this.initBorderAnimation();
  },
  beforeUnmount() {
    // Clean up resize observer
    if (this.borderResizeObserver) {
      this.borderResizeObserver.disconnect();
      this.borderResizeObserver = null;
    }
  },
  methods: {
      initGLightbox() {
        // VUE NATIVE: Initialize GLightbox for image galleries within component lifecycle
        if (typeof GLightbox !== 'undefined') {
          GLightbox({
            selector: '.glightbox'
          });
        }
      },
      
      getDeviceType() {
        const ua = navigator.userAgent;
        const width = screen.width;
        const height = screen.height;
        const dpr = window.devicePixelRatio || 1;

        // Normalize actual physical resolution
        const realWidth = width * dpr;
        const realHeight = height * dpr;

        if (/Mobi|Android|iPhone|iPod/i.test(ua)) {
          return "Mobile Phone";
        } else if (/iPad|Tablet|PlayBook/i.test(ua) || (realWidth <= 1366 && realHeight <= 1366 && !/Mobi/i.test(ua))) {
          return "Tablet";
        } else {
          return "Desktop";
        }
      },

      initBorderAnimation() {
        // VUE NATIVE SOLUTION: No more direct DOM querying to avoid forced reflows
        this.$nextTick(() => {
          // Use $refs for proper Vue component isolation
          const track = this.$refs.track
          const seg1 = this.$refs.seg1  
          const seg2 = this.$refs.seg2

          if (!track || !seg1 || !seg2) {
            return;
          }

          // Basic rectangle path for the border
          const rectX = 50;
          const rectY = 50;
          const rectW = 300;
          const rectH = 470;
          const r = 28;

          function buildPath(x, y, w, h, rad) {
            return `M${x+rad},${y}H${x+w-rad}A${rad},${rad} 0 0 1 ${x+w},${y+rad}V${y+h-rad}A${rad},${rad} 0 0 1 ${x+w-rad},${y+h}H${x+rad}A${rad},${rad} 0 0 1 ${x},${y+h-rad}V${y+rad}A${rad},${rad} 0 0 1 ${x+rad},${y}Z`;
          }

          const d = buildPath(rectX, rectY, rectW, rectH, r);
          [track, seg1, seg2].forEach(el => el.setAttribute('d', d));
          
          const P = track.getTotalLength();
          const SEG_WANTED = 700;
          const SPEED = 300;
          const SEG_LEN = Math.min(SEG_WANTED, P * 0.3);
          const gap = P - SEG_LEN;
          const dash = `${SEG_LEN} ${gap}`;
          
          // Set stroke patterns WITH RAF to avoid forced reflows
          requestAnimationFrame(() => {
            seg1.style.strokeDasharray = dash;
            seg2.style.strokeDasharray = dash;
            seg1.style.strokeDashoffset = '0';
            seg2.style.strokeDashoffset = `-${P / 2}`;
          });

          let raf, start, isPaused = false;
          function step(ts) {
            // Check if animations are paused globally
            if (window.animationController && window.animationController.animationPaused) {
              isPaused = true;
              raf = requestAnimationFrame(step);
              return;
            }
            
            if (isPaused) {
              start = ts - (start || 0);
              isPaused = false;
            }
            
            if (!start) start = ts;
            
            // IMPROVED: Direct style assignment bundled to avoid forced reflow
            const dist = ((ts - start) / 1000 * SPEED) % P;
            seg1.style.strokeDashoffset = -dist;
            seg2.style.strokeDashoffset = -(dist + P / 2);
            
            raf = requestAnimationFrame(step);
          }
          
          function startAnim() { 
            if (!raf) { start = 0; raf = requestAnimationFrame(step); } 
          }
          function stopAnim() { cancelAnimationFrame(raf); raf = null; }

          const card = document.querySelector('.epic-card');
          const borderOverlay = document.querySelector('.border-overlay');
          
          if (card && borderOverlay) {
            const cardWrapper = document.querySelector('.card-wrapper');
            
            if (cardWrapper) {
            const deviceType = this.getDeviceType();
            const hasHover = window.matchMedia('(hover: hover)').matches;
            const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
            const isDesktop = hasHover && hasFinePointer && deviceType === 'Desktop';
            
            // All devices require hover/tap interaction - no always-on animations
            card.addEventListener('mouseenter', () => {
              startAnim();
              requestAnimationFrame(() => borderOverlay.style.opacity = '1');
            });
            card.addEventListener('mouseleave', () => {
              stopAnim();
              requestAnimationFrame(() => borderOverlay.style.opacity = '0');
            });
            
            // Also handle touch events for mobile/tablet
            card.addEventListener('touchstart', (e) => {
              // Don't prevent default to allow normal touch behavior
              card.classList.add('touch-active');
              startAnim();
              requestAnimationFrame(() => borderOverlay.style.opacity = '1');
              
              // Auto-hide after touch releases
              const touchEndHandler = () => {
                card.classList.remove('touch-active');
                stopAnim();
                requestAnimationFrame(() => borderOverlay.style.opacity = '0');
              };
              
              // Listen for when user stops touching or leaves screen
              card.addEventListener('touchend', touchEndHandler, { once: true });
              document.addEventListener('touchcancel', touchEndHandler, { once: true });
            });
            
            // Initialize: Start with animations hidden on all devices
            requestAnimationFrame(() => borderOverlay.style.opacity = '0');
            
            // Add resize observer to recalculate SVG path with minor adjustments
            // Using RAF to batch DOM updates and avoid forced reflows
            if (window.ResizeObserver) {
              const resizeObserver = new ResizeObserver(() => {
                // Use RAF to batch all DOM updates and avoid forced reflows
                requestAnimationFrame(() => {
                  const cardWrapperRect = cardWrapper.getBoundingClientRect();
                  const cardWidth = cardWrapperRect.width;
                  const cardHeight = cardWrapperRect.height;
                  
                  // Calculate minor adjustments based on card dimensions
                  // Keep the same proportions but adjust for narrow cards
                  const aspectRatio = cardWidth / cardHeight;
                  
                  // Adjust the rectangle dimensions slightly based on card width
                  let adjustedRectX = rectX;
                  let adjustedRectY = rectY;
                  let adjustedRectW = rectW;
                  let adjustedRectH = rectH;
                  let adjustedR = r;
                  
                  // Smart border adjustment based on aspect ratio
                  const adjustments = calculateBorderAdjustments(aspectRatio, r);
                  
                  // Use existing cardWrapperRect for debug logging
                  
                  debugLog('BORDER_ANIMATION', 'Aspect Ratio:', aspectRatio.toFixed(3));
                  debugLog('BORDER_ANIMATION', 'Card Dimensions:', { cardWidth, cardHeight });
                  debugLog('BORDER_ANIMATION', 'Card-Wrapper Box:', cardWrapperRect ? {
                    x: cardWrapperRect.x.toFixed(1),
                    y: cardWrapperRect.y.toFixed(1),
                    width: cardWrapperRect.width.toFixed(1),
                    height: cardWrapperRect.height.toFixed(1),
                    top: cardWrapperRect.top.toFixed(1),
                    left: cardWrapperRect.left.toFixed(1),
                    right: cardWrapperRect.right.toFixed(1),
                    bottom: cardWrapperRect.bottom.toFixed(1)
                  } : 'Not found');
                  debugLog('BORDER_ANIMATION', 'Adjustments:', adjustments);
                  
                  // Apply width adjustments correctly
                  adjustedRectX += adjustments.widthAdjustment;
                  adjustedRectW -= adjustments.widthAdjustment * 2; // Subtract to maintain proper width
                  adjustedRectY += adjustments.verticalAdjustment;
                  adjustedRectH -= adjustments.verticalAdjustment * 2; // Subtract to maintain proper height
                  adjustedR = adjustments.radius;
                  
                  // Batch all DOM updates in a single RAF frame
                  requestAnimationFrame(() => {
                    // Recalculate and update border path with adjusted dimensions
                    const adjustedD = buildPath(adjustedRectX, adjustedRectY, adjustedRectW, adjustedRectH, adjustedR);
                    [track, seg1, seg2].forEach(el => el.setAttribute('d', adjustedD));
                    
                    // Update animation parameters
                    const newP = track.getTotalLength();
                    const newSEG_WANTED = Math.min(700, newP * 0.4);
                    const newSEG_LEN = Math.min(newSEG_WANTED, newP * 0.3);
                    const newGap = newP - newSEG_LEN;
                    const newDash = `${newSEG_LEN} ${newGap}`;
                    
                    seg1.style.strokeDasharray = newDash;
                    seg2.style.strokeDasharray = newDash;
                  });
                });
              });
              
              resizeObserver.observe(cardWrapper);
              
              // Store observer for cleanup
              this.borderResizeObserver = resizeObserver;
            }
            }
          }
        });
      }
  }
}
</script>

<style scoped>
/* Mobile font size improvements for Portfolio section */
/* Removed conflicting font size rules - now handled globally */

/* Epic Card Design - Futuristic & Interactive */
.card-wrapper {
  padding: 20px; /* Reduced padding but still prevent border clipping */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Clip the border animation at card boundaries */
  border-radius: 28px; /* Match SVG border radius */
}

.card-container {
  position: relative;
  width: 100%; /* Allow container to fill available column width */
  max-width: 100%; /* Remove fixed max-width to prevent overflow */
  min-height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.epic-card {
  --border-width: 12px;
  position: relative;
  width: 100%; /* Allow card to fill available container width */
  min-height: 450px;
  background: #07182E;
  border-radius: 0px; /* Square corners for main card */
  overflow: visible;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  z-index: 3;
  padding: 8px;
  box-sizing: border-box;
  max-width: 100%; /* Remove fixed max-width constraint */
}

/* SVG Border Animation */
.border-overlay {
  position: absolute;
  left: -60px;
  top: -60px; /* Back to original position */
  width: calc(100% + 120px);
  height: calc(100% + 120px);
  pointer-events: none;
  z-index: 10; /* Higher than card to ensure border is visible */
  opacity: 0; /* Default hidden */
  transition: opacity 0.3s ease; /* Smooth transition for simpler animation */
}

/* Restored: Remove ugly CSS animations - using proper SVG JavaScript animation */

/* Hide border animation on desktop (fine pointer + hover), show only on hover */
@media (hover: hover) and (pointer: fine) {
  .border-overlay {
    opacity: 0 !important;
    transition: opacity 0.3s ease;
  }
  
  .epic-card:hover .border-overlay,
  .epic-card.touch-active .border-overlay {
    opacity: 1 !important;
  }
}

.epic-card,
.epic-card::after {
  box-sizing: border-box;
}

.epic-card:hover,
.epic-card.touch-active {
  transform: translateY(0) scale(1.02);
  box-shadow: 
    0 0 50px rgba(255, 100, 150, 0.4),
    0 0 100px rgba(255, 100, 150, 0.1),
    inset 0 0 50px rgba(255, 100, 150, 0.1);
}

/* Animated Background */
.card-bg-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(0, 255, 0, 0.05) 0%, transparent 50%);
  animation: bg-pulse 6s ease-in-out infinite;
  z-index: 1;
}

/* Tech Stack Section */
.tech-stack-section {
  position: relative;
  margin: 10px 5px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.built-with-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.tech-stack-row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;
}

.tech-stack-icon {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
  filter: brightness(1.2);
  z-index: 1;
  position: relative;
}

/* Desktop: Orange glow on hover only (fine pointer + hover capability) */
@media (hover: hover) and (pointer: fine) {
  .tech-icon-box:hover .tech-stack-icon {
    filter: brightness(1.4) saturate(1.2);
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(255, 165, 0, 0.6);
  }
}

/* Tech stack icon hover behavior - now only on hover/tap interaction for all devices */
.epic-card:hover .tech-stack-icon,
.epic-card.touch-active .tech-stack-icon {
  filter: brightness(1.3) saturate(1.1);
  box-shadow: 0 0 10px rgba(255, 165, 0, 0.4);
  transition: filter 0.3s ease, box-shadow 0.3s ease;
}

/* RESPONSIVE TECH STACK BUTTONS - Aligned with card breakpoints */

/* Extra extra large devices (1400px and up) - 4 cards per row */
@media (min-width: 1400px) {
  .tech-stack-row {
    gap: 10px !important;
  }
  
  .tech-icon-box {
    width: 42px !important;
    height: 42px !important;
  }
  
  .tech-stack-icon {
    width: 26px !important;
    height: 26px !important;
  }
  
  .built-with-text {
    font-size: 13px !important;
  }
}

/* Extra large devices (1200px and up) - 3 cards per row */
@media (min-width: 1200px) and (max-width: 1399px) {
  .tech-stack-row {
    gap: 8px !important;
  }
  
  .tech-icon-box {
    width: 40px !important;
    height: 40px !important;
  }
  
  .tech-stack-icon {
    width: 24px !important;
    height: 24px !important;
  }
  
  .built-with-text {
    font-size: 12px !important;
  }
}

/* Large devices (992px and up) - 3 cards per row */
@media (min-width: 992px) and (max-width: 1199px) {
  .tech-stack-row {
    gap: 6px !important;
  }
  
  .tech-icon-box {
    width: 38px !important;
    height: 38px !important;
  }
  
  .tech-stack-icon {
    width: 22px !important;
    height: 22px !important;
  }
  
  .built-with-text {
    font-size: 11px !important;
  }
}

/* Medium devices (768px and up) - 2 cards per row */
@media (min-width: 768px) and (max-width: 991px) {
  .tech-stack-row {
    gap: 5px !important;
  }
  
  .tech-icon-box {
    width: 36px !important;
    height: 36px !important;
  }
  
  .tech-stack-icon {
    width: 20px !important;
    height: 20px !important;
  }
  
  .built-with-text {
    font-size: 10px !important;
  }
}

/* Small devices (576px and up) - 2 cards per row */
@media (min-width: 576px) and (max-width: 767px) {
  .tech-stack-row {
    gap: 4px !important;
  }
  
  .tech-icon-box {
    width: 34px !important;
    height: 34px !important;
  }
  
  .tech-stack-icon {
    width: 18px !important;
    height: 18px !important;
  }
  
  .built-with-text {
    font-size: 9px !important;
  }
}

/* Extra small devices (550px and up) - 2 cards per row */
@media (min-width: 550px) and (max-width: 575px) {
  .tech-stack-row {
    gap: 3px !important;
  }
  
  .tech-icon-box {
    width: 32px !important;
    height: 32px !important;
  }
  
  .tech-stack-icon {
    width: 16px !important;
    height: 16px !important;
  }
  
  .built-with-text {
    font-size: 8px !important;
  }
}

/* Ultra small devices (400px and up) - 2 cards per row */
@media (min-width: 400px) and (max-width: 549px) {
  .tech-stack-row {
    gap: 2px !important;
  }
  
  .tech-icon-box {
    width: 30px !important;
    height: 30px !important;
  }
  
  .tech-stack-icon {
    width: 14px !important;
    height: 14px !important;
  }
  
  .built-with-text {
    font-size: 7px !important;
  }
}

/* Very small devices (below 400px) - 1 card per row */
@media (max-width: 399px) {
  .tech-stack-row {
    gap: 2px !important;
  }
  
  .tech-icon-box {
    width: 28px !important;
    height: 28px !important;
  }
  
  .tech-stack-icon {
    width: 12px !important;
    height: 12px !important;
  }
  
  .built-with-text {
    font-size: 6px !important;
  }
}

/* Banner Section */
.banner-section {
  position: relative;
  flex: 0 0 180px;
  overflow: hidden;
  z-index: 4;
  margin: 0px;
  border-radius: 0px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  filter: brightness(0.8) contrast(1.2);
}

.epic-card:hover .banner-img,
.epic-card.touch-active .banner-img {
  transform: scale(1.1);
  filter: brightness(1) contrast(1.4);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 255, 255, 0.2) 0%,
    rgba(255, 0, 255, 0.1) 50%,
    rgba(0, 255, 0, 0.2) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.epic-card:hover .banner-overlay,
.epic-card.touch-active .banner-overlay {
  opacity: 1;
}







/* Content Section */
.content-section {
  padding: 0px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 4;
  margin: 0px;
  border-radius: 0 0 15px 15px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.project-header {
  text-align: center;
  margin: 0px 0px 5px 0px;
  position: relative;
  z-index: 2;
  background: 
    radial-gradient(circle at 20% 50%, rgba(0, 200, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(255, 100, 150, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, 
      rgba(10, 15, 30, 0.9) 0%, 
      rgba(20, 25, 45, 0.95) 50%,
      rgba(10, 15, 30, 0.9) 100%);
  backdrop-filter: blur(20px);
  border-radius: 0px;
  padding: 20px 15px;
  border: none;
  background-clip: padding-box;
  position: relative;
  overflow: hidden;
}


.project-header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(90deg, 
      rgba(0, 200, 255, 0.1) 0%, 
      transparent 20%,
      transparent 80%,
      rgba(255, 100, 150, 0.1) 100%),
    radial-gradient(ellipse at center, 
      rgba(0, 200, 255, 0.05) 0%, 
      transparent 70%);
  animation: pulse-glow 4s ease-in-out infinite alternate;
  z-index: -1;
}

.project-header:hover::after {
  background: 
    linear-gradient(90deg, 
      rgba(0, 200, 255, 0.2) 0%, 
      transparent 20%,
      transparent 80%,
      rgba(255, 100, 150, 0.2) 100%),
    radial-gradient(ellipse at center, 
      rgba(0, 200, 255, 0.1) 0%, 
      transparent 70%);
}


.project-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
  text-shadow: 
    0 0 10px rgba(255, 255, 255, 0.3),
    0 0 20px rgba(0, 200, 255, 0.2);
  background: linear-gradient(135deg, #ffffff 0%, #00c8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Responsive project title sizing - Touch devices */
@media (pointer: coarse) {
  .project-title {
    font-size: 1.2rem !important;
  }
}

@media (pointer: coarse) and (max-width: 768px) {
  .project-title {
    font-size: 1.1rem !important;
  }
}

@media (pointer: coarse) and (max-width: 480px) {
  .project-title {
    font-size: 0.9rem !important;
  }
}

.project-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.4;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
}

/* Responsive project subtitle sizing - Touch devices */
@media (pointer: coarse) {
  .project-subtitle {
    font-size: 1rem !important;
  }
}

@media (pointer: coarse) and (max-width: 768px) {
  .project-subtitle {
    font-size: 0.9rem !important;
  }
}

@media (pointer: coarse) and (max-width: 480px) {
  .project-subtitle {
    font-size: 0.7rem !important;
  }
}


/* Action Section */
.action-section {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 4;
  margin: 5px 5px 15px 5px;
}

.epic-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  width: 100%;
}

.button {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  background: none;
  color: #0f1923;
  cursor: pointer;
  position: relative;
  padding: 8px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  transition: all .15s ease;
  text-decoration: none;
  flex: 1;
}

/* RESPONSIVE HEAT EXCHANGER BUTTONS - Aligned with 120-column breakpoints */

/* Extra extra large devices (1400px and up) - 4 cards per row */
@media (min-width: 1400px) {
  .epic-buttons .button_lg {
    padding: 6px 18px !important;
    font-size: 13px !important;
    text-align: center !important;
    min-height: 28px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
    font-size: 13px !important;
  }
}

/* Extra large devices (1200px and up) - 3 cards per row */
@media (min-width: 1200px) and (max-width: 1399px) {
  .epic-buttons .button_lg {
    padding: 5px 16px !important;
    font-size: 12px !important;
    text-align: center !important;
    min-height: 26px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
    font-size: 12px !important;
  }
}

/* Large devices (992px and up) - 3 cards per row */
@media (min-width: 992px) and (max-width: 1199px) {
  .epic-buttons .button_lg {
    padding: 4px 14px !important;
    font-size: 11px !important;
    text-align: center !important;
    min-height: 24px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
    font-size: 11px !important;
  }
}

/* Medium devices (768px and up) - 2 cards per row */
@media (min-width: 768px) and (max-width: 991px) {
  .epic-buttons .button_lg {
    padding: 4px 12px !important;
    font-size: 10px !important;
    text-align: center !important;
    min-height: 22px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
    font-size: 10px !important;
  }
}

/* Small devices (576px and up) - 2 cards per row */
@media (min-width: 576px) and (max-width: 767px) {
  .epic-buttons .button_lg {
    padding: 3px 10px !important;
    font-size: 9px !important;
    text-align: center !important;
    min-height: 20px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
    font-size: 9px !important;
  }
}

/* Extra small devices (550px and up) - 2 cards per row */
@media (min-width: 550px) and (max-width: 575px) {
  .epic-buttons .button_lg {
    padding: 3px 8px !important;
    font-size: 8px !important;
    text-align: center !important;
    min-height: 18px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
    font-size: 8px !important;
  }
}

/* Ultra small devices (400px and up) - 2 cards per row */
@media (min-width: 400px) and (max-width: 549px) {
  .epic-buttons .button_lg {
    padding: 2px 6px !important;
    font-size: 7px !important;
    text-align: center !important;
    min-height: 16px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
    font-size: 7px !important;
  }
}

/* Very small devices (below 400px) - 1 card per row */
@media (max-width: 399px) {
  .epic-buttons .button_lg {
    padding: 2px 4px !important;
    font-size: 6px !important;
    text-align: center !important;
    min-height: 14px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
    font-size: 6px !important;
  }
}

.button::before,
.button::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  left: 0;
  height: calc(50% - 5px);
  border: 1px solid #7D8082;
  transition: all .15s ease;
}

.button::before {
  top: 0;
  border-bottom-width: 0;
}

.button::after {
  bottom: 0;
  border-top-width: 0;
}

.button:active,
.button:focus {
  outline: none;
}

.button:active::before,
.button:active::after {
  right: 3px;
  left: 3px;
}

.button:active::before {
  top: 3px;
}

.button:active::after {
  bottom: 3px;
}

.button_lg {
  position: relative;
  display: block;
  padding: 10px 20px;
  color: #fff;
  background-color: #0f1923;
  overflow: hidden;
  box-shadow: inset 0px 0px 0px 1px transparent;
}

.button_lg::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background-color: #0f1923;
}

.button_lg::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 4px;
  height: 4px;
  background-color: #0f1923;
  transition: all .2s ease;
}

.button_sl {
  display: block;
  position: absolute;
  top: 0;
  bottom: -1px;
  left: -8px;
  width: 0;
  transform: skew(-15deg);
  transition: all .2s ease;
}

.button_text {
  position: relative;
}

.button:hover {
  color: #0f1923;
}

.button:hover .button_sl {
  width: calc(100% + 15px);
}

.button:hover .button_lg::after {
  background-color: #fff;
}

/* Preview Button Theme Colors */
.preview-btn .button_sl {
  background-color: #ff6b35;
}

/* Details Button Theme Colors */
.details-btn .button_sl {
  background-color: #8b5cf6;
}



/* Text Section Animations */
@keyframes border-glow {
  0% {
    opacity: 0.5;
    filter: brightness(1);
  }
  100% {
    opacity: 1;
    filter: brightness(1.5);
  }
}

@keyframes pulse-glow {
  0% {
    opacity: 0.3;
    transform: scale(1);
  }
  100% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

/* Removed unused animations - button-pulse, orange-glow, purple-glow, icon-bounce */

/* Glow Effect - REMOVED */
.card-glow {
  display: none;
}

/* Animations */
@keyframes bg-pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

/* Portfolio overflow fixes - Allow border animation to work properly */
.portfolio-item,
.isotope-container,
.row,
.col-lg-4,
.col-md-6,
#portfolio,
section,
#portfolio .container,
#portfolio .row,
#portfolio .col-lg-4,
#portfolio .col-md-6,
#portfolio .portfolio-item {
  overflow: visible !important;
  height: auto !important;
}

</style>


