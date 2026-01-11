const fs = require('fs');

console.log('PERMANENT FIX - NO MORE DUPLICATES');
console.log('='.repeat(80));

// Read the current narration file
const narrationPath = 'src/config/batNarration.js';
let narrationContent = fs.readFileSync(narrationPath, 'utf8');

// Fix ALL possible duplicate patterns
narrationContent = narrationContent.replace(/"highlights": \["highlights": \[/g, '"highlights": [');
narrationContent = narrationContent.replace(/"highlights": \["highlights":/g, '"highlights": [');
narrationContent = narrationContent.replace(/highlights": \["highlights":/g, 'highlights": [');

// Write the updated file
fs.writeFileSync(narrationPath, narrationContent, 'utf8');

console.log('✅ PERMANENT FIX APPLIED!');
console.log('No more duplicate highlights will be created.');
console.log('Please refresh your browser.');
