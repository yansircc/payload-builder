import type { Field } from 'payload'
import { hero1Fields } from './components/Hero1/server'
import { hero3Fields } from './components/Hero3/server'
import { hero5Fields } from './components/Hero5/config'
import { hero6Fields } from './components/Hero6/config'
import { hero7Fields } from './components/Hero7/config'
import { hero8Fields } from './components/Hero8/config'
import { hero12Fields } from './components/Hero12/config'
import { hero24Fields } from './components/Hero24/config'
import { hero25Fields } from './components/Hero25/config'
import { hero32Fields } from './components/Hero32/config'
import { hero34Fields } from './components/Hero34/config'
import { hero45Fields } from './components/Hero45/config'
import { hero115Fields } from './components/Hero115/config'

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
      options: [
        'hero-1',
        'hero-3',
        'hero-5',
        'hero-6',
        'hero-7',
        'hero-8',
        'hero-12',
        'hero-24',
        'hero-25',
        'hero-32',
        'hero-34',
        'hero-45',
        'hero-115',
      ],
    },
    {
      ...hero1Fields,
      admin: {
        components: {
          Field: '@/heros/components/Hero1/client',
        },
        condition: (_, siblingData) => siblingData.style === 'hero-1',
      },
    },
    {
      ...hero3Fields,
      admin: {
        components: {
          Field: '@/heros/components/Hero3/client',
        },
        condition: (_, siblingData) => siblingData.style === 'hero-3',
      },
    },
    {
      ...hero5Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-5',
      },
    },
    {
      ...hero6Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-6',
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
      ...hero32Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-32',
      },
    },
    {
      ...hero34Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-34',
      },
    },
    {
      ...hero45Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-45',
      },
    },
    {
      ...hero115Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'hero-115',
      },
    },
  ],
}
