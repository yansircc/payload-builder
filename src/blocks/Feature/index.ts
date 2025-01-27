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

// Export config
export { feature1Fields } from './components/Feature1/config'
export { feature2Fields } from './components/Feature2/config'

// Export components
export const Feature1 = Feature1Component
export const Feature2 = Feature2Component

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
}

// Export type
export type { FeatureComponentProps }
