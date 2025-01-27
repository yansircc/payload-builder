import type { Block, Field } from 'payload'
import { cta10Fields } from './components/cta-10/config'
import { cta11Fields } from './components/cta-11/config'
import { cta13Fields } from './components/cta-13/config'
import { cta4Fields } from './components/cta-4/config'

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
          label: 'Style 4 - Features List',
          value: 'cta-4',
        },
        {
          label: 'Style 10 - Side by Side',
          value: 'cta-10',
        },
        {
          label: 'Style 11 - Centered',
          value: 'cta-11',
        },
        {
          label: 'Style 13 - Email Subscription',
          value: 'cta-13',
        },
      ],
    },
    {
      name: 'cta-4',
      type: 'group',
      fields: (cta4Fields as { fields: Field[] }).fields,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'cta-4',
      },
    },
    {
      name: 'cta-10',
      type: 'group',
      fields: (cta10Fields as { fields: Field[] }).fields,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'cta-10',
      },
    },
    {
      name: 'cta-11',
      type: 'group',
      fields: (cta11Fields as { fields: Field[] }).fields,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'cta-11',
      },
    },
    {
      name: 'cta-13',
      type: 'group',
      fields: (cta13Fields as { fields: Field[] }).fields,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'cta-13',
      },
    },
  ],
}
