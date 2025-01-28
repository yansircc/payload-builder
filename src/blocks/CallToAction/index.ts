/**
 * Call to Action components export file
 *
 * This file is responsible for:
 * 1. Exporting all CTA components and configurations
 * 2. Managing component-to-template mappings
 * 3. Centralizing type definitions
 *
 * By using a centralized export management, we avoid redundant configurations in renderBlocks
 */

import type { CTABlock } from '@/payload-types'
import type { ComponentType } from 'react'

// Import CTA components
import CTA1Component from './components/CTA1/Component'
import CTA3Component from './components/CTA3/Component'
import CTA4Component from './components/CTA4/Component'

// Export config
export { cta1Fields } from './components/CTA1/config'
export { cta3Fields } from './components/CTA3/config'
export { cta4Fields } from './components/CTA4/config'
// Export components
export const CTA1 = CTA1Component
export const CTA3 = CTA3Component
export const CTA4 = CTA4Component

// Define CTA component props type
type CTAComponentProps<T extends NonNullable<CTABlock['style']>> = NonNullable<CTABlock[T]>

// CTA component mapping
export const ctaComponents: Record<
  NonNullable<Required<CTABlock>['style']>,
  ComponentType<CTAComponentProps<any>>
> = {
  'cta-1': CTA1,
  'cta-3': CTA3,
  'cta-4': CTA4,
}

// Export type
export type { CTAComponentProps }
