import { GroupField } from 'payload'
import { basicFields, createTestimonialField, testimonialSchemas } from '../shared/base-field'

/**
 * Testimonial 14 field validation and type definitions
 */
export const schemas = {
  authorName: testimonialSchemas.authorName,
  authorRole: testimonialSchemas.authorRole,
  authorImage: testimonialSchemas.authorImage,
  quote: testimonialSchemas.quote,
  rating: testimonialSchemas.rating,
}

/**
 * Complete configuration for Testimonial 14
 */
export const testimonial14Fields: GroupField = {
  name: 'testimonial-14',
  interfaceName: 'Testimonial14Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'A carousel testimonial component with avatar, rating, and navigation dots',
  },
  fields: [
    {
      name: 'hideAuthorImages',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Hide author images',
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
            basicFields.rating,
          ],
          minRows: 1,
          maxRows: 10,
          required: true,
          admin: {
            description: 'Testimonial items (1-10)',
          },
        },
      ],
    }).fields,
  ],
}
