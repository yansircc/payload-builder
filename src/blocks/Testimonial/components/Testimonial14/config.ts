import { ArrayField, Field, GroupField } from 'payload'
import { testimonialSchemas } from '../shared/base-field'

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
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          admin: {
            description: 'Rating out of 5 stars',
          },
        } as Field,
      ],
      minRows: 1,
      maxRows: 10,
      admin: {
        description: 'Testimonial items (1-10)',
      },
    } as ArrayField,
  ],
}
