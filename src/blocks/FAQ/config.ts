import type { Block } from 'payload'
import { faq1Fields } from '@/blocks/Faq/components/Faq1/config'
import { faq2Fields } from '@/blocks/Faq/components/Faq2/config'
import { faq3Fields } from '@/blocks/Faq/components/Faq3/config'
import { faq4Fields } from '@/blocks/Faq/components/Faq4/config'
import { faq5Fields } from '@/blocks/Faq/components/Faq5/config'
import { faq6Fields } from '@/blocks/Faq/components/Faq6/config'

/**
 * FAQ Block configuration
 */
export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'faq-1',
      options: [
        {
          label: 'FAQ 1',
          value: 'faq-1',
        },
        {
          label: 'FAQ 2',
          value: 'faq-2',
        },
        {
          label: 'FAQ 3',
          value: 'faq-3',
        },
        {
          label: 'FAQ 4',
          value: 'faq-4',
        },
        {
          label: 'FAQ 5',
          value: 'faq-5',
        },
        {
          label: 'FAQ 6',
          value: 'faq-6',
        },
      ],
    },
    {
      ...faq1Fields,
      admin: {
        components: {
          Field: '@/blocks/Faq/components/Faq1/client.tsx',
        },
        condition: (_, siblingData) => siblingData.style === 'faq-1',
      },
    },
    {
      ...faq2Fields,
      admin: {
        components: {
          Field: '@/blocks/Faq/components/Faq2/client.tsx',
        },
        condition: (_, siblingData) => siblingData.style === 'faq-2',
      },
    },
    {
      ...faq3Fields,
      admin: {
        components: {
          Field: '@/blocks/Faq/components/Faq3/client.tsx',
        },
        condition: (_, siblingData) => siblingData.style === 'faq-3',
      },
    },
    {
      ...faq4Fields,
      admin: {
        components: {
          Field: '@/blocks/Faq/components/Faq4/client.tsx',
        },
        condition: (_, siblingData) => siblingData.style === 'faq-4',
      },
    },
    {
      ...faq5Fields,
      admin: {
        components: {
          Field: '@/blocks/Faq/components/Faq5/client.tsx',
        },
        condition: (_, siblingData) => siblingData.style === 'faq-5',
      },
    },
    {
      ...faq6Fields,
      admin: {
        components: {
          Field: '@/blocks/Faq/components/Faq6/client.tsx',
        },
        condition: (_, siblingData) => siblingData.style === 'faq-6',
      },
    },
  ],
}
