/**
 * Vite plugin: log browser errors to a file during dev
 * POST /__dev-log-error with JSON body { context, message, stack, url }
 * Writes to dev-error-log.txt in project root (append).
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const LOG_PATH = path.resolve(__dirname, '..', 'dev-error-log.txt')

function ensureLog(msg) {
  const ts = `[${new Date().toISOString()}] `
  const line = msg.includes('\n') ? ts + msg.replace(/\n/g, '\n' + ts) + '\n' : ts + msg + '\n'
  try {
    fs.appendFileSync(LOG_PATH, line, 'utf-8')
  } catch (e) {
    console.error('[vite-dev-error-logger] Failed to write log:', e)
  }
}

export default function viteDevErrorLogger() {
  return {
    name: 'vite-dev-error-logger',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__dev-log-error', (req, res, next) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }))
          return
        }
        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', () => {
          try {
            const payload = JSON.parse(body || '{}')
            const { context, message, stack, url, timestamp } = payload
            const block = [
              '---',
              `context: ${context || 'unknown'}`,
              `message: ${message || ''}`,
              `url: ${url || ''}`,
              `timestamp: ${timestamp || new Date().toISOString()}`,
              stack ? `stack:\n${stack}` : '',
              ''
            ].filter(Boolean).join('\n')
            ensureLog(block)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch (e) {
            ensureLog(`logger parse error: ${e.message}\nraw: ${body}`)
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: String(e.message) }))
          }
        })
        req.on('error', (e) => {
          ensureLog(`request error: ${e.message}`)
          res.statusCode = 500
          res.end()
        })
      })
      ensureLog('--- dev-error-logger ready ---')
      console.log(`[vite-dev-error-logger] Errors → ${LOG_PATH}`)
      console.log('[vite-dev-error-logger] Run: Get-Content dev-error-log.txt -Wait  (PowerShell) or  tail -f dev-error-log.txt  (bash)')
    }
  }
}
