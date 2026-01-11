/**
 * CREATE ULTIMATE BAT MAPPING
 * Map coordinates to the ACTUAL components based on SVG text content
 */

const fs = require('fs');

console.log('CREATING ULTIMATE BAT MAPPING');
console.log('=' * 80);

// Read the SVG analysis to get the actual component mappings
const analysisData = JSON.parse(fs.readFileSync('bat_svg_analysis.json', 'utf8'));

console.log('ACTUAL SVG COMPONENTS FOUND:');
console.log('=' * 80);

// Find the actual components and their coordinates
const actualComponents = analysisData.all_components.filter(comp => 
  comp.width > 50 && comp.height > 30 && comp.full_text && comp.full_text.length > 10
);

console.log('COMPONENTS WITH THEIR ACTUAL TEXT:');
actualComponents.forEach((comp, index) => {
  console.log(`${index + 1}. (${comp.x.toFixed(1)}, ${comp.y.toFixed(1)}, ${comp.width.toFixed(1)}x${comp.height.toFixed(1)}) - ${comp.full_text}`);
});

// Now create the correct mapping based on the actual text content
const correctMapping = {};

// Map each narration step to the correct component based on text content
const narrationToComponent = {
  'Angular Portal - Desktop Enterprise Access': 'Angular Portal',
  'Mobile PWA - Mobile Enterprise Access': 'Mobile PWA',
  'Admin Dashboard - Administrative Interface': 'Admin Dashboard',
  'Analytics Dashboard - Business Intelligence': 'Analytics Dashboard'
};

console.log('\nFINDING CORRECT COMPONENTS:');
console.log('=' * 80);

for (const [stepTitle, searchText] of Object.entries(narrationToComponent)) {
  const matchingComponent = actualComponents.find(comp => 
    comp.full_text.toLowerCase().includes(searchText.toLowerCase())
  );
  
  if (matchingComponent) {
    correctMapping[stepTitle] = {
      x: matchingComponent.x,
      y: matchingComponent.y,
      width: matchingComponent.width,
      height: matchingComponent.height
    };
    console.log(`✅ ${stepTitle}`);
    console.log(`   Found: ${matchingComponent.full_text}`);
    console.log(`   Coordinates: x=${matchingComponent.x}, y=${matchingComponent.y}, width=${matchingComponent.width}, height=${matchingComponent.height}`);
  } else {
    console.log(`❌ ${stepTitle} - NOT FOUND`);
  }
}

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

console.log('\nUPDATING NARRATION WITH CORRECT COORDINATES:');
console.log('=' * 80);

// Update each step with the correct coordinates
for (const [stepTitle, coords] of Object.entries(correctMapping)) {
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
    
    console.log(`[UPDATED] ${stepTitle}`);
    console.log(`  New coordinates: x=${coords.x}, y=${coords.y}, width=${coords.width}, height=${coords.height}`);
  } else {
    console.log(`[NOT FOUND] ${stepTitle}`);
  }
}

// Write the updated content back to the file
fs.writeFileSync(batNarrationPath, batNarrationContent, 'utf8');

console.log('\nULTIMATE BAT MAPPING COMPLETE!');
console.log('=' * 80);
console.log('The coordinates are now mapped to the ACTUAL components in the SVG!');

