/**
 * Update all 61 blog articles: MAXIMIZE coverage (~8x) for search and reach.
 * - 200–1200 terms per article (scaled by word count); strict dedupe; article-related only.
 * - Dedupe: case-insensitive, trim, unique (first occurrence kept).
 * - Sources: primary title, long-tail from slug/title, slug subphrases, title subphrases, topic terms, shared terms.
 * Google can crawl meta/schema with large keyword sets; we keep all terms article-relevant.
 */

const fs = require('fs')
const path = require('path')

const ARTICLES_DIR = path.resolve(__dirname, '../src/config/blog/articles')

/** Normalize for dedupe: lowercase, trim. */
function norm(t) {
  return String(t).trim().toLowerCase()
}

/** Topic -> large semantic/keyword list (80+ per topic) for ~8x coverage */
const TOPIC_TERMS = {
  Cloud: [
    'Azure microservices', 'AKS', 'Azure Service Fabric', 'event-driven architecture Azure', 'cloud architecture', 'Azure DevOps', 'microservices on Azure', 'Azure Kubernetes', 'Azure Functions', 'Azure SQL', 'Cosmos DB', 'serverless Azure',
    'Azure App Service', 'Azure Container Apps', 'Azure Event Grid', 'Azure Service Bus', 'Azure Key Vault', 'Azure Monitor', 'Azure Bicep', 'Azure ARM', 'cloud migration', 'hybrid cloud', 'multi-cloud', 'Azure cost optimization', 'Azure security', 'Azure networking', 'Azure identity', 'Azure AD', 'Azure landing zone', 'Azure well-architected',
    'container orchestration', 'Kubernetes', 'Docker', 'Azure AKS', 'Azure Container Registry', 'Azure Logic Apps', 'Azure Event Hubs', 'Azure Storage', 'Blob storage', 'Azure Table storage', 'Azure Queue', 'Azure API Management', 'Azure Front Door', 'Azure CDN', 'Azure Traffic Manager', 'Azure Load Balancer', 'Azure Virtual Network', 'Azure Firewall', 'Azure DNS', 'Azure Backup', 'Azure Site Recovery', 'Azure Arc', 'Azure Stack', 'Azure VMware', 'cloud native', 'serverless computing', 'FaaS', 'PaaS', 'IaaS', 'Azure governance', 'Azure Policy', 'Azure Blueprints', 'Azure Cost Management', 'Azure Advisor', 'Azure Resource Manager', 'ARM templates', 'Bicep templates', 'Terraform Azure', 'Azure CLI', 'Azure PowerShell', 'Azure Portal', 'Azure SDK', 'Azure REST API',
    'Azure .NET', 'Azure C#', 'Azure DevOps pipelines', 'YAML pipeline', 'Azure Repos', 'Azure Boards', 'Azure Test Plans', 'Azure Artifacts', 'Azure Pipelines', 'managed identity', 'Azure RBAC', 'Azure subscription', 'resource group', 'Azure region', 'availability zone', 'Azure SLA', 'Azure SLO', 'Azure SLI', 'cloud design patterns', 'Azure reference architecture', 'Azure architecture center', 'Azure best practices', 'Azure checklist', 'Azure certification', 'AZ-104', 'AZ-204', 'AZ-305', 'cloud architect', 'solutions architect', 'Azure developer', 'serverless .NET', 'Azure Durable Functions', 'Azure WebJobs', 'Azure Static Web Apps', 'Azure App Service plan', 'consumption plan', 'premium plan', 'scale out', 'scale up', 'auto-scale', 'Azure Application Insights', 'Azure Log Analytics', 'Application Insights .NET', 'distributed tracing Azure', 'Azure WAF', 'Azure DDoS', 'Azure Private Link', 'Azure VNet integration', 'private endpoint', 'service endpoint'
  ],
  'Full-Stack': [
    'Full stack .NET', 'Angular Vue React', 'enterprise web apps', 'REST API', 'C# backend', 'frontend backend', 'API design', 'single-page application', 'SPA architecture', 'full stack Vue', 'full stack Angular',
    'ASP.NET Core', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Entity Framework', 'Blazor', 'SignalR', 'GraphQL', 'gRPC', 'RESTful API', 'full stack developer', 'web API', 'MVC', 'clean architecture', 'dependency injection', 'middleware', 'JWT auth', 'OAuth', 'CORS', 'API versioning',
    'ASP.NET Core MVC', 'Razor Pages', 'Minimal API', 'Web API', 'Swagger', 'OpenAPI', 'API gateway', 'BFF', 'backend for frontend', 'Angular Material', 'Vue Router', 'Vuex', 'Pinia', 'React Router', 'Redux', 'state management', 'component library', 'responsive design', 'SSR', 'server-side rendering', 'SSG', 'static site', 'PWA', 'progressive web app', 'SPA performance', 'lazy loading', 'code splitting', 'bundle size', 'webpack', 'Vite', 'npm', 'yarn', 'package management', 'TypeScript types', 'unit testing', 'Jest', 'Karma', 'Cypress', 'Playwright', 'E2E testing', 'integration testing', 'API testing', 'Postman', 'frontend build', 'CI/CD frontend', 'Docker frontend', 'containerized app', 'full stack deployment', 'Azure Static Web Apps', 'Vercel', 'Netlify', 'hosting', 'CDN', 'caching strategy', 'SEO SPA', 'meta tags', 'structured data',
    'full stack architect', 'full stack engineer', 'full stack best practices', 'full stack .NET 8', 'full stack C#', 'ASP.NET Core 8', 'Minimal APIs', 'MapGet', 'MapPost', 'endpoint routing', 'route handler', 'model binding', 'validation attributes', 'DataAnnotations', 'FluentValidation', 'MediatR', 'CQRS frontend', 'Nx monorepo', 'Lerna', 'pnpm', 'npm workspaces', 'component-driven', 'Storybook', 'design system', 'Tailwind CSS', 'Bootstrap', 'CSS modules', 'Sass', 'scoped styles', 'Vue Composition API', 'React hooks', 'Angular signals', 'reactive forms', 'template-driven forms', 'form validation', 'error handling', 'global error handler', 'interceptor', 'HTTP client', 'axios', 'fetch API', 'WebSocket', 'SignalR .NET', 'real-time app', 'server-sent events', 'hydration', 'SSR Vue', 'Nuxt', 'Next.js', 'Angular SSR', 'prerendering', 'static generation', 'incremental static regeneration', 'edge runtime', 'middleware edge', 'API route', 'serverless function', 'Vercel functions', 'Netlify functions'
  ],
  Data: [
    'Database optimization', 'SQL Server', 'Entity Framework', 'query performance', 'data modeling', 'Azure SQL', 'database schema design', 'indexing strategies', 'transaction isolation', 'batch vs streaming', 'data pipelines',
    'EF Core', 'Dapper', 'Cosmos DB', 'Redis cache', 'stored procedures', 'execution plans', 'N+1 query', 'lazy loading', 'eager loading', 'migrations', 'database first', 'code first', 'connection strings', 'connection pooling', 'deadlock', 'ACID', 'normalization', 'denormalization', 'data warehouse', 'ETL',
    'SQL Server Management Studio', 'index tuning', 'query tuning', 'statistics', 'query plan', 'covering index', 'clustered index', 'nonclustered index', 'full-text index', 'partitioning', 'sharding', 'replication', 'always on', 'failover', 'backup restore', 'point in time restore', 'Azure SQL Database', 'Azure SQL Managed Instance', 'Cosmos DB SQL API', 'Cosmos DB MongoDB API', 'change feed', 'bulk execution', 'stored procedure C#', 'raw SQL', 'LINQ to SQL', 'projections', 'AsNoTracking', 'DbContext', 'scaffolding', 'Fluent API', 'conventions', 'data annotations', 'composite key', 'foreign key', 'navigation property', 'inverse property', 'many to many', 'one to many', 'table per type', 'TPH', 'TPT', 'inheritance mapping', 'value objects', 'owned entities', 'shadow properties', 'global query filters', 'interceptors', 'events', 'save changes', 'transaction scope', 'unit of work pattern', 'repository data', 'CQRS read model', 'event sourcing store',
    'database developer', 'database architect', 'SQL performance', 'query optimization', 'execution plan analysis', 'missing index', 'index fragmentation', 'rebuild index', 'reorganize index', 'statistics update', 'parameter sniffing', 'query store', 'adaptive query processing', 'batch mode', 'columnstore index', 'rowstore', 'heap', 'B-tree', 'key lookup', 'table scan', 'index scan', 'index seek', 'predicate pushdown', 'EF Core performance', 'compiled query', 'split query', 'single query', 'batching SaveChanges', 'bulk insert', 'SqlBulkCopy', 'EF Core bulk', 'database migration', 'seed data', 'IDesignTimeDbContextFactory', 'connection resilience', 'retry policy', 'Polly', 'database health check', 'DbConnection', 'IDbConnection', 'ADO.NET', 'SqlConnection', 'SqlCommand', 'SqlDataReader', 'async database', 'CancellationToken', 'database timeout', 'command timeout', 'connection timeout', 'database security', 'SQL injection', 'parameterized query', 'encrypted column', 'always encrypted', 'dynamic data masking', 'row-level security', 'audit table', 'temporal table', 'change data capture', 'CDC'
  ],
  Leadership: [
    'Technical leadership', 'code review', 'team mentoring', 'agile delivery', 'remote teams', 'engineering leadership', 'distributed teams', 'sprint delivery', 'tech lead', 'architecture decisions',
    'scrum master', 'sprint planning', 'retrospective', 'backlog refinement', 'ADR', 'architecture decision record', 'technical debt', 'best practices', 'pair programming', 'knowledge sharing', 'onboarding', 'career growth', 'performance review', 'stakeholder management', 'remote work', 'async communication', 'documentation', 'runbooks',
    'engineering manager', 'team lead', 'principal engineer', 'staff engineer', 'career ladder', '1:1', 'feedback', 'retro', 'daily standup', 'planning poker', 'story points', 'velocity', 'burndown', 'kanban', 'scrum', 'SAFe', 'LeSS', 'agile transformation', 'change management', 'conflict resolution', 'delegation', 'priority management', 'roadmap', 'OKR', 'KPI', 'metrics', 'DORA metrics', 'cycle time', 'lead time', 'incident management', 'postmortem', 'blameless', 'psychological safety', 'inclusive culture', 'remote first', 'async first', 'written communication', 'meeting culture', 'decision making', 'consensus', 'disagree and commit', 'RFC', 'design doc', 'tech spec', 'code review guidelines', 'definition of done', 'definition of ready', 'quality bar', 'release process', 'go no-go', 'rollback plan', 'feature flags', 'gradual rollout', 'A/B testing', 'user feedback', 'product partnership',
    'tech lead skills', 'engineering leadership blog', 'leading developers', 'managing technical teams', 'software team lead', 'senior engineer', 'staff engineer skills', 'principal engineer path', 'engineering ladder', 'promotion criteria', 'technical interview', 'hiring engineers', 'interview rubric', 'technical screening', 'system design interview', 'behavioral interview', 'team building', 'team dynamics', 'high-performing team', 'team productivity', 'developer productivity', 'flow state', 'context switching', 'maker schedule', 'manager schedule', 'async standup', 'written specs', 'RFC process', 'design review', 'architecture review', 'security review', 'accessibility review', 'documentation culture', 'runbook template', 'incident response', 'on-call', 'rotation', 'post-incident review', 'root cause analysis', 'five whys', 'action items', 'follow-up', 'stakeholder communication', 'executive summary', 'status update', 'project update', 'risk register', 'dependency management', 'cross-team collaboration', 'platform team', 'internal tools', 'developer experience', 'DX', 'developer happiness', 'retention', 'attrition', 'exit interview', 'stay interview', 'career development', 'growth plan', 'learning budget', 'conference', 'training', 'mentorship program', 'sponsorship', 'diversity', 'inclusion', 'bias', 'unconscious bias', 'inclusive hiring'
  ],
  Mobile: [
    'Mobile development', 'iOS Android', 'React Native', 'cross-platform', 'mobile architecture', 'Vue Capacitor', 'native vs cross-platform', 'mobile API design', 'hybrid mobile', 'Capacitor Ionic',
    'Swift', 'Kotlin', 'Flutter', 'Xamarin', 'PWA', 'responsive design', 'mobile UX', 'app store', 'push notifications', 'offline first', 'mobile security', 'biometric auth', 'deep linking', 'mobile testing', 'device fragmentation', 'performance', 'battery optimization',
    'iOS development', 'Android development', 'SwiftUI', 'UIKit', 'Jetpack Compose', 'Android SDK', 'Xcode', 'Android Studio', 'mobile CI/CD', 'TestFlight', 'Google Play', 'app signing', 'provisioning profile', 'certificate', 'mobile analytics', 'Crashlytics', 'mobile monitoring', 'app size', 'bundle size mobile', 'native modules', 'bridge', 'Capacitor plugins', 'Ionic', 'Cordova', 'mobile backend', 'Firebase', 'mobile API', 'REST mobile', 'GraphQL mobile', 'offline sync', 'local storage', 'SQLite mobile', 'realm', 'mobile state', 'mobile navigation', 'tabs', 'drawer', 'stack navigator', 'mobile forms', 'validation', 'mobile accessibility', 'screen reader', 'mobile performance', 'startup time', 'frame rate', 'memory mobile', 'mobile design', 'Material Design', 'Human Interface Guidelines', 'responsive mobile', 'tablet support', 'foldables', 'mobile DevOps', 'fastlane', 'codemagic', 'app center',
    'Vue Capacitor app', 'Capacitor .NET', 'hybrid app .NET', 'mobile .NET', 'Xamarin vs Flutter', 'React Native vs Flutter', 'native bridge', 'plugin development', 'Capacitor iOS', 'Capacitor Android', 'mobile build', 'iOS build', 'Android build', 'release build', 'debug build', 'proguard', 'R8', 'minification', 'obfuscation', 'app bundle', 'APK', 'AAB', 'IPA', 'TestFlight beta', 'Google Play internal testing', 'staged rollout', 'in-app update', 'force update', 'version check', 'mobile analytics events', 'screen tracking', 'user property', 'crash report', 'symbolication', 'dSYM', 'mapping file', 'mobile CI', 'EAS Build', 'Codemagic', 'Bitrise', 'mobile E2E', 'Detox', 'Appium', 'Maestro', 'mobile snapshot', 'Loki', 'mobile design system', 'design tokens', 'dark mode', 'theme', 'localization', 'i18n mobile', 'RTL', 'accessibility mobile', 'VoiceOver', 'TalkBack', 'semantic labels', 'hit area', 'touch target', 'gesture', 'swipe', 'pull to refresh', 'infinite scroll', 'lazy load list', 'virtual list', 'FlatList', 'RecyclerView', 'UITableView', 'mobile keyboard', 'keyboard avoiding', 'safe area', 'notch', 'status bar', 'navigation bar'
  ],
  Architecture: [
    'Software architecture', 'design patterns', 'clean architecture', 'DDD', 'SOLID', 'enterprise patterns', 'AI coding tools', 'code review and testing', 'CQRS', 'event sourcing', 'microservices design', 'API patterns',
    'creational patterns', 'structural patterns', 'behavioral patterns', 'repository pattern', 'unit of work', 'factory', 'strategy', 'observer', 'mediator', 'adapter', 'facade', 'dependency inversion', 'single responsibility', 'interface segregation', 'bounded context', 'aggregate', 'domain model', 'hexagonal architecture', 'vertical slice',
    'singleton', 'builder', 'prototype', 'abstract factory', 'decorator', 'proxy', 'bridge', 'composite', 'flyweight', 'chain of responsibility', 'command', 'iterator', 'memento', 'state', 'template method', 'visitor', 'null object', 'specification', 'domain events', 'event handler', 'saga', 'orchestrator', 'choreography', 'outbox pattern', 'inbox pattern', 'API versioning', 'backward compatibility', 'feature toggles', 'circuit breaker', 'retry', 'bulkhead', 'timeout', 'fallback', 'resilience', 'distributed tracing', 'correlation ID', 'service mesh', 'sidecar', 'gateway', 'BFF', 'aggregator', 'proxy gateway', 'rate limiting', 'throttling', 'caching', 'cache aside', 'write through', 'eventual consistency', 'strong consistency', 'CAP theorem', 'scalability', 'horizontal scaling', 'vertical scaling', 'load balancing', 'sharding', 'partitioning', 'modular monolith', 'modular architecture', 'package by feature', 'package by layer', 'bounded context mapping', 'context map', 'anti-corruption layer', 'open host service', 'published language', 'shared kernel', 'customer supplier', 'conformist', 'separate ways',
    'design patterns .NET', 'design patterns C#', 'GoF patterns', 'Gang of Four', 'pattern catalog', 'when to use pattern', 'pattern trade-offs', 'pattern implementation', 'refactoring to pattern', 'pattern misuse', 'anti-pattern', 'code smell', 'refactoring', 'Martin Fowler', 'Eric Evans', 'domain-driven design', 'tactical DDD', 'strategic DDD', 'ubiquitous language', 'aggregate root', 'entity', 'value object', 'domain service', 'domain event', 'application service', 'use case', 'port and adapter', 'onion architecture', 'clean architecture layers', 'dependency rule', 'inner circle', 'outer circle', 'interface adapter', 'framework and driver', 'testability', 'test double', 'mock', 'stub', 'fake', 'test pyramid', 'unit test', 'integration test', 'contract test', 'architectural test', 'ArchUnit', 'NetArchTest', 'bounded context diagram', 'event storming', 'domain storytelling', 'user story mapping', 'impact mapping', 'quality attributes', 'NFR', 'non-functional requirements', 'scalability requirements', 'availability', 'reliability', 'latency', 'throughput', 'consistency model', 'BASE', 'two-phase commit', 'distributed transaction', 'compensating transaction', 'idempotency', 'idempotent API', 'idempotency key', 'idempotent consumer', 'exactly-once', 'at-least-once', 'at-most-once', 'message ordering', 'partition key', 'ordering key', 'event ordering', 'causal consistency', 'session consistency', 'read your writes', 'monotonic reads', 'architectural decision', 'ADM', 'architecture decision record template', 'decision log', 'consequences', 'alternatives considered'
  ]
}

