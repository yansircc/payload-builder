import { Field, GroupField } from 'payload'
import { createFieldLabel } from '@/i18n'

/**
 * Hero 32 field validation and type definitions
 */

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  admin: {
    description: 'The main title text',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'textarea',
  admin: {
    description: 'The subtitle text',
  },
}

const link: Field = {
  name: 'link',
  type: 'group',
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Button text',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'Button URL',
      },
    },
  ],
  admin: {
    description: 'Hero button',
  },
}

const integrations: Field = {
  name: 'integrations',
  type: 'array',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Integration logo/image',
      },
    },
  ],
  minRows: 15,
  maxRows: 15,
  admin: {
    description: createFieldLabel('hero32.hero.integrations', 'pages'),
  },
}

/**
 * Complete configuration for Hero 32
 */
export const hero32Fields: GroupField = {
  name: 'hero-32',
  interfaceName: 'Hero32Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero section with title, button, and grid of integration images',
  },
  fields: [title, subtitle, link, integrations],
}
