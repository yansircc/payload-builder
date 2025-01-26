import { linkGroup } from '@/fields/linkGroup'
import { GroupField } from 'payload'
import { z } from 'zod'

/**
 * Hero base field validation and type definitions
 */
export const baseSchemas = {
  /** Title field: Hero main title */
  title: z.string().describe('The main title text for the hero section'),
  /** Subtitle field: Hero subtitle text */
  subtitle: z.string().describe('The subtitle text for the hero section, supports multiple lines'),
  /** Link field: Hero buttons */
  link: z.string().describe('The buttons shows on the hero and max 2 buttons'),
  /** Image field: Hero image */
  image: z.string().describe('The image shows on the hero'),
}

/**
 * Complete configuration for Hero base
 */
export const heroBase: GroupField = {
  name: 'heroBase',
  type: 'group',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Welcome to Our Website',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      defaultValue:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    },
    linkGroup({
      overrides: {
        admin: {
          description: 'The buttons shows on the hero and max 2 buttons',
        },
      },
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'The image shows on the hero',
      },
    },
  ],
}
