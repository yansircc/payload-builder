import type { Field } from 'payload'

import { hero1Fields } from './components/Hero1/config'
import { hero12Fields } from './components/Hero12/config'
import { hero24Fields } from './components/Hero24/config'
import { hero25Fields } from './components/Hero25/config'
import { hero34Fields } from './components/Hero34/config'
import { hero5Fields } from './components/Hero5/config'
import { hero7Fields } from './components/Hero7/config'
import { hero8Fields } from './components/Hero8/config'

/**
 * Hero Field configuration
 */
export const HeroField: Field = {
  name: 'hero',
  interfaceName: 'HeroField',
  type: 'group',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: ['hero-1', 'hero-5', 'hero-7', 'hero-8', 'hero-12', 'hero-24', 'hero-25', 'hero-34'],
    },
    {
      ...hero1Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-1',
      },
    },
    {
      ...hero5Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-5',
      },
    },
    {
      ...hero7Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-7',
      },
    },
    {
      ...hero8Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-8',
      },
    },
    {
      ...hero12Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-12',
      },
    },
    {
      ...hero24Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-24',
      },
    },
    {
      ...hero25Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-25',
      },
    },
    {
      ...hero34Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-34',
      },
    },
  ],
}
