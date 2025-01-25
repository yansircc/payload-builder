import type { Block } from 'payload'
import { gallery6Fields } from './fields/gallery-6'

/**
 * Gallery 区块配置
 */
export const GalleryBlock: Block = {
  slug: 'gallery',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: ['gallery-6'],
    },
    {
      ...gallery6Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'gallery-6',
      },
      // TODO: Add AI hook to generate copy in the next release
    },
  ],
}
