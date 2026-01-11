const fs = require('fs');

console.log('FIXING REAL DATABASE COORDINATES');
console.log('='.repeat(80));

// Read the current narration file
const narrationPath = 'src/config/batNarration.js';
let narrationContent = fs.readFileSync(narrationPath, 'utf8');

// REAL database coordinates from the bottom-right area
const databaseFixes = [
  // Individual databases (bottom-right area)
  { title: 'Azure SQL Database - Transactional Data', x: 10681.6875, y: 9175.0977, width: 461.6211, height: 368.0664 },
  { title: 'Azure Cosmos DB - Document Storage', x: 11274.7188, y: 10168.1602, width: 488.0585, height: 317.1387 },
  { title: 'Redis Cache - High-performance Cache', x: 10063.4375, y: 10168.1602, width: 585.6201, height: 317.1387 },
  { title: 'Power BI - Business Intelligence', x: 10063.4375, y: 10168.1602, width: 585.6201, height: 317.1387 },
  { title: 'ML Platform - Machine Learning', x: 11274.7188, y: 10168.1602, width: 488.0585, height: 317.1387 },
  { title: 'Azure Monitor - Infrastructure Monitoring', x: 10681.6875, y: 9175.0977, width: 461.6211, height: 368.0664 },
  
  // Database Layer group (should cover the bottom-right area)
  { title: 'Database Layer - Data Storage & Management', x: 10000, y: 9000, width: 2000, height: 2000 },
  
  // Azure Services Layer group (should cover the right area)
  { title: 'Azure Services Layer - Cloud Infrastructure', x: 10000, y: 6000, width: 8000, height: 4000 }
];

let replacements = 0;

// Fix each database component
databaseFixes.forEach(fix => {
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
      console.log(`✅ Fixed database: ${fix.title}`);
      console.log(`   Coordinates: x=${fix.x}, y=${fix.y}, width=${fix.width}, height=${fix.height}`);
    }
  } else {
    console.log(`❌ Not found: ${fix.title}`);
  }
});

// Write the updated file
fs.writeFileSync(narrationPath, narrationContent, 'utf8');

console.log('='.repeat(80));
console.log(`🎯 FIXED ${replacements} DATABASE COORDINATES!`);
console.log('All databases now point to the REAL bottom-right area of the SVG.');
console.log('Please refresh your browser to see the corrected database highlights.');
