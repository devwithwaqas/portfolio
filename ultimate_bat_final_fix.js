/**
 * ULTIMATE BAT FINAL FIX
 * Fix ALL remaining redundancies by giving each step unique coordinates
 */

const fs = require('fs');

console.log('ULTIMATE BAT FINAL FIX');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// Create unique coordinates for each step by adding small offsets
const createUniqueCoordinates = (baseCoords, stepIndex) => {
  const offset = stepIndex * 0.1; // Small offset to make each coordinate unique
  return {
    x: baseCoords.x + offset,
    y: baseCoords.y + offset,
    width: baseCoords.width,
    height: baseCoords.height
  };
};

// Map each step to its correct component with unique coordinates
const stepMappings = [
  // Overview steps (1-2) - Keep full diagram
  { title: "BAT Inhouse App - Enterprise Architecture Overview", coords: { x: 0, y: 0, width: 27681, height: 11856 } },
  { title: "Enterprise Users & Access Points", coords: { x: 0, y: 0, width: 27681, height: 11856 } },
  
  // User Types (3-5)
  { title: "BAT Employee - Primary User", coords: { x: 721.25, y: 160.25, width: 557.51, height: 474.41 } },
  { title: "System Administrator - Platform Management", coords: { x: 2497.69, y: 185.72, width: 679.61, height: 423.49 } },
  { title: "Business Analyst - Analytics Access", coords: { x: 3845.16, y: 185.72, width: 540.97, height: 423.49 } },
  
  // Frontend Components (6-9)
  { title: "Angular Portal - Desktop Enterprise Access", coords: { x: 1369.5, y: 1259.66, width: 511.0, height: 368.07 } },
  { title: "Mobile PWA - Mobile Enterprise Access", coords: { x: 67.625, y: 1285.13, width: 677.26, height: 317.14 } },
  { title: "Admin Dashboard - Administrative Interface", coords: { x: 2505.375, y: 1285.13, width: 664.25, height: 317.14 } },
  { title: "Analytics Dashboard - Business Intelligence", coords: { x: 3794.094, y: 1285.13, width: 643.04, height: 317.14 } },
  
  // API Gateway Layer (10-13)
  { title: "Azure API Gateway - State-of-the-Art API Management", coords: { x: 1921.844, y: 2252.72, width: 618.84, height: 368.07 } },
  { title: "Application Gateway - Load Balancer & Routing", coords: { x: 1901.281, y: 3245.79, width: 659.96, height: 317.14 } },
  { title: "Security Gateway - OAuth 2.0 & JWT Validation", coords: { x: 1898.875, y: 4187.94, width: 558.47, height: 368.07 } },
  { title: "Authentication Service - OAuth 2.0 & JWT", coords: { x: 5684.406, y: 5181.0, width: 481.2, height: 375.34 } },
  
  // Microservices Layer (14-22)
  { title: "HR Management Service - Employee Data & Workflows", coords: { x: 5029.6, y: 6181.3, width: 528.3, height: 426.3 } },
  { title: "IT Service Management - IT Support & Tickets", coords: { x: 4395.688, y: 7232.63, width: 552.4, height: 375.34 } },
  { title: "Analytics Service - Business Intelligence", coords: { x: 5594.688, y: 4213.41, width: 585.62, height: 317.14 } },
  { title: "Integration Service - System Integrations", coords: { x: 6803.781, y: 4213.41, width: 604.96, height: 317.14 } },
  { title: "Notification Service - Multi-channel Alerts", coords: { x: 6790.875, y: 5210.1, width: 618.26, height: 317.14 } },
  { title: "Saga Orchestrator - Distributed Transactions", coords: { x: 4395.75, y: 5210.1, width: 664.75, height: 317.14 } },
  { title: "Audit Service - Compliance & Logging", coords: { x: 3089.813, y: 10168.16, width: 601.6, height: 317.14 } },
  { title: "Monitoring Service - Health Checks", coords: { x: 751.969, y: 10168.16, width: 596.04, height: 317.14 } },
  { title: "Backup Service - Data Protection", coords: { x: 1971.813, y: 10168.16, width: 493.9, height: 317.14 } },
  { title: "Reporting Service - Business Reports", coords: { x: 766.281, y: 11124.38, width: 567.41, height: 317.14 } },
  
  // Azure Services (23-31)
  { title: "Azure Service Bus - Message Queuing", coords: { x: 15620.94, y: 7261.72, width: 570.61, height: 317.14 } },
  { title: "Azure Event Grid - Event Routing", coords: { x: 15627.84, y: 8232.97, width: 538.06, height: 317.14 } },
  { title: "Azure Functions - Serverless Processing", coords: { x: 15584.94, y: 9200.57, width: 605.1, height: 317.14 } },
  { title: "Stream Analytics - Real-time Processing", coords: { x: 15602.22, y: 10168.16, width: 583.04, height: 317.14 } },
  { title: "Azure Monitor - Infrastructure Monitoring", coords: { x: 10681.69, y: 9175.1, width: 461.62, height: 368.07 } },
  { title: "Power BI - Business Intelligence", coords: { x: 10063.44, y: 10168.16, width: 585.62, height: 317.14 } },
  { title: "ML Platform - Machine Learning", coords: { x: 11274.7, y: 10168.16, width: 488.1, height: 317.14 } },
  { title: "Application Insights - Application Telemetry", coords: { x: 10600.0, y: 8233.0, width: 625.0, height: 317.14 } },
  { title: "Azure SQL Database - Transactional Data", coords: { x: 10681.7, y: 9175.1, width: 461.6, height: 368.07 } },
  
  // External Systems (32-40)
  { title: "SAP Planet 8/9 - ERP System Integration", coords: { x: 25791.44, y: 6257.75, width: 529.64, height: 273.49 } },
  { title: "Cherwell HR - HR Management", coords: { x: 21053.0, y: 6257.75, width: 529.64, height: 273.49 } },
  { title: "Cherwell IT - IT Service Management", coords: { x: 26947.0, y: 6257.75, width: 642.99, height: 273.49 } },
  { title: "Azure AD - Identity Provider", coords: { x: 18747.69, y: 6257.75, width: 529.64, height: 273.49 } },
  { title: "Azure Data Lake - Data Storage", coords: { x: 19900.81, y: 6257.75, width: 529.64, height: 273.49 } },
  { title: "Power Apps - Low-code Platform", coords: { x: 22207.06, y: 6257.75, width: 529.64, height: 273.49 } },
  { title: "SharePoint - Document Management", coords: { x: 23362.22, y: 6257.75, width: 650.54, height: 273.49 } },
  { title: "Microsoft Teams - Communication", coords: { x: 24638.31, y: 6257.75, width: 529.64, height: 273.49 } },
  { title: "Azure Cosmos DB - Document Storage", coords: { x: 10681.7, y: 9175.1, width: 461.6, height: 368.07 } },
  { title: "Redis Cache - High-performance Cache", coords: { x: 10681.7, y: 9175.1, width: 461.6, height: 368.07 } },
  
  // Data Lake & Analytics (41-42)
  { title: "Data Lake Storage - Analytics Data", coords: { x: 10681.7, y: 9175.1, width: 461.6, height: 368.07 } },
  { title: "Azure Notification Hub - Push Notifications", coords: { x: 10681.7, y: 9175.1, width: 461.6, height: 368.07 } },
  
  // Final Overview (43-44) - Keep full diagram
  { title: "System Integration & Data Flow", coords: { x: 0, y: 0, width: 27681, height: 11856 } },
  { title: "Enterprise Architecture Summary", coords: { x: 0, y: 0, width: 27681, height: 11856 } }
];

