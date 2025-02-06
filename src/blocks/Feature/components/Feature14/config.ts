import { GroupField } from 'payload'
import { z } from 'zod'

import {
  cardsFields,
  createFeatureField,
  featureSchemas,
  listFields,
} from '../shared/base-field'

/**
 * Feature 14 field validation and type definitions
 */
export const schemas = {
  features: z.object({
    icon: featureSchemas.icon,
    title: featureSchemas.title,
    description: featureSchemas.description,
    list: featureSchemas.list.min(1).max(6),
  }),
}

/**
 * Feature 14 configuration
 *
 * This feature includes:
 * - Main title
 * - Grid of feature cards, each with:
 *   - Optional icon
 *   - Title and description
 *   - Optional image
 *   - List of features with optional icons
 */
export const feature14Fields: GroupField = {
  name: 'feature-14',
  interfaceName: 'Feature14Fields',
  label: false,
  type: 'group',
  admin: {
    description:
      'Feature section with 2 cards showing icon, title, description and optional image',
  },
  fields: [
    createFeatureField({
      includeFields: ['title'],
      arrays: [
        {
          name: 'features',
          fields: [
            cardsFields.image,
            cardsFields.title,
            cardsFields.description,
            {
              name: 'list',
              type: 'array',
              fields: Object.values(listFields),
              minRows: 1,
              maxRows: 6,
              admin: {
                description: 'List of features with icons',
              },
            },
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
