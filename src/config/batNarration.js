// ========================================
// BAT Inhouse App C4 Diagram Narration
// Complete enterprise architecture with detailed descriptions
// Following AirAsia pattern with comprehensive step coverage
// ========================================

export const batNarrationSteps = [
  // ========================================
  // Step 1: Architecture Overview
  // ========================================
  {
    "title": "BAT Inhouse App - Enterprise Architecture Overview",
    "speechTitle": "BAT Inhouse App - Enterprise Architecture Overview",
    "description": "Comprehensive enterprise microservices platform for British American Tobacco",
    "speechDescription": "The BAT Inhouse App represents the most complex and comprehensive enterprise application I've ever developed - a state-of-the-art microservices platform that revolutionizes British American Tobacco's internal operations. This massive enterprise system integrates 8+ different enterprise systems, providing unified access to HR, IT, analytics, and business intelligence across the entire organization.",
    "icon": "architecture.png",
    "position": {
      "x": 0,
      "y": 0
    },
    "highlights": [
      {
        "x": -20,
        "y": -20,
        "width": 27681,
        "height": 11856
      }
    ]
  },

  // ========================================
  // USER PERSONAS (3 steps)
  // ========================================
  {
    "title": "BAT Employee - Primary User",
    "speechTitle": "BAT Employee - Primary User",
    "description": "Primary end users accessing enterprise systems",
    "speechDescription": "BAT Employees are the primary end users of the system, accessing various enterprise applications through a unified interface. They benefit from single sign-on authentication, personalized dashboards, and seamless integration across all business functions.",
    "icon": "user",
    "position": {
      "x": 741,
      "y": 180
    },
    "highlights": [
      {
        "x": 716,
        "y": 156,
        "width": 558,
        "height": 474
      }
    ]
  },
  {
    "title": "System Administrator",
    "speechTitle": "System Administrator",
    "description": "IT administrators managing system operations",
    "speechDescription": "System Administrators have elevated privileges to manage system operations, monitor performance, configure security settings, and maintain the overall health of the enterprise platform. They have access to administrative dashboards and system management tools.",
    "icon": "user",
    "position": {
      "x": 2518,
      "y": 206
    },
    "highlights": [
      {
        "x": 2493,
        "y": 182,
        "width": 680,
        "height": 423
      }
    ]
  },
  {
    "title": "Business Analyst",
    "speechTitle": "Business Analyst",
    "description": "Analysts accessing business intelligence and reporting",
    "speechDescription": "Business Analysts utilize the system's advanced analytics capabilities to generate reports, analyze business metrics, and provide insights for strategic decision-making. They have access to Power BI dashboards and comprehensive reporting tools.",
    "icon": "user",
    "position": {
      "x": 3865,
      "y": 206
    },
    "highlights": [
      {
        "x": 3840,
        "y": 182,
        "width": 541,
        "height": 423
      }
    ]
  },

  // ========================================
  // FRONTEND COMPONENTS (4 steps)
  // ========================================
  {
    "title": "Mobile PWA",
    "speechTitle": "Mobile Progressive Web Application",
    "description": "Progressive Web App for mobile access",
    "speechDescription": "The Mobile Progressive Web App provides a native-like mobile experience using cutting-edge Progressive Web App technology. It includes comprehensive offline capabilities, push notifications, and is specifically optimized for mobile-first workflows across all enterprise functions.",
    "icon": "mobile",
    "position": {
      "x": 88,
      "y": 1305
    },
    "highlights": [
      {
        "x": 63,
        "y": 1281,
        "width": 677,
        "height": 317
      }
    ]
  },
  {
    "title": "Angular Portal - Unified Enterprise Interface",
    "speechTitle": "Angular Portal - Unified Enterprise Interface",
    "description": "Primary web application built with Angular 15+",
    "speechDescription": "The Angular Portal serves as the unified enterprise interface, providing a modern, responsive web application built with Angular 15+. It features advanced routing, state management, and seamless integration with all backend services.",
    "icon": "angular",
    "position": {
      "x": 1390,
      "y": 1280
    },
    "highlights": [
      {
        "x": 1365,
        "y": 1256,
        "width": 511,
        "height": 368
      }
    ]
  },
  {
    "title": "Admin Dashboard",
    "speechTitle": "Administrative Dashboard",
    "description": "Administrative interface for system management",
    "speechDescription": "The Administrative Dashboard provides comprehensive system management capabilities, real-time monitoring of system health, advanced user management features, and detailed analytics for administrators to maintain optimal system performance.",
    "icon": "portal",
    "position": {
      "x": 2525,
      "y": 1305
    },
    "highlights": [
      {
        "x": 2486.0,
        "y": 1267.0,
        "width": 664.0,
        "height": 317.0
      }
    ]
  },
  {
    "title": "Analytics Dashboard",
    "speechTitle": "Analytics Dashboard",
    "description": "Business intelligence and analytics interface",
    "speechDescription": "The Analytics Dashboard provides comprehensive business intelligence capabilities, featuring interactive data visualizations, real-time metrics, and advanced reporting tools that enable data-driven decision making across the organization.",
    "icon": "analytics",
    "position": {
      "x": 3814,
      "y": 1305
    },
    "highlights": [
      {
        "x": 3775.0,
        "y": 1267.0,
        "width": 643.0,
        "height": 317.0
      }
    ]
  },

  // ========================================
  // GATEWAY LAYER (4 steps)
  // ========================================
  {
    "title": "Azure API Management",
    "speechTitle": "Azure Application Programming Interface Management",
    "description": "Enterprise API gateway with security and routing",
    "speechDescription": "Azure API Management serves as our enterprise-grade API gateway, providing sophisticated rate limiting, throttling, and comprehensive system protection. It handles API versioning, documentation management, request transformation, and enforces security policies with advanced features.",
    "icon": "api gateway",
    "position": {
      "x": 1942,
      "y": 2273
    },
    "highlights": [
      {
        "x": 1903.0,
        "y": 2235.0,
        "width": 619.0,
        "height": 368.0
      }
    ]
  },
  {
    "title": "Application Gateway",
    "speechTitle": "Application Gateway",
    "description": "Load balancer and SSL termination point",
    "speechDescription": "The Application Gateway provides intelligent load balancing, SSL termination, and web application firewall capabilities. It ensures high availability, security, and optimal performance for all incoming requests to the enterprise platform.",
    "icon": "gateway",
    "position": {
      "x": 1921,
      "y": 3266
    },
    "highlights": [
      {
        "x": 1882.0,
        "y": 3228.0,
        "width": 660.0,
        "height": 317.0
      }
    ]
  },
  {
    "title": "Security Gateway",
    "speechTitle": "Security Gateway",
    "description": "Advanced security and authentication gateway",
    "speechDescription": "The Security Gateway provides advanced security features including multi-factor authentication, threat detection, and comprehensive security policy enforcement. It ensures secure access to all enterprise resources and protects against various security threats.",
    "icon": "authentication and authorization",
    "position": {
      "x": 1919,
      "y": 4208
    },
    "highlights": [
      {
        "x": 1880.0,
        "y": 4170.0,
        "width": 558.0,
        "height": 368.0
      }
    ]
  },

  // ========================================
  // CORE BUSINESS SERVICES (7 steps)
  // ========================================
  {
    "title": "Authentication Service",
    "speechTitle": "Authentication Service",
    "description": "JWT-based authentication with enterprise SSO",
    "speechDescription": "The Authentication Service provides robust JSON Web Token-based authentication with seamless enterprise Single Sign-On integration. It implements comprehensive role-based access control, manages sessions and token refresh mechanisms, and includes extensive audit logging for security compliance.",
    "icon": "authentication and authorization",
    "position": {
      "x": 5704,
      "y": 5201
    },
    "highlights": [
      {
        "x": 5665.0,
        "y": 5163.0,
        "width": 481.0,
        "height": 375.0
      }
    ]
  },
  {
    "title": "IT Service Management",
    "speechTitle": "Information Technology Service Management",
    "description": "Comprehensive IT service management platform",
    "speechDescription": "The IT Service Management platform provides comprehensive IT operations management, including incident management, change management, problem resolution, and service level monitoring. It integrates with external IT systems and provides automated workflows for efficient IT operations.",
    "icon": "it service management",
    "position": {
      "x": 4416,
      "y": 7253
    },
    "highlights": [
      {
        "x": 4397.0,
        "y": 7235.0,
        "width": 552.0,
        "height": 375.0
      }
    ]
  },
  {
    "title": "Analytics Service",
    "speechTitle": "Analytics Service",
    "description": "Real-time data processing and business intelligence",
    "speechDescription": "The Analytics Service handles comprehensive real-time data processing and business intelligence for the enterprise system. It processes business patterns and user behavior analytics, generates detailed reports and insights, and provides data visualization capabilities for strategic decision making.",
    "icon": "analytics",
    "position": {
      "x": 5615,
      "y": 4233
    },
    "highlights": [
      {
        "x": 5596.0,
        "y": 4215.0,
        "width": 586.0,
        "height": 317.0
      }
    ]
  },
  {
    "title": "Integration Service",
    "speechTitle": "Integration Service",
    "description": "Enterprise system integration and data synchronization",
    "speechDescription": "The Integration Service manages comprehensive enterprise system integration and data synchronization across all external systems. It handles data transformation, API orchestration, and ensures seamless communication between different enterprise applications and services.",
    "icon": "integration service",
    "position": {
      "x": 6824,
      "y": 4233
    },
    "highlights": [
      {
        "x": 6805.0,
        "y": 4215.0,
        "width": 605.0,
        "height": 317.0
      }
    ]
  },
  {
    "title": "Notification Service",
    "speechTitle": "Notification Service",
    "description": "Multi-channel notification orchestration",
    "speechDescription": "The Notification Service orchestrates sophisticated multi-channel communications including SMS, email, and push notifications. It uses advanced template-based messaging, includes comprehensive delivery tracking with retry mechanisms, and supports personalized notification preferences across all enterprise functions.",
    "icon": "notification service",
    "position": {
      "x": 6811,
      "y": 5230
    },
    "highlights": [
      {
        "x": 6792.0,
        "y": 5212.0,
        "width": 618.0,
        "height": 317.0
      }
    ]
  },
  {
    "title": "Saga Orchestrator",
    "speechTitle": "Saga Orchestrator",
    "description": "Distributed transaction coordination",
    "speechDescription": "The Saga Orchestrator manages distributed transactions across multiple microservices, ensuring data consistency and reliability. It implements the Saga pattern for complex business workflows, handles transaction compensation, and provides comprehensive transaction monitoring and recovery capabilities.",
    "icon": "saga orchestrator",
    "position": {
      "x": 4416,
      "y": 5230
    },
    "highlights": [
      {
        "x": 4397.0,
        "y": 5212.0,
        "width": 665.0,
        "height": 317.0
      }
    ]
  },
  {
    "title": "HR Service",
    "speechTitle": "Human Resources Service",
    "description": "Human resources management and employee data",
    "speechDescription": "The Human Resources Service manages comprehensive employee data, organizational structure, and HR workflows. It integrates with external HR systems, manages employee profiles and preferences, and provides HR analytics and reporting capabilities for workforce management.",
    "icon": "hr service",
    "position": {
      "x": 5050,
      "y": 6201
    },
    "highlights": [
      {
        "x": 5031.0,
        "y": 6183.0,
        "width": 528.0,
        "height": 426.0
      }
    ]
  },

  // ========================================
  // SUPPORT SERVICES (4 steps)
  // ========================================
  {
    "title": "Audit Service",
    "speechTitle": "Audit Service",
    "description": "Comprehensive audit logging and compliance",
    "speechDescription": "The Audit Service provides comprehensive audit logging and compliance management for the entire enterprise system. It logs all system activities and user actions, stores audit files and compliance documents, and provides audit trail reporting and analysis for regulatory compliance.",
    "icon": "compliance",
    "position": {
      "x": 3110,
      "y": 10188
    },
    "highlights": [
      {
        "x": 3091.0,
        "y": 10170.0,
        "width": 602.0,
        "height": 317.0
      }
    ]
  },
  {
    "title": "Backup Service",
    "speechTitle": "Backup Service",
    "description": "Automated backup and disaster recovery",
    "speechDescription": "The Backup Service provides automated backup and disaster recovery capabilities for the entire enterprise platform. It implements comprehensive backup strategies, ensures data protection and recovery, and provides disaster recovery planning and execution for business continuity.",
    "icon": "backup service",
    "position": {
      "x": 1992,
      "y": 10188
    },
    "highlights": [
      {
        "x": 1973.0,
        "y": 10170.0,
        "width": 494.0,
        "height": 317.0
      }
    ]
  },
  {
    "title": "Monitoring Service",
    "speechTitle": "Monitoring Service",
    "description": "System monitoring and performance management",
    "speechDescription": "The Monitoring Service provides comprehensive system monitoring and performance management across the entire enterprise platform. It tracks system health, performance metrics, and provides proactive alerting and issue detection for optimal system reliability and performance.",
    "icon": "insights",
    "position": {
      "x": 772,
      "y": 10188
    },
    "highlights": [
      {
        "x": 753.0,
        "y": 10170.0,
        "width": 596.0,
        "height": 317.0
      }
    ]
  },
  {
    "title": "Reporting Service",
    "speechTitle": "Reporting Service",
    "description": "Enterprise reporting and business intelligence",
    "speechDescription": "The Reporting Service provides comprehensive enterprise reporting and business intelligence capabilities. It generates detailed reports, provides data visualization, and supports advanced analytics for strategic decision making across all business functions.",
    "icon": "reporting service",
    "position": {
      "x": 786,
      "y": 11144
    },
    "highlights": [
      {
        "x": 767.0,
        "y": 11126.0,
        "width": 567.0,
        "height": 317.0
      }
    ]
  },

  // ========================================
  // AZURE PLATFORM SERVICES (4 steps)
  // ========================================
  {
    "title": "Azure Service Bus",
    "speechTitle": "Azure Service Bus",
    "description": "Event queuing and message orchestration",
    "speechDescription": "Azure Service Bus provides reliable message queuing for our comprehensive event-driven architecture. It ensures message ordering and delivery guarantees, handles dead letter queues for failed messages, and provides a scalable infrastructure for event processing across the entire system.",
    "icon": "azure service bus",
    "position": {
      "x": 15641,
      "y": 7282
    },
    "highlights": [
      {
        "x": 15622.0,
        "y": 7264.0,
        "width": 571.0,
        "height": 317.0
      }
    ]
  },
  {
    "title": "Azure Event Grid",
    "speechTitle": "Azure Event Grid",
    "description": "Event routing and topic management",
    "speechDescription": "Event Grid provides intelligent event routing with advanced filtering and transformation capabilities. It routes events to appropriate handlers and services, provides event filtering and transformation, and ensures reliable event delivery for sophisticated event-driven architecture patterns.",
    "icon": "azure event grid",
    "position": {
      "x": 15648,
      "y": 8253
    },
    "highlights": [
      {
        "x": 15629.0,
        "y": 8235.0,
        "width": 538.0,
        "height": 317.0
      }
    ]
  },
  {
    "title": "Azure Functions",
    "speechTitle": "Azure Functions",
    "description": "Serverless event handlers and processing",
    "speechDescription": "Azure Functions provide serverless event handling with automatic scaling and cost optimization. They process events from Service Bus and Event Grid, handle business logic and data transformations, and provide automatic scaling based on demand for efficient and scalable event processing.",
    "icon": "azure functions",
    "position": {
      "x": 15605,
      "y": 9221
    },
    "highlights": [
      {
        "x": 15586.0,
        "y": 9203.0,
        "width": 605.0,
        "height": 317.0
      }
    ]
  },
  {
    "title": "Stream Analytics",
    "speechTitle": "Stream Analytics",
    "description": "Real-time data stream processing",
    "speechDescription": "Stream Analytics processes real-time data streams and generates comprehensive business insights. It analyzes streaming data from various sources, performs real-time aggregations and calculations, and provides data for business intelligence dashboards and real-time decision making.",
    "icon": "azure stream analytics",
    "position": {
      "x": 15622,
      "y": 10188
    },
    "highlights": [
      {
        "x": 15603.0,
        "y": 10170.0,
        "width": 583.0,
        "height": 317.0
      }
    ]
  },

  // ========================================
  // MONITORING & ANALYTICS (2 steps)
  // ========================================
  {
    "title": "Azure Monitor",
    "speechTitle": "Azure Monitor",
    "description": "Comprehensive system monitoring and telemetry",
    "speechDescription": "Azure Monitor provides comprehensive system monitoring and telemetry across the entire enterprise platform. It tracks application performance, system health, and provides detailed insights for proactive issue detection and resolution, ensuring optimal system reliability and performance.",
    "icon": "insights",
    "position": {
      "x": 10702,
      "y": 9195
    },
    "highlights": [
      {
        "x": 10683.0,
        "y": 9177.0,
        "width": 462.0,
        "height": 368.0
      }
    ]
  },
  {
    "title": "Application Insights",
    "speechTitle": "Application Insights",
    "description": "Application performance monitoring and telemetry",
    "speechDescription": "Application Insights provides comprehensive application performance monitoring and telemetry for the enterprise platform. It tracks application performance and user behavior, provides detailed error tracking and diagnostics, and generates performance reports for optimal system performance and reliability.",
    "icon": "insights",
    "position": {
      "x": 10620,
      "y": 8253
    },
    "highlights": [
      {
        "x": 10601.0,
        "y": 8235.0,
        "width": 625.0,
        "height": 317.0
      }
    ]
  },

  // ========================================
  // BUSINESS INTELLIGENCE (2 steps)
  // ========================================
  {
    "title": "Power BI",
    "speechTitle": "Power Business Intelligence",
    "description": "Business intelligence and data visualization",
    "speechDescription": "Power BI provides comprehensive business intelligence and data visualization capabilities for the enterprise platform. It enables interactive dashboards, advanced analytics, and data-driven decision making across all business functions with powerful visualization and reporting tools.",
    "icon": "power bi",
    "position": {
      "x": 10083,
      "y": 10188
    },
    "highlights": [
      {
        "x": 10064.0,
        "y": 10170.0,
        "width": 586.0,
        "height": 317.0
      }
    ]
  },
  {
    "title": "ML Platform",
    "speechTitle": "Machine Learning Platform",
    "description": "Machine learning and AI capabilities",
    "speechDescription": "The Machine Learning Platform provides advanced AI and machine learning capabilities for the enterprise system. It enables predictive analytics, automated decision making, and intelligent insights that drive business optimization and strategic decision making across the organization.",
    "icon": "analytics",
    "position": {
      "x": 11295,
      "y": 10188
    },
    "highlights": [
      {
        "x": 11276.0,
        "y": 10170.0,
        "width": 488.0,
        "height": 317.0
      }
    ]
  },

  // ========================================
  // DATABASE LAYER (4 steps)
  // ========================================
  {
    "title": "Azure SQL Database",
    "speechTitle": "Azure Structured Query Language Database",
    "description": "Primary relational data store",
    "speechDescription": "Azure SQL Database serves as our primary relational data store with enterprise-grade high availability and automatic failover capabilities. It includes automated backups, point-in-time recovery, performance monitoring, and security features like Always Encrypted and Transparent Data Encryption.",
    "icon": "azure sql database",
    "position": {
      "x": 15600,
      "y": 11120
    },
    "highlights": [
      {
        "x": 15581.0,
        "y": 11102.0,
        "width": 640.0,
        "height": 350.0
      }
    ]
  },
  {
    "title": "Azure Cosmos DB",
    "speechTitle": "Azure Cosmos Database",
    "description": "NoSQL database for analytics and reporting",
    "speechDescription": "Azure Cosmos Database stores analytics and reporting data with global distribution capabilities. It provides automatic scaling based on demand, supports multiple data models and APIs, and ensures global distribution and multi-region support for scalable analytics.",
    "icon": "cosmos db",
    "position": {
      "x": 16860,
      "y": 11120
    },
    "highlights": [
      {
        "x": 16841.0,
        "y": 11102.0,
        "width": 565.0,
        "height": 350.0
      }
    ]
  },
  {
    "title": "Data Lake Storage",
    "speechTitle": "Data Lake Storage",
    "description": "Big data storage and analytics platform",
    "speechDescription": "Data Lake Storage provides comprehensive big data storage and analytics capabilities for the enterprise platform. It stores large volumes of structured and unstructured data, supports advanced analytics and machine learning workloads, and provides cost-effective storage for business intelligence and data science initiatives.",
    "icon": "data",
    "position": {
      "x": 18050,
      "y": 11120
    },
    "highlights": [
      {
        "x": 18031.0,
        "y": 11102.0,
        "width": 590.0,
        "height": 350.0
      }
    ]
  },
  {
    "title": "Redis Cache",
    "speechTitle": "Redis Cache",
    "description": "High-performance caching layer",
    "speechDescription": "Redis provides high-performance caching for frequently accessed data and session management. It caches enterprise data, manages user sessions and authentication tokens, provides real-time data updates, and ensures sub-millisecond response times for optimal system performance.",
    "icon": "redis",
    "position": {
      "x": 19260,
      "y": 11120
    },
    "highlights": [
      {
        "x": 19241.0,
        "y": 11102.0,
        "width": 670.0,
        "height": 350.0
      }
    ]
  },

  // ========================================
  // EXTERNAL SYSTEMS (8 steps)
  // ========================================
  {
    "title": "SAP Planet 8/9",
    "speechTitle": "SAP Planet 8/9",
    "description": "Enterprise resource planning system",
    "speechDescription": "SAP Planet 8/9 serves as the primary enterprise resource planning system, providing comprehensive business process management, financial management, and operational control across the entire organization. It integrates seamlessly with the BAT Inhouse App for unified business operations.",
    "icon": "sap planet 8/9",
    "position": {
      "x": 25811.44,
      "y": 6277.75
    },
    "highlights": [
      {
        "x": 25797.4,
        "y": 6263.8,
        "width": 529.6,
        "height": 273.5
      }
    ]
  },
  {
    "title": "Cherwell HR",
    "speechTitle": "Cherwell Human Resources",
    "description": "Human resources management system",
    "speechDescription": "Cherwell HR provides comprehensive human resources management capabilities, including employee lifecycle management, payroll processing, benefits administration, and HR analytics. It integrates with the BAT Inhouse App for seamless HR operations and employee data management.",
    "icon": "cherwell hr",
    "position": {
      "x": 21073.94,
      "y": 6277.75
    },
    "highlights": [
      {
        "x": 21059.9,
        "y": 6263.8,
        "width": 529.6,
        "height": 273.5
      }
    ]
  },
  {
    "title": "Cherwell IT",
    "speechTitle": "Cherwell Information Technology",
    "description": "IT service management system",
    "speechDescription": "Cherwell IT provides comprehensive IT service management capabilities, including incident management, change management, asset management, and IT operations. It integrates with the BAT Inhouse App for unified IT service delivery and management across the organization.",
    "icon": "cherwell it",
    "position": {
      "x": 26967,
      "y": 6278
    },
    "highlights": [
      {
        "x": 26948.0,
        "y": 6260.0,
        "width": 643.0,
        "height": 273.0
      }
    ]
  },
  {
    "title": "Azure AD",
    "speechTitle": "Azure Active Directory",
    "description": "Identity and access management",
    "speechDescription": "Azure Active Directory provides comprehensive identity and access management for the enterprise platform. It manages user identities, provides single sign-on capabilities, enforces security policies, and integrates with all enterprise applications for secure and unified access control.",
    "icon": "azure",
    "position": {
      "x": 18768.44,
      "y": 6277.75
    },
    "highlights": [
      {
        "x": 18754.4,
        "y": 6263.8,
        "width": 529.6,
        "height": 273.5
      }
    ]
  },
  {
    "title": "Azure Data Lake",
    "speechTitle": "Azure Data Lake",
    "description": "Big data analytics platform",
    "speechDescription": "Azure Data Lake provides comprehensive big data analytics capabilities for the enterprise platform. It stores and processes large volumes of data, supports advanced analytics and machine learning workloads, and provides insights for data-driven decision making across the organization.",
    "icon": "data",
    "position": {
      "x": 19921.56,
      "y": 6277.75
    },
    "highlights": [
      {
        "x": 19907.6,
        "y": 6263.8,
        "width": 529.6,
        "height": 273.5
      }
    ]
  },
  {
    "title": "Power Apps",
    "speechTitle": "Power Apps",
    "description": "Low-code application development platform",
    "speechDescription": "Power Apps provides low-code application development capabilities for the enterprise platform. It enables rapid application development, custom business applications, and workflow automation, allowing business users to create solutions without extensive programming knowledge.",
    "icon": "power apps",
    "position": {
      "x": 22227.06,
      "y": 6277.75
    },
    "highlights": [
      {
        "x": 22213.1,
        "y": 6263.8,
        "width": 529.6,
        "height": 273.5
      }
    ]
  },
  {
    "title": "SharePoint",
    "speechTitle": "SharePoint",
    "description": "Collaboration and document management platform",
    "speechDescription": "SharePoint provides comprehensive collaboration and document management capabilities for the enterprise platform. It enables team collaboration, document sharing, content management, and workflow automation, supporting effective communication and knowledge sharing across the organization.",
    "icon": "sharepoint",
    "position": {
      "x": 23382,
      "y": 6278
    },
    "highlights": [
      {
        "x": 23363.0,
        "y": 6260.0,
        "width": 651.0,
        "height": 273.0
      }
    ]
  },
  {
    "title": "Microsoft Teams",
    "speechTitle": "Microsoft Teams",
    "description": "Communication and collaboration platform",
    "speechDescription": "Microsoft Teams provides comprehensive communication and collaboration capabilities for the enterprise platform. It enables instant messaging, video conferencing, file sharing, and team collaboration, supporting effective communication and teamwork across the organization.",
    "icon": "teams notification",
    "position": {
      "x": 24658.31,
      "y": 6277.75
    },
    "highlights": [
      {
        "x": 24644.3,
        "y": 6263.8,
        "width": 529.6,
        "height": 273.5
      }
    ]
  },

  // ========================================
  // GROUP ARCHITECTURE OVERVIEWS (9 steps)
  // ========================================
  {
    "title": "Enterprise Frontend Portal",
    "speechTitle": "Enterprise Frontend Portal",
    "description": "Unified frontend architecture and user interfaces",
    "speechDescription": "The Enterprise Frontend Portal represents the unified frontend architecture that provides seamless user experiences across all enterprise applications. It includes responsive web applications, mobile PWAs, and administrative dashboards, all built with modern technologies and consistent design patterns for optimal user experience.",
    "icon": "angular",
    "position": {
      "x": 50,
      "y": 1170
    },
    "highlights": [
      {
        "x": 31.0,
        "y": 1152.0,
        "width": 4550.0,
        "height": 550.0
      }
    ]
  },
  {
    "title": "Azure API Gateway Layer",
    "speechTitle": "Azure Application Programming Interface Gateway Layer",
    "description": "Gateway and security layer architecture",
    "speechDescription": "The Azure API Gateway Layer provides comprehensive gateway and security architecture for the enterprise platform. It includes API management, application gateway, and security gateway components that ensure secure, scalable, and reliable access to all enterprise services and applications.",
    "icon": "gateway",
    "position": {
      "x": 1870,
      "y": 2200
    },
    "highlights": [
      {
        "x": 1851.0,
        "y": 2182.0,
        "width": 770.0,
        "height": 2500.0
      }
    ]
  },
  {
    "title": "Azure Service Fabric Microservices",
    "speechTitle": "Azure Service Fabric Microservices",
    "description": "Core business services and microservices architecture",
    "speechDescription": "The Azure Service Fabric Microservices represent the core business services architecture that powers the enterprise platform. It includes authentication, IT service management, analytics, integration, notification, saga orchestration, and HR services, all built with microservices patterns for scalability and reliability.",
    "icon": "azure service fabric",
    "position": {
      "x": 4350,
      "y": 4110
    },
    "highlights": [
      {
        "x": 4331.0,
        "y": 4092.0,
        "width": 3200.0,
        "height": 3680.0
      }
    ]
  },
  {
    "title": "Monitoring & Analytics Platform",
    "speechTitle": "Monitoring and Analytics Platform",
    "description": "Data processing and analytics services",
    "speechDescription": "The Monitoring and Analytics Platform provides comprehensive data processing and analytics capabilities for the enterprise system. It includes Azure Monitor, Application Insights, Power BI, and ML Platform components that enable real-time monitoring, business intelligence, and advanced analytics for data-driven decision making.",
    "icon": "analytics",
    "position": {
      "x": 10050,
      "y": 8130
    },
    "highlights": [
      {
        "x": 10031.0,
        "y": 8112.0,
        "width": 1820.0,
        "height": 2500.0
      }
    ]
  },
  {
    "title": "Event Processing Platform",
    "speechTitle": "Event Processing Platform",
    "description": "Azure platform services and event processing",
    "speechDescription": "The Event Processing Platform provides comprehensive Azure platform services and event processing capabilities. It includes Azure Service Bus, Event Grid, Azure Functions, and Stream Analytics components that enable event-driven architecture, real-time processing, and scalable event handling across the enterprise platform.",
    "icon": "azure event grid",
    "position": {
      "x": 15530,
      "y": 7150
    },
    "highlights": [
      {
        "x": 15511.0,
        "y": 7132.0,
        "width": 760.0,
        "height": 3560.0
      }
    ]
  },
  {
    "title": "Database Storage Layer",
    "speechTitle": "Database Storage Layer",
    "description": "Data storage and persistence architecture",
    "speechDescription": "The Database Storage Layer provides comprehensive data storage and persistence architecture for the enterprise platform. It includes Azure SQL Database, Cosmos DB, Data Lake Storage, and Redis Cache components that ensure reliable, scalable, and high-performance data storage for all enterprise applications and services.",
    "icon": "azure sql database",
    "position": {
      "x": 15530,
      "y": 11000
    },
    "highlights": [
      {
        "x": 15511.0,
        "y": 10982.0,
        "width": 4580.0,
        "height": 550.0
      }
    ]
  },
  {
    "title": "External Systems Integration",
    "speechTitle": "External Systems Integration",
    "description": "External system integrations and connections",
    "speechDescription": "The External Systems Integration provides comprehensive integration with external enterprise systems and platforms. It includes SAP, Cherwell HR/IT, Azure AD, Data Lake, Power Apps, SharePoint, and Microsoft Teams integrations that enable seamless data exchange and unified operations across all enterprise systems.",
    "icon": "enterprise",
    "position": {
      "x": 18690,
      "y": 6150
    },
    "highlights": [
      {
        "x": 18671.0,
        "y": 6132.0,
        "width": 9200.0,
        "height": 480.0
      }
    ]
  },
  {
    "title": "User Personas & Access",
    "speechTitle": "User Personas and Access",
    "description": "User types and access management",
    "speechDescription": "The User Personas and Access management provides comprehensive user type management and access control for the enterprise platform. It includes BAT Employees, System Administrators, and Business Analysts with role-based access control and personalized experiences tailored to each user type's specific needs and responsibilities.",
    "icon": "user",
    "position": {
      "x": 720,
      "y": 160
    },
    "highlights": [
      {
        "x": 701.0,
        "y": 142.0,
        "width": 3800.0,
        "height": 530.0
      }
    ]
  },
  {
    "title": "Support Services Platform",
    "speechTitle": "Support Services Platform",
    "description": "Support and maintenance services",
    "speechDescription": "The Support Services Platform provides comprehensive support and maintenance services for the enterprise platform. It includes Audit Service, Backup Service, Monitoring Service, and Reporting Service components that ensure system reliability, compliance, data protection, and comprehensive support for optimal platform operations.",
    "icon": "monitoring",
    "position": {
      "x": 700,
      "y": 10060
    },
    "highlights": [
      {
        "x": 681.0,
        "y": 10042.0,
        "width": 3150.0,
        "height": 1530.0
      }
    ]
  },

  // ========================================
  // WORKFLOW PHASES (4 steps)
  // ========================================
  {
    "title": "User Interaction Workflow",
    "speechTitle": "User Interaction Workflow",
    "description": "Complete user interaction and authentication flow",
    "speechDescription": "The User Interaction Workflow demonstrates the complete flow from user authentication through personalized dashboard access. Users authenticate through Azure AD, access the unified Angular Portal, and interact with various enterprise applications through a seamless, secure, and personalized experience.",
    "icon": "user",
    "position": {
      "x": 0,
      "y": 0
    },
    "highlights": [
      {
        "x": 735,
        "y": 176,
        "width": 3800,
        "height": 530
      },
      {
        "x": 50,
        "y": 1170,
        "width": 4550,
        "height": 550
      }
    ],
    "workflow": {
      "phase": "User Interaction",
      "description": "User authentication and portal access",
      "components": [
        "bat_employee",
        "system_admin",
        "business_analyst",
        "angular_portal",
        "mobile_pwa",
        "admin_dashboard",
        "analytics_dashboard"
      ]
    }
  },
  {
    "title": "Business Logic Processing",
    "speechTitle": "Business Logic Processing",
    "description": "Core business services and microservices coordination",
    "speechDescription": "The Business Logic Processing workflow demonstrates how core business services coordinate to deliver enterprise functionality. The Saga Orchestrator manages distributed transactions, while Authentication, IT Service Management, Analytics, Integration, and Notification services work together to provide comprehensive business capabilities.",
    "icon": "saga orchestrator",
    "position": {
      "x": 0,
      "y": 0
    },
    "highlights": [
      {
        "x": 4365,
        "y": 4126,
        "width": 3200,
        "height": 3680
      },
      {
        "x": 1870,
        "y": 2200,
        "width": 770,
        "height": 2500
      }
    ],
    "workflow": {
      "phase": "Business Logic",
      "description": "Core business services coordination",
      "components": [
        "auth_service",
        "it_service",
        "analytics_service",
        "integration_service",
        "notification_service",
        "saga_orchestrator",
        "hr_service"
      ]
    }
  },
  {
    "title": "Data Processing & Analytics",
    "speechTitle": "Data Processing and Analytics",
    "description": "Real-time data processing and business intelligence",
    "speechDescription": "The Data Processing and Analytics workflow demonstrates how the platform processes data in real-time and generates business intelligence. Stream Analytics processes data streams, Azure Functions handle serverless processing, and Power BI provides comprehensive business intelligence and reporting capabilities.",
    "icon": "azure stream analytics",
    "position": {
      "x": 0,
      "y": 0
    },
    "highlights": [
      {
        "x": 10065,
        "y": 8146,
        "width": 1820,
        "height": 2500
      },
      {
        "x": 15530,
        "y": 7150,
        "width": 760,
        "height": 3560
      }
    ],
    "workflow": {
      "phase": "Data Processing",
      "description": "Real-time data processing and analytics",
      "components": [
        "stream_analytics",
        "azure_functions",
        "power_bi",
        "ml_platform",
        "azure_monitor",
        "app_insights"
      ]
    }
  },
  {
    "title": "Data Persistence & Storage",
    "speechTitle": "Data Persistence and Storage",
    "description": "Comprehensive data storage and retrieval",
    "speechDescription": "The Data Persistence and Storage workflow demonstrates how the platform manages data across multiple storage systems. Azure SQL Database handles relational data, Cosmos DB manages NoSQL data, Data Lake Storage provides big data capabilities, and Redis Cache ensures high-performance data access.",
    "icon": "azure sql database",
    "position": {
      "x": 0,
      "y": 0
    },
    "highlights": [
      {
        "x": 15531.0,
        "y": 11002.0,
        "width": 4580.0,
        "height": 550.0
      }
    ],
    "workflow": {
      "phase": "Data Persistence",
      "description": "Data storage and retrieval",
      "components": [
        "sql_database",
        "cosmos_db",
        "data_lake_storage",
        "redis_cache"
      ]
    }
  },

  // ========================================
  // FINAL ARCHITECTURE OVERVIEW
  // ========================================
  {
    "title": "Complete Enterprise Architecture",
    "speechTitle": "Complete Enterprise Architecture",
    "description": "Full enterprise microservices platform overview",
    "speechDescription": "This complete enterprise architecture represents the culmination of comprehensive microservices design, integrating 41 individual components across 9 major architectural groups. The platform provides unified access to 8+ external enterprise systems, delivering a state-of-the-art solution that revolutionizes British American Tobacco's internal operations with modern cloud-native technologies, event-driven architecture, and comprehensive business intelligence capabilities.",
    "icon": "architecture.png",
    "position": {
      "x": 0,
      "y": 0
    },
    "highlights": [
      {
        "x": -20,
        "y": -20,
        "width": 27681,
        "height": 11856
      }
    ]
  }
];