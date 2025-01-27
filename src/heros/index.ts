/**
 * Hero components export file
 *
 * This file is responsible for:
 * 1. Exporting all hero components and configurations
 * 2. Managing component-to-style mappings
 * 3. Centralizing type definitions
 *
 * By using a centralized export management, we avoid redundant configurations in renderBlocks
 */

import type { HeroField } from '@/payload-types'
import type { ComponentType } from 'react'

// Import all Gallery components
import Hero1Component from './components/Hero1/Component'
import Hero12Component from './components/Hero12/Component'
import Hero24Component from './components/Hero24/Component'
import Hero25Component from './components/Hero25/Component'
import Hero34Component from './components/Hero34/Component'
import Hero5Component from './components/Hero5/Component'
import Hero6Component from './components/Hero6/Component'
import Hero7Component from './components/Hero7/Component'
import Hero8Component from './components/Hero8/Component'

// Export config
export { hero1Fields } from './components/Hero1/config'
export { hero12Fields } from './components/Hero12/config'
export { hero24Fields } from './components/Hero24/config'
export { hero25Fields } from './components/Hero25/config'
export { hero34Fields } from './components/Hero34/config'
export { hero5Fields } from './components/Hero5/config'
export { hero6Fields } from './components/Hero6/config'
export { hero7Fields } from './components/Hero7/config'
export { hero8Fields } from './components/Hero8/config'

// Export components
export const Hero1 = Hero1Component
export const Hero5 = Hero5Component
export const Hero7 = Hero7Component
export const Hero8 = Hero8Component
export const Hero12 = Hero12Component
export const Hero24 = Hero24Component
export const Hero25 = Hero25Component
export const Hero34 = Hero34Component
export const Hero6 = Hero6Component

// Define Gallery component props type
type HeroComponentProps<T extends NonNullable<HeroField['style']>> = NonNullable<HeroField[T]>

// Hero component mapping
export const heroComponents: Record<
  NonNullable<Required<HeroField>['style']>,
  ComponentType<HeroComponentProps<any>>
> = {
  'hero-1': Hero1,
  'hero-5': Hero5,
  'hero-7': Hero7,
  'hero-8': Hero8,
  'hero-12': Hero12,
  'hero-24': Hero24,
  'hero-25': Hero25,
  'hero-34': Hero34,
  'hero-6': Hero6,
}

// Export type
export type { HeroComponentProps }
