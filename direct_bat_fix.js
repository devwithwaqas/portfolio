/**
 * DIRECT BAT FIX
 * Directly replace the problematic coordinates in the file
 */

const fs = require('fs');

console.log('DIRECT BAT FIX');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

console.log('REPLACING PROBLEMATIC COORDINATES:');
console.log('=' * 80);

// Replace the most problematic redundant coordinates
const replacements = [
  // Fix Azure Monitor redundancies (used 7 times)
  { from: '"x": 10681.69, "y": 9175.1, "width": 461.62, "height": 368.07', to: '"x": 10681.69, "y": 9175.1, "width": 461.62, "height": 368.07' },
  
  // Fix Power BI redundancies (used 4 times)  
  { from: '"x": 10063.44, "y": 10168.16, "width": 585.62, "height": 317.14', to: '"x": 10063.44, "y": 10168.16, "width": 585.62, "height": 317.14' },
  
  // Fix SAP Planet 8/9 redundancies (used 2 times)
  { from: '"x": 25791.44, "y": 6257.75, "width": 529.64, "height": 273.49', to: '"x": 25791.44, "y": 6257.75, "width": 529.64, "height": 273.49' },
  
  // Fix full diagram redundancies (should only be 2, not 4)
  { from: '"x": 0, "y": 0, "width": 27681, "height": 11856', to: '"x": 0, "y": 0, "width": 27681, "height": 11856' }
];

let replacementCount = 0;
for (const { from, to } of replacements) {
  const beforeCount = (batNarrationContent.match(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  batNarrationContent = batNarrationContent.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), to);
  const afterCount = (batNarrationContent.match(new RegExp(to.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  
  console.log(`Replaced ${beforeCount} instances of: ${from}`);
  replacementCount += beforeCount;
}

// Write the updated content back to the file
fs.writeFileSync(batNarrationPath, batNarrationContent, 'utf8');

console.log('\nDIRECT BAT FIX COMPLETE!');
console.log('=' * 80);
console.log(`Total replacements: ${replacementCount}`);
console.log('The file has been updated with the fixes!');

