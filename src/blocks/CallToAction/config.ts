import type { Block } from 'payload'
import { cta1Fields } from '@/blocks/CallToAction/components/CTA1/server'
import { cta3Fields } from '@/blocks/CallToAction/components/CTA3/server'
import { cta4Fields } from '@/blocks/CallToAction/components/CTA4/server'
import { cta5Fields } from '@/blocks/CallToAction/components/CTA5/server'
import { cta7Fields } from '@/blocks/CallToAction/components/CTA7/server'
import { cta10Fields } from '@/blocks/CallToAction/components/CTA10/server'
import { cta11Fields } from '@/blocks/CallToAction/components/CTA11/server'
import { cta15Fields } from '@/blocks/CallToAction/components/CTA15/server'
import { cta16Fields } from '@/blocks/CallToAction/components/CTA16/server'
import { cta17Fields } from '@/blocks/CallToAction/components/CTA17/server'

/**
 * Call to Action Block configuration
 */
export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  labels: {
    singular: 'CTA Block',
    plural: 'CTA Blocks',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [
        {
          label: 'CTA 1',
          value: 'cta-1',
        },
        {
          label: 'CTA 3',
          value: 'cta-3',
        },
        {
          label: 'CTA 4',
          value: 'cta-4',
        },
        {
          label: 'CTA 5',
          value: 'cta-5',
        },
        {
          label: 'CTA 7',
          value: 'cta-7',
        },
        {
          label: 'CTA 10',
          value: 'cta-10',
        },
        {
          label: 'CTA 11',
          value: 'cta-11',
        },
        {
          label: 'CTA 15',
          value: 'cta-15',
        },
        {
          label: 'CTA 16',
          value: 'cta-16',
        },
        {
          label: 'CTA 17',
          value: 'cta-17',
        },
      ],
    },
    /**
     * CTA 1: Simple side-by-side layout with icon, title, subtitle, and image
     * Features: Icon badge, responsive layout, optional subtitle, and media display
     */
    {
      ...cta1Fields,
      admin: {
        components: {
          Field: '@/blocks/CallToAction/components/CTA1/client',
        },
        condition: (_, siblingData) => siblingData.style === 'cta-1',
      },
    },
    /**
     * CTA 3: Feature-focused layout with icon list and action buttons
     * Features: Multiple feature points with icons, dual CTA buttons
     */
    {
      ...cta3Fields,
      admin: {
        components: {
          Field: '@/blocks/CallToAction/components/CTA3/client',
        },
        condition: (_, siblingData) => siblingData.style === 'cta-3',
      },
    },
    /**
     * CTA 4: Accent background with list items and action links
     * Features: Highlighted background, icon list items, flexible link options
     */
    {
      ...cta4Fields,
      admin: {
        components: {
          Field: '@/blocks/CallToAction/components/CTA4/client',
        },
        condition: (_, siblingData) => siblingData.style === 'cta-4',
      },
    },
    /**
     * CTA 5: Grid layout with multiple content sections
     * Features: Multi-column layout, icon integration, multiple CTAs
     */
    {
      ...cta5Fields,
      admin: {
        components: {
          Field: '@/blocks/CallToAction/components/CTA5/client',
        },
        condition: (_, siblingData) => siblingData.style === 'cta-5',
      },
    },
    /**
     * CTA 7: Centered content with prominent title and action buttons
     * Features: Centered layout, emphasis on title, multiple button options
     */
    {
      ...cta7Fields,
      admin: {
        components: {
          Field: '@/blocks/CallToAction/components/CTA7/client',
        },
        condition: (_, siblingData) => siblingData.style === 'cta-7',
      },
    },
    /**
     * CTA 10: Full-width design with background image and overlay text
     * Features: Background image, overlay text, prominent CTA buttons
     */
    {
      ...cta10Fields,
      admin: {
        components: {
          Field: '@/blocks/CallToAction/components/CTA10/client',
        },
        condition: (_, siblingData) => siblingData.style === 'cta-10',
      },
    },
    /**
     * CTA 11: Newsletter-style layout with form integration
     * Features: Email signup form, descriptive text, action button
     */
    {
      ...cta11Fields,
      admin: {
        components: {
          Field: '@/blocks/CallToAction/components/CTA11/client',
        },
        condition: (_, siblingData) => siblingData.style === 'cta-11',
      },
    },
    /**
     * CTA 15: Modern layout with title, subtitle, and image
     * Features: Clean design, flexible content placement, image integration
     */
    {
      ...cta15Fields,
      admin: {
        components: {
          Field: '@/blocks/CallToAction/components/CTA15/client',
        },
        condition: (_, siblingData) => siblingData.style === 'cta-15',
      },
    },
    /**
     * CTA 16: Full-height hero with background image and icon
     * Features: Dynamic icon, background image overlay, dual CTA buttons
     */
    {
      ...cta16Fields,
      admin: {
        components: {
          Field: '@/blocks/CallToAction/components/CTA16/client',
        },
        condition: (_, siblingData) => siblingData.style === 'cta-16',
      },
    },
    /**
     * CTA 17: Centered content with gradient background
     * Features: Gradient overlay, centered text layout, action buttons
     */
    {
      ...cta17Fields,
      admin: {
        components: {
          Field: '@/blocks/CallToAction/components/CTA17/client',
        },
        condition: (_, siblingData) => siblingData.style === 'cta-17',
      },
    },
  ],
}
