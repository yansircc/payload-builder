import { GroupField } from 'payload'
import { basicFields, createTestimonialField, testimonialSchemas } from '../shared/base-field'

/**
 * Testimonial 4 field validation and type definitions
 */
export const schemas = {
  authorName: testimonialSchemas.authorName,
  authorRole: testimonialSchemas.authorRole,
  authorImage: testimonialSchemas.authorImage,
  quote: testimonialSchemas.quote,
}

/**
 * Complete configuration for Testimonial 4
 */
export const testimonial4Fields: GroupField = {
  name: 'testimonial-4',
  interfaceName: 'Testimonial4Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'A testimonial component with featured testimonial and grid layout',
  },
  fields: [
    {
      name: 'hideAuthorImages',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Hide author images and show default avatars instead',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Featured image displayed in the left column',
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
          required: true,
          minRows: 4,
          maxRows: 4,
          admin: {
            description: 'Testimonial items (exactly 4 required - 1 featured + 3 grid)',
          },
        },
      ],
    }).fields,
  ],
}
