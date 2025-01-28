import type { Block } from 'payload'

import { cta1Fields } from './components/CTA1/config'
import { cta3Fields } from './components/CTA3/config'
import { cta4Fields } from './components/CTA4/config'
import { cta5Fields } from './components/CTA5/config'
import { cta7Fields } from './components/CTA7/config'
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
      options: ['cta-1', 'cta-3', 'cta-4', 'cta-5', 'cta-7'],
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
    {
      ...cta5Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'cta-5',
      },
    },
    {
      ...cta7Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'cta-7',
      },
    },
  ],
}
