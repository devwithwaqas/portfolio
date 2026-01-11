#!/usr/bin/env python3
"""
Extract Real Smart City C4 Diagram Coordinates
Properly analyze SVG and extract actual component positions
"""

import xml.etree.ElementTree as ET
import json
import re
from typing import List, Dict, Any

def extract_real_smartcity_coordinates(svg_file: str) -> Dict[str, Any]:
    """Extract real coordinates from Smart City C4 diagram"""
    
    # Parse SVG
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    # Define namespace
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    components = {
        'individual_shapes': [],
        'groups': [],
        'users': [],
        'viewbox': root.get('viewBox', '0 0 20293 12756'),
        'width': 20293,
        'height': 12756
    }
    
    print(f"SVG Dimensions: {components['width']} x {components['height']}")
    
    # Find all groups
    all_groups = root.findall('.//svg:g', ns)
    print(f"Found {len(all_groups)} groups")
    
    # Track processed components
    processed_rects = set()
    
    for group in all_groups:
        group_id = group.get('id', '')
        group_class = group.get('class', '')
        
        if not group_id:
            continue
        
        # Extract text content
        text_elements = group.findall('.//svg:text', ns)
        text_content = []
        for text_elem in text_elements:
            if text_elem.text and text_elem.text.strip():
                text_content.append(text_elem.text.strip())
        
        # Check group type
        is_package = ('package' in group_class.lower() or 
                     'group' in group_class.lower() or
                     'layer' in group_class.lower())
        
        is_users = ('person' in group_class.lower() or 
                   'actor' in group_class.lower() or 
                   'user' in group_class.lower() or
                   'municipal_staff' in group_id.lower() or
                   'citizen' in group_id.lower() or
                   'admin' in group_id.lower() or
                   'analyst' in group_id.lower())
        
        # Find rectangles (individual components)
        rectangles = group.findall('.//svg:rect', ns)
        valid_rects = []
        
        for rect in rectangles:
            x = float(rect.get('x', 0))
            y = float(rect.get('y', 0))
            width = float(rect.get('width', 0))
            height = float(rect.get('height', 0))
            area = width * height
            
            # More lenient area filtering for Smart City
            if 1000 < area < 500000:  # Reasonable component size range
                rect_key = f"{x}_{y}_{width}_{height}"
                if rect_key not in processed_rects:
                    valid_rects.append({
                        'x': x, 'y': y, 'width': width, 'height': height,
                        'area': area, 'rect': rect
                    })
                    processed_rects.add(rect_key)
        
        # Find ellipses (databases)
        ellipses = group.findall('.//svg:ellipse', ns)
        for ellipse in ellipses:
            cx = float(ellipse.get('cx', 0))
            cy = float(ellipse.get('cy', 0))
            rx = float(ellipse.get('rx', 0))
            ry = float(ellipse.get('ry', 0))
            
            # Convert ellipse to rectangle bounds
            x = cx - rx
            y = cy - ry
            width = rx * 2
            height = ry * 2
            area = width * height
            
            if 1000 < area < 500000:
                rect_key = f"{x}_{y}_{width}_{height}"
                if rect_key not in processed_rects:
                    valid_rects.append({
                        'x': x, 'y': y, 'width': width, 'height': height,
                        'area': area, 'rect': ellipse, 'type': 'ellipse'
                    })
                    processed_rects.add(rect_key)
        
        # Find polygons (database cylinders)
        polygons = group.findall('.//svg:polygon', ns)
        for polygon in polygons:
            points = polygon.get('points', '')
            if points:
                # Parse polygon points to get bounding box
                coords = points.split()
                if len(coords) >= 6:  # At least 3 points
                    x_coords = [float(coords[i]) for i in range(0, len(coords), 2)]
                    y_coords = [float(coords[i]) for i in range(1, len(coords), 2)]
                    
                    min_x = min(x_coords)
                    max_x = max(x_coords)
                    min_y = min(y_coords)
                    max_y = max(y_coords)
                    
                    width = max_x - min_x
                    height = max_y - min_y
                    area = width * height
                    
                    if 1000 < area < 500000:
                        rect_key = f"{min_x}_{min_y}_{width}_{height}"
                        if rect_key not in processed_rects:
                            valid_rects.append({
                                'x': min_x, 'y': min_y, 'width': width, 'height': height,
                                'area': area, 'rect': polygon, 'type': 'polygon'
                            })
                            processed_rects.add(rect_key)
        
        # Process based on group type
        if is_users and valid_rects:
            # Users cluster - create boundary around all user rectangles
            if len(valid_rects) >= 4:  # Expect 4 users
                min_x = min(r['x'] for r in valid_rects)
                min_y = min(r['y'] for r in valid_rects)
                max_x = max(r['x'] + r['width'] for r in valid_rects)
                max_y = max(r['y'] + r['height'] for r in valid_rects)
                
                users_cluster = {
                    'id': 'users_cluster',
                    'x': min_x - 50,
                    'y': min_y - 50,
                    'width': max_x - min_x + 100,
                    'height': max_y - min_y + 100,
                    'text': 'Users Cluster (4 users)',
                    'type': 'users_cluster',
                    'area': (max_x - min_x + 100) * (max_y - min_y + 100)
                }
                components['users'].append(users_cluster)
        
        elif is_package and len(valid_rects) > 1:
            # Package/group with multiple components
            min_x = min(r['x'] for r in valid_rects)
            min_y = min(r['y'] for r in valid_rects)
            max_x = max(r['x'] + r['width'] for r in valid_rects)
            max_y = max(r['y'] + r['height'] for r in valid_rects)
            
            group_component = {
                'id': group_id,
                'x': min_x - 40,
                'y': min_y - 40,
                'width': max_x - min_x + 80,
                'height': max_y - min_y + 80,
                'text': ' '.join(text_content) if text_content else f"Group {len(components['groups']) + 1}",
                'type': 'group',
                'component_count': len(valid_rects)
            }
            components['groups'].append(group_component)
        
        else:
            # Individual components
            for i, rect_data in enumerate(valid_rects):
                component_type = rect_data.get('type', 'rectangle')
                component_text = ' '.join(text_content) if text_content else f"Component {len(components['individual_shapes']) + 1}"
                
                # Clean up text
                component_text = re.sub(r'«[^»]*»', '', component_text).strip()
                component_text = re.sub(r'\s+', ' ', component_text)
                
                individual_component = {
                    'id': f"{group_id}_{len(components['individual_shapes']) + 1}",
                    'x': rect_data['x'],
                    'y': rect_data['y'],
                    'width': rect_data['width'],
                    'height': rect_data['height'],
                    'text': component_text,
                    'type': component_type,
                    'area': rect_data['area'],
                    'group_id': group_id
                }
                components['individual_shapes'].append(individual_component)
    
    return components

