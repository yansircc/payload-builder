import { link } from '@/fields/link'
import { createFieldGroup, FieldGroupOptions } from '@/utilities/createFieldGroup'
import { GroupField } from 'payload'
import { z } from 'zod'

/**
 * Atomic hero field schemas
 */
export const heroSchemas = {
  /** Title schema */
  title: z.string().describe('The main title text'),
  /** Subtitle schema */
  subtitle: z.string().describe('The subtitle text'),
  /** Link schema */
  link: z.string().describe('Single hero button'),
  /** Image schema */
  image: z.object({}).describe('Hero image'),
  /** Badge schema */
  badge: z.string().describe('Badge text displayed above title'),
  /** Logo schema */
  logo: z.object({}).describe('Logo image'),
  /** Button text schema */
  buttonText: z.string().describe('Text for the primary button'),
  /** Trust text schema */
  trustText: z.string().describe('Text showing trust metrics'),
  /** Feature schema */
  feature: z.object({
    icon: z.string().describe('Lucide icon name'),
    title: z.string().describe('Feature title'),
    description: z.string().describe('Feature description'),
  }),
  /** Rating schema */
  rating: z.object({
    rate: z.number().min(0).max(5),
    count: z.number().min(0),
    avatar: z.object({}).describe('User avatar'),
  }),
  /** Partner schema */
  partner: z.object({
    logo: z.object({}).describe('Partner logo image'),
  }),
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
  buttonText: {
    name: 'buttonText',
    type: 'text',
    required: true,
    admin: {
      description: 'Text for the primary button',
    },
  },
  trustText: {
    name: 'trustText',
    type: 'text',
    required: true,
    admin: {
      description: 'Text showing trust metrics (e.g., "Trusted by X businesses")',
    },
  },
  link: link({
    overrides: {
      admin: {
        description: 'Hero button',
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
      description: 'Hero image',
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
 * Feature fields configuration
 */
const featureFields = {
  icon: {
    name: 'icon',
    type: 'text',
    required: true,
    admin: {
      description: 'Lucide icon name',
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
 * Rating fields configuration
 */
const ratingFields = {
  rate: {
    name: 'rate',
    type: 'number',
    min: 0,
    max: 5,
    required: true,
    admin: {
      description: 'Rating value (0-5)',
    },
  },
  count: {
    name: 'count',
    type: 'number',
    min: 0,
    required: true,
    admin: {
      description: 'Number of ratings',
    },
  },
  avatar: {
    name: 'avatar',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'User avatar',
    },
  },
} as const

/**
 * Partner fields configuration
 */
const partnerFields = {
  logo: {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Partner logo image',
    },
  },
} as const

/**
 * Misc fields configuration
 */
const miscFields = {
  badge: {
    name: 'badge',
    type: 'text',
    admin: {
      description: 'Badge text displayed above title',
    },
  },
} as const

/**
 * Combine all hero fields for the field group
 */
const heroFields = {
  ...basicFields,
  ...mediaFields,
  ...ratingFields,
  ...featureFields,
  ...partnerFields,
  ...miscFields,
} as const

/**
 * Export all field groups for type safety
 */
export { basicFields, featureFields, mediaFields, partnerFields, ratingFields }

/**
 * Create a custom hero field with selected fields, array fields and groups
 * @param options - Field group configuration options
 * @returns - Hero field configuration
 */
export function createHeroField(
  options: Omit<FieldGroupOptions<typeof heroFields>, 'name' | 'fields'>,
): GroupField {
  return createFieldGroup({
    name: 'hero',
    fields: heroFields,
    ...options,
    admin: {
      description: 'Hero section fields',
      ...options.admin,
    },
  })
}
