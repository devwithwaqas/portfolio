<template>
  <section id="technology-expertise" class="technology-expertise section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      
      <!-- Technology Expertise Card -->
      <ReusableCard 
        title="Technology Expertise" 
        icon-name="technology"
        body-padding="0"
      >
        
        <div class="technology-sections">
          
          <!-- .NET Expertise Section -->
          <div class="tech-section mb-4">
            <div class="row align-items-center g-4">
              <div class="col-lg-2 col-md-3 col-12 text-center">
                <div class="tech-icon-wrapper">
                  <img :src="assetPath('/assets/img/Icons/NET core.svg')" alt=".NET Core Consultant Expert - 17+ Years Experience - Remote Available USA, Europe, Global" class="tech-icon-large icon-img-5xl" />
                </div>
              </div>
              <div class="col-lg-10 col-md-9 col-12">
                <h3 class="tech-title txt-h3-2xl mb-3">
                  <strong class="txt-label-lg">.NET Consultant & Expert</strong> <span class="txt-span-md">- 17+ Years Experience</span>
                </h3>
                <p class="tech-description txt-p-lg mb-3">
                  <strong class="txt-label-md">Expert-level proficiency</strong> <span class="txt-span-md">in .NET Core, ASP.NET, C#, and the entire .NET ecosystem. Specializing in enterprise .NET development, microservices architecture with .NET Core, and cloud-native .NET applications. Available as a</span> <strong class="txt-label-md">remote .NET consultant</strong> <span class="txt-span-md">for USA, Europe, and global projects.</span>
                </p>
                <div class="tech-highlights mb-4">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">.NET Core & ASP.NET Core</strong> - Enterprise applications</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">C# Expert</strong> - Advanced language features</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Entity Framework Core</strong> - Data access & ORM</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Remote .NET Consultant</strong> - USA, Europe, Global</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tech-cta d-flex flex-wrap gap-3">
                  <router-link to="/services/full-stack-development" class="btn btn-primary txt-btn-md">
                    <i class="bi bi-arrow-right icon-sm me-2"></i>Hire .NET Consultant
                  </router-link>
                  <router-link to="/projects/heat-exchanger" class="btn btn-outline-primary txt-btn-md">
                    <i class="bi bi-code-square icon-sm me-2"></i>View .NET Projects
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          
          <hr class="tech-divider" />
          
          <!-- Microservices Expertise Section -->
          <div class="tech-section mb-4">
            <div class="row align-items-center g-4">
              <div class="col-lg-2 col-md-3 col-12 text-center">
                <div class="tech-icon-wrapper">
                  <img :src="assetPath('/assets/img/Icons/Docker.svg')" alt="Microservices Architect Consultant - Enterprise Solutions - Remote Available USA, Europe, Global" class="tech-icon-large icon-img-5xl" />
                </div>
              </div>
              <div class="col-lg-10 col-md-9 col-12">
                <h3 class="tech-title txt-h3-2xl mb-3">
                  <strong class="txt-label-lg">Microservices Architect & Consultant</strong>
                </h3>
                <p class="tech-description txt-p-lg mb-3">
                  <strong class="txt-label-md">Microservices architecture expert</strong> <span class="txt-span-md">with extensive experience designing and implementing scalable microservices solutions. Specializing in .NET Core microservices, distributed systems, API Gateway patterns, and service mesh architectures. Available as a</span> <strong class="txt-label-md">remote microservices consultant</strong> <span class="txt-span-md">for enterprise projects worldwide.</span>
                </p>
                <div class="tech-highlights mb-4">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Microservices Architecture</strong> - Design & implementation</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">.NET Core Microservices</strong> - Enterprise-grade solutions</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Distributed Systems</strong> - Scalable architectures</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Remote Microservices Consultant</strong> - Global availability</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tech-cta d-flex flex-wrap gap-3">
                  <router-link to="/services/microservices-architecture" class="btn btn-primary txt-btn-md">
                    <i class="bi bi-arrow-right icon-sm me-2"></i>Hire Microservices Architect
                  </router-link>
                  <router-link to="/projects/heat-exchanger" class="btn btn-outline-primary txt-btn-md">
                    <i class="bi bi-code-square icon-sm me-2"></i>View Microservices Projects
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          
          <hr class="tech-divider" />
          
          <!-- API Development Expertise Section -->
          <div class="tech-section mb-4">
            <div class="row align-items-center g-4">
              <div class="col-lg-2 col-md-3 col-12 text-center">
                <div class="tech-icon-wrapper">
                  <img :src="assetPath('/assets/img/Icons/api.svg')" alt="API Development Expert Consultant - RESTful APIs - Remote Available USA, Europe, Global" class="tech-icon-large icon-img-5xl" />
                </div>
              </div>
              <div class="col-lg-10 col-md-9 col-12">
                <h3 class="tech-title txt-h3-2xl mb-3">
                  <strong class="txt-label-lg">API Development Expert & Consultant</strong>
                </h3>
                <p class="tech-description txt-p-lg mb-3">
                  <strong class="txt-label-md">RESTful API development expert</strong> <span class="txt-span-md">specializing in designing, developing, and optimizing enterprise APIs. Expertise in ASP.NET Core Web APIs, API Gateway patterns, API documentation (Swagger), and API security. Available as a</span> <strong class="txt-label-md">remote API developer consultant</strong> <span class="txt-span-md">for USA, Europe, and global clients.</span>
                </p>
                <div class="tech-highlights mb-4">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">RESTful API Development</strong> - Design & implementation</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">ASP.NET Core Web APIs</strong> - Enterprise-grade APIs</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">API Gateway & Architecture</strong> - Scalable API design</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Remote API Developer Consultant</strong> - Global projects</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tech-cta d-flex flex-wrap gap-3">
                  <router-link to="/services/full-stack-development" class="btn btn-primary txt-btn-md">
                    <i class="bi bi-arrow-right icon-sm me-2"></i>Hire API Development Expert
                  </router-link>
                  <router-link to="/projects/heat-exchanger" class="btn btn-outline-primary txt-btn-md">
                    <i class="bi bi-code-square icon-sm me-2"></i>View API Projects
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          
          <hr class="tech-divider" />
          
          <!-- Database Expertise Section -->
          <div class="tech-section mb-4">
            <div class="row align-items-center g-4">
              <div class="col-lg-2 col-md-3 col-12 text-center">
                <div class="tech-icon-wrapper">
                  <img :src="assetPath('/assets/img/Icons/sql server.svg')" alt="Database Design Optimization Expert - SQL Server Cosmos DB - Remote Available USA, Europe, Global" class="tech-icon-large icon-img-5xl" />
                </div>
              </div>
              <div class="col-lg-10 col-md-9 col-12">
                <h3 class="tech-title txt-h3-2xl mb-3">
                  <strong class="txt-label-lg">Database Design & Optimization Expert</strong>
                </h3>
                <p class="tech-description txt-p-lg mb-3">
                  <strong class="txt-label-md">Database architecture expert</strong> <span class="txt-span-md">specializing in SQL Server, Cosmos DB, database design, optimization, and performance tuning. Expertise in Entity Framework Core, LINQ query optimization, database indexing, and data analytics. Available as a</span> <strong class="txt-label-md">remote database consultant</strong> <span class="txt-span-md">for enterprise database projects worldwide.</span>
                </p>
                <div class="tech-highlights mb-4">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">SQL Server & Cosmos DB</strong> - Enterprise databases</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Database Optimization</strong> - Performance tuning</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Entity Framework Core</strong> - ORM & data access</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Remote Database Consultant</strong> - USA, Europe, Global</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tech-cta d-flex flex-wrap gap-3">
                  <router-link to="/services/database-design-optimization" class="btn btn-primary txt-btn-md">
                    <i class="bi bi-arrow-right icon-sm me-2"></i>Hire Database Expert
                  </router-link>
                  <router-link to="/projects/heat-exchanger" class="btn btn-outline-primary txt-btn-md">
                    <i class="bi bi-code-square icon-sm me-2"></i>View Database Projects
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          
          <hr class="tech-divider" />
          
          <!-- Mobile Development Expertise Section -->
          <div class="tech-section mb-4">
            <div class="row align-items-center g-4">
              <div class="col-lg-2 col-md-3 col-12 text-center">
                <div class="tech-icon-wrapper">
                  <img :src="assetPath('/assets/img/Icons/mobile.png')" alt="Mobile Development Expert Consultant - Cross-Platform iOS Android - Remote Available USA, Europe, Global" class="tech-icon-large icon-img-5xl" />
                </div>
              </div>
              <div class="col-lg-10 col-md-9 col-12">
                <h3 class="tech-title txt-h3-2xl mb-3">
                  <strong class="txt-label-lg">Mobile Development Expert & Consultant</strong>
                </h3>
                <p class="tech-description txt-p-lg mb-3">
                  <strong class="txt-label-md">Mobile application development expert</strong> <span class="txt-span-md">specializing in cross-platform mobile development, mobile architecture, and mobile API integration. Expertise in mobile app design, performance optimization, and mobile backend services. Available as a</span> <strong class="txt-label-md">remote mobile developer consultant</strong> <span class="txt-span-md">for mobile app projects worldwide.</span>
                </p>
                <div class="tech-highlights mb-4">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Cross-Platform Mobile</strong> - iOS & Android</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Mobile API Integration</strong> - Backend services</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Mobile Architecture</strong> - Scalable mobile apps</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Remote Mobile Developer</strong> - Global availability</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tech-cta d-flex flex-wrap gap-3">
                  <router-link to="/services/mobile-development" class="btn btn-primary txt-btn-md">
                    <i class="bi bi-arrow-right icon-sm me-2"></i>Hire Mobile Developer
                  </router-link>
                  <router-link to="/projects/mobile-games" class="btn btn-outline-primary txt-btn-md">
                    <i class="bi bi-code-square icon-sm me-2"></i>View Mobile Projects
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          
          <hr class="tech-divider" />
          
          <!-- Azure Cloud Expertise Section -->
          <div class="tech-section mb-4">
            <div class="row align-items-center g-4">
              <div class="col-lg-2 col-md-3 col-12 text-center">
                <div class="tech-icon-wrapper">
                  <img :src="assetPath('/assets/img/Icons/Azure.svg')" alt="Azure Cloud Architect Consultant - Enterprise Cloud Solutions - Remote Available USA, Europe, Global" class="tech-icon-large icon-img-5xl" />
                </div>
              </div>
              <div class="col-lg-10 col-md-9 col-12">
                <h3 class="tech-title txt-h3-2xl mb-3">
                  <strong class="txt-label-lg">Azure Cloud Architect & Consultant</strong>
                </h3>
                <p class="tech-description txt-p-lg mb-3">
                  <strong class="txt-label-md">Azure Cloud expert</strong> <span class="txt-span-md">with extensive experience in Azure architecture, cloud migration, and Azure DevOps. Specializing in Azure App Services, Azure Functions, Azure Service Fabric, Azure API Management, and cloud-native solutions. Available as a</span> <strong class="txt-label-md">remote Azure consultant</strong> <span class="txt-span-md">for enterprise cloud projects worldwide.</span>
                </p>
                <div class="tech-highlights mb-4">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Azure Cloud Architecture</strong> - Enterprise solutions</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Azure DevOps & CI/CD</strong> - Automation & pipelines</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Cloud Migration</strong> - On-premise to Azure</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success icon-sm me-2"></i>
                        <span class="txt-p-md"><strong class="txt-label-md">Remote Azure Consultant</strong> - USA, Europe, Global</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tech-cta d-flex flex-wrap gap-3">
                  <router-link to="/services/azure-cloud-architecture" class="btn btn-primary txt-btn-md">
                    <i class="bi bi-arrow-right icon-sm me-2"></i>Hire Azure Cloud Consultant
                  </router-link>
                  <router-link to="/projects/heat-exchanger" class="btn btn-outline-primary txt-btn-md">
                    <i class="bi bi-code-square icon-sm me-2"></i>View Azure Projects
                  </router-link>
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
import ReusableCard from '../common/ReusableCard.vue'
import { assetPath } from '../../utils/assetPath.js'

