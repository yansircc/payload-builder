import { ComponentType } from 'react'
import Logos1Component from './components/Logos1/Component'
import Logos2Component from './components/Logos2/Component'
export { logos1Fields } from './components/Logos1/config'
export { logos2Fields } from './components/Logos2/config'

export const Logos1 = Logos1Component
export const Logos2 = Logos2Component

export interface LogosComponentProps<T> {
  logos: T
}

export const logosComponents: Record<string, ComponentType<LogosComponentProps<any>>> = {
  'logos-1': Logos1,
  'logos-2': Logos2,
}
