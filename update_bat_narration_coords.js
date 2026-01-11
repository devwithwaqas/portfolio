const fs = require('fs');

// Read the extracted coordinates
const coordinates = JSON.parse(fs.readFileSync('public/assets/diagrams/BAT_InhouseApp_C4_Diagram_coordinates.json', 'utf8'));

// Component ID mapping for BAT narration
const componentMapping = {
  // Actors
  'employee': 'employee',
  'admin': 'admin', 
  'analyst': 'analyst',
  
  // Frontend Layer
  'angular_portal': 'angular_portal',
  'mobile_pwa': 'mobile_pwa',
  'admin_dashboard': 'admin_dashboard',
  'analytics_dashboard': 'analytics_dashboard',
  
  // API Gateway
  'api_management': 'api_management',
  'app_gateway': 'app_gateway',
  'security_gateway': 'security_gateway',
  
  // Core Services
  'auth_service': 'auth_service',
  'hr_service': 'hr_service',
  'it_service': 'it_service',
  'analytics_service': 'analytics_service',
  'integration_service': 'integration_service',
  'notification_service': 'notification_service',
  'saga_orchestrator': 'saga_orchestrator',
  
  // Support Services
  'audit_service': 'audit_service',
  'monitoring_service': 'monitoring_service',
  'backup_service': 'backup_service',
  'reporting_service': 'reporting_service',
  
  // Event Processing
  'service_bus': 'service_bus',
  'event_grid': 'event_grid',
  'azure_functions': 'azure_functions',
  'stream_analytics': 'stream_analytics',
  
  // Data Layer
  'sql_database': 'sql_database',
  'cosmos_db': 'cosmos_db',
  'redis_cache': 'redis_cache',
  'data_lake_storage': 'data_lake_storage',
  
  // Monitoring
  'app_insights': 'app_insights',
  'azure_monitor': 'azure_monitor',
  'power_bi': 'power_bi',
  'ml_platform': 'ml_platform',
  
  // External Systems
  'sap_planet': 'sap_planet',
  'cherwell_hr': 'cherwell_hr',
  'cherwell_it': 'cherwell_it',
  'power_apps': 'power_apps',
  'sharepoint': 'sharepoint',
  'teams': 'teams',
  'azure_ad': 'azure_ad',
  'data_lake': 'data_lake'
};

// Read the current narration file
const narrationContent = fs.readFileSync('src/config/batNarration.js', 'utf8');

// Function to update coordinates for specific components
function updateNarrationCoordinates() {
  let updatedContent = narrationContent;
  
  // Update individual component highlights
  Object.entries(componentMapping).forEach(([componentId, coordKey]) => {
    if (coordinates.components[coordKey]) {
      const coord = coordinates.components[coordKey];
      
      // Find and replace the highlight for this component
      const highlightPattern = new RegExp(
        `(title: "${componentId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}[^"]*",[\\s\\S]*?highlights: \\[\\{[\\s\\S]*?x: )[0-9.-]+(,[\\s\\S]*?y: )[0-9.-]+(,[\\s\\S]*?width: )[0-9.-]+(,[\\s\\S]*?height: )[0-9.-]+(\\}[\\s\\S]*?\\]\\})`,
        'g'
      );
      
      updatedContent = updatedContent.replace(highlightPattern, (match, p1, p2, p3, p4, p5) => {
        return `${p1}${coord.x}${p2}${coord.y}${p3}${coord.width}${p4}${coord.height}${p5}`;
      });
    }
  });
  
  return updatedContent;
}

