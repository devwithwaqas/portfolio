"""Debug Event Grid coordinates"""
import xml.etree.ElementTree as ET

tree = ET.parse('AirAsia_ID90_C4_Diagram.svg')
root = tree.getroot()

# Find event_grid entity
for g in root.iter('{http://www.w3.org/2000/svg}g'):
    if g.get('id') == 'entity_event_grid':
        print(f"Found entity_event_grid")
        print(f"Attributes: {g.attrib}")
        
        # Find all rects
        rects = list(g.findall('.//{http://www.w3.org/2000/svg}rect'))
        print(f"\nFound {len(rects)} rects:")
        for i, rect in enumerate(rects):
            print(f"  Rect {i}: x={rect.get('x')}, y={rect.get('y')}, w={rect.get('width')}, h={rect.get('height')}")
        
        break

