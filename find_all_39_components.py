#!/usr/bin/env python3
"""
Find all 39 individual components including users/actors and the missing one
"""

import xml.etree.ElementTree as ET
import re
import json

def find_all_components():
    """Find all components including users/actors"""
    
    svg_file = 'public/assets/diagrams/SmartCity_C4_Diagram.svg'
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    # Find all groups with entity IDs
    all_entities = []
    
    for group in root.findall('.//svg:g', ns):
        group_id = group.get('id', '')
        group_class = group.get('class', '')
        
        # Find rectangles in this group
        rects = group.findall('.//svg:rect', ns)
        ellipses = group.findall('.//svg:ellipse', ns)
        polygons = group.findall('.//svg:polygon', ns)
        
        # Extract text
        text_elements = group.findall('.//svg:text', ns)
        text_content = []
        for text in text_elements:
            if text.text and text.text.strip():
                text_content.append(text.text.strip())
        
        full_text = ' '.join(text_content) if text_content else ''
        
        # Process rectangles
        for rect in rects:
            x = float(rect.get('x', 0))
            y = float(rect.get('y', 0))
            width = float(rect.get('width', 0))
            height = float(rect.get('height', 0))
            
            if width > 0 and height > 0:
                # Check if this looks like a component (not a label)
                area = width * height
                if 1000 < area < 500000:  # Reasonable component size
                    all_entities.append({
                        'id': group_id,
                        'x': x,
                        'y': y,
                        'width': width,
                        'height': height,
                        'text': full_text,
                        'type': 'rectangle',
                        'class': group_class
                    })
        
        # Process ellipses (databases)
        for ellipse in ellipses:
            cx = float(ellipse.get('cx', 0))
            cy = float(ellipse.get('cy', 0))
            rx = float(ellipse.get('rx', 0))
            ry = float(ellipse.get('ry', 0))
            
            if rx > 0 and ry > 0:
                x = cx - rx
                y = cy - ry
                width = rx * 2
                height = ry * 2
                area = width * height
                if 1000 < area < 500000:
                    all_entities.append({
                        'id': group_id,
                        'x': x,
                        'y': y,
                        'width': width,
                        'height': height,
                        'text': full_text,
                        'type': 'ellipse',
                        'class': group_class
                    })
    
    # Sort by y, then x for easier identification
    all_entities.sort(key=lambda e: (e['y'], e['x']))
    
    # Find user/actor components
    users = []
    for entity in all_entities:
        entity_id_lower = entity['id'].lower()
        text_lower = entity['text'].lower()
        
        if ('municipal_staff' in entity_id_lower or 'municipal staff' in text_lower or
            'citizen' in entity_id_lower and 'person' in text_lower or
            'admin' in entity_id_lower and 'administrator' in text_lower or
            'analyst' in entity_id_lower and 'analyst' in text_lower or
            'person' in entity['class'].lower() or
            'actor' in entity['class'].lower()):
            users.append(entity)
    
    print(f"Found {len(all_entities)} total entities")
    print(f"Found {len(users)} user/actor entities\n")
    
    print("=== USER/ACTOR COMPONENTS ===")
    for i, user in enumerate(users, 1):
        print(f"{i}. {user['text']}")
        print(f"   ID: {user['id']}")
        print(f"   x={user['x']:.2f}, y={user['y']:.2f}, w={user['width']:.2f}, h={user['height']:.2f}")
        print()
    
    # Load existing JSON to see what we have
    with open('smartcity_real_coordinates.json', 'r') as f:
        existing = json.load(f)
    
    existing_ids = {s['id'] for s in existing['individual_shapes']}
    
    print(f"\n=== MISSING COMPONENT CHECK ===")
    print(f"Existing JSON has {len(existing['individual_shapes'])} components")
    print(f"Found {len(all_entities)} entities in SVG")
    
    # Find entities not in existing JSON
    missing = []
    for entity in all_entities:
        if entity['id'] not in existing_ids:
            # Check if it's a valid component (not a label, not already processed)
            area = entity['width'] * entity['height']
            if 1000 < area < 500000:
                missing.append(entity)
    
    print(f"\n=== POTENTIALLY MISSING COMPONENTS ===")
    for i, entity in enumerate(missing[:10], 1):  # Show first 10
        print(f"{i}. {entity['text']}")
        print(f"   ID: {entity['id']}")
        print(f"   x={entity['x']:.2f}, y={entity['y']:.2f}, w={entity['width']:.2f}, h={entity['height']:.2f}")
        print()
    
    return users, missing

if __name__ == '__main__':
    users, missing = find_all_components()

