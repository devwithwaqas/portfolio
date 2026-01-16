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
                      <h2 class="txt-h2-3xl about-main-title">Senior Software Engineer &amp; Technical Lead</h2>
                      <p class="fst-italic py-3 txt-p-lg" style="color: #45505b; line-height: 1.6;">
                        Software engineering consultant and technical specialist with {{ totalExperience }}+ years of experience in enterprise applications architecture. Currently engaged as Senior Software Engineer Full Stack ({{ totalExperience }}+ years) / Technical Lead ({{ techLeadExperience }}+ years overall as Technical Lead) in developing web / cloud based applications. Worked with Fortune 500 companies worldwide.
                      </p>
                      
                      <!-- Expert-Focused Subheadings -->
                      <div style="margin-top: 25px; margin-bottom: 25px;">
                        <h3 style="color: #0563bb; font-size: 1.3rem; font-weight: 600; margin-bottom: 15px;">Software Engineering Consultant & Specialist</h3>
                        <p style="color: #45505b; line-height: 1.8; margin-bottom: 20px;">
                          As a software engineering consultant, {{ fullName }} provides technical expertise and architectural guidance to organizations building enterprise-scale applications. Specializes in .NET development, Azure Cloud architecture, and microservices design. Available for consulting engagements, technical leadership roles, and project-based work.
                        </p>
                        
                        <h3 style="color: #0563bb; font-size: 1.3rem; font-weight: 600; margin-bottom: 15px; margin-top: 25px;">Enterprise Architecture & Technical Leadership</h3>
                        <p style="color: #45505b; line-height: 1.8;">
                          Technical lead with {{ techLeadExperience }}+ years of experience guiding development teams, establishing best practices, and delivering mission-critical systems. Expertise includes microservices architecture, API design, cloud migration, and DevOps automation. Has led teams managing systems processing millions of data points daily.
                        </p>
                      </div>
                      
                      <div class="row">
                        <div class="col-lg-6">
                          <div style="background: rgba(5, 99, 187, 0.05); padding: 20px; border-radius: 15px; border-left: 4px solid #0563bb;">
                            <ul style="list-style: none; padding-left: 0; margin: 0;">
                              <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                                <i class="bi bi-globe icon-sm" style="color: #0563bb; margin-right: 10px; margin-top: 2px; flex-shrink: 0;"></i>
                                <div style="flex: 1; min-width: 0;">
                                  <strong class="txt-label-md" style="color: #0563bb;">Website:</strong> <a href="https://devwithwaqas.github.io/portfolio/" target="_blank" class="txt-link-md" style="color: #45505b; margin-left: 5px; word-wrap: break-word; overflow-wrap: break-word; text-decoration: none; transition: all 0.3s ease;" @mouseover="$event.target.style.color='#667eea'; $event.target.style.textShadow='0 0 8px rgba(102, 126, 234, 0.4)'" @mouseout="$event.target.style.color='#45505b'; $event.target.style.textShadow='none'">devwithwaqas.github.io/portfolio</a>
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
                                  <strong class="txt-label-md" style="color: #0563bb;">Location:</strong> <address class="txt-span-md" style="color: #45505b; margin-left: 5px; font-style: normal; display: inline;">Selangor, Malaysia</address>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div style="background: rgba(5, 99, 187, 0.05); padding: 20px; border-radius: 15px; border-left: 4px solid #0563bb;">
                            <ul style="list-style: none; padding-left: 0; margin: 0;">
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
                      
                      <article style="background: linear-gradient(135deg, rgba(60, 20, 120, 0.8) 0%, rgba(50, 15, 100, 0.85) 50%, rgba(40, 10, 80, 0.9) 100%); color: white; padding: 25px; border-radius: 15px; margin-top: 25px; box-shadow: 0 15px 35px rgba(60, 20, 120, 0.4);">
                        <h5 style="color: white; margin-bottom: 15px; font-weight: 600;">Professional Summary</h5>
                        <p style="color: rgba(255, 255, 255, 0.9); margin: 0; line-height: 1.6;">
                          {{ fullName }} is a Senior Software Engineer and Technical Lead with {{ totalExperience }}+ years of experience in enterprise software development. As a software engineering consultant and specialist, {{ fullName }} provides technical expertise in <strong>.NET Core, ASP.NET, C#</strong>, <strong>Microservices Architecture</strong>, <strong>RESTful API Development</strong>, and <strong>Azure Cloud</strong> platforms. Expertise includes Azure Functions, App Services, Service Fabric, Key Vault, App Insights, CI/CD pipelines, branching strategies, build/release policies, and Cloud App Identity Management. Experience includes working with Fortune 500 companies across USA, Europe, and globally, delivering enterprise solutions that process 2.5M+ data points daily and managing systems with billions in operational costs.
                        </p>
                      </article>
                      
                      <!-- E-E-A-T Evidence Section -->
                      <div style="background: rgba(5, 99, 187, 0.05); padding: 25px; border-radius: 15px; margin-top: 25px; border-left: 4px solid #0563bb;">
                        <h5 style="color: #0563bb; margin-bottom: 20px; font-weight: 600; font-size: 1.2rem;">Experience & Credentials</h5>
                        <div style="color: #45505b; line-height: 1.8;">
                          <p style="margin-bottom: 12px;"><strong>Education:</strong> Bachelor's degree in Computer System Engineering from University of Engineering and Technology, Lahore.</p>
                          <p style="margin-bottom: 12px;"><strong>Professional Experience:</strong> {{ totalExperience }}+ years in enterprise software development, {{ techLeadExperience }}+ years in technical leadership roles.</p>
                          <p style="margin-bottom: 12px;"><strong>Client Base:</strong> Worked with 20+ Fortune 500 companies across multiple industries, including financial services, manufacturing, telecommunications, and technology sectors.</p>
                          <p style="margin-bottom: 12px;"><strong>Technical Achievements:</strong> Delivered 32+ enterprise solutions, including microservices platforms processing 2.5M+ data points daily, systems managing billions in operational costs, and applications serving 20,000+ concurrent users.</p>
                          <p style="margin-bottom: 0;"><strong>Mentorship:</strong> Mentored 50+ developers across global teams, conducting code reviews, establishing best practices, and providing technical guidance.</p>
                        </div>
                      </div>
                      
                      <!-- Remote Work Availability Section -->
                      <div class="remote-work-section" style="background: linear-gradient(135deg, rgba(40, 167, 69, 0.1) 0%, rgba(32, 201, 151, 0.1) 100%); border: 2px solid rgba(40, 167, 69, 0.3); padding: 25px; border-radius: 15px; margin-top: 25px;">
                        <h5 style="color: #28a745; margin-bottom: 15px; font-weight: 600; font-size: 1.2rem;">
                          <i class="fas fa-globe" style="margin-right: 8px;"></i>Remote Work Availability
                        </h5>
                        <div class="remote-work-content" style="color: #45505b; line-height: 1.8;">
                          <p style="margin-bottom: 12px;"><strong>Global Availability:</strong> Working with clients in USA, Europe (UK, Germany, Netherlands, Switzerland), and worldwide. No location restrictions.</p>
                          <p style="margin-bottom: 12px;"><strong>Timezone Flexibility:</strong> Experienced in distributed team collaboration across EST, PST, GMT, and CET timezones.</p>
                          <p style="margin-bottom: 0;"><strong>Engagement Models:</strong> Available for consulting, freelance, and contract projects with flexible engagement terms.</p>
                        </div>
                        
                        <!-- SEO Keywords - Visually Hidden -->
                        <div class="visually-hidden" aria-hidden="true">
                          Top Software Engineering Consultant, Software Engineering Specialist, Best Software Engineering Expert, IT Engineering Consultant, Professional Software Engineering Services, Top Software Engineering Specialist Profile, Remote Senior Software Engineer, Remote Technical Lead, Remote Azure Cloud Architect, Remote .NET Developer, Remote Full Stack Developer, Remote DevOps Engineer, Remote Software Architect, Remote Technical Consultant, Remote Developer Available, Hire Remote Senior Software Engineer, Remote Consultant Available, Freelance Remote Developer, Contract Remote Software Engineer, Remote Software Engineer USA, Remote Developer UK, Remote Developer Europe, Remote Developer Germany, Remote Developer Netherlands, Remote Consultant USA, Remote Consultant Europe, Global Remote Software Engineer, International Remote Developer, Remote Developer Flexible Timezone, Remote Developer EST PST GMT CET.
                        </div>
                      </div>
                      
                      <!-- Answer-Style Content Blocks for AI Search - What I Do -->
                      <div class="about-expertise-info" style="margin-top: 30px; padding: 25px; background: rgba(5, 99, 187, 0.05); border-radius: 12px; border-left: 4px solid #0563bb;">
                        <h3 style="font-size: 1.3rem; font-weight: 600; color: #0563bb; margin-bottom: 20px;">What Services Does {{ fullName }} Provide?</h3>
                        <p style="color: #45505b; line-height: 1.8; margin-bottom: 15px;">
                          <strong>Answer:</strong> {{ fullName }} provides software engineering consulting services including full stack development (.NET Core, Vue.js, Angular), Azure Cloud architecture design and implementation, microservices architecture consulting, RESTful API development, technical leadership, and DevOps automation. Services are delivered remotely for clients in USA, Europe, and globally with flexible timezone support.
                        </p>
                        <h3 style="font-size: 1.3rem; font-weight: 600; color: #0563bb; margin-top: 25px; margin-bottom: 15px;">What Technologies Does {{ fullName }} Work With?</h3>
                        <p style="color: #45505b; line-height: 1.8; margin-bottom: 15px;">
                          <strong>Answer:</strong> {{ fullName }} specializes in .NET development (.NET Core, ASP.NET, C#), Azure Cloud services (App Services, Service Fabric, Functions, Key Vault, App Insights), microservices architecture patterns, RESTful API design, Vue.js and Angular frontend development, SQL Server database design, and CI/CD pipeline automation. Has delivered enterprise solutions processing 2.5M+ data points daily.
                        </p>
                        <h3 style="font-size: 1.3rem; font-weight: 600; color: #0563bb; margin-top: 25px; margin-bottom: 15px;">What Type of Projects Does {{ fullName }} Handle?</h3>
                        <p style="color: #45505b; line-height: 1.8;">
                          <strong>Answer:</strong> {{ fullName }} handles enterprise-scale software projects including microservices platforms, cloud-native applications, API development, system architecture design, technical team leadership, and legacy system modernization. Experience includes working with Fortune 500 companies across financial services, manufacturing, telecommunications, and technology sectors. Projects range from consulting engagements to full development and technical leadership roles.
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
}
</script>

<style scoped>
/* Removed conflicting font size rules - now handled globally */

.about-main-title {
  color: #0563bb;
  margin-bottom: 20px;
  font-weight: 600;
}
</style>
