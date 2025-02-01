import { Field, GroupField } from 'payload'
import { z } from 'zod'
import { basicFields, testimonialSchemas } from '../shared/base-field'

/**
 * Testimonial 16 field validation and type definitions
 */
export const schemas = {
  heading: z.string().describe('Main heading text'),
  subheading: z.string().describe('Subheading text'),
  testimonials: z.array(
    z.object({
      author: testimonialSchemas.authorName,
      tag: z.string().describe('Social media tag/handle'),
      authorImage: testimonialSchemas.authorImage,
      content: z.string().describe('Full testimonial content'),
      excerpt: z.string().describe('Short excerpt of the testimonial'),
      link: z.string().optional().describe('Optional link in the testimonial'),
      linkText: z.string().optional().describe('Optional link text'),
    }),
  ),
}

/**
 * Complete configuration for Testimonial 16
 */
export const testimonial16Fields: GroupField = {
  name: 'testimonial-16',
  interfaceName: 'Testimonial16Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Tweet-style testimonials with expandable content',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: "Here's how our platform is making an impact",
      admin: {
        description: 'Main heading text',
      },
    } as Field,
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'See what others are saying',
      admin: {
        description: 'Subheading text',
      },
    } as Field,
    {
      type: 'array',
      name: 'testimonials',
      fields: [
        basicFields.authorName,
        {
          name: 'tag',
          type: 'text',
          required: true,
          admin: {
            description: 'Social media tag/handle (e.g., @username)',
          },
        } as Field,
        basicFields.authorImage,
        {
          name: 'content',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Full testimonial content',
          },
        } as Field,
        {
          name: 'excerpt',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Short excerpt of the testimonial (shown in collapsed view)',
          },
        } as Field,
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'Optional link in the testimonial',
          },
        } as Field,
        {
          name: 'linkText',
          type: 'text',
          admin: {
            description: 'Optional link text (e.g., @company)',
          },
        } as Field,
      ],
      minRows: 3,
      maxRows: 12,
      admin: {
        description: 'Tweet-style testimonials (3-12)',
      },
    } as Field,
  ],
}
