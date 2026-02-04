const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../src/config/blog/articles');
const files = [
  'current-state-ai-coding-tools-2026.js',
  'ai-changing-code-review-testing.js',
  'impact-ai-tools-code-quality-maintainability.js',
  'cursor-vs-claude-code-vs-copilot-ai-ide.js',
  'developers-integrating-ai-daily-workflows.js',
  'where-ai-fails-real-world-software-development.js',
  'trade-offs-ai-code-generation.js',
  'why-ai-productivity-gains-plateau.js',
  'ai-ides-what-they-get-right-wrong.js',
  'what-developers-want-from-ai-assistants.js'
];
files.forEach(f => {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8');
  const start = raw.indexOf('content: `') + 10;
  const end = raw.indexOf('`,', start);
  const content = raw.slice(start, end);
  const words = content.replace(/\*\*[^*]*\*\*/g, ' ').replace(/\[([^\]]+)\]\(\/[^)]+\)/g, '$1').split(/\s+/).filter(Boolean).length;
  console.log(f + ': ' + words);
});
