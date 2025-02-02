import { GroupField } from 'payload'
import { z } from 'zod'
import { createTeamField, peopleFields, teamSchemas } from '../shared/base-field'

/**
 * Team 1 field validation and type definitions
 */
export const schemas = {
  title: teamSchemas.title,
  subtitle: teamSchemas.subtitle,
  people: z.object({
    members: z.array(teamSchemas.people),
  }),
}

/**
 * Team 1 configuration
 */
export const team1Fields: GroupField = {
  name: 'team-1',
  interfaceName: 'Team1Fields',
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
