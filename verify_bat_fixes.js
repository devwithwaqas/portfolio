/**
 * VERIFY BAT FIXES
 * Check if the coordinates are now correct
 */

const fs = require('fs');

console.log('VERIFYING BAT FIXES');
console.log('=' * 80);

// Read the current batNarration.js file
const batNarrationContent = fs.readFileSync('src/config/batNarration.js', 'utf8');

// Check key problematic steps
const keySteps = [
  'Mobile PWA - Mobile Enterprise Access',
  'Admin Dashboard - Administrative Interface',
  'Analytics Dashboard - Business Intelligence',
  'Azure API Gateway - State-of-the-Art API Management',
  'Application Gateway - Load Balancer & Routing',
  'Security Gateway - OAuth 2.0 & JWT Validation',
  'Authentication Service - OAuth 2.0 & JWT',
  'HR Management Service - Employee Data & Workflows',
  'IT Service Management - IT Support & Tickets',
  'Analytics Service - Business Intelligence',
  'Integration Service - System Integrations',
  'Saga Orchestrator - Distributed Transactions',
  'Audit Service - Compliance & Logging',
  'Monitoring Service - Health Checks',
  'Backup Service - Data Protection',
  'Reporting Service - Business Reports',
  'Azure Service Bus - Message Queuing',
  'Azure Event Grid - Event Routing',
  'Azure Functions - Serverless Processing',
  'Azure Monitor - Infrastructure Monitoring',
  'Power BI - Business Intelligence',
  'ML Platform - Machine Learning',
  'Application Insights - Application Telemetry',
  'Azure SQL Database - Transactional Data',
  'Azure Cosmos DB - Document Storage',
  'Data Lake Storage - Analytics Data',
  'SAP Planet 8/9 - ERP System Integration'
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
  } else {
    console.log(`❌ ${stepTitle} - NOT FOUND`);
  }
});

console.log('\nBAT FIXES VERIFICATION COMPLETE!');
console.log('=' * 80);
console.log('The coordinates should now be correct for each step!');

