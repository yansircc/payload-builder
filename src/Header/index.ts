/**
 * Header components export file
 *
 * This file is responsible for:
 * 1. Exporting all header components and configurations
 * 2. Managing component-to-style mappings
 * 3. Centralizing type definitions
 *
 * By using a centralized export management, we avoid redundant configurations in renderBlocks
 */

import type { Header } from '@/payload-types'
import type { ComponentType } from 'react'

// Import all Header components
import Header1Component from './components/Header1/Component'
import Header3Component from './components/Header3/Component'
import Header5Component from './components/Header5/Component'

// Export config
export { header1Fields } from './components/Header1/config'
export { header3Fields } from './components/Header3/config'
export { header5Fields } from './components/Header5/config'

// Export components
export const Header1 = Header1Component
export const Header3 = Header3Component
export const Header5 = Header5Component

// Define Header component props type
type HeaderComponentProps<T extends NonNullable<Header['style']>> = NonNullable<Header[T]>

// Header component mapping
export const headerComponents: Record<
  NonNullable<Required<Header>['style']>,
  ComponentType<HeaderComponentProps<any>>
> = {
  'header-1': Header1,
  'header-3': Header3,
  'header-5': Header5,
}

// Export type
export type { HeaderComponentProps }
