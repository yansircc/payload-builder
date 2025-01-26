import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { cardSchemas, galleryCard } from '../shared/card-field'

/**
 * Gallery card field validation and type definitions
 */
export const schemas = {
  heading: z.string().describe('A short and powerful title, max 20 characters'),
  galleryLink: z.string().describe('A related link address'),
  cards: z
    .array(
      z.object({
        ...cardSchemas,
      }),
    )
    .min(1)
    .max(6),
}

/**
 * Complete configuration for Gallery 6
 */
export const gallery6Fields: GroupField = {
  name: 'gallery-6',
  interfaceName: 'Gallery6Fields',
  label: false,
  type: 'group',
  fields: [
    {
      name: 'gallery',
      type: 'group',
      label: false,
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          defaultValue: 'Gallery',
          admin: {
            description: 'A short and powerful title, max 20 characters',
          },
        },
        link({
          overrides: {
            name: 'galleryLink',
            label: 'Gallery Link',
            admin: {
              description: 'A related link address',
            },
          },
        }),
        galleryCard,
      ],
      admin: {
        description: 'Max 6 cards',
      },
    },
  ],
}