// Calculate package boundaries for layer highlights
function calculatePackageBoundaries() {
  const packages = {
    'ExternalSystems': {
      components: ['sap_planet', 'cherwell_hr', 'cherwell_it', 'power_apps', 'sharepoint', 'teams', 'azure_ad', 'data_lake'],
      name: 'External Enterprise Systems'
    },
    'UILayer': {
      components: ['angular_portal', 'mobile_pwa', 'admin_dashboard', 'analytics_dashboard'],
      name: 'Enterprise Frontend Portal'
    },
    'GatewayLayer': {
      components: ['api_management', 'app_gateway', 'security_gateway'],
      name: 'Azure API Gateway'
    },
    'CoreServices': {
      components: ['auth_service', 'hr_service', 'it_service', 'analytics_service', 'integration_service', 'notification_service', 'saga_orchestrator'],
      name: 'Azure Service Fabric Microservices'
    },
    'SupportServices': {
      components: ['audit_service', 'monitoring_service', 'backup_service', 'reporting_service'],
      name: 'Support Services'
    },
    'EventLayer': {
      components: ['service_bus', 'event_grid', 'azure_functions', 'stream_analytics'],
      name: 'Event Processing'
    },
    'DataLayer': {
      components: ['sql_database', 'cosmos_db', 'redis_cache', 'data_lake_storage'],
      name: 'Multi-Database Architecture'
    },
    'MonitoringLayer': {
      components: ['app_insights', 'azure_monitor', 'power_bi', 'ml_platform'],
      name: 'Monitoring & Analytics'
    }
  };
  
  const packageBoundaries = {};
  
  Object.entries(packages).forEach(([packageKey, packageInfo]) => {
    const componentCoords = packageInfo.components
      .filter(comp => coordinates.components[comp])
      .map(comp => coordinates.components[comp]);
    
    if (componentCoords.length > 0) {
      const minX = Math.min(...componentCoords.map(c => c.x));
      const minY = Math.min(...componentCoords.map(c => c.y));
      const maxX = Math.max(...componentCoords.map(c => c.x + c.width));
      const maxY = Math.max(...componentCoords.map(c => c.y + c.height));
      
      packageBoundaries[packageKey] = {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
        name: packageInfo.name
      };
    }
  });
  
  return packageBoundaries;
}

// Update the narration file
console.log('Updating BAT narration coordinates...');

const updatedContent = updateNarrationCoordinates();
const packageBoundaries = calculatePackageBoundaries();

// Update package/layer highlights
let finalContent = updatedContent;

// Update layer highlights
Object.entries(packageBoundaries).forEach(([packageKey, boundary]) => {
  const layerPatterns = {
    'ExternalSystems': 'External Enterprise Systems',
    'UILayer': 'Enterprise Frontend Portal', 
    'GatewayLayer': 'Azure API Gateway',
    'CoreServices': 'Azure Service Fabric Microservices',
    'SupportServices': 'Support Services',
    'EventLayer': 'Event Processing',
    'DataLayer': 'Multi-Database Architecture',
    'MonitoringLayer': 'Monitoring & Analytics'
  };
  
  const layerName = layerPatterns[packageKey];
  if (layerName) {
    const layerPattern = new RegExp(
      `(title: "${layerName}[^"]*",[\\s\\S]*?highlights: \\[\\{[\\s\\S]*?x: )[0-9.-]+(,[\\s\\S]*?y: )[0-9.-]+(,[\\s\\S]*?width: )[0-9.-]+(,[\\s\\S]*?height: )[0-9.-]+(\\}[\\s\\S]*?\\]\\})`,
      'g'
    );
    
    finalContent = finalContent.replace(layerPattern, (match, p1, p2, p3, p4, p5) => {
      return `${p1}${boundary.x}${p2}${boundary.y}${p3}${boundary.width}${p4}${boundary.height}${p5}`;
    });
  }
});

// Write the updated content
fs.writeFileSync('src/config/batNarration.js', finalContent);

console.log('✅ BAT narration coordinates updated successfully!');
console.log('📊 Package boundaries calculated:');
Object.entries(packageBoundaries).forEach(([key, boundary]) => {
  console.log(`  ${key}: x=${boundary.x}, y=${boundary.y}, w=${boundary.width}, h=${boundary.height}`);
});
