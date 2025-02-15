import type { Payload } from 'payload'

export async function seedSiteSettings({
  payload,
  tenants,
}: {
  payload: Payload
  tenants: {
    tenant1: { id: string }
    tenant2: { id: string }
    tenant3: { id: string }
  }
}) {
  await Promise.all([
    payload.create({
      collection: 'site-settings',
      data: {
        title: 'Gold Tenant - Welcome to Our Site',
        description:
          'Premium features and services available with our Gold tenant subscription. Discover what sets us apart.',
        tenant: tenants.tenant1.id,
        searchEngineVisibility: { allowIndexing: true },
        archiveStyles: {
          posts: 'grid',
          products: 'grid',
          services: 'grid',
        },
      },
    }),
    payload.create({
      collection: 'site-settings',
      data: {
        title: 'Silver Tenant - Your Business Solution',
        description:
          'Powerful features and reliable services with our Silver tenant subscription. Perfect for growing businesses.',
        tenant: tenants.tenant2.id,
        searchEngineVisibility: { allowIndexing: true },
        archiveStyles: {
          posts: 'grid',
          products: 'grid',
          services: 'grid',
        },
      },
    }),
    payload.create({
      collection: 'site-settings',
      data: {
        title: 'Bronze Tenant - Get Started Today',
        description:
          'Essential features and great value with our Bronze tenant subscription. The perfect starting point for your journey.',
        tenant: tenants.tenant3.id,
        searchEngineVisibility: { allowIndexing: true },
        archiveStyles: {
          posts: 'grid',
          products: 'grid',
          services: 'grid',
        },
      },
    }),
  ])
}
