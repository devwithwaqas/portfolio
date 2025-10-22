/**
 * Force fix Stream Analytics coordinate
 */

import fs from 'fs';

// Read the narration file as text
const content = fs.readFileSync('src/config/airasiaNarration.js', 'utf8');

// Find and replace Stream Analytics coordinates
const updated = content.replace(
  /"x":\s*1988\.0875,\s*"y":\s*3233\.5164,\s*"width":\s*197\.2437,\s*"height":\s*97\.7539/,
  '"x": 2060.1, "y": 3498.3, "width": 226.0, "height": 126.9'
);

if (updated !== content) {
  fs.writeFileSync('src/config/airasiaNarration.js', updated, 'utf8');
  console.log('✅ Fixed Stream Analytics coordinates');
} else {
  console.log('❌ Pattern not found - coordinates may have changed');
}

