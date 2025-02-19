import type { CTA5Fields } from '@/payload-types'
import { createStore } from '../shared'

export const useCTA5Store = createStore<CTA5Fields>(['title', 'subtitle', 'image', 'links'])
