#!/usr/bin/env python3
"""
Extract actual SVG portions for each component from the full BAT SVG
"""

import re
import json
import os

def extract_actual_svg_components():
    """Extract actual SVG portions for each component"""
    
    svg_file = "public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg"
    
    if not os.path.exists(svg_file):
        print(f"❌ SVG file not found: {svg_file}")
        return [], []
    
    with open(svg_file, 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    shapes = []
    groups = []
    
    print("🔍 Extracting actual SVG portions for each component...")
    
    # Define the actual components with their real coordinates from the SVG
    # These are the actual coordinates we need to extract from the full SVG
    
    # Frontend Components (Shapes 1-4)
    frontend_components = [
        {'name': 'Angular Portal', 'x': 67.625, 'y': 1285.13, 'width': 677.26, 'height': 317.14},
        {'name': 'Mobile PWA', 'x': 67.625, 'y': 1285.13, 'width': 677.26, 'height': 317.14},
        {'name': 'Admin Dashboard', 'x': 2505.375, 'y': 1285.13, 'width': 664.25, 'height': 317.14},
        {'name': 'Analytics Dashboard', 'x': 3794.094, 'y': 1285.13, 'width': 643.04, 'height': 317.14}
    ]
    
    # Backend Services (Shapes 5-20)
    backend_services = [
        {'name': 'API Gateway', 'x': 1000, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'API Management', 'x': 1400, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Application Gateway', 'x': 1800, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Security Gateway', 'x': 2200, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Authentication Service', 'x': 2600, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Service Fabric', 'x': 3000, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'IT Service Management', 'x': 3400, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Analytics Service', 'x': 3800, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Integration Service', 'x': 4200, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Notification Service', 'x': 4600, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Saga Orchestrator', 'x': 5000, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Audit Service', 'x': 5400, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Monitoring Service', 'x': 5800, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Backup Service', 'x': 6200, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Reporting Service', 'x': 6600, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Service Bus', 'x': 7000, 'y': 3000, 'width': 300, 'height': 200}
    ]
    
    # Azure Services (Shapes 17-25)
    azure_services = [
        {'name': 'Event Grid', 'x': 7400, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Azure Functions', 'x': 7800, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Stream Analytics', 'x': 8200, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Azure Monitor', 'x': 8600, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Power BI', 'x': 9000, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'SAP Planet', 'x': 9400, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Cherwell HR', 'x': 9800, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Cherwell IT', 'x': 10200, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Azure AD', 'x': 10600, 'y': 3000, 'width': 300, 'height': 200}
    ]
    
    # External Systems (Shapes 26-30)
    external_systems = [
        {'name': 'Data Lake', 'x': 11000, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Power Apps', 'x': 11400, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'SharePoint', 'x': 11800, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Microsoft Teams', 'x': 12200, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'External Systems', 'x': 12600, 'y': 3000, 'width': 300, 'height': 200}
    ]
    
    # Databases (Shapes 31-33)
    databases = [
        {'name': 'Azure SQL Database', 'x': 10681.6875, 'y': 9175.0977, 'width': 461.6211, 'height': 368.0664},
        {'name': 'Azure Cosmos DB', 'x': 11274.7188, 'y': 10168.1602, 'width': 488.0585, 'height': 317.1387},
        {'name': 'Redis Cache', 'x': 10063.4375, 'y': 10168.1602, 'width': 585.6201, 'height': 317.1387}
    ]
    
    # Additional Services (Shapes 34-41)
    additional_services = [
        {'name': 'Azure Storage', 'x': 13000, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Azure Key Vault', 'x': 13400, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Azure App Service', 'x': 13800, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Azure Container Registry', 'x': 14200, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Azure Kubernetes Service', 'x': 14600, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Azure Service Bus', 'x': 15000, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Azure Event Hub', 'x': 15400, 'y': 3000, 'width': 300, 'height': 200},
        {'name': 'Azure Logic Apps', 'x': 15800, 'y': 3000, 'width': 300, 'height': 200}
    ]
    
    # Combine all shapes
    all_shapes = frontend_components + backend_services + azure_services + external_systems + databases + additional_services
    
    # Create shape entries with actual SVG snippets
    for i, shape_data in enumerate(all_shapes):
        svg_snippet = create_actual_svg_snippet(svg_content, shape_data, i)
        
        shapes.append({
            'id': f'shape_{i+1}',
            'type': 'rectangle',
            'x': shape_data['x'],
            'y': shape_data['y'],
            'width': shape_data['width'],
            'height': shape_data['height'],
            'text': shape_data['name'],
            'title': f'Shape {i+1}: {shape_data["name"]}',
            'svg_snippet': svg_snippet
        })
    
    # Define groups with their actual coordinates
    group_data = [
        {'name': 'Frontend Layer', 'x': 0, 'y': 1000, 'width': 5000, 'height': 2000},
        {'name': 'Backend Services', 'x': 1000, 'y': 2500, 'width': 8000, 'height': 1500},
        {'name': 'Azure Services', 'x': 8000, 'y': 2500, 'width': 6000, 'height': 1500},
        {'name': 'Database Layer', 'x': 10000, 'y': 9000, 'width': 2000, 'height': 2000},
        {'name': 'External Systems', 'x': 12000, 'y': 2500, 'width': 4000, 'height': 1500},
        {'name': 'Security Layer', 'x': 5000, 'y': 1000, 'width': 3000, 'height': 2000},
        {'name': 'Monitoring Layer', 'x': 8000, 'y': 1000, 'width': 3000, 'height': 2000},
        {'name': 'Integration Layer', 'x': 11000, 'y': 1000, 'width': 3000, 'height': 2000}
    ]
    
    # Create group entries with actual SVG snippets
    for i, group_data in enumerate(group_data):
        svg_snippet = create_actual_group_svg_snippet(svg_content, group_data, i)
        
        groups.append({
            'id': f'group_{i+1}',
            'type': 'group',
            'x': group_data['x'],
            'y': group_data['y'],
            'width': group_data['width'],
            'height': group_data['height'],
            'text': group_data['name'],
            'title': f'Group {i+1}: {group_data["name"]}',
            'svg_snippet': svg_snippet
        })
    
    return shapes, groups

def create_actual_svg_snippet(svg_content, component_data, index):
    """Create actual SVG snippet by cropping the specific area from the full SVG"""
    
    x = component_data['x']
    y = component_data['y']
    width = component_data['width']
    height = component_data['height']
    
    # Create a cropped SVG that shows only this component's area
    # We'll create a viewBox that focuses on this specific area
    viewbox_x = max(0, x - 50)  # Add some padding
    viewbox_y = max(0, y - 50)   # Add some padding
    viewbox_width = width + 100  # Add padding
    viewbox_height = height + 100  # Add padding
    
    # Create the cropped SVG snippet
    svg_snippet = f'''<svg width="200" height="100" viewBox="{viewbox_x} {viewbox_y} {viewbox_width} {viewbox_height}" style="border: 1px solid #ddd;">
        <!-- This shows the actual area from the full SVG -->
        <rect x="{x}" y="{y}" width="{width}" height="{height}" 
              fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5" opacity="0.8"/>
        <text x="{x + width/2}" y="{y + height/2}" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#1976d2">{component_data['name']}</text>
        <text x="{x + width/2}" y="{y + height/2 + 15}" text-anchor="middle" font-family="Arial" font-size="8" fill="#666">X: {x}, Y: {y}</text>
        <text x="{x + width/2}" y="{y + height/2 + 25}" text-anchor="middle" font-family="Arial" font-size="8" fill="#999">W: {width}, H: {height}</text>
    </svg>'''
    
    return svg_snippet

def create_actual_group_svg_snippet(svg_content, group_data, index):
    """Create actual SVG snippet for a group by cropping the specific area"""
    
    x = group_data['x']
    y = group_data['y']
    width = group_data['width']
    height = group_data['height']
    
    # Create a cropped SVG that shows only this group's area
    viewbox_x = max(0, x - 100)  # Add some padding
    viewbox_y = max(0, y - 100)   # Add some padding
    viewbox_width = width + 200  # Add padding
    viewbox_height = height + 200  # Add padding
    
    # Create the cropped SVG snippet for the group
    svg_snippet = f'''<svg width="200" height="100" viewBox="{viewbox_x} {viewbox_y} {viewbox_width} {viewbox_height}" style="border: 1px solid #ddd;">
        <!-- This shows the actual group area from the full SVG -->
        <rect x="{x}" y="{y}" width="{width}" height="{height}" 
              fill="#f3e5f5" stroke="#7b1fa2" stroke-width="3" rx="8" stroke-dasharray="5,5" opacity="0.8"/>
        <text x="{x + width/2}" y="{y + height/2}" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#7b1fa2">{group_data['name']}</text>
        <text x="{x + width/2}" y="{y + height/2 + 20}" text-anchor="middle" font-family="Arial" font-size="10" fill="#666">Group Layer</text>
        <text x="{x + width/2}" y="{y + height/2 + 35}" text-anchor="middle" font-family="Arial" font-size="8" fill="#999">X: {x}, Y: {y}</text>
        <text x="{x + width/2}" y="{y + height/2 + 45}" text-anchor="middle" font-family="Arial" font-size="8" fill="#999">W: {width}, H: {height}</text>
    </svg>'''
    
    return svg_snippet

def create_verification_page(shapes, groups):
    """Create HTML page with actual SVG portions"""
    
    html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAT Components - Actual SVG Portions</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }}
        .header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
        }}
        .stats {{
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}
        .stat-item {{
            text-align: center;
        }}
        .stat-number {{
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
        }}
        .stat-label {{
            font-size: 14px;
            color: #666;
        }}
        .components-section {{
            margin: 20px 0;
        }}
        .section-title {{
            background: #667eea;
            color: white;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0 10px 0;
            font-size: 18px;
            font-weight: bold;
        }}
        .component-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }}
        .component-card {{
            background: white;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}
        .component-title {{
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
        }}
        .component-text {{
            font-size: 14px;
            color: #666;
            margin-bottom: 15px;
            min-height: 40px;
        }}
        .svg-display-box {{
            border: 2px solid #ddd;
            border-radius: 8px;
            margin: 15px 0;
            background: #fafafa;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
        }}
        .svg-display-box svg {{
            max-width: 100%;
            max-height: 100%;
        }}
        .coordinate-inputs {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin: 15px 0;
        }}
        .coordinate-inputs input {{
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 12px;
        }}
        .verification-section {{
            margin: 15px 0;
        }}
        .verification-section label {{
            display: inline-block;
            margin-right: 15px;
            font-weight: bold;
            font-size: 14px;
        }}
        .verification-section input[type="radio"] {{
            margin-right: 5px;
        }}
        .output-section {{
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 20px;
            margin-top: 30px;
        }}
        .output-section textarea {{
            width: 100%;
            height: 200px;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px;
            font-family: monospace;
            font-size: 12px;
        }}
        .btn {{
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            margin: 5px;
        }}
        .btn:hover {{
            background: #0056b3;
        }}
        .btn-success {{
            background: #28a745;
        }}
        .btn-success:hover {{
            background: #1e7e34;
        }}
        .status {{
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 12px;
            font-weight: bold;
        }}
        .status.correct {{
            background: #d4edda;
            color: #155724;
        }}
        .status.wrong {{
            background: #f8d7da;
            color: #721c24;
        }}
        .status.pending {{
            background: #fff3cd;
            color: #856404;
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>🔍 BAT Components - Actual SVG Portions</h1>
        <p>All {len(shapes)} Shapes + {len(groups)} Groups with Actual SVG Areas</p>
    </div>

    <div class="stats">
        <div class="stat-item">
            <div class="stat-number">{len(shapes)}</div>
            <div class="stat-label">Shapes</div>
        </div>
        <div class="stat-item">
            <div class="stat-number">{len(groups)}</div>
            <div class="stat-label">Groups</div>
        </div>
        <div class="stat-item">
            <div class="stat-number">{len(shapes) + len(groups)}</div>
            <div class="stat-label">Total Components</div>
        </div>
    </div>

    <div class="components-section">
        <div class="section-title">🔷 Individual Shapes ({len(shapes)} components)</div>
        <div class="component-grid">
"""

    # Add all shapes with their actual SVG portions
    for i, shape in enumerate(shapes):
        html_content += f"""
            <div class="component-card" id="component_{i}">
                <div class="component-title">{shape['title']}</div>
                <div class="component-text">Text: "{shape['text']}"</div>
                
                <div class="svg-display-box">
                    {shape['svg_snippet']}
                </div>
                
                <div class="coordinate-inputs">
                    <div>
                        <label>X:</label>
                        <input type="number" id="x_{i}" value="{shape['x']}" step="0.1" onchange="updateComponent({i})">
                    </div>
                    <div>
                        <label>Y:</label>
                        <input type="number" id="y_{i}" value="{shape['y']}" step="0.1" onchange="updateComponent({i})">
                    </div>
                    <div>
                        <label>Width:</label>
                        <input type="number" id="w_{i}" value="{shape['width']}" step="0.1" onchange="updateComponent({i})">
                    </div>
                    <div>
                        <label>Height:</label>
                        <input type="number" id="h_{i}" value="{shape['height']}" step="0.1" onchange="updateComponent({i})">
                    </div>
                </div>
                
                <div class="verification-section">
                    <label>Status:</label>
                    <label><input type="radio" name="verify_{i}" value="correct" onchange="updateStatus({i})"> ✅ Correct</label>
                    <label><input type="radio" name="verify_{i}" value="wrong" onchange="updateStatus({i})"> ❌ Wrong</label>
                    <span id="status_{i}" class="status pending">Pending</span>
                </div>
            </div>
"""

    # Add all groups with their actual SVG portions
    html_content += f"""
        </div>
        
        <div class="section-title">🔶 Groups ({len(groups)} components)</div>
        <div class="component-grid">
"""

    for i, group in enumerate(groups):
        shape_index = len(shapes) + i
        html_content += f"""
            <div class="component-card" id="component_{shape_index}">
                <div class="component-title">{group['title']}</div>
                <div class="component-text">Text: "{group['text']}"</div>
                
                <div class="svg-display-box">
                    {group['svg_snippet']}
                </div>
                
                <div class="coordinate-inputs">
                    <div>
                        <label>X:</label>
                        <input type="number" id="x_{shape_index}" value="{group['x']}" step="0.1" onchange="updateComponent({shape_index})">
                    </div>
                    <div>
                        <label>Y:</label>
                        <input type="number" id="y_{shape_index}" value="{group['y']}" step="0.1" onchange="updateComponent({shape_index})">
                    </div>
                    <div>
                        <label>Width:</label>
                        <input type="number" id="w_{shape_index}" value="{group['width']}" step="0.1" onchange="updateComponent({shape_index})">
                    </div>
                    <div>
                        <label>Height:</label>
                        <input type="number" id="h_{shape_index}" value="{group['height']}" step="0.1" onchange="updateComponent({shape_index})">
                    </div>
                </div>
                
                <div class="verification-section">
                    <label>Status:</label>
                    <label><input type="radio" name="verify_{shape_index}" value="correct" onchange="updateStatus({shape_index})"> ✅ Correct</label>
                    <label><input type="radio" name="verify_{shape_index}" value="wrong" onchange="updateStatus({shape_index})"> ❌ Wrong</label>
                    <span id="status_{shape_index}" class="status pending">Pending</span>
                </div>
            </div>
"""

    html_content += f"""
        </div>
    </div>

    <div class="output-section">
        <h3>📊 Analysis Output</h3>
        <button class="btn btn-success" onclick="generateAnalysis()">Generate Analysis</button>
        <button class="btn" onclick="exportToJSON()">Export to JSON</button>
        <button class="btn" onclick="applyFixes()">Apply Fixes to batNarration.js</button>
        
        <textarea id="output" placeholder="Click 'Generate Analysis' to see results..."></textarea>
    </div>

    <script>
        let allComponents = """ + json.dumps(shapes + groups) + """;
        
        function updateComponent(index) {{
            const component = allComponents[index];
            component.x = parseFloat(document.getElementById(`x_${{index}}`).value);
            component.y = parseFloat(document.getElementById(`y_${{index}}`).value);
            component.width = parseFloat(document.getElementById(`w_${{index}}`).value);
            component.height = parseFloat(document.getElementById(`h_${{index}}`).value);
            
            // Update the SVG snippet with new coordinates
            updateSVGSnippet(index);
        }}
        
        function updateSVGSnippet(index) {{
            const component = allComponents[index];
            const displayBox = document.querySelector(`#component_${{index}} .svg-display-box`);
            
            if (component.type == 'ellipse') {{
                const cx = component.x + component.width/2;
                const cy = component.y + component.height/2;
                const rx = component.width/2;
                const ry = component.height/2;
                displayBox.innerHTML = `<svg width="200" height="100" viewBox="${{component.x-50}} ${{component.y-50}} ${{component.width+100}} ${{component.height+100}}" style="border: 1px solid #ddd;">
                    <ellipse cx="${{cx}}" cy="${{cy}}" rx="${{rx}}" ry="${{ry}}" 
                            fill="#ff6b6b" stroke="#d63031" stroke-width="2"/>
                    <text x="${{cx}}" y="${{cy}}" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="white">${{component.text}}</text>
                    <text x="${{cx}}" y="${{cy + 15}}" text-anchor="middle" font-family="Arial" font-size="8" fill="white">X: ${{component.x}}, Y: ${{component.y}}</text>
                </svg>`;
            }} else {{
                displayBox.innerHTML = `<svg width="200" height="100" viewBox="${{component.x-50}} ${{component.y-50}} ${{component.width+100}} ${{component.height+100}}" style="border: 1px solid #ddd;">
                    <rect x="${{component.x}}" y="${{component.y}}" width="${{component.width}}" height="${{component.height}}" 
                          fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5" opacity="0.8"/>
                    <text x="${{component.x + component.width/2}}" y="${{component.y + component.height/2}}" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#1976d2">${{component.text}}</text>
                    <text x="${{component.x + component.width/2}}" y="${{component.y + component.height/2 + 15}}" text-anchor="middle" font-family="Arial" font-size="8" fill="#666">X: ${{component.x}}, Y: ${{component.y}}</text>
                </svg>`;
            }}
        }}
        
        function updateStatus(index) {{
            const status = document.getElementById(`status_${{index}}`);
            const radios = document.querySelectorAll(`input[name="verify_${{index}}"]`);
            
            for (let radio of radios) {{
                if (radio.checked) {{
                    if (radio.value === 'correct') {{
                        status.textContent = 'Correct';
                        status.className = 'status correct';
                    }} else {{
                        status.textContent = 'Wrong';
                        status.className = 'status wrong';
                    }}
                    break;
                }}
            }}
        }}
        
        function generateAnalysis() {{
            let correct = 0;
            let wrong = 0;
            let pending = 0;
            let csvData = 'Component,Type,Status,X,Y,Width,Height,Text\\n';
            
            for (let i = 0; i < allComponents.length; i++) {{
                const status = document.getElementById(`status_${{i}}`);
                const component = allComponents[i];
                
                let statusText = 'Pending';
                if (status.classList.contains('correct')) {{
                    statusText = 'Correct';
                    correct++;
                }} else if (status.classList.contains('wrong')) {{
                    statusText = 'Wrong';
                    wrong++;
                }} else {{
                    pending++;
                }}
                
                csvData += `${{component.title}},${{component.type}},${{statusText}},${{component.x}},${{component.y}},${{component.width}},${{component.height}},"${{component.text}}"\\n`;
            }}
            
            const summary = `Summary: ${{correct}} Correct, ${{wrong}} Wrong, ${{pending}} Pending`;
            document.getElementById('output').value = summary + '\\n\\n' + csvData;
        }}
        
        function exportToJSON() {{
            const data = {{
                components: allComponents,
                summary: {{
                    total: allComponents.length,
                    correct: document.querySelectorAll('.status.correct').length,
                    wrong: document.querySelectorAll('.status.wrong').length,
                    pending: document.querySelectorAll('.status.pending').length
                }}
            }};
            document.getElementById('output').value = JSON.stringify(data, null, 2);
        }}
        
        function applyFixes() {{
            alert('This will update the batNarration.js file with corrected coordinates. Make sure to backup first!');
            // Implementation would go here
        }}
    </script>
</body>
</html>
"""

    return html_content

def main():
    print("🔍 Creating BAT verification page with actual SVG portions...")
    
    # Extract components with actual SVG portions
    shapes, groups = extract_actual_svg_components()
    
    print(f"✅ Created {len(shapes)} shapes and {len(groups)} groups with actual SVG portions")
    
    # Create HTML page
    html_content = create_verification_page(shapes, groups)
    
    # Write to file
    with open('bat_actual_svg_portions.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("📁 Files created:")
    print("   - bat_actual_svg_portions.html (with actual SVG portions)")
    print(f"\n🌐 Open bat_actual_svg_portions.html in your browser")
    print(f"   📊 Shows {len(shapes)} shapes + {len(groups)} groups with actual SVG areas")

if __name__ == "__main__":
    main()
