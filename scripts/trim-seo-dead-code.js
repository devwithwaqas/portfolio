/**
 * Apply topic-cluster SEO (5-8 keywords) and remove dead keyword arrays from seo.js.
 * Run once: node scripts/trim-seo-dead-code.js
 */
const fs = require('fs')
const path = require('path')
const seoPath = path.resolve(__dirname, '../src/utils/seo.js')
let content = fs.readFileSync(seoPath, 'utf8')

const FULL_NAME = 'fullName' // from APP_CONFIG

// 1. Add constant after dedupeKeywords (before getSkillExpertDeveloperKeywords)
if (!content.includes('META_KEYWORDS_TOPIC_CLUSTER_MAX')) {
  content = content.replace(
    /(return out\n\}\n\n)(\/\*\*\n \* Skill-based)/,
    '$1/** Max meta keywords per page: topic clusters only (5–8). */\nconst META_KEYWORDS_TOPIC_CLUSTER_MAX = 8\n\n$2'
  )
}

// 2. getHomePageSEO: replace dead block with homeTopicCluster
const homeBlockStart = content.indexOf('  // GLOBAL KEYWORDS - Remote, USA, Europe (HIGHEST PRIORITY)')
const homeBlockEnd = content.indexOf('  // Intentionally long title/description for keyword coverage - Bing/Google truncate in display but still index full content')
if (homeBlockStart !== -1 && homeBlockEnd > homeBlockStart) {
  const replacement = `  // Topic-cluster only (5–8 phrases) for meta keywords.
  const homeTopicCluster = [
    'Senior Software Engineer',
    'Technical Lead',
    '.NET Consultant',
    'Azure Cloud Architect',
    'Microservices',
    'Full Stack Developer',
    'Remote Software Consultant',
    ${FULL_NAME}
  ].filter(Boolean).slice(0, META_KEYWORDS_TOPIC_CLUSTER_MAX)

  // Intentionally long title/description for keyword coverage - Bing/Google truncate in display but still index full content`
  content = content.slice(0, homeBlockStart) + replacement + content.slice(homeBlockEnd)
}
content = content.replace(/\bkeywords: homeKeywords,/, 'keywords: homeTopicCluster,')

// 3. getProjectPageSEO: replace profileKeywords + big merge with projectTopicCluster
const projectMergeStart = content.indexOf('  // Merge project-specific keywords with full profile keywords')
const projectEndMarker = "  )\n\n  return {\n    title: `${enhancedTitle} - "
const projectEndIdx = content.indexOf(projectEndMarker, projectMergeStart)
if (projectMergeStart !== -1 && projectEndIdx !== -1) {
  const replacement = `  // Topic-cluster only (5–8): tech + domain; no full profile keyword list.
  const projectTopicCluster = dedupeKeywords(
    [projectData.title, enhancedTitle],
    techNames,
    technologyKeywords.slice(0, 3),
    'Portfolio',
    'Case study',
    fullName
  ).slice(0, META_KEYWORDS_TOPIC_CLUSTER_MAX)

`
  // Keep "  return { ... }" from original (skip "  )\n\n  " = 8 chars)
  content = content.slice(0, projectMergeStart) + replacement + '  ' + content.slice(projectEndIdx + 8)
}
content = content.replace(/\bkeywords: projectKeywords,/, 'keywords: projectTopicCluster,')

// 4. getServicePageSEO: cap keywords
content = content.replace(/\bkeywords: serviceKeywords,\n    type: 'website',/, "keywords: serviceKeywords.slice(0, META_KEYWORDS_TOPIC_CLUSTER_MAX),\n    type: 'website',")

// 5. getBlogIndexSEO: cap keywords
content = content.replace(
  /(getBlogIndexSEO\(\) \{\s+const fullName = APP_CONFIG\.fullName\s+return \{\s+title:.*?keywords: )(\['blog', 'technical blog', 'Azure', '\.NET', 'microservices', 'enterprise architecture', fullName, 'Senior Software Engineer'\])(,)/s,
  '$1$2.slice(0, META_KEYWORDS_TOPIC_CLUSTER_MAX)$3'
)

// 6. getBlogArticleSEO: topic cluster only; remove BLOG_TOPIC import
content = content.replace(
  /import \{ BLOG_TOPIC_TO_KEY, getSemanticTermsForBlogTopic \} from '\.\.\/config\/semanticKeywords\.js'\n\n/,
  ''
)
const blogArticleStart = content.indexOf('/**\n * Get SEO data for a blog article page.')
const blogArticleEnd = content.indexOf('}\n\nexport default {', content.indexOf('getBlogArticleSEO(article)'))
if (blogArticleStart !== -1 && blogArticleEnd !== -1) {
  const oldBlogArticle = content.slice(blogArticleStart, blogArticleEnd)
  if (oldBlogArticle.includes('articleKeywords') && oldBlogArticle.includes('getSemanticTermsForBlogTopic')) {
    const newBlogArticle = `/**
 * Get SEO data for a blog article page.
 * Topic-cluster only (5–8 phrases): no full article.keywords; use article.topics or derive from title/topic/relatedServices.
 */
export function getBlogArticleSEO(article) {
  const fullName = APP_CONFIG.fullName
  const topicCluster = (article.topics && article.topics.length)
    ? article.topics.slice(0, META_KEYWORDS_TOPIC_CLUSTER_MAX)
    : dedupeKeywords(
        [article.title].filter(Boolean),
        [article.topic].filter(Boolean),
        article.relatedServices || [],
        ['blog', fullName]
      ).slice(0, META_KEYWORDS_TOPIC_CLUSTER_MAX)
  return {
    title: \`\${article.title} | \${fullName}\`,
    description: article.excerpt || article.title,
    keywords: topicCluster,
    type: 'article',
    image: article.image || \`\${SITE_URL}assets/img/waqas-profile-hoodie.jpg\`
  }
}

`
    content = content.slice(0, blogArticleStart) + newBlogArticle + content.slice(blogArticleEnd)
  }
}

// 7. getProjectPageSEO: remove dead block (misspellingKeywords through projectAchievementKeywords) before "  // Topic-cluster only"
const deadStart = content.indexOf("  const misspellingKeywords = ['Waqas Ahmed', 'Waqas Ahmand']")
const deadEnd = content.indexOf('  // Topic-cluster only (5–8): tech + domain; no full profile keyword list.', deadStart)
if (deadStart !== -1 && deadEnd > deadStart) {
  content = content.slice(0, deadStart) + '  \n  ' + content.slice(deadEnd)
}

fs.writeFileSync(seoPath, content, 'utf8')
console.log('[OK] seo.js updated: topic-cluster logic applied, dead code removed')
const size = (fs.statSync(seoPath).size / 1024).toFixed(1)
console.log('    Size:', size, 'KB')
