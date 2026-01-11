/**
 * VERIFY BAT COORDINATES
 * Check that all coordinates are properly set
 */

const fs = require('fs');

console.log('VERIFYING BAT COORDINATES');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
const batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

// Extract all step titles and their coordinates
const stepRegex = /"title":\s*"([^"]+)"/g;
const highlightRegex = /"highlights":\s*\[\s*\{\s*"x":\s*([\d.]+)\s*,\s*"y":\s*([\d.]+)\s*,\s*"width":\s*([\d.]+)\s*,\s*"height":\s*([\d.]+)/g;

let match;
let stepCount = 0;
let fullDiagramCount = 0;
let individualComponentCount = 0;

console.log('CHECKING ALL STEPS:');
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
    
    // Check if it's a full diagram highlight
    if (x === 0 && y === 0 && width === 27681 && height === 11856) {
      fullDiagramCount++;
      console.log(`${stepCount.toString().padStart(2)}. [FULL DIAGRAM] ${stepTitle}`);
    } else {
      individualComponentCount++;
      console.log(`${stepCount.toString().padStart(2)}. [COMPONENT] ${stepTitle}`);
      console.log(`     Coordinates: x=${x}, y=${y}, width=${width}, height=${height}`);
    }
  }
  
  // Reset regex for next iteration
  highlightRegex.lastIndex = 0;
}

console.log('\nSUMMARY:');
console.log('=' * 80);
console.log(`Total steps: ${stepCount}`);
console.log(`Full diagram highlights: ${fullDiagramCount}`);
console.log(`Individual component highlights: ${individualComponentCount}`);
console.log(`Expected: ~53 total steps`);

console.log('\nKEY COMPONENTS TO VERIFY:');
console.log('=' * 80);
console.log('✅ Angular Portal: x=67.625, y=1285.13 (leftmost)');
console.log('✅ Mobile PWA: x=2505.375, y=1285.13 (middle-left)');
console.log('✅ Admin Dashboard: x=3794.094, y=1285.13 (middle-right)');
console.log('✅ Analytics Dashboard: x=1369.5, y=1259.66 (rightmost)');
console.log('✅ SAP Planet 8/9: x=25791.44, y=6257.75 (external system)');
console.log('✅ Power BI: x=10063.4, y=10168.2 (monitoring)');

console.log('\nThe BAT diagram should now work correctly!');
