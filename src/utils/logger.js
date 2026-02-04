/**
 * Logger Utility
 * - Dev: log/warn/error as usual.
 * - Prod: log/warn/info/debug silent; error goes through global handler (generic message only).
 */

import { handleError } from './errorHandler.js'

const isDev = import.meta.env.DEV

export const logger = {
  log: (...args) => { if (isDev) console.log(...args) },
  warn: (...args) => { if (isDev) console.warn(...args) },
  info: (...args) => { if (isDev) console.info(...args) },
  debug: (...args) => { if (isDev) console.debug(...args) },
  error: (...args) => {
    if (isDev) {
      console.error(...args)
    } else {
      const err = args[0] instanceof Error ? args[0] : new Error(String(args[0]))
      handleError(err, 'logger')
    }
  }
}

export default logger
