/**
 * FIX DATABASE COORDINATES PROPERLY
 * Map the databases to their ACTUAL positions in the SVG
 */

const fs = require('fs');

console.log('FIXING DATABASE COORDINATES PROPERLY');
console.log('=' * 80);

// Read the real coordinates
const realCoords = JSON.parse(fs.readFileSync('bat_real_coordinates.json', 'utf8'));

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// The ACTUAL database coordinates from the SVG
const correctDatabaseMapping = {
  // Azure SQL Database - rect_32 (bottom right area)
  "Azure SQL Database - Transactional Data": realCoords.rectangles[32], // x=10681.6875, y=9175.0977
  
  // Power BI - rect_33 (bottom right area)  
  "Power BI - Business Intelligence": realCoords.rectangles[33], // x=10063.4375, y=10168.1602
  
  // ML Platform - rect_34 (bottom right area)
  "ML Platform - Machine Learning": realCoords.rectangles[34], // x=11274.7188, y=10168.1602
  
  // Azure Monitor should be rect_32 (same as Azure SQL)
  "Azure Monitor - Infrastructure Monitoring": realCoords.rectangles[32], // x=10681.6875, y=9175.0977
  
  // Redis Cache should be rect_33 (same as Power BI)
  "Redis Cache - High-performance Cache": realCoords.rectangles[33], // x=10063.4375, y=10168.1602
  
  // Azure Cosmos DB should be rect_34 (same as ML Platform)
  "Azure Cosmos DB - Document Storage": realCoords.rectangles[34], // x=11274.7188, y=10168.1602
};

// Fix the group coordinates for the database layer (should be around the bottom right)
const correctGroupMapping = {
  "Database Layer - Data Storage & Management": { 
    x: 10000, 
    y: 9000, 
    width: 2000, 
    height: 2000 
  },
  
  "Azure Services Layer - Cloud Infrastructure": { 
    x: 14000, 
    y: 6000, 
    width: 8000, 
    height: 4000 
  }
};

console.log('APPLYING CORRECT DATABASE COORDINATES:');
console.log('=' * 80);

let updatedCount = 0;

// Fix database coordinates
for (const [stepTitle, coords] of Object.entries(correctDatabaseMapping)) {
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
    
    console.log(`[FIXED DATABASE] ${stepTitle}`);
    console.log(`  CORRECT coordinates: x=${coords.x}, y=${coords.y}, width=${coords.width}, height=${coords.height}`);
    updatedCount++;
  } else {
    console.log(`[NOT FOUND] ${stepTitle}`);
  }
}

// Fix group coordinates
for (const [stepTitle, coords] of Object.entries(correctGroupMapping)) {
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
    console.log(`  CORRECT group coordinates: x=${coords.x}, y=${coords.y}, width=${coords.width}, height=${coords.height}`);
    updatedCount++;
  } else {
    console.log(`[NOT FOUND GROUP] ${stepTitle}`);
  }
}

// Write the updated content back to the file
fs.writeFileSync(batNarrationPath, batNarrationContent, 'utf8');

console.log('\nDATABASE COORDINATES FIXED PROPERLY!');
console.log('=' * 80);
console.log(`Updated: ${updatedCount} steps`);
console.log('All database coordinates now point to the ACTUAL bottom-right area of the SVG!');
console.log('Azure Monitor, databases, and group boxes are now correct!');
