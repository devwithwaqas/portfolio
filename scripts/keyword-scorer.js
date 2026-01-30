/**
 * Keyword Relevance Scorer
 * Scores keywords by relevance to portfolio for SEO tracking
 */

/**
 * Score keyword by relevance (higher = more relevant)
 */
export function scoreKeyword(keyword) {
  let score = 0
  const kw = keyword.toLowerCase()
  
  // Name-based keywords (highest priority)
  if (kw.includes('waqas ahmad')) {
    score += 100
    
    // Full name with role
    if (kw.includes('consultant') || kw.includes('engineer') || kw.includes('developer') || kw.includes('lead')) {
      score += 50
    }
    
    // Full name with company
    if (kw.includes('airasia') || kw.includes('microsoft') || kw.includes('bat') || kw.includes('chubb')) {
      score += 40
    }
    
    // Full name with location
    if (kw.includes('malaysia') || kw.includes('selangor')) {
      score += 30
    }
    
    // Full name with technology
    if (kw.includes('.net') || kw.includes('azure') || kw.includes('microservices')) {
      score += 35
    }
    
    // Full name with social media
    if (kw.includes('linkedin') || kw.includes('github')) {
      score += 25
    }
  }
  
  // Single name "Waqas" (medium priority)
  if (kw === 'waqas' || kw.startsWith('waqas ')) {
    score += 60
    
    if (kw.includes('consultant') || kw.includes('engineer') || kw.includes('developer')) {
      score += 30
    }
  }
  
  // Consultant keywords (high priority)
  if (kw.includes('consultant')) {
    score += 40
    if (kw.includes('software') || kw.includes('it') || kw.includes('technical')) {
      score += 20
    }
  }
  
  // Role keywords
  if (kw.includes('senior software engineer') || kw.includes('technical lead')) {
    score += 35
  }
  
  // Technology keywords with name
  if ((kw.includes('.net') || kw.includes('azure')) && kw.includes('waqas')) {
    score += 30
  }
  
  // Education keywords
  if (kw.includes('uet lahore') && kw.includes('waqas')) {
    score += 25
  }
  
  // Discovery queries (high value)
  if (kw.includes('who is') || kw.includes('find ') || kw.includes('hire ') || kw.includes('contact ')) {
    score += 20
  }
  
  // Company + name (high value)
  if ((kw.includes('airasia') || kw.includes('microsoft') || kw.includes('bat')) && kw.includes('waqas')) {
    score += 45
  }
  
  // Social media (medium value)
  if ((kw.includes('linkedin') || kw.includes('github')) && kw.includes('waqas')) {
    score += 30
  }
  
  // Penalize generic keywords without name
  if (!kw.includes('waqas') && !kw.includes('ahmad')) {
    score -= 50
  }
  
  // Penalize very generic terms
  if (kw === 'ci/cd' || kw === 'vue.js' || kw === 'angular' || kw.length < 5) {
    score -= 100
  }
  
  return score
}

/**
 * Get top N most relevant keywords
 */
export function getTopKeywords(keywords, count = 10) {
  // Score all keywords
  const scored = keywords.map(keyword => ({
    keyword,
    score: scoreKeyword(keyword)
  }))
  
  // Sort by score (highest first)
  scored.sort((a, b) => b.score - a.score)
  
  // Return top N
  return scored.slice(0, count).map(item => item.keyword)
}

/**
 * Get keyword categories for tracking
 */
export function getKeywordCategories() {
  return {
    nameBased: [
      'Waqas Ahmad',
      'Waqas Ahmad consultant',
      'Waqas Ahmad software engineer',
      'Waqas Ahmad technical lead'
    ],
    companyBased: [
      'Waqas Ahmad AirAsia',
      'Waqas Ahmad Microsoft',
      'Waqas Ahmad BAT',
      'AirAsia developer Waqas Ahmad'
    ],
    technologyBased: [
      'Waqas Ahmad .NET developer',
      'Waqas Ahmad Azure architect',
      '.NET developer Waqas Ahmad'
    ],
    locationBased: [
      'Waqas Ahmad Malaysia',
      'Waqas Ahmad Selangor',
      'Malaysia software engineer Waqas Ahmad'
    ],
    socialMedia: [
      'Waqas Ahmad LinkedIn',
      'Waqas Ahmad GitHub',
      'linkedin.com/in/waqas1430',
      'github.com/devwithwaqas'
    ],
    discovery: [
      'who is Waqas Ahmad',
      'find Waqas Ahmad',
      'hire Waqas Ahmad',
      'contact Waqas Ahmad'
    ],
    education: [
      'UET Lahore Waqas Ahmad',
      'Waqas Ahmad UET Lahore',
      'Computer System Engineering Waqas Ahmad'
    ]
  }
}

/**
 * Get best keywords from each category (balanced selection)
 */
export function getBestKeywordsBalanced(keywords, count = 10) {
  const categories = getKeywordCategories()
  const selected = []
  const seen = new Set()
  
  // Get keywords from each category
  const allBest = [
    ...categories.nameBased,
    ...categories.companyBased,
    ...categories.technologyBased,
    ...categories.locationBased,
    ...categories.socialMedia,
    ...categories.discovery,
    ...categories.education
  ]
  
  // Filter to only keywords that exist in our list
  const available = allBest.filter(kw => keywords.includes(kw))
  
  // Add from each category first (balanced)
  const keywordsPerCategory = Math.ceil(count / Object.keys(categories).length)
  
  for (const category of Object.values(categories)) {
    for (const kw of category) {
      if (keywords.includes(kw) && !seen.has(kw) && selected.length < count) {
        selected.push(kw)
        seen.add(kw)
      }
    }
  }
  
  // If we need more, use scoring
  if (selected.length < count) {
    const remaining = keywords.filter(kw => !seen.has(kw))
    const scored = remaining.map(keyword => ({
      keyword,
      score: scoreKeyword(keyword)
    }))
    scored.sort((a, b) => b.score - a.score)
    
    for (const item of scored) {
      if (selected.length >= count) break
      selected.push(item.keyword)
    }
  }
  
  return selected.slice(0, count)
}
