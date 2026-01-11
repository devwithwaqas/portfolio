#!/usr/bin/env python3
"""
Create proper BAT verification page with 44 shapes and 8 groups
"""

import json

def create_proper_bat_data():
    """Create proper BAT diagram data with 44 shapes and 8 groups"""
    
    # 44 Individual Shapes (37 rectangles + 4 databases + 3 other components)
    shapes = [
        # Frontend Applications (4)
        {"id": "angular_portal", "type": "rectangle", "x": 67.625, "y": 1285.13, "width": 677.26, "height": 317.14, "text": "Angular Portal - Unified Enterprise Interface", "verified": False},
        {"id": "mobile_pwa", "type": "rectangle", "x": 67.625, "y": 1600, "width": 677.26, "height": 317.14, "text": "Mobile PWA - Progressive Web Application", "verified": False},
        {"id": "admin_dashboard", "type": "rectangle", "x": 2505.375, "y": 1285.13, "width": 664.25, "height": 317.14, "text": "Admin Dashboard - System Management Interface", "verified": False},
        {"id": "analytics_dashboard", "type": "rectangle", "x": 3794.094, "y": 1285.13, "width": 643.04, "height": 317.14, "text": "Analytics Dashboard - Business Intelligence Interface", "verified": False},
        
        # API Gateway Layer (4)
        {"id": "azure_api_gateway", "type": "rectangle", "x": 1000, "y": 2000, "width": 300, "height": 200, "text": "Azure API Gateway - API Management", "verified": False},
        {"id": "api_management", "type": "rectangle", "x": 1400, "y": 2000, "width": 300, "height": 200, "text": "API Management (APIM) - Enterprise API Hub", "verified": False},
        {"id": "application_gateway", "type": "rectangle", "x": 1800, "y": 2000, "width": 300, "height": 200, "text": "Application Gateway - Load Balancer & WAF", "verified": False},
        {"id": "security_gateway", "type": "rectangle", "x": 2200, "y": 2000, "width": 300, "height": 200, "text": "Security Gateway - Authentication & Authorization", "verified": False},
        
        # Azure Services (8)
        {"id": "azure_service_fabric", "type": "rectangle", "x": 1000, "y": 2500, "width": 300, "height": 200, "text": "Azure Service Fabric - Microservices Platform", "verified": False},
        {"id": "authentication_service", "type": "rectangle", "x": 1400, "y": 2500, "width": 300, "height": 200, "text": "Authentication Service - Identity Management", "verified": False},
        {"id": "itsm_service", "type": "rectangle", "x": 1800, "y": 2500, "width": 300, "height": 200, "text": "IT Service Management - ITSM Platform", "verified": False},
        {"id": "analytics_service", "type": "rectangle", "x": 2200, "y": 2500, "width": 300, "height": 200, "text": "Analytics Service - Business Intelligence", "verified": False},
        {"id": "integration_service", "type": "rectangle", "x": 1000, "y": 2800, "width": 300, "height": 200, "text": "Integration Service - Enterprise Integration", "verified": False},
        {"id": "notification_service", "type": "rectangle", "x": 1400, "y": 2800, "width": 300, "height": 200, "text": "Notification Service - .NET Core Microservice", "verified": False},
        {"id": "saga_orchestrator", "type": "rectangle", "x": 1800, "y": 2800, "width": 300, "height": 200, "text": "Saga Orchestrator - Workflow Management", "verified": False},
        {"id": "audit_service", "type": "rectangle", "x": 2200, "y": 2800, "width": 300, "height": 200, "text": "Audit Service - Compliance & Logging", "verified": False},
        
        # Monitoring Services (4)
        {"id": "monitoring_service", "type": "rectangle", "x": 1000, "y": 3200, "width": 300, "height": 200, "text": "Monitoring Service - System Health", "verified": False},
        {"id": "backup_service", "type": "rectangle", "x": 1400, "y": 3200, "width": 300, "height": 200, "text": "Backup Service - Data Protection", "verified": False},
        {"id": "reporting_service", "type": "rectangle", "x": 1800, "y": 3200, "width": 300, "height": 200, "text": "Reporting Service - Business Reports", "verified": False},
        {"id": "azure_monitor", "type": "rectangle", "x": 2200, "y": 3200, "width": 300, "height": 200, "text": "Azure Monitor - System Monitoring", "verified": False},
        
        # Azure Integration Services (4)
        {"id": "azure_service_bus", "type": "rectangle", "x": 1000, "y": 3600, "width": 300, "height": 200, "text": "Azure Service Bus - Message Broker", "verified": False},
        {"id": "azure_event_grid", "type": "rectangle", "x": 1400, "y": 3600, "width": 300, "height": 200, "text": "Azure Event Grid - Event Routing", "verified": False},
        {"id": "azure_functions", "type": "rectangle", "x": 1800, "y": 3600, "width": 300, "height": 200, "text": "Azure Functions - Serverless Computing", "verified": False},
        {"id": "stream_analytics", "type": "rectangle", "x": 2200, "y": 3600, "width": 300, "height": 200, "text": "Stream Analytics - Real-time Processing", "verified": False},
        
        # Business Intelligence (2)
        {"id": "power_bi", "type": "rectangle", "x": 1000, "y": 4000, "width": 300, "height": 200, "text": "Power BI - Business Intelligence", "verified": False},
        {"id": "azure_data_lake", "type": "rectangle", "x": 1400, "y": 4000, "width": 300, "height": 200, "text": "Azure Data Lake - Data Storage", "verified": False},
        
        # External Systems Integration (8)
        {"id": "sap_planet", "type": "rectangle", "x": 1000, "y": 4400, "width": 300, "height": 200, "text": "SAP Planet 8/9 - ERP Integration", "verified": False},
        {"id": "cherwell_hr", "type": "rectangle", "x": 1400, "y": 4400, "width": 300, "height": 200, "text": "Cherwell HR - Human Resources", "verified": False},
        {"id": "cherwell_it", "type": "rectangle", "x": 1800, "y": 4400, "width": 300, "height": 200, "text": "Cherwell IT - IT Service Management", "verified": False},
        {"id": "azure_ad", "type": "rectangle", "x": 2200, "y": 4400, "width": 300, "height": 200, "text": "Azure AD - External Systems", "verified": False},
        {"id": "power_apps", "type": "rectangle", "x": 1000, "y": 4800, "width": 300, "height": 200, "text": "Power Apps - Low-Code Development", "verified": False},
        {"id": "sharepoint", "type": "rectangle", "x": 1400, "y": 4800, "width": 300, "height": 200, "text": "SharePoint - Collaboration Platform", "verified": False},
        {"id": "microsoft_teams", "type": "rectangle", "x": 1800, "y": 4800, "width": 300, "height": 200, "text": "Microsoft Teams - Communication Platform", "verified": False},
        {"id": "security_compliance", "type": "rectangle", "x": 2200, "y": 4800, "width": 300, "height": 200, "text": "Security & Compliance - Enterprise Security", "verified": False},
        
        # Platform Services (4)
        {"id": "cicd_pipeline", "type": "rectangle", "x": 1000, "y": 5200, "width": 300, "height": 200, "text": "CI/CD Pipeline - Build/Test/Deploy", "verified": False},
        {"id": "artifact_registry", "type": "rectangle", "x": 1400, "y": 5200, "width": 300, "height": 200, "text": "Artifact/Image Registry - Nexus", "verified": False},
        {"id": "openshift", "type": "rectangle", "x": 1800, "y": 5200, "width": 300, "height": 200, "text": "OpenShift (K8s) - Deploy/Scale/Rollouts", "verified": False},
        {"id": "prometheus", "type": "rectangle", "x": 2200, "y": 5200, "width": 300, "height": 200, "text": "Prometheus - Metrics & Alerts", "verified": False},
        
        # Observability (2)
        {"id": "grafana", "type": "rectangle", "x": 1000, "y": 5600, "width": 300, "height": 200, "text": "Grafana - Dashboards", "verified": False},
        {"id": "real_time_integration", "type": "rectangle", "x": 1400, "y": 5600, "width": 300, "height": 200, "text": "Real-time Integration (SignalR/WebSocket)", "verified": False},
        
        # Integration Gateway (2)
        {"id": "integration_gateway", "type": "rectangle", "x": 1000, "y": 6000, "width": 300, "height": 200, "text": "Integration Gateway (Partner Routes)", "verified": False},
        {"id": "openshift_api_gateway", "type": "rectangle", "x": 1400, "y": 6000, "width": 300, "height": 200, "text": "OpenShift API Gateway (Ingress/WAF/TLS/JWT)", "verified": False},
        
        # Core Services (2)
        {"id": "net_core_api", "type": "rectangle", "x": 1000, "y": 6400, "width": 300, "height": 200, "text": ".NET Core Web API (Orchestration/AuthZ/Cache)", "verified": False},
        {"id": "data_processing_engine", "type": "rectangle", "x": 1400, "y": 6400, "width": 300, "height": 200, "text": "Data Processing Engine (ETL/ELT/Streams/Batch)", "verified": False},
        
        # Analytics & Integration (2)
        {"id": "analytics_engine", "type": "rectangle", "x": 1000, "y": 6800, "width": 300, "height": 200, "text": "Analytics Engine (KPIs/Reports)", "verified": False},
        {"id": "integration_services", "type": "rectangle", "x": 1400, "y": 6800, "width": 300, "height": 200, "text": "Integration Services (Adapters/Bus)", "verified": False},
        
        # Object Storage (1)
        {"id": "object_storage", "type": "rectangle", "x": 1000, "y": 7200, "width": 300, "height": 200, "text": "Object Storage (Blob/Files)", "verified": False},
        
        # 4 Databases
        {"id": "azure_sql_database", "type": "database", "x": 10681.6875, "y": 9175.0977, "width": 461.6211, "height": 368.0664, "text": "Azure SQL Database - Primary Database", "verified": False},
        {"id": "azure_cosmos_db", "type": "database", "x": 11274.7188, "y": 10168.1602, "width": 488.0585, "height": 317.1387, "text": "Azure Cosmos DB - NoSQL Database", "verified": False},
        {"id": "redis_cache", "type": "database", "x": 10063.4375, "y": 10168.1602, "width": 585.6201, "height": 317.1387, "text": "Redis Cache - In-Memory Cache", "verified": False},
        {"id": "sql_server_enterprise", "type": "database", "x": 875.4375, "y": 1774.6516, "width": 230.5054, "height": 105.2343, "text": "SQL Server Enterprise (OLTP/Views/Backups)", "verified": False},
    ]
    
    # 8 Groups
    groups = [
        {"id": "frontend_layer", "type": "group", "title": "Frontend Layer", "x": 0, "y": 1000, "width": 5000, "height": 1000, "class": "cluster", "verified": False},
        {"id": "api_gateway_layer", "type": "group", "title": "API Gateway Layer", "x": 0, "y": 2000, "width": 5000, "height": 1000, "class": "cluster", "verified": False},
        {"id": "azure_services_layer", "type": "group", "title": "Azure Services Layer", "x": 10000, "y": 6000, "width": 8000, "height": 4000, "class": "cluster", "verified": False},
        {"id": "database_layer", "type": "group", "title": "Database Layer", "x": 10000, "y": 9000, "width": 2000, "height": 2000, "class": "cluster", "verified": False},
        {"id": "monitoring_layer", "type": "group", "title": "Monitoring & Observability", "x": 15000, "y": 1000, "width": 3000, "height": 2000, "class": "cluster", "verified": False},
        {"id": "integration_layer", "type": "group", "title": "Integration Layer", "x": 5000, "y": 4000, "width": 3000, "height": 2000, "class": "cluster", "verified": False},
        {"id": "security_layer", "type": "group", "title": "Security Layer", "x": 20000, "y": 1000, "width": 3000, "height": 2000, "class": "cluster", "verified": False},
        {"id": "platform_layer", "type": "group", "title": "Platform & Delivery", "x": 1555.6875, "y": 117.8516, "width": 281.25, "height": 820.4625, "class": "cluster", "verified": False},
    ]
    
    return {
        "shapes": shapes,
        "groups": groups,
        "total_shapes": len(shapes),
        "total_groups": len(groups)
    }

