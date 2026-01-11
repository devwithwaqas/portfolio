"""
FIND GROUPS AND DATABASES
Accurately find groups and cylinder boxes (databases) from the BAT SVG
"""

import json
import re
import xml.etree.ElementTree as ET

def find_groups_and_databases():
    """Find groups and databases from BAT SVG"""
    
    print("FINDING GROUPS AND DATABASES")
    print("=" * 80)
    
    # Read the SVG file
    with open('public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg', 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    # Parse SVG
    root = ET.fromstring(svg_content)
    
    # Get viewBox
    viewbox = root.get('viewBox', '0 0 27681 11856')
    print(f"SVG ViewBox: {viewbox}")
    
    # Find all groups with their boundaries
    groups = []
    for i, group in enumerate(root.findall('.//{http://www.w3.org/2000/svg}g')):
        # Get group attributes
        group_id = group.get('id', f'group_{i}')
        
        # Find all children of this group
        children = group.findall('.//{http://www.w3.org/2000/svg}*')
        
        if children:
            # Calculate bounding box of all children
            all_x = []
            all_y = []
            all_widths = []
            all_heights = []
            
            for child in children:
                if child.tag.endswith('rect'):
                    x = float(child.get('x', 0))
                    y = float(child.get('y', 0))
                    width = float(child.get('width', 0))
                    height = float(child.get('height', 0))
                    all_x.append(x)
                    all_y.append(y)
                    all_widths.append(width)
                    all_heights.append(height)
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
                
                # Get text content
                text_content = ""
                for text_elem in group.findall('.//{http://www.w3.org/2000/svg}text'):
                    if text_elem.text:
                        text_content += text_elem.text + " "
                
                groups.append({
                    "id": group_id,
                    "x": x,
                    "y": y,
                    "width": width,
                    "height": height,
                    "text": text_content.strip()
                })
    
    # Find all ellipses (databases/cylinders)
    databases = []
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
        
        databases.append({
            "id": f"ellipse_{i}",
            "x": x,
            "y": y,
            "width": width,
            "height": height,
            "text": text_content.strip()
        })
    
    # Find all rectangles that might be databases
    rectangles = []
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
        
        rectangles.append({
            "id": f"rect_{i}",
            "x": x,
            "y": y,
            "width": width,
            "height": height,
            "text": text_content.strip()
        })
    
    # Save results
    results = {
        "viewBox": viewbox,
        "groups": groups,
        "databases": databases,
        "rectangles": rectangles
    }
    
    with open('bat_groups_and_databases.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"GROUPS AND DATABASES EXTRACTED AND SAVED TO: bat_groups_and_databases.json")
    print("=" * 80)
    print(f"Total groups: {len(groups)}")
    print(f"Total databases (ellipses): {len(databases)}")
    print(f"Total rectangles: {len(rectangles)}")
    
    # Show all groups
    print("\nALL GROUPS WITH COORDINATES:")
    for i, group in enumerate(groups):
        print(f"  {i+1}. {group['id']}: x={group['x']}, y={group['y']}, width={group['width']}, height={group['height']}")
        if group['text']:
            print(f"     Text: {group['text'][:100]}...")
    
    # Show all databases
    print("\nALL DATABASES (ELLIPSES) WITH COORDINATES:")
    for i, db in enumerate(databases):
        print(f"  {i+1}. {db['id']}: x={db['x']}, y={db['y']}, width={db['width']}, height={db['height']}")
        if db['text']:
            print(f"     Text: {db['text'][:100]}...")
    
    # Show rectangles that might be databases (bottom area)
    print("\nRECTANGLES IN BOTTOM AREA (POTENTIAL DATABASES):")
    bottom_rectangles = [r for r in rectangles if r['y'] > 8000]  # Bottom area
    for i, rect in enumerate(bottom_rectangles):
        print(f"  {i+1}. {rect['id']}: x={rect['x']}, y={rect['y']}, width={rect['width']}, height={rect['height']}")
        if rect['text']:
            print(f"     Text: {rect['text'][:100]}...")
    
    return results

if __name__ == "__main__":
    find_groups_and_databases()
