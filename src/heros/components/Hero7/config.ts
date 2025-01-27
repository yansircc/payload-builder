import { GroupField } from 'payload'
import { createHeroField, heroSchemas, ratingFields } from '../shared/base-field'

/**
 * Hero 7 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
  link: heroSchemas.link,
  rating: heroSchemas.rating,
}

/**
 * Complete configuration for Hero 7
 */
export const hero7Fields: GroupField = {
  name: 'hero-7',
  interfaceName: 'Hero7Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with a rating on the center',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'subtitle', 'link'],
      groups: [
        {
          name: 'rating',
          fields: ['rate', 'count'],
          arrays: [
            {
              name: 'avatars',
              fields: [ratingFields.avatar],
              minRows: 3,
              maxRows: 5,
              admin: {
                description: 'User avatars (3-5)',
              },
            },
          ],
          admin: {
            description: 'Rating information',
          },
        },
      ],
    }),
  ],
}
