import { link } from '@/fields/link'
import type { GroupField } from 'payload'
import { z } from 'zod'
import { aboutSchemas } from '../shared/base-field'

/**
 * About3 field validation and type definitions
 */
export const schemas = {
  mainSection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
  }),
  contentSection: z.object({
    mainImage: aboutSchemas.image,
    infoBox: z.object({
      icon: aboutSchemas.image,
      title: aboutSchemas.title,
      description: aboutSchemas.description,
      buttonLink: aboutSchemas.link,
    }),
    sideImage: aboutSchemas.image,
  }),
  clientSection: z.object({
    title: aboutSchemas.title,
    clients: z.array(
      z.object({
        logo: aboutSchemas.image,
        name: z.string(),
      }),
    ),
  }),
  statsSection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
    stats: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ),
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
  fields: [
    {
      type: 'group',
      name: 'mainSection',
      label: 'Main Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'contentSection',
      label: 'Content Section',
      fields: [
        {
          name: 'mainImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          type: 'group',
          name: 'infoBox',
          label: 'Info Box',
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            link({
              name: 'buttonLink',
              overrides: {
                admin: {
                  description: 'CTA button ',
                },
              },
            }),
          ],
        },
        {
          name: 'sideImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'clientSection',
      label: 'Client Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'clients',
          type: 'array',
          minRows: 1,
          maxRows: 6,
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'name',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'statsSection',
      label: 'Stats Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'stats',
          type: 'array',
          minRows: 1,
          maxRows: 4,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  admin: {
    description: 'Modern about section with main content, clients, and statistics',
  },
}
