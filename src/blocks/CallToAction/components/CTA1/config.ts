import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  minLength: 1,
  maxLength: 100,
  defaultValue: 'Get Started',
  admin: {
    description: 'The title of the CTA',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  admin: {
    description: 'The subtitle of the CTA',
  },
}

const image: Field = {
  name: 'image',
  type: 'upload',
  relationTo: 'media',
  admin: {
    description: 'The image shows on the right side of the CTA section',
  },
}

const icon: Field = {
  name: 'icon',
  type: 'text',
  defaultValue: 'ArrowRight',
  admin: {
    description:
      'The icon shows on the left side of the CTA section, should be a lucide icon name, such as "ArrowRight"',
  },
}

const btn: Field = link({
  name: 'btn',
  disableLabel: false,
  appearances: ['default'],
  ui: {
    icons: true,
    description: false,
  },
  overrides: {
    admin: {
      description: 'The CTA button with ArrowRight suffix icon',
    },
    defaultValue: {
      type: 'custom',
      url: '#',
      label: 'Get Started',
      suffixIcon: 'ArrowRight',
      appearance: 'default',
    },
  },
})

/**
 * Complete configuration for CTA 1
 */
export const cta1Fields: GroupField = {
  name: 'cta-1',
  interfaceName: 'CTA1Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Side-by-side layout with icon badge and single action button',
  },
  fields: [title, subtitle, image, icon, btn],
}
