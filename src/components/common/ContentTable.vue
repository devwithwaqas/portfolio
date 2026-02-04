<template>
  <div class="content-table-wrapper">
    <table class="content-table">
      <thead>
        <tr>
          <th v-for="(h, i) in headers" :key="i">{{ h }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in normalizedRows" :key="rowIndex">
          <td v-for="(cell, colIndex) in row" :key="colIndex">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/**
 * Reusable content table: styling only, no animations.
 * Use in article-like content, service pages, or anywhere a simple data table is needed.
 * @param {string[]} headers - Column headers
 * @param {Array<string[]|Record<string, string>>} rows - Rows: array of arrays (same order as headers) or array of objects (keys = header text or use headerKeys)
 * @param {string[]} [headerKeys] - If rows are objects, keys to read per column (same order as headers). If omitted, headers are lowercased and spaces replaced with underscores.
 */
export default {
  name: 'ContentTable',
  props: {
    headers: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      default: () => []
    },
    headerKeys: {
      type: Array,
      default: undefined
    }
  },
  computed: {
    normalizedRows() {
      const keys = this.headerKeys || this.headers.map(h =>
        String(h).toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '')
      )
      return this.rows.map(row => {
        if (Array.isArray(row)) return row
        return keys.map(k => row[k] ?? '')
      })
    }
  }
}
</script>

<style scoped>
.content-table-wrapper {
  width: 100%;
  margin: 1.5rem 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.content-table {
  width: 100%;
  min-width: min(100%, 480px);
  border-collapse: collapse;
  font-size: var(--pf-text-base, 1rem);
  background: #fff;
  border: 1px solid rgba(79, 70, 229, 0.35);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(79, 70, 229, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06);
}
.content-table thead {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%);
  border-bottom: none;
}
.content-table th {
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
.content-table th:first-child,
.content-table td:first-child {
  min-width: 8rem;
}
.content-table th:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}
.content-table td {
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
.content-table td:last-child {
  border-right: none;
}
.content-table tbody tr:last-child td {
  border-bottom: none;
}
.content-table tbody tr:nth-child(odd) td {
  background: #fafafa;
}
.content-table tbody tr:nth-child(even) td {
  background: rgba(79, 70, 229, 0.04);
}
.content-table tbody tr:hover td {
  background: rgba(99, 102, 241, 0.08);
}
.content-table tbody tr:nth-child(even):hover td {
  background: rgba(99, 102, 241, 0.12);
}
</style>
