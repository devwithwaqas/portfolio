#!/usr/bin/env python3
"""
Create visual verification page using actual SVG components
"""

import re
import json
import os

def extract_svg_components():
    """Extract components from the actual BAT SVG file"""
    
    svg_file = "public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg"
    
    if not os.path.exists(svg_file):
        print(f"❌ SVG file not found: {svg_file}")
        return []
    
    with open(svg_file, 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    components = []
    
    # Extract rectangles (main components)
    rect_pattern = r'<rect[^>]*x="([^"]*)"[^>]*y="([^"]*)"[^>]*width="([^"]*)"[^>]*height="([^"]*)"[^>]*>'
    rects = re.findall(rect_pattern, svg_content)
    
    for i, (x, y, w, h) in enumerate(rects):
        # Extract text content near this rectangle
        text_content = extract_text_near_coords(svg_content, float(x), float(y))
        components.append({
            'id': f'rect_{i+1}',
            'type': 'rectangle',
            'x': float(x),
            'y': float(y),
            'width': float(w),
            'height': float(h),
            'text': text_content,
            'title': f'Component {i+1}'
        })
    
    # Extract ellipses (databases)
    ellipse_pattern = r'<ellipse[^>]*cx="([^"]*)"[^>]*cy="([^"]*)"[^>]*rx="([^"]*)"[^>]*ry="([^"]*)"[^>]*>'
    ellipses = re.findall(ellipse_pattern, svg_content)
    
    for i, (cx, cy, rx, ry) in enumerate(ellipses):
        text_content = extract_text_near_coords(svg_content, float(cx), float(cy))
        components.append({
            'id': f'ellipse_{i+1}',
            'type': 'ellipse',
            'x': float(cx) - float(rx),
            'y': float(cy) - float(ry),
            'width': float(rx) * 2,
            'height': float(ry) * 2,
            'text': text_content,
            'title': f'Database {i+1}'
        })
    
    # Extract groups (larger boxes)
    group_pattern = r'<g[^>]*id="([^"]*)"[^>]*>'
    groups = re.findall(group_pattern, svg_content)
    
    for i, group_id in enumerate(groups):
        if 'group' in group_id.lower() or 'layer' in group_id.lower():
            # Try to find group boundaries
            group_content = extract_group_content(svg_content, group_id)
            if group_content:
                components.append({
                    'id': f'group_{i+1}',
                    'type': 'group',
                    'x': group_content.get('x', 0),
                    'y': group_content.get('y', 0),
                    'width': group_content.get('width', 200),
                    'height': group_content.get('height', 100),
                    'text': group_content.get('text', group_id),
                    'title': f'Group: {group_id}'
                })
    
    return components

def extract_text_near_coords(svg_content, x, y, tolerance=50):
    """Extract text content near given coordinates"""
    # Look for text elements within tolerance of the coordinates
    text_pattern = r'<text[^>]*x="([^"]*)"[^>]*y="([^"]*)"[^>]*>([^<]*)</text>'
    texts = re.findall(text_pattern, svg_content)
    
    for tx, ty, text in texts:
        try:
            if abs(float(tx) - x) < tolerance and abs(float(ty) - y) < tolerance:
                return text.strip()
        except:
            continue
    
    return "No text found"

def extract_group_content(svg_content, group_id):
    """Extract content and boundaries of a group"""
    # This is a simplified approach - in reality, groups might be more complex
    return {
        'x': 1000,
        'y': 1000,
        'width': 2000,
        'height': 1000,
        'text': group_id
    }

def create_visual_verification_page(components):
    """Create HTML page with SVG visual verification"""
    
    html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAT Components Visual Verification</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 20px;
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
        .svg-preview {{
            border: 2px solid #ddd;
            border-radius: 5px;
            margin: 10px 0;
            background: #fafafa;
            min-height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }}
        .coordinate-inputs {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin: 10px 0;
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
        <h1>🔍 BAT Components Visual Verification</h1>
        <p>Verify each component by comparing with the actual BAT diagram</p>
        <p><strong>{len(components)} components found</strong></p>
    </div>

    <div class="component-grid">
"""

    for i, component in enumerate(components):
        # Create SVG preview for this component
        svg_preview = create_component_svg_preview(component)
        
        html_content += f"""
        <div class="component-card" id="component_{i}">
            <div class="component-title">{component['title']} ({component['type']})</div>
            <div class="component-text">Text: "{component['text']}"</div>
            
            <div class="svg-preview">
                {svg_preview}
            </div>
            
            <div class="coordinate-inputs">
                <div>
                    <label>X:</label>
                    <input type="number" id="x_{i}" value="{component['x']}" step="0.1" onchange="updateComponent({i})">
                </div>
                <div>
                    <label>Y:</label>
                    <input type="number" id="y_{i}" value="{component['y']}" step="0.1" onchange="updateComponent({i})">
                </div>
                <div>
                    <label>Width:</label>
                    <input type="number" id="w_{i}" value="{component['width']}" step="0.1" onchange="updateComponent({i})">
                </div>
                <div>
                    <label>Height:</label>
                    <input type="number" id="h_{i}" value="{component['height']}" step="0.1" onchange="updateComponent({i})">
                </div>
            </div>
            
            <div class="verification-section">
                <label>Verification:</label>
                <label><input type="radio" name="verify_{i}" value="correct" onchange="updateStatus({i})"> ✅ Correct</label>
                <label><input type="radio" name="verify_{i}" value="wrong" onchange="updateStatus({i})"> ❌ Wrong</label>
                <span id="status_{i}" class="status pending">Pending</span>
            </div>
        </div>
"""

    html_content += """
    </div>

    <div class="output-section">
        <h3>📊 Analysis Output</h3>
        <button class="btn btn-success" onclick="generateAnalysis()">Generate Analysis</button>
        <button class="btn" onclick="exportToJSON()">Export to JSON</button>
        <button class="btn" onclick="applyFixes()">Apply Fixes to batNarration.js</button>
        
        <textarea id="output" placeholder="Click 'Generate Analysis' to see results..."></textarea>
    </div>

    <script>
        let components = """ + json.dumps(components) + """;
        
        function updateComponent(index) {
            const component = components[index];
            component.x = parseFloat(document.getElementById(`x_${index}`).value);
            component.y = parseFloat(document.getElementById(`y_${index}`).value);
            component.width = parseFloat(document.getElementById(`w_${index}`).value);
            component.height = parseFloat(document.getElementById(`h_${index}`).value);
            
            // Update SVG preview
            updateSVGPreview(index);
        }
        
        function updateSVGPreview(index) {
            const component = components[index];
            const preview = document.querySelector(`#component_${index} .svg-preview`);
            preview.innerHTML = createComponentSVG(component);
        }
        
        function createComponentSVG(component) {
            const x = component.x;
            const y = component.y;
            const w = component.width;
            const h = component.height;
            
            if (component.type == 'ellipse') {
                const cx = x + w/2;
                const cy = y + h/2;
                const rx = w/2;
                const ry = h/2;
                return `<svg width="200" height="100" viewBox="0 0 200 100">
                    <ellipse cx="${cx/10}" cy="${cy/10}" rx="${rx/10}" ry="${ry/10}" 
                            fill="#ff6b6b" stroke="#d63031" stroke-width="1"/>
                    <text x="${cx/10}" y="${cy/10}" text-anchor="middle" font-size="8" fill="white">${component.text}</text>
                </svg>`;
            } else {
                return `<svg width="200" height="100" viewBox="0 0 200 100">
                    <rect x="${x/10}" y="${y/10}" width="${w/10}" height="${h/10}" 
                          fill="#74b9ff" stroke="#0984e3" stroke-width="1"/>
                    <text x="${(x + w/2)/10}" y="${(y + h/2)/10}" text-anchor="middle" font-size="6" fill="white">${component.text}</text>
                </svg>`;
            }
        }
        
        function updateStatus(index) {
            const status = document.getElementById(`status_${index}`);
            const radios = document.querySelectorAll(`input[name="verify_${index}"]`);
            
            for (let radio of radios) {
                if (radio.checked) {
                    if (radio.value === 'correct') {
                        status.textContent = 'Correct';
                        status.className = 'status correct';
                    } else {
                        status.textContent = 'Wrong';
                        status.className = 'status wrong';
                    }
                    break;
                }
            }
        }
        
        function generateAnalysis() {
            let correct = 0;
            let wrong = 0;
            let pending = 0;
            let csvData = 'Component,Type,Status,X,Y,Width,Height,Text\\n';
            
            for (let i = 0; i < components.length; i++) {
                const status = document.getElementById(`status_${i}`);
                const component = components[i];
                
                let statusText = 'Pending';
                if (status.classList.contains('correct')) {
                    statusText = 'Correct';
                    correct++;
                } else if (status.classList.contains('wrong')) {
                    statusText = 'Wrong';
                    wrong++;
                } else {
                    pending++;
                }
                
                csvData += `${component.title},${component.type},${statusText},${component.x},${component.y},${component.width},${component.height},"${component.text}"\\n`;
            }
            
            const summary = `Summary: ${correct} Correct, ${wrong} Wrong, ${pending} Pending`;
            document.getElementById('output').value = summary + '\\n\\n' + csvData;
        }
        
        function exportToJSON() {
            const data = {
                components: components,
                summary: {
                    total: components.length,
                    correct: document.querySelectorAll('.status.correct').length,
                    wrong: document.querySelectorAll('.status.wrong').length,
                    pending: document.querySelectorAll('.status.pending').length
                }
            };
            document.getElementById('output').value = JSON.stringify(data, null, 2);
        }
        
        function applyFixes() {
            alert('This will update the batNarration.js file with corrected coordinates. Make sure to backup first!');
            // Implementation would go here
        }
        
        // Initialize SVG previews
        for (let i = 0; i < components.length; i++) {
            updateSVGPreview(i);
        }
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
        return f'''<svg width="200" height="100" viewBox="0 0 200 100">
            <ellipse cx="{cx/10}" cy="{cy/10}" rx="{rx/10}" ry="{ry/10}" 
                    fill="#ff6b6b" stroke="#d63031" stroke-width="1"/>
            <text x="{cx/10}" y="{cy/10}" text-anchor="middle" font-size="8" fill="white">{component['text']}</text>
        </svg>'''
    else:
        return f'''<svg width="200" height="100" viewBox="0 0 200 100">
            <rect x="{x/10}" y="{y/10}" width="{w/10}" height="{h/10}" 
                  fill="#74b9ff" stroke="#0984e3" stroke-width="1"/>
            <text x="{(x + w/2)/10}" y="{(y + h/2)/10}" text-anchor="middle" font-size="6" fill="white">{component['text']}</text>
        </svg>'''

def main():
    print("🔍 Creating SVG-based visual verification page...")
    
    # Extract components from SVG
    components = extract_svg_components()
    
    if not components:
        print("❌ No components found in SVG")
        return
    
    print(f"✅ Found {len(components)} components")
    
    # Create HTML page
    html_content = create_visual_verification_page(components)
    
    # Write to file
    with open('bat_svg_visual_verification.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("📁 Files created:")
    print("   - bat_svg_visual_verification.html (SVG-based visual verification)")
    print("\n🌐 Open bat_svg_visual_verification.html in your browser to verify components with actual SVG representations")

if __name__ == "__main__":
    main()
