import type { Field } from 'payload'
import { hero1Fields } from './components/Hero1/server'
import { hero3Fields } from './components/Hero3/server'
import { hero5Fields } from './components/Hero5/server'
import { hero6Fields } from './components/Hero6/server'
import { hero7Fields } from './components/Hero7/server'
import { hero8Fields } from './components/Hero8/server'
import { hero12Fields } from './components/Hero12/server'
import { hero24Fields } from './components/Hero24/server'
import { hero25Fields } from './components/Hero25/server'
import { hero32Fields } from './components/Hero32/server'
import { hero34Fields } from './components/Hero34/server'
import { hero45Fields } from './components/Hero45/server'
import { hero115Fields } from './components/Hero115/server'

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
        components: {
          Field: '@/heros/components/Hero5/client',
        },
        condition: (_, siblingData) => siblingData.style === 'hero-5',
      },
    },
    {
      ...hero6Fields,
      admin: {
        components: {
          Field: '@/heros/components/Hero6/client',
        },
        condition: (_, siblingData) => siblingData.style === 'hero-6',
      },
    },
    {
      ...hero7Fields,
      admin: {
        components: {
          Field: '@/heros/components/Hero7/client',
        },
        condition: (_, siblingData) => siblingData.style === 'hero-7',
      },
    },
    {
      ...hero8Fields,
      admin: {
        components: {
          Field: '@/heros/components/Hero8/client',
        },
        condition: (_, siblingData) => siblingData.style === 'hero-8',
      },
    },
    {
      ...hero12Fields,
      admin: {
        components: {
          Field: '@/heros/components/Hero12/client',
        },
        condition: (_, siblingData) => siblingData.style === 'hero-12',
      },
    },
    {
      ...hero24Fields,
      admin: {
        components: {
          Field: '@/heros/components/Hero24/client',
        },
        condition: (_, siblingData) => siblingData.style === 'hero-24',
      },
    },
    {
      ...hero25Fields,
      admin: {
        components: {
          Field: '@/heros/components/Hero25/client',
        },
        condition: (_, siblingData) => siblingData.style === 'hero-25',
      },
    },
    {
      ...hero32Fields,
      admin: {
        components: {
          Field: '@/heros/components/Hero32/client',
        },
        condition: (_, siblingData) => siblingData.style === 'hero-32',
      },
    },
    {
      ...hero34Fields,
      admin: {
        components: {
          Field: '@/heros/components/Hero34/client',
        },
        condition: (_, siblingData) => siblingData.style === 'hero-34',
      },
    },
    {
      ...hero45Fields,
      admin: {
        components: {
          Field: '@/heros/components/Hero45/client',
        },
        condition: (_, siblingData) => siblingData.style === 'hero-45',
      },
    },
    {
      ...hero115Fields,
      admin: {
        components: {
          Field: '@/heros/components/Hero115/client',
        },
        condition: (_, siblingData) => siblingData.style === 'hero-115',
      },
    },
  ],
}
