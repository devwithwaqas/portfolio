<template>
  <section id="portfolio" class="portfolio section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      
      <!-- Portfolio Card -->
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1); padding: 10px;">
            
            <!-- Card Header -->
            <div class="card-header fancy-3d-header" style="margin: -10px -10px 30px -10px; padding: 25px 40px; border-radius: 20px 20px 0 0; border: none;">
              <h3 style="color: white; margin: 0; font-weight: 700; font-size: 1.5rem; text-align: center;">🎨 Project Portfolio</h3>
            </div>

            <!-- Card Body -->
            <div class="card-body" style="padding: 0;">

              <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">

                <!-- Portfolio Filters Removed - All projects are Enterprise Projects -->

                <div class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">

                  <!-- Heat Exchanger Portal -->
                  <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                    <div class="polaroid-card" style="background: #f5f5f5; padding: 30px; border-radius: 15px; position: relative; transition: all 0.4s ease; transform: rotate(-2deg);" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                      <!-- Custom Shadow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.08); border-radius: 15px; transform: translate(6px, 6px) rotate(-2deg); z-index: -1; filter: blur(8px);"></div>
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.05); border-radius: 15px; transform: translate(12px, 12px) rotate(-2deg); z-index: -2; filter: blur(12px);"></div>
                      <!-- Pin -->
                      <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: linear-gradient(135deg, #ff4757, #ff3742); border-radius: 50%; box-shadow: 0 4px 8px rgba(255, 71, 87, 0.3); z-index: 10; border: 2px solid #fff;"></div>
                      
                      <!-- Polaroid Frame -->
                      <div style="background: white; padding: 15px 15px 25px 15px; border-radius: 8px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; position: relative;">
                        <!-- Image -->
                            <img src="/assets/img/he1.jpg" class="img-fluid" alt="Heat Exchanger Portal" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; transition: all 0.3s ease;">
                        
                        <!-- Polaroid Text Area -->
                        <div style="text-align: center; padding: 10px 0;">
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; font-size: 1.1rem; font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🔥 Heat Exchanger Portal</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; font-size: 0.9rem; font-style: italic; font-family: 'Georgia', serif;">Enterprise Petroleum Management</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/he1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="heat-exchanger-portal.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- Air Asia ID90 -->
                  <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                    <div class="polaroid-card" style="background: #f5f5f5; padding: 30px; border-radius: 15px; position: relative; transition: all 0.4s ease; transform: rotate(1deg);" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                      <!-- Custom Shadow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.08); border-radius: 15px; transform: translate(-4px, 4px) rotate(1deg); z-index: -1; filter: blur(8px);"></div>
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.05); border-radius: 15px; transform: translate(-8px, 8px) rotate(1deg); z-index: -2; filter: blur(12px);"></div>
                      <!-- Pin -->
                      <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: linear-gradient(135deg, #f093fb, #f5576c); border-radius: 50%; box-shadow: 0 4px 8px rgba(240, 147, 251, 0.3); z-index: 10; border: 2px solid #fff;"></div>
                      
                      <!-- Polaroid Frame -->
                      <div style="background: white; padding: 15px 15px 25px 15px; border-radius: 8px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; position: relative;">
                        <!-- Image -->
                            <img src="/assets/img/aa1.jpg" class="img-fluid" alt="Air Asia ID90 Application" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; transition: all 0.3s ease;">
                        
                        <!-- Polaroid Text Area -->
                        <div style="text-align: center; padding: 10px 0;">
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; font-size: 1.1rem; font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">✈️ Air Asia ID90</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; font-size: 0.9rem; font-style: italic; font-family: 'Georgia', serif;">Allstars Portal & Refund System</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/aa1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="air-asia-id90.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- BAT Inhouse App -->
                  <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                    <div class="polaroid-card" style="background: #f5f5f5; padding: 30px; border-radius: 15px; position: relative; transition: all 0.4s ease; transform: rotate(-1deg);" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                      <!-- Custom Shadow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.08); border-radius: 15px; transform: translate(4px, 4px) rotate(-1deg); z-index: -1; filter: blur(8px);"></div>
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.05); border-radius: 15px; transform: translate(8px, 8px) rotate(-1deg); z-index: -2; filter: blur(12px);"></div>
                      <!-- Pin -->
                      <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: linear-gradient(135deg, #4facfe, #00f2fe); border-radius: 50%; box-shadow: 0 4px 8px rgba(79, 172, 254, 0.3); z-index: 10; border: 2px solid #fff;"></div>
                      
                      <!-- Polaroid Frame -->
                      <div style="background: white; padding: 15px 15px 25px 15px; border-radius: 8px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; position: relative;">
                        <!-- Image -->
                            <img src="/assets/img/bat1.jpg" class="img-fluid" alt="BAT Inhouse App" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; transition: all 0.3s ease;">
                        
                        <!-- Polaroid Text Area -->
                        <div style="text-align: center; padding: 10px 0;">
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; font-size: 1.1rem; font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🏢 BAT Inhouse App</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; font-size: 0.9rem; font-style: italic; font-family: 'Georgia', serif;">British American Tobacco Management</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/bat1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="bat-inhouse-app.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- PJ Smart City -->
                  <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                    <div class="polaroid-card" style="background: #f5f5f5; padding: 30px; border-radius: 15px; position: relative; transition: all 0.4s ease; transform: rotate(2deg);" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                      <!-- Custom Shadow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.08); border-radius: 15px; transform: translate(-5px, 5px) rotate(2deg); z-index: -1; filter: blur(8px);"></div>
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.05); border-radius: 15px; transform: translate(-10px, 10px) rotate(2deg); z-index: -2; filter: blur(12px);"></div>
                      <!-- Pin -->
                      <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: linear-gradient(135deg, #43e97b, #38f9d7); border-radius: 50%; box-shadow: 0 4px 8px rgba(67, 233, 123, 0.3); z-index: 10; border: 2px solid #fff;"></div>
                      
                      <!-- Polaroid Frame -->
                      <div style="background: white; padding: 15px 15px 25px 15px; border-radius: 8px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; position: relative;">
                        <!-- Image -->
                        <img src="/assets/img/pj1.jpg" class="img-fluid" alt="PJ Smart City" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; transition: all 0.3s ease;">
                        
                        <!-- Polaroid Text Area -->
                        <div style="text-align: center; padding: 10px 0;">
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; font-size: 1.1rem; font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🏙️ PJ Smart City</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; font-size: 0.9rem; font-style: italic; font-family: 'Georgia', serif;">Petaling Jaya Smart City Platform</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/pj1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #43e97b, #38f9d7); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="pj-smart-city.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #43e97b, #38f9d7); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- G5 POS -->
                  <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                    <div class="polaroid-card" style="background: #f5f5f5; padding: 30px; border-radius: 15px; position: relative; transition: all 0.4s ease; transform: rotate(-3deg);" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                      <!-- Custom Shadow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.08); border-radius: 15px; transform: translate(6px, 6px) rotate(-3deg); z-index: -1; filter: blur(8px);"></div>
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.05); border-radius: 15px; transform: translate(12px, 12px) rotate(-3deg); z-index: -2; filter: blur(12px);"></div>
                      <!-- Pin -->
                      <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; background: linear-gradient(135deg, #FF6B35, #F7931E); border-radius: 50%; box-shadow: 0 4px 8px rgba(255, 107, 53, 0.3); z-index: 10; border: 2px solid #fff;"></div>
                      
                      <!-- Polaroid Frame -->
                      <div style="background: white; padding: 15px 15px 25px 15px; border-radius: 8px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; position: relative;">
                        <!-- Image -->
                        <img src="/assets/img/g51.jpg" class="img-fluid" alt="G5 POS" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; transition: all 0.3s ease;">
                        
                        <!-- Polaroid Text Area -->
                        <div style="text-align: center; padding: 10px 0;">
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; font-size: 1.1rem; font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">💳 G5 POS</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; font-size: 0.9rem; font-style: italic; font-family: 'Georgia', serif;">Squad Cell Point of Sale System</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/g51.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #FF6B35, #F7931E); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="g5-pos.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #FF6B35, #F7931E); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- Gamified Employee Management -->
                  <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
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
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; font-size: 1.1rem; font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🎮 Gamified Employee Management</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; font-size: 0.9rem; font-style: italic; font-family: 'Georgia', serif;">Syntronic Employee Engagement Platform</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/sf1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #11998e, #38ef7d); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="gamified-employee-management.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #11998e, #38ef7d); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- Valet Parking -->
                  <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
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
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; font-size: 1.1rem; font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🚗 Valet Parking</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; font-size: 0.9rem; font-style: italic; font-family: 'Georgia', serif;">Secure Parking UAE Management System</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/vp1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="valet-parking.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                    </div>
                  </div>
                </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- Mobile Games Collection -->
                  <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
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
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; font-size: 1.1rem; font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🎮 Mobile Games Collection</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; font-size: 0.9rem; font-style: italic; font-family: 'Georgia', serif;">Geniteam Java & AndEngine Games</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/gd1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="mobile-games.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                    </div>
                  </div>
                </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- Confidential Insurance Clients -->
                  <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
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
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; font-size: 1.1rem; font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🛡️ Confidential Insurance Clients</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; font-size: 0.9rem; font-style: italic; font-family: 'Georgia', serif;">Enterprise Insurance Management Platform</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/in1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="chubb-insurance-applications.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                  </div>
                        </div>
                      </div>
                    </div>
                  </div><!-- End Portfolio Item -->

                  <!-- UK Property Management Platform -->
                  <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
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
                          <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-weight: 700; font-size: 1.1rem; font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;">🏠 UK Property Management Platform</h4>
                          <p style="color: #7f8c8d; margin: 0 0 8px 0; font-size: 0.9rem; font-style: italic; font-family: 'Georgia', serif;">Azure-Based Residential Property Management System</p>
                          <div style="display: flex; justify-content: center; gap: 6px; margin-top: 12px;">
                            <a href="/assets/img/gpc1.jpg" data-gallery="portfolio-gallery" class="glightbox preview-link" style="background: linear-gradient(135deg, #43e97b, #38f9d7); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-zoom-in"></i> Preview</a>
                            <a href="uk-property-management.html" title="More Details" class="details-link" style="background: linear-gradient(135deg, #43e97b, #38f9d7); color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 0.75rem; font-weight: 600; transition: all 0.3s ease; border: none;" @mouseover="handleButtonHover" @mouseout="handleButtonLeave"><i class="bi bi-link-45deg"></i> Details</a>
                </div>
              </div>
            </div>
          </div>
                  </div><!-- End Portfolio Item -->

                </div><!-- End Portfolio Container -->

              </div><!-- End Isotope Layout -->

            </div><!-- End Card Body -->
          </div><!-- End Card -->
        </div>
      </div>

    </div>
  </section><!-- /Portfolio Section -->
</template>

<script>
export default {
  name: 'Portfolio',
  methods: {
    handleMouseOver(event) {
      const card = event.currentTarget;
      const transform = card.style.transform;
      if (transform.includes('rotate(-2deg)')) {
        card.style.transform = 'rotate(0deg) translateY(-10px) scale(1.02)';
      } else if (transform.includes('rotate(1deg)')) {
        card.style.transform = 'rotate(0deg) translateY(-10px) scale(1.02)';
      } else if (transform.includes('rotate(-1deg)')) {
        card.style.transform = 'rotate(0deg) translateY(-10px) scale(1.02)';
      } else if (transform.includes('rotate(2deg)')) {
        card.style.transform = 'rotate(0deg) translateY(-10px) scale(1.02)';
      } else if (transform.includes('rotate(-3deg)')) {
        card.style.transform = 'rotate(0deg) translateY(-10px) scale(1.02)';
      } else if (transform.includes('rotate(1.5deg)')) {
        card.style.transform = 'rotate(0deg) translateY(-10px) scale(1.02)';
      } else if (transform.includes('rotate(-1.5deg)')) {
        card.style.transform = 'rotate(0deg) translateY(-10px) scale(1.02)';
      } else if (transform.includes('rotate(2.5deg)')) {
        card.style.transform = 'rotate(0deg) translateY(-10px) scale(1.02)';
      } else if (transform.includes('rotate(3deg)')) {
        card.style.transform = 'rotate(0deg) translateY(-10px) scale(1.02)';
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
    }
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
  }
}
</script>
