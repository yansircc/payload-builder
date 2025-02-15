import type { Payload } from 'payload'

export async function seedTenants({ payload }: { payload: Payload }) {
  // Create tenants
  const [tenant1, tenant2, tenant3] = await Promise.all([
    payload.create({
      collection: 'tenants',
      data: { name: 'Tenant 1', slug: 'gold', domain: 'gold.localhost.com', theme: 'modern' },
    }),
    payload.create({
      collection: 'tenants',
      data: { name: 'Tenant 2', slug: 'silver', domain: 'silver.localhost.com', theme: 'minimal' },
    }),
    payload.create({
      collection: 'tenants',
      data: { name: 'Tenant 3', slug: 'bronze', domain: 'bronze.localhost.com', theme: 'bold' },
    }),
  ])

  return {
    tenant1,
    tenant2,
    tenant3,
  }
}