/** Shared terms (article-related, technical blog) — strict dedupe when merging. Expanded for 600–1200 terms. */
const SHARED_TERMS = [
  '.NET', 'C#', 'ASP.NET Core', 'entity framework', 'software engineering', 'enterprise software', 'technical blog', 'Waqas Ahmad blog', 'developer blog', 'architecture blog', 'backend development', 'full stack', 'cloud computing', 'Azure', 'microservices', 'API design', 'best practices', 'code quality', 'maintainability', 'scalability', 'performance', 'security', 'testing', 'DevOps', 'CI/CD', 'agile', 'remote work', 'senior developer', 'technical lead', 'software architect',
  'dotnet', 'csharp', 'Microsoft', 'open source', 'cross-platform', 'Windows', 'Linux', 'Docker', 'Kubernetes', 'containers', 'REST', 'HTTP', 'JSON', 'XML', 'authentication', 'authorization', 'OAuth 2', 'OpenID Connect', 'JWT', 'identity', 'logging', 'monitoring', 'observability', 'tracing', 'metrics', 'health checks', 'graceful shutdown', 'configuration', 'options pattern', 'secrets', 'environment', 'production', 'staging', 'development', 'refactoring', 'legacy code', 'technical debt', 'code smell', 'SOLID principles', 'DRY', 'KISS', 'YAGNI', 'clean code', 'readable code', 'documentation', 'comments', 'naming', 'conventions', 'style guide', 'lint', 'formatter', 'code review', 'pull request', 'merge', 'branching', 'Git', 'version control', 'semantic versioning', 'changelog', 'release notes', 'breaking change', 'migration guide', 'upgrade path', 'backward compatibility', 'deprecation', 'obsolete', 'experimental', 'preview', 'GA', 'LTS', 'support', 'community', 'Stack Overflow', 'GitHub', 'NuGet', 'package', 'library', 'framework', 'SDK', 'tooling', 'IDE', 'Visual Studio', 'VS Code', 'debugging', 'profiling', 'diagnostics',
  'xUnit', 'NUnit', 'MSTest', 'Moq', 'NSubstitute', 'FakeItEasy', 'unit test C#', 'integration test .NET', 'test coverage', 'mutation testing', 'TDD', 'BDD', 'SpecFlow', 'FluentAssertions', 'Shouldly', 'benchmark', 'BenchmarkDotNet', 'performance testing', 'load testing', 'k6', 'JMeter', 'API testing', 'contract testing', 'Pact', 'Postman', 'REST client', 'HttpClient', 'Polly', 'resilience', 'retry policy', 'timeout policy', 'circuit breaker .NET', 'middleware pipeline', 'request pipeline', 'exception handling', 'global exception handler', 'problem details', 'RFC 7807', 'error response', 'validation', 'FluentValidation', 'DataAnnotations', 'model validation', 'async await', 'Task', 'ValueTask', 'CancellationToken', 'IAsyncEnumerable', 'parallel', 'concurrent', 'thread safety', 'lock', 'SemaphoreSlim', 'Channel', 'System.Threading.Channels', 'background service', 'IHostedService', 'Worker Service', 'scheduled task', 'cron', 'Hangfire', 'Quartz.NET', 'message queue', 'Azure Service Bus', 'RabbitMQ', 'MassTransit', 'MediatR', 'CQRS .NET', 'vertical slice architecture', 'minimal API', 'endpoint filter', 'endpoint group', 'route group', 'tag', 'OpenAPI', 'Swagger UI', 'API versioning .NET', 'URL versioning', 'header versioning', 'content negotiation', 'accept header', 'content type', 'serialization', 'System.Text.Json', 'Newtonsoft.Json', 'JSON options', 'camelCase', 'PascalCase', 'nullable reference types', 'record type', 'init only', 'pattern matching', 'switch expression', 'primary constructor', 'collection expressions', 'ref struct', 'span', 'memory', 'array pool', 'ArrayPool', 'buffer', 'pipe', 'PipeReader', 'PipeWriter', 'stream', 'Stream', 'Pipe', 'encoding', 'UTF-8', 'base64', 'hashing', 'HMAC', 'encryption', 'AES', 'symmetric', 'asymmetric', 'certificate', 'X.509', 'data protection', 'IDataProtector', 'secrets manager', 'Azure Key Vault', 'environment variable', 'user secrets', 'launch settings', 'appsettings', 'configuration provider', 'IConfiguration', 'IOptions', 'IOptionsSnapshot', 'IOptionsMonitor', 'dependency injection', 'ServiceCollection', 'IServiceProvider', 'lifetime', 'singleton', 'scoped', 'transient', 'dispose', 'IAsyncDisposable', 'IDisposable', 'using', 'finalizer', 'GC', 'memory leak', 'heap', 'stack', 'value type', 'reference type', 'boxing', 'unboxing', 'struct', 'class', 'interface', 'abstract class', 'inheritance', 'composition', 'polymorphism', 'encapsulation', 'abstraction', 'separation of concerns', 'single responsibility', 'open closed', 'Liskov substitution', 'interface segregation', 'dependency inversion'
]

