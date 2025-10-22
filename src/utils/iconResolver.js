/**
 * Icon Resolver Utility
 * Resolves technology icons from multiple sources with intelligent fuzzy matching:
 * Priority: 1. Devicon > 2. Local Icons > 3. Simple Icons/Other > 4. Emoji Fallback
 */

// Comprehensive mapping of technology names to their icon sources
const ICON_MAP = {
  // .NET Technologies
  '.net core web api': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  '.net core': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  'asp.net core': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  '.net': { type: 'devicon', icon: 'dot-net', local: 'framework.png', fallback: '⚙️' },
  'c#': { type: 'devicon', icon: 'csharp', local: 'C#.svg', fallback: '🔷' },
  'C#': { type: 'devicon', icon: 'csharp', local: 'C#.svg', fallback: '🔷' },
  'csharp': { type: 'devicon', icon: 'csharp', local: 'C#.svg', fallback: '🔷' },
  'c': { type: 'devicon', icon: 'csharp', local: 'C#.svg', fallback: '🔷' },
  'entity framework': { type: 'local', icon: 'entity framework.png', fallback: '🗄️' },
  'task parallel library': { type: 'local', icon: 'task parallel library.png', fallback: '⚙️' },
  'tpl': { type: 'local', icon: 'task parallel library.png', fallback: '⚙️' },
  'mvc architecture': { type: 'local', icon: 'mvc.png', fallback: '🏗️' },
  'mvc': { type: 'local', icon: 'mvc.png', fallback: '🏗️' },
  
  // Databases
  'sql server enterprise': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'sql server': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'sql server database': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'redis cache': { type: 'devicon', icon: 'redis', local: 'Redis.svg', fallback: '💾' },
  'redis': { type: 'devicon', icon: 'redis', local: 'Redis.svg', fallback: '💾' },
  'mysql': { type: 'devicon', icon: 'mysql', local: 'MySQL.svg', fallback: '💾' },
  'postgresql': { type: 'devicon', icon: 'postgresql', local: 'PostgresSQL.svg', fallback: '💾' },
  'mongodb': { type: 'devicon', icon: 'mongodb', local: 'MongoDB.svg', fallback: '💾' },
  'cosmos db': { type: 'local', icon: 'cosmos db.png', fallback: '💾' },
  
  // Frontend
  'angular s-p-a': { type: 'devicon', icon: 'angular', local: 'Angular.svg', fallback: '🅰️' },
  'angular spa': { type: 'devicon', icon: 'angular', local: 'Angular.svg', fallback: '🅰️' },
  'angular': { type: 'devicon', icon: 'angular', local: 'Angular.svg', fallback: '🅰️' },
  'typescript': { type: 'devicon', icon: 'typescript', local: 'TypeScript.svg', fallback: '🔷' },
  'bootstrap': { type: 'devicon', icon: 'bootstrap', local: 'bootstrap.svg', fallback: '🎨' },
  'bootstrap & primeng': { type: 'devicon', icon: 'bootstrap', local: 'bootstrap.svg', fallback: '🎨' },
  'primeng': { type: 'local', icon: 'primeng.svg', fallback: '🎨' },
  'jquery': { type: 'devicon', icon: 'jquery', local: 'jquery.svg', fallback: '⚡' },
  'jquery & ajax': { type: 'devicon', icon: 'jquery', local: 'jquery.svg', fallback: '⚡' },
  'react': { type: 'devicon', icon: 'react', fallback: '⚛️' },
  'vue': { type: 'devicon', icon: 'vuejs', fallback: '💚' },
  
  // DevOps & Container
  'openshift gateway': { type: 'local', icon: 'api gateway.svg', fallback: '🚪' },
  'openshift': { type: 'local', icon: 'openshift1.png', fallback: '🏗️' },
  'docker': { type: 'devicon', icon: 'docker', local: 'Docker.svg', fallback: '🐳' },
  'kubernetes': { type: 'devicon', icon: 'kubernetes', local: 'kubernetes.svg', fallback: '☸️' },
  
  // Monitoring & Tools
  'nexus repository': { type: 'local', icon: 'nexus.svg', fallback: '📦' },
  'grafana': { type: 'local', icon: 'Grafana.svg', fallback: '📊' },
  'prometheus': { type: 'local', icon: 'Prometheus.svg', fallback: '📈' },
  'nexus': { type: 'local', icon: 'nexus.svg', fallback: '📦' },
  'sonatype': { type: 'local', icon: 'sonatype.svg', fallback: '📦' },
  
  // CI/CD & Integration
  'ci/cd pipeline': { type: 'local', icon: 'CI CD.svg', fallback: '🔄' },
  'ci/cd pipelines': { type: 'local', icon: 'CI CD.svg', fallback: '🔄' },
  'azure devops': { type: 'local', icon: 'Azure Devops.svg', fallback: '🔄' },
  'signalr integration': { type: 'local', icon: 'signalr.png', fallback: '📡' },
  'signalr': { type: 'local', icon: 'signalr.png', fallback: '📡' },
  
  // Data Access
  'linq2sql dapper': { type: 'local', icon: 'dapper.png', fallback: '🔍' },
  'linq2sql & dapper': { type: 'local', icon: 'dapper.png', fallback: '🔍' },
  'dapper': { type: 'local', icon: 'dapper.png', fallback: '🔍' },
  'linq2sql': { type: 'local', icon: 'linq2sql.svg', fallback: '🔍' },
  
  // API & Documentation
  'swagger ui': { type: 'local', icon: 'Swagger.svg', fallback: '📝' },
  'swagger': { type: 'local', icon: 'Swagger.svg', fallback: '📝' },
  'Swagger': { type: 'local', icon: 'Swagger.svg', fallback: '📝' },
  'openapi': { type: 'local', icon: 'OpenAPI.svg', fallback: '📝' },
  'web api': { type: 'local', icon: 'web api.svg', fallback: '🌐' },
  'api gateway': { type: 'local', icon: 'api gateway.svg', fallback: '🚪' },
  'api': { type: 'local', icon: 'api.svg', fallback: '🌐' },
  'rest api': { type: 'local', icon: 'api development.png', fallback: '🔗' },
  
  // Testing
  'n-unit': { type: 'local', icon: 'nunit.svg', fallback: '✅' },
  'nunit': { type: 'local', icon: 'nunit.svg', fallback: '✅' },
  
  // Azure Services
  'azure blob storage': { type: 'local', icon: 'azure blob storage.png', fallback: '☁️' },
  'azure storage': { type: 'local', icon: 'azure blob storage.png', fallback: '☁️' },
  'azure': { type: 'local', icon: 'Azure.svg', fallback: '☁️' },
  'azure functions': { type: 'local', icon: 'Azure Functions.png', fallback: '⚡' },
  'azure sql database': { type: 'local', icon: 'Azure SQL Database.svg', fallback: '💾' },
  'azure key vault': { type: 'local', icon: 'azure key vault.png', fallback: '🔒' },
  'azure service fabric': { type: 'local', icon: 'Azure Service Fabric.png', fallback: '🧵' },
  'azure service bus': { type: 'local', icon: 'azure service bus.png', fallback: '🚌' },
  'azure load testing': { type: 'local', icon: 'azure load testing.png', fallback: '⚡' },
  'app services': { type: 'local', icon: 'app services.svg', fallback: '🌐' },
  
  // Load Balancing & Network
  'load balancing': { type: 'local', icon: 'load_balancing.png', fallback: '⚖️' },
  'load balancer': { type: 'local', icon: 'load_balancing.png', fallback: '⚖️' },
  'network traffic': { type: 'local', icon: 'network_traffic.png', fallback: '🌐' },
  'ingress': { type: 'local', icon: 'ingress.svg', fallback: '🚪' },
  'gateway': { type: 'local', icon: 'gateway.png', fallback: '🚪' },
  'integration gateway': { type: 'local', icon: 'integration gateway.svg', fallback: '🔗' },
  
  // Security & Compliance
  'security': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'compliance': { type: 'local', icon: 'compliance.png', fallback: '✅' },
  'authentication and authorization': { type: 'local', icon: 'authentication and authorization.png', fallback: '🔐' },
  'authentication': { type: 'local', icon: 'authentication and authorization.png', fallback: '🔐' },
  'google sso': { type: 'local', icon: 'google sso.png', fallback: '🔐' },
  'jwt': { type: 'local', icon: 'jwt.png', fallback: '🔑' },
  'ssl': { type: 'local', icon: 'ssl.png', fallback: '🔒' },
  'ssl/tls': { type: 'local', icon: 'ssl.png', fallback: '🔒' },
  
  // Performance & Monitoring
  'analytics': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'monitoring': { type: 'local', icon: 'monitoring.png', fallback: '📊' },
  'continuous monitoring': { type: 'local', icon: 'continuous monitoring.png', fallback: '📊' },
  'insights': { type: 'local', icon: 'insights.png', fallback: '💡' },
  'azure application insights': { type: 'local', icon: 'insights.png', fallback: '💡' },
  'application insights': { type: 'local', icon: 'insights.png', fallback: '💡' },
  'machine learning': { type: 'local', icon: 'machine learning.png', fallback: '🤖' },
  'performance': { type: 'local', icon: 'performance.png', fallback: '⚡' },
  'performance metrics': { type: 'local', icon: 'performance metrics.png', fallback: '📊' },
  'system performance': { type: 'local', icon: 'system performance.png', fallback: '⚡' },
  
  // Project Page Section Icons
  'technology stack': { type: 'local', icon: 'framework.png', fallback: '⚙️' },
  'project information': { type: 'local', icon: 'project information.png', fallback: '📋' },
  'project overview': { type: 'local', icon: 'project overview.png', fallback: '📄' },
  'engineering excellence': { type: 'local', icon: 'engineering excellence.png', fallback: '🔧' },
  'metrics framework': { type: 'local', icon: 'metrics framework.png', fallback: '📊' },
  'roi metrics': { type: 'local', icon: 'roi metrics.png', fallback: '💰' },
  
  // Project Info Item Icons
  'enterprise': { type: 'local', icon: 'enterprise.png', fallback: '🏢' },
  'client': { type: 'local', icon: 'user.png', fallback: '👤' },
  'confidential': { type: 'local', icon: 'confidential.png', fallback: '🔒' },
  'calendar': { type: 'local', icon: 'calendar.png', fallback: '📅' },
  'website': { type: 'local', icon: 'website.png', fallback: '🌐' },
  'award': { type: 'local', icon: 'award.png', fallback: '🏆' },
  
  // Architecture & Feature Icons
  'diamond': { type: 'local', icon: 'diamond.png', fallback: '🔹' },
  'web': { type: 'local', icon: 'web.png', fallback: '🌐' },
  'mobile': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'realtime': { type: 'local', icon: 'realtime.png', fallback: '⚡' },
  'deployment': { type: 'local', icon: 'deployment.png', fallback: '🚀' },
  'cache': { type: 'local', icon: 'cache.png', fallback: '⚡' },
  'database': { type: 'local', icon: 'database.png', fallback: '💾' },
  
  // Challenge & Solution Icons
  'alerts': { type: 'local', icon: 'alerts.png', fallback: '📊' },
  'compliance': { type: 'local', icon: 'compliance.png', fallback: '🔒' },
  
  // ROI & Business Impact Icons
  'target': { type: 'local', icon: 'target.png', fallback: '🎯' },
  'financial': { type: 'local', icon: 'financial.png', fallback: '💰' },
  'operational': { type: 'local', icon: 'operational.png', fallback: '🚀' },
  'success': { type: 'local', icon: 'success.png', fallback: '🏆' },
  
  // Achievement & Tag Icons
  'critical': { type: 'local', icon: 'critical.png', fallback: '🛡️' },
  'scalability': { type: 'local', icon: 'scalability.png', fallback: '📈' },
  'uptime': { type: 'local', icon: 'uptime.png', fallback: '🔒' },
  
  // API & Integration Technologies
  'integration services': { type: 'local', icon: 'integration gateway.svg', fallback: '🔗' },
  
  // Technology Stack Category Icons
  'testing': { type: 'local', icon: 'testing.png', fallback: '🧪' },
  
  // Architecture Feature Icons
  'load_balancing': { type: 'local', icon: 'load_balancing.png', fallback: '⚖️' },
  'integration': { type: 'local', icon: 'integration.png', fallback: '🔗' },
  'database': { type: 'local', icon: 'database.png', fallback: '🗄️' },
  'cloud': { type: 'local', icon: 'cloud.png', fallback: '☁️' },
  'data pipeline': { type: 'local', icon: 'data pipeline.png', fallback: '📡' },
  'database optimization': { type: 'local', icon: 'database optimization.png', fallback: '🗄️' },
  'escalation matrix': { type: 'local', icon: 'escalation matrix.png', fallback: '🔔' },
  'data encryption': { type: 'local', icon: 'data encryption.png', fallback: '🛡️' },
  'validation': { type: 'local', icon: 'validation.png', fallback: '✅' },
  'data processing': { type: 'local', icon: 'data processing.png', fallback: '⚙️' },
  'caching': { type: 'local', icon: 'cache.png', fallback: '⚡' },
  'notification': { type: 'local', icon: 'notification.png', fallback: '🔔' },
  'incident response': { type: 'local', icon: 'incident response.png', fallback: '🚨' },
  'data processing engine': { type: 'local', icon: 'data processing.png', fallback: '⚙️' },
  'processing engine': { type: 'local', icon: 'data processing.png', fallback: '⚙️' },
  
  // Other
  'multi-threading': { type: 'local', icon: 'multithreading.png', fallback: '⚙️' },
  'multi-threading & background jobs': { type: 'local', icon: 'background jobs.png', fallback: '⚙️' },
  'background jobs': { type: 'local', icon: 'background jobs.png', fallback: '⚙️' },
  'nginx': { type: 'devicon', icon: 'nginx', local: 'nginx.svg', fallback: '🌐' },
  'git': { type: 'devicon', icon: 'git', fallback: '📝' },
  'github': { type: 'devicon', icon: 'github', fallback: '🐙' },
  'gitlab': { type: 'devicon', icon: 'gitlab', fallback: '🦊' },
  'json': { type: 'local', icon: 'JSON.svg', fallback: '📄' },
  'repository': { type: 'local', icon: 'repository.png', fallback: '📦' },
  'artifacts': { type: 'local', icon: 'artifacts.png', fallback: '📦' },
  'pipelines': { type: 'local', icon: 'pipelines.png', fallback: '🔄' },
  'data': { type: 'local', icon: 'data.png', fallback: '💾' },
  'services': { type: 'local', icon: 'services.png', fallback: '⚙️' },
  'frontend': { type: 'local', icon: 'frontend.png', fallback: '🎨' },
  'portal': { type: 'local', icon: 'portal.png', fallback: '🌐' },
  'user': { type: 'local', icon: 'user.png', fallback: '👤' },
  'sharepoint': { type: 'local', icon: 'sharepoint.png', fallback: '📎' },
  'power apps': { type: 'local', icon: 'power apps.png', fallback: '⚡' },
  'partners': { type: 'local', icon: 'partners.png', fallback: '🤝' },
  'responsive': { type: 'local', icon: 'responsive.png', fallback: '📱' },
  'responsive design': { type: 'local', icon: 'responsive.png', fallback: '📱' },
  'mobile responsive': { type: 'local', icon: 'responsive.png', fallback: '📱' },
  'backend': { type: 'local', icon: 'backend.png', fallback: '⚙️' },
  'cloud': { type: 'local', icon: 'cloud.png', fallback: '☁️' },
  'cloud hosting': { type: 'local', icon: 'cloud hosting.png', fallback: '☁️' },
  'testing': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'quality assurance': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'measurement': { type: 'local', icon: 'measurement.png', fallback: '📏' },
  'context': { type: 'local', icon: 'context.png', fallback: '📋' },
  'validation': { type: 'local', icon: 'validation.png', fallback: '✅' },
  'baseline': { type: 'local', icon: 'baseline.png', fallback: '📊' },
  'baseline establishment': { type: 'local', icon: 'baseline.png', fallback: '🔍' },
  'business impact': { type: 'local', icon: 'business impact.png', fallback: '💰' },
  'validation process': { type: 'local', icon: 'validation.png', fallback: '✅' },
  
  // Engineering Challenges Icons
  'data ingestion pipeline': { type: 'local', icon: 'data pipeline.png', fallback: '📡' },
  'data pipeline': { type: 'local', icon: 'data pipeline.png', fallback: '📡' },
  'parallel processing': { type: 'local', icon: 'parallel processing.png', fallback: '⚙️' },
  'database optimization': { type: 'local', icon: 'database optimization.png', fallback: '🗄️' },
  'caching strategy': { type: 'local', icon: 'Redis.svg', fallback: '⚡' },
  'grafana alerting engine': { type: 'local', icon: 'Grafana.svg', fallback: '📈' },
  'escalation matrix': { type: 'local', icon: 'escalation matrix.png', fallback: '🔔' },
  'predictive analytics': { type: 'local', icon: 'analytics.png', fallback: '🤖' },
  'mobile alerts': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'horizontal pod autoscaler (hpa)': { type: 'local', icon: 'kubernetes.svg', fallback: '📊' },
  'horizontal pod autoscaler': { type: 'local', icon: 'kubernetes.svg', fallback: '📊' },
  'hpa': { type: 'local', icon: 'kubernetes.svg', fallback: '📊' },
  'load balancing strategy': { type: 'local', icon: 'load_balancing.png', fallback: '⚖️' },
  'resource management': { type: 'local', icon: 'kubernetes.svg', fallback: '🛡️' },
  'rolling updates': { type: 'local', icon: 'CI CD.svg', fallback: '🔄' },
  'multi-factor authentication': { type: 'local', icon: 'multi factor authentication.png', fallback: '🔐' },
  'multi factor authentication': { type: 'local', icon: 'multi factor authentication.png', fallback: '🔐' },
  'mfa': { type: 'local', icon: 'multi factor authentication.png', fallback: '🔐' },
  'data encryption': { type: 'local', icon: 'data encryption.png', fallback: '🛡️' },
  'encryption': { type: 'local', icon: 'data encryption.png', fallback: '🛡️' },
  'audit & compliance': { type: 'local', icon: 'security and compliance.png', fallback: '📋' },
  'audit and compliance': { type: 'local', icon: 'security and compliance.png', fallback: '📋' },
  'incident response': { type: 'local', icon: 'monitoring.png', fallback: '🚨' },
  
  // Home Page Section Icons
  'about': { type: 'local', icon: 'user.png', fallback: '👨‍💻' },
  'about me': { type: 'local', icon: 'user.png', fallback: '👨‍💻' },
  'skills': { type: 'local', icon: 'performance.png', fallback: '⚡' },
  'portfolio': { type: 'local', icon: 'pipelines.png', fallback: '🎨' },
  'project portfolio': { type: 'local', icon: 'pipelines.png', fallback: '🎨' },
  'stats': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'statistics': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'professional statistics': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'resume': { type: 'local', icon: 'repository.png', fallback: '📋' },
  'testimonials': { type: 'local', icon: 'partners.png', fallback: '💬' },
  'contact': { type: 'local', icon: 'web.png', fallback: '📬' },
  'contact me': { type: 'local', icon: 'web.png', fallback: '📬' },
  
  // Skills Section Headers
  'core technologies': { type: 'local', icon: 'framework.png', fallback: '🏆' },
  'frontend technologies': { type: 'local', icon: 'frontend.png', fallback: '🎨' },
  'backend & database': { type: 'local', icon: 'backend.png', fallback: '⚙️' },
  'cloud & devops': { type: 'local', icon: 'cloud.png', fallback: '☁️' },
  'additional skills': { type: 'local', icon: 'testing.png', fallback: '🛠️' },
  
  // Resume Section Icons - Semantic & Intelligent Mappings
  
  // Contact & Personal
  'location': { type: 'local', icon: 'location.png', fallback: '📍' },
  'phone': { type: 'local', icon: 'phone.png', fallback: '📞' },
  'email': { type: 'local', icon: 'email.png', fallback: '✉️' },
  'remote innovation': { type: 'local', icon: 'remote work.png', fallback: '🌐' },
  
  // Education & Academic
  'education': { type: 'local', icon: 'education.png', fallback: '🎓' },
  'bachelor': { type: 'local', icon: 'degree.png', fallback: '🏛️' },
  'university': { type: 'local', icon: 'university.png', fallback: '🏛️' },
  'academic excellence': { type: 'local', icon: 'academic excellence.png', fallback: '🎯' },
  
  // Awards & Achievements
  'awards & achievements': { type: 'local', icon: 'awards.png', fallback: '🏆' },
  'champion': { type: 'local', icon: 'champion.png', fallback: '🥇' },
  'elite achievement': { type: 'local', icon: 'trophy.png', fallback: '🏅' },
  'guinness': { type: 'local', icon: 'guinness record.png', fallback: '🥈' },
  'technical excellence': { type: 'local', icon: 'excellence.png', fallback: '🎯' },
  
  // Career & Professional
  'software engineer': { type: 'local', icon: 'software engineer.png', fallback: '💼' },
  'global impact': { type: 'local', icon: 'global impact.png', fallback: '💼' },
  'rapid delivery': { type: 'local', icon: 'rapid delivery.png', fallback: '⚡' },
  'startup growth': { type: 'local', icon: 'startup.png', fallback: '🚀' },
  
  // Cloud & Infrastructure
  'cloud excellence': { type: 'local', icon: 'cloud excellence.png', fallback: '☁️' },
  'cloud architecture': { type: 'local', icon: 'cloud architecture.png', fallback: '☁️' },
  'cloud infrastructure': { type: 'local', icon: 'cloud infrastructure.png', fallback: '☁️' },
  'azure services': { type: 'local', icon: 'Azure.svg', fallback: '☁️' },
  
  // Architecture & Design
  'microservices architecture': { type: 'local', icon: 'microservices.png', fallback: '🏗️' },
  'architecture excellence': { type: 'local', icon: 'architecture.png', fallback: '🏛️' },
  'smart city': { type: 'local', icon: 'smart city.png', fallback: '🏙️' },
  'smart city solutions': { type: 'local', icon: 'smart city.png', fallback: '🏗️' },
  
  // Development & Tech Stack
  'modern web applications': { type: 'local', icon: 'web development.png', fallback: '🚀' },
  'modern tech stack': { type: 'local', icon: 'tech stack.png', fallback: '🛠️' },
  'technical stack': { type: 'local', icon: 'tech stack.png', fallback: '🛠️' },
  'full-stack mastery': { type: 'local', icon: 'fullstack.png', fallback: '🔄' },
  'web solutions': { type: 'local', icon: 'web solutions.png', fallback: '🌐' },
  
  // DevOps & Performance
  'devops excellence': { type: 'local', icon: 'devops.png', fallback: '⚙️' },
  'devops automation': { type: 'local', icon: 'automation.png', fallback: '⚙️' },
  'performance optimization': { type: 'local', icon: 'optimization.png', fallback: '📈' },
  
  // Leadership & Team
  'technical leadership': { type: 'local', icon: 'leadership.png', fallback: '👥' },
  'team leadership': { type: 'local', icon: 'team.png', fallback: '👥' },
  
  // Industry Specific
  'aviation': { type: 'local', icon: 'aviation.png', fallback: '✈️' },
  'aviation domain': { type: 'local', icon: 'aviation.png', fallback: '🎯' },
  'airline': { type: 'local', icon: 'aviation.png', fallback: '✈️' },
  
  // Methodologies & Practices
  'agile development': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'agile practices': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  
  // Data & Analytics
  'data analytics': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  
  // Gaming & Innovation
  'physics engine': { type: 'local', icon: 'physics engine.png', fallback: '🎯' },
  'physics engine innovation': { type: 'local', icon: 'physics engine.png', fallback: '🎯' },
  'game development': { type: 'local', icon: 'game development.png', fallback: '🏆' },
  'game engine': { type: 'local', icon: 'game engine.png', fallback: '🎮' },
  
  // Additional Technical Concepts
  'system integration': { type: 'local', icon: 'integration.png', fallback: '🔗' },
  'database integration': { type: 'local', icon: 'database integration.png', fallback: '🗄️' },
  'revenue growth': { type: 'local', icon: 'revenue.png', fallback: '💰' },
  'communication systems': { type: 'local', icon: 'communication.png', fallback: '📧' },
  'multi-threaded applications': { type: 'local', icon: 'multithreading.png', fallback: '⚡' },
  'api development': { type: 'local', icon: 'api development.png', fallback: '🔌' },
  'ai & ocr integration': { type: 'local', icon: 'ai ocr.png', fallback: '🤖' },
  'ai ocr': { type: 'local', icon: 'ai ocr.png', fallback: '🤖' },
  'e-commerce': { type: 'local', icon: 'ecommerce.png', fallback: '🛒' },
  'e-commerce excellence': { type: 'local', icon: 'ecommerce.png', fallback: '🛒' },
  'ecommerce': { type: 'local', icon: 'ecommerce.png', fallback: '🛒' },
  'notification services': { type: 'local', icon: 'notification service.png', fallback: '🔔' },
  'notifications': { type: 'local', icon: 'notification service.png', fallback: '🔔' },
  'sms notifications': { type: 'local', icon: 'sms notification.png', fallback: '📱' },
  'email notifications': { type: 'local', icon: 'email notification.png', fallback: '📧' },
  'teams notifications': { type: 'local', icon: 'teams notification.png', fallback: '💬' },
  'push notifications': { type: 'local', icon: 'push notification.png', fallback: '📲' }
}

