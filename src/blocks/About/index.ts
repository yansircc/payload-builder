/**
 * About components export file
 *
 * This file is responsible for:
 * 1. Exporting all about components and configurations
 * 2. Managing component-to-style mappings
 * 3. Centralizing type definitions
 *
 * By using a centralized export management, we avoid redundant configurations in renderBlocks
 */

import type { AboutBlock } from '@/payload-types'
import type { ComponentType } from 'react'

// Import all About components
import About1Component from './components/About1/Component'
import About2Component from './components/About2/Component'
import About3Component from './components/About3/Component'

// Export config
export { about1Fields } from './components/About1/config'
export { about2Fields } from './components/About2/config'
export { about3Fields } from './components/About3/config'

// Export components
export const About1 = About1Component
export const About2 = About2Component
export const About3 = About3Component

// Define About component props type
type AboutComponentProps<T extends NonNullable<AboutBlock['style']>> = NonNullable<AboutBlock[T]>

// About component mapping
export const aboutComponents: Record<
  NonNullable<Required<AboutBlock>['style']>,
  ComponentType<AboutComponentProps<any>>
> = {
  'about-1': About1,
  'about-2': About2,
  'about-3': About3,
}
