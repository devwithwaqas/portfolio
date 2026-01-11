#!/usr/bin/env python3
"""
Script to extract content from valet-parking.html and update ValetParkingPage.vue
Similar to update_g5_pos_content.py
"""

import re
from pathlib import Path

# Read the HTML file
html_file = Path(r"c:\inetpub\portfolio\valet-parking.html")
vue_file = Path("src/views/projects/ValetParkingPage.vue")

if not html_file.exists():
    print(f"Error: {html_file} not found")
    exit(1)

if not vue_file.exists():
    print(f"Error: {vue_file} not found")
    exit(1)

html_content = html_file.read_text(encoding='utf-8')
vue_content = vue_file.read_text(encoding='utf-8')

# Extract title
title_match = re.search(r'<h1>(.*?)</h1>', html_content)
title = title_match.group(1).strip() if title_match else "Valet Parking - Parking Management System"

# Extract description from meta or first paragraph
desc_match = re.search(r'<meta.*?name="description".*?content="(.*?)"', html_content)
if desc_match:
    description = desc_match.group(1).strip()
else:
    desc_match = re.search(r'<strong>Comprehensive parking management system</strong>(.*?)(?:<h3|</p>)', html_content, re.DOTALL)
    if desc_match:
        description = re.sub(r'<[^>]+>', '', desc_match.group(1)).strip()
        description = "Comprehensive parking management system " + description
    else:
        description = "A comprehensive valet parking management solution for Secure Parking UAE located in DIFC Dubai International Financial City."

# Extract technologies
backend_techs = []
frontend_techs = []

# Backend technologies
backend_section = re.search(r'<h5>Backend Technologies</h5>.*?<ul>(.*?)</ul>', html_content, re.DOTALL)
if backend_section:
    backend_items = re.findall(r'<li>(.*?)</li>', backend_section.group(1))
    backend_techs = [item.strip() for item in backend_items]

# Frontend technologies
frontend_section = re.search(r'<h5>Frontend & Desktop</h5>.*?<ul>(.*?)</ul>', html_content, re.DOTALL)
if frontend_section:
    frontend_items = re.findall(r'<li>(.*?)</li>', frontend_section.group(1))
    frontend_techs = [item.strip() for item in frontend_items]

# Extract key features
features_section = re.search(r'<h3>📊 Key Features & Modules</h3>.*?<ul>(.*?)</ul>', html_content, re.DOTALL)
key_features = []
if features_section:
    feature_items = re.findall(r'<li>(.*?)</li>', features_section.group(1))
    key_features = [re.sub(r'<[^>]+>', '', item).strip() for item in feature_items]

# Extract project overview text
overview_match = re.search(r'<h3>🚀 Project Overview</h3>.*?<p>(.*?)</p>', html_content, re.DOTALL)
overview_text = ""
if overview_match:
    overview_text = re.sub(r'<[^>]+>', '', overview_match.group(1)).strip()

# Extract performance/benefits
performance_match = re.search(r'<h3>⚡ Performance & Benefits</h3>.*?<ul>(.*?)</ul>', html_content, re.DOTALL)
performance_points = []
if performance_match:
    perf_items = re.findall(r'<li>(.*?)</li>', performance_match.group(1))
    performance_points = [re.sub(r'<[^>]+>', '', item).strip() for item in perf_items]

# Extract business impact
business_match = re.search(r'<h3>🎯 Business Impact</h3>.*?<p>(.*?)</p>', html_content, re.DOTALL)
business_impact = ""
if business_match:
    business_impact = re.sub(r'<[^>]+>', '', business_match.group(1)).strip()

# Extract project info
project_info_section = re.search(r'<h3>Project Information</h3>.*?<ul>(.*?)</ul>', html_content, re.DOTALL)
project_info = {}
if project_info_section:
    info_items = re.findall(r'<li><strong>(.*?):</strong>\s*(.*?)</li>', project_info_section.group(1))
    for key, value in info_items:
        project_info[key.strip()] = value.strip()