// Local icons available in /assets/img/Icons/
const LOCAL_ICONS = [
  // Resume & Career Icons
  'academic excellence.png', 'agile.png', 'ai ocr.png', 'api development.png', 'architecture.png', 
  'automation.png', 'aviation.png', 'awards.png', 'champion.png', 'cloud architecture.png', 
  'cloud excellence.png', 'cloud infrastructure.png', 'communication.png', 'database integration.png', 
  'degree.png', 'devops.png', 'ecommerce.png', 'education.png', 'email.png', 'excellence.png', 
  'fullstack.png', 'game development.png', 'game engine.png', 'global impact.png', 'guinness record.png', 
  'integration.png', 'leadership.png', 'location.png', 'microservices.png', 'multithreading.png', 
  'notification service.png', 'optimization.png', 'phone.png', 'physics engine.png', 'rapid delivery.png', 'remote work.png', 
  'revenue.png', 'smart city.png', 'software engineer.png', 'startup.png', 'team.png', 
  'tech stack.png', 'trophy.png', 'university.png', 'web development.png', 'web solutions.png',
  
  // Existing Icons
  'analytics.png', 'Angular.svg', 'api gateway.svg', 'api.svg', 'app services.svg',
  'artifacts.png', 'authentication and authorization.png', 'azure blob storage.png',
  'baseline.png', 'business impact.png',
  'Azure Devops.svg', 'Azure Functions.png', 'azure key vault.png',
  'Azure Service Fabric.png', 'Azure SQL Database.svg', 'Azure.svg', 'backend.png',
  'background jobs.png', 'bootstrap.png', 'bootstrap.svg', 'CI CD.svg', 'cloud hosting.png',
  'cloud.png', 'compliance.png', 'context.png', 'continuous monitoring.png', 'cosmos db.png', 'dapper.png', 'data encryption.png',
  'data pipeline.png', 'data processing.png', 'data.png', 'database optimization.png',
  'database.png', 'Docker.svg', 'entity framework.png', 'escalation matrix.png',
  'framework.png', 'frontend.png', 'gateway.png', 'Grafana.svg', 'ingress.svg', 
  'insights.png', 'integration gateway.svg', 'jquery.png', 'jquery.svg', 'JSON.svg', 
  'kubernetes.svg', 'linq2sql.png', 'linq2sql.svg', 'load_balancing.png', 'measurement.png', 'mobile.png',
  'MongoDB.svg', 'monitoring.png', 'multi factor authentication.png', 'mvc.png', 
  'MySQL.svg', 'NET core.svg', 'network_traffic.png', 'nexus.svg', 'nginx.svg', 
  'nunit.svg', 'OpenAPI.svg', 'openshift gateway.png', 'openshift1.png', 
  'parallel processing.png', 'partners.png', 'performance.png', 'performance metrics.png', 'performance_11670215.png', 'pipelines.png', 
  'portal.png', 'PostgresSQL.svg', 'power apps.png', 'primeng.svg', 'Prometheus.svg', 
  'Redis.svg', 'repository.png', 'responsive.png', 'security and compliance.png',
  'security.png', 'services.png', 'sharepoint.png', 'signalr.png', 'sonatype.svg', 
  'sql server.svg', 'ssl.png', 'Swagger.svg', 'system performance.png', 'testing.png', 'user.png', 'validation.png', 'web api.svg', 
  'web.png', 'web.svg'
]

