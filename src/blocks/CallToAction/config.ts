import type { Block } from 'payload'

import { cta1Fields } from './components/CTA1/config'
import { cta10Fields } from './components/CTA10/config'
import { cta11Fields } from './components/CTA11/config'
import { cta15Fields } from './components/CTA15/config'
import { cta16Fields } from './components/CTA16/config'
import { cta17Fields } from './components/CTA17/config'
import { cta3Fields } from './components/CTA3/config'
import { cta4Fields } from './components/CTA4/config'
import { cta5Fields } from './components/CTA5/config'
import { cta7Fields } from './components/CTA7/config'

/**
 * Call to Action Block configuration
 */
export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  labels: {
    singular: 'Block',
    plural: 'Blocks',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [
        'cta-1', // Side-by-side with icon badge
        'cta-3', // Feature list with dual action
        'cta-4', // Accent card with feature list
        'cta-5', // Image-focused side content
        'cta-7', // Feature list with icon highlights
        'cta-10', // Full-width banner with background
        'cta-11', // Newsletter signup section
        'cta-15', // Modern split with radial gradient
        'cta-16', // Full-height hero with icon
        'cta-17', // Centered content with gradient
      ],
    },
    /**
     * CTA 1: Simple side-by-side layout with icon, title, subtitle, and image
     * Features: Icon badge, responsive layout, optional subtitle, and media display
     */
    {
      ...cta1Fields,
      admin: {
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
        condition: (_, siblingData) => siblingData.style === 'cta-17',
      },
    },
  ],
}
