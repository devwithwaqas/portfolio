/**
 * APPLY CORRECT BAT COORDINATES
 * Apply the exact coordinates from the SVG to the narration file
 */

const fs = require('fs');

console.log('APPLYING CORRECT BAT COORDINATES');
console.log('=' * 80);

// Read the component mapping
const componentMapping = JSON.parse(fs.readFileSync('bat_component_mapping.json', 'utf8'));

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// Map each step to its correct component
const stepToComponentMapping = {
  // User Types (steps 3-5)
  "BAT Employee - Primary User": "BAT Employee",
  "System Administrator - Platform Management": "System Administrator", 
  "Business Analyst - Analytics Access": "Business Analyst",
  
  // Frontend Components (steps 6-9)
  "Angular Portal - Desktop Enterprise Access": "Angular Portal",
  "Mobile PWA - Mobile Enterprise Access": "Mobile PWA",
  "Admin Dashboard - Administrative Interface": "Admin Dashboard",
  "Analytics Dashboard - Business Intelligence": "Analytics Dashboard",
  
  // API Gateway Layer (steps 10-13)
  "Azure API Gateway - State-of-the-Art API Management": "API Management",
  "Application Gateway - Load Balancer & Routing": "Application Gateway",
  "Security Gateway - OAuth 2.0 & JWT Validation": "Security Gateway",
  "Authentication Service - OAuth 2.0 & JWT": "Authentication Service",
  
  // Microservices Layer (steps 14-22)
  "HR Management Service - Employee Data & Workflows": "HR Management Service",
  "IT Service Management - IT Support & Tickets": "IT Service Management",
  "Analytics Service - Business Intelligence": "Analytics Service",
  "Integration Service - System Integrations": "Integration Service",
  "Notification Service - Multi-channel Alerts": "Notification Service",
  "Saga Orchestrator - Distributed Transactions": "Saga Orchestrator",
  "Audit Service - Compliance & Logging": "Audit Service",
  "Monitoring Service - Health Checks": "Monitoring Service",
  "Backup Service - Data Protection": "Backup Service",
  "Reporting Service - Business Reports": "Reporting Service",
  
  // Azure Services (steps 23-31)
  "Azure Service Bus - Message Queuing": "Azure Service Bus",
  "Azure Event Grid - Event Routing": "Azure Event Grid",
  "Azure Functions - Serverless Processing": "Azure Functions",
  "Stream Analytics - Real-time Processing": "Stream Analytics",
  "Azure Monitor - Infrastructure Monitoring": "Azure Monitor",
  "Power BI - Business Intelligence": "Power BI",
  "ML Platform - Machine Learning": "ML Platform",
  "Application Insights - Application Telemetry": "Application Insights",
  "Azure SQL Database - Transactional Data": "Azure SQL Database",
  
  // External Systems (steps 32-40)
  "SAP Planet 8/9 - ERP System Integration": "SAP Planet 8/9",
  "Cherwell HR - HR Management": "Cherwell HR",
  "Cherwell IT - IT Service Management": "Cherwell IT",
  "Azure AD - Identity Provider": "Azure AD",
  "Azure Data Lake - Data Storage": "Azure Data Lake",
  "Power Apps - Low-code Platform": "Power Apps",
  "SharePoint - Document Management": "SharePoint",
  "Microsoft Teams - Communication": "Microsoft Teams",
  "Azure Cosmos DB - Document Storage": "Azure Cosmos DB",
  "Redis Cache - High-performance Cache": "Redis Cache"
};

console.log('APPLYING CORRECT COORDINATES TO EACH STEP:');
console.log('=' * 80);

let updatedCount = 0;
for (const [stepTitle, componentName] of Object.entries(stepToComponentMapping)) {
  const coords = componentMapping[componentName];
  
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
      console.log(`  Now highlights: ${componentName} (x=${coords.x}, y=${coords.y}, width=${coords.width}, height=${coords.height})`);
      updatedCount++;
    } else {
      console.log(`[NOT FOUND] ${stepTitle}`);
    }
  } else {
    console.log(`[NO COORDS] ${stepTitle} - ${componentName}`);
  }
}

// Write the updated content back to the file
fs.writeFileSync(batNarrationPath, batNarrationContent, 'utf8');

console.log('\nCORRECT BAT COORDINATES APPLIED!');
console.log('=' * 80);
console.log(`Updated: ${updatedCount} steps`);
console.log('Each step now highlights its CORRECT component with EXACT coordinates from the SVG!');
