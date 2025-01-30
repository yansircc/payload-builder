/**
 * Footer components export file
 *
 * This file is responsible for:
 * 1. Exporting all footer components and configurations
 * 2. Managing component-to-style mappings
 * 3. Centralizing type definitions
 *
 * By using a centralized export management, we avoid redundant configurations in renderBlocks
 */

import type { Footer } from '@/payload-types'
import type { ComponentType } from 'react'

// Import all Footer components
import Footer1Component from './components/Footer1/Component'
import Footer2Component from './components/Footer2/Component'

// Export config
export { footer1Fields } from './components/Footer1/config'
export { footer2Fields } from './components/Footer2/config'

// Export components
export const Footer1 = Footer1Component
export const Footer2 = Footer2Component

// Define Footer component props type
type FooterComponentProps<T extends NonNullable<Footer['style']>> = NonNullable<Footer[T]>

// Footer component mapping
export const footerComponents: Record<
  NonNullable<Required<Footer>['style']>,
  ComponentType<FooterComponentProps<any>>
> = {
  'footer-1': Footer1,
  'footer-2': Footer2,
}

// Export type
export type { FooterComponentProps }
