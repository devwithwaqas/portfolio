const fs = require('fs');

console.log('FIXING ALL DUPLICATE HIGHLIGHTS - FINAL FIX');
console.log('='.repeat(80));

// Read the current narration file
const narrationPath = 'src/config/batNarration.js';
let narrationContent = fs.readFileSync(narrationPath, 'utf8');

// Count occurrences before fix
const beforeCount = (narrationContent.match(/"highlights": \["highlights": \[/g) || []).length;
console.log(`Found ${beforeCount} duplicate highlights patterns`);

// Fix ALL duplicate highlights
narrationContent = narrationContent.replace(/"highlights": \["highlights": \[/g, '"highlights": [');

// Count occurrences after fix
const afterCount = (narrationContent.match(/"highlights": \["highlights": \[/g) || []).length;
console.log(`After fix: ${afterCount} duplicate highlights patterns remaining`);

// Write the updated file
fs.writeFileSync(narrationPath, narrationContent, 'utf8');

// Verify syntax
try {
  require('vm').createContext({});
  require('vm').runInContext(narrationContent, require('vm').createContext({}));
  console.log('✅ JavaScript syntax is valid!');
} catch (error) {
  console.log('❌ JavaScript syntax error:', error.message);
}

console.log('='.repeat(80));
console.log(`🎯 FIXED ${beforeCount - afterCount} DUPLICATE HIGHLIGHTS!`);
console.log('All syntax errors should now be resolved.');
console.log('Please refresh your browser to see the working BAT diagram.');
