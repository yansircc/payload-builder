import type { Block } from 'payload'

import { cta1Fields } from './components/CTA1/config'
import { cta3Fields } from './components/CTA3/config'
import { cta4Fields } from './components/CTA4/config'
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
      options: ['cta-1', 'cta-3', 'cta-4'],
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
    {
      ...cta4Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'cta-4',
      },
    },
  ],
}
