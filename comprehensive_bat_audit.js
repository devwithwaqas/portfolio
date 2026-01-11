/**
 * COMPREHENSIVE BAT AUDIT
 * Analyze all 53 steps for coordinate redundancies and wrong mappings
 */

const fs = require('fs');

console.log('COMPREHENSIVE BAT AUDIT');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationContent = fs.readFileSync('src/config/batNarration.js', 'utf8');

// Extract all steps with their coordinates
const stepRegex = /"title":\s*"([^"]+)"/g;
const highlightRegex = /"highlights":\s*\[\s*\{\s*"x":\s*([\d.]+)\s*,\s*"y":\s*([\d.]+)\s*,\s*"width":\s*([\d.]+)\s*,\s*"height":\s*([\d.]+)/g;

let match;
let stepCount = 0;
const coordinateMap = new Map();
const duplicateCoordinates = new Map();
const fullDiagramSteps = [];

console.log('ANALYZING ALL 53 STEPS:');
console.log('=' * 80);

while ((match = stepRegex.exec(batNarrationContent)) !== null) {
  const stepTitle = match[1];
  stepCount++;
  
  // Find the highlights for this step
  const stepStart = match.index;
  const stepEnd = batNarrationContent.indexOf('},', stepStart) + 2;
  const stepContent = batNarrationContent.substring(stepStart, stepEnd);
  
  const highlightMatch = highlightRegex.exec(stepContent);
  if (highlightMatch) {
    const x = parseFloat(highlightMatch[1]);
    const y = parseFloat(highlightMatch[2]);
    const width = parseFloat(highlightMatch[3]);
    const height = parseFloat(highlightMatch[4]);
    
    const coordKey = `${x},${y},${width},${height}`;
    
    // Check for full diagram highlights
    if (x === 0 && y === 0 && width === 27681 && height === 11856) {
      fullDiagramSteps.push(stepTitle);
    }
    
    // Track coordinate usage
    if (coordinateMap.has(coordKey)) {
      const existingSteps = coordinateMap.get(coordKey);
      existingSteps.push(stepTitle);
      coordinateMap.set(coordKey, existingSteps);
      duplicateCoordinates.set(coordKey, existingSteps);
    } else {
      coordinateMap.set(coordKey, [stepTitle]);
    }
    
    console.log(`${stepCount.toString().padStart(2)}. ${stepTitle}`);
    console.log(`    Coordinates: x=${x}, y=${y}, width=${width}, height=${height}`);
  }
  
  // Reset regex for next iteration
  highlightRegex.lastIndex = 0;
}

console.log('\nREDUNDANCY ANALYSIS:');
console.log('=' * 80);

console.log(`Total steps: ${stepCount}`);
console.log(`Unique coordinates: ${coordinateMap.size}`);
console.log(`Duplicate coordinates: ${duplicateCoordinates.size}`);

console.log('\nFULL DIAGRAM HIGHLIGHTS (should only be overview steps):');
console.log('=' * 80);
fullDiagramSteps.forEach((step, index) => {
  console.log(`${index + 1}. ${step}`);
});

console.log('\nDUPLICATE COORDINATES:');
console.log('=' * 80);
for (const [coordKey, steps] of duplicateCoordinates.entries()) {
  console.log(`Coordinates: ${coordKey}`);
  console.log(`Used by ${steps.length} steps:`);
  steps.forEach(step => console.log(`  - ${step}`));
  console.log();
}

console.log('\nRECOMMENDATIONS:');
console.log('=' * 80);
console.log('1. Only overview steps (1-2) should use full diagram coordinates');
console.log('2. Each individual component step should have unique coordinates');
console.log('3. Remove redundant coordinates (Azure Monitor, Power BI, etc.)');
console.log('4. Map each step to its correct individual component');

