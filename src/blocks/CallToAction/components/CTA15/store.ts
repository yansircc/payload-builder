import type { CTA15Fields } from '@/payload-types'
import { createCTAStore } from '../shared'

export const useCTA15Store = createCTAStore<CTA15Fields>([
  'heading',
  'title',
  'subtitle',
  'image',
  'links',
])
