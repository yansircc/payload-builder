import type { Block, Field } from 'payload'

import { gallery1Fields } from './components/Gallery1/config'
import { gallery3Fields } from './components/Gallery3/config'
import { gallery4Fields } from './components/Gallery4/config'
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
      options: ['gallery-1', 'gallery-3', 'gallery-4', 'gallery-6', 'gallery-7'],
    },
    {
      ...gallery1Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'gallery-1',
      },
    },
    {
      ...gallery3Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'gallery-3',
      },
    },
    {
      ...gallery4Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'gallery-4',
      },
    },
    {
      ...gallery6Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'gallery-6',
      },
    },
    {
      ...gallery7Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'gallery-7',
      },
    },
  ],
}

export const GalleryField: Field = {
  name: 'gallery',
  type: 'group',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [
        { label: 'Gallery 1', value: 'gallery-1' },
        { label: 'Gallery 3', value: 'gallery-3' },
        { label: 'Gallery 4', value: 'gallery-4' },
        { label: 'Gallery 6', value: 'gallery-6' },
        { label: 'Gallery 7', value: 'gallery-7' },
      ],
    },
    {
      ...gallery1Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'gallery-1',
      },
    },
    {
      ...gallery3Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'gallery-3',
      },
    },
    {
      ...gallery4Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'gallery-4',
      },
    },
    {
      ...gallery6Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'gallery-6',
      },
    },
    {
      ...gallery7Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'gallery-7',
      },
    },
  ],
}
