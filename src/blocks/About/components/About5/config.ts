import type { GroupField } from 'payload'
import { z } from 'zod'
import {
  aboutSchemas,
  baseFields,
  commonSchemas,
  createArrayField,
  createSectionField,
} from '../shared/base-field'

/**
 * About5 field validation and type definitions
 */
export const schemas = {
  /** Main section */
  mainSection: z.object({
    label: aboutSchemas.label,
    title: aboutSchemas.title,
    description: aboutSchemas.description,
  }),

  /** Image section */
  imageSection: z.object({
    image: commonSchemas.media.image.describe('Main section image'),
    caption: z.string().describe('Image caption text'),
  }),

  /** Partners section */
  partnersSection: z.object({
    title: aboutSchemas.title,
    partners: z
      .array(
        z.object({
          logo: commonSchemas.media.image.describe('Partner company logo'),
        }),
      )
      .length(4),
  }),

  /** Mission section */
  missionSection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
    stats: z
      .array(
        z.object({
          value: z.string().describe('Statistic value'),
          label: z.string().describe('Statistic label'),
        }),
      )
      .length(2),
    image: commonSchemas.media.image.describe('Mission section image'),
  }),
}

/**
 * Complete configuration for About5
 */
export const about5Fields: GroupField = {
  name: 'about-5',
  interfaceName: 'About5Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Modern about section with mission and partners showcase',
  },
  fields: [
    // Main Section
    createSectionField({
      name: 'mainSection',
      label: 'Main Section',
      fields: [
        {
          ...baseFields.content.label,
          admin: {
            description: 'Section label (e.g., "ABOUT US")',
          },
        },
        baseFields.content.title,
        baseFields.content.description,
      ],
    }),

    // Image Section
    createSectionField({
      name: 'imageSection',
      label: 'Image Section',
      fields: [
        {
          ...baseFields.media.image,
          admin: { description: 'Main image' },
        },
        {
          name: 'caption',
          type: 'text',
          required: true,
          admin: { description: 'Image caption' },
        },
      ],
    }),

    // Partners Section
    createSectionField({
      name: 'partnersSection',
      label: 'Partners Section',
      fields: [
        {
          ...baseFields.content.title,
          admin: { description: 'Partners section title' },
        },
        createArrayField({
          name: 'partners',
          fields: [
            {
              ...baseFields.media.image,
              name: 'logo',
              admin: { description: 'Partner logo' },
            },
          ],
          minRows: 4,
          maxRows: 4,
          admin: { description: 'Partner logos (exactly 4 items)' },
        }),
      ],
    }),

    // Mission Section
    createSectionField({
      name: 'missionSection',
      label: 'Mission Section',
      fields: [
        {
          ...baseFields.content.title,
          admin: { description: 'Mission section title' },
        },
        {
          ...baseFields.content.description,
          admin: { description: 'Mission description' },
        },
        createArrayField({
          name: 'stats',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: { description: 'Statistic value' },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { description: 'Statistic label' },
            },
          ],
          minRows: 2,
          maxRows: 2,
          admin: { description: 'Mission statistics (exactly 2 items)' },
        }),
        {
          ...baseFields.media.image,
          admin: { description: 'Mission section image' },
        },
      ],
    }),
  ],
}
