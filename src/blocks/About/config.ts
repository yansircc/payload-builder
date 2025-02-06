import type { Block } from 'payload'
import { about1Fields } from './components/About1/config'
import { about2Fields } from './components/About2/config'
import { about3Fields } from './components/About3/config'
import { about4Fields } from './components/About4/config'
import { about5Fields } from './components/About5/config'

export const AboutBlock: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  labels: {
    singular: 'About',
    plural: 'About',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'about-1',
      options: [
        {
          label: 'About 1',
          value: 'about-1',
        },
        {
          label: 'About 2',
          value: 'about-2',
        },
        {
          label: 'About 3',
          value: 'about-3',
        },
        {
          label: 'About 4',
          value: 'about-4',
        },
        {
          label: 'About 5',
          value: 'about-5',
        },
      ],
    },
    {
      ...about1Fields,
      admin: {
        condition: (_, siblingData) => siblingData?.style === 'about-1',
      },
    },
    {
      ...about2Fields,
      admin: {
        condition: (_, siblingData) => siblingData?.style === 'about-2',
      },
    },
    {
      ...about3Fields,
      admin: {
        condition: (_, siblingData) => siblingData?.style === 'about-3',
      },
    },
    {
      ...about4Fields,
      admin: {
        condition: (_, siblingData) => siblingData?.style === 'about-4',
      },
    },
    {
      ...about5Fields,
      admin: {
        condition: (_, siblingData) => siblingData?.style === 'about-5',
      },
    },
  ],
}
