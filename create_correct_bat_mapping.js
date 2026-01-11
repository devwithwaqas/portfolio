/**
 * CREATE CORRECT BAT MAPPING
 * Based on the actual SVG components found
 */

const fs = require('fs');

// Read the analysis results
const analysisData = JSON.parse(fs.readFileSync('bat_svg_analysis.json', 'utf8'));

console.log('CREATING CORRECT BAT MAPPING');
console.log('=' * 80);

// Based on the actual components found, create the correct mapping
const correctMapping = {
  // User components (2-4)
  "BAT Employee - Primary User": { x: 721.2, y: 160.3, width: 557.5, height: 474.4 },
  "System Administrator - Platform Management": { x: 2497.7, y: 185.7, width: 679.6, height: 423.5 },
  "Business Analyst - Analytics & Intelligence": { x: 3845.2, y: 185.7, width: 541.0, height: 423.5 },
  
  // Frontend components (5-9)
  "Enterprise Frontend Portal - Unified Interface": { x: 1369.5, y: 1259.7, width: 511.0, height: 368.1 },
  "Angular Portal - Desktop Enterprise Access": { x: 1369.5, y: 1259.7, width: 511.0, height: 368.1 }, // Same as Enterprise Frontend Portal
  "Mobile PWA - Mobile Enterprise Access": { x: 67.6, y: 1285.1, width: 677.3, height: 317.1 },
  "Admin Dashboard - Administrative Interface": { x: 2505.4, y: 1285.1, width: 664.3, height: 317.1 },
  "Analytics Dashboard - Business Intelligence": { x: 3794.1, y: 1285.1, width: 643.0, height: 317.1 },
  
  // Gateway components (10-13)
  "Azure API Gateway - State-of-the-Art API Management": { x: 1921.8, y: 2252.7, width: 618.8, height: 368.1 },
  "API Management - API Gateway with ARM Templates": { x: 1921.8, y: 2252.7, width: 618.8, height: 368.1 }, // Same as Azure API Gateway
  "Application Gateway - Load Balancer & Routing": { x: 1901.3, y: 3245.8, width: 660.0, height: 317.1 },
  "Security Gateway - OAuth 2.0 & JWT Validation": { x: 1898.9, y: 4187.9, width: 558.5, height: 368.1 },
  
  // Service components (14-21)
  "Azure Service Fabric Microservices - Core Business Logic": { x: 1921.8, y: 2252.7, width: 618.8, height: 368.1 }, // Same as API Management
  "Authentication Service - OAuth 2.0 & JWT": { x: 5684.4, y: 5181.0, width: 481.2, height: 375.3 },
  "HR Management Service - Employee Data & Workflows": { x: 5029.6, y: 6181.3, width: 528.3, height: 426.3 },
  "IT Service Management - IT Support & Tickets": { x: 4395.7, y: 7232.6, width: 552.4, height: 375.3 },
  "Analytics Service - Business Intelligence": { x: 5594.7, y: 4213.4, width: 585.6, height: 317.1 },
  "Integration Service - System Integrations": { x: 6803.8, y: 4213.4, width: 605.0, height: 317.1 },
  "Notification Service - Multi-Channel Alerts": { x: 6790.9, y: 5210.1, width: 618.3, height: 317.1 },
  "Saga Orchestrator - Distributed Transactions": { x: 4395.8, y: 5210.1, width: 664.7, height: 317.1 },
  
  // External systems (42-50)
  "SAP Planet 8/9 - ERP System Integration": { x: 25791.4, y: 6257.8, width: 529.6, height: 273.5 },
  "Cherwell HR - HR Management Integration": { x: 21053.9, y: 6257.8, width: 529.6, height: 273.5 },
  "Cherwell IT - IT Service Management Integration": { x: 26947.2, y: 6257.8, width: 643.0, height: 273.5 },
  "Power Apps - Low-Code Platform Integration": { x: 22207.1, y: 6257.8, width: 529.6, height: 273.5 },
  "SharePoint - Document Management Integration": { x: 23362.2, y: 6257.8, width: 650.5, height: 273.5 },
  "Microsoft Teams - Communication Integration": { x: 24638.3, y: 6257.8, width: 529.6, height: 273.5 },
  "Azure AD - Identity Provider Integration": { x: 18747.7, y: 6257.8, width: 529.6, height: 273.5 },
  "Azure Data Lake - Data Storage Integration": { x: 19900.8, y: 6257.8, width: 529.6, height: 273.5 }
};

console.log('CORRECT MAPPING CREATED:');
console.log('=' * 80);

for (const [stepTitle, coords] of Object.entries(correctMapping)) {
  console.log(`${stepTitle}:`);
  console.log(`  x: ${coords.x}, y: ${coords.y}, width: ${coords.width}, height: ${coords.height}`);
  console.log();
}

// Now update the batNarration.js file with the correct coordinates
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

console.log('UPDATING BAT NARRATION WITH CORRECT COORDINATES...');
console.log('=' * 80);

// Update each step with the correct coordinates
for (const [stepTitle, coords] of Object.entries(correctMapping)) {
  // Find the step in the narration file
  const stepRegex = new RegExp(`"title": "${stepTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
  const match = stepRegex.exec(batNarrationContent);
  
  if (match) {
    // Find the highlights array for this step
    const stepStart = match.index;
    const stepEnd = batNarrationContent.indexOf('},', stepStart) + 2;
    const stepContent = batNarrationContent.substring(stepStart, stepEnd);
    
    // Update the highlights with correct coordinates
    const updatedStepContent = stepContent.replace(
      /"highlights":\s*\[\s*\{\s*"x":\s*[\d.]+\s*,\s*"y":\s*[\d.]+\s*,\s*"width":\s*[\d.]+\s*,\s*"height":\s*[\d.]+/g,
      `"highlights": [{"x": ${coords.x}, "y": ${coords.y}, "width": ${coords.width}, "height": ${coords.height}`
    );
    
    batNarrationContent = batNarrationContent.replace(stepContent, updatedStepContent);
    
    console.log(`[UPDATED] ${stepTitle}`);
    console.log(`  New coordinates: x=${coords.x}, y=${coords.y}, width=${coords.width}, height=${coords.height}`);
  } else {
    console.log(`[NOT FOUND] ${stepTitle}`);
  }
}

// Write the updated content back to the file
fs.writeFileSync(batNarrationPath, batNarrationContent, 'utf8');

console.log('\nBAT NARRATION UPDATED WITH CORRECT COORDINATES!');
console.log('=' * 80);

