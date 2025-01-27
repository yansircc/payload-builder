import type { Block } from 'payload'
import { cta10Fields } from './components/cta-10/config'
import { cta11Fields } from './components/cta-11/config'

/**
 * CallToAction block configuration
 */
export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  labels: {
    singular: 'Call to Action',
    plural: 'Call to Actions',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      admin: {
        description: 'Select a Call to Action style',
      },
      options: [
        {
          label: 'Style 10 - Side by Side',
          value: 'cta-10',
        },
        {
          label: 'Style 11 - Centered',
          value: 'cta-11',
        },
      ],
    },
    {
      ...cta10Fields,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'cta-10',
      },
    },
    {
      ...cta11Fields,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'cta-11',
      },
    },
  ],
}
