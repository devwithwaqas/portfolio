#!/usr/bin/env python3
"""
Extract Smart City C4 Diagram Components
Similar to BAT extraction but for Smart City diagram
"""

import xml.etree.ElementTree as ET
import json
import re
from typing import List, Dict, Any

def extract_smartcity_components(svg_file: str) -> Dict[str, Any]:
    """Extract all components from Smart City C4 diagram"""
    
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
    
    # Find all groups (packages, entities, etc.)
    all_groups = root.findall('.//svg:g', ns)
    
    for group in all_groups:
        group_id = group.get('id', '')
        group_class = group.get('class', '')
        
        # Skip if no ID
        if not group_id:
            continue
            
        # Extract text content
        text_elements = group.findall('.//svg:text', ns)
        text_content = []
        for text_elem in text_elements:
            if text_elem.text and text_elem.text.strip():
                text_content.append(text_elem.text.strip())
        
        # Extract rectangles (individual components)
        rectangles = group.findall('.//svg:rect', ns)
        for rect in rectangles:
            x = float(rect.get('x', 0))
            y = float(rect.get('y', 0))
            width = float(rect.get('width', 0))
            height = float(rect.get('height', 0))
            
            # Only include meaningful rectangles (not too small)
            if width > 50 and height > 20:
                component = {
                    'id': f"{group_id}_{len(components['individual_shapes']) + 1}",
                    'x': x,
                    'y': y,
                    'width': width,
                    'height': height,
                    'text': ' '.join(text_content) if text_content else f"Component {len(components['individual_shapes']) + 1}",
                    'group_id': group_id,
                    'type': 'rectangle'
                }
                components['individual_shapes'].append(component)
        
        # Extract ellipses (databases, external systems)
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
                component = {
                    'id': f"{group_id}_ellipse_{len(components['individual_shapes']) + 1}",
                    'x': x,
                    'y': y,
                    'width': width,
                    'height': height,
                    'text': ' '.join(text_content) if text_content else f"Database {len(components['individual_shapes']) + 1}",
                    'group_id': group_id,
                    'type': 'ellipse'
                }
                components['individual_shapes'].append(component)
        
        # Check if this is a package/group (has multiple components)
        if 'package' in group_class.lower() or 'group' in group_class.lower():
            # Calculate group boundaries
            group_rects = group.findall('.//svg:rect', ns)
            if len(group_rects) > 1:  # Multiple components = group
                min_x = min(float(r.get('x', 0)) for r in group_rects)
                min_y = min(float(r.get('y', 0)) for r in group_rects)
                max_x = max(float(r.get('x', 0)) + float(r.get('width', 0)) for r in group_rects)
                max_y = max(float(r.get('y', 0)) + float(r.get('height', 0)) for r in group_rects)
                
                group_component = {
                    'id': group_id,
                    'x': min_x - 20,  # Add padding
                    'y': min_y - 20,
                    'width': max_x - min_x + 40,
                    'height': max_y - min_y + 40,
                    'text': ' '.join(text_content) if text_content else f"Group {len(components['groups']) + 1}",
                    'type': 'group',
                    'component_count': len(group_rects)
                }
                components['groups'].append(group_component)
        
        # Check if this is a users section (actors)
        if 'person' in group_class.lower() or 'actor' in group_class.lower() or 'user' in group_class.lower():
            # Find all person rectangles in this group
            person_rects = group.findall('.//svg:rect', ns)
            for i, rect in enumerate(person_rects):
                x = float(rect.get('x', 0))
                y = float(rect.get('y', 0))
                width = float(rect.get('width', 0))
                height = float(rect.get('height', 0))
                
                if width > 50 and height > 20:
                    user_component = {
                        'id': f"user_{i + 1}",
                        'x': x,
                        'y': y,
                        'width': width,
                        'height': height,
                        'text': f"User {i + 1}",
                        'type': 'user'
                    }
                    components['users'].append(user_component)
    
    return components

def main():
    """Main function to extract and save components"""
    svg_file = "public/assets/diagrams/SmartCity_C4_Diagram.svg"
    
    print("Extracting Smart City C4 diagram components...")
    components = extract_smartcity_components(svg_file)
    
    # Print summary
    print(f"\nExtraction Summary:")
    print(f"- Individual Shapes: {len(components['individual_shapes'])}")
    print(f"- Groups: {len(components['groups'])}")
    print(f"- Users: {len(components['users'])}")
    print(f"- Total Components: {len(components['individual_shapes']) + len(components['groups']) + len(components['users'])}")
    
    # Save to JSON
    output_file = "smartcity_components_data.json"
    with open(output_file, 'w') as f:
        json.dump(components, f, indent=2)
    
    print(f"\nComponents saved to: {output_file}")
    
    # Print first few components for verification
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
