<template>
  <div class="markdown-content article-body" @click="onCopyClick">
    <template v-for="(seg, i) in segments" :key="i">
      <div v-if="seg.type === 'markdown'" class="markdown-segment" v-html="seg.html"></div>
      <template v-else-if="seg.type === 'mermaid-with-heading'">
        <div class="markdown-segment mermaid-section" v-html="seg.headingHtml"></div>
        <div class="mermaid-segment-wrapper">
          <MermaidBlock :source="seg.content" />
        </div>
      </template>
      <template v-else-if="seg.type === 'plantuml-with-heading'">
        <div class="markdown-segment mermaid-section" v-html="seg.headingHtml"></div>
        <div class="mermaid-segment-wrapper">
          <KrokiBlock :source="seg.content" diagram-type="plantuml" />
        </div>
      </template>
      <template v-else-if="seg.type === 'plantuml'">
        <div class="mermaid-segment-wrapper">
          <KrokiBlock :source="seg.content" diagram-type="plantuml" />
        </div>
      </template>
      <div v-else class="mermaid-segment-wrapper">
        <MermaidBlock :source="seg.content" />
      </div>
    </template>
  </div>
</template>

<script>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItMultimdTable from 'markdown-it-multimd-table'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs.min.css'
import MermaidBlock from './MermaidBlock.vue'
import KrokiBlock from './KrokiBlock.vue'

const MERMAID_FENCE = 'mermaid'
const PLANTUML_FENCE = 'plantuml'
const OPEN_FENCE = '```mermaid'
const CLOSE_FENCE = '```'
// In case content has literal backslash-backtick (e.g. double-escaped)
const OPEN_FENCE_ESC = '\\`\\`\\`mermaid'
const CLOSE_FENCE_ESC = '\\`\\`\\`'

function slugify(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (_) {}
    }
    return ''
  }
})

md.renderer.rules.fence = function (tokens, idx, options, env, self) {
  const token = tokens[idx]
  const lang = (token.info && token.info.trim()) || ''
  const code = token.content
  let highlighted
  if (lang && hljs.getLanguage(lang)) {
    try {
      highlighted = hljs.highlight(code, { language: lang }).value
    } catch (_) {
      highlighted = md.utils.escapeHtml(code)
    }
  } else {
    highlighted = md.utils.escapeHtml(code)
  }
  const langClass = lang ? ` language-${lang}` : ''
  const id = `code-${Math.random().toString(36).slice(2, 11)}`
  return `<div class="code-block-wrapper"><button type="button" class="code-copy-btn" data-code-id="${id}" aria-label="Copy code" title="Copy"><i class="bi bi-clipboard"></i> Copy</button><pre class="hljs${langClass}"><code id="${id}">${highlighted}</code></pre></div>`
}
md.use(markdownItAnchor, { slugify, level: [2, 3, 4], permalink: false })
md.use(markdownItMultimdTable, { multiline: false, rowspan: false, headerless: false })

// Add content-table class and wrap tables in scroll container so columns keep min-width
const defaultTableOpen = md.renderer.rules.table_open || ((tokens, i, options, env, self) => self.renderToken(tokens, i, options))
const defaultTableClose = md.renderer.rules.table_close || (() => '</table>')
md.renderer.rules.table_open = function (tokens, i, options, env, self) {
  const token = tokens[i]
  token.attrSet('class', 'content-table')
  return '<div class="markdown-table-wrapper">' + defaultTableOpen(tokens, i, options, env, self)
}
md.renderer.rules.table_close = function (tokens, i, options, env, self) {
  return defaultTableClose(tokens, i, options, env, self) + '</div>'
}

// Lazy load images in markdown output
const defaultImageRender = md.renderer.rules.image || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}
md.renderer.rules.image = function (tokens, idx, options, env, self) {
  const token = tokens[idx]
  const aIndex = token.attrIndex('loading')
  if (aIndex < 0) {
    token.attrSet('loading', 'lazy')
  }
  return defaultImageRender(tokens, idx, options, env, self)
}

