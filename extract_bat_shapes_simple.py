#!/usr/bin/env python3
"""
Extract BAT SVG shapes without external dependencies
"""

import json
import re
import os

def extract_shapes_simple():
    """Extract shapes using regex only"""
    svg_path = "public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg"
    
    if not os.path.exists(svg_path):
        print(f"SVG file not found at {svg_path}")
        return {}
    
    try:
        with open(svg_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        shapes = []
        groups = []
        
        # Extract rectangles
        rect_pattern = r'<rect[^>]*x="([^"]*)"[^>]*y="([^"]*)"[^>]*width="([^"]*)"[^>]*height="([^"]*)"[^>]*>'
        rects = re.findall(rect_pattern, content)
        
        for i, (x, y, w, h) in enumerate(rects):
            # Get text near this rectangle
            text_pattern = r'<text[^>]*x="[^"]*"[^>]*y="[^"]*"[^>]*>([^<]*)</text>'
            texts = re.findall(text_pattern, content)
            
            shapes.append({
                "id": f"rect_{i}",
                "type": "rectangle",
                "x": float(x),
                "y": float(y),
                "width": float(w),
                "height": float(h),
                "text": texts[i] if i < len(texts) else "",
                "verified": False
            })
        
        # Extract ellipses (databases)
        ellipse_pattern = r'<ellipse[^>]*cx="([^"]*)"[^>]*cy="([^"]*)"[^>]*rx="([^"]*)"[^>]*ry="([^"]*)"[^>]*>'
        ellipses = re.findall(ellipse_pattern, content)
        
        for i, (cx, cy, rx, ry) in enumerate(ellipses):
            shapes.append({
                "id": f"ellipse_{i}",
                "type": "database",
                "x": float(cx) - float(rx),
                "y": float(cy) - float(ry),
                "width": float(rx) * 2,
                "height": float(ry) * 2,
                "text": f"Database {i+1}",
                "verified": False
            })
        
        # Extract groups
        group_pattern = r'<g[^>]*class="([^"]*)"[^>]*>'
        group_matches = re.findall(group_pattern, content)
        
        for i, group_class in enumerate(group_matches):
            if 'cluster' in group_class or 'entity' in group_class:
                groups.append({
                    "id": f"group_{i}",
                    "type": "group",
                    "title": f"Group {i+1}",
                    "x": 1000 + i * 200,
                    "y": 1000 + i * 200,
                    "width": 1000,
                    "height": 500,
                    "class": group_class,
                    "verified": False
                })
        
        return {
            "shapes": shapes,
            "groups": groups,
            "total_shapes": len(shapes),
            "total_groups": len(groups)
        }
        
    except Exception as e:
        print(f"Error: {e}")
        return {}

def generate_verification_html(data):
    """Generate HTML with checkboxes for verification"""
    html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAT Diagram - Shape Verification</title>
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
    </style>
</head>
<body>
    <div class="container">
        <h1>BAT Diagram - Shape & Group Verification</h1>
        
        <div class="summary">
            <h3>Summary</h3>
            <p><strong>Total Shapes:</strong> {data.get('total_shapes', 0)}</p>
            <p><strong>Total Groups:</strong> {data.get('total_groups', 0)}</p>
            <p><strong>Rectangles:</strong> {len([s for s in data.get('shapes', []) if s.get('type') == 'rectangle'])}</p>
            <p><strong>Databases:</strong> {len([s for s in data.get('shapes', []) if s.get('type') == 'database'])}</p>
        </div>
        
        <div class="verification-form">
            <h3>Instructions:</h3>
            <ol>
                <li>Review each shape/group below</li>
                <li>Check the "Verified" checkbox if coordinates are correct</li>
                <li>If incorrect, update the coordinates in the input fields</li>
                <li>Click "Submit Verified Data" when done</li>
            </ol>
        </div>
        
        <div class="progress">
            <div class="progress-bar" id="progressBar" style="width: 0%"></div>
        </div>
        
        <form id="verificationForm">
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
                        <strong>Text Content:</strong><br>
                        {shape.get('text', 'No text')}
                    </div>
                </div>
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
    print("🔍 Extracting BAT shapes and groups...")
    
    data = extract_shapes_simple()
    
    if not data:
        print("❌ Failed to extract shapes")
        return
    
    print(f"✅ Found {data.get('total_shapes', 0)} shapes and {data.get('total_groups', 0)} groups")
    
    # Generate HTML verification page
    html_content = generate_verification_html(data)
    with open('bat_verification_page.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("📁 Files created:")
    print("   - bat_verification_page.html (verification page)")
    print("\n🌐 Open bat_verification_page.html in your browser to verify all shapes and groups")

if __name__ == "__main__":
    main()
