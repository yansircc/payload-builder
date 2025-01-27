import type { Block } from 'payload'
import { cta10Fields } from './components/cta-10/config'
import { cta11Fields } from './components/cta-11/config'

/**
 * CallToAction block configuration
 */
export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'cta-10',
      options: [
        {
          label: 'CTA 10',
          value: 'cta-10',
        },
        {
          label: 'CTA 11',
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
