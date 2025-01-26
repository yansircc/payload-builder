import { GroupField } from 'payload'
import { createHeroField, heroSchemas } from '../shared/base-field'

/**
 * Hero 115 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  description: heroSchemas.description,
  link: heroSchemas.link,
  trustText: heroSchemas.trustText,
  image: heroSchemas.image,
}

/**
 * Complete configuration for Hero 115
 */
export const hero115Fields: GroupField = {
  name: 'hero-115',
  interfaceName: 'Hero115Fields',
  label: false,
  type: 'group',
  admin: {
    description:
      'Hero section with centered content, circular decorative borders, and a large image',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'description', 'link', 'trustText', 'image'],
    }),
  ],
}
