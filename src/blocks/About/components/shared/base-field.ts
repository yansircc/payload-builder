import type { Field, GroupField } from 'payload'
import { z } from 'zod'

/**
 * Atomic about field schemas
 */
export const aboutSchemas = {
  /** Title schema */
  title: z.string().describe('The about section title'),
  /** Description schema */
  description: z.string().describe('The about section description'),
  /** Media schema */
  media: z.object({
    id: z.string(),
    alt: z.string(),
    width: z.number(),
    height: z.number(),
  }),
  /** Label schema */
  label: z.string().describe('Section label (e.g., "OUR MISSION", "JOIN OUR TEAM")'),
  /** Feature schema */
  feature: z.object({
    icon: z.enum(['Files', 'CircleArrowRight', 'Settings']),
    title: z.string(),
    description: z.string(),
  }),
}

/**
 * Basic fields configuration
 */
const basicFields: Record<string, Field> = {
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Section title',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    required: true,
    admin: {
      description: 'Section description',
    },
  },
  label: {
    name: 'label',
    type: 'text',
    required: true,
    admin: {
      description: 'Section label (e.g., "OUR MISSION", "JOIN OUR TEAM")',
    },
  },
}

/**
 * Media fields configuration
 */
const mediaFields = {
  media: {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Media',
    },
  },
} as const

/**
 * Feature fields configuration
 */
const featureFields = {
  icon: {
    name: 'icon',
    type: 'select',
    required: true,
    options: ['Files', 'CircleArrowRight', 'Settings'],
    admin: {
      description: 'Feature icon',
    },
  },
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Feature title',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    required: true,
    admin: {
      description: 'Feature description',
    },
  },
} as const

/**
 * Combine all about fields for the field group
 */
const aboutFields: Record<string, Field> = {
  ...basicFields,
  ...mediaFields,
}

/**
 * Export all field groups for type safety
 */
export { basicFields, featureFields, mediaFields }

interface AboutFieldGroup {
  name: string
  label: string
  fields: Field[]
}

interface AboutFieldOptions {
  groups: AboutFieldGroup[]
  admin?: {
    description?: string
  }
}

/**
 * Create a custom about field with selected fields and arrays
 * @param options - Field group configuration options
 * @returns - About field configuration
 */
export function createAboutField(options: AboutFieldOptions): GroupField {
  const fields = Object.values(aboutFields)

  return {
    type: 'group',
    name: 'about',
    fields,
    admin: {
      description: 'About section fields',
      ...options.admin,
    },
  }
}
