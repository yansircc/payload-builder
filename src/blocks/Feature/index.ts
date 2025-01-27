/**
 * Feature components export file
 *
 * This file is responsible for:
 * 1. Exporting all feature components and configurations
 * 2. Managing component-to-style mappings
 * 3. Centralizing type definitions
 *
 * By using a centralized export management, we avoid redundant configurations in renderBlocks
 */

import type { FeatureBlock } from '@/payload-types'
import type { ComponentType } from 'react'

// Import all Feature components
import Feature1Component from './components/Feature1/Component'
import Feature2Component from './components/Feature2/Component'
import Feature3Component from './components/Feature3/Component'
import Feature5Component from './components/Feature5/Component'
import {
  default as Feature6Component,
  default as Feature7Component,
} from './components/Feature6/Component'

// Export config
export { feature1Fields } from './components/Feature1/config'
export { feature2Fields } from './components/Feature2/config'
export { feature3Fields } from './components/Feature3/config'
export { feature5Fields } from './components/Feature5/config'
export { feature6Fields } from './components/Feature6/config'
export { feature7Fields } from './components/Feature7/config'
// Export components
export const Feature1 = Feature1Component
export const Feature2 = Feature2Component
export const Feature3 = Feature3Component
export const Feature5 = Feature5Component
export const Feature6 = Feature6Component
export const Feature7 = Feature7Component

// Define Feature component props type
type FeatureComponentProps<T extends NonNullable<FeatureBlock['style']>> = NonNullable<
  FeatureBlock[T]
>

// Feature component mapping
export const featureComponents: Record<
  NonNullable<Required<FeatureBlock>['style']>,
  ComponentType<FeatureComponentProps<any>>
> = {
  'feature-1': Feature1,
  'feature-2': Feature2,
  'feature-3': Feature3,
  'feature-5': Feature5,
  'feature-6': Feature6,
  'feature-7': Feature7,
}

// Export type
export type { FeatureComponentProps }
