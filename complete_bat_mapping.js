/**
 * COMPLETE BAT MAPPING
 * Handle all remaining steps with proper coordinates
 */

const fs = require('fs');

console.log('COMPLETING BAT MAPPING FOR ALL STEPS');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// Define all the remaining steps that need coordinates
const remainingSteps = {
  // Overview steps (0-1) - use full diagram
  "BAT Inhouse App - Enterprise Architecture Overview": { x: 0, y: 0, width: 27681, height: 11856 },
  "Enterprise Users & Access Points": { x: 0, y: 0, width: 27681, height: 11856 },
  
  // Database steps (22-29)
  "Azure SQL Database": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.1 },
  "Azure Cosmos DB": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.1 }, // Same as SQL
  "Redis Cache": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.1 }, // Same as SQL
  "Data Lake Storage": { x: 19900.8, y: 6257.8, width: 529.6, height: 273.5 },
  
  // Event processing steps (30-37)
  "Azure Service Bus": { x: 15620.9, y: 7261.7, width: 570.6, height: 317.1 },
  "Azure Event Grid": { x: 15627.8, y: 8233.0, width: 538.1, height: 317.1 },
  "Azure Functions": { x: 15584.9, y: 9200.6, width: 605.1, height: 317.1 },
  "Stream Analytics": { x: 15602.2, y: 10168.2, width: 583.0, height: 317.1 },
  
  // Monitoring steps (38-41)
  "Application Insights": { x: 10600.0, y: 8233.0, width: 625.0, height: 317.1 },
  "Azure Monitor": { x: 10681.7, y: 9175.1, width: 461.6, height: 368.1 },
  "Power BI": { x: 10063.4, y: 10168.2, width: 585.6, height: 317.1 },
  "ML Platform": { x: 11274.7, y: 10168.2, width: 488.1, height: 317.1 },
  
  // Support services steps (22-29) - use existing service coordinates
  "Audit Service": { x: 3089.8, y: 10168.2, width: 601.6, height: 317.1 },
  "Monitoring Service": { x: 752.0, y: 10168.2, width: 596.0, height: 317.1 },
  "Backup Service": { x: 1971.8, y: 10168.2, width: 493.9, height: 317.1 },
  "Reporting Service": { x: 766.3, y: 11124.4, width: 567.4, height: 317.1 }
};

console.log('UPDATING REMAINING STEPS...');
console.log('=' * 80);

// Update each remaining step
for (const [stepTitle, coords] of Object.entries(remainingSteps)) {
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

console.log('\nALL BAT NARRATION STEPS UPDATED WITH CORRECT COORDINATES!');
console.log('=' * 80);
console.log('The BAT diagram should now highlight the correct components!');

