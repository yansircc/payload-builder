import { GroupField } from 'payload'
import { z } from 'zod'
import { createTeamField, peopleFields, teamSchemas } from '../shared/base-field'

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
                {
                  name: 'link',
                  type: 'group',
                  fields: [
                    {
                      name: 'type',
                      type: 'text',
                      defaultValue: 'custom',
                    },
                    {
                      name: 'icon',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                    },
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'appearance',
                      type: 'select',
                      defaultValue: 'link',
                      options: [
                        { label: 'Link', value: 'link' },
                        { label: 'Button', value: 'default' },
                      ],
                    },
                  ],
                },
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
