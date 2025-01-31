import { Field, GroupField } from 'payload'
import { z } from 'zod'
import { basicFields, testimonialSchemas } from '../shared/base-field'

/**
 * Testimonial 18 field validation and type definitions
 */
export const schemas = {
  heading: z.string().describe('Main heading text'),
  subheading: z.string().describe('Subheading text'),
  statsText: z.string().describe('Stats text (e.g. "Rated 5 stars by 1000+ clients")'),
  quote: testimonialSchemas.quote,
  description: z.string().describe('Detailed testimonial description'),
  authorName: testimonialSchemas.authorName,
  authorRole: testimonialSchemas.authorRole,
  authorImage: testimonialSchemas.authorImage,
  rating: testimonialSchemas.rating,
}

/**
 * Complete configuration for Testimonial 18
 */
export const testimonial18Fields: GroupField = {
  name: 'testimonial-18',
  interfaceName: 'Testimonial18Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Single testimonial with header section and rating display',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Meet our happy clients',
      admin: {
        description: 'Main heading text',
      },
    } as Field,
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'Join a global network of thought leaders, product developers,',
      admin: {
        description: 'Subheading text',
      },
    } as Field,
    {
      name: 'statsText',
      type: 'text',
      defaultValue: 'Rated 5 stars by 1000+ clients',
      admin: {
        description: 'Stats text shown with icon',
      },
    } as Field,
    {
      name: 'testimonial',
      type: 'group',
      fields: [
        basicFields.quote,
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Detailed testimonial description',
          },
        } as Field,
        basicFields.authorName,
        basicFields.authorRole,
        basicFields.authorImage,
        basicFields.rating,
      ],
      admin: {
        description: 'Single testimonial content',
      },
    } as GroupField,
  ],
}
