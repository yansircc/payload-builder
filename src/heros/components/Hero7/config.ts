import { GroupField } from 'payload'
import { z } from 'zod'
import { baseSchemas, heroBase } from '../shared/base-field'

/**
 * Hero 7 field validation and type definitions
 */
export const schemas = {
  ...baseSchemas,
  rate: z.array(
    z.object({
      avatars: z.array(z.string().describe('The link to the avatar')),
      rate: z.number().describe('The rating of the avatar'),
      count: z.number().describe('The number of people who rated the avatar'),
    }),
  ),
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
    {
      name: 'hero',
      type: 'group',
      label: false,
      fields: [
        heroBase,
        {
          name: 'rate',
          type: 'group',
          fields: [
            {
              name: 'avatars',
              type: 'array',
              fields: [
                {
                  name: 'avatar',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'The avatar image',
                  },
                },
              ],
            },
            {
              name: 'rate',
              type: 'number',
              admin: {
                description: 'The rating of the avatar',
              },
            },
            {
              name: 'count',
              type: 'number',
              admin: {
                description: 'The number of people who rated the avatar',
              },
            },
          ],
        },
      ],
      admin: {
        description: 'The hero cards',
      },
    },
  ],
}