def main():
    """Main function to extract and save components"""
    svg_file = "public/assets/diagrams/SmartCity_C4_Diagram.svg"
    
    print("Extracting REAL Smart City C4 diagram coordinates...")
    components = extract_real_smartcity_coordinates(svg_file)
    
    # Print summary
    print(f"\nExtraction Summary:")
    print(f"- Individual Shapes: {len(components['individual_shapes'])}")
    print(f"- Groups: {len(components['groups'])}")
    print(f"- Users: {len(components['users'])}")
    print(f"- Total Components: {len(components['individual_shapes']) + len(components['groups']) + len(components['users'])}")
    
    # Count by type
    rectangles = len([s for s in components['individual_shapes'] if s['type'] == 'rectangle'])
    ellipses = len([s for s in components['individual_shapes'] if s['type'] == 'ellipse'])
    polygons = len([s for s in components['individual_shapes'] if s['type'] == 'polygon'])
    
    print(f"\nIndividual Shapes Breakdown:")
    print(f"- Rectangles: {rectangles}")
    print(f"- Ellipses: {ellipses}")
    print(f"- Polygons: {polygons}")
    
    # Save to JSON
    output_file = "smartcity_real_coordinates.json"
    with open(output_file, 'w') as f:
        json.dump(components, f, indent=2)
    
    print(f"\nComponents saved to: {output_file}")
    
    # Print sample components with real coordinates
    print(f"\nFirst 5 Individual Shapes (with real coordinates):")
    for i, shape in enumerate(components['individual_shapes'][:5]):
        print(f"  {i+1}. {shape['text']} ({shape['type']}) - x:{shape['x']:.1f}, y:{shape['y']:.1f}, w:{shape['width']:.1f}, h:{shape['height']:.1f}")
    
    print(f"\nGroups (with real coordinates):")
    for i, group in enumerate(components['groups']):
        print(f"  {i+1}. {group['text']} - x:{group['x']:.1f}, y:{group['y']:.1f}, w:{group['width']:.1f}, h:{group['height']:.1f}")
    
    print(f"\nUsers (with real coordinates):")
    for i, user in enumerate(components['users']):
        print(f"  {i+1}. {user['text']} - x:{user['x']:.1f}, y:{user['y']:.1f}, w:{user['width']:.1f}, h:{user['height']:.1f}")

if __name__ == "__main__":
    main()
