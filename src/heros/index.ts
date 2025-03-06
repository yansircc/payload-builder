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

import type { ComponentType } from 'react'
import type { HeroField } from '@/payload-types'
// Import all Gallery components
import Hero1Component from './components/Hero1/Component'
import Hero3Component from './components/Hero3/Component'
import Hero5Component from './components/Hero5/Component'
import Hero6Component from './components/Hero6/Component'
import Hero7Component from './components/Hero7/Component'
import Hero8Component from './components/Hero8/Component'
import Hero12Component from './components/Hero12/Component'
import Hero24Component from './components/Hero24/Component'
import Hero25Component from './components/Hero25/Component'
import Hero32Component from './components/Hero32/Component'
import Hero34Component from './components/Hero34/Component'
import Hero45Component from './components/Hero45/Component'
import Hero115Component from './components/Hero115/Component'

// Export config
export { hero1Fields } from './components/Hero1/server'
export { hero115Fields } from './components/Hero115/server'
export { hero12Fields } from './components/Hero12/server'
export { hero24Fields } from './components/Hero24/server'
export { hero25Fields } from './components/Hero25/server'
export { hero3Fields } from './components/Hero3/server'
export { hero32Fields } from './components/Hero32/server'
export { hero34Fields } from './components/Hero34/server'
export { hero45Fields } from './components/Hero45/server'
export { hero5Fields } from './components/Hero5/server'
export { hero6Fields } from './components/Hero6/server'
export { hero7Fields } from './components/Hero7/server'
export { hero8Fields } from './components/Hero8/server'

// Export components
export const Hero1 = Hero1Component
export const Hero5 = Hero5Component
export const Hero7 = Hero7Component
export const Hero8 = Hero8Component
export const Hero12 = Hero12Component
export const Hero24 = Hero24Component
export const Hero25 = Hero25Component
export const Hero32 = Hero32Component
export const Hero34 = Hero34Component
export const Hero6 = Hero6Component
export const Hero3 = Hero3Component
export const Hero45 = Hero45Component
export const Hero115 = Hero115Component

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
  'hero-32': Hero32,
  'hero-34': Hero34,
  'hero-6': Hero6,
  'hero-3': Hero3,
  'hero-45': Hero45,
  'hero-115': Hero115,
}

// Export type
export type { HeroComponentProps }
