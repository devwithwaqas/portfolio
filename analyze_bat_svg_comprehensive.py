"""
COMPREHENSIVE BAT SVG ANALYSIS
Extract all components with their actual coordinates and text content
"""

import xml.etree.ElementTree as ET
import re
import json

def analyze_bat_svg():
    """Analyze the BAT SVG to get all components with their actual coordinates"""
    
    print("COMPREHENSIVE BAT SVG ANALYSIS")
    print("=" * 80)
    
    # Parse the SVG
    tree = ET.parse('public/assets/diagrams/BAT_InhouseApp_C4_Diagram.svg')
    root = tree.getroot()
    
    # Get SVG dimensions
    svg_width = float(root.get('width', '27681.25px').replace('px', ''))
    svg_height = float(root.get('height', '11856.25px').replace('px', ''))
    
    print(f"SVG Dimensions: {svg_width} x {svg_height}")
    
    # Find ALL rectangles with their text content
    all_components = []
    
    for rect in root.iter('{http://www.w3.org/2000/svg}rect'):
        x = float(rect.get('x', 0))
        y = float(rect.get('y', 0))
        width = float(rect.get('width', 0))
        height = float(rect.get('height', 0))
        
        # Only include substantial rectangles
        if width > 50 and height > 30:
            # Find text within this rectangle
            text_content = []
            for text in root.iter('{http://www.w3.org/2000/svg}text'):
                text_x = float(text.get('x', 0))
                text_y = float(text.get('y', 0))
                text_text = text.text or ''
                
                if (x <= text_x <= x + width and y <= text_y <= y + height and text_text.strip()):
                    text_content.append(text_text.strip())
            
            # Create a clean text representation
            clean_text = ' '.join(text_content).lower()
            
            all_components.append({
                'x': x, 'y': y, 'width': width, 'height': height,
                'text_content': text_content,
                'clean_text': clean_text,
                'full_text': ' '.join(text_content)
            })
    
    print(f"Found {len(all_components)} components in SVG")
    
    # Sort by position for better analysis
    all_components.sort(key=lambda c: (c['y'], c['x']))
    
    print(f"\nALL COMPONENTS WITH THEIR ACTUAL COORDINATES:")
    print("=" * 80)
    
    for i, comp in enumerate(all_components):
        print(f"{i+1:2d}. ({comp['x']:8.1f}, {comp['y']:8.1f}, {comp['width']:6.1f}x{comp['height']:6.1f}) - {comp['full_text']}")
    
    # Now let's create a proper mapping based on the actual components
    print(f"\nCREATING PROPER MAPPING BASED ON ACTUAL COMPONENTS:")
    print("=" * 80)
    
    # Define what we're looking for based on the narration steps
    narration_mappings = {
        # User steps (2-4)
        "BAT Employee - Primary User": {"keywords": ["bat", "employee"], "expected_text": "BAT Employee"},
        "System Administrator - Platform Management": {"keywords": ["system", "administrator"], "expected_text": "System Administrator"},
        "Business Analyst - Analytics & Intelligence": {"keywords": ["business", "analyst"], "expected_text": "Business Analyst"},
        
        # Frontend steps (5-9)
        "Enterprise Frontend Portal - Unified Interface": {"keywords": ["enterprise", "frontend", "portal"], "expected_text": "Enterprise Frontend Portal"},
        "Angular Portal - Desktop Enterprise Access": {"keywords": ["angular", "portal"], "expected_text": "Angular Portal"},
        "Mobile PWA - Mobile Enterprise Access": {"keywords": ["mobile", "pwa"], "expected_text": "Mobile PWA"},
        "Admin Dashboard - Administrative Interface": {"keywords": ["admin", "dashboard"], "expected_text": "Admin Dashboard"},
        "Analytics Dashboard - Business Intelligence": {"keywords": ["analytics", "dashboard"], "expected_text": "Analytics Dashboard"},
        
        # Gateway steps (10-13)
        "Azure API Gateway - State-of-the-Art API Management": {"keywords": ["azure", "api", "gateway"], "expected_text": "Azure API Gateway"},
        "API Management - API Gateway with ARM Templates": {"keywords": ["api", "management"], "expected_text": "API Management"},
        "Application Gateway - Load Balancer & Routing": {"keywords": ["application", "gateway"], "expected_text": "Application Gateway"},
        "Security Gateway - OAuth 2.0 & JWT Validation": {"keywords": ["security", "gateway"], "expected_text": "Security Gateway"},
        
        # Service steps (14-21)
        "Azure Service Fabric Microservices - Core Business Logic": {"keywords": ["azure", "service", "fabric"], "expected_text": "Azure Service Fabric Microservices"},
        "Authentication Service - OAuth 2.0 & JWT": {"keywords": ["authentication", "service"], "expected_text": "Authentication Service"},
        "HR Management Service - Employee Data & Workflows": {"keywords": ["hr", "management", "service"], "expected_text": "HR Management Service"},
        "IT Service Management - IT Support & Tickets": {"keywords": ["it", "service", "management"], "expected_text": "IT Service Management"},
        "Analytics Service - Business Intelligence": {"keywords": ["analytics", "service"], "expected_text": "Analytics Service"},
        "Integration Service - System Integrations": {"keywords": ["integration", "service"], "expected_text": "Integration Service"},
        "Notification Service - Multi-Channel Alerts": {"keywords": ["notification", "service"], "expected_text": "Notification Service"},
        "Saga Orchestrator - Distributed Transactions": {"keywords": ["saga", "orchestrator"], "expected_text": "Saga Orchestrator"},
        
        # External steps (42-50)
        "SAP Planet 8/9 - ERP System Integration": {"keywords": ["sap", "planet"], "expected_text": "SAP Planet 8/9"},
        "Cherwell HR - HR Management Integration": {"keywords": ["cherwell", "hr"], "expected_text": "Cherwell HR"},
        "Cherwell IT - IT Service Management Integration": {"keywords": ["cherwell", "it"], "expected_text": "Cherwell IT"},
        "Power Apps - Low-Code Platform Integration": {"keywords": ["power", "apps"], "expected_text": "Power Apps"},
        "SharePoint - Document Management Integration": {"keywords": ["sharepoint"], "expected_text": "SharePoint"},
        "Microsoft Teams - Communication Integration": {"keywords": ["microsoft", "teams"], "expected_text": "Microsoft Teams"},
        "Azure AD - Identity Provider Integration": {"keywords": ["azure", "ad"], "expected_text": "Azure AD"},
        "Azure Data Lake - Data Storage Integration": {"keywords": ["azure", "data", "lake"], "expected_text": "Azure Data Lake"}
    }
    
    # Create the correct mapping
    correct_mapping = {}
    
    for step_title, config in narration_mappings.items():
        best_match = None
        best_score = 0
        
        for comp in all_components:
            # Calculate match score based on keyword presence
            score = 0
            for keyword in config["keywords"]:
                if keyword in comp["clean_text"]:
                    score += 1
            
            # Bonus for exact matches
            if any(keyword in comp["clean_text"] for keyword in config["keywords"]):
                score += 0.5
            
            if score > best_score:
                best_score = score
                best_match = comp
        
        if best_match and best_score > 0:
            correct_mapping[step_title] = {
                'x': best_match['x'],
                'y': best_match['y'],
                'width': best_match['width'],
                'height': best_match['height'],
                'text': best_match['full_text'],
                'score': best_score
            }
            print(f"[OK] {step_title}")
            print(f"   Matches: {best_match['full_text']} (score: {best_score})")
            print(f"   Coords: ({best_match['x']:8.1f}, {best_match['y']:8.1f}, {best_match['width']:6.1f}x{best_match['height']:6.1f})")
            print()
        else:
            print(f"[FAIL] {step_title} - NO MATCH FOUND")
            print()
    
    # Save the correct mapping
    with open('bat_svg_analysis.json', 'w', encoding='utf-8') as f:
        json.dump({
            'svg_dimensions': {'width': svg_width, 'height': svg_height},
            'all_components': all_components,
            'correct_mapping': correct_mapping
        }, f, indent=2, ensure_ascii=False)
    
    print(f"Analysis saved to: bat_svg_analysis.json")
    
    return correct_mapping, all_components

if __name__ == "__main__":
    analyze_bat_svg()