export default {
  name: 'TechnologyExpertise',
  components: {
    ReusableCard
  },
  methods: {
    assetPath
  }
}
</script>

<style scoped>
.technology-expertise {
  padding: 60px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.technology-sections {
  padding: 30px;
}

.tech-section {
  padding: 30px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  transition: all 0.3s ease;
  border: 1px solid rgba(5, 99, 187, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.tech-section:hover {
  box-shadow: 0 10px 30px rgba(5, 99, 187, 0.15);
  transform: translateY(-3px);
  border-color: rgba(5, 99, 187, 0.2);
}

.tech-icon-wrapper {
  background: linear-gradient(135deg, rgba(5, 99, 187, 0.08) 0%, rgba(102, 126, 234, 0.08) 100%);
  padding: 25px;
  border-radius: 15px;
  display: inline-block;
  transition: all 0.3s ease;
  border: 1px solid rgba(5, 99, 187, 0.1);
}

.tech-section:hover .tech-icon-wrapper {
  background: linear-gradient(135deg, rgba(5, 99, 187, 0.15) 0%, rgba(102, 126, 234, 0.15) 100%);
  transform: scale(1.05);
  border-color: rgba(5, 99, 187, 0.3);
}

.tech-icon-large {
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}

.tech-title {
  color: #0563bb;
  line-height: 1.4;
}

.tech-description {
  color: #45505b;
  line-height: 1.8;
}

.tech-highlights {
  margin-top: 20px;
}

.tech-highlight-item {
  padding: 15px 18px;
  background: rgba(5, 99, 187, 0.05);
  border-radius: 10px;
  border-left: 4px solid #28a745;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
}

.tech-highlight-item:hover {
  background: rgba(5, 99, 187, 0.1);
  transform: translateX(5px);
  border-left-color: #20c997;
}

.tech-highlight-item strong {
  color: #0563bb;
  display: inline-block;
}

.tech-cta {
  margin-top: 25px;
}

.tech-cta .btn {
  padding: 12px 28px;
  border-radius: 25px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  text-decoration: none;
  font-weight: 600;
}

.tech-cta .btn-primary {
  background: linear-gradient(135deg, #0563bb 0%, #667eea 100%);
  color: white;
  border: none;
  box-shadow: 0 4px 15px rgba(5, 99, 187, 0.3);
}

.tech-cta .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(5, 99, 187, 0.4);
  background: linear-gradient(135deg, #0453a3 0%, #5568d9 100%);
}

.tech-cta .btn-outline-primary {
  background: transparent;
  color: #0563bb;
  border: 2px solid #0563bb;
}

.tech-cta .btn-outline-primary:hover {
  background: #0563bb;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(5, 99, 187, 0.3);
}

.tech-divider {
  border: none;
  border-top: 2px solid rgba(5, 99, 187, 0.1);
  margin: 40px 0;
}

@media (max-width: 768px) {
  .tech-section {
    padding: 20px;
  }
  
  .tech-icon-large {
    max-width: 60px;
    max-height: 60px;
  }
  
  .technology-sections {
    padding: 15px;
  }
  
  .tech-cta {
    flex-direction: column;
  }
  
  .tech-cta .btn {
    width: 100%;
    margin-bottom: 10px;
  }
  
  .tech-highlight-item {
    padding: 12px 15px;
  }
}

@media (max-width: 480px) {
  .tech-section {
    padding: 15px;
  }
  
  .technology-sections {
    padding: 10px;
  }
  
  .tech-icon-wrapper {
    padding: 15px;
  }
}
</style>
