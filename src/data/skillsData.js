import { assetPath } from '../utils/assetPath.js'

export const getSkillsData = () => ({
  coreSkills: [
    { name: 'C# & .NET Core', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', percentage: 95, category: 'BACKEND', level: 'EXPERT LEVEL' },
    { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg', percentage: 90, category: 'DATABASE', level: 'EXPERT LEVEL' },
    { name: 'Angular', icon: assetPath('/assets/img/Icons/Angular.svg'), percentage: 85, category: 'FRONTEND', level: 'ADVANCED' },
    { name: 'Azure Cloud & DevOps', icon: assetPath('/assets/img/Icons/Azure.svg'), percentage: 90, category: 'CLOUD', level: 'EXPERT LEVEL' },
    { name: 'Microservices', icon: assetPath('/assets/img/Icons/Docker.svg'), percentage: 85, category: 'ARCHITECTURE', level: 'ADVANCED' },
    { name: 'REST APIs', icon: assetPath('/assets/img/Icons/api.svg'), percentage: 85, category: 'INTEGRATION', level: 'ADVANCED' },
    { name: 'GitHub & Version Control', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', percentage: 85, category: 'VERSION CONTROL', level: 'ADVANCED' },
    { name: 'Visual Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-original.svg', percentage: 90, category: 'IDE', level: 'EXPERT LEVEL' }
  ],
  frontendSkills: [
    { name: 'HTML5 & CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', percentage: 90, category: 'MARKUP', level: 'EXPERT LEVEL' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', percentage: 85, category: 'SCRIPTING', level: 'ADVANCED' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', percentage: 80, category: 'TYPED JS', level: 'INTERMEDIATE' },
    { name: 'Bootstrap', icon: assetPath('/assets/img/Icons/bootstrap.png'), percentage: 85, category: 'FRAMEWORK', level: 'ADVANCED' },
    { name: 'jQuery', icon: assetPath('/assets/img/Icons/jquery.png'), percentage: 80, category: 'LIBRARY', level: 'INTERMEDIATE' },
    { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', percentage: 75, category: 'FRAMEWORK', level: 'INTERMEDIATE' }
  ],
  backendSkills: [
    { name: 'ASP.NET Core', icon: assetPath('/assets/img/Icons/NET core.svg'), percentage: 90, category: 'FRAMEWORK', level: 'EXPERT LEVEL' },
    { name: 'Entity Framework', icon: assetPath('/assets/img/Icons/entity framework.png'), percentage: 85, category: 'ORM', level: 'ADVANCED' }
  ],
  cloudDevOpsSkills: [
    { name: 'Azure Key Vault', icon: assetPath('/assets/img/Icons/azure key vault.png'), percentage: 80, category: 'SECURITY', level: 'INTERMEDIATE' },
    { name: 'Azure App Insights', icon: assetPath('/assets/img/Icons/insights.png'), percentage: 85, category: 'MONITORING', level: 'ADVANCED' },
    { name: 'Azure Storage', icon: assetPath('/assets/img/Icons/Azure.svg'), percentage: 80, category: 'STORAGE', level: 'INTERMEDIATE' },
    { name: 'Azure Functions', icon: assetPath('/assets/img/Icons/Azure Functions.png'), percentage: 85, category: 'SERVERLESS', level: 'ADVANCED' },
    { name: 'Docker', icon: assetPath('/assets/img/Icons/Docker.svg'), percentage: 80, category: 'CONTAINER', level: 'INTERMEDIATE' },
    { name: 'CI/CD Automation', icon: assetPath('/assets/img/Icons/CI CD.svg'), percentage: 85, category: 'DEVOPS', level: 'ADVANCED' },
    { name: 'Azure App Services', icon: assetPath('/assets/img/Icons/app services.svg'), percentage: 90, category: 'HOSTING', level: 'EXPERT LEVEL' },
    { name: 'Azure Service Fabric', icon: assetPath('/assets/img/Icons/Azure Service Fabric.png'), percentage: 80, category: 'MICROSERVICES', level: 'INTERMEDIATE' },
    { name: 'Azure Cosmos DB', icon: assetPath('/assets/img/Icons/cosmos db.png'), percentage: 75, category: 'DATABASE', level: 'INTERMEDIATE' }
  ],
  dataAnalyticsSkills: [
    { name: 'LINQ Query Optimization', icon: assetPath('/assets/img/Icons/linq2sql.png'), percentage: 85, category: 'QUERY', level: 'ADVANCED' },
    { name: 'Data Analytics Framework', icon: assetPath('/assets/img/Icons/analytics.png'), percentage: 80, category: 'ANALYTICS', level: 'INTERMEDIATE' },
    { name: 'Performance Monitoring', icon: assetPath('/assets/img/Icons/monitoring.png'), percentage: 75, category: 'MONITORING', level: 'INTERMEDIATE' },
    { name: 'Database Indexing', icon: assetPath('/assets/img/Icons/sql server.svg'), percentage: 90, category: 'DATABASE', level: 'EXPERT LEVEL' }
  ],
  projectManagementSkills: [
    { name: 'Agile/Scrum Methodologies', icon: assetPath('/assets/img/Icons/pipelines.png'), percentage: 85, category: 'METHODOLOGY', level: 'ADVANCED' },
    { name: 'Team Leadership', icon: assetPath('/assets/img/Icons/partners.png'), percentage: 80, category: 'LEADERSHIP', level: 'INTERMEDIATE' },
    { name: 'Code Review & Mentoring', icon: assetPath('/assets/img/Icons/security.png'), percentage: 90, category: 'MENTORING', level: 'EXPERT LEVEL' },
    { name: 'Technical Architecture', icon: assetPath('/assets/img/Icons/framework.png'), percentage: 85, category: 'ARCHITECTURE', level: 'ADVANCED' }
  ],
  microsoftToolsSkills: [
    { name: 'Power Apps', icon: assetPath('/assets/img/Icons/power apps.png'), percentage: 75, category: 'PLATFORM', level: 'INTERMEDIATE' },
    { name: 'SharePoint', icon: assetPath('/assets/img/Icons/sharepoint.png'), percentage: 80, category: 'COLLABORATION', level: 'INTERMEDIATE' },
    { name: 'SignalR', icon: assetPath('/assets/img/Icons/signalr.png'), percentage: 85, category: 'REALTIME', level: 'ADVANCED' },
    { name: 'Swagger UI', icon: assetPath('/assets/img/Icons/Swagger.svg'), percentage: 90, category: 'API DOCS', level: 'EXPERT LEVEL' }
  ]
})
