// Simple health check — v6 
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const checks = {} as Record<string, any>
  checks.handler = 'ok'
  checks.hasAdapter = !!(event.context as any)._commerceAdapter

  // Direct adapter call
  if ((event.context as any)._commerceAdapter) {
    try {
      const adapter = (event.context as any)._commerceAdapter
      const result = await adapter.getStoreInfo()
      checks.directCall = result?.name ? 'ok' : 'empty'
    } catch (e: any) {
      checks.directCallError = e.message
    }
  }

  // Internal fetch with full error details
  try {
    const result = await $fetch('/api/_commerce/store')
    checks.internalFetch = 'ok'
    checks.storeName = (result as any)?.name
  } catch (e: any) {
    checks.fetchError = e.message
    checks.fetchStatusCode = e.statusCode
    // Try to get the actual cause
    if (e.data?.message) checks.fetchDataMessage = e.data.message
    if (e.data?.data) checks.fetchDataData = e.data.data
  }

  return checks
})
