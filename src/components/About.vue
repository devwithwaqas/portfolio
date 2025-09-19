<template>
  <section id="about" class="about section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <!-- About Card -->
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card" style="background: linear-gradient(135deg, rgba(60, 20, 120, 0.15) 0%, rgba(50, 15, 100, 0.1) 50%, rgba(40, 10, 80, 0.05) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(80, 30, 140, 0.3); border-radius: 20px; box-shadow: 0 20px 50px rgba(60, 20, 120, 0.2); padding: 10px;">
            
            <!-- Card Header -->
            <div class="card-header fancy-3d-header" style="margin: -10px -10px 30px -10px; padding: 25px 40px; border-radius: 20px 20px 0 0; border: none;">
              <h3 style="color: white; margin: 0; font-weight: 700; text-align: center;">👨‍💻 About Me</h3>
            </div>

            <!-- Card Body -->
            <div class="card-body" style="padding: 0;">
              <div class="row gy-4 justify-content-center">
                <div class="col-lg-4">
                  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 25px; border-radius: 25px; box-shadow: 0 25px 60px rgba(240, 147, 251, 0.4); border: 3px solid rgba(255, 255, 255, 0.3); position: relative; overflow: hidden; transform: perspective(1000px) rotateY(-5deg);">
                    <!-- Animated Background Pattern -->
                    <div style="position: absolute; top: 0; right: 0; width: 150px; height: 150px; background: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%), linear-gradient(-45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.15) 75%), linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.15) 75%); background-size: 25px 25px; background-position: 0 0, 0 12px, 12px -12px, -12px 0px; opacity: 0.4; animation: patternMove 25s linear infinite;"></div>
                    
                    <!-- Floating Elements -->
                    <div style="position: absolute; top: 10px; left: 10px; width: 20px; height: 20px; background: rgba(255, 255, 255, 0.3); border-radius: 50%; animation: float 3s ease-in-out infinite;"></div>
                    <div style="position: absolute; bottom: 15px; right: 15px; width: 15px; height: 15px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; animation: float 4s ease-in-out infinite reverse;"></div>
                    
                    <div style="position: relative; z-index: 2;">
                      <img src="/assets/img/waqas-microsoft-profile.jpg" class="img-fluid" alt="Waqas Ahmad - Senior Software Engineer at Microsoft" style="border-radius: 20px; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4); border: 4px solid rgba(255, 255, 255, 0.8); transform: scale(1.02); transition: all 0.3s ease;" @mouseover="$event.target.style.transform='scale(1.05)'" @mouseout="$event.target.style.transform='scale(1.02)'">
                    </div>
                  </div>
                </div>
                <div class="col-lg-8 content">
                  <div class="about-me-main-card" style="background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); padding: 30px; border-radius: 20px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1); border: 1px solid #e9ecef; position: relative; overflow: hidden;">
                    <!-- Animated Background Pattern -->
                    <div style="position: absolute; top: 0; right: 0; width: 200px; height: 200px; background: linear-gradient(45deg, rgba(5, 99, 187, 0.06) 25%, transparent 25%), linear-gradient(-45deg, rgba(5, 99, 187, 0.06) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(5, 99, 187, 0.06) 75%), linear-gradient(-45deg, transparent 75%, rgba(5, 99, 187, 0.06) 75%); background-size: 30px 30px; background-position: 0 0, 0 15px, 15px -15px, -15px 0px; opacity: 0.3; animation: patternMove 30s linear infinite;"></div>
                    
                    <div style="position: relative; z-index: 2;">
                      <h2 style="color: #0563bb; margin-bottom: 20px; font-weight: 600;">🚀 Senior Software Engineer &amp; Technical Lead</h2>
                      <p class="fst-italic py-3" style="color: #45505b; /* Font size handled by font-sizes.css */ line-height: 1.6;">
                        Proficient in enterprise applications architecture whether hybrid or platform specific either as services for company or products for the organizations. Currently engaged as Senior Software Engineer Full Stack (16+ years) / Technical Lead (8+ years overall as Technical Lead) in developing web / cloud based applications.
                      </p>
                      
                      <div class="row">
                        <div class="col-lg-6">
                          <div style="background: rgba(5, 99, 187, 0.05); padding: 20px; border-radius: 15px; border-left: 4px solid #0563bb;">
                            <ul style="list-style: none; padding-left: 0; margin: 0;">
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-calendar-event" style="color: #0563bb; margin-right: 10px; /* Font size handled by font-sizes.css */ margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong style="color: #0563bb;">Birthday:</strong> <span style="color: #45505b; margin-left: 5px;">September 21, 1987</span>
                                </div>
                              </li>
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-globe" style="color: #0563bb; margin-right: 10px; /* Font size handled by font-sizes.css */ margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong style="color: #0563bb;">Website:</strong> <span style="color: #45505b; margin-left: 5px; word-wrap: break-word; overflow-wrap: break-word;">www.waqasahmad.com</span>
                                </div>
                              </li>
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-telephone" style="color: #0563bb; margin-right: 10px; /* Font size handled by font-sizes.css */ margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong style="color: #0563bb;">Phone:</strong> <span style="color: #45505b; margin-left: 5px;">+60146806067</span>
                                </div>
                              </li>
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-geo-alt" style="color: #0563bb; margin-right: 10px; /* Font size handled by font-sizes.css */ margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong style="color: #0563bb;">City:</strong> <span style="color: #45505b; margin-left: 5px;">Selangor, Malaysia</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div style="background: rgba(5, 99, 187, 0.05); padding: 20px; border-radius: 15px; border-left: 4px solid #0563bb;">
                            <ul style="list-style: none; padding-left: 0; margin: 0;">
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-person-badge" style="color: #0563bb; margin-right: 10px; /* Font size handled by font-sizes.css */ margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong style="color: #0563bb;">Age:</strong> <span style="color: #45505b; margin-left: 5px;">36</span>
                                </div>
                              </li>
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-mortarboard" style="color: #0563bb; margin-right: 10px; /* Font size handled by font-sizes.css */ margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong style="color: #0563bb;">Degree:</strong> <span style="color: #45505b; margin-left: 5px; word-wrap: break-word; overflow-wrap: break-word;">Bachelor's in Computer System Engineering</span>
                                </div>
                              </li>
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-envelope" style="color: #0563bb; margin-right: 10px; /* Font size handled by font-sizes.css */ margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong style="color: #0563bb;">Email:</strong> <span style="color: #45505b; margin-left: 5px; word-wrap: break-word; overflow-wrap: break-word;">devwithwaqas@gmail.com</span>
                                </div>
                              </li>
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-briefcase" style="color: #0563bb; margin-right: 10px; /* Font size handled by font-sizes.css */ margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong style="color: #0563bb;">Freelance:</strong> <span style="color: #28a745; margin-left: 5px; font-weight: 600;">Available</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div style="background: linear-gradient(135deg, rgba(60, 20, 120, 0.8) 0%, rgba(50, 15, 100, 0.85) 50%, rgba(40, 10, 80, 0.9) 100%); color: white; padding: 25px; border-radius: 15px; margin-top: 25px; box-shadow: 0 15px 35px rgba(60, 20, 120, 0.4);">
                        <h5 style="color: white; margin-bottom: 15px; font-weight: 600;">💼 Professional Summary</h5>
                        <p style="color: rgba(255, 255, 255, 0.9); margin: 0; line-height: 1.6;">
                          A cohesive team player with technical expertise, innovation, analytical & problem-solving attitude, planning, communication, and interpersonal skills. Senior Azure Cloud Developer / Architect (8+ years) with expertise in Azure Functions, App Services, Service Fabric, Key Vault, App Insights, CI/CD, branching strategies, build/release policies, and Cloud App Identity Management.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div><!-- End Card Body -->
          </div><!-- End Card -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
/* Removed conflicting font size rules - now handled globally */
</style>
