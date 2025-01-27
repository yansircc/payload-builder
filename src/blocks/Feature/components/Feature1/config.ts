import { createFeatureField } from '../shared/base-field'

/**
 * Feature 1 configuration
 *
 * This feature includes:
 * - Icon with accent background
 * - Title and description
 * - Two buttons (primary and secondary)
 * - Feature image
 */
export const feature1Fields = createFeatureField({
  includeFields: ['title', 'description', 'icon', 'image'],
  groups: [
    {
      name: 'buttons',
      fields: ['primaryButton', 'secondaryButton'],
      admin: {
        description: 'Feature buttons configuration',
      },
    },
  ],
})
