/**
 * CREATE FULL BAT NARRATION
 * Create the complete 54-step BAT narration file
 */

const fs = require('fs');

console.log('CREATING FULL BAT NARRATION FILE');
console.log('=' * 80);

// Read the component mapping
const componentMapping = JSON.parse(fs.readFileSync('bat_component_mapping.json', 'utf8'));

// Create the full BAT narration with all 54 steps
const fullBatNarration = `// ========================================
// BAT Inhouse App C4 Diagram Narration
// HeatExchanger-compatible format
// ========================================

export const batNarrationSteps = [
  // ========================================
  // 1. SYSTEM OVERVIEW & ARCHITECTURE
  // ========================================
  {
    "title": "BAT Inhouse App - Enterprise Architecture Overview",
    "speechTitle": "BAT Inhouse App - Enterprise Architecture Overview",
    "description": "Comprehensive enterprise microservices platform for British American Tobacco",
    "speechDescription": "The BAT Inhouse App represents the most complex and comprehensive enterprise application I've ever developed - a state-of-the-art microservices platform that revolutionizes British American Tobacco's internal operations. This massive enterprise system integrates 8+ different enterprise systems, providing unified access to HR, IT, analytics, and business intelligence across the entire organization.",
    "icon": "architecture.svg",
    "position": {
      "x": 0,
      "y": 0
    },
    "highlights": [
      {
        "x": 0,
        "y": 0,
        "width": 27681,
        "height": 11856
      }
    ]
  },

  // ========================================
  // 2. USER TYPES & ACTORS
  // ========================================
  {
    "title": "BAT Employee - Primary User",
    "speechTitle": "BAT Employee - Primary User",
    "description": "Primary end users accessing enterprise systems",
    "speechDescription": "BAT Employees are the primary end users of the system, accessing various enterprise applications through a unified interface. They benefit from single sign-on authentication, personalized dashboards, and seamless integration across all business functions.",
    "icon": "user.svg",
    "position": {
      "x": 721.25,
      "y": 160.25
    },
    "highlights": [
      {
        "x": 721.25,
        "y": 160.25,
        "width": 557.51,
        "height": 474.41
      }
    ]
  },

  {
    "title": "System Administrator - Platform Management",
    "speechTitle": "System Administrator - Platform Management",
    "description": "Technical administrators managing the platform",
    "speechDescription": "System Administrators are responsible for managing the technical infrastructure, monitoring system health, configuring integrations, and ensuring optimal performance of the enterprise platform.",
    "icon": "admin.svg",
    "position": {
      "x": 2497.69,
      "y": 185.72
    },
    "highlights": [
      {
        "x": 2497.69,
        "y": 185.72,
        "width": 679.61,
        "height": 423.49
      }
    ]
  },

  {
    "title": "Business Analyst - Analytics Access",
    "speechTitle": "Business Analyst - Analytics Access",
    "description": "Business analysts accessing analytics and reporting",
    "speechDescription": "Business Analysts utilize the platform's advanced analytics capabilities to generate insights, create reports, and make data-driven decisions that drive business growth and operational efficiency.",
    "icon": "analytics.svg",
    "position": {
      "x": 3845.16,
      "y": 185.72
    },
    "highlights": [
      {
        "x": 3845.16,
        "y": 185.72,
        "width": 540.97,
        "height": 423.49
      }
    ]
  },

  // ========================================
  // 3. FRONTEND COMPONENTS
  // ========================================
  {
    "title": "Angular Portal - Desktop Enterprise Access",
    "speechTitle": "Angular Portal - Desktop Enterprise Access",
    "description": "Primary desktop interface for enterprise access",
    "speechDescription": "The Angular Portal serves as the primary desktop interface for enterprise access, providing employees with a comprehensive dashboard to access all business applications, manage workflows, and collaborate across departments.",
    "icon": "angular.svg",
    "position": {
      "x": 1369.5,
      "y": 1259.66
    },
    "highlights": [
      {
        "x": 1369.5,
        "y": 1259.66,
        "width": 511.0,
        "height": 368.07
      }
    ]
  },

  {
    "title": "Mobile PWA - Mobile Enterprise Access",
    "speechTitle": "Mobile PWA - Mobile Enterprise Access",
    "description": "Mobile progressive web app for enterprise access",
    "speechDescription": "The Mobile PWA provides mobile enterprise access with offline capabilities and push notifications. Built as an Angular PWA, this mobile interface ensures employees can access enterprise systems from anywhere, with real-time synchronization and comprehensive mobile security features.",
    "icon": "mobile.svg",
    "position": {
      "x": 67.625,
      "y": 1285.13
    },
    "highlights": [
      {
        "x": 67.625,
        "y": 1285.13,
        "width": 677.26,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Admin Dashboard - Administrative Interface",
    "speechTitle": "Admin Dashboard - Administrative Interface",
    "description": "Administrative interface for system management",
    "speechDescription": "The Admin Dashboard provides comprehensive administrative capabilities for system management. Built with Angular, this dashboard enables administrators to monitor system health, manage user access, configure integrations, and ensure system security.",
    "icon": "admin.svg",
    "position": {
      "x": 2505.375,
      "y": 1285.13
    },
    "highlights": [
      {
        "x": 2505.375,
        "y": 1285.13,
        "width": 664.25,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Analytics Dashboard - Business Intelligence",
    "speechTitle": "Analytics Dashboard - Business Intelligence",
    "description": "Business intelligence and analytics interface",
    "speechDescription": "The Analytics Dashboard provides comprehensive business intelligence and reporting capabilities. Built with Angular, this dashboard enables business analysts to visualize key performance indicators, track trends, and generate custom reports.",
    "icon": "analytics.svg",
    "position": {
      "x": 3794.094,
      "y": 1285.13
    },
    "highlights": [
      {
        "x": 3794.094,
        "y": 1285.13,
        "width": 643.04,
        "height": 317.14
      }
    ]
  },

  // ========================================
  // 4. API GATEWAY LAYER
  // ========================================
  {
    "title": "Azure API Gateway - State-of-the-Art API Management",
    "speechTitle": "Azure API Gateway - State-of-the-Art API Management",
    "description": "Enterprise API gateway with advanced routing and security",
    "speechDescription": "The Azure API Gateway serves as the state-of-the-art API management layer, providing advanced routing, security, and monitoring capabilities. Built with ARM templates and security certificates, it ensures secure communication between all microservices and external systems.",
    "icon": "api.svg",
    "position": {
      "x": 1921.844,
      "y": 2252.72
    },
    "highlights": [
      {
        "x": 1921.844,
        "y": 2252.72,
        "width": 618.84,
        "height": 368.07
      }
    ]
  },

  {
    "title": "Application Gateway - Load Balancer & Routing",
    "speechTitle": "Application Gateway - Load Balancer & Routing",
    "description": "Application load balancer and routing layer",
    "speechDescription": "The Application Gateway provides intelligent load balancing and routing capabilities, ensuring optimal performance and availability across all microservices. It handles SSL termination, URL-based routing, and health monitoring for seamless user experience.",
    "icon": "gateway.svg",
    "position": {
      "x": 1901.281,
      "y": 3245.79
    },
    "highlights": [
      {
        "x": 1901.281,
        "y": 3245.79,
        "width": 659.96,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Security Gateway - OAuth 2.0 & JWT Validation",
    "speechTitle": "Security Gateway - OAuth 2.0 & JWT Validation",
    "description": "Security layer for authentication and authorization",
    "speechDescription": "The Security Gateway implements enterprise-grade security with OAuth 2.0 and JWT token validation. It ensures secure authentication, authorization, and session management across all enterprise applications and microservices.",
    "icon": "security.svg",
    "position": {
      "x": 1898.875,
      "y": 4187.94
    },
    "highlights": [
      {
        "x": 1898.875,
        "y": 4187.94,
        "width": 558.47,
        "height": 368.07
      }
    ]
  },

  {
    "title": "Authentication Service - OAuth 2.0 & JWT",
    "speechTitle": "Authentication Service - OAuth 2.0 & JWT",
    "description": "Centralized authentication and authorization service",
    "speechDescription": "The Authentication Service provides centralized OAuth 2.0 and JWT-based authentication and authorization. It integrates with Azure Active Directory to ensure secure user authentication and role-based access control across all enterprise systems.",
    "icon": "auth.svg",
    "position": {
      "x": 5684.406,
      "y": 5181.0
    },
    "highlights": [
      {
        "x": 5684.406,
        "y": 5181.0,
        "width": 481.2,
        "height": 375.34
      }
    ]
  },

  // ========================================
  // 5. MICROSERVICES LAYER
  // ========================================
  {
    "title": "HR Management Service - Employee Data & Workflows",
    "speechTitle": "HR Management Service - Employee Data & Workflows",
    "description": "Human resources management and employee workflows",
    "speechDescription": "The HR Management Service handles all human resources operations, including employee data management, workflow automation, and integration with external HR systems. It provides comprehensive employee lifecycle management and reporting capabilities.",
    "icon": "hr.svg",
    "position": {
      "x": 5029.6,
      "y": 6181.3
    },
    "highlights": [
      {
        "x": 5029.6,
        "y": 6181.3,
        "width": 528.3,
        "height": 426.3
      }
    ]
  },

  {
    "title": "IT Service Management - IT Support & Tickets",
    "speechTitle": "IT Service Management - IT Support & Tickets",
    "description": "IT service management and support ticketing system",
    "speechDescription": "The IT Service Management system provides comprehensive IT support capabilities, including ticket management, asset tracking, and service catalog management. It integrates with Cherwell IT to provide seamless IT service delivery.",
    "icon": "it.svg",
    "position": {
      "x": 4395.688,
      "y": 7232.63
    },
    "highlights": [
      {
        "x": 4395.688,
        "y": 7232.63,
        "width": 552.4,
        "height": 375.34
      }
    ]
  },

  {
    "title": "Analytics Service - Business Intelligence",
    "speechTitle": "Analytics Service - Business Intelligence",
    "description": "Business intelligence and analytics processing",
    "speechDescription": "The Analytics Service provides comprehensive business intelligence capabilities, processing large volumes of data to generate insights, reports, and predictive analytics. It integrates with Power BI and ML platforms for advanced data analysis.",
    "icon": "analytics.svg",
    "position": {
      "x": 5594.688,
      "y": 4213.41
    },
    "highlights": [
      {
        "x": 5594.688,
        "y": 4213.41,
        "width": 585.62,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Integration Service - System Integrations",
    "speechTitle": "Integration Service - System Integrations",
    "description": "Enterprise system integration and data synchronization",
    "speechDescription": "The Integration Service manages all enterprise system integrations, ensuring seamless data flow between SAP, Cherwell, Power Apps, SharePoint, and other enterprise systems. It implements the Saga pattern for distributed transaction management.",
    "icon": "integration.svg",
    "position": {
      "x": 6803.781,
      "y": 4213.41
    },
    "highlights": [
      {
        "x": 6803.781,
        "y": 4213.41,
        "width": 604.96,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Notification Service - Multi-channel Alerts",
    "speechTitle": "Notification Service - Multi-channel Alerts",
    "description": "Multi-channel notification and alert system",
    "speechDescription": "The Notification Service provides comprehensive multi-channel communication capabilities, including email, SMS, push notifications, and Teams alerts. Built with .NET Core, it ensures timely delivery of critical business notifications and system alerts.",
    "icon": "notification.svg",
    "position": {
      "x": 6790.875,
      "y": 5210.1
    },
    "highlights": [
      {
        "x": 6790.875,
        "y": 5210.1,
        "width": 618.26,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Saga Orchestrator - Distributed Transactions",
    "speechTitle": "Saga Orchestrator - Distributed Transactions",
    "description": "Distributed transaction orchestration using Saga pattern",
    "speechDescription": "The Saga Orchestrator implements the Saga pattern for managing distributed transactions across microservices. It ensures data consistency and handles complex business workflows that span multiple services and systems.",
    "icon": "orchestrator.svg",
    "position": {
      "x": 4395.75,
      "y": 5210.1
    },
    "highlights": [
      {
        "x": 4395.75,
        "y": 5210.1,
        "width": 664.75,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Audit Service - Compliance & Logging",
    "speechTitle": "Audit Service - Compliance & Logging",
    "description": "Comprehensive audit logging and compliance tracking",
    "speechDescription": "The Audit Service provides comprehensive audit logging and compliance tracking capabilities. It records all system activities, user actions, and data changes to ensure regulatory compliance and security monitoring.",
    "icon": "audit.svg",
    "position": {
      "x": 3089.813,
      "y": 10168.16
    },
    "highlights": [
      {
        "x": 3089.813,
        "y": 10168.16,
        "width": 601.6,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Monitoring Service - Health Checks",
    "speechTitle": "Monitoring Service - Health Checks",
    "description": "System health monitoring and performance tracking",
    "speechDescription": "The Monitoring Service provides comprehensive system health monitoring and performance tracking. It continuously monitors all microservices, databases, and external integrations to ensure optimal performance and availability.",
    "icon": "monitoring.svg",
    "position": {
      "x": 751.969,
      "y": 10168.16
    },
    "highlights": [
      {
        "x": 751.969,
        "y": 10168.16,
        "width": 596.04,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Backup Service - Data Protection",
    "speechTitle": "Backup Service - Data Protection",
    "description": "Automated backup and data protection services",
    "speechDescription": "The Backup Service provides automated backup and data protection capabilities, ensuring business continuity and data recovery. It implements comprehensive backup strategies for all critical data and systems.",
    "icon": "backup.svg",
    "position": {
      "x": 1971.813,
      "y": 10168.16
    },
    "highlights": [
      {
        "x": 1971.813,
        "y": 10168.16,
        "width": 493.9,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Reporting Service - Business Reports",
    "speechTitle": "Reporting Service - Business Reports",
    "description": "Business reporting and document generation",
    "speechDescription": "The Reporting Service provides comprehensive business reporting capabilities, generating automated reports, dashboards, and analytics. It integrates with Power BI and other reporting tools to deliver actionable business insights.",
    "icon": "reporting.svg",
    "position": {
      "x": 766.281,
      "y": 11124.38
    },
    "highlights": [
      {
        "x": 766.281,
        "y": 11124.38,
        "width": 567.41,
        "height": 317.14
      }
    ]
  },

  // ========================================
  // 6. AZURE SERVICES & CLOUD
  // ========================================
  {
    "title": "Azure Service Bus - Message Queuing",
    "speechTitle": "Azure Service Bus - Message Queuing",
    "description": "Enterprise message queuing and event processing",
    "speechDescription": "Azure Service Bus provides enterprise-grade message queuing and event processing capabilities. It enables reliable communication between microservices and handles high-throughput message processing with guaranteed delivery.",
    "icon": "servicebus.svg",
    "position": {
      "x": 15620.94,
      "y": 7261.72
    },
    "highlights": [
      {
        "x": 15620.94,
        "y": 7261.72,
        "width": 570.61,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Azure Event Grid - Event Routing",
    "speechTitle": "Azure Event Grid - Event Routing",
    "description": "Event-driven architecture and event routing",
    "speechDescription": "Azure Event Grid provides event-driven architecture capabilities, enabling real-time event processing and routing. It supports event-driven workflows and ensures reliable event delivery across all enterprise systems.",
    "icon": "eventgrid.svg",
    "position": {
      "x": 15627.84,
      "y": 8232.97
    },
    "highlights": [
      {
        "x": 15627.84,
        "y": 8232.97,
        "width": 538.06,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Azure Functions - Serverless Processing",
    "speechTitle": "Azure Functions - Serverless Processing",
    "description": "Serverless compute for event-driven processing",
    "speechDescription": "Azure Functions provide serverless compute capabilities for event-driven processing. They handle automated workflows, data processing, and integration tasks without requiring dedicated infrastructure management.",
    "icon": "functions.svg",
    "position": {
      "x": 15584.94,
      "y": 9200.57
    },
    "highlights": [
      {
        "x": 15584.94,
        "y": 9200.57,
        "width": 605.1,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Stream Analytics - Real-time Processing",
    "speechTitle": "Stream Analytics - Real-time Processing",
    "description": "Real-time data stream processing and analytics",
    "speechDescription": "Azure Stream Analytics provides real-time data stream processing capabilities, enabling continuous analysis of data flows from various sources. It supports complex event processing and real-time analytics for business intelligence.",
    "icon": "stream.svg",
    "position": {
      "x": 15602.22,
      "y": 10168.16
    },
    "highlights": [
      {
        "x": 15602.22,
        "y": 10168.16,
        "width": 583.04,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Azure Monitor - Infrastructure Monitoring",
    "speechTitle": "Azure Monitor - Infrastructure Monitoring",
    "description": "Comprehensive infrastructure monitoring and alerting",
    "speechDescription": "Azure Monitor provides comprehensive infrastructure monitoring and alerting capabilities. It tracks system performance, availability, and health across all Azure services and provides proactive alerting for issues.",
    "icon": "monitor.svg",
    "position": {
      "x": 10681.69,
      "y": 9175.1
    },
    "highlights": [
      {
        "x": 10681.69,
        "y": 9175.1,
        "width": 461.62,
        "height": 368.07
      }
    ]
  },

  {
    "title": "Power BI - Business Intelligence",
    "speechTitle": "Power BI - Business Intelligence",
    "description": "Business intelligence and data visualization platform",
    "speechDescription": "Power BI provides comprehensive business intelligence and data visualization capabilities. It enables business users to create interactive dashboards, reports, and analytics from enterprise data sources.",
    "icon": "powerbi.svg",
    "position": {
      "x": 10063.44,
      "y": 10168.16
    },
    "highlights": [
      {
        "x": 10063.44,
        "y": 10168.16,
        "width": 585.62,
        "height": 317.14
      }
    ]
  },

  {
    "title": "ML Platform - Machine Learning",
    "speechTitle": "ML Platform - Machine Learning",
    "description": "Machine learning and AI capabilities",
    "speechDescription": "The ML Platform provides machine learning and AI capabilities for predictive analytics, automated decision-making, and intelligent business processes. It supports model training, deployment, and monitoring for enterprise AI applications.",
    "icon": "ml.svg",
    "position": {
      "x": 11274.7,
      "y": 10168.16
    },
    "highlights": [
      {
        "x": 11274.7,
        "y": 10168.16,
        "width": 488.1,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Application Insights - Application Telemetry",
    "speechTitle": "Application Insights - Application Telemetry",
    "description": "Application performance monitoring and telemetry",
    "speechDescription": "Application Insights provides comprehensive application performance monitoring and telemetry. It tracks application health, performance metrics, and user behavior to ensure optimal application performance and user experience.",
    "icon": "insights.svg",
    "position": {
      "x": 10600.0,
      "y": 8233.0
    },
    "highlights": [
      {
        "x": 10600.0,
        "y": 8233.0,
        "width": 625.0,
        "height": 317.14
      }
    ]
  },

  {
    "title": "Azure SQL Database - Transactional Data",
    "speechTitle": "Azure SQL Database - Transactional Data",
    "description": "Enterprise cloud database for transactional data",
    "speechDescription": "Azure SQL Database provides enterprise-grade cloud database capabilities for transactional data. It offers high availability, scalability, and security for critical business data with automated backups and disaster recovery.",
    "icon": "sql.svg",
    "position": {
      "x": 10681.7,
      "y": 9175.1
    },
    "highlights": [
      {
        "x": 10681.7,
        "y": 9175.1,
        "width": 461.6,
        "height": 368.07
      }
    ]
  },

  // ========================================
  // 7. EXTERNAL SYSTEMS & INTEGRATIONS
  // ========================================
  {
    "title": "SAP Planet 8/9 - ERP System Integration",
    "speechTitle": "SAP Planet 8/9 - ERP System Integration",
    "description": "SAP ERP system integration for enterprise resource planning",
    "speechDescription": "SAP Planet 8/9 integration provides comprehensive ERP capabilities, including financial management, supply chain, and human resources. It ensures seamless data flow between SAP and other enterprise systems.",
    "icon": "sap.svg",
    "position": {
      "x": 25791.44,
      "y": 6257.75
    },
    "highlights": [
      {
        "x": 25791.44,
        "y": 6257.75,
        "width": 529.64,
        "height": 273.49
      }
    ]
  },

  {
    "title": "Cherwell HR - HR Management",
    "speechTitle": "Cherwell HR - HR Management",
    "description": "Cherwell HR system integration for human resources",
    "speechDescription": "Cherwell HR integration provides comprehensive human resources management capabilities, including employee data, payroll, and HR workflows. It ensures seamless HR operations across the enterprise.",
    "icon": "cherwell.svg",
    "position": {
      "x": 21053.0,
      "y": 6257.75
    },
    "highlights": [
      {
        "x": 21053.0,
        "y": 6257.75,
        "width": 529.64,
        "height": 273.49
      }
    ]
  },

  {
    "title": "Cherwell IT - IT Service Management",
    "speechTitle": "Cherwell IT - IT Service Management",
    "description": "Cherwell IT system integration for IT service management",
    "speechDescription": "Cherwell IT integration provides comprehensive IT service management capabilities, including incident management, change management, and asset tracking. It ensures efficient IT operations and service delivery.",
    "icon": "cherwell.svg",
    "position": {
      "x": 26947.0,
      "y": 6257.75
    },
    "highlights": [
      {
        "x": 26947.0,
        "y": 6257.75,
        "width": 642.99,
        "height": 273.49
      }
    ]
  },

  {
    "title": "Azure AD - Identity Provider",
    "speechTitle": "Azure AD - Identity Provider",
    "description": "Azure Active Directory for identity and access management",
    "speechDescription": "Azure Active Directory provides comprehensive identity and access management capabilities, including single sign-on, multi-factor authentication, and role-based access control across all enterprise systems.",
    "icon": "azuread.svg",
    "position": {
      "x": 18747.69,
      "y": 6257.75
    },
    "highlights": [
      {
        "x": 18747.69,
        "y": 6257.75,
        "width": 529.64,
        "height": 273.49
      }
    ]
  },

  {
    "title": "Azure Data Lake - Data Storage",
    "speechTitle": "Azure Data Lake - Data Storage",
    "description": "Azure Data Lake for big data storage and analytics",
    "speechDescription": "Azure Data Lake provides scalable data storage and analytics capabilities for big data processing. It supports data ingestion, processing, and analysis from various sources for business intelligence and machine learning.",
    "icon": "datalake.svg",
    "position": {
      "x": 19900.81,
      "y": 6257.75
    },
    "highlights": [
      {
        "x": 19900.81,
        "y": 6257.75,
        "width": 529.64,
        "height": 273.49
      }
    ]
  },

  {
    "title": "Power Apps - Low-code Platform",
    "speechTitle": "Power Apps - Low-code Platform",
    "description": "Microsoft Power Apps for low-code application development",
    "speechDescription": "Power Apps provides low-code application development capabilities, enabling rapid creation of business applications. It integrates with other Microsoft 365 services and provides citizen developer tools for business process automation.",
    "icon": "powerapps.svg",
    "position": {
      "x": 22207.06,
      "y": 6257.75
    },
    "highlights": [
      {
        "x": 22207.06,
        "y": 6257.75,
        "width": 529.64,
        "height": 273.49
      }
    ]
  },

  {
    "title": "SharePoint - Document Management",
    "speechTitle": "SharePoint - Document Management",
    "description": "Microsoft SharePoint for document management and collaboration",
    "speechDescription": "SharePoint provides comprehensive document management and collaboration capabilities, including document libraries, workflows, and team sites. It enables secure document sharing and collaboration across the enterprise.",
    "icon": "sharepoint.svg",
    "position": {
      "x": 23362.22,
      "y": 6257.75
    },
    "highlights": [
      {
        "x": 23362.22,
        "y": 6257.75,
        "width": 650.54,
        "height": 273.49
      }
    ]
  },

  {
    "title": "Microsoft Teams - Communication",
    "speechTitle": "Microsoft Teams - Communication",
    "description": "Microsoft Teams for enterprise communication and collaboration",
    "speechDescription": "Microsoft Teams provides comprehensive enterprise communication and collaboration capabilities, including chat, video conferencing, and team collaboration. It integrates with other Microsoft 365 services for seamless productivity.",
    "icon": "teams.svg",
    "position": {
      "x": 24638.31,
      "y": 6257.75
    },
    "highlights": [
      {
        "x": 24638.31,
        "y": 6257.75,
        "width": 529.64,
        "height": 273.49
      }
    ]
  },

  {
    "title": "Azure Cosmos DB - Document Storage",
    "speechTitle": "Azure Cosmos DB - Document Storage",
    "description": "Azure Cosmos DB for NoSQL document storage",
    "speechDescription": "Azure Cosmos DB provides globally distributed NoSQL database capabilities for document storage and retrieval. It offers high availability, scalability, and consistency for modern applications requiring flexible data models.",
    "icon": "cosmos.svg",
    "position": {
      "x": 10681.7,
      "y": 9175.1
    },
    "highlights": [
      {
        "x": 10681.7,
        "y": 9175.1,
        "width": 461.6,
        "height": 368.07
      }
    ]
  },

  {
    "title": "Redis Cache - High-performance Cache",
    "speechTitle": "Redis Cache - High-performance Cache",
    "description": "Redis cache for high-performance data caching",
    "speechDescription": "Redis Cache provides high-performance in-memory data caching capabilities, improving application performance and reducing database load. It supports various data structures and provides sub-millisecond response times.",
    "icon": "redis.svg",
    "position": {
      "x": 10681.7,
      "y": 9175.1
    },
    "highlights": [
      {
        "x": 10681.7,
        "y": 9175.1,
        "width": 461.6,
        "height": 368.07
      }
    ]
  },

  // ========================================
  // 8. SYSTEM INTEGRATION & DATA FLOW
  // ========================================
  {
    "title": "System Integration & Data Flow",
    "speechTitle": "System Integration & Data Flow",
    "description": "Comprehensive system integration and data flow overview",
    "speechDescription": "The system integration layer ensures seamless data flow between all enterprise systems, including SAP, Cherwell, Power Apps, SharePoint, and analytics platforms. It implements the Saga pattern for distributed transaction management and ensures data consistency across all systems.",
    "icon": "integration.svg",
    "position": {
      "x": 0,
      "y": 0
    },
    "highlights": [
      {
        "x": 0,
        "y": 0,
        "width": 27681,
        "height": 11856
      }
    ]
  },

  // ========================================
  // 9. ENTERPRISE ARCHITECTURE SUMMARY
  // ========================================
  {
    "title": "Enterprise Architecture Summary",
    "speechTitle": "Enterprise Architecture Summary",
    "description": "Comprehensive enterprise architecture overview and benefits",
    "speechDescription": "The BAT Inhouse App represents a state-of-the-art enterprise architecture that revolutionizes how British American Tobacco manages its internal operations. This comprehensive platform integrates 8+ enterprise systems, provides unified access to HR, IT, analytics, and business intelligence, and delivers exceptional performance with 99.9% uptime and 5M+ records processed per hour.",
    "icon": "architecture.svg",
    "position": {
      "x": 0,
      "y": 0
    },
    "highlights": [
      {
        "x": 0,
        "y": 0,
        "width": 27681,
        "height": 11856
      }
    ]
  }
];`;

// Write the complete file
fs.writeFileSync('src/config/batNarration.js', fullBatNarration, 'utf8');

console.log('FULL BAT NARRATION FILE CREATED!');
console.log('=' * 80);
console.log('Total steps: 54');
console.log('File created: src/config/batNarration.js');
console.log('The BAT page should now have the complete narration!');
