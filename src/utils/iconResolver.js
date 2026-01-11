/**
 * Icon Resolver Utility
 * Resolves technology icons from multiple sources with intelligent fuzzy matching:
 * Priority: 1. Devicon > 2. Local Icons > 3. Simple Icons/Other > 4. Emoji Fallback
 */

// Comprehensive mapping of technology names to their icon sources
const ICON_MAP = {
  // .NET Technologies
  '.net core web api': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  'asp net core web api': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  'asp.net core web api': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  'asp net core': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  'asp.net core': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  'net core': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  '.net core': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  '.net': { type: 'devicon', icon: 'dot-net', local: 'framework.png', fallback: '⚙️' },
  'c#': { type: 'devicon', icon: 'csharp', fallback: '🔷' },
  'C#': { type: 'devicon', icon: 'csharp', fallback: '🔷' },
  'csharp': { type: 'devicon', icon: 'csharp', fallback: '🔷' },
  'c': { type: 'devicon', icon: 'csharp', fallback: '🔷' },
  'c sharp': { type: 'devicon', icon: 'csharp', fallback: '🔷' },
  'entity framework': { type: 'local', icon: 'entity framework.png', fallback: '🗄️' },
  'entity framework core': { type: 'local', icon: 'entity framework.png', fallback: '🗄️' },
  'entity framework core orm': { type: 'local', icon: 'entity framework.png', fallback: '🗄️' },
  'task parallel library': { type: 'local', icon: 'task parallel library.png', fallback: '⚙️' },
  'tpl': { type: 'local', icon: 'task parallel library.png', fallback: '⚙️' },
  'mvc architecture': { type: 'local', icon: 'mvc.png', fallback: '🏗️' },
  'mvc': { type: 'local', icon: 'mvc.png', fallback: '🏗️' },
  
  // Databases
  'sql server enterprise': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'sql server': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'sql server database': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'sql server database': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'redis cache': { type: 'devicon', icon: 'redis', local: 'Redis.svg', fallback: '💾' },
  'redis': { type: 'devicon', icon: 'redis', local: 'Redis.svg', fallback: '💾' },
  'mysql': { type: 'devicon', icon: 'mysql', local: 'MySQL.svg', fallback: '💾' },
  'postgresql': { type: 'devicon', icon: 'postgresql', local: 'PostgresSQL.svg', fallback: '💾' },
  'sql server management studio': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'linq': { type: 'devicon', icon: 'csharp', fallback: '🔷' },
  'sql server profiler': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'execution plans': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'dynamic management views': { type: 'local', icon: 'monitoring.png', fallback: '📊' },
  'query store': { type: 'local', icon: 'database.png', fallback: '💾' },
  'clustered indexes': { type: 'local', icon: 'database optimization.png', fallback: '📊' },
  'non-clustered indexes': { type: 'local', icon: 'database optimization.png', fallback: '📊' },
  'covering indexes': { type: 'local', icon: 'database optimization.png', fallback: '📊' },
  'filtered indexes': { type: 'local', icon: 'database optimization.png', fallback: '📊' },
  'table partitioning': { type: 'local', icon: 'database.png', fallback: '💾' },
  'data archiving': { type: 'local', icon: 'data.png', fallback: '💾' },
  'backup & recovery': { type: 'local', icon: 'backup service.png', fallback: '💾' },
  'backup and recovery': { type: 'local', icon: 'backup service.png', fallback: '💾' },
  'sql server in-memory oltp': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'in-memory oltp': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'mongodb': { type: 'devicon', icon: 'mongodb', local: 'MongoDB.svg', fallback: '💾' },
  'cosmos db': { type: 'local', icon: 'cosmos db.png', fallback: '💾' },
  
  // Java & Android (Mobile Games)
  'java': { type: 'devicon', icon: 'java', fallback: '☕' },
  'java programming language': { type: 'devicon', icon: 'java', fallback: '☕' },
  'android': { type: 'devicon', icon: 'android', fallback: '🤖' },
  'android sdk': { type: 'devicon', icon: 'android', fallback: '🤖' },
  'android sdk & ndk': { type: 'devicon', icon: 'android', fallback: '🤖' },
  'android platform': { type: 'devicon', icon: 'android', fallback: '🤖' },
  'android canvas': { type: 'devicon', icon: 'android', fallback: '🤖' },
  'android canvas & surfaceview': { type: 'devicon', icon: 'android', fallback: '🤖' },
  'graphics': { type: 'local', icon: 'game engine.png', fallback: '🎮' },
  'opengl es graphics': { type: 'local', icon: 'game engine.png', fallback: '🎮' },
  'opengl es': { type: 'local', icon: 'game engine.png', fallback: '🎮' },
  'opengl es for graphics': { type: 'local', icon: 'game engine.png', fallback: '🎮' },
  'game engine': { type: 'local', icon: 'game engine.png', fallback: '🎮' },
  'andengine': { type: 'local', icon: 'game engine.png', fallback: '🎮' },
  'andengine framework': { type: 'local', icon: 'game engine.png', fallback: '🎮' },
  'box2d physics': { type: 'local', icon: 'physics engine.png', fallback: '⚙️' },
  'box2d physics engine': { type: 'local', icon: 'physics engine.png', fallback: '⚙️' },
  'physics engine': { type: 'local', icon: 'physics engine.png', fallback: '⚙️' },
  '2d sprite animation': { type: 'local', icon: 'game development.png', fallback: '🎮' },
  'sprite animation': { type: 'local', icon: 'game development.png', fallback: '🎮' },
  'sound & audio management': { type: 'local', icon: 'speech.png', fallback: '🔊' },
  'sound and audio management': { type: 'local', icon: 'speech.png', fallback: '🔊' },
  'audio management': { type: 'local', icon: 'speech.png', fallback: '🔊' },
  'sound management': { type: 'local', icon: 'speech.png', fallback: '🔊' },
  'audio': { type: 'local', icon: 'speech.png', fallback: '🔊' },
  'sound': { type: 'local', icon: 'speech.png', fallback: '🔊' },
  'java servlets': { type: 'devicon', icon: 'java', fallback: '☕' },
  'java servlets & jsp': { type: 'devicon', icon: 'java', fallback: '☕' },
  'jsp': { type: 'devicon', icon: 'java', fallback: '☕' },
  'restful web services': { type: 'local', icon: 'api.svg', fallback: '🌐' },
  'restful api': { type: 'local', icon: 'api.svg', fallback: '🌐' },
  'json data exchange': { type: 'local', icon: 'JSON.svg', fallback: '📄' },
  'json': { type: 'local', icon: 'JSON.svg', fallback: '📄' },
  'google play console': { type: 'local', icon: 'google.png', fallback: '📱' },
  'google play': { type: 'local', icon: 'google.png', fallback: '📱' },
  'admob integration': { type: 'local', icon: 'google.png', fallback: '📱' },
  'admob': { type: 'local', icon: 'google.png', fallback: '📱' },
  'push notifications': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'Push Notifications': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'push notification': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'Push Notification': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'analytics & crash reporting': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'crash reporting': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  
  // Mobile Development - iOS
  'swift': { type: 'devicon', icon: 'swift', fallback: '🟠' },
  'Swift': { type: 'devicon', icon: 'swift', fallback: '🟠' },
  'objective-c': { type: 'local', icon: 'mobile.png', fallback: '🔵' },
  'Objective-C': { type: 'local', icon: 'mobile.png', fallback: '🔵' },
  'objective c': { type: 'local', icon: 'mobile.png', fallback: '🔵' },
  'objectivec': { type: 'local', icon: 'mobile.png', fallback: '🔵' },
  'ObjectiveC': { type: 'local', icon: 'mobile.png', fallback: '🔵' },
  'ios': { type: 'devicon', icon: 'apple', fallback: '🍎' },
  'iOS': { type: 'devicon', icon: 'apple', fallback: '🍎' },
  'ios sdk': { type: 'devicon', icon: 'apple', fallback: '🍎' },
  'iOS SDK': { type: 'devicon', icon: 'apple', fallback: '🍎' },
  'swiftui': { type: 'devicon', icon: 'swift', fallback: '🟠' },
  'SwiftUI': { type: 'devicon', icon: 'swift', fallback: '🟠' },
  'uikit': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'UIKit': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'core data': { type: 'local', icon: 'database.png', fallback: '💾' },
  'Core Data': { type: 'local', icon: 'database.png', fallback: '💾' },
  'core location': { type: 'local', icon: 'location.png', fallback: '📍' },
  'Core Location': { type: 'local', icon: 'location.png', fallback: '📍' },
  'push notifications (apns)': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'Push Notifications (APNs)': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'apns': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'APNs': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'apple push notification service': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'app store connect': { type: 'local', icon: 'google.png', fallback: '📱' },
  'App Store Connect': { type: 'local', icon: 'google.png', fallback: '📱' },
  'testflight': { type: 'local', icon: 'testing.png', fallback: '✈️' },
  'TestFlight': { type: 'local', icon: 'testing.png', fallback: '✈️' },
  
  // Mobile Development - Android
  'kotlin': { type: 'devicon', icon: 'kotlin', fallback: '🟣' },
  'Kotlin': { type: 'devicon', icon: 'kotlin', fallback: '🟣' },
  'android sdk': { type: 'devicon', icon: 'android', fallback: '🤖' },
  'Android SDK': { type: 'devicon', icon: 'android', fallback: '🤖' },
  'jetpack compose': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'Jetpack Compose': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'material design': { type: 'local', icon: 'frontend.png', fallback: '🎨' },
  'Material Design': { type: 'local', icon: 'frontend.png', fallback: '🎨' },
  'room database': { type: 'local', icon: 'database.png', fallback: '💾' },
  'Room Database': { type: 'local', icon: 'database.png', fallback: '💾' },
  'android jetpack': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'Android Jetpack': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'fcm': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'FCM': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'firebase cloud messaging': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'Firebase Cloud Messaging': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'google play console': { type: 'local', icon: 'google.png', fallback: '📱' },
  'Google Play Console': { type: 'local', icon: 'google.png', fallback: '📱' },
  
  // Mobile Development - Cross-Platform
  'react native': { type: 'devicon', icon: 'react', fallback: '⚛️' },
  'React Native': { type: 'devicon', icon: 'react', fallback: '⚛️' },
  'flutter': { type: 'devicon', icon: 'flutter', fallback: '💙' },
  'Flutter': { type: 'devicon', icon: 'flutter', fallback: '💙' },
  'dart': { type: 'devicon', icon: 'dart', fallback: '🎯' },
  'Dart': { type: 'devicon', icon: 'dart', fallback: '🎯' },
  'xamarin': { type: 'devicon', icon: 'xamarin', fallback: '💜' },
  'Xamarin': { type: 'devicon', icon: 'xamarin', fallback: '💜' },
  'cross-platform': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'Cross-Platform': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  
  // Firebase Services
  'firebase': { type: 'devicon', icon: 'firebase', fallback: '🔥' },
  'Firebase': { type: 'devicon', icon: 'firebase', fallback: '🔥' },
  'firebase authentication': { type: 'devicon', icon: 'firebase', fallback: '🔥' },
  'Firebase Authentication': { type: 'devicon', icon: 'firebase', fallback: '🔥' },
  'cloud firestore': { type: 'devicon', icon: 'firebase', fallback: '🔥' },
  'Cloud Firestore': { type: 'devicon', icon: 'firebase', fallback: '🔥' },
  'firebase cloud functions': { type: 'devicon', icon: 'firebase', fallback: '🔥' },
  'Firebase Cloud Functions': { type: 'devicon', icon: 'firebase', fallback: '🔥' },
  'firebase analytics': { type: 'devicon', icon: 'firebase', fallback: '🔥' },
  'Firebase Analytics': { type: 'devicon', icon: 'firebase', fallback: '🔥' },
  'firebase test lab': { type: 'devicon', icon: 'firebase', fallback: '🔥' },
  'Firebase Test Lab': { type: 'devicon', icon: 'firebase', fallback: '🔥' },
  'firebase storage': { type: 'devicon', icon: 'firebase', fallback: '🔥' },
  'Firebase Storage': { type: 'devicon', icon: 'firebase', fallback: '🔥' },
  'cloud storage': { type: 'local', icon: 'azure blob storage.png', fallback: '☁️' },
  'Cloud Storage': { type: 'local', icon: 'azure blob storage.png', fallback: '☁️' },
  'real-time sync': { type: 'local', icon: 'realtime.png', fallback: '⚡' },
  'Real-time Sync': { type: 'local', icon: 'realtime.png', fallback: '⚡' },
  'real time sync': { type: 'local', icon: 'realtime.png', fallback: '⚡' },
  'Real Time Sync': { type: 'local', icon: 'realtime.png', fallback: '⚡' },
  'cloud backend': { type: 'local', icon: 'backend.png', fallback: '☁️' },
  'Cloud Backend': { type: 'local', icon: 'backend.png', fallback: '☁️' },
  'human interface guidelines': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'Human Interface Guidelines': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'accessibility': { type: 'local', icon: 'user.png', fallback: '♿' },
  'Accessibility': { type: 'local', icon: 'user.png', fallback: '♿' },
  'animations': { type: 'local', icon: 'frontend.png', fallback: '🎬' },
  'Animations': { type: 'local', icon: 'frontend.png', fallback: '🎬' },
  'fcm (firebase cloud messaging)': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'FCM (Firebase Cloud Messaging)': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'fcm firebase cloud messaging': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  'FCM Firebase Cloud Messaging': { type: 'local', icon: 'push notification.png', fallback: '🔔' },
  
  // AWS & Azure Mobile Services
  'aws amplify': { type: 'local', icon: 'cloud.png', fallback: '☁️' },
  'AWS Amplify': { type: 'local', icon: 'cloud.png', fallback: '☁️' },
  'aws': { type: 'devicon', icon: 'amazonwebservices', local: 'cloud.png', fallback: '☁️' },
  'AWS': { type: 'devicon', icon: 'amazonwebservices', local: 'cloud.png', fallback: '☁️' },
  'azure mobile apps': { type: 'local', icon: 'Azure.svg', fallback: '☁️' },
  'Azure Mobile Apps': { type: 'local', icon: 'Azure.svg', fallback: '☁️' },
  
  // Mobile Testing & Deployment
  'device testing': { type: 'local', icon: 'testing.png', fallback: '📱' },
  'Device Testing': { type: 'local', icon: 'testing.png', fallback: '📱' },
  'ui testing': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'UI Testing': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'performance testing': { type: 'local', icon: 'performance.png', fallback: '⚡' },
  'Performance Testing': { type: 'local', icon: 'performance.png', fallback: '⚡' },
  'automated testing': { type: 'local', icon: 'testing.png', fallback: '🤖' },
  'Automated Testing': { type: 'local', icon: 'testing.png', fallback: '🤖' },
  'app store optimization': { type: 'local', icon: 'analytics.png', fallback: '📈' },
  'App Store Optimization': { type: 'local', icon: 'analytics.png', fallback: '📈' },
  'aso': { type: 'local', icon: 'analytics.png', fallback: '📈' },
  'ASO': { type: 'local', icon: 'analytics.png', fallback: '📈' },
  'app signing': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'App Signing': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'version management': { type: 'local', icon: 'repository.png', fallback: '📦' },
  'Version Management': { type: 'local', icon: 'repository.png', fallback: '📦' },
  
  // Frontend
  'javascript': { type: 'devicon', icon: 'javascript', fallback: '🟨' },
  'js': { type: 'devicon', icon: 'javascript', fallback: '🟨' },
  'html5': { type: 'devicon', icon: 'html5', fallback: '🟠' },
  'html': { type: 'devicon', icon: 'html5', fallback: '🟠' },
  'css3': { type: 'devicon', icon: 'css3', fallback: '🔵' },
  'css': { type: 'devicon', icon: 'css3', fallback: '🔵' },
  'angular s-p-a': { type: 'devicon', icon: 'angular', local: 'Angular.svg', fallback: '🅰️' },
  'angular spa': { type: 'devicon', icon: 'angular', local: 'Angular.svg', fallback: '🅰️' },
  'angular': { type: 'devicon', icon: 'angular', local: 'Angular.svg', fallback: '🅰️' },
  'angular 12+': { type: 'devicon', icon: 'angular', local: 'Angular.svg', fallback: '🅰️' },
  'angular 12': { type: 'devicon', icon: 'angular', local: 'Angular.svg', fallback: '🅰️' },
  'typescript': { type: 'devicon', icon: 'typescript', local: 'TypeScript.svg', fallback: '🔷' },
  'bootstrap': { type: 'devicon', icon: 'bootstrap', local: 'bootstrap.svg', fallback: '🎨' },
  'bootstrap 5': { type: 'devicon', icon: 'bootstrap', local: 'bootstrap.svg', fallback: '🎨' },
  'bootstrap & primeng': { type: 'devicon', icon: 'bootstrap', local: 'bootstrap.svg', fallback: '🎨' },
  'primeng': { type: 'local', icon: 'primeng.svg', fallback: '🎨' },
  'jquery': { type: 'devicon', icon: 'jquery', local: 'jquery.svg', fallback: '⚡' },
  'jquery & ajax': { type: 'devicon', icon: 'jquery', local: 'jquery.svg', fallback: '⚡' },
  'react': { type: 'devicon', icon: 'react', fallback: '⚛️' },
  'vue': { type: 'devicon', icon: 'vuejs', fallback: '💚' },
  'vue.js': { type: 'devicon', icon: 'vuejs', fallback: '💚' },
  'vue.js / react / angular': { type: 'devicon', icon: 'vuejs', fallback: '💚' },
  'vue.js 3': { type: 'devicon', icon: 'vuejs', fallback: '💚' },
  'vuex / pinia': { type: 'devicon', icon: 'vuejs', fallback: '💚' },
  'pinia': { type: 'devicon', icon: 'vuejs', fallback: '💚' },
  'vuex': { type: 'devicon', icon: 'vuejs', fallback: '💚' },
  'redux': { type: 'devicon', icon: 'redux', fallback: '⚛️' },
  'tailwind css': { type: 'devicon', icon: 'tailwindcss', fallback: '🎨' },
  'aws': { type: 'devicon', icon: 'amazonwebservices', fallback: '☁️' },
  'amazon web services': { type: 'devicon', icon: 'amazonwebservices', fallback: '☁️' },
  
  // DevOps & Container
  'openshift gateway': { type: 'local', icon: 'api gateway.svg', fallback: '🚪' },
  'openshift': { type: 'local', icon: 'openshift1.png', fallback: '🏗️' },
  'docker': { type: 'devicon', icon: 'docker', local: 'Docker.svg', fallback: '🐳' },
  'docker compose': { type: 'devicon', icon: 'docker', local: 'Docker.svg', fallback: '🐳' },
  'kubernetes': { type: 'devicon', icon: 'kubernetes', local: 'kubernetes.svg', fallback: '☸️' },
  'kubernetes (aks)': { type: 'devicon', icon: 'kubernetes', local: 'kubernetes.svg', fallback: '☸️' },
  'rest apis': { type: 'local', icon: 'api.svg', fallback: '🌐' },
  'rest api': { type: 'local', icon: 'api.svg', fallback: '🌐' },
  'grpc': { type: 'devicon', icon: 'grpc', fallback: '🔗' },
  'service mesh': { type: 'local', icon: 'microservices.png', fallback: '🏗️' },
  'circuit breaker': { type: 'local', icon: 'monitoring.png', fallback: '🛡️' },
  'event sourcing': { type: 'local', icon: 'data pipeline.png', fallback: '📡' },
  'cqrs': { type: 'local', icon: 'database.png', fallback: '💾' },
  'distributed tracing': { type: 'local', icon: 'monitoring.png', fallback: '📊' },
  
  // Monitoring & Tools
  'nexus repository': { type: 'local', icon: 'nexus.svg', fallback: '📦' },
  'Nexus Repository': { type: 'local', icon: 'nexus.svg', fallback: '📦' },
  'nexus': { type: 'local', icon: 'nexus.svg', fallback: '📦' },
  'Nexus': { type: 'local', icon: 'nexus.svg', fallback: '📦' },
  'grafana': { type: 'local', icon: 'Grafana.svg', fallback: '📊' },
  'prometheus': { type: 'local', icon: 'Prometheus.svg', fallback: '📈' },
  'sonatype': { type: 'local', icon: 'sonatype.svg', fallback: '📦' },
  
  // CI/CD & Integration
  'ci/cd pipeline': { type: 'local', icon: 'CI CD.svg', fallback: '🔄' },
  'ci/cd pipelines': { type: 'local', icon: 'CI CD.svg', fallback: '🔄' },
  'ci/cd': { type: 'local', icon: 'CI CD.svg', fallback: '🔄' },
  'CI/CD': { type: 'local', icon: 'CI CD.svg', fallback: '🔄' },
  'ci cd': { type: 'local', icon: 'CI CD.svg', fallback: '🔄' },
  'CI CD': { type: 'local', icon: 'CI CD.svg', fallback: '🔄' },
  'azure devops': { type: 'local', icon: 'Azure Devops.svg', fallback: '🔄' },
  'signalr integration': { type: 'local', icon: 'signalr.png', fallback: '📡' },
  'signalr': { type: 'local', icon: 'signalr.png', fallback: '📡' },
  'websocket': { type: 'local', icon: 'realtime.png', fallback: '📡' },
  'pwa': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'progressive web app': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'progressive web app (pwa)': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  
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
  'azure app service': { type: 'local', icon: 'app services.svg', fallback: '☁️' },
  'azure app services': { type: 'local', icon: 'app services.svg', fallback: '☁️' },
  'Azure App Services': { type: 'local', icon: 'app services.svg', fallback: '☁️' },
  'azure functions': { type: 'local', icon: 'Azure Functions.png', fallback: '⚡' },
  'Azure Functions': { type: 'local', icon: 'Azure Functions.png', fallback: '⚡' },
  'azure sql database': { type: 'local', icon: 'Azure SQL Database.svg', fallback: '💾' },
  'Azure SQL Database': { type: 'local', icon: 'Azure SQL Database.svg', fallback: '💾' },
  'azure key vault': { type: 'local', icon: 'azure key vault.png', fallback: '🔒' },
  'Azure Key Vault': { type: 'local', icon: 'azure key vault.png', fallback: '🔒' },
  'azure service fabric': { type: 'local', icon: 'Azure Service Fabric.png', fallback: '🧵' },
  'Azure Service Fabric': { type: 'local', icon: 'Azure Service Fabric.png', fallback: '🧵' },
  'Service Fabric': { type: 'local', icon: 'Azure Service Fabric.png', fallback: '🧵' },
  'azure service bus': { type: 'local', icon: 'azure service bus.png', fallback: '🚌' },
  'Azure Service Bus': { type: 'local', icon: 'azure service bus.png', fallback: '🚌' },
  'Service Bus': { type: 'local', icon: 'azure service bus.png', fallback: '🚌' },
  'azure load testing': { type: 'local', icon: 'azure load testing.png', fallback: '⚡' },
  'app services': { type: 'local', icon: 'app services.svg', fallback: '🌐' },
  'azure api gateway': { type: 'local', icon: 'api gateway.svg', fallback: '🚪' },
  'azure event grid': { type: 'local', icon: 'azure-event-grid.png', fallback: '📡' },
  'Azure Event Grid': { type: 'local', icon: 'azure-event-grid.png', fallback: '📡' },
  'azure stream analytics': { type: 'local', icon: 'azure-stream-analytics.png', fallback: '📊' },
  'azure stream analytics': { type: 'local', icon: 'azure-stream-analytics.png', fallback: '📊' },
  'azure event hubs': { type: 'local', icon: 'azure event hub.png', fallback: '📡' },
  'azure notification hub': { type: 'local', icon: 'azure notification hub.png', fallback: '🔔' },
  'azure api management': { type: 'local', icon: 'azure api management.png', fallback: '🚪' },
  'Azure API Management': { type: 'local', icon: 'azure api management.png', fallback: '🚪' },
  'azure resource manager': { type: 'local', icon: 'azure resource manager.png', fallback: '⚙️' },
  'azure data lake': { type: 'local', icon: 'data.png', fallback: '💾' },
  'azure data factory': { type: 'local', icon: 'data pipeline.png', fallback: '📡' },
  'Azure Data Factory': { type: 'local', icon: 'data pipeline.png', fallback: '📡' },
  'azure synapse analytics': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'azure active directory': { type: 'local', icon: 'authentication and authorization.png', fallback: '🔐' },
  'Azure Active Directory': { type: 'local', icon: 'authentication and authorization.png', fallback: '🔐' },
  'Azure AD': { type: 'local', icon: 'authentication and authorization.png', fallback: '🔐' },
  'oauth 2.0': { type: 'local', icon: 'oauth2-0.png', fallback: '🔐' },
  'oauth2.0': { type: 'local', icon: 'oauth2-0.png', fallback: '🔐' },
  'OAuth 2.0': { type: 'local', icon: 'oauth2-0.png', fallback: '🔐' },
  'OAuth2.0': { type: 'local', icon: 'oauth2-0.png', fallback: '🔐' },
  'oauth 2 0': { type: 'local', icon: 'oauth2-0.png', fallback: '🔐' },
  'security certificates': { type: 'local', icon: 'ssl.png', fallback: '🔒' },
  'ssl certificates': { type: 'local', icon: 'ssl.png', fallback: '🔒' },
  'arm templates': { type: 'local', icon: 'arm templates.png', fallback: '📋' },
  'ARM Templates': { type: 'local', icon: 'arm templates.png', fallback: '📋' },
  'infrastructure as code': { type: 'local', icon: 'arm templates.png', fallback: '📋' },
  'Terraform': { type: 'devicon', icon: 'terraform', fallback: '🏗️' },
  'terraform': { type: 'devicon', icon: 'terraform', fallback: '🏗️' },
  'Azure CLI': { type: 'local', icon: 'Azure Devops.svg', fallback: '🔄' },
  'azure cli': { type: 'local', icon: 'Azure Devops.svg', fallback: '🔄' },
  'Azure DevOps': { type: 'local', icon: 'Azure Devops.svg', fallback: '🔄' },
  'Azure Monitor': { type: 'local', icon: 'monitoring.png', fallback: '📊' },
  'Application Insights': { type: 'local', icon: 'insights.png', fallback: '💡' },
  'Log Analytics': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'Azure Storage': { type: 'local', icon: 'azure blob storage.png', fallback: '☁️' },
  'Azure Cosmos DB': { type: 'local', icon: 'cosmos db.png', fallback: '💾' },
  'Azure Virtual Machines': { type: 'local', icon: 'Azure.svg', fallback: '☁️' },
  'Azure Virtual Network': { type: 'local', icon: 'Azure.svg', fallback: '☁️' },
  'Azure Load Balancer': { type: 'local', icon: 'load_balancing.png', fallback: '⚖️' },
  'Azure Application Gateway': { type: 'local', icon: 'api gateway.svg', fallback: '🚪' },
  'Azure CDN': { type: 'local', icon: 'Azure.svg', fallback: '☁️' },
  'Azure Security Center': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'Azure Firewall': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'Azure Container Instances': { type: 'local', icon: 'Docker.svg', fallback: '🐳' },
  'Azure Kubernetes Service (AKS)': { type: 'devicon', icon: 'kubernetes', local: 'kubernetes.svg', fallback: '☸️' },
  'Azure Kubernetes Service': { type: 'devicon', icon: 'kubernetes', local: 'kubernetes.svg', fallback: '☸️' },
  'Container Instances': { type: 'local', icon: 'Docker.svg', fallback: '🐳' },
  'graphql': { type: 'local', icon: 'graph ql.png', fallback: '🔗' },
  'graph ql': { type: 'local', icon: 'graph ql.png', fallback: '🔗' },
  'power bi': { type: 'local', icon: 'power-bi-dashboard.png', fallback: '📊' },
  'powerbi': { type: 'local', icon: 'power-bi-dashboard.png', fallback: '📊' },
  'sap planet 8/9': { type: 'local', icon: 'planet 8.png', fallback: '🌍' },
  'sap planet 8 9': { type: 'local', icon: 'planet 8.png', fallback: '🌍' },
  'sap planet 8': { type: 'local', icon: 'planet 8.png', fallback: '🌍' },
  'sap planet 9': { type: 'local', icon: 'planet 9.png', fallback: '🌍' },
  'planet 8': { type: 'local', icon: 'planet 8.png', fallback: '🌍' },
  'planet 9': { type: 'local', icon: 'planet 9.png', fallback: '🌍' },
  'sap': { type: 'local', icon: 'enterprise.png', fallback: '🏢' },
  'cherwell hr': { type: 'local', icon: 'cherwell.png', fallback: '🔗' },
  'cherwell it': { type: 'local', icon: 'cherwell.png', fallback: '🔗' },
  'cherwell': { type: 'local', icon: 'cherwell.png', fallback: '🔗' },
  'microsoft teams': { type: 'local', icon: 'teams notification.png', fallback: '💬' },
  'teams': { type: 'local', icon: 'teams notification.png', fallback: '💬' },
  'microsoft sharepoint': { type: 'local', icon: 'sharepoint.png', fallback: '📎' },
  'sharepoint': { type: 'local', icon: 'sharepoint.png', fallback: '📎' },
  'power apps': { type: 'local', icon: 'power apps.png', fallback: '⚡' },
  'microsoft power platform': { type: 'local', icon: 'power apps.png', fallback: '⚡' },
  
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
  'resilience': { type: 'local', icon: 'monitoring.png', fallback: '🛡️' },
  'technology': { type: 'local', icon: 'framework.png', fallback: '⚙️' },
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
  
  // AirAsia Specific Icons
  'backup': { type: 'local', icon: 'data.png', fallback: '💾' },
  'automated backup & recovery': { type: 'local', icon: 'data.png', fallback: '💾' },
  'booking': { type: 'local', icon: 'portal.png', fallback: '📅' },
  'daily booking volume': { type: 'local', icon: 'portal.png', fallback: '📅' },
  'success rate': { type: 'local', icon: 'success.png', fallback: '✅' },
  'booking success rate': { type: 'local', icon: 'success.png', fallback: '✅' },
  'error rate': { type: 'local', icon: 'critical.png', fallback: '🚨' },
  'error handling': { type: 'local', icon: 'critical.png', fallback: '🚨' },
  'time': { type: 'local', icon: 'performance.png', fallback: '⏱️' },
  'booking completion time': { type: 'local', icon: 'performance.png', fallback: '⏱️' },
  
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
  'it service management': { type: 'local', icon: 'it service management.png', fallback: '⚙️' },
  'integration service': { type: 'local', icon: 'integration.png', fallback: '🔗' },
  'saga orchestrator': { type: 'local', icon: 'saga orcestrator.png', fallback: '⚙️' },
  'hr service': { type: 'local', icon: 'hr service.png', fallback: '⚙️' },
  'backup service': { type: 'local', icon: 'backup service.png', fallback: '⚙️' },
  'reporting service': { type: 'local', icon: 'reporting service.png', fallback: '⚙️' },
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
  'cost': { type: 'local', icon: 'financial.png', fallback: '💰' },
  'cost optimization': { type: 'local', icon: 'financial.png', fallback: '💰' },
  'migration': { type: 'local', icon: 'pipelines.png', fallback: '🔄' },
  'cloud migration': { type: 'local', icon: 'pipelines.png', fallback: '🔄' },
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
  'indexing': { type: 'local', icon: 'database optimization.png', fallback: '📊' },
  'data integrity': { type: 'local', icon: 'database.png', fallback: '🔒' },
  'entity framework': { type: 'local', icon: 'backend.png', fallback: '⚙️' },
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
  'enforcement': { type: 'local', icon: 'enforcement.png', fallback: '⚖️' },
  'project management': { type: 'local', icon: 'project management.png', fallback: '📋' },
  'land management': { type: 'local', icon: 'land management.png', fallback: '🗺️' },
  'municipal management': { type: 'local', icon: 'municipal management.png', fallback: '🏛️' },
  'Municipal Management': { type: 'local', icon: 'municipal management.png', fallback: '🏛️' },
  'urban planning': { type: 'local', icon: 'urban management.png', fallback: '🏙️' },
  'Urban Planning': { type: 'local', icon: 'urban management.png', fallback: '🏙️' },
  
  // Development & Tech Stack
  'modern web applications': { type: 'local', icon: 'web development.png', fallback: '🚀' },
  'modern tech stack': { type: 'local', icon: 'tech stack.png', fallback: '🛠️' },
  'technical stack': { type: 'local', icon: 'tech stack.png', fallback: '🛠️' },
  'full-stack mastery': { type: 'local', icon: 'fullstack.png', fallback: '🔄' },
  'full stack development': { type: 'local', icon: 'fullstack.png', fallback: '🔄' },
  'full stack': { type: 'local', icon: 'fullstack.png', fallback: '🔄' },
  'fullstack': { type: 'local', icon: 'fullstack.png', fallback: '🔄' },
  'capabilities': { type: 'local', icon: 'services.png', fallback: '⚙️' },
  'deliverables': { type: 'local', icon: 'delivery.png', fallback: '📦' },
  'code': { type: 'local', icon: 'fullstack.png', fallback: '💻' },
  'coding': { type: 'local', icon: 'fullstack.png', fallback: '💻' },
  'web solutions': { type: 'local', icon: 'web solutions.png', fallback: '🌐' },
  'process': { type: 'local', icon: 'pipelines.png', fallback: '🔄' },
  'workflow': { type: 'local', icon: 'pipelines.png', fallback: '🔄' },
  'development process': { type: 'local', icon: 'pipelines.png', fallback: '🔄' },
  
  // DevOps & Performance
  'devops excellence': { type: 'local', icon: 'devops.png', fallback: '⚙️' },
  'devops automation': { type: 'local', icon: 'automation.png', fallback: '⚙️' },
  'performance optimization': { type: 'local', icon: 'optimization.png', fallback: '📈' },
  'optimization': { type: 'local', icon: 'optimization.png', fallback: '📈' },
  
  // Leadership & Team
  'technical leadership': { type: 'local', icon: 'leadership.png', fallback: '👥' },
  'team leadership': { type: 'local', icon: 'team.png', fallback: '👥' },
  'leadership': { type: 'local', icon: 'leadership.png', fallback: '👥' },
  'mentoring': { type: 'local', icon: 'leadership.png', fallback: '👥' },
  'code review': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'strategy': { type: 'local', icon: 'architecture.png', fallback: '🏗️' },
  'best practices': { type: 'local', icon: 'pipelines.png', fallback: '✅' },
  
  // Industry Specific
  'aviation': { type: 'local', icon: 'aviation.png', fallback: '✈️' },
  'aviation domain': { type: 'local', icon: 'aviation.png', fallback: '🎯' },
  'airline': { type: 'local', icon: 'aviation.png', fallback: '✈️' },
  
  // Methodologies & Practices
  'agile development': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'agile practices': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'agile': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'agile methodologies': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'code review tools': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'static analysis': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'ci/cd practices': { type: 'local', icon: 'CI CD.svg', fallback: '🔄' },
  'architecture patterns': { type: 'local', icon: 'architecture.png', fallback: '🏗️' },
  'design patterns': { type: 'local', icon: 'architecture.png', fallback: '🏗️' },
  'system design': { type: 'local', icon: 'architecture.png', fallback: '🏗️' },
  'test-driven development': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'tdd': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'clean code': { type: 'local', icon: 'backend.png', fallback: '⚙️' },
  'refactoring': { type: 'local', icon: 'backend.png', fallback: '⚙️' },
  'git workflows': { type: 'devicon', icon: 'git', fallback: '🔀' },
  'documentation': { type: 'local', icon: 'Swagger.svg', fallback: '📝' },
  'knowledge sharing': { type: 'local', icon: 'leadership.png', fallback: '👥' },
  'scrum': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'kanban': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'safe': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'scaled agile framework': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'lean': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'jira': { type: 'devicon', icon: 'jira', fallback: '📋' },
  'github projects': { type: 'devicon', icon: 'github', fallback: '🐙' },
  'trello': { type: 'devicon', icon: 'trello', fallback: '📋' },
  'slack': { type: 'devicon', icon: 'slack', fallback: '💬' },
  'confluence': { type: 'devicon', icon: 'confluence', fallback: '📚' },
  'velocity tracking': { type: 'local', icon: 'performance.png', fallback: '📊' },
  'burndown charts': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'cumulative flow': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'user stories': { type: 'local', icon: 'pipelines.png', fallback: '📝' },
  'story points': { type: 'local', icon: 'measurement.png', fallback: '📏' },
  'sprint planning': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'retrospectives': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'sprint': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'backlog': { type: 'local', icon: 'pipelines.png', fallback: '📋' },
  'coaching': { type: 'local', icon: 'leadership.png', fallback: '👥' },
  'coordination': { type: 'local', icon: 'integration.png', fallback: '🔗' },
  'delivery': { type: 'local', icon: 'deployment.png', fallback: '🚀' },
  'team': { type: 'local', icon: 'team.png', fallback: '👥' },
  'communication': { type: 'local', icon: 'communication.png', fallback: '📧' },
  
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
  
  // .NET Core & C# Technologies
  '.net core': { type: 'local', icon: 'NET core.svg', fallback: '🔷' },
  'dotnet core': { type: 'local', icon: 'NET core.svg', fallback: '🔷' },
  'dotnet': { type: 'local', icon: 'NET core.svg', fallback: '🔷' },
  'entity framework': { type: 'local', icon: 'entity framework.png', fallback: '🗃️' },
  'ef core': { type: 'local', icon: 'entity framework.png', fallback: '🗃️' },
  'task parallel library': { type: 'local', icon: 'task parallel library.png', fallback: '⚡' },
  'tpl': { type: 'local', icon: 'task parallel library.png', fallback: '⚡' },
  
  // Database Technologies
  'cosmos db': { type: 'local', icon: 'cosmos db.png', fallback: '💾' },
  'azure cosmos db': { type: 'local', icon: 'cosmos db.png', fallback: '💾' },
  'redis': { type: 'local', icon: 'Redis.svg', fallback: '🔴' },
  'data lake': { type: 'local', icon: 'data.png', fallback: '💾' },
  'data factory': { type: 'local', icon: 'data pipeline.png', fallback: '📡' },
  'synapse analytics': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  
  // Security & Authentication
  'jwt': { type: 'local', icon: 'jwt.png', fallback: '🔐' },
  'json web tokens': { type: 'local', icon: 'jwt.png', fallback: '🔐' },
  'active directory': { type: 'local', icon: 'authentication and authorization.png', fallback: '🔐' },
  'azure ad': { type: 'local', icon: 'authentication and authorization.png', fallback: '🔐' },
  'oauth': { type: 'local', icon: 'oauth2-0.png', fallback: '🔐' },
  'ssl': { type: 'local', icon: 'ssl.png', fallback: '🔒' },
  'tls': { type: 'local', icon: 'ssl.png', fallback: '🔒' },
  'certificates': { type: 'local', icon: 'ssl.png', fallback: '🔒' },
  
  // Frontend Technologies
  'angular': { type: 'local', icon: 'Angular.svg', fallback: '🅰️' },
  'angular material': { type: 'local', icon: 'frontend.png', fallback: '🎨' },
  'typescript': { type: 'local', icon: 'framework.png', fallback: '🔷' },
  'responsive design': { type: 'local', icon: 'responsive.png', fallback: '📱' },
  'signalr': { type: 'local', icon: 'signalr.png', fallback: '📡' },
  'signal r': { type: 'local', icon: 'signalr.png', fallback: '📡' },
  
  // DevOps & CI/CD
  'azure devops': { type: 'local', icon: 'Azure Devops.svg', fallback: '🔄' },
  'devops': { type: 'local', icon: 'Azure Devops.svg', fallback: '🔄' },
  'ci/cd': { type: 'local', icon: 'Azure Devops.svg', fallback: '🔄' },
  'version control': { type: 'local', icon: 'repository.png', fallback: '📝' },
  
  // Monitoring & Analytics
  'application insights': { type: 'local', icon: 'insights.png', fallback: '💡' },
  'azure monitor': { type: 'local', icon: 'monitoring.png', fallback: '📊' },
  'log analytics': { type: 'local', icon: 'continuous monitoring.png', fallback: '📈' },
  'machine learning': { type: 'local', icon: 'machine learning.png', fallback: '🤖' },
  'ml': { type: 'local', icon: 'machine learning.png', fallback: '🤖' },
  
  // Smart City & GIS Technologies
  'google maps api': { type: 'local', icon: 'google maps.png', fallback: '🗺️' },
  'google maps': { type: 'local', icon: 'google maps.png', fallback: '🗺️' },
  'google street view': { type: 'local', icon: 'google streetview.png', fallback: '🌍' },
  'google streetview': { type: 'local', icon: 'google streetview.png', fallback: '🌍' },
  'gis systems': { type: 'local', icon: 'gis systems.png', fallback: '🗺️' },
  'gis': { type: 'local', icon: 'gis systems.png', fallback: '🗺️' },
  'spatial data': { type: 'local', icon: 'spatial data.png', fallback: '🗺️' },
  'spatial analysis': { type: 'local', icon: 'spatial data.png', fallback: '🗺️' },
  'cctv systems': { type: 'local', icon: 'cctv systems.png', fallback: '📹' },
  'cctv': { type: 'local', icon: 'cctv systems.png', fallback: '📹' },
  'iot sensors': { type: 'local', icon: 'iot sensors.png', fallback: '📡' },
  'iot': { type: 'local', icon: 'iot sensors.png', fallback: '📡' },
  'real-time analytics': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'signalr': { type: 'devicon', icon: 'microsoft', fallback: '📡' },
  'automapper': { type: 'local', icon: 'automapper.png', fallback: '🔄' },
  'AutoMapper': { type: 'local', icon: 'automapper.png', fallback: '🔄' },
  'fluentvalidation': { type: 'local', icon: 'fluentvalidation.png', fallback: '✅' },
  'FluentValidation': { type: 'local', icon: 'fluentvalidation.png', fallback: '✅' },
  'chart.js': { type: 'local', icon: 'chartsjs.png', fallback: '📊' },
  'Chart.js': { type: 'local', icon: 'chartsjs.png', fallback: '📊' },
  'supermap': { type: 'local', icon: 'supermap.png', fallback: '🗺️' },
  'SuperMap': { type: 'local', icon: 'supermap.png', fallback: '🗺️' },
  'leaflet': { type: 'local', icon: 'leaflet.png', fallback: '🗺️' },
  'Leaflet': { type: 'local', icon: 'leaflet.png', fallback: '🗺️' },
  'postgis': { type: 'local', icon: 'postgis.png', fallback: '🗺️' },
  'PostGIS': { type: 'local', icon: 'postgis.png', fallback: '🗺️' },
  'geojson': { type: 'local', icon: 'geojson.png', fallback: '🗺️' },
  'GeoJSON': { type: 'local', icon: 'geojson.png', fallback: '🗺️' },
  'grafana': { type: 'devicon', icon: 'grafana', fallback: '📊' },
  'Grafana': { type: 'devicon', icon: 'grafana', fallback: '📊' },
  'prometheus': { type: 'devicon', icon: 'prometheus', fallback: '📈' },
  'Prometheus': { type: 'devicon', icon: 'prometheus', fallback: '📈' },
  'jwt': { type: 'local', icon: 'jwt.png', fallback: '🔐' },
  'JWT': { type: 'local', icon: 'jwt.png', fallback: '🔐' },
  'oauth 2.0': { type: 'local', icon: 'oauth.png', fallback: '🔑' },
  'OAuth 2.0': { type: 'local', icon: 'oauth.png', fallback: '🔑' },
  'ssl/tls': { type: 'local', icon: 'ssl.png', fallback: '🔒' },
  'SSL/TLS': { type: 'local', icon: 'ssl.png', fallback: '🔒' },
  'docker': { type: 'devicon', icon: 'docker', fallback: '🐳' },
  'Docker': { type: 'devicon', icon: 'docker', fallback: '🐳' },
  'azure devops': { type: 'devicon', icon: 'azuredevops', fallback: '🔄' },
  'Azure DevOps': { type: 'devicon', icon: 'azuredevops', fallback: '🔄' },
  'git': { type: 'devicon', icon: 'git', fallback: '📝' },
  'Git': { type: 'devicon', icon: 'git', fallback: '📝' },
  'ai': { type: 'local', icon: 'machine learning.png', fallback: '🤖' },
  'artificial intelligence': { type: 'local', icon: 'machine learning.png', fallback: '🤖' },
  
  // API & Integration
  'rest api': { type: 'local', icon: 'web api.svg', fallback: '🔗' },
  'rest': { type: 'local', icon: 'web api.svg', fallback: '🔗' },
  'api': { type: 'local', icon: 'web api.svg', fallback: '🔗' },
  'swagger': { type: 'local', icon: 'Swagger.svg', fallback: '📝' },
  'api documentation': { type: 'local', icon: 'Swagger.svg', fallback: '📝' },
  'api management': { type: 'local', icon: 'azure api management.png', fallback: '🚪' },
  'api gateway': { type: 'local', icon: 'api gateway.svg', fallback: '🚪' },
  'graphql': { type: 'local', icon: 'graph ql.png', fallback: '🔗' },
  'graph ql': { type: 'local', icon: 'graph ql.png', fallback: '🔗' },
  'angular': { type: 'local', icon: 'Angular.svg', fallback: '🅰️' },
  'azure event grid': { type: 'local', icon: 'azure-event-grid.png', fallback: '📡' },
  'azure stream analytics': { type: 'local', icon: 'azure-stream-analytics.png', fallback: '📊' },
  'azure': { type: 'local', icon: 'Azure.svg', fallback: '☁️' },
  'azure sql database': { type: 'local', icon: 'Azure SQL Database.svg', fallback: '💾' },
  'azure functions': { type: 'local', icon: 'Azure Functions.png', fallback: '⚡' },
  'architecture.png': { type: 'local', icon: 'architecture.png', fallback: '🏗️' },
  'redis': { type: 'local', icon: 'Redis.svg', fallback: '🔴' },
  'notification service': { type: 'local', icon: 'notification service.png', fallback: '🔔' },
  'teams notification': { type: 'local', icon: 'teams notification.png', fallback: '💬' },
  'signalr': { type: 'local', icon: 'signalr.png', fallback: '📡' },
  'openshift gateway': { type: 'local', icon: 'openshift gateway.png', fallback: '🚪' },
  'openshift': { type: 'local', icon: 'openshift1.png', fallback: '🏗️' },
  'net core': { type: 'local', icon: 'NET core.svg', fallback: '⚙️' },
  'integration': { type: 'local', icon: 'integration.png', fallback: '🔗' },
  'data processing': { type: 'local', icon: 'data processing.png', fallback: '⚙️' },
  'analytics': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'sql server': { type: 'local', icon: 'sql server.svg', fallback: '💾' },
  'redis': { type: 'local', icon: 'Redis.svg', fallback: '🔴' },
  'docker': { type: 'local', icon: 'Docker.svg', fallback: '🐳' },
  'grafana': { type: 'local', icon: 'Grafana.svg', fallback: '📊' },
  'prometheus': { type: 'local', icon: 'Prometheus.svg', fallback: '📈' },
  'nexus': { type: 'local', icon: 'nexus.svg', fallback: '📦' },
  'sonatype': { type: 'local', icon: 'sonatype.svg', fallback: '📦' },
  'swagger': { type: 'local', icon: 'Swagger.svg', fallback: '📝' },
  'openapi': { type: 'local', icon: 'OpenAPI.svg', fallback: '📝' },
  'nunit': { type: 'local', icon: 'nunit.svg', fallback: '✅' },
  'framework': { type: 'local', icon: 'framework.png', fallback: '⚙️' },
  'background jobs': { type: 'local', icon: 'background jobs.png', fallback: '⚙️' },
  'integration gateway': { type: 'local', icon: 'integration gateway.svg', fallback: '🔗' },
  'gateway': { type: 'local', icon: 'gateway.png', fallback: '🚪' },
  'api gateway': { type: 'local', icon: 'api gateway.svg', fallback: '🚪' },
  'security': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'compliance': { type: 'local', icon: 'compliance.png', fallback: '✅' },
  'azure devops': { type: 'local', icon: 'Azure Devops.svg', fallback: '🔄' },
  'web api': { type: 'local', icon: 'web api.svg', fallback: '🌐' },
  'api': { type: 'local', icon: 'api.svg', fallback: '🌐' },
  'pipelines': { type: 'local', icon: 'pipelines.png', fallback: '🔄' },
  'ci cd': { type: 'local', icon: 'CI CD.svg', fallback: '🔄' },
  'mvc': { type: 'local', icon: 'mvc.png', fallback: '🏗️' },
  'entity framework': { type: 'local', icon: 'entity framework.png', fallback: '🗄️' },
  'mongodb': { type: 'local', icon: 'MongoDB.svg', fallback: '🍃' },
  'mysql': { type: 'local', icon: 'MySQL.svg', fallback: '🐬' },
  'postgresql': { type: 'local', icon: 'PostgresSQL.svg', fallback: '🐘' },
  'kubernetes': { type: 'local', icon: 'kubernetes.svg', fallback: '☸️' },
  'ingress': { type: 'local', icon: 'ingress.svg', fallback: '🚪' },
  'nginx': { type: 'local', icon: 'nginx.svg', fallback: '🌐' },
  'bootstrap': { type: 'local', icon: 'bootstrap.svg', fallback: '🎨' },
  'primeng': { type: 'local', icon: 'primeng.svg', fallback: '🎨' },
  'jquery': { type: 'local', icon: 'jquery.svg', fallback: '⚡' },
  'json': { type: 'local', icon: 'JSON.svg', fallback: '📄' },
  'aviation': { type: 'local', icon: 'aviation.png', fallback: '✈️' },
  'azure blob storage': { type: 'local', icon: 'azure blob storage.png', fallback: '☁️' },
  'azure service bus': { type: 'local', icon: 'azure service bus.png', fallback: '🚌' },
  'azure event grid': { type: 'local', icon: 'azure-event-grid.png', fallback: '📡' },
  'azure stream analytics': { type: 'local', icon: 'azure-stream-analytics.png', fallback: '📊' },
  'continuous monitoring': { type: 'local', icon: 'continuous monitoring.png', fallback: '📊' },
  'cosmos db': { type: 'local', icon: 'cosmos db.png', fallback: '💾' },
  'database': { type: 'local', icon: 'database.png', fallback: '💾' },
  'email notification': { type: 'local', icon: 'email notification.png', fallback: '📧' },
  'event-processing-workflow': { type: 'local', icon: 'event-processing-workflow.png', fallback: '⚙️' },
  'financial': { type: 'local', icon: 'financial.png', fallback: '💰' },
  'frontend': { type: 'local', icon: 'frontend.png', fallback: '🎨' },
  'google sso': { type: 'local', icon: 'google sso.png', fallback: '🔐' },
  'insights': { type: 'local', icon: 'insights.png', fallback: '💡' },
  'microservices': { type: 'local', icon: 'microservices.png', fallback: '🏗️' },
  'mobile': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'monitoring-workflow': { type: 'local', icon: 'monitoring-workflow.png', fallback: '📊' },
  'monitoring': { type: 'local', icon: 'monitoring.png', fallback: '📊' },
  'notification service': { type: 'local', icon: 'notification service.png', fallback: '🔔' },
  'portal': { type: 'local', icon: 'portal.png', fallback: '🌐' },
  'power-bi-dashboard': { type: 'local', icon: 'power-bi-dashboard.png', fallback: '📊' },
  'services': { type: 'local', icon: 'services.png', fallback: '⚙️' },
  'sms notification': { type: 'local', icon: 'sms notification.png', fallback: '📱' },
  'teams notification': { type: 'local', icon: 'teams notification.png', fallback: '💬' },
  'user': { type: 'local', icon: 'user.png', fallback: '👤' },
  'architecture': { type: 'local', icon: 'architecture.png', fallback: '🏗️' },
  'authentication and authorization': { type: 'local', icon: 'authentication and authorization.png', fallback: '🔐' },
  'azure': { type: 'local', icon: 'Azure.svg', fallback: '☁️' },
  'azure functions': { type: 'local', icon: 'Azure Functions.png', fallback: '⚡' },
  'azure sql database': { type: 'local', icon: 'Azure SQL Database.svg', fallback: '💾' },
  'power apps': { type: 'local', icon: 'power apps.png', fallback: '⚡' },
  'sharepoint': { type: 'local', icon: 'sharepoint.png', fallback: '📎' },
  'data': { type: 'local', icon: 'data.png', fallback: '💾' },
  'enterprise': { type: 'local', icon: 'enterprise.png', fallback: '🏢' },
  'angular': { type: 'local', icon: 'Angular.svg', fallback: '🅰️' },
  'architecture.png': { type: 'local', icon: 'architecture.png', fallback: '🏗️' },
  
  // G5 POS specific technology mappings
  'asp net core web api': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  'asp.net core web api': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  'asp net core microservices': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  'asp.net core microservices': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  'asp net core web apis': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  'asp.net core web apis': { type: 'devicon', icon: 'dotnetcore', local: 'NET core.svg', fallback: '⚙️' },
  'angular 12+': { type: 'devicon', icon: 'angular', local: 'Angular.svg', fallback: '🅰️' },
  'angular 12': { type: 'devicon', icon: 'angular', local: 'Angular.svg', fallback: '🅰️' },
  'bootstrap 5': { type: 'devicon', icon: 'bootstrap', local: 'bootstrap.svg', fallback: '🎨' },
  'pwa': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'progressive web app': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'progressive web app (pwa)': { type: 'local', icon: 'mobile.png', fallback: '📱' },
  'websocket': { type: 'local', icon: 'realtime.png', fallback: '📡' },
  'azure app service': { type: 'local', icon: 'app services.svg', fallback: '☁️' },
  'payment gateway integration': { type: 'local', icon: 'api gateway.svg', fallback: '🚪' },
  'multi-payment gateway integration': { type: 'local', icon: 'api gateway.svg', fallback: '🚪' },
  'printer integration': { type: 'local', icon: 'integration.png', fallback: '🔗' },
  'kitchen printer integration': { type: 'local', icon: 'integration.png', fallback: '🔗' },
  'receipt printer': { type: 'local', icon: 'integration.png', fallback: '🔗' },
  'kitchen printer': { type: 'local', icon: 'integration.png', fallback: '🔗' },
  'barcode scanner support': { type: 'local', icon: 'automation.png', fallback: '⚙️' },
  'barcode scanner': { type: 'local', icon: 'automation.png', fallback: '⚙️' },
  'pci dss compliance': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'pci dss': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'pci': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'microservices architecture': { type: 'local', icon: 'microservices.png', fallback: '🏗️' },
  
  // Additional Azure Services
  'azure migrate': { type: 'local', icon: 'Azure Devops.svg', fallback: '🔄' },
  'Azure Migrate': { type: 'local', icon: 'Azure Devops.svg', fallback: '🔄' },
  'azure site recovery': { type: 'local', icon: 'backup service.png', fallback: '💾' },
  'Azure Site Recovery': { type: 'local', icon: 'backup service.png', fallback: '💾' },
  'database migration': { type: 'local', icon: 'pipelines.png', fallback: '🔄' },
  'Database Migration': { type: 'local', icon: 'pipelines.png', fallback: '🔄' },
  'application migration': { type: 'local', icon: 'pipelines.png', fallback: '🔄' },
  'Application Migration': { type: 'local', icon: 'pipelines.png', fallback: '🔄' },
  'azure pipelines': { type: 'local', icon: 'Azure Devops.svg', fallback: '🔄' },
  'Azure Pipelines': { type: 'local', icon: 'Azure Devops.svg', fallback: '🔄' },
  'github actions': { type: 'devicon', icon: 'github', fallback: '🐙' },
  'GitHub Actions': { type: 'devicon', icon: 'github', fallback: '🐙' },
  'key vault': { type: 'local', icon: 'azure key vault.png', fallback: '🔒' },
  'Key Vault': { type: 'local', icon: 'azure key vault.png', fallback: '🔒' },
  'cost management': { type: 'local', icon: 'financial.png', fallback: '💰' },
  'Cost Management': { type: 'local', icon: 'financial.png', fallback: '💰' },
  'performance tuning': { type: 'local', icon: 'performance.png', fallback: '⚡' },
  'Performance Tuning': { type: 'local', icon: 'performance.png', fallback: '⚡' },
  'network security': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'Network Security': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'azure security center': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'Azure Security Center': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'aks': { type: 'devicon', icon: 'kubernetes', local: 'kubernetes.svg', fallback: '☸️' },
  'AKS': { type: 'devicon', icon: 'kubernetes', local: 'kubernetes.svg', fallback: '☸️' },
  'container instances': { type: 'local', icon: 'Docker.svg', fallback: '🐳' },
  'Container Instances': { type: 'local', icon: 'Docker.svg', fallback: '🐳' },
  
  // Additional Azure service variations for exact matching
  'azure app service': { type: 'local', icon: 'app services.svg', fallback: '☁️' },
  'azure sql database': { type: 'local', icon: 'Azure SQL Database.svg', fallback: '💾' },
  'azure cosmos db': { type: 'local', icon: 'cosmos db.png', fallback: '💾' },
  'azure storage': { type: 'local', icon: 'azure blob storage.png', fallback: '☁️' },
  'azure data factory': { type: 'local', icon: 'data pipeline.png', fallback: '📡' },
  'azure virtual network': { type: 'local', icon: 'Azure.svg', fallback: '☁️' },
  'azure load balancer': { type: 'local', icon: 'load_balancing.png', fallback: '⚖️' },
  'azure application gateway': { type: 'local', icon: 'api gateway.svg', fallback: '🚪' },
  'azure cdn': { type: 'local', icon: 'Azure.svg', fallback: '☁️' },
  'azure active directory': { type: 'local', icon: 'authentication and authorization.png', fallback: '🔐' },
  'azure key vault': { type: 'local', icon: 'azure key vault.png', fallback: '🔒' },
  'azure security center': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'azure firewall': { type: 'local', icon: 'security.png', fallback: '🔒' },
  'azure devops': { type: 'local', icon: 'Azure Devops.svg', fallback: '🔄' },
  'azure monitor': { type: 'local', icon: 'monitoring.png', fallback: '📊' },
  'azure service bus': { type: 'local', icon: 'azure service bus.png', fallback: '🚌' },
  'azure event grid': { type: 'local', icon: 'azure-event-grid.png', fallback: '📡' },
  'azure api management': { type: 'local', icon: 'azure api management.png', fallback: '🚪' },
  'azure virtual machines': { type: 'local', icon: 'Azure.svg', fallback: '☁️' },
  'azure container instances': { type: 'local', icon: 'Docker.svg', fallback: '🐳' },
  
  // Microservices Patterns
  'rest apis': { type: 'local', icon: 'api.svg', fallback: '🌐' },
  'REST APIs': { type: 'local', icon: 'api.svg', fallback: '🌐' },
  'grpc': { type: 'devicon', icon: 'grpc', fallback: '🔗' },
  'gRPC': { type: 'devicon', icon: 'grpc', fallback: '🔗' },
  'service mesh': { type: 'local', icon: 'microservices.png', fallback: '🏗️' },
  'Service Mesh': { type: 'local', icon: 'microservices.png', fallback: '🏗️' },
  'circuit breaker': { type: 'local', icon: 'monitoring.png', fallback: '🛡️' },
  'Circuit Breaker': { type: 'local', icon: 'monitoring.png', fallback: '🛡️' },
  'event sourcing': { type: 'local', icon: 'data pipeline.png', fallback: '📡' },
  'Event Sourcing': { type: 'local', icon: 'data pipeline.png', fallback: '📡' },
  'cqrs': { type: 'local', icon: 'database.png', fallback: '💾' },
  'CQRS': { type: 'local', icon: 'database.png', fallback: '💾' },
  'distributed tracing': { type: 'local', icon: 'monitoring.png', fallback: '📊' },
  'Distributed Tracing': { type: 'local', icon: 'monitoring.png', fallback: '📊' },
  
  // Technical Leadership
  'agile methodologies': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'Agile Methodologies': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'code review tools': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'Code Review Tools': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'static analysis': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'Static Analysis': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'ci/cd practices': { type: 'local', icon: 'CI CD.svg', fallback: '🔄' },
  'CI/CD Practices': { type: 'local', icon: 'CI CD.svg', fallback: '🔄' },
  'architecture patterns': { type: 'local', icon: 'architecture.png', fallback: '🏗️' },
  'Architecture Patterns': { type: 'local', icon: 'architecture.png', fallback: '🏗️' },
  'design patterns': { type: 'local', icon: 'architecture.png', fallback: '🏗️' },
  'Design Patterns': { type: 'local', icon: 'architecture.png', fallback: '🏗️' },
  'system design': { type: 'local', icon: 'architecture.png', fallback: '🏗️' },
  'System Design': { type: 'local', icon: 'architecture.png', fallback: '🏗️' },
  'test-driven development': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'Test-Driven Development': { type: 'local', icon: 'testing.png', fallback: '✅' },
  'clean code': { type: 'local', icon: 'backend.png', fallback: '⚙️' },
  'Clean Code': { type: 'local', icon: 'backend.png', fallback: '⚙️' },
  'refactoring': { type: 'local', icon: 'backend.png', fallback: '⚙️' },
  'Refactoring': { type: 'local', icon: 'backend.png', fallback: '⚙️' },
  'git workflows': { type: 'devicon', icon: 'git', fallback: '🔀' },
  'Git Workflows': { type: 'devicon', icon: 'git', fallback: '🔀' },
  'documentation': { type: 'local', icon: 'Swagger.svg', fallback: '📝' },
  'Documentation': { type: 'local', icon: 'Swagger.svg', fallback: '📝' },
  'knowledge sharing': { type: 'local', icon: 'leadership.png', fallback: '👥' },
  'Knowledge Sharing': { type: 'local', icon: 'leadership.png', fallback: '👥' },
  
  // Agile Project Management
  'scrum': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'Scrum': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'kanban': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'Kanban': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'safe': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'SAFe': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'lean': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'Lean': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'jira': { type: 'devicon', icon: 'jira', fallback: '📋' },
  'Jira': { type: 'devicon', icon: 'jira', fallback: '📋' },
  'github projects': { type: 'devicon', icon: 'github', fallback: '🐙' },
  'GitHub Projects': { type: 'devicon', icon: 'github', fallback: '🐙' },
  'trello': { type: 'devicon', icon: 'trello', fallback: '📋' },
  'Trello': { type: 'devicon', icon: 'trello', fallback: '📋' },
  'microsoft teams': { type: 'local', icon: 'teams notification.png', fallback: '💬' },
  'Microsoft Teams': { type: 'local', icon: 'teams notification.png', fallback: '💬' },
  'slack': { type: 'devicon', icon: 'slack', fallback: '💬' },
  'Slack': { type: 'devicon', icon: 'slack', fallback: '💬' },
  'confluence': { type: 'devicon', icon: 'confluence', fallback: '📚' },
  'Confluence': { type: 'devicon', icon: 'confluence', fallback: '📚' },
  'velocity tracking': { type: 'local', icon: 'performance.png', fallback: '📊' },
  'Velocity Tracking': { type: 'local', icon: 'performance.png', fallback: '📊' },
  'burndown charts': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'Burndown Charts': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'cumulative flow': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'Cumulative Flow': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'user stories': { type: 'local', icon: 'pipelines.png', fallback: '📝' },
  'User Stories': { type: 'local', icon: 'pipelines.png', fallback: '📝' },
  'story points': { type: 'local', icon: 'measurement.png', fallback: '📏' },
  'Story Points': { type: 'local', icon: 'measurement.png', fallback: '📏' },
  'sprint planning': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'Sprint Planning': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'retrospectives': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'Retrospectives': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'sprint': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'Sprint': { type: 'local', icon: 'agile.png', fallback: '🔄' },
  'backlog': { type: 'local', icon: 'pipelines.png', fallback: '📋' },
  'Backlog': { type: 'local', icon: 'pipelines.png', fallback: '📋' },
  'coaching': { type: 'local', icon: 'leadership.png', fallback: '👥' },
  'Coaching': { type: 'local', icon: 'leadership.png', fallback: '👥' },
  'coordination': { type: 'local', icon: 'integration.png', fallback: '🔗' },
  'Coordination': { type: 'local', icon: 'integration.png', fallback: '🔗' },
  'delivery': { type: 'local', icon: 'deployment.png', fallback: '🚀' },
  'Delivery': { type: 'local', icon: 'deployment.png', fallback: '🚀' },
  'team': { type: 'local', icon: 'team.png', fallback: '👥' },
  'Team': { type: 'local', icon: 'team.png', fallback: '👥' },
  'communication': { type: 'local', icon: 'communication.png', fallback: '📧' },
  'Communication': { type: 'local', icon: 'communication.png', fallback: '📧' },
  
  // Database Design & Optimization
  'sql server management studio': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'SQL Server Management Studio': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'sql server profiler': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'SQL Server Profiler': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'execution plans': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'Execution Plans': { type: 'local', icon: 'analytics.png', fallback: '📊' },
  'dynamic management views': { type: 'local', icon: 'monitoring.png', fallback: '📊' },
  'Dynamic Management Views': { type: 'local', icon: 'monitoring.png', fallback: '📊' },
  'query store': { type: 'local', icon: 'database.png', fallback: '💾' },
  'Query Store': { type: 'local', icon: 'database.png', fallback: '💾' },
  'clustered indexes': { type: 'local', icon: 'database optimization.png', fallback: '📊' },
  'Clustered Indexes': { type: 'local', icon: 'database optimization.png', fallback: '📊' },
  'non-clustered indexes': { type: 'local', icon: 'database optimization.png', fallback: '📊' },
  'Non-Clustered Indexes': { type: 'local', icon: 'database optimization.png', fallback: '📊' },
  'covering indexes': { type: 'local', icon: 'database optimization.png', fallback: '📊' },
  'Covering Indexes': { type: 'local', icon: 'database optimization.png', fallback: '📊' },
  'filtered indexes': { type: 'local', icon: 'database optimization.png', fallback: '📊' },
  'Filtered Indexes': { type: 'local', icon: 'database optimization.png', fallback: '📊' },
  'table partitioning': { type: 'local', icon: 'database.png', fallback: '💾' },
  'Table Partitioning': { type: 'local', icon: 'database.png', fallback: '💾' },
  'data archiving': { type: 'local', icon: 'data.png', fallback: '💾' },
  'Data Archiving': { type: 'local', icon: 'data.png', fallback: '💾' },
  'backup & recovery': { type: 'local', icon: 'backup service.png', fallback: '💾' },
  'Backup & Recovery': { type: 'local', icon: 'backup service.png', fallback: '💾' },
  'sql server in-memory oltp': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'SQL Server In-Memory OLTP': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'in-memory oltp': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' },
  'In-Memory OLTP': { type: 'devicon', icon: 'microsoftsqlserver', local: 'sql server.svg', fallback: '💾' }
}

