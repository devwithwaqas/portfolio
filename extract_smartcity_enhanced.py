#!/usr/bin/env python3
"""
Enhanced Smart City C4 Diagram Component Extraction
Better detection of groups, users, and individual components
"""

import xml.etree.ElementTree as ET
import json
import re
from typing import List, Dict, Any

def extract_smartcity_components_enhanced(svg_file: str) -> Dict[str, Any]:
    """Enhanced extraction of all components from Smart City C4 diagram"""
    
    # Parse SVG
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    # Define namespace
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    components = {
        'individual_shapes': [],
        'groups': [],
        'users': [],
        'viewbox': root.get('viewBox', '0 0 20293 12756')
    }
    
    # Extract viewBox dimensions
    viewbox_parts = components['viewbox'].split()
    if len(viewbox_parts) == 4:
        components['width'] = float(viewbox_parts[2])
        components['height'] = float(viewbox_parts[3])
    
    # Find all groups
    all_groups = root.findall('.//svg:g', ns)
    
    # Track processed components to avoid duplicates
    processed_rects = set()
    
    for group in all_groups:
        group_id = group.get('id', '')
        group_class = group.get('class', '')
        
        if not group_id:
            continue
        
        # Extract text content from this group
        text_elements = group.findall('.//svg:text', ns)
        text_content = []
        for text_elem in text_elements:
            if text_elem.text and text_elem.text.strip():
                text_content.append(text_elem.text.strip())
        
        # Check if this is a package/group container
        is_package = ('package' in group_class.lower() or 
                     'group' in group_class.lower() or
                     'layer' in group_class.lower() or
                     'container' in group_class.lower())
        
        # Check if this is a users/actors section
        is_users = ('person' in group_class.lower() or 
                   'actor' in group_class.lower() or 
                   'user' in group_class.lower() or
                   'municipal_staff' in group_id.lower() or
                   'citizen' in group_id.lower() or
                   'admin' in group_id.lower() or
                   'analyst' in group_id.lower())
        
        # Find rectangles in this group
        rectangles = group.findall('.//svg:rect', ns)
        valid_rects = []
        
        for rect in rectangles:
            x = float(rect.get('x', 0))
            y = float(rect.get('y', 0))
            width = float(rect.get('width', 0))
            height = float(rect.get('height', 0))
            
            # Only include meaningful rectangles
            if width > 50 and height > 20:
                rect_key = f"{x}_{y}_{width}_{height}"
                if rect_key not in processed_rects:
                    valid_rects.append({
                        'x': x, 'y': y, 'width': width, 'height': height,
                        'rect': rect
                    })
                    processed_rects.add(rect_key)
        
        # Find ellipses (databases, external systems)
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
            
            if width > 50 and height > 20:
                rect_key = f"{x}_{y}_{width}_{height}"
                if rect_key not in processed_rects:
                    valid_rects.append({
                        'x': x, 'y': y, 'width': width, 'height': height,
                        'rect': ellipse, 'type': 'ellipse'
                    })
                    processed_rects.add(rect_key)
        
        # Process based on group type
        if is_users and valid_rects:
            # This is a users section
            for i, rect_data in enumerate(valid_rects):
                user_component = {
                    'id': f"user_{len(components['users']) + 1}",
                    'x': rect_data['x'],
                    'y': rect_data['y'],
                    'width': rect_data['width'],
                    'height': rect_data['height'],
                    'text': f"User {len(components['users']) + 1}",
                    'type': 'user',
                    'group_id': group_id
                }
                components['users'].append(user_component)
        
        elif is_package and len(valid_rects) > 1:
            # This is a package/group with multiple components
            min_x = min(r['x'] for r in valid_rects)
            min_y = min(r['y'] for r in valid_rects)
            max_x = max(r['x'] + r['width'] for r in valid_rects)
            max_y = max(r['y'] + r['height'] for r in valid_rects)
            
            group_component = {
                'id': group_id,
                'x': min_x - 30,  # Add padding
                'y': min_y - 30,
                'width': max_x - min_x + 60,
                'height': max_y - min_y + 60,
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
                
                # Clean up text (remove PlantUML artifacts)
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
                    'group_id': group_id
                }
                components['individual_shapes'].append(individual_component)
    
    return components

def main():
    """Main function to extract and save components"""
    svg_file = "public/assets/diagrams/SmartCity_C4_Diagram.svg"
    
    print("Enhanced extraction of Smart City C4 diagram components...")
    components = extract_smartcity_components_enhanced(svg_file)
    
    # Print summary
    print(f"\nExtraction Summary:")
    print(f"- Individual Shapes: {len(components['individual_shapes'])}")
    print(f"- Groups: {len(components['groups'])}")
    print(f"- Users: {len(components['users'])}")
    print(f"- Total Components: {len(components['individual_shapes']) + len(components['groups']) + len(components['users'])}")
    
    # Save to JSON
    output_file = "smartcity_enhanced_components.json"
    with open(output_file, 'w') as f:
        json.dump(components, f, indent=2)
    
    print(f"\nComponents saved to: {output_file}")
    
    # Print sample components
    print(f"\nFirst 5 Individual Shapes:")
    for i, shape in enumerate(components['individual_shapes'][:5]):
        print(f"  {i+1}. {shape['text']} ({shape['type']}) - {shape['width']:.1f}x{shape['height']:.1f}")
    
    print(f"\nGroups:")
    for i, group in enumerate(components['groups']):
        print(f"  {i+1}. {group['text']} - {group['component_count']} components")
    
    print(f"\nUsers:")
    for i, user in enumerate(components['users']):
        print(f"  {i+1}. {user['text']} - {user['width']:.1f}x{user['height']:.1f}")

if __name__ == "__main__":
    main()
