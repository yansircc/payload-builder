import { Field, GroupField } from 'payload'
import { testimonialSchemas } from '../shared/base-field'

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
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Featured image displayed in the left column',
      },
    } as Field,
    {
      type: 'array',
      name: 'testimonials',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Testimonial quote text',
          },
        } as Field,
        {
          name: 'authorName',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the testimonial author',
          },
        } as Field,
        {
          name: 'authorRole',
          type: 'text',
          admin: {
            description: 'Role/position of the author',
          },
        } as Field,
        {
          name: 'authorImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Author profile image',
          },
        } as Field,
      ],
      minRows: 4,
      maxRows: 4,
      admin: {
        description: 'Testimonial items (exactly 4 required - 1 featured + 3 grid)',
      },
    } as Field,
  ],
}
