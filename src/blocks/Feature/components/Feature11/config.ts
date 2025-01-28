import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createFeatureField, featureSchemas, listFields } from '../shared/base-field'

/**
 * Feature 11 field validation and type definitions
 */
export const schemas = {
  title: featureSchemas.title,
  description: featureSchemas.description,
  icon: featureSchemas.icon,
  image: featureSchemas.image,
  links: z.array(featureSchemas.link).min(2).max(2),
  features: featureSchemas.list.min(1).max(6),
}

/**
 * Feature 11 configuration
 *
 * This feature includes:
 * - Icon with accent background
 * - Title and description
 * - Two links (primary and secondary)
 * - Feature image
 */
export const feature11Fields: GroupField = {
  name: 'feature-11',
  interfaceName: 'Feature11Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Feature with image on the right',
  },
  fields: [
    createFeatureField({
      includeFields: ['title', 'description', 'image'],
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
                  prefixIcon: 'ArrowRight',
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
