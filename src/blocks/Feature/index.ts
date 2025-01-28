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
import Feature10Component from './components/Feature10/Component'
import Feature11Component from './components/Feature11/Component'
import Feature13Component from './components/Feature13/Component'
import Feature14Component from './components/Feature14/Component'
import Feature2Component from './components/Feature2/Component'
import Feature3Component from './components/Feature3/Component'
import Feature5Component from './components/Feature5/Component'
import Feature6Component from './components/Feature6/Component'
import Feature7Component from './components/Feature7/Component'
// Export config
export { feature1Fields } from './components/Feature1/config'
export { feature10Fields } from './components/Feature10/config'
export { feature11Fields } from './components/Feature11/config'
export { feature13Fields } from './components/Feature13/config'
export { feature14Fields } from './components/Feature14/config'
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
export const Feature10 = Feature10Component
export const Feature11 = Feature11Component
export const Feature13 = Feature13Component
export const Feature14 = Feature14Component
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
  'feature-10': Feature10,
  'feature-11': Feature11,
  'feature-13': Feature13,
  'feature-14': Feature14,
}

// Export type
export type { FeatureComponentProps }
