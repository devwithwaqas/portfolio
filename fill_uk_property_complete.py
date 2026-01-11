#!/usr/bin/env python3
"""
Complete script to fill all sections of UKPropertyManagementPage.vue
"""

import re
from pathlib import Path

vue_file = Path("src/views/projects/UKPropertyManagementPage.vue")
html_file = Path(r"c:\inetpub\portfolio\uk-property-management.html")

if not vue_file.exists():
    print(f"Error: {vue_file} not found")
    exit(1)

if not html_file.exists():
    print(f"Error: {html_file} not found")
    exit(1)

vue_content = vue_file.read_text(encoding='utf-8')
html_content = html_file.read_text(encoding='utf-8')

# Extract title
title_match = re.search(r'<h1>(.*?)</h1>', html_content)
title = title_match.group(1).strip() if title_match else "UK Property Management Platform - Azure-Based Residential Property System"

# Extract description
desc_match = re.search(r'<strong>Comprehensive Azure-based property management platform</strong>(.*?)(?:<h3|</p>)', html_content, re.DOTALL)
if desc_match:
    description = re.sub(r'<[^>]+>', '', desc_match.group(1)).strip()
    description = "Comprehensive Azure-based property management platform " + description
else:
    description = "Azure-based property management platform developed for the UK's largest residential property landlord, managing a portfolio valued at over £3 billion with 9,000+ properties."

# Extract technologies
azure_techs = []
dev_techs = []

# Azure Cloud Services
azure_section = re.search(r'<h5>Azure Cloud Services</h5>.*?<ul>(.*?)</ul>', html_content, re.DOTALL)
if azure_section:
    azure_items = re.findall(r'<li><strong>(.*?)</strong>.*?</li>', azure_section.group(1))
    azure_techs = [item.strip() for item in azure_items]

# Development & Integration
dev_section = re.search(r'<h5>Development & Integration</h5>.*?<ul>(.*?)</ul>', html_content, re.DOTALL)
if dev_section:
    dev_items = re.findall(r'<li><strong>(.*?)</strong>.*?</li>', dev_section.group(1))
    dev_techs = [item.strip() for item in dev_items]

# Extract key features
features_section = re.search(r'<h3>📊 Key Features & Modules</h3>.*?<ul>(.*?)</ul>', html_content, re.DOTALL)
key_features = []
if features_section:
    feature_items = re.findall(r'<li><strong>(.*?):</strong>(.*?)</li>', features_section.group(1))
    key_features = [f"{item[0].strip()}: {re.sub(r'<[^>]+>', '', item[1]).strip()}" for item in feature_items]

# Extract performance metrics
performance_section = re.search(r'<h3>⚡ Performance & Benefits</h3>.*?<ul>(.*?)</ul>', html_content, re.DOTALL)
performance_points = []
if performance_section:
    perf_items = re.findall(r'<li><strong>(.*?):</strong>(.*?)</li>', performance_section.group(1))
    performance_points = [f"{item[0].strip()}: {re.sub(r'<[^>]+>', '', item[1]).strip()}" for item in perf_items]

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

# Extract overview text
overview_match = re.search(r'<h3>🚀 Project Overview</h3>.*?<p>(.*?)</p>', html_content, re.DOTALL)
overview_text = ""
if overview_match:
    overview_text = re.sub(r'<[^>]+>', '', overview_match.group(1)).strip()

# Extract system architecture
property_features = []
azure_features = []

property_section = re.search(r'<h5>Property Management Core</h5>.*?<ul>(.*?)</ul>', html_content, re.DOTALL)
if property_section:
    property_items = re.findall(r'<li><strong>(.*?):</strong>(.*?)</li>', property_section.group(1))
    property_features = [f"{item[0].strip()}: {re.sub(r'<[^>]+>', '', item[1]).strip()}" for item in property_items]

azure_int_section = re.search(r'<h5>Azure Integration Services</h5>.*?<ul>(.*?)</ul>', html_content, re.DOTALL)
if azure_int_section:
    azure_int_items = re.findall(r'<li><strong>(.*?):</strong>(.*?)</li>', azure_int_section.group(1))
    azure_features = [f"{item[0].strip()}: {re.sub(r'<[^>]+>', '', item[1]).strip()}" for item in azure_int_items]

