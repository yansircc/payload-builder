/**
 * FAQ components export file
 *
 * This file is responsible for:
 * 1. Exporting all faq components and configurations
 * 2. Managing component-to-style mappings
 * 3. Centralizing type definitions
 *
 * By using a centralized export management, we avoid redundant configurations in renderBlocks
 */

import type { ComponentType } from 'react'
import type { FAQBlock } from '@/payload-types'
// Import all FAQ components
import FAQ1Component from './components/FAQ1/Component'
import FAQ2Component from './components/FAQ2/Component'
import FAQ3Component from './components/FAQ3/Component'
import FAQ4Component from './components/FAQ4/Component'
import FAQ5Component from './components/FAQ5/Component'
import FAQ6Component from './components/FAQ6/Component'

// Export config
export { faq1Fields } from './components/FAQ1/config'
export { faq2Fields } from './components/FAQ2/config'
export { faq3Fields } from './components/FAQ3/config'
export { faq4Fields } from './components/FAQ4/config'
export { faq5Fields } from './components/FAQ5/config'
export { faq6Fields } from './components/FAQ6/config'
// Export components
export const FAQ1 = FAQ1Component
export const FAQ2 = FAQ2Component
export const FAQ3 = FAQ3Component
export const FAQ4 = FAQ4Component
export const FAQ5 = FAQ5Component
export const FAQ6 = FAQ6Component
// Define FAQ component props type
type FAQComponentProps<T extends NonNullable<FAQBlock['style']>> = NonNullable<FAQBlock[T]>

// FAQ component mapping
export const faqComponents: Record<
  NonNullable<Required<FAQBlock>['style']>,
  ComponentType<FAQComponentProps<any>>
> = {
  'faq-1': FAQ1,
  'faq-2': FAQ2,
  'faq-3': FAQ3,
  'faq-4': FAQ4,
  'faq-5': FAQ5,
  'faq-6': FAQ6,
}

// Export type
export type { FAQComponentProps }
