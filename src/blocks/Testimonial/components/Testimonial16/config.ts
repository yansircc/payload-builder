import { Field, GroupField } from 'payload'
import { z } from 'zod'
import { basicFields, createTestimonialField, testimonialSchemas } from '../shared/base-field'

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
      link: z.string().optional().describe('Optional link in the testimonial'),
      linkText: z.string().optional().describe('Optional link text'),
    }),
  ),
}

// Additional fields specific to tweet-style testimonials
const tweetFields: Field[] = [
  {
    name: 'tag',
    type: 'text',
    required: true,
    admin: {
      description: 'Social media tag/handle (e.g., @username)',
    },
  },
  {
    name: 'content',
    type: 'textarea',
    required: true,
    admin: {
      description: 'Full testimonial content',
    },
  },
  {
    name: 'link',
    type: 'text',
    admin: {
      description: 'Optional link in the testimonial',
    },
  },
  {
    name: 'linkText',
    type: 'text',
    admin: {
      description: 'Optional link text (e.g., @company)',
    },
  },
]

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
    },
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'See what others are saying',
      admin: {
        description: 'Subheading text',
      },
    },
    ...createTestimonialField({
      arrays: [
        {
          name: 'testimonials',
          fields: [basicFields.authorName, basicFields.authorImage, ...tweetFields],
          minRows: 3,
          maxRows: 12,
          admin: {
            description: 'Tweet-style testimonials (3-12)',
          },
        },
      ],
    }).fields,
  ],
}
