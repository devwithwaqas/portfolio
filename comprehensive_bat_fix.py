"""
COMPREHENSIVE BAT FIX
Extract ALL coordinates and fix ALL issues in one go
"""

import json
import xml.etree.ElementTree as ET
import re

def comprehensive_bat_fix():
    """Fix ALL BAT narration issues comprehensively"""
    
    print("COMPREHENSIVE BAT FIX - EXTRACTING ALL COORDINATES")
    print("=" * 80)
    
    # Read the SVG file
    with open('public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg', 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    # Parse SVG
    root = ET.fromstring(svg_content)
    
    # Get viewBox
    viewbox = root.get('viewBox', '0 0 27681 11856')
    print(f"SVG ViewBox: {viewbox}")
    
    # Extract ALL rectangles with their text content
    all_components = []
    for i, rect in enumerate(root.findall('.//{http://www.w3.org/2000/svg}rect')):
        x = float(rect.get('x', 0))
        y = float(rect.get('y', 0))
        width = float(rect.get('width', 0))
        height = float(rect.get('height', 0))
        
        # Get text content
        text_content = ""
        for text_elem in rect.findall('.//{http://www.w3.org/2000/svg}text'):
            if text_elem.text:
                text_content += text_elem.text + " "
        
        all_components.append({
            "id": f"rect_{i}",
            "x": x,
            "y": y,
            "width": width,
            "height": height,
            "text": text_content.strip()
        })
    
    # Extract ALL ellipses (databases)
    all_databases = []
    for i, ellipse in enumerate(root.findall('.//{http://www.w3.org/2000/svg}ellipse')):
        cx = float(ellipse.get('cx', 0))
        cy = float(ellipse.get('cy', 0))
        rx = float(ellipse.get('rx', 0))
        ry = float(ellipse.get('ry', 0))
        
        # Convert to rectangle coordinates
        x = cx - rx
        y = cy - ry
        width = rx * 2
        height = ry * 2
        
        # Get text content
        text_content = ""
        for text_elem in ellipse.findall('.//{http://www.w3.org/2000/svg}text'):
            if text_elem.text:
                text_content += text_elem.text + " "
        
        all_databases.append({
            "id": f"ellipse_{i}",
            "x": x,
            "y": y,
            "width": width,
            "height": height,
            "text": text_content.strip()
        })
    
    # Save all coordinates
    all_coordinates = {
        "viewBox": viewbox,
        "components": all_components,
        "databases": all_databases
    }
    
    with open('all_bat_coordinates.json', 'w', encoding='utf-8') as f:
        json.dump(all_coordinates, f, indent=2, ensure_ascii=False)
    
    print(f"ALL COORDINATES EXTRACTED AND SAVED TO: all_bat_coordinates.json")
    print("=" * 80)
    print(f"Total components: {len(all_components)}")
    print(f"Total databases: {len(all_databases)}")
    
    # Show all components
    print("\nALL COMPONENTS WITH COORDINATES:")
    for i, comp in enumerate(all_components):
        print(f"  {i+1}. {comp['id']}: x={comp['x']}, y={comp['y']}, width={comp['width']}, height={comp['height']}")
        if comp['text']:
            print(f"     Text: {comp['text'][:100]}...")
    
    # Show all databases
    print("\nALL DATABASES WITH COORDINATES:")
    for i, db in enumerate(all_databases):
        print(f"  {i+1}. {db['id']}: x={db['x']}, y={db['y']}, width={db['width']}, height={db['height']}")
        if db['text']:
            print(f"     Text: {db['text'][:100]}...")
    
    return all_coordinates

if __name__ == "__main__":
    comprehensive_bat_fix()
