import re

# Read the SVG file
with open('public/assets/diagrams/SmartCity_C4_Diagram.svg', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all rect elements with coordinates
rects = re.findall(r'<rect[^>]*x="([^"]+)"[^>]*y="([^"]+)"[^>]*width="([^"]+)"[^>]*height="([^"]+)"', content)

if not rects:
    # Try different pattern
    rects = re.findall(r'<rect[^>]*x=([0-9.]+)[^>]*y=([0-9.]+)[^>]*width=([0-9.]+)[^>]*height=([0-9.]+)', content)

if not rects:
    # Try to find any elements with coordinates
    rects = re.findall(r'x="([0-9.]+)"[^>]*y="([0-9.]+)"[^>]*width="([0-9.]+)"[^>]*height="([0-9.]+)"', content)

print(f"Found {len(rects)} rect elements")

if rects:
    print("First 5 rects:")
    for i, (x, y, w, h) in enumerate(rects[:5]):
        print(f"  {i+1}: x={x}, y={y}, w={w}, h={h}")
    
    # Check if coordinates are large
    x_coords = [float(x) for x, y, w, h in rects]
    y_coords = [float(y) for x, y, w, h in rects]
    w_coords = [float(w) for x, y, w, h in rects]
    h_coords = [float(h) for x, y, w, h in rects]
    
    print(f"\nCoordinate ranges:")
    print(f"X: {min(x_coords):.1f} to {max(x_coords):.1f}")
    print(f"Y: {min(y_coords):.1f} to {max(y_coords):.1f}")
    print(f"Width: {min(w_coords):.1f} to {max(w_coords):.1f}")
    print(f"Height: {min(h_coords):.1f} to {max(h_coords):.1f}")
    
    # Check if we need to scale up
    if max(x_coords) < 1000:
        print("\nCoordinates seem small, might need scaling up")
        scale_factor = 20293 / max(x_coords) if max(x_coords) > 0 else 1
        print(f"Suggested scale factor: {scale_factor:.1f}")
else:
    print("No rect elements found, trying to find other elements...")
    
    # Look for any elements with coordinates
    all_coords = re.findall(r'[0-9]+\.[0-9]+', content)
    large_coords = [float(c) for c in all_coords if float(c) > 1000]
    
    if large_coords:
        print(f"Found {len(large_coords)} large coordinates (>1000)")
        print(f"Max coordinate: {max(large_coords)}")
        print("SVG uses large coordinates, JSON might be scaled down")
    else:
        print("No large coordinates found")