print(f"Extracted: {len(azure_techs)} Azure techs, {len(dev_techs)} dev techs, {len(key_features)} features")

# Build technologies array for Vue
tech_array_items = []
tech_categories = {
    'TECH_CATEGORIES.BACKEND': ['NET Core', 'ASP.NET Core', 'Entity Framework', 'RESTful'],
    'TECH_CATEGORIES.FRONTEND': ['Angular', 'TypeScript'],
    'TECH_CATEGORIES.CLOUD': ['Azure Functions', 'Azure Logic Apps', 'Azure Service Bus', 'Azure App Service', 'Azure SQL', 'Azure Storage', 'Azure Key Vault', 'Azure Application Insights', 'Azure DevOps', 'Azure Container', 'Azure Active Directory'],
    'TECH_CATEGORIES.DATABASE': ['Azure SQL Database', 'SQL Database'],
    'TECH_CATEGORIES.DEVOPS': ['Azure DevOps', 'Docker', 'Azure Container Registry']
}

all_techs = azure_techs + dev_techs
for tech in all_techs:
    tech_clean = tech.replace(' - ', ' ').strip()
    category = 'TECH_CATEGORIES.CLOUD'
    
    if any(f in tech_clean for f in ['Angular', 'TypeScript']):
        category = 'TECH_CATEGORIES.FRONTEND'
    elif any(a in tech_clean for a in ['Azure Functions', 'Azure Logic Apps', 'Azure Service Bus', 'Azure App Service', 'Azure SQL', 'Azure Storage', 'Azure Key Vault', 'Azure Application Insights', 'Azure DevOps', 'Azure Container', 'Azure Active Directory']):
        if 'DevOps' in tech_clean or 'Docker' in tech_clean or 'Container' in tech_clean:
            category = 'TECH_CATEGORIES.DEVOPS'
        elif 'SQL' in tech_clean or 'Database' in tech_clean:
            category = 'TECH_CATEGORIES.DATABASE'
        else:
            category = 'TECH_CATEGORIES.CLOUD'
    elif any(d in tech_clean for d in ['SQL Database', 'Database']):
        category = 'TECH_CATEGORIES.DATABASE'
    elif any(b in tech_clean for b in ['NET Core', 'ASP.NET', 'Entity Framework', 'RESTful']):
        category = 'TECH_CATEGORIES.BACKEND'
    
    tech_array_items.append(f"      {{ name: \"{tech_clean}\", description: \"{tech_clean} for UK property management\", category: {category} }}")

tech_array_str = ",\n".join(tech_array_items)

# 1. Update projectData title and description
title_escaped = title.replace("'", "\\'")
vue_content = re.sub(
    r"(const projectData = ref\(\{[^}]*title: ')([^']*)(')",
    f"\\1{title_escaped}\\3",
    vue_content
)

desc_escaped = description.replace("'", "\\'")
vue_content = re.sub(
    r"(description: ')(Azure-based property.*?)(\.')",
    f"\\1{desc_escaped}\\3",
    vue_content,
    flags=re.DOTALL
)

# 2. Update achievements with actual values
achievements_col1 = """      achievementsCol1: [
        { emoji: 'enterprise', label: 'Properties Managed', value: '9,000+' },
        { emoji: 'financial', label: 'Portfolio Value', value: '£3B+' }
      ],"""
achievements_col2 = """      achievementsCol2: [
        { emoji: 'success', label: 'Tenant Satisfaction', value: '80% improvement' },
        { emoji: 'cloud', label: 'System Uptime', value: '99.9%' }
      ]"""

vue_content = re.sub(
    r"achievementsCol1: \[.*?\],",
    achievements_col1,
    vue_content,
    flags=re.DOTALL
)
vue_content = re.sub(
    r"achievementsCol2: \[.*?\],",
    achievements_col2,
    vue_content,
    flags=re.DOTALL
)

# 3. Update technologies
tech_pattern = r"const technologies = ref\(\[.*?\]\)"
tech_replacement = f"const technologies = ref([\n{tech_array_str}\n    ])"
vue_content = re.sub(tech_pattern, tech_replacement, vue_content, flags=re.DOTALL)

