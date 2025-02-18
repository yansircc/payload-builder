import type { CTA1Fields } from '@/payload-types'
import { createCTAStore } from '../shared'

export const useCTA1Store = createCTAStore<CTA1Fields>(['title', 'subtitle', 'icon', 'btn'])
