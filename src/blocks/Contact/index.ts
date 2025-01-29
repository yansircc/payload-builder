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
import Contact3Component from './components/Contact3/Component'
import Contact4Component from './components/Contact4/Component'
import Contact5Component from './components/Contact5/Component'
import Contact6Component from './components/Contact6/Component'
// Export config
export { contact1Fields } from './components/Contact1/config'
export { contact2Fields } from './components/Contact2/config'
export { contact3Fields } from './components/Contact3/config'
export { contact4Fields } from './components/Contact4/config'
export { contact5Fields } from './components/Contact5/config'
export { contact6Fields } from './components/Contact6/config'
// Export components
export const Contact1 = Contact1Component
export const Contact2 = Contact2Component
export const Contact3 = Contact3Component
export const Contact4 = Contact4Component
export const Contact5 = Contact5Component
export const Contact6 = Contact6Component
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
  'contact-3': Contact3,
  'contact-4': Contact4,
  'contact-5': Contact5,
  'contact-6': Contact6,
}

// Export type
export type { ContactComponentProps }
