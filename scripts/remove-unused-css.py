import re
from pathlib import Path

# List of definitely unused selectors to remove
UNUSED_SELECTORS = [
    '.hx-narrate-focus',
    '.light-background',
    '.dark-background',
    '.php-email-form .error-message',
    '.php-email-form .sent-message',
    '.php-email-form .loading',
    '.php-email-form .loading:before',
    '#preloader',
    '#preloader:before',
    '@keyframes animate-preloader',
    # Old 120-column Bootstrap classes (keeping only the ones actually used)
    '.col-120-1', '.col-120-2', '.col-120-3', '.col-120-4', '.col-120-5', 
    '.col-120-6', '.col-120-7', '.col-120-8', '.col-120-12', '.col-120-15',
    '.col-120-17', '.col-120-20', '.col-120-24',
    # Old architecture diagram classes
    '.arch-component', '.arch-component:hover',
    '.arch-connection', '.arch-connection:hover',
    '.arch-icon', '.arch-subtitle', '.arch-text',
    '.architecture-diagram-container',
    '.architecture-svg',
    '.architecture-textual',
    # Old card header styles (now in components)
    '.card-header.fancy-3d-header',
    '.text-card .card-header.fancy-3d-header',
]

def remove_css_rule(content, selector):
    """Remove a CSS rule by its selector"""
    # Escape special regex characters
    escaped_selector = re.escape(selector)
    
    # Pattern to match the entire CSS rule (selector + content in braces)
    pattern = rf'{escaped_selector}\s*\{{[^}}]*\}}'
    
    # Remove the rule
    content = re.sub(pattern, '', content, flags=re.MULTILINE | re.DOTALL)
    
    return content

def clean_main_css():
    """Clean main.css file"""
    css_file = Path('src/assets/css/main.css')
    
    print(f"🧹 Cleaning {css_file}...")
    
    with open(css_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_size = len(content)
    rules_removed = 0
    
    for selector in UNUSED_SELECTORS:
        old_content = content
        content = remove_css_rule(content, selector)
        if len(content) < len(old_content):
            rules_removed += 1
            print(f"  ✅ Removed: {selector}")
    
    # Remove excessive blank lines (more than 2 consecutive)
    content = re.sub(r'\n{4,}', '\n\n\n', content)
    
    new_size = len(content)
    saved = original_size - new_size
    
    # Write back
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n✅ Cleanup complete!")
    print(f"  Rules removed: {rules_removed}")
    print(f"  Size before: {original_size:,} bytes")
    print(f"  Size after: {new_size:,} bytes")
    print(f"  Saved: {saved:,} bytes ({saved/original_size*100:.1f}%)")

if __name__ == '__main__':
    clean_main_css()

