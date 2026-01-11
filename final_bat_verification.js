/**
 * FINAL BAT VERIFICATION
 * Check if all redundancies are fixed
 */

const fs = require('fs');

console.log('FINAL BAT VERIFICATION');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationContent = fs.readFileSync('src/config/batNarration.js', 'utf8');

// Find all coordinate patterns
const coordinatePattern = /"x":\s*([\d.]+)\s*,\s*"y":\s*([\d.]+)\s*,\s*"width":\s*([\d.]+)\s*,\s*"height":\s*([\d.]+)/g;

let match;
const coordinates = [];
let stepCount = 0;

console.log('CHECKING ALL COORDINATES AFTER FIX:');
console.log('=' * 80);

while ((match = coordinatePattern.exec(batNarrationContent)) !== null) {
  const x = parseFloat(match[1]);
  const y = parseFloat(match[2]);
  const width = parseFloat(match[3]);
  const height = parseFloat(match[4]);
  
  coordinates.push({ x, y, width, height });
  stepCount++;
  
  console.log(`Step ${stepCount}: x=${x}, y=${y}, width=${width}, height=${height}`);
}

console.log('\nCOORDINATE ANALYSIS AFTER FIX:');
console.log('=' * 80);

// Count unique coordinates
const uniqueCoords = new Set();
const coordCounts = new Map();

coordinates.forEach(coord => {
  const key = `${coord.x},${coord.y},${coord.width},${coord.height}`;
  uniqueCoords.add(key);
  
  if (coordCounts.has(key)) {
    coordCounts.set(key, coordCounts.get(key) + 1);
  } else {
    coordCounts.set(key, 1);
  }
});

console.log(`Total steps: ${stepCount}`);
console.log(`Unique coordinates: ${uniqueCoords.size}`);
console.log(`Redundant coordinates: ${stepCount - uniqueCoords.size}`);

console.log('\nREMAINING REDUNDANT COORDINATES:');
console.log('=' * 80);

let hasRedundancies = false;
for (const [coord, count] of coordCounts.entries()) {
  if (count > 1) {
    console.log(`${coord} - used ${count} times`);
    hasRedundancies = true;
  }
}

if (!hasRedundancies) {
  console.log('✅ NO REDUNDANCIES FOUND!');
} else {
  console.log('❌ STILL HAS REDUNDANCIES');
}

console.log('\nFULL DIAGRAM COORDINATES:');
console.log('=' * 80);
const fullDiagramCount = coordinates.filter(coord => 
  coord.x === 0 && coord.y === 0 && coord.width === 27681 && coord.height === 11856
).length;
console.log(`Full diagram highlights: ${fullDiagramCount} (should only be 2 for overview steps)`);

if (fullDiagramCount <= 2) {
  console.log('✅ Full diagram highlights are correct');
} else {
  console.log('❌ Too many full diagram highlights');
}

console.log('\nFINAL STATUS:');
console.log('=' * 80);
if (!hasRedundancies && fullDiagramCount <= 2) {
  console.log('🎉 ALL BAT REDUNDANCIES FIXED!');
  console.log('Each step now has unique coordinates for its correct component!');
} else {
  console.log('⚠️  Some issues remain - need further fixes');
}

