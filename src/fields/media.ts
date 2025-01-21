import type { UploadField } from 'payload'

const baseMedia: UploadField = {
  name: 'media',
  label: 'Media',
  type: 'upload',
  relationTo: 'media',
  required: true,
  admin: {
    description: '用于展示在首屏的特色图片',
  },
}

export default function createMediaField(types?: string[]): UploadField {
  if (!types) return baseMedia

  return {
    ...baseMedia,
    admin: {
      ...baseMedia.admin,
      condition: (_, { type } = {}) => types.includes(type),
    },
  }
}
