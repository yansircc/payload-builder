/**
 * Footer components export file
 *
 * This file is responsible for:
 * 1. Exporting all footer components and configurations
 * 2. Managing component-to-style mappings
 * 3. Centralizing type definitions
 *
 * By using a centralized export management, we avoid redundant configurations in renderBlocks
 */

import type { Footer } from '@/payload-types'
import type { ComponentType } from 'react'

// Import all Footer components
import Footer1Component from './components/Footer1/Component'
import Footer2Component from './components/Footer2/Component'
import Footer3Component from './components/Footer3/Component'
import Footer4Component from './components/Footer4/Component'
// import Footer5Component from './components/Footer5/Component'
// import Footer6Component from './components/Footer6/Component'
// import Footer7Component from './components/Footer7/Component'
// import Footer8Component from './components/Footer8/Component'
// import Footer9Component from './components/Footer9/Component'
// import Footer10Component from './components/Footer10/Component'

// Export config
export { footer1Fields } from './components/Footer1/config'
export { footer2Fields } from './components/Footer2/config'
export { footer3Fields } from './components/Footer3/config'
// export { footer4Fields } from './components/Footer4/config'
// export { footer5Fields } from './components/Footer5/config'
// export { footer6Fields } from './components/Footer6/config'
// export { footer7Fields } from './components/Footer7/config'
// export { footer8Fields } from './components/Footer8/config'
// export { footer9Fields } from './components/Footer9/config'
// export { footer10Fields } from './components/Footer10/config'

// Export components
export const Footer1 = Footer1Component
export const Footer2 = Footer2Component
export const Footer3 = Footer3Component
export const Footer4 = Footer4Component
// export const Footer5 = Footer5Component
// export const Footer6 = Footer6Component
// export const Footer7 = Footer7Component
// export const Footer8 = Footer8Component
// export const Footer9 = Footer9Component
// export const Footer10 = Footer10Component

// Define Footer component props type
type FooterComponentProps<T extends NonNullable<Footer['style']>> = NonNullable<Footer[T]>

// Footer component mapping
export const footerComponents: Record<
  NonNullable<Required<Footer>['style']>,
  ComponentType<FooterComponentProps<any>>
> = {
  'footer-1': Footer1,
  'footer-2': Footer2,
  'footer-3': Footer3,
  'footer-4': Footer4,
  // 'footer-5': Footer5,
  // 'footer-6': Footer6,
  // 'footer-7': Footer7,
  // 'footer-8': Footer8,
  // 'footer-9': Footer9,
  // 'footer-10': Footer10,
}

// Export type
export type { FooterComponentProps }
