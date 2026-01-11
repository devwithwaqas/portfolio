/**
 * FIX BAT MAPPING CORRECTLY
 * Use the actual individual components from the SVG
 */

const fs = require('fs');

console.log('FIXING BAT MAPPING CORRECTLY');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// Based on the actual SVG analysis, here are the CORRECT individual components
const correctIndividualComponents = {
  // Frontend components - Use the ACTUAL individual component coordinates
  "Angular Portal - Desktop Enterprise Access": { x: 1369.5, y: 1259.7, width: 511.0, height: 368.1 }, // This is the Angular Portal component
  "Mobile PWA - Mobile Enterprise Access": { x: 67.6, y: 1285.1, width: 677.3, height: 317.1 }, // This is the Mobile PWA component
  "Admin Dashboard - Administrative Interface": { x: 2505.4, y: 1285.1, width: 664.3, height: 317.1 }, // This is the Admin Dashboard component
  "Analytics Dashboard - Business Intelligence": { x: 3794.1, y: 1285.1, width: 643.0, height: 317.1 }, // This is the Analytics Dashboard component
};

console.log('CORRECT INDIVIDUAL COMPONENT MAPPING:');
console.log('=' * 80);
console.log('Based on the actual SVG components:');
console.log('- Angular Portal: x=1369.5, y=1259.7 (Angular Portal component)');
console.log('- Mobile PWA: x=67.6, y=1285.1 (Mobile PWA component)');
console.log('- Admin Dashboard: x=2505.4, y=1285.1 (Admin Dashboard component)');
console.log('- Analytics Dashboard: x=3794.1, y=1285.1 (Analytics Dashboard component)');

// Update the narration file with the correct coordinates
let updatedCount = 0;
for (const [stepTitle, coords] of Object.entries(correctIndividualComponents)) {
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

console.log('\nBAT MAPPING CORRECTLY FIXED!');
console.log('=' * 80);
console.log(`Updated: ${updatedCount} steps`);
console.log('Now each step should highlight the correct individual component!');

