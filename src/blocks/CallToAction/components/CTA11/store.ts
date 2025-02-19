import type { CTA11Fields } from '@/payload-types'
import { createStore } from '../shared'

export const useCTA11Store = createStore<CTA11Fields>(['title', 'subtitle', 'links'])
