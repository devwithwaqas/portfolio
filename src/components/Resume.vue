<template>
  <section id="resume" class="resume section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      
      <!-- Resume Card -->
      <ReusableCard 
        title="Professional Resume" 
        icon="📋"
        body-padding="0"
      >
              <div class="row">

                <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                  <h3 class="resume-title">Summary</h3>

                  <div class="resume-item pb-0">
                    <h4>🚀 {{ fullName }}</h4>
                    <p><em><strong>Visionary Senior Software Engineer & Technical Lead</strong> with {{ totalExperience }}+ years of transformative experience in architecting enterprise-scale solutions. <strong>Cloud-native expert</strong> specializing in .NET Core, Azure Cloud, and microservices architecture. <strong>Proven leader</strong> who has delivered 100+ successful projects, mentored 50+ developers, and driven digital transformation across multiple industries.</em></p>
                    <ul>
                      <li>
                        <strong>📍 Location:</strong>
                        <div>Selangor, Malaysia (🌐 Global remote capabilities)</div>
                      </li>
                      <li>
                        <strong>📞 Contact:</strong>
                        <div><a :href="`tel:${phone}`" style="color: #0563bb; text-decoration: none; transition: all 0.3s ease;" @mouseover="$event.target.style.color='#667eea'; $event.target.style.textShadow='0 0 8px rgba(102, 126, 234, 0.4)'" @mouseout="$event.target.style.color='#0563bb'; $event.target.style.textShadow='none'">{{ phone }}</a></div>
                      </li>
                      <li>
                        <strong>✉️ Email:</strong>
                        <div><a :href="`mailto:${email}`" style="color: #0563bb; text-decoration: none; transition: all 0.3s ease;" @mouseover="$event.target.style.color='#667eea'; $event.target.style.textShadow='0 0 8px rgba(102, 126, 234, 0.4)'" @mouseout="$event.target.style.color='#0563bb'; $event.target.style.textShadow='none'">{{ email }}</a></div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <h3 class="resume-title">🎓 Education</h3>
                  <div class="resume-item">
                    <h4>🏛️ Bachelor of Computer System Engineering (Honors)</h4>
                    <h5>2006 - 2013</h5>
                    <p><em>University of Engineering and Technology, Lahore, Pakistan</em></p>
                    <p><strong>🎯 Academic Excellence:</strong> Completed a comprehensive 4-year honors program in Computer System Engineering, specializing in software development and system architecture. <strong>Laid the foundation</strong> for expertise in enterprise-level applications, database design, and scalable system solutions that would define a distinguished career in software engineering.</p>
                  </div><!-- End Resume Item -->

                  <h3 class="resume-title">🏆 Awards & Achievements</h3>
                  <div class="resume-item">
                    <h4>🥇 National Speed Programming Champion</h4>
                    <h5>2010</h5>
                    <p><em>ACM All Pakistan Speed Programming Competition</em></p>
                    <p><strong>🏅 Elite Achievement:</strong> Secured first position in the most prestigious programming competition in Pakistan, competing against 500+ top-tier developers from leading universities nationwide. <strong>Demonstrated exceptional problem-solving skills</strong> and algorithmic thinking that set the foundation for a distinguished career in software engineering.</p>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4>🌟 HR IT Expert Award</h4>
                    <h5>2013</h5>
                    <p><em>Guinness World Records Pakistan - Punjab Youth Festival</em></p>
                    <p><strong>🎯 Technical Excellence:</strong> Recognized as the premier IT expert for orchestrating the technical infrastructure of Pakistan's largest youth festival, managing 10,000+ participants. <strong>Pioneered innovative solutions</strong> that enabled seamless event coordination and earned recognition in Guinness World Records for the largest gathering of its kind.</p>
                  </div><!-- End Resume Item -->

                </div>

                <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                  <h3 class="resume-title">Professional Experience</h3>
                  <div class="resume-item">
                    <h4>🚀 Senior Software Engineer & Technical Consultant (Freelance)</h4>
                    <h5>2022 - Present</h5>
                    <p><em>Independent Consultant, Remote/Global</em></p>
                    <ul>
                      <li>
                        <strong>💼 Global Impact:</strong>
                        <div>Delivering cutting-edge software solutions to clients across 5+ countries, specializing in enterprise-scale applications</div>
                      </li>
                      <li>
                        <strong>☁️ Cloud Excellence:</strong>
                        <div>Architecting and implementing Azure-based solutions that reduce infrastructure costs by 40% while improving performance</div>
                      </li>
                      <li>
                        <strong>🔄 Full-Stack Mastery:</strong>
                        <div>Building complete applications from database design to user interface, ensuring seamless integration and optimal user experience</div>
                      </li>
                      <li>
                        <strong>⚡ Rapid Delivery:</strong>
                        <div>Consistently delivering projects 25% faster than industry standards while maintaining 99.9% client satisfaction rate</div>
                      </li>
                      <li>
                        <strong>🌐 Remote Innovation:</strong>
                        <div>Pioneering remote-first development practices, enabling seamless collaboration across time zones and cultures</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4>✈️ Senior Software Engineer Technical Lead</h4>
                    <h5>Jun 2021 – Aug 2022 (1 yr 3 mos)</h5>
                    <p><em>AirAsia Tech, Kuala Lumpur, Malaysia</em></p>
                    <ul>
                      <li>
                        <strong>🎯 Aviation Domain Revamp:</strong>
                        <div>Led comprehensive revamp of airline domain applications with cutting-edge .NET Core + Angular technology stack</div>
                      </li>
                      <li>
                        <strong>⚙️ DevOps Excellence:</strong>
                        <div>Built and standardized CI/CD pipelines and branching strategies, improving delivery timelines by 40-50%</div>
                      </li>
                      <li>
                        <strong>📈 Performance Optimization:</strong>
                        <div>Optimized Entity Framework + LINQ queries for enhanced application performance and database efficiency</div>
                      </li>
                      <li>
                        <strong>👥 Technical Leadership:</strong>
                        <div>Served as Tech Lead, guiding team on multi-tier .NET Core + Angular applications</div>
                      </li>
                      <li>
                        <strong>☁️ Cloud Architecture:</strong>
                        <div>Designed scalable Azure Cloud Services architecture supporting real-time flight operations</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4>🏢 Senior Software Engineer</h4>
                    <h5>Feb 2020 – Jan 2021 (1 yr)</h5>
                    <p><em>Datacom, Kuala Lumpur, Malaysia</em></p>
                    <ul>
                      <li>
                        <strong>🏗️ Microservices Architecture:</strong>
                        <div>Developed full-stack .NET & Power Apps with Azure Service Fabric microservices</div>
                      </li>
                      <li>
                        <strong>☁️ Cloud Infrastructure:</strong>
                        <div>Designed SQL Server + Azure Cloud architecture and CI/CD pipelines</div>
                      </li>
                      <li>
                        <strong>⚡ Performance Optimization:</strong>
                        <div>Optimized n-tier applications, LINQ queries, and performance algorithms</div>
                      </li>
                      <li>
                        <strong>🔗 System Integration:</strong>
                        <div>Maintained BAT mobile app with SAP & Cherwell integrations</div>
                      </li>
                      <li>
                        <strong>🔄 Agile Development:</strong>
                        <div>Implemented REST APIs and Agile methodologies for efficient project delivery</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4>⚡ Senior Software Engineer</h4>
                    <h5>Jul 2019 – Jan 2020 (7 mos)</h5>
                    <p><em>Syntronic – A Global Design House, Malaysia</em></p>
                    <ul>
                      <li>
                        <strong>🔌 API Development:</strong>
                        <div>Developed ASP.NET Core REST APIs and SignalR for real-time communication</div>
                      </li>
                      <li>
                        <strong>🚀 Modern Web Applications:</strong>
                        <div>Built Angular SPA with responsive design and optimal user experience</div>
                      </li>
                      <li>
                        <strong>🐳 DevOps Automation:</strong>
                        <div>Implemented CI/CD automation with Azure DevOps + Docker containerization</div>
                      </li>
                      <li>
                        <strong>☁️ Azure Services:</strong>
                        <div>Utilized Cosmos DB, Azure Functions, and Azure Storage for scalable solutions</div>
                      </li>
                      <li>
                        <strong>🔄 Agile Practices:</strong>
                        <div>Active participation in Agile ceremonies and comprehensive code reviews</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4>🏙️ Senior Software Engineer</h4>
                    <h5>May 2018 – Jul 2019 (1 yr 3 mos)</h5>
                    <p><em>Iconic Control Sdn Bhd, Malaysia</em></p>
                    <ul>
                      <li>
                        <strong>🏗️ Smart City Solutions:</strong>
                        <div>Designed and coded large-scale city-wide smart portal apps (transport, taxation, crime reporting)</div>
                      </li>
                      <li>
                        <strong>🤖 AI & OCR Integration:</strong>
                        <div>Implemented AI OCR enforcement systems and GIS mapping solutions</div>
                      </li>
                      <li>
                        <strong>🏛️ Architecture Excellence:</strong>
                        <div>Architected n-tier, SOLID, MVVM applications with best practices</div>
                      </li>
                      <li>
                        <strong>🛠️ Modern Tech Stack:</strong>
                        <div>Utilized ASP.NET Core, Vue.js, GIS, and Entity Framework</div>
                      </li>
                      <li>
                        <strong>👥 Team Leadership:</strong>
                        <div>Involved in team management & architecture design decisions</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4>🛒 Senior Software Engineer</h4>
                    <h5>Nov 2012 – Mar 2018 (5 yrs 5 mos)</h5>
                    <p><em>Squad Cell, Malaysia</em></p>
                    <ul>
                      <li>
                        <strong>🛒 E-commerce Excellence:</strong>
                        <div>Built comprehensive E-commerce, retail, inventory & business systems with .NET & Angular</div>
                      </li>
                      <li>
                        <strong>📊 Data Analytics:</strong>
                        <div>Introduced Data-Analytics frameworks for product recommendations and business insights</div>
                      </li>
                      <li>
                        <strong>🔔 Notification Services:</strong>
                        <div>Designed notification microservices (push, in-app, email) for enhanced user engagement</div>
                      </li>
                      <li>
                        <strong>⚙️ DevOps Automation:</strong>
                        <div>Automated DevOps branching/build processes for efficient development workflows</div>
                      </li>
                      <li>
                        <strong>👥 Technical Leadership:</strong>
                        <div>Led technical design & team mentoring for successful project delivery</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4>🎮 Game Developer</h4>
                    <h5>Jun 2011 – Oct 2012 (1 yr 5 mos)</h5>
                    <p><em>GenITeam Solutions, Malaysia</em></p>
                    <ul>
                      <li>
                        <strong>🎯 Physics Engine Innovation:</strong>
                        <div>Created first in-house physics engine for 2D games using advanced algorithms</div>
                      </li>
                      <li>
                        <strong>🏆 Game Development Success:</strong>
                        <div>Developed Marine Defender game ranked #21 arcade worldwide</div>
                      </li>
                      <li>
                        <strong>🗄️ Database Integration:</strong>
                        <div>Integrated SQL Server + XML with RPG games for data persistence</div>
                      </li>
                      <li>
                        <strong>💰 Revenue Growth:</strong>
                        <div>Significantly increased company's game revenue through successful releases</div>
                      </li>
                      <li>
                        <strong>🛠️ Technical Stack:</strong>
                        <div>Mastered .NET, Java, Box2D, SQL Server, XML for game development</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4>💼 Software Engineer</h4>
                    <h5>Jan 2008 – Jun 2011 (3 yrs 6 mos)</h5>
                    <p><em>DSOL (Kiics), Malaysia</em></p>
                    <ul>
                      <li>
                        <strong>🌐 Web Solutions:</strong>
                        <div>Built comprehensive .NET web solutions and parental control software</div>
                      </li>
                      <li>
                        <strong>⚡ Multi-threaded Applications:</strong>
                        <div>Developed high-performance multi-threaded applications for optimal user experience</div>
                      </li>
                      <li>
                        <strong>📧 Communication Systems:</strong>
                        <div>Created mass email client & ad-SMS system for business communication</div>
                      </li>
                      <li>
                        <strong>🚀 Startup Growth:</strong>
                        <div>Contributed significantly to startup growth, reduced manual work with automation</div>
                      </li>
                      <li>
                        <strong>🏆 Recognition:</strong>
                        <div>Awarded Best Programmer – KICS Annual Ceremony for outstanding contributions</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                </div>

              </div>
      </ReusableCard>

    </div>
  </section><!-- /Resume Section -->
</template>

<script>
import { APP_CONFIG } from '../config/constants.js'
import ReusableCard from './ReusableCard.vue'

export default {
  name: 'Resume',
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
      const birth = new Date(1986, 8, 5) // Month is 0-indexed
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