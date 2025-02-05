import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createHeroField, heroSchemas } from '../shared/base-field'

/**
 * Hero47 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
  description: z.string().describe('Detailed description text'),
  image: heroSchemas.image,
  links: z.array(heroSchemas.link).length(2),
}

/**
 * Complete configuration for Hero47
 */
export const hero47Fields: GroupField = {
  name: 'hero-47',
  interfaceName: 'Hero47Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero section with title, subtitle, description, image, and two buttons',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'subtitle', 'description', 'image'],
      arrays: [
        {
          name: 'links',
          fields: [
            link({
              name: 'link-1',
              overrides: {
                admin: {
                  description: 'Primary hero button with ArrowUpRight prefix icon',
                },
                defaultValue: {
                  prefixIcon: 'ArrowUpRight',
                  appearance: 'default',
                  type: 'custom',
                  newTab: true,
                },
              },
            }),
            link({
              name: 'link-2',
              overrides: {
                admin: {
                  description: 'Secondary hero button with link style',
                },
                defaultValue: {
                  appearance: 'link',
                  type: 'reference',
                  className: 'underline',
                  newTab: true,
                },
              },
            }),
          ],
          minRows: 1,
          maxRows: 1,
          admin: {
            description: 'Hero buttons (primary and secondary)',
          },
        },
      ],
    }),
  ],
}