/**
 * If text ends with a heading line (### or ## or #) and optional blank lines,
 * return { rest: textWithoutHeading, heading: "### Title\n\n" } so the heading
 * can be rendered above the mermaid block (avoids "empty" Class structure section).
 */
function stripTrailingLoneHeading(text) {
  const m = text.match(/^(.*?)(\n#{1,6}\s+[^\n]+)\s*$/)
  if (!m) return { rest: text, heading: '' }
  const rest = m[1].trimEnd()
  const headingBlock = m[2].replace(/\s*$/, '\n\n')
  return { rest, heading: headingBlock }
}

/**
 * Fallback: split by literal "```mermaid" / "```" (or escaped form \`\`\`mermaid) when regex doesn't match.
 */
function parseContentSegmentsFallback(raw, useEscapedFence = false) {
  const openFence = useEscapedFence ? OPEN_FENCE_ESC : OPEN_FENCE
  const closeFence = useEscapedFence ? CLOSE_FENCE_ESC : CLOSE_FENCE
  const segments = []
  let pos = 0
  for (;;) {
    const openIdx = raw.indexOf(openFence, pos)
    if (openIdx === -1) break
    const before = raw.slice(pos, openIdx)
    const { rest, heading } = stripTrailingLoneHeading(before)
    if (rest.trim()) {
      segments.push({ type: 'markdown', html: md.render(rest.trim()) })
    }
    const afterOpen = raw.slice(openIdx + openFence.length)
    const closeIdx = afterOpen.indexOf(closeFence)
    if (closeIdx === -1) {
      segments.push({ type: 'markdown', html: md.render(raw.slice(openIdx)) })
      return segments
    }
    let code = afterOpen.slice(0, closeIdx).trim()
    if (useEscapedFence) code = code.replace(/\\`/g, '`')
    if (heading) {
      segments.push({
        type: 'mermaid-with-heading',
        headingHtml: md.render(heading),
        content: code
      })
    } else {
      segments.push({ type: 'mermaid', content: code })
    }
    pos = openIdx + openFence.length + closeIdx + closeFence.length
  }
  const after = raw.slice(pos)
  if (after.trim()) {
    segments.push({ type: 'markdown', html: md.render(after.trim()) })
  }
  return segments
}

/**
 * Split markdown content into segments: markdown (rendered to HTML) and mermaid (raw source).
 * Matches ```mermaid ... ``` (or ``` mermaid with optional space) and passes everything else through markdown.
 * When "before" ends with only a heading (e.g. "### Class structure"), that heading is
 * attached to the mermaid segment so the section shows heading + diagram together (never empty).
 * If regex finds no mermaid blocks but content contains "```mermaid" and "classDiagram", uses fallback split.
 */
function parseContentSegments(raw) {
  if (!raw || typeof raw !== 'string') return []
  // Normalize line endings so regex matches on all platforms
  raw = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const segments = []
  // Match fenced code: opening fence (allow optional space after backticks), lang, newline, code, closing fence
  const regex = /^```\s*(\w+)\s*\n([\s\S]*?)```\s*$/gm
  let lastIndex = 0
  let match
  const tempParts = []
  while ((match = regex.exec(raw)) !== null) {
    const fullMatch = match[0]
    const lang = (match[1] || '').toLowerCase()
    const code = match[2] || ''
    const start = match.index
    let before = raw.slice(lastIndex, start)
    let headingForDiagram = ''
    if (lang === MERMAID_FENCE || lang === PLANTUML_FENCE) {
      const { rest, heading } = stripTrailingLoneHeading(before)
      before = rest
      headingForDiagram = heading
    }
    if (before.trim()) {
      tempParts.push({ type: 'markdown', content: before })
    }
    if (lang === MERMAID_FENCE) {
      if (tempParts.length) {
        const combined = tempParts.map(p => p.content).join('\n\n')
        segments.push({ type: 'markdown', html: md.render(combined) })
        tempParts.length = 0
      }
      if (headingForDiagram) {
        segments.push({
          type: 'mermaid-with-heading',
          headingHtml: md.render(headingForDiagram),
          content: code.trim()
        })
      } else {
        segments.push({ type: 'mermaid', content: code.trim() })
      }
    } else if (lang === PLANTUML_FENCE) {
      if (tempParts.length) {
        const combined = tempParts.map(p => p.content).join('\n\n')
        segments.push({ type: 'markdown', html: md.render(combined) })
        tempParts.length = 0
      }
      if (headingForDiagram) {
        segments.push({
          type: 'plantuml-with-heading',
          headingHtml: md.render(headingForDiagram),
          content: code.trim()
        })
      } else {
        segments.push({ type: 'plantuml', content: code.trim() })
      }
    } else {
      tempParts.push({ type: 'markdown', content: fullMatch })
    }
    lastIndex = regex.lastIndex
  }
  const after = raw.slice(lastIndex)
  if (after.trim() || tempParts.length) {
    tempParts.push({ type: 'markdown', content: after })
    const combined = tempParts.map(p => p.content).join('\n\n')
    segments.push({ type: 'markdown', html: md.render(combined) })
  }
  if (segments.length === 0 && raw.trim()) {
    segments.push({ type: 'markdown', html: md.render(raw) })
  }
  // If no mermaid segment was found but content clearly has mermaid blocks, use fallback
  const hasMermaid = segments.some(s => s.type === 'mermaid' || s.type === 'mermaid-with-heading')
  if (!hasMermaid && raw.includes('classDiagram')) {
    if (raw.includes(OPEN_FENCE)) return parseContentSegmentsFallback(raw, false)
    if (raw.includes(OPEN_FENCE_ESC)) return parseContentSegmentsFallback(raw, true)
    const fallback = parseContentSegmentsRegexFallback(raw)
    if (fallback.length > 0 && fallback.some(s => s.type === 'mermaid' || s.type === 'mermaid-with-heading')) return fallback
  }
  // If no plantuml segment but content has @startuml, try fallback (e.g. escaped backticks)
  const hasPlantuml = segments.some(s => s.type === 'plantuml' || s.type === 'plantuml-with-heading')
  if (!hasPlantuml && raw.includes('@startuml')) {
    const fallbackPuml = parseContentSegmentsPlantumlFallback(raw)
    if (fallbackPuml.length > 0) return fallbackPuml
  }
  return segments
}

/**
 * Regex-based fallback: find mermaid blocks with flexible fence (backtick or backslash-backtick).
 */
function parseContentSegmentsRegexFallback(raw) {
  const segments = []
  // Match opening: ```mermaid or \`\`\`mermaid (optional newline), then code until closing ``` or \`\`\`
  const openRe = /(```|\\`\\`\\`)mermaid\s*\n/g
  let lastEnd = 0
  let openMatch
  while ((openMatch = openRe.exec(raw)) !== null) {
    const openFence = openMatch[1]
    const closeFence = openFence === '```' ? '```' : '\\`\\`\\`'
    const afterOpen = raw.slice(openRe.lastIndex)
    const closeIdx = afterOpen.indexOf(closeFence)
    if (closeIdx === -1) break
    const before = raw.slice(lastEnd, openMatch.index)
    const { rest, heading } = stripTrailingLoneHeading(before)
    if (rest.trim()) segments.push({ type: 'markdown', html: md.render(rest.trim()) })
    let code = afterOpen.slice(0, closeIdx).trim()
    if (openFence !== '```') code = code.replace(/\\`/g, '`')
    if (heading) {
      segments.push({ type: 'mermaid-with-heading', headingHtml: md.render(heading), content: code })
    } else {
      segments.push({ type: 'mermaid', content: code })
    }
    lastEnd = openMatch.index + openMatch[0].length + closeIdx + closeFence.length
    openRe.lastIndex = lastEnd
  }
  if (lastEnd > 0 && lastEnd < raw.length) {
    const after = raw.slice(lastEnd).trim()
    if (after) segments.push({ type: 'markdown', html: md.render(after) })
  }
  return segments
}

/**
 * Fallback: find ```plantuml ... ``` or \`\`\`plantuml ... \`\`\` when main regex missed (e.g. escaped fences).
 */
function parseContentSegmentsPlantumlFallback(raw) {
  const segments = []
  const openRe = /(```|\\`\\`\\`)plantuml\s*\n/gi
  let lastEnd = 0
  let openMatch
  while ((openMatch = openRe.exec(raw)) !== null) {
    const openFence = openMatch[1]
    const closeFence = openFence === '```' ? '```' : '\\`\\`\\`'
    const afterOpen = raw.slice(openRe.lastIndex)
    const closeIdx = afterOpen.indexOf(closeFence)
    if (closeIdx === -1) break
    const before = raw.slice(lastEnd, openMatch.index)
    const { rest, heading } = stripTrailingLoneHeading(before)
    if (rest.trim()) segments.push({ type: 'markdown', html: md.render(rest.trim()) })
    let code = afterOpen.slice(0, closeIdx).trim()
    if (openFence !== '```') code = code.replace(/\\`/g, '`')
    if (heading) {
      segments.push({ type: 'plantuml-with-heading', headingHtml: md.render(heading), content: code })
    } else {
      segments.push({ type: 'plantuml', content: code })
    }
    lastEnd = openMatch.index + openMatch[0].length + closeIdx + closeFence.length
    openRe.lastIndex = lastEnd
  }
  if (lastEnd > 0 && lastEnd < raw.length) {
    const after = raw.slice(lastEnd).trim()
    if (after) segments.push({ type: 'markdown', html: md.render(after) })
  }
  return segments
}

/**
 * Wrap sections so every topic-link target (h2 with id) is at the START of its section, not the end of the previous.
 * - If content has h2[id], wrap each "h2 + everything until next h2" in one .faq-item (one card per section).
 * - Otherwise fall back to h3/h4 wrapping for FAQ-style subsections.
 */
function wrapFaqBlocks(html) {
  if (typeof document === 'undefined' || !html) return html
  const div = document.createElement('div')
  div.innerHTML = html
  const h2s = div.querySelectorAll('h2[id]')
  if (h2s.length > 0) {
    h2s.forEach((h2) => {
      const siblings = []
      let s = h2.nextElementSibling
      while (s && s.tagName !== 'H2') {
        siblings.push(s)
        s = s.nextElementSibling
      }
      const parent = h2.parentNode
      const wrapper = document.createElement('div')
      wrapper.className = 'faq-item faq-item-expanded'
      parent.insertBefore(wrapper, h2)
      wrapper.appendChild(h2)
      siblings.forEach((el) => wrapper.appendChild(el))
    })
    return div.innerHTML
  }
  if (!html.includes('</h3>') && !html.includes('</h4>')) return html
  const headings = div.querySelectorAll('h3[id], h4[id]')
  if (headings.length === 0) return html
  headings.forEach((h) => {
    const siblings = []
    let s = h.nextElementSibling
    while (s && !['H3', 'H4'].includes(s.tagName)) {
      siblings.push(s)
      s = s.nextElementSibling
    }
    const refNode = siblings.length > 0 ? siblings[siblings.length - 1].nextElementSibling : h.nextElementSibling
    const parent = h.parentNode
    const wrapper = document.createElement('div')
    wrapper.className = 'faq-item faq-item-expanded'
    parent.insertBefore(wrapper, refNode)
    wrapper.appendChild(h)
    siblings.forEach((el) => wrapper.appendChild(el))
  })
  return div.innerHTML
}

export default {
  name: 'MarkdownContent',
  components: {
    MermaidBlock,
    KrokiBlock
  },
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const segments = computed(() => {
      const parsed = parseContentSegments(props.content)
      return parsed.map((seg) =>
        seg.type === 'markdown'
          ? { ...seg, html: wrapFaqBlocks(seg.html) }
          : seg
      )
    })
    function onCopyClick(e) {
      const btn = e.target?.closest?.('.code-copy-btn')
      if (!btn) return
      const id = btn.getAttribute('data-code-id')
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return
      const text = el.textContent || ''
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          const icon = btn.querySelector('.bi')
          const label = btn.lastChild
          btn.classList.add('copied')
          if (icon) {
            icon.classList.replace('bi-clipboard', 'bi-check2')
          }
          if (label && label.nodeType === Node.TEXT_NODE) {
            label.textContent = ' Copied!'
          }
          setTimeout(() => {
            btn.classList.remove('copied')
            if (icon) icon.classList.replace('bi-check2', 'bi-clipboard')
            if (label && label.nodeType === Node.TEXT_NODE) label.textContent = ' Copy'
          }, 2000)
        }).catch(() => {})
      }
    }
    return { segments, onCopyClick }
  }
}
</script>

<style scoped>
/* Match site typography: headings, body, lists (same scale as About / service content) */
.markdown-content {
  line-height: 1.75;
  color: var(--default-color, #272829);
  font-size: var(--pf-text-base, 1rem);
}
.markdown-segment {
  margin-bottom: 0;
}
/* Code blocks: light note-style background, alignment, word-wrap; copy button always visible */
.markdown-content :deep(.code-block-wrapper) {
  position: relative;
  margin: 1.25rem 0;
  background: linear-gradient(135deg, rgba(248, 246, 255, 0.98) 0%, rgba(238, 242, 255, 0.98) 100%);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(139, 92, 246, 0.08);
}
.markdown-content :deep(.code-copy-btn) {
  position: absolute;
  top: 10px;
  right: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #5b21b6;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(139, 92, 246, 0.4);
  border-radius: 8px;
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
.markdown-content :deep(.code-copy-btn:hover) {
  background: rgba(139, 92, 246, 0.12);
  color: #4c1d95;
  border-color: rgba(139, 92, 246, 0.5);
}
.markdown-content :deep(.code-copy-btn.copied) {
  color: #059669;
  border-color: rgba(5, 150, 105, 0.5);
  background: rgba(5, 150, 105, 0.08);
}
.markdown-content :deep(pre) {
  background: linear-gradient(180deg, rgba(251, 250, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%) !important;
  color: #1e293b !important;
  padding: 1rem 1.25rem;
  padding-top: 2.75rem;
  border-radius: 0 0 10px 10px;
  overflow-x: auto;
  margin: 0;
  border: none;
  border-top: 1px solid rgba(139, 92, 246, 0.12);
  text-align: left;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.markdown-content :deep(pre code) {
  background: none !important;
  color: inherit !important;
  padding: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  font-family: Consolas, Monaco, 'Courier New', monospace;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.markdown-content :deep(code) {
  background: #f5f5f5;
  color: #c7254e;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-size: 0.88em;
  font-family: Consolas, Monaco, 'Courier New', monospace;
  border: 1px solid #e8e8e8;
}
/* Term/abbreviation links to FAQs – highlight so readers can jump to explanation */
.markdown-content :deep(a[href^="#"]) {
  color: #4f46e5;
  text-decoration: none;
  border-bottom: 1px dotted #4f46e5;
  font-weight: 500;
}
.markdown-content :deep(a[href^="#"]:hover) {
  border-bottom-style: solid;
}
/* Blog headings: full-width block, consistent left padding (never touch borders), full background bar */
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4) {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0;
  border-radius: 8px;
  /* Full block background for whole bar (no white strip at top) */
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(139, 92, 246, 0.08) 100%);
  border-left: 4px solid rgba(139, 92, 246, 0.4);
}
.markdown-content :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-size: var(--pf-text-2xl, 1.5rem);
  font-weight: 700;
  color: #4f46e5;
  line-height: 1.3;
}
.markdown-content :deep(h2:first-child) {
  margin-top: 0;
}
.markdown-content :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: var(--pf-text-xl, 1.25rem);
  font-weight: 600;
  color: #5b21b6;
  line-height: 1.35;
}
.markdown-content :deep(h4) {
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  font-size: var(--pf-text-lg, 1.125rem);
  font-weight: 600;
  color: #6d28d9;
}
.markdown-content :deep(p) {
  margin-bottom: 1.1rem;
  font-size: var(--pf-text-base, 1rem);
  line-height: 1.75;
}
.markdown-content :deep(ul), .markdown-content :deep(ol) {
  margin-bottom: 1.1rem;
  padding-left: 1.5rem;
  font-size: var(--pf-text-base, 1rem);
  line-height: 1.7;
}
.markdown-content :deep(li) {
  margin-bottom: 0.35rem;
}
.markdown-content :deep(blockquote) {
  margin: 1.25rem 0;
  padding: 0.75rem 1.25rem;
  border-left: 4px solid rgba(139, 92, 246, 0.4);
  background: rgba(139, 92, 246, 0.06);
  border-radius: 0 8px 8px 0;
  font-size: var(--pf-text-base, 1rem);
  color: #4b5563;
}
.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.markdown-content :deep(strong) {
  font-weight: 700;
  color: var(--default-color, #272829);
}
.markdown-content :deep(hr) {
  margin: 2.25rem 0;
  border: none;
  border-top: 1px solid rgba(139, 92, 246, 0.2);
}
/* Wrapper for markdown tables: horizontal scroll when columns need min-width */
.markdown-content :deep(.markdown-table-wrapper) {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 1.5rem 0;
}
/* Content tables: card-style, clear header and row separation */
.markdown-content :deep(table),
.markdown-content :deep(table.content-table) {
  width: 100%;
  min-width: min(100%, 480px);
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: var(--pf-text-base, 1rem);
  background: #fff;
  border: 1px solid rgba(79, 70, 229, 0.35);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(79, 70, 229, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06);
}
.markdown-content :deep(.markdown-table-wrapper table) {
  margin: 0;
}
.markdown-content :deep(thead) {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%);
  border-bottom: none;
}
.markdown-content :deep(th) {
  padding: 0.875rem 1.25rem;
  text-align: left;
  font-weight: 700;
  color: #fff;
  font-size: var(--pf-text-sm, 0.875rem);
  letter-spacing: 0.03em;
  min-width: 8rem;
  max-width: 40rem;
  overflow-wrap: break-word;
  word-break: normal;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}
.markdown-content :deep(th:first-child),
.markdown-content :deep(td:first-child) {
  min-width: 8rem;
}
.markdown-content :deep(th:not(:last-child)) {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}
.markdown-content :deep(td) {
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid rgba(79, 70, 229, 0.15);
  border-right: 1px solid rgba(79, 70, 229, 0.08);
  color: var(--default-color, #272829);
  vertical-align: top;
  text-align: left;
  min-width: 6rem;
  max-width: 40rem;
  overflow-wrap: break-word;
  word-break: normal;
}
.markdown-content :deep(td:last-child) {
  border-right: none;
}
.markdown-content :deep(tbody tr:last-child td) {
  border-bottom: none;
}
.markdown-content :deep(tbody tr:nth-child(odd) td) {
  background: #fafafa;
}
.markdown-content :deep(tbody tr:nth-child(even) td) {
  background: rgba(79, 70, 229, 0.04);
}
.markdown-content :deep(tbody tr:hover td) {
  background: rgba(99, 102, 241, 0.08);
}
.markdown-content :deep(tbody tr:nth-child(even):hover td) {
  background: rgba(99, 102, 241, 0.12);
}
.markdown-content :deep(table td code) {
  background: rgba(79, 70, 229, 0.1);
  color: #4338ca;
  padding: 0.2em 0.45em;
  border-radius: 6px;
  font-size: 0.9em;
  border: 1px solid rgba(79, 70, 229, 0.2);
}
/* Section cards: every topic anchor (h2) starts its section; one card per section */
.markdown-content :deep(.faq-item-expanded) {
  background: linear-gradient(145deg, #ffffff 0%, #faf8ff 50%, #f5f0ff 100%);
  border: 1px solid rgba(99, 102, 241, 0.28);
  border-left: 4px solid rgba(99, 102, 241, 0.6);
  border-radius: 12px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 12px rgba(99, 102, 241, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04);
  padding: 0;
}
.markdown-content :deep(.faq-item-expanded:hover) {
  border-left-color: rgba(99, 102, 241, 0.85);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.12), 0 2px 6px rgba(0, 0, 0, 0.06);
}
.markdown-content :deep(.faq-item-expanded h2) {
  margin: 0;
  padding: 1.25rem 1.5rem 0.5rem 1.5rem;
  padding-left: 1.5rem !important;
  font-size: 1.35rem;
  font-weight: 700;
  color: #4338ca;
  letter-spacing: -0.02em;
  border: none;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%);
}
.markdown-content :deep(.faq-item-expanded h3),
.markdown-content :deep(.faq-item-expanded h4) {
  margin: 0;
  padding: 1rem 1.5rem 0.75rem 1.5rem;
  padding-left: 1.5rem !important;
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  border: none;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(139, 92, 246, 0.04) 100%);
}
.markdown-content :deep(.faq-item-expanded p) {
  margin: 0;
  padding: 1rem 1.5rem 1.25rem 1.5rem;
  color: #4b5563;
  line-height: 1.8;
  font-size: var(--pf-text-base, 1rem);
  background: transparent;
}
.markdown-content :deep(.faq-item-expanded ul),
.markdown-content :deep(.faq-item-expanded ol) {
  margin: 0 1.5rem 1rem 1.5rem;
  padding-left: 1.5rem;
}
.markdown-content :deep(.faq-item-expanded code) {
  background: rgba(99, 102, 241, 0.12);
  color: #4338ca;
  padding: 0.2em 0.5em;
  border-radius: 6px;
  font-size: 0.9em;
  font-family: Consolas, Monaco, 'Courier New', monospace;
  border: 1px solid rgba(99, 102, 241, 0.2);
}
/* Legacy FAQ headings not inside .faq-item (fallback) */
.markdown-content :deep(h3.faq-q),
.markdown-content :deep(h4.faq-q) {
  font-size: var(--pf-text-lg, 1.125rem);
  font-weight: 600;
  color: var(--heading-color, #45505b);
  margin-top: 1.25rem;
  margin-bottom: 0.35rem;
}
/* Common issues / challenges: optional blockquote callout */
.markdown-content :deep(blockquote.warning) {
  border-left-color: rgba(239, 68, 68, 0.5);
  background: rgba(239, 68, 68, 0.05);
}
.markdown-content :deep(blockquote.tip) {
  border-left-color: rgba(34, 197, 94, 0.5);
  background: rgba(34, 197, 94, 0.05);
}
.mermaid-segment-wrapper {
  margin: 1.5rem 0;
  width: 100%;
  min-height: 180px;
}
/* Diagram section label: rounded pill with thick border, light bg, dark text matching diagram theme */
.markdown-segment.mermaid-section {
  margin-bottom: 0.75rem;
  padding: 0;
}
.markdown-segment.mermaid-section :deep(h3) {
  display: inline-block !important;
  width: auto !important;
  margin: 0 !important;
  padding: 0.5rem 1.25rem !important;
  font-size: 0.875rem !important;
  font-weight: 700;
  color: #1e293b !important;
  background: #f8fafc !important;
  border: 2px solid #6366f1 !important;
  border-radius: 12px !important;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.15);
  letter-spacing: 0.02em;
}
.markdown-segment.mermaid-section :deep(h3:empty) {
  display: none;
}
.markdown-segment {
  width: 100%;
}
</style>
