#!/usr/bin/env python3
"""
Extract Smart City SVG components by color analysis
- Blackish shapes = Individual components
- Greyish/Silver backgrounds = Groups
"""

import xml.etree.ElementTree as ET
import json
import re

def extract_components_by_color(svg_file):
    """Extract components based on color analysis"""
    
    # Parse SVG
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    # Define namespace
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    # Get SVG dimensions
    viewbox = root.get('viewBox', '0 0 1000 1000')
    viewbox_parts = viewbox.split()
    svg_width = float(viewbox_parts[2]) if len(viewbox_parts) > 2 else 1000
    svg_height = float(viewbox_parts[3]) if len(viewbox_parts) > 3 else 1000
    
    print(f"SVG Dimensions: {svg_width} x {svg_height}")
    
    individual_components = []
    groups = []
    users_cluster = []
    
    # Find all groups and shapes
    for group in root.findall('.//svg:g', ns):
        group_id = group.get('id', '')
        
        # Check if this is a group by looking for background color
        style = group.get('style', '')
        fill_color = extract_fill_color(style)
        
        # Check for group indicators
        is_group = (
            'group' in group_id.lower() or
            'layer' in group_id.lower() or
            'cluster' in group_id.lower() or
            is_greyish_background(fill_color) or
            has_multiple_children(group)
        )
        
        if is_group:
            # This is a group - extract its boundary
            group_bounds = get_group_bounds(group, ns)
            if group_bounds:
                groups.append({
                    'id': group_id,
                    'x': group_bounds['x'],
                    'y': group_bounds['y'],
                    'width': group_bounds['width'],
                    'height': group_bounds['height'],
                    'type': 'group',
                    'text': group_id.replace('_', ' ').title(),
                    'area': group_bounds['width'] * group_bounds['height']
                })
        else:
            # This might contain individual components
            for rect in group.findall('.//svg:rect', ns):
                rect_id = rect.get('id', '')
                style = rect.get('style', '')
                fill_color = extract_fill_color(style)
                
                # Check if this is an individual component (blackish)
                if is_blackish_component(fill_color, style):
                    x = float(rect.get('x', 0))
                    y = float(rect.get('y', 0))
                    width = float(rect.get('width', 0))
                    height = float(rect.get('height', 0))
                    
                    # Filter out very small elements (likely labels)
                    if width > 50 and height > 20:
                        individual_components.append({
                            'id': rect_id,
                            'x': x,
                            'y': y,
                            'width': width,
                            'height': height,
                            'type': 'rectangle',
                            'text': rect_id.replace('_', ' ').title() if rect_id else f"Component {len(individual_components) + 1}",
                            'area': width * height,
                            'fill_color': fill_color
                        })
    
    # Also check for rects directly under root
    for rect in root.findall('.//svg:rect', ns):
        rect_id = rect.get('id', '')
        style = rect.get('style', '')
        fill_color = extract_fill_color(style)
        
        if is_blackish_component(fill_color, style):
            x = float(rect.get('x', 0))
            y = float(rect.get('y', 0))
            width = float(rect.get('width', 0))
            height = float(rect.get('height', 0))
            
            if width > 50 and height > 20:
                individual_components.append({
                    'id': rect_id,
                    'x': x,
                    'y': y,
                    'width': width,
                    'height': height,
                    'type': 'rectangle',
                    'text': rect_id.replace('_', ' ').title() if rect_id else f"Component {len(individual_components) + 1}",
                    'area': width * height,
                    'fill_color': fill_color
                })
    
    # Sort by area (largest first for groups, smallest first for individuals)
    groups.sort(key=lambda x: x['area'], reverse=True)
    individual_components.sort(key=lambda x: x['area'])
    
    print(f"Found {len(individual_components)} individual components")
    print(f"Found {len(groups)} groups")
    
    return {
        'individual_components': individual_components,
        'groups': groups,
        'users_cluster': users_cluster,
        'svg_width': svg_width,
        'svg_height': svg_height
    }

