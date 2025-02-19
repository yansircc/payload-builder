import type { CTA4Fields } from '@/payload-types'
import { createStore } from '../shared'

export const useCTA4Store = createStore<CTA4Fields>(['title', 'subtitle', 'links', 'lists'])
