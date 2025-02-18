import type { CTA10Fields } from '@/payload-types'
import { createCTAStore } from '../shared'

export const useCTA10Store = createCTAStore<CTA10Fields>(['title', 'subtitle', 'links'])
