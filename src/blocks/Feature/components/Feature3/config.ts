import { GroupField } from 'payload'
import { z } from 'zod'
import { createFeatureField, featureSchemas, featuresFields } from '../shared/base-field'

/**
 * Feature 3 field validation and type definitions
 */
export const schemas = {
  title: featureSchemas.title,
  features: z.array(
    z.object({
      icon: featureSchemas.icon,
      title: featureSchemas.title,
      description: featureSchemas.description,
      image: featureSchemas.image,
    }),
  ),
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
    description: 'Feature section with 6 cards showing icon, title, description and optional image',
  },
  fields: [
    createFeatureField({
      includeFields: ['title'],
      arrays: [
        {
          name: 'features',
          fields: [
            featuresFields.icon,
            featuresFields.title,
            featuresFields.description,
            featuresFields.image,
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
