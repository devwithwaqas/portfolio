/**
 * Heat Exchanger Portal - Architecture Narration
 * Detailed walkthrough of the system architecture
 */

export const heatExchangerNarrationSteps = [
  {
    title: "Angular SPA Frontend",
    speechTitle: "Angular Single Page Application Frontend",
    description: "Modern single-page application built with Angular, providing a responsive and intuitive user interface for operators to monitor and control the Heat Exchanger Portal system.",
    speechDescription: "Modern single-page application built with Angular, providing a responsive and intuitive user interface for operators to monitor and control the Heat Exchanger Portal system.",
    icon: "Angular.svg",
    position: { x: 400, y: 500 },
    highlights: [
      { x: 405, y: 490, width: 160, height: 100 }
    ]
  },
  {
    title: "Real-time Integration",
    description: "SignalR and WebSocket integration enables live telemetry updates, providing operators with real-time system status, alerts, and performance metrics without page refresh.",
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
    speechDescription: "Central orchestration service built on Dot NET Core, managing business logic, service coordination, authorization policies, and Redis-based caching for optimal performance.",
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
    speechDescription: "Primary Online Transaction Processing database storing transactional data, with optimized views for reporting, automated backups, and high-availability configuration.",
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
      { x: 521, y: 1762, width: 210, height: 120 }
    ]
  },
  {
    title: "Object Storage",
    description: "Scalable blob storage for unstructured data including files, documents, and large binary objects. Supports both raw and curated data lakes.",
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
    description: "Time-series metrics collection and alerting system. Monitors all services, databases, and infrastructure components with configurable alert rules.",
    icon: "Prometheus.svg",
    position: { x: 1750, y: 1800 },
    highlights: [
      { x: 1719, y: 1761, width: 195, height: 120 }
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
      { x: 1581, y: 161, width: 225, height: 120 }
    ]
  },
  {
    title: "Artifact Registry (Nexus)",
    description: "Centralized repository for build artifacts and container images. Supports versioning, security scanning, and artifact promotion across environments.",
    icon: "nexus.svg",
    position: { x: 1650, y: 520 },
    highlights: [
      { x: 1564, y: 480, width: 260, height: 120 }
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
      { x: 1580, y: 812, width: 230, height: 115 }
    ]
  },
  {
    title: "Security & Compliance",
    speechTitle: "Security and Compliance",
    description: "Comprehensive security layer implementing JWT/OAuth2 authentication, mTLS encryption, secrets management (Azure Key Vault), audit logging, and data governance policies.",
    speechDescription: "Comprehensive security layer implementing JSON Web Token and OAuth2 authentication, mutual Transport Layer Security encryption, secrets management using Azure Key Vault, audit logging, and data governance policies.",
    icon: "security.png",
    position: { x: 2100, y: 400 },
    highlights: [
      { x: 2037, y: 207, width: 360, height: 430 }
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
      { x: 757, y: 799, width: 235, height: 120 }
    ]
  },
  {
    title: "Architecture Overview",
    description: "Complete enterprise microservices architecture with 6 layers: Frontend, API Gateway, Application Services, Data Layer, Platform & Delivery, and Monitoring & Observability. Handles billions in maintenance contracts with 99.9% uptime.",
    icon: "cloud architecture.png",
    position: { x: 1200, y: 100 },
    highlights: [
      { x: 311, y: 64, width: 1650, height: 1875 }
    ]
  }
]

