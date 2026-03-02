// Diagnostic health check v2 — tests adapter injection via event.context
import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const checks = {} as Record<string, any>

  // 1. Basic handler
  checks.handler = 'ok'

  // 2. Runtime config
  try {
    const config = useRuntimeConfig()
    checks.adapter = config.commerce?.adapter || 'not set'
    checks.databaseUrl = config.commerce?.databaseUrl ? 'set' : 'not set'
  } catch (e: any) {
    checks.runtimeConfig = 'error: ' + e.message
  }

  // 3. Check event.context for adapter
  checks.hasAdapter = !!(event.context as any)._commerceAdapter
  checks.hasInitError = !!(event.context as any)._commerceInitError
  if ((event.context as any)._commerceInitError) {
    const err = (event.context as any)._commerceInitError
    checks.initError = err.message || String(err)
    checks.initErrorStack = err.stack?.split('\n').slice(0, 5)
  }

  // 4. Try calling adapter.getStoreInfo()
  if ((event.context as any)._commerceAdapter) {
    try {
      const adapter = (event.context as any)._commerceAdapter
      const storeInfo = await adapter.getStoreInfo()
      checks.storeInfo = storeInfo || 'null/undefined'
    } catch (e: any) {
      checks.storeInfoError = e.message
      checks.storeInfoStack = e.stack?.split('\n').slice(0, 5)
    }
  }

  return checks
})
