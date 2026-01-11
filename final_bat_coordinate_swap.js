/**
 * FINAL BAT COORDINATE SWAP
 * Swap the coordinates to match the correct components
 */

const fs = require('fs');

console.log('FINAL BAT COORDINATE SWAP');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// The issue is that the coordinates are SWAPPED
// We need to swap them to match the correct components
const correctSwappedMapping = {
  // Based on the actual SVG components, these are the CORRECT mappings
  "Angular Portal - Desktop Enterprise Access": { x: 67.6, y: 1285.1, width: 677.3, height: 317.1 }, // This should highlight the Mobile PWA component
  "Mobile PWA - Mobile Enterprise Access": { x: 2505.4, y: 1285.1, width: 664.3, height: 317.1 }, // This should highlight the Admin Dashboard component
  "Admin Dashboard - Administrative Interface": { x: 3794.1, y: 1285.1, width: 643.0, height: 317.1 }, // This should highlight the Analytics Dashboard component
  "Analytics Dashboard - Business Intelligence": { x: 1369.5, y: 1259.7, width: 511.0, height: 368.1 }, // This should highlight the Angular Portal component
};

console.log('SWAPPING COORDINATES TO MATCH CORRECT COMPONENTS:');
console.log('=' * 80);
console.log('The issue is that the coordinates are highlighting the wrong components!');
console.log('We need to swap them so each step highlights the correct component:');
console.log('- Angular Portal should highlight the Mobile PWA component (x=67.6, y=1285.1)');
console.log('- Mobile PWA should highlight the Admin Dashboard component (x=2505.4, y=1285.1)');
console.log('- Admin Dashboard should highlight the Analytics Dashboard component (x=3794.1, y=1285.1)');
console.log('- Analytics Dashboard should highlight the Angular Portal component (x=1369.5, y=1259.7)');

// Update the narration file with the swapped coordinates
let updatedCount = 0;
for (const [stepTitle, coords] of Object.entries(correctSwappedMapping)) {
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
    
    console.log(`[SWAPPED] ${stepTitle}`);
    console.log(`  New coordinates: x=${coords.x}, y=${coords.y}, width=${coords.width}, height=${coords.height}`);
    updatedCount++;
  } else {
    console.log(`[NOT FOUND] ${stepTitle}`);
  }
}

// Write the updated content back to the file
fs.writeFileSync(batNarrationPath, batNarrationContent, 'utf8');

console.log('\nFINAL BAT COORDINATE SWAP COMPLETE!');
console.log('=' * 80);
console.log(`Updated: ${updatedCount} steps`);
console.log('Now each step should highlight the correct component!');

