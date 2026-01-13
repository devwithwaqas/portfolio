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
          <div class="tech-section mb-5">
            <div class="row align-items-center">
              <div class="col-lg-2 col-md-3 col-12 text-center mb-3 mb-lg-0">
                <div class="tech-icon-wrapper">
                  <img :src="assetPath('/assets/img/Icons/NET core.svg')" alt=".NET Core" class="tech-icon-large" />
                </div>
              </div>
              <div class="col-lg-10 col-md-9 col-12">
                <h3 class="tech-title txt-h3-xl mb-3">
                  <strong>.NET Consultant & Expert</strong> - 17+ Years Experience
                </h3>
                <p class="tech-description txt-p-lg mb-3">
                  <strong>Expert-level proficiency</strong> in .NET Core, ASP.NET, C#, and the entire .NET ecosystem. 
                  Specializing in enterprise .NET development, microservices architecture with .NET Core, and cloud-native 
                  .NET applications. Available as a <strong>remote .NET consultant</strong> for USA, Europe, and global projects.
                </p>
                <div class="tech-highlights">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>.NET Core & ASP.NET Core</strong> - Enterprise applications
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>C# Expert</strong> - Advanced language features
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Entity Framework Core</strong> - Data access & ORM
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Remote .NET Consultant</strong> - USA, Europe, Global
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tech-cta mt-4">
                  <router-link to="/services/full-stack-development" class="btn btn-primary me-3">
                    <i class="bi bi-arrow-right me-2"></i>Hire .NET Consultant
                  </router-link>
                  <router-link to="/projects/heat-exchanger" class="btn btn-outline-primary">
                    <i class="bi bi-code-square me-2"></i>View .NET Projects
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          
          <hr class="tech-divider" />
          
          <!-- Microservices Expertise Section -->
          <div class="tech-section mb-5">
            <div class="row align-items-center">
              <div class="col-lg-2 col-md-3 col-12 text-center mb-3 mb-lg-0">
                <div class="tech-icon-wrapper">
                  <img :src="assetPath('/assets/img/Icons/Docker.svg')" alt="Microservices" class="tech-icon-large" />
                </div>
              </div>
              <div class="col-lg-10 col-md-9 col-12">
                <h3 class="tech-title txt-h3-xl mb-3">
                  <strong>Microservices Architect & Consultant</strong>
                </h3>
                <p class="tech-description txt-p-lg mb-3">
                  <strong>Microservices architecture expert</strong> with extensive experience designing and implementing 
                  scalable microservices solutions. Specializing in .NET Core microservices, distributed systems, API Gateway 
                  patterns, and service mesh architectures. Available as a <strong>remote microservices consultant</strong> 
                  for enterprise projects worldwide.
                </p>
                <div class="tech-highlights">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Microservices Architecture</strong> - Design & implementation
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>.NET Core Microservices</strong> - Enterprise-grade solutions
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Distributed Systems</strong> - Scalable architectures
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Remote Microservices Consultant</strong> - Global availability
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tech-cta mt-4">
                  <router-link to="/services/microservices-architecture" class="btn btn-primary me-3">
                    <i class="bi bi-arrow-right me-2"></i>Hire Microservices Architect
                  </router-link>
                  <router-link to="/projects/heat-exchanger" class="btn btn-outline-primary">
                    <i class="bi bi-code-square me-2"></i>View Microservices Projects
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          
          <hr class="tech-divider" />
          
          <!-- API Development Expertise Section -->
          <div class="tech-section mb-5">
            <div class="row align-items-center">
              <div class="col-lg-2 col-md-3 col-12 text-center mb-3 mb-lg-0">
                <div class="tech-icon-wrapper">
                  <img :src="assetPath('/assets/img/Icons/api.svg')" alt="API Development" class="tech-icon-large" />
                </div>
              </div>
              <div class="col-lg-10 col-md-9 col-12">
                <h3 class="tech-title txt-h3-xl mb-3">
                  <strong>API Development Expert & Consultant</strong>
                </h3>
                <p class="tech-description txt-p-lg mb-3">
                  <strong>RESTful API development expert</strong> specializing in designing, developing, and optimizing 
                  enterprise APIs. Expertise in ASP.NET Core Web APIs, API Gateway patterns, API documentation (Swagger), 
                  and API security. Available as a <strong>remote API developer consultant</strong> for USA, Europe, and global clients.
                </p>
                <div class="tech-highlights">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>RESTful API Development</strong> - Design & implementation
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>ASP.NET Core Web APIs</strong> - Enterprise-grade APIs
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>API Gateway & Architecture</strong> - Scalable API design
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Remote API Developer Consultant</strong> - Global projects
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tech-cta mt-4">
                  <router-link to="/services/full-stack-development" class="btn btn-primary me-3">
                    <i class="bi bi-arrow-right me-2"></i>Hire API Development Expert
                  </router-link>
                  <router-link to="/projects/heat-exchanger" class="btn btn-outline-primary">
                    <i class="bi bi-code-square me-2"></i>View API Projects
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          
          <hr class="tech-divider" />
          
          <!-- Azure Cloud Expertise Section -->
          <div class="tech-section mb-5">
            <div class="row align-items-center">
              <div class="col-lg-2 col-md-3 col-12 text-center mb-3 mb-lg-0">
                <div class="tech-icon-wrapper">
                  <img :src="assetPath('/assets/img/Icons/Azure.svg')" alt="Azure Cloud" class="tech-icon-large" />
                </div>
              </div>
              <div class="col-lg-10 col-md-9 col-12">
                <h3 class="tech-title txt-h3-xl mb-3">
                  <strong>Azure Cloud Architect & Consultant</strong>
                </h3>
                <p class="tech-description txt-p-lg mb-3">
                  <strong>Azure Cloud expert</strong> with extensive experience in Azure architecture, cloud migration, 
                  and Azure DevOps. Specializing in Azure App Services, Azure Functions, Azure Service Fabric, Azure API 
                  Management, and cloud-native solutions. Available as a <strong>remote Azure consultant</strong> for 
                  enterprise cloud projects worldwide.
                </p>
                <div class="tech-highlights">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Azure Cloud Architecture</strong> - Enterprise solutions
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Azure DevOps & CI/CD</strong> - Automation & pipelines
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Cloud Migration</strong> - On-premise to Azure
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="tech-highlight-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Remote Azure Consultant</strong> - USA, Europe, Global
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tech-cta mt-4">
                  <router-link to="/services/azure-cloud-architecture" class="btn btn-primary me-3">
                    <i class="bi bi-arrow-right me-2"></i>Hire Azure Cloud Consultant
                  </router-link>
                  <router-link to="/projects/heat-exchanger" class="btn btn-outline-primary">
                    <i class="bi bi-code-square me-2"></i>View Azure Projects
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
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  transition: all 0.3s ease;
  border: 1px solid rgba(5, 99, 187, 0.1);
}

