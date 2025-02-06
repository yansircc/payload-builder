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
 * About3 field validation and type definitions
 */
export const schemas = {
  /** Main section */
  mainSection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
  }),

  /** Content section */
  contentSection: z.object({
    mainImage: commonSchemas.media.image.describe('Main content image'),
    infoBox: z.object({
      icon: commonSchemas.media.image.describe('Info box icon'),
      title: aboutSchemas.title,
      description: aboutSchemas.description,
      buttonLink: commonSchemas.ui.link,
    }),
    sideImage: commonSchemas.media.image.describe('Side content image'),
  }),

  /** Client section */
  clientSection: z.object({
    title: aboutSchemas.title,
    clients: z
      .array(
        z.object({
          logo: commonSchemas.media.image.describe('Client logo'),
          name: z.string().describe('Client name'),
        }),
      )
      .min(1)
      .max(6),
  }),

  /** Stats section */
  statsSection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
    stats: z
      .array(
        z.object({
          label: z.string().describe('Statistic label'),
          value: z.string().describe('Statistic value'),
        }),
      )
      .min(1)
      .max(4),
  }),
}

/**
 * Complete configuration for About3
 */
export const about3Fields: GroupField = {
  name: 'about-3',
  interfaceName: 'About3Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Modern about section with main content, clients, and statistics',
  },
  fields: [
    // Main Section
    createSectionField({
      name: 'mainSection',
      label: 'Main Section',
      fields: [baseFields.content.title, baseFields.content.description],
    }),

    // Content Section
    createSectionField({
      name: 'contentSection',
      label: 'Content Section',
      fields: [
        {
          ...baseFields.media.image,
          name: 'mainImage',
          admin: { description: 'Main content image' },
        },
        createFieldGroup({
          name: 'infoBox',
          label: 'Info Box',
          fields: [
            {
              ...baseFields.media.image,
              name: 'icon',
              admin: { description: 'Info box icon' },
            },
            baseFields.content.title,
            baseFields.content.description,
            link({
              name: 'buttonLink',
              overrides: {
                admin: { description: 'CTA button' },
              },
            }),
          ],
        }),
        {
          ...baseFields.media.image,
          name: 'sideImage',
          admin: { description: 'Side content image' },
        },
      ],
    }),

    // Client Section
    createSectionField({
      name: 'clientSection',
      label: 'Client Section',
      fields: [
        baseFields.content.title,
        createArrayField({
          name: 'clients',
          fields: [
            {
              ...baseFields.media.image,
              name: 'logo',
              admin: { description: 'Client logo' },
            },
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: { description: 'Client name' },
            },
          ],
          minRows: 1,
          maxRows: 6,
          admin: { description: 'Client logos and names (1-6 items)' },
        }),
      ],
    }),

    // Stats Section
    createSectionField({
      name: 'statsSection',
      label: 'Stats Section',
      fields: [
        baseFields.content.title,
        baseFields.content.description,
        createArrayField({
          name: 'stats',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { description: 'Statistic label' },
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: { description: 'Statistic value' },
            },
          ],
          minRows: 1,
          maxRows: 4,
          admin: { description: 'Statistics to display (1-4 items)' },
        }),
      ],
    }),
  ],
}
