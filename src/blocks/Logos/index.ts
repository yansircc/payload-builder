import type { ComponentType } from 'react'
import Logos1Component from './components/Logos1/Component'
import Logos2Component from './components/Logos2/Component'
import Logos3Component from './components/Logos3/Component'
export { logos1Fields } from './components/Logos1/config'
export { logos2Fields } from './components/Logos2/config'
export { logos3Fields } from './components/Logos3/config'

export const Logos1 = Logos1Component
export const Logos2 = Logos2Component
export const Logos3 = Logos3Component

export interface LogosComponentProps<T> {
  logos: T
}

export const logosComponents: Record<string, ComponentType<LogosComponentProps<any>>> = {
  'logos-1': Logos1,
  'logos-2': Logos2,
  'logos-3': Logos3,
}
