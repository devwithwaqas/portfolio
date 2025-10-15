<template>
  <section id="about" class="about section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <!-- About Card -->
      <ReusableCard 
        title="About Me" 
        icon-name="about me"
        body-padding="0"
      >
              <div class="row gy-4 justify-content-center">
                <div class="col-lg-12 content">
                  <div class="about-me-main-card" style="background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); padding: 30px; border-radius: 20px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1); border: 1px solid #e9ecef; position: relative; overflow: hidden;">
                    <!-- Animated Background Pattern -->
                    <div style="position: absolute; top: 0; right: 0; width: 200px; height: 200px; background: linear-gradient(45deg, rgba(5, 99, 187, 0.06) 25%, transparent 25%), linear-gradient(-45deg, rgba(5, 99, 187, 0.06) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(5, 99, 187, 0.06) 75%), linear-gradient(-45deg, transparent 75%, rgba(5, 99, 187, 0.06) 75%); background-size: 30px 30px; background-position: 0 0, 0 15px, 15px -15px, -15px 0px; opacity: 0.3; animation: patternMove 30s linear infinite;"></div>
                    
                    <div style="position: relative; z-index: 2;">
                      <h2 class="txt-h2-3xl" style="color: #0563bb; margin-bottom: 20px; font-weight: 600;">🚀 Senior Software Engineer &amp; Technical Lead</h2>
                      <p class="fst-italic py-3 txt-p-lg" style="color: #45505b; line-height: 1.6;">
                        Proficient in enterprise applications architecture whether hybrid or platform specific either as services for company or products for the organizations. Currently engaged as Senior Software Engineer Full Stack ({{ totalExperience }}+ years) / Technical Lead ({{ techLeadExperience }}+ years overall as Technical Lead) in developing web / cloud based applications.
                      </p>
                      
                      <div class="row">
                        <div class="col-lg-6">
                          <div style="background: rgba(5, 99, 187, 0.05); padding: 20px; border-radius: 15px; border-left: 4px solid #0563bb;">
                            <ul style="list-style: none; padding-left: 0; margin: 0;">
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-calendar-event icon-sm" style="color: #0563bb; margin-right: 10px; margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong class="txt-label-md" style="color: #0563bb;">Birthday:</strong> <span class="txt-span-md" style="color: #45505b; margin-left: 5px;">{{ formattedBirthday }}</span>
                                </div>
                              </li>
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-globe icon-sm" style="color: #0563bb; margin-right: 10px; margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong class="txt-label-md" style="color: #0563bb;">Website:</strong> <a :href="contactLinks.website" target="_blank" class="txt-link-md" style="color: #45505b; margin-left: 5px; word-wrap: break-word; overflow-wrap: break-word; text-decoration: none; transition: all 0.3s ease;" @mouseover="$event.target.style.color='#667eea'; $event.target.style.textShadow='0 0 8px rgba(102, 126, 234, 0.4)'" @mouseout="$event.target.style.color='#45505b'; $event.target.style.textShadow='none'">www.waqasahmad.com</a>
                                </div>
                              </li>
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-telephone icon-sm" style="color: #0563bb; margin-right: 10px; margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong class="txt-label-md" style="color: #0563bb;">Phone:</strong> <a :href="contactLinks.phone" class="txt-link-md" style="color: #45505b; margin-left: 5px; text-decoration: none;">{{ phone }}</a>
                                </div>
                              </li>
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-geo-alt icon-sm" style="color: #0563bb; margin-right: 10px; margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong class="txt-label-md" style="color: #0563bb;">City:</strong> <span class="txt-span-md" style="color: #45505b; margin-left: 5px;">Selangor, Malaysia</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div style="background: rgba(5, 99, 187, 0.05); padding: 20px; border-radius: 15px; border-left: 4px solid #0563bb;">
                            <ul style="list-style: none; padding-left: 0; margin: 0;">
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-person-badge icon-sm" style="color: #0563bb; margin-right: 10px; margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong class="txt-label-md" style="color: #0563bb;">Age:</strong> <span class="txt-span-md" style="color: #45505b; margin-left: 5px;">{{ currentAge }}</span>
                                </div>
                              </li>
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-mortarboard icon-sm" style="color: #0563bb; margin-right: 10px; margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong class="txt-label-md" style="color: #0563bb;">Degree:</strong> <span class="txt-span-md" style="color: #45505b; margin-left: 5px; word-wrap: break-word; overflow-wrap: break-word;">Bachelor's in Computer System Engineering</span>
                                </div>
                              </li>
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-envelope icon-sm" style="color: #0563bb; margin-right: 10px; margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong class="txt-label-md" style="color: #0563bb;">Email:</strong> <a :href="contactLinks.email" class="txt-link-md" style="color: #45505b; margin-left: 5px; word-wrap: break-word; overflow-wrap: break-word; text-decoration: none;">{{ email }}</a>
                                </div>
                              </li>
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-briefcase icon-sm" style="color: #0563bb; margin-right: 10px; margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong class="txt-label-md" style="color: #0563bb;">Freelance:</strong> <span class="txt-span-md" style="color: #28a745; margin-left: 5px; font-weight: 600;">Available</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div style="background: linear-gradient(135deg, rgba(60, 20, 120, 0.8) 0%, rgba(50, 15, 100, 0.85) 50%, rgba(40, 10, 80, 0.9) 100%); color: white; padding: 25px; border-radius: 15px; margin-top: 25px; box-shadow: 0 15px 35px rgba(60, 20, 120, 0.4);">
                        <h5 style="color: white; margin-bottom: 15px; font-weight: 600;">💼 Professional Summary</h5>
                        <p style="color: rgba(255, 255, 255, 0.9); margin: 0; line-height: 1.6;">
                          A cohesive team player with technical expertise, innovation, analytical & problem-solving attitude, planning, communication, and interpersonal skills. Senior Azure Cloud Developer / Architect ({{ totalExperience }}+ years) with expertise in Azure Functions, App Services, Service Fabric, Key Vault, App Insights, CI/CD, branching strategies, build/release policies, and Cloud App Identity Management.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      </ReusableCard>
    </div>
  </section>
</template>

<script>
import { APP_CONFIG } from '../../config/constants.js'
import ReusableCard from '../common/ReusableCard.vue'

export default {
  name: 'About',
  components: {
    ReusableCard
  },
  data() {
    return {
      // VUE PROPER: Import constants instead of deleted personalData.js
      ...APP_CONFIG
    }
  },
  computed: {
    currentAge() {
      const today = new Date()
      const birth = new Date(1987, 8, 21) // September 21, 1987 - Month is 0-indexed
      let age = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
      }
      return age
    }
  }
}
</script>

<style scoped>
/* Removed conflicting font size rules - now handled globally */
</style>
