import type { CTA7Fields } from '@/payload-types'
import { createCTAStore } from '../shared'

export const useCTA7Store = createCTAStore<CTA7Fields>(['title', 'subtitle', 'links', 'lists'])
