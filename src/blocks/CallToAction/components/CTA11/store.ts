import type { CTA11Fields } from '@/payload-types'
import { createCTAStore } from '../shared'

export const useCTA11Store = createCTAStore<CTA11Fields>(['title', 'subtitle', 'links'])
