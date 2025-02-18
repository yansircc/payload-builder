import { Field, GroupField } from 'payload'
import { icon } from '@/fields/icon'
import { link } from '@/fields/link'

/**
 * CTA 16: Full-height hero section with dynamic icon and background image
 * Features:
 * - Dynamic icon with subtitle
 * - Full-height (620px) hero layout
 * - Background image with dark overlay
 * - Dual CTA buttons with backdrop blur effect
 */

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  minLength: 1,
  maxLength: 100,
  defaultValue: 'Full-height Hero Section',
  admin: {
    description: 'The title of the CTA section',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  defaultValue: 'Engage your audience with a dynamic icon and compelling message.',
  admin: {
    description: 'The subtitle text below the main title',
  },
}

const iconField = icon({
  name: 'icon',
  label: 'Icon',
})

const backgroundImage: Field = {
  name: 'image',
  type: 'upload',
  relationTo: 'media',
  required: true,
  admin: {
    description: 'The background image with dark overlay',
  },
}

const links: Field = {
  name: 'links',
  type: 'array',
  minRows: 1,
  maxRows: 2,
  admin: {
    description: 'Primary and secondary CTA buttons',
  },
  fields: [
    link({
      name: 'link',
      disableLabel: false,
      appearances: ['default', 'ghost'],
      ui: {
        icons: true,
        description: false,
      },
      overrides: {
        admin: {
          description: 'CTA button with ArrowRight suffix icon',
        },
        defaultValue: {
          type: 'custom',
          url: '#',
          label: 'Get Started',
          suffixIcon: 'ArrowRight',
          appearance: 'default',
        },
      },
    }),
  ],
}

/**
 * Complete configuration for CTA 16
 * Features:
 * - Dynamic icon with subtitle
 * - Full-height (620px) hero layout
 * - Background image with dark overlay
 * - Dual CTA buttons with backdrop blur effect
 */
export const cta16Fields: GroupField = {
  name: 'cta-16',
  interfaceName: 'CTA16Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Full-height hero section with icon, background image, and dual CTA buttons',
  },
  fields: [title, subtitle, iconField, backgroundImage, links],
}
