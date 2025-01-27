/**
 * CallToAction components export file
 *
 * This file is responsible for:
 * 1. Exporting all CTA components and configurations
 * 2. Managing component-to-style mappings
 * 3. Centralizing type definitions
 */

import type { CallToActionBlock } from '@/payload-types'

// Import all CTA components
import CTA10Component from './cta-10/Component'
import CTA11Component from './cta-11/Component'

// Export config
export { cta10Fields } from './cta-10/config'
export { cta11Fields } from './cta-11/config'

// Export components
export const CTA10 = CTA10Component
export const CTA11 = CTA11Component

// Define CTA component props type
type CTAComponentProps<T extends 'cta-10' | 'cta-11'> = NonNullable<
  CallToActionBlock[T]
>

// CTA component mapping
export const ctaComponents = {
  'cta-10': CTA10Component,
  'cta-11': CTA11Component,
} as Record<NonNullable<CallToActionBlock['type']>, React.ComponentType<any>>

// Export type
export type { CTAComponentProps }
