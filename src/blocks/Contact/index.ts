/**
 * Contact components export file
 *
 * This file is responsible for:
 * 1. Exporting all contact components and configurations
 * 2. Managing component-to-style mappings
 * 3. Centralizing type definitions
 *
 * By using a centralized export management, we avoid redundant configurations in renderBlocks
 */

import type { ContactBlock } from '@/payload-types'
import type { ComponentType } from 'react'

// Import all Contact components
import Contact1Component from './components/Contact1/Component'
import Contact2Component from './components/Contact2/Component'

// Export config
export { contact1Fields } from './components/Contact1/config'
export { contact2Fields } from './components/Contact2/config'

// Export components
export const Contact1 = Contact1Component
export const Contact2 = Contact2Component

// Define Contact component props type
type ContactComponentProps<T extends NonNullable<ContactBlock['style']>> = NonNullable<
  ContactBlock[T]
>

// Contact component mapping
export const contactComponents: Record<
  NonNullable<Required<ContactBlock>['style']>,
  ComponentType<ContactComponentProps<any>>
> = {
  'contact-1': Contact1,
  'contact-2': Contact2,
}

// Export type
export type { ContactComponentProps }
