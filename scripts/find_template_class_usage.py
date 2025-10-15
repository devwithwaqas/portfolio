#!/usr/bin/env python3
"""
Script to find where CSS classes are used in templates.
Maps CSS classes to their template usage for easy refactoring.
"""

import os
import re
from pathlib import Path
from collections import defaultdict

# Directories to scan
SCAN_DIRS = [
    'src/components',
    'src/views'
]


def extract_css_selectors(lines):
    """Extract all CSS class selectors from <style> block."""
    selectors = []
    in_style = False
    
    for line_num, line in enumerate(lines, start=1):
        if '<style' in line:
            in_style = True
            continue
        if '</style>' in line:
            in_style = False
            continue
        
        if not in_style:
            continue
        
        # Look for class selectors with size properties
        if re.search(r'(width|height|font-size):\s*[0-9]+', line):
            # Find selector by looking backwards
            for i in range(line_num - 1, max(0, line_num - 20), -1):
                selector_line = lines[i].strip()
                
                # Found selector
                if re.match(r'^[\.\#\w\-\[\]:@]+.*\{', selector_line):
                    selector = selector_line.rstrip('{').strip()
                    
                    # Extract class names from selector
                    class_matches = re.findall(r'\.([a-zA-Z0-9_-]+)', selector)
                    if class_matches:
                        selectors.append({
                            'line_num': line_num,
                            'selector': selector,
                            'classes': class_matches,
                            'full_line': line.strip()
                        })
                    break
    
    return selectors


def find_class_usage_in_template(lines, class_name):
    """Find where a CSS class is used in the template."""
    usages = []
    in_template = False
    
    for line_num, line in enumerate(lines, start=1):
        if '<template>' in line:
            in_template = True
            continue
        if '</template>' in line:
            in_template = False
            continue
        
        if not in_template:
            continue
        
        # Look for class usage (class="...", :class="...")
        # Match both static and dynamic class bindings
        patterns = [
            rf'class="[^"]*\b{re.escape(class_name)}\b[^"]*"',
            rf":class=\"[^\"]*{re.escape(class_name)}[^\"]*\"",
            rf":class='[^']*{re.escape(class_name)}[^']*'",
            rf'class=\'[^\']*\b{re.escape(class_name)}\b[^\']*\'',
        ]
        
        for pattern in patterns:
            if re.search(pattern, line):
                # Extract the element and full class attribute
                element_match = re.search(r'<(\w+)[^>]*' + pattern, line)
                element = element_match.group(1) if element_match else 'unknown'
                
                # Get the full class attribute value
                class_attr_match = re.search(r'(?::)?class=["\']([^"\']+)["\']', line)
                full_classes = class_attr_match.group(1) if class_attr_match else ''
                
                usages.append({
                    'line_num': line_num,
                    'element': element,
                    'full_classes': full_classes,
                    'line_content': line.strip()[:150]  # Truncate long lines
                })
                break
    
    return usages


def scan_file(filepath):
    """Scan a file for CSS classes and their template usage."""
    results = []
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        # Extract CSS selectors with size properties
        css_selectors = extract_css_selectors(lines)
        
        # For each selector, find its template usage
        for selector_info in css_selectors:
            for class_name in selector_info['classes']:
                usages = find_class_usage_in_template(lines, class_name)
                
                if usages or True:  # Include even if not found in template
                    results.append({
                        'css_line': selector_info['line_num'],
                        'css_selector': selector_info['selector'],
                        'class_name': class_name,
                        'css_property': selector_info['full_line'],
                        'template_usages': usages
                    })
    
    except Exception as e:
        print(f"Error scanning {filepath}: {e}")
    
    return results


