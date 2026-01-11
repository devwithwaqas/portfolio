import re

# Read the SVG file
with open('public/assets/diagrams/SmartCity_C4_Diagram.svg', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all elements with coordinates
print("Looking for elements with coordinates...")

# Try different patterns
patterns = [
    r'<rect[^>]*x="([^"]+)"[^>]*y="([^"]+)"[^>]*width="([^"]+)"[^>]*height="([^"]+)"',
    r'<rect[^>]*x=([0-9.]+)[^>]*y=([0-9.]+)[^>]*width=([0-9.]+)[^>]*height=([0-9.]+)',
    r'<g[^>]*transform="[^"]*translate\(([^,]+),([^)]+)\)[^"]*"[^>]*>',
    r'<rect[^>]*>',
    r'<g[^>]*>'
]

for i, pattern in enumerate(patterns):
    matches = re.findall(pattern, content)
    print(f"Pattern {i+1}: Found {len(matches)} matches")
    if matches and len(matches) < 10:
        print(f"  First few: {matches[:3]}")

# Look for any coordinate-like numbers
coords = re.findall(r'[0-9]+\.[0-9]+', content)
print(f"\nFound {len(coords)} decimal numbers in SVG")
if coords:
    print(f"First 10: {coords[:10]}")
    print(f"Last 10: {coords[-10:]}")

# Check if there are any large numbers
large_coords = [float(c) for c in coords if float(c) > 1000]
print(f"\nLarge coordinates (>1000): {len(large_coords)}")
if large_coords:
    print(f"First 10 large: {large_coords[:10]}")
    print(f"Max: {max(large_coords)}")
