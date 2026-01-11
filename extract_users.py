#!/usr/bin/env python3
"""
Extract user/actor component coordinates from SmartCity_C4_Diagram.svg
"""

import re
import json

def extract_user_coordinates():
    """Extract coordinates for 4 user components"""
    
    svg_file = 'public/assets/diagrams/SmartCity_C4_Diagram.svg'
    with open(svg_file, 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    # User IDs from PlantUML
    users = ['municipal_staff', 'citizen', 'admin', 'analyst']
    user_names = {
        'municipal_staff': 'Municipal Staff',
        'citizen': 'Citizen',
        'admin': 'System Administrator',
        'analyst': 'City Analyst'
    }
    
    results = []
    
    for user_id, user_name in zip(users, user_names.values()):
        # Find the group element for this user
        pattern = rf'<g[^>]*data-entity-1="{user_id}"[^>]*>|<g[^>]*id="entity_{user_id}"[^>]*>|<g[^>]*class="actor"[^>]*data-entity-1="{user_id}"[^>]*>'
        match = re.search(pattern, svg_content)
        
        if match:
            # Find the rect element within this group
            start_pos = match.end()
            # Look for rect within the next 5000 characters
            group_section = svg_content[start_pos:start_pos+5000]
            
            # Try to find rect coordinates
            rect_match = re.search(r'<rect[^>]*x="([^"]*)"[^>]*y="([^"]*)"[^>]*width="([^"]*)"[^>]*height="([^"]*)"', group_section)
            
            if rect_match:
                x = float(rect_match.group(1))
                y = float(rect_match.group(2))
                width = float(rect_match.group(3))
                height = float(rect_match.group(4))
                
                results.append({
                    'id': user_id,
                    'name': user_name,
                    'x': x,
                    'y': y,
                    'width': width,
                    'height': height
                })
                print(f"Found {user_name}: x={x}, y={y}, w={width}, h={height}")
            else:
                print(f"Could not find rect for {user_name}")
        else:
            print(f"Could not find group for {user_id}")
    
    return results

if __name__ == '__main__':
    users = extract_user_coordinates()
    print(f"\nExtracted {len(users)} users")
    print(json.dumps(users, indent=2))

