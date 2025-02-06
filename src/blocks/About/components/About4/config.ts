import { link } from '@/fields/link'
import type { GroupField } from 'payload'
import { z } from 'zod'
import {
  aboutSchemas,
  baseFields,
  commonSchemas,
  createArrayField,
  createFieldGroup,
  createSectionField,
} from '../shared/base-field'

/**
 * About4 field validation and type definitions
 */
export const schemas = {
  /** Main section */
  mainSection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
  }),

  /** Gallery section */
  gallerySection: z.object({
    images: z.array(commonSchemas.media.image.describe('Gallery image')).length(6),
  }),

  /** Content section */
  contentSection: z.object({
    vision: z.object({
      title: aboutSchemas.title,
      description: aboutSchemas.description,
    }),
    creators: z.object({
      title: aboutSchemas.title,
      description: aboutSchemas.description,
    }),
  }),

  /** CTA section */
  ctaSection: z.object({
    title: aboutSchemas.title,
    button: commonSchemas.ui.link,
  }),
}

/**
 * Complete configuration for About4
 */
export const about4Fields: GroupField = {
  name: 'about-4',
  interfaceName: 'About4Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Modern about section with team gallery and vision/creators content',
  },
  fields: [
    // Main Section
    createSectionField({
      name: 'mainSection',
      label: 'Main Section',
      fields: [
        {
          ...baseFields.content.title,
          admin: {
            description: 'Main title (e.g., "Welcome to Our Team")',
          },
        },
        {
          ...baseFields.content.description,
          admin: {
            description: 'Main description text',
          },
        },
      ],
    }),

    // Gallery Section
    createSectionField({
      name: 'gallerySection',
      label: 'Gallery Section',
      fields: [
        createArrayField({
          name: 'images',
          fields: [
            {
              ...baseFields.media.image,
              admin: { description: 'Gallery image' },
            },
          ],
          minRows: 6,
          maxRows: 6,
          admin: { description: 'Gallery images (exactly 6 items)' },
        }),
      ],
    }),

    // Content Section
    createSectionField({
      name: 'contentSection',
      label: 'Content Section',
      fields: [
        // Vision Section
        createFieldGroup({
          name: 'vision',
          label: 'Vision Section',
          fields: [
            {
              ...baseFields.content.title,
              admin: { description: 'Vision section title' },
            },
            {
              ...baseFields.content.description,
              admin: { description: 'Vision section description' },
            },
          ],
        }),
        // Creators Section
        createFieldGroup({
          name: 'creators',
          label: 'Creators Section',
          fields: [
            {
              ...baseFields.content.title,
              admin: { description: 'Creators section title' },
            },
            {
              ...baseFields.content.description,
              admin: { description: 'Creators section description' },
            },
          ],
        }),
      ],
    }),

    // CTA Section
    createSectionField({
      name: 'ctaSection',
      label: 'CTA Section',
      fields: [
        {
          ...baseFields.content.title,
          admin: { description: 'CTA section title' },
        },
        link({
          name: 'button',
          overrides: {
            admin: { description: 'CTA button' },
          },
        }),
      ],
    }),
  ],
}
