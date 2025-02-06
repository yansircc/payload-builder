import type { GroupField } from 'payload'
import { z } from 'zod'
import { aboutSchemas } from '../shared/base-field'

/**
 * About5 field validation and type definitions
 */
export const schemas = {
  mainSection: z.object({
    label: aboutSchemas.label,
    title: aboutSchemas.title,
    description: aboutSchemas.description,
  }),
  imageSection: z.object({
    image: aboutSchemas.image,
    caption: z.string(),
  }),
  partnersSection: z.object({
    title: aboutSchemas.title,
    partners: z.array(
      z.object({
        logo: aboutSchemas.image,
      }),
    ),
  }),
  missionSection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
    stats: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    ),
    image: aboutSchemas.image,
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
  fields: [
    {
      type: 'group',
      name: 'mainSection',
      label: 'Main Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Section label (e.g., "ABOUT US")',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Main title',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Main description',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'imageSection',
      label: 'Image Section',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Main image',
          },
        },
        {
          name: 'caption',
          type: 'text',
          required: true,
          admin: {
            description: 'Image caption',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'partnersSection',
      label: 'Partners Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Partners section title',
          },
        },
        {
          name: 'partners',
          type: 'array',
          required: true,
          minRows: 4,
          maxRows: 4,
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Partner logo',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'missionSection',
      label: 'Mission Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Mission section title',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Mission description',
          },
        },
        {
          name: 'stats',
          type: 'array',
          required: true,
          minRows: 2,
          maxRows: 2,
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: {
                description: 'Statistic value',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                description: 'Statistic label',
              },
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Mission section image',
          },
        },
      ],
    },
  ],
  admin: {
    description: 'Modern about section with mission and partners showcase',
  },
}
