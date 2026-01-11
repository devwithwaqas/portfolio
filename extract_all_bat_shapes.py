#!/usr/bin/env python3
"""
Comprehensive BAT SVG Shape Extraction
Extract ALL 41 shapes + 8 groups from BAT diagram
"""

import json
import re
import os
from bs4 import BeautifulSoup

def extract_all_shapes():
    """Extract all shapes and groups from BAT SVG"""
    svg_path = "public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg"
    
    if not os.path.exists(svg_path):
        print(f"SVG file not found at {svg_path}")
        return {}
    
    try:
        with open(svg_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        soup = BeautifulSoup(content, 'xml')
        
        shapes = []
        groups = []
        
        # Extract all rectangles
        rects = soup.find_all('rect')
        for i, rect in enumerate(rects):
            if rect.get('x') and rect.get('y') and rect.get('width') and rect.get('height'):
                # Get text content inside the rectangle
                text_elements = rect.find_next_siblings('text')
                text_content = ""
                for text_elem in text_elements:
                    if text_elem.string:
                        text_content += text_elem.string.strip() + " "
                
                shapes.append({
                    "id": f"rect_{i}",
                    "type": "rectangle",
                    "x": float(rect.get('x', 0)),
                    "y": float(rect.get('y', 0)),
                    "width": float(rect.get('width', 0)),
                    "height": float(rect.get('height', 0)),
                    "text": text_content.strip(),
                    "fill": rect.get('fill', ''),
                    "stroke": rect.get('stroke', ''),
                    "class": rect.get('class', '')
                })
        
        # Extract all ellipses (databases)
        ellipses = soup.find_all('ellipse')
        for i, ellipse in enumerate(ellipses):
            if ellipse.get('cx') and ellipse.get('cy') and ellipse.get('rx') and ellipse.get('ry'):
                # Get text content near the ellipse
                text_elements = ellipse.find_next_siblings('text')
                text_content = ""
                for text_elem in text_elements:
                    if text_elem.string:
                        text_content += text_elem.string.strip() + " "
                
                # Convert ellipse to rectangle coordinates
                cx = float(ellipse.get('cx', 0))
                cy = float(ellipse.get('cy', 0))
                rx = float(ellipse.get('rx', 0))
                ry = float(ellipse.get('ry', 0))
                
                shapes.append({
                    "id": f"ellipse_{i}",
                    "type": "database",
                    "x": cx - rx,
                    "y": cy - ry,
                    "width": rx * 2,
                    "height": ry * 2,
                    "text": text_content.strip(),
                    "fill": ellipse.get('fill', ''),
                    "stroke": ellipse.get('stroke', ''),
                    "class": ellipse.get('class', '')
                })
        
        # Extract all groups
        group_elements = soup.find_all('g')
        for i, group in enumerate(group_elements):
            if group.get('class') and ('cluster' in group.get('class') or 'entity' in group.get('class')):
                # Try to get group boundaries from path elements
                paths = group.find_all('path')
                if paths:
                    path = paths[0]
                    d = path.get('d', '')
                    
                    # Extract coordinates from path
                    coords = extract_path_coordinates(d)
                    if coords:
                        # Get group title
                        title_elem = group.find('text')
                        title = title_elem.string.strip() if title_elem and title_elem.string else f"Group {i}"
                        
                        groups.append({
                            "id": f"group_{i}",
                            "type": "group",
                            "title": title,
                            "x": coords['x'],
                            "y": coords['y'],
                            "width": coords['width'],
                            "height": coords['height'],
                            "class": group.get('class', ''),
                            "path_d": d
                        })
        
        return {
            "shapes": shapes,
            "groups": groups,
            "total_shapes": len(shapes),
            "total_groups": len(groups)
        }
        
    except Exception as e:
        print(f"Error processing SVG: {e}")
        return {}

def extract_path_coordinates(path_d):
    """Extract bounding box from SVG path"""
    try:
        # Simple coordinate extraction from path
        numbers = re.findall(r'-?\d+\.?\d*', path_d)
        if len(numbers) >= 4:
            coords = [float(n) for n in numbers]
            x_coords = [c for i, c in enumerate(coords) if i % 2 == 0]
            y_coords = [c for i, c in enumerate(coords) if i % 2 == 1]
            
            if x_coords and y_coords:
                return {
                    "x": min(x_coords),
                    "y": min(y_coords),
                    "width": max(x_coords) - min(x_coords),
                    "height": max(y_coords) - min(y_coords)
                }
    except:
        pass
    return None

def generate_html_report(data):
    """Generate HTML report with all shapes and groups"""
    html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAT Diagram - All Shapes & Groups Analysis</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }}
        .container {{
            max-width: 1200px;
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
        .shape-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }}
        .shape-card {{
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 15px;
            background: white;
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
        .shape-id {{
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }}
        .shape-type {{
            color: #666;
            font-size: 0.9em;
            margin-bottom: 10px;
        }}
        .coordinates {{
            background: #f8f9fa;
            padding: 8px;
            border-radius: 3px;
            font-family: monospace;
            font-size: 0.9em;
            margin: 10px 0;
        }}
        .text-content {{
            background: #fff3cd;
            padding: 8px;
            border-radius: 3px;
            font-size: 0.9em;
            margin: 10px 0;
            min-height: 20px;
        }}
        .section-title {{
            font-size: 1.2em;
            font-weight: bold;
            margin: 20px 0 10px 0;
            color: #333;
        }}
        .highlight {{
            background: #fff3cd;
            padding: 2px 4px;
            border-radius: 2px;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>BAT Diagram - All Shapes & Groups Analysis</h1>
        
        <div class="summary">
            <h3>Summary</h3>
            <p><strong>Total Shapes:</strong> {data.get('total_shapes', 0)}</p>
            <p><strong>Total Groups:</strong> {data.get('total_groups', 0)}</p>
            <p><strong>Rectangles:</strong> {len([s for s in data.get('shapes', []) if s.get('type') == 'rectangle'])}</p>
            <p><strong>Databases:</strong> {len([s for s in data.get('shapes', []) if s.get('type') == 'database'])}</p>
        </div>
        
        <div class="section-title">Individual Shapes ({data.get('total_shapes', 0)})</div>
        <div class="shape-grid">
"""
    
    # Add individual shapes
    for shape in data.get('shapes', []):
        html_content += f"""
            <div class="shape-card {shape.get('type', '')}">
                <div class="shape-id">{shape.get('id', 'Unknown')}</div>
                <div class="shape-type">Type: {shape.get('type', 'Unknown').title()}</div>
                <div class="coordinates">
                    <strong>Coordinates:</strong><br>
                    X: {shape.get('x', 0):.2f}<br>
                    Y: {shape.get('y', 0):.2f}<br>
                    Width: {shape.get('width', 0):.2f}<br>
                    Height: {shape.get('height', 0):.2f}
                </div>
                <div class="text-content">
                    <strong>Text:</strong> {shape.get('text', 'No text')}
                </div>
                <div style="font-size: 0.8em; color: #666;">
                    Fill: {shape.get('fill', 'None')}<br>
                    Stroke: {shape.get('stroke', 'None')}<br>
                    Class: {shape.get('class', 'None')}
                </div>
            </div>
"""
    
    html_content += """
        </div>
        
        <div class="section-title">Groups (8)</div>
        <div class="shape-grid">
"""
    
    # Add groups
    for group in data.get('groups', []):
        html_content += f"""
            <div class="shape-card group">
                <div class="shape-id">{group.get('id', 'Unknown')}</div>
                <div class="shape-type">Type: Group</div>
                <div class="coordinates">
                    <strong>Boundaries:</strong><br>
                    X: {group.get('x', 0):.2f}<br>
                    Y: {group.get('y', 0):.2f}<br>
                    Width: {group.get('width', 0):.2f}<br>
                    Height: {group.get('height', 0):.2f}
                </div>
                <div class="text-content">
                    <strong>Title:</strong> {group.get('title', 'No title')}
                </div>
                <div style="font-size: 0.8em; color: #666;">
                    Class: {group.get('class', 'None')}
                </div>
            </div>
"""
    
    html_content += """
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
            <h3>Instructions</h3>
            <p>1. Review each shape and group above</p>
            <p>2. Verify the coordinates match what you see in the diagram</p>
            <p>3. Check that the text content is correct</p>
            <p>4. Note any incorrect boundaries or missing components</p>
            <p>5. Use this information to correct the batNarration.js file</p>
        </div>
    </div>
</body>
</html>
"""
    
    return html_content

def main():
    print("🔍 Extracting all shapes and groups from BAT SVG...")
    
    # Extract all shapes and groups
    data = extract_all_shapes()
    
    if not data:
        print("❌ Failed to extract shapes")
        return
    
    print(f"✅ Found {data.get('total_shapes', 0)} shapes and {data.get('total_groups', 0)} groups")
    
    # Save raw data
    with open('bat_all_shapes_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    # Generate HTML report
    html_content = generate_html_report(data)
    with open('bat_shapes_analysis.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("📁 Files created:")
    print("   - bat_all_shapes_data.json (raw data)")
    print("   - bat_shapes_analysis.html (visual report)")
    print("\n🌐 Open bat_shapes_analysis.html in your browser to review all shapes and groups")

if __name__ == "__main__":
    main()
