/**
 * Adds Decision Context (TOC + section) and optional authority block to AI articles
 * that don't yet have ## Decision Context. Factual, constraint-based tone.
 */
const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '../src/config/blog/articles');

const DECISION_CONTEXT_TRADE_OFFS = `
## Decision Context

- **When this applies:** Teams or developers who are using (or considering) AI for code generation and want a clear view of what they gain and what they give up.
- **When it doesn't:** Teams that have already decided never to use AI, or that only want tool comparisons. This article is about trade-offs, not tools.
- **Scale:** Any team size; the trade-offs (speed vs understanding, debt, learning) hold regardless.
- **Constraints:** Mitigation (review, ownership) requires capacity; without it, the costs of AI use are higher.
- **Non-goals:** This article doesn't recommend for or against AI; it states the trade-offs and conditions under which use is lower- or higher-risk.
`;

function addDecisionContextToToc(content, firstTocLine) {
  if (content.includes('- [Decision Context](#decision-context)')) return content;
  return content.replace(firstTocLine, '- [Decision Context](#decision-context)\n' + firstTocLine);
}

function addDecisionContextSection(content, firstSectionHeading, block) {
  if (content.includes('## Decision Context')) return content;
  return content.replace(
    firstSectionHeading,
    block.trimStart() + '\n\n---\n\n' + firstSectionHeading
  );
}

const openQ = '\u201C', closeQ = '\u201D';

// where-ai-fails
const whereAiFailsPath = path.join(ARTICLES_DIR, 'where-ai-fails-real-world-software-development.js');
let s = fs.readFileSync(whereAiFailsPath, 'utf8');
const whereFirstToc = '- [Why ' + openQ + 'where AI fails' + closeQ + ' matters](#why-where-ai-fails-matters)';
const whereFirstHeading = '## Why ' + openQ + 'where AI fails' + closeQ + ' matters';
const whereBlock = `
## Decision Context

- **When this applies:** Teams or developers using AI coding tools who want a clear picture of where current tools tend to fail so they can set boundaries and review accordingly.
- **When it doesn't:** Teams that don't use AI or that only want tool recommendations. This article is about failure modes, not tools.
- **Scale:** Any team size; the failure modes (architecture, edge cases, security, consistency, domain) are structural.
- **Constraints:** Mitigation requires review, tests, and explicit boundaries; without them, reliance on AI in weak areas is riskier.
- **Non-goals:** This article doesn't argue that AI is useless; it states where it tends to fail and how to mitigate.
`;
if (!s.includes('## Decision Context')) {
  s = addDecisionContextToToc(s, whereFirstToc);
  s = addDecisionContextSection(s, whereFirstHeading, whereBlock);
  fs.writeFileSync(whereAiFailsPath, s);
  console.log('Updated where-ai-fails-real-world-software-development.js');
}

// what-developers-want
const whatPath = path.join(ARTICLES_DIR, 'what-developers-want-from-ai-assistants.js');
s = fs.readFileSync(whatPath, 'utf8');
const whatFirstToc = '- [Why ' + openQ + 'what developers want' + closeQ + ' matters](#why-what-developers-want-matters)';
const whatFirstHeading = '## Why ' + openQ + 'what developers want' + closeQ + ' matters';
const whatBlock = `
## Decision Context

- **When this applies:** Teams or product owners evaluating or improving AI coding tools and team norms, and who want a synthesis of what developers report they need.
- **When it doesn't:** Readers who want a single study or tool comparison. This article is a synthesis of reported priorities (context, control, consistency, clarity).
- **Scale:** Any team size; the priorities apply across contexts.
- **Constraints:** Aligning tools and norms with these priorities requires product and process change, not just prompts.
- **Non-goals:** This article isn't a survey; it summarises recurring themes so teams can decide what to improve first.
`;
if (!s.includes('## Decision Context')) {
  s = addDecisionContextToToc(s, whatFirstToc);
  s = addDecisionContextSection(s, whatFirstHeading, whatBlock);
  fs.writeFileSync(whatPath, s);
  console.log('Updated what-developers-want-from-ai-assistants.js');
}

