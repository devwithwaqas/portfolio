const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing user component mapping for BAT narration...');

// Load the user components analysis
const userComponentsPath = path.join(__dirname, 'bat_user_components.json');
const userComponents = JSON.parse(fs.readFileSync(userComponentsPath, 'utf8'));

// Load the narration file
const narrationPath = path.join(__dirname, 'src/config/batNarration.js');
let narrationContent = fs.readFileSync(narrationPath, 'utf8');

console.log(`📊 Found ${userComponents.length} user-related components`);

// Find the actual user rectangles (person actors)
const userRectangles = userComponents.filter(comp => 
  comp.type === 'user_rectangle' && 
  comp.near_text && 
  (comp.near_text.includes('BAT') || comp.near_text.includes('System') || comp.near_text.includes('Business'))
);

console.log(`📊 Found ${userRectangles.length} user rectangles:`);
userRectangles.forEach((rect, index) => {
  console.log(`   ${index + 1}. ${rect.near_text}: ${rect.x}, ${rect.y}, ${rect.width}x${rect.height}`);
});

// Create correct mapping for user steps
const userStepMapping = {
  // Step 2: BAT Employee - Primary User
  2: userRectangles.find(rect => rect.near_text.includes('BAT')) || { x: 721.2, y: 160.3, width: 557.5, height: 474.4 },
  
  // Step 3: System Administrator - Platform Management  
  3: userRectangles.find(rect => rect.near_text.includes('System')) || { x: 2497.7, y: 185.7, width: 679.6, height: 423.5 },
  
  // Step 4: Business Analyst - Analytics & Intelligence
  4: userRectangles.find(rect => rect.near_text.includes('Business')) || { x: 3845.2, y: 185.7, width: 541.0, height: 423.5 }
};

console.log(`📊 Applying correct user mapping:`);
console.log(`   Step 2 (BAT Employee): ${userStepMapping[2].x}, ${userStepMapping[2].y}, ${userStepMapping[2].width}x${userStepMapping[2].height}`);
console.log(`   Step 3 (System Administrator): ${userStepMapping[3].x}, ${userStepMapping[3].y}, ${userStepMapping[3].width}x${userStepMapping[3].height}`);
console.log(`   Step 4 (Business Analyst): ${userStepMapping[4].x}, ${userStepMapping[4].y}, ${userStepMapping[4].width}x${userStepMapping[4].height}`);

// Apply the mapping to the narration file
let updatedSteps = 0;

// Regex to find and replace highlights in narration steps
const highlightRegex = /"highlights":\s*\[\s*{\s*"x":\s*(\d+(?:\.\d+)?),\s*"y":\s*(\d+(?:\.\d+)?),\s*"width":\s*(\d+(?:\.\d+)?),\s*"height":\s*(\d+(?:\.\d+)?)\s*}/g;

let stepIndex = 0;
narrationContent = narrationContent.replace(highlightRegex, (match, x, y, width, height) => {
  // Check if this is a user step (2, 3, or 4)
  if (stepIndex >= 2 && stepIndex <= 4) {
    const userCoords = userStepMapping[stepIndex];
    if (userCoords) {
      updatedSteps++;
      stepIndex++;
      
      return `"highlights": [
      {
        "x": ${userCoords.x},
        "y": ${userCoords.y},
        "width": ${userCoords.width},
        "height": ${userCoords.height}
      }`;
    }
  }
  
  stepIndex++;
  return match;
});

fs.writeFileSync(narrationPath, narrationContent, 'utf8');

console.log(`✅ Updated ${updatedSteps} user narration steps with correct coordinates!`);
console.log(`📊 User steps now highlight the actual person actors instead of external systems`);
console.log(`🎯 Step 2: BAT Employee person actor (top-left)`);
console.log(`🎯 Step 3: System Administrator person actor (top-center)`);
console.log(`🎯 Step 4: Business Analyst person actor (top-right)`);
