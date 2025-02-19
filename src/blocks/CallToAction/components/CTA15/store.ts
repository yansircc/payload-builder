import type { CTA15Fields } from '@/payload-types'
import { createStore } from '../shared'

export const useCTA15Store = createStore<CTA15Fields>([
  'heading',
  'title',
  'subtitle',
  'image',
  'links',
])
