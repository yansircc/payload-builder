import type { CTA4Fields } from '@/payload-types'
import { createCTAStore } from '../shared'

export const useCTA4Store = createCTAStore<CTA4Fields>(['title', 'subtitle', 'links', 'lists'])