def scan_directory(base_path):
    """Recursively scan directory for Vue files."""
    all_results = {}
    
    for scan_dir in SCAN_DIRS:
        dir_path = Path(base_path) / scan_dir
        if not dir_path.exists():
            continue
        
        for vue_file in dir_path.rglob('*.vue'):
            # Skip backup files
            if 'backup' in str(vue_file).lower() or '_old' in str(vue_file).lower():
                continue
            
            results = scan_file(vue_file)
            if results:
                rel_path = vue_file.relative_to(base_path)
                all_results[str(rel_path)] = results
    
    return all_results


def generate_usage_report(results, output_file):
    """Generate markdown report of CSS class template usage."""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# CSS Class Template Usage Mapping\n\n")
        f.write("This report shows WHERE CSS classes with size properties are used in templates.\n\n")
        f.write("**Usage**: Use this to quickly find and update template class attributes when refactoring.\n\n")
        f.write("---\n\n")
        
        # Sort files alphabetically
        for filepath in sorted(results.keys()):
            file_results = results[filepath]
            
            if not file_results:
                continue
            
            f.write(f"## 📄 `{filepath}`\n\n")
            
            # Group by CSS line number (highest first)
            sorted_results = sorted(file_results, key=lambda x: x['css_line'], reverse=True)
            
            for item in sorted_results:
                f.write(f"### 🎨 CSS Line {item['css_line']}: `.{item['class_name']}`\n\n")
                f.write(f"**CSS Selector**: `{item['css_selector']}`\n\n")
                f.write(f"**CSS Property**: `{item['css_property']}`\n\n")
                
                if item['template_usages']:
                    f.write(f"**📍 Used in Template**: {len(item['template_usages'])} location(s)\n\n")
                    
                    for usage in item['template_usages']:
                        f.write(f"#### Template Line {usage['line_num']}\n\n")
                        f.write(f"**Element**: `<{usage['element']}>`\n\n")
                        f.write(f"**Current Classes**: `{usage['full_classes']}`\n\n")
                        f.write("```vue\n")
                        f.write(f"{usage['line_content']}\n")
                        f.write("```\n\n")
                        f.write("**✏️ Action**: Add standardized class to this element\n\n")
                        f.write("---\n\n")
                else:
                    f.write("**⚠️ Not Found in Template** (might be dynamic, scoped, or unused)\n\n")
                    f.write("---\n\n")
            
            f.write("\n\n")
        
        # Summary
        f.write("## 📊 Summary\n\n")
        
        total_classes = 0
        total_usages = 0
        classes_not_found = 0
        
        for file_results in results.values():
            for item in file_results:
                total_classes += 1
                if item['template_usages']:
                    total_usages += len(item['template_usages'])
                else:
                    classes_not_found += 1
        
        f.write(f"- **Total CSS Classes**: {total_classes}\n")
        f.write(f"- **Total Template Usages**: {total_usages}\n")
        f.write(f"- **Classes Not Found in Template**: {classes_not_found}\n\n")
        
        f.write("### Files with Most Classes\n\n")
        f.write("| File | CSS Classes |\n")
        f.write("|------|-------------|\n")
        
        file_counts = [(filepath, len(items)) for filepath, items in results.items()]
        file_counts.sort(key=lambda x: x[1], reverse=True)
        
        for filepath, count in file_counts[:10]:
            f.write(f"| `{filepath}` | {count} |\n")


def main():
    """Main execution."""
    print("🔍 Mapping CSS class template usage...")
    
    # Get base path (project root)
    base_path = Path(__file__).parent.parent
    
    # Scan directories
    results = scan_directory(base_path)
    
    # Generate report
    output_file = base_path / 'CSS_TEMPLATE_USAGE_MAP.md'
    generate_usage_report(results, output_file)
    
    # Print summary
    total_classes = sum(len(items) for items in results.values())
    total_files = len(results)
    
    print(f"\n✅ Mapping complete!")
    print(f"📁 Files scanned: {total_files}")
    print(f"🎯 CSS classes found: {total_classes}")
    print(f"📝 Report generated: {output_file}")


if __name__ == '__main__':
    main()

