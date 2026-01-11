#!/usr/bin/env python3
"""
Extract the correct BAT components:
- 37 individual shapes (rectangles)
- 4 databases (ellipses/cylinders)
- 8 main groups (clusters)
"""

import xml.etree.ElementTree as ET
import math
import json

def calculate_area_square_root(width, height):
    """Calculate square root of area"""
    area = width * height
    return math.sqrt(area)

def get_text_content(element, ns):
    """Extract all text content from an element and its children"""
    text_parts = []
    
    # Get direct text content
    if element.text and element.text.strip():
        text_parts.append(element.text.strip())
    
    # Get text from child text elements
    for text_elem in element.findall('.//svg:text', ns):
        if text_elem.text and text_elem.text.strip():
            text_parts.append(text_elem.text.strip())
    
    # Get text from tspan elements
    for tspan in element.findall('.//svg:tspan', ns):
        if tspan.text and tspan.text.strip():
            text_parts.append(tspan.text.strip())
    
    return ' '.join(text_parts)

def extract_bat_components_correctly(svg_file):
    """Extract components correctly: 37 shapes + 4 databases + 8 groups"""
    
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    individual_shapes = []
    databases = []
    main_groups = []
    
    print("Extracting BAT components correctly...")
    
    # Find all rectangles
    rectangles = root.findall('.//svg:rect', ns)
    print(f"Found {len(rectangles)} rectangles")
    
    for rect in rectangles:
        try:
            x = float(rect.get('x', 0))
            y = float(rect.get('y', 0))
            width = float(rect.get('width', 0))
            height = float(rect.get('height', 0))
            
            if width > 0 and height > 0:
                area_sqrt = calculate_area_square_root(width, height)
                text_content = get_text_content(rect, ns)
                
                # Skip very large background rectangles
                if area_sqrt < 2000:  # Filter out huge background rectangles
                    component = {
                        'type': 'rectangle',
                        'x': x,
                        'y': y,
                        'width': width,
                        'height': height,
                        'area_sqrt': round(area_sqrt, 2),
                        'text': text_content,
                        'id': rect.get('id', ''),
                        'class': rect.get('class', ''),
                        'fill': rect.get('fill', ''),
                        'stroke': rect.get('stroke', '')
                    }
                    individual_shapes.append(component)
                
        except (ValueError, TypeError):
            continue
    
    # Find all ellipses (databases)
    ellipses = root.findall('.//svg:ellipse', ns)
    print(f"Found {len(ellipses)} ellipses")
    
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
                text_content = get_text_content(ellipse, ns)
                
                component = {
                    'type': 'ellipse',
                    'x': cx - rx,
                    'y': cy - ry,
                    'width': width,
                    'height': height,
                    'area_sqrt': round(area_sqrt, 2),
                    'text': text_content,
                    'id': ellipse.get('id', ''),
                    'class': ellipse.get('class', ''),
                    'fill': ellipse.get('fill', ''),
                    'stroke': ellipse.get('stroke', '')
                }
                databases.append(component)
                
        except (ValueError, TypeError):
            continue
    
    # Find main groups (clusters) - these are the 8 main architectural groups
    print("Looking for main groups (clusters)...")
    
    # Look for cluster groups specifically
    cluster_groups = root.findall('.//svg:g[@class="cluster"]', ns)
    print(f"Found {len(cluster_groups)} cluster groups")
    
    for group in cluster_groups:
        try:
            # Find the main rectangle in the group
            group_rect = group.find('.//svg:rect', ns)
            if group_rect is not None:
                x = float(group_rect.get('x', 0))
                y = float(group_rect.get('y', 0))
                width = float(group_rect.get('width', 0))
                height = float(group_rect.get('height', 0))
                
                if width > 0 and height > 0:
                    area_sqrt = calculate_area_square_root(width, height)
                    text_content = get_text_content(group, ns)
                    
                    # Skip the huge background group
                    if area_sqrt < 20000:  # Filter out the main background
                        group_info = {
                            'type': 'group',
                            'x': x,
                            'y': y,
                            'width': width,
                            'height': height,
                            'area_sqrt': round(area_sqrt, 2),
                            'text': text_content,
                            'id': group.get('id', ''),
                            'class': group.get('class', ''),
                            'data_entity': group.get('data-entity', ''),
                            'data_uid': group.get('data-uid', '')
                        }
                        main_groups.append(group_info)
                    
        except (ValueError, TypeError):
            continue
    
    # Sort by area_sqrt for consistent ordering
    individual_shapes.sort(key=lambda x: x['area_sqrt'])
    databases.sort(key=lambda x: x['area_sqrt'])
    main_groups.sort(key=lambda x: x['area_sqrt'])
    
    return individual_shapes, databases, main_groups

