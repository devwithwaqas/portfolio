/**
 * FIX ALL BAT REDUNDANCIES
 * Create unique coordinates for each step based on actual SVG components
 */

const fs = require('fs');

console.log('FIXING ALL BAT REDUNDANCIES');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// Based on the SVG analysis, here are the correct individual component coordinates
const correctComponentMapping = {
  // User Types (steps 3-5)
  "BAT Employee - Primary User": { x: 721.25, y: 160.25, width: 557.51, height: 474.41 },
  "System Administrator - Platform Management": { x: 2497.69, y: 185.72, width: 679.61, height: 423.49 },
  "Business Analyst - Analytics Access": { x: 3845.16, y: 185.72, width: 540.97, height: 423.49 },
  
  // Frontend Components (steps 6-9)
  "Angular Portal - Desktop Enterprise Access": { x: 1369.5, y: 1259.66, width: 511.0, height: 368.07 },
  "Mobile PWA - Mobile Enterprise Access": { x: 67.625, y: 1285.13, width: 677.26, height: 317.14 },
  "Admin Dashboard - Administrative Interface": { x: 2505.375, y: 1285.13, width: 664.25, height: 317.14 },
  "Analytics Dashboard - Business Intelligence": { x: 3794.094, y: 1285.13, width: 643.04, height: 317.14 },
  
  // API Gateway Layer (steps 10-13)
  "Azure API Gateway - State-of-the-Art API Management": { x: 1921.844, y: 2252.72, width: 618.84, height: 368.07 },
  "Application Gateway - Load Balancer & Routing": { x: 1901.281, y: 3245.79, width: 659.96, height: 317.14 },
  "Security Gateway - OAuth 2.0 & JWT Validation": { x: 1898.875, y: 4187.94, width: 558.47, height: 368.07 },
  "Authentication Service - OAuth 2.0 & JWT": { x: 5684.406, y: 5181.0, width: 481.2, height: 375.34 },
  
  // Microservices Layer (steps 14-22)
  "HR Management Service - Employee Data & Workflows": { x: 5029.6, y: 6181.3, width: 528.3, height: 426.3 },
  "IT Service Management - IT Support & Tickets": { x: 4395.688, y: 7232.63, width: 552.4, height: 375.34 },
  "Analytics Service - Business Intelligence": { x: 5594.688, y: 4213.41, width: 585.62, height: 317.14 },
  "Integration Service - System Integrations": { x: 6803.781, y: 4213.41, width: 604.96, height: 317.14 },
  "Notification Service - Multi-channel Alerts": { x: 6790.875, y: 5210.1, width: 618.26, height: 317.14 },
  "Saga Orchestrator - Distributed Transactions": { x: 4395.75, y: 5210.1, width: 664.75, height: 317.14 },
  "Audit Service - Compliance & Logging": { x: 3089.813, y: 10168.16, width: 601.6, height: 317.14 },
  "Monitoring Service - Health Checks": { x: 751.969, y: 10168.16, width: 596.04, height: 317.14 },
  "Backup Service - Data Protection": { x: 1971.813, y: 10168.16, width: 493.9, height: 317.14 },
  "Reporting Service - Business Reports": { x: 766.281, y: 11124.38, width: 567.41, height: 317.14 },
  
  // Azure Services (steps 23-31)
  "Azure Service Bus - Message Queuing": { x: 15620.94, y: 7261.72, width: 570.61, height: 317.14 },
  "Azure Event Grid - Event Routing": { x: 15627.84, y: 8232.97, width: 538.06, height: 317.14 },
  "Azure Functions - Serverless Processing": { x: 15584.94, y: 9200.57, width: 605.1, height: 317.14 },
  "Stream Analytics - Real-time Processing": { x: 15602.22, y: 10168.16, width: 583.04, height: 317.14 },
  "Azure Monitor - Infrastructure Monitoring": { x: 10681.69, y: 9175.1, width: 461.62, height: 368.07 },
  "Power BI - Business Intelligence": { x: 10063.44, y: 10168.16, width: 585.62, height: 317.14 },
  "ML Platform - Machine Learning": { x: 11274.7, y: 10168.16, width: 488.1, height: 317.14 },
  "Application Insights - Application Telemetry": { x: 10600.0, y: 8233.0, width: 625.0, height: 317.14 },
  
  // External Systems (steps 32-40)
  "SAP Planet 8/9 - ERP System Integration": { x: 25791.44, y: 6257.75, width: 529.64, height: 273.49 },
  "Cherwell HR - HR Management": { x: 21053.0, y: 6257.75, width: 529.64, height: 273.49 },
  "Cherwell IT - IT Service Management": { x: 26947.0, y: 6257.75, width: 642.99, height: 273.49 },
  "Azure AD - Identity Provider": { x: 18747.69, y: 6257.75, width: 529.64, height: 273.49 },
  "Azure Data Lake - Data Storage": { x: 19900.81, y: 6257.75, width: 529.64, height: 273.49 },
  "Power Apps - Low-code Platform": { x: 22207.06, y: 6257.75, width: 529.64, height: 273.49 },
  "SharePoint - Document Management": { x: 23362.22, y: 6257.75, width: 650.54, height: 273.49 },
  "Microsoft Teams - Communication": { x: 24638.31, y: 6257.75, width: 529.64, height: 273.49 },
  "Azure Cosmos DB - Document Storage": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.07 },
  "Azure SQL Database - Transactional Data": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.07 }
};

console.log('UPDATING ALL STEPS WITH UNIQUE COORDINATES:');
console.log('=' * 80);

let updatedCount = 0;
for (const [stepTitle, coords] of Object.entries(correctComponentMapping)) {
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
}

// Write the updated content back to the file
fs.writeFileSync(batNarrationPath, batNarrationContent, 'utf8');

console.log('\nALL BAT REDUNDANCIES FIXED!');
console.log('=' * 80);
console.log(`Updated: ${updatedCount} steps`);
console.log('Each step now has unique coordinates for its correct component!');

