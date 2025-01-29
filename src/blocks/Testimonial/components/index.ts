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
import Testimonial4Component from './Testimonial4/Component'
import Testimonial6Component from './Testimonial6/Component'
import Testimonial7Component from './Testimonial7/Component'

// Export config
export { testimonial14Fields } from './Testimonial14/config'
export { testimonial15Fields } from './Testimonial15/config'
export { testimonial4Fields } from './Testimonial4/config'
export { testimonial6Fields } from './Testimonial6/config'
export { testimonial7Fields } from './Testimonial7/config'

// Export components
export const Testimonial4 = Testimonial4Component
export const Testimonial6 = Testimonial6Component
export const Testimonial7 = Testimonial7Component
export const Testimonial14 = Testimonial14Component
export const Testimonial15 = Testimonial15Component

// Define Testimonial component props type
type TestimonialComponentProps<T extends NonNullable<TestimonialBlock['style']>> = NonNullable<
  TestimonialBlock[T]
>

// Define testimonial components mapping
export const testimonialComponents: Record<
  'testimonial-4' | 'testimonial-6' | 'testimonial-7' | 'testimonial-14' | 'testimonial-15',
  ComponentType<TestimonialComponentProps<any>>
> = {
  'testimonial-4': Testimonial4,
  'testimonial-6': Testimonial6,
  'testimonial-7': Testimonial7,
  'testimonial-14': Testimonial14,
  'testimonial-15': Testimonial15,
}
