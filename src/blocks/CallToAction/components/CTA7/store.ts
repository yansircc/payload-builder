import type { CTA7Fields } from '@/payload-types'
import { createStore } from '../shared'

export const useCTA7Store = createStore<CTA7Fields>(['title', 'subtitle', 'links', 'lists'])
