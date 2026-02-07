/**
 * SEO keywords by path — source: docs/SEO_KEYWORDS_UPGRADE.md (Format B).
 * primary (1) + secondary (6–8) + semantic (6–8). Meta: primary first, then secondary + semantic, max 8.
 */
const MAX_META_KEYWORDS = 8

export const SEO_KEYWORDS = {
    "/": {
      "primary": "senior software engineer architect portfolio and consulting overview",
      "secondary": [
        "enterprise systems design and delivery background",
        "cloud native architecture and engineering expertise",
        ".NET and Azure distributed application experience",
        "technical leadership across global remote teams",
        "full stack development and integration capabilities",
        "high scale reliable system implementation history",
        "engineering consulting for enterprise clients"
      ],
      "semantic": [
        "distributed systems principles",
        "api design and service boundaries",
        "reliability scalability patterns",
        "cloud native modernization approach",
        "observability and tracing fundamentals",
        "microservices and integration patterns",
        "clean architecture and modular design"
      ]
    },
    "/blog": {
      "primary": "technical engineering blog on cloud microservices and dotnet architecture",
      "secondary": [
        "enterprise architecture guides and walkthroughs",
        "Azure and .NET engineering best practices",
        "microservices cloud patterns and tutorials",
        "developer workflow and productivity insights",
        "system design and architecture explanations",
        "frontend backend engineering knowledge base",
        "practical engineering deep dives and articles"
      ],
      "semantic": [
        "observability and distributed tracing",
        "testing ci cd pipelines",
        "api best practices and standards",
        "scalability and performance tuning",
        "cloud architecture decision frameworks",
        "modern development tooling",
        "backend frontend architecture patterns"
      ]
    },
    "/privacy": {
      "primary": "privacy policy explaining analytics data usage and user rights",
      "secondary": [
        "how analytics data is collected and stored",
        "Microsoft Clarity and Google Analytics usage details",
        "cookie consent preferences and tracking disclosure",
        "data handling transparency for visitors",
        "security and privacy protection commitments",
        "user choices and opt out mechanisms",
        "information about browsing data retention"
      ],
      "semantic": [
        "cookie policy",
        "browser privacy controls",
        "analytics telemetry events",
        "user consent preferences",
        "data retention policies",
        "non personal information usage",
        "privacy compliance guidelines"
      ]
    },
    "/404": {
      "primary": "page not found fallback navigation assistance screen",
      "secondary": [
        "unavailable resource or incorrect url notice",
        "navigation guidance back to homepage",
        "help redirect users to valid pages",
        "improving user experience for broken routes",
        "friendly error page messaging",
        "link suggestions for returning"
      ],
      "semantic": [
        "fallback routing",
        "error state handling",
        "broken link management",
        "navigation recovery flow",
        "missing content handling",
        "user experience continuity",
        "website routing awareness"
      ]
    },
    "/services/full-stack-development": {
      "primary": "full stack enterprise application development for scalable business systems",
      "secondary": [
        "end to end frontend and backend delivery",
        "React Angular Vue modern interface engineering",
        ".NET Core backend development for enterprises",
        "API integration and platform extension workflows",
        "scalable cloud ready application implementations",
        "performance optimized enterprise grade solutions",
        "secure and maintainable software architecture"
      ],
      "semantic": [
        "frontend backend orchestration",
        "microservices aligned api design",
        "modular monolith and service boundaries",
        "continuous integration delivery pipelines",
        "testing automation and quality practices",
        "cloud native deployment approaches",
        "clean architecture implementation"
      ]
    },
    "/services/azure-cloud-architecture": {
      "primary": "azure cloud architecture design for scalable secure enterprise platforms",
      "secondary": [
        "cloud migration modernization and workload planning",
        "high availability deployment strategies on Azure",
        "cost optimized cloud infrastructure engineering",
        "identity security and governance implementation",
        "resilient distributed systems on Azure services",
        "enterprise cloud adoption and platform setup",
        "scalability performance and cloud reliability"
      ],
      "semantic": [
        "infrastructure as code bicep",
        "azure container hosting",
        "service bus and event grid messaging",
        "azure devops ci cd automation",
        "cloud security and compliance posture",
        "distributed architecture principles",
        "resilience and failover patterns"
      ]
    },
    "/services/technical-leadership": {
      "primary": "technical leadership for engineering teams delivering complex enterprise systems",
      "secondary": [
        "team mentorship and engineering guidance",
        "architecture decision support and reviews",
        "code quality standards and best practices",
        "remote and distributed team leadership",
        "sprint planning delivery and execution",
        "scaling engineering processes effectively",
        "aligning teams with business objectives"
      ],
      "semantic": [
        "engineering management frameworks",
        "technical decision making models",
        "cross team collaboration structures",
        "async communication workflows",
        "architecture governance",
        "quality assurance oversight",
        "software delivery lifecycle coaching"
      ]
    },
    "/services/microservices-architecture": {
      "primary": "microservices architecture design for resilient scalable distributed applications",
      "secondary": [
        "service decomposition and domain modeling",
        "containerized microservices deployment strategy",
        "event driven communication patterns",
        "api gateway routing and aggregation logic",
        "cloud native microservices hosting platforms",
        "resilient fault tolerant service design",
        "enterprise modernization using microservices"
      ],
      "semantic": [
        "domain driven design contexts",
        "circuit breaker retry patterns",
        "message queues and event brokers",
        "service mesh observability",
        "zero downtime rolling deployments",
        "bounded context mapping",
        "async communication workflows"
      ]
    },
    "/services/agile-project-management": {
      "primary": "agile project management for engineering teams delivering software effectively",
      "secondary": [
        "scrum sprint planning and retrospectives",
        "stakeholder communication and alignment",
        "kanban flow optimization and tracking",
        "agile coaching for team performance",
        "backlog refinement and prioritization practices",
        "removing delivery blockers and risks",
        "improving team collaboration and clarity"
      ],
      "semantic": [
        "scrum ceremonies and artifacts",
        "velocity estimation and forecasting",
        "cross functional team coordination",
        "continuous improvement mindset",
        "lean delivery principles",
        "agile transformation practices",
        "software delivery lifecycle efficiency"
      ]
    },
    "/services/database-design-optimization": {
      "primary": "database design and performance optimization for high throughput applications",
      "secondary": [
        "query performance tuning and indexing strategies",
        "schema design normalization and restructuring",
        "sql server and azure sql optimization work",
        "entity framework performance improvements",
        "efficient data modeling for scale",
        "high volume transaction system tuning",
        "read write optimization and load handling"
      ],
      "semantic": [
        "execution plan analysis",
        "index statistics and cardinality",
        "oltp optimization techniques",
        "isolation levels and locking",
        "query batching and connection pooling",
        "database architecture modeling",
        "data access layer optimization"
      ]
    },
    "/services/mobile-development": {
      "primary": "cross platform mobile application development for ios and android ecosystems",
      "secondary": [
        "native and hybrid mobile application engineering",
        "react native flutter and capacitor solutions",
        "mobile app store deployment and release cycles",
        "high performance mobile ui ux implementation",
        "device capability integration and offline support",
        "frontend backend synchronized mobile workflows",
        "secure and scalable mobile application design"
      ],
      "semantic": [
        "native bridge apis",
        "pwa and hybrid mobile patterns",
        "local storage and sync strategies",
        "mobile performance optimization",
        "push notifications and background tasks",
        "cross platform build pipelines",
        "mobile responsive architecture"
      ]
    },
    "/projects/heat-exchanger": {
      "primary": "heat exchanger monitoring platform for petroleum refinery operations case study",
      "secondary": [
        "real time industrial equipment monitoring system",
        "predictive maintenance for refinery heat exchangers",
        "high frequency sensor analytics and processing",
        "operational efficiency improvements in oil and gas",
        "enterprise scale monitoring dashboards and alerts",
        "data driven decision support for plant operations",
        "continuous uptime and reliability enhancements"
      ],
      "semantic": [
        "grafana prometheus observability stack",
        "kafka data ingestion pipelines",
        "openshift container orchestration",
        "microservices api gateway integration",
        "predictive failure pattern detection",
        "industrial iot telemetry processing",
        "zero downtime deployment workflows"
      ]
    },
    "/projects/airasia-id90": {
      "primary": "employee flight discount booking platform for airasia real time case study",
      "secondary": [
        "id90 last minute discounted ticket processing",
        "real time flight data retrieval and booking",
        "high concurrency airline employee benefits portal",
        "secure authentication and user identity flows",
        "enterprise grade availability for ticketing system",
        "seamless booking experience under time constraints",
        "low latency airline reservation integration"
      ],
      "semantic": [
        "google sso authentication",
        "legacy airline reservation system integration",
        "dotnet core and angular application stack",
        "high throughput booking pipelines",
        "cache based availability checks",
        "refund management workflow",
        "real time concurrency handling"
      ]
    },
    "/projects/bat-inhouse-app": {
      "primary": "enterprise application platform integrating sap and internal systems case study",
      "secondary": [
        "workflow automation across business departments",
        "integration with sap sharepoint and cherwell systems",
        "centralized enterprise application for bat operations",
        "cloud based microservices for business processes",
        "unified access across internal digital systems",
        "improved data quality and process reliability",
        "scalable enterprise integration architecture"
      ],
      "semantic": [
        "azure service fabric microservices",
        "cosmos db distributed storage",
        "sap integration patterns",
        "enterprise workflow coordination",
        "identity and access management",
        "modular service based architecture",
        "sharepoint and power apps connectors"
      ]
    },
    "/projects/pj-smart-city": {
      "primary": "smart city geospatial gis platform for municipal operations case study",
      "secondary": [
        "supermap gis integration for city governance",
        "3d geospatial visualization for municipal data",
        "iot enabled city infrastructure monitoring",
        "real time mapping and civic operations platform",
        "big data geospatial analytics for city planning",
        "centralized municipal services digitalization",
        "improved decision making for city authorities"
      ],
      "semantic": [
        "supermap gis and big data",
        "dotnet core and angular application stack",
        "iot sensors data ingestion",
        "geospatial ai workflows",
        "azure cloud hosting",
        "3d city modeling",
        "geospatial analytics and mapping"
      ]
    },
    "/projects/gamified-employee-management": {
      "primary": "gamification platform for employee engagement and performance analytics case study",
      "secondary": [
        "points badges and leaderboard engagement models",
        "real time employee performance tracking",
        "enterprise gamification for workforce motivation",
        "modern engagement mechanics across departments",
        "analytics driven incentives and progression metrics",
        "improved organizational engagement processes",
        "customizable gamified workflows for teams"
      ],
      "semantic": [
        "event driven engagement engine",
        "real time scoring and rewards logic",
        "microservices based gamification modules",
        "idempotent event processing",
        "eligibility rule evaluation",
        "achievement progression models",
        "analytics dashboards and reporting"
      ]
    },
    "/projects/valet-parking": {
      "primary": "valet parking management platform with real time tracking case study",
      "secondary": [
        "mobile application for vehicle check in and tracking",
        "streamlined valet workflow for parking operations",
        "real time status updates for customers",
        "secure vehicle handover and verification flow",
        "analytics for operational efficiency improvements",
        "centralized management for multiple parking sites",
        "digital transformation of valet service operations"
      ],
      "semantic": [
        "dotnet core backend services",
        "mobile application integration",
        "real time notification workflows",
        "qr based validation processes",
        "cloud hosted service components",
        "operational analytics and metrics",
        "event driven status updates"
      ]
    },
    "/projects/mobile-games": {
      "primary": "mobile game development portfolio for ios and android platforms case study",
      "secondary": [
        "collection of casual and action mobile games",
        "gameplay mechanics optimized for mobile devices",
        "interactive user experiences for gaming audiences",
        "cross platform game development workflows",
        "performance tuning for mobile game engines",
        "variety of genres and game mechanics",
        "engaging visual and animation design"
      ],
      "semantic": [
        "andengine java mobile frameworks",
        "ios and android build pipelines",
        "game performance optimization",
        "sprite rendering engines",
        "asset loading and memory tuning",
        "backend integration for gaming",
        "real time interactions and events"
      ]
    },
    "/projects/uk-property-management": {
      "primary": "uk property management platform for enterprise scale operations case study",
      "secondary": [
        "full lifecycle tenancy and compliance features",
        "large scale residential property management",
        "workflow automation for estate operations",
        "centralized data management for properties",
        "advanced property reporting and dashboards",
        "multi user enterprise access and controls",
        "modern digital system for property managers"
      ],
      "semantic": [
        ".net core and angular architecture",
        "sql server data modeling",
        "event driven background processing",
        "document generation and storage",
        "rental lifecycle workflows",
        "gdpr and compliance mechanisms",
        "multi tenancy application patterns"
      ]
    },
    "/projects/g5-pos": {
      "primary": "food and beverage point of sale platform for real time operations case study",
      "secondary": [
        "real time order management and tracking",
        "restaurant billing and kitchen coordination",
        "centralized menu and branch administration",
        "fast and reliable pos system for fnb",
        "improved operational efficiency for restaurants",
        "cloud sync across multiple restaurant locations",
        "staff workflow digitalization and automation"
      ],
      "semantic": [
        "dotnet core microservices",
        "real time order event handling",
        "distributed pos synchronization",
        "kitchen display integration",
        "cloud database services",
        "branch management workflows",
        "reporting and sales analytics"
      ]
    },
    "/projects/chubb-insurance-applications": {
      "primary": "enterprise insurance application suite policy and claims platform case study",
      "secondary": [
        "confidential insurance clients top five global agency",
        "secure insurance policy management and claims processing workflows",
        "enterprise insurance management platform for large agencies",
        "digital transformation of policy and claims operations",
        "high availability enterprise insurance application suite",
        "scalable cloud ready policy management and claims platform",
        "improved claim handling and customer experience at scale"
      ],
      "semantic": [
        ".net core enterprise backend",
        "secure multi tenant application design",
        "claims processing automation",
        "policy data management flows",
        "authentication authorization pipelines",
        "cloud deployment architecture",
        "audit logging and compliance features"
      ]
    },
    "/blog/agile-delivery-enterprise-constraints": {
      "primary": "agile delivery practices under strict enterprise constraints",
      "secondary": [
        "navigating governance and compliance in agile environments",
        "managing delivery risks within regulated enterprises",
        "improving agility without violating enterprise policies",
        "balancing speed and control in engineering teams",
        "large organization challenges to agile adoption",
        "stakeholder alignment in enterprise project delivery",
        "scaling agile methods in complex structures"
      ],
      "semantic": [
        "scrum and kanban adaptation",
        "governance compliance requirements",
        "enterprise approval workflows",
        "risk mitigation strategies",
        "agile maturity assessment",
        "cross team coordination challenges",
        "iterative delivery constraints"
      ]
    },
    "/blog/ai-changing-code-review-testing": {
      "primary": "how artificial intelligence transforms code review and testing",
      "secondary": [
        "automating testing with ai driven tools",
        "improving code quality through intelligent review",
        "reducing manual QA effort using AI analysis",
        "accelerating development cycles with automated checks",
        "integrating AI into software validation workflows",
        "enhancing reliability through predictive test coverage",
        "identifying risks and defects via machine learning"
      ],
      "semantic": [
        "llm assisted code analysis",
        "test generation automation",
        "static and dynamic code inspection",
        "automated qa pipelines",
        "model driven review suggestions",
        "predictive quality scoring",
        "ai based risk detection"
      ]
    },
    "/blog/ai-ides-what-they-get-right-wrong": {
      "primary": "evaluation of ai powered ides strengths and limitations",
      "secondary": [
        "benefits of ai assisted coding workflows",
        "challenges with context awareness and accuracy",
        "developer reliance on automated code suggestions",
        "productivity gains from intelligent IDE features",
        "limitations of autocomplete in complex scenarios",
        "balancing human insight with automated tools",
        "understanding where ai coding tools misfire"
      ],
      "semantic": [
        "cursor and copilot comparison",
        "llm driven refactoring tools",
        "context window limitations",
        "semantic code completion",
        "ai assisted documentation generation",
        "integration with developer workflows",
        "ide plugin intelligence models"
      ]
    },
    "/blog/ai-models-claude-gemini-gpt-deepseek-comparison": {
      "primary": "comparative analysis of claude gemini gpt and deepseek models",
      "secondary": [
        "strengths and weaknesses across major llms",
        "differences in reasoning coding and accuracy",
        "evaluation of latency performance and cost",
        "understanding ideal use cases per model type",
        "capabilities comparison for development tasks",
        "practical guidance on choosing an llm",
        "benchmarks of model behavior in real workflows"
      ],
      "semantic": [
        "context window differences",
        "model reasoning depth",
        "token efficiency patterns",
        "api usage characteristics",
        "hallucination rate comparisons",
        "structured vs unstructured output",
        "coding assistance evaluation"
      ]
    },
    "/blog/api-gateway-vs-bff": {
      "primary": "deciding between api gateway and backend for frontend patterns",
      "secondary": [
        "understanding differences between gateway and bff",
        "when to use a unified gateway approach",
        "when a bff pattern improves frontend experience",
        "designing microservices friendly api boundaries",
        "reducing over fetching and under fetching issues",
        "improving frontend performance through tailored apis",
        "architectural tradeoffs between the two patterns"
      ],
      "semantic": [
        "routing and aggregation logic",
        "service boundary definitions",
        "frontend specific api shaping",
        "gateway vs bff responsibilities",
        "microservices interaction patterns",
        "latency reduction strategies",
        "api evolution and versioning"
      ]
    },
    "/blog/azure-bicep-iac-basics": {
      "primary": "introduction to azure bicep for infrastructure as code",
      "secondary": [
        "simplifying azure deployments using bicep language",
        "understanding bicep syntax and core concepts",
        "advantages of bicep over json arm templates",
        "authoring modular and reusable infrastructure code",
        "automating cloud deployments with iac pipelines",
        "improving maintainability of cloud configurations",
        "managing azure resources declaratively"
      ],
      "semantic": [
        "bicep modules and parameters",
        "arm template transpilation",
        "azure resource deployment",
        "declarative iac design",
        "ci cd deployment automation",
        "infrastructure version control",
        "repeatable cloud provisioning"
      ]
    },
    "/blog/azure-cloud-architecture-patterns": {
      "primary": "azure cloud architecture patterns for building scalable applications",
      "secondary": [
        "choosing appropriate cloud design patterns",
        "azure services mapped to architecture principles",
        "scalability reliability and performance guidelines",
        "best practices for distributed cloud workloads",
        "optimizing costs across azure solutions",
        "reference architectures for cloud native systems",
        "high availability approaches in azure"
      ],
      "semantic": [
        "queue based load leveling",
        "event driven architecture",
        "circuit breaker and retry policies",
        "autoscaling patterns",
        "microservices on azure",
        "cloud resource governance",
        "horizontal scaling models"
      ]
    },
    "/blog/azure-devops-vs-github-actions": {
      "primary": "comparison of azure devops and github actions for ci cd pipelines",
      "secondary": [
        "differences between the two pipeline ecosystems",
        "choosing the right ci cd tool for teams",
        "integration options with cloud and code hosting",
        "flexibility of yaml pipelines and workflows",
        "build and deployment automation approaches",
        "cost and usability comparisons for developers",
        "migration considerations between the platforms"
      ],
      "semantic": [
        "pipeline orchestration",
        "self hosted and cloud runners",
        "environment promotion flows",
        "deployment automation strategies",
        "repository integration patterns",
        "artifact management approaches",
        "multi stage release pipelines"
      ]
    },
    "/blog/azure-microservices-best-practices": {
      "primary": "best practices for building microservices architectures on azure",
      "secondary": [
        "service decomposition based on domain modeling",
        "choosing compute options for microservices",
        "building resilient distributed applications on azure",
        "designing event driven communication patterns",
        "observability approaches for microservices systems",
        "managing configuration and versioning at scale",
        "improving reliability with retry and fallback logic"
      ],
      "semantic": [
        "azure service fabric",
        "event grid and service bus",
        "container orchestration on aks",
        "distributed tracing frameworks",
        "circuit breaker implementation",
        "api gateway integration",
        "stateful vs stateless services"
      ]
    },
    "/blog/azure-serverless-functions-logic-apps": {
      "primary": "deep dive into azure functions and logic apps for serverless solutions",
      "secondary": [
        "building event driven automations on azure",
        "serverless workflows with minimal infrastructure",
        "choosing between functions and logic apps",
        "use cases for orchestration and integration",
        "cost optimized serverless execution models",
        "trigger and binding concepts for functions",
        "scaling event driven workloads efficiently"
      ],
      "semantic": [
        "function triggers and bindings",
        "logic app workflow orchestration",
        "event grid and queue triggers",
        "serverless monitoring and telemetry",
        "durable functions patterns",
        "pay per execution compute model",
        "serverless integration patterns"
      ]
    },
    "/blog/behavioral-design-patterns-dotnet": {
      "primary": "overview of behavioral design patterns implemented in dotnet",
      "secondary": [
        "understanding behavioral patterns in real applications",
        "examples of observer strategy and command patterns",
        "improving code flexibility with behavioral design",
        "leveraging design patterns for maintainable solutions",
        "how behavioral patterns simplify complex logic flows",
        "using csharp implementations for classic patterns",
        "applying behavioral techniques in enterprise systems"
      ],
      "semantic": [
        "observer strategy command",
        "mediator and iterator patterns",
        "state and template method",
        "behavioral pattern responsibilities",
        "clean code architecture principles",
        "decoupling logic through patterns",
        "reusable pattern abstractions"
      ]
    },
    "/blog/caching-strategies-redis-dotnet": {
      "primary": "redis caching strategies for optimizing dotnet application performance",
      "secondary": [
        "improving read performance using distributed caching",
        "cache aside and write through patterns explained",
        "reducing database load through redis caching",
        "handling cache invalidation in enterprise systems",
        "boosting scalability using in memory caching",
        "configuring redis with dotnet applications",
        "designing efficient caching layers for apis"
      ],
      "semantic": [
        "redis distributed cache",
        "cache aside pattern",
        "write back and write through",
        "expiration policies and ttl",
        "dotnet caching middleware",
        "high performance read optimization",
        "cache invalidation strategies"
      ]
    },
    "/blog/case-study-airasia-id90": {
      "primary": "airasia id90 employee flight discount portal engineering case study",
      "secondary": [
        "near departure flight booking under time limits",
        "high concurrency discounted ticket processing",
        "improving employee travel experience through automation",
        "enterprise scale airline booking system modernization",
        "low latency ticket availability and reservation logic",
        "secure authentication for airline employees",
        "scalable services for global airline operations"
      ],
      "semantic": [
        "real time booking pipelines",
        "google sso identity integration",
        "legacy airline system connectivity",
        "dotnet and angular application stack",
        "time sensitive availability checks",
        "concurrency control mechanisms",
        "refund and rebooking workflows"
      ]
    },
    "/blog/case-study-bat-inhouse-app": {
      "primary": "bat enterprise inhouse application integrating multiple internal systems",
      "secondary": [
        "unifying workflows across hr and operations",
        "centralized access to enterprise digital tools",
        "integrating sap cherwell and sharepoint solutions",
        "improving operational efficiency through automation",
        "enhancing data consistency across departments",
        "enterprise grade architecture for large organizations",
        "scalable internal service platform deployment"
      ],
      "semantic": [
        "service fabric microservices",
        "cosmos db distributed storage",
        "sap integration workflows",
        "enterprise access management",
        "workflow automation pipelines",
        "modular service orchestration",
        "sharepoint power platform connectors"
      ]
    },
    "/blog/ci-cd-azure-devops": {
      "primary": "continuous integration and delivery using azure devops pipelines",
      "secondary": [
        "automating application builds and deployments",
        "managing multi stage release pipelines effectively",
        "creating scalable yaml based ci cd workflows",
        "enforcing quality gates in deployment cycles",
        "improving delivery speed through pipeline automation",
        "integrating testing into automated build steps",
        "managing environments and approvals in devops"
      ],
      "semantic": [
        "yaml pipeline configuration",
        "azure devops build agents",
        "pipeline environment promotion",
        "artifact storage and distribution",
        "automated test execution",
        "release management strategies",
        "continuous deployment workflows"
      ]
    },
    "/blog/clean-architecture-dotnet": {
      "primary": "clean architecture principles for structuring maintainable dotnet applications",
      "secondary": [
        "organizing code using layered architecture",
        "applying dependency rule in real solutions",
        "separating business logic from infrastructure concerns",
        "building testable scalable enterprise systems",
        "maintaining clear boundaries between application layers",
        "using dependency injection to enforce structure",
        "improving maintainability through modular design"
      ],
      "semantic": [
        "domain application infrastructure layers",
        "dependency inversion principle",
        "use case driven architecture",
        "dotnet service registration patterns",
        "clean separation of concerns",
        "onion and hexagonal influences",
        "composition root and di setup"
      ]
    },
    "/blog/creational-design-patterns-dotnet": {
      "primary": "introduction to creational design patterns with real dotnet examples",
      "secondary": [
        "creating flexible object construction mechanisms",
        "understanding factory builder and singleton usage",
        "improving code structure using creational approaches",
        "reducing complexity with reusable instantiation logic",
        "how creational patterns support clean architecture",
        "implementing patterns in csharp enterprise code",
        "practical examples of creational abstractions"
      ],
      "semantic": [
        "singleton factory builder",
        "object creation encapsulation",
        "prototypes and abstract factories",
        "pattern based instantiation",
        "dependency injection synergy",
        "reusable construction patterns",
        "dotnet pattern implementations"
      ]
    },
    "/blog/current-state-ai-coding-tools-2026": {
      "primary": "analysis of the evolving ai coding tools landscape in 2026",
      "secondary": [
        "evaluation of next generation ai developer tools",
        "coding productivity improvements through automation",
        "maturity of ai assistants in software engineering",
        "strengths and limitations of modern llms",
        "comparison of emerging coding automation platforms",
        "impact of ai tools on engineering workflows",
        "adoption trends across tech organizations"
      ],
      "semantic": [
        "ai assisted development workflows",
        "next gen ide assistants",
        "model context handling",
        "automated refactoring systems",
        "code quality enhancement tools",
        "prompt driven programming",
        "future trends in llm tooling"
      ]
    },
    "/blog/cursor-vs-claude-code-vs-copilot-ai-ide": {
      "primary": "comprehensive comparison of cursor claude code and github copilot ide assistants",
      "secondary": [
        "evaluating capabilities of leading ai coding tools",
        "strengths and limitations of each ide assistant",
        "productivity differences across coding tasks",
        "accuracy and context retention during development",
        "best use cases for each ai coding platform",
        "developer experience comparison in real workflows",
        "understanding which ide suits team needs"
      ],
      "semantic": [
        "llm context window behavior",
        "refactoring and code generation quality",
        "semantic search and code navigation",
        "interactive chat based ide workflows",
        "automated test generation comparisons",
        "editor integration depth",
        "multi file reasoning capabilities"
      ]
    },
    "/blog/data-engineering-azure-pipelines-lakehouse": {
      "primary": "data engineering practices for building azure pipelines and lakehouse architectures",
      "secondary": [
        "processing batch and streaming data at scale",
        "building lakehouse structures on azure storage",
        "automating ingestion transformation and curation workflows",
        "choosing the right compute for data workloads",
        "ensuring data quality across processing stages",
        "centralizing analytics using unified data models",
        "scalable orchestration of data engineering pipelines"
      ],
      "semantic": [
        "azure data factory orchestration",
        "delta lake transactional storage",
        "spark and databricks processing",
        "streaming ingestion architectures",
        "data lake vs lakehouse concepts",
        "metadata and governance models",
        "etl and elt workflow patterns"
      ]
    },
    "/blog/data-engineering-batch-vs-streaming": {
      "primary": "comparison of batch and streaming data engineering processing models",
      "secondary": [
        "differences between real time and scheduled pipelines",
        "choosing batch or streaming based on workload needs",
        "data latency and throughput considerations",
        "handling large scale data processing efficiently",
        "designing hybrid architectures combining both methods",
        "integration patterns for continuous data ingestion",
        "tradeoffs of real time versus periodic processing"
      ],
      "semantic": [
        "lambda and kappa architectures",
        "streaming event ingestion",
        "batch etl transformation",
        "stateful vs stateless processing",
        "windowing and late arrival handling",
        "data freshness requirements",
        "scalable processing frameworks"
      ]
    },
    "/blog/database-indexing-strategies": {
      "primary": "effective indexing strategies for optimizing database query performance",
      "secondary": [
        "determining when and what to index",
        "balancing read speed with write overhead",
        "understanding clustered and nonclustered indexes",
        "avoiding common indexing anti patterns",
        "improving performance of high traffic queries",
        "design considerations for enterprise workloads",
        "analyzing query plans to refine indexes"
      ],
      "semantic": [
        "b tree and covering indexes",
        "index seek vs index scan",
        "statistics and cardinality estimation",
        "sargability improvements",
        "fragmentation and rebuild strategies",
        "execution plan inspection",
        "composite index design"
      ]
    },
    "/blog/database-optimization-entity-framework": {
      "primary": "optimizing entity framework performance in high load applications",
      "secondary": [
        "improving efficiency of ef core queries",
        "reducing database round trips with batching",
        "diagnosing n plus one query problems",
        "configuring tracking and no tracking behaviors",
        "optimizing includes for relational joins",
        "tuning entity materialization performance",
        "applying best practices for ef data access"
      ],
      "semantic": [
        "query translation pipeline",
        "compiled queries in ef core",
        "change tracker configuration",
        "query batching techniques",
        "lazy vs eager loading patterns",
        "database provider optimization",
        "profiling and diagnostics tools"
      ]
    },
    "/blog/database-transactions-isolation-levels": {
      "primary": "understanding database transaction isolation levels in dotnet applications",
      "secondary": [
        "explanation of read committed and snapshot isolation",
        "detecting dirty reads and phantom reads",
        "choosing appropriate isolation levels for workloads",
        "balancing concurrency with data consistency",
        "mitigating locking and blocking in production",
        "ensuring transactional safety for critical operations",
        "working with distributed operations and consistency"
      ],
      "semantic": [
        "acid transaction principles",
        "isolation anomalies",
        "locking and concurrency control",
        "repeatable read and serializable levels",
        "optimistic vs pessimistic concurrency",
        "transaction scopes in dotnet",
        "deadlock investigation techniques"
      ]
    },
    "/blog/dependency-injection-dotnet-core": {
      "primary": "comprehensive guide to dependency injection patterns in dotnet core",
      "secondary": [
        "understanding scoped transient and singleton lifetimes",
        "structuring services with clear dependency boundaries",
        "improving testability through loose coupling",
        "configuring di containers effectively in dotnet",
        "implementing interface based abstractions",
        "avoiding common dependency injection pitfalls",
        "managing complex object graphs in large systems"
      ],
      "semantic": [
        "ioc container concepts",
        "service registration patterns",
        "constructor injection best practices",
        "lifetime management strategies",
        "service provider configuration",
        "composition root principles",
        "mocking and testing advantages"
      ]
    },
    "/blog/design-patterns-overview-creational-structural-behavioral": {
      "primary": "overview of creational structural and behavioral software design patterns",
      "secondary": [
        "understanding categories of classical design patterns",
        "how different patterns address common coding issues",
        "recognizing when to apply each pattern type",
        "improving system maintainability with reusable patterns",
        "avoiding overuse of patterns in simple systems",
        "harmonizing patterns with modern architecture practices",
        "benefits of pattern driven development"
      ],
      "semantic": [
        "builder factory singleton",
        "adapter decorator facade",
        "strategy observer command",
        "pattern classification groups",
        "code reuse and abstraction",
        "architectural consistency",
        "pattern selection heuristics"
      ]
    },
    "/blog/developers-integrating-ai-daily-workflows": {
      "primary": "practical ways developers integrate ai tools into daily engineering workflows",
      "secondary": [
        "using llms for code generation and refactoring",
        "improving productivity with ai assisted tasks",
        "leveraging ai for documentation and explanation",
        "automating repetitive engineering processes",
        "enhancing quality through ai driven reviews",
        "building habits to effectively collaborate with ai",
        "reducing cognitive load using intelligent tooling"
      ],
      "semantic": [
        "ai coding assistance",
        "context aware suggestions",
        "automated test generation",
        "developer productivity patterns",
        "prompt engineering techniques",
        "editor integration workflows",
        "review automation tools"
      ]
    },
    "/blog/domain-driven-design-basics": {
      "primary": "fundamentals of domain driven design for modeling complex business systems",
      "secondary": [
        "understanding bounded contexts and aggregates",
        "defining entities and value objects correctly",
        "aligning domain models with business language",
        "crafting aggregate roots for consistency control",
        "benefits of strategic modeling in complex domains",
        "collaboration between domain experts and engineers",
        "integrating ddd with modern application design"
      ],
      "semantic": [
        "ubiquitous language definition",
        "context mapping strategies",
        "ddd tactical patterns",
        "aggregate boundaries and rules",
        "event driven collaboration",
        "repository abstraction concepts",
        "domain service responsibilities"
      ]
    },
    "/blog/dotnet-core-middleware-pipeline": {
      "primary": "deep understanding of the aspnet core middleware processing pipeline",
      "secondary": [
        "ordering middleware components correctly",
        "handling authentication authorization and cors",
        "building custom middleware for enterprise needs",
        "improving performance by optimizing pipeline flow",
        "integrating exception handling and rate limiting",
        "observing request lifecycle in production systems",
        "adding security layers through middleware extensions"
      ],
      "semantic": [
        "http request processing pipeline",
        "middleware ordering rules",
        "cross cutting concerns management",
        "security headers and cors policies",
        "global exception handling",
        "request logging and tracing",
        "rate limiting mechanisms"
      ]
    },
    "/blog/event-driven-architecture-azure": {
      "primary": "implementing event driven architecture using azure messaging services",
      "secondary": [
        "choosing event grid or service bus for use cases",
        "designing decoupled asynchronous workflows",
        "improving reliability through event based processing",
        "scaling distributed systems with messaging patterns",
        "handling retries and dead letter queues effectively",
        "architecting resilient cloud native event flows",
        "integrating multiple producers and subscribers"
      ],
      "semantic": [
        "azure event grid",
        "service bus topics and queues",
        "event sourcing influences",
        "message delivery guarantees",
        "idempotent event handlers",
        "distributed event processing",
        "asynchronous communication patterns"
      ]
    },
    "/blog/event-sourcing-and-cqrs": {
      "primary": "event sourcing and cqrs patterns for scalable dotnet applications",
      "secondary": [
        "separating read and write responsibilities effectively",
        "using event stores for system state reconstruction",
        "handling command and query operations independently",
        "ensuring consistency through event driven workflows",
        "modeling aggregates for reliable write operations",
        "improving scalability using distributed event pipelines",
        "applying cqrs to complex business workflows"
      ],
      "semantic": [
        "event store persistence",
        "command handler architecture",
        "read model projection building",
        "idempotent event processing",
        "outbox pattern and reliability",
        "message replay mechanisms",
        "domain event modeling"
      ]
    },
    "/blog/feature-flags-toggles-dotnet": {
      "primary": "implementing feature flags and toggles for safe deployments in dotnet",
      "secondary": [
        "managing rollout of new features gradually",
        "using toggles for experimentation and testing",
        "reducing risk with controlled feature exposure",
        "aligning feature flags with deployment workflows",
        "enabling a b testing via feature toggles",
        "using azure app configuration for flag management",
        "improving release quality with progressive exposure"
      ],
      "semantic": [
        "IFeatureManager usage",
        "percentage based rollout",
        "runtime flag evaluation",
        "kill switches and safety toggles",
        "config driven feature control",
        "dark launches and canary tests",
        "app configuration integration"
      ]
    },
    "/blog/full-stack-net-angular-enterprise": {
      "primary": "building enterprise full stack applications using dotnet and angular",
      "secondary": [
        "creating scalable backend apis with dotnet",
        "structuring angular frontends for large systems",
        "managing http requests with interceptors",
        "implementing secure authentication and authorization",
        "ensuring clean api versioning practices",
        "synchronizing backend models with frontend",
        "automating ci cd deployment for enterprise apps"
      ],
      "semantic": [
        "openapi contract enforcement",
        "oauth2 and jwt authentication",
        "angular client architecture",
        "api drift prevention techniques",
        "environment based configuration",
        "integration and contract testing",
        "modular application design"
      ]
    },
    "/blog/gamification-enterprise-apps": {
      "primary": "implementing gamification mechanics in enterprise software applications",
      "secondary": [
        "designing points badges and leaderboard systems",
        "using gamification to increase employee engagement",
        "defining fair and transparent reward rules",
        "aligning gamification with business outcomes",
        "building real time engagement dashboards",
        "handling idempotency in rewards assignment",
        "integrating gamification into existing workflows"
      ],
      "semantic": [
        "event driven scoring engine",
        "rule evaluation mechanism",
        "batch and real time processing",
        "achievement progression models",
        "eligibility criteria enforcement",
        "engagement metrics analytics",
        "scalable gamification backend"
      ]
    },
    "/blog/grpc-vs-rest-dotnet-apis": {
      "primary": "evaluating when to choose grpc or rest for dotnet apis",
      "secondary": [
        "understanding performance differences between grpc and rest",
        "deciding based on latency throughput and payload size",
        "advantages of contract first api development with protobuf",
        "rest api strengths for compatibility and simplicity",
        "comparison of streaming capabilities across both styles",
        "tradeoffs for large scale distributed backend systems",
        "guidelines for choosing the right api protocol"
      ],
      "semantic": [
        "http2 bidirectional streaming",
        "protobuf contract definitions",
        "serialization efficiency models",
        "grpc channel management",
        "rest over http semantics",
        "api compatibility considerations",
        "service to service communication"
      ]
    },
    "/blog/impact-ai-tools-code-quality-maintainability": {
      "primary": "impact of ai coding tools on long term code quality and maintainability",
      "secondary": [
        "understanding risks of ai generated code",
        "balancing speed with sustainable engineering practices",
        "using ai tools responsibly in production environments",
        "reducing technical debt with automated improvements",
        "ensuring consistency across large codebases",
        "evaluating the reliability of ai suggestions",
        "establishing guidelines for ai assisted workflows"
      ],
      "semantic": [
        "technical debt accumulation patterns",
        "llm code review assistance",
        "consistency enforcement mechanisms",
        "automated refactoring suggestions",
        "quality gate integration",
        "documentation generation workflows",
        "maintenance risk mitigation"
      ]
    },
    "/blog/kubernetes-basics-dotnet-developers": {
      "primary": "kubernetes fundamentals tailored for dotnet developers deploying applications",
      "secondary": [
        "understanding pods deployments and services",
        "managing configuration and secrets for dotnet apps",
        "containerizing applications for kubernetes clusters",
        "learning networking fundamentals inside k8s",
        "observing workloads with kubernetes telemetry",
        "running dotnet apps on aks effectively",
        "working with local clusters like kind or minikube"
      ],
      "semantic": [
        "deployment and replica sets",
        "service discovery and ingress",
        "configmaps and secrets",
        "liveness readiness probes",
        "node scheduling and resources",
        "container orchestration concepts",
        "kubernetes operational tooling"
      ]
    },
    "/blog/microservices-resilience-circuit-breaker-retry": {
      "primary": "building resilient microservices using circuit breaker retry and timeout patterns",
      "secondary": [
        "handling transient faults in distributed systems",
        "improving service reliability with defensive patterns",
        "preventing cascading failures in microservice networks",
        "using polly for resilience in dotnet applications",
        "designing fallback behavior for degraded scenarios",
        "implementing timeouts for slow downstream systems",
        "monitoring resilience metrics for production stability"
      ],
      "semantic": [
        "circuit breaker half open state",
        "retry exponential backoff strategies",
        "timeout management patterns",
        "bulkhead isolation concept",
        "fallback and fail safe logic",
        "distributed reliability patterns",
        "resilience observability metrics"
      ]
    },
    "/blog/mobile-app-architecture-vue-capacitor": {
      "primary": "architecting mobile applications using vue and capacitor for cross platform delivery",
      "secondary": [
        "structuring hybrid mobile apps built with web technology",
        "integrating native device features using capacitor plugins",
        "optimizing performance across ios and android platforms",
        "managing application state and navigation cleanly",
        "building secure mobile interfaces with modern tooling",
        "balancing native experience with hybrid flexibility",
        "deploying vue capacitor apps to app stores"
      ],
      "semantic": [
        "hybrid mobile architecture",
        "native bridge communication",
        "pwa and offline strategies",
        "capacitor plugin ecosystem",
        "vue state management patterns",
        "performance optimization practices",
        "cross platform build pipelines"
      ]
    },
    "/blog/monorepo-vs-polyrepo": {
      "primary": "evaluating tradeoffs between monorepo and polyrepo structures for engineering teams",
      "secondary": [
        "impact on build speed and tooling workflows",
        "ownership boundaries and team autonomy",
        "refactoring considerations for shared codebases",
        "operational complexity differences between repo models",
        "scaling engineering teams across multiple services",
        "deciding repository structure based on organizational needs",
        "comparing branching and versioning strategies"
      ],
      "semantic": [
        "codebase modularization",
        "build pipeline optimization",
        "dependency graph management",
        "versioning and release workflows",
        "repository governance models",
        "team ownership boundaries",
        "multi service architecture impact"
      ]
    },
    "/blog/oauth2-openid-connect-dotnet": {
      "primary": "implementing oauth2 and openid connect in secure dotnet applications",
      "secondary": [
        "configuring authorization flows using identity providers",
        "securing apis with bearer tokens and scopes",
        "understanding implicit auth code and hybrid flows",
        "validating jwt tokens for backend services",
        "protecting spa and api architectures effectively",
        "refresh token lifecycle and consent management",
        "designing secure authentication for enterprise systems"
      ],
      "semantic": [
        "oauth2 authorization flows",
        "openid connect id token",
        "jwt token validation rules",
        "claims mapping and roles",
        "authorization server configuration",
        "secure token storage patterns",
        "identity provider integration"
      ]
    },
    "/blog/observability-dotnet-azure": {
      "primary": "building full observability for dotnet applications running on azure",
      "secondary": [
        "collecting logs metrics and traces for diagnostics",
        "implementing distributed tracing across microservices",
        "using application insights for performance analysis",
        "monitoring production workloads with actionable insights",
        "correlating requests across services and components",
        "designing dashboards for operational visibility",
        "detecting anomalies using telemetry patterns"
      ],
      "semantic": [
        "open telemetry instrumentation",
        "correlation id propagation",
        "app insights trace analysis",
        "structured logging practices",
        "azure monitor integration",
        "trace sampling strategies",
        "performance bottleneck detection"
      ]
    },
    "/blog/open-telemetry-distributed-tracing-dotnet": {
      "primary": "implementing distributed tracing using open telemetry in dotnet systems",
      "secondary": [
        "configuring instrumentation for backend services",
        "exporting traces to azure jaeger or zipkin",
        "visualizing request flows across microservices",
        "tracking latency and dependency performance",
        "standardizing observability using w3c trace context",
        "adding spans around business logic operations",
        "monitoring service interactions at scale"
      ],
      "semantic": [
        "otel tracing pipeline",
        "span and context propagation",
        "trace exporters setup",
        "distributed system observability",
        "w3c traceparent specification",
        "latency breakdown analysis",
        "service dependency visualization"
      ]
    },
    "/blog/owasp-api-security-top-10": {
      "primary": "understanding the owasp api security top ten for dotnet developers",
      "secondary": [
        "protecting against broken authorization vulnerabilities",
        "preventing injection and data exposure risks",
        "fortifying apis against broken authentication",
        "building secure rate limiting and throttling mechanisms",
        "mitigating excessive data exposure issues",
        "ensuring strong validation for all inputs",
        "implementing layered security for microservices"
      ],
      "semantic": [
        "bola authorization flaw",
        "input sanitization patterns",
        "secure api token handling",
        "rate limiting strategies",
        "error handling best practices",
        "secure endpoint design",
        "security headers configuration"
      ]
    },
    "/blog/property-management-systems-uk": {
      "primary": "technology and compliance foundations for uk property management systems",
      "secondary": [
        "managing tenancy lifecycles with digital workflows",
        "integrating uk specific compliance and regulations",
        "automating reporting for gdpr and statutory requirements",
        "connecting property systems using event driven designs",
        "supporting multi tenant landlord and agent operations",
        "coordinating processes across property lifecycles",
        "using cloud services for large scale management"
      ],
      "semantic": [
        "right to rent verification",
        "tenancy deposit protection",
        "azure service bus orchestration",
        "logic apps workflow automation",
        "multi tenancy data models",
        "regulated compliance processes",
        "property lifecycle automation"
      ]
    },
    "/blog/repository-pattern-unit-of-work-dotnet": {
      "primary": "using repository and unit of work patterns for clean data access in dotnet",
      "secondary": [
        "isolating persistence logic behind abstractions",
        "structuring repositories for domain driven design",
        "managing transactions through unit of work",
        "improving testability of business logic components",
        "reducing repetitive code across data layers",
        "avoiding common repository anti patterns",
        "aligning data access patterns with ef core"
      ],
      "semantic": [
        "repository abstraction layer",
        "transactional unit of work",
        "data persistence boundary",
        "aggregate oriented persistence",
        "ef core integration patterns",
        "mocking data access components",
        "clean architecture alignment"
      ]
    },
    "/blog/rest-api-versioning-idempotency": {
      "primary": "best practices for rest api versioning and idempotency in dotnet services",
      "secondary": [
        "choosing between url query and header versioning",
        "preventing duplicate operations with idempotency keys",
        "handling safe retries in distributed environments",
        "designing backward compatible api evolution",
        "creating structured versioning strategies",
        "ensuring consistency during concurrent requests",
        "avoiding breaking changes for existing clients"
      ],
      "semantic": [
        "idempotency key patterns",
        "header based versioning",
        "api compatibility guarantees",
        "safe retry mechanisms",
        "concurrency protection logic",
        "version negotiation strategies",
        "contract preservation principles"
      ]
    },
    "/blog/rest-vs-graphql-apis": {
      "primary": "deciding between rest and graphql architectures for modern api development",
      "secondary": [
        "understanding over fetching and under fetching issues",
        "graphql strengths for complex client queries",
        "rest advantages in caching and simplicity",
        "tradeoffs between flexibility and predictability",
        "choosing protocols based on team and domain",
        "handling versioning in rest versus schema evolution",
        "designing backend systems for diverse clients"
      ],
      "semantic": [
        "graphql resolvers design",
        "rest resource modeling",
        "schema stitching considerations",
        "over fetching resolution strategies",
        "query performance optimization",
        "api selection heuristics",
        "client driven query patterns"
      ]
    },
    "/blog/saga-pattern-orchestrator-vs-choreography": {
      "primary": "choosing between orchestrator and choreography saga patterns in microservices",
      "secondary": [
        "coordinating distributed transactions across services",
        "understanding compensation logic in sagas",
        "when centralized orchestration is beneficial",
        "benefits of decentralized event driven choreography",
        "handling failures in long running workflows",
        "designing sagas for business process reliability",
        "tradeoffs in maintainability and system complexity"
      ],
      "semantic": [
        "event driven saga coordination",
        "transaction compensation patterns",
        "workflow orchestration services",
        "message broker driven sagas",
        "fault handling and recovery",
        "long running process modeling",
        "microservice consistency approaches"
      ]
    },
    "/blog/securing-apis-dotnet": {
      "primary": "best practices for securing dotnet apis in production environments",
      "secondary": [
        "implementing authentication and authorization safely",
        "configuring cors and security headers properly",
        "applying rate limiting for abuse prevention",
        "validating inputs across all endpoints",
        "protecting sensitive data in transit and at rest",
        "hardening apis against common attack vectors",
        "monitoring and logging security related events"
      ],
      "semantic": [
        "jwt validation pipeline",
        "cors enforcement rules",
        "api security headers",
        "rate limiting middleware",
        "input sanitation practices",
        "tls configuration best practices",
        "logging and intrusion detection"
      ]
    },
    "/blog/solid-principles-in-practice": {
      "primary": "practical application of solid principles in enterprise dotnet codebases",
      "secondary": [
        "improving maintainability using clean abstractions",
        "avoiding common solid violations in real projects",
        "refactoring legacy systems to follow solid rules",
        "designing loosely coupled classes and modules",
        "applying dependency inversion effectively",
        "writing testable production ready business logic",
        "adopting solid for scalable engineering teams"
      ],
      "semantic": [
        "single responsibility refactoring",
        "open closed extension strategies",
        "liskov substitution compliance",
        "interface segregation best practices",
        "dependency inversion architecture",
        "clean architecture synergy",
        "testability and modular design"
      ]
    },
    "/blog/sql-server-performance-tuning": {
      "primary": "performance tuning techniques for high load sql server applications",
      "secondary": [
        "analyzing execution plans for slow queries",
        "optimizing indexes statistics and query structure",
        "reducing lock contention in transactional workloads",
        "tuning configuration settings for better throughput",
        "identifying missing indexes and bad scans",
        "understanding parameter sniffing behaviors",
        "improving performance for enterprise scale systems"
      ],
      "semantic": [
        "execution plan operators",
        "clustered nonclustered indexes",
        "statistics cardinality updates",
        "locking blocking deadlocks",
        "parameter sniffing mitigation",
        "memory grant tuning",
        "query store diagnostics"
      ]
    },
    "/blog/structural-design-patterns-dotnet": {
      "primary": "understanding structural design patterns with real world dotnet examples",
      "secondary": [
        "using adapters to unify incompatible interfaces",
        "simplifying complex systems through facades",
        "optimizing object sharing with flyweight pattern",
        "structuring composite hierarchies effectively",
        "protecting resources using proxy layers",
        "building flexible architectures with patterns",
        "selecting the right structural pattern for the problem"
      ],
      "semantic": [
        "adapter facade proxy",
        "composite structural trees",
        "flyweight memory optimization",
        "interface unification",
        "pattern implementation strategies",
        "composition over inheritance",
        "dotnet structural examples"
      ]
    },
    "/blog/technical-leadership-remote-teams": {
      "primary": "leading distributed engineering teams with effective remote technical leadership",
      "secondary": [
        "building async first communication practices",
        "creating strong review and feedback workflows",
        "supporting developer growth across time zones",
        "reducing burnout through sustainable team habits",
        "managing delivery expectations in remote cultures",
        "establishing clear engineering standards and ownership",
        "running productive virtual standups and 1 on 1s"
      ],
      "semantic": [
        "psychological safety engineering",
        "distributed team coordination",
        "remote onboarding frameworks",
        "async documentation culture",
        "developer experience leadership",
        "on call rotation health",
        "high trust team practices"
      ]
    },
    "/blog/testing-strategies-unit-integration-e2e": {
      "primary": "comprehensive testing strategies for unit integration and end to end testing in dotnet",
      "secondary": [
        "understanding the test pyramid and its benefits",
        "choosing between mocks stubs and real dependencies",
        "structuring integration tests for reliability",
        "preventing flaky tests in ci environments",
        "validating business flows using end to end tests",
        "balancing coverage with maintainability",
        "aligning test strategy with project architecture"
      ],
      "semantic": [
        "unit integration e2e layers",
        "mocking frameworks usage",
        "test isolation techniques",
        "ci pipeline test execution",
        "fixture and setup patterns",
        "service level contract tests",
        "deterministic testing practices"
      ]
    },
    "/blog/trade-offs-ai-code-generation": {
      "primary": "evaluating the tradeoffs of relying on ai for code generation in software projects",
      "secondary": [
        "understanding when ai generated code introduces risks",
        "balancing automation with deep engineering understanding",
        "managing maintainability concerns in large codebases",
        "detecting subtle errors introduced by llm outputs",
        "using ai for speed without sacrificing quality",
        "deciding when manual development is essential",
        "reducing long term technical debt from ai usage"
      ],
      "semantic": [
        "ai assisted generation limits",
        "technical debt amplification",
        "review and verification process",
        "semantic correctness validation",
        "automation vs comprehension",
        "refactor safety concerns",
        "reliability of llm suggestions"
      ]
    },
    "/blog/vue-enterprise-scale": {
      "primary": "architectural principles for building vue applications at enterprise scale",
      "secondary": [
        "organizing large vue codebases for maintainability",
        "using composition api to simplify complex logic",
        "structuring components for scalability and clarity",
        "managing global state cleanly with pinia",
        "testing strategies for enterprise vue systems",
        "ensuring long term maintainability across teams",
        "improving performance with optimized rendering"
      ],
      "semantic": [
        "composition api architecture",
        "pinia state management",
        "modular component design",
        "vue testing approaches",
        "scalability and performance",
        "application folder structures",
        "enterprise frontend practices"
      ]
    },
    "/blog/vue-vs-angular-vs-react-full-comparison": {
      "primary": "comprehensive comparison of vue angular and react for enterprise frontend development",
      "secondary": [
        "evaluating ecosystem maturity and learning curves",
        "choosing the right framework for team composition",
        "performance differences across real world workloads",
        "state management capabilities of each framework",
        "typescript usage style and tooling implications",
        "assessing hiring availability and community support",
        "impact of ssr and ssg capabilities on architecture"
      ],
      "semantic": [
        "framework comparison metrics",
        "reactivity and rendering models",
        "ecosystem and tooling maturity",
        "typescript integration depth",
        "ssr vs ssg architectural impact",
        "state management ecosystem",
        "frontend decision matrix"
      ]
    },
    "/blog/what-developers-want-from-ai-assistants": {
      "primary": "key expectations developers have from modern ai coding assistants",
      "secondary": [
        "requiring consistent predictable and editable output",
        "desiring deep context awareness across files",
        "needing clarity and explanation behind suggestions",
        "reducing friction in everyday engineering workflows",
        "balancing automation with developer control",
        "helping maintain code quality and conventions",
        "providing tooling that enhances focus and flow"
      ],
      "semantic": [
        "developer experience insights",
        "explainability in ai tooling",
        "context window intelligence",
        "refactor and review assistance",
        "multi file reasoning",
        "semantic code navigation",
        "engineering workflow enhancement"
      ]
    },
    "/blog/where-ai-fails-real-world-software-development": {
      "primary": "scenarios where ai fails to deliver reliable results in software development",
      "secondary": [
        "limitations of ai in nuanced architectural decisions",
        "security concerns when blindly trusting llm output",
        "cases where hallucinations lead to invalid code",
        "gaps in domain expertise for specialized systems",
        "inconsistent handling of edge cases in logic",
        "maintenance issues from autogenerated structures",
        "recognizing when human expertise is essential"
      ],
      "semantic": [
        "architectural nuance limitation",
        "security flaw generation risks",
        "hallucination error patterns",
        "domain specific knowledge gaps",
        "edge case inconsistency",
        "invalid code generation issues",
        "critical engineering judgment"
      ]
    },
    "/blog/why-ai-productivity-gains-plateau": {
      "primary": "understanding why ai productivity improvements plateau after initial gains",
      "secondary": [
        "early acceleration followed by diminishing returns",
        "increasing complexity of remaining engineering tasks",
        "needing deeper domain understanding beyond llm help",
        "quality concerns that slow down reliance on ai",
        "shifting effort from writing code to validating it",
        "adapting workflows to sustain long term improvement",
        "balancing speed efficiency and correctness"
      ],
      "semantic": [
        "productivity curve behavior",
        "return on automation limits",
        "human in the loop validation",
        "llm diminishing effectiveness",
        "workflow adaptation patterns",
        "engineering complexity drivers",
        "sustainable productivity strategies"
      ]
    }
  }

/**
 * @param {string} path - Route path (e.g. '/', '/blog', '/blog/agile-delivery-enterprise-constraints', '/projects/heat-exchanger')
 * @returns {string[]} Up to 8 keywords for meta name="keywords"
 */
export function getMetaKeywords(pathKey) {
  if (!pathKey || typeof pathKey !== 'string') return []
  const normalized = pathKey.replace(/\/$/, '') || '/'
  const set = SEO_KEYWORDS[normalized]
  if (!set) return []
  const combined = [
    set.primary,
    ...(set.secondary || []),
    ...(set.semantic || [])
  ].filter(Boolean)
  return combined.slice(0, MAX_META_KEYWORDS)
}
