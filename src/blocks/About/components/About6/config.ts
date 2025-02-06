import type { GroupField } from 'payload'
import { z } from 'zod'
import {
  aboutSchemas,
  baseFields,
  commonSchemas,
  createFieldGroup,
  createSectionField,
} from '../shared/base-field'

/**
 * About6 field validation and type definitions
 */
export const schemas = {
  /** Story section */
  storySection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
    content: z.string().describe('Story section detailed content'),
  }),

  /** Left gallery */
  leftGallery: z.object({
    mainImage: commonSchemas.media.image.describe('Main gallery image (aspect ratio 0.7)'),
    sideImages: z.object({
      first: commonSchemas.media.image.describe('First side image (aspect ratio 1.1)'),
      second: commonSchemas.media.image.describe('Second side image (aspect ratio 0.7)'),
    }),
  }),

  /** Workplace section */
  workplaceSection: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
    content: z.string().describe('Workplace section detailed content'),
  }),

  /** Right gallery */
  rightGallery: z.object({
    mainImage: commonSchemas.media.image.describe('Main gallery image (aspect ratio 0.9)'),
    sideImages: z.object({
      first: commonSchemas.media.image.describe('First side image (aspect ratio 0.8)'),
      second: commonSchemas.media.image.describe('Second side image (aspect ratio 0.9)'),
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
  admin: {
    description: 'Modern about section with story and workplace galleries',
  },
  fields: [
    // Story Section
    createSectionField({
      name: 'storySection',
      label: 'Story Section',
      fields: [
        baseFields.content.title,
        baseFields.content.description,
        {
          name: 'content',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Story section content',
          },
        },
      ],
    }),

    // Left Gallery
    createSectionField({
      name: 'leftGallery',
      label: 'Left Gallery',
      fields: [
        {
          ...baseFields.media.image,
          name: 'mainImage',
          admin: {
            description: 'Main image (aspect ratio 0.7)',
          },
        },
        createFieldGroup({
          name: 'sideImages',
          label: 'Side Images',
          fields: [
            {
              ...baseFields.media.image,
              name: 'first',
              admin: {
                description: 'First side image (aspect ratio 1.1)',
              },
            },
            {
              ...baseFields.media.image,
              name: 'second',
              admin: {
                description: 'Second side image (aspect ratio 0.7)',
              },
            },
          ],
        }),
      ],
    }),

    // Workplace Section
    createSectionField({
      name: 'workplaceSection',
      label: 'Workplace Section',
      fields: [
        baseFields.content.title,
        baseFields.content.description,
        {
          name: 'content',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Workplace section content',
          },
        },
      ],
    }),

    // Right Gallery
    createSectionField({
      name: 'rightGallery',
      label: 'Right Gallery',
      fields: [
        {
          ...baseFields.media.image,
          name: 'mainImage',
          admin: {
            description: 'Main image (aspect ratio 0.9)',
          },
        },
        createFieldGroup({
          name: 'sideImages',
          label: 'Side Images',
          fields: [
            {
              ...baseFields.media.image,
              name: 'first',
              admin: {
                description: 'First side image (aspect ratio 0.8)',
              },
            },
            {
              ...baseFields.media.image,
              name: 'second',
              admin: {
                description: 'Second side image (aspect ratio 0.9)',
              },
            },
          ],
        }),
      ],
    }),
  ],
}
