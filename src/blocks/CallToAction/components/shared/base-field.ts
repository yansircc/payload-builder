import { link } from '@/fields/link'
import {
  FieldGroupOptions,
  createFieldGroup,
} from '@/utilities/createFieldGroup'
import { GroupField } from 'payload'
import { z } from 'zod'

/**
 * Atomic CTA field schemas
 */
export const ctaSchemas = {
  /** Title schema */
  title: z.string().describe('The main title text'),
  /** Subtitle schema */
  subtitle: z.string().describe('The subtitle text'),
  /** Link schema */
  link: z.string().describe('Single CTA button'),
  /** Image schema */
  image: z.object({}).describe('CTA image'),
  /** Icon schema (optional) */
  icon: z.string().optional().describe('Optional: Lucide icon name'),
  /** List schema */
  list: z.array(
    z.object({
      icon: z.string().optional(),
      text: z.string(),
    })
  ),
  /** Heading schema */
  heading: z.string().describe('The heading text above the title'),
} as const

/**
 * Basic fields configuration
 */
const basicFields = {
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Main title text',
    },
  },
  subtitle: {
    name: 'subtitle',
    type: 'textarea',
    admin: {
      description: 'Subtitle text',
    },
  },
  heading: {
    name: 'heading',
    type: 'text',
    required: false,
    admin: {
      description: 'The heading text above the title',
    },
  },
  link: link({
    overrides: {
      admin: {
        description: 'CTA button',
      },
    },
  }),
} as const

/**
 * Media fields configuration
 */
const mediaFields = {
  image: {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'CTA image',
    },
  },
  logo: {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
    admin: {
      description: 'Logo image',
    },
  },
} as const

/**
 * Icon fields configuration
 */
const iconFields = {
  icon: {
    name: 'icon',
    type: 'text',
    required: false,
    admin: {
      description: 'Optional: Lucide icon name (e.g., MessagesSquare)',
    },
  },
} as const

/**
 * List fields for list-based layouts
 */
const listFields = {
  icon: {
    name: 'icon',
    type: 'text',
    required: true,
    defaultValue: 'Check',
    admin: {
      description: 'Optional: Lucide icon name (e.g., CheckCircle)',
    },
  },
  text: {
    name: 'text',
    type: 'text',
    required: true,
    admin: {
      description: 'List item text',
    },
  },
} as const

/**
 * Combine all CTA fields for the field group
 */
const ctaFields = {
  ...basicFields,
  ...mediaFields,
  ...iconFields,
  ...listFields,
} as const

/**
 * Export all field groups for type safety
 */
export { basicFields, iconFields, listFields, mediaFields }

/**
 * Create a custom CTA field with selected fields, array fields and groups
 * @param options - Field group configuration options
 * @returns - CTA field configuration
 */
export function createCTAField(
  options: Omit<FieldGroupOptions<typeof ctaFields>, 'name' | 'fields'>
): GroupField {
  return createFieldGroup({
    name: 'cta',
    fields: ctaFields,
    ...options,
    admin: {
      description: 'CTA section fields',
      ...options.admin,
    },
  })
}
