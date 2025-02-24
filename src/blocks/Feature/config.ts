import type { Block } from 'payload'
import { feature1Fields } from '@/blocks/Feature/components/Feature1/server'
import { feature2Fields } from '@/blocks/Feature/components/Feature2/server'
import { feature3Fields } from '@/blocks/Feature/components/Feature3/server'
import { feature5Fields } from '@/blocks/Feature/components/Feature5/server'
import { feature6Fields } from '@/blocks/Feature/components/Feature6/server'
import { feature7Fields } from '@/blocks/Feature/components/Feature7/server'
import { feature10Fields } from '@/blocks/Feature/components/Feature10/server'
import { feature11Fields } from '@/blocks/Feature/components/Feature11/server'
import { feature13Fields } from '@/blocks/Feature/components/Feature13/server'
import { feature14Fields } from '@/blocks/Feature/components/Feature14/server'
import { feature15Fields } from '@/blocks/Feature/components/Feature15/server'

/**
 * Feature Block configuration
 */
export const Feature: Block = {
  slug: 'feature',
  interfaceName: 'FeatureBlock',
  labels: {
    singular: 'Feature',
    plural: 'Features',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'feature-1',
      options: [
        {
          label: 'Feature 1',
          value: 'feature-1',
        },
        {
          label: 'Feature 2',
          value: 'feature-2',
        },
        {
          label: 'Feature 3',
          value: 'feature-3',
        },
        {
          label: 'Feature 5',
          value: 'feature-5',
        },
        {
          label: 'Feature 6',
          value: 'feature-6',
        },
        {
          label: 'Feature 7',
          value: 'feature-7',
        },
        {
          label: 'Feature 10',
          value: 'feature-10',
        },
        {
          label: 'Feature 11',
          value: 'feature-11',
        },
        {
          label: 'Feature 13',
          value: 'feature-13',
        },
        {
          label: 'Feature 14',
          value: 'feature-14',
        },
        {
          label: 'Feature 15',
          value: 'feature-15',
        },
      ],
    },
    {
      ...feature1Fields,
      admin: {
        components: {
          Field: '@/blocks/Feature/components/Feature1/client',
        },
        condition: (_, siblingData) => siblingData.style === 'feature-1',
      },
    },
    {
      ...feature2Fields,
      admin: {
        components: {
          Field: '@/blocks/Feature/components/Feature2/client',
        },
        condition: (_, siblingData) => siblingData.style === 'feature-2',
      },
    },
    {
      ...feature3Fields,
      admin: {
        components: {
          Field: '@/blocks/Feature/components/Feature3/client',
        },
        condition: (_, siblingData) => siblingData.style === 'feature-3',
      },
    },
    {
      ...feature5Fields,
      admin: {
        components: {
          Field: '@/blocks/Feature/components/Feature5/client',
        },
        condition: (_, siblingData) => siblingData.style === 'feature-5',
      },
    },
    {
      ...feature6Fields,
      admin: {
        components: {
          Field: '@/blocks/Feature/components/Feature6/client',
        },
        condition: (_, siblingData) => siblingData.style === 'feature-6',
      },
    },
    {
      ...feature7Fields,
      admin: {
        components: {
          Field: '@/blocks/Feature/components/Feature7/client',
        },
        condition: (_, siblingData) => siblingData.style === 'feature-7',
      },
    },
    {
      ...feature10Fields,
      admin: {
        components: {
          Field: '@/blocks/Feature/components/Feature10/client',
        },
        condition: (_, siblingData) => siblingData.style === 'feature-10',
      },
    },
    {
      ...feature11Fields,
      admin: {
        components: {
          Field: '@/blocks/Feature/components/Feature11/client',
        },
        condition: (_, siblingData) => siblingData.style === 'feature-11',
      },
    },
    {
      ...feature13Fields,
      admin: {
        components: {
          Field: '@/blocks/Feature/components/Feature13/client',
        },
        condition: (_, siblingData) => siblingData.style === 'feature-13',
      },
    },
    {
      ...feature14Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'feature-14',
      },
    },
    {
      ...feature15Fields,
      admin: {
        components: {
          Field: '@/blocks/Feature/components/Feature15/client',
        },
        condition: (_, siblingData) => siblingData.style === 'feature-15',
      },
    },
  ],
}
