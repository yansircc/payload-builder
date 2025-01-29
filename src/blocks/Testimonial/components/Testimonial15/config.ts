import { Field, GroupField } from 'payload'
import { testimonialSchemas } from '../shared/base-field'

/**
 * Testimonial 15 field validation and type definitions
 */
export const schemas = {
  authorName: testimonialSchemas.authorName,
  authorImage: testimonialSchemas.authorImage,
  quote: testimonialSchemas.quote,
}

/**
 * Complete configuration for Testimonial 15
 */
export const testimonial15Fields: GroupField = {
  name: 'testimonial-15',
  interfaceName: 'Testimonial15Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'A split layout testimonial component with company logos',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Explore the Innovators Community Today',
      admin: {
        description: 'Main title for the testimonial section',
      },
    } as Field,
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Join a global network of thought leaders, product developers, and innovators to exchange ideas, learn from each other, and participate in unique events and discussions.',
      admin: {
        description: 'Description text below the title',
      },
    } as Field,
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Become a Member',
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
      name: 'companyLogos',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Company logo image',
          },
        } as Field,
        {
          name: 'altText',
          type: 'text',
          admin: {
            description: 'Alternative text for the logo image',
          },
        } as Field,
      ],
      minRows: 1,
      maxRows: 5,
      admin: {
        description: 'Company logos (1-5)',
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
        description: 'Testimonial items (exactly 4 required)',
      },
    } as Field,
  ],
}
