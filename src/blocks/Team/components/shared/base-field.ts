import {
  FieldGroupOptions,
  createFieldGroup,
} from '@/utilities/createFieldGroup'
import { Field, GroupField } from 'payload'
import { z } from 'zod'

/**
 * Atomic team field schemas
 */
export const teamSchemas = {
  /** Title schema */
  title: z.string().describe('The team title'),
  /** Subtitle schema */
  subtitle: z.string().describe('The team subtitle'),
  /** Description schema */
  description: z.string().describe('The team description'),
  /** Image schema */
  image: z.object({}).describe('Feature image'),
  /** Link schema */
  link: z.object({
    type: z.enum(['reference', 'custom']).optional(),
    newTab: z.boolean().optional(),
    reference: z
      .object({
        relationTo: z.enum(['pages', 'posts']),
        value: z.string(),
      })
      .optional(),
    url: z.string().optional(),
    label: z.string(),
    prefixIcon: z.string().optional(),
    suffixIcon: z.string().optional(),
  }),
  /** List schema */
  people: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      description: z.string(),
      avatar: z.string(),
    })
  ),
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
      description: 'Team title',
    },
  },
  subtitle: {
    name: 'subtitle',
    type: 'text',
    required: false,
    admin: {
      description: 'Team subtitle',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    required: false,
    admin: {
      description: 'Team description',
    },
  },
}

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
      description: 'Media',
    },
  },
} as const

/**
 * People fields for team-based layouts
 */
const peopleFields = {
  name: {
    name: 'name',
    type: 'text',
    required: true,
    admin: {
      description: 'Team member name',
    },
  },
  role: {
    name: 'role',
    type: 'text',
    required: true,
    admin: {
      description: 'Team member role/position',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    required: true,
    admin: {
      description: 'Team member bio',
    },
  },
  avatar: {
    name: 'avatar',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Team member avatar image',
    },
  },
} as const

/**
 * Combine all team fields for the field group
 */
const teamFields: Record<string, Field> = {
  ...basicFields,
  ...peopleFields,
  ...mediaFields,
}

/**
 * Export all field groups for type safety
 */
export { basicFields, mediaFields, peopleFields }

/**
 * Create a custom team field with selected fields and arrays
 * @param options - Field group configuration options
 * @returns - Team field configuration
 */
export function createTeamField(
  options: Omit<FieldGroupOptions<typeof teamFields>, 'name' | 'fields'>
): GroupField {
  return createFieldGroup({
    name: 'team',
    fields: teamFields,
    ...options,
    admin: {
      description: 'Team fields',
      ...options.admin,
    },
  })
}
