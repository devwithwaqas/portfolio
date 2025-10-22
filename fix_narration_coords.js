/**
 * Fix narration coordinates to match extracted SVG coordinates
 */

import fs from 'fs';
import { airasiaNarrationSteps as steps } from './src/config/airasiaNarration.js';

// Load coordinates
const coordData = JSON.parse(fs.readFileSync('src/config/airasiaDiagramCoordinates.json', 'utf8'));
const components = coordData.components;

// Component ID mapping
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

console.log('Fixing narration coordinates...\n');

let fixed = 0;
steps.forEach((step, i) => {
  if (!step.title) return;
  
  const componentId = idMapping[step.title];
  if (componentId && components[componentId]) {
    const coord = components[componentId];
    const oldX = step.highlights[0].x;
    const oldY = step.highlights[0].y;
    
    step.highlights[0].x = coord.x;
    step.highlights[0].y = coord.y;
    step.highlights[0].width = coord.width;
    step.highlights[0].height = coord.height;
    
    if (oldX !== coord.x || oldY !== coord.y) {
      console.log(`✓ ${step.title}: (${oldX}, ${oldY}) -> (${coord.x}, ${coord.y})`);
      fixed++;
    }
  }
});

console.log(`\nFixed ${fixed} coordinates\n`);

// Write output
const output = `/**
 * AirAsia ID90 - Architecture Narration Steps
 * Coordinates updated: ${new Date().toISOString()}
 */

export const airasiaNarrationSteps = ${JSON.stringify(steps, null, 2)};
`;

fs.writeFileSync('src/config/airasiaNarration.js', output, 'utf8');
console.log('✅ Saved to src/config/airasiaNarration.js');

