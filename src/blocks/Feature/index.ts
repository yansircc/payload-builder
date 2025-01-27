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

// Export config
export { feature1Fields } from './components/Feature1/config'

// Export components
export const Feature1 = Feature1Component

// Define Feature component props type
type FeatureStyle = 'feature-1'
type FeatureProps = Omit<FeatureBlock, 'style' | 'blockType'>

type FeatureComponentProps = {
  title?: string
  description?: string
  image?: any
  icon?: string
  primaryButton?: {
    icon: string
    label: string
  }
  secondaryButton?: {
    label: string
  }
}

// Feature component mapping
export const featureComponents: Record<FeatureStyle, ComponentType<FeatureComponentProps>> = {
  'feature-1': Feature1,
}

// Export type
export type { FeatureComponentProps, FeatureStyle }
