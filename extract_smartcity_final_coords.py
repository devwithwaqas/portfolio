#!/usr/bin/env python3
"""
Extract FINAL Smart City C4 Diagram Coordinates
Properly identify groups, users, and individual components with correct coordinates
"""

import xml.etree.ElementTree as ET
import json
import re
from typing import List, Dict, Any

def extract_final_smartcity_coordinates(svg_file: str) -> Dict[str, Any]:
    """Extract final correct coordinates from Smart City C4 diagram"""
    
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
    
    # Find all groups and analyze their structure
    all_groups = root.findall('.//svg:g', ns)
    print(f"Found {len(all_groups)} groups")
    
    # Track processed components
    processed_rects = set()
    
    # First pass: identify users
    user_rects = []
    for group in all_groups:
        group_id = group.get('id', '')
        group_class = group.get('class', '')
        
        if ('municipal_staff' in group_id.lower() or 
            'citizen' in group_id.lower() or 
            'admin' in group_id.lower() or 
            'analyst' in group_id.lower() or
            'person' in group_class.lower() or 
            'actor' in group_class.lower() or 
            'user' in group_class.lower()):
            
            rectangles = group.findall('.//svg:rect', ns)
            for rect in rectangles:
                x = float(rect.get('x', 0))
                y = float(rect.get('y', 0))
                width = float(rect.get('width', 0))
                height = float(rect.get('height', 0))
                area = width * height
                
                if 100000 < area < 500000:  # User component size range
                    user_rects.append({
                        'x': x, 'y': y, 'width': width, 'height': height,
                        'area': area, 'id': group_id
                    })
                    print(f"  Found user: {group_id} - x={x:.1f}, y={y:.1f}, w={width:.1f}, h={height:.1f}")
    
    # Create users cluster if we found user rectangles
    if len(user_rects) >= 4:
        min_x = min(r['x'] for r in user_rects)
        min_y = min(r['y'] for r in user_rects)
        max_x = max(r['x'] + r['width'] for r in user_rects)
        max_y = max(r['y'] + r['height'] for r in user_rects)
        
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
        print(f"Created users cluster: x={users_cluster['x']:.1f}, y={users_cluster['y']:.1f}, w={users_cluster['width']:.1f}, h={users_cluster['height']:.1f}")
    
    # Second pass: identify groups (clusters)
    cluster_groups = []
    for group in all_groups:
        group_id = group.get('id', '')
        group_class = group.get('class', '')
        
        if 'cluster_' in group_id and group_class == 'cluster':
            # Find all rectangles in this cluster
            rectangles = group.findall('.//svg:rect', ns)
            valid_rects = []
            
            for rect in rectangles:
                x = float(rect.get('x', 0))
                y = float(rect.get('y', 0))
                width = float(rect.get('width', 0))
                height = float(rect.get('height', 0))
                area = width * height
                
                # Filter for meaningful components
                if 50000 < area < 500000:  # Group component size range
                    valid_rects.append({
                        'x': x, 'y': y, 'width': width, 'height': height,
                        'area': area
                    })
            
            if len(valid_rects) > 1:  # Group should have multiple components
                min_x = min(r['x'] for r in valid_rects)
                min_y = min(r['y'] for r in valid_rects)
                max_x = max(r['x'] + r['width'] for r in valid_rects)
                max_y = max(r['y'] + r['height'] for r in valid_rects)
                
                group_name = group_id.replace('cluster_', '').replace('_', ' ').title()
                group_component = {
                    'id': group_id,
                    'x': min_x - 40,
                    'y': min_y - 40,
                    'width': max_x - min_x + 80,
                    'height': max_y - min_y + 80,
                    'text': f"{group_name} Group",
                    'type': 'group',
                    'component_count': len(valid_rects)
                }
                cluster_groups.append(group_component)
                print(f"Created group: {group_name} - x={group_component['x']:.1f}, y={group_component['y']:.1f}, w={group_component['width']:.1f}, h={group_component['height']:.1f}")
    
    # Sort groups by position and take first 8
    cluster_groups.sort(key=lambda g: g['y'])
    components['groups'] = cluster_groups[:8]
    
    # Third pass: identify individual components (entities)
    for group in all_groups:
        group_id = group.get('id', '')
        group_class = group.get('class', '')
        
        if group_class == 'entity' and 'entity_' in group_id:
            # Extract text content
            text_elements = group.findall('.//svg:text', ns)
            text_content = []
            for text_elem in text_elements:
                if text_elem.text and text_elem.text.strip():
                    text_content.append(text_elem.text.strip())
            
            # Find rectangles (individual components)
            rectangles = group.findall('.//svg:rect', ns)
            
            for rect in rectangles:
                x = float(rect.get('x', 0))
                y = float(rect.get('y', 0))
                width = float(rect.get('width', 0))
                height = float(rect.get('height', 0))
                area = width * height
                
                # Filter for meaningful individual components
                if 50000 < area < 500000:  # Individual component size range
                    rect_key = f"{x}_{y}_{width}_{height}"
                    if rect_key not in processed_rects:
                        component_text = ' '.join(text_content) if text_content else f"Component {len(components['individual_shapes']) + 1}"
                        
                        # Clean up text
                        component_text = re.sub(r'«[^»]*»', '', component_text).strip()
                        component_text = re.sub(r'\s+', ' ', component_text)
                        
                        individual_component = {
                            'id': group_id,
                            'x': x,
                            'y': y,
                            'width': width,
                            'height': height,
                            'text': component_text,
                            'type': 'rectangle',
                            'area': area,
                            'group_id': group_id
                        }
                        components['individual_shapes'].append(individual_component)
                        processed_rects.add(rect_key)
                        print(f"  Added individual: {component_text} - x={x:.1f}, y={y:.1f}, w={width:.1f}, h={height:.1f}")
    
    # Sort individual shapes by position
    components['individual_shapes'].sort(key=lambda s: s['y'])
    
    return components

