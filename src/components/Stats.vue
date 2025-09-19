<template>
  <section id="stats" class="stats section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <!-- Stats Card -->
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1); padding: 10px;">
            
            <!-- Card Header -->
            <div class="card-header fancy-3d-header" style="margin: -10px -10px 30px -10px; padding: 25px 40px; border-radius: 20px 20px 0 0; border: none;">
              <h3 style="color: white; margin: 0; font-weight: 700; font-size: 1.5rem; text-align: center;">📊 Professional Statistics</h3>
            </div>

            <!-- Card Body -->
            <div class="card-body" style="padding: 0;">
              <div class="row gy-4">
                <div class="col-lg-3 col-md-6">
                  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 20px; text-align: center; box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3); border: 1px solid rgba(255, 255, 255, 0.2); transition: all 0.3s ease; position: relative; overflow: hidden;" @mouseover="$event.target.style.transform='translateY(-10px)'; $event.target.style.boxShadow='0 25px 50px rgba(102, 126, 234, 0.4)'" @mouseout="$event.target.style.transform='translateY(0)'; $event.target.style.boxShadow='0 15px 35px rgba(102, 126, 234, 0.3)'">
                    <!-- Animated Background Pattern -->
                    <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px; opacity: 0.3; animation: patternMove 20s linear infinite;"></div>
                    
                    <div style="position: relative; z-index: 2;">
                      <i class="bi bi-emoji-smile" style="font-size: 3rem; color: white; margin-bottom: 15px; display: block;"></i>
                      <div class="stats-item">
                        <span data-purecounter-start="0" data-purecounter-end="50" data-purecounter-duration="1" class="purecounter" style="color: white; font-size: 2.5rem; font-weight: bold; display: block; margin-bottom: 5px;"></span>
                        <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-weight: 600;">Happy Clients</p>
                      </div>
                    </div>
                  </div>
                </div><!-- End Stats Item -->

                <div class="col-lg-3 col-md-6">
                  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; border-radius: 20px; text-align: center; box-shadow: 0 15px 35px rgba(240, 147, 251, 0.3); border: 1px solid rgba(255, 255, 255, 0.2); transition: all 0.3s ease; position: relative; overflow: hidden;" @mouseover="$event.target.style.transform='translateY(-10px)'; $event.target.style.boxShadow='0 25px 50px rgba(240, 147, 251, 0.4)'" @mouseout="$event.target.style.transform='translateY(0)'; $event.target.style.boxShadow='0 15px 35px rgba(240, 147, 251, 0.3)'">
                    <!-- Animated Background Pattern -->
                    <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px; opacity: 0.3; animation: patternMove 20s linear infinite;"></div>
                    
                    <div style="position: relative; z-index: 2;">
                      <i class="bi bi-journal-richtext" style="font-size: 3rem; color: white; margin-bottom: 15px; display: block;"></i>
                      <div class="stats-item">
                        <span data-purecounter-start="0" data-purecounter-end="100" data-purecounter-duration="1" class="purecounter" style="color: white; font-size: 2.5rem; font-weight: bold; display: block; margin-bottom: 5px;"></span>
                        <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-weight: 600;">Projects</p>
                      </div>
                    </div>
                  </div>
                </div><!-- End Stats Item -->

                <div class="col-lg-3 col-md-6">
                  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 30px; border-radius: 20px; text-align: center; box-shadow: 0 15px 35px rgba(79, 172, 254, 0.3); border: 1px solid rgba(255, 255, 255, 0.2); transition: all 0.3s ease; position: relative; overflow: hidden;" @mouseover="$event.target.style.transform='translateY(-10px)'; $event.target.style.boxShadow='0 25px 50px rgba(79, 172, 254, 0.4)'" @mouseout="$event.target.style.transform='translateY(0)'; $event.target.style.boxShadow='0 15px 35px rgba(79, 172, 254, 0.3)'">
                    <!-- Animated Background Pattern -->
                    <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px; opacity: 0.3; animation: patternMove 20s linear infinite;"></div>
                    
                    <div style="position: relative; z-index: 2;">
                      <i class="bi bi-headset" style="font-size: 3rem; color: white; margin-bottom: 15px; display: block;"></i>
                      <div class="stats-item">
                        <span data-purecounter-start="0" data-purecounter-end="16" data-purecounter-duration="1" class="purecounter" style="color: white; font-size: 2.5rem; font-weight: bold; display: block; margin-bottom: 5px;"></span>
                        <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-weight: 600;">Years Experience</p>
                      </div>
                    </div>
                  </div>
                </div><!-- End Stats Item -->

                <div class="col-lg-3 col-md-6">
                  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 30px; border-radius: 20px; text-align: center; box-shadow: 0 15px 35px rgba(67, 233, 123, 0.3); border: 1px solid rgba(255, 255, 255, 0.2); transition: all 0.3s ease; position: relative; overflow: hidden;" @mouseover="$event.target.style.transform='translateY(-10px)'; $event.target.style.boxShadow='0 25px 50px rgba(67, 233, 123, 0.4)'" @mouseout="$event.target.style.transform='translateY(0)'; $event.target.style.boxShadow='0 15px 35px rgba(67, 233, 123, 0.3)'">
                    <!-- Animated Background Pattern -->
                    <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px; opacity: 0.3; animation: patternMove 20s linear infinite;"></div>
                    
                    <div style="position: relative; z-index: 2;">
                      <i class="bi bi-people" style="font-size: 3rem; color: white; margin-bottom: 15px; display: block;"></i>
                      <div class="stats-item">
                        <span data-purecounter-start="0" data-purecounter-end="8" data-purecounter-duration="1" class="purecounter" style="color: white; font-size: 2.5rem; font-weight: bold; display: block; margin-bottom: 5px;"></span>
                        <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-weight: 600;">Years as Tech Lead</p>
                      </div>
                    </div>
                  </div>
                </div><!-- End Stats Item -->
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
  name: 'Stats',
  mounted() {
    // Initialize PureCounter if available
    if (typeof PureCounter !== 'undefined') {
      new PureCounter()
    }
  }
}
</script>
