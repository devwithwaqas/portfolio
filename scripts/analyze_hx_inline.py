#!/usr/bin/env python3
"""
HX-Inline Analysis Tool
Analyzes the hx-inline.js file to identify unused code blocks
"""

import re
import sys
import os

def analyze_hx_inline(file_path):
    """Analyze the hx-inline.js file for unused code blocks"""
    
    print("🧹 HX-Inline Analysis Tool")
    print("=========================")
    
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        lines = content.split('\n')
    
    total_lines = len(lines)
    file_size_kb = len(content) / 1024
    
    print(f"📊 Current State:")
    print(f"   Total lines: {total_lines}")
    print(f"   File size: {file_size_kb:.2f} KB")
    
    # Find IIFE blocks
    iife_blocks = []
    current_block = None
    brace_count = 0
    
    for i, line in enumerate(lines):
        line_num = i + 1
        
        # Start of IIFE
        if re.search(r'\(function \(\) \{', line) and current_block is None:
            current_block = {
                'start_line': line_num,
                'end_line': None,
                'content': [line],
                'description': 'IIFE Block'
            }
            brace_count = 1
        elif current_block is not None:
            current_block['content'].append(line)
            
            # Count braces
            open_braces = line.count('{')
            close_braces = line.count('}')
            brace_count += open_braces - close_braces
            
            # Block complete
            if brace_count == 0:
                current_block['end_line'] = line_num
                iife_blocks.append(current_block)
                current_block = None
    
    print(f"\n🔍 Found {len(iife_blocks)} IIFE blocks:")
    
    total_unused_lines = 0
    unused_blocks = []
    
    for block in iife_blocks:
        block_content = '\n'.join(block['content'])
        block_lines = block['end_line'] - block['start_line'] + 1
        
        # Check if block is used
        is_used = False
        
        # Look for active patterns
        active_patterns = [
            r'window\.hxNarratorPro',
            r'console\.log.*Legacy.*disabled',
            r'return.*Exit early',
            r'TemplateLoader',
            r'Icon Engine',
            r'Diagram Narrator Pro'
        ]
        
        for pattern in active_patterns:
            if re.search(pattern, block_content, re.IGNORECASE):
                is_used = True
                break
        
        status = "✅ USED" if is_used else "❌ UNUSED"
        color = "🟢" if is_used else "🔴"
        
        print(f"   {color} Lines {block['start_line']}-{block['end_line']}: {status} ({block_lines} lines)")
        
        if not is_used:
            unused_blocks.append(block)
            total_unused_lines += block_lines
    
    print(f"\n📈 Cleanup Potential:")
    print(f"   Unused blocks: {len(unused_blocks)}")
    print(f"   Lines to remove: {total_unused_lines}")
    print(f"   Remaining lines: {total_lines - total_unused_lines}")
    print(f"   Size reduction: {(total_unused_lines / total_lines) * 100:.1f}%")
    
    # Show what would be removed
    if unused_blocks:
        print(f"\n🗑️ Blocks to remove:")
        for block in unused_blocks:
            block_lines = block['end_line'] - block['start_line'] + 1
            print(f"   Lines {block['start_line']}-{block['end_line']}: {block_lines} lines")
    
    # Recommendation
    print(f"\n💡 Recommendation:")
    if total_unused_lines > 1000:
        print(f"   🚨 MAJOR CLEANUP NEEDED - Remove {total_unused_lines} lines of unused code!")
    elif total_unused_lines > 500:
        print(f"   ⚠️  Significant cleanup possible - Remove {total_unused_lines} lines")
    else:
        print(f"   ✅ File is relatively clean")
    
    print(f"\n✅ Analysis complete!")
    
    return unused_blocks

def create_cleanup_script(unused_blocks, input_file, output_file):
    """Create a Python script to remove unused blocks"""
    
    script_content = f'''#!/usr/bin/env python3
"""
Auto-generated cleanup script for hx-inline.js
Removes {len(unused_blocks)} unused code blocks
"""

def cleanup_hx_inline():
    input_file = "{input_file}"
    output_file = "{output_file}"
    backup_file = input_file + ".backup"
    
    # Create backup
    import shutil
    shutil.copy2(input_file, backup_file)
    print(f"📁 Backup created: {{backup_file}}")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Remove unused blocks (from end to start to avoid line number issues)
    blocks_to_remove = {unused_blocks}
    
    # Sort by start line in descending order
    blocks_to_remove.sort(key=lambda x: x['start_line'], reverse=True)
    
    new_lines = []
    skip_until = 0
    
    for i, line in enumerate(lines):
        line_num = i + 1
        
        # Check if we should skip this line
        should_skip = False
        for block in blocks_to_remove:
            if block['start_line'] <= line_num <= block['end_line']:
                should_skip = True
                break
        
        if not should_skip:
            new_lines.append(line)
    
    # Write cleaned file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print(f"🧹 Cleanup completed!")
    print(f"   Original lines: {{len(lines)}}")
    print(f"   New lines: {{len(new_lines)}}")
    print(f"   Lines removed: {{len(lines) - len(new_lines)}}")
    print(f"   Output file: {{output_file}}")

if __name__ == "__main__":
    cleanup_hx_inline()
'''
    
    with open('scripts/cleanup_hx_inline.py', 'w', encoding='utf-8') as f:
        f.write(script_content)
    
    print(f"\n🔧 Cleanup script created: scripts/cleanup_hx_inline.py")
    print(f"   Run: python scripts/cleanup_hx_inline.py")

if __name__ == "__main__":
    file_path = "public/assets/js/hx-inline.js"
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
    
    unused_blocks = analyze_hx_inline(file_path)
    
    if unused_blocks:
        create_cleanup_script(unused_blocks, file_path, file_path)
