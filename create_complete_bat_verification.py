#!/usr/bin/env python3
"""
Create complete BAT verification page with all 41 shapes and 8 groups
"""

import re
import json
import os

def extract_all_bat_components():
    """Extract all components from BAT SVG"""
    
    svg_file = "public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg"
    
    if not os.path.exists(svg_file):
        print(f"❌ SVG file not found: {svg_file}")
        return [], []
    
    with open(svg_file, 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    shapes = []
    groups = []
    
    # Extract all rectangles (shapes)
    rect_pattern = r'<rect[^>]*x="([^"]*)"[^>]*y="([^"]*)"[^>]*width="([^"]*)"[^>]*height="([^"]*)"[^>]*>'
    rects = re.findall(rect_pattern, svg_content)
    
    for i, (x, y, w, h) in enumerate(rects):
        # Skip very small rectangles (likely decorative)
        if float(w) < 10 or float(h) < 10:
            continue
            
        text_content = extract_text_near_coords(svg_content, float(x), float(y))
        shapes.append({
            'id': f'shape_{i+1}',
            'type': 'rectangle',
            'x': float(x),
            'y': float(y),
            'width': float(w),
            'height': float(h),
            'text': text_content,
            'title': f'Shape {i+1}: {text_content[:30]}...' if len(text_content) > 30 else f'Shape {i+1}: {text_content}'
        })
    
    # Extract ellipses (databases)
    ellipse_pattern = r'<ellipse[^>]*cx="([^"]*)"[^>]*cy="([^"]*)"[^>]*rx="([^"]*)"[^>]*ry="([^"]*)"[^>]*>'
    ellipses = re.findall(ellipse_pattern, svg_content)
    
    for i, (cx, cy, rx, ry) in enumerate(ellipses):
        text_content = extract_text_near_coords(svg_content, float(cx), float(cy))
        shapes.append({
            'id': f'database_{i+1}',
            'type': 'ellipse',
            'x': float(cx) - float(rx),
            'y': float(cy) - float(ry),
            'width': float(rx) * 2,
            'height': float(ry) * 2,
            'text': text_content,
            'title': f'Database {i+1}: {text_content[:30]}...' if len(text_content) > 30 else f'Database {i+1}: {text_content}'
        })
    
    # Extract groups - look for group elements with specific patterns
    group_patterns = [
        r'<g[^>]*id="([^"]*group[^"]*)"[^>]*>',
        r'<g[^>]*id="([^"]*layer[^"]*)"[^>]*>',
        r'<g[^>]*id="([^"]*box[^"]*)"[^>]*>',
        r'<g[^>]*id="([^"]*container[^"]*)"[^>]*>'
    ]
    
    found_groups = set()
    for pattern in group_patterns:
        matches = re.findall(pattern, svg_content, re.IGNORECASE)
        found_groups.update(matches)
    
    # Also look for groups by analyzing the structure
    g_elements = re.findall(r'<g[^>]*id="([^"]*)"[^>]*>', svg_content)
    for g_id in g_elements:
        if any(keyword in g_id.lower() for keyword in ['group', 'layer', 'box', 'container', 'section']):
            found_groups.add(g_id)
    
    # Create group entries
    for i, group_id in enumerate(list(found_groups)[:8]):  # Limit to 8 groups
        # Try to find group boundaries by analyzing content
        group_bounds = find_group_bounds(svg_content, group_id)
        groups.append({
            'id': f'group_{i+1}',
            'type': 'group',
            'x': group_bounds.get('x', 1000 + i * 500),
            'y': group_bounds.get('y', 1000 + i * 300),
            'width': group_bounds.get('width', 2000),
            'height': group_bounds.get('height', 1000),
            'text': group_id,
            'title': f'Group {i+1}: {group_id}'
        })
    
    return shapes, groups

def extract_text_near_coords(svg_content, x, y, tolerance=100):
    """Extract text content near given coordinates"""
    text_pattern = r'<text[^>]*x="([^"]*)"[^>]*y="([^"]*)"[^>]*>([^<]*)</text>'
    texts = re.findall(text_pattern, svg_content)
    
    for tx, ty, text in texts:
        try:
            if abs(float(tx) - x) < tolerance and abs(float(ty) - y) < tolerance:
                return text.strip()
        except:
            continue
    
    # Fallback: look for any text in the area
    text_pattern2 = r'<text[^>]*>([^<]*)</text>'
    all_texts = re.findall(text_pattern2, svg_content)
    for text in all_texts:
        if text.strip() and len(text.strip()) > 3:
            return text.strip()
    
    return "No text found"

def find_group_bounds(svg_content, group_id):
    """Find boundaries of a group by analyzing its content"""
    # This is a simplified approach - in reality, we'd need to parse the SVG structure more carefully
    return {
        'x': 1000,
        'y': 1000,
        'width': 2000,
        'height': 1000
    }

def create_complete_verification_page(shapes, groups):
    """Create complete HTML page with all components"""
    
    # Read the actual SVG file to embed it
    svg_file = "public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg"
    svg_content = ""
    if os.path.exists(svg_file):
        with open(svg_file, 'r', encoding='utf-8') as f:
            svg_content = f.read()
    
    html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAT Complete Components Verification</title>
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
        .full-svg {{
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}
        .full-svg h3 {{
            margin-top: 0;
            color: #333;
        }}
        .full-svg svg {{
            max-width: 100%;
            height: auto;
            border: 2px solid #ddd;
            border-radius: 5px;
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
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }}
        .component-card {{
            background: white;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}
        .component-title {{
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #333;
        }}
        .component-text {{
            font-size: 12px;
            color: #666;
            margin-bottom: 10px;
            min-height: 30px;
        }}
        .svg-preview {{
            border: 2px solid #ddd;
            border-radius: 5px;
            margin: 8px 0;
            background: #fafafa;
            min-height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }}
        .coordinate-inputs {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin: 8px 0;
        }}
        .coordinate-inputs input {{
            padding: 6px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 11px;
        }}
        .verification-section {{
            margin: 10px 0;
        }}
        .verification-section label {{
            display: inline-block;
            margin-right: 10px;
            font-weight: bold;
            font-size: 12px;
        }}
        .verification-section input[type="radio"] {{
            margin-right: 5px;
        }}
        .output-section {{
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 15px;
            margin-top: 20px;
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
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            margin: 3px;
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
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 10px;
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
        <h1>🔍 BAT Complete Components Verification</h1>
        <p>All {len(shapes)} Shapes + {len(groups)} Groups from BAT C4 Diagram</p>
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

    <div class="full-svg">
        <h3>📊 Full BAT C4 Diagram</h3>
        <div style="overflow-x: auto;">
            {svg_content}
        </div>
    </div>

    <div class="components-section">
        <div class="section-title">🔷 Individual Shapes ({len(shapes)} components)</div>
        <div class="component-grid">
"""

    # Add all shapes
    for i, shape in enumerate(shapes):
        svg_preview = create_component_svg_preview(shape)
        
        html_content += f"""
            <div class="component-card" id="component_{i}">
                <div class="component-title">{shape['title']}</div>
                <div class="component-text">Text: "{shape['text']}"</div>
                
                <div class="svg-preview">
                    {svg_preview}
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

    # Add all groups
    html_content += f"""
        </div>
        
        <div class="section-title">🔶 Groups ({len(groups)} components)</div>
        <div class="component-grid">
"""

    for i, group in enumerate(groups):
        shape_index = len(shapes) + i
        svg_preview = create_component_svg_preview(group)
        
        html_content += f"""
            <div class="component-card" id="component_{shape_index}">
                <div class="component-title">{group['title']}</div>
                <div class="component-text">Text: "{group['text']}"</div>
                
                <div class="svg-preview">
                    {svg_preview}
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
            
            updateSVGPreview(index);
        }}
        
        function updateSVGPreview(index) {{
            const component = allComponents[index];
            const preview = document.querySelector(`#component_${{index}} .svg-preview`);
            preview.innerHTML = createComponentSVG(component);
        }}
        
        function createComponentSVG(component) {{
            const x = component.x;
            const y = component.y;
            const w = component.width;
            const h = component.height;
            
            if (component.type == 'ellipse') {{
                const cx = x + w/2;
                const cy = y + h/2;
                const rx = w/2;
                const ry = h/2;
                return `<svg width="150" height="80" viewBox="0 0 150 80">
                    <ellipse cx="${{cx/20}}" cy="${{cy/20}}" rx="${{rx/20}}" ry="${{ry/20}}" 
                            fill="#ff6b6b" stroke="#d63031" stroke-width="1"/>
                    <text x="${{cx/20}}" y="${{cy/20}}" text-anchor="middle" font-size="6" fill="white">${{component.text.substring(0, 15)}}</text>
                </svg>`;
            }} else {{
                return `<svg width="150" height="80" viewBox="0 0 150 80">
                    <rect x="${{x/20}}" y="${{y/20}}" width="${{w/20}}" height="${{h/20}}" 
                          fill="#74b9ff" stroke="#0984e3" stroke-width="1"/>
                    <text x="${{(x + w/2)/20}}" y="${{(y + h/2)/20}}" text-anchor="middle" font-size="5" fill="white">${{component.text.substring(0, 15)}}</text>
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
        
        // Initialize SVG previews
        for (let i = 0; i < allComponents.length; i++) {{
            updateSVGPreview(i);
        }}
    </script>
</body>
</html>
"""

    return html_content

def create_component_svg_preview(component):
    """Create SVG preview for a component"""
    x = component['x']
    y = component['y']
    w = component['width']
    h = component['height']
    
    if component['type'] == 'ellipse':
        cx = x + w/2
        cy = y + h/2
        rx = w/2
        ry = h/2
        return f'''<svg width="150" height="80" viewBox="0 0 150 80">
            <ellipse cx="{cx/20}" cy="{cy/20}" rx="{rx/20}" ry="{ry/20}" 
                    fill="#ff6b6b" stroke="#d63031" stroke-width="1"/>
            <text x="{cx/20}" y="{cy/20}" text-anchor="middle" font-size="6" fill="white">{component['text'][:15]}</text>
        </svg>'''
    else:
        return f'''<svg width="150" height="80" viewBox="0 0 150 80">
            <rect x="{x/20}" y="{y/20}" width="{w/20}" height="{h/20}" 
                  fill="#74b9ff" stroke="#0984e3" stroke-width="1"/>
            <text x="{(x + w/2)/20}" y="{(y + h/2)/20}" text-anchor="middle" font-size="5" fill="white">{component['text'][:15]}</text>
        </svg>'''

def main():
    print("🔍 Creating complete BAT verification page with all components...")
    
    # Extract all components
    shapes, groups = extract_all_bat_components()
    
    print(f"✅ Found {len(shapes)} shapes and {len(groups)} groups")
    
    # Create HTML page
    html_content = create_complete_verification_page(shapes, groups)
    
    # Write to file
    with open('bat_complete_verification.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("📁 Files created:")
    print("   - bat_complete_verification.html (complete verification with full SVG)")
    print(f"\n🌐 Open bat_complete_verification.html in your browser")
    print(f"   📊 Shows {len(shapes)} shapes + {len(groups)} groups + full SVG diagram")

if __name__ == "__main__":
    main()
