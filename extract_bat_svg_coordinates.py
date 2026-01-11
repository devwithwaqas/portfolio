"""
EXTRACT BAT SVG COORDINATES
Extract exact coordinates from the BAT SVG file and create a JSON mapping
"""

import xml.etree.ElementTree as ET
import json
import re

def extract_svg_coordinates(svg_file_path):
    """Extract all coordinates from the BAT SVG file"""
    
    print("EXTRACTING BAT SVG COORDINATES")
    print("=" * 80)
    
    # Parse the SVG file
    tree = ET.parse(svg_file_path)
    root = tree.getroot()
    
    # Define namespace
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    # Extract viewBox
    viewbox = root.get('viewBox', '0 0 27681 11856')
    print(f"SVG ViewBox: {viewbox}")
    
    # Find all rectangles
    rectangles = root.findall('.//svg:rect', ns)
    print(f"Found {len(rectangles)} rectangles")
    
    # Find all ellipses (databases)
    ellipses = root.findall('.//svg:ellipse', ns)
    print(f"Found {len(ellipses)} ellipses (databases)")
    
    # Find all paths (groups)
    paths = root.findall('.//svg:path', ns)
    print(f"Found {len(paths)} paths (groups)")
    
    # Find all text elements
    texts = root.findall('.//svg:text', ns)
    print(f"Found {len(texts)} text elements")
    
    # Extract coordinates for each type
    coordinates = {
        'viewBox': viewbox,
        'rectangles': [],
        'ellipses': [],
        'paths': [],
        'texts': []
    }
    
    # Process rectangles
    for i, rect in enumerate(rectangles):
        x = float(rect.get('x', 0))
        y = float(rect.get('y', 0))
        width = float(rect.get('width', 0))
        height = float(rect.get('height', 0))
        
        # Get text content if any
        text_content = ""
        for text in rect.findall('.//svg:text', ns):
            if text.text:
                text_content += text.text.strip() + " "
        
        coordinates['rectangles'].append({
            'id': f'rect_{i}',
            'x': x,
            'y': y,
            'width': width,
            'height': height,
            'text': text_content.strip()
        })
    
    # Process ellipses (databases)
    for i, ellipse in enumerate(ellipses):
        cx = float(ellipse.get('cx', 0))
        cy = float(ellipse.get('cy', 0))
        rx = float(ellipse.get('rx', 0))
        ry = float(ellipse.get('ry', 0))
        
        # Convert ellipse to rectangle coordinates
        x = cx - rx
        y = cy - ry
        width = rx * 2
        height = ry * 2
        
        # Get text content if any
        text_content = ""
        for text in ellipse.findall('.//svg:text', ns):
            if text.text:
                text_content += text.text.strip() + " "
        
        coordinates['ellipses'].append({
            'id': f'ellipse_{i}',
            'x': x,
            'y': y,
            'width': width,
            'height': height,
            'text': text_content.strip()
        })
    
    # Process paths (groups)
    for i, path in enumerate(paths):
        d = path.get('d', '')
        
        # Extract bounding box from path
        if d:
            # Simple bounding box calculation for paths
            numbers = re.findall(r'-?\d+\.?\d*', d)
            if numbers:
                coords = [float(n) for n in numbers]
                if len(coords) >= 4:
                    x = min(coords[::2])  # min x
                    y = min(coords[1::2])  # min y
                    width = max(coords[::2]) - x  # max x - min x
                    height = max(coords[1::2]) - y  # max y - min y
                else:
                    x, y, width, height = 0, 0, 0, 0
            else:
                x, y, width, height = 0, 0, 0, 0
        else:
            x, y, width, height = 0, 0, 0, 0
        
        # Get text content if any
        text_content = ""
        for text in path.findall('.//svg:text', ns):
            if text.text:
                text_content += text.text.strip() + " "
        
        coordinates['paths'].append({
            'id': f'path_{i}',
            'x': x,
            'y': y,
            'width': width,
            'height': height,
            'text': text_content.strip()
        })
    
    # Process text elements
    for i, text in enumerate(texts):
        x = float(text.get('x', 0))
        y = float(text.get('y', 0))
        text_content = text.text.strip() if text.text else ""
        
        coordinates['texts'].append({
            'id': f'text_{i}',
            'x': x,
            'y': y,
            'width': 0,
            'height': 0,
            'text': text_content
        })
    
    return coordinates

def main():
    """Main function to extract coordinates and save to JSON"""
    
    svg_file_path = 'public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg'
    
    try:
        # Extract coordinates
        coordinates = extract_svg_coordinates(svg_file_path)
        
        # Save to JSON file
        output_file = 'bat_svg_coordinates.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(coordinates, f, indent=2, ensure_ascii=False)
        
        print(f"\nCOORDINATES EXTRACTED AND SAVED TO: {output_file}")
        print("=" * 80)
        
        # Print summary
        print(f"Total rectangles: {len(coordinates['rectangles'])}")
        print(f"Total ellipses (databases): {len(coordinates['ellipses'])}")
        print(f"Total paths (groups): {len(coordinates['paths'])}")
        print(f"Total text elements: {len(coordinates['texts'])}")
        
        # Print first few rectangles for verification
        print("\nFirst 5 rectangles:")
        for i, rect in enumerate(coordinates['rectangles'][:5]):
            print(f"  {i+1}. x={rect['x']}, y={rect['y']}, width={rect['width']}, height={rect['height']} - {rect['text']}")
        
        # Print first few ellipses for verification
        print("\nFirst 5 ellipses (databases):")
        for i, ellipse in enumerate(coordinates['ellipses'][:5]):
            print(f"  {i+1}. x={ellipse['x']}, y={ellipse['y']}, width={ellipse['width']}, height={ellipse['height']} - {ellipse['text']}")
        
        # Print first few paths for verification
        print("\nFirst 5 paths (groups):")
        for i, path in enumerate(coordinates['paths'][:5]):
            print(f"  {i+1}. x={path['x']}, y={path['y']}, width={path['width']}, height={path['height']} - {path['text']}")
        
    except FileNotFoundError:
        print(f"ERROR: SVG file not found at {svg_file_path}")
        print("Please make sure the BAT SVG file exists in the correct location.")
    except Exception as e:
        print(f"ERROR: {str(e)}")

if __name__ == "__main__":
    main()
