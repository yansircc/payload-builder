import type { Block } from 'payload'
import { feature1Fields } from './components/Feature1/config'
import { feature2Fields } from './components/Feature2/config'

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
      ],
    },
    {
      ...feature1Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'feature-1',
      },
    },
    {
      ...feature2Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'feature-2',
      },
    },
  ],
}
