const fs = require('fs');

console.log('FIXING BAT GROUP BOUNDARIES');
console.log('='.repeat(80));

// Read the current narration file
const narrationPath = 'src/config/batNarration.js';
let narrationContent = fs.readFileSync(narrationPath, 'utf8');

// Group boundaries based on the actual layout
const groupFixes = [
  { title: 'Frontend Layer - User Interface Components', x: 0, y: 0, width: 5000, height: 2000 },
  { title: 'API Gateway Layer - API Management', x: 0, y: 2000, width: 5000, height: 2000 },
  { title: 'Microservices Layer - Business Services', x: 0, y: 4000, width: 8000, height: 4000 },
  { title: 'Azure Services Layer - Cloud Infrastructure', x: 10000, y: 6000, width: 8000, height: 4000 },
  { title: 'Database Layer - Data Storage & Management', x: 10000, y: 9000, width: 2000, height: 2000 },
  { title: 'External Systems - Third-party Integrations', x: 18000, y: 6000, width: 10000, height: 1000 }
];

let replacements = 0;

// Fix each group
groupFixes.forEach(fix => {
  const titleRegex = new RegExp(`"title": "${fix.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
  
  if (titleRegex.test(narrationContent)) {
    // Find the highlights section for this title
    const highlightRegex = new RegExp(
      `("title": "${fix.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"highlights": \\[)[\\s\\S]*?(\\])`,
      'g'
    );
    
    const newHighlight = `"highlights": [
      {
        "x": ${fix.x},
        "y": ${fix.y},
        "width": ${fix.width},
        "height": ${fix.height}
      }
    ]`;
    
    const newContent = narrationContent.replace(highlightRegex, `$1${newHighlight}`);
    
    if (newContent !== narrationContent) {
      narrationContent = newContent;
      replacements++;
      console.log(`✅ Fixed group: ${fix.title}`);
    }
  } else {
    console.log(`❌ Group not found: ${fix.title}`);
  }
});

// Write the updated file
fs.writeFileSync(narrationPath, narrationContent, 'utf8');

console.log('='.repeat(80));
console.log(`🎯 FIXED ${replacements} GROUP BOUNDARIES!`);
console.log('All group highlights now cover the correct areas.');
console.log('Please refresh your browser to see the corrected group highlights.');
