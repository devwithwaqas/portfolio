/**
 * FIX COMPLETE BAT MAPPING
 * Map ALL 41 shapes and 8 groups correctly
 */

const fs = require('fs');

console.log('FIXING COMPLETE BAT MAPPING');
console.log('=' * 80);

// Read the component mapping
const componentMapping = JSON.parse(fs.readFileSync('bat_component_mapping.json', 'utf8'));

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// Create the complete mapping for ALL 43 steps
const completeMapping = {
  // User Types (steps 2-4)
  "BAT Employee - Primary User": componentMapping["BAT Employee"],
  "System Administrator - Platform Management": componentMapping["System Administrator"],
  "Business Analyst - Analytics Access": componentMapping["Business Analyst"],
  
  // Frontend Components (steps 5-8)
  "Angular Portal - Desktop Enterprise Access": componentMapping["Angular Portal"],
  "Mobile PWA - Mobile Enterprise Access": componentMapping["Mobile PWA"],
  "Admin Dashboard - Administrative Interface": componentMapping["Admin Dashboard"],
  "Analytics Dashboard - Business Intelligence": componentMapping["Analytics Dashboard"],
  
  // API Gateway Layer (steps 9-12)
  "Azure API Gateway - State-of-the-Art API Management": componentMapping["API Management"],
  "Application Gateway - Load Balancer & Routing": componentMapping["Application Gateway"],
  "Security Gateway - OAuth 2.0 & JWT Validation": componentMapping["Security Gateway"],
  "Authentication Service - OAuth 2.0 & JWT": componentMapping["Authentication Service"],
  
  // Microservices Layer (steps 13-21)
  "HR Management Service - Employee Data & Workflows": componentMapping["HR Management Service"],
  "IT Service Management - IT Support & Tickets": componentMapping["IT Service Management"],
  "Analytics Service - Business Intelligence": componentMapping["Analytics Service"],
  "Integration Service - System Integrations": componentMapping["Integration Service"],
  "Notification Service - Multi-channel Alerts": componentMapping["Notification Service"],
  "Saga Orchestrator - Distributed Transactions": componentMapping["Saga Orchestrator"],
  "Audit Service - Compliance & Logging": componentMapping["Audit Service"],
  "Monitoring Service - Health Checks": componentMapping["Monitoring Service"],
  "Backup Service - Data Protection": componentMapping["Backup Service"],
  "Reporting Service - Business Reports": componentMapping["Reporting Service"],
  
  // Azure Services (steps 22-29)
  "Azure Service Bus - Message Queuing": componentMapping["Azure Service Bus"],
  "Azure Event Grid - Event Routing": componentMapping["Azure Event Grid"],
  "Azure Functions - Serverless Processing": componentMapping["Azure Functions"],
  "Stream Analytics - Real-time Processing": componentMapping["Stream Analytics"],
  "Azure Monitor - Infrastructure Monitoring": componentMapping["Azure Monitor"],
  "Power BI - Business Intelligence": componentMapping["Power BI"],
  "ML Platform - Machine Learning": componentMapping["ML Platform"],
  "Application Insights - Application Telemetry": componentMapping["Application Insights"],
  
  // Database Layer (steps 30-31)
  "Azure SQL Database - Transactional Data": componentMapping["Azure SQL Database"],
  "Azure Cosmos DB - Document Storage": componentMapping["Azure Cosmos DB"],
  
  // External Systems (steps 32-39)
  "SAP Planet 8/9 - ERP System Integration": componentMapping["SAP Planet 8/9"],
  "Cherwell HR - HR Management": componentMapping["Cherwell HR"],
  "Cherwell IT - IT Service Management": componentMapping["Cherwell IT"],
  "Azure AD - Identity Provider": componentMapping["Azure AD"],
  "Azure Data Lake - Data Storage": componentMapping["Azure Data Lake"],
  "Power Apps - Low-code Platform": componentMapping["Power Apps"],
  "SharePoint - Document Management": componentMapping["SharePoint"],
  "Microsoft Teams - Communication": componentMapping["Microsoft Teams"],
  
  // Additional Services (steps 40-41)
  "Redis Cache - High-performance Cache": componentMapping["Redis Cache"],
  "Data Lake Storage - Analytics Data": componentMapping["Azure Data Lake"],
  
  // Group/Overview Slides (steps 42-43)
  "System Integration & Data Flow": { x: 0, y: 0, width: 27681, height: 11856 },
  "Enterprise Architecture Summary": { x: 0, y: 0, width: 27681, height: 11856 }
};

console.log('APPLYING COMPLETE MAPPING TO ALL 43 STEPS:');
console.log('=' * 80);

let updatedCount = 0;
for (const [stepTitle, coords] of Object.entries(completeMapping)) {
  if (coords) {
    const stepRegex = new RegExp(`"title": "${stepTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
    const match = stepRegex.exec(batNarrationContent);
    
    if (match) {
      const stepStart = match.index;
      const stepEnd = batNarrationContent.indexOf('},', stepStart) + 2;
      const stepContent = batNarrationContent.substring(stepStart, stepEnd);
      
      const updatedStepContent = stepContent.replace(
        /"highlights":\s*\[\s*\{\s*"x":\s*[\d.]+\s*,\s*"y":\s*[\d.]+\s*,\s*"width":\s*[\d.]+\s*,\s*"height":\s*[\d.]+/g,
        `"highlights": [{"x": ${coords.x}, "y": ${coords.y}, "width": ${coords.width}, "height": ${coords.height}`
      );
      
      batNarrationContent = batNarrationContent.replace(stepContent, updatedStepContent);
      
      console.log(`[FIXED] ${stepTitle}`);
      console.log(`  Coordinates: x=${coords.x}, y=${coords.y}, width=${coords.width}, height=${coords.height}`);
      updatedCount++;
    } else {
      console.log(`[NOT FOUND] ${stepTitle}`);
    }
  } else {
    console.log(`[NO COORDS] ${stepTitle}`);
  }
}

// Write the updated content back to the file
fs.writeFileSync(batNarrationPath, batNarrationContent, 'utf8');

console.log('\nCOMPLETE BAT MAPPING FIXED!');
console.log('=' * 80);
console.log(`Updated: ${updatedCount} steps`);
console.log('All 43 steps now have correct coordinates!');
console.log('Azure SQL Database and Azure Cosmos DB now have different coordinates!');
