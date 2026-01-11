/**
 * FORCE BAT FIX
 * Directly edit the file with the correct coordinates
 */

const fs = require('fs');

console.log('FORCING BAT FIX');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationPath = 'src/config/batNarration.js';
let batNarrationContent = fs.readFileSync(batNarrationPath, 'utf8');

console.log('CURRENT FILE CONTENT (first 500 chars):');
console.log(batNarrationContent.substring(0, 500));

// Direct replacements for the most problematic steps
const directReplacements = [
  // Step 8: Mobile PWA should highlight Admin Dashboard
  {
    from: '"title": "Mobile PWA - Mobile Enterprise Access"[\\s\\S]*?"highlights":\\s*\\[\\s*\\{\\s*"x":\\s*[\\d.]+\\s*,\\s*"y":\\s*[\\d.]+\\s*,\\s*"width":\\s*[\\d.]+\\s*,\\s*"height":\\s*[\\d.]+',
    to: '"title": "Mobile PWA - Mobile Enterprise Access",\n    "speechTitle": "Mobile PWA - Mobile Enterprise Access",\n    "description": "The Mobile PWA provides mobile enterprise access with offline capabilities and p...",\n    "speechDescription": "The Mobile PWA provides mobile enterprise access with offline capabilities and push notifications. Built as an Angular PWA, this mobile interface ensures employees can access enterprise systems from anywhere, with real-time synchronization and comprehensive mobile security features.",\n    "icon": "architecture.svg",\n    "position": {\n      "x": 1351,\n      "y": 146\n    },\n    "highlights": [\n      {\n        "x": 2505.375,\n        "y": 1285.13,\n        "width": 664.25,\n        "height": 317.14\n      }\n    ]'
  },
  
  // Step 9: Admin Dashboard should highlight Analytics Dashboard
  {
    from: '"title": "Admin Dashboard - Administrative Interface"[\\s\\S]*?"highlights":\\s*\\[\\s*\\{\\s*"x":\\s*[\\d.]+\\s*,\\s*"y":\\s*[\\d.]+\\s*,\\s*"width":\\s*[\\d.]+\\s*,\\s*"height":\\s*[\\d.]+',
    to: '"title": "Admin Dashboard - Administrative Interface",\n    "speechTitle": "Admin Dashboard - Administrative Interface",\n    "description": "The Admin Dashboard provides comprehensive administrative capabilities for syste...",\n    "speechDescription": "The Admin Dashboard provides comprehensive administrative capabilities for system management. Built with Angular, this dashboard enables administrators to monitor system health, manage user access, configure integrations, and ensure system security. Features include real-time monitoring, user management, and system configuration tools.",\n    "icon": "architecture.svg",\n    "position": {\n      "x": 1601,\n      "y": 146\n    },\n    "highlights": [\n      {\n        "x": 3794.094,\n        "y": 1285.13,\n        "width": 643.04,\n        "height": 317.14\n      }\n    ]'
  },
  
  // Step 10: Analytics Dashboard should highlight Angular Portal
  {
    from: '"title": "Analytics Dashboard - Business Intelligence"[\\s\\S]*?"highlights":\\s*\\[\\s*\\{\\s*"x":\\s*[\\d.]+\\s*,\\s*"y":\\s*[\\d.]+\\s*,\\s*"width":\\s*[\\d.]+\\s*,\\s*"height":\\s*[\\d.]+',
    to: '"title": "Analytics Dashboard - Business Intelligence",\n    "speechTitle": "Analytics Dashboard - Business Intelligence",\n    "description": "The Analytics Dashboard provides comprehensive business intelligence and reporting...",\n    "speechDescription": "The Analytics Dashboard provides comprehensive business intelligence and reporting capabilities. Built with Angular, this dashboard enables business analysts to access real-time analytics, generate reports, and make data-driven decisions. Features include interactive charts, KPI monitoring, and advanced data visualization tools.",\n    "icon": "architecture.svg",\n    "position": {\n      "x": 1851,\n      "y": 146\n    },\n    "highlights": [\n      {\n        "x": 1369.5,\n        "y": 1259.66,\n        "width": 511.0,\n        "height": 368.07\n      }\n    ]'
  }
];

console.log('APPLYING DIRECT REPLACEMENTS:');
console.log('=' * 80);

let replacementCount = 0;
for (const { from, to } of directReplacements) {
  const regex = new RegExp(from, 'g');
  const beforeCount = (batNarrationContent.match(regex) || []).length;
  
  if (beforeCount > 0) {
    batNarrationContent = batNarrationContent.replace(regex, to);
    console.log(`[REPLACED] ${beforeCount} instances`);
    replacementCount += beforeCount;
  } else {
    console.log(`[NOT FOUND] Pattern not found`);
  }
}

// Write the updated content back to the file
fs.writeFileSync(batNarrationPath, batNarrationContent, 'utf8');

console.log('\nFORCE BAT FIX COMPLETE!');
console.log('=' * 80);
console.log(`Total replacements: ${replacementCount}`);
console.log('The file has been directly edited with the correct coordinates!');

// Verify the changes
console.log('\nVERIFYING CHANGES:');
console.log('=' * 80);
const updatedContent = fs.readFileSync(batNarrationPath, 'utf8');
const mobilePWAMatch = updatedContent.match(/"title": "Mobile PWA - Mobile Enterprise Access"[\s\S]*?"x":\s*([\d.]+)\s*,\s*"y":\s*([\d.]+)\s*,\s*"width":\s*([\d.]+)\s*,\s*"height":\s*([\d.]+)/);
if (mobilePWAMatch) {
  console.log(`Mobile PWA coordinates: x=${mobilePWAMatch[1]}, y=${mobilePWAMatch[2]}, width=${mobilePWAMatch[3]}, height=${mobilePWAMatch[4]}`);
} else {
  console.log('Mobile PWA coordinates not found');
}
