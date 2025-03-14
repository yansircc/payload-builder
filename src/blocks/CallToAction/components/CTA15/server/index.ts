import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'

const heading: Field = {
  name: 'heading',
  type: 'text',
  defaultValue: 'Ready to get started?',
  admin: {
    description: 'The small heading text above the title',
  },
}

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  minLength: 1,
  maxLength: 100,
  defaultValue: 'Modern Split Layout CTA',
  admin: {
    description: 'The main title of the CTA section',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  defaultValue: 'Experience our modern design with radial gradient background.',
  admin: {
    description: 'The subtitle text below the main title',
  },
}

const image: Field = {
  name: 'image',
  type: 'upload',
  relationTo: 'media',
  required: true,
  admin: {
    description: 'The featured image that appears on the right side',
  },
}

const links: Field = {
  name: 'links',
  type: 'array',
  minRows: 1,
  maxRows: 2,
  admin: {
    description: 'CTA buttons',
  },
  fields: [
    link({
      name: 'link',
      disableLabel: false,
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
 * Complete configuration for CTA 15
 * Features:
 * - Radial gradient background effect
 * - Split content layout (text and image)
 * - Optional heading above title
 * - Responsive design with image placement
 */
export const cta15Fields: GroupField = {
  name: 'cta-15',
  interfaceName: 'CTA15Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Modern split layout with radial gradient and optional heading',
  },
  fields: [heading, title, subtitle, image, links],
}
