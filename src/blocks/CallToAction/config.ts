import type { Block } from 'payload'

import { cta1Fields } from './components/CTA1/config'
import { cta10Fields } from './components/CTA10/config'
import { cta11Fields } from './components/CTA11/config'
import { cta15Fields } from './components/CTA15/config'
import { cta16Fields } from './components/CTA16/config'
import { cta17Fields } from './components/CTA17/config'
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
      options: [
        'cta-1',
        'cta-3',
        'cta-4',
        'cta-5',
        'cta-7',
        'cta-10',
        'cta-11',
        'cta-15',
        'cta-16',
        'cta-17',
      ],
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
    {
      ...cta10Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'cta-10',
      },
    },
    {
      ...cta11Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'cta-11',
      },
    },
    {
      ...cta15Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'cta-15',
      },
    },
    {
      ...cta16Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'cta-16',
      },
    },
    {
      ...cta17Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'cta-17',
      },
    },
  ],
}
