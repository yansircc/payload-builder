import type { GroupField } from 'payload'
import { z } from 'zod'
import { aboutSchemas } from '../shared/base-field'

/**
 * About6 field validation and type definitions
 */
export const schemas = {
  storySection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
    content: z.string(),
  }),
  leftGallery: z.object({
    mainImage: aboutSchemas.image,
    sideImages: z.object({
      first: aboutSchemas.image,
      second: aboutSchemas.image,
    }),
  }),
  workplaceSection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
    content: z.string(),
  }),
  rightGallery: z.object({
    mainImage: aboutSchemas.image,
    sideImages: z.object({
      first: aboutSchemas.image,
      second: aboutSchemas.image,
    }),
  }),
}

/**
 * Complete configuration for About6
 */
export const about6Fields: GroupField = {
  name: 'about-6',
  interfaceName: 'About6Fields',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'group',
      name: 'storySection',
      label: 'Story Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Story section title',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Story section description',
          },
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Story section content',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'leftGallery',
      label: 'Left Gallery',
      fields: [
        {
          name: 'mainImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Main image (aspect ratio 0.7)',
          },
        },
        {
          type: 'group',
          name: 'sideImages',
          label: 'Side Images',
          fields: [
            {
              name: 'first',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'First side image (aspect ratio 1.1)',
              },
            },
            {
              name: 'second',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Second side image (aspect ratio 0.7)',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'workplaceSection',
      label: 'Workplace Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Workplace section title',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Workplace section description',
          },
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Workplace section content',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'rightGallery',
      label: 'Right Gallery',
      fields: [
        {
          name: 'mainImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Main image (aspect ratio 0.9)',
          },
        },
        {
          type: 'group',
          name: 'sideImages',
          label: 'Side Images',
          fields: [
            {
              name: 'first',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'First side image (aspect ratio 0.8)',
              },
            },
            {
              name: 'second',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Second side image (aspect ratio 0.9)',
              },
            },
          ],
        },
      ],
    },
  ],
  admin: {
    description: 'Modern about section with story and workplace galleries',
  },
}
