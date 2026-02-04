<template>
  <div ref="containerRef" class="kroki-block">
    <button
      type="button"
      class="kroki-copy-btn"
      aria-label="Copy diagram source"
      title="Copy diagram source"
      @click="copySource"
    >
      <i class="bi bi-clipboard"></i> Copy
    </button>
    <div ref="outputRef" class="kroki-output" v-show="rendered"></div>
    <div v-if="!rendered && !error" class="kroki-placeholder">Loading diagram…</div>
    <div v-else-if="error" class="kroki-error-block">
      <p class="kroki-error">Diagram could not be rendered.</p>
      <p v-if="errorMessage" class="kroki-error-detail">{{ errorMessage }}</p>
      <pre v-if="source" class="kroki-source-fallback">{{ source }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'

// Set VITE_KROKI_URL to your own Kroki instance (e.g. self-hosted) to avoid rate limits.
// Default: https://kroki.io (public; may rate-limit). Self-host: docker run -p8000:8000 -d yuzutech/kroki
const KROKI_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_KROKI_URL) || 'https://kroki.io'

export default {
  name: 'KrokiBlock',
  props: {
    source: {
      type: String,
      required: true
    },
    diagramType: {
      type: String,
      default: 'plantuml'
    }
  },
  setup(props) {
    const containerRef = ref(null)
    const outputRef = ref(null)
    const rendered = ref(false)
    const error = ref(false)
    const errorMessage = ref('')

    async function render() {
      if (!containerRef.value) return
      const raw = (props.source ?? '').trim()
      if (!raw) {
        error.value = true
        errorMessage.value = 'Diagram source is empty.'
        return
      }
      error.value = false
      errorMessage.value = ''
      try {
        const url = `${KROKI_URL}/${props.diagramType}/svg`
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: raw
        })
        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || `HTTP ${res.status}`)
        }
        const svg = await res.text()
        if (outputRef.value) {
          outputRef.value.innerHTML = svg
          rendered.value = true
          error.value = false
        }
      } catch (err) {
        error.value = true
        errorMessage.value = (err?.message || String(err)) || 'Unknown error'
      }
    }

    onMounted(() => { render() })
    watch(() => [props.source, props.diagramType], () => {
      rendered.value = false
      render()
    })

    function copySource() {
      if (!props.source || !navigator.clipboard?.writeText) return
      navigator.clipboard.writeText(props.source).then(() => {
        const btn = containerRef.value?.querySelector('.kroki-copy-btn')
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

    return {
      containerRef,
      outputRef,
      rendered,
      error,
      errorMessage,
      source: computed(() => props.source),
      copySource
    }
  }
}
</script>

<style scoped>
.kroki-block {
  position: relative;
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.98) 0%, rgba(243, 232, 255, 0.15) 50%, rgba(238, 242, 255, 0.2) 100%);
  border-radius: 16px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04);
}
.kroki-copy-btn {
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
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}
.kroki-copy-btn:hover {
  background: rgba(139, 92, 246, 0.12);
  color: #4c1d95;
  border-color: rgba(139, 92, 246, 0.5);
}
.kroki-copy-btn.copied {
  color: #059669;
  border-color: rgba(5, 150, 105, 0.5);
  background: rgba(5, 150, 105, 0.08);
}
.kroki-placeholder { color: #6b7280; font-size: 0.9rem; }
.kroki-output {
  overflow: visible;
  overflow-x: auto;
  min-height: 140px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.kroki-output :deep(svg) {
  max-width: 100%;
  height: auto;
  min-width: 200px;
  overflow: visible;
}
.kroki-error-block {
  padding: 1rem;
  background: rgba(239, 68, 68, 0.06);
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.kroki-error { color: #dc2626; font-size: 0.9rem; margin: 0 0 0.5rem 0; }
.kroki-error-detail { color: #b91c1c; font-size: 0.85rem; margin: 0 0 0.5rem 0; font-family: ui-monospace, monospace; }
.kroki-source-fallback {
  margin: 0;
  font-size: 0.8rem;
  white-space: pre-wrap;
  word-break: break-word;
  color: #374151;
  max-height: 200px;
  overflow: auto;
}
</style>
