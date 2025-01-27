/**
 * CallToAction components export file
 *
 * This file is responsible for:
 * 1. Exporting all CTA components and configurations
 * 2. Managing component-to-style mappings
 * 3. Centralizing type definitions
 */


// Import all CTA components
import CTA10Component from './cta-10/Component'
import CTA11Component from './cta-11/Component'
import CTA13Component from './cta-13/Component'
import CTA4Component from './cta-4/Component'
import CTA5Component from './cta-5/Component'
import CTA7Component from './cta-7/Component'

// Export config
export { cta10Fields } from './cta-10/config'
export { cta11Fields } from './cta-11/config'
export { cta13Fields } from './cta-13/config'
export { cta4Fields } from './cta-4/config'
export { cta5Fields } from './cta-5/config'
export { cta7Fields } from './cta-7/config'

// Export components
export const CTA10 = CTA10Component
export const CTA11 = CTA11Component
export const CTA13 = CTA13Component
export const CTA4 = CTA4Component
export const CTA5 = CTA5Component
export const CTA7 = CTA7Component

// Base types for CTA components
interface BaseButtonProps {
  label: string
  link?: {
    type?: 'custom' | 'reference' | null
    newTab?: boolean | null
    reference?: {
      relationTo: 'pages' | 'posts'
      value: string
    } | null
    url?: string | null
    appearance?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary'
  } | null
}

interface BaseProps {
  title: string
  description?: string | null
}

// Specific CTA component props
interface CTA4Props extends BaseProps {
  features?: Array<{ text: string; id?: string | null }> | null
  button?: BaseButtonProps | null
}

interface CTA5Props extends BaseProps {
  buttons?: Array<BaseButtonProps> | null
}

interface CTA7Props extends BaseProps {
  subtitle?: string | null
  features?: Array<{ text: string; id?: string | null }> | null
  button?: BaseButtonProps | null
}

interface CTA10Props extends BaseProps {
  buttons?: Array<BaseButtonProps> | null
}

interface CTA11Props extends BaseProps {
  buttons?: Array<BaseButtonProps> | null
}

interface CTA13Props extends BaseProps {
  button?: BaseButtonProps | null
  privacyPolicy?: BaseButtonProps | null
}

// Define CTA component props type
export type CTAComponentProps = {
  'cta-4': { cta: CTA4Props }
  'cta-5': { cta: CTA5Props }
  'cta-7': { cta: CTA7Props }
  'cta-10': { cta: CTA10Props }
  'cta-11': { cta: CTA11Props }
  'cta-13': { cta: CTA13Props }
}[keyof typeof ctaComponents]

export interface CTAProps {
  cta: {
    title: string
    description?: string | null
    buttons?: Array<{
      label: string
      link?: {
        type?: 'custom' | 'reference' | null
        newTab?: boolean | null
        reference?: {
          relationTo: 'pages' | 'posts'
          value: string
        } | null
        url?: string | null
        appearance?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary'
      } | null
    }> | null
    features?: Array<{
      text: string
      id?: string | null
    }> | null
  }
}

// CTA component mapping
export const ctaComponents = {
  'cta-10': CTA10Component,
  'cta-11': CTA11Component,
  'cta-13': CTA13Component,
  'cta-4': CTA4Component,
  'cta-5': CTA5Component,
  'cta-7': CTA7Component,
} as const

// Export type
export type CTAType = keyof typeof ctaComponents
