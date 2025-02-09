import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { createFeatureField, featureSchemas } from '../shared/base-field'
import { feature1Mock } from './mock'

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
      fieldOverrides: {
        title: {
          defaultValue: feature1Mock.title,
        },
        description: {
          defaultValue: feature1Mock.description,
        },
        icon: {
          defaultValue: feature1Mock.icon,
        },
      },
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
                  label: feature1Mock['link-1'].label,
                  prefixIcon: feature1Mock['link-1'].prefixIcon,
                  appearance: feature1Mock['link-1'].appearance,
                },
              },
            }),
            link({
              name: 'link-2',
              overrides: {
                admin: {
                  description: 'Secondary link',
                },
                defaultValue: {
                  label: feature1Mock['link-2'].label,
                  appearance: feature1Mock['link-2'].appearance,
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
