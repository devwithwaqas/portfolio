#!/usr/bin/env python3
"""
Script to find all non-standardized width, height, and font-size usage in Vue components.
Generates a markdown file with findings sorted by line number (highest first) for each file.
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

# Patterns to find
PATTERNS = {
    'width': r'width:\s*[0-9]+(?:px|rem|em|%)',
    'height': r'height:\s*[0-9]+(?:px|rem|em|%)',
    'font-size': r'font-size:\s*[0-9]+(?:px|rem|em)',
    'inline_style_width': r'style="[^"]*width:\s*[0-9]+(?:px|rem|em|%)',
    'inline_style_height': r'style="[^"]*height:\s*[0-9]+(?:px|rem|em|%)',
    'inline_style_font': r'style="[^"]*font-size:\s*[0-9]+(?:px|rem|em)',
}

# Standardized classes to EXCLUDE (these are OK)
STANDARDIZED_CLASSES = [
    # Text classes
    r'\.txt-h[1-6]-\w+',
    r'\.txt-p-\w+',
    r'\.txt-label-\w+',
    r'\.txt-card-\w+',
    r'\.txt-nav-\w+',
    r'\.txt-footer-\w+',
    r'\.txt-btn-\w+',
    r'\.txt-link-\w+',
    r'\.txt-list-\w+',
    r'\.txt-span-\w+',
    
    # Icon classes
    r'\.icon-(?:xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl)',
    r'\.icon-wrapper-(?:xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl)',
    r'\.icon-img-(?:xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl)',
]

# Selectors/contexts to EXCLUDE (layout, containers, etc.)
EXCLUDE_CONTEXTS = [
    r'min-width',
    r'max-width',
    r'min-height',
    r'max-height',
    
    # Bootstrap/layout related
    r'\.container',
    r'\.row',
    r'\.col-',
    
    # SVG/Canvas
    r'<svg',
    r'<canvas',
    r'viewBox',
    
    # Third-party library overrides (deep selectors)
    r':deep\(',
    r'::v-deep',
    
    # Specific layout elements that are intentional
    r'\.tech-icon-box',  # EpicCard tech stack wrapper (intentional)
    r'\.carousel',       # Carousel library overrides
    r'\.slider',         # Slider components
    r'\.banner',         # Banner sections
    r'\.card',           # Card containers
    r'\.wrapper',        # Generic wrappers
    r'\.section',        # Section containers
    r'\.container',      # Container elements
    
    # Line height (not size)
    r'line-height',
]


def should_exclude_line(line, line_context=''):
    """Check if a line should be excluded from results."""
    # Check if it's in a standardized class
    for pattern in STANDARDIZED_CLASSES:
        if re.search(pattern, line_context):
            return True
    
    # Check if it's in an excluded context
    for pattern in EXCLUDE_CONTEXTS:
        if re.search(pattern, line, re.IGNORECASE):
            return True
    
    return False


def get_css_selector(lines, match_line_num):
    """Try to find the CSS selector or context for a match."""
    # Look backwards from match line to find selector
    for i in range(match_line_num - 1, max(0, match_line_num - 20), -1):
        line = lines[i].strip()
        
        # Look for CSS selectors
        if re.match(r'^[\.\#\w\-\[\]:]+.*\{', line):
            return line.rstrip('{').strip()
        
        # Look for @media, @keyframes
        if line.startswith('@'):
            return line
    
    return 'unknown'


def scan_file(filepath):
    """Scan a single file for non-standardized styles."""
    results = defaultdict(list)
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        for line_num, line in enumerate(lines, start=1):
            # Get context (surrounding lines for selector detection)
            context_start = max(0, line_num - 10)
            context_lines = lines[context_start:line_num]
            context = ''.join(context_lines)
            
            # Check each pattern
            for pattern_name, pattern in PATTERNS.items():
                matches = re.finditer(pattern, line)
                for match in matches:
                    matched_text = match.group(0)
                    
                    # Get selector/context
                    if 'inline_style' in pattern_name:
                        # For inline styles, get the full line for context
                        selector = line.strip()[:100]  # First 100 chars
                    else:
                        selector = get_css_selector(lines, line_num)
                    
                    # Check if should exclude
                    if should_exclude_line(line, context):
                        continue
                    
                    results[pattern_name].append({
                        'line_num': line_num,
                        'line_content': line.strip(),
                        'matched': matched_text,
                        'selector': selector
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
            print(f"Warning: {dir_path} does not exist, skipping...")
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


def generate_markdown_report(results, output_file):
    """Generate markdown report sorted by line number (highest first) per file."""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Non-Standardized Styles Analysis\n\n")
        f.write("This report lists all occurrences of width, height, and font-size that are NOT using our standardized classes.\n\n")
        f.write("**Instructions**: Fix each file starting from the HIGHEST line number to avoid line number shifts.\n\n")
        f.write("---\n\n")
        
        # Sort files alphabetically
        for filepath in sorted(results.keys()):
            file_results = results[filepath]
            
            # Count total issues
            total_issues = sum(len(items) for items in file_results.values())
            if total_issues == 0:
                continue
            
            f.write(f"## 📄 `{filepath}`\n\n")
            f.write(f"**Total Issues**: {total_issues}\n\n")
            
            # Collect all issues with line numbers
            all_issues = []
            for pattern_name, items in file_results.items():
                for item in items:
                    all_issues.append({
                        'type': pattern_name,
                        'line_num': item['line_num'],
                        'selector': item['selector'],
                        'matched': item['matched'],
                        'line_content': item['line_content']
                    })
            
            # Sort by line number (HIGHEST first)
            all_issues.sort(key=lambda x: x['line_num'], reverse=True)
            
            # Write issues
            for issue in all_issues:
                icon = '🎨' if 'inline_style' in issue['type'] else '📏'
                f.write(f"### {icon} Line {issue['line_num']}\n\n")
                f.write(f"**Type**: `{issue['type']}`\n\n")
                f.write(f"**Selector/Context**: `{issue['selector']}`\n\n")
                f.write(f"**Found**: `{issue['matched']}`\n\n")
                f.write(f"```vue\n{issue['line_content']}\n```\n\n")
                f.write("---\n\n")
            
            f.write("\n\n")
        
        # Summary
        f.write("## 📊 Summary\n\n")
        f.write("| File | Total Issues |\n")
        f.write("|------|-------------|\n")
        
        for filepath in sorted(results.keys()):
            total = sum(len(items) for items in results[filepath].values())
            if total > 0:
                f.write(f"| `{filepath}` | {total} |\n")


def main():
    """Main execution."""
    print("🔍 Scanning for non-standardized styles...")
    
    # Get base path (project root)
    base_path = Path(__file__).parent.parent
    
    # Scan directories
    results = scan_directory(base_path)
    
    # Generate report
    output_file = base_path / 'NON_STANDARDIZED_STYLES.md'
    generate_markdown_report(results, output_file)
    
    # Print summary
    total_files = len([f for f, r in results.items() if sum(len(items) for items in r.values()) > 0])
    total_issues = sum(sum(len(items) for items in file_results.values()) for file_results in results.values())
    
    print(f"\n✅ Scan complete!")
    print(f"📁 Files with issues: {total_files}")
    print(f"⚠️  Total issues found: {total_issues}")
    print(f"📝 Report generated: {output_file}")


if __name__ == '__main__':
    main()

