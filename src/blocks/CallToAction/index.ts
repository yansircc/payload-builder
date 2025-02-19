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

import type { ComponentType } from 'react'
import type { CTABlock } from '@/payload-types'
// Import CTA components
import CTA1Component from './components/Cta1/Component'
import CTA3Component from './components/Cta3/Component'
import CTA4Component from './components/Cta4/Component'
import CTA5Component from './components/Cta5/Component'
import CTA7Component from './components/Cta7/Component'
import CTA10Component from './components/Cta10/Component'
import CTA11Component from './components/Cta11/Component'
import CTA15Component from './components/Cta15/Component'
import CTA16Component from './components/Cta16/Component'
import CTA17Component from './components/Cta17/Component'

// Export config
export { cta1Fields } from './components/Cta1/config'
export { cta10Fields } from './components/Cta10/config'
export { cta11Fields } from './components/Cta11/config'
export { cta15Fields } from './components/Cta15/config'
export { cta16Fields } from './components/Cta16/config'
export { cta17Fields } from './components/Cta17/config'
export { cta3Fields } from './components/Cta3/config'
export { cta4Fields } from './components/Cta4/config'
export { cta5Fields } from './components/Cta5/config'
export { cta7Fields } from './components/Cta7/config'
// Export components
export const CTA1 = CTA1Component
export const CTA3 = CTA3Component
export const CTA4 = CTA4Component
export const CTA5 = CTA5Component
export const CTA7 = CTA7Component
export const CTA10 = CTA10Component
export const CTA11 = CTA11Component
export const CTA15 = CTA15Component
export const CTA16 = CTA16Component
export const CTA17 = CTA17Component
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
  'cta-10': CTA10,
  'cta-11': CTA11,
  'cta-15': CTA15,
  'cta-16': CTA16,
  'cta-17': CTA17,
}

// Export type
export type { CTAComponentProps }
