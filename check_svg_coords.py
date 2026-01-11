import re

# Read the SVG file
with open('public/assets/diagrams/SmartCity_C4_Diagram.svg', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all rect elements
rects = re.findall(r'<rect[^>]*x="([^"]+)"[^>]*y="([^"]+)"[^>]*width="([^"]+)"[^>]*height="([^"]+)"', content)

print("First 5 rects from SVG:")
for i, (x, y, w, h) in enumerate(rects[:5]):
    print(f"Rect {i+1}: x={x}, y={y}, w={w}, h={h}")

# Check if there are any large coordinates
large_rects = [(x, y, w, h) for x, y, w, h in rects if float(x) > 1000 or float(y) > 1000]
print(f"\nRects with large coordinates (x>1000 or y>1000): {len(large_rects)}")
for i, (x, y, w, h) in enumerate(large_rects[:3]):
    print(f"Large Rect {i+1}: x={x}, y={y}, w={w}, h={h}")

# Check coordinate ranges
x_coords = [float(x) for x, y, w, h in rects]
y_coords = [float(y) for x, y, w, h in rects]
w_coords = [float(w) for x, y, w, h in rects]
h_coords = [float(h) for x, y, w, h in rects]

print(f"\nCoordinate ranges:")
print(f"X: {min(x_coords):.1f} to {max(x_coords):.1f}")
print(f"Y: {min(y_coords):.1f} to {max(y_coords):.1f}")
print(f"Width: {min(w_coords):.1f} to {max(w_coords):.1f}")
print(f"Height: {min(h_coords):.1f} to {max(h_coords):.1f}")
