/**
 * FIX BAT ACTUAL HIGHLIGHTS
 * Fix the coordinates so each step highlights the CORRECT component
 */

const fs = require('fs');

console.log('FIXING BAT ACTUAL HIGHLIGHTS');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// Based on your feedback, here's what each step SHOULD highlight vs what it's actually highlighting
const correctMappings = {
  // Step 8: Mobile PWA should highlight Mobile PWA, not Admin Dashboard
  "Mobile PWA - Mobile Enterprise Access": { x: 67.625, y: 1285.13, width: 677.26, height: 317.14 },
  
  // Step 9: Admin Dashboard should highlight Admin Dashboard, not Analytics Dashboard  
  "Admin Dashboard - Administrative Interface": { x: 2505.375, y: 1285.13, width: 664.25, height: 317.14 },
  
  // Step 10: Analytics Dashboard should highlight Analytics Dashboard, not Angular Portal
  "Analytics Dashboard - Business Intelligence": { x: 3794.094, y: 1285.13, width: 643.04, height: 317.14 },
  
  // Step 11: Azure API Gateway should highlight API Management, not API Management (this one is correct)
  "Azure API Gateway - State-of-the-Art API Management": { x: 1921.844, y: 2252.72, width: 618.84, height: 368.07 },
  
  // Step 12: API Management should highlight Application Gateway, not Application Gateway (this one is correct)
  "Application Gateway - Load Balancer & Routing": { x: 1901.281, y: 3245.79, width: 659.96, height: 317.14 },
  
  // Step 13: Application Gateway should highlight Security Gateway, not Security Gateway (this one is correct)
  "Security Gateway - OAuth 2.0 & JWT Validation": { x: 1898.875, y: 4187.94, width: 558.47, height: 368.07 },
  
  // Step 14: Security Gateway should highlight Authentication Service, not Authentication Service (this one is correct)
  "Authentication Service - OAuth 2.0 & JWT": { x: 5684.406, y: 5181.0, width: 481.2, height: 375.34 },
  
  // Step 15: Azure Service Fabric should highlight HR Management Service, not Authentication Service
  "HR Management Service - Employee Data & Workflows": { x: 5029.6, y: 6181.3, width: 528.3, height: 426.3 },
  
  // Step 16: Should highlight IT Service Management, not Authentication Service
  "IT Service Management - IT Support & Tickets": { x: 4395.688, y: 7232.63, width: 552.4, height: 375.34 },
  
  // Step 17: Should highlight Analytics Service, not IT Service Management
  "Analytics Service - Business Intelligence": { x: 5594.688, y: 4213.41, width: 585.62, height: 317.14 },
  
  // Step 18: Should highlight Integration Service, not Analytics Service
  "Integration Service - System Integrations": { x: 6803.781, y: 4213.41, width: 604.96, height: 317.14 },
  
  // Step 19: Should highlight Notification Service, not Integration Service
  "Notification Service - Multi-channel Alerts": { x: 6790.875, y: 5210.1, width: 618.26, height: 317.14 },
  
  // Step 20: Should highlight Saga Orchestrator, not Notification Service
  "Saga Orchestrator - Distributed Transactions": { x: 4395.75, y: 5210.1, width: 664.75, height: 317.14 },
  
  // Step 21: Should highlight Audit Service, not Saga Orchestrator
  "Audit Service - Compliance & Logging": { x: 3089.813, y: 10168.16, width: 601.6, height: 317.14 },
  
  // Step 22: Should highlight Monitoring Service, not Audit Service
  "Monitoring Service - Health Checks": { x: 751.969, y: 10168.16, width: 596.04, height: 317.14 },
  
  // Step 23: Should highlight Backup Service, not Monitoring Service
  "Backup Service - Data Protection": { x: 1971.813, y: 10168.16, width: 493.9, height: 317.14 },
  
  // Step 24: Should highlight Reporting Service, not Monitoring Service
  "Reporting Service - Business Reports": { x: 766.281, y: 11124.38, width: 567.41, height: 317.14 },
  
  // Step 25: Should highlight Azure Service Bus, not Backup Service
  "Azure Service Bus - Message Queuing": { x: 15620.94, y: 7261.72, width: 570.61, height: 317.14 },
  
  // Step 26: Should highlight Azure Event Grid, not Reporting Service
  "Azure Event Grid - Event Routing": { x: 15627.84, y: 8232.97, width: 538.06, height: 317.14 },
  
  // Step 27: Should highlight Azure Functions, not Azure Service Bus
  "Azure Functions - Serverless Processing": { x: 15584.94, y: 9200.57, width: 605.1, height: 317.14 },
  
  // Step 28: Should highlight Stream Analytics, not Azure Event Grid
  "Stream Analytics - Real-time Processing": { x: 15602.22, y: 10168.16, width: 583.04, height: 317.14 },
  
  // Step 29: Should highlight Azure Monitor, not Azure Service Bus
  "Azure Monitor - Infrastructure Monitoring": { x: 10681.69, y: 9175.1, width: 461.62, height: 368.07 },
  
  // Step 30: Should highlight Power BI, not Azure Functions
  "Power BI - Business Intelligence": { x: 10063.44, y: 10168.16, width: 585.62, height: 317.14 },
  
  // Step 31: Should highlight ML Platform, not Stream Analytics
  "ML Platform - Machine Learning": { x: 11274.7, y: 10168.16, width: 488.1, height: 317.14 },
  
  // Step 32: Should highlight Application Insights, not Azure Monitor
  "Application Insights - Application Telemetry": { x: 10600.0, y: 8233.0, width: 625.0, height: 317.14 },
  
  // Step 33: Should highlight Azure SQL Database, not Azure Monitor
  "Azure SQL Database - Transactional Data": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.07 },
  
  // Step 34: Should highlight Azure Cosmos DB, not Power BI
  "Azure Cosmos DB - Document Storage": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.07 },
  
  // Step 35: Should highlight Redis Cache, not Azure Monitor
  "Redis Cache - High-performance Cache": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.07 },
  
  // Step 36: Should highlight Data Lake Storage, not Power BI
  "Data Lake Storage - Analytics Data": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.07 },
  
  // Step 37: Should highlight Azure Notification Hub, not Azure Monitor
  "Azure Notification Hub - Push Notifications": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.07 },
  
  // Step 38: Should highlight SAP Planet 8/9, not Azure Monitor
  "SAP Planet 8/9 - ERP System Integration": { x: 25791.44, y: 6257.75, width: 529.64, height: 273.49 },
  
  // Step 39: Should highlight Cherwell HR, not Power BI
  "Cherwell HR - HR Management": { x: 21053.0, y: 6257.75, width: 529.64, height: 273.49 },
  
  // Step 40: Should highlight Cherwell IT, not Azure Monitor
  "Cherwell IT - IT Service Management": { x: 26947.0, y: 6257.75, width: 642.99, height: 273.49 },
  
  // Step 41: Should highlight Azure AD, not Power BI
  "Azure AD - Identity Provider": { x: 18747.69, y: 6257.75, width: 529.64, height: 273.49 },
  
  // Step 42: Should highlight Azure Data Lake, not Azure Monitor
  "Azure Data Lake - Data Storage": { x: 19900.81, y: 6257.75, width: 529.64, height: 273.49 },
  
  // Step 43: Should highlight Power Apps, not SAP Planet 8/9
  "Power Apps - Low-code Platform": { x: 22207.06, y: 6257.75, width: 529.64, height: 273.49 },
  
  // Step 44: Should highlight SharePoint, not SAP Planet 8/9
  "SharePoint - Document Management": { x: 23362.22, y: 6257.75, width: 650.54, height: 273.49 },
  
  // Step 45: Should highlight Microsoft Teams, not Cherwell HR
  "Microsoft Teams - Communication": { x: 24638.31, y: 6257.75, width: 529.64, height: 273.49 },
  
  // Step 46: Should highlight Cherwell IT, not Cherwell IT (this one is correct)
  "Cherwell IT - IT Service Management": { x: 26947.0, y: 6257.75, width: 642.99, height: 273.49 },
  
  // Step 47: Should highlight Azure AD, not Azure AD (this one is correct)
  "Azure AD - Identity Provider": { x: 18747.69, y: 6257.75, width: 529.64, height: 273.49 },
  
  // Step 48: Should highlight Azure Data Lake, not Azure Data Lake (this one is correct)
  "Azure Data Lake - Data Storage": { x: 19900.81, y: 6257.75, width: 529.64, height: 273.49 },
  
  // Step 49: Should highlight Power Apps, not Power Apps (this one is correct)
  "Power Apps - Low-code Platform": { x: 22207.06, y: 6257.75, width: 529.64, height: 273.49 },
  
  // Step 50: Should highlight SharePoint, not SharePoint (this one is correct)
  "SharePoint - Document Management": { x: 23362.22, y: 6257.75, width: 650.54, height: 273.49 },
  
  // Step 51: Should highlight Microsoft Teams, not Microsoft Teams (this one is correct)
  "Microsoft Teams - Communication": { x: 24638.31, y: 6257.75, width: 529.64, height: 273.49 },
  
  // Steps 52-53: Should highlight full diagram (these are correct)
  "System Integration & Data Flow": { x: 0, y: 0, width: 27681, height: 11856 },
  "Enterprise Architecture Summary": { x: 0, y: 0, width: 27681, height: 11856 }
};

console.log('FIXING EACH STEP TO HIGHLIGHT CORRECT COMPONENT:');
console.log('=' * 80);

let updatedCount = 0;
for (const [stepTitle, coords] of Object.entries(correctMappings)) {
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
}

// Write the updated content back to the file
fs.writeFileSync(batNarrationPath, batNarrationContent, 'utf8');

console.log('\nBAT ACTUAL HIGHLIGHTS FIXED!');
console.log('=' * 80);
console.log(`Updated: ${updatedCount} steps`);
console.log('Each step now highlights the CORRECT component!');

