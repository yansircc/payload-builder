import type { CTA5Fields } from '@/payload-types'
import { createCTAStore } from '../shared'

export const useCTA5Store = createCTAStore<CTA5Fields>(['title', 'subtitle', 'image', 'links'])
