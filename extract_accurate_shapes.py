#!/usr/bin/env python3
"""
Extract BAT diagram shapes with area square root between 350-550
This will give us the individual components (rectangles and databases)
"""

import xml.etree.ElementTree as ET
import math
import json

def calculate_area_square_root(width, height):
    """Calculate square root of area"""
    area = width * height
    return math.sqrt(area)

def extract_shapes_from_svg(svg_file):
    """Extract shapes with area square root between 350-550"""
    
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    # Define namespace
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    shapes = []
    
    # Find all rectangles
    rectangles = root.findall('.//svg:rect', ns)
    for rect in rectangles:
        try:
            x = float(rect.get('x', 0))
            y = float(rect.get('y', 0))
            width = float(rect.get('width', 0))
            height = float(rect.get('height', 0))
            
            area_sqrt = calculate_area_square_root(width, height)
            
            # Filter for area square root between 350-550
            if 350 <= area_sqrt <= 550:
                # Get text content
                text_content = ""
                text_elements = rect.findall('.//svg:text', ns)
                for text_elem in text_elements:
                    if text_elem.text:
                        text_content += text_elem.text.strip() + " "
                
                # Also check for text in tspan elements
                tspan_elements = rect.findall('.//svg:tspan', ns)
                for tspan in tspan_elements:
                    if tspan.text:
                        text_content += tspan.text.strip() + " "
                
                text_content = text_content.strip()
                
                shape_info = {
                    'type': 'rectangle',
                    'x': x,
                    'y': y,
                    'width': width,
                    'height': height,
                    'area_sqrt': round(area_sqrt, 2),
                    'text': text_content,
                    'id': rect.get('id', ''),
                    'class': rect.get('class', '')
                }
                shapes.append(shape_info)
                
        except (ValueError, TypeError) as e:
            continue
    
    # Find all ellipses (databases)
    ellipses = root.findall('.//svg:ellipse', ns)
    for ellipse in ellipses:
        try:
            cx = float(ellipse.get('cx', 0))
            cy = float(ellipse.get('cy', 0))
            rx = float(ellipse.get('rx', 0))
            ry = float(ellipse.get('ry', 0))
            
            # For ellipse, use diameter as width/height
            width = rx * 2
            height = ry * 2
            area_sqrt = calculate_area_square_root(width, height)
            
            # Filter for area square root between 350-550
            if 350 <= area_sqrt <= 550:
                # Get text content
                text_content = ""
                text_elements = ellipse.findall('.//svg:text', ns)
                for text_elem in text_elements:
                    if text_elem.text:
                        text_content += text_elem.text.strip() + " "
                
                tspan_elements = ellipse.findall('.//svg:tspan', ns)
                for tspan in tspan_elements:
                    if tspan.text:
                        text_content += tspan.text.strip() + " "
                
                text_content = text_content.strip()
                
                shape_info = {
                    'type': 'ellipse',
                    'x': cx - rx,  # Convert center to top-left
                    'y': cy - ry,
                    'width': width,
                    'height': height,
                    'area_sqrt': round(area_sqrt, 2),
                    'text': text_content,
                    'id': ellipse.get('id', ''),
                    'class': ellipse.get('class', '')
                }
                shapes.append(shape_info)
                
        except (ValueError, TypeError) as e:
            continue
    
    # Sort by area_sqrt for consistent ordering
    shapes.sort(key=lambda x: x['area_sqrt'])
    
    return shapes

def main():
    svg_file = 'public/assets/img/heat-exchanger-diagram.svg'
    
    print("Extracting shapes with area square root between 350-550...")
    shapes = extract_shapes_from_svg(svg_file)
    
    print(f"\nFound {len(shapes)} shapes:")
    print("=" * 80)
    
    for i, shape in enumerate(shapes, 1):
        print(f"{i:2d}. {shape['type'].upper():10} | Area√: {shape['area_sqrt']:6.1f} | "
              f"Size: {shape['width']:4.0f}x{shape['height']:4.0f} | "
              f"Pos: ({shape['x']:4.0f},{shape['y']:4.0f}) | "
              f"Text: '{shape['text'][:30]}{'...' if len(shape['text']) > 30 else ''}'")
    
    # Save to JSON for HTML file
    output_data = {
        'shapes': shapes,
        'total_count': len(shapes),
        'filter_criteria': 'area_sqrt between 350-550'
    }
    
    with open('accurate_shapes_data.json', 'w') as f:
        json.dump(output_data, f, indent=2)
    
    print(f"\nData saved to accurate_shapes_data.json")
    print(f"Ready to update HTML file with {len(shapes)} shapes")

if __name__ == "__main__":
    main()
