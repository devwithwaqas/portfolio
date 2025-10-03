"""
Auto-generated CSS cleanup script
Removes unused CSS selectors identified by hierarchical DOM analysis
"""

import re
from pathlib import Path

def remove_css_block(content, selector):
    """Remove an entire CSS block including the selector"""
    # Escape special regex characters
    escaped = re.escape(selector)
    
    # Match the entire rule block
    # Pattern: selector { anything } including multiline
    pattern = rf'{escaped}\s*{{[^}}]*}}'
    
    matches = list(re.finditer(pattern, content, re.DOTALL | re.MULTILINE))
    
    if matches:
        # Remove from end to start to preserve positions
        for match in reversed(matches):
            content = content[:match.start()] + content[match.end():]
    
    return content

def clean_file(filepath, selectors_to_remove):
    """Clean a CSS file by removing unused selectors"""
    print(f"\n🧹 Cleaning: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_lines = content.count('\n')
    removed = 0
    
    for selector in selectors_to_remove:
        old_len = len(content)
        content = remove_css_block(content, selector)
        if len(content) < old_len:
            removed += 1
            print(f"  ✅ Removed: {selector[:60]}...")
    
    # Clean up excessive blank lines
    content = re.sub(r'\n{{4,}}', '\n\n\n', content)
    
    new_lines = content.count('\n')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  📊 Removed {removed} rules, {original_lines - new_lines} lines")

if __name__ == '__main__':
    project_root = Path(__file__).parent.parent

    # Clean main.css
    selectors_main = [
        '.main-content',
        '.col-120-30',
        '.col-120-40',
        '.col-120-60',
        '.col-us-120-1',
        '.col-us-120-2',
        '.col-us-120-3',
        '.col-us-120-4',
        '.col-us-120-5',
        '.col-us-120-6',
        '.col-us-120-7',
        '.col-us-120-8',
        '.col-us-120-10',
        '.col-us-120-12',
        '.col-us-120-15',
        '.col-us-120-17',
        '.col-us-120-20',
        '.col-us-120-24',
        '.col-us-120-30',
        '.col-us-120-40',
        '.col-xs-120-1',
        '.col-xs-120-2',
        '.col-xs-120-3',
        '.col-xs-120-4',
        '.col-xs-120-5',
        '.col-xs-120-6',
        '.col-xs-120-7',
        '.col-xs-120-8',
        '.col-xs-120-10',
        '.col-xs-120-12',
        '.col-xs-120-15',
        '.col-xs-120-17',
        '.col-xs-120-20',
        '.col-xs-120-24',
        '.col-xs-120-30',
        '.col-xs-120-120',
        '.col-sm-120-1',
        '.col-sm-120-2',
        '.col-sm-120-3',
        '.col-sm-120-4',
        '.col-sm-120-5',
        '.col-sm-120-6',
        '.col-sm-120-7',
        '.col-sm-120-8',
        '.col-sm-120-10',
        '.col-sm-120-12',
        '.col-sm-120-15',
        '.col-sm-120-20',
        '.col-sm-120-24',
        '.col-sm-120-40',
    ]
    clean_file(project_root / 'C:\\portfolio\\src\\assets\\css\\main.css', selectors_main)


    # Clean font-sizes.css
    selectors_font_sizes = [
        '.page-title h1',
        '.section-title h2',
        '.section-title p',
        '.portfolio-details .portfolio-info h3',
        '.portfolio-details .portfolio-description h2',
        '.service-details .service-box h4',
        '.service-details h3',
        '.architecture-diagram-container h4',
        '.architecture-textual h5',
        '.logo-text',
        '.about-header h3',
        '.about-content p',
        '.about-content i',
        '.skill-info h5',
        '.skill-percentage',
        '.portfolio-header h3',
        '.testimonials-header h3',
        '.contact-header h3',
        '.info-card-icon',
        '.info-card-content h4',
        '.info-card-content p',
        '.contact-main-icon',
        '.main-icon',
        '.form-input',
        '.form-textarea',
        '.stats-header h3',
        '.stats-icon',
        '.stats-number',
        '.hero-subtitle',
        '.text-content',
    ]
    clean_file(project_root / 'C:\\portfolio\\src\\assets\\css\\font-sizes.css', selectors_font_sizes)


    print("\n✅ CSS cleanup complete!")