# 4. Update project overview description
overview_full = f"""UK Property Management Platform - Azure-Based Residential Property System

The Challenge:
Property management companies require comprehensive portfolio management, tenant services, maintenance tracking, and financial operations. The platform must handle complex property workflows, maintain regulatory compliance, and provide scalable solutions for managing large property portfolios valued at over £3 billion with 9,000+ properties.

The Solution:
Azure-based property management platform built with .NET Core and Angular, deployed entirely on Microsoft Azure cloud infrastructure. Features comprehensive property management, tenant services, maintenance tracking, and financial operations capabilities. The system leverages Azure Functions for serverless processing, Logic Apps for workflow automation, and Service Bus for event-driven architecture.

Key Features:
{chr(10).join('• ' + feature for feature in key_features[:10])}

Technical Architecture:
Built with .NET Core Web API backend, Angular frontend, Azure SQL Database, and comprehensive Azure cloud services including Azure Functions, Logic Apps, Service Bus, and App Services. Features microservices architecture, serverless processing, event-driven workflows, and comprehensive Azure integration for scalable property management operations.

Business Impact:
{business_impact if business_impact else 'The UK Property Management Platform has successfully transformed property management operations for the UK\'s largest listed residential landlord, managing a portfolio valued at over £3 billion with more than 9,000 homes. The system significantly improves operational efficiency, reduces manual processes, and enhances tenant satisfaction while providing robust Azure cloud infrastructure for reliable and scalable operations.'}"""

overview_escaped = overview_full.replace('`', '\\`')
vue_content = re.sub(
    r"(const projectOverviewData = ref\(\{[^}]*description: `)(.*?)(`\s*\}\)\))",
    f"\\1{overview_escaped}\\3",
    vue_content,
    flags=re.DOTALL
)

# 5. Update client and project date from project_info
if 'Client' in project_info:
    vue_content = re.sub(r'client="Confidential UK Property Client"', f'client="{project_info["Client"]}"', vue_content)
if 'Project Date' in project_info:
    vue_content = re.sub(r'projectDate="TBD"', f'projectDate="{project_info["Project Date"]}"', vue_content)

# 6. Update architecture layers
architecture_layers = """    const architectureLayers = ref([
      {
        icon: 'portal',
        title: 'Frontend Application Layer',
        description: 'Angular-based web application providing comprehensive property management interface with portfolio management, tenant portal, maintenance tracking, and financial operations. Features responsive design, real-time updates, and comprehensive analytics visualization.',
        features: [
          {
            icon: 'angular',
            name: 'Angular Frontend Application',
            description: 'Modern Angular application built with TypeScript providing comprehensive property management interface. Features portfolio management modules, tenant portal, maintenance tracking workflows, financial operations, and real-time analytics. Implements responsive design patterns, secure authentication, and comprehensive API integration for seamless backend communication.'
          },
          {
            icon: 'portal',
            name: 'Tenant Portal',
            description: 'Self-service tenant interface enabling tenants to manage accounts, submit maintenance requests, view documents, and communicate with property management. Features secure authentication, document management, payment processing, and comprehensive tenant information access.'
          }
        ]
      },
      {
        icon: 'cloud',
        title: 'Azure Serverless & Integration Services',
        description: 'Azure Functions, Logic Apps, and Service Bus providing serverless processing, workflow automation, and event-driven architecture.',
        features: [
          {
            icon: 'cloud',
            name: 'Azure Functions',
            description: 'Serverless compute service handling property management workflows, automated notifications, maintenance scheduling, financial calculations, and event-driven processing. Features automatic scaling, pay-per-use pricing, and comprehensive Azure integration for efficient property management operations.'
          },
          {
            icon: 'cloud',
            name: 'Azure Logic Apps',
            description: 'Workflow automation service providing business process orchestration, integration workflows, approval processes, scheduled tasks, and conditional logic. Features visual workflow design, comprehensive connector library, and seamless Azure service integration.'
          },
          {
            icon: 'cloud',
            name: 'Azure Service Bus',
            description: 'Message queuing and event processing service providing reliable messaging, asynchronous processing, pub/sub patterns, and dead letter queues. Features guaranteed message delivery, message ordering, and comprehensive event-driven architecture support.'
          }
        ]
      },
      {
        icon: 'api',
        title: 'Backend API Services Layer',
        description: '.NET Core Web API microservices providing property management, tenant services, maintenance tracking, and financial operations services.',
        features: [
          {
            icon: 'api',
            name: 'Property Management API',
            description: 'RESTful API service handling portfolio management, property tracking, tenant management, and property lifecycle operations. Features comprehensive property data management, tenant relationship management, and property analytics.'
          },
          {
            icon: 'api',
            name: 'Maintenance Management API',
            description: 'Microservice handling maintenance request processing, scheduling, tracking, and resolution workflows. Features automated maintenance workflows, contractor management, and maintenance analytics.'
          },
          {
            icon: 'database',
            name: 'Data Access Layer',
            description: 'Entity Framework Core data access layer with Azure SQL Database providing efficient data persistence, query optimization, and comprehensive data modeling for property management operations.'
          }
        ]
      },
      {
        icon: 'cloud',
        title: 'Azure Cloud Infrastructure',
        description: 'Azure cloud services providing scalable hosting, database services, storage, and comprehensive cloud infrastructure.',
        features: [
          {
            icon: 'cloud',
            name: 'Azure App Service',
            description: 'Cloud hosting platform for scalable web application deployment with auto-scaling, load balancing, and high availability. Features automated deployment, health monitoring, and comprehensive Azure integration.'
          },
          {
            icon: 'database',
            name: 'Azure SQL Database',
            description: 'Fully managed cloud database service with high availability, automated backups, and comprehensive security features. Features elastic scaling, geo-replication, and advanced monitoring capabilities for property management data.'
          },
          {
            icon: 'cloud',
            name: 'Azure Storage',
            description: 'Blob storage service for document and media management providing scalable storage, secure access, and comprehensive file management. Features tiered storage, lifecycle management, and comprehensive security features.'
          }
        ]
      }
    ])"""

