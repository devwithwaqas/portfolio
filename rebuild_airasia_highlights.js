/**
 * Rebuild AirAsia narration highlights with NEW coordinates from current SVG
 */

const fs = require('fs');

// Load NEW coordinates
const coordData = JSON.parse(fs.readFileSync('src/config/airasiaDiagramCoordinates_NEW.json', 'utf8'));
const components = coordData.components;

// Load component ID mapping
const idMapping = JSON.parse(fs.readFileSync('component_id_mapping.json', 'utf8'));

// Load current narration
const narration = require('./src/config/airasiaNarration.js');
const steps = narration.airasiaNarrationSteps;

console.log('='.repeat(80));
console.log('REBUILDING AIRASIA HIGHLIGHTS WITH NEW COORDINATES');
console.log('='.repeat(80));
console.log(`\nTotal steps: ${steps.length}`);
console.log(`Available components: ${Object.keys(components).length}\n`);

let updated = 0;
let missing = 0;

steps.forEach((step, i) => {
  if (!step.highlights || step.highlights.length === 0) {
    step.highlights = [{ x: 0, y: 0, width: 5692, height: 4173 }]; // Full diagram
  }
  const oldHighlight = step.highlights[0];
  
  // Use ID mapping to get correct component ID
  const componentId = idMapping[step.title];
  
  if (componentId && components[componentId]) {
    const coord = components[componentId];
    step.highlights = [{
      x: coord.x,
      y: coord.y,
      width: coord.width,
      height: coord.height
    }];
    console.log(`✓ ${i+1}. ${step.title} -> ${componentId}: ${coord.x},${coord.y} ${coord.width}x${coord.height}`);
    updated++;
  } else if (!componentId) {
    // Workflow/overview slides don't have specific components
    console.log(`- ${i+1}. ${step.title}: WORKFLOW/OVERVIEW (keeping old highlight)`);
  } else {
    console.log(`✗ ${i+1}. ${step.title} -> ${componentId}: NOT IN SVG`);
    missing++;
  }
});

console.log(`\n${'='.repeat(80)}`);
console.log(`Updated: ${updated}, Missing: ${missing}`);
console.log(`${'='.repeat(80)}\n`);

// Save updated narration
const output = `/**
 * AirAsia ID90 - Architecture Narration Steps
 * Coordinates extracted from: AirAsia_ID90_C4_Diagram.svg (${new Date().toISOString()})
 */

export const airasiaNarrationSteps = ${JSON.stringify(steps, null, 2)};
`;

fs.writeFileSync('src/config/airasiaNarration_REBUILT.js', output, 'utf8');
console.log('Saved to: src/config/airasiaNarration_REBUILT.js\n');