/** Slug to readable phrase (e.g. azure-microservices-best-practices -> Azure Microservices Best Practices) */
function slugToPhrase(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

/** Tech/context suffixes for slug/title phrases (article-related only) — expanded for 600–1200 terms */
const PHRASE_SUFFIXES = [
  ' guide', ' tutorial', ' best practices', ' in .NET', ' in C#', ' for developers', ' examples', ' patterns', ' overview', ' introduction', ' deep dive', ' explained', ' how to', ' what is', ' when to use', ' for enterprise', ' .NET Core', ' Azure', ' C#',
  ' with .NET', ' with C#', ' with Azure', ' with Angular', ' with Vue', ' with React', ' with Entity Framework', ' with SQL Server', ' step by step', ' complete guide', ' from scratch', ' 2024', ' 2025', ' 2026', ' code example', ' sample code', ' implementation', ' real world', ' production', ' for beginners', ' advanced',
  ' for architects', ' for backend', ' for API', ' in ASP.NET Core', ' with EF Core', ' with Azure', ' tutorial 2024', ' guide 2025', ' best practices 2024', ' C# examples', ' .NET examples', ' implementation guide', ' how to implement', ' benefits', ' advantages', ' pitfalls', ' alternatives', ' compared', ' intro', ' basics', ' tips and tricks', ' production-ready', ' enterprise-grade', ' maintainable', ' testable', ' refactoring', ' modern', ' updated', ' latest', ' for tech leads', ' for senior devs', ' with Docker', ' with Kubernetes', ' in .NET 8', ' in .NET 7', ' in .NET 6'
]

/** Generate article-related phrases from slug words (1–4 word chunks + suffixes) for ~8x coverage. Deduped. */
function slugSubphrases(slug) {
  const words = slug.split('-').filter(Boolean)
  if (words.length === 0) return []
  const phrase = slugToPhrase(slug)
  const lower = phrase.toLowerCase()
  const out = new Set([phrase, lower])
  for (let i = 0; i < words.length; i++) {
    const one = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase()
    out.add(one)
    PHRASE_SUFFIXES.slice(0, 10).forEach(s => { out.add(one + s); out.add(one.toLowerCase() + s) })
    for (let j = i + 1; j <= Math.min(i + 4, words.length); j++) {
      const sub = words.slice(i, j).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
      const subLower = sub.toLowerCase()
      out.add(sub)
      out.add(subLower)
      PHRASE_SUFFIXES.forEach(s => {
        out.add(sub + s)
        out.add(subLower + s)
      })
    }
  }
  PHRASE_SUFFIXES.forEach(s => { out.add(lower + s); out.add(phrase + s) })
  return [...out]
}

/** Article-related phrases from title words (1–3 word chunks + suffixes). Deduped. */
function titleSubphrases(title) {
  if (!title || typeof title !== 'string') return []
  const words = title.replace(/[:–—\-]/g, ' ').split(/\s+/).filter(w => w.length > 1 && !/^[a-zA-Z]$/.test(w))
  if (words.length === 0) return []
  const out = new Set()
  for (let i = 0; i < words.length; i++) {
    const one = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase()
    out.add(one)
    PHRASE_SUFFIXES.slice(0, 12).forEach(s => { out.add(one + s); out.add(one.toLowerCase() + s) })
    for (let j = i + 1; j <= Math.min(i + 3, words.length); j++) {
      const sub = words.slice(i, j).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
      const subLower = sub.toLowerCase()
      out.add(sub)
      out.add(subLower)
      PHRASE_SUFFIXES.forEach(s => { out.add(sub + s); out.add(subLower + s) })
    }
  }
  return [...out]
}

/** Count words in markdown content (strip code blocks, links, markdown syntax) */
function wordCount(content) {
  if (!content || typeof content !== 'string') return 0
  const stripped = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return stripped.split(' ').filter(Boolean).length
}

/**
 * Build long-tail phrases from title and slug (article-specific).
 * Maximized list to support 100–400 terms per article.
 */
function longTailFromTitleAndSlug(title, slug) {
  const phrase = slugToPhrase(slug)
  const lower = phrase.toLowerCase()
  const list = [
    phrase,
    phrase + ' best practices',
    'how to ' + lower,
    lower + ' in .NET',
    lower + ' guide',
    lower + ' for enterprise',
    lower + ' patterns',
    'when to use ' + lower,
    lower + ' tutorial',
    lower + ' examples',
    lower + ' in C#',
    lower + ' overview',
    lower + ' implementation',
    'understanding ' + lower,
    lower + ' for developers',
    lower + ' checklist',
    lower + ' tips',
    lower + ' deep dive',
    lower + ' comparison',
    lower + ' vs alternatives',
    lower + ' .NET Core',
    lower + ' Azure',
    lower + ' explained',
    lower + ' when to use',
    lower + ' enterprise',
    lower + ' .NET',
    'what is ' + lower,
    lower + ' summary',
    lower + ' introduction',
    lower + ' fundamentals',
    lower + ' step by step',
    lower + ' complete guide',
    lower + ' for beginners',
    lower + ' advanced',
    lower + ' production',
    lower + ' real world',
    lower + ' example code',
    lower + ' C# example',
    lower + ' .NET example',
    'learn ' + lower,
    lower + ' learn',
    lower + ' reference',
    lower + ' cheat sheet',
    lower + ' pitfalls',
    lower + ' common mistakes',
    lower + ' performance',
    lower + ' optimization',
    lower + ' security',
    lower + ' testing',
    lower + ' unit test',
    lower + ' integration',
    lower + ' migration',
    lower + ' from scratch',
    lower + ' 2024',
    lower + ' 2025',
    'best ' + lower,
    lower + ' best',
    'pro ' + lower,
    lower + ' expert',
    lower + ' consultant',
    lower + ' services',
    lower + ' course',
    lower + ' workshop',
    lower + ' webinar',
    lower + ' blog',
    lower + ' article',
    lower + ' post',
    'why ' + lower,
    'when ' + lower,
    'where ' + lower,
    lower + ' in .NET 6',
    lower + ' in .NET 7',
    lower + ' in .NET 8',
    lower + ' for C#',
    lower + ' for Angular',
    lower + ' for Vue',
    lower + ' for React',
    lower + ' for Azure',
    lower + ' for microservices',
    lower + ' for API',
    lower + ' for database',
    lower + ' for testing',
    lower + ' for DevOps',
    lower + ' for senior developers',
    lower + ' for team',
    lower + ' for production',
    lower + ' for scale',
    lower + ' for refactoring',
    lower + ' for enterprise applications',
    lower + ' for startup',
    lower + ' in 2024',
    lower + ' in 2025',
    lower + ' in 2026',
    lower + ' code sample',
    lower + ' code example',
    lower + ' sample code',
    lower + ' full example',
    lower + ' working example',
    lower + ' practical ' + lower,
    lower + ' real world example',
    lower + ' use case',
    lower + ' use cases',
    lower + ' scenario',
    lower + ' scenarios',
    lower + ' pattern',
    lower + ' patterns',
    lower + ' approach',
    lower + ' approaches',
    lower + ' strategy',
    lower + ' strategies',
    lower + ' technique',
    lower + ' techniques',
    lower + ' method',
    lower + ' methods',
    lower + ' solution',
    lower + ' solutions',
    lower + ' implementation guide',
    lower + ' getting started',
    lower + ' quick start',
    lower + ' overview guide',
    lower + ' comprehensive guide',
    lower + ' detailed guide',
    lower + ' practical guide',
    lower + ' developer guide',
    lower + ' engineer guide',
    lower + ' architect guide',
    lower + ' for architects',
    lower + ' for backend',
    lower + ' for tech leads',
    lower + ' for senior devs',
    'benefits of ' + lower,
    'advantages of ' + lower,
    'alternatives to ' + lower,
    'compared to ' + lower,
    'intro to ' + lower,
    'basics of ' + lower,
    lower + ' tips and tricks',
    lower + ' production-ready',
    lower + ' enterprise-grade',
    lower + ' with Docker',
    lower + ' with Kubernetes',
    lower + ' in ASP.NET Core',
    lower + ' with Entity Framework',
    lower + ' with EF Core',
    lower + ' modern',
    lower + ' updated',
    lower + ' latest',
    lower + ' walkthrough',
    lower + ' hands-on',
    lower + ' practical examples',
    lower + ' real-world examples',
    lower + ' common pitfalls',
    lower + ' gotchas',
    lower + ' FAQ',
    lower + ' FAQs',
    lower + ' Q&A',
    lower + ' interview questions',
    lower + ' interview',
    lower + ' certification',
    lower + ' training',
    lower + ' workshop',
    lower + ' webinar',
    lower + ' video',
    lower + ' series',
    lower + ' part 1',
    lower + ' fundamentals',
    lower + ' core concepts',
    lower + ' key concepts',
    lower + ' summary',
    lower + ' recap',
    lower + ' takeaways',
    lower + ' conclusion',
    lower + ' next steps',
    lower + ' further reading',
    lower + ' resources',
    lower + ' tools',
    lower + ' libraries',
    lower + ' frameworks',
    lower + ' NuGet',
    lower + ' package',
    lower + ' GitHub',
    lower + ' open source',
    lower + ' community',
    lower + ' Microsoft docs',
    lower + ' documentation',
    lower + ' official guide',
    lower + ' official tutorial'
  ]
  if (lower.includes('.net') || lower.includes('dotnet')) {
    list.push(lower.replace(' .net', '').replace(' dotnet', '') + ' with .NET Core', lower + ' ASP.NET Core')
  }
  if (lower.includes('azure')) {
    list.push(lower + ' on Azure', 'Azure ' + lower, lower + ' Azure cloud', 'Azure ' + lower + ' pattern')
  }
  return [...new Set(list)]
}

/**
 * Target keyword count scaled by word count — ~8x coverage (200–1200).
 * 200 for <2k words, 200–600 for 2k–5k, 600–1200 for 5k+. Article-related only; dedupe must.
 */
function targetKeywordCount(contentWordCount) {
  if (contentWordCount < 2000) return 200
  if (contentWordCount < 5000) return Math.min(600, 200 + Math.floor(contentWordCount / 15))
  return Math.min(1200, 600 + Math.floor((contentWordCount - 5000) / 15))
}

/**
 * Build full keywords array: 200–1200 terms. Strict dedupe (norm = lowercase trim); article-related only.
 */
function buildKeywords(title, slug, topic, contentWordCount) {
  const targetCount = targetKeywordCount(contentWordCount)
  const topicList = TOPIC_TERMS[topic] || TOPIC_TERMS.Architecture
  const primary = [title]
  const longTail = longTailFromTitleAndSlug(title, slug)
  const subphrases = slugSubphrases(slug)
  const titlePhrases = titleSubphrases(title)
  const combined = [...primary, ...longTail, ...subphrases, ...titlePhrases, ...topicList, ...SHARED_TERMS]
  const seen = new Set()
  const out = []
  for (const t of combined) {
    const key = norm(t)
    if (key && !seen.has(key) && out.length < targetCount) {
      seen.add(key)
      out.push(String(t).trim())
    }
  }
  return out
}

function updateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const slugMatch = content.match(/\bslug\s*:\s*["']([^"']+)["']\s*,/)
  const titleMatch = content.match(/\btitle\s*:\s*["']([^"']+)["']\s*,/)
  const topicMatch = content.match(/\btopic\s*:\s*["']([^"']+)["']\s*,/)
    // Extract content: template literal may contain backticks (code blocks). End is last `, before "\n  faqs:" or `\n}
  let contentStr = ''
  const contentStart = content.indexOf('content: `')
  if (contentStart !== -1) {
    const start = contentStart + 'content: `'.length
    const faqsMarker = content.indexOf('\n  faqs:', start)
    let endIdx = -1
    if (faqsMarker !== -1) {
      const beforeFaqs = content.slice(start, faqsMarker)
      const lastBacktickComma = beforeFaqs.lastIndexOf('`,')
      if (lastBacktickComma !== -1) endIdx = start + lastBacktickComma
    }
    if (endIdx === -1) {
      const backtickClose = content.indexOf('`\n}', start)
      if (backtickClose !== -1) endIdx = backtickClose
    }
    if (endIdx !== -1) contentStr = content.slice(start, endIdx)
  }
  if (!slugMatch || !titleMatch || !topicMatch) return { updated: false, reason: 'missing slug/title/topic' }
  const slug = slugMatch[1]
  const title = titleMatch[1]
  const topic = topicMatch[1]
  const words = wordCount(contentStr)
  const keywords = buildKeywords(title, slug, topic, words)
  const newKeywordsLine = '  keywords: [' + keywords.map(k => JSON.stringify(k)).join(', ') + '],'
  const oldKeywordsRe = /^\s*keywords\s*:\s*\[[^\]]*\],?\s*$/m
  if (!oldKeywordsRe.test(content)) return { updated: false, reason: 'no keywords line' }
  const newContent = content.replace(oldKeywordsRe, newKeywordsLine)
  if (newContent === content) return { updated: false, reason: 'no change' }
  fs.writeFileSync(filePath, newContent, 'utf8')
  return { updated: true, termCount: keywords.length, words }
}

const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.js')).sort()
let updated = 0
const results = []
for (const f of files) {
  const full = path.join(ARTICLES_DIR, f)
  const result = updateFile(full)
  if (result.updated) {
    updated++
    results.push({ file: f, terms: result.termCount, words: result.words })
    console.log('OK', f, 'terms:', result.termCount, 'words:', result.words)
  } else {
    console.log('SKIP', f, result.reason || '')
  }
}
console.log('\nDone. Updated', updated, 'of', files.length, 'articles.')
const termCounts = results.map(r => r.terms)
const min = Math.min(...termCounts)
const max = Math.max(...termCounts)
console.log('Keyword count per article: min', min, 'max', max, '(~8x: 200-1200 scaled by word count, deduped)')
