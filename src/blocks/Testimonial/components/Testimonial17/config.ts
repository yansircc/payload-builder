import { Field, GroupField } from 'payload'
import { z } from 'zod'
import { basicFields, testimonialSchemas } from '../shared/base-field'

/**
 * Testimonial 17 field validation and type definitions
 */
export const schemas = {
  heading: z.string().describe('Main heading text'),
  testimonials: z.array(
    z.object({
      logo: z.any().describe('Company logo image'),
      logoAlt: z.string().describe('Alternative text for company logo'),
      quote: testimonialSchemas.quote,
      authorName: testimonialSchemas.authorName,
      authorRole: testimonialSchemas.authorRole,
      authorImage: testimonialSchemas.authorImage,
    }),
  ),
}

/**
 * Complete configuration for Testimonial 17
 */
export const testimonial17Fields: GroupField = {
  name: 'testimonial-17',
  interfaceName: 'Testimonial17Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Responsive testimonial grid with company logos and carousel for mobile',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Teams are thriving with our platform',
      admin: {
        description: 'Main heading text',
      },
    } as Field,
    {
      type: 'array',
      name: 'testimonials',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Company logo image',
          },
        } as Field,
        {
          name: 'logoAlt',
          type: 'text',
          required: true,
          admin: {
            description: 'Alternative text for company logo',
          },
        } as Field,
        basicFields.quote,
        basicFields.authorName,
        basicFields.authorRole,
        basicFields.authorImage,
      ],
      minRows: 3,
      maxRows: 3,
      admin: {
        description: 'Testimonial items (exactly 3 required)',
      },
    } as Field,
  ],
}