vue_content = re.sub(
    r"const architectureLayers = ref\(\[.*?\]\)",
    architecture_layers,
    vue_content,
    flags=re.DOTALL
)

# 7. Update architecture benefits
architecture_benefits = """    const architectureBenefits = ref("The UK Property Management Platform architecture demonstrates enterprise-grade property management with Azure-native design, serverless processing, and comprehensive cloud infrastructure. The platform features scalable property management capabilities managing 9,000+ properties worth over £3 billion with 60% reduction in manual processes, 80% improvement in tenant satisfaction, and 99.9% system uptime. Angular frontend provides responsive user experience with real-time updates and comprehensive analytics. Azure Functions enable serverless processing for efficient property management workflows. Azure Logic Apps provide workflow automation for business process orchestration. Azure Service Bus enables event-driven architecture with reliable messaging. Azure cloud infrastructure provides scalable hosting, automated deployment, and comprehensive monitoring. This architecture successfully supports enterprise property management operations for the UK's largest listed residential landlord.")"""

vue_content = re.sub(
    r"const architectureBenefits = ref\(\"[^\"]*\"\)",
    architecture_benefits,
    vue_content,
    flags=re.DOTALL
)

# 8. Add engineering challenges
engineering_challenges = """    const engineeringChallenges = ref([
      {
        icon: 'cloud',
        title: 'Azure Serverless Architecture & Scalability',
        problem: 'Designing and implementing scalable serverless architecture for managing 9,000+ properties with complex workflows, real-time processing requirements, and varying load patterns. Required efficient serverless design, workflow automation, and optimal Azure service integration.',
        solutions: [
          {
            icon: 'cloud',
            name: 'Azure Functions Serverless Processing',
            description: 'Implemented serverless compute with Azure Functions for property management workflows, automated notifications, maintenance scheduling, and financial calculations. Features automatic scaling, pay-per-use pricing, and event-driven processing achieving efficient property management operations with 60% reduction in manual processes.'
          },
          {
            icon: 'cloud',
            name: 'Azure Logic Apps Workflow Automation',
            description: 'Built comprehensive workflow automation with Azure Logic Apps providing business process orchestration, integration workflows, approval processes, and scheduled tasks. Features visual workflow design, comprehensive connector library, and seamless Azure service integration enabling efficient property management workflows.'
          }
        ]
      },
      {
        icon: 'cloud',
        title: 'Event-Driven Architecture & Service Bus Integration',
        problem: 'Implementing reliable event-driven architecture for property management operations with message queuing, asynchronous processing, and event coordination across multiple Azure services. Required reliable messaging, event processing, and comprehensive service integration.',
        solutions: [
          {
            icon: 'cloud',
            name: 'Azure Service Bus Messaging',
            description: 'Implemented reliable message queuing with Azure Service Bus providing guaranteed message delivery, asynchronous processing, pub/sub patterns, and dead letter queues. Features message ordering, retry policies, and comprehensive event-driven architecture support ensuring reliable property management operations.'
          },
          {
            icon: 'api',
            name: 'Event-Driven Microservices',
            description: 'Designed event-driven microservices architecture with Azure Functions and Service Bus integration. Features event publishing, event consumption, and comprehensive event coordination enabling efficient property management workflows and real-time updates.'
          }
        ]
      },
      {
        icon: 'database',
        title: 'Large-Scale Data Management & Performance',
        problem: 'Managing large-scale property data for 9,000+ properties with complex queries, high transaction volumes, and performance requirements. Required efficient database design, query optimization, and scalable data management.',
        solutions: [
          {
            icon: 'database',
            name: 'Azure SQL Database Optimization',
            description: 'Optimized Azure SQL Database with efficient indexing, query optimization, and elastic scaling capabilities. Features connection pooling, efficient data modeling, and comprehensive performance monitoring ensuring optimal performance for large-scale property management operations.'
          },
          {
            icon: 'cloud',
            name: 'Azure Storage for Documents',
            description: 'Implemented Azure Blob Storage for document and media management providing scalable storage, secure access, and comprehensive file management. Features tiered storage, lifecycle management, and efficient document processing for property management operations.'
          }
        ]
      }
    ])"""

