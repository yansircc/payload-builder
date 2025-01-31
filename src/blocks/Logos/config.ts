import { Block } from 'payload'
import { logos1Fields } from './components/Logos1/config'

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
      ],
    },
    {
      ...logos1Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'logos-1',
      },
    },
  ],
}
