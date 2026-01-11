/**
 * FIX BAT MAPPING FINAL
 * Map coordinates to the ACTUAL components based on SVG analysis
 */

const fs = require('fs');

console.log('FIXING BAT MAPPING FINAL');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// Based on the actual SVG analysis, here are the CORRECT mappings
// The key insight is that we need to map each step to the ACTUAL component it should highlight
const finalCorrectMapping = {
  // User components (2-4) - These are correct
  "BAT Employee - Primary User": { x: 721.25, y: 160.25, width: 557.51, height: 474.41 },
  "System Administrator - Platform Management": { x: 2497.69, y: 185.72, width: 679.61, height: 423.49 },
  "Business Analyst - Analytics & Intelligence": { x: 3845.16, y: 185.72, width: 540.97, height: 423.49 },
  
  // Frontend components (5-9) - Map to the ACTUAL components they should highlight
  "Enterprise Frontend Portal - Unified Interface": { x: 1369.5, y: 1259.66, width: 511.0, height: 368.07 }, // This is the Enterprise Frontend Portal
  "Angular Portal - Desktop Enterprise Access": { x: 67.625, y: 1285.13, width: 677.26, height: 317.14 }, // This should highlight the Angular Portal component
  "Mobile PWA - Mobile Enterprise Access": { x: 2505.375, y: 1285.13, width: 664.25, height: 317.14 }, // This should highlight the Mobile PWA component
  "Admin Dashboard - Administrative Interface": { x: 3794.094, y: 1285.13, width: 643.04, height: 317.14 }, // This should highlight the Admin Dashboard component
  "Analytics Dashboard - Business Intelligence": { x: 1369.5, y: 1259.66, width: 511.0, height: 368.07 }, // This should highlight the Analytics Dashboard component
  
  // Gateway components (10-13)
  "Azure API Gateway - State-of-the-Art API Management": { x: 1921.8, y: 2252.7, width: 618.8, height: 368.1 },
  "API Management - API Gateway with ARM Templates": { x: 1921.8, y: 2252.7, width: 618.8, height: 368.1 },
  "Application Gateway - Load Balancer & Routing": { x: 1901.3, y: 3245.8, width: 660.0, height: 317.1 },
  "Security Gateway - OAuth 2.0 & JWT Validation": { x: 1898.9, y: 4187.9, width: 558.5, height: 368.1 },
  
  // Service components (14-21)
  "Azure Service Fabric Microservices - Core Business Logic": { x: 1921.8, y: 2252.7, width: 618.8, height: 368.1 },
  "Authentication Service - OAuth 2.0 & JWT": { x: 5684.4, y: 5181.0, width: 481.2, height: 375.3 },
  "HR Management Service - Employee Data & Workflows": { x: 5029.6, y: 6181.3, width: 528.3, height: 426.3 },
  "IT Service Management - IT Support & Tickets": { x: 4395.7, y: 7232.6, width: 552.4, height: 375.3 },
  "Analytics Service - Business Intelligence": { x: 5594.7, y: 4213.4, width: 585.6, height: 317.1 },
  "Integration Service - System Integrations": { x: 6803.8, y: 4213.4, width: 605.0, height: 317.1 },
  "Notification Service - Multi-Channel Alerts": { x: 6790.9, y: 5210.1, width: 618.3, height: 317.1 },
  "Saga Orchestrator - Distributed Transactions": { x: 4395.8, y: 5210.1, width: 664.7, height: 317.1 },
  
  // External systems (42-50)
  "SAP Planet 8/9 - ERP System Integration": { x: 25791.44, y: 6257.75, width: 529.64, height: 273.49 },
  "Cherwell HR - HR Management Integration": { x: 21053.9, y: 6257.8, width: 529.6, height: 273.5 },
  "Cherwell IT - IT Service Management Integration": { x: 26947.2, y: 6257.8, width: 643.0, height: 273.5 },
  "Power Apps - Low-Code Platform Integration": { x: 22207.1, y: 6257.8, width: 529.6, height: 273.5 },
  "SharePoint - Document Management Integration": { x: 23362.2, y: 6257.8, width: 650.5, height: 273.5 },
  "Microsoft Teams - Communication Integration": { x: 24638.3, y: 6257.8, width: 529.6, height: 273.5 },
  "Azure AD - Identity Provider Integration": { x: 18747.7, y: 6257.8, width: 529.6, height: 273.5 },
  "Azure Data Lake - Data Storage Integration": { x: 19900.8, y: 6257.8, width: 529.6, height: 273.5 }
};

console.log('FINAL CORRECT MAPPING:');
console.log('=' * 80);
console.log('Based on the actual SVG components:');
console.log('- Angular Portal (step 6) should highlight x=67.625, y=1285.13 (Angular Portal component)');
console.log('- Mobile PWA (step 7) should highlight x=2505.375, y=1285.13 (Mobile PWA component)');
console.log('- Admin Dashboard (step 8) should highlight x=3794.094, y=1285.13 (Admin Dashboard component)');
console.log('- Analytics Dashboard (step 9) should highlight x=1369.5, y=1259.66 (Analytics Dashboard component)');

// Update the narration file with the correct coordinates
let updatedCount = 0;
for (const [stepTitle, coords] of Object.entries(finalCorrectMapping)) {
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

console.log('\nBAT MAPPING FINAL FIX COMPLETE!');
console.log('=' * 80);
console.log(`Updated: ${updatedCount} steps`);
console.log('The BAT diagram should now highlight the correct components!');

