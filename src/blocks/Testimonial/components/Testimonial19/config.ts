import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'

import {
  basicFields,
  createTestimonialField,
  testimonialSchemas,
} from '../shared/base-field'

/**
 * Testimonial 19 field validation and type definitions
 */
export const schemas = {
  heading: z.string().describe('Main heading text'),
  subheading: z.string().describe('Subheading text'),
  statsText: z
    .string()
    .describe('Stats text (e.g. "Rated 5 stars by 1000+ clients")'),
  authorName: testimonialSchemas.authorName,
  authorRole: testimonialSchemas.authorRole,
  authorImage: testimonialSchemas.authorImage,
  quote: testimonialSchemas.quote,
  rating: testimonialSchemas.rating,
}

/**
 * Complete configuration for Testimonial 19
 */
export const testimonial19Fields: GroupField = {
  name: 'testimonial-19',
  interfaceName: 'Testimonial19Fields',
  label: false,
  type: 'group',
  admin: {
    description:
      'Auto-scrolling carousel testimonial component with rating display',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Meet our happy clients',
      admin: {
        description: 'Main heading text',
      },
    },
    {
      name: 'subheading',
      type: 'text',
      defaultValue:
        'Join a global network of thought leaders, product developers,',
      admin: {
        description: 'Subheading text',
      },
    },
    {
      name: 'statsText',
      type: 'text',
      defaultValue: 'Rated 5 stars by 1000+ clients',
      admin: {
        description: 'Stats text shown with icon',
      },
    },
    link({
      name: 'viewAll',
      overrides: {
        admin: {
          description: 'View all testimonials link',
        },
        defaultValue: {
          label: 'View all testimonials',
          suffixIcon: 'ChevronRight',
          appearance: 'link',
        },
      },
    }),
    ...createTestimonialField({
      arrays: [
        {
          name: 'testimonials',
          fields: [
            basicFields.quote,
            basicFields.authorName,
            basicFields.authorRole,
            basicFields.authorImage,
            basicFields.rating,
          ],
          minRows: 3,
          maxRows: 12,
          admin: {
            description: 'Testimonial items (3-12)',
          },
        },
      ],
    }).fields,
  ],
}
