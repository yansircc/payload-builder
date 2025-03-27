import type { Payload } from 'payload'

export async function seedProducts({
  payload,
  images,
  demoAuthor,
  categories,
  tenant,
}: {
  payload: Payload
  images: Record<string, string>
  demoAuthor: { id: string }
  categories: {
    'product-technology': { id: string }
    design: { id: string }
  }
  tenant: { id: string }
}) {
  // Create sample products
  const [product1, product2, product3] = await Promise.all([
    payload.create({
      collection: 'products',
      data: {
        title: 'Premium Ergonomic Chair',
        publishedAt: new Date().toISOString(),
        _status: 'published',
        authors: [demoAuthor.id],
        description: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Experience ultimate comfort with our premium ergonomic office chair.',
                    version: 1,
                  },
                ],
              },
            ],
            direction: null,
          },
        },
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Experience ultimate comfort with our premium ergonomic office chair, designed for professionals who spend long hours at their desk.',
                    version: 1,
                  },
                ],
              },
            ],
            direction: null,
          },
        },
        meta: {
          title: 'Premium Ergonomic Chair - Ultimate Comfort for Professionals',
          description:
            'Experience the perfect blend of comfort and support with our premium ergonomic office chair.',
          image: images.image1,
        },
        categories: [categories.design.id],
        tenant: tenant.id,
        structuredData: {
          type: 'Product' as const,
          disableGlobalSchema: false,
          extractFAQs: true,
        },
      },
    }),
    payload.create({
      collection: 'products',
      data: {
        title: 'Smart Standing Desk',
        publishedAt: new Date().toISOString(),
        _status: 'published',
        authors: [demoAuthor.id],
        description: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Transform your workspace with our intelligent standing desk.',
                    version: 1,
                  },
                ],
              },
            ],
            direction: null,
          },
        },
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Transform your workspace with our intelligent standing desk, featuring automated height adjustment and built-in health reminders.',
                    version: 1,
                  },
                ],
              },
            ],
            direction: null,
          },
        },
        meta: {
          title: 'Smart Standing Desk - The Future of Workspaces',
          description: 'Elevate your work experience with our innovative smart standing desk.',
          image: images.image2,
        },
        categories: [categories['product-technology'].id],
        tenant: tenant.id,
        structuredData: {
          type: 'Product' as const,
          disableGlobalSchema: false,
          extractFAQs: true,
        },
      },
    }),
    payload.create({
      collection: 'products',
      data: {
        title: 'Productivity Monitor',
        publishedAt: new Date().toISOString(),
        _status: 'published',
        authors: [demoAuthor.id],
        description: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Boost your productivity with our ultra-wide curved monitor.',
                    version: 1,
                  },
                ],
              },
            ],
            direction: null,
          },
        },
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Boost your productivity with our ultra-wide curved monitor, designed for multitasking professionals.',
                    version: 1,
                  },
                ],
              },
            ],
            direction: null,
          },
        },
        meta: {
          title: 'Productivity Monitor - Enhanced Visual Experience',
          description:
            'Experience superior clarity and productivity with our professional-grade monitor.',
          image: images.image3,
        },
        categories: [categories['product-technology'].id],
        tenant: tenant.id,
        structuredData: {
          type: 'Product' as const,
          disableGlobalSchema: false,
          extractFAQs: true,
        },
      },
    }),
  ])

  return { product1, product2, product3 }
}
