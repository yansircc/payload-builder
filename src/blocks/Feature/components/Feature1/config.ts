import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'

import { createFeatureField, featureSchemas } from '../shared/base-field'

/**
 * Feature 1 field validation and type definitions
 */
export const schemas = {
  title: featureSchemas.title,
  description: featureSchemas.description,
  icon: featureSchemas.icon,
  image: featureSchemas.image,
  links: z.array(featureSchemas.link).min(2).max(2),
}

/**
 * Feature 1 configuration
 *
 * This feature includes:
 * - Icon with accent background
 * - Title and description
 * - Two links (primary and secondary)
 * - Feature image
 */
export const feature1Fields: GroupField = {
  name: 'feature-1',
  interfaceName: 'Feature1Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Feature with image on the right',
  },
  fields: [
    createFeatureField({
      includeFields: ['title', 'description', 'icon', 'image'],
      arrays: [
        {
          name: 'links',
          fields: [
            link({
              name: 'link-1',
              overrides: {
                admin: {
                  description: 'Primary link with icon',
                },
                defaultValue: {
                  prefixIcon: 'Play',
                },
              },
            }),
            link({
              name: 'link-2',
              overrides: {
                admin: {
                  description: 'Secondary link',
                },
              },
            }),
          ],
          admin: {
            description: 'Feature links',
          },
          minRows: 1,
          maxRows: 1,
        },
      ],
    }),
  ],
}
