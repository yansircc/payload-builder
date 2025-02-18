import type { CTA16Fields } from '@/payload-types'
import { createCTAStore } from '../shared'

export const useCTA16Store = createCTAStore<CTA16Fields>([
  'title',
  'subtitle',
  'icon',
  'image',
  'links',
])
