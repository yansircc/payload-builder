import type { CTA3Fields } from '@/payload-types'
import { createCTAStore } from '../shared'

export const useCTA3Store = createCTAStore<CTA3Fields>(['title', 'subtitle', 'buttons', 'list'])
