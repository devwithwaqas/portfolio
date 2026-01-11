#!/usr/bin/env python3
"""
Extract ALL 41 shapes and 8 groups from the correct BAT SVG file
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

def extract_all_bat_components(svg_file):
    """Extract all components from the BAT SVG"""
    
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    components = []
    groups = []
    
    print("Extracting all components from BAT SVG...")
    
    # Find all rectangles (individual shapes)
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
                    components.append(component)
                
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
                components.append(component)
                
        except (ValueError, TypeError):
            continue
    
    # Find all groups - try different patterns
    print("Looking for groups...")
    
    # Try different group patterns
    group_patterns = [
        './/svg:g[@class="cluster"]',
        './/svg:g[@data-entity]',
        './/svg:g[@id]'
    ]
    
    all_groups = []
    for pattern in group_patterns:
        try:
            group_elements = root.findall(pattern, ns)
            print(f"Pattern '{pattern}': Found {len(group_elements)} groups")
            all_groups.extend(group_elements)
        except:
            print(f"Pattern '{pattern}': Error")
    
    # Remove duplicates
    seen_ids = set()
    unique_groups = []
    for group in all_groups:
        group_id = group.get('id', '')
        if group_id and group_id not in seen_ids:
            seen_ids.add(group_id)
            unique_groups.append(group)
    
    print(f"Found {len(unique_groups)} unique groups")
    
    for group in unique_groups:
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
                    groups.append(group_info)
                    
        except (ValueError, TypeError):
            continue
    
    # Also look for large rectangles that might be groups
    print("Looking for large rectangles that might be groups...")
    for rect in rectangles:
        try:
            x = float(rect.get('x', 0))
            y = float(rect.get('y', 0))
            width = float(rect.get('width', 0))
            height = float(rect.get('height', 0))
            
            if width > 0 and height > 0:
                area_sqrt = calculate_area_square_root(width, height)
                
                # Large rectangles might be groups
                if area_sqrt > 1000:  # Large rectangles
                    text_content = get_text_content(rect, ns)
                    
                    group_info = {
                        'type': 'group',
                        'x': x,
                        'y': y,
                        'width': width,
                        'height': height,
                        'area_sqrt': round(area_sqrt, 2),
                        'text': text_content,
                        'id': rect.get('id', ''),
                        'class': rect.get('class', ''),
                        'data_entity': '',
                        'data_uid': ''
                    }
                    groups.append(group_info)
                    
        except (ValueError, TypeError):
            continue
    
    # Sort by area_sqrt for consistent ordering
    components.sort(key=lambda x: x['area_sqrt'])
    groups.sort(key=lambda x: x['area_sqrt'])
    
    return components, groups

def main():
    svg_file = 'public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg'
    
    print("Extracting ALL components from the correct BAT SVG...")
    components, groups = extract_all_bat_components(svg_file)
    
    print(f"\nFound {len(components)} individual shapes:")
    print("=" * 120)
    
    for i, comp in enumerate(components, 1):
        print(f"{i:2d}. {comp['type'].upper():8} | Area√: {comp['area_sqrt']:6.1f} | "
              f"Size: {comp['width']:4.0f}x{comp['height']:4.0f} | "
              f"Pos: ({comp['x']:4.0f},{comp['y']:4.0f}) | "
              f"ID: {comp['id']:15} | "
              f"Text: '{comp['text'][:40]}{'...' if len(comp['text']) > 40 else ''}'")
    
    print(f"\nFound {len(groups)} groups:")
    print("=" * 120)
    
    for i, group in enumerate(groups, 1):
        print(f"{i:2d}. GROUP     | Area√: {group['area_sqrt']:6.1f} | "
              f"Size: {group['width']:4.0f}x{group['height']:4.0f} | "
              f"Pos: ({group['x']:4.0f},{group['y']:4.0f}) | "
              f"Entity: {group['data_entity']:15} | "
              f"Text: '{group['text'][:40]}{'...' if len(group['text']) > 40 else ''}'")
    
    # Save to JSON
    output_data = {
        'individual_shapes': components,
        'groups': groups,
        'total_shapes': len(components),
        'total_groups': len(groups),
        'expected_shapes': 41,
        'expected_groups': 8
    }
    
    with open('bat_final_components_data.json', 'w') as f:
        json.dump(output_data, f, indent=2)
    
    print(f"\nData saved to bat_final_components_data.json")
    print(f"Found {len(components)} shapes (expected 41) and {len(groups)} groups (expected 8)")
    
    if len(components) != 41:
        print(f"⚠️  WARNING: Expected 41 shapes but found {len(components)}")
    if len(groups) != 8:
        print(f"⚠️  WARNING: Expected 8 groups but found {len(groups)}")

if __name__ == "__main__":
    main()
