// Diagnostic health check — tests each component
export default defineEventHandler(async () => {
  const checks = {}

  // 1. Basic handler works
  checks.handler = 'ok'

  // 2. Runtime config
  try {
    const config = useRuntimeConfig()
    checks.runtimeConfig = 'ok'
    checks.hasCommerceConfig = !!config.commerce
    checks.adapter = config.commerce?.adapter || 'not set'
    checks.databaseUrl = config.commerce?.databaseUrl ? 'set (length: ' + config.commerce.databaseUrl.length + ')' : 'not set'
  } catch (e) {
    checks.runtimeConfig = 'error: ' + e.message
  }

  // 3. Try importing @commercejs/platform
  try {
    const platform = await import('@commercejs/platform')
    checks.platformImport = 'ok'
    checks.platformKeys = Object.keys(platform).slice(0, 10)
  } catch (e) {
    checks.platformImport = 'error: ' + e.message
  }

  // 4. Try DB connection
  try {
    const platform = await import('@commercejs/platform')
    if (platform.getDrizzleDb) {
      const db = platform.getDrizzleDb()
      checks.dbInit = db ? 'ok' : 'not initialized'
    } else if (platform.getDb) {
      const db = platform.getDb()
      checks.dbInit = db ? 'ok' : 'not initialized'
    } else {
      checks.dbInit = 'no getDb/getDrizzleDb export found'
    }
  } catch (e) {
    checks.dbInit = 'error: ' + e.message
  }

  return checks
})
