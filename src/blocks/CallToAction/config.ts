import type { Block } from 'payload'

import { cta1Fields } from './components/CTA1/config'
import { cta3Fields } from './components/CTA3/config'

/**
 * Call to Action Block configuration
 */
export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  labels: {
    singular: 'Block',
    plural: 'Blocks',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      options: ['cta-1', 'cta-3'],
    },
    {
      ...cta1Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'cta-1',
      },
    },
    {
      ...cta3Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'cta-3',
      },
    },
  ],
}
