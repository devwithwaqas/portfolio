#!/usr/bin/env python3
"""
Replace console.log statements with conditional DEBUG logging in Vue components
"""

import re
import sys

def replace_console_logs(file_path, component_name):
    """Replace console.log statements with this.log() calls"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern 1: console.log('[ComponentName] message', ...args)
    pattern1 = rf"console\.log\('\[{component_name}\](.*?)'(.*?)\)"
    def replacer1(match):
        message = match.group(1).strip()
        args = match.group(2).strip()
        if args:
            return f"this.log('{message}'{args})"
        return f"this.log('{message}')"
    content = re.sub(pattern1, replacer1, content)
    
    # Pattern 2: console.log(`[ComponentName] ${template}`)
    pattern2 = rf"console\.log\(`\[{component_name}\](.*?)`\)"
    def replacer2(match):
        message = match.group(1).strip()
        return f"this.log(`{message}`)"
    content = re.sub(pattern2, replacer2, content)
    
    # Pattern 3: console.log('[ComponentName]', ...)
    pattern3 = rf"console\.log\('\[{component_name}\]'(.*?)\)"
    def replacer3(match):
        args = match.group(1).strip()
        if args.startswith(','):
            args = args[1:].strip()
        return f"this.log({args})"
    content = re.sub(pattern3, replacer3, content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"[OK] Replaced console.log statements in {file_path}")

if __name__ == '__main__':
    # Replace in DiagramViewer
    replace_console_logs('src/components/projects/DiagramViewer.vue', 'DiagramViewer')
    
    # Replace in DiagramNarrator
    replace_console_logs('src/components/projects/DiagramNarrator.vue', 'DiagramNarrator')
    
    # Replace in NarrationBubble
    replace_console_logs('src/components/projects/NarrationBubble.vue', 'NarrationBubble')
    
    print("\n[OK] All console.log statements replaced!")