// Local icons available in /assets/img/Icons/
const LOCAL_ICONS = [
  // Resume & Career Icons
  'academic excellence.png', 'agile.png', 'ai ocr.png', 'api development.png', 'architecture.png', 
  'automation.png', 'aviation.png', 'awards.png', 'champion.png', 'cherwell.png', 'cloud architecture.png', 
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
  'background jobs.png', 'bootstrap.png', 'bootstrap.svg', 'chartsjs.png', 'CI CD.svg', 'cloud hosting.png',
  'cloud.png', 'compliance.png', 'context.png', 'continuous monitoring.png', 'cosmos db.png', 'dapper.png', 'data encryption.png',
  'data pipeline.png', 'data processing.png', 'data.png', 'database optimization.png',
  'database.png', 'Docker.svg', 'enforcement.png', 'entity framework.png', 'escalation matrix.png',
  'framework.png', 'frontend.png', 'gateway.png', 'Grafana.svg', 'ingress.svg', 
  'insights.png', 'integration gateway.svg', 'jquery.png', 'jquery.svg', 'JSON.svg', 
  'kubernetes.svg', 'land management.png', 'linq2sql.png', 'linq2sql.svg', 'load_balancing.png', 'measurement.png', 'municipal management.png', 'mobile.png',
  'MongoDB.svg', 'monitoring.png', 'multi factor authentication.png', 'mvc.png', 
  'MySQL.svg', 'NET core.svg', 'network_traffic.png', 'nexus.svg', 'nginx.svg', 
  'nunit.svg', 'OpenAPI.svg', 'openshift gateway.png', 'openshift1.png', 
  'parallel processing.png', 'partners.png', 'performance.png', 'performance metrics.png', 'performance_11670215.png', 'pipelines.png', 
  'planet 8.png', 'planet 9.png', 'portal.png', 'PostgresSQL.svg', 'power apps.png', 'primeng.svg', 'project management.png', 'Prometheus.svg',
  'supermap.png', 'spatial data.png', 'geojson.png', 'gis systems.png', 'cctv systems.png', 'iot sensors.png', 'leaflet.png', 'postgis.png', 'google maps.png', 'google streetview.png', 
  'Redis.svg', 'repository.png', 'responsive.png', 'security and compliance.png',
  'security.png', 'services.png', 'sharepoint.png', 'signalr.png', 'sonatype.svg', 
  'sql server.svg', 'ssl.png', 'success.png', 'Swagger.svg', 'system performance.png', 'testing.png',   'user.png', 'urban management.png', 'validation.png', 'web api.svg', 
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
    .replace(/[^a-z0-9\s-]/g, ' ')  // Remove special chars except spaces and hyphens
    .replace(/\s+/g, ' ')  // Normalize multiple spaces to single space
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
    // PostGIS - HIGHEST PRIORITY
    { keywords: ['postgis'], icon: 'postgis', type: 'local' },
    
    // Google technologies
    { keywords: ['google sso', 'google workspace', 'google auth'], icon: 'google sso', type: 'local' },
    { keywords: ['google cloud', 'gcp'], icon: 'google.png', type: 'local' },
    { keywords: ['google maps api', 'google maps'], icon: 'google maps', type: 'local' },
    { keywords: ['google street view', 'google streetview'], icon: 'google streetview', type: 'local' },
    
    // GIS & Mapping Technologies
    { keywords: ['geojson', 'geo json'], icon: 'geojson', type: 'local' },
    { keywords: ['gis', 'gis systems'], icon: 'gis systems', type: 'local' },
    { keywords: ['cctv', 'cctv systems'], icon: 'cctv systems', type: 'local' },
    { keywords: ['iot', 'iot sensors'], icon: 'iot sensors', type: 'local' },
    { keywords: ['leaflet'], icon: 'leaflet', type: 'local' },
    
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
    { keywords: ['postgis'], icon: 'postgis', type: 'local' },
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
    
    // Frontend Technologies (prioritized)
    { keywords: ['html', 'html5'], icon: 'html5', type: 'devicon' },
    { keywords: ['css', 'css3'], icon: 'css3', type: 'devicon' },
    { keywords: ['javascript', 'js'], icon: 'javascript', type: 'devicon' },
    { keywords: ['chart.js', 'chartjs'], icon: 'chart.js', type: 'local' },
    { keywords: ['sound', 'audio', 'sound & audio', 'sound and audio', 'audio management', 'sound management'], icon: 'speech', type: 'local' },
    
    // GIS & Mapping Technologies (prioritized)
    { keywords: ['supermap'], icon: 'supermap', type: 'local' },
    { keywords: ['postgis'], icon: 'postgis', type: 'local' },
    { keywords: ['geojson', 'geo json'], icon: 'geojson', type: 'local' },
    { keywords: ['gis', 'gis systems'], icon: 'gis systems', type: 'local' },
    { keywords: ['cctv', 'cctv systems'], icon: 'cctv systems', type: 'local' },
    { keywords: ['iot', 'iot sensors'], icon: 'iot sensors', type: 'local' },
    { keywords: ['leaflet'], icon: 'leaflet', type: 'local' },
    
    // Smart City & Municipal Management
    { keywords: ['municipal management', 'municipal'], icon: 'municipal management', type: 'local' },
    { keywords: ['urban planning', 'urban'], icon: 'urban planning', type: 'local' },
    
    // Monitoring & Analytics
    { keywords: ['grafana'], icon: 'grafana', type: 'local' },
    { keywords: ['prometheus'], icon: 'prometheus', type: 'local' },
    { keywords: ['machine learning'], icon: 'machine learning', type: 'local' },
    { keywords: ['ml'], icon: 'machine learning', type: 'local' },
    { keywords: ['azure stream analytics', 'stream analytics'], icon: 'azure stream analytics', type: 'local' },
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
  
  // HARD-CODED POSTGIS FIX - HIGHEST PRIORITY
  if (techName.toLowerCase() === 'postgis') {
    return {
      type: 'local',
      src: '/assets/img/Icons/postgis.png',
      alt: 'PostGIS'
    }
  }
  
  // HARD-CODED CHART.JS FIX
  if (techName.toLowerCase() === 'chart.js') {
    return {
      type: 'local',
      src: '/assets/img/Icons/chartsjs.png',
      alt: 'Chart.js'
    }
  }
  
  // HARD-CODED SOUND & AUDIO MANAGEMENT FIX
  const lowerName = techName.toLowerCase()
  if (lowerName.includes('sound') && lowerName.includes('audio') || 
      lowerName.includes('audio management') || 
      lowerName === 'sound & audio management' ||
      lowerName === 'sound and audio management') {
    return {
      type: 'local',
      src: '/assets/img/Icons/speech.png',
      alt: 'Sound & Audio Management'
    }
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
  
  // HARD-CODED PUSH NOTIFICATIONS FIX - Ensure it resolves correctly
  // Handles: "Push Notifications", "Push Notification", "Push Notifications (APNs)", etc.
  if (normalized === 'push notifications' || normalized === 'push notification' || 
      (normalized.includes('push notification') && normalized.includes('apns'))) {
    return {
      type: 'local',
      src: '/assets/img/Icons/push notification.png',
      alt: techName
    }
  }
  
  // 3. Check exact match in ICON_MAP (case insensitive)
  const exactMatch = ICON_MAP[normalized]
  if (exactMatch) {
    // If it's a local icon type, use the icon property as the local file path
    if (exactMatch.type === 'local') {
      // Check for explicit local property first (if available)
      const localIcon = exactMatch.local || exactMatch.icon
      if (localIcon) {
        return {
          type: 'local',
          src: `/assets/img/Icons/${localIcon}`,
          alt: techName
        }
      }
    }
    // If it has a devicon, use it (but check for local fallback first)
    if (exactMatch.type === 'devicon') {
      // If local fallback exists, prefer it over devicon CDN
      if (exactMatch.local) {
        return {
          type: 'local',
          src: `/assets/img/Icons/${exactMatch.local}`,
          alt: techName
        }
      }
      return {
        type: 'devicon',
        src: exactMatch.icon,
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