.tech-section:hover {
  box-shadow: 0 10px 30px rgba(5, 99, 187, 0.15);
  transform: translateY(-5px);
}

.tech-icon-wrapper {
  background: linear-gradient(135deg, rgba(5, 99, 187, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%);
  padding: 25px;
  border-radius: 15px;
  display: inline-block;
  transition: all 0.3s ease;
}

.tech-section:hover .tech-icon-wrapper {
  background: linear-gradient(135deg, rgba(5, 99, 187, 0.2) 0%, rgba(102, 126, 234, 0.2) 100%);
  transform: scale(1.05);
}

.tech-icon-large {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.tech-title {
  color: #0563bb;
  font-weight: 700;
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
  padding: 12px 15px;
  background: rgba(5, 99, 187, 0.05);
  border-radius: 8px;
  border-left: 3px solid #28a745;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.tech-highlight-item:hover {
  background: rgba(5, 99, 187, 0.1);
  transform: translateX(5px);
}

.tech-highlight-item strong {
  color: #0563bb;
}

.tech-cta .btn {
  padding: 12px 30px;
  font-weight: 600;
  border-radius: 25px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #0563bb 0%, #667eea 100%);
  border: none;
}

.tech-cta .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(5, 99, 187, 0.4);
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
    width: 60px;
    height: 60px;
  }
  
  .technology-sections {
    padding: 15px;
  }
}
</style>
