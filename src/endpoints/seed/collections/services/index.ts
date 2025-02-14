import type { Payload } from 'payload'

export async function seedServices({
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
    technology: { id: string }
    software: { id: string }
    finance: { id: string }
  }
  tenant: { id: string }
}) {
  // Create sample services
  const [service1, service2, service3] = await Promise.all([
    payload.create({
      collection: 'services',
      data: {
        title: 'Premium IT Support',
        publishedAt: new Date().toISOString(),
        _status: 'published',
        authors: [demoAuthor.id],
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
                    text: 'Comprehensive IT support service for businesses, including 24/7 monitoring, rapid response, and proactive maintenance.',
                    version: 1,
                  },
                ],
              },
            ],
            direction: null,
          },
        },
        meta: {
          title: 'Premium IT Support - 24/7 Business Technology Solutions',
          description:
            'Enterprise-grade IT support with guaranteed response times and comprehensive coverage.',
          image: images.image1,
        },
        categories: [categories.technology.id],
        tenant: tenant.id,
        specifications: [
          { name: 'Response Time', description: '15 minutes or less' },
          { name: 'Service Hours', description: '24/7/365' },
          { name: 'Coverage', description: 'Full infrastructure support' },
          { name: 'SLA Level', description: '99.9% uptime guaranteed' },
          { name: 'Team Size', description: 'Dedicated team of 5 specialists' },
        ],
      },
    }),
    payload.create({
      collection: 'services',
      data: {
        title: 'Cloud Migration Service',
        publishedAt: new Date().toISOString(),
        _status: 'published',
        authors: [demoAuthor.id],
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
                    text: 'Expert cloud migration service to seamlessly transition your infrastructure to leading cloud platforms.',
                    version: 1,
                  },
                ],
              },
            ],
            direction: null,
          },
        },
        meta: {
          title: 'Cloud Migration Service - Seamless Digital Transformation',
          description:
            'Professional cloud migration services with minimal downtime and maximum security.',
          image: images.image2,
        },
        categories: [categories.software.id],
        tenant: tenant.id,
        specifications: [
          { name: 'Migration Duration', description: '2-8 weeks based on complexity' },
          { name: 'Downtime Window', description: 'Less than 4 hours' },
          { name: 'Data Security', description: 'End-to-end encryption' },
          { name: 'Platforms', description: 'AWS, Azure, Google Cloud' },
          { name: 'Post-Migration', description: '3 months support included' },
        ],
      },
    }),
    payload.create({
      collection: 'services',
      data: {
        title: 'Digital Strategy Consulting',
        publishedAt: new Date().toISOString(),
        _status: 'published',
        authors: [demoAuthor.id],
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
                    text: 'Strategic digital transformation consulting to help businesses innovate and stay competitive.',
                    version: 1,
                  },
                ],
              },
            ],
            direction: null,
          },
        },
        meta: {
          title: 'Digital Strategy Consulting - Transform Your Business',
          description: 'Expert guidance for digital transformation and innovation strategies.',
          image: images.image3,
        },
        categories: [categories.finance.id],
        tenant: tenant.id,
        specifications: [
          { name: 'Engagement Length', description: '3-6 months' },
          { name: 'Deliverables', description: 'Strategy roadmap, implementation plan' },
          { name: 'Consultation Hours', description: '20 hours per month' },
          { name: 'Team Access', description: 'Senior strategist + 2 specialists' },
          { name: 'Review Cycles', description: 'Bi-weekly progress reviews' },
        ],
      },
    }),
  ])

  return { service1, service2, service3 }
}
