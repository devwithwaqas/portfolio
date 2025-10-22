/**
 * Fix workflow and layer highlight coordinates
 */

import fs from 'fs';
import { airasiaNarrationSteps as steps } from './src/config/airasiaNarration.js';

// Load layer boundaries
const layerBounds = JSON.parse(fs.readFileSync('layer_boundaries.json', 'utf8'));

// Load component coordinates for workflow bounds
const coordData = JSON.parse(fs.readFileSync('src/config/airasiaDiagramCoordinates.json', 'utf8'));
const components = coordData.components;

console.log('Fixing workflow and layer highlights...\n');

let fixed = 0;

steps.forEach((step, i) => {
  if (!step.title) return;
  
  const title = step.title;
  
  // Fix layer highlights
  if (layerBounds[title]) {
    const bounds = layerBounds[title];
    const old = step.highlights[0];
    
    if (old.x !== bounds.x || old.y !== bounds.y) {
      console.log(`✓ ${title}:`);
      console.log(`  Old: (${old.x}, ${old.y}) ${old.width}x${old.height}`);
      console.log(`  New: (${bounds.x}, ${bounds.y}) ${bounds.width}x${bounds.height}\n`);
      
      step.highlights[0] = {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height
      };
      fixed++;
    }
  }
  
  // Fix workflow highlights - calculate bounds from involved components
  else if (title.includes('Workflow')) {
    let workflowComponents = [];
    
    if (title.includes('Booking')) {
      // Booking workflow: UI -> Gateway -> Core Services -> Support Services -> Data
      workflowComponents = ['web_app', 'api_gateway', 'app_gateway', 'booking_service', 
                           'flight_service', 'employee_service', 'notification_service', 
                           'sql_database'];
    } else if (title.includes('Event Processing')) {
      // Event Processing: Service Bus -> Event Grid -> Functions -> Stream Analytics
      workflowComponents = ['service_bus', 'event_grid', 'azure_functions', 'stream_analytics'];
    } else if (title.includes('Monitoring')) {
      // Monitoring: Services -> App Insights -> Monitor -> Grafana/PowerBI
      workflowComponents = ['app_insights', 'azure_monitor', 'grafana', 'power_bi'];
    }
    
    if (workflowComponents.length > 0) {
      const validComponents = workflowComponents
        .filter(id => components[id])
        .map(id => components[id]);
      
      if (validComponents.length > 0) {
        const minX = Math.min(...validComponents.map(c => c.x));
        const minY = Math.min(...validComponents.map(c => c.y));
        const maxX = Math.max(...validComponents.map(c => c.x + c.width));
        const maxY = Math.max(...validComponents.map(c => c.y + c.height));
        
        const padding = 100; // More padding for workflows
        const bounds = {
          x: Math.round(minX - padding),
          y: Math.round(minY - padding),
          width: Math.round(maxX - minX + 2 * padding),
          height: Math.round(maxY - minY + 2 * padding)
        };
        
        const old = step.highlights[0];
        console.log(`✓ ${title}:`);
        console.log(`  Old: (${old.x}, ${old.y}) ${old.width}x${old.height}`);
        console.log(`  New: (${bounds.x}, ${bounds.y}) ${bounds.width}x${bounds.height}\n`);
        
        step.highlights[0] = bounds;
        fixed++;
      }
    }
  }
});

console.log(`\n✅ Fixed ${fixed} workflow/layer highlights\n`);

// Save updated narration
const output = `/**
 * AirAsia ID90 - Architecture Narration Steps
 * Workflow and layer highlights fixed: ${new Date().toISOString()}
 */

export const airasiaNarrationSteps = ${JSON.stringify(steps, null, 2)};
`;

fs.writeFileSync('src/config/airasiaNarration.js', output, 'utf8');
console.log('✅ Saved to src/config/airasiaNarration.js');

