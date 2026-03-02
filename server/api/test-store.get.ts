// Test defineCommerceHandler directly
export default defineCommerceHandler(async (_event, adapter) => {
  return { test: 'ok', storeInfo: await adapter.getStoreInfo() }
})
