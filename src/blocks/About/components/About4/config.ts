import { link } from '@/fields/link'
import type { GroupField } from 'payload'
import { z } from 'zod'
import { aboutSchemas } from '../shared/base-field'

/**
 * About4 field validation and type definitions
 */
export const schemas = {
  mainSection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
  }),
  gallerySection: z.object({
    images: z.array(aboutSchemas.image),
  }),
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
  ctaSection: z.object({
    title: aboutSchemas.title,
    button: aboutSchemas.link,
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
          admin: {
            description: 'Main title (e.g., "Welcome to Our Team")',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Main description text',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'gallerySection',
      label: 'Gallery Section',
      fields: [
        {
          name: 'images',
          type: 'array',
          required: true,
          minRows: 6,
          maxRows: 6,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'contentSection',
      label: 'Content Section',
      fields: [
        {
          type: 'group',
          name: 'vision',
          label: 'Vision Section',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Vision section title',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Vision section description',
              },
            },
          ],
        },
        {
          type: 'group',
          name: 'creators',
          label: 'Creators Section',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Creators section title',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Creators section description',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'ctaSection',
      label: 'CTA Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'CTA section title',
          },
        },
        link({
          name: 'button',
          overrides: {
            admin: {
              description: 'CTA button',
            },
          },
        }),
      ],
    },
  ],
  admin: {
    description: 'Modern about section with team gallery and vision/creators content',
  },
}