def main():
    """Main function to extract and save components"""
    svg_file = "public/assets/diagrams/SmartCity_C4_Diagram.svg"
    
    print("Extracting FINAL Smart City C4 diagram coordinates...")
    components = extract_final_smartcity_coordinates(svg_file)
    
    # Print summary
    print(f"\nExtraction Summary:")
    print(f"- Individual Shapes: {len(components['individual_shapes'])}")
    print(f"- Groups: {len(components['groups'])}")
    print(f"- Users: {len(components['users'])}")
    print(f"- Total Components: {len(components['individual_shapes']) + len(components['groups']) + len(components['users'])}")
    
    # Save to JSON
    output_file = "smartcity_final_coordinates.json"
    with open(output_file, 'w') as f:
        json.dump(components, f, indent=2)
    
    print(f"\nComponents saved to: {output_file}")
    
    # Print sample components with real coordinates
    print(f"\nFirst 10 Individual Shapes (with real coordinates):")
    for i, shape in enumerate(components['individual_shapes'][:10]):
        print(f"  {i+1}. {shape['text']} - x:{shape['x']:.1f}, y:{shape['y']:.1f}, w:{shape['width']:.1f}, h:{shape['height']:.1f}")
    
    print(f"\nGroups (with real coordinates):")
    for i, group in enumerate(components['groups']):
        print(f"  {i+1}. {group['text']} - x:{group['x']:.1f}, y:{group['y']:.1f}, w:{group['width']:.1f}, h:{group['height']:.1f}")
    
    print(f"\nUsers (with real coordinates):")
    for i, user in enumerate(components['users']):
        print(f"  {i+1}. {user['text']} - x:{user['x']:.1f}, y:{user['y']:.1f}, w:{user['width']:.1f}, h:{user['height']:.1f}")

if __name__ == "__main__":
    main()