vue_content = re.sub(
    r"const engineeringChallenges = ref\(\[.*?\]\)",
    engineering_challenges,
    vue_content,
    flags=re.DOTALL
)

# 9. Update business impact results
business_impact = """    const businessImpactResults = ref("These engineering solutions delivered transformative results for the UK's largest listed residential landlord: 60% reduction in manual processes through Azure Functions and Logic Apps automation, 80% improvement in tenant satisfaction through enhanced user experience and self-service capabilities, 45% faster rent collection processing with automated financial workflows, 70% faster maintenance request resolution through automated maintenance management, 40% reduction in operational costs through automation and process optimization, and 99.9% system uptime with Azure SLA guarantees. The Azure serverless architecture enabled scalable property management for 9,000+ properties worth over £3 billion. Azure Functions and Logic Apps revolutionized workflow automation with serverless processing and visual workflow design. Azure Service Bus enabled reliable event-driven architecture with guaranteed message delivery. The platform successfully transformed property management operations providing comprehensive portfolio management, tenant services, and operational automation through Azure cloud services.")"""

vue_content = re.sub(
    r"const businessImpactResults = ref\(\"[^\"]*\"\)",
    business_impact,
    vue_content,
    flags=re.DOTALL
)

# 10. Update performance stats
performance_stats = """    const performanceStats = ref([
      {
        value: '9,000+',
        label: 'Properties Managed',
        color: 'green'
      },
      {
        value: '£3B+',
        label: 'Portfolio Value',
        color: 'blue'
      },
      {
        value: '80%',
        label: 'Tenant Satisfaction',
        color: 'purple'
      },
      {
        value: '99.9%',
        label: 'System Uptime',
        color: 'teal'
      }
    ])"""

vue_content = re.sub(
    r"const performanceStats = ref\(\[.*?\]\)",
    performance_stats,
    vue_content,
    flags=re.DOTALL
)

