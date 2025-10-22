/**
 * Calculate correct package/layer boundaries from component coordinates
 */

import fs from 'fs';

const coordData = JSON.parse(fs.readFileSync('src/config/airasiaDiagramCoordinates.json', 'utf8'));
const components = coordData.components;

// Define which components belong to each layer (from PUML)
const layers = {
  'User Interface Layer': ['web_app', 'mobile_pwa', 'admin_dashboard'],
  'API Gateway & Security Layer': ['api_gateway', 'app_gateway'],
  'Core Business Services Layer': ['auth_service', 'booking_service', 'flight_service', 'employee_service'],
  'Support Services Layer': ['notification_service', 'analytics_service', 'refund_service', 'audit_service'],
  'Event Processing Layer': ['service_bus', 'event_grid', 'azure_functions', 'stream_analytics'],
  'Data Layer': ['sql_database', 'redis_cache', 'blob_storage', 'cosmos_db'],
  'Monitoring & Analytics Layer': ['app_insights', 'azure_monitor', 'grafana', 'power_bi'],
  'External Systems Layer': ['google_sso', 'airasia_flights', 'sms_gateway', 'email_service', 'teams_api', 'push_service']
};

console.log('Calculating layer boundaries from component positions...\n');

const layerBounds = {};

Object.entries(layers).forEach(([layerName, componentIds]) => {
  const validComponents = componentIds
    .filter(id => components[id])
    .map(id => components[id]);
  
  if (validComponents.length === 0) {
    console.log(`⚠️  ${layerName}: No components found`);
    return;
  }
  
  // Calculate bounding box with padding
  const minX = Math.min(...validComponents.map(c => c.x));
  const minY = Math.min(...validComponents.map(c => c.y));
  const maxX = Math.max(...validComponents.map(c => c.x + c.width));
  const maxY = Math.max(...validComponents.map(c => c.y + c.height));
  
  // Add padding (50px on all sides for package border)
  const padding = 50;
  
  layerBounds[layerName] = {
    x: Math.round(minX - padding),
    y: Math.round(minY - padding),
    width: Math.round(maxX - minX + 2 * padding),
    height: Math.round(maxY - minY + 2 * padding)
  };
  
  console.log(`✓ ${layerName}:`);
  console.log(`  Components: ${componentIds.length} (${validComponents.length} found)`);
  console.log(`  Bounds: x=${layerBounds[layerName].x}, y=${layerBounds[layerName].y}, w=${layerBounds[layerName].width}, h=${layerBounds[layerName].height}\n`);
});

// Save to file
fs.writeFileSync('layer_boundaries.json', JSON.stringify(layerBounds, null, 2), 'utf8');
console.log('✅ Saved to layer_boundaries.json');

