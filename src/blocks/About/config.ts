import type { Block } from 'payload'
import { about1Fields } from './components/About1/config'

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
      ],
    },
    {
      ...about1Fields,
      admin: {
        condition: (_, siblingData) => siblingData?.style === 'about-1',
      },
    },
  ],
}