// developers-integrating-ai-daily-workflows.js
const devPath = path.join(ARTICLES_DIR, 'developers-integrating-ai-daily-workflows.js');
s = fs.readFileSync(devPath, 'utf8');
const devFirstToc = '- [What ' + openQ + 'integrating AI' + closeQ + ' means in practice](#what-integrating-ai-means-in-practice)';
const devFirstHeading = '## What ' + openQ + 'integrating AI' + closeQ + ' means in practice';
const devBlock = `
## Decision Context

- **When this applies:** Developers or teams integrating AI into daily workflows (completion, chat, refactors, tests, review) who want practical patterns and norms.
- **When it doesn't:** Readers who only want a tool comparison or who don't use AI yet. This article is about where and how to use AI in the loop and how to review.
- **Scale:** Any team size; the workflows (completion, chat, etc.) and the need for review and norms hold regardless.
- **Constraints:** Success depends on review and norms; without them, integration can increase debt or plateau.
- **Non-goals:** This article doesn't recommend a single tool; it describes workflows and conditions for sustainable use.
`;
if (!s.includes('## Decision Context')) {
  s = addDecisionContextToToc(s, devFirstToc);
  s = addDecisionContextSection(s, devFirstHeading, devBlock);
  fs.writeFileSync(devPath, s);
  console.log('Updated developers-integrating-ai-daily-workflows.js');
}

// ai-ides-what-they-get-right-wrong.js
const aiIdesPath = path.join(ARTICLES_DIR, 'ai-ides-what-they-get-right-wrong.js');
s = fs.readFileSync(aiIdesPath, 'utf8');
const aiIdesFirstToc = '- [Why ' + openQ + 'right vs wrong' + closeQ + ' matters](#why-right-vs-wrong-matters)';
const aiIdesFirstHeading = '## Why ' + openQ + 'right vs wrong' + closeQ + ' matters';
const aiIdesBlock = `
## Decision Context

- **When this applies:** Developers or leads using AI IDEs who want a clear list of where they're strong and where they're weak so they can use or verify accordingly.
- **When it doesn't:** Readers who want a tool recommendation only. This article is about what AI IDEs get right vs wrong (completion, context, architecture, security, etc.), not which IDE to buy.
- **Scale:** Any team size; the "right vs wrong" split holds regardless.
- **Constraints:** Use where they're strong; review and own where they're weak. The article states that.
- **Non-goals:** This article doesn't argue for or against AI IDEs; it states what they get right and wrong so adoption can be tuned.
`;
if (!s.includes('## Decision Context')) {
  s = addDecisionContextToToc(s, aiIdesFirstToc);
  s = addDecisionContextSection(s, aiIdesFirstHeading, aiIdesBlock);
}
// Authority block before FAQ
const authorityBlock = `
## Position & Rationale

The article lists what AI IDEs get right (completion, context, chat, speed) and what they get wrong (architecture, consistency, security, edge cases, over-reliance). The stance is factual: use them where they're strong; review and own where they're weak. It doesn't claim they're good or bad overall—it states the split so teams can adopt or tune without over-trusting or under-using.

## Trade-Offs & Failure Modes

Using AI IDEs for everything without review increases the chance of wrong architecture, security issues, and drift. Using them only for trivial tasks underuses them. Failure modes: trusting suggestions for architecture or security; accepting completion without reading; assuming more AI means better code.

## What Most Guides Miss

Many guides focus on features and skip "where they fail." The article's right-vs-wrong table and checklist (before trusting a suggestion) are the operational link. Another gap: consistency (style, patterns across repo) is often missed by tools; human review remains necessary there.

## Decision Framework

- **If the task is boilerplate, patterns, or first draft** → Use completion or chat; still review the result.
- **If the task is architecture, security, or cross-file consistency** → Don't trust AI alone; humans own and verify.
- **For every suggestion** → Run the checklist (layer, API, security, consistency) before accepting.
- **Set norms** for when to use vs when to verify; document so the team aligns.

## Key Takeaways

- AI IDEs get right: completion, context, chat, speed. Get wrong: architecture, consistency, security, edge cases, over-reliance.
- Use where they're strong; review and own where they're weak. Set norms.

## When I Would Use This Again — and When I Wouldn't

Use this framing when adopting or tuning AI IDE use and when you need a clear "use vs verify" list. Don't use it to argue that AI IDEs are useless or that they're always right; the point is to match use to strength and weakness.

---
`;
if (!s.includes('## Position & Rationale')) {
  const faqAnchor = '\n## Frequently Asked Questions\n\n### What do AI IDEs get right?';
  s = s.replace(faqAnchor, authorityBlock + '\n## Frequently Asked Questions\n\n### What do AI IDEs get right?');
}
fs.writeFileSync(aiIdesPath, s);
console.log('Updated ai-ides-what-they-get-right-wrong.js');
