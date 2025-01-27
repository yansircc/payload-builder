import { GroupField } from 'payload'
import { createFeatureField, featureSchemas, listFields } from '../shared/base-field'

/**
 * Feature 6 field validation and type definitions
 */
export const schemas = {
  title: featureSchemas.title,
  description: featureSchemas.description,
  icon: featureSchemas.icon,
  image: featureSchemas.image,
  features: featureSchemas.list.min(1).max(6),
}

/**
 * Feature 6 configuration
 *
 * This feature includes:
 * - Icon with accent background
 * - Title and description
 * - List of features with icons
 * - Feature image
 */
export const feature6Fields: GroupField = {
  name: 'feature-6',
  interfaceName: 'Feature6Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Feature with image on the right and feature list',
  },
  fields: [
    createFeatureField({
      includeFields: ['title', 'description', 'icon', 'image'],
      arrays: [
        {
          name: 'features',
          fields: Object.values(listFields),
          admin: {
            description: 'List of features with icons',
          },
          minRows: 1,
          maxRows: 6,
        },
      ],
    }),
  ],
}
