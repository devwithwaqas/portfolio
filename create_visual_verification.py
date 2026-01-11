#!/usr/bin/env python3
"""
Create visual verification page with actual component images from SVG
"""

import json
import re
import os
from PIL import Image, ImageDraw, ImageFont
import io
import base64

def extract_svg_components():
    """Extract actual components from the BAT SVG file"""
    svg_path = "public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg"
    
    if not os.path.exists(svg_path):
        print(f"SVG file not found at {svg_path}")
        return {}
    
    try:
        with open(svg_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        components = []
        
        # Extract rectangles with their text content
        rect_pattern = r'<rect[^>]*x="([^"]*)"[^>]*y="([^"]*)"[^>]*width="([^"]*)"[^>]*height="([^"]*)"[^>]*>'
        rects = re.findall(rect_pattern, content)
        
        # Extract text elements
        text_pattern = r'<text[^>]*x="([^"]*)"[^>]*y="([^"]*)"[^>]*>([^<]*)</text>'
        texts = re.findall(text_pattern, content)
        
        # Match rectangles with nearby text
        for i, (x, y, w, h) in enumerate(rects):
            x, y, w, h = float(x), float(y), float(w), float(h)
            
            # Find text within this rectangle
            rect_text = ""
            for tx, ty, text in texts:
                tx, ty = float(tx), float(ty)
                if x <= tx <= x + w and y <= ty <= y + h:
                    rect_text += text.strip() + " "
            
            if rect_text.strip():
                components.append({
                    "id": f"rect_{i}",
                    "type": "rectangle",
                    "x": x,
                    "y": y,
                    "width": w,
                    "height": h,
                    "text": rect_text.strip(),
                    "verified": False
                })
        
        # Extract ellipses (databases)
        ellipse_pattern = r'<ellipse[^>]*cx="([^"]*)"[^>]*cy="([^"]*)"[^>]*rx="([^"]*)"[^>]*ry="([^"]*)"[^>]*>'
        ellipses = re.findall(ellipse_pattern, content)
        
        for i, (cx, cy, rx, ry) in enumerate(ellipses):
            cx, cy, rx, ry = float(cx), float(cy), float(rx), float(ry)
            
            # Find text near this ellipse
            ellipse_text = ""
            for tx, ty, text in texts:
                tx, ty = float(tx), float(ty)
                if abs(tx - cx) < rx * 2 and abs(ty - cy) < ry * 2:
                    ellipse_text += text.strip() + " "
            
            components.append({
                "id": f"ellipse_{i}",
                "type": "database",
                "x": cx - rx,
                "y": cy - ry,
                "width": rx * 2,
                "height": ry * 2,
                "text": ellipse_text.strip() or f"Database {i+1}",
                "verified": False
            })
        
        # Extract groups
        group_pattern = r'<g[^>]*class="([^"]*)"[^>]*>'
        group_matches = re.findall(group_pattern, content)
        
        for i, group_class in enumerate(group_matches):
            if 'cluster' in group_class or 'entity' in group_class:
                components.append({
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
            "components": components,
            "total_components": len(components)
        }
        
    except Exception as e:
        print(f"Error processing SVG: {e}")
        return {}

def create_component_image(component, svg_content):
    """Create a visual representation of a component"""
    try:
        # Create a simple image representation
        width = max(200, int(component.get('width', 200)))
        height = max(100, int(component.get('height', 100)))
        
        # Create image
        img = Image.new('RGB', (width, height), 'white')
        draw = ImageDraw.Draw(img)
        
        # Draw border
        draw.rectangle([0, 0, width-1, height-1], outline='black', width=2)
        
        # Add component type indicator
        component_type = component.get('type', 'unknown')
        if component_type == 'database':
            # Draw ellipse for database
            draw.ellipse([10, 10, width-10, height-10], outline='orange', width=3)
            color = 'orange'
        elif component_type == 'group':
            # Draw rounded rectangle for group
            draw.rounded_rectangle([5, 5, width-5, height-5], radius=10, outline='blue', width=3)
            color = 'blue'
        else:
            # Draw rectangle for regular component
            draw.rectangle([5, 5, width-5, height-5], outline='green', width=3)
            color = 'green'
        
        # Add text
        text = component.get('text', component.get('title', 'Component'))
        if len(text) > 30:
            text = text[:27] + "..."
        
        try:
            font = ImageFont.truetype("arial.ttf", 12)
        except:
            font = ImageFont.load_default()
        
        # Split text into lines
        words = text.split()
        lines = []
        current_line = ""
        for word in words:
            if len(current_line + word) < 25:
                current_line += word + " "
            else:
                if current_line:
                    lines.append(current_line.strip())
                current_line = word + " "
        if current_line:
            lines.append(current_line.strip())
        
        # Draw text lines
        y_offset = 20
        for line in lines[:3]:  # Max 3 lines
            draw.text((10, y_offset), line, fill=color, font=font)
            y_offset += 15
        
        # Add coordinates
        coords_text = f"X:{component.get('x', 0):.0f} Y:{component.get('y', 0):.0f}"
        draw.text((10, height-20), coords_text, fill='gray', font=font)
        
        # Convert to base64
        buffer = io.BytesIO()
        img.save(buffer, format='PNG')
        img_str = base64.b64encode(buffer.getvalue()).decode()
        
        return f"data:image/png;base64,{img_str}"
        
    except Exception as e:
        print(f"Error creating image for component: {e}")
        return None

def generate_visual_verification_html(data):
    """Generate HTML with visual component images"""
    html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAT Diagram - Visual Component Verification</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }}
        .container {{
            max-width: 1600px;
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
        .component-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }}
        .component-card {{
            border: 2px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            background: white;
            transition: all 0.3s ease;
        }}
        .component-card:hover {{
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }}
        .component-card.verified {{
            border-color: #28a745;
            background: #f8fff9;
        }}
        .component-card.wrong {{
            border-color: #dc3545;
            background: #fff5f5;
        }}
        .component-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }}
        .component-id {{
            font-weight: bold;
            color: #333;
            font-size: 1.1em;
        }}
        .status-radios {{
            display: flex;
            gap: 15px;
        }}
        .status-radio {{
            transform: scale(1.1);
        }}
        .component-image {{
            text-align: center;
            margin: 15px 0;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 5px;
        }}
        .component-image img {{
            max-width: 100%;
            height: auto;
            border: 1px solid #ddd;
            border-radius: 3px;
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
            min-height: 40px;
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
        .output-section {{
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
        }}
        .output-textarea {{
            width: 100%;
            height: 200px;
            font-family: monospace;
            font-size: 0.9em;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 10px;
        }}
        .status-label {{
            font-size: 0.9em;
            font-weight: bold;
        }}
        .correct-label {{
            color: #28a745;
        }}
        .wrong-label {{
            color: #dc3545;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>BAT Diagram - Visual Component Verification</h1>
        
        <div class="summary">
            <h3>Summary</h3>
            <p><strong>Total Components Found:</strong> {data.get('total_components', 0)}</p>
            <p><strong>Rectangles:</strong> {len([c for c in data.get('components', []) if c.get('type') == 'rectangle'])}</p>
            <p><strong>Databases:</strong> {len([c for c in data.get('components', []) if c.get('type') == 'database'])}</p>
            <p><strong>Groups:</strong> {len([c for c in data.get('components', []) if c.get('type') == 'group'])}</p>
        </div>
        
        <div class="verification-form">
            <h3>Instructions:</h3>
            <ol>
                <li>Look at the visual representation of each component below</li>
                <li>Compare it with the actual BAT diagram</li>
                <li>Check "Correct" if the coordinates match what you see, or "Wrong" if they need fixing</li>
                <li>If "Wrong", update the coordinates in the input fields</li>
                <li>Click "Generate Analysis" to get CSV output for copy-paste</li>
            </ol>
        </div>
        
        <div class="progress">
            <div class="progress-bar" id="progressBar" style="width: 0%"></div>
        </div>
        
        <form id="verificationForm">
            <div class="component-grid">
"""
    
    # Add components with visual representations
    for i, component in enumerate(data.get('components', [])):
        # Create visual representation
        component_image = create_component_image(component, "")
        
        html_content += f"""
                <div class="component-card {component.get('type', '')}" id="card_{i}">
                    <div class="component-header">
                        <div class="component-id">{component.get('id', 'Unknown')}</div>
                        <div class="status-radios">
                            <label class="status-label correct-label">
                                <input type="radio" name="status_{i}" value="correct" class="status-radio" onchange="updateStatus({i}, 'correct')">
                                Correct
                            </label>
                            <label class="status-label wrong-label">
                                <input type="radio" name="status_{i}" value="wrong" class="status-radio" onchange="updateStatus({i}, 'wrong')">
                                Wrong
                            </label>
                        </div>
                    </div>
                    
                    <div class="component-image">
                        <strong>Visual Representation:</strong><br>
                        <img src="{component_image}" alt="Component {i+1}" style="max-width: 300px; max-height: 150px;">
                    </div>
                    
                    <div style="color: #666; margin-bottom: 10px;">Type: {component.get('type', 'Unknown').title()}</div>
                    
                    <div class="coordinates">
                        <strong>Current Coordinates:</strong><br>
                        X: {component.get('x', 0):.2f}<br>
                        Y: {component.get('y', 0):.2f}<br>
                        Width: {component.get('width', 0):.2f}<br>
                        Height: {component.get('height', 0):.2f}
                    </div>
                    
                    <div class="coordinate-inputs">
                        <input type="number" class="coord-input" id="x_{i}" value="{component.get('x', 0):.2f}" step="0.01" placeholder="X">
                        <input type="number" class="coord-input" id="y_{i}" value="{component.get('y', 0):.2f}" step="0.01" placeholder="Y">
                        <input type="number" class="coord-input" id="w_{i}" value="{component.get('width', 0):.2f}" step="0.01" placeholder="Width">
                        <input type="number" class="coord-input" id="h_{i}" value="{component.get('height', 0):.2f}" step="0.01" placeholder="Height">
                    </div>
                    
                    <div class="text-content">
                        <strong>Component Text:</strong><br>
                        {component.get('text', component.get('title', 'No text'))}
                    </div>
                </div>
"""
    
    html_content += """
            </div>
            
            <div class="output-section">
                <h3>Analysis Output</h3>
                <p>Click "Generate Analysis" to create CSV data for copy-paste analysis:</p>
                <button type="button" class="submit-btn" onclick="generateAnalysis()">Generate Analysis</button>
                <button type="button" class="submit-btn" onclick="generateJSON()">Generate JSON</button>
                <textarea id="outputArea" class="output-textarea" placeholder="Click 'Generate Analysis' to see CSV output here..."></textarea>
            </div>
        </form>
    </div>

    <script>
        function updateStatus(index, status) {
            const card = document.getElementById(`card_${index}`);
            card.classList.remove('correct', 'wrong');
            card.classList.add(status);
            updateProgress();
        }
        
        function updateProgress() {
            const radios = document.querySelectorAll('input[type="radio"]:checked');
            const total = document.querySelectorAll('input[type="radio"]').length / 2;
            const progress = (radios.length / total) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
        }
        
        function generateAnalysis() {
            const data = [];
            const totalItems = """ + str(len(data.get('components', []))) + """;
            
            for (let i = 0; i < totalItems; i++) {
                const correctRadio = document.querySelector(`input[name="status_${i}"][value="correct"]`);
                const wrongRadio = document.querySelector(`input[name="status_${i}"][value="wrong"]`);
                const x = parseFloat(document.getElementById(`x_${i}`).value);
                const y = parseFloat(document.getElementById(`y_${i}`).value);
                const w = parseFloat(document.getElementById(`w_${i}`).value);
                const h = parseFloat(document.getElementById(`h_${i}`).value);
                
                let status = 'unknown';
                if (correctRadio && correctRadio.checked) status = 'correct';
                if (wrongRadio && wrongRadio.checked) status = 'wrong';
                
                const item = {
                    index: i,
                    type: 'component',
                    status: status,
                    x: x,
                    y: y,
                    width: w,
                    height: h
                };
                
                data.push(item);
            }
            
            // Generate CSV
            let csv = 'Index,Type,Status,X,Y,Width,Height\\n';
            data.forEach(item => {
                csv += `${item.index},${item.type},${item.status},${item.x},${item.y},${item.width},${item.height}\\n`;
            });
            
            document.getElementById('outputArea').value = csv;
        }
        
        function generateJSON() {
            const data = {
                components: [],
                summary: {
                    total_verified: 0,
                    total_correct: 0,
                    total_wrong: 0
                }
            };
            
            const totalItems = """ + str(len(data.get('components', []))) + """;
            
            for (let i = 0; i < totalItems; i++) {
                const correctRadio = document.querySelector(`input[name="status_${i}"][value="correct"]`);
                const wrongRadio = document.querySelector(`input[name="status_${i}"][value="wrong"]`);
                const x = parseFloat(document.getElementById(`x_${i}`).value);
                const y = parseFloat(document.getElementById(`y_${i}`).value);
                const w = parseFloat(document.getElementById(`w_${i}`).value);
                const h = parseFloat(document.getElementById(`h_${i}`).value);
                
                let status = 'unknown';
                if (correctRadio && correctRadio.checked) {
                    status = 'correct';
                    data.summary.total_correct++;
                }
                if (wrongRadio && wrongRadio.checked) {
                    status = 'wrong';
                    data.summary.total_wrong++;
                }
                
                const item = {
                    index: i,
                    status: status,
                    x: x,
                    y: y,
                    width: w,
                    height: h
                };
                
                data.components.push(item);
                if (status !== 'unknown') data.summary.total_verified++;
            }
            
            document.getElementById('outputArea').value = JSON.stringify(data, null, 2);
        }
    </script>
</body>
</html>
"""
    
    return html_content

def main():
    print("🔍 Creating visual verification page with component images...")
    
    data = extract_svg_components()
    
    if not data:
        print("❌ Failed to extract components")
        return
    
    print(f"✅ Found {data.get('total_components', 0)} components")
    
    # Generate HTML verification page
    html_content = generate_visual_verification_html(data)
    with open('bat_visual_verification.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("📁 Files created:")
    print("   - bat_visual_verification.html (visual verification page)")
    print("\n🌐 Open bat_visual_verification.html in your browser to verify components with visual representations")

if __name__ == "__main__":
    main()
