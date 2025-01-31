import { ComponentType } from 'react'
import Logos1Component from './components/Logos1/Component'
export { logos1Fields } from './components/Logos1/config'

export const Logos1 = Logos1Component

export interface LogosComponentProps<T> {
  logos: T
}

export const logosComponents: Record<string, ComponentType<LogosComponentProps<any>>> = {
  'logos-1': Logos1,
}
