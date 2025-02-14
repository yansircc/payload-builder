import type { Payload } from 'payload'

export async function seedTenants({ payload }: { payload: Payload }) {
  // Create tenants
  const [tenant1, tenant2, tenant3] = await Promise.all([
    payload.create({
      collection: 'tenants',
      data: { name: 'Tenant 1', slug: 'gold', domain: 'gold.localhost.com' },
    }),
    payload.create({
      collection: 'tenants',
      data: { name: 'Tenant 2', slug: 'silver', domain: 'silver.localhost.com' },
    }),
    payload.create({
      collection: 'tenants',
      data: { name: 'Tenant 3', slug: 'bronze', domain: 'bronze.localhost.com' },
    }),
  ])

  return {
    tenant1,
    tenant2,
    tenant3,
  }
}