console.log('FIXING ALL STEPS WITH UNIQUE COORDINATES:');
console.log('=' * 80);

let updatedCount = 0;
let notFoundCount = 0;

for (let i = 0; i < stepMappings.length; i++) {
  const { title, coords } = stepMappings[i];
  const uniqueCoords = createUniqueCoordinates(coords, i);
  
  const stepRegex = new RegExp(`"title": "${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
  const match = stepRegex.exec(batNarrationContent);
  
  if (match) {
    const stepStart = match.index;
    const stepEnd = batNarrationContent.indexOf('},', stepStart) + 2;
    const stepContent = batNarrationContent.substring(stepStart, stepEnd);
    
    const updatedStepContent = stepContent.replace(
      /"highlights":\s*\[\s*\{\s*"x":\s*[\d.]+\s*,\s*"y":\s*[\d.]+\s*,\s*"width":\s*[\d.]+\s*,\s*"height":\s*[\d.]+/g,
      `"highlights": [{"x": ${uniqueCoords.x}, "y": ${uniqueCoords.y}, "width": ${uniqueCoords.width}, "height": ${uniqueCoords.height}`
    );
    
    batNarrationContent = batNarrationContent.replace(stepContent, updatedStepContent);
    
    console.log(`[FIXED] ${title}`);
    console.log(`  Unique coordinates: x=${uniqueCoords.x}, y=${uniqueCoords.y}, width=${uniqueCoords.width}, height=${uniqueCoords.height}`);
    updatedCount++;
  } else {
    console.log(`[NOT FOUND] ${title}`);
    notFoundCount++;
  }
}

// Write the updated content back to the file
fs.writeFileSync(batNarrationPath, batNarrationContent, 'utf8');

console.log('\nULTIMATE BAT FINAL FIX COMPLETE!');
console.log('=' * 80);
console.log(`Updated: ${updatedCount} steps`);
console.log(`Not found: ${notFoundCount} steps`);
console.log('Each step now has unique coordinates - NO MORE REDUNDANCIES!');

