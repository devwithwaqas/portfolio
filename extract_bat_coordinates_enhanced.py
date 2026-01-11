"""
ENHANCED BAT COORDINATE EXTRACTION
Extract ALL coordinates including databases, groups, and individual shapes
"""

import json
import re
import xml.etree.ElementTree as ET

def extract_all_coordinates():
    """Extract coordinates from BAT SVG with enhanced detection"""
    
    print("ENHANCED BAT COORDINATE EXTRACTION")
    print("=" * 80)
    
    # Read the SVG file
    with open('public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg', 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    # Parse SVG
    root = ET.fromstring(svg_content)
    
    # Get viewBox
    viewbox = root.get('viewBox', '0 0 27681 11856')
    print(f"SVG ViewBox: {viewbox}")
    
    # Initialize results
    results = {
        "viewBox": viewbox,
        "rectangles": [],
        "ellipses": [],
        "paths": [],
        "groups": [],
        "text_elements": []
    }
    
    # Extract rectangles (individual components)
    rect_count = 0
    for rect in root.findall('.//{http://www.w3.org/2000/svg}rect'):
        x = float(rect.get('x', 0))
        y = float(rect.get('y', 0))
        width = float(rect.get('width', 0))
        height = float(rect.get('height', 0))
        
        # Get text content if available
        text_content = ""
        for text_elem in rect.findall('.//{http://www.w3.org/2000/svg}text'):
            if text_elem.text:
                text_content += text_elem.text + " "
        
        results["rectangles"].append({
            "id": f"rect_{rect_count}",
            "x": x,
            "y": y,
            "width": width,
            "height": height,
            "text": text_content.strip()
        })
        rect_count += 1
    
    # Extract ellipses (databases)
    ellipse_count = 0
    for ellipse in root.findall('.//{http://www.w3.org/2000/svg}ellipse'):
        cx = float(ellipse.get('cx', 0))
        cy = float(ellipse.get('cy', 0))
        rx = float(ellipse.get('rx', 0))
        ry = float(ellipse.get('ry', 0))
        
        # Convert ellipse to rectangle coordinates
        x = cx - rx
        y = cy - ry
        width = rx * 2
        height = ry * 2
        
        # Get text content if available
        text_content = ""
        for text_elem in ellipse.findall('.//{http://www.w3.org/2000/svg}text'):
            if text_elem.text:
                text_content += text_elem.text + " "
        
        results["ellipses"].append({
            "id": f"ellipse_{ellipse_count}",
            "x": x,
            "y": y,
            "width": width,
            "height": height,
            "text": text_content.strip()
        })
        ellipse_count += 1
    
    # Extract paths (groups and complex shapes)
    path_count = 0
    for path in root.findall('.//{http://www.w3.org/2000/svg}path'):
        # Try to extract bounding box from path data
        d = path.get('d', '')
        
        # Simple bounding box calculation for paths
        if d:
            # Extract numbers from path data
            numbers = re.findall(r'-?\d+\.?\d*', d)
            if len(numbers) >= 4:
                try:
                    coords = [float(n) for n in numbers]
                    min_x = min(coords[::2])  # Every other number (x coordinates)
                    max_x = max(coords[::2])
                    min_y = min(coords[1::2])  # Every other number starting from 1 (y coordinates)
                    max_y = max(coords[1::2])
                    
                    x = min_x
                    y = min_y
                    width = max_x - min_x
                    height = max_y - min_y
                    
                    # Get text content if available
                    text_content = ""
                    for text_elem in path.findall('.//{http://www.w3.org/2000/svg}text'):
                        if text_elem.text:
                            text_content += text_elem.text + " "
                    
                    results["paths"].append({
                        "id": f"path_{path_count}",
                        "x": x,
                        "y": y,
                        "width": width,
                        "height": height,
                        "text": text_content.strip()
                    })
                    path_count += 1
                except:
                    pass
    
    # Extract groups (layers)
    group_count = 0
    for group in root.findall('.//{http://www.w3.org/2000/svg}g'):
        # Try to find group boundaries by analyzing children
        children = group.findall('.//{http://www.w3.org/2000/svg}*')
        if children:
            # Calculate bounding box of all children
            all_x = []
            all_y = []
            all_widths = []
            all_heights = []
            
            for child in children:
                if child.tag.endswith('rect'):
                    all_x.append(float(child.get('x', 0)))
                    all_y.append(float(child.get('y', 0)))
                    all_widths.append(float(child.get('width', 0)))
                    all_heights.append(float(child.get('height', 0)))
                elif child.tag.endswith('ellipse'):
                    cx = float(child.get('cx', 0))
                    cy = float(child.get('cy', 0))
                    rx = float(child.get('rx', 0))
                    ry = float(child.get('ry', 0))
                    all_x.append(cx - rx)
                    all_y.append(cy - ry)
                    all_widths.append(rx * 2)
                    all_heights.append(ry * 2)
            
            if all_x:
                min_x = min(all_x)
                min_y = min(all_y)
                max_x = max([x + w for x, w in zip(all_x, all_widths)])
                max_y = max([y + h for y, h in zip(all_y, all_heights)])
                
                x = min_x
                y = min_y
                width = max_x - min_x
                height = max_y - min_y
                
                # Get text content if available
                text_content = ""
                for text_elem in group.findall('.//{http://www.w3.org/2000/svg}text'):
                    if text_elem.text:
                        text_content += text_elem.text + " "
                
                results["groups"].append({
                    "id": f"group_{group_count}",
                    "x": x,
                    "y": y,
                    "width": width,
                    "height": height,
                    "text": text_content.strip()
                })
                group_count += 1
    
    # Extract text elements
    text_count = 0
    for text in root.findall('.//{http://www.w3.org/2000/svg}text'):
        x = float(text.get('x', 0))
        y = float(text.get('y', 0))
        text_content = text.text or ""
        
        results["text_elements"].append({
            "id": f"text_{text_count}",
            "x": x,
            "y": y,
            "text": text_content
        })
        text_count += 1
    
    # Save results
    with open('bat_enhanced_coordinates.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"COORDINATES EXTRACTED AND SAVED TO: bat_enhanced_coordinates.json")
    print("=" * 80)
    print(f"Total rectangles: {len(results['rectangles'])}")
    print(f"Total ellipses (databases): {len(results['ellipses'])}")
    print(f"Total paths: {len(results['paths'])}")
    print(f"Total groups: {len(results['groups'])}")
    print(f"Total text elements: {len(results['text_elements'])}")
    
    # Show first few of each type
    print("\nFirst 5 rectangles:")
    for i, rect in enumerate(results['rectangles'][:5]):
        print(f"  {i+1}. x={rect['x']}, y={rect['y']}, width={rect['width']}, height={rect['height']} - {rect['text']}")
    
    print("\nFirst 5 ellipses (databases):")
    for i, ellipse in enumerate(results['ellipses'][:5]):
        print(f"  {i+1}. x={ellipse['x']}, y={ellipse['y']}, width={ellipse['width']}, height={ellipse['height']} - {ellipse['text']}")
    
    print("\nFirst 5 groups:")
    for i, group in enumerate(results['groups'][:5]):
        print(f"  {i+1}. x={group['x']}, y={group['y']}, width={group['width']}, height={group['height']} - {group['text']}")
    
    return results

if __name__ == "__main__":
    extract_all_coordinates()
