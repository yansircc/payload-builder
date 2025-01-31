/**
 * Testimonial components export file
 *
 * This file is responsible for:
 * 1. Exporting all testimonial components and configurations
 * 2. Managing component-to-style mappings
 * 3. Centralizing type definitions
 *
 * By using a centralized export management, we avoid redundant configurations in renderBlocks
 */

import type { TestimonialBlock } from '@/payload-types'
import type { ComponentType } from 'react'

// Import all Testimonial components
import Testimonial14Component from './Testimonial14/Component'
import Testimonial15Component from './Testimonial15/Component'
import Testimonial16Component from './Testimonial16/Component'
import Testimonial17Component from './Testimonial17/Component'
import Testimonial18Component from './Testimonial18/Component'
import Testimonial19Component from './Testimonial19/Component'
import Testimonial4Component from './Testimonial4/Component'
import Testimonial6Component from './Testimonial6/Component'
import Testimonial7Component from './Testimonial7/Component'

// Export config
export { testimonial14Fields } from './Testimonial14/config'
export { testimonial15Fields } from './Testimonial15/config'
export { testimonial16Fields } from './Testimonial16/config'
export { testimonial17Fields } from './Testimonial17/config'
export { testimonial18Fields } from './Testimonial18/config'
export { testimonial19Fields } from './Testimonial19/config'
export { testimonial4Fields } from './Testimonial4/config'
export { testimonial6Fields } from './Testimonial6/config'
export { testimonial7Fields } from './Testimonial7/config'

// Export components
export const Testimonial4 = Testimonial4Component
export const Testimonial6 = Testimonial6Component
export const Testimonial7 = Testimonial7Component
export const Testimonial14 = Testimonial14Component
export const Testimonial15 = Testimonial15Component
export const Testimonial16 = Testimonial16Component
export const Testimonial17 = Testimonial17Component
export const Testimonial18 = Testimonial18Component
export const Testimonial19 = Testimonial19Component

// Define Testimonial component props type
type TestimonialComponentProps<T extends NonNullable<TestimonialBlock['style']>> = NonNullable<
  TestimonialBlock[T]
>

// Define testimonial components mapping
export const testimonialComponents: Record<
  | 'testimonial-4'
  | 'testimonial-6'
  | 'testimonial-7'
  | 'testimonial-14'
  | 'testimonial-15'
  | 'testimonial-16'
  | 'testimonial-17'
  | 'testimonial-18'
  | 'testimonial-19',
  ComponentType<TestimonialComponentProps<any>>
> = {
  'testimonial-4': Testimonial4,
  'testimonial-6': Testimonial6,
  'testimonial-7': Testimonial7,
  'testimonial-14': Testimonial14,
  'testimonial-15': Testimonial15,
  'testimonial-16': Testimonial16,
  'testimonial-17': Testimonial17,
  'testimonial-18': Testimonial18,
  'testimonial-19': Testimonial19,
}
