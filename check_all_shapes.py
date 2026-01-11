#!/usr/bin/env python3
"""
Check all shapes in the SVG to find the right range for individual components
"""

import xml.etree.ElementTree as ET
import math

def calculate_area_square_root(width, height):
    """Calculate square root of area"""
    area = width * height
    return math.sqrt(area)

def analyze_all_shapes(svg_file):
    """Analyze all shapes to find the right range"""
    
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    all_shapes = []
    
    # Find all rectangles
    rectangles = root.findall('.//svg:rect', ns)
    for rect in rectangles:
        try:
            x = float(rect.get('x', 0))
            y = float(rect.get('y', 0))
            width = float(rect.get('width', 0))
            height = float(rect.get('height', 0))
            
            if width > 0 and height > 0:  # Valid dimensions
                area_sqrt = calculate_area_square_root(width, height)
                
                # Get text content
                text_content = ""
                text_elements = rect.findall('.//svg:text', ns)
                for text_elem in text_elements:
                    if text_elem.text:
                        text_content += text_elem.text.strip() + " "
                
                tspan_elements = rect.findall('.//svg:tspan', ns)
                for tspan in tspan_elements:
                    if tspan.text:
                        text_content += tspan.text.strip() + " "
                
                text_content = text_content.strip()
                
                all_shapes.append({
                    'type': 'rectangle',
                    'x': x, 'y': y, 'width': width, 'height': height,
                    'area_sqrt': area_sqrt,
                    'text': text_content,
                    'id': rect.get('id', ''),
                    'class': rect.get('class', '')
                })
                
        except (ValueError, TypeError):
            continue
    
    # Find all ellipses
    ellipses = root.findall('.//svg:ellipse', ns)
    for ellipse in ellipses:
        try:
            cx = float(ellipse.get('cx', 0))
            cy = float(ellipse.get('cy', 0))
            rx = float(ellipse.get('rx', 0))
            ry = float(ellipse.get('ry', 0))
            
            if rx > 0 and ry > 0:
                width = rx * 2
                height = ry * 2
                area_sqrt = calculate_area_square_root(width, height)
                
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
                
                all_shapes.append({
                    'type': 'ellipse',
                    'x': cx - rx, 'y': cy - ry, 'width': width, 'height': height,
                    'area_sqrt': area_sqrt,
                    'text': text_content,
                    'id': ellipse.get('id', ''),
                    'class': ellipse.get('class', '')
                })
                
        except (ValueError, TypeError):
            continue
    
    # Sort by area_sqrt
    all_shapes.sort(key=lambda x: x['area_sqrt'])
    
    return all_shapes

def main():
    svg_file = 'public/assets/img/heat-exchanger-diagram.svg'
    
    print("Analyzing all shapes in the SVG...")
    shapes = analyze_all_shapes(svg_file)
    
    print(f"\nFound {len(shapes)} total shapes:")
    print("=" * 100)
    
    # Group by area ranges
    ranges = {
        'tiny': [],
        'small': [],
        'medium': [],
        'large': [],
        'huge': []
    }
    
    for shape in shapes:
        area_sqrt = shape['area_sqrt']
        if area_sqrt < 100:
            ranges['tiny'].append(shape)
        elif area_sqrt < 300:
            ranges['small'].append(shape)
        elif area_sqrt < 600:
            ranges['medium'].append(shape)
        elif area_sqrt < 1000:
            ranges['large'].append(shape)
        else:
            ranges['huge'].append(shape)
    
    for range_name, range_shapes in ranges.items():
        if range_shapes:
            print(f"\n{range_name.upper()} shapes (area√ < {[100, 300, 600, 1000, float('inf')][['tiny', 'small', 'medium', 'large', 'huge'].index(range_name)]}): {len(range_shapes)}")
            for shape in range_shapes[:5]:  # Show first 5
                print(f"  {shape['type']:8} | Area√: {shape['area_sqrt']:6.1f} | "
                      f"Size: {shape['width']:4.0f}x{shape['height']:4.0f} | "
                      f"Text: '{shape['text'][:40]}{'...' if len(shape['text']) > 40 else ''}'")
            if len(range_shapes) > 5:
                print(f"  ... and {len(range_shapes) - 5} more")
    
    # Show individual components (likely in medium range)
    print(f"\n" + "="*100)
    print("INDIVIDUAL COMPONENTS (likely in medium range):")
    print("="*100)
    
    for shape in shapes:
        if 200 <= shape['area_sqrt'] <= 800 and shape['text']:  # Has text and reasonable size
            print(f"{shape['type'].upper():8} | Area√: {shape['area_sqrt']:6.1f} | "
                  f"Size: {shape['width']:4.0f}x{shape['height']:4.0f} | "
                  f"Pos: ({shape['x']:4.0f},{shape['y']:4.0f}) | "
                  f"Text: '{shape['text']}'")

if __name__ == "__main__":
    main()
