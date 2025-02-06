import type { Field, GroupField } from 'payload'
import { z } from 'zod'

/**
 * Common field schemas that can be reused across components
 */
export const commonSchemas = {
  /** Basic content schemas */
  content: {
    title: z.string().describe('Title text'),
    description: z.string().describe('Description text'),
    label: z.string().describe('Section label'),
  },
  /** Media schemas */
  media: {
    image: z
      .object({
        id: z.string(),
        alt: z.string(),
        width: z.number(),
        height: z.number(),
      })
      .describe('Image with metadata'),
  },
  /** UI element schemas */
  ui: {
    icon: z.string().describe('Lucide icon name'),
    link: z
      .object({
        href: z.string(),
        label: z.string(),
      })
      .describe('Link with label'),
  },
}

/**
 * About-specific schemas built from common schemas
 */
export const aboutSchemas = {
  /** Basic section schemas */
  title: commonSchemas.content.title,
  description: commonSchemas.content.description,
  label: commonSchemas.content.label,

  /** Media schemas */
  image: commonSchemas.media.image,

  /** Feature schema */
  feature: z.object({
    icon: commonSchemas.ui.icon,
    title: commonSchemas.content.title,
    description: commonSchemas.content.description,
  }),

  /** Section schemas */
  section: {
    mission: z.object({
      label: commonSchemas.content.label,
      description: commonSchemas.content.description,
      image: commonSchemas.media.image,
    }),
    team: z.object({
      label: commonSchemas.content.label,
      title: commonSchemas.content.title,
      image: commonSchemas.media.image,
      description: commonSchemas.content.description,
    }),
  },
}

/**
 * Reusable field configurations
 */
export const baseFields = {
  /** Content fields */
  content: {
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
        description: 'Section label',
      },
    },
  },
  /** Media fields */
  media: {
    image: {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Image upload',
      },
    },
  },
  /** UI fields */
  ui: {
    icon: {
      name: 'icon',
      type: 'text',
      required: true,
      admin: {
        description: 'Lucide icon name (e.g., "FileText", "ArrowRight")',
      },
    },
    link: {
      name: 'link',
      type: 'group',
      fields: [
        {
          name: 'href',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  },
} as const

/**
 * Feature fields configuration
 */
export const featureFields = {
  icon: baseFields.ui.icon,
  title: baseFields.content.title,
  description: baseFields.content.description,
} as const

/**
 * Helper function to create field groups
 */
interface FieldGroupOptions {
  name: string
  label?: string
  fields: Field[]
  admin?: {
    description?: string
  }
}

export function createFieldGroup({ name, label, fields, admin }: FieldGroupOptions): GroupField {
  return {
    type: 'group',
    name,
    label,
    fields,
    admin: {
      description: admin?.description,
    },
  }
}

/**
 * Helper function to create array fields
 */
interface ArrayFieldOptions {
  name: string
  fields: Field[]
  minRows?: number
  maxRows?: number
  admin?: {
    description?: string
  }
}

export function createArrayField({
  name,
  fields,
  minRows = 1,
  maxRows,
  admin,
}: ArrayFieldOptions): Field {
  return {
    name,
    type: 'array',
    minRows,
    maxRows,
    fields,
    admin: {
      description: admin?.description,
    },
  }
}

/**
 * Helper function to create section fields
 */
interface SectionFieldOptions {
  name: string
  label: string
  fields: Field[]
  admin?: {
    description?: string
  }
}

export function createSectionField(options: SectionFieldOptions): GroupField {
  return createFieldGroup({
    name: options.name,
    label: options.label,
    fields: options.fields,
    admin: options.admin,
  })
}
