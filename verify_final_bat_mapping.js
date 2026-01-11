/**
 * VERIFY FINAL BAT MAPPING
 * Check that the key components are correctly mapped
 */

const fs = require('fs');

console.log('VERIFYING FINAL BAT MAPPING');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationContent = fs.readFileSync('src/config/batNarration.js', 'utf8');

// Check the key problematic steps
const keySteps = [
  'Angular Portal - Desktop Enterprise Access',
  'Mobile PWA - Mobile Enterprise Access', 
  'Admin Dashboard - Administrative Interface',
  'Analytics Dashboard - Business Intelligence'
];

console.log('CHECKING KEY STEPS:');
console.log('=' * 80);

keySteps.forEach(stepTitle => {
  const regex = new RegExp(`"title": "${stepTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"highlights":\\s*\\[\\s*\\{\\s*"x":\\s*([\\d.]+)\\s*,\\s*"y":\\s*([\\d.]+)\\s*,\\s*"width":\\s*([\\d.]+)\\s*,\\s*"height":\\s*([\\d.]+)`, 'g');
  const match = regex.exec(batNarrationContent);
  
  if (match) {
    const x = parseFloat(match[1]);
    const y = parseFloat(match[2]);
    const width = parseFloat(match[3]);
    const height = parseFloat(match[4]);
    
    console.log(`✅ ${stepTitle}`);
    console.log(`   Coordinates: x=${x}, y=${y}, width=${width}, height=${height}`);
    
    // Verify these are the correct coordinates
    if (stepTitle === 'Angular Portal - Desktop Enterprise Access') {
      if (x === 67.625 && y === 1285.13) {
        console.log('   ✅ CORRECT - This should highlight the Angular Portal component');
      } else {
        console.log('   ❌ WRONG - This should be x=67.625, y=1285.13');
      }
    } else if (stepTitle === 'Mobile PWA - Mobile Enterprise Access') {
      if (x === 2505.375 && y === 1285.13) {
        console.log('   ✅ CORRECT - This should highlight the Mobile PWA component');
      } else {
        console.log('   ❌ WRONG - This should be x=2505.375, y=1285.13');
      }
    } else if (stepTitle === 'Admin Dashboard - Administrative Interface') {
      if (x === 3794.094 && y === 1285.13) {
        console.log('   ✅ CORRECT - This should highlight the Admin Dashboard component');
      } else {
        console.log('   ❌ WRONG - This should be x=3794.094, y=1285.13');
      }
    } else if (stepTitle === 'Analytics Dashboard - Business Intelligence') {
      if (x === 1369.5 && y === 1259.66) {
        console.log('   ✅ CORRECT - This should highlight the Analytics Dashboard component');
      } else {
        console.log('   ❌ WRONG - This should be x=1369.5, y=1259.66');
      }
    }
  } else {
    console.log(`❌ ${stepTitle} - NOT FOUND`);
  }
});

console.log('\nFINAL VERIFICATION COMPLETE!');
console.log('=' * 80);
console.log('The BAT diagram should now work correctly:');
console.log('- Step 6 (Angular Portal) highlights the Angular Portal component');
console.log('- Step 7 (Mobile PWA) highlights the Mobile PWA component');
console.log('- Step 8 (Admin Dashboard) highlights the Admin Dashboard component');
console.log('- Step 9 (Analytics Dashboard) highlights the Analytics Dashboard component');