# 11. Add performance charts
performance_charts = """    const performanceCharts = ref([
      {
        id: 'propertyPerformanceChart',
        type: 'doughnut',
        title: 'Property Management Operations Distribution',
        icon: 'performance',
        width: 'half',
        data: {
          labels: ['Portfolio Management', 'Tenant Services', 'Maintenance', 'Financial Operations', 'Document Management', 'Analytics'],
          datasets: [{
            data: [25, 20, 18, 15, 12, 10],
            backgroundColor: ['#0ea2bd', '#ff6b35', '#28a745', '#6f42c1', '#ffc107', '#17a2b8'],
            borderWidth: 3,
            borderColor: '#ffffff',
            hoverOffset: 15
          }]
        },
        options: {
          interaction: { mode: 'point' },
          plugins: {
            legend: {
              position: 'bottom',
              align: 'center',
              labels: {
                padding: 15,
                usePointStyle: true,
                pointStyle: 'circle',
                font: { size: 12, weight: '500' },
                color: '#374151',
                boxWidth: 12,
                boxHeight: 12
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 12,
              titleFont: { size: 14, weight: 'bold' },
              bodyFont: { size: 12 },
              displayColors: true,
              callbacks: {
                label: (context) => {
                  const label = context.label || ''
                  const value = context.parsed || 0
                  return `${label}: ${value}%`
                }
              }
            }
          },
          maintainAspectRatio: false,
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1500,
            easing: 'easeInOutQuart'
          }
        }
      },
      {
        id: 'propertyMetricsChart',
        type: 'line',
        title: 'Property Management Performance Trends',
        icon: 'analytics',
        width: 'half',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
          datasets: [
            {
              label: 'Operational Efficiency',
              data: [100, 115, 130, 150, 160, 160],
              borderColor: '#0ea2bd',
              backgroundColor: 'rgba(14, 162, 189, 0.1)',
              fill: true,
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 8,
              pointBackgroundColor: '#0ea2bd',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2
            },
            {
              label: 'Tenant Satisfaction',
              data: [100, 120, 140, 160, 175, 180],
              borderColor: '#ff6b35',
              backgroundColor: 'rgba(255, 107, 53, 0.1)',
              fill: true,
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 8,
              pointBackgroundColor: '#ff6b35',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                padding: 15,
                font: { size: 12, weight: '500' },
                color: '#374151'
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 12,
              titleFont: { size: 14, weight: 'bold' },
              bodyFont: { size: 12 }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: { size: 11 },
                color: '#6B7280',
                callback: function(value) {
                  return value + '%'
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: { size: 11 },
                color: '#6B7280'
              }
            }
          },
          animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
          }
        }
      },
      {
        id: 'propertySuccessChart',
        type: 'bar',
        title: 'Property Management Success Metrics',
        icon: 'success',
        width: 'full',
        data: {
          labels: ['Properties Managed', 'Portfolio Value', 'Tenant Satisfaction', 'System Uptime', 'Operational Efficiency', 'Cost Reduction'],
          datasets: [{
            label: 'Success Metrics',
            data: [9000, 3, 80, 99.9, 60, 40],
            backgroundColor: [
              'rgba(14, 162, 189, 0.8)',
              'rgba(255, 107, 53, 0.8)',
              'rgba(40, 167, 69, 0.8)',
              'rgba(111, 66, 193, 0.8)',
              'rgba(255, 193, 7, 0.8)',
              'rgba(23, 162, 184, 0.8)'
            ],
            borderColor: [
              '#0ea2bd',
              '#ff6b35',
              '#28a745',
              '#6f42c1',
              '#ffc107',
              '#17a2b8'
            ],
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 12,
              titleFont: { size: 14, weight: 'bold' },
              bodyFont: { size: 12 },
              callbacks: {
                label: (context) => {
                  const value = context.parsed.y
                  const label = context.label || ''
                  if (label.includes('Properties')) {
                    return `${label}: ${value.toLocaleString()}+`
                  } else if (label.includes('Portfolio Value')) {
                    return `${label}: £${value}B+`
                  } else if (label.includes('Uptime')) {
                    return `${label}: ${value}%`
                  } else if (label.includes('Satisfaction') || label.includes('Efficiency') || label.includes('Reduction')) {
                    return `${label}: ${value}% improvement`
                  } else {
                    return `${label}: ${value}`
                  }
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: { size: 11 },
                color: '#6B7280'
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: { size: 11 },
                color: '#6B7280'
              }
            }
          },
          animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
          }
        }
      }
    ])"""

