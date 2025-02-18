import type { CTA17Fields } from '@/payload-types'
import { createCTAStore } from '../shared'

export const useCTA17Store = createCTAStore<CTA17Fields>(['title', 'subtitle', 'links'])
