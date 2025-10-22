import re

# Parse the SVG file to get actual entity coordinates
svg_file = 'public/assets/img/heat-exchanger-diagram.svg'

with open(svg_file, 'r', encoding='utf-8') as f:
    svg_content = f.read()

svg_entities = {}

# Extract all entities from SVG
for entity_match in re.finditer(r'<!--entity\s+(\w+)--><g\s+class="entity"\s+data-entity="(\w+)"[^>]*>(.*?)(?=<!--(?:entity|link|SRC))', svg_content, re.DOTALL):
    entity_id = entity_match.group(1)
    entity_content = entity_match.group(3)
    
    # Extract polygon or path
    polygon_match = re.search(r'<polygon[^>]*points="([^"]+)"', entity_content)
    path_match = re.search(r'<path[^>]*d="([^"]+)"', entity_content)
    
    if polygon_match:
        points_str = polygon_match.group(1)
        points = [float(x) for x in re.findall(r'[\d.]+', points_str)]
        xs = [points[i] for i in range(0, len(points), 2)]
        ys = [points[i] for i in range(1, len(points), 2)]
        
        x = round(min(xs))
        y = round(min(ys))
        width = round(max(xs) - min(xs))
        height = round(max(ys) - min(ys))
        
    elif path_match:
        d = path_match.group(1)
        numbers = [float(x) for x in re.findall(r'[\d.]+', d)]
        if len(numbers) >= 4:
            coords = []
            i = 0
            while i < len(numbers) - 1:
                coords.append((numbers[i], numbers[i+1]))
                i += 2
            
            xs = [c[0] for c in coords]
            ys = [c[1] for c in coords]
            
            x = round(min(xs))
            y = round(min(ys))
            width = round(max(xs) - min(xs))
            height = round(max(ys) - min(ys))
        else:
            continue
    else:
        continue
    
    svg_entities[entity_id] = {'x': x, 'y': y, 'width': width, 'height': height}

# Parse narration config to get configured highlights
config_file = 'src/config/heatExchangerNarration.js'

with open(config_file, 'r', encoding='utf-8') as f:
    config_content = f.read()

print("=" * 100)
print("HIGHLIGHT COORDINATE VERIFICATION")
print("=" * 100)

# Extract all highlight entries - simpler pattern
highlight_pattern = r'\{\s*x:\s*(\d+),\s*y:\s*(\d+),\s*width:\s*(\d+),\s*height:\s*(\d+)\s*\}'

# Find all titles and their corresponding highlights
title_pattern = r'title:\s*["\']([^"\']+)["\']'

titles = re.findall(title_pattern, config_content)
highlights = re.findall(highlight_pattern, config_content)

matches = list(zip(titles, highlights))

issues_found = 0
steps_checked = 0

for match in matches:
    title = match[0]
    config_x = int(match[1][0])
    config_y = int(match[1][1])
    config_w = int(match[1][2])
    config_h = int(match[1][3])
    
    # Try to match to an entity ID (simple heuristic)
    matched_entity = None
    min_distance = float('inf')
    
    for entity_id, coords in svg_entities.items():
        # Calculate distance (Euclidean distance of centers)
        config_center_x = config_x + config_w / 2
        config_center_y = config_y + config_h / 2
        svg_center_x = coords['x'] + coords['width'] / 2
        svg_center_y = coords['y'] + coords['height'] / 2
        
        distance = ((config_center_x - svg_center_x)**2 + (config_center_y - svg_center_y)**2)**0.5
        
        if distance < min_distance and distance < 500:  # Within 500px
            min_distance = distance
            matched_entity = entity_id
    
    if matched_entity:
        svg_coords = svg_entities[matched_entity]
        
        # Calculate differences
        diff_x = abs(config_x - svg_coords['x'])
        diff_y = abs(config_y - svg_coords['y'])
        diff_w = abs(config_w - svg_coords['width'])
        diff_h = abs(config_h - svg_coords['height'])
        
        # Check if there's a significant difference (>5px)
        has_issue = diff_x > 5 or diff_y > 5 or diff_w > 5 or diff_h > 5
        
        if has_issue:
            issues_found += 1
            print(f"\n[ISSUE] {title[:50]:50} | Entity: {matched_entity}")
            print(f"    Config:  x={config_x:4}, y={config_y:4}, w={config_w:3}, h={config_h:3}")
            print(f"    SVG:     x={svg_coords['x']:4}, y={svg_coords['y']:4}, w={svg_coords['width']:3}, h={svg_coords['height']:3}")
            print(f"    Diff:    dx={diff_x:3}, dy={diff_y:3}, dw={diff_w:3}, dh={diff_h:3}")
            print(f"    FIX:     {{ x: {svg_coords['x']}, y: {svg_coords['y']}, width: {svg_coords['width']}, height: {svg_coords['height']} }}")
        else:
            print(f"\n[OK] {title[:50]:50} | Entity: {matched_entity}")
        
        steps_checked += 1

print("\n" + "=" * 100)
print(f"Steps checked: {steps_checked}")
print(f"Issues found: {issues_found}")
print("=" * 100)

