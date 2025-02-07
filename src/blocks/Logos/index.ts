/**
 * Logos components export file
 *
 * This file is responsible for:
 * 1. Exporting all logo components and configurations
 * 2. Managing component-to-style mappings
 * 3. Centralizing type definitions
 *
 * By using a centralized export management, we avoid redundant configurations in renderBlocks
 */

import type { ComponentType } from 'react'
import type { LogosBlock } from '@/payload-types'
// Import all Logos components
import Logos1Component from './components/Logos1/Component'
import Logos2Component from './components/Logos2/Component'
import Logos3Component from './components/Logos3/Component'
import Logos8Component from './components/Logos8/Component'

// Export config
export { logos1Fields } from './components/Logos1/config'
export { logos2Fields } from './components/Logos2/config'
export { logos3Fields } from './components/Logos3/config'
export { logos8Fields } from './components/Logos8/config'

// Export components
export const Logos1 = Logos1Component
export const Logos2 = Logos2Component
export const Logos3 = Logos3Component
export const Logos8 = Logos8Component

// Define Logos component props type
type LogosComponentProps<T extends NonNullable<LogosBlock['style']>> = NonNullable<LogosBlock[T]>

// Logos component mapping
export const logosComponents: Record<
  NonNullable<Required<LogosBlock>['style']>,
  ComponentType<LogosComponentProps<any>>
> = {
  'logos-1': Logos1,
  'logos-2': Logos2,
  'logos-3': Logos3,
  'logos-8': Logos8,
}
