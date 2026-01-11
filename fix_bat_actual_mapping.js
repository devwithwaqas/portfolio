/**
 * FIX BAT ACTUAL MAPPING
 * Map each step to the component it's ACTUALLY highlighting
 */

const fs = require('fs');

console.log('FIXING BAT ACTUAL MAPPING');
console.log('=' * 80);

// Read the component mapping
const componentMapping = JSON.parse(fs.readFileSync('bat_component_mapping.json', 'utf8'));

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// Based on what you're seeing, here's what each step SHOULD highlight
const correctMapping = {
  // Step 8: Mobile PWA should highlight Admin Dashboard (not Mobile PWA)
  "Mobile PWA - Mobile Enterprise Access": componentMapping["Admin Dashboard"],
  
  // Step 9: Admin Dashboard should highlight Analytics Dashboard (not Admin Dashboard)
  "Admin Dashboard - Administrative Interface": componentMapping["Analytics Dashboard"],
  
  // Step 10: Analytics Dashboard should highlight Angular Portal (not Analytics Dashboard)
  "Analytics Dashboard - Business Intelligence": componentMapping["Angular Portal"],
  
  // Step 11: Azure API Gateway should highlight API Management (this one is correct)
  "Azure API Gateway - State-of-the-Art API Management": componentMapping["API Management"],
  
  // Step 12: API Management should highlight Application Gateway (not API Management)
  "Application Gateway - Load Balancer & Routing": componentMapping["Application Gateway"],
  
  // Step 13: Application Gateway should highlight Security Gateway (not Application Gateway)
  "Security Gateway - OAuth 2.0 & JWT Validation": componentMapping["Security Gateway"],
  
  // Step 14: Security Gateway should highlight Authentication Service (not Security Gateway)
  "Authentication Service - OAuth 2.0 & JWT": componentMapping["Authentication Service"],
  
  // Step 15: Azure Service Fabric should highlight Authentication Service (not HR Management)
  "HR Management Service - Employee Data & Workflows": componentMapping["Authentication Service"],
  
  // Step 16: Should highlight Authentication Service (not IT Service Management)
  "IT Service Management - IT Support & Tickets": componentMapping["Authentication Service"],
  
  // Step 17: Should highlight IT Service Management (not Analytics Service)
  "Analytics Service - Business Intelligence": componentMapping["IT Service Management"],
  
  // Step 18: Should highlight Analytics Service (not Integration Service)
  "Integration Service - System Integrations": componentMapping["Analytics Service"],
  
  // Step 19: Should highlight Integration Service (not Notification Service)
  "Notification Service - Multi-channel Alerts": componentMapping["Integration Service"],
  
  // Step 20: Should highlight Notification Service (not Saga Orchestrator)
  "Saga Orchestrator - Distributed Transactions": componentMapping["Notification Service"],
  
  // Step 21: Should highlight Saga Orchestrator (not Audit Service)
  "Audit Service - Compliance & Logging": componentMapping["Saga Orchestrator"],
  
  // Step 22: Should highlight Audit Service (not Monitoring Service)
  "Monitoring Service - Health Checks": componentMapping["Audit Service"],
  
  // Step 23: Should highlight Monitoring Service (not Monitoring Service)
  "Backup Service - Data Protection": componentMapping["Monitoring Service"],
  
  // Step 24: Should highlight Monitoring Service (not Backup Service)
  "Reporting Service - Business Reports": componentMapping["Monitoring Service"],
  
  // Step 25: Should highlight Backup Service (not Reporting Service)
  "Azure Service Bus - Message Queuing": componentMapping["Backup Service"],
  
  // Step 26: Should highlight Reporting Service (not Azure Service Bus)
  "Azure Event Grid - Event Routing": componentMapping["Reporting Service"],
  
  // Step 27: Should highlight Azure Service Bus (not Azure Event Grid)
  "Azure Functions - Serverless Processing": componentMapping["Azure Service Bus"],
  
  // Step 28: Should highlight Azure Event Grid (not Azure Functions)
  "Stream Analytics - Real-time Processing": componentMapping["Azure Event Grid"],
  
  // Step 29: Should highlight Azure Service Bus (not Stream Analytics)
  "Azure Monitor - Infrastructure Monitoring": componentMapping["Azure Service Bus"],
  
  // Step 30: Should highlight Azure Functions (not Azure Monitor)
  "Power BI - Business Intelligence": componentMapping["Azure Functions"],
  
  // Step 31: Should highlight Stream Analytics (not Azure Monitor)
  "ML Platform - Machine Learning": componentMapping["Stream Analytics"],
  
  // Step 32: Should highlight Azure Monitor (not Power BI)
  "Application Insights - Application Telemetry": componentMapping["Azure Monitor"],
  
  // Step 33: Should highlight Azure Monitor (not ML Platform)
  "Azure SQL Database - Transactional Data": componentMapping["Azure Monitor"],
  
  // Step 34: Should highlight Power BI (not Application Insights)
  "Azure Cosmos DB - Document Storage": componentMapping["Power BI"],
  
  // Step 35: Should highlight Azure Monitor (not Azure SQL Database)
  "SAP Planet 8/9 - ERP System Integration": componentMapping["Azure Monitor"],
  
  // Step 36: Should highlight Power BI (not Azure Cosmos DB)
  "Cherwell HR - HR Management": componentMapping["Power BI"],
  
  // Step 37: Should highlight Azure Monitor (not SAP Planet 8/9)
  "Cherwell IT - IT Service Management": componentMapping["Azure Monitor"],
  
  // Step 38: Should highlight Azure Monitor (not Cherwell HR)
  "Azure AD - Identity Provider": componentMapping["Azure Monitor"],
  
  // Step 39: Should highlight Power BI (not Cherwell IT)
  "Azure Data Lake - Data Storage": componentMapping["Power BI"],
  
  // Step 40: Should highlight Azure Monitor (not Azure AD)
  "Power Apps - Low-code Platform": componentMapping["Azure Monitor"],
  
  // Step 41: Should highlight Power BI (not Azure Data Lake)
  "SharePoint - Document Management": componentMapping["Power BI"],
  
  // Step 42: Should highlight Azure Monitor (not Power Apps)
  "Microsoft Teams - Communication": componentMapping["Azure Monitor"],
  
  // Step 43: Should highlight SAP Planet 8/9 (not SharePoint)
  "Azure Cosmos DB - Document Storage": componentMapping["SAP Planet 8/9"],
  
  // Step 44: Should highlight SAP Planet 8/9 (not Microsoft Teams)
  "Redis Cache - High-performance Cache": componentMapping["SAP Planet 8/9"],
  
  // Step 45: Should highlight Cherwell HR (not Azure Cosmos DB)
  "Data Lake Storage - Analytics Data": componentMapping["Cherwell HR"],
  
  // Step 46: Should highlight Cherwell IT (not Redis Cache)
  "Azure Notification Hub - Push Notifications": componentMapping["Cherwell IT"],
  
  // Step 47: Should highlight Azure AD (not Data Lake Storage)
  "System Integration & Data Flow": componentMapping["Azure AD"],
  
  // Step 48: Should highlight Azure Data Lake (not Azure Notification Hub)
  "Enterprise Architecture Summary": componentMapping["Azure Data Lake"],
  
  // Step 49: Should highlight Power Apps (not System Integration)
  "Power Apps - Low-code Platform": componentMapping["Power Apps"],
  
  // Step 50: Should highlight SharePoint (not Enterprise Architecture)
  "SharePoint - Document Management": componentMapping["SharePoint"],
  
  // Step 51: Should highlight Microsoft Teams (not Power Apps)
  "Microsoft Teams - Communication": componentMapping["Microsoft Teams"]
};

console.log('MAPPING EACH STEP TO WHAT IT SHOULD ACTUALLY HIGHLIGHT:');
console.log('=' * 80);

let updatedCount = 0;
for (const [stepTitle, coords] of Object.entries(correctMapping)) {
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
      console.log(`  Now highlights: x=${coords.x}, y=${coords.y}, width=${coords.width}, height=${coords.height}`);
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

console.log('\nBAT ACTUAL MAPPING FIXED!');
console.log('=' * 80);
console.log(`Updated: ${updatedCount} steps`);
console.log('Each step now highlights the component it SHOULD highlight!');
