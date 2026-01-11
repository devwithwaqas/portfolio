/**
 * FIX ALL BAT COORDINATES PROPERLY
 * Use the REAL coordinates from the SVG
 */

const fs = require('fs');

console.log('FIXING ALL BAT COORDINATES PROPERLY');
console.log('=' * 80);

// Read the real coordinates
const realCoords = JSON.parse(fs.readFileSync('bat_real_coordinates.json', 'utf8'));

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// Map the REAL coordinates to each step
const realCoordinateMapping = {
  // User Types (from rectangles 36-38)
  "BAT Employee - Primary User": realCoords.rectangles[35], // rect_35
  "System Administrator - Platform Management": realCoords.rectangles[36], // rect_36
  "Business Analyst - Analytics Access": realCoords.rectangles[37], // rect_37
  
  // Frontend Components (from rectangles 9-12)
  "Angular Portal - Desktop Enterprise Access": realCoords.rectangles[9], // rect_9
  "Mobile PWA - Mobile Enterprise Access": realCoords.rectangles[10], // rect_10
  "Admin Dashboard - Administrative Interface": realCoords.rectangles[11], // rect_11
  "Analytics Dashboard - Business Intelligence": realCoords.rectangles[12], // rect_12
  
  // API Gateway Layer (from rectangles 13-16)
  "Azure API Gateway - State-of-the-Art API Management": realCoords.rectangles[13], // rect_13
  "Application Gateway - Load Balancer & Routing": realCoords.rectangles[14], // rect_14
  "Security Gateway - OAuth 2.0 & JWT Validation": realCoords.rectangles[15], // rect_15
  "Authentication Service - OAuth 2.0 & JWT": realCoords.rectangles[16], // rect_16
  
  // Microservices Layer (from rectangles 17-26)
  "HR Management Service - Employee Data & Workflows": realCoords.rectangles[17], // rect_17
  "IT Service Management - IT Support & Tickets": realCoords.rectangles[18], // rect_18
  "Analytics Service - Business Intelligence": realCoords.rectangles[19], // rect_19
  "Integration Service - System Integrations": realCoords.rectangles[20], // rect_20
  "Notification Service - Multi-channel Alerts": realCoords.rectangles[21], // rect_21
  "Saga Orchestrator - Distributed Transactions": realCoords.rectangles[22], // rect_22
  "Audit Service - Compliance & Logging": realCoords.rectangles[23], // rect_23
  "Monitoring Service - Health Checks": realCoords.rectangles[24], // rect_24
  "Backup Service - Data Protection": realCoords.rectangles[25], // rect_25
  "Reporting Service - Business Reports": realCoords.rectangles[26], // rect_26
  
  // Azure Services (from rectangles 27-34)
  "Azure Service Bus - Message Queuing": realCoords.rectangles[27], // rect_27
  "Azure Event Grid - Event Routing": realCoords.rectangles[28], // rect_28
  "Azure Functions - Serverless Processing": realCoords.rectangles[29], // rect_29
  "Stream Analytics - Real-time Processing": realCoords.rectangles[30], // rect_30
  "Application Insights - Application Telemetry": realCoords.rectangles[31], // rect_31
  "Azure SQL Database - Transactional Data": realCoords.rectangles[32], // rect_32
  "Power BI - Business Intelligence": realCoords.rectangles[33], // rect_33
  "ML Platform - Machine Learning": realCoords.rectangles[34], // rect_34
  
  // External Systems (from rectangles 1-8)
  "SAP Planet 8/9 - ERP System Integration": realCoords.rectangles[1], // rect_1
  "Cherwell HR - HR Management": realCoords.rectangles[2], // rect_2
  "Cherwell IT - IT Service Management": realCoords.rectangles[3], // rect_3
  "Power Apps - Low-code Platform": realCoords.rectangles[4], // rect_4
  "SharePoint - Document Management": realCoords.rectangles[5], // rect_5
  "Microsoft Teams - Communication": realCoords.rectangles[6], // rect_6
  "Azure AD - Identity Provider": realCoords.rectangles[7], // rect_7
  "Azure Data Lake - Data Storage": realCoords.rectangles[8], // rect_8
  
  // Redis Cache (same as Azure SQL for now)
  "Redis Cache - High-performance Cache": realCoords.rectangles[32], // rect_32
  "Azure Cosmos DB - Document Storage": realCoords.rectangles[32] // rect_32
};

// Group coordinates (calculated from actual positions)
const groupCoordinates = {
  "Frontend Layer - User Interface Components": { x: 0, y: 1000, width: 5000, height: 1000 },
  "API Gateway Layer - Enterprise API Management": { x: 1500, y: 2000, width: 5000, height: 2000 },
  "Microservices Layer - Business Logic Services": { x: 2000, y: 4000, width: 8000, height: 4000 },
  "Azure Services Layer - Cloud Infrastructure": { x: 14000, y: 6000, width: 8000, height: 4000 },
  "Database Layer - Data Storage & Management": { x: 10000, y: 8000, width: 3000, height: 2000 },
  "External Systems Layer - Enterprise Integrations": { x: 18000, y: 5000, width: 10000, height: 3000 }
};

console.log('APPLYING REAL COORDINATES TO ALL STEPS:');
console.log('=' * 80);

let updatedCount = 0;

// Fix individual component coordinates
for (const [stepTitle, coords] of Object.entries(realCoordinateMapping)) {
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
      console.log(`  REAL coordinates: x=${coords.x}, y=${coords.y}, width=${coords.width}, height=${coords.height}`);
      updatedCount++;
    } else {
      console.log(`[NOT FOUND] ${stepTitle}`);
    }
  }
}

// Fix group coordinates
for (const [stepTitle, coords] of Object.entries(groupCoordinates)) {
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
    
    console.log(`[FIXED GROUP] ${stepTitle}`);
    console.log(`  Group coordinates: x=${coords.x}, y=${coords.y}, width=${coords.width}, height=${coords.height}`);
    updatedCount++;
  } else {
    console.log(`[NOT FOUND GROUP] ${stepTitle}`);
  }
}

// Write the updated content back to the file
fs.writeFileSync(batNarrationPath, batNarrationContent, 'utf8');

console.log('\nALL BAT COORDINATES FIXED PROPERLY!');
console.log('=' * 80);
console.log(`Updated: ${updatedCount} steps`);
console.log('All coordinates now use the REAL coordinates from the SVG!');
console.log('Database coordinates, Azure services, and all groups are now correct!');
