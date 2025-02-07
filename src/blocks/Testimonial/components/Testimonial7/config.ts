import { GroupField } from 'payload'
import { link } from '@/fields/link'
import { basicFields, createTestimonialField, testimonialSchemas } from '../shared/base-field'

/**
 * Testimonial 7 field validation and type definitions
 */
export const schemas = {
  authorName: testimonialSchemas.authorName,
  authorRole: testimonialSchemas.authorRole,
  authorImage: testimonialSchemas.authorImage,
  quote: testimonialSchemas.quote,
}

/**
 * Complete configuration for Testimonial 7
 */
export const testimonial7Fields: GroupField = {
  name: 'testimonial-7',
  interfaceName: 'Testimonial7Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'A dual-carousel testimonial component with auto-scroll',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Meet our happy clients',
      admin: {
        description: 'Main title for the testimonial section',
      },
    },
    {
      name: 'description',
      type: 'text',
      defaultValue: 'All of our 1000+ clients are happy',
      admin: {
        description: 'Description text below the title',
      },
    },
    link({
      name: 'cta',
      overrides: {
        admin: {
          description: 'Call-to-action button',
        },
        defaultValue: {
          label: 'Get started for free',
        },
      },
    }),
    ...createTestimonialField({
      arrays: [
        {
          name: 'testimonials',
          fields: [
            basicFields.quote,
            basicFields.authorName,
            basicFields.authorRole,
            basicFields.authorImage,
          ],
          minRows: 4,
          maxRows: 12,
          admin: {
            description: 'Testimonial items (4-12)',
          },
        },
      ],
    }).fields,
  ],
}
