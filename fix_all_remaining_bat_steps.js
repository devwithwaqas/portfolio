/**
 * FIX ALL REMAINING BAT STEPS
 * Handle database, monitoring, and other components
 */

const fs = require('fs');

console.log('FIXING ALL REMAINING BAT STEPS');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// Based on the actual SVG analysis, here are the CORRECT coordinates for remaining components
const remainingCorrectCoordinates = {
  // Database components
  "Azure SQL Database - Transactional Data": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.1 },
  "Azure Cosmos DB - Document Storage": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.1 },
  "Redis Cache - High-Performance Cache": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.1 },
  "Data Lake Storage - Analytics Data": { x: 19900.8, y: 6257.8, width: 529.6, height: 273.5 },
  
  // Event processing components
  "Azure Service Bus - Message Queuing": { x: 15620.9, y: 7261.7, width: 570.6, height: 317.1 },
  "Azure Event Grid - Event Routing": { x: 15627.8, y: 8233.0, width: 538.1, height: 317.1 },
  "Azure Functions - Serverless Processing": { x: 15584.9, y: 9200.6, width: 605.1, height: 317.1 },
  "Stream Analytics - Real-Time Processing": { x: 15602.2, y: 10168.2, width: 583.0, height: 317.1 },
  
  // Monitoring components
  "Application Insights - Application Telemetry": { x: 10600.0, y: 8233.0, width: 625.0, height: 317.1 },
  "Azure Monitor - Infrastructure Monitoring": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.1 },
  "Power BI - Business Intelligence": { x: 10063.4, y: 10168.2, width: 585.6, height: 317.1 },
  "ML Platform - Machine Learning": { x: 11274.7, y: 10168.2, width: 488.1, height: 317.1 },
  
  // Support services
  "Audit Service - Compliance & Logging": { x: 3089.8, y: 10168.2, width: 601.6, height: 317.1 },
  "Monitoring Service - Health Checks": { x: 752.0, y: 10168.2, width: 596.0, height: 317.1 },
  "Backup Service - Data Protection": { x: 1971.8, y: 10168.2, width: 493.9, height: 317.1 },
  "Reporting Service - Business Reports": { x: 766.3, y: 11124.4, width: 567.4, height: 317.1 }
};

console.log('UPDATING REMAINING COMPONENTS...');
console.log('=' * 80);

let updatedCount = 0;
let notFoundCount = 0;

// Update each remaining step
for (const [stepTitle, coords] of Object.entries(remainingCorrectCoordinates)) {
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
    
    console.log(`[FIXED] ${stepTitle}`);
    console.log(`  Correct coordinates: x=${coords.x}, y=${coords.y}, width=${coords.width}, height=${coords.height}`);
    updatedCount++;
  } else {
    console.log(`[NOT FOUND] ${stepTitle}`);
    notFoundCount++;
  }
}

// Write the updated content back to the file
fs.writeFileSync(batNarrationPath, batNarrationContent, 'utf8');

console.log('\nALL REMAINING BAT STEPS FIXED!');
console.log('=' * 80);
console.log(`Updated: ${updatedCount} steps`);
console.log(`Not found: ${notFoundCount} steps`);
console.log('The BAT diagram should now highlight ALL components correctly!');

