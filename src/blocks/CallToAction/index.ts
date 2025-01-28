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
import CTA5Component from './components/CTA5/Component'
import CTA7Component from './components/CTA7/Component'
// Export config
export { cta1Fields } from './components/CTA1/config'
export { cta3Fields } from './components/CTA3/config'
export { cta4Fields } from './components/CTA4/config'
export { cta5Fields } from './components/CTA5/config'
export { cta7Fields } from './components/CTA7/config'

// Export components
export const CTA1 = CTA1Component
export const CTA3 = CTA3Component
export const CTA4 = CTA4Component
export const CTA5 = CTA5Component
export const CTA7 = CTA7Component

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
  'cta-5': CTA5,
  'cta-7': CTA7,
}

// Export type
export type { CTAComponentProps }
