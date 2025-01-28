import type { Field, GroupField } from 'payload'
import { z } from 'zod'
import { createGalleryField, gallerySchemas } from '../shared/base-field'

export const schemas = {
  title: gallerySchemas.title,
  description: gallerySchemas.description,
  sections: z.array(
    z.object({
      image: gallerySchemas.image,
      title: z.string().describe('Section title'),
      text: z.string().describe('Section text'),
      icon: z.enum(['code', 'git-branch', 'sparkle']).describe('Section icon name'),
    }),
  ),
}

const sectionFields: Record<string, Field> = {
  image: {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Section image',
    },
  },
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Section title',
    },
  },
  text: {
    name: 'text',
    type: 'textarea',
    required: true,
    admin: {
      description: 'Section text',
    },
  },
  icon: {
    name: 'icon',
    type: 'select',
    required: true,
    options: [
      { label: 'Code', value: 'code' },
      { label: 'Git Branch', value: 'git-branch' },
      { label: 'Sparkle', value: 'sparkle' },
    ],
    admin: {
      description: 'Section icon',
    },
  },
}

export const gallery9Fields: GroupField = {
  name: 'gallery-9',
  interfaceName: 'Gallery9Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Gallery with carousel and sections',
  },
  fields: [
    createGalleryField({
      includeFields: ['title', 'description'],
      arrays: [
        {
          name: 'sections',
          fields: Object.values(sectionFields),
          minRows: 1,
          maxRows: 6,
          admin: {
            description: 'Gallery sections (1-6)',
          },
        },
      ],
    }),
  ],
}
