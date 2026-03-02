// Diagnostic health check v4 — captures actual _commerce route error
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const checks = {} as Record<string, any>
  checks.handler = 'ok'
  checks.hasAdapter = !!(event.context as any)._commerceAdapter

  // Direct adapter call works:
  if ((event.context as any)._commerceAdapter) {
    try {
      const adapter = (event.context as any)._commerceAdapter
      const result = await adapter.getStoreInfo()
      checks.directCall = result?.name ? 'ok' : 'empty'
    } catch (e: any) {
      checks.directCallError = e.message
    }
  }

  // Internal fetch to _commerce/store — capture the FULL error
  try {
    const result = await $fetch('/api/_commerce/store')
    checks.internalFetch = result
  } catch (e: any) {
    checks.fetchError = {
      message: e.message,
      statusCode: e.statusCode,
      statusMessage: e.statusMessage,
      data: e.data,
      cause: e.cause?.message || String(e.cause || ''),
    }
    // If there's a nested error
    if (e.response?._data) {
      checks.fetchResponseData = e.response._data
    }
  }

  return checks
})
