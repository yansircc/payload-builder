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
  /** Label schema */
  label: z.string().describe('Section label (e.g., "OUR MISSION", "JOIN OUR TEAM")'),
  /** Feature schema */
  feature: z.object({
    icon: z.string().describe('Lucide icon name for the feature'),
    title: z.string(),
    description: z.string(),
  }),
  /** Mission section schema */
  missionSection: z.object({
    label: z.string(),
    description: z.string(),
    image: z
      .object({
        id: z.string(),
        alt: z.string(),
        width: z.number(),
        height: z.number(),
      })
      .describe('Mission section image'),
  }),
  /** Team section schema */
  teamSection: z.object({
    label: z.string(),
    title: z.string(),
    image: z
      .object({
        id: z.string(),
        alt: z.string(),
        width: z.number(),
        height: z.number(),
      })
      .describe('Team section image'),
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
 * Feature fields configuration
 */
export const featureFields = {
  icon: {
    name: 'icon',
    type: 'text',
    required: true,
    admin: {
      description: 'Lucide icon name (e.g., "FileText", "ArrowRight", "Settings")',
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
}

/**
 * Export all field groups for type safety
 */
export { basicFields }

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
