import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'

import {
  createTeamField,
  peopleFields,
  teamSchemas,
} from '../shared/base-field'

/**
 * Team 2 field validation and type definitions
 */
export const schemas = {
  title: teamSchemas.title,
  subtitle: teamSchemas.subtitle,
  people: z.object({
    members: z.array(teamSchemas.people),
  }),
}

/**
 * Team 2 configuration
 */
export const team2Fields: GroupField = {
  name: 'team-2',
  interfaceName: 'Team2Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Team section',
  },
  fields: [
    createTeamField({
      includeFields: ['title', 'subtitle', 'description'],
      arrays: [
        {
          name: 'people',
          label: 'Team Members List',
          fields: [
            ...Object.values(peopleFields),
            {
              name: 'links',
              type: 'array',
              label: 'Social Links',
              admin: {
                description: 'Member social links',
              },
              fields: [
                link({
                  name: 'link',
                  disableLabel: true,
                  overrides: {
                    admin: {
                      description: 'Link',
                    },
                    defaultValue: {
                      appearance: 'link',
                    },
                  },
                }),
              ],
              minRows: 0,
              maxRows: 3,
            },
          ],
          minRows: 1,
          admin: {
            description: 'Members',
          },
        },
      ],
    }),
  ],
}
