"""
Comprehensive SVG Analysis Script for AirAsia ID90 C4 Diagram
Enhanced to find ALL components including groups and individual shapes
"""

import xml.etree.ElementTree as ET
import re
import json

def parse_transform(transform_str):
    """Parse SVG transform attribute to extract translate values"""
    if not transform_str:
        return 0, 0
    
    translate_match = re.search(r'translate\(([^,]+),([^)]+)\)', transform_str)
    if translate_match:
        return float(translate_match.group(1)), float(translate_match.group(2))
    return 0, 0

def get_text_content(element):
    """Extract all text content from an element and its children"""
    texts = []
    
    # Get text from all child elements
    for child in element.iter():
        if child.text and child.text.strip():
            text = child.text.strip()
            if len(text) > 2:  # Ignore very short text
                texts.append(text)
    
    return ' '.join(texts)

def analyze_svg_detailed(svg_file):
    """Detailed SVG analysis to find ALL components"""
    
    print(f"Analyzing SVG: {svg_file}")
    print("=" * 80)
    
    tree = ET.parse(svg_file)
    root = tree.getroot()
    
    # Get SVG dimensions
    svg_width = root.get('width', '5520px').replace('px', '')
    svg_height = root.get('height', '3917.5px').replace('px', '')
    viewBox = root.get('viewBox', f'0 0 {svg_width} {svg_height}')
    
    print(f"\nSVG Dimensions:")
    print(f"   Width: {svg_width}px")
    print(f"   Height: {svg_height}px")
    print(f"   ViewBox: {viewBox}")
    
    # Storage for all found elements
    all_rectangles = []
    all_groups = []
    all_texts = []
    
    # First pass: Find all rectangles with their contexts
    print(f"\nFinding all rectangles...")
    for rect in root.iter('{http://www.w3.org/2000/svg}rect'):
        x = float(rect.get('x', 0))
        y = float(rect.get('y', 0))
        width = float(rect.get('width', 0))
        height = float(rect.get('height', 0))
        
        # Get parent transforms
        parent_tx, parent_ty = 0, 0
        for parent in root.iter():
            if rect in list(parent):
                transform = parent.get('transform', '')
                parent_tx, parent_ty = parse_transform(transform)
                break
        
        # Apply transform
        x += parent_tx
        y += parent_ty
        
        # Get nearby text
        text_content = get_text_content(rect) if rect is not None else ''
        for parent in root.iter():
            if rect in list(parent):
                text_content = get_text_content(parent)
                break
        
        rect_info = {
            'x': round(x, 2),
            'y': round(y, 2),
            'width': round(width, 2),
            'height': round(height, 2),
            'centerX': round(x + width / 2, 2),
            'centerY': round(y + height / 2, 2),
            'text': text_content[:100] if text_content else '',
            'style': rect.get('style', ''),
            'class': rect.get('class', ''),
            'fill': rect.get('fill', '')
        }
        
        all_rectangles.append(rect_info)
    
    print(f"   Found {len(all_rectangles)} rectangles")
    
    # Second pass: Find all groups (packages)
    print(f"\nFinding all groups (packages)...")
    for g in root.iter('{http://www.w3.org/2000/svg}g'):
        g_id = g.get('id', '')
        transform = g.get('transform', '')
        tx, ty = parse_transform(transform)
        
        # Find rectangles in this group
        rects = list(g.findall('.//{http://www.w3.org/2000/svg}rect'))
        if rects:
            # Get group text
            text_content = get_text_content(g)
            
            # Get group bounding box
            x = float(rects[0].get('x', 0)) + tx
            y = float(rects[0].get('y', 0)) + ty
            width = float(rects[0].get('width', 0))
            height = float(rects[0].get('height', 0))
            
            group_info = {
                'id': g_id or f'group_{len(all_groups)}',
                'x': round(x, 2),
                'y': round(y, 2),
                'width': round(width, 2),
                'height': round(height, 2),
                'text': text_content[:100] if text_content else '',
                'rect_count': len(rects),
                'transform': f'translate({tx}, {ty})'
            }
            
            all_groups.append(group_info)
    
    print(f"   Found {len(all_groups)} groups")
    
    # Third pass: Find all text elements for better labeling
    print(f"\nFinding all text elements...")
    for text in root.iter('{http://www.w3.org/2000/svg}text'):
        text_content = get_text_content(text)
        if text_content and len(text_content) > 2:
            x = float(text.get('x', 0))
            y = float(text.get('y', 0))
            
            text_info = {
                'x': round(x, 2),
                'y': round(y, 2),
                'text': text_content
            }
            
            all_texts.append(text_info)
    
    print(f"   Found {len(all_texts)} text elements")
    
    # Now intelligently group rectangles and text to identify components
    print(f"\nIdentifying components...")
    
    components = {}
    
    # Group rectangles by proximity and similar sizes
    # Sort by Y position first, then X
    sorted_rects = sorted(all_rectangles, key=lambda r: (r['y'], r['x']))
    
    # Print all unique rectangles sorted
    print(f"\n" + "=" * 80)
    print(f"ALL RECTANGLES (sorted by position):")
    print("=" * 80)
    
    for i, rect in enumerate(sorted_rects):
        text_preview = rect['text'][:50] if rect['text'] else '(no text)'
        print(f"\n{i+1}. Rectangle at ({rect['x']}, {rect['y']}) - Size: {rect['width']}x{rect['height']}")
        print(f"   Text: {text_preview}")
        print(f"   {{ x: {rect['x']}, y: {rect['y']}, width: {rect['width']}, height: {rect['height']} }}")
    
    # Print all groups
    print(f"\n" + "=" * 80)
    print(f"ALL GROUPS (packages/layers):")
    print("=" * 80)
    
    for i, group in enumerate(all_groups):
        text_preview = group['text'][:50] if group['text'] else '(no text)'
        print(f"\n{i+1}. Group '{group['id']}' at ({group['x']}, {group['y']}) - Size: {group['width']}x{group['height']}")
        print(f"   Text: {text_preview}")
        print(f"   Rectangles in group: {group['rect_count']}")
        print(f"   {{ x: {group['x']}, y: {group['y']}, width: {group['width']}, height: {group['height']} }}")
    
    # Create a manual mapping guide
    print(f"\n" + "=" * 80)
    print(f"COMPONENT IDENTIFICATION GUIDE:")
    print("=" * 80)
    print("\nExpected components from narration:")
    expected_components = [
        'web_app', 'mobile_pwa', 'admin_dashboard',
        'api_gateway', 'app_gateway',
        'auth_service', 'booking_service', 'flight_service', 'employee_service',
        'notification_service', 'analytics_service', 'refund_service', 'audit_service',
        'service_bus', 'event_grid', 'azure_functions', 'stream_analytics',
        'sql_database', 'redis_cache', 'blob_storage', 'cosmos_db',
        'app_insights', 'azure_monitor', 'grafana', 'power_bi',
        'google_sso', 'airasia_flights', 'sms_gateway', 'email_service', 'teams_api', 'push_service',
        # Layer groups
        'ui_layer', 'gateway_layer', 'core_services_layer', 'support_services_layer',
        'event_processing_layer', 'data_layer', 'monitoring_layer', 'external_systems_layer'
    ]
    
    print(f"\nTotal expected: {len(expected_components)} components")
    print(f"Components: {', '.join(expected_components)}")
    
    # Save detailed analysis
    output = {
        'svg_dimensions': {
            'width': svg_width,
            'height': svg_height,
            'viewBox': viewBox
        },
        'all_rectangles': sorted_rects,
        'all_groups': all_groups,
        'all_texts': all_texts[:100],  # First 100 text elements
        'statistics': {
            'total_rectangles': len(all_rectangles),
            'total_groups': len(all_groups),
            'total_texts': len(all_texts),
            'expected_components': len(expected_components)
        }
    }
    
    with open('airasia_svg_detailed_analysis.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2)
    
    print(f"\nDetailed analysis saved to: airasia_svg_detailed_analysis.json")
    
    # Summary
    print(f"\n" + "=" * 80)
    print(f"SUMMARY:")
    print("=" * 80)
    print(f"Total Rectangles: {len(all_rectangles)}")
    print(f"Total Groups: {len(all_groups)}")
    print(f"Total Text Elements: {len(all_texts)}")
    print(f"Expected Components: {len(expected_components)}")
    print(f"\nTotal elements found: {len(all_rectangles) + len(all_groups)}")
    print(f"This should cover all 41 components!")
    
    return output

if __name__ == '__main__':
    svg_file = 'AirAsia_ID90_C4_Diagram.svg'
    
    try:
        results = analyze_svg_detailed(svg_file)
        
        print(f"\n" + "=" * 80)
        print(f"Analysis complete! Review the output above.")
        print(f"Check airasia_svg_detailed_analysis.json for full data.")
        print("=" * 80)
        
    except FileNotFoundError:
        print(f"Error: {svg_file} not found!")
        print(f"   Make sure the SVG file is in the same directory as this script.")
    except Exception as e:
        print(f"Error analyzing SVG: {e}")
        import traceback
        traceback.print_exc()

