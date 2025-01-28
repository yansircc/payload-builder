/**
 * Gallery components export file
 *
 * This file is responsible for:
 * 1. Exporting all gallery components and configurations
 * 2. Managing component-to-style mappings
 * 3. Centralizing type definitions
 *
 * By using a centralized export management, we avoid redundant configurations in renderBlocks
 */

import type { GalleryBlock } from '@/payload-types'
import type { ComponentType } from 'react'

// Import all Gallery components
import Gallery1Component from './Gallery1/Component'
import Gallery3Component from './Gallery3/Component'
import Gallery4Component from './Gallery4/Component'
import Gallery5Component from './Gallery5/Component'
import Gallery6Component from './Gallery6/Component'
import Gallery9Component from './Gallery9/Component'

// Export config
export { gallery1Fields } from './Gallery1/config'
export { gallery3Fields } from './Gallery3/config'
export { gallery4Fields } from './Gallery4/config'
export { gallery5Fields } from './Gallery5/config'
export { gallery6Fields } from './Gallery6/config'
export { gallery9Fields } from './Gallery9/config'

// Export components
export const Gallery1 = Gallery1Component
export const Gallery3 = Gallery3Component
export const Gallery4 = Gallery4Component
export const Gallery5 = Gallery5Component
export const Gallery6 = Gallery6Component
export const Gallery9 = Gallery9Component

// Define Gallery component props type
type GalleryComponentProps<T extends NonNullable<GalleryBlock['style']>> = NonNullable<
  GalleryBlock[T]
>

// Define gallery components mapping
export const galleryComponents: Record<
  'gallery-1' | 'gallery-3' | 'gallery-4' | 'gallery-5' | 'gallery-6' | 'gallery-9',
  ComponentType<GalleryComponentProps<any>>
> = {
  'gallery-1': Gallery1,
  'gallery-3': Gallery3,
  'gallery-4': Gallery4,
  'gallery-5': Gallery5,
  'gallery-6': Gallery6,
  'gallery-9': Gallery9,
}
