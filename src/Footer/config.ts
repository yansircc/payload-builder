import { GlobalConfig } from 'payload'

import { footer1Fields } from './components/Footer1/config'
import { footer2Fields } from './components/Footer2/config'
import { footer3Fields } from './components/Footer3/config'
import { footer4Fields } from './components/Footer4/config'
import { footer5Fields } from './components/Footer5/config'
import { footer6Fields } from './components/Footer6/config'
import { footer7Fields } from './components/Footer7/config'
import { footer8Fields } from './components/Footer8/config'
import { footer9Fields } from './components/Footer9/config'
import { footer10Fields } from './components/Footer10/config'
import { revalidateFooter } from './hooks/revalidateFooter'

/**
 * Footer Block configuration
 */
export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'footer-1',
      options: [
        {
          label: 'Footer 1',
          value: 'footer-1',
        },
        {
          label: 'Footer 2',
          value: 'footer-2',
        },
        {
          label: 'Footer 3',
          value: 'footer-3',
        },
        {
          label: 'Footer 4',
          value: 'footer-4',
        },
        {
          label: 'Footer 5',
          value: 'footer-5',
        },
        {
          label: 'Footer 6',
          value: 'footer-6',
        },
        {
          label: 'Footer 7',
          value: 'footer-7',
        },
        {
          label: 'Footer 8',
          value: 'footer-8',
        },
        {
          label: 'Footer 9',
          value: 'footer-9',
        },
        {
          label: 'Footer 10',
          value: 'footer-10',
        },
      ],
    },
    {
      ...footer1Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'footer-1',
      },
    },
    {
      ...footer2Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'footer-2',
      },
    },
    {
      ...footer3Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'footer-3',
      },
    },
    {
      ...footer4Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'footer-4',
      },
    },
    {
      ...footer5Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'footer-5',
      },
    },
    {
      ...footer6Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'footer-6',
      },
    },
    {
      ...footer7Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'footer-7',
      },
    },
    {
      ...footer8Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'footer-8',
      },
    },
    {
      ...footer9Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'footer-9',
      },
    },
    {
      ...footer10Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'footer-10',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
