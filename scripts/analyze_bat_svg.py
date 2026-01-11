import re
import json
from xml.etree import ElementTree as ET

def analyze_bat_svg():
    svg_file = 'public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg'
    
    try:
        with open(svg_file, 'r', encoding='utf-8') as f:
            svg_content = f.read()
        
        print("=" * 80)
        print("BAT SVG DETAILED ANALYSIS")
        print("=" * 80)
        
        # Parse SVG dimensions
        viewbox_match = re.search(r'viewBox="([^"]+)"', svg_content)
        width_match = re.search(r'width="([^"]+)"', svg_content)
        height_match = re.search(r'height="([^"]+)"', svg_content)
        
        svg_dimensions = {
            "width": width_match.group(1) if width_match else "unknown",
            "height": height_match.group(1) if height_match else "unknown",
            "viewBox": viewbox_match.group(1) if viewbox_match else "unknown"
        }
        
        print(f"SVG Dimensions: {svg_dimensions}")
        
        # Find all rectangles (containers, systems, etc.)
        rectangles = []
        rect_pattern = r'<rect[^>]*x="([^"]+)"[^>]*y="([^"]+)"[^>]*width="([^"]+)"[^>]*height="([^"]+)"[^>]*>'
        
        for rect_match in re.finditer(rect_pattern, svg_content):
            x = float(rect_match.group(1))
            y = float(rect_match.group(2))
            width = float(rect_match.group(3))
            height = float(rect_match.group(4))
            
            # Extract text content within this rectangle
            rect_start = rect_match.start()
            rect_end = rect_match.end()
            
            # Look for text elements after this rectangle
            text_content = ""
            remaining_content = svg_content[rect_end:]
            text_match = re.search(r'<text[^>]*>([^<]+)</text>', remaining_content)
            if text_match:
                text_content = text_match.group(1).strip()
            
            # Extract style information
            style_match = re.search(r'style="([^"]*)"', rect_match.group(0))
            style = style_match.group(1) if style_match else ""
            
            # Extract class information
            class_match = re.search(r'class="([^"]*)"', rect_match.group(0))
            class_name = class_match.group(1) if class_match else ""
            
            # Extract fill color
            fill_match = re.search(r'fill="([^"]*)"', rect_match.group(0))
            fill_color = fill_match.group(1) if fill_match else ""
            
            rectangles.append({
                "x": x,
                "y": y,
                "width": width,
                "height": height,
                "centerX": x + width/2,
                "centerY": y + height/2,
                "text": text_content,
                "style": style,
                "class": class_name,
                "fill": fill_color
            })
        
        # Find all ellipses (databases, external systems)
        ellipses = []
        ellipse_pattern = r'<ellipse[^>]*cx="([^"]+)"[^>]*cy="([^"]+)"[^>]*rx="([^"]+)"[^>]*ry="([^"]+)"[^>]*>'
        
        for ellipse_match in re.finditer(ellipse_pattern, svg_content):
            cx = float(ellipse_match.group(1))
            cy = float(ellipse_match.group(2))
            rx = float(ellipse_match.group(3))
            ry = float(ellipse_match.group(4))
            
            # Calculate bounding box
            x = cx - rx
            y = cy - ry
            width = rx * 2
            height = ry * 2
            
            # Extract text content
            ellipse_start = ellipse_match.start()
            ellipse_end = ellipse_match.end()
            remaining_content = svg_content[ellipse_end:]
            text_match = re.search(r'<text[^>]*>([^<]+)</text>', remaining_content)
            text_content = text_match.group(1).strip() if text_match else ""
            
            # Extract style information
            style_match = re.search(r'style="([^"]*)"', ellipse_match.group(0))
            style = style_match.group(1) if style_match else ""
            
            ellipses.append({
                "x": x,
                "y": y,
                "width": width,
                "height": height,
                "centerX": cx,
                "centerY": cy,
                "text": text_content,
                "style": style,
                "type": "ellipse"
            })
        
        # Find all polygons (custom shapes)
        polygons = []
        polygon_pattern = r'<polygon[^>]*points="([^"]+)"[^>]*>'
        
        for polygon_match in re.finditer(polygon_pattern, svg_content):
            points_str = polygon_match.group(1)
            points = [float(x) for x in re.findall(r'[\d.]+', points_str)]
            
            if len(points) >= 4:
                xs = [points[i] for i in range(0, len(points), 2)]
                ys = [points[i] for i in range(1, len(points), 2)]
                
                x = min(xs)
                y = min(ys)
                width = max(xs) - min(xs)
                height = max(ys) - min(ys)
                
                # Extract text content
                polygon_start = polygon_match.start()
                polygon_end = polygon_match.end()
                remaining_content = svg_content[polygon_end:]
                text_match = re.search(r'<text[^>]*>([^<]+)</text>', remaining_content)
                text_content = text_match.group(1).strip() if text_match else ""
                
                # Extract style information
                style_match = re.search(r'style="([^"]*)"', polygon_match.group(0))
                style = style_match.group(1) if style_match else ""
                
                polygons.append({
                    "x": x,
                    "y": y,
                    "width": width,
                    "height": height,
                    "centerX": x + width/2,
                    "centerY": y + height/2,
                    "text": text_content,
                    "style": style,
                    "type": "polygon"
                })
        
        # Combine all shapes
        all_shapes = rectangles + ellipses + polygons
        
        # Sort by y position (top to bottom)
        all_shapes.sort(key=lambda s: s['y'])
        
        # Create analysis result
        analysis_result = {
            "svg_dimensions": svg_dimensions,
            "all_rectangles": rectangles,
            "all_ellipses": ellipses,
            "all_polygons": polygons,
            "all_shapes": all_shapes,
            "total_shapes": len(all_shapes)
        }
        
        # Save to JSON file
        output_file = 'bat_svg_detailed_analysis.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(analysis_result, f, indent=2)
        
        print(f"\n[SUCCESS] Analysis complete! Found {len(all_shapes)} total shapes")
        print(f"[INFO] Rectangles: {len(rectangles)}")
        print(f"[INFO] Ellipses: {len(ellipses)}")
        print(f"[INFO] Polygons: {len(polygons)}")
        print(f"[INFO] Results saved to: {output_file}")
        
        # Print sample shapes
        print("\n" + "=" * 80)
        print("SAMPLE SHAPES (first 10):")
        print("=" * 80)
        for i, shape in enumerate(all_shapes[:10]):
            print(f"{i+1:2d}. {shape['text'][:50]:50} | x={shape['x']:6.1f}, y={shape['y']:6.1f}, w={shape['width']:6.1f}, h={shape['height']:6.1f}")
        
        return analysis_result
        
    except Exception as e:
        print(f"[ERROR] Error analyzing BAT SVG: {e}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    analyze_bat_svg()
