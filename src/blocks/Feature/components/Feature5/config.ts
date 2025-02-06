import { GroupField } from 'payload'
import { z } from 'zod'

import {
  cardsFields,
  createFeatureField,
  featureSchemas,
} from '../shared/base-field'

/**
 * Feature 5 field validation and type definitions
 */
export const schemas = {
  testimonial: featureSchemas.testimonial,
  features: z.array(featureSchemas.card).length(2),
}

/**
 * Feature 5 configuration
 *
 * This feature includes:
 * - Grid of feature cards (first card is larger)
 * - Each card has:
 *   - Optional icon
 *   - Title and description
 *   - Optional image
 * - Testimonial section with:
 *   - Quote
 *   - Author name and role
 *   - Author image
 */
export const feature5Fields: GroupField = {
  name: 'feature-5',
  interfaceName: 'Feature5Fields',
  label: false,
  type: 'group',
  admin: {
    description:
      'Feature section with 2 cards (first one larger) and testimonial',
  },
  fields: [
    createFeatureField({
      includeFields: ['testimonial'],
      arrays: [
        {
          name: 'features',
          fields: [
            cardsFields.icon,
            cardsFields.title,
            cardsFields.description,
            cardsFields.image,
          ],
          minRows: 2,
          maxRows: 2,
          admin: {
            description: 'Feature cards (first card will be larger)',
          },
        },
      ],
      groups: [
        {
          name: 'testimonial',
          fields: ['quote', 'name', 'role', 'company', 'image'],
        },
      ],
    }),
  ],
}
