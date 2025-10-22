/**
 * Heat Exchanger Portal - Architecture Narration
 * Detailed walkthrough of the system architecture
 * 
 * STANDARDIZED FORMAT (matches AirAsia pattern):
 * - 7 required fields per step
 * - Coordinates in highlights (not element references)
 * - Position for bubble placement
 * - No id, details, or audio fields
 */

export const heatExchangerNarrationSteps = [
  // ========================================
  // 1. INDIVIDUAL COMPONENT NARRATIONS
  // ========================================
  
  // Frontend Layer
  {
    title: "Angular SPA Frontend",
    speechTitle: "Angular Single Page Application Frontend",
    description: "Modern single-page application built with Angular, providing a responsive and intuitive user interface for operators to monitor and control the Heat Exchanger Portal system.",
    speechDescription: "The Angular Single Page Application Frontend serves as the primary user interface, built with Angular 12 and TypeScript for modern, maintainable code. It provides a highly responsive and intuitive interface enabling operators to monitor system performance in real-time, control Heat Exchanger operations, and access comprehensive dashboards. The application features real-time data updates through SignalR integration, responsive design optimized for various screen sizes, and rich interactive visualizations for telemetry data and system metrics.",
    icon: "Angular.svg",
    position: { x: 400, y: 500 },
    highlights: [
      { x: 405, y: 490, width: 160, height: 100 }
    ]
  },
  {
    title: "Real-time Integration",
    speechTitle: "Real-time Integration",
    description: "SignalR and WebSocket integration enables live telemetry updates, providing operators with real-time system status, alerts, and performance metrics without page refresh.",
    speechDescription: "SignalR and WebSocket integration enables live telemetry updates, providing operators with real-time system status, alerts, and performance metrics without page refresh.",
    icon: "signalr.png",
    position: { x: 400, y: 850 },
    highlights: [
      { x: 361, y: 799, width: 250, height: 120 }
    ]
  },
  {
    title: "API Gateway Layer",
    speechTitle: "Application Programming Interface Gateway Layer",
    description: "OpenShift API Gateway serves as the secure entry point, handling authentication (JWT/OAuth2), authorization, TLS termination, and WAF protection.",
    speechDescription: "OpenShift Application Programming Interface Gateway serves as the secure entry point, handling authentication using JSON Web Token and OAuth2, authorization, Transport Layer Security termination, and web application firewall protection.",
    icon: "openshift gateway.png",
    position: { x: 1100, y: 850 },
    highlights: [
      { x: 1137, y: 799, width: 285, height: 120 }
    ]
  },
  {
    title: ".NET Core Web API",
    speechTitle: "Dot NET Core Web Application Programming Interface",
    description: "Central orchestration service built on .NET Core, managing business logic, service coordination, authorization policies, and Redis-based caching for optimal performance.",
    speechDescription: "The Dot NET Core Web Application Programming Interface serves as the central orchestration service, built on Dot NET Core 6 for high-performance, cross-platform execution. It manages all business logic processing, coordinates service-to-service communication, enforces comprehensive authorization policies using role-based access control, and implements Redis-based caching strategies that reduce database queries by 70 percent. The API layer provides RESTful endpoints for all frontend operations, implements sophisticated error handling and retry mechanisms, and ensures transactional consistency across distributed operations.",
    icon: "NET core.svg",
    position: { x: 1000, y: 1150 },
    highlights: [
      { x: 931, y: 1118, width: 315, height: 120 }
    ]
  },
  {
    title: "Integration Services",
    speechTitle: "Integration Services",
    description: "Microservices-based integration layer with adapters for external systems, event-driven messaging bus, and BI analytics connectors for seamless data flow.",
    speechDescription: "Microservices-based integration layer with adapters for external systems, event-driven messaging bus, and Business Intelligence analytics connectors for seamless data flow.",
    icon: "integration.png",
    position: { x: 950, y: 1470 },
    highlights: [
      { x: 941, y: 1437, width: 230, height: 120 }
    ]
  },
  {
    title: "Data Processing Engine",
    speechTitle: "Data Processing Engine",
    description: "High-performance ETL/ELT pipeline supporting both batch and stream processing, transforming raw data into actionable insights with parallel processing capabilities.",
    speechDescription: "High-performance Extract Transform Load and Extract Load Transform pipeline supporting both batch and stream processing, transforming raw data into actionable insights with parallel processing capabilities.",
    icon: "data processing.png",
    position: { x: 1400, y: 1470 },
    highlights: [
      { x: 1316, y: 1437, width: 275, height: 120 }
    ]
  },
  {
    title: "Analytics Engine",
    speechTitle: "Analytics Engine",
    description: "Advanced analytics service generating KPIs, custom reports, and dashboards. Publishes metrics to Grafana for visualization and monitoring.",
    speechDescription: "Advanced analytics service generating Key Performance Indicators, custom reports, and dashboards. Publishes metrics to Grafana for visualization and monitoring.",
    icon: "analytics.png",
    position: { x: 1450, y: 1150 },
    highlights: [
      { x: 1394, y: 1118, width: 200, height: 120 }
    ]
  },
  {
    title: "SQL Server Enterprise",
    speechTitle: "Structured Query Language Server Enterprise",
    description: "Primary OLTP database storing transactional data, with optimized views for reporting, automated backups, and high-availability configuration.",
    speechDescription: "The Structured Query Language Server Enterprise serves as the primary Online Transaction Processing database, storing all critical transactional data with ACID compliance guarantees. It features optimized indexed views for high-performance reporting queries, automated daily backups with point-in-time recovery capabilities, and high-availability configuration using Always-On Availability Groups for 99.99 percent uptime. The database implements advanced security features including Transparent Data Encryption, row-level security, and comprehensive audit logging for compliance requirements.",
    icon: "sql server.svg",
    position: { x: 900, y: 1800 },
    highlights: [
      { x: 875, y: 1762, width: 235, height: 120 }
    ]
  },
  {
    title: "Redis Cache",
    speechTitle: "Redis Cache",
    description: "High-speed in-memory data store for session management and hot data caching, reducing database load and improving response times from 2.3s to 0.8s.",
    speechDescription: "High-speed in-memory data store for session management and hot data caching, reducing database load and improving response times from 2.3 seconds to 0.8 seconds.",
    icon: "Redis.svg",
    position: { x: 600, y: 1800 },
    highlights: [
      { x: 521, y: 1762, width: 204, height: 118 }
    ]
  },
  {
    title: "Object Storage",
    speechTitle: "Object Storage",
    description: "Scalable blob storage for unstructured data including files, documents, and large binary objects. Supports both raw and curated data lakes.",
    speechDescription: "Scalable blob storage for unstructured data including files, documents, and large binary objects. Supports both raw and curated data lakes.",
    icon: "azure blob storage.png",
    position: { x: 1300, y: 1800 },
    highlights: [
      { x: 1256, y: 1756, width: 172, height: 132 }
    ]
  },
  {
    title: "Grafana Dashboards",
    speechTitle: "Grafana Dashboards",
    description: "Real-time visualization platform displaying KPIs, performance metrics, and system health. Supports custom dashboards with drill-down capabilities.",
    speechDescription: "Real-time visualization platform displaying Key Performance Indicators, performance metrics, and system health. Supports custom dashboards with drill-down capabilities.",
    icon: "Grafana.svg",
    position: { x: 1750, y: 1470 },
    highlights: [
      { x: 1739, y: 1437, width: 175, height: 120 }
    ]
  },
  {
    title: "Prometheus Monitoring",
    speechTitle: "Prometheus Monitoring",
    description: "Time-series metrics collection and alerting system. Monitors all services, databases, and infrastructure components with configurable alert rules.",
    speechDescription: "Time-series metrics collection and alerting system. Monitors all services, databases, and infrastructure components with configurable alert rules.",
    icon: "Prometheus.svg",
    position: { x: 1750, y: 1800 },
    highlights: [
      { x: 1720, y: 1762, width: 189, height: 119 }
    ]
  },
  {
    title: "CI/CD Pipeline",
    speechTitle: "Continuous Integration and Continuous Deployment Pipeline",
    description: "Automated build, test, and deployment pipeline ensuring code quality, running unit and integration tests, and deploying to multiple environments.",
    speechDescription: "Automated build, test, and deployment pipeline ensuring code quality, running unit and integration tests, and deploying to multiple environments.",
    icon: "CI CD.svg",
    position: { x: 1650, y: 200 },
    highlights: [
      { x: 1582, y: 162, width: 218, height: 119 }
    ]
  },
  {
    title: "Artifact Registry (Nexus)",
    speechTitle: "Artifact Registry (Nexus)",
    description: "Centralized repository for build artifacts and container images. Supports versioning, security scanning, and artifact promotion across environments.",
    speechDescription: "Centralized repository for build artifacts and container images. Supports versioning, security scanning, and artifact promotion across environments.",
    icon: "nexus.svg",
    position: { x: 1650, y: 520 },
    highlights: [
      { x: 1564, y: 481, width: 253, height: 119 }
    ]
  },
  {
    title: "OpenShift (K8s)",
    speechTitle: "OpenShift Kubernetes Platform",
    description: "Enterprise Kubernetes platform managing container orchestration, auto-scaling, rolling deployments, health checks, and infrastructure as code.",
    speechDescription: "Enterprise Kubernetes platform managing container orchestration, auto-scaling, rolling deployments, health checks, and infrastructure as code.",
    icon: "kubernetes.svg",
    position: { x: 1650, y: 850 },
    highlights: [
      { x: 1570, y: 794, width: 252, height: 134 }
    ]
  },
  {
    title: "Security & Compliance",
    speechTitle: "Security and Compliance",
    description: "Comprehensive security layer implementing JWT/OAuth2 authentication, mTLS encryption, secrets management (Azure Key Vault), audit logging, and data governance policies.",
    speechDescription: "Comprehensive security layer implementing JSON Web Token and OAuth2 authentication, mutual Transport Layer Security encryption, secrets management using Azure Key Vault, audit logging, and data governance policies.",
    icon: "security.png",
    position: { x: 2100, y: 540 },
    highlights: [
      { x: 2082, y: 472, width: 314, height: 134 }
    ]
  },
  {
    title: "Integration Gateway",
    speechTitle: "Integration Gateway",
    description: "Dedicated gateway for B2B partner integrations, supporting multiple protocols, rate limiting, and partner-specific routing rules.",
    speechDescription: "Dedicated gateway for Business to Business partner integrations, supporting multiple protocols, rate limiting, and partner-specific routing rules.",
    icon: "integration gateway.svg",
    position: { x: 850, y: 850 },
    highlights: [
      { x: 757, y: 800, width: 229, height: 119 }
    ]
  },

  // ========================================
  // 2. ARCHITECTURE OVERVIEW & LAYERS
  // ========================================
  
  {
    title: "Architecture Overview",
    speechTitle: "Architecture Overview",
    description: "Complete enterprise microservices architecture with 6 layers: Frontend, API Gateway, Application Services, Data Layer, Platform & Delivery, and Monitoring & Observability. Handles billions in maintenance contracts with 99.9% uptime.",
    speechDescription: "Complete enterprise microservices architecture with 6 layers: Frontend, API Gateway, Application Services, Data Layer, Platform & Delivery, and Monitoring & Observability. Handles billions in maintenance contracts with 99.9% uptime.",
    icon: "cloud architecture.png",
    position: { x: 1200, y: 100 },
    highlights: [
      { x: 311, y: 64, width: 1650, height: 1875 }
    ]
  },
  {
    title: "Layer 1: Frontend",
    speechTitle: "Layer 1: Frontend",
    description: "The presentation layer consists of the Angular SPA with real-time SignalR integration, providing operators with an intuitive interface for monitoring and control.",
    speechDescription: "The presentation layer consists of the Angular Single Page Application with real-time SignalR integration, providing operators with an intuitive interface for monitoring and control.",
    icon: "Angular.svg",
    position: { x: 400, y: 700 },
    highlights: [
      { x: 361, y: 450, width: 250, height: 500 }
    ]
  },
  {
    title: "Layer 2: API Gateway",
    speechTitle: "Layer 2: Application Programming Interface Gateway",
    description: "The gateway layer handles all external requests, providing authentication (JWT/OAuth2), authorization, TLS termination, rate limiting, and WAF protection before routing to backend services.",
    speechDescription: "The gateway layer handles all external requests, providing authentication using JSON Web Token and OAuth2, authorization, Transport Layer Security termination, rate limiting, and Web Application Firewall protection before routing to backend services.",
    icon: "openshift gateway.png",
    position: { x: 1100, y: 850 },
    highlights: [
      { x: 757, y: 750, width: 665, height: 200 }
    ]
  },
  {
    title: "Layer 3: Application Services",
    speechTitle: "Layer 3: Application Services",
    description: "The core business logic layer includes .NET Core Web API for orchestration, Integration Services for external systems, Data Processing Engine for ETL/ELT pipelines, and Analytics Engine for KPI generation and reporting.",
    speechDescription: "The core business logic layer includes Dot NET Core Web Application Programming Interface for orchestration, Integration Services for external systems, Data Processing Engine for Extract Transform Load and Extract Load Transform pipelines, and Analytics Engine for Key Performance Indicator generation and reporting.",
    icon: "NET core.svg",
    position: { x: 1200, y: 1300 },
    highlights: [
      { x: 875, y: 1080, width: 850, height: 550 }
    ]
  },
  {
    title: "Layer 4: Data Layer",
    speechTitle: "Layer 4: Data Layer",
    description: "The persistence layer consists of SQL Server Enterprise for transactional data (OLTP), Redis Cache for high-speed session management and hot data, and Azure Blob Storage for unstructured data and document storage.",
    speechDescription: "The persistence layer consists of Structured Query Language Server Enterprise for transactional data using Online Transaction Processing, Redis Cache for high-speed session management and hot data, and Azure Blob Storage for unstructured data and document storage.",
    icon: "sql server.svg",
    position: { x: 900, y: 1850 },
    highlights: [
      { x: 490, y: 1720, width: 970, height: 200 }
    ]
  },
  {
    title: "Layer 5: Platform & Delivery",
    speechTitle: "Layer 5: Platform and Delivery",
    description: "The DevOps layer includes CI/CD pipelines for automated builds and deployments, Nexus Artifact Registry for versioned artifacts, and OpenShift (K8s) for container orchestration with auto-scaling and rolling deployments.",
    speechDescription: "The DevOps layer includes Continuous Integration and Continuous Deployment pipelines for automated builds and deployments, Nexus Artifact Registry for versioned artifacts, and OpenShift Kubernetes for container orchestration with auto-scaling and rolling deployments.",
    icon: "CI CD.svg",
    position: { x: 1650, y: 500 },
    highlights: [
      { x: 1530, y: 130, width: 350, height: 850 }
    ]
  },
  {
    title: "Layer 6: Monitoring & Observability",
    speechTitle: "Layer 6: Monitoring and Observability",
    description: "The observability layer features Grafana for real-time dashboards and KPI visualization, Prometheus for time-series metrics collection and alerting, and comprehensive Security & Compliance monitoring with audit logging and data governance.",
    speechDescription: "The observability layer features Grafana for real-time dashboards and Key Performance Indicator visualization, Prometheus for time-series metrics collection and alerting, and comprehensive Security and Compliance monitoring with audit logging and data governance.",
    icon: "Grafana.svg",
    position: { x: 1850, y: 1000 },
    highlights: [
      { x: 1700, y: 180, width: 700, height: 1750 }
    ]
  },

  // ========================================
  // 3. DATA FLOWS & WORKFLOWS
  // ========================================
  
  {
    title: "Data Flow: Request to Response",
    speechTitle: "Data Flow: Request to Response",
    description: "A typical request flows from the Angular frontend through the API Gateway for authentication, to the .NET Core orchestration layer, which coordinates with Integration Services and Data Processing, queries SQL Server or Redis Cache, and returns the response through the same path.",
    speechDescription: "A typical request flows from the Angular frontend through the Application Programming Interface Gateway for authentication, to the Dot NET Core orchestration layer, which coordinates with Integration Services and Data Processing, queries Structured Query Language Server or Redis Cache, and returns the response through the same path.",
    icon: "data processing.png",
    position: { x: 800, y: 1000 },
    highlights: [
      { x: 361, y: 450, width: 900, height: 1450 }
    ]
  },
  {
    title: "Continuous Deployment Flow",
    speechTitle: "Continuous Deployment Flow",
    description: "Code changes trigger CI/CD pipelines, which build and test the application, store artifacts in Nexus, and deploy containers to OpenShift. The deployment is monitored by Prometheus and visualized in Grafana dashboards.",
    speechDescription: "Code changes trigger Continuous Integration and Continuous Deployment pipelines, which build and test the application, store artifacts in Nexus, and deploy containers to OpenShift. The deployment is monitored by Prometheus and visualized in Grafana dashboards.",
    icon: "CI CD.svg",
    position: { x: 1650, y: 1000 },
    highlights: [
      { x: 1530, y: 130, width: 450, height: 1800 }
    ]
  },
  {
    title: "Security & Compliance Layer",
    speechTitle: "Security and Compliance Layer",
    description: "Security is enforced at every layer: JWT/OAuth2 at the gateway, mTLS between services, secrets management with Azure Key Vault, comprehensive audit logging, and data governance policies ensuring compliance with industry standards.",
    speechDescription: "Security is enforced at every layer: JSON Web Token and OAuth2 at the gateway, mutual Transport Layer Security between services, secrets management with Azure Key Vault, comprehensive audit logging, and data governance policies ensuring compliance with industry standards.",
    icon: "security.png",
    position: { x: 2100, y: 540 },
    highlights: [
      { x: 2082, y: 472, width: 314, height: 134 }
    ]
  },

  // ========================================
  // 4. SYSTEM INTEGRATION & SECURITY
  // ========================================
  
  {
    title: "Complete System Integration",
    speechTitle: "Complete System Integration",
    description: "All layers work together seamlessly: Frontend communicates through secure gateways, application services process business logic, data flows through optimized pipelines, deployments are automated, and everything is monitored in real-time for 99.9% uptime.",
    speechDescription: "All layers work together seamlessly: Frontend communicates through secure gateways, application services process business logic, data flows through optimized pipelines, deployments are automated, and everything is monitored in real-time for 99.9 percent uptime.",
    icon: "cloud architecture.png",
    position: { x: 1200, y: 1000 },
    highlights: [
      { x: 311, y: 64, width: 1650, height: 1875 }
    ]
  }
]

