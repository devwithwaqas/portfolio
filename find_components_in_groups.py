#!/usr/bin/env python3
"""
Find components that might be in groups or have different structures
"""

import xml.etree.ElementTree as ET
import math
import json

def calculate_area_square_root(width, height):
    """Calculate square root of area"""
    area = width * height
    return math.sqrt(area)

def extract_components_from_svg(svg_file):
    """Extract all possible components including those in groups"""
    
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    components = []
    
    # Find all groups first
    groups = root.findall('.//svg:g', ns)
    print(f"Found {len(groups)} groups")
    
    for group in groups:
        group_id = group.get('id', '')
        group_class = group.get('class', '')
        
        # Find rectangles in this group
        rects = group.findall('.//svg:rect', ns)
        for rect in rects:
            try:
                x = float(rect.get('x', 0))
                y = float(rect.get('y', 0))
                width = float(rect.get('width', 0))
                height = float(rect.get('height', 0))
                
                if width > 0 and height > 0:
                    area_sqrt = calculate_area_square_root(width, height)
                    
                    # Get text content from this group
                    text_content = ""
                    text_elements = group.findall('.//svg:text', ns)
                    for text_elem in text_elements:
                        if text_elem.text:
                            text_content += text_elem.text.strip() + " "
                    
                    tspan_elements = group.findall('.//svg:tspan', ns)
                    for tspan in tspan_elements:
                        if tspan.text:
                            text_content += tspan.text.strip() + " "
                    
                    text_content = text_content.strip()
                    
                    components.append({
                        'type': 'rectangle_in_group',
                        'x': x, 'y': y, 'width': width, 'height': height,
                        'area_sqrt': area_sqrt,
                        'text': text_content,
                        'group_id': group_id,
                        'group_class': group_class,
                        'rect_id': rect.get('id', ''),
                        'rect_class': rect.get('class', '')
                    })
                    
            except (ValueError, TypeError):
                continue
    
    # Find standalone rectangles (not in groups)
    all_rects = root.findall('.//svg:rect', ns)
    for rect in all_rects:
        # Check if this rect is already in a group
        parent = rect.getparent()
        if parent.tag != '{http://www.w3.org/2000/svg}g':  # Not in a group
            try:
                x = float(rect.get('x', 0))
                y = float(rect.get('y', 0))
                width = float(rect.get('width', 0))
                height = float(rect.get('height', 0))
                
                if width > 0 and height > 0:
                    area_sqrt = calculate_area_square_root(width, height)
                    
                    # Get text content near this rect
                    text_content = ""
                    # Look for text elements that might be associated
                    all_texts = root.findall('.//svg:text', ns)
                    for text_elem in all_texts:
                        try:
                            text_x = float(text_elem.get('x', 0))
                            text_y = float(text_elem.get('y', 0))
                            
                            # If text is near this rectangle
                            if (abs(text_x - (x + width/2)) < 100 and 
                                abs(text_y - (y + height/2)) < 100):
                                if text_elem.text:
                                    text_content += text_elem.text.strip() + " "
                        except (ValueError, TypeError):
                            continue
                    
                    text_content = text_content.strip()
                    
                    components.append({
                        'type': 'standalone_rectangle',
                        'x': x, 'y': y, 'width': width, 'height': height,
                        'area_sqrt': area_sqrt,
                        'text': text_content,
                        'rect_id': rect.get('id', ''),
                        'rect_class': rect.get('class', '')
                    })
                    
            except (ValueError, TypeError):
                continue
    
    # Find ellipses (databases)
    ellipses = root.findall('.//svg:ellipse', ns)
    for ellipse in ellipses:
        try:
            cx = float(ellipse.get('cx', 0))
            cy = float(ellipse.get('cy', 0))
            rx = float(ellipse.get('rx', 0))
            ry = float(ellipse.get('ry', 0))
            
            if rx > 0 and ry > 0:
                width = rx * 2
                height = ry * 2
                area_sqrt = calculate_area_square_root(width, height)
                
                # Get text content near this ellipse
                text_content = ""
                all_texts = root.findall('.//svg:text', ns)
                for text_elem in all_texts:
                    try:
                        text_x = float(text_elem.get('x', 0))
                        text_y = float(text_elem.get('y', 0))
                        
                        # If text is near this ellipse
                        if (abs(text_x - cx) < 100 and abs(text_y - cy) < 100):
                            if text_elem.text:
                                text_content += text_elem.text.strip() + " "
                    except (ValueError, TypeError):
                        continue
                
                text_content = text_content.strip()
                
                components.append({
                    'type': 'ellipse',
                    'x': cx - rx, 'y': cy - ry, 'width': width, 'height': height,
                    'area_sqrt': area_sqrt,
                    'text': text_content,
                    'ellipse_id': ellipse.get('id', ''),
                    'ellipse_class': ellipse.get('class', '')
                })
                
        except (ValueError, TypeError):
            continue
    
    # Sort by area_sqrt
    components.sort(key=lambda x: x['area_sqrt'])
    
    return components

def main():
    svg_file = 'public/assets/img/heat-exchanger-diagram.svg'
    
    print("Extracting all components including those in groups...")
    components = extract_components_from_svg(svg_file)
    
    print(f"\nFound {len(components)} components:")
    print("=" * 120)
    
    for i, comp in enumerate(components, 1):
        print(f"{i:2d}. {comp['type'].upper():20} | Area√: {comp['area_sqrt']:6.1f} | "
              f"Size: {comp['width']:4.0f}x{comp['height']:4.0f} | "
              f"Pos: ({comp['x']:4.0f},{comp['y']:4.0f}) | "
              f"Text: '{comp['text'][:50]}{'...' if len(comp['text']) > 50 else ''}'")
        
        if 'group_id' in comp and comp['group_id']:
            print(f"     Group: {comp['group_id']} ({comp['group_class']})")
    
    # Filter for individual components (reasonable size with text)
    individual_components = []
    for comp in components:
        if (200 <= comp['area_sqrt'] <= 1000 and 
            comp['text'] and 
            len(comp['text'].strip()) > 0):
            individual_components.append(comp)
    
    print(f"\n" + "="*120)
    print(f"INDIVIDUAL COMPONENTS (with text, area√ 200-1000): {len(individual_components)}")
    print("="*120)
    
    for i, comp in enumerate(individual_components, 1):
        print(f"{i:2d}. {comp['text']} | Area√: {comp['area_sqrt']:6.1f} | "
              f"Size: {comp['width']:4.0f}x{comp['height']:4.0f} | "
              f"Pos: ({comp['x']:4.0f},{comp['y']:4.0f})")
    
    # Save to JSON
    output_data = {
        'all_components': components,
        'individual_components': individual_components,
        'total_count': len(components),
        'individual_count': len(individual_components)
    }
    
    with open('all_components_data.json', 'w') as f:
        json.dump(output_data, f, indent=2)
    
    print(f"\nData saved to all_components_data.json")
    print(f"Found {len(individual_components)} individual components with text")

if __name__ == "__main__":
    main()
