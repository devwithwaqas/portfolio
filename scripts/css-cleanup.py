import re
import os
from pathlib import Path
from collections import defaultdict

class CSSCleanup:
    def __init__(self, project_root):
        self.project_root = Path(project_root)
        self.used_classes = set()
        self.used_ids = set()
        self.used_elements = set()
        self.css_selectors = defaultdict(list)
        
    def extract_html_classes_and_ids(self):
        """Extract all classes and IDs from Vue templates and HTML files"""
        print("🔍 Scanning Vue components and HTML files...")
        
        # Patterns to match
        class_pattern = re.compile(r'class=["\']([^"\']+)["\']')
        id_pattern = re.compile(r'id=["\']([^"\']+)["\']')
        dynamic_class_pattern = re.compile(r':class=["\']([^"\']+)["\']')
        
        # Scan all Vue and HTML files
        for file_path in self.project_root.rglob('*.vue'):
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                
                # Extract classes
                for match in class_pattern.finditer(content):
                    classes = match.group(1).split()
                    for cls in classes:
                        if cls and not cls.startswith('{'):
                            self.used_classes.add(cls.strip())
                
                # Extract dynamic classes
                for match in dynamic_class_pattern.finditer(content):
                    classes = match.group(1).split()
                    for cls in classes:
                        if cls and not cls.startswith('{'):
                            self.used_classes.add(cls.strip())
                
                # Extract IDs
                for match in id_pattern.finditer(content):
                    id_val = match.group(1).strip()
                    if id_val and not id_val.startswith('{'):
                        self.used_ids.add(id_val)
        
        # Also scan HTML files
        for file_path in self.project_root.rglob('*.html'):
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                
                for match in class_pattern.finditer(content):
                    classes = match.group(1).split()
                    for cls in classes:
                        if cls:
                            self.used_classes.add(cls.strip())
                
                for match in id_pattern.finditer(content):
                    id_val = match.group(1).strip()
                    if id_val:
                        self.used_ids.add(id_val)
        
        print(f"✅ Found {len(self.used_classes)} unique classes")
        print(f"✅ Found {len(self.used_ids)} unique IDs")
        
    def extract_css_selectors(self, css_file):
        """Extract all selectors from a CSS file"""
        print(f"\n🔍 Analyzing CSS file: {css_file}")
        
        with open(css_file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Remove comments
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        
        # Find all CSS rules
        rule_pattern = re.compile(r'([^{}]+)\s*\{[^{}]*\}', re.MULTILINE)
        
        for match in rule_pattern.finditer(content):
            selector_group = match.group(1).strip()
            
            # Split by comma for multiple selectors
            selectors = [s.strip() for s in selector_group.split(',')]
            
            for selector in selectors:
                if selector and not selector.startswith('@'):
                    self.css_selectors[selector].append(css_file)
    
    def is_selector_used(self, selector):
        """Check if a CSS selector is used in the HTML/Vue files"""
        
        # Skip special selectors
        if any(x in selector for x in ['@', '::', ':', '[', '>', '+', '~', '*']):
            # These are pseudo-elements, pseudo-classes, attributes, combinators
            # Extract base class/id and check if that exists
            base = re.sub(r'[:>\+~\[].*', '', selector).strip()
            if not base or base == '':
                return True  # Keep special selectors
            selector = base
        
        # Remove leading . or #
        if selector.startswith('.'):
            class_name = selector[1:].split()[0]
            return class_name in self.used_classes
        elif selector.startswith('#'):
            id_name = selector[1:].split()[0]
            return id_name in self.used_ids
        elif selector.strip() in ['html', 'body', '*', 'section', 'div', 'p', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'li', 'img', 'span', 'button', 'input', 'textarea', 'form', 'label', 'i', 'svg', 'path']:
            return True  # Keep element selectors
        
        return True  # Default to keeping if unsure
    
    def analyze(self):
        """Main analysis function"""
        print("=" * 80)
        print("🧹 CSS CLEANUP ANALYZER")
        print("=" * 80)
        
        # Step 1: Extract all used classes and IDs
        self.extract_html_classes_and_ids()
        
        # Step 2: Extract CSS selectors
        css_files = [
            self.project_root / 'src/assets/css/main.css',
            self.project_root / 'src/assets/css/font-sizes.css'
        ]
        
        for css_file in css_files:
            if css_file.exists():
                self.extract_css_selectors(css_file)
        
        # Step 3: Find unused selectors
        print("\n" + "=" * 80)
        print("🔎 ANALYZING SELECTORS...")
        print("=" * 80)
        
        unused_selectors = {}
        potentially_unused = {}
        
        for selector, files in self.css_selectors.items():
            if not self.is_selector_used(selector):
                # Check if it's a component-specific class that might be in scoped styles
                if any(x in selector.lower() for x in ['hero', 'nav', 'footer', 'contact', 'skill', 'portfolio', 'about', 'resume', 'testimonial', 'stat']):
                    potentially_unused[selector] = files
                else:
                    unused_selectors[selector] = files
        
        # Report findings
        print(f"\n📊 ANALYSIS RESULTS:")
        print(f"  Total unique selectors: {len(self.css_selectors)}")
        print(f"  Used classes found: {len(self.used_classes)}")
        print(f"  Used IDs found: {len(self.used_ids)}")
        print(f"  Definitely unused: {len(unused_selectors)}")
        print(f"  Potentially unused: {len(potentially_unused)}")
        
        # Show some examples of unused classes
        if unused_selectors:
            print("\n❌ DEFINITELY UNUSED SELECTORS (sample):")
            for i, (selector, files) in enumerate(list(unused_selectors.items())[:20]):
                print(f"  {i+1}. {selector}")
        
        if potentially_unused:
            print("\n⚠️  POTENTIALLY UNUSED SELECTORS (review needed - sample):")
            for i, (selector, files) in enumerate(list(potentially_unused.items())[:20]):
                print(f"  {i+1}. {selector}")
        
        # Save detailed report
        report_file = self.project_root / 'css-cleanup-report.txt'
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write("CSS CLEANUP REPORT\n")
            f.write("=" * 80 + "\n\n")
            f.write(f"Total selectors analyzed: {len(self.css_selectors)}\n")
            f.write(f"Used classes found: {len(self.used_classes)}\n")
            f.write(f"Used IDs found: {len(self.used_ids)}\n\n")
            
            f.write("\nDEFINITELY UNUSED SELECTORS:\n")
            f.write("=" * 80 + "\n")
            for selector in sorted(unused_selectors.keys()):
                f.write(f"{selector}\n")
            
            f.write("\n\nPOTENTIALLY UNUSED SELECTORS (may be in scoped styles):\n")
            f.write("=" * 80 + "\n")
            for selector in sorted(potentially_unused.keys()):
                f.write(f"{selector}\n")
            
            f.write("\n\nALL USED CLASSES:\n")
            f.write("=" * 80 + "\n")
            for cls in sorted(self.used_classes):
                f.write(f".{cls}\n")
            
            f.write("\n\nALL USED IDS:\n")
            f.write("=" * 80 + "\n")
            for id_val in sorted(self.used_ids):
                f.write(f"#{id_val}\n")
        
        print(f"\n📝 Detailed report saved to: {report_file}")
        print("\n" + "=" * 80)
        
        return unused_selectors, potentially_unused

if __name__ == '__main__':
    project_root = Path(__file__).parent.parent
    analyzer = CSSCleanup(project_root)
    unused, potentially = analyzer.analyze()
    
    print("\n✅ Analysis complete!")
    print("📋 Review the report file for detailed findings.")
    print("⚠️  Manual review recommended before removing any CSS rules.")

