<template>
  <div ref="containerRef" class="mermaid-block">
    <button
      type="button"
      class="mermaid-copy-btn"
      aria-label="Copy diagram source"
      title="Copy diagram source"
      @click="copySource"
    >
      <i class="bi bi-clipboard"></i> Copy
    </button>
    <div ref="outputRef" class="mermaid-output" v-show="rendered"></div>
    <div v-if="!rendered && !error" class="mermaid-placeholder">Loading diagram…</div>
    <div v-else-if="error" class="mermaid-error-block">
      <p class="mermaid-error">Diagram could not be rendered.</p>
      <p v-if="errorMessage" class="mermaid-error-detail">{{ errorMessage }}</p>
      <pre v-if="source" class="mermaid-source-fallback">{{ source }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'

export default {
  name: 'MermaidBlock',
  props: {
    source: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const containerRef = ref(null)
    const outputRef = ref(null)
    const rendered = ref(false)
    const error = ref(false)
    const errorMessage = ref('')
    let mermaidApi = null

    async function render() {
      if (!containerRef.value) return
      const raw = props.source?.trim() ?? ''
      if (!raw) {
        error.value = true
        errorMessage.value = 'Diagram source is empty.'
        return
      }
      // Mermaid classDiagram parser fails on leading newline; ensure diagram starts at first line
      const source = raw.replace(/^\s*\n+/, '')
      error.value = false
      errorMessage.value = ''
      try {
        if (!mermaidApi) {
          const mod = await import('mermaid')
          mermaidApi = mod.default ?? mod
          mermaidApi.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            theme: 'base',
            classDiagram: {
              useMaxWidth: false,
              padding: 22,
              textHeight: 16,
              nodeSpacing: 90,
              rankSpacing: 75,
              diagramPadding: 42,
              dividerMargin: 14,
              htmlLabels: true
            },
            themeVariables: {
              primaryColor: '#e2e8f0',
              primaryTextColor: '#1e293b',
              primaryBorderColor: '#64748b',
              lineColor: '#94a3b8',
              textColor: '#1e293b',
              fontFamily: 'ui-sans-serif, system-ui, "Segoe UI", sans-serif',
              fontSize: '15px'
            }
          })
        }
        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
        const { svg } = await mermaidApi.render(id, source)
        if (outputRef.value) {
          outputRef.value.innerHTML = svg
          applyClassDefStyles(outputRef.value, source)
          applyPerClassColors(outputRef.value)
          reorderSvgNodesOnTop(outputRef.value)
          styleEdgeLabels(outputRef.value)
          rendered.value = true
          error.value = false
        }
      } catch (err) {
        error.value = true
        errorMessage.value = (err?.message || String(err)) || 'Unknown error'
      }
    }

    onMounted(() => {
      render()
    })
    watch(() => props.source, () => {
      rendered.value = false
      render()
    })

    /**
     * Parse diagram source for "class NodeId:::styleClass" and add styleClass to the corresponding
     * node group in the SVG so interfaces get purple, subject blue, concrete green, etc.
     * Tries id selectors first, then finds node by label text (so interface nodes are always found).
     */
    /** Per-class palette: applied inline so it overrides Mermaid’s classDef from source. All strokes 2.5px. */
    const PER_CLASS_PALETTE = {
      interface: { fill: '#e0e7ff', stroke: '#4f46e5', text: '#3730a3' },
      subject: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' },
      context: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' },
      concrete: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      handler: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      strategy: { fill: '#fef3c7', stroke: '#d97706', text: '#b45309' },
      command: { fill: '#fce7f3', stroke: '#db2777', text: '#be185d' },
      state: { fill: '#e0f2fe', stroke: '#0284c7', text: '#0369a1' },
      abstract: { fill: '#f3e8ff', stroke: '#7c3aed', text: '#6d28d9' },
      mediator: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' },
      colleague: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      memento: { fill: '#fef3c7', stroke: '#d97706', text: '#b45309' },
      originator: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' },
      caretaker: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      aggregate: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' },
      iterator: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      terminal: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' },
      composite: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      element: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' },
      visitor: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      adapter: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      adaptee: { fill: '#fef3c7', stroke: '#d97706', text: '#b45309' },
      target: { fill: '#e0e7ff', stroke: '#4f46e5', text: '#3730a3' },
      abstraction: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' },
      implementor: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      facade: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' },
      decorator: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      proxy: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      flyweight: { fill: '#fef3c7', stroke: '#d97706', text: '#b45309' },
      component: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' },
      leaf: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      creator: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' },
      product: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      builder: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      director: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' },
      prototype: { fill: '#fef3c7', stroke: '#d97706', text: '#b45309' },
      singleton: { fill: '#d1fae5', stroke: '#059669', text: '#047857' },
      factory: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' }
    }
    function applyPerClassColors(container) {
      if (!container) return
      Object.entries(PER_CLASS_PALETTE).forEach(([cls, { fill, stroke, text }]) => {
        container.querySelectorAll(`g.${cls}`).forEach((g) => {
          g.querySelectorAll('rect').forEach((el) => {
            el.setAttribute('fill', fill)
            el.setAttribute('stroke', stroke)
            el.setAttribute('stroke-width', '2.5')
          })
          g.querySelectorAll('path.basic').forEach((el) => {
            el.setAttribute('fill', fill)
            el.setAttribute('stroke', stroke)
            el.setAttribute('stroke-width', '2.5')
          })
          g.querySelectorAll('text, tspan').forEach((el) => {
            el.setAttribute('fill', text)
          })
          g.querySelectorAll('span').forEach((el) => {
            el.style.color = text
            el.style.fill = text
          })
        })
      })
    }

    /** Edge label: only style/place groups that have actual text (notifies, uses, etc.). Skip empty ones. */
    const EDGE_LABEL_STYLES = {
      rectStyle: 'fill:#fefce8!important;stroke:#854d0e!important;stroke-width:2px!important;rx:6!important;ry:6!important',
      body: 'padding:2px 6px!important;background:#fefce8!important;border:2px solid #854d0e!important;border-radius:6px!important;font-size:11px!important;font-weight:600!important;font-family:ui-sans-serif,system-ui,"Segoe UI",sans-serif!important;color:#0f172a!important;line-height:1!important;box-shadow:0 1px 2px rgba(0,0,0,0.08)!important;min-height:0!important;display:inline-block!important',
      span: 'color:#0f172a!important;font-size:11px!important;font-weight:600!important;background:transparent!important;line-height:1!important'
    }
    const EDGE_LABEL_OFFSET = ' translate(8,-6)'
    const EDGE_LABEL_HEIGHT = 20
    function styleEdgeLabels(container) {
      if (!container) return
      const applyRect = (rect) => {
        rect.setAttribute('fill', '#fefce8')
        rect.setAttribute('stroke', '#854d0e')
        rect.setAttribute('stroke-width', '2')
        rect.setAttribute('rx', '6')
        rect.setAttribute('ry', '6')
        rect.setAttribute('height', String(EDGE_LABEL_HEIGHT))
        rect.setAttribute('style', (rect.getAttribute('style') || '') + ';' + EDGE_LABEL_STYLES.rectStyle)
      }
      const applyBody = (body) => {
        body.setAttribute('style', (body.getAttribute('style') || '') + ';' + EDGE_LABEL_STYLES.body)
      }
      const applySpan = (span) => {
        span.setAttribute('style', (span.getAttribute('style') || '') + ';' + EDGE_LABEL_STYLES.span)
      }
      container.querySelectorAll('span.edgeLabel').forEach((span) => {
        const text = (span.textContent || '').trim()
        if (!text) return
        applySpan(span)
        const foreign = span.closest('foreignObject')
        if (foreign) {
          const body = foreign.querySelector('body') || foreign.querySelector('div')
          if (body) applyBody(body)
          foreign.setAttribute('height', String(EDGE_LABEL_HEIGHT))
          foreign.setAttribute('style', (foreign.getAttribute('style') || '') + ';height:' + EDGE_LABEL_HEIGHT + 'px!important;max-height:' + EDGE_LABEL_HEIGHT + 'px!important')
        }
        const group = span.closest('g')
        if (group) {
          group.querySelectorAll('rect').forEach(applyRect)
          const t = group.getAttribute('transform') || ''
          if (t.indexOf('translate(8,-6)') === -1) group.setAttribute('transform', t.trim() + EDGE_LABEL_OFFSET)
        }
      })
    }

    /**
     * Reorder SVG so: (1) edge paths drawn first, (2) nodes on top so arrows stop at box edges,
     * (3) edge labels drawn last so they never go behind shapes. Same for all diagrams.
     */
    function reorderSvgNodesOnTop(container) {
      const svg = container?.querySelector('svg')
      if (!svg) return
      const parent = svg.children.length > 1 ? svg : (svg.firstElementChild?.tagName === 'g' ? svg.firstElementChild : svg)
      const moveEdgeLabelsToParent = () => {
        container.querySelectorAll('g.edgeLabel').forEach((g) => {
          if (g.parentElement && g.parentElement !== parent) parent.appendChild(g)
        })
      }
      moveEdgeLabelsToParent()
      const direct = Array.from(parent.children)
      const isNode = (el) => el.tagName === 'g' && (el.classList?.contains('node') || (el.id && el.id.startsWith('classId-')))
      const isEdgeLabel = (el) => el.tagName === 'g' && el.classList?.contains('edgeLabel')
      const isEdgePath = (el) => el.tagName === 'g' && !el.classList?.contains('edgeLabel') && (el.classList?.contains('edgePath') || el.classList?.contains('edge') || el.classList?.contains('edgePaths') || el.querySelector('.relation path') || el.querySelector('.edgePath path'))
      const edgeLabels = direct.filter(isEdgeLabel)
      const edgePaths = direct.filter(isEdgePath)
      const nodes = direct.filter(isNode)
      const rest = direct.filter((el) => !nodes.includes(el) && !edgePaths.includes(el) && !edgeLabels.includes(el))
      const order = [...rest, ...edgePaths, ...nodes, ...edgeLabels]
      order.forEach((child) => parent.appendChild(child))
    }

    function applyClassDefStyles(container, diagramSource) {
      if (!container || !diagramSource) return
      const svg = container.querySelector('svg')
      if (!svg) return
      const classRegex = /class\s+([^\s:]+)\s*:::\s*(\w+)/g
      const nodeToClass = new Map()
      let m
      while ((m = classRegex.exec(diagramSource)) !== null) {
        nodeToClass.set(m[1].trim(), m[2])
      }
      nodeToClass.forEach((styleClass, nodeId) => {
        try {
          const escaped = CSS.escape(nodeId)
          let el = container.querySelector('[id="' + escaped + '"]')
          if (!el) el = container.querySelector('[id="classId-' + escaped + '"]')
          if (!el) el = container.querySelector('[id^="classId-' + escaped + '-"]')
          if (!el) el = container.querySelector('[id^="classId-' + escaped + '"]')
          // Fallback: find node by label text (e.g. "IObservable") so interfaces always get the right class
          if (!el) {
            const texts = container.querySelectorAll('text, tspan')
            for (const text of texts) {
              const t = (text.textContent || '').trim()
              if (t === nodeId) {
                let g = text.closest('g')
                while (g && g !== svg) {
                  if (g.querySelector('rect') || g.querySelector('path')) {
                    el = g
                    break
                  }
                  g = g.parentElement
                }
                if (el) break
              }
            }
          }
          if (el) el.classList.add(styleClass)
        } catch (_) {}
      })
    }

    function copySource() {
      if (!props.source || !navigator.clipboard?.writeText) return
      navigator.clipboard.writeText(props.source).then(() => {
        const btn = containerRef.value?.querySelector('.mermaid-copy-btn')
        if (btn) {
          btn.classList.add('copied')
          const icon = btn.querySelector('.bi')
          if (icon) icon.classList.replace('bi-clipboard', 'bi-check2')
          const text = btn.lastChild
          if (text && text.nodeType === Node.TEXT_NODE) text.textContent = ' Copied!'
          setTimeout(() => {
            btn.classList.remove('copied')
            if (icon) icon.classList.replace('bi-check2', 'bi-clipboard')
            if (text && text.nodeType === Node.TEXT_NODE) text.textContent = ' Copy'
          }, 2000)
        }
      }).catch(() => {})
    }

    return { containerRef, outputRef, rendered, error, errorMessage, source: computed(() => props.source), copySource }
  }
}
</script>

