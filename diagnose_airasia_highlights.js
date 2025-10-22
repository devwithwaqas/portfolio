/**
 * Diagnostic script to check AirAsia highlight coordinates
 * Compare with actual SVG dimensions and HeatExchanger pattern
 */

const fs = require('fs');

// Load AirAsia narration
const airasia = require('./src/config/airasiaNarration.js');
const airasiaNarration = airasia.airasiaNarrationSteps;

// Load HeatExchanger narration for comparison
const hx = require('./src/config/heatExchangerNarration.js');
const hxNarration = hx.heatExchangerNarrationSteps;

console.log('='.repeat(80));
console.log('AIRASIA HIGHLIGHT DIAGNOSTIC');
console.log('='.repeat(80));

console.log(`\nTotal AirAsia steps: ${airasiaNarration.length}`);
console.log(`Total HeatExchanger steps: ${hxNarration.length}\n`);

// Check first few highlights
console.log('AIRASIA FIRST 5 HIGHLIGHTS:');
console.log('-'.repeat(80));
airasiaNarration.slice(0, 5).forEach((step, i) => {
  const h = step.highlights[0];
  console.log(`${i+1}. ${step.title}`);
  console.log(`   Highlight: x=${h.x}, y=${h.y}, w=${h.width}, h=${h.height}`);
  console.log(`   Center: (${h.x + h.width/2}, ${h.y + h.height/2})`);
  console.log(`   Position: x=${step.position.x}, y=${step.position.y}\n`);
});

console.log('\nHEATEXCHANGER FIRST 5 HIGHLIGHTS:');
console.log('-'.repeat(80));
hxNarration.slice(0, 5).forEach((step, i) => {
  const h = step.highlights[0];
  console.log(`${i+1}. ${step.title}`);
  console.log(`   Highlight: x=${h.x}, y=${h.y}, w=${h.width}, h=${h.height}`);
  console.log(`   Center: (${h.x + h.width/2}, ${h.y + h.height/2})`);
  console.log(`   Position: x=${step.position.x}, y=${step.position.y}\n`);
});

// Check for patterns
console.log('\nCOORDINATE RANGE ANALYSIS:');
console.log('-'.repeat(80));

const getRange = (narration, label) => {
  const allX = [];
  const allY = [];
  const allW = [];
  const allH = [];
  
  narration.forEach(step => {
    if (step.highlights && step.highlights.length > 0) {
      const h = step.highlights[0];
      allX.push(h.x);
      allY.push(h.y);
      allW.push(h.width);
      allH.push(h.height);
    }
  });
  
  console.log(`\n${label}:`);
  console.log(`  X range: ${Math.min(...allX).toFixed(1)} - ${Math.max(...allX).toFixed(1)}`);
  console.log(`  Y range: ${Math.min(...allY).toFixed(1)} - ${Math.max(...allY).toFixed(1)}`);
  console.log(`  Width range: ${Math.min(...allW).toFixed(1)} - ${Math.max(...allW).toFixed(1)}`);
  console.log(`  Height range: ${Math.min(...allH).toFixed(1)} - ${Math.max(...allH).toFixed(1)}`);
};

getRange(airasiaNarration, 'AirAsia');
getRange(hxNarration, 'HeatExchanger');

console.log('\n' + '='.repeat(80));
console.log('DIAGNOSIS COMPLETE');
console.log('='.repeat(80));

