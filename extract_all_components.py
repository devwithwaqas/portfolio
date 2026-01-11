#!/usr/bin/env python3
"""
Extract ALL components from the BAT SVG - including polygons in groups
"""

import xml.etree.ElementTree as ET
import math
import json

def calculate_area_square_root(width, height):
    """Calculate square root of area"""
    area = width * height
    return math.sqrt(area)

def extract_polygon_bounds(points_str):
    """Extract bounding box from polygon points"""
    if not points_str:
        return None
    
    # Parse points like "405.825,503.2766,418.325,490.7766,563.0638,490.7766,..."
    coords = [float(x.strip()) for x in points_str.replace(',', ' ').split()]
    
    if len(coords) < 4:  # Need at least 2 points (4 coordinates)
        return None
    
    x_coords = coords[::2]  # Every other coordinate starting from 0
    y_coords = coords[1::2]  # Every other coordinate starting from 1
    
    min_x, max_x = min(x_coords), max(x_coords)
    min_y, max_y = min(y_coords), max(y_coords)
    
    return {
        'x': min_x,
        'y': min_y,
        'width': max_x - min_x,
        'height': max_y - min_y
    }

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

def extract_all_components(svg_file):
    """Extract all components from the SVG"""
    
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    components = []
    
    # Find all entity groups (these contain the individual components)
    entity_groups = root.findall('.//svg:g[@class="entity"]', ns)
    
    for group in entity_groups:
        entity_id = group.get('id', '')
        entity_data = group.get('data-entity', '')
        
        # Find polygons within this group
        polygons = group.findall('.//svg:polygon', ns)
        
        for polygon in polygons:
            points = polygon.get('points', '')
            bounds = extract_polygon_bounds(points)
            
            if bounds and bounds['width'] > 0 and bounds['height'] > 0:
                area_sqrt = calculate_area_square_root(bounds['width'], bounds['height'])
                
                # Get text content
                text_content = get_text_content(group, ns)
                
                component = {
                    'type': 'polygon',
                    'entity_id': entity_id,
                    'entity_data': entity_data,
                    'x': bounds['x'],
                    'y': bounds['y'],
                    'width': bounds['width'],
                    'height': bounds['height'],
                    'area_sqrt': round(area_sqrt, 2),
                    'text': text_content,
                    'points': points
                }
                components.append(component)
    
    # Also find standalone rectangles
    rectangles = root.findall('.//svg:rect', ns)
    for rect in rectangles:
        try:
            x = float(rect.get('x', 0))
            y = float(rect.get('y', 0))
            width = float(rect.get('width', 0))
            height = float(rect.get('height', 0))
            
            if width > 0 and height > 0:
                area_sqrt = calculate_area_square_root(width, height)
                text_content = get_text_content(rect, ns)
                
                component = {
                    'type': 'rectangle',
                    'entity_id': rect.get('id', ''),
                    'entity_data': '',
                    'x': x,
                    'y': y,
                    'width': width,
                    'height': height,
                    'area_sqrt': round(area_sqrt, 2),
                    'text': text_content,
                    'points': ''
                }
                components.append(component)
                
        except (ValueError, TypeError):
            continue
    
    # Also find ellipses (databases)
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
                text_content = get_text_content(ellipse, ns)
                
                component = {
                    'type': 'ellipse',
                    'entity_id': ellipse.get('id', ''),
                    'entity_data': '',
                    'x': cx - rx,
                    'y': cy - ry,
                    'width': width,
                    'height': height,
                    'area_sqrt': round(area_sqrt, 2),
                    'text': text_content,
                    'points': ''
                }
                components.append(component)
                
        except (ValueError, TypeError):
            continue
    
    # Sort by area_sqrt for consistent ordering
    components.sort(key=lambda x: x['area_sqrt'])
    
    return components

def main():
    svg_file = 'public/assets/img/heat-exchanger-diagram.svg'
    
    print("Extracting ALL components from the BAT SVG...")
    components = extract_all_components(svg_file)
    
    print(f"\nFound {len(components)} components:")
    print("=" * 120)
    
    for i, comp in enumerate(components, 1):
        print(f"{i:2d}. {comp['type'].upper():8} | Area√: {comp['area_sqrt']:6.1f} | "
              f"Size: {comp['width']:4.0f}x{comp['height']:4.0f} | "
              f"Pos: ({comp['x']:4.0f},{comp['y']:4.0f}) | "
              f"Entity: {comp['entity_id']:15} | "
              f"Text: '{comp['text'][:40]}{'...' if len(comp['text']) > 40 else ''}'")
    
    # Filter for individual components (area_sqrt between 350-550)
    individual_components = [c for c in components if 350 <= c['area_sqrt'] <= 550]
    
    print(f"\n" + "="*120)
    print(f"INDIVIDUAL COMPONENTS (area√ between 350-550): {len(individual_components)}")
    print("="*120)
    
    for i, comp in enumerate(individual_components, 1):
        print(f"{i:2d}. {comp['type'].upper():8} | Area√: {comp['area_sqrt']:6.1f} | "
              f"Size: {comp['width']:4.0f}x{comp['height']:4.0f} | "
              f"Pos: ({comp['x']:4.0f},{comp['y']:4.0f}) | "
              f"Entity: {comp['entity_id']:15} | "
              f"Text: '{comp['text']}'")
    
    # Save to JSON
    output_data = {
        'all_components': components,
        'individual_components': individual_components,
        'total_count': len(components),
        'individual_count': len(individual_components),
        'filter_criteria': 'area_sqrt between 350-550'
    }
    
    with open('all_components_data.json', 'w') as f:
        json.dump(output_data, f, indent=2)
    
    print(f"\nData saved to all_components_data.json")
    print(f"Ready to update HTML file with {len(individual_components)} individual components")

if __name__ == "__main__":
    main()
