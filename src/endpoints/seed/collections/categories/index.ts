import type { Payload } from 'payload'

export async function seedCategories({
  payload,
  tenant,
}: {
  payload: Payload
  tenant: { id: string }
}) {
  const [technologyCategory, newsCategory, financeCategory, designCategory, softwareCategory] =
    await Promise.all([
      payload.create({
        collection: 'categories',
        data: {
          title: 'Technology',
          breadcrumbs: [{ label: 'Technology', url: '/technology' }],
          tenant: tenant.id,
        },
      }),

      payload.create({
        collection: 'categories',
        data: { title: 'News', breadcrumbs: [{ label: 'News', url: '/news' }], tenant: tenant.id },
      }),

      payload.create({
        collection: 'categories',
        data: {
          title: 'Finance',
          breadcrumbs: [{ label: 'Finance', url: '/finance' }],
          tenant: tenant.id,
        },
      }),
      payload.create({
        collection: 'categories',
        data: {
          title: 'Design',
          breadcrumbs: [{ label: 'Design', url: '/design' }],
          tenant: tenant.id,
        },
      }),

      payload.create({
        collection: 'categories',
        data: {
          title: 'Software',
          breadcrumbs: [{ label: 'Software', url: '/software' }],
          tenant: tenant.id,
        },
      }),
    ])

  return {
    technology: technologyCategory,
    news: newsCategory,
    finance: financeCategory,
    design: designCategory,
    software: softwareCategory,
  }
}
