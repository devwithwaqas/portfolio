#!/usr/bin/env python3
"""
Find exact coordinates for the 4 database components
"""

import xml.etree.ElementTree as ET

def find_databases():
    svg_file = 'public/assets/diagrams/SmartCity_C4_Diagram.svg'
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    databases = []
    
    # Find all groups
    for group in root.findall('.//svg:g', ns):
        group_id = group.get('id', '')
        
        # Extract text
        text_elements = group.findall('.//svg:text', ns)
        text_content = []
        for text in text_elements:
            if text.text and text.text.strip():
                text_content.append(text.text.strip())
        
        full_text = ' '.join(text_content) if text_content else ''
        
        # Find rectangles, ellipses, and polygons (databases can be any shape)
        rects = group.findall('.//svg:rect', ns)
        ellipses = group.findall('.//svg:ellipse', ns)
        polygons = group.findall('.//svg:polygon', ns)
        
        # Check for database components by ID or text
        is_database = (
            'sql_database' in group_id.lower() or
            'postgis_db' in group_id.lower() or
            'postgis' in group_id.lower() or
            'redis_cache' in group_id.lower() or
            'redis' in group_id.lower() and 'cache' in group_id.lower() or
            'data_lake' in group_id.lower() or
            ('sql server' in full_text.lower() and 'municipal' in full_text.lower()) or
            ('postgis' in full_text.lower() and 'spatial' in full_text.lower()) or
            ('redis' in full_text.lower() and 'cache' in full_text.lower()) or
            ('data lake' in full_text.lower() and 'analytics' in full_text.lower())
        )
        
        if is_database:
            # Process rectangles
            for rect in rects:
                x = float(rect.get('x', 0))
                y = float(rect.get('y', 0))
                width = float(rect.get('width', 0))
                height = float(rect.get('height', 0))
                
                if width > 0 and height > 0 and 1000 < (width * height) < 500000:
                    databases.append({
                        'id': group_id,
                        'x': x, 'y': y, 'width': width, 'height': height,
                        'text': full_text,
                        'type': 'rectangle'
                    })
            
            # Process ellipses (database cylinders)
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
                        databases.append({
                            'id': group_id,
                            'x': x, 'y': y, 'width': width, 'height': height,
                            'text': full_text,
                            'type': 'ellipse'
                        })
            
            # Process polygons (database cylinders/polygons)
            for polygon in polygons:
                points = polygon.get('points', '')
                if points:
                    coords = points.split()
                    if len(coords) >= 6:
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
                            databases.append({
                                'id': group_id,
                                'x': min_x, 'y': min_y, 'width': width, 'height': height,
                                'text': full_text,
                                'type': 'polygon'
                            })
    
    print("=== DATABASE COMPONENTS ===")
    for i, db in enumerate(databases, 1):
        print(f"{i}. {db['text']}")
        print(f"   ID: {db['id']}")
        print(f"   x={db['x']:.2f}, y={db['y']:.2f}, w={db['width']:.2f}, h={db['height']:.2f}")
        print(f"   Type: {db['type']}")
        print()
    
    return databases

if __name__ == '__main__':
    find_databases()