def extract_fill_color(style):
    """Extract fill color from style string"""
    if not style:
        return None
    
    # Look for fill: or fill=
    fill_match = re.search(r'fill[:\s]*([^;]+)', style)
    if fill_match:
        return fill_match.group(1).strip()
    
    return None

def is_blackish_component(fill_color, style):
    """Check if this is a blackish individual component"""
    if not fill_color:
        return True  # Default to individual if no fill specified
    
    # Check for black, dark colors, or no fill
    blackish_colors = ['black', '#000', '#000000', 'none', 'transparent']
    if fill_color.lower() in blackish_colors:
        return True
    
    # Check for dark hex colors
    if fill_color.startswith('#'):
        try:
            # Convert hex to RGB and check if it's dark
            hex_color = fill_color.lstrip('#')
            r = int(hex_color[0:2], 16)
            g = int(hex_color[2:4], 16)
            b = int(hex_color[4:6], 16)
            brightness = (r + g + b) / 3
            return brightness < 100  # Dark colors
        except:
            pass
    
    return False

def is_greyish_background(fill_color):
    """Check if this is a greyish group background"""
    if not fill_color:
        return False
    
    # Check for grey colors
    greyish_colors = ['grey', 'gray', '#808080', '#c0c0c0', '#d3d3d3', '#f0f0f0']
    if fill_color.lower() in greyish_colors:
        return True
    
    # Check for light hex colors
    if fill_color.startswith('#'):
        try:
            hex_color = fill_color.lstrip('#')
            r = int(hex_color[0:2], 16)
            g = int(hex_color[2:4], 16)
            b = int(hex_color[4:6], 16)
            brightness = (r + g + b) / 3
            # Light greyish colors
            return 150 < brightness < 250 and abs(r - g) < 30 and abs(g - b) < 30
        except:
            pass
    
    return False

def has_multiple_children(group):
    """Check if group has multiple child elements (likely a group)"""
    return len(group) > 2

def get_group_bounds(group, ns):
    """Get the bounding box of a group"""
    min_x = float('inf')
    min_y = float('inf')
    max_x = float('-inf')
    max_y = float('-inf')
    
    # Find all rects in the group
    rects = group.findall('.//svg:rect', ns)
    if not rects:
        return None
    
    for rect in rects:
        x = float(rect.get('x', 0))
        y = float(rect.get('y', 0))
        width = float(rect.get('width', 0))
        height = float(rect.get('height', 0))
        
        min_x = min(min_x, x)
        min_y = min(min_y, y)
        max_x = max(max_x, x + width)
        max_y = max(max_y, y + height)
    
    if min_x == float('inf'):
        return None
    
    return {
        'x': min_x,
        'y': min_y,
        'width': max_x - min_x,
        'height': max_y - min_y
    }

if __name__ == "__main__":
    svg_file = "public/assets/diagrams/SmartCity_C4_Diagram.svg"
    
    try:
        components = extract_components_by_color(svg_file)
        
        # Save results
        with open('smartcity_color_components.json', 'w') as f:
            json.dump(components, f, indent=2)
        
        print(f"\nResults saved to smartcity_color_components.json")
        print(f"Individual components: {len(components['individual_components'])}")
        print(f"Groups: {len(components['groups'])}")
        print(f"Users cluster: {len(components['users_cluster'])}")
        
        # Print first few components
        print("\nFirst 5 individual components:")
        for i, comp in enumerate(components['individual_components'][:5]):
            print(f"  {i+1}. {comp['text']} - {comp['width']:.1f}x{comp['height']:.1f} at ({comp['x']:.1f}, {comp['y']:.1f})")
        
        print("\nGroups:")
        for i, group in enumerate(components['groups']):
            print(f"  {i+1}. {group['text']} - {group['width']:.1f}x{group['height']:.1f} at ({group['x']:.1f}, {group['y']:.1f})")
            
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
