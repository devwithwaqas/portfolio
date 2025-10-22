import re

# Parse the SVG file using regex
svg_file = 'public/assets/img/heat-exchanger-diagram.svg'

try:
    with open(svg_file, 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    print("=" * 80)
    print("ENTITY COORDINATES FROM SVG")
    print("=" * 80)
    
    entity_data = []
    
    # Find all entity groups using regex
    for entity_match in re.finditer(r'<!--entity\s+(\w+)--><g\s+class="entity"\s+data-entity="(\w+)"[^>]*>(.*?)(?=<!--(?:entity|link|SRC))', svg_content, re.DOTALL):
        entity_id = entity_match.group(1)
        entity_content = entity_match.group(3)
        
        # Extract polygon points or path d attribute
        polygon_match = re.search(r'<polygon[^>]*points="([^"]+)"', entity_content)
        path_match = re.search(r'<path[^>]*d="([^"]+)"', entity_content)
        
        if polygon_match:
            points_str = polygon_match.group(1)
            # Parse points to get bounding box
            points = [float(x) for x in re.findall(r'[\d.]+', points_str)]
            xs = [points[i] for i in range(0, len(points), 2)]
            ys = [points[i] for i in range(1, len(points), 2)]
            
            x = min(xs)
            y = min(ys)
            width = max(xs) - min(xs)
            height = max(ys) - min(ys)
            
        elif path_match:
            # For cloud shapes (like OpenShift), parse the path
            d = path_match.group(1)
            # Extract all numbers from the path (filter out very small numbers that might be offsets)
            numbers = [float(x) for x in re.findall(r'[\d.]+', d)]
            if len(numbers) >= 4:
                # Get coordinate pairs
                coords = []
                i = 0
                while i < len(numbers) - 1:
                    coords.append((numbers[i], numbers[i+1]))
                    i += 2
                
                xs = [c[0] for c in coords]
                ys = [c[1] for c in coords]
                
                x = min(xs)
                y = min(ys)
                width = max(xs) - min(xs)
                height = max(ys) - min(ys)
            else:
                continue
        else:
            continue
        
        # Find text label (first non-italic, non-stereotype text)
        text_matches = re.findall(r'<text[^>]*>([^<]+)</text>', entity_content)
        label = ""
        for text in text_matches:
            # Skip stereotypes (text with guillemets) and empty text
            if '&#171;' not in text and '&#187;' not in text and '«' not in text and '»' not in text and text.strip():
                label = text.strip()
                break
        
        entity_data.append({
            'id': entity_id,
            'label': label,
            'x': round(x),
            'y': round(y),
            'width': round(width),
            'height': round(height)
        })
    
    # Sort by ID
    entity_data.sort(key=lambda e: e['id'])
    
    # Print results
    for e in entity_data:
        print(f"\n{e['id']:15} | {e['label'][:40]:40}")
        print(f"                | x={e['x']}, y={e['y']}, width={e['width']}, height={e['height']}")
        print(f"                | {{ x: {e['x']}, y: {e['y']}, width: {e['width']}, height: {e['height']} }}")
    
    print("\n" + "=" * 80)
    print(f"Total entities found: {len(entity_data)}")
    print("=" * 80)
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
