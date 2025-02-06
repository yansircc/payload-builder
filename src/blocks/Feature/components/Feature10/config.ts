import { GroupField } from 'payload'
import { z } from 'zod'

import {
  cardsFields,
  createFeatureField,
  featureSchemas,
} from '../shared/base-field'

/**
 * Feature 10 field validation and type definitions
 */
export const schemas = {
  title: featureSchemas.title,
  description: featureSchemas.description,
  features: z.object({
    icon: featureSchemas.icon,
    title: featureSchemas.title,
    description: featureSchemas.description,
  }),
}

/**
 * Feature 10 configuration
 *
 * This feature includes:
 * - Main title
 * - Grid of feature cards, each with:
 *   - Optional icon
 *   - Title and description
 *   - Optional image
 */
export const feature10Fields: GroupField = {
  name: 'feature-10',
  interfaceName: 'Feature10Fields',
  label: false,
  type: 'group',
  admin: {
    description:
      'Feature section with 4 cards showing icon, title, description and optional image',
  },
  fields: [
    createFeatureField({
      includeFields: ['title', 'description'],
      arrays: [
        {
          name: 'features',
          fields: [
            cardsFields.icon,
            cardsFields.title,
            cardsFields.description,
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