# Build technologies array for Vue
tech_array_items = []
tech_categories = {
    'TECH_CATEGORIES.FRONTEND': ['Angular', 'Bootstrap', 'Chart.js'],
    'TECH_CATEGORIES.BACKEND': ['ASP.NET Core', 'Entity Framework', 'SignalR', 'Azure Functions'],
    'TECH_CATEGORIES.DATABASE': ['SQL Server', 'Redis'],
    'TECH_CATEGORIES.CLOUD': ['Azure', 'Azure Blob Storage', 'Azure App Service']
}

for tech in backend_techs + frontend_techs:
    tech_clean = tech.replace(' for', '').replace(' for ', '').strip()
    category = 'TECH_CATEGORIES.BACKEND'
    if any(f in tech_clean for f in ['Angular', 'Bootstrap', 'Chart.js', 'Desktop']):
        category = 'TECH_CATEGORIES.FRONTEND'
    elif any(d in tech_clean for d in ['Database', 'Redis', 'SQL']):
        category = 'TECH_CATEGORIES.DATABASE'
    elif 'Azure' in tech_clean:
        category = 'TECH_CATEGORIES.CLOUD'
    
    tech_array_items.append(f"      {{ name: \"{tech_clean}\", description: \"Technology for {tech_clean.lower()}\", category: {category} }}")

tech_array_str = ",\n".join(tech_array_items)

# Update projectData title and description  
title_escaped = title.replace("'", "\\'")
vue_content = re.sub(
    r"(const projectData = ref\(\{[^}]*title: ')([^']*)(')",
    f"\\1{title_escaped}\\3",
    vue_content
)

desc_escaped = description.replace("'", "\\'")
vue_content = re.sub(
    r"(description: ')(A comprehensive valet parking.*?)(\.')",
    f"\\1{desc_escaped}\\3",
    vue_content,
    flags=re.DOTALL
)

# Update technologies
tech_pattern = r"const technologies = ref\(\[.*?\]\)"
tech_replacement = f"const technologies = ref([\n{tech_array_str}\n    ])"
vue_content = re.sub(tech_pattern, tech_replacement, vue_content, flags=re.DOTALL)

# Update project overview description
overview_full = f"""Valet Parking Management System for Secure Parking UAE located in DIFC Dubai International Financial City.

The Challenge:
Traditional parking operations face challenges with manual processes, lack of real-time tracking, billing inefficiencies, and limited operational visibility. Secure Parking UAE needed a comprehensive solution that provides automated billing, parking operations management, and real-time monitoring to optimize parking services in one of Dubai's most prestigious financial districts.

The Solution:
The Valet Parking system is a sophisticated desktop-based parking management solution designed specifically for Secure Parking UAE's operations in DIFC. The platform operates through a desktop management interface with web APIs connecting through background services, handling vehicle registration, parking duration tracking, automated billing calculations, and comprehensive reporting.

Key Features:
{chr(10).join('• ' + feature for feature in key_features[:8])}

Technical Architecture:
Built with ASP.NET Core Web API, Angular web dashboard, SQL Server database, Redis caching, SignalR for real-time communication, and Azure cloud services. The system features a desktop management interface for staff operations, web dashboard for monitoring, payment gateway integration, and comprehensive analytics engine.

Business Impact:
{business_impact if business_impact else 'This system significantly improves parking operations through automated billing, enhanced operational efficiency, real-time monitoring, and comprehensive reporting capabilities.'}"""

overview_escaped = overview_full.replace('`', '\\`').replace('$', '\\$')
vue_content = re.sub(
    r"(const projectOverviewData = ref\(\{[^}]*description: `)(.*?)(`\s*\}\)\))",
    f"\\1{overview_escaped}\\3",
    vue_content,
    flags=re.DOTALL
)

# Update client and project date from project_info if available
if 'Client' in project_info:
    vue_content = re.sub(r'client="TBD"', f'client="{project_info["Client"]}"', vue_content)
if 'Date' in project_info:
    vue_content = re.sub(r'projectDate="TBD"', f'projectDate="{project_info["Date"]}"', vue_content)

# Write updated content
vue_file.write_text(vue_content, encoding='utf-8')
print("SUCCESS: Valet Parking page content updated successfully!")
print(f"   - Title: {title}")
print(f"   - Technologies added: {len(backend_techs) + len(frontend_techs)}")
print(f"   - Features extracted: {len(key_features)}")
