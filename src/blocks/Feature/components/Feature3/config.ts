import { GroupField } from 'payload'
import { z } from 'zod'

import {
  cardsFields,
  createFeatureField,
  featureSchemas,
} from '../shared/base-field'

/**
 * Feature 3 field validation and type definitions
 */
export const schemas = {
  title: featureSchemas.title,
  features: z.object({
    title: z.string(),
    card: z.array(featureSchemas.card),
  }),
}

/**
 * Feature 3 configuration
 *
 * This feature includes:
 * - Main title
 * - Grid of feature cards, each with:
 *   - Optional icon
 *   - Title and description
 *   - Optional image
 */
export const feature3Fields: GroupField = {
  name: 'feature-3',
  interfaceName: 'Feature3Fields',
  label: false,
  type: 'group',
  admin: {
    description:
      'Feature section with 6 cards showing icon, title, description and optional image',
  },
  fields: [
    createFeatureField({
      includeFields: ['title'],
      arrays: [
        {
          name: 'features',
          fields: [
            cardsFields.icon,
            cardsFields.title,
            cardsFields.description,
            cardsFields.image,
          ],
          minRows: 1,
          maxRows: 6,
          admin: {
            description: 'Feature cards',
          },
        },
      ],
    }),
  ],
}
