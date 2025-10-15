#!/usr/bin/env python3
"""
Script to analyze CSS class dependencies for width/height usage.
Identifies what other properties are set alongside width/height to determine if we can:
1. Replace the class entirely with standardized classes
2. Keep the class and add standardized classes alongside
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


def extract_css_block(lines, start_line):
    """Extract a complete CSS block starting from a selector."""
    block_lines = []
    brace_count = 0
    started = False
    
    for i in range(start_line, len(lines)):
        line = lines[i]
        block_lines.append(line)
        
        # Count braces
        brace_count += line.count('{')
        brace_count -= line.count('}')
        
        if '{' in line:
            started = True
        
        # Block complete when braces balanced
        if started and brace_count == 0:
            break
    
    return ''.join(block_lines)


def parse_css_properties(css_block):
    """Parse all properties from a CSS block."""
    properties = {}
    
    # Remove selector and braces
    match = re.search(r'\{([^}]+)\}', css_block, re.DOTALL)
    if not match:
        return properties
    
    content = match.group(1)
    
    # Split by semicolon and parse each property
    declarations = content.split(';')
    for decl in declarations:
        decl = decl.strip()
        if ':' in decl:
            prop, value = decl.split(':', 1)
            properties[prop.strip()] = value.strip()
    
    return properties


def analyze_selector_usage(selector, properties):
    """Analyze if selector can be replaced or needs to be kept."""
    width_height_props = {'width', 'height'}
    size_props = width_height_props | {'font-size'}
    
    has_size = any(prop in properties for prop in size_props)
    other_props = [prop for prop in properties if prop not in size_props]
    
    if not has_size:
        return 'no_size', other_props
    
    if not other_props:
        return 'replace', []  # Only size props, can replace entirely
    
    # Check if other props are just display/flex/align (structural only)
    structural_only = {'display', 'flex-direction', 'align-items', 'justify-content', 
                       'flex', 'flex-shrink', 'flex-grow', 'gap', 'position', 'z-index',
                       'transition', 'cursor'}
    
    non_structural = [p for p in other_props if p not in structural_only]
    
    if not non_structural:
        return 'consider_replace', other_props  # Mostly structural, might replace
    
    return 'keep_both', other_props  # Has important props, keep both


def scan_file(filepath):
    """Scan a file for CSS class dependencies."""
    results = []
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        in_style_block = False
        
        for line_num, line in enumerate(lines):
            # Check if we're in <style> section
            if '<style' in line:
                in_style_block = True
                continue
            if '</style>' in line:
                in_style_block = False
                continue
            
            if not in_style_block:
                continue
            
            # Look for CSS selectors with size properties
            if re.search(r'(width|height|font-size):\s*[0-9]+', line):
                # Find the selector
                for i in range(line_num, max(0, line_num - 20), -1):
                    selector_line = lines[i].strip()
                    
                    # Found selector
                    if re.match(r'^[\.\#\w\-\[\]:@]+.*\{', selector_line):
                        selector = selector_line.rstrip('{').strip()
                        
                        # Extract full CSS block
                        css_block = extract_css_block(lines, i)
                        properties = parse_css_properties(css_block)
                        
                        # Analyze
                        action, other_props = analyze_selector_usage(selector, properties)
                        
                        results.append({
                            'line_num': line_num + 1,
                            'selector': selector,
                            'properties': properties,
                            'action': action,
                            'other_props': other_props
                        })
                        break
    
    except Exception as e:
        print(f"Error analyzing {filepath}: {e}")
    
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


def generate_dependency_report(results, output_file):
    """Generate markdown report of style dependencies."""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Style Refactoring Dependencies Analysis\n\n")
        f.write("This report shows CSS class dependencies for width/height refactoring.\n\n")
        f.write("## Action Legend:\n\n")
        f.write("- 🔄 **REPLACE**: Class only sets size properties → Replace with standardized classes\n")
        f.write("- 🤔 **CONSIDER_REPLACE**: Class has size + structural props only → Might replace entirely\n")
        f.write("- ➕ **KEEP_BOTH**: Class has other important properties → Keep class + add standardized classes\n")
        f.write("- ⚪ **NO_SIZE**: Class doesn't set size (false positive)\n\n")
        f.write("---\n\n")
        
        # Sort files alphabetically
        for filepath in sorted(results.keys()):
            file_results = results[filepath]
            
            if not file_results:
                continue
            
            f.write(f"## 📄 `{filepath}`\n\n")
            
            # Group by action type
            grouped = defaultdict(list)
            for item in file_results:
                grouped[item['action']].append(item)
            
            # Sort by line number (highest first) within each group
            for action in ['replace', 'consider_replace', 'keep_both', 'no_size']:
                if action not in grouped:
                    continue
                
                items = sorted(grouped[action], key=lambda x: x['line_num'], reverse=True)
                
                action_icons = {
                    'replace': '🔄 **REPLACE**',
                    'consider_replace': '🤔 **CONSIDER_REPLACE**',
                    'keep_both': '➕ **KEEP_BOTH**',
                    'no_size': '⚪ **NO_SIZE**'
                }
                
                f.write(f"### {action_icons[action]}\n\n")
                
                for item in items:
                    f.write(f"#### Line {item['line_num']}: `{item['selector']}`\n\n")
                    
                    # List all properties
                    f.write("**Properties:**\n")
                    for prop, value in sorted(item['properties'].items()):
                        icon = '📏' if prop in ['width', 'height', 'font-size'] else '🔧'
                        f.write(f"- {icon} `{prop}: {value}`\n")
                    
                    f.write("\n")
                    
                    # Recommendation
                    if item['action'] == 'replace':
                        f.write("**✅ Recommendation**: Remove class entirely, use standardized size classes in template\n\n")
                    elif item['action'] == 'consider_replace':
                        f.write("**💡 Recommendation**: Consider replacing with standardized classes + inline structural styles if needed\n\n")
                        f.write(f"**Other Props**: {', '.join(item['other_props'])}\n\n")
                    elif item['action'] == 'keep_both':
                        f.write("**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template\n\n")
                        f.write(f"**Important Props**: {', '.join(item['other_props'])}\n\n")
                    
                    f.write("---\n\n")
            
            f.write("\n\n")
        
        # Summary
        f.write("## 📊 Summary by Action\n\n")
        
        action_counts = defaultdict(int)
        for file_results in results.values():
            for item in file_results:
                action_counts[item['action']] += 1
        
        f.write("| Action | Count | What to Do |\n")
        f.write("|--------|-------|------------|\n")
        f.write(f"| 🔄 REPLACE | {action_counts['replace']} | Remove class, use standardized classes |\n")
        f.write(f"| 🤔 CONSIDER_REPLACE | {action_counts['consider_replace']} | Evaluate if can replace entirely |\n")
        f.write(f"| ➕ KEEP_BOTH | {action_counts['keep_both']} | Keep class + add standardized |\n")
        f.write(f"| ⚪ NO_SIZE | {action_counts['no_size']} | Ignore (false positive) |\n")


def main():
    """Main execution."""
    print("🔍 Analyzing CSS class dependencies...")
    
    # Get base path (project root)
    base_path = Path(__file__).parent.parent
    
    # Scan directories
    results = scan_directory(base_path)
    
    # Generate report
    output_file = base_path / 'STYLE_REFACTORING_DEPENDENCIES.md'
    generate_dependency_report(results, output_file)
    
    # Print summary
    total_selectors = sum(len(items) for items in results.values())
    
    print(f"\n✅ Analysis complete!")
    print(f"📁 Files analyzed: {len(results)}")
    print(f"🎯 CSS selectors found: {total_selectors}")
    print(f"📝 Report generated: {output_file}")


if __name__ == '__main__':
    main()

