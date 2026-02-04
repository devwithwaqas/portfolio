<template>
  <section id="resume" class="resume section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      
      <!-- Resume Card -->
      <ReusableCard 
        title="Professional Resume" 
        icon-name="resume"
        body-padding="0"
      >
              <!-- Resume Download Links - At the top for immediate visibility -->
              <div class="resume-downloads" style="margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border-radius: 15px; box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);">
                <h3 class="txt-h3-xl" style="margin-bottom: 20px; text-align: center; color: #2c3e50;">
                  <IconComponent icon-name="resume" fallback-emoji="📄" size="xl" style="margin-right: 10px;" />
                  Download Resume
                </h3>
                <div v-if="!geoDetectionComplete" class="text-center" style="padding: 20px; color: #666;">
                  <IconComponent icon-name="loading" fallback-emoji="⏳" size="lg" />
                  <p class="txt-p-md" style="margin-top: 10px;">Detecting your location...</p>
                </div>
                <div v-else class="row g-3 justify-content-center">
                  <div class="col-12 col-md-6">
                    <a 
                      :href="resumePaths.fullResume" 
                      :download="resumePaths.fullResumeName"
                      class="resume-download-btn"
                      @click="trackResumeDownload('full')"
                      target="_blank"
                    >
                      <IconComponent icon-name="resume" fallback-emoji="📄" size="lg" />
                      <span>Full Resume (PDF)</span>
                    </a>
                  </div>
                  <div class="col-12 col-md-6">
                    <a 
                      :href="resumePaths.onePageResume" 
                      :download="resumePaths.onePageResumeName"
                      class="resume-download-btn"
                      @click="trackResumeDownload('one-page')"
                      target="_blank"
                    >
                      <IconComponent icon-name="resume" fallback-emoji="📋" size="lg" />
                      <span>One-Page Resume (PDF)</span>
                    </a>
                  </div>
                </div>
              </div>

              <div class="row">

                <div class="col-lg-6">
                  <h3 class="resume-title txt-h3-2xl">Summary</h3>

                  <div class="resume-item pb-0">
                    <h4 class="txt-h4-xl">
                      <IconComponent icon-name="modern web applications" fallback-emoji="🚀" size="xl" style="margin-right: 10px;" />
                      {{ fullName }}
                    </h4>
                    <p class="txt-p-lg"><em><strong>Senior Software Engineer & Technical Lead | Software Engineering Consultant | .NET Developer | Microservices Architect | API Development Specialist</strong> with {{ totalExperience }}+ years architecting enterprise-scale solutions for Fortune 500 companies. Specializes in <strong>.NET Core, ASP.NET, C#</strong>, <strong>Microservices Architecture</strong>, <strong>RESTful API Development</strong>, <strong>Azure Cloud</strong>, and CI/CD automation. <strong>Available for remote work in USA, Europe, and globally.</strong> Flexible timezone (EST, PST, GMT, CET). <strong>Experience:</strong> Delivered mission-critical systems processing 2.5M+ data points daily, achieved 65% performance improvements, and led teams managing billions in operational costs. Mentored 50+ developers across global teams. Worked with clients in USA, Europe, and worldwide.</em></p>
                    <ul>
                      <li class="txt-list-md">
                        <strong>
                          <IconComponent icon-name="location" fallback-emoji="📍" size="xl" style="margin-right: 10px;" />
                          Location:
                        </strong>
                        <div>Selangor, Malaysia (
                          <IconComponent icon-name="remote innovation" fallback-emoji="🌐" size="xl" style="margin-right: 10px;" />
                          Global remote capabilities)
                        </div>
                      </li>
                      <li class="txt-list-md">
                        <strong>
                          <IconComponent icon-name="phone" fallback-emoji="📞" size="xl" style="margin-right: 10px;" />
                          Contact:
                        </strong>
                        <div><a :href="`tel:${phone}`" class="txt-link-md" style="color: #0563bb; text-decoration: none; transition: all 0.3s ease;" @mouseover="$event.target.style.color='#667eea'; $event.target.style.textShadow='0 0 8px rgba(102, 126, 234, 0.4)'" @mouseout="$event.target.style.color='#0563bb'; $event.target.style.textShadow='none'">{{ phone }}</a></div>
                      </li>
                      <li class="txt-list-md">
                        <strong>
                          <IconComponent icon-name="email" fallback-emoji="✉️" size="xl" style="margin-right: 10px;" />
                          Email:
                        </strong>
                        <div><a :href="`mailto:${email}`" class="txt-link-md" style="color: #0563bb; text-decoration: none; transition: all 0.3s ease;" @mouseover="$event.target.style.color='#667eea'; $event.target.style.textShadow='0 0 8px rgba(102, 126, 234, 0.4)'" @mouseout="$event.target.style.color='#0563bb'; $event.target.style.textShadow='none'">{{ email }}</a></div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <h3 class="resume-title txt-h3-2xl">
                    <IconComponent icon-name="education" fallback-emoji="🎓" size="xl" style="margin-right: 10px;" />
                    Education
                  </h3>
                  <div class="resume-item">
                    <h4 class="txt-h4-lg">
                      <IconComponent icon-name="bachelor" fallback-emoji="🏛️" size="xl" style="margin-right: 10px;" />
                      Bachelor of Computer System Engineering (Honors)
                    </h4>
                    <h5 class="txt-h5-md">
                      <time datetime="2006">2006</time> - <time datetime="2013">2013</time>
                    </h5>
                    <p class="txt-p-md"><em>University of Engineering and Technology, Lahore, Pakistan</em></p>
                    <p class="txt-p-md">
                      <strong>
                        <IconComponent icon-name="academic excellence" fallback-emoji="🎯" size="xl" style="margin-right: 10px;" />
                        Academic Excellence:
                      </strong> 
                      Completed a comprehensive 4-year honors program in Computer System Engineering, specializing in software development and system architecture. <strong>Laid the foundation</strong> for expertise in enterprise-level applications, database design, and scalable system solutions that would define a distinguished career in software engineering.
                    </p>
                  </div><!-- End Resume Item -->

                  <h3 class="resume-title txt-h3-2xl">
                    <IconComponent icon-name="awards & achievements" fallback-emoji="🏆" size="xl" style="margin-right: 10px;" />
                    Awards & Achievements
                  </h3>
                  <div class="resume-item">
                    <h4 class="txt-h4-lg">
                      <IconComponent icon-name="champion" fallback-emoji="🥇" size="xl" style="margin-right: 10px;" />
                      National Speed Programming Champion
                    </h4>
                    <h5 class="txt-h5-md">2010</h5>
                    <p class="txt-p-md"><em>ACM All Pakistan Speed Programming Competition</em></p>
                    <p class="txt-p-md">
                      <strong>
                        <IconComponent icon-name="elite achievement" fallback-emoji="🏅" size="xl" style="margin-right: 10px;" />
                        Elite Achievement:
                      </strong> 
                      Secured first position in the most prestigious programming competition in Pakistan, competing against 500+ top-tier developers from leading universities nationwide. <strong>Demonstrated exceptional problem-solving skills</strong> and algorithmic thinking that set the foundation for a distinguished career in software engineering.
                    </p>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4 class="txt-h4-lg">
                      <IconComponent icon-name="guinness" fallback-emoji="🌟" size="xl" style="margin-right: 10px;" />
                      HR IT Expert Award
                    </h4>
                    <h5 class="txt-h5-md">
                      <time datetime="2013">2013</time>
                    </h5>
                    <p class="txt-p-md"><em>Guinness World Records Pakistan - Punjab Youth Festival</em></p>
                    <p class="txt-p-md">
                      <strong>
                        <IconComponent icon-name="technical excellence" fallback-emoji="🎯" size="xl" style="margin-right: 10px;" />
                        Technical Excellence:
                      </strong> 
                      Recognized as the premier IT expert for orchestrating the technical infrastructure of Pakistan's largest youth festival, managing 150,000+ participants. <strong>Pioneered innovative solutions</strong> that enabled seamless event coordination and earned recognition in Guinness World Records for the largest gathering of its kind.
                    </p>
                  </div><!-- End Resume Item -->

                </div>

                <div class="col-lg-6">
                  <h3 class="resume-title txt-h3-2xl">Professional Experience</h3>
                  <div class="resume-item">
                    <h4 class="txt-h4-lg">
                      <IconComponent icon-name="modern web applications" fallback-emoji="🚀" size="xl" style="margin-right: 10px;" />
                      Lead Software Engineer & Technical Consultant
                    </h4>
                    <h5 class="txt-h5-md">
                      <time datetime="2022-01">January 2022</time> - <time datetime="2026-01">Present</time>
                    </h5>
                    <p class="txt-p-md"><em>Independent Consultant, Remote/Global</em></p>
                    <ul>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="global impact" fallback-emoji="💼" size="xl" style="margin-right: 10px;" />
                          Global Impact:
                        </strong>
                        <div>Delivered enterprise solutions to Fortune 500 clients across 5+ countries, specializing in Azure cloud architecture and .NET Core microservices</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="cloud excellence" fallback-emoji="☁️" size="xl" style="margin-right: 10px;" />
                          Cloud Excellence:
                        </strong>
                        <div>Architected Azure cloud solutions reducing infrastructure costs by 40% while achieving 65% performance improvements for mission-critical systems</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="full-stack mastery" fallback-emoji="🔄" size="xl" style="margin-right: 10px;" />
                          Full-Stack Mastery:
                        </strong>
                        <div>Building complete applications from database design to user interface, ensuring seamless integration and optimal user experience</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="rapid delivery" fallback-emoji="⚡" size="xl" style="margin-right: 10px;" />
                          Rapid Delivery:
                        </strong>
                        <div>Delivered projects 25% faster than industry standards with 99.9% uptime for mission-critical petroleum operations managing billions in maintenance costs</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="remote innovation" fallback-emoji="🌐" size="xl" style="margin-right: 10px;" />
                          Remote Innovation:
                        </strong>
                        <div>Pioneered remote-first development practices across 5+ time zones, managing distributed teams for Fortune 500 clients with 99.9% delivery success rate</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4 class="txt-h4-lg">
                      <IconComponent icon-name="aviation" fallback-emoji="✈️" size="xl" style="margin-right: 10px;" />
                      Technical Lead
                    </h4>
                    <h5 class="txt-h5-md">
                      <time datetime="2021-06">Jun 2021</time> – <time datetime="2022-08">Aug 2022</time> (1 yr 3 mos)
                    </h5>
                    <p class="txt-p-md"><em>AirAsia Tech, Kuala Lumpur, Malaysia</em></p>
                    <ul>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="aviation domain" fallback-emoji="🎯" size="xl" style="margin-right: 10px;" />
                          Aviation Domain Revamp:
                        </strong>
                        <div>Led revamp of AirAsia Super App and airline domain applications using .NET Core + Angular, serving millions of users across Southeast Asia</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="devops excellence" fallback-emoji="⚙️" size="xl" style="margin-right: 10px;" />
                          DevOps Excellence:
                        </strong>
                        <div>Standardized CI/CD pipelines, branching strategies, and deployment approvals, reducing delivery time by 40-50% while ensuring code quality</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="performance optimization" fallback-emoji="📈" size="xl" style="margin-right: 10px;" />
                          Performance Optimization:
                        </strong>
                        <div>Optimized Entity Framework + LINQ queries, improving database performance by 35% and reducing query execution time for real-time flight operations</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="technical leadership" fallback-emoji="👥" size="xl" style="margin-right: 10px;" />
                          Technical Leadership:
                        </strong>
                        <div>Led cross-functional team of 8+ engineers developing multi-tier .NET Core + Angular applications, conducting code reviews and knowledge transfer sessions</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="cloud architecture" fallback-emoji="☁️" size="xl" style="margin-right: 10px;" />
                          Cloud Architecture:
                        </strong>
                        <div>Designed scalable Azure Cloud Services architecture supporting real-time flight operations</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4 class="txt-h4-lg">
                      <IconComponent icon-name="software engineer" fallback-emoji="🏢" size="xl" style="margin-right: 10px;" />
                      Technical Lead
                    </h4>
                    <h5 class="txt-h5-md">
                      <time datetime="2020-02">Feb 2020</time> – <time datetime="2021-01">Jan 2021</time> (1 yr)
                    </h5>
                    <p class="txt-p-md"><em>Datacom Systems Sdn Bhd, Kuala Lumpur, Malaysia</em></p>
                    <ul>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="microservices architecture" fallback-emoji="🏗️" size="xl" style="margin-right: 10px;" />
                          Microservices Architecture:
                        </strong>
                        <div>Developed microservices architecture with API Gateway integrating 7+ third-party systems (SharePoint, SAP, Cherwell, Success Factor, Datalake) under unified Azure AD authentication</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="cloud infrastructure" fallback-emoji="☁️" size="xl" style="margin-right: 10px;" />
                          Cloud Infrastructure:
                        </strong>
                        <div>Designed Azure Service Fabric cloud infrastructure with SQL Server, implemented CI/CD pipelines with ARM templates for multi-tenant deployments across DEV/QA/UAT/PROD environments</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="performance optimization" fallback-emoji="⚡" size="xl" style="margin-right: 10px;" />
                          Performance Optimization:
                        </strong>
                        <div>Optimized n-tier application architecture with Entity Framework best practices, improving query performance and system responsiveness by 30%</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="system integration" fallback-emoji="🔗" size="xl" style="margin-right: 10px;" />
                          System Integration:
                        </strong>
                        <div>Integrated enterprise systems (SAP, Cherwell HR, Application Insights) with custom APIs, enabling seamless data flow across business operations</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="agile development" fallback-emoji="🔄" size="xl" style="margin-right: 10px;" />
                          Agile Development:
                        </strong>
                        <div>Implemented Agile/Scrum practices with sprint planning, backlog management, and daily standups, ensuring on-time delivery of all project milestones</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4 class="txt-h4-lg">
                      <IconComponent icon-name="rapid delivery" fallback-emoji="⚡" size="xl" style="margin-right: 10px;" />
                      Technical Lead
                    </h4>
                    <h5 class="txt-h5-md">Jul 2019 – Jan 2020 (7 mos)</h5>
                    <p class="txt-p-md"><em>Syntronic Malaysia Sdn Bhd, Kuala Lumpur, Malaysia</em></p>
                    <ul>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="api development" fallback-emoji="🔌" size="xl" style="margin-right: 10px;" />
                          API Development:
                        </strong>
                        <div>Developed ASP.NET Core REST APIs with Swagger documentation and SignalR for real-time bidirectional communication in IoT monitoring systems</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="modern web applications" fallback-emoji="🚀" size="xl" style="margin-right: 10px;" />
                          Modern Web Applications:
                        </strong>
                        <div>Successfully revamped major module (backend, frontend, database) in under 2 months, delivering Angular SPA with responsive design and enhanced UX</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="devops automation" fallback-emoji="🐳" size="xl" style="margin-right: 10px;" />
                          DevOps Automation:
                        </strong>
                        <div>Implemented CI/CD automation with Azure DevOps, Docker containerization, and automated unit testing, reducing manual testing time by 60%</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="azure services" fallback-emoji="☁️" size="xl" style="margin-right: 10px;" />
                          Azure Services:
                        </strong>
                        <div>Utilized Cosmos DB, Azure Functions, and Azure Storage for scalable solutions</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="agile practices" fallback-emoji="🔄" size="xl" style="margin-right: 10px;" />
                          Agile Practices:
                        </strong>
                        <div>Active participation in Agile ceremonies and comprehensive code reviews</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4 class="txt-h4-lg">
                      <IconComponent icon-name="smart city" fallback-emoji="🏙️" size="xl" style="margin-right: 10px;" />
                      Technical Lead
                    </h4>
                    <h5 class="txt-h5-md">May 2018 – Jul 2019 (1 yr 3 mos)</h5>
                    <p class="txt-p-md"><em>Iconic Control Sdn Bhd, Petaling Jaya, Malaysia</em></p>
                    <ul>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="smart city solutions" fallback-emoji="🏗️" size="xl" style="margin-right: 10px;" />
                          Smart City Solutions:
                        </strong>
                        <div>Architected 7+ smart city solutions from scratch (Transportation, Law Enforcement, Taxation, Land Planning, Project Monitoring), achieving 50-60% revenue growth</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="ai & ocr integration" fallback-emoji="🤖" size="xl" style="margin-right: 10px;" />
                          OCR Integration:
                        </strong>
                        <div>Implemented OCR-based enforcement systems, GIS mapping with Supermap, and IoT sensor integration for real-time monitoring and crime reporting</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="architecture excellence" fallback-emoji="🏛️" size="xl" style="margin-right: 10px;" />
                          Architecture Excellence:
                        </strong>
                        <div>Transformed legacy code to SOLID principles and MVVM architecture, rolling out 7 major solutions with improved maintainability and scalability</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="modern tech stack" fallback-emoji="🛠️" size="xl" style="margin-right: 10px;" />
                          Modern Tech Stack:
                        </strong>
                        <div>Established on-premise IIS hosting environment, deployed all applications under single domain with ASP.NET Core, Vue.js, Angular, Supermap GIS, and SQL Server</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="team leadership" fallback-emoji="👥" size="xl" style="margin-right: 10px;" />
                          Team Leadership:
                        </strong>
                        <div>Led team in requirements gathering, architecture design, and stakeholder engagement, representing organization in smart city development conferences</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4 class="txt-h4-lg">
                      <IconComponent icon-name="e-commerce" fallback-emoji="🛒" size="xl" style="margin-right: 10px;" />
                      Technical Lead / Senior Software Engineer
                    </h4>
                    <h5 class="txt-h5-md">Nov 2012 – Mar 2018 (5 yrs 5 mos)</h5>
                    <p class="txt-p-md"><em>Squad Cell, Lahore, Pakistan → Promoted to Technical Lead (2015)</em></p>
                    <ul>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="e-commerce excellence" fallback-emoji="🛒" size="xl" style="margin-right: 10px;" />
                          E-commerce Excellence:
                        </strong>
                        <div>Architected and deployed cloud-hosted e-commerce platform from scratch with .NET MVC, Angular, and Swagger UI, managing end-to-end development lifecycle</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="data analytics" fallback-emoji="📊" size="xl" style="margin-right: 10px;" />
                          Data Analytics:
                        </strong>
                        <div>Developed data analytics framework for automated product recommendations based on purchase frequency, user ratings, and behavior patterns, increasing customer engagement</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="notification services" fallback-emoji="🔔" size="xl" style="margin-right: 10px;" />
                          Notification Services:
                        </strong>
                        <div>Designed independent notification microservice (push, in-app, email) serving multiple applications, with reward/discount strategies increasing user retention</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="devops automation" fallback-emoji="⚙️" size="xl" style="margin-right: 10px;" />
                          DevOps Automation:
                        </strong>
                        <div>Standardized Agile/Scrum practices and automated DevOps branching/build/deployment processes, improving team efficiency and code quality through structured workflows</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="technical leadership" fallback-emoji="👥" size="xl" style="margin-right: 10px;" />
                          Technical Leadership:
                        </strong>
                        <div>Mentored team members in OOP principles, design patterns, and algorithms through workshops and code reviews, contributing to company's revenue growth and customer base expansion</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4 class="txt-h4-lg">
                      <IconComponent icon-name="game engine" fallback-emoji="🎮" size="xl" style="margin-right: 10px;" />
                      Game Developer
                    </h4>
                    <h5 class="txt-h5-md">Jun 2011 – Oct 2012 (1 yr 5 mos)</h5>
                    <p class="txt-p-md"><em>GenITeam Solutions, Malaysia</em></p>
                    <ul>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="physics engine innovation" fallback-emoji="🎯" size="xl" style="margin-right: 10px;" />
                          Physics Engine Innovation:
                        </strong>
                        <div>Independently developed company's first in-house 2D physics engine, enabling rapid game development and reducing third-party licensing costs</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="game development" fallback-emoji="🏆" size="xl" style="margin-right: 10px;" />
                          Game Development Success:
                        </strong>
                        <div>Developed Marine Defender (ranked #21 in Arcade & Action, #58 overall), generating $2M revenue in first 2 months and 35% increase in annual game revenue</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="database integration" fallback-emoji="🗄️" size="xl" style="margin-right: 10px;" />
                          Database Integration:
                        </strong>
                        <div>Designed database architecture and RESTful services for RPG games using SQL Server, XML, and JSON, enabling seamless data persistence and game state management</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="revenue growth" fallback-emoji="💰" size="xl" style="margin-right: 10px;" />
                          Revenue Growth:
                        </strong>
                        <div>Key contributor to company growth, generating $2M in first 2 months and maintaining robust customer base through high-quality game releases</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="technical stack" fallback-emoji="🛠️" size="xl" style="margin-right: 10px;" />
                          Technical Stack:
                        </strong>
                        <div>Utilized .NET, Java, Box2D physics engine, SQL Server, and XML for robust game architecture and data management</div>
                      </li>
                    </ul>
                  </div><!-- End Resume Item -->

                  <div class="resume-item">
                    <h4 class="txt-h4-lg">
                      <IconComponent icon-name="software engineer" fallback-emoji="💼" size="xl" style="margin-right: 10px;" />
                      Software Engineer
                    </h4>
                    <h5 class="txt-h5-md">Jan 2008 – Jun 2011 (3 yrs 6 mos)</h5>
                    <p class="txt-p-md"><em>DSOL (Kiics), Malaysia</em></p>
                    <ul>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="web solutions" fallback-emoji="🌐" size="xl" style="margin-right: 10px;" />
                          Web Solutions:
                        </strong>
                        <div>Developed university admission and administration management system, reducing manual operational costs by 30% through automation</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="multi-threaded applications" fallback-emoji="⚡" size="xl" style="margin-right: 10px;" />
                          Multi-threaded Applications:
                        </strong>
                        <div>Developed multi-threaded mass email client with HTML editor and user management (admin, power-user, limited access), efficiently handling thousands of concurrent users</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="communication systems" fallback-emoji="📧" size="xl" style="margin-right: 10px;" />
                          Communication Systems:
                        </strong>
                        <div>Built advertisement SMS system with billing features and subscription management, enabling targeted marketing campaigns for business clients</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="startup growth" fallback-emoji="🚀" size="xl" style="margin-right: 10px;" />
                          Startup Growth:
                        </strong>
                        <div>Contributed to startup growth through innovative .NET solutions, including browser-independent parental control software using network socket programming</div>
                      </li>
                      <li>
                        <strong>
                          <span class="fancy-bullet"></span>
                          <IconComponent icon-name="awards & achievements" fallback-emoji="🏆" size="xl" style="margin-right: 10px;" />
                          Recognition:
                        </strong>
                        <div>Awarded Best Programmer at KICS Annual Ceremony for outstanding technical contributions and innovation in software development</div>
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
import { APP_CONFIG } from '../../config/constants.js'
import ReusableCard from '../common/ReusableCard.vue'
import IconComponent from '../common/IconComponent.vue'
import { isUserFromMalaysia, getResumePaths } from '../../utils/geolocation.js'
import { trackEvent } from '../../utils/analytics.js'
import { assetPath } from '../../utils/assetPath.js'

export default {
  name: 'Resume',
  components: {
    ReusableCard,
    IconComponent
  },
  data() {
    return {
      // VUE PROPER: Import constants instead of deleted personalData.js
      // totalExperience and techLeadExperience are now calculated dynamically in constants.js
      ...APP_CONFIG,
      isMalaysia: false,
      resumePaths: {
        fullResume: assetPath('downloads/Waqas_Ahmad_Resume_glf.pdf'),
        onePageResume: assetPath('downloads/Waqas_Ahmad_Resume_gl1.pdf'),
        fullResumeName: 'Waqas_Ahmad_Resume_glf.pdf',
        onePageResumeName: 'Waqas_Ahmad_Resume_gl1.pdf'
      },
      geoDetectionComplete: false
    }
  },
  async mounted() {
    // DEBUG MODE: Check URL parameter to force location (for testing)
    const urlParams = new URLSearchParams(window.location.search)
    const forceLocation = urlParams.get('location')
    
    if (forceLocation) {
      // Force location for testing (e.g., ?location=MY or ?location=US)
      const isMalaysiaUser = forceLocation.toUpperCase() === 'MY'
      console.log(`[Resume] DEBUG MODE: Forcing location to ${isMalaysiaUser ? 'Malaysia' : 'Global'} (from URL parameter)`)
      this.isMalaysia = isMalaysiaUser
      const paths = getResumePaths(isMalaysiaUser)
      this.resumePaths = {
        fullResume: assetPath(paths.fullResume),
        onePageResume: assetPath(paths.onePageResume),
        fullResumeName: paths.fullResumeName,
        onePageResumeName: paths.onePageResumeName
      }
      this.geoDetectionComplete = true
      return
    }
    
    // Normal geolocation detection
    // Detect user location asynchronously (don't block page load)
    try {
      const isMalaysiaUser = await isUserFromMalaysia()
      this.isMalaysia = isMalaysiaUser
      const paths = getResumePaths(isMalaysiaUser)
      // Use assetPath to ensure correct base URL handling
      this.resumePaths = {
        fullResume: assetPath(paths.fullResume),
        onePageResume: assetPath(paths.onePageResume),
        fullResumeName: paths.fullResumeName,
        onePageResumeName: paths.onePageResumeName
      }
      this.geoDetectionComplete = true
    } catch (error) {
      // Default to global if detection fails
      // In DEV: don't log to avoid console spam
      if (!import.meta.env?.DEV) {
        console.warn('[Resume] Geolocation detection failed, defaulting to global:', error.message)
      }
      this.isMalaysia = false
      const paths = getResumePaths(false)
      this.resumePaths = {
        fullResume: assetPath(paths.fullResume),
        onePageResume: assetPath(paths.onePageResume),
        fullResumeName: paths.fullResumeName,
        onePageResumeName: paths.onePageResumeName
      }
      this.geoDetectionComplete = true
    }
  },
  methods: {
    trackResumeDownload(type) {
      trackEvent('resume_download', {
        event_category: 'engagement',
        event_label: type,
        resume_type: type,
        location: this.isMalaysia ? 'malaysia' : 'global'
      })
    }
  }
}
</script>

<style scoped>
/* Perfect icon-text alignment using flexbox */
.resume-item strong {
  display: inline-flex;
  align-items: center;
  gap: 0;
}

.resume-item h4 {
  display: flex;
  align-items: center;
  gap: 0;
}

/* Force line break after strong tags (headings with colons) */
.resume-item li strong {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 6px;
}

/* Ensure the div after strong starts on new line */
.resume-item li strong + div {
  display: block;
  width: 100%;
  padding-left: 0;
}

/* For paragraphs with strong tags, make strong display as block to force line break */
.resume-item p strong {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
}

/* Clean list styling */
.resume-item ul {
  list-style: none;
  padding-left: 0;
}

.resume-item li {
  margin-bottom: 12px;
}

/* Fancy bullet as inline element in flex container - PERFORMANCE OPTIMIZED */
.fancy-bullet {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 8px;
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  border-radius: 2px;
  transform: rotate(45deg);
  flex-shrink: 0;
  /* PERFORMANCE: Composited-only animation */
  animation: bulletPulse 4s ease-in-out infinite;
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

@keyframes bulletPulse {
  0%, 100% {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }
  50% {
    opacity: 0.85;
    transform: rotate(45deg) scale(1.1); /* Reduced scale for better performance */
  }
}

/* Remove icon wrapper boxes (background, border, border-radius) in Resume section */
.resume-title .icon-wrapper-xs,
.resume-title .icon-wrapper-sm,
.resume-title .icon-wrapper-md,
.resume-title .icon-wrapper-lg,
.resume-title .icon-wrapper-xl,
.resume-title .icon-wrapper-2xl,
.resume-item strong .icon-wrapper-xs,
.resume-item strong .icon-wrapper-sm,
.resume-item strong .icon-wrapper-md,
.resume-item strong .icon-wrapper-lg,
.resume-item strong .icon-wrapper-xl,
.resume-item strong .icon-wrapper-2xl,
.resume-item h4 .icon-wrapper-xs,
.resume-item h4 .icon-wrapper-sm,
.resume-item h4 .icon-wrapper-md,
.resume-item h4 .icon-wrapper-lg,
.resume-item h4 .icon-wrapper-xl,
.resume-item h4 .icon-wrapper-2xl {
  background: none !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  transform: none !important;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Remove hover effects on icon wrappers in Resume section */
.resume-title .icon-wrapper-xs:hover,
.resume-title .icon-wrapper-sm:hover,
.resume-title .icon-wrapper-md:hover,
.resume-title .icon-wrapper-lg:hover,
.resume-title .icon-wrapper-xl:hover,
.resume-title .icon-wrapper-2xl:hover,
.resume-item strong .icon-wrapper-xs:hover,
.resume-item strong .icon-wrapper-sm:hover,
.resume-item strong .icon-wrapper-md:hover,
.resume-item strong .icon-wrapper-lg:hover,
.resume-item strong .icon-wrapper-xl:hover,
.resume-item strong .icon-wrapper-2xl:hover,
.resume-item h4 .icon-wrapper-xs:hover,
.resume-item h4 .icon-wrapper-sm:hover,
.resume-item h4 .icon-wrapper-md:hover,
.resume-item h4 .icon-wrapper-lg:hover,
.resume-item h4 .icon-wrapper-xl:hover,
.resume-item h4 .icon-wrapper-2xl:hover {
  background: none !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  transform: none !important;
}

/* PERFORMANCE: Reduce animation frequency for better performance */
.resume-item {
  contain: layout style paint; /* CSS containment for better performance */
}

/* PERFORMANCE: Optimize AOS animations in Resume section */
.resume-item[data-aos] {
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Resume Download Buttons */
.resume-downloads {
  border: 1px solid rgba(139, 92, 246, 0.2);
}

/* CRITICAL: Remove icon wrapper backgrounds/borders in download section */
/* This prevents lazy loading issues with icon boxes */
.resume-downloads .icon-wrapper-xs,
.resume-downloads .icon-wrapper-sm,
.resume-downloads .icon-wrapper-md,
.resume-downloads .icon-wrapper-lg,
.resume-downloads .icon-wrapper-xl,
.resume-downloads .icon-wrapper-2xl {
  background: none !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  transform: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

.resume-downloads .icon-wrapper-xs:hover,
.resume-downloads .icon-wrapper-sm:hover,
.resume-downloads .icon-wrapper-md:hover,
.resume-downloads .icon-wrapper-lg:hover,
.resume-downloads .icon-wrapper-xl:hover,
.resume-downloads .icon-wrapper-2xl:hover {
  background: none !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  transform: none !important;
}

.resume-download-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  text-decoration: none;
  color: #2c3e50;
  transition: all 0.3s ease;
  min-height: 140px;
  position: relative;
  overflow: hidden;
}

.resume-download-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.resume-download-btn > * {
  position: relative;
  z-index: 1;
}

.resume-download-btn span {
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  color: #2c3e50;
  transition: color 0.3s ease;
}

.resume-download-btn small {
  font-size: 12px;
  color: #667eea;
  margin-top: 5px;
  font-weight: 500;
  opacity: 0.8;
}

.resume-download-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
  border-color: rgba(139, 92, 246, 0.6);
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%);
}

.resume-download-btn:hover::before {
  opacity: 1;
}

.resume-download-btn:hover span {
  color: #667eea;
}

.resume-download-btn:active {
  transform: translateY(-1px);
}
</style>