<style scoped>
.mermaid-block {
  position: relative;
  margin: 1.75rem 0;
  padding: 1.75rem;
  background: #fafafa;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.mermaid-copy-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #475569;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.mermaid-copy-btn:hover {
  background: #f1f5f9;
  color: #334155;
  border-color: #cbd5e1;
}
.mermaid-copy-btn.copied {
  color: #059669;
  border-color: #a7f3d0;
  background: #ecfdf5;
}
.mermaid-placeholder {
  color: #6b7280;
  font-size: 0.9rem;
}
.mermaid-output {
  overflow: visible;
  overflow-x: auto;
  min-height: 180px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mermaid-output :deep(svg) {
  max-width: 100%;
  height: auto;
  min-width: 240px;
  overflow: visible;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.04));
}
/* Rounded corners; class diagram uses path, flowcharts use rect */
.mermaid-output :deep(rect) {
  rx: 10;
  ry: 10;
}
.mermaid-output :deep(.node rect),
.mermaid-output :deep(.node polygon) {
  stroke-width: 2.5;
}
/* Prevent text clipping */
.mermaid-output :deep(.label),
.mermaid-output :deep(.label-group),
.mermaid-output :deep(.markdown-node-label),
.mermaid-output :deep(.nodeLabel) {
  overflow: visible !important;
  min-width: 0;
}
.mermaid-output :deep(foreignObject) {
  overflow: visible !important;
}
.mermaid-output :deep(foreignObject body) {
  padding: 8px 14px;
  font-size: 15px;
  line-height: 1.45;
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.mermaid-output :deep(.node) {
  min-width: 130px;
}
/* Relation lines: 2px stroke so lines stay within diagram capacity; arrow markers unchanged */
.mermaid-output :deep(.edgePath path) {
  stroke-width: 2px !important;
  stroke: #64748b !important;
}
.mermaid-output :deep(.relation) {
  stroke-width: 2px !important;
  stroke: #64748b !important;
}
.mermaid-output :deep(.dashed-line),
.mermaid-output :deep(.dotted-line) {
  stroke-width: 2px !important;
  stroke: #64748b !important;
}
.mermaid-output :deep(.edgePath .relation),
.mermaid-output :deep(.relation-line) {
  stroke-width: 2px !important;
  stroke: #64748b !important;
}
/* Edge labels: minimal height (fit one line), placed off arrow */
.mermaid-output :deep(.edgeLabel .label rect) {
  fill: #fefce8 !important;
  stroke: #854d0e !important;
  stroke-width: 2px !important;
  rx: 6 !important;
  ry: 6 !important;
}
.mermaid-output :deep(.edgeLabel .label span) {
  background: transparent !important;
  color: #0f172a !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  line-height: 1 !important;
  font-family: ui-sans-serif, system-ui, "Segoe UI", sans-serif !important;
  letter-spacing: 0.02em !important;
}
.mermaid-output :deep(.edgeLabel .label text) {
  fill: #0f172a !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  font-family: ui-sans-serif, system-ui, "Segoe UI", sans-serif !important;
  letter-spacing: 0.02em !important;
}
.mermaid-output :deep(.edgeLabel foreignObject) {
  overflow: visible !important;
  height: 20px !important;
  max-height: 20px !important;
}
.mermaid-output :deep(.edgeLabel foreignObject body) {
  padding: 2px 6px !important;
  background: #fefce8 !important;
  border: 2px solid #854d0e !important;
  border-radius: 6px !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  font-family: ui-sans-serif, system-ui, "Segoe UI", sans-serif !important;
  color: #0f172a !important;
  line-height: 1 !important;
  letter-spacing: 0.02em !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08) !important;
  min-width: 0 !important;
  min-height: 0 !important;
  display: inline-block !important;
  white-space: nowrap !important;
}
.mermaid-output :deep(.edgeLabel rect) {
  fill: #fefce8 !important;
  stroke: #854d0e !important;
  stroke-width: 2px !important;
  rx: 6 !important;
  ry: 6 !important;
  height: 20px !important;
}
.mermaid-output :deep(.edgeLabel text) {
  fill: #0f172a !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  font-family: ui-sans-serif, system-ui, "Segoe UI", sans-serif !important;
  letter-spacing: 0.02em !important;
}
.mermaid-output :deep(text) {
  font-size: 15px;
  fill: #1e293b;
  font-weight: 500;
}
.mermaid-output :deep(tspan) {
  font-size: 15px;
}
/* Class name (first line) bolder */
.mermaid-output :deep(.nodeLabel .label span:first-child),
.mermaid-output :deep(.node .label > span:first-child) {
  font-weight: 700 !important;
}
/* Per-class colors: distinct fill + darker stroke + readable text (draw.io-style) */
.mermaid-output :deep(.interface rect),
.mermaid-output :deep(.interface path.basic) { fill: #e0e7ff !important; stroke: #4f46e5 !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.interface text),
.mermaid-output :deep(.interface tspan),
.mermaid-output :deep(.interface span) { fill: #3730a3 !important; color: #3730a3 !important; font-weight: 600 !important; }
.mermaid-output :deep(.subject rect),
.mermaid-output :deep(.subject path.basic),
.mermaid-output :deep(.context rect),
.mermaid-output :deep(.context path.basic) { fill: #dbeafe !important; stroke: #2563eb !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.subject text),
.mermaid-output :deep(.subject tspan),
.mermaid-output :deep(.subject span),
.mermaid-output :deep(.context text),
.mermaid-output :deep(.context tspan),
.mermaid-output :deep(.context span) { fill: #1d4ed8 !important; color: #1d4ed8 !important; font-weight: 600 !important; }
.mermaid-output :deep(.concrete rect),
.mermaid-output :deep(.concrete path.basic),
.mermaid-output :deep(.handler rect),
.mermaid-output :deep(.handler path.basic) { fill: #d1fae5 !important; stroke: #059669 !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.concrete text),
.mermaid-output :deep(.concrete tspan),
.mermaid-output :deep(.concrete span),
.mermaid-output :deep(.handler text),
.mermaid-output :deep(.handler tspan),
.mermaid-output :deep(.handler span) { fill: #047857 !important; color: #047857 !important; font-weight: 600 !important; }
.mermaid-output :deep(.strategy rect),
.mermaid-output :deep(.strategy path.basic) { fill: #fef3c7 !important; stroke: #d97706 !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.strategy text),
.mermaid-output :deep(.strategy tspan),
.mermaid-output :deep(.strategy span) { fill: #b45309 !important; color: #b45309 !important; font-weight: 600 !important; }
.mermaid-output :deep(.command rect),
.mermaid-output :deep(.command path.basic) { fill: #fce7f3 !important; stroke: #db2777 !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.command text),
.mermaid-output :deep(.command tspan),
.mermaid-output :deep(.command span) { fill: #be185d !important; color: #be185d !important; font-weight: 600 !important; }
.mermaid-output :deep(.state rect),
.mermaid-output :deep(.state path.basic) { fill: #e0f2fe !important; stroke: #0284c7 !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.state text),
.mermaid-output :deep(.state tspan),
.mermaid-output :deep(.state span) { fill: #0369a1 !important; color: #0369a1 !important; font-weight: 600 !important; }
.mermaid-output :deep(.abstract rect),
.mermaid-output :deep(.abstract path.basic) { fill: #f3e8ff !important; stroke: #7c3aed !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.abstract text),
.mermaid-output :deep(.abstract tspan),
.mermaid-output :deep(.abstract span) { fill: #6d28d9 !important; color: #6d28d9 !important; font-weight: 600 !important; }
/* New pattern diagram classes: light fill + darker outline (same palette as above) */
.mermaid-output :deep(.mediator rect),
.mermaid-output :deep(.mediator path.basic),
.mermaid-output :deep(.originator rect),
.mermaid-output :deep(.originator path.basic),
.mermaid-output :deep(.aggregate rect),
.mermaid-output :deep(.aggregate path.basic),
.mermaid-output :deep(.terminal rect),
.mermaid-output :deep(.terminal path.basic),
.mermaid-output :deep(.element rect),
.mermaid-output :deep(.element path.basic) { fill: #dbeafe !important; stroke: #2563eb !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.mediator text),
.mermaid-output :deep(.mediator tspan),
.mermaid-output :deep(.mediator span),
.mermaid-output :deep(.originator text),
.mermaid-output :deep(.originator tspan),
.mermaid-output :deep(.originator span),
.mermaid-output :deep(.aggregate text),
.mermaid-output :deep(.aggregate tspan),
.mermaid-output :deep(.aggregate span),
.mermaid-output :deep(.terminal text),
.mermaid-output :deep(.terminal tspan),
.mermaid-output :deep(.terminal span),
.mermaid-output :deep(.element text),
.mermaid-output :deep(.element tspan),
.mermaid-output :deep(.element span) { fill: #1d4ed8 !important; color: #1d4ed8 !important; font-weight: 600 !important; }
.mermaid-output :deep(.colleague rect),
.mermaid-output :deep(.colleague path.basic),
.mermaid-output :deep(.caretaker rect),
.mermaid-output :deep(.caretaker path.basic),
.mermaid-output :deep(.iterator rect),
.mermaid-output :deep(.iterator path.basic),
.mermaid-output :deep(.composite rect),
.mermaid-output :deep(.composite path.basic),
.mermaid-output :deep(.visitor rect),
.mermaid-output :deep(.visitor path.basic) { fill: #d1fae5 !important; stroke: #059669 !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.colleague text),
.mermaid-output :deep(.colleague tspan),
.mermaid-output :deep(.colleague span),
.mermaid-output :deep(.caretaker text),
.mermaid-output :deep(.caretaker tspan),
.mermaid-output :deep(.caretaker span),
.mermaid-output :deep(.iterator text),
.mermaid-output :deep(.iterator tspan),
.mermaid-output :deep(.iterator span),
.mermaid-output :deep(.composite text),
.mermaid-output :deep(.composite tspan),
.mermaid-output :deep(.composite span),
.mermaid-output :deep(.visitor text),
.mermaid-output :deep(.visitor tspan),
.mermaid-output :deep(.visitor span) { fill: #047857 !important; color: #047857 !important; font-weight: 600 !important; }
.mermaid-output :deep(.memento rect),
.mermaid-output :deep(.memento path.basic) { fill: #fef3c7 !important; stroke: #d97706 !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.memento text),
.mermaid-output :deep(.memento tspan),
.mermaid-output :deep(.memento span) { fill: #b45309 !important; color: #b45309 !important; font-weight: 600 !important; }
/* Structural pattern diagram classes */
.mermaid-output :deep(.target rect),
.mermaid-output :deep(.target path.basic),
.mermaid-output :deep(.abstraction rect),
.mermaid-output :deep(.abstraction path.basic),
.mermaid-output :deep(.facade rect),
.mermaid-output :deep(.facade path.basic),
.mermaid-output :deep(.component rect),
.mermaid-output :deep(.component path.basic) { fill: #dbeafe !important; stroke: #2563eb !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.target text),
.mermaid-output :deep(.target tspan),
.mermaid-output :deep(.target span),
.mermaid-output :deep(.abstraction text),
.mermaid-output :deep(.abstraction tspan),
.mermaid-output :deep(.abstraction span),
.mermaid-output :deep(.facade text),
.mermaid-output :deep(.facade tspan),
.mermaid-output :deep(.facade span),
.mermaid-output :deep(.component text),
.mermaid-output :deep(.component tspan),
.mermaid-output :deep(.component span) { fill: #1d4ed8 !important; color: #1d4ed8 !important; font-weight: 600 !important; }
.mermaid-output :deep(.adapter rect),
.mermaid-output :deep(.adapter path.basic),
.mermaid-output :deep(.implementor rect),
.mermaid-output :deep(.implementor path.basic),
.mermaid-output :deep(.decorator rect),
.mermaid-output :deep(.decorator path.basic),
.mermaid-output :deep(.proxy rect),
.mermaid-output :deep(.proxy path.basic),
.mermaid-output :deep(.leaf rect),
.mermaid-output :deep(.leaf path.basic) { fill: #d1fae5 !important; stroke: #059669 !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.adapter text),
.mermaid-output :deep(.adapter tspan),
.mermaid-output :deep(.adapter span),
.mermaid-output :deep(.implementor text),
.mermaid-output :deep(.implementor tspan),
.mermaid-output :deep(.implementor span),
.mermaid-output :deep(.decorator text),
.mermaid-output :deep(.decorator tspan),
.mermaid-output :deep(.decorator span),
.mermaid-output :deep(.proxy text),
.mermaid-output :deep(.proxy tspan),
.mermaid-output :deep(.proxy span),
.mermaid-output :deep(.leaf text),
.mermaid-output :deep(.leaf tspan),
.mermaid-output :deep(.leaf span) { fill: #047857 !important; color: #047857 !important; font-weight: 600 !important; }
.mermaid-output :deep(.adaptee rect),
.mermaid-output :deep(.adaptee path.basic),
.mermaid-output :deep(.flyweight rect),
.mermaid-output :deep(.flyweight path.basic) { fill: #fef3c7 !important; stroke: #d97706 !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.adaptee text),
.mermaid-output :deep(.adaptee tspan),
.mermaid-output :deep(.adaptee span),
.mermaid-output :deep(.flyweight text),
.mermaid-output :deep(.flyweight tspan),
.mermaid-output :deep(.flyweight span) { fill: #b45309 !important; color: #b45309 !important; font-weight: 600 !important; }
.mermaid-output :deep(.creator rect),
.mermaid-output :deep(.creator path.basic),
.mermaid-output :deep(.director rect),
.mermaid-output :deep(.director path.basic),
.mermaid-output :deep(.factory rect),
.mermaid-output :deep(.factory path.basic) { fill: #dbeafe !important; stroke: #2563eb !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.creator text),
.mermaid-output :deep(.creator tspan),
.mermaid-output :deep(.creator span),
.mermaid-output :deep(.director text),
.mermaid-output :deep(.director tspan),
.mermaid-output :deep(.director span),
.mermaid-output :deep(.factory text),
.mermaid-output :deep(.factory tspan),
.mermaid-output :deep(.factory span) { fill: #1d4ed8 !important; color: #1d4ed8 !important; font-weight: 600 !important; }
.mermaid-output :deep(.product rect),
.mermaid-output :deep(.product path.basic),
.mermaid-output :deep(.builder rect),
.mermaid-output :deep(.builder path.basic),
.mermaid-output :deep(.singleton rect),
.mermaid-output :deep(.singleton path.basic) { fill: #d1fae5 !important; stroke: #059669 !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.product text),
.mermaid-output :deep(.product tspan),
.mermaid-output :deep(.product span),
.mermaid-output :deep(.builder text),
.mermaid-output :deep(.builder tspan),
.mermaid-output :deep(.builder span),
.mermaid-output :deep(.singleton text),
.mermaid-output :deep(.singleton tspan),
.mermaid-output :deep(.singleton span) { fill: #047857 !important; color: #047857 !important; font-weight: 600 !important; }
.mermaid-output :deep(.prototype rect),
.mermaid-output :deep(.prototype path.basic) { fill: #fef3c7 !important; stroke: #d97706 !important; stroke-width: 2.5px !important; }
.mermaid-output :deep(.prototype text),
.mermaid-output :deep(.prototype tspan),
.mermaid-output :deep(.prototype span) { fill: #b45309 !important; color: #b45309 !important; font-weight: 600 !important; }
.mermaid-error-block {
  padding: 1rem;
  background: rgba(239, 68, 68, 0.06);
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.mermaid-error {
  color: #dc2626;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
}
.mermaid-error-detail {
  color: #b91c1c;
  font-size: 0.85rem;
  margin: 0 0 0.5rem 0;
  font-family: ui-monospace, monospace;
}
.mermaid-source-fallback {
  margin: 0;
  font-size: 0.8rem;
  white-space: pre-wrap;
  word-break: break-word;
  color: #374151;
  max-height: 200px;
  overflow: auto;
}
</style>

<!-- Unscoped: force per-class colors so they always apply (override Mermaid inline styles) -->
<style>
.mermaid-block .mermaid-output svg g.interface rect,
.mermaid-block .mermaid-output svg g.interface path { fill: #e0e7ff !important; stroke: #4f46e5 !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.interface text,
.mermaid-block .mermaid-output svg g.interface tspan { fill: #3730a3 !important; }
.mermaid-block .mermaid-output svg g.subject rect,
.mermaid-block .mermaid-output svg g.subject path,
.mermaid-block .mermaid-output svg g.context rect,
.mermaid-block .mermaid-output svg g.context path { fill: #dbeafe !important; stroke: #2563eb !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.subject text,
.mermaid-block .mermaid-output svg g.subject tspan,
.mermaid-block .mermaid-output svg g.context text,
.mermaid-block .mermaid-output svg g.context tspan { fill: #1d4ed8 !important; }
.mermaid-block .mermaid-output svg g.concrete rect,
.mermaid-block .mermaid-output svg g.concrete path,
.mermaid-block .mermaid-output svg g.handler rect,
.mermaid-block .mermaid-output svg g.handler path { fill: #d1fae5 !important; stroke: #059669 !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.concrete text,
.mermaid-block .mermaid-output svg g.concrete tspan,
.mermaid-block .mermaid-output svg g.handler text,
.mermaid-block .mermaid-output svg g.handler tspan { fill: #047857 !important; }
.mermaid-block .mermaid-output svg g.strategy rect,
.mermaid-block .mermaid-output svg g.strategy path { fill: #fef3c7 !important; stroke: #d97706 !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.strategy text,
.mermaid-block .mermaid-output svg g.strategy tspan { fill: #b45309 !important; }
.mermaid-block .mermaid-output svg g.command rect,
.mermaid-block .mermaid-output svg g.command path { fill: #fce7f3 !important; stroke: #db2777 !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.command text,
.mermaid-block .mermaid-output svg g.command tspan { fill: #be185d !important; }
.mermaid-block .mermaid-output svg g.state rect,
.mermaid-block .mermaid-output svg g.state path { fill: #e0f2fe !important; stroke: #0284c7 !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.state text,
.mermaid-block .mermaid-output svg g.state tspan { fill: #0369a1 !important; }
.mermaid-block .mermaid-output svg g.abstract rect,
.mermaid-block .mermaid-output svg g.abstract path { fill: #f3e8ff !important; stroke: #7c3aed !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.abstract text,
.mermaid-block .mermaid-output svg g.abstract tspan { fill: #6d28d9 !important; }
/* New pattern classes: light fill + darker outline */
.mermaid-block .mermaid-output svg g.mediator rect,
.mermaid-block .mermaid-output svg g.mediator path,
.mermaid-block .mermaid-output svg g.originator rect,
.mermaid-block .mermaid-output svg g.originator path,
.mermaid-block .mermaid-output svg g.aggregate rect,
.mermaid-block .mermaid-output svg g.aggregate path,
.mermaid-block .mermaid-output svg g.terminal rect,
.mermaid-block .mermaid-output svg g.terminal path,
.mermaid-block .mermaid-output svg g.element rect,
.mermaid-block .mermaid-output svg g.element path { fill: #dbeafe !important; stroke: #2563eb !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.mediator text,
.mermaid-block .mermaid-output svg g.mediator tspan,
.mermaid-block .mermaid-output svg g.originator text,
.mermaid-block .mermaid-output svg g.originator tspan,
.mermaid-block .mermaid-output svg g.aggregate text,
.mermaid-block .mermaid-output svg g.aggregate tspan,
.mermaid-block .mermaid-output svg g.terminal text,
.mermaid-block .mermaid-output svg g.terminal tspan,
.mermaid-block .mermaid-output svg g.element text,
.mermaid-block .mermaid-output svg g.element tspan { fill: #1d4ed8 !important; }
.mermaid-block .mermaid-output svg g.colleague rect,
.mermaid-block .mermaid-output svg g.colleague path,
.mermaid-block .mermaid-output svg g.caretaker rect,
.mermaid-block .mermaid-output svg g.caretaker path,
.mermaid-block .mermaid-output svg g.iterator rect,
.mermaid-block .mermaid-output svg g.iterator path,
.mermaid-block .mermaid-output svg g.composite rect,
.mermaid-block .mermaid-output svg g.composite path,
.mermaid-block .mermaid-output svg g.visitor rect,
.mermaid-block .mermaid-output svg g.visitor path { fill: #d1fae5 !important; stroke: #059669 !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.colleague text,
.mermaid-block .mermaid-output svg g.colleague tspan,
.mermaid-block .mermaid-output svg g.caretaker text,
.mermaid-block .mermaid-output svg g.caretaker tspan,
.mermaid-block .mermaid-output svg g.iterator text,
.mermaid-block .mermaid-output svg g.iterator tspan,
.mermaid-block .mermaid-output svg g.composite text,
.mermaid-block .mermaid-output svg g.composite tspan,
.mermaid-block .mermaid-output svg g.visitor text,
.mermaid-block .mermaid-output svg g.visitor tspan { fill: #047857 !important; }
.mermaid-block .mermaid-output svg g.memento rect,
.mermaid-block .mermaid-output svg g.memento path { fill: #fef3c7 !important; stroke: #d97706 !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.memento text,
.mermaid-block .mermaid-output svg g.memento tspan { fill: #b45309 !important; }
.mermaid-block .mermaid-output svg g.target rect,
.mermaid-block .mermaid-output svg g.target path,
.mermaid-block .mermaid-output svg g.abstraction rect,
.mermaid-block .mermaid-output svg g.abstraction path,
.mermaid-block .mermaid-output svg g.facade rect,
.mermaid-block .mermaid-output svg g.facade path,
.mermaid-block .mermaid-output svg g.component rect,
.mermaid-block .mermaid-output svg g.component path { fill: #dbeafe !important; stroke: #2563eb !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.target text,
.mermaid-block .mermaid-output svg g.target tspan,
.mermaid-block .mermaid-output svg g.abstraction text,
.mermaid-block .mermaid-output svg g.abstraction tspan,
.mermaid-block .mermaid-output svg g.facade text,
.mermaid-block .mermaid-output svg g.facade tspan,
.mermaid-block .mermaid-output svg g.component text,
.mermaid-block .mermaid-output svg g.component tspan { fill: #1d4ed8 !important; }
.mermaid-block .mermaid-output svg g.adapter rect,
.mermaid-block .mermaid-output svg g.adapter path,
.mermaid-block .mermaid-output svg g.implementor rect,
.mermaid-block .mermaid-output svg g.implementor path,
.mermaid-block .mermaid-output svg g.decorator rect,
.mermaid-block .mermaid-output svg g.decorator path,
.mermaid-block .mermaid-output svg g.proxy rect,
.mermaid-block .mermaid-output svg g.proxy path,
.mermaid-block .mermaid-output svg g.leaf rect,
.mermaid-block .mermaid-output svg g.leaf path { fill: #d1fae5 !important; stroke: #059669 !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.adapter text,
.mermaid-block .mermaid-output svg g.adapter tspan,
.mermaid-block .mermaid-output svg g.implementor text,
.mermaid-block .mermaid-output svg g.implementor tspan,
.mermaid-block .mermaid-output svg g.decorator text,
.mermaid-block .mermaid-output svg g.decorator tspan,
.mermaid-block .mermaid-output svg g.proxy text,
.mermaid-block .mermaid-output svg g.proxy tspan,
.mermaid-block .mermaid-output svg g.leaf text,
.mermaid-block .mermaid-output svg g.leaf tspan { fill: #047857 !important; }
.mermaid-block .mermaid-output svg g.adaptee rect,
.mermaid-block .mermaid-output svg g.adaptee path,
.mermaid-block .mermaid-output svg g.flyweight rect,
.mermaid-block .mermaid-output svg g.flyweight path { fill: #fef3c7 !important; stroke: #d97706 !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.adaptee text,
.mermaid-block .mermaid-output svg g.adaptee tspan,
.mermaid-block .mermaid-output svg g.flyweight text,
.mermaid-block .mermaid-output svg g.flyweight tspan { fill: #b45309 !important; }
.mermaid-block .mermaid-output svg g.creator rect,
.mermaid-block .mermaid-output svg g.creator path,
.mermaid-block .mermaid-output svg g.director rect,
.mermaid-block .mermaid-output svg g.director path,
.mermaid-block .mermaid-output svg g.factory rect,
.mermaid-block .mermaid-output svg g.factory path { fill: #dbeafe !important; stroke: #2563eb !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.creator text,
.mermaid-block .mermaid-output svg g.creator tspan,
.mermaid-block .mermaid-output svg g.director text,
.mermaid-block .mermaid-output svg g.director tspan,
.mermaid-block .mermaid-output svg g.factory text,
.mermaid-block .mermaid-output svg g.factory tspan { fill: #1d4ed8 !important; }
.mermaid-block .mermaid-output svg g.product rect,
.mermaid-block .mermaid-output svg g.product path,
.mermaid-block .mermaid-output svg g.builder rect,
.mermaid-block .mermaid-output svg g.builder path,
.mermaid-block .mermaid-output svg g.singleton rect,
.mermaid-block .mermaid-output svg g.singleton path { fill: #d1fae5 !important; stroke: #059669 !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.product text,
.mermaid-block .mermaid-output svg g.product tspan,
.mermaid-block .mermaid-output svg g.builder text,
.mermaid-block .mermaid-output svg g.builder tspan,
.mermaid-block .mermaid-output svg g.singleton text,
.mermaid-block .mermaid-output svg g.singleton tspan { fill: #047857 !important; }
.mermaid-block .mermaid-output svg g.prototype rect,
.mermaid-block .mermaid-output svg g.prototype path { fill: #fef3c7 !important; stroke: #d97706 !important; stroke-width: 2.5px !important; }
.mermaid-block .mermaid-output svg g.prototype text,
.mermaid-block .mermaid-output svg g.prototype tspan { fill: #b45309 !important; }
/* Thicker relation/dotted lines and styled edge labels */
.mermaid-block .mermaid-output svg .edgePath path,
.mermaid-block .mermaid-output svg .relation { stroke-width: 2px !important; stroke: #64748b !important; }
.mermaid-block .mermaid-output svg .dashed-line,
.mermaid-block .mermaid-output svg .dotted-line,
.mermaid-block .mermaid-output svg .edgePath .relation,
.mermaid-block .mermaid-output svg .relation-line { stroke-width: 2px !important; stroke: #64748b !important; }
.mermaid-block .mermaid-output svg .edgeLabel .label rect,
.mermaid-block .mermaid-output svg .edgeLabel rect { fill: #fefce8 !important; stroke: #854d0e !important; stroke-width: 2px !important; rx: 6 !important; ry: 6 !important; height: 20px !important; }
.mermaid-block .mermaid-output svg .edgeLabel foreignObject { height: 20px !important; max-height: 20px !important; }
.mermaid-block .mermaid-output svg .edgeLabel .label span { background: transparent !important; color: #0f172a !important; font-size: 11px !important; font-weight: 600 !important; line-height: 1 !important; font-family: ui-sans-serif, system-ui, "Segoe UI", sans-serif !important; letter-spacing: 0.02em !important; }
.mermaid-block .mermaid-output svg .edgeLabel .label text,
.mermaid-block .mermaid-output svg .edgeLabel text { fill: #0f172a !important; font-size: 11px !important; font-weight: 600 !important; font-family: ui-sans-serif, system-ui, "Segoe UI", sans-serif !important; letter-spacing: 0.02em !important; }
.mermaid-block .mermaid-output svg .edgeLabel foreignObject body { padding: 2px 6px !important; background: #fefce8 !important; border: 2px solid #854d0e !important; border-radius: 6px !important; font-size: 11px !important; font-weight: 600 !important; font-family: ui-sans-serif, system-ui, "Segoe UI", sans-serif !important; color: #0f172a !important; line-height: 1 !important; letter-spacing: 0.02em !important; box-shadow: 0 1px 2px rgba(0,0,0,0.08) !important; min-width: 0 !important; min-height: 0 !important; display: inline-block !important; white-space: nowrap !important; }
</style>
