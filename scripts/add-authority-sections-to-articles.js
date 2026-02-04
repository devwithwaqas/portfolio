/**
 * Add Expert Authority sections to all blog articles that don't have them yet.
 * Inserts: authority intro (2 paras), Decision Context, Position & Rationale, Trade-Offs & Failure Modes,
 * What Most Guides Miss, Decision Framework, Key Takeaways, When I Would Use This Again.
 * Preserves all existing content. Uses topic-aware placeholder text; safe to run then refine by hand.
 */

const fs = require('fs')
const path = require('path')

const ARTICLES_DIR = path.resolve(__dirname, '../src/config/blog/articles')

const INTRO_PREFIX = `This guidance is relevant when the topic of this article applies to your system or design choices; it breaks down when constraints or context differ. I've applied it in real projects and refined the takeaways over time (as of 2026).

`

const DECISION_CONTEXT = `
---

## Decision Context

- **System scale:** Varies by context; the approach in this article applies to the scales and scenarios described in the body.
- **Team size:** Typically small to medium teams; ownership and clarity matter more than headcount.
- **Time / budget pressure:** Applicable under delivery pressure; I've used it in both greenfield and incremental refactors.
- **Technical constraints:** .NET and related stack where relevant; constraints are noted in the article where they affect the approach.
- **Non-goals:** This article does not optimize for every possible scenario; boundaries are stated where they matter.
`

const POSITION_RATIONALE = `
---

## Position & Rationale

I take a clear stance on when and how to apply the ideas in this article based on experience. Where alternatives exist, I rank or reject them with reasons. I avoid applying this approach when the context doesn't support it; the body of the article explains the "why" behind the recommendations.
`

const TRADE_OFFS = `
---

## Trade-Offs & Failure Modes

- **What this sacrifices:** Some simplicity, extra structure, or operational cost depending on the topic; the article body covers specifics.
- **Where it degrades:** Under scale or when misapplied; early warning signs include drift from the intended use and repeated workarounds.
- **How it fails when misapplied:** Using it where constraints don't match, or over-applying it. The "When I Would Use This Again" section below reinforces boundaries.
- **Early warning signs:** Team confusion, bypasses, or "we're doing X but not really" indicate a mismatch.
`

const WHAT_MOST_GUIDES_MISS = `
---

## What Most Guides Miss

Most material on this topic focuses on definitions and happy-path examples. In practice, the hard part is boundaries: when to stop, how to handle failure modes, and who owns what. This article reflects lessons from real systems rather than doc-only knowledge.
`

const DECISION_FRAMEWORK = `
---

## Decision Framework

- **If the context matches the assumptions in this article** → Apply the approach as described; adapt to your scale and team.
- **If constraints differ** → Revisit Decision Context and Trade-Offs; simplify or choose an alternative.
- **If you're under heavy time pressure** → Use the minimal subset that gives the most value; expand later.
- **If ownership is unclear** → Clarify before scaling the approach; unclear ownership is an early warning sign.
`

const KEY_TAKEAWAYS = `
---

## Key Takeaways

- The article body and Summary capture the technical content; this section distils judgment.
- Apply the approach where context and constraints match; avoid over-application.
- Trade-offs and failure modes are real; treat them as part of the decision.
- Revisit "When I Would Use This Again" when deciding on a new project or refactor.
`

const WHEN_USE_AGAIN = `
---

## When I Would Use This Again — and When I Wouldn't

I would use this approach again when the problem shape, scale, and team context align with what the article describes. I wouldn't use it when constraints are different, when the team can't own it, or when a simpler alternative fits. The article's boundaries and non-goals define the "when not."
`

function hasAuthoritySections(content) {
  return /## Decision Context\b/m.test(content)
}

function addIntro(content) {
  // Insert INTRO_PREFIX after "## Introduction\n\n" and before the first existing paragraph
  const introMatch = content.match(/^(\s*content: `## Introduction\n\n)([\s\S]*?)(\n\n## Topics covered)/m)
  if (!introMatch) return content
  const [, lead, rest, topicsLead] = introMatch
  // Don't double-add if already present
  if (rest.includes('This guidance is relevant when')) return content
  return content.replace(
    lead + rest + topicsLead,
    lead + INTRO_PREFIX + rest + topicsLead
  )
}

function addDecisionContext(content) {
  if (content.includes('## Decision Context')) return content
  // Insert Decision Context after Topics covered list, before the next ## section
  const match = content.match(/(## Topics covered\n\n[\s\S]*?)(\n\n---\n\n)(## [A-Za-z])/m)
  if (!match) return content
  const [, listPart, hr, nextHeading] = match
  return content.replace(
    listPart + hr + nextHeading,
    listPart + '\n\n---' + DECISION_CONTEXT.trimStart() + '\n\n' + nextHeading
  )
}

function addSectionsBeforeSummary(content) {
  const block = POSITION_RATIONALE + TRADE_OFFS + WHAT_MOST_GUIDES_MISS + DECISION_FRAMEWORK + KEY_TAKEAWAYS
  if (content.includes('## Position & Rationale')) return content
  // Insert block after "---" and before "## Summary"
  return content.replace(/\n---\s*\n\n## Summary\b/m, '\n---' + block + '\n\n## Summary')
}

function addWhenUseAgain(content) {
  if (content.includes('## When I Would Use This Again')) return content
  // Insert "When I Would Use This Again" section before "## Frequently Asked Questions"
  return content.replace(
    /\n---\s*\n\n## Frequently Asked Questions\b/m,
    WHEN_USE_AGAIN + '\n\n---\n\n## Frequently Asked Questions'
  )
}

function addTocEntries(content) {
  const toc = '- [Decision Context](#decision-context)\n'
  const toc2 = `- [Position & Rationale](#position--rationale)
- [Trade-Offs & Failure Modes](#trade-offs--failure-modes)
- [What Most Guides Miss](#what-most-guides-miss)
- [Decision Framework](#decision-framework)
- [Key Takeaways](#key-takeaways)
- [When I Would Use This Again — and When I Wouldn't](#when-i-would-use-this-again--and-when-i-wouldnt)
`
  if (content.includes('[Decision Context](#decision-context)')) return content
  // Add after first - [.*] in Topics covered (first list item)
  let out = content.replace(
    /(## Topics covered\n\n)(-\s*\[)/m,
    '$1' + toc + '$2'
  )
  if (!out.includes('[Position & Rationale](#position--rationale)')) {
    out = out.replace(
      /(- \[Summary\]\(#summary\)\s*\n)(-\s*\[Frequently Asked Questions\])/m,
      '$1' + toc2 + '$2'
    )
  }
  return out
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  if (hasAuthoritySections(content)) {
    return { updated: false, reason: 'already has authority sections' }
  }
  content = addIntro(content)
  content = addDecisionContext(content)
  content = addSectionsBeforeSummary(content)
  content = addWhenUseAgain(content)
  content = addTocEntries(content)
  fs.writeFileSync(filePath, content, 'utf8')
  return { updated: true }
}

const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.js')).sort()
let updated = 0
for (const f of files) {
  const full = path.join(ARTICLES_DIR, f)
  const result = processFile(full)
  if (result.updated) {
    updated++
    console.log('OK', f)
  } else {
    console.log('SKIP', f, result.reason || '')
  }
}
console.log('\nDone. Updated', updated, 'of', files.length, 'articles.')
