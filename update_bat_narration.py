#!/usr/bin/env python3
"""
Script to update batNarration.js with correct coordinates from verified data
"""

import json

# Verified component data from user CSV
verified_components = {
    # Individual services (rectangles)
    "SAP Planet 8/9": {"x": 25811.44, "y": 6277.75, "width": 529.64, "height": 273.49},
    "Cherwell HR": {"x": 21073.94, "y": 6277.75, "width": 529.64, "height": 273.49},
    "Power Apps": {"x": 22227.06, "y": 6277.75, "width": 529.64, "height": 273.49},
    "Microsoft Teams": {"x": 24658.31, "y": 6277.75, "width": 529.64, "height": 273.49},
    "Azure AD": {"x": 18768.44, "y": 6277.75, "width": 529.64, "height": 273.49},
    "Azure Data Lake": {"x": 19921.56, "y": 6277.75, "width": 529.64, "height": 273.49},
    "ML Platform": {"x": 11295, "y": 10188, "width": 488, "height": 317},
    "Backup Service": {"x": 1992, "y": 10188, "width": 494, "height": 317},
    "Azure Monitor": {"x": 10702, "y": 9195, "width": 462, "height": 368},
    "Event Grid": {"x": 15648, "y": 8253, "width": 538, "height": 317},
    "Cherwell IT": {"x": 26967, "y": 6278, "width": 643, "height": 273},
    "SharePoint": {"x": 23382, "y": 6278, "width": 651, "height": 273},
    "Reporting Service": {"x": 786, "y": 11144, "width": 567, "height": 317},
    "Auth Service": {"x": 5704, "y": 5201, "width": 481, "height": 375},
    "Service Bus": {"x": 15641, "y": 7282, "width": 571, "height": 317},
    "Stream Analytics": {"x": 15622, "y": 10188, "width": 583, "height": 317},
    "Analytics Service": {"x": 5615, "y": 4233, "width": 586, "height": 317},
    "Power BI": {"x": 10083, "y": 10188, "width": 586, "height": 317},
    "Angular Portal": {"x": 1390, "y": 1280, "width": 511, "height": 368},
    "Monitoring Service": {"x": 772, "y": 10188, "width": 596, "height": 317},
    "Audit Service": {"x": 3110, "y": 10188, "width": 602, "height": 317},
    "Integration Service": {"x": 6824, "y": 4233, "width": 605, "height": 317},
    "Azure Functions": {"x": 15605, "y": 9221, "width": 605, "height": 317},
    "Notification Service": {"x": 6811, "y": 5230, "width": 618, "height": 317},
    "App Insights": {"x": 10620, "y": 8253, "width": 625, "height": 317},
    "Analytics Dashboard": {"x": 3814, "y": 1305, "width": 643, "height": 317},
    "Security Gateway": {"x": 1919, "y": 4208, "width": 558, "height": 368},
    "IT Service": {"x": 4416, "y": 7253, "width": 552, "height": 375},
    "App Gateway": {"x": 1921, "y": 3266, "width": 660, "height": 317},
    "Admin Dashboard": {"x": 2525, "y": 1305, "width": 664, "height": 317},
    "Saga Orchestrator": {"x": 4416, "y": 5230, "width": 665, "height": 317},
    "Mobile PWA": {"x": 88, "y": 1305, "width": 677, "height": 317},
    "HR Service": {"x": 5050, "y": 6201, "width": 528, "height": 426},
    "API Management": {"x": 1942, "y": 2273, "width": 619, "height": 368},
    "Business Analyst": {"x": 3865, "y": 206, "width": 541, "height": 423},
    "BAT Employee": {"x": 741, "y": 180, "width": 558, "height": 474},
    "System Admin": {"x": 2518, "y": 206, "width": 680, "height": 423},
    
    # Database components
    "Azure SQL Database": {"x": 15600, "y": 11120, "width": 640, "height": 350},
    "Azure Cosmos DB": {"x": 16860, "y": 11120, "width": 565, "height": 350},
    "Data Lake Storage": {"x": 18050, "y": 11120, "width": 590, "height": 350},
    "Redis Cache": {"x": 19260, "y": 11120, "width": 670, "height": 350},
    
    # Group components
    "Enterprise Frontend Portal": {"x": 50, "y": 1170, "width": 4550, "height": 550},
    "Azure API Gateway": {"x": 1870, "y": 2200, "width": 770, "height": 2500},
    "Azure Service Fabric Microservices": {"x": 4350, "y": 4110, "width": 3200, "height": 3680},
    "Monitoring & Analytics": {"x": 10050, "y": 8130, "width": 1820, "height": 2500},
    "Event Processing": {"x": 15530, "y": 7150, "width": 760, "height": 3560},
    "Database Layer": {"x": 15530, "y": 11000, "width": 4580, "height": 550},
    "External Systems": {"x": 18690, "y": 6150, "width": 9200, "height": 480},
    "User Personas": {"x": 720, "y": 160, "width": 3800, "height": 530},
    "Support Services": {"x": 700, "y": 10060, "width": 3150, "height": 1530}
}

