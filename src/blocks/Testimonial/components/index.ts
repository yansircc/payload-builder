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
import Testimonial14Component from './testimonial-14/Component'

// Export config
export { testimonial14Fields } from './testimonial-14/config'

// Export components
export const Testimonial14 = Testimonial14Component

// Define Testimonial component props type
type TestimonialComponentProps<T extends NonNullable<TestimonialBlock['style']>> = NonNullable<
  TestimonialBlock[T]
>

// Define testimonial components mapping
export const testimonialComponents: Record<
  'testimonial-14',
  ComponentType<TestimonialComponentProps<any>>
> = {
  'testimonial-14': Testimonial14,
}
