import { GroupField } from 'payload'
import { z } from 'zod'
import { cardsFields, createFeatureField, featureSchemas } from '../shared/base-field'

/**
 * Feature 13 field validation and type definitions
 */
export const schemas = {
  title: featureSchemas.title,
  features: z.object({
    icon: featureSchemas.icon,
    title: featureSchemas.title,
    description: featureSchemas.description,
  }),
}

/**
 * Feature 13 configuration
 *
 * This feature includes:
 * - Main title
 * - Grid of feature cards, each with:
 *   - Optional icon
 *   - Title and description
 *   - Optional image
 */
export const feature13Fields: GroupField = {
  name: 'feature-13',
  interfaceName: 'Feature13Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Feature section with 2 cards showing icon, title, description and optional image',
  },
  fields: [
    createFeatureField({
      includeFields: ['title'],
      arrays: [
        {
          name: 'features',
          fields: [
            cardsFields.image,
            cardsFields.subtitle,
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