# Mapping of narration step titles to component names
step_mapping = {
    "BAT Employee - Primary User": "BAT Employee",
    "BAT Admin - System Administrator": "System Admin", 
    "BAT Analyst - Business Intelligence User": "Business Analyst",
    "Angular Portal - Unified Enterprise Interface": "Angular Portal",
    "Mobile PWA - Progressive Web Application": "Mobile PWA",
    "Admin Dashboard - System Management Interface": "Admin Dashboard",
    "Analytics Dashboard - Business Intelligence Interface": "Analytics Dashboard",
    "Azure API Gateway - API Management": "Azure API Gateway",
    "API Management (APIM) - Enterprise API Hub": "API Management",
    "Application Gateway - Load Balancer & WAF": "App Gateway",
    "Security Gateway - Authentication & Authorization": "Security Gateway",
    "Azure Service Fabric - Microservices Platform": "Azure Service Fabric Microservices",
    "Authentication Service - Identity Management": "Auth Service",
    "IT Service Management - ITSM Platform": "IT Service",
    "Analytics Service - Business Intelligence": "Analytics Service",
    "Integration Service - Enterprise Integration": "Integration Service",
    "Notification Service - .NET Core Microservice": "Notification Service",
    "Saga Orchestrator - Workflow Management": "Saga Orchestrator",
    "Audit Service - Compliance & Logging": "Audit Service",
    "Monitoring Service - System Health": "Monitoring Service",
    "Backup Service - Data Protection": "Backup Service",
    "Reporting Service - Business Reports": "Reporting Service",
    "Azure Service Bus - Message Broker": "Service Bus",
    "Azure Event Grid - Event Routing": "Event Grid",
    "Azure Functions - Serverless Computing": "Azure Functions",
    "Stream Analytics - Real-time Processing": "Stream Analytics",
    "Azure Monitor - System Monitoring": "Azure Monitor",
    "Power BI - Business Intelligence": "Power BI",
    "SAP Planet 8/9 - ERP Integration": "SAP Planet 8/9",
    "Cherwell HR - Human Resources": "Cherwell HR",
    "Cherwell IT - IT Service Management": "Cherwell IT",
    "Azure AD - External Systems": "Azure AD",
    "Azure Data Lake - Data Storage": "Azure Data Lake",
    "Power Apps - Low-Code Development": "Power Apps",
    "SharePoint - Collaboration Platform": "SharePoint",
    "Microsoft Teams - Communication Platform": "Microsoft Teams",
    "Azure SQL Database - Primary Database": "Azure SQL Database",
    "Azure Cosmos DB - NoSQL Database": "Azure Cosmos DB",
    "Redis Cache - In-Memory Cache": "Redis Cache",
    "Database Layer - Data Storage Architecture": "Database Layer",
    "Azure Services Layer - Cloud Platform": "Event Processing",
    "Cloud Infrastructure - Azure Foundation": "Support Services",
    "Complete Architecture Overview - Enterprise Platform": "Complete Architecture"
}

def update_narration_file():
    """Update the batNarration.js file with correct coordinates"""
    
    # Read the current file
    with open('src/config/batNarration.js', 'r') as f:
        content = f.read()
    
    # Extract the steps array
    start_marker = 'export const batNarrationSteps = ['
    end_marker = '];'
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker, start_idx)
    
    if start_idx == -1 or end_idx == -1:
        print("Could not find the steps array in the file")
        return
    
    # Extract the steps JSON
    steps_json = content[start_idx + len(start_marker):end_idx].strip()
    if steps_json.startswith('['):
        steps_json = steps_json[1:]
    if steps_json.endswith(']'):
        steps_json = steps_json[:-1]
    
    # Parse and update each step
    steps = []
    step_blocks = steps_json.split('},')
    
    for i, block in enumerate(step_blocks):
        if not block.strip():
            continue
            
        # Add back the closing brace if it was removed
        if not block.strip().endswith('}'):
            block += '}'
        
        try:
            # Clean up the block
            block = block.strip()
            if block.startswith(','):
                block = block[1:]
            
            # Parse the step
            step = json.loads(block)
            
            # Update coordinates if we have a mapping
            title = step.get('title', '')
            if title in step_mapping:
                component_name = step_mapping[title]
                if component_name in verified_components:
                    coords = verified_components[component_name]
                    
                    # Update position
                    step['position'] = {
                        "x": coords['x'],
                        "y": coords['y']
                    }
                    
                    # Update highlights
                    step['highlights'] = [
                        {
                            "x": coords['x'],
                            "y": coords['y'],
                            "width": coords['width'],
                            "height": coords['height']
                        }
                    ]
                    
                    print(f"Updated: {title} -> {component_name}")
            
            steps.append(step)
            
        except json.JSONDecodeError as e:
            print(f"Error parsing step {i}: {e}")
            print(f"Block: {block[:200]}...")
            continue
    
    # Write the updated file
    with open('src/config/batNarration_updated.js', 'w') as f:
        f.write('// ========================================\n')
        f.write('// BAT Inhouse App C4 Diagram Narration\n')
        f.write('// HeatExchanger-compatible format\n')
        f.write('// ========================================\n\n')
        f.write('export const batNarrationSteps = [\n')
        
        for i, step in enumerate(steps):
            f.write('  // ========================================\n')
            f.write(f'  // Step {i+1}: {step.get("title", "Unknown")}\n')
            f.write('  // ========================================\n')
            f.write('  ' + json.dumps(step, indent=2).replace('\n', '\n  '))
            if i < len(steps) - 1:
                f.write(',')
            f.write('\n\n')
        
        f.write('];\n')
    
    print(f"Updated narration file written to: src/config/batNarration_updated.js")
    print(f"Updated {len(steps)} steps")

if __name__ == "__main__":
    update_narration_file()