def main():
    svg_file = 'public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg'
    
    print("Extracting BAT components correctly...")
    individual_shapes, databases, main_groups = extract_bat_components_correctly(svg_file)
    
    print(f"\nFound {len(individual_shapes)} individual shapes:")
    print("=" * 120)
    
    for i, comp in enumerate(individual_shapes, 1):
        print(f"{i:2d}. {comp['type'].upper():8} | Area√: {comp['area_sqrt']:6.1f} | "
              f"Size: {comp['width']:4.0f}x{comp['height']:4.0f} | "
              f"Pos: ({comp['x']:4.0f},{comp['y']:4.0f}) | "
              f"ID: {comp['id']:15} | "
              f"Text: '{comp['text'][:40]}{'...' if len(comp['text']) > 40 else ''}'")
    
    print(f"\nFound {len(databases)} databases:")
    print("=" * 120)
    
    for i, db in enumerate(databases, 1):
        print(f"{i:2d}. {db['type'].upper():8} | Area√: {db['area_sqrt']:6.1f} | "
              f"Size: {db['width']:4.0f}x{db['height']:4.0f} | "
              f"Pos: ({db['x']:4.0f},{db['y']:4.0f}) | "
              f"ID: {db['id']:15} | "
              f"Text: '{db['text'][:40]}{'...' if len(db['text']) > 40 else ''}'")
    
    print(f"\nFound {len(main_groups)} main groups:")
    print("=" * 120)
    
    for i, group in enumerate(main_groups, 1):
        print(f"{i:2d}. GROUP     | Area√: {group['area_sqrt']:6.1f} | "
              f"Size: {group['width']:4.0f}x{group['height']:4.0f} | "
              f"Pos: ({group['x']:4.0f},{group['y']:4.0f}) | "
              f"Entity: {group['data_entity']:15} | "
              f"Text: '{group['text'][:40]}{'...' if len(group['text']) > 40 else ''}'")
    
    # Save to JSON
    output_data = {
        'individual_shapes': individual_shapes,
        'databases': databases,
        'main_groups': main_groups,
        'total_shapes': len(individual_shapes),
        'total_databases': len(databases),
        'total_groups': len(main_groups),
        'expected_shapes': 37,
        'expected_databases': 4,
        'expected_groups': 8
    }
    
    with open('bat_correct_components_data.json', 'w') as f:
        json.dump(output_data, f, indent=2)
    
    print(f"\nData saved to bat_correct_components_data.json")
    print(f"Found {len(individual_shapes)} shapes (expected 37), {len(databases)} databases (expected 4), {len(main_groups)} groups (expected 8)")
    
    if len(individual_shapes) != 37:
        print(f"⚠️  WARNING: Expected 37 shapes but found {len(individual_shapes)}")
    if len(databases) != 4:
        print(f"⚠️  WARNING: Expected 4 databases but found {len(databases)}")
    if len(main_groups) != 8:
        print(f"⚠️  WARNING: Expected 8 groups but found {len(main_groups)}")

if __name__ == "__main__":
    main()
