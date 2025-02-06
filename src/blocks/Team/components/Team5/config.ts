import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'

import {
  createTeamField,
  peopleFields,
  teamSchemas,
} from '../shared/base-field'

/**
 * Team 5 field validation and type definitions
 */
export const schemas = {
  title: teamSchemas.title,
  subtitle: teamSchemas.subtitle,
  people: z.object({
    members: z.array(teamSchemas.people),
  }),
}

/**
 * Team 5 configuration
 */
export const team5Fields: GroupField = {
  name: 'team-5',
  interfaceName: 'Team5Fields',
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
          name: 'links',
          fields: [
            link({
              name: 'link',
              overrides: {
                admin: {
                  description: 'Link button',
                },
              },
            }),
          ],
          admin: {
            description: 'Links',
          },
          minRows: 1,
          maxRows: 2,
        },
        {
          name: 'people',
          label: 'Team Members List',
          fields: Object.values(peopleFields),
          minRows: 1,
          admin: {
            description: 'Members',
          },
        },
      ],
    }),
  ],
}