/**
 * Normalize a string for comparison
 * - Convert to lowercase
 * - Remove special characters except spaces and hyphens
 * - Trim and normalize whitespace
 */
function normalizeString(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Extract keywords from a string
 * Split by spaces, hyphens, underscores and filter out common words
 */
function extractKeywords(str) {
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with']
  return normalizeString(str)
    .split(/[\s\-_]+/)
    .filter(word => word.length > 1 && !commonWords.includes(word))
}

/**
 * Calculate similarity score between two strings based on keyword matching
 * Returns a score from 0-100
 */
function calculateSimilarity(str1, str2) {
  const keywords1 = extractKeywords(str1)
  const keywords2 = extractKeywords(str2)
  
  if (keywords1.length === 0 || keywords2.length === 0) return 0
  
  let matchCount = 0
  let maxPossible = Math.max(keywords1.length, keywords2.length)
  
  // Count matching keywords
  keywords1.forEach(kw1 => {
    if (keywords2.some(kw2 => kw2.includes(kw1) || kw1.includes(kw2))) {
      matchCount++
    }
  })
  
  return Math.round((matchCount / maxPossible) * 100)
}

/**
 * Find best matching local icon based on fuzzy matching
 */
function findBestLocalIcon(techName) {
  const normalized = normalizeString(techName)
  let bestMatch = null
  let bestScore = 0
  
  LOCAL_ICONS.forEach(iconFile => {
    // Remove file extension for comparison
    const iconName = iconFile.replace(/\.(svg|png)$/i, '')
    const score = calculateSimilarity(normalized, iconName)
    
    if (score > bestScore && score >= 50) { // Minimum 50% match
      bestScore = score
      bestMatch = iconFile
    }
  })
  
  return bestMatch
}

/**
 * Find technology-specific icon based on intelligent keyword matching
 * @param {string} techName - Technology name
 * @returns {object|null} - Icon object or null if no match
 */
function findTechnologySpecificIcon(techName) {
  const lowerName = techName.toLowerCase()
  
  // Technology-specific keyword mappings
  const techMappings = [
    // Google technologies
    { keywords: ['google sso', 'google workspace', 'google auth'], icon: 'google sso', type: 'local' },
    { keywords: ['google cloud', 'gcp'], icon: 'google.png', type: 'local' },
    
    // Microsoft technologies
    { keywords: ['azure devops', 'devops pipeline'], icon: 'azure devops', type: 'local' },
    { keywords: ['azure sql', 'sql database'], icon: 'azure sql database', type: 'local' },
    { keywords: ['azure service bus'], icon: 'azure service bus', type: 'local' },
    { keywords: ['azure application insights', 'application insights'], icon: 'application insights', type: 'local' },
    { keywords: ['azure load testing'], icon: 'azure load testing', type: 'local' },
    { keywords: ['azure functions'], icon: 'azure functions', type: 'local' },
    { keywords: ['azure key vault'], icon: 'azure key vault', type: 'local' },
    
    // Database technologies
    { keywords: ['redis cache', 'redis'], icon: 'redis', type: 'devicon' },
    { keywords: ['mysql'], icon: 'mysql', type: 'devicon' },
    { keywords: ['postgresql', 'postgres'], icon: 'postgresql', type: 'devicon' },
    { keywords: ['mongodb'], icon: 'mongodb', type: 'devicon' },
    { keywords: ['sql server'], icon: 'sql server', type: 'devicon' },
    
    // Frontend technologies
    { keywords: ['angular', 'angular spa'], icon: 'angular', type: 'devicon' },
    { keywords: ['react'], icon: 'react', type: 'devicon' },
    { keywords: ['vue'], icon: 'vue', type: 'devicon' },
    { keywords: ['typescript'], icon: 'typescript', type: 'devicon' },
    { keywords: ['bootstrap'], icon: 'bootstrap', type: 'devicon' },
    { keywords: ['jquery'], icon: 'jquery', type: 'devicon' },
    
    // Backend technologies
    { keywords: ['.net core', 'asp.net core'], icon: 'dotnetcore', type: 'devicon' },
    { keywords: ['c#', 'csharp'], icon: 'csharp', type: 'devicon' },
    { keywords: ['entity framework'], icon: 'entity framework', type: 'local' },
    { keywords: ['dapper'], icon: 'dapper', type: 'local' },
    
    // DevOps & Infrastructure
    { keywords: ['docker'], icon: 'docker', type: 'devicon' },
    { keywords: ['kubernetes', 'k8s'], icon: 'kubernetes', type: 'devicon' },
    { keywords: ['nginx'], icon: 'nginx', type: 'devicon' },
    
    // Monitoring & Analytics
    { keywords: ['grafana'], icon: 'grafana', type: 'local' },
    { keywords: ['prometheus'], icon: 'prometheus', type: 'local' },
    { keywords: ['machine learning', 'ml'], icon: 'machine learning', type: 'local' },
    { keywords: ['analytics'], icon: 'analytics', type: 'local' },
    
    // API & Integration
    { keywords: ['swagger', 'openapi'], icon: 'swagger', type: 'local' },
    { keywords: ['rest api'], icon: 'rest api', type: 'local' },
    { keywords: ['signalr'], icon: 'signalr', type: 'local' },
    
    // Security
    { keywords: ['jwt', 'json web token'], icon: 'jwt', type: 'local' },
    { keywords: ['ssl', 'tls'], icon: 'ssl', type: 'local' },
    { keywords: ['multi factor authentication', 'mfa'], icon: 'multi factor authentication', type: 'local' },
    
    // Testing
    { keywords: ['nunit'], icon: 'nunit', type: 'local' },
    
    // CI/CD
    { keywords: ['ci/cd', 'continuous integration'], icon: 'ci/cd pipeline', type: 'local' }
  ]
  
  // Find the best match based on keyword presence
  for (const mapping of techMappings) {
    for (const keyword of mapping.keywords) {
      if (lowerName.includes(keyword)) {
        // Get the icon mapping from ICON_MAP
        const iconMapping = ICON_MAP[mapping.icon]
        if (iconMapping) {
          if (iconMapping.type === 'devicon') {
            return {
              type: 'devicon',
              src: iconMapping.icon,
              alt: techName
            }
          } else if (iconMapping.local) {
            return {
              type: 'local',
              src: `/assets/img/Icons/${iconMapping.local}`,
              alt: techName
            }
          } else if (iconMapping.icon) {
            return {
              type: 'local',
              src: `/assets/img/Icons/${iconMapping.icon}`,
              alt: techName
            }
          }
        }
      }
    }
  }
  
  return null
}

/**
 * Resolve icon for a technology name
 * Priority: Devicon > Local Icons > Emoji Fallback
 * @param {string} techName - Technology name (case insensitive)
 * @returns {object} - { type: 'devicon'|'local'|'emoji', src: string, alt: string }
 */
export function resolveIcon(techName, fallbackName = null) {
  if (!techName) {
    return { type: 'emoji', src: '⚙️', alt: 'Technology' }
  }
  
  // 1. First, check if we have a fallback name and try intelligent mapping on it
  // This prioritizes technology-specific icons over generic ones
  if (fallbackName && fallbackName !== techName) {
    const fallbackMatch = findTechnologySpecificIcon(fallbackName)
    if (fallbackMatch) {
      return fallbackMatch
    }
  }
  
  // 2. Try intelligent mapping on the primary name
  const techSpecificMatch = findTechnologySpecificIcon(techName)
  if (techSpecificMatch) {
    return techSpecificMatch
  }
  
  const normalized = normalizeString(techName)
  
  // 3. Check exact match in ICON_MAP (case insensitive)
  const exactMatch = ICON_MAP[normalized]
  if (exactMatch) {
    // If it has a devicon, prioritize it
    if (exactMatch.type === 'devicon') {
      return {
        type: 'devicon',
        src: exactMatch.icon,
        alt: techName
      }
    }
    // Otherwise use local icon if available
    if (exactMatch.local) {
      return {
        type: 'local',
        src: `/assets/img/Icons/${exactMatch.local}`,
        alt: techName
      }
    }
    // Otherwise use the defined icon
    if (exactMatch.icon) {
      return {
        type: 'local',
        src: `/assets/img/Icons/${exactMatch.icon}`,
        alt: techName
      }
    }
  }
  
  // 2. Try fuzzy matching with local icons
  const bestLocalMatch = findBestLocalIcon(techName)
  if (bestLocalMatch) {
    return {
      type: 'local',
      src: `/assets/img/Icons/${bestLocalMatch}`,
      alt: techName
    }
  }
  
  // 3. Fallback to emoji if defined
  if (exactMatch && exactMatch.fallback) {
    return {
      type: 'emoji',
      src: exactMatch.fallback,
      alt: techName
    }
  }
  
  // 4. Default emoji fallback
  return {
    type: 'emoji',
    src: '⚙️',
    alt: techName
  }
}

/**
 * Get Devicon class name
 * @param {string} iconName - Devicon icon name (e.g., 'angularjs', 'react')
 * @returns {string} - Full Devicon class string
 */
export function getDeviconClass(iconName) {
  return `devicon-${iconName}-plain`
}

/**
 * Get Devicon SVG URL
 * @param {string} iconName - Devicon icon name (e.g., 'angular', 'react')
 * @returns {string} - Full Devicon SVG URL
 */
export function getDeviconSvgUrl(iconName) {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconName}/${iconName}-original.svg`
}

export default {
  resolveIcon,
  getDeviconClass,
  getDeviconSvgUrl
}
