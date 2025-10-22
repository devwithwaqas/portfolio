/**
 * Fix ALL narration coordinates to match extraction
 */

import fs from 'fs';
import { airasiaNarrationSteps as steps } from './src/config/airasiaNarration.js';

const coordData = JSON.parse(fs.readFileSync('src/config/airasiaDiagramCoordinates.json', 'utf8'));
const components = coordData.components;

const idMapping = {
  "Web Application": "web_app",
  "Mobile PWA": "mobile_pwa",
  "Admin Dashboard": "admin_dashboard",
  "Azure API Management": "api_gateway",
  "Application Gateway": "app_gateway",
  "Authentication Service": "auth_service",
  "Booking Service": "booking_service",
  "Flight Data Service": "flight_service",
  "Employee Service": "employee_service",
  "Notification Service": "notification_service",
  "Analytics Service": "analytics_service",
  "Refund Service": "refund_service",
  "Audit Service": "audit_service",
  "Azure Service Bus": "service_bus",
  "Azure Event Grid": "event_grid",
  "Event Grid": "event_grid",
  "Azure Functions": "azure_functions",
  "Azure Stream Analytics": "stream_analytics",
  "Azure SQL Database": "sql_database",
  "Redis Cache": "redis_cache",
  "Azure Blob Storage": "blob_storage",
  "Azure Cosmos DB": "cosmos_db",
  "Application Insights": "app_insights",
  "Azure Monitor": "azure_monitor",
  "Grafana": "grafana",
  "Power BI": "power_bi",
  "Google SSO": "google_sso",
  "AirAsia Flight Systems": "airasia_flights",
  "SMS Gateway": "sms_gateway",
  "Email Service": "email_service",
  "Teams API": "teams_api",
  "Push Notification Service": "push_service",
  "Employee": "employee",
  "Admin": "admin"
};

console.log('Checking ALL narration coordinates...\n');

let mismatches = [];
steps.forEach((step, i) => {
  if (!step.title || !step.highlights || !step.highlights[0]) return;
  
  const componentId = idMapping[step.title];
  if (componentId && components[componentId]) {
    const coord = components[componentId];
    const narr = step.highlights[0];
    
    const xDiff = Math.abs(narr.x - coord.x);
    const yDiff = Math.abs(narr.y - coord.y);
    
    if (xDiff > 0.5 || yDiff > 0.5) {
      mismatches.push({
        title: step.title,
        componentId,
        narration: { x: narr.x, y: narr.y },
        correct: { x: coord.x, y: coord.y },
        diff: { x: xDiff, y: yDiff }
      });
      
      // Fix it
      step.highlights[0].x = coord.x;
      step.highlights[0].y = coord.y;
      step.highlights[0].width = coord.width;
      step.highlights[0].height = coord.height;
    }
  }
});

if (mismatches.length > 0) {
  console.log(`Found ${mismatches.length} coordinate mismatches:\n`);
  mismatches.forEach(m => {
    console.log(`✗ ${m.title}:`);
    console.log(`  Narration: (${m.narration.x}, ${m.narration.y})`);
    console.log(`  Correct:   (${m.correct.x}, ${m.correct.y})`);
    console.log(`  Diff:      (${m.diff.x.toFixed(1)}px, ${m.diff.y.toFixed(1)}px)\n`);
  });
  
  // Save fixed version
  const output = `/**
 * AirAsia ID90 - Architecture Narration Steps
 * Coordinates fixed: ${new Date().toISOString()}
 */

export const airasiaNarrationSteps = ${JSON.stringify(steps, null, 2)};
`;
  
  fs.writeFileSync('src/config/airasiaNarration.js', output, 'utf8');
  console.log(`✅ Fixed ${mismatches.length} coordinates and saved to airasiaNarration.js`);
} else {
  console.log('✅ All coordinates are correct!');
}

