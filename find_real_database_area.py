"""
FIND THE REAL DATABASE AREA
Look at the actual bottom-right area where databases should be
"""

import json
import xml.etree.ElementTree as ET

def find_real_database_area():
    """Find the actual database area in bottom-right"""
    
    print("FINDING REAL DATABASE AREA")
    print("=" * 80)
    
    # Read the SVG file
    with open('public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg', 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    # Parse SVG
    root = ET.fromstring(svg_content)
    
    # Get viewBox
    viewbox = root.get('viewBox', '0 0 27681 11856')
    print(f"SVG ViewBox: {viewbox}")
    
    # Find all rectangles in the bottom-right area (y > 8000, x > 10000)
    bottom_right_rects = []
    for i, rect in enumerate(root.findall('.//{http://www.w3.org/2000/svg}rect')):
        x = float(rect.get('x', 0))
        y = float(rect.get('y', 0))
        width = float(rect.get('width', 0))
        height = float(rect.get('height', 0))
        
        # Check if it's in bottom-right area
        if y > 8000 and x > 10000:
            # Get text content
            text_content = ""
            for text_elem in rect.findall('.//{http://www.w3.org/2000/svg}text'):
                if text_elem.text:
                    text_content += text_elem.text + " "
            
            bottom_right_rects.append({
                "id": f"rect_{i}",
                "x": x,
                "y": y,
                "width": width,
                "height": height,
                "text": text_content.strip()
            })
    
    # Find all ellipses in the bottom-right area
    bottom_right_ellipses = []
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
        
        # Check if it's in bottom-right area
        if y > 8000 and x > 10000:
            # Get text content
            text_content = ""
            for text_elem in ellipse.findall('.//{http://www.w3.org/2000/svg}text'):
                if text_elem.text:
                    text_content += text_elem.text + " "
            
            bottom_right_ellipses.append({
                "id": f"ellipse_{i}",
                "x": x,
                "y": y,
                "width": width,
                "height": height,
                "text": text_content.strip()
            })
    
    # Save results
    results = {
        "viewBox": viewbox,
        "bottom_right_rectangles": bottom_right_rects,
        "bottom_right_ellipses": bottom_right_ellipses
    }
    
    with open('real_database_area.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"REAL DATABASE AREA EXTRACTED AND SAVED TO: real_database_area.json")
    print("=" * 80)
    print(f"Bottom-right rectangles: {len(bottom_right_rects)}")
    print(f"Bottom-right ellipses: {len(bottom_right_ellipses)}")
    
    # Show all bottom-right rectangles
    print("\nBOTTOM-RIGHT RECTANGLES (DATABASES):")
    for i, rect in enumerate(bottom_right_rects):
        print(f"  {i+1}. {rect['id']}: x={rect['x']}, y={rect['y']}, width={rect['width']}, height={rect['height']}")
        if rect['text']:
            print(f"     Text: {rect['text'][:100]}...")
    
    # Show all bottom-right ellipses
    print("\nBOTTOM-RIGHT ELLIPSES (DATABASES):")
    for i, ellipse in enumerate(bottom_right_ellipses):
        print(f"  {i+1}. {ellipse['id']}: x={ellipse['x']}, y={ellipse['y']}, width={ellipse['width']}, height={ellipse['height']}")
        if ellipse['text']:
            print(f"     Text: {ellipse['text'][:100]}...")
    
    return results

if __name__ == "__main__":
    find_real_database_area()
