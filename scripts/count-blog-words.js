const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/config/blog/articles');
const files = [
  'developers-integrating-ai-daily-workflows.js',
  'where-ai-fails-real-world-software-development.js',
  'trade-offs-ai-code-generation.js',
  'ai-ides-what-they-get-right-wrong.js',
  'what-developers-want-from-ai-assistants.js',
  'why-ai-productivity-gains-plateau.js',
  'cursor-vs-claude-code-vs-copilot-ai-ide.js',
  'ai-changing-code-review-testing.js',
  'current-state-ai-coding-tools-2026.js',
  'impact-ai-tools-code-quality-maintainability.js'
];

function countWords(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const start = raw.indexOf('content: `') + 9;
  let end = raw.length;
  let idx = start;
  while (idx < raw.length) {
    const next = raw.indexOf('`,', idx);
    if (next === -1) break;
    if (raw[next - 1] !== '\\') { end = next; break; }
    idx = next + 1;
  }
  const content = raw.slice(start, end);
  const words = content.split(/\s+/).filter(Boolean).length;
  return words;
}

let total = 0;
files.forEach((f) => {
  const p = path.join(dir, f);
  const name = f.replace('.js', '');
  if (!fs.existsSync(p)) {
    console.log(name + ': N/A');
    return;
  }
  const w = countWords(p);
  total += w;
  console.log(name + ': ' + w.toLocaleString());
});
console.log('---');
console.log('Total: ' + total.toLocaleString());
