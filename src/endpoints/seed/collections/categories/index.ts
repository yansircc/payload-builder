import type { Payload } from 'payload'

export async function seedCategories({
  payload,
  tenant,
}: {
  payload: Payload
  tenant: { id: string }
}) {
  // Post Categories
  const [newsCategory, technologyCategory, financeCategory] = await Promise.all([
    payload.create({
      collection: 'categories',
      data: {
        title: 'News',
        type: 'post',
        tenant: tenant.id,
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Technology',
        type: 'post',
        tenant: tenant.id,
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Finance',
        type: 'post',
        tenant: tenant.id,
      },
    }),
  ])

  // Product Categories
  const [productTechnologyCategory, designCategory] = await Promise.all([
    payload.create({
      collection: 'categories',
      data: {
        title: 'Technology',
        type: 'product',
        tenant: tenant.id,
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Design',
        type: 'product',
        tenant: tenant.id,
      },
    }),
  ])

  // Service Categories
  const [serviceTechnologyCategory, softwareCategory, serviceFinanceCategory] = await Promise.all([
    payload.create({
      collection: 'categories',
      data: {
        title: 'Technology',
        type: 'service',
        tenant: tenant.id,
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Software',
        type: 'service',
        tenant: tenant.id,
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Finance',
        type: 'service',
        tenant: tenant.id,
      },
    }),
  ])

  return {
    // Post Categories
    technology: technologyCategory,
    news: newsCategory,
    finance: financeCategory,

    // Product Categories (with different instances for product-specific categories)
    design: designCategory,
    'product-technology': productTechnologyCategory,

    // Service Categories (with different instances for service-specific categories)
    'service-technology': serviceTechnologyCategory,
    software: softwareCategory,
    'service-finance': serviceFinanceCategory,
  }
}
