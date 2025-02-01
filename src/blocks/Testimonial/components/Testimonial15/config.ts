import { Field, GroupField } from 'payload'
import { basicFields, createTestimonialField, testimonialSchemas } from '../shared/base-field'

/**
 * Testimonial 15 field validation and type definitions
 */
export const schemas = {
  authorName: testimonialSchemas.authorName,
  authorImage: testimonialSchemas.authorImage,
  quote: testimonialSchemas.quote,
}

// Additional fields specific to Testimonial15
const companyLogoFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Company logo image',
    },
  },
  {
    name: 'altText',
    type: 'text',
    admin: {
      description: 'Alternative text for the logo image',
    },
  },
]

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
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Join a global network of thought leaders, product developers, and innovators to exchange ideas, learn from each other, and participate in unique events and discussions.',
      admin: {
        description: 'Description text below the title',
      },
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Become a Member',
      admin: {
        description: 'Text for the call-to-action button',
      },
    },
    {
      name: 'buttonLink',
      type: 'text',
      defaultValue: '#',
      admin: {
        description: 'Link for the call-to-action button',
      },
    },
    {
      type: 'array',
      name: 'companyLogos',
      fields: companyLogoFields,
      minRows: 1,
      maxRows: 5,
      admin: {
        description: 'Company logos (1-5)',
      },
    },
    ...createTestimonialField({
      arrays: [
        {
          name: 'testimonials',
          fields: [basicFields.quote, basicFields.authorName, basicFields.authorImage],
          minRows: 4,
          maxRows: 4,
          admin: {
            description: 'Testimonial items (exactly 4 required)',
          },
        },
      ],
    }).fields,
  ],
}
