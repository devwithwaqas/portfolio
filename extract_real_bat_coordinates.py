#!/usr/bin/env python3
"""
Extract real BAT coordinates from SVG with proper area filtering
"""

import re
import json
import os
import math

def extract_real_bat_components():
    """Extract components from BAT SVG with proper area filtering"""
    
    svg_file = "public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg"
    
    if not os.path.exists(svg_file):
        print(f"❌ SVG file not found: {svg_file}")
        return [], []
    
    with open(svg_file, 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    shapes = []
    groups = []
    
    print("🔍 Analyzing SVG for components with area square root 350-550...")
    
    # Extract rectangles and filter by area
    rect_pattern = r'<rect[^>]*x="([^"]*)"[^>]*y="([^"]*)"[^>]*width="([^"]*)"[^>]*height="([^"]*)"[^>]*>'
    rects = re.findall(rect_pattern, svg_content)
    
    for i, (x, y, w, h) in enumerate(rects):
        try:
            x, y, w, h = float(x), float(y), float(w), float(h)
            area = w * h
            area_sqrt = math.sqrt(area)
            
            # Filter for individual shapes: area square root between 350-550
            if 350 <= area_sqrt <= 550:
                text_content = extract_text_near_coords(svg_content, x, y)
                shapes.append({
                    'id': f'shape_{len(shapes)+1}',
                    'type': 'rectangle',
                    'x': x,
                    'y': y,
                    'width': w,
                    'height': h,
                    'text': text_content,
                    'title': f'Shape {len(shapes)+1}: {text_content[:30]}...' if len(text_content) > 30 else f'Shape {len(shapes)+1}: {text_content}',
                    'area': area,
                    'area_sqrt': area_sqrt
                })
                print(f"✅ Found shape: {text_content} (area: {area:.0f}, sqrt: {area_sqrt:.0f})")
        except:
            continue
    
    # Extract ellipses (databases) - they might have different area ranges
    ellipse_pattern = r'<ellipse[^>]*cx="([^"]*)"[^>]*cy="([^"]*)"[^>]*rx="([^"]*)"[^>]*ry="([^"]*)"[^>]*>'
    ellipses = re.findall(ellipse_pattern, svg_content)
    
    for i, (cx, cy, rx, ry) in enumerate(ellipses):
        try:
            cx, cy, rx, ry = float(cx), float(cy), float(rx), float(ry)
            area = math.pi * rx * ry  # Ellipse area
            area_sqrt = math.sqrt(area)
            
            # For databases, use a wider range
            if 200 <= area_sqrt <= 800:
                text_content = extract_text_near_coords(svg_content, cx, cy)
                shapes.append({
                    'id': f'database_{len([s for s in shapes if 'database' in s.get('id', '')])+1}',
                    'type': 'ellipse',
                    'x': cx - rx,
                    'y': cy - ry,
                    'width': rx * 2,
                    'height': ry * 2,
                    'text': text_content,
                    'title': f'Database {len([s for s in shapes if "database" in s.get("id", "")])+1}: {text_content[:30]}...' if len(text_content) > 30 else f'Database {len([s for s in shapes if "database" in s.get("id", "")])+1}: {text_content}',
                    'area': area,
                    'area_sqrt': area_sqrt
                })
                print(f"✅ Found database: {text_content} (area: {area:.0f}, sqrt: {area_sqrt:.0f})")
        except:
            continue
    
    # Extract groups - look for larger rectangles (area square root > 1000)
    for i, (x, y, w, h) in enumerate(rects):
        try:
            x, y, w, h = float(x), float(y), float(w), float(h)
            area = w * h
            area_sqrt = math.sqrt(area)
            
            # Filter for groups: area square root > 1000
            if area_sqrt > 1000:
                text_content = extract_text_near_coords(svg_content, x, y)
                groups.append({
                    'id': f'group_{len(groups)+1}',
                    'type': 'group',
                    'x': x,
                    'y': y,
                    'width': w,
                    'height': h,
                    'text': text_content,
                    'title': f'Group {len(groups)+1}: {text_content[:30]}...' if len(text_content) > 30 else f'Group {len(groups)+1}: {text_content}',
                    'area': area,
                    'area_sqrt': area_sqrt
                })
                print(f"✅ Found group: {text_content} (area: {area:.0f}, sqrt: {area_sqrt:.0f})")
        except:
            continue
    
    return shapes, groups

def extract_text_near_coords(svg_content, x, y, tolerance=200):
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
    
    # Fallback: look for any text in the area
    text_pattern2 = r'<text[^>]*>([^<]*)</text>'
    all_texts = re.findall(text_pattern2, svg_content)
    for text in all_texts:
        if text.strip() and len(text.strip()) > 3:
            return text.strip()
    
    return "Component text"

def update_html_with_real_coordinates(shapes, groups):
    """Update the HTML file with real coordinates"""
    
    # Read the current HTML file
    with open('bat_svg_real_time_cropper.html', 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Create the new components array
    all_components = shapes + groups
    
    # Find and replace the components array in the JavaScript
    import re
    pattern = r'let allComponents = \[.*?\];'
    replacement = f'let allComponents = {json.dumps(all_components)};'
    
    new_html_content = re.sub(pattern, replacement, html_content, flags=re.DOTALL)
    
    # Write the updated HTML file
    with open('bat_svg_real_time_cropper.html', 'w', encoding='utf-8') as f:
        f.write(new_html_content)
    
    print(f"✅ Updated HTML file with {len(shapes)} shapes and {len(groups)} groups")

def main():
    print("🔍 Extracting real BAT coordinates from SVG...")
    
    # Extract components with proper area filtering
    shapes, groups = extract_real_bat_components()
    
    print(f"\n📊 Results:")
    print(f"   - {len(shapes)} individual shapes found")
    print(f"   - {len(groups)} groups found")
    print(f"   - Total: {len(shapes) + len(groups)} components")
    
    # Update the HTML file
    update_html_with_real_coordinates(shapes, groups)
    
    print(f"\n🌐 Open http://localhost:3003/bat_svg_real_time_cropper.html to verify")
    print("   📊 Now shows real coordinates extracted from the actual SVG")

if __name__ == "__main__":
    main()