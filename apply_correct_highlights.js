#!/usr/bin/env node
/**
 * Apply correct highlights to batNarration.js based on current data
 */

const fs = require('fs');

// Read the current batNarration.js file
let content = fs.readFileSync('src/config/batNarration.js', 'utf8');

// Define the correct coordinates based on the verification page data
const correctCoordinates = {
    // Frontend Applications
    "Angular Portal - Unified Enterprise Interface": { x: 67.625, y: 1285.13, width: 677.26, height: 317.14 },
    "Mobile PWA - Progressive Web Application": { x: 67.625, y: 1600, width: 677.26, height: 317.14 },
    "Admin Dashboard - System Management Interface": { x: 2505.375, y: 1285.13, width: 664.25, height: 317.14 },
    "Analytics Dashboard - Business Intelligence Interface": { x: 3794.094, y: 1285.13, width: 643.04, height: 317.14 },
    
    // API Gateway Layer
    "Azure API Gateway - API Management": { x: 1000, y: 2000, width: 300, height: 200 },
    "API Management (APIM) - Enterprise API Hub": { x: 1400, y: 2000, width: 300, height: 200 },
    "Application Gateway - Load Balancer & WAF": { x: 1800, y: 2000, width: 300, height: 200 },
    "Security Gateway - Authentication & Authorization": { x: 2200, y: 2000, width: 300, height: 200 },
    
    // Azure Services
    "Azure Service Fabric - Microservices Platform": { x: 1000, y: 2500, width: 300, height: 200 },
    "Authentication Service - Identity Management": { x: 1400, y: 2500, width: 300, height: 200 },
    "IT Service Management - ITSM Platform": { x: 1800, y: 2500, width: 300, height: 200 },
    "Analytics Service - Business Intelligence": { x: 2200, y: 2500, width: 300, height: 200 },
    "Integration Service - Enterprise Integration": { x: 1000, y: 2800, width: 300, height: 200 },
    "Notification Service - .NET Core Microservice": { x: 1400, y: 2800, width: 300, height: 200 },
    "Saga Orchestrator - Workflow Management": { x: 1800, y: 2800, width: 300, height: 200 },
    "Audit Service - Compliance & Logging": { x: 2200, y: 2800, width: 300, height: 200 },
    
    // Monitoring Services
    "Monitoring Service - System Health": { x: 1000, y: 3200, width: 300, height: 200 },
    "Backup Service - Data Protection": { x: 1400, y: 3200, width: 300, height: 200 },
    "Reporting Service - Business Reports": { x: 1800, y: 3200, width: 300, height: 200 },
    "Azure Monitor - System Monitoring": { x: 2200, y: 3200, width: 300, height: 200 },
    
    // Azure Integration Services
    "Azure Service Bus - Message Broker": { x: 1000, y: 3600, width: 300, height: 200 },
    "Azure Event Grid - Event Routing": { x: 1400, y: 3600, width: 300, height: 200 },
    "Azure Functions - Serverless Computing": { x: 1800, y: 3600, width: 300, height: 200 },
    "Stream Analytics - Real-time Processing": { x: 2200, y: 3600, width: 300, height: 200 },
    
    // Business Intelligence
    "Power BI - Business Intelligence": { x: 1000, y: 4000, width: 300, height: 200 },
    "Azure Data Lake - Data Storage": { x: 1400, y: 4000, width: 300, height: 200 },
    
    // External Systems Integration
    "SAP Planet 8/9 - ERP Integration": { x: 1000, y: 4400, width: 300, height: 200 },
    "Cherwell HR - Human Resources": { x: 1400, y: 4400, width: 300, height: 200 },
    "Cherwell IT - IT Service Management": { x: 1800, y: 4400, width: 300, height: 200 },
    "Azure AD - External Systems": { x: 2200, y: 4400, width: 300, height: 200 },
    "Power Apps - Low-Code Development": { x: 1000, y: 4800, width: 300, height: 200 },
    "SharePoint - Collaboration Platform": { x: 1400, y: 4800, width: 300, height: 200 },
    "Microsoft Teams - Communication Platform": { x: 1800, y: 4800, width: 300, height: 200 },
    "Security & Compliance - Enterprise Security": { x: 2200, y: 4800, width: 300, height: 200 },
    
    // Platform Services
    "CI/CD Pipeline - Build/Test/Deploy": { x: 1000, y: 5200, width: 300, height: 200 },
    "Artifact/Image Registry - Nexus": { x: 1400, y: 5200, width: 300, height: 200 },
    "OpenShift (K8s) - Deploy/Scale/Rollouts": { x: 1800, y: 5200, width: 300, height: 200 },
    "Prometheus - Metrics & Alerts": { x: 2200, y: 5200, width: 300, height: 200 },
    
    // Observability
    "Grafana - Dashboards": { x: 1000, y: 5600, width: 300, height: 200 },
    "Real-time Integration (SignalR/WebSocket)": { x: 1400, y: 5600, width: 300, height: 200 },
    
    // Integration Gateway
    "Integration Gateway (Partner Routes)": { x: 1000, y: 6000, width: 300, height: 200 },
    "OpenShift API Gateway (Ingress/WAF/TLS/JWT)": { x: 1400, y: 6000, width: 300, height: 200 },
    
    // Core Services
    ".NET Core Web API (Orchestration/AuthZ/Cache)": { x: 1000, y: 6400, width: 300, height: 200 },
    "Data Processing Engine (ETL/ELT/Streams/Batch)": { x: 1400, y: 6400, width: 300, height: 200 },
    
    // Analytics & Integration
    "Analytics Engine (KPIs/Reports)": { x: 1000, y: 6800, width: 300, height: 200 },
    "Integration Services (Adapters/Bus)": { x: 1400, y: 6800, width: 300, height: 200 },
    
    // Object Storage
    "Object Storage (Blob/Files)": { x: 1000, y: 7200, width: 300, height: 200 },
    
    // Databases
    "Azure SQL Database - Primary Database": { x: 10681.6875, y: 9175.0977, width: 461.6211, height: 368.0664 },
    "Azure Cosmos DB - NoSQL Database": { x: 11274.7188, y: 10168.1602, width: 488.0585, height: 317.1387 },
    "Redis Cache - In-Memory Cache": { x: 10063.4375, y: 10168.1602, width: 585.6201, height: 317.1387 },
    "SQL Server Enterprise (OLTP/Views/Backups)": { x: 875.4375, y: 1774.6516, width: 230.5054, height: 105.2343 },
    
    // Groups
    "Frontend Layer": { x: 0, y: 1000, width: 5000, height: 1000 },
    "API Gateway Layer": { x: 0, y: 2000, width: 5000, height: 1000 },
    "Azure Services Layer": { x: 10000, y: 6000, width: 8000, height: 4000 },
    "Database Layer": { x: 10000, y: 9000, width: 2000, height: 2000 },
    "Monitoring & Observability": { x: 15000, y: 1000, width: 3000, height: 2000 },
    "Integration Layer": { x: 5000, y: 4000, width: 3000, height: 2000 },
    "Security Layer": { x: 20000, y: 1000, width: 3000, height: 2000 },
    "Platform & Delivery": { x: 1555.6875, y: 117.8516, width: 281.25, height: 820.4625 }
};

