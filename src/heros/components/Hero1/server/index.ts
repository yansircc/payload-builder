import { Field, GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { heroSchemas } from '../../shared/base-field'

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  minLength: 1,
  maxLength: 100,
  admin: {
    description: 'The title of the Hero section',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  admin: {
    description: 'The subtitle of the Hero section',
  },
}

const image: Field = {
  name: 'image',
  type: 'upload',
  relationTo: 'media',
  admin: {
    description: 'The hero image',
  },
}

const badge: Field = {
  name: 'badge',
  type: 'text',
  required: true,
  admin: {
    description: 'The text displayed in the badge',
  },
}

const link1: Field = link({
  name: 'link-1',
  overrides: {
    admin: {
      description: 'Primary hero button',
    },
  },
})

const link2: Field = link({
  name: 'link-2',
  overrides: {
    admin: {
      description: 'Hero button with ArrowDownRight suffix icon',
    },
    defaultValue: {
      suffixIcon: 'ArrowDownRight',
    },
  },
})

const links: Field = {
  name: 'links',
  type: 'array',
  fields: [link1, link2],
  admin: {
    description: 'Hero buttons',
  },
  minRows: 1,
  maxRows: 1,
}

/**
 * Hero 1 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
  links: z.array(heroSchemas.link).min(2).max(2),
  image: heroSchemas.image,
  badge: heroSchemas.badge,
}

/**
 * Complete configuration for Hero 1
 */
export const hero1Fields: GroupField = {
  name: 'hero-1',
  interfaceName: 'Hero1Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with a badge on the top left',
  },
  fields: [title, subtitle, image, badge, links],
}
