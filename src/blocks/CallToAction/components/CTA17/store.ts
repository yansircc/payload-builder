import type { CTA17Fields } from '@/payload-types'
import { createStore } from '../shared'

export const useCTA17Store = createStore<CTA17Fields>(['title', 'subtitle', 'links'])
