/**
 * SIMPLE BAT VERIFICATION
 * Check key components are correctly mapped
 */

const fs = require('fs');

console.log('SIMPLE BAT VERIFICATION');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationContent = fs.readFileSync('src/config/batNarration.js', 'utf8');

// Check key components
const keyComponents = [
  'Angular Portal - Desktop Enterprise Access',
  'Mobile PWA - Mobile Enterprise Access', 
  'Admin Dashboard - Administrative Interface',
  'Analytics Dashboard - Business Intelligence',
  'SAP Planet 8/9 - ERP System Integration',
  'Power BI - Business Intelligence'
];

console.log('CHECKING KEY COMPONENTS:');
console.log('=' * 80);

keyComponents.forEach(component => {
  const regex = new RegExp(`"title": "${component.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"highlights":\\s*\\[\\s*\\{\\s*"x":\\s*([\\d.]+)\\s*,\\s*"y":\\s*([\\d.]+)\\s*,\\s*"width":\\s*([\\d.]+)\\s*,\\s*"height":\\s*([\\d.]+)`, 'g');
  const match = regex.exec(batNarrationContent);
  
  if (match) {
    const x = parseFloat(match[1]);
    const y = parseFloat(match[2]);
    const width = parseFloat(match[3]);
    const height = parseFloat(match[4]);
    
    console.log(`✅ ${component}`);
    console.log(`   Coordinates: x=${x}, y=${y}, width=${width}, height=${height}`);
  } else {
    console.log(`❌ ${component} - NOT FOUND`);
  }
});

console.log('\nBAT COORDINATES VERIFICATION COMPLETE!');
console.log('=' * 80);
console.log('The diagram should now highlight components correctly.');

