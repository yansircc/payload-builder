import type { Block } from 'payload'

import { team1Fields } from './components/Team1/config'
import { team2Fields } from './components/Team2/config'
import { team3Fields } from './components/Team3/config'
import { team5Fields } from './components/Team5/config'
import { team6Fields } from './components/Team6/config'

/**
 * Team Block configuration
 */
export const Team: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  labels: {
    singular: 'Team',
    plural: 'Teams',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'team-1',
      options: [
        {
          label: 'Team 1',
          value: 'team-1',
        },
        {
          label: 'Team 2',
          value: 'team-2',
        },
        {
          label: 'Team 3',
          value: 'team-3',
        },
        {
          label: 'Team 5',
          value: 'team-5',
        },
        {
          label: 'Team 6',
          value: 'team-6',
        },
      ],
    },
    {
      ...team1Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'team-1',
      },
    },
    {
      ...team2Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'team-2',
      },
    },
    {
      ...team3Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'team-3',
      },
    },
    {
      ...team5Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'team-5',
      },
    },
    {
      ...team6Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'team-6',
      },
    },
  ],
}
