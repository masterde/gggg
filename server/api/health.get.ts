// Deep diagnostic: try importing and calling the store route handler directly
// This will show whether the MODULE LOADING or the HANDLER EXECUTION fails
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const checks = {} as Record<string, any>
  checks.handler = 'ok'
  checks.hasAdapter = !!(event.context as any)._commerceAdapter

  // 1. Direct adapter call (we know this works)
  if ((event.context as any)._commerceAdapter) {
    try {
      const result = await (event.context as any)._commerceAdapter.getStoreInfo()
      checks.directCall = result?.name ? 'ok' : 'empty'
    } catch (e: any) {
      checks.directCallError = { message: e.message, stack: e.stack?.split('\n').slice(0, 5) }
    }
  }

  // 2. Try to dynamically import the handler module
  try {
    const mod = await import('@commercejs/nuxt/dist/runtime/server/utils/handler')
    checks.handlerImport = Object.keys(mod)
  } catch (e: any) {
    checks.handlerImportError = { message: e.message, stack: e.stack?.split('\n').slice(0, 5) }
  }

  // 3. Try to import the actual store route handler
  try {
    const mod = await import('@commercejs/nuxt/dist/runtime/server/api/_commerce/store.get')
    checks.storeRouteImport = typeof mod.default
  } catch (e: any) {
    checks.storeRouteImportError = { message: e.message, stack: e.stack?.split('\n').slice(0, 5) }
  }

  // 4. Try to call defineCommerceHandler directly
  try {
    const { defineCommerceHandler } = await import('@commercejs/nuxt/dist/runtime/server/utils/handler')
    checks.defineCommerceHandlerType = typeof defineCommerceHandler
  } catch (e: any) {
    checks.defineCommerceHandlerError = { message: e.message, stack: e.stack?.split('\n').slice(0, 5) }
  }

  // 5. Try to import the adapter utils
  try {
    const mod = await import('@commercejs/nuxt/dist/runtime/server/utils/adapter')
    checks.adapterUtilImport = Object.keys(mod)
  } catch (e: any) {
    checks.adapterUtilError = { message: e.message, stack: e.stack?.split('\n').slice(0, 5) }
  }

  return checks
})
