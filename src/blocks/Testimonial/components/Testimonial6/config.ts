import { GroupField } from 'payload'

import {
  basicFields,
  createTestimonialField,
  testimonialSchemas,
} from '../shared/base-field'

/**
 * Testimonial 6 field validation and type definitions
 */
export const schemas = {
  authorName: testimonialSchemas.authorName,
  authorRole: testimonialSchemas.authorRole,
  authorImage: testimonialSchemas.authorImage,
  quote: testimonialSchemas.quote,
}

/**
 * Complete configuration for Testimonial 6
 */
export const testimonial6Fields: GroupField = {
  name: 'testimonial-6',
  interfaceName: 'Testimonial6Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'A carousel testimonial component with navigation controls',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Why Clients Love Us',
      admin: {
        description: 'Main title for the testimonial section',
      },
    },
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
          minRows: 3,
          maxRows: 12,
          admin: {
            description: 'Testimonial items (3-12)',
          },
        },
      ],
    }).fields,
  ],
}
