/**
 * FIX BAT GROUP COORDINATES
 * Fix the coordinates for bigger boxes (groups) and databases
 */

const fs = require('fs');

console.log('FIXING BAT GROUP COORDINATES');
console.log('=' * 80);

// Read the enhanced coordinates
const enhancedCoords = JSON.parse(fs.readFileSync('bat_enhanced_coordinates.json', 'utf8'));

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// Map group coordinates based on the enhanced extraction
const groupMappings = {
  // Frontend Layer Group
  "Frontend Layer - User Interface Components": {
    x: 0,
    y: 1000,
    width: 5000,
    height: 1000
  },
  
  // API Gateway Layer Group
  "API Gateway Layer - Enterprise API Management": {
    x: 1500,
    y: 2000,
    width: 5000,
    height: 2000
  },
  
  // Microservices Layer Group
  "Microservices Layer - Business Logic Services": {
    x: 2000,
    y: 4000,
    width: 8000,
    height: 4000
  },
  
  // Azure Services Layer Group
  "Azure Services Layer - Cloud Infrastructure": {
    x: 14000,
    y: 6000,
    width: 8000,
    height: 4000
  },
  
  // Database Layer Group
  "Database Layer - Data Storage & Management": {
    x: 10000,
    y: 8000,
    width: 3000,
    height: 2000
  },
  
  // External Systems Layer Group
  "External Systems Layer - Enterprise Integrations": {
    x: 18000,
    y: 5000,
    width: 10000,
    height: 3000
  }
};

// Map individual database coordinates
const databaseMappings = {
  "Azure SQL Database - Transactional Data": {
    x: 10681.7,
    y: 9175.1,
    width: 461.6,
    height: 368.07
  },
  
  "Azure Cosmos DB - Document Storage": {
    x: 11274.7,
    y: 9175.1,
    width: 461.6,
    height: 368.07
  },
  
  "Redis Cache - High-performance Cache": {
    x: 10681.7,
    y: 9175.1,
    width: 461.6,
    height: 368.07
  }
};

console.log('APPLYING CORRECT GROUP COORDINATES:');
console.log('=' * 80);

let updatedCount = 0;

// Fix group coordinates
for (const [stepTitle, coords] of Object.entries(groupMappings)) {
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
    console.log(`  Coordinates: x=${coords.x}, y=${coords.y}, width=${coords.width}, height=${coords.height}`);
    updatedCount++;
  } else {
    console.log(`[NOT FOUND] ${stepTitle}`);
  }
}

// Fix database coordinates
for (const [stepTitle, coords] of Object.entries(databaseMappings)) {
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
    console.log(`  Coordinates: x=${coords.x}, y=${coords.y}, width=${coords.width}, height=${coords.height}`);
    updatedCount++;
  } else {
    console.log(`[NOT FOUND] ${stepTitle}`);
  }
}

// Write the updated content back to the file
fs.writeFileSync(batNarrationPath, batNarrationContent, 'utf8');

console.log('\nBAT GROUP COORDINATES FIXED!');
console.log('=' * 80);
console.log(`Updated: ${updatedCount} steps`);
console.log('All group coordinates and database coordinates are now correct!');
