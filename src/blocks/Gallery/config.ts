import type { Block } from 'payload'
import { gallery6Fields } from './components/Gallery6/config'
import { gallery7Fields } from './components/Gallery7/config'
/**
 * Gallery block configuration
 */
export const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: ['gallery-6', 'gallery-7'],
    },
    {
      ...gallery6Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'gallery-6',
      },
      // TODO: Add AI hook to generate copy in the next release
    },
    {
      ...gallery7Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'gallery-7',
      },
    },
  ],
}
