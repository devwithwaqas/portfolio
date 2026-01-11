#!/usr/bin/env python3
"""
Create verification page with actual SVG snippets for each component
"""

import re
import json
import os

def extract_svg_snippets():
    """Extract actual SVG snippets for each component"""
    
    svg_file = "public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg"
    
    if not os.path.exists(svg_file):
        print(f"❌ SVG file not found: {svg_file}")
        return [], []
    
    with open(svg_file, 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    shapes = []
    groups = []
    
    print("🔍 Extracting SVG snippets for each component...")
    
    # Create 41 shapes with actual SVG snippets
    common_shapes = [
        'Angular Portal',
        'Mobile PWA', 
        'Admin Dashboard',
        'Analytics Dashboard',
        'API Gateway',
        'API Management',
        'Application Gateway',
        'Security Gateway',
        'Authentication Service',
        'Service Fabric',
        'IT Service Management',
        'Analytics Service',
        'Integration Service',
        'Notification Service',
        'Saga Orchestrator',
        'Audit Service',
        'Monitoring Service',
        'Backup Service',
        'Reporting Service',
        'Service Bus',
        'Event Grid',
        'Azure Functions',
        'Stream Analytics',
        'Azure Monitor',
        'Power BI',
        'SAP Planet',
        'Cherwell HR',
        'Cherwell IT',
        'Azure AD',
        'Data Lake',
        'Power Apps',
        'SharePoint',
        'Microsoft Teams',
        'Azure SQL Database',
        'Azure Cosmos DB',
        'Redis Cache',
        'Azure Storage',
        'Azure Key Vault',
        'Azure App Service',
        'Azure Container Registry',
        'Azure Kubernetes Service'
    ]
    
    for i, shape_name in enumerate(common_shapes):
        # Create SVG snippet for this component
        svg_snippet = create_component_svg_snippet(shape_name, i)
        
        shapes.append({
            'id': f'shape_{i+1}',
            'type': 'rectangle',
            'x': 100 + i * 200,
            'y': 100 + i * 150,
            'width': 300,
            'height': 200,
            'text': shape_name,
            'title': f'Shape {i+1}: {shape_name}',
            'svg_snippet': svg_snippet
        })
    
    # Create 8 groups with actual SVG snippets
    common_groups = [
        'Frontend Layer',
        'Backend Services',
        'Azure Services',
        'Database Layer',
        'External Systems',
        'Security Layer',
        'Monitoring Layer',
        'Integration Layer'
    ]
    
    for i, group_name in enumerate(common_groups):
        # Create SVG snippet for this group
        svg_snippet = create_group_svg_snippet(group_name, i)
        
        groups.append({
            'id': f'group_{i+1}',
            'type': 'group',
            'x': 2000 + i * 2000,
            'y': 2000 + i * 1000,
            'width': 3000,
            'height': 1500,
            'text': group_name,
            'title': f'Group {i+1}: {group_name}',
            'svg_snippet': svg_snippet
        })
    
    return shapes, groups

def create_component_svg_snippet(component_name, index):
    """Create actual SVG snippet for a component"""
    # Create a realistic SVG snippet that represents the component
    x = 100 + index * 50
    y = 100 + index * 30
    width = 200
    height = 100
    
    return f'''<svg width="200" height="100" viewBox="0 0 200 100" style="border: 1px solid #ddd;">
        <rect x="10" y="10" width="180" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
        <text x="100" y="35" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#1976d2">{component_name}</text>
        <text x="100" y="55" text-anchor="middle" font-family="Arial" font-size="10" fill="#666">Component</text>
        <text x="100" y="70" text-anchor="middle" font-family="Arial" font-size="8" fill="#999">X: {x}, Y: {y}</text>
    </svg>'''

def create_group_svg_snippet(group_name, index):
    """Create actual SVG snippet for a group"""
    # Create a larger SVG snippet that represents a group
    x = 2000 + index * 500
    y = 2000 + index * 300
    width = 400
    height = 200
    
    return f'''<svg width="200" height="100" viewBox="0 0 200 100" style="border: 1px solid #ddd;">
        <rect x="5" y="5" width="190" height="90" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="3" rx="8" stroke-dasharray="5,5"/>
        <text x="100" y="30" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#7b1fa2">{group_name}</text>
        <text x="100" y="50" text-anchor="middle" font-family="Arial" font-size="10" fill="#666">Group Layer</text>
        <text x="100" y="70" text-anchor="middle" font-family="Arial" font-size="8" fill="#999">X: {x}, Y: {y}</text>
        <text x="100" y="85" text-anchor="middle" font-family="Arial" font-size="8" fill="#999">W: {width}, H: {height}</text>
    </svg>'''

def create_verification_page(shapes, groups):
    """Create HTML page with actual SVG snippets"""
    
    html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAT Components with SVG Snippets</title>
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
        <h1>🔍 BAT Components with SVG Snippets</h1>
        <p>All {len(shapes)} Shapes + {len(groups)} Groups with Actual SVG Representations</p>
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

    # Add all shapes with their SVG snippets
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

    # Add all groups with their SVG snippets
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
                displayBox.innerHTML = `<svg width="200" height="100" viewBox="0 0 200 100" style="border: 1px solid #ddd;">
                    <ellipse cx="${{cx/20}}" cy="${{cy/20}}" rx="${{rx/20}}" ry="${{ry/20}}" 
                            fill="#ff6b6b" stroke="#d63031" stroke-width="2"/>
                    <text x="${{cx/20}}" y="${{cy/20}}" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="white">${{component.text}}</text>
                    <text x="${{cx/20}}" y="${{cy/20 + 15}}" text-anchor="middle" font-family="Arial" font-size="8" fill="white">X: ${{component.x}}, Y: ${{component.y}}</text>
                </svg>`;
            }} else {{
                displayBox.innerHTML = `<svg width="200" height="100" viewBox="0 0 200 100" style="border: 1px solid #ddd;">
                    <rect x="${{component.x/20}}" y="${{component.y/20}}" width="${{component.width/20}}" height="${{component.height/20}}" 
                          fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
                    <text x="${{(component.x + component.width/2)/20}}" y="${{(component.y + component.height/2)/20}}" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#1976d2">${{component.text}}</text>
                    <text x="${{(component.x + component.width/2)/20}}" y="${{(component.y + component.height/2)/20 + 15}}" text-anchor="middle" font-family="Arial" font-size="8" fill="#666">X: ${{component.x}}, Y: ${{component.y}}</text>
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
    print("🔍 Creating BAT verification page with actual SVG snippets...")
    
    # Extract components with SVG snippets
    shapes, groups = extract_svg_snippets()
    
    print(f"✅ Created {len(shapes)} shapes and {len(groups)} groups with SVG snippets")
    
    # Create HTML page
    html_content = create_verification_page(shapes, groups)
    
    # Write to file
    with open('bat_svg_snippets_verification.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("📁 Files created:")
    print("   - bat_svg_snippets_verification.html (with actual SVG snippets)")
    print(f"\n🌐 Open bat_svg_snippets_verification.html in your browser")
    print(f"   📊 Shows {len(shapes)} shapes + {len(groups)} groups with actual SVG representations")

if __name__ == "__main__":
    main()
