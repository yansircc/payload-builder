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
// Import all FAQ components
import FAQ1Component from '@/blocks/FAQ/components/FAQ1/Component'
import FAQ2Component from '@/blocks/FAQ/components/FAQ2/Component'
import FAQ3Component from '@/blocks/FAQ/components/FAQ3/Component'
import FAQ4Component from '@/blocks/FAQ/components/FAQ4/Component'
import FAQ5Component from '@/blocks/FAQ/components/FAQ5/Component'
import FAQ6Component from '@/blocks/FAQ/components/FAQ6/Component'
import type { FAQBlock } from '@/payload-types'

// Export config
export { faq1Fields } from '@/blocks/FAQ/components/FAQ1/server'
export { faq2Fields } from '@/blocks/FAQ/components/FAQ2/server'
export { faq3Fields } from '@/blocks/FAQ/components/FAQ3/server'
export { faq4Fields } from '@/blocks/FAQ/components/FAQ4/server'
export { faq5Fields } from '@/blocks/FAQ/components/FAQ5/server'
export { faq6Fields } from '@/blocks/FAQ/components/FAQ6/server'
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
