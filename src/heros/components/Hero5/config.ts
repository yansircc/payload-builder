import { GroupField } from 'payload'
import { z } from 'zod'
import { createHeroField, heroSchemas } from '../shared/base-field'

/**
 * Hero 5 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
  links: z.array(heroSchemas.link).min(2).max(2),
  image: heroSchemas.image,
}

/**
 * Complete configuration for Hero 5
 */
export const hero5Fields: GroupField = {
  name: 'hero-5',
  interfaceName: 'Hero5Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Left content right image layout hero, perfect for showcasing product features',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'subtitle', 'link', 'image'],
    }),
  ],
}
