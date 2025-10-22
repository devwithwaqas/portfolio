"""
Generic script to extract component coordinates from any C4 PlantUML diagram SVG
Usage: python extract_diagram_coordinates.py <svg_file> <output_json>
"""

import xml.etree.ElementTree as ET
import json
import sys
import re

def extract_coordinates(svg_file):
    """Extract all component coordinates from SVG"""
    
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    components = {}
    
    # Find all entity groups
    for g in root.iter('{http://www.w3.org/2000/svg}g'):
        g_id = g.get('id', '')
        
        if g_id.startswith('entity_'):
            component_id = g_id.replace('entity_', '')
            
            # Find rectangles in this group
            rects = list(g.findall('.//{http://www.w3.org/2000/svg}rect'))
            
            if rects:
                rect = rects[0]
                x = float(rect.get('x', 0))
                y = float(rect.get('y', 0))
                width = float(rect.get('width', 0))
                height = float(rect.get('height', 0))
                
                components[component_id] = {
                    'x': round(x, 1),
                    'y': round(y, 1),
                    'width': round(width, 1),
                    'height': round(height, 1),
                    'centerX': round(x + width/2, 1),
                    'centerY': round(y + height/2, 1)
                }
    
    # Also find database cylinders (they use paths instead of simple rects)
    for g in root.iter('{http://www.w3.org/2000/svg}g'):
        g_id = g.get('id', '')
        
        if g_id.startswith('entity_') and g_id.replace('entity_', '') not in components:
            component_id = g_id.replace('entity_', '')
            
            # Database cylinders have path elements
            paths = list(g.findall('.//{http://www.w3.org/2000/svg}path'))
            
            if len(paths) >= 2:  # Cylinders typically have 2+ paths
                # Extract bounding box from path data
                all_coords = []
                for path in paths:
                    d = path.get('d', '')
                    coords = re.findall(r'(-?[0-9.]+)', d)
                    all_coords.extend([float(c) for c in coords])
                
                if all_coords:
                    xs = all_coords[::2]
                    ys = all_coords[1::2]
                    
                    if xs and ys:
                        x = min(xs)
                        y = min(ys)
                        width = max(xs) - min(xs)
                        height = max(ys) - min(ys)
                        
                        components[component_id] = {
                            'x': round(x, 1),
                            'y': round(y, 1),
                            'width': round(width, 1),
                            'height': round(height, 1),
                            'centerX': round(x + width/2, 1),
                            'centerY': round(y + height/2, 1)
                        }
    
    return components

def calculate_package_boundaries(components, package_definitions, padding=50):
    """Calculate bounding boxes for packages based on their components"""
    
    package_boundaries = {}
    
    for pkg_name, component_ids in package_definitions.items():
        coords = []
        
        for comp_id in component_ids:
            if comp_id in components:
                comp = components[comp_id]
                coords.append({
                    'x': comp['x'],
                    'y': comp['y'],
                    'x2': comp['x'] + comp['width'],
                    'y2': comp['y'] + comp['height']
                })
        
        if coords:
            min_x = min(c['x'] for c in coords) - padding
            min_y = min(c['y'] for c in coords) - padding
            max_x = max(c['x2'] for c in coords) + padding
            max_y = max(c['y2'] for c in coords) + padding
            
            package_boundaries[pkg_name] = {
                'x': round(min_x, 1),
                'y': round(min_y, 1),
                'width': round(max_x - min_x, 1),
                'height': round(max_y - min_y, 1),
                'centerX': round((min_x + max_x) / 2, 1),
                'centerY': round((min_y + max_y) / 2, 1),
                'component_count': len(coords)
            }
    
    return package_boundaries

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python extract_diagram_coordinates.py <svg_file> [output_json]")
        sys.exit(1)
    
    svg_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else svg_file.replace('.svg', '_coordinates.json')
    
    print(f"Extracting coordinates from: {svg_file}")
    components = extract_coordinates(svg_file)
    
    print(f"Found {len(components)} components")
    
    # Save components
    with open(output_file, 'w') as f:
        json.dump({'components': components}, f, indent=2)
    
    print(f"Saved to: {output_file}")
    print(f"\nTo calculate package boundaries, define package_definitions and call:")
    print(f"  calculate_package_boundaries(components, package_definitions)")

