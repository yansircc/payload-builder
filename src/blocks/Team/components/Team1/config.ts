import { GroupField } from 'payload'
import { z } from 'zod'
import { createTeamField, peopleFields, teamSchemas } from '../shared/base-field'
import { team1Mock } from './mock'

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
      fieldOverrides: {
        title: {
          defaultValue: team1Mock.title,
        },
        subtitle: {
          defaultValue: team1Mock.subtitle,
        },
        description: {
          defaultValue: team1Mock.description,
        },
      },
      arrays: [
        {
          name: 'people',
          label: 'Team Members List',
          fields: [
            {
              ...peopleFields.name,
              defaultValue: team1Mock.people[0].name,
            },
            {
              ...peopleFields.role,
              defaultValue: team1Mock.people[0].role,
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
