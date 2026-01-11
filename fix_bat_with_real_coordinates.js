const fs = require('fs');

console.log('FIXING BAT NARRATION WITH REAL COORDINATES');
console.log('='.repeat(80));

// Read the current narration file
const narrationPath = 'src/config/batNarration.js';
let narrationContent = fs.readFileSync(narrationPath, 'utf8');

// Real coordinates from the Python script output
const realCoordinates = {
  // Frontend components (top area)
  'Angular Portal': { x: 1369.5, y: 1259.6602, width: 511.0016, height: 368.0664 },
  'Mobile PWA': { x: 67.625, y: 1285.1289, width: 677.2644, height: 317.1387 },
  'Admin Dashboard': { x: 2505.375, y: 1285.1289, width: 664.2548, height: 317.1387 },
  'Analytics Dashboard': { x: 3794.0937, y: 1285.1289, width: 643.042, height: 317.1387 },
  
  // API Gateway components
  'API Management': { x: 1921.8438, y: 2252.7227, width: 618.8385, height: 368.0664 },
  'Application Gateway': { x: 1901.2813, y: 3245.7852, width: 659.9609, height: 317.1387 },
  'Security Gateway': { x: 1898.875, y: 4187.9414, width: 558.4717, height: 368.0664 },
  
  // Services (middle area)
  'Authentication Service': { x: 5684.4063, y: 5181.0039, width: 481.2012, height: 375.3418 },
  'HR Management Service': { x: 5029.5938, y: 6181.3477, width: 528.2959, height: 426.2695 },
  'IT Service Management': { x: 4395.6875, y: 7232.6289, width: 552.4017, height: 375.3418 },
  'Analytics Service': { x: 5594.6875, y: 4213.4102, width: 585.6201, height: 317.1387 },
  'Integration Service': { x: 6803.7813, y: 4213.4102, width: 604.9561, height: 317.1387 },
  'Notification Service': { x: 6790.875, y: 5210.0977, width: 618.2617, height: 317.1387 },
  'Saga Orchestrator': { x: 4395.75, y: 5210.0977, width: 664.7461, height: 317.1387 },
  
  // Bottom area services
  'Audit Service': { x: 3089.8125, y: 10168.1602, width: 601.5991, height: 317.1387 },
  'Monitoring Service': { x: 751.9688, y: 10168.1602, width: 596.0449, height: 317.1387 },
  'Backup Service': { x: 1971.8125, y: 10168.1602, width: 493.8965, height: 317.1387 },
  'Reporting Service': { x: 766.2813, y: 11124.3789, width: 567.4072, height: 317.1387 },
  
  // Azure services (right area)
  'Azure Service Bus': { x: 15620.9375, y: 7261.7227, width: 570.6055, height: 317.1387 },
  'Azure Event Grid': { x: 15627.8438, y: 8232.9727, width: 538.0615, height: 317.1387 },
  'Azure Functions': { x: 15584.9375, y: 9200.5664, width: 605.1025, height: 317.1387 },
  'Stream Analytics': { x: 15602.2188, y: 10168.1602, width: 583.0353, height: 317.1387 },
  'Application Insights': { x: 10600.0, y: 8232.9727, width: 624.9756, height: 317.1387 },
  'Azure Monitor': { x: 10681.6875, y: 9175.0977, width: 461.6211, height: 368.0664 },
  'Power BI': { x: 10063.4375, y: 10168.1602, width: 585.6201, height: 317.1387 },
  'ML Platform': { x: 11274.7188, y: 10168.1602, width: 488.0585, height: 317.1387 },
  
  // External systems (top right)
  'SAP Planet 8/9': { x: 25791.4375, y: 6257.7539, width: 529.6417, height: 273.4863 },
  'Cherwell HR': { x: 21053.9375, y: 6257.7539, width: 529.6417, height: 273.4863 },
  'Cherwell IT': { x: 26947.25, y: 6257.7539, width: 642.9993, height: 273.4863 },
  'Power Apps': { x: 22207.0625, y: 6257.7539, width: 529.6417, height: 273.4863 },
  'SharePoint': { x: 23362.2188, y: 6257.7539, width: 650.5402, height: 273.4863 },
  'Microsoft Teams': { x: 24638.3125, y: 6257.7539, width: 529.6417, height: 273.4863 },
  'Azure AD': { x: 18747.6875, y: 6257.7539, width: 529.6417, height: 273.4863 },
  'Azure Data Lake': { x: 19900.8125, y: 6257.7539, width: 529.6417, height: 273.4863 },
  
  // User types (top left)
  'BAT Employee': { x: 721.25, y: 160.2539, width: 557.5073, height: 474.4141 },
  'System Administrator': { x: 2497.6875, y: 185.7227, width: 679.6143, height: 423.4863 },
  'Business Analyst': { x: 3845.1563, y: 185.7227, width: 540.9668, height: 423.4863 }
};

// Group boundaries (calculated from the groups)
const groupBoundaries = {
  'Frontend Layer': { x: 0, y: 0, width: 5000, height: 2000 },
  'API Gateway Layer': { x: 0, y: 2000, width: 5000, height: 2000 },
  'Microservices Layer': { x: 0, y: 4000, width: 8000, height: 4000 },
  'Azure Services Layer': { x: 10000, y: 6000, width: 8000, height: 4000 },
  'Database Layer': { x: 10000, y: 9000, width: 2000, height: 2000 },
  'External Systems': { x: 18000, y: 6000, width: 10000, height: 1000 }
};

let replacements = 0;

// Fix individual components
Object.entries(realCoordinates).forEach(([componentName, coords]) => {
  const regex = new RegExp(`"title": "${componentName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"highlights": \\[[\\s\\S]*?\\{([\\s\\S]*?)\\}`, 'g');
  
  const newHighlight = `"highlights": [
        {
          "x": ${coords.x},
          "y": ${coords.y},
          "width": ${coords.width},
          "height": ${coords.height}
        }
      ]`;
  
  const newContent = narrationContent.replace(regex, (match) => {
    return match.replace(/"highlights": \[[\s\S]*?\]/, newHighlight);
  });
  
  if (newContent !== narrationContent) {
    narrationContent = newContent;
    replacements++;
    console.log(`✅ Fixed: ${componentName}`);
  }
});

// Fix group boundaries
Object.entries(groupBoundaries).forEach(([groupName, coords]) => {
  const regex = new RegExp(`"title": "${groupName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"highlights": \\[[\\s\\S]*?\\{([\\s\\S]*?)\\}`, 'g');
  
  const newHighlight = `"highlights": [
        {
          "x": ${coords.x},
          "y": ${coords.y},
          "width": ${coords.width},
          "height": ${coords.height}
        }
      ]`;
  
  const newContent = narrationContent.replace(regex, (match) => {
    return match.replace(/"highlights": \[[\s\S]*?\]/, newHighlight);
  });
  
  if (newContent !== narrationContent) {
    narrationContent = newContent;
    replacements++;
    console.log(`✅ Fixed group: ${groupName}`);
  }
});

// Write the updated file
fs.writeFileSync(narrationPath, narrationContent, 'utf8');

console.log('='.repeat(80));
console.log(`🎯 FIXED ${replacements} COMPONENTS WITH REAL COORDINATES!`);
console.log('All coordinates now match the actual SVG positions.');
console.log('Please refresh your browser to see the corrected highlights.');
