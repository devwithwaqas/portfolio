/**
 * AirAsia ID90 - Architecture Narration Steps
 * Workflow and layer highlights fixed: 2025-10-22T06:23:28.794Z
 */

export const airasiaNarrationSteps = [
  {
    "title": "Web Application",
    "speechTitle": "Web Application",
    "description": "Angular-based responsive web application for employee booking",
    "speechDescription": "The Web Application serves as our primary user interface, meticulously crafted with Angular 15 and TypeScript for modern development practices. It delivers a responsive Progressive Web App experience that operates seamlessly across all devices and platforms. Employees can book flights in real-time with live flight data integration, and the system is fully integrated with Google Single Sign-On for secure employee authentication. The interface includes personalized dashboards, complete booking history management, and intuitive navigation for optimal user experience.",
    "icon": "Angular.svg",
    "position": {
      "x": 309,
      "y": 351
    },
    "highlights": [
      {
        "x": 244,
        "y": 483.5,
        "width": 233,
        "height": 126.9
      }
    ]
  },
  {
    "title": "Mobile PWA",
    "speechTitle": "Mobile Progressive Web App",
    "description": "Progressive Web App for mobile booking experience",
    "speechDescription": "The Mobile Progressive Web App provides a native-like mobile experience using cutting-edge Progressive Web App technology. It includes comprehensive offline capabilities for viewing booking history, push notifications for booking confirmations and updates, and is specifically optimized for mobile-first booking workflows. Built from the same codebase as the web application, ensuring complete consistency across all platforms while maintaining performance and user experience standards.",
    "icon": "mobile.png",
    "position": {
      "x": 750,
      "y": 351
    },
    "highlights": [
      {
        "x": 726.5,
        "y": 483.5,
        "width": 205.7,
        "height": 126.9
      }
    ]
  },
  {
    "title": "Admin Dashboard",
    "speechTitle": "Admin Dashboard",
    "description": "Administrative interface for system management",
    "speechDescription": "The Admin Dashboard provides a comprehensive administrative interface for complete system management and oversight. It enables real-time monitoring of booking patterns and system health, includes advanced employee management and access control features, and offers an analytics dashboard with detailed booking trends and insights. This ensures administrators have full control and visibility over the entire ID90 system with powerful management capabilities.",
    "icon": "portal.png",
    "position": {
      "x": 1190,
      "y": 351
    },
    "highlights": [
      {
        "x": 1182.7,
        "y": 483.5,
        "width": 225.7,
        "height": 126.9
      }
    ]
  },
  {
    "title": "Azure API Management",
    "speechTitle": "Azure Application Programming Interface Management",
    "description": "Edge gateway for authentication, routing, and API management",
    "speechDescription": "Azure Application Programming Interface Management serves as our enterprise-grade API gateway, providing sophisticated rate limiting, throttling, and comprehensive system protection. It handles API versioning, documentation management, request transformation, and enforces security policies with advanced features. This ensures consistent, secure access to all backend services while maintaining high performance and reliability standards.",
    "icon": "api gateway.svg",
    "position": {
      "x": 750,
      "y": 699
    },
    "highlights": [
      {
        "x": 720.9,
        "y": 860.4,
        "width": 216.8,
        "height": 126.9
      }
    ]
  },
  {
    "title": "Application Gateway",
    "speechTitle": "Application Gateway",
    "description": "Load balancer and SSL termination point",
    "speechDescription": "Load balancer and Secure Sockets Layer termination point",
    "icon": "gateway.png",
    "position": {
      "x": 750,
      "y": 1046
    },
    "highlights": [
      {
        "x": 742.2,
        "y": 1237.2,
        "width": 174.1,
        "height": 126.9
      }
    ]
  },
  {
    "title": "Authentication Service",
    "speechTitle": "Authentication Service",
    "description": "JWT-based authentication with Google SSO integration",
    "speechDescription": "The Authentication Service provides robust JSON Web Token-based authentication with seamless Google Single Sign-On integration. It implements comprehensive role-based access control for different employee types, manages sessions and token refresh mechanisms, and includes extensive audit logging for security compliance. This ensures secure and reliable authentication across the entire system.",
    "icon": "authentication and authorization.png",
    "position": {
      "x": 209,
      "y": 1394
    },
    "highlights": [
      {
        "x": 176,
        "y": 1614.1,
        "width": 171.5,
        "height": 126.9
      }
    ]
  },
  {
    "speechDescription": "The Booking Service is the core business logic engine that handles all employee flight booking operations. It processes complex discount calculations based on employee eligibility, manages booking confirmations and cancellations, integrates with external payment systems, and enforces business rules for ID90 discounts. The service coordinates with Flight Service for availability, Employee Service for validation, and Notification Service for confirmations, ensuring seamless end-to-end booking workflows.",
    "icon": "services.png",
    "title": "Booking Service",
    "description": "Core booking logic and discount calculation engine",
    "position": {
      "x": 626,
      "y": 1394
    },
    "highlights": [
      {
        "x": 597.3,
        "y": 1614.1,
        "width": 206.5,
        "height": 126.9
      }
    ]
  },
  {
    "speechDescription": "The Flight Data Service manages comprehensive flight availability and real-time updates from AirAsia flight systems. It provides live flight status and schedule information, handles seat inventory management, processes fare calculations with dynamic pricing, and maintains flight data synchronization. The service integrates with Redis Cache for performance optimization and AirAsia Flight Systems for real-time data, ensuring employees have access to the most current and accurate flight information.",
    "icon": "aviation.png",
    "title": "Flight Data Service",
    "description": "Real-time flight availability and updates",
    "position": {
      "x": 3066,
      "y": 2098
    },
    "highlights": [
      {
        "x": 149,
        "y": 1990.9,
        "width": 180.6,
        "height": 126.9
      }
    ]
  },
  {
    "speechDescription": "The Employee Service manages comprehensive employee validation and profile management for the ID90 system. It validates employee eligibility and employment status, manages employee profiles and preferences, handles role-based access control, and integrates with HR systems for data synchronization. The service ensures accurate employee information and proper access control, supporting the entire booking workflow with employee validation.",
    "icon": "user.png",
    "title": "Employee Service",
    "description": "Employee validation and profile management",
    "position": {
      "x": 619,
      "y": 1742
    },
    "highlights": [
      {
        "x": 579.4,
        "y": 1990.9,
        "width": 224.7,
        "height": 126.9
      }
    ]
  },
  {
    "speechDescription": "The Notification Service orchestrates sophisticated multi-channel communications including Short Message Service, email, and push notifications. It uses advanced template-based messaging, includes comprehensive delivery tracking with retry mechanisms, integrates with Teams for operational alerts, and supports personalized notification preferences. The service ensures reliable and timely communication across all channels for booking confirmations, updates, and system alerts.",
    "icon": "notification service.png",
    "title": "Notification Service",
    "description": "Multi-channel notification orchestration",
    "position": {
      "x": 4094,
      "y": 1742
    },
    "highlights": [
      {
        "x": 4069.4,
        "y": 1990.9,
        "width": 247.3,
        "height": 126.9
      }
    ]
  },
  {
    "speechDescription": "The Analytics Service handles comprehensive real-time data processing and business intelligence for the ID90 system. It processes booking patterns and user behavior analytics, generates detailed reports and insights, provides data visualization capabilities, and supports predictive analytics for business optimization. The service enables data-driven decision making and business intelligence, helping AirAsia optimize their employee travel benefits program.",
    "icon": "analytics.png",
    "title": "Analytics Service",
    "description": "Data processing and business intelligence",
    "position": {
      "x": 4975,
      "y": 1742
    },
    "highlights": [
      {
        "x": 5012.6,
        "y": 1990.9,
        "width": 218.4,
        "height": 126.9
      }
    ]
  },
  {
    "speechDescription": "The Refund Service provides automated refund calculation and processing workflows for employee bookings. It handles complex refund policies and calculations, processes refund requests and approvals, integrates with payment systems for refund processing, and maintains comprehensive refund audit trails. The service ensures accurate and efficient refund management while maintaining compliance with AirAsia policies.",
    "icon": "financial.png",
    "title": "Refund Service",
    "description": "Automated refund processing and chargebacks",
    "position": {
      "x": 4541,
      "y": 1742
    },
    "highlights": [
      {
        "x": 4566.5,
        "y": 1990.9,
        "width": 195.6,
        "height": 126.9
      }
    ]
  },
  {
    "speechDescription": "The Audit Service provides comprehensive audit logging and file storage management for the entire ID90 system. It logs all system activities and user actions, stores audit files and compliance documents, provides audit trail reporting and analysis, and ensures regulatory compliance requirements. The service maintains complete system transparency and compliance for enterprise-grade operations.",
    "icon": "compliance.png",
    "title": "Audit Service",
    "description": "Comprehensive audit logging and file storage",
    "position": {
      "x": 5400,
      "y": 1742
    },
    "highlights": [
      {
        "x": 5481.5,
        "y": 1990.9,
        "width": 175.6,
        "height": 126.9
      }
    ]
  },
  {
    "speechDescription": "Azure Service Bus provides reliable message queuing for our comprehensive event-driven architecture. It ensures message ordering and delivery guarantees, handles dead letter queues for failed messages, and provides a scalable infrastructure for event processing across the entire system. The service enables robust and reliable event-driven communication between all microservices.",
    "icon": "azure service bus.png",
    "title": "Azure Service Bus",
    "description": "Event queueing and message orchestration",
    "position": {
      "x": 2089,
      "y": 2090
    },
    "highlights": [
      {
        "x": 2086.2,
        "y": 2367.8,
        "width": 191.1,
        "height": 126.9
      }
    ]
  },
  {
    "speechDescription": "Event Grid provides intelligent event routing with advanced filtering and transformation capabilities. It routes events to appropriate handlers and services, provides event filtering and transformation, ensures reliable event delivery, and supports custom event schemas. The service enables sophisticated event-driven architecture patterns for real-time system coordination.",
    "icon": "azure-event-grid.png",
    "title": "Event Grid",
    "description": "Event routing and topic management",
    "position": {
      "x": 2084,
      "y": 2438
    },
    "highlights": [
      {
        "x": 2094.5,
        "y": 2744.6,
        "width": 159.6,
        "height": 126.9
      }
    ]
  },
  {
    "speechDescription": "Azure Functions provide serverless event handling with automatic scaling and cost optimization. They process events from Service Bus and Event Grid, handle business logic and data transformations, provide automatic scaling based on demand, and ensure cost-effective serverless computing. The functions enable efficient and scalable event processing for the ID90 system.",
    "icon": "Azure Functions.png",
    "title": "Azure Functions",
    "description": "Serverless event handlers and processing",
    "position": {
      "x": 2080,
      "y": 2785
    },
    "highlights": [
      {
        "x": 2060.8,
        "y": 3121.5,
        "width": 207,
        "height": 126.9
      }
    ]
  },
  {
    "speechDescription": "Stream Analytics processes real-time booking data and generates comprehensive business insights. It analyzes streaming data from various sources, performs real-time aggregations and calculations, generates alerts and notifications, and provides data for business intelligence dashboards. The service enables real-time analytics and decision making for the ID90 system.",
    "icon": "azure-stream-analytics.png",
    "title": "Stream Analytics",
    "description": "Real-time data stream processing",
    "position": {
      "x": 2086,
      "y": 3133
    },
    "highlights": [
      {
        "x": 2060.1,
        "y": 3498.3,
        "width": 226,
        "height": 126.9
      }
    ]
  },
  {
    "title": "Azure SQL Database",
    "speechTitle": "Azure Structured Query Language Database",
    "description": "Primary relational data store",
    "speechDescription": "Azure Structured Query Language Database serves as our primary relational data store with enterprise-grade high availability and automatic failover capabilities. It includes automated backups, point-in-time recovery, performance monitoring, and security features like Always Encrypted and Transparent Data Encryption. This ensures reliable and secure data storage.",
    "icon": "Azure SQL Database.svg",
    "position": {
      "x": 1649,
      "y": 3481
    },
    "highlights": [
      {
        "x": 1629.3,
        "y": 3875.2,
        "width": 182.5,
        "height": 138.1
      }
    ]
  },
  {
    "speechDescription": "Redis provides high-performance caching for flight data and session management. It caches frequently accessed flight information, manages user sessions and authentication tokens, provides real-time data updates, and ensures sub-millisecond response times. The cache significantly improves system performance and user experience for the ID90 booking system.",
    "icon": "Redis.svg",
    "title": "Redis Cache",
    "description": "High-performance caching layer",
    "position": {
      "x": 1245,
      "y": 3481
    },
    "highlights": [
      {
        "x": 1217.1,
        "y": 3875.2,
        "width": 161.8,
        "height": 138.1
      }
    ]
  },
  {
    "speechDescription": "Azure Blob Storage provides cost-effective file and document storage for audit snapshots and system documents. It stores audit files and compliance documents, provides automated lifecycle management for optimal storage costs, and ensures secure file access and retrieval. The storage enables efficient document and file management for the ID90 system.",
    "icon": "azure blob storage.png",
    "title": "Azure Blob Storage",
    "description": "File storage for documents and audit data",
    "position": {
      "x": 2441,
      "y": 3481
    },
    "highlights": [
      {
        "x": 2462.5,
        "y": 3875.2,
        "width": 171.1,
        "height": 138.1
      }
    ]
  },
  {
    "title": "Azure Cosmos DB",
    "speechTitle": "Azure Cosmos Database",
    "description": "NoSQL database for analytics and reporting",
    "speechDescription": "Cosmos Database stores analytics and reporting data with global distribution capabilities. It provides automatic scaling based on demand, supports multiple data models and APIs, ensures global distribution and multi-region support, and integrates with Stream Analytics for real-time data ingestion. This enables scalable and globally distributed analytics.",
    "icon": "cosmos db.png",
    "position": {
      "x": 2048,
      "y": 3481
    },
    "highlights": [
      {
        "x": 2061.5,
        "y": 3875.2,
        "width": 150.6,
        "height": 138.1
      }
    ]
  },
  {
    "speechDescription": "Application Insights provides comprehensive telemetry and performance monitoring across the entire ID90 system. It tracks application performance and user behavior, provides detailed error tracking and diagnostics, generates performance reports and insights, and enables proactive issue detection and resolution. The service ensures optimal system performance and reliability.",
    "icon": "insights.png",
    "title": "Application Insights",
    "description": "Comprehensive application telemetry",
    "position": {
      "x": 2657,
      "y": 2090
    },
    "highlights": [
      {
        "x": 2709.8,
        "y": 2367.8,
        "width": 166.5,
        "height": 126.9
      }
    ]
  },
  {
    "speechDescription": "Azure Monitor tracks infrastructure health and performance metrics comprehensively. It monitors system resources and performance, provides alerting and notification capabilities, generates infrastructure reports and insights, and ensures proactive system management. The service enables comprehensive infrastructure monitoring and management for the ID90 system.",
    "icon": "continuous monitoring.png",
    "title": "Azure Monitor",
    "description": "Infrastructure monitoring and alerting",
    "position": {
      "x": 2657,
      "y": 2438
    },
    "highlights": [
      {
        "x": 2700.7,
        "y": 2744.6,
        "width": 184.6,
        "height": 126.9
      }
    ]
  },
  {
    "speechDescription": "Grafana provides operational dashboards with real-time monitoring and alerting capabilities. It visualizes system metrics and performance data, provides customizable dashboards and reports, enables real-time alerting and notifications, and supports data source integration. The service enables comprehensive operational visibility and monitoring for the ID90 system.",
    "icon": "Grafana.svg",
    "title": "Grafana",
    "description": "Operational dashboards and visualization",
    "position": {
      "x": 2485,
      "y": 2785
    },
    "highlights": [
      {
        "x": 2517.2,
        "y": 3121.5,
        "width": 144.1,
        "height": 126.9
      }
    ]
  },
  {
    "speechDescription": "Power BI delivers business intelligence with executive dashboards and comprehensive reporting. It provides business metrics and key performance indicators, generates executive reports and insights, enables data visualization and analysis, and supports advanced analytics and forecasting. The service enables data-driven business decision making for the ID90 program.",
    "icon": "power-bi-dashboard.png",
    "title": "Power BI",
    "description": "Business intelligence and reporting",
    "position": {
      "x": 2855,
      "y": 2785
    },
    "highlights": [
      {
        "x": 2911,
        "y": 3121.5,
        "width": 144.1,
        "height": 126.9
      }
    ]
  },
  {
    "title": "Google SSO",
    "speechTitle": "Google Single Sign-On",
    "description": "Single sign-on authentication provider",
    "speechDescription": "Google Single Sign-On provides seamless employee authentication using industry-standard OAuth 2.0 and OpenID Connect protocols. It integrates with AirAsia corporate accounts, maintains security and compliance standards for enterprise authentication, and ensures smooth user experience with single sign-on capabilities. This simplifies authentication while maintaining security.",
    "icon": "google sso.png",
    "position": {
      "x": 3470,
      "y": 2098
    },
    "highlights": [
      {
        "x": 3587.1,
        "y": 2376.5,
        "width": 211.9,
        "height": 109.4
      }
    ]
  },
  {
    "speechDescription": "AirAsia Flight Systems provide the core flight booking infrastructure with comprehensive real-time data and availability management. They manage seat inventory and flight status updates, integrate with our ID90 discount system for seamless employee bookings, and provide reliable flight data services. The systems ensure accurate and up-to-date flight information for employee bookings.",
    "icon": "aviation.png",
    "title": "AirAsia Flight Systems",
    "description": "Core flight booking and management systems",
    "position": {
      "x": 3066,
      "y": 2099
    },
    "highlights": [
      {
        "x": 3125.9,
        "y": 2376.5,
        "width": 211.9,
        "height": 109.4
      }
    ]
  },
  {
    "title": "SMS Gateway",
    "speechTitle": "Short Message Service Gateway",
    "description": "SMS notification delivery service",
    "speechDescription": "The Short Message Service Gateway delivers notifications through multi-region SMS providers with comprehensive delivery tracking and reporting capabilities. It uses template-based messaging, includes cost optimization and intelligent routing, and ensures reliable SMS delivery across different regions. This enables reliable SMS communication.",
    "icon": "sms notification.png",
    "position": {
      "x": 4736,
      "y": 2098
    },
    "highlights": [
      {
        "x": 4970.9,
        "y": 2376.5,
        "width": 211.9,
        "height": 109.4
      }
    ]
  },
  {
    "speechDescription": "The Email Service provides transactional email delivery with advanced template-based messaging capabilities. It includes comprehensive delivery tracking and analytics, integrates with corporate email systems, and maintains compliance with email regulations and standards. The service ensures reliable and compliant email communication for booking confirmations and updates.",
    "icon": "email notification.png",
    "title": "Email Service",
    "description": "Transactional email delivery system",
    "position": {
      "x": 4309,
      "y": 2098
    },
    "highlights": [
      {
        "x": 4509.6,
        "y": 2376.5,
        "width": 211.9,
        "height": 109.4
      }
    ]
  },
  {
    "title": "Teams API",
    "speechTitle": "Teams Application Programming Interface",
    "description": "Microsoft Teams integration for notifications",
    "speechDescription": "The Teams Application Programming Interface integrates with Microsoft Teams for operational alerts and comprehensive notifications. It enables team channel messaging, integrates with monitoring systems, and provides automated incident notifications and alerts. This enables effective team communication and collaboration.",
    "icon": "teams notification.png",
    "position": {
      "x": 3879,
      "y": 2098
    },
    "highlights": [
      {
        "x": 4048.4,
        "y": 2376.5,
        "width": 211.9,
        "height": 109.4
      }
    ]
  },
  {
    "speechDescription": "The Push Notification Service delivers mobile push notifications across platforms with personalized targeting and comprehensive analytics. It includes delivery tracking and performance analytics, and integrates seamlessly with our mobile Progressive Web App. The service ensures effective mobile user engagement and communication for the ID90 system.",
    "icon": "push notification.png",
    "title": "Push Notification Service",
    "description": "Mobile push notification delivery",
    "position": {
      "x": 5149,
      "y": 2098
    },
    "highlights": [
      {
        "x": 5432.1,
        "y": 2376.5,
        "width": 211.9,
        "height": 109.4
      }
    ]
  },
  {
    "speechDescription": "The Booking Workflow orchestrates the complete employee flight booking process from authentication to confirmation. It coordinates between multiple services including authentication, flight search, employee validation, discount calculation, payment processing, and notification delivery. The workflow ensures seamless end-to-end booking experiences with proper error handling and rollback capabilities.",
    "icon": "services.png",
    "title": "Complete Booking Workflow",
    "description": "End-to-end process from search to confirmation",
    "steps": [
      {
        "step": 1,
        "title": "Employee Login & Authentication",
        "description": "Employee authenticates via Google SSO",
        "components": [
          "employee",
          "web_app",
          "api_gateway",
          "auth_service",
          "google_sso"
        ],
        "position": {
          "x": 2361,
          "y": 1344
        },
        "highlights": [
          {
            "x": 469.3,
            "y": 1444.8,
            "width": 3784.6,
            "height": 884.5
          }
        ]
      },
      {
        "step": 2,
        "title": "Flight Search & Availability Check",
        "description": "Real-time flight search within 60-minute window",
        "components": [
          "web_app",
          "api_gateway",
          "flight_service",
          "airasia_flights",
          "redis_cache"
        ],
        "position": {
          "x": 2361,
          "y": 1344
        },
        "highlights": [
          {
            "x": 469.3,
            "y": 1444.8,
            "width": 3784.6,
            "height": 884.5
          }
        ]
      },
      {
        "step": 3,
        "title": "Employee Validation & Eligibility",
        "description": "Verify employee status and booking eligibility",
        "components": [
          "booking_service",
          "employee_service",
          "sql_database"
        ],
        "position": {
          "x": 2361,
          "y": 1344
        },
        "highlights": [
          {
            "x": 469.3,
            "y": 1444.8,
            "width": 3784.6,
            "height": 884.5
          }
        ]
      },
      {
        "step": 4,
        "title": "Discount Calculation & Booking Processing",
        "description": "Apply 90% discount and process booking",
        "components": [
          "booking_service",
          "flight_service",
          "airasia_flights",
          "sql_database"
        ],
        "position": {
          "x": 2361,
          "y": 1344
        },
        "highlights": [
          {
            "x": 469.3,
            "y": 1444.8,
            "width": 3784.6,
            "height": 884.5
          }
        ]
      },
      {
        "step": 5,
        "title": "Notification & Confirmation",
        "description": "Send confirmation notifications via multiple channels",
        "components": [
          "booking_service",
          "notification_service",
          "sms_gateway",
          "email_service",
          "push_service"
        ],
        "position": {
          "x": 2361,
          "y": 1344
        },
        "highlights": [
          {
            "x": 469.3,
            "y": 1444.8,
            "width": 3784.6,
            "height": 884.5
          }
        ]
      }
    ],
    "highlights": [
      {
        "x": 49,
        "y": 384,
        "width": 4368,
        "height": 3730
      }
    ]
  },
  {
    "speechDescription": "The Event Processing Workflow manages real-time event handling and system coordination. It processes booking events, flight updates, and system notifications through Azure Service Bus and Event Grid, triggers appropriate handlers and services, and ensures reliable event delivery. The workflow enables sophisticated event-driven architecture patterns for system coordination.",
    "icon": "event-processing-workflow.png",
    "title": "Event Processing Workflow",
    "description": "Real-time event processing and analytics",
    "steps": [
      {
        "step": 1,
        "title": "Event Generation",
        "description": "Services generate events for processing",
        "components": [
          "booking_service",
          "flight_service",
          "notification_service",
          "service_bus"
        ],
        "position": {
          "x": 2086,
          "y": 2040
        },
        "highlights": [
          {
            "x": 1938.1,
            "y": 2140.3,
            "width": 297.2,
            "height": 1241
          }
        ]
      },
      {
        "step": 2,
        "title": "Event Routing",
        "description": "Event Grid routes events to appropriate handlers",
        "components": [
          "service_bus",
          "event_grid",
          "azure_functions"
        ],
        "position": {
          "x": 2086,
          "y": 2040
        },
        "highlights": [
          {
            "x": 1938.1,
            "y": 2140.3,
            "width": 297.2,
            "height": 1241
          }
        ]
      },
      {
        "step": 3,
        "title": "Stream Processing",
        "description": "Real-time analytics and data processing",
        "components": [
          "azure_functions",
          "stream_analytics",
          "cosmos_db"
        ],
        "position": {
          "x": 2086,
          "y": 2040
        },
        "highlights": [
          {
            "x": 1938.1,
            "y": 2140.3,
            "width": 297.2,
            "height": 1241
          }
        ]
      }
    ],
    "highlights": [
      {
        "x": 1960,
        "y": 2268,
        "width": 426,
        "height": 1457
      }
    ]
  },
  {
    "speechDescription": "The Monitoring Workflow provides comprehensive system health monitoring and alerting. It tracks application performance, infrastructure metrics, and business KPIs, generates alerts and notifications for issues, and provides operational dashboards and reports. The workflow enables proactive system management and ensures optimal performance and reliability.",
    "icon": "monitoring-workflow.png",
    "title": "Monitoring & Analytics Workflow",
    "description": "System monitoring and business intelligence",
    "steps": [
      {
        "step": 1,
        "title": "Telemetry Collection",
        "description": "All services send telemetry to Application Insights",
        "components": [
          "auth_service",
          "booking_service",
          "flight_service",
          "app_insights"
        ],
        "position": {
          "x": 2667,
          "y": 2040
        },
        "highlights": [
          {
            "x": 2372.8,
            "y": 2140.3,
            "width": 589.5,
            "height": 893.3
          }
        ]
      },
      {
        "step": 2,
        "title": "Infrastructure Monitoring",
        "description": "Azure Monitor tracks infrastructure health",
        "components": [
          "app_insights",
          "azure_monitor"
        ],
        "position": {
          "x": 2667,
          "y": 2040
        },
        "highlights": [
          {
            "x": 2372.8,
            "y": 2140.3,
            "width": 589.5,
            "height": 893.3
          }
        ]
      },
      {
        "step": 3,
        "title": "Dashboard & Reporting",
        "description": "Data visualization and business intelligence",
        "components": [
          "azure_monitor",
          "grafana",
          "power_bi"
        ],
        "position": {
          "x": 2667,
          "y": 2040
        },
        "highlights": [
          {
            "x": 2372.8,
            "y": 2140.3,
            "width": 589.5,
            "height": 893.3
          }
        ]
      }
    ],
    "highlights": [
      {
        "x": 2417,
        "y": 2268,
        "width": 738,
        "height": 1081
      }
    ]
  },
  {
    "speechDescription": "The User Interface Layer provides modern, responsive web and mobile applications for AirAsia employees. It includes Angular-based web applications, Progressive Web App for mobile devices, and administrative dashboards. The layer ensures consistent user experience across all platforms with real-time updates and offline capabilities.",
    "icon": "frontend.png",
    "title": "User Interface Layer",
    "description": "Frontend applications for employee interaction",
    "components": [
      "web_app",
      "mobile_pwa",
      "admin_dashboard"
    ],
    "responsibilities": [
      "Provide intuitive user interfaces for all user types",
      "Enable real-time booking and management capabilities",
      "Ensure responsive design across all devices",
      "Implement secure authentication and authorization"
    ],
    "interactions": [
      {
        "with": "Gateway Layer",
        "type": "API calls",
        "description": "All UI components communicate through the API Gateway"
      }
    ],
    "position": {
      "x": 749,
      "y": 301
    },
    "highlights": [
      {
        "x": 194,
        "y": 434,
        "width": 1264,
        "height": 227
      }
    ]
  },
  {
    "speechDescription": "The Gateway Layer provides secure API management and routing for the entire ID90 system. It includes Azure API Management for API gateway functionality and Application Gateway for load balancing and SSL termination. The layer ensures secure, scalable, and reliable access to all backend services with comprehensive security policies.",
    "icon": "api gateway.svg",
    "title": "API Gateway & Security Layer",
    "description": "Edge security and API management",
    "components": [
      "api_gateway",
      "app_gateway"
    ],
    "responsibilities": [
      "Provide secure API gateway and routing",
      "Implement rate limiting and throttling",
      "Handle SSL termination and load balancing",
      "Enforce security policies and authentication"
    ],
    "interactions": [
      {
        "with": "UI Layer",
        "type": "API requests",
        "description": "Receives all requests from UI components"
      },
      {
        "with": "Core Services",
        "type": "Service routing",
        "description": "Routes requests to appropriate backend services"
      }
    ],
    "position": {
      "x": 750,
      "y": 649
    },
    "highlights": [
      {
        "x": 671,
        "y": 810,
        "width": 317,
        "height": 604
      }
    ]
  },
  {
    "speechDescription": "The Core Services Layer contains the primary business logic services for the ID90 system. It includes Authentication Service, Booking Service, Flight Service, and Employee Service. The layer handles core business operations including employee authentication, flight booking, discount calculation, and employee management with high availability and performance.",
    "icon": "microservices.png",
    "title": "Core Business Services Layer",
    "description": "Core business logic and processing",
    "components": [
      "auth_service",
      "booking_service",
      "flight_service",
      "employee_service"
    ],
    "responsibilities": [
      "Handle core business logic and workflows",
      "Process booking requests and discount calculations",
      "Manage employee authentication and validation",
      "Integrate with external flight systems"
    ],
    "interactions": [
      {
        "with": "Gateway Layer",
        "type": "Service requests",
        "description": "Receives routed requests from API Gateway"
      },
      {
        "with": "Support Services",
        "type": "Business workflows",
        "description": "Coordinates with support services for complete workflows"
      },
      {
        "with": "Data Layer",
        "type": "Data operations",
        "description": "Performs CRUD operations on business data"
      }
    ],
    "position": {
      "x": 1642,
      "y": 1344
    },
    "highlights": [
      {
        "x": 99,
        "y": 1564,
        "width": 755,
        "height": 604
      }
    ]
  },
  {
    "speechDescription": "The Support Services Layer provides auxiliary services that support the core business operations. It includes Notification Service, Analytics Service, Refund Service, and Audit Service. The layer ensures comprehensive support for notifications, analytics, refunds, and audit logging with enterprise-grade reliability and compliance.",
    "icon": "services.png",
    "title": "Support Services Layer",
    "description": "Supporting services for business operations",
    "components": [
      "notification_service",
      "analytics_service",
      "refund_service",
      "audit_service"
    ],
    "responsibilities": [
      "Provide notification and communication services",
      "Handle analytics and business intelligence",
      "Process refunds and financial operations",
      "Maintain audit trails and compliance"
    ],
    "interactions": [
      {
        "with": "Core Services",
        "type": "Service coordination",
        "description": "Supports core business workflows"
      },
      {
        "with": "Event Processing",
        "type": "Event generation",
        "description": "Generates events for processing and analytics"
      },
      {
        "with": "External Systems",
        "type": "Integration",
        "description": "Integrates with external communication and payment systems"
      }
    ],
    "position": {
      "x": 4731,
      "y": 1692
    },
    "highlights": [
      {
        "x": 4019,
        "y": 1941,
        "width": 1688,
        "height": 227
      }
    ]
  },
  {
    "speechDescription": "The Event Processing Layer manages real-time event handling and system coordination. It includes Azure Service Bus, Event Grid, Azure Functions, and Stream Analytics. The layer enables event-driven architecture patterns with reliable message queuing, intelligent event routing, serverless processing, and real-time analytics.",
    "icon": "azure service bus.png",
    "title": "Event Processing Layer",
    "description": "Real-time event processing and analytics",
    "components": [
      "service_bus",
      "event_grid",
      "azure_functions",
      "stream_analytics"
    ],
    "responsibilities": [
      "Process real-time events from all services",
      "Provide event routing and orchestration",
      "Enable serverless event handling",
      "Perform real-time analytics and aggregations"
    ],
    "interactions": [
      {
        "with": "All Services",
        "type": "Event ingestion",
        "description": "Receives events from all business services"
      },
      {
        "with": "Data Layer",
        "type": "Analytics storage",
        "description": "Stores processed analytics data"
      }
    ],
    "position": {
      "x": 2086,
      "y": 2040
    },
    "highlights": [
      {
        "x": 2010,
        "y": 2318,
        "width": 326,
        "height": 1357
      }
    ]
  },
  {
    "speechDescription": "The Data Layer provides comprehensive data storage and caching capabilities. It includes Azure SQL Database for relational data, Redis Cache for high-performance caching, Blob Storage for file storage, and Cosmos DB for analytics data. The layer ensures reliable, scalable, and performant data management for the entire ID90 system.",
    "icon": "database.png",
    "title": "Data Layer",
    "description": "Comprehensive data storage and management",
    "components": [
      "sql_database",
      "redis_cache",
      "blob_storage",
      "cosmos_db"
    ],
    "responsibilities": [
      "Store transactional business data",
      "Provide high-performance caching",
      "Manage file and document storage",
      "Support analytics and reporting data"
    ],
    "interactions": [
      {
        "with": "All Services",
        "type": "Data operations",
        "description": "Provides data storage and retrieval for all services"
      },
      {
        "with": "Event Processing",
        "type": "Analytics storage",
        "description": "Stores processed analytics and reporting data"
      }
    ],
    "position": {
      "x": 1845,
      "y": 3431
    },
    "highlights": [
      {
        "x": 1167,
        "y": 3825,
        "width": 1517,
        "height": 238
      }
    ]
  },
  {
    "speechDescription": "The Monitoring Layer provides comprehensive system monitoring and observability. It includes Application Insights for application telemetry, Azure Monitor for infrastructure monitoring, Grafana for operational dashboards, and Power BI for business intelligence. The layer ensures complete system visibility and proactive management.",
    "icon": "monitoring.png",
    "title": "Monitoring & Analytics Layer",
    "description": "System monitoring and business intelligence",
    "components": [
      "app_insights",
      "azure_monitor",
      "grafana",
      "power_bi"
    ],
    "responsibilities": [
      "Collect comprehensive system telemetry",
      "Monitor infrastructure health and performance",
      "Provide operational dashboards",
      "Deliver business intelligence and reporting"
    ],
    "interactions": [
      {
        "with": "All Services",
        "type": "Telemetry collection",
        "description": "Collects telemetry from all system components"
      },
      {
        "with": "Data Layer",
        "type": "Analytics data",
        "description": "Uses analytics data for reporting and dashboards"
      }
    ],
    "position": {
      "x": 2667,
      "y": 2040
    },
    "highlights": [
      {
        "x": 2467,
        "y": 2318,
        "width": 638,
        "height": 981
      }
    ]
  },
  {
    "speechDescription": "The External Systems Layer integrates with external services and systems. It includes Google SSO for authentication, AirAsia Flight Systems for flight data, SMS Gateway for notifications, Email Service for email delivery, Teams API for collaboration, and Push Service for mobile notifications. The layer ensures seamless integration with external systems.",
    "icon": "integration.png",
    "title": "External Systems Layer",
    "description": "Integration with external services and systems",
    "components": [
      "google_sso",
      "airasia_flights",
      "sms_gateway",
      "email_service",
      "teams_api",
      "push_service"
    ],
    "responsibilities": [
      "Provide authentication and identity services",
      "Integrate with core flight booking systems",
      "Enable multi-channel communication",
      "Support operational notifications and alerts"
    ],
    "interactions": [
      {
        "with": "Core Services",
        "type": "Authentication",
        "description": "Provides authentication services for user access"
      },
      {
        "with": "Support Services",
        "type": "Communication",
        "description": "Enables notification and communication capabilities"
      }
    ],
    "position": {
      "x": 4103,
      "y": 2049
    },
    "highlights": [
      {
        "x": 3076,
        "y": 2327,
        "width": 2618,
        "height": 209
      }
    ]
  },
  {
    "speechDescription": "The AirAsia ID90 system implements a comprehensive microservices architecture with 8 distinct layers: User Interface, Gateway, Core Services, Support Services, Event Processing, Data, Monitoring, and External Systems. This architecture handles 3,000+ daily employee booking requests with 99.9% uptime, processes 90% flight discounts in real-time, and supports 50,000+ employees across 10 countries with enterprise-grade security and compliance.",
    "icon": "architecture.png",
    "title": "System Architecture Overview",
    "description": "High-level system architecture and data flow",
    "flow": [
      {
        "phase": "User Interaction",
        "description": "How users interact with the system",
        "components": [
          "employee",
          "admin",
          "web_app",
          "mobile_pwa",
          "admin_dashboard"
        ],
        "position": {
          "x": 1201,
          "y": -100
        },
        "highlights": [
          {
            "x": 0,
            "y": 0,
            "width": 2403,
            "height": 2205
          }
        ]
      },
      {
        "phase": "Request Processing",
        "description": "How requests are processed through the system",
        "components": [
          "api_gateway",
          "app_gateway",
          "auth_service",
          "booking_service",
          "flight_service"
        ],
        "position": {
          "x": 1201,
          "y": -100
        },
        "highlights": [
          {
            "x": 0,
            "y": 0,
            "width": 2403,
            "height": 2205
          }
        ]
      },
      {
        "phase": "Data Management",
        "description": "How data is managed and stored",
        "components": [
          "sql_database",
          "redis_cache",
          "blob_storage",
          "cosmos_db"
        ],
        "position": {
          "x": 1201,
          "y": -100
        },
        "highlights": [
          {
            "x": 0,
            "y": 0,
            "width": 2403,
            "height": 2205
          }
        ]
      },
      {
        "phase": "Event Processing",
        "description": "How events are processed for analytics",
        "components": [
          "service_bus",
          "event_grid",
          "azure_functions",
          "stream_analytics"
        ],
        "position": {
          "x": 1201,
          "y": -100
        },
        "highlights": [
          {
            "x": 0,
            "y": 0,
            "width": 2403,
            "height": 2205
          }
        ]
      },
      {
        "phase": "Monitoring & Analytics",
        "description": "How system health and business metrics are tracked",
        "components": [
          "app_insights",
          "azure_monitor",
          "grafana",
          "power_bi"
        ],
        "position": {
          "x": 1201,
          "y": -100
        },
        "highlights": [
          {
            "x": 0,
            "y": 0,
            "width": 2403,
            "height": 2205
          }
        ]
      }
    ],
    "highlights": [
      {
        "x": 0,
        "y": 0,
        "width": 5692,
        "height": 4173
      }
    ]
  },
  {
    "speechDescription": "The data flow in the ID90 system follows a sophisticated request-response pattern through multiple layers. Employee requests flow from the Angular frontend through the API Gateway for authentication, to core services for business logic, through event processing for coordination, to the data layer for storage, with comprehensive monitoring throughout. The system ensures sub-second response times with real-time updates and reliable event processing.",
    "icon": "data processing.png",
    "title": "End-to-End Data Flow",
    "description": "Complete data flow from user request to system response",
    "flow": [
      {
        "phase": "Request Initiation",
        "description": "User initiates booking request",
        "components": [
          "employee",
          "web_app",
          "api_gateway"
        ],
        "position": {
          "x": 1201,
          "y": -100
        },
        "highlights": [
          {
            "x": 0,
            "y": 0,
            "width": 2403,
            "height": 2205
          }
        ]
      },
      {
        "phase": "Authentication & Validation",
        "description": "System authenticates user and validates request",
        "components": [
          "auth_service",
          "employee_service",
          "google_sso"
        ],
        "position": {
          "x": 1201,
          "y": -100
        },
        "highlights": [
          {
            "x": 0,
            "y": 0,
            "width": 2403,
            "height": 2205
          }
        ]
      },
      {
        "phase": "Business Processing",
        "description": "Core business logic processes the booking",
        "components": [
          "booking_service",
          "flight_service",
          "airasia_flights"
        ],
        "position": {
          "x": 1201,
          "y": -100
        },
        "highlights": [
          {
            "x": 0,
            "y": 0,
            "width": 2403,
            "height": 2205
          }
        ]
      },
      {
        "phase": "Data Persistence",
        "description": "Booking data is stored and cached",
        "components": [
          "sql_database",
          "redis_cache"
        ],
        "position": {
          "x": 1201,
          "y": -100
        },
        "highlights": [
          {
            "x": 0,
            "y": 0,
            "width": 2403,
            "height": 2205
          }
        ]
      },
      {
        "phase": "Event Generation",
        "description": "Events are generated for processing and analytics",
        "components": [
          "service_bus",
          "event_grid",
          "azure_functions"
        ],
        "position": {
          "x": 1201,
          "y": -100
        },
        "highlights": [
          {
            "x": 0,
            "y": 0,
            "width": 2403,
            "height": 2205
          }
        ]
      },
      {
        "phase": "Notification & Response",
        "description": "User receives confirmation and notifications",
        "components": [
          "notification_service",
          "sms_gateway",
          "email_service",
          "push_service"
        ],
        "position": {
          "x": 1201,
          "y": -100
        },
        "highlights": [
          {
            "x": 0,
            "y": 0,
            "width": 2403,
            "height": 2205
          }
        ]
      }
    ],
    "highlights": [
      {
        "x": 0,
        "y": 0,
        "width": 5692,
        "height": 4173
      }
    ]
  }
];