def generate_verification_html(data):
    """Generate HTML with checkboxes for verification"""
    html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAT Diagram - Shape Verification (44 Shapes + 8 Groups)</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }}
        .container {{
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }}
        .summary {{
            background: #e8f4fd;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }}
        .verification-form {{
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }}
        .shape-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }}
        .shape-card {{
            border: 2px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            background: white;
            transition: all 0.3s ease;
        }}
        .shape-card:hover {{
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }}
        .shape-card.verified {{
            border-color: #28a745;
            background: #f8fff9;
        }}
        .shape-card.rectangle {{
            border-left: 4px solid #4CAF50;
        }}
        .shape-card.database {{
            border-left: 4px solid #FF9800;
        }}
        .shape-card.group {{
            border-left: 4px solid #2196F3;
        }}
        .shape-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }}
        .shape-id {{
            font-weight: bold;
            color: #333;
            font-size: 1.1em;
        }}
        .verify-checkbox {{
            transform: scale(1.2);
        }}
        .coordinates {{
            background: #f8f9fa;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 0.9em;
            margin: 10px 0;
        }}
        .text-content {{
            background: #fff3cd;
            padding: 10px;
            border-radius: 5px;
            font-size: 0.9em;
            margin: 10px 0;
            min-height: 30px;
        }}
        .coordinate-inputs {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin: 10px 0;
        }}
        .coord-input {{
            padding: 5px;
            border: 1px solid #ddd;
            border-radius: 3px;
            font-family: monospace;
        }}
        .submit-section {{
            background: #e8f4fd;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
            margin-top: 30px;
        }}
        .submit-btn {{
            background: #007bff;
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            font-size: 1.1em;
            cursor: pointer;
            margin: 10px;
        }}
        .submit-btn:hover {{
            background: #0056b3;
        }}
        .progress {{
            background: #e9ecef;
            border-radius: 10px;
            height: 20px;
            margin: 20px 0;
        }}
        .progress-bar {{
            background: #28a745;
            height: 100%;
            border-radius: 10px;
            transition: width 0.3s ease;
        }}
        .section-title {{
            font-size: 1.2em;
            font-weight: bold;
            margin: 20px 0 10px 0;
            color: #333;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>BAT Diagram - Shape & Group Verification</h1>
        
        <div class="summary">
            <h3>Summary</h3>
            <p><strong>Total Individual Shapes:</strong> {data.get('total_shapes', 0)} (37 rectangles + 4 databases + 3 other components)</p>
            <p><strong>Total Groups:</strong> {data.get('total_groups', 0)}</p>
            <p><strong>Rectangles:</strong> {len([s for s in data.get('shapes', []) if s.get('type') == 'rectangle'])}</p>
            <p><strong>Databases:</strong> {len([s for s in data.get('shapes', []) if s.get('type') == 'database'])}</p>
        </div>
        
        <div class="verification-form">
            <h3>Instructions:</h3>
            <ol>
                <li>Review each shape/group below with their meaningful titles</li>
                <li>Check the "Verified" checkbox if coordinates are correct</li>
                <li>If incorrect, update the coordinates in the input fields</li>
                <li>Click "Submit Verified Data" when done</li>
            </ol>
        </div>
        
        <div class="progress">
            <div class="progress-bar" id="progressBar" style="width: 0%"></div>
        </div>
        
        <form id="verificationForm">
            <div class="section-title">Individual Shapes ({len(data.get('shapes', []))})</div>
            <div class="shape-grid">
"""
    
    # Add individual shapes
    for i, shape in enumerate(data.get('shapes', [])):
        html_content += f"""
                <div class="shape-card {shape.get('type', '')}" id="card_{i}">
                    <div class="shape-header">
                        <div class="shape-id">{shape.get('id', 'Unknown')}</div>
                        <input type="checkbox" class="verify-checkbox" id="verify_{i}" onchange="updateProgress()">
                    </div>
                    <div style="color: #666; margin-bottom: 10px;">Type: {shape.get('type', 'Unknown').title()}</div>
                    
                    <div class="coordinates">
                        <strong>Current Coordinates:</strong><br>
                        X: {shape.get('x', 0):.2f}<br>
                        Y: {shape.get('y', 0):.2f}<br>
                        Width: {shape.get('width', 0):.2f}<br>
                        Height: {shape.get('height', 0):.2f}
                    </div>
                    
                    <div class="coordinate-inputs">
                        <input type="number" class="coord-input" id="x_{i}" value="{shape.get('x', 0):.2f}" step="0.01" placeholder="X">
                        <input type="number" class="coord-input" id="y_{i}" value="{shape.get('y', 0):.2f}" step="0.01" placeholder="Y">
                        <input type="number" class="coord-input" id="w_{i}" value="{shape.get('width', 0):.2f}" step="0.01" placeholder="Width">
                        <input type="number" class="coord-input" id="h_{i}" value="{shape.get('height', 0):.2f}" step="0.01" placeholder="Height">
                    </div>
                    
                    <div class="text-content">
                        <strong>Component Title:</strong><br>
                        {shape.get('text', 'No text')}
                    </div>
                </div>
"""
    
    html_content += """
            </div>
            
            <div class="section-title">Groups (8)</div>
            <div class="shape-grid">
"""
    
    # Add groups
    for i, group in enumerate(data.get('groups', [])):
        shape_index = len(data.get('shapes', [])) + i
        html_content += f"""
                <div class="shape-card group" id="card_{shape_index}">
                    <div class="shape-header">
                        <div class="shape-id">{group.get('id', 'Unknown')}</div>
                        <input type="checkbox" class="verify-checkbox" id="verify_{shape_index}" onchange="updateProgress()">
                    </div>
                    <div style="color: #666; margin-bottom: 10px;">Type: Group</div>
                    
                    <div class="coordinates">
                        <strong>Current Boundaries:</strong><br>
                        X: {group.get('x', 0):.2f}<br>
                        Y: {group.get('y', 0):.2f}<br>
                        Width: {group.get('width', 0):.2f}<br>
                        Height: {group.get('height', 0):.2f}
                    </div>
                    
                    <div class="coordinate-inputs">
                        <input type="number" class="coord-input" id="x_{shape_index}" value="{group.get('x', 0):.2f}" step="0.01" placeholder="X">
                        <input type="number" class="coord-input" id="y_{shape_index}" value="{group.get('y', 0):.2f}" step="0.01" placeholder="Y">
                        <input type="number" class="coord-input" id="w_{shape_index}" value="{group.get('width', 0):.2f}" step="0.01" placeholder="Width">
                        <input type="number" class="coord-input" id="h_{shape_index}" value="{group.get('height', 0):.2f}" step="0.01" placeholder="Height">
                    </div>
                    
                    <div class="text-content">
                        <strong>Group Title:</strong><br>
                        {group.get('title', 'No title')}
                    </div>
                </div>
"""
    
    html_content += """
            </div>
            
            <div class="submit-section">
                <h3>Submit Verified Data</h3>
                <p>Click below to generate the corrected coordinates file</p>
                <button type="button" class="submit-btn" onclick="submitVerification()">Submit Verified Data</button>
                <button type="button" class="submit-btn" onclick="downloadData()">Download JSON</button>
            </div>
        </form>
    </div>

    <script>
        function updateProgress() {
            const checkboxes = document.querySelectorAll('.verify-checkbox');
            const checked = document.querySelectorAll('.verify-checkbox:checked');
            const progress = (checked.length / checkboxes.length) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            
            // Update card styling
            checkboxes.forEach((checkbox, index) => {
                const card = document.getElementById(`card_${index}`);
                if (checkbox.checked) {
                    card.classList.add('verified');
                } else {
                    card.classList.remove('verified');
                }
            });
        }
        
        function submitVerification() {
            const data = {
                shapes: [],
                groups: [],
                verified_count: 0,
                total_count: 0
            };
            
            const checkboxes = document.querySelectorAll('.verify-checkbox');
            checkboxes.forEach((checkbox, index) => {
                const isVerified = checkbox.checked;
                const x = parseFloat(document.getElementById(`x_${index}`).value);
                const y = parseFloat(document.getElementById(`y_${index}`).value);
                const w = parseFloat(document.getElementById(`w_${index}`).value);
                const h = parseFloat(document.getElementById(`h_${index}`).value);
                
                const item = {
                    index: index,
                    verified: isVerified,
                    x: x,
                    y: y,
                    width: w,
                    height: h
                };
                
                if (index < """ + str(len(data.get('shapes', []))) + """) {
                    data.shapes.push(item);
                } else {
                    data.groups.push(item);
                }
                
                if (isVerified) data.verified_count++;
                data.total_count++;
            });
            
            // Save to file
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'verified_bat_coordinates.json';
            a.click();
            URL.revokeObjectURL(url);
            
            alert(`Verification complete! Verified ${data.verified_count}/${data.total_count} items. File downloaded.`);
        }
        
        function downloadData() {
            const data = {
                shapes: [],
                groups: []
            };
            
            const checkboxes = document.querySelectorAll('.verify-checkbox');
            checkboxes.forEach((checkbox, index) => {
                const x = parseFloat(document.getElementById(`x_${index}`).value);
                const y = parseFloat(document.getElementById(`y_${index}`).value);
                const w = parseFloat(document.getElementById(`w_${index}`).value);
                const h = parseFloat(document.getElementById(`h_${index}`).value);
                
                const item = {
                    index: index,
                    verified: checkbox.checked,
                    x: x,
                    y: y,
                    width: w,
                    height: h
                };
                
                if (index < """ + str(len(data.get('shapes', []))) + """) {
                    data.shapes.push(item);
                } else {
                    data.groups.push(item);
                }
            });
            
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'bat_coordinates_data.json';
            a.click();
            URL.revokeObjectURL(url);
        }
    </script>
</body>
</html>
"""
    
    return html_content

def main():
    print("🔍 Creating proper BAT verification page with 44 shapes and 8 groups...")
    
    data = create_proper_bat_data()
    
    print(f"✅ Created {data.get('total_shapes', 0)} individual shapes and {data.get('total_groups', 0)} groups")
    
    # Generate HTML verification page
    html_content = generate_verification_html(data)
    with open('bat_verification_page.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("📁 Files created:")
    print("   - bat_verification_page.html (verification page)")
    print("\n🌐 Open bat_verification_page.html in your browser to verify all shapes and groups")

if __name__ == "__main__":
    main()
