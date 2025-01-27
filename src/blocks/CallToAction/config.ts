import type { Block, Field } from 'payload'
import { cta10Fields } from './components/cta-10/config'
import { cta11Fields } from './components/cta-11/config'
import { cta13Fields } from './components/cta-13/config'
import { cta4Fields } from './components/cta-4/config'
import { cta7Fields } from './components/cta-7/config'

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
      defaultValue: 'cta-10',
      options: [
        {
          label: 'CTA with Feature List and Pattern',
          value: 'cta-7',
        },
        {
          label: 'CTA with Feature List',
          value: 'cta-4',
        },
        {
          label: 'CTA with Buttons',
          value: 'cta-10',
        },
        {
          label: 'CTA Centered',
          value: 'cta-11',
        },
        {
          label: 'CTA with Email Subscription',
          value: 'cta-13',
        },
      ],
      admin: {
        description: 'Choose a Call to Action style',
      },
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
      name: 'cta-7',
      type: 'group',
      fields: (cta7Fields as { fields: Field[] }).fields,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'cta-7',
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