vue_content = re.sub(
    r"const performanceCharts = ref\(\[.*?\]\)",
    performance_charts,
    vue_content,
    flags=re.DOTALL
)

# 12. Add metrics framework
metrics_framework = """    const metricsFrameworkData = ref({
      introduction: 'The UK Property Management Platform employs a comprehensive metrics framework to measure portfolio performance, tenant satisfaction, operational efficiency, system reliability, and financial effectiveness for large-scale property management operations.',
      metricsCategories: [
        {
          icon: 'performance',
          title: 'Portfolio & Operational Performance Metrics',
          metrics: [
            {
              icon: 'enterprise',
              name: 'Properties Managed (9,000+)',
              measurementMethod: 'Portfolio tracking using property management system and database analytics. Monitors total properties under management, property types, geographic distribution, and portfolio growth trends.',
              context: 'Critical for property management operations where portfolio scale indicates system capability and business growth. Large portfolio management demonstrates scalable architecture and efficient property management capabilities.',
              validation: 'Successfully manages 9,000+ properties worth over £3 billion through Azure cloud infrastructure, scalable architecture, and efficient property management workflows demonstrating enterprise-scale property management capabilities.'
            },
            {
              icon: 'performance',
              name: 'Operational Efficiency (60% reduction)',
              measurementMethod: 'Operational process tracking using workflow analytics and automation metrics. Monitors manual process reduction, automation efficiency, and overall operational cost savings.',
              context: 'Essential for property management profitability where operational efficiency improves margins, enables competitive pricing, and supports business growth. Reduced manual processes are critical for scalable property management operations.',
              validation: 'Implemented through Azure Functions and Logic Apps automation, workflow optimization, and process automation achieving 60% reduction in manual processes with improved efficiency and productivity.'
            }
          ]
        },
        {
          icon: 'success',
          title: 'Tenant Experience & Satisfaction Metrics',
          metrics: [
            {
              icon: 'success',
              name: 'Tenant Satisfaction (80% improvement)',
              measurementMethod: 'Tenant satisfaction tracking using surveys, feedback analysis, and tenant experience metrics. Monitors tenant satisfaction scores, Net Promoter Score (NPS), and tenant feedback trends.',
              context: 'Critical for property management business success where high tenant satisfaction drives retention, referrals, and business growth. Enhanced tenant experience is essential for competitive property management operations.',
              validation: 'Achieved through improved user interface, self-service capabilities, faster processing, real-time updates, and comprehensive tenant portal features resulting in 80% improvement in tenant satisfaction scores.'
            },
            {
              icon: 'performance',
              name: 'Maintenance Request Resolution (70% faster)',
              measurementMethod: 'Maintenance processing time tracking using workflow analytics and maintenance management system metrics. Monitors request intake time, resolution duration, and maintenance workflow efficiency.',
              context: 'Essential for property management operations where faster maintenance resolution improves tenant satisfaction, reduces property damage, and enables efficient property maintenance. Reduced processing time is critical for competitive property management services.',
              validation: 'Implemented through automated maintenance workflows, efficient scheduling, contractor management, and optimized maintenance processing achieving 70% faster maintenance request resolution with improved tenant satisfaction.'
            }
          ]
        },
        {
          icon: 'financial',
          title: 'Financial & System Reliability Metrics',
          metrics: [
            {
              icon: 'financial',
              name: 'Rent Collection Processing (45% faster)',
              measurementMethod: 'Financial processing time tracking using financial workflow analytics and payment processing metrics. Monitors rent collection time, invoicing duration, and financial processing efficiency.',
              context: 'Critical for property management financial operations where faster rent collection improves cash flow, reduces outstanding balances, and enables efficient financial management. Reduced processing time is essential for property management profitability.',
              validation: 'Achieved through automated financial workflows, payment processing automation, and efficient invoicing systems resulting in 45% faster rent collection processing with improved cash flow and financial efficiency.'
            },
            {
              icon: 'uptime',
              name: 'System Uptime (99.9%)',
              measurementMethod: 'System availability tracking using Azure Application Insights, health monitoring, and uptime monitoring tools. Measures system availability, downtime incidents, and service reliability metrics.',
              context: 'Essential for enterprise property management operations where high system availability ensures continuous service delivery, prevents business disruption, and maintains tenant trust. High uptime is critical for property management business operations.',
              validation: 'Implemented through Azure cloud infrastructure, automated monitoring, high availability configuration, health checks, and comprehensive error tracking achieving 99.9% system uptime with Azure SLA guarantees.'
            },
            {
              icon: 'financial',
              name: 'Operational Cost Reduction (40%)',
              measurementMethod: 'Operational cost tracking using process analytics, automation metrics, and cost analysis. Monitors manual process reduction, automation efficiency, and overall operational cost savings.',
              context: 'Essential for property management business profitability where cost reduction improves margins, enables competitive pricing, and supports business growth. Operational efficiency is critical for property management business success.',
              validation: 'Implemented through process automation, workflow optimization, reduced manual processes, and efficient system operations achieving 40% reduction in operational costs with improved efficiency and productivity.'
            }
          ]
        }
      ],
      frameworkItems: [
        {
          title: 'Portfolio Performance Monitoring',
          description: 'Continuous monitoring of portfolio performance, property management efficiency, and operational metrics using Azure Application Insights and performance analytics',
          icon: 'monitoring'
        },
        {
          title: 'Tenant Experience Analytics',
          description: 'Comprehensive analytics for tenant satisfaction, user experience, and tenant feedback using surveys and feedback analysis',
          icon: 'analytics'
        },
        {
          title: 'Financial Operations Monitoring',
          description: 'Real-time monitoring of financial operations, rent collection, and payment processing using financial analytics and workflow tracking',
          icon: 'monitoring'
        },
        {
          title: 'System Reliability Monitoring',
          description: 'Real-time monitoring of system uptime, availability, and reliability using Azure monitoring and health check systems',
          icon: 'monitoring'
        }
      ]
    })"""

