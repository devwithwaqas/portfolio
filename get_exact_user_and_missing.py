#!/usr/bin/env python3
"""
Get exact coordinates for users and the missing Admin Dashboard
"""

import xml.etree.ElementTree as ET
import re

def get_exact_coordinates():
    svg_file = 'public/assets/diagrams/SmartCity_C4_Diagram.svg'
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    results = {
        'users': [],
        'admin_dashboard': None
    }
    
    # Find all groups
    for group in root.findall('.//svg:g', ns):
        group_id = group.get('id', '')
        group_class = group.get('class', '')
        
        # Extract text
        text_elements = group.findall('.//svg:text', ns)
        text_content = []
        for text in text_elements:
            if text.text and text.text.strip():
                text_content.append(text.text.strip())
        
        full_text = ' '.join(text_content) if text_content else ''
        
        # Find rectangles
        rects = group.findall('.//svg:rect', ns)
        
        for rect in rects:
            x = float(rect.get('x', 0))
            y = float(rect.get('y', 0))
            width = float(rect.get('width', 0))
            height = float(rect.get('height', 0))
            
            if width > 0 and height > 0 and 1000 < (width * height) < 500000:
                # Check if user/actor
                if ('municipal_staff' in group_id.lower() or 
                    'municipal staff' in full_text.lower()):
                    results['users'].append({
                        'name': 'Municipal Staff',
                        'id': group_id,
                        'x': x, 'y': y, 'width': width, 'height': height,
                        'text': 'Municipal Staff City council employees'
                    })
                elif ('citizen' in group_id.lower() and 'person' in full_text.lower()):
                    results['users'].append({
                        'name': 'Citizen',
                        'id': group_id,
                        'x': x, 'y': y, 'width': width, 'height': height,
                        'text': 'Citizen City residents and visitors'
                    })
                elif ('admin' in group_id.lower() and 'administrator' in full_text.lower()):
                    results['users'].append({
                        'name': 'System Administrator',
                        'id': group_id,
                        'x': x, 'y': y, 'width': width, 'height': height,
                        'text': 'System Administrator Manages smart city platform'
                    })
                elif ('analyst' in group_id.lower() and 'analyst' in full_text.lower()):
                    results['users'].append({
                        'name': 'City Analyst',
                        'id': group_id,
                        'x': x, 'y': y, 'width': width, 'height': height,
                        'text': 'City Analyst Views city analytics'
                    })
                # Check for Admin Dashboard
                elif ('admin_dashboard' in group_id.lower() or 
                      'admin dashboard' in full_text.lower()):
                    if 'javascript' in full_text.lower() or 'system administration' in full_text.lower():
                        results['admin_dashboard'] = {
                            'name': 'Admin Dashboard',
                            'id': group_id,
                            'x': x, 'y': y, 'width': width, 'height': height,
                            'text': 'Admin Dashboard [JavaScript] System administration'
                        }
    
    print("=== USER/ACTOR COMPONENTS ===")
    for user in results['users']:
        print(f"{user['name']}:")
        print(f"  x={user['x']:.2f}, y={user['y']:.2f}, w={user['width']:.2f}, h={user['height']:.2f}")
        print(f"  Text: {user['text']}")
        print()
    
    print("=== ADMIN DASHBOARD (Missing Component 39) ===")
    if results['admin_dashboard']:
        ad = results['admin_dashboard']
        print(f"Admin Dashboard:")
        print(f"  x={ad['x']:.2f}, y={ad['y']:.2f}, w={ad['width']:.2f}, h={ad['height']:.2f}")
        print(f"  Text: {ad['text']}")
    else:
        print("NOT FOUND - need to search differently")
    
    return results

if __name__ == '__main__':
    get_exact_coordinates()



