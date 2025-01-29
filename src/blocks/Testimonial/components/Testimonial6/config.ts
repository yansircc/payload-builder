import { Field, GroupField } from 'payload'
import { testimonialSchemas } from '../shared/base-field'

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
      minRows: 3,
      maxRows: 12,
      admin: {
        description: 'Testimonial items (3-12)',
      },
    } as Field,
  ],
}
