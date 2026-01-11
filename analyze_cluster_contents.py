import xml.etree.ElementTree as ET

# Parse the SVG to analyze cluster contents
tree = ET.parse('public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg')
root = tree.getroot()

print('Analyzing cluster contents:')

# Find cluster groups
clusters = root.findall('.//{http://www.w3.org/2000/svg}g[@class="cluster"]')
print(f'Found {len(clusters)} cluster groups')

for i, cluster in enumerate(clusters):
    cluster_id = cluster.get('id', '')
    print(f'\nCluster {i+1}: {cluster_id}')
    
    # Find all child elements in this cluster
    children = cluster.findall('.//{http://www.w3.org/2000/svg}*')
    print(f'  Children: {len(children)}')
    
    # Look for different element types
    rects = cluster.findall('.//{http://www.w3.org/2000/svg}rect')
    ellipses = cluster.findall('.//{http://www.w3.org/2000/svg}ellipse')
    circles = cluster.findall('.//{http://www.w3.org/2000/svg}circle')
    polygons = cluster.findall('.//{http://www.w3.org/2000/svg}polygon')
    paths = cluster.findall('.//{http://www.w3.org/2000/svg}path')
    
    print(f'    Rectangles: {len(rects)}')
    print(f'    Ellipses: {len(ellipses)}')
    print(f'    Circles: {len(circles)}')
    print(f'    Polygons: {len(polygons)}')
    print(f'    Paths: {len(paths)}')
    
    # Show some examples
    if rects:
        for j, rect in enumerate(rects[:3]):
            x = float(rect.get('x', 0))
            y = float(rect.get('y', 0))
            width = float(rect.get('width', 0))
            height = float(rect.get('height', 0))
            print(f'      Rect {j+1}: {width:.0f}x{height:.0f} at {x:.0f},{y:.0f}')

# Also check for any other element types we might have missed
print('\n\nChecking for other element types:')
all_elements = root.findall('.//{http://www.w3.org/2000/svg}*')
element_types = {}
for elem in all_elements:
    tag = elem.tag.split('}')[-1] if '}' in elem.tag else elem.tag
    element_types[tag] = element_types.get(tag, 0) + 1

for tag, count in sorted(element_types.items()):
    print(f'{tag}: {count}')
