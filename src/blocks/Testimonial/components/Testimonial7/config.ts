import { Field, GroupField } from 'payload'
import { testimonialSchemas } from '../shared/base-field'

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
    } as Field,
    {
      name: 'description',
      type: 'text',
      defaultValue: 'All of our 1000+ clients are happy',
      admin: {
        description: 'Description text below the title',
      },
    } as Field,
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Get started for free',
      admin: {
        description: 'Text for the call-to-action button',
      },
    } as Field,
    {
      name: 'buttonLink',
      type: 'text',
      defaultValue: '#',
      admin: {
        description: 'Link for the call-to-action button',
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
      maxRows: 12,
      admin: {
        description: 'Testimonial items (4-12)',
      },
    } as Field,
  ],
}
