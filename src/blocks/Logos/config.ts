import { Block } from 'payload'
import { logos1Fields } from './components/Logos1/config'
import { logos2Fields } from './components/Logos2/config'
import { logos3Fields } from './components/Logos3/config'
import { logos8Fields } from './components/Logos8/config'

export const LogosBlock: Block = {
  slug: 'logos',
  interfaceName: 'LogosBlock',
  labels: {
    singular: 'Logos',
    plural: 'Logos',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'logos-1',
      options: [
        {
          label: 'Logos 1',
          value: 'logos-1',
        },
        {
          label: 'Logos 2',
          value: 'logos-2',
        },
        {
          label: 'Logos 3',
          value: 'logos-3',
        },
        {
          label: 'Logos 8',
          value: 'logos-8',
        },
      ],
    },
    {
      ...logos1Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'logos-1',
      },
    },
    {
      ...logos2Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'logos-2',
      },
    },
    {
      ...logos3Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'logos-3',
      },
    },
    {
      ...logos8Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'logos-8',
      },
    },
  ],
}
