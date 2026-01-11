#!/usr/bin/env python3
"""
Extract ONLY the architectural components from BAT SVG:
- 37 individual shapes (rectangles that are actual components)
- 4 databases (specific database shapes)
- 8 main groups (architectural clusters)
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

def is_architectural_component(rect, text_content):
    """Determine if a rectangle is an architectural component"""
    # Skip very small rectangles (likely decorative)
    width = float(rect.get('width', 0))
    height = float(rect.get('height', 0))
    area_sqrt = calculate_area_square_root(width, height)
    
    # Architectural components are typically between 300-600 area_sqrt
    if area_sqrt < 300 or area_sqrt > 600:
        return False
    
    # Skip rectangles with no meaningful content
    if not text_content.strip():
        return False
    
    # Skip connection lines and decorative elements
    fill_color = rect.get('fill', '')
    if fill_color in ['#999999', '#cccccc', '#f0f0f0']:  # Common connection line colors
        return False
    
    return True

def is_database_component(element, text_content):
    """Determine if an element is a database"""
    # Look for database-related text
    db_keywords = ['database', 'db', 'sql', 'cosmos', 'redis', 'cache', 'storage']
    text_lower = text_content.lower()
    
    for keyword in db_keywords:
        if keyword in text_lower:
            return True
    
    return False

def extract_architectural_components(svg_file):
    """Extract only architectural components"""
    
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    individual_shapes = []
    databases = []
    main_groups = []
    
    print("Extracting architectural components from BAT SVG...")
    
    # Find all rectangles and filter for architectural components
    rectangles = root.findall('.//svg:rect', ns)
    print(f"Found {len(rectangles)} rectangles")
    
    for rect in rectangles:
        try:
            x = float(rect.get('x', 0))
            y = float(rect.get('y', 0))
            width = float(rect.get('width', 0))
            height = float(rect.get('height', 0))
            
            if width > 0 and height > 0:
                text_content = get_text_content(rect, ns)
                
                if is_architectural_component(rect, text_content):
                    area_sqrt = calculate_area_square_root(width, height)
                    
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
                    
                    # Check if it's a database
                    if is_database_component(rect, text_content):
                        databases.append(component)
                    else:
                        individual_shapes.append(component)
                
        except (ValueError, TypeError):
            continue
    
    # Find main groups (clusters) - these are the 8 architectural groups
    print("Looking for main architectural groups...")
    
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
    
    print("Extracting architectural components from BAT SVG...")
    individual_shapes, databases, main_groups = extract_architectural_components(svg_file)
    
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
    
    with open('bat_architectural_components_data.json', 'w') as f:
        json.dump(output_data, f, indent=2)
    
    print(f"\nData saved to bat_architectural_components_data.json")
    print(f"Found {len(individual_shapes)} shapes (expected 37), {len(databases)} databases (expected 4), {len(main_groups)} groups (expected 8)")
    
    if len(individual_shapes) != 37:
        print(f"⚠️  WARNING: Expected 37 shapes but found {len(individual_shapes)}")
    if len(databases) != 4:
        print(f"⚠️  WARNING: Expected 4 databases but found {len(databases)}")
    if len(main_groups) != 8:
        print(f"⚠️  WARNING: Expected 8 groups but found {len(main_groups)}")

if __name__ == "__main__":
    main()