vue_content = re.sub(
    r"const metricsFrameworkData = ref\(\{.*?\}\)",
    metrics_framework,
    vue_content,
    flags=re.DOTALL
)

# 13. Add ROI left items (Financial)
roi_left_items = """    const roiLeftItems = ref([
      { label: "Operational Cost Reduction", value: "40%" },
      { label: "Rent Collection Efficiency", value: "45% faster" },
      { label: "Portfolio Value Managed", value: "£3B+" },
      { label: "Cost Savings", value: "$TBD" },
      { label: "ROI on Automation", value: "TBD" }
    ])"""

vue_content = re.sub(
    r"const roiLeftItems = ref\(\[.*?\]\)",
    roi_left_items,
    vue_content,
    flags=re.DOTALL
)

# 14. Add ROI right items (Operational)
roi_right_items = """    const roiRightItems = ref([
      { label: "Properties Managed", value: "9,000+" },
      { label: "Tenant Satisfaction", value: "80% improvement" },
      { label: "Maintenance Resolution", value: "70% faster" },
      { label: "System Uptime", value: "99.9%" },
      { label: "Operational Efficiency", value: "60% reduction" }
    ])"""

vue_content = re.sub(
    r"const roiRightItems = ref\(\[.*?\]\)",
    roi_right_items,
    vue_content,
    flags=re.DOTALL
)

# 15. Add ROI metrics
roi_metrics = """    const roiMetrics = ref([
      { value: "9,000+", label: "Properties", color: "green" },
      { value: "£3B+", label: "Portfolio Value", color: "blue" },
      { value: "80%", label: "Tenant Satisfaction", color: "purple" },
      { value: "99.9%", label: "System Uptime", color: "pink" },
      { value: "60%", label: "Efficiency Gain", color: "cyan" },
      { value: "40%", label: "Cost Reduction", color: "teal" }
    ])"""

vue_content = re.sub(
    r"const roiMetrics = ref\(\[.*?\]\)",
    roi_metrics,
    vue_content,
    flags=re.DOTALL
)

# Write updated content
vue_file.write_text(vue_content, encoding='utf-8')
print("SUCCESS: All UK Property Management page sections filled!")
print(f"   - Title: {title}")
print(f"   - Technologies added: {len(all_techs)}")
print(f"   - Features extracted: {len(key_features)}")
print(f"   - Performance points: {len(performance_points)}")
