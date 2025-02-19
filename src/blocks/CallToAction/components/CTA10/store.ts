import type { CTA10Fields } from '@/payload-types'
import { createStore } from '../shared'

export const useCTA10Store = createStore<CTA10Fields>(['title', 'subtitle', 'links'])