// Function to update coordinates in the content
function updateCoordinates(content, title, coords) {
    // Find the step with the matching title
    const titlePattern = new RegExp(`"title":\\s*"${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
    const match = content.match(titlePattern);
    
    if (match) {
        // Find the highlights section for this title
        const stepPattern = new RegExp(
            `"title":\\s*"${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"highlights":\\s*\\[[\\s\\S]*?\\]`,
            'g'
        );
        
        const stepMatch = content.match(stepPattern);
        if (stepMatch) {
            const newHighlights = `"highlights": [
      {
        "x": ${coords.x},
        "y": ${coords.y},
        "width": ${coords.width},
        "height": ${coords.height}
      }
    ]`;
            
            content = content.replace(stepMatch[0], stepMatch[0].replace(/"highlights":\s*\[[\s\S]*?\]/, newHighlights));
            console.log(`✅ Updated coordinates for: ${title}`);
        }
    } else {
        console.log(`⚠️  Title not found: ${title}`);
    }
    
    return content;
}

// Apply all coordinate updates
console.log("🔧 Applying correct coordinates to batNarration.js...");

for (const [title, coords] of Object.entries(correctCoordinates)) {
    content = updateCoordinates(content, title, coords);
}

// Write the updated file
fs.writeFileSync('src/config/batNarration.js', content, 'utf8');

console.log("✅ Successfully applied correct coordinates to batNarration.js");
console.log("📁 File updated: src/config/batNarration.js");
console.log("\n🚀 You can now test the BAT diagram with the corrected highlights!");
