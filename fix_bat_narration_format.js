const fs = require('fs');

console.log('Converting BAT narration to correct AirAsia format...');

// Read the current BAT narration file
const narrationContent = fs.readFileSync('src/config/batNarration.js', 'utf8');

// Extract the narration steps array
const match = narrationContent.match(/export const batNarrationSteps = \[([\s\S]*)\];/);
if (!match) {
  console.error('Could not find batNarrationSteps array');
  process.exit(1);
}

const arrayContent = match[1];

// Parse the array content and fix each step
let fixedContent = arrayContent;

// Fix the structure for each step
// 1. Add missing fields
fixedContent = fixedContent.replace(
  /{\s*title: "([^"]+)",\s*speechDescription: "([^"]+)",\s*position: { x: (\d+), y: (\d+), width: (\d+), height: (\d+) },\s*highlights: \[{\s*x: (\d+),\s*y: (\d+),\s*width: (\d+),\s*height: (\d+)\s*}\]\s*}/g,
  (match, title, speechDescription, posX, posY, posW, posH, highX, highY, highW, highH) => {
    // Create speechTitle from title
    const speechTitle = title;
    
    // Create description (shorter version of speechDescription)
    const description = speechDescription.substring(0, 100) + '...';
    
    // Create icon (generic for now)
    const icon = 'architecture.svg';
    
    return `{
    "title": "${title}",
    "speechTitle": "${speechTitle}",
    "description": "${description}",
    "speechDescription": "${speechDescription}",
    "icon": "${icon}",
    "position": {
      "x": ${posX},
      "y": ${posY}
    },
    "highlights": [
      {
        "x": ${highX},
        "y": ${highY},
        "width": ${highW},
        "height": ${highH}
      }
    ]
  }`;
  }
);

// Create the new file content
const newContent = `/**
 * BAT Inhouse App - Architecture Narration Steps
 * Converted to AirAsia format: ${new Date().toISOString()}
 */

export const batNarrationSteps = [${fixedContent}];`;

// Write the updated file
fs.writeFileSync('src/config/batNarration.js', newContent, 'utf8');

console.log('✅ BAT narration format converted successfully!');
console.log('📊 Applied AirAsia format with:');
console.log('   - Added speechTitle field');
console.log('   - Added description field');
console.log('   - Added icon field');
console.log('   - Fixed position structure');
console.log('   - Fixed highlights structure');
