import type { CTA16Fields } from '@/payload-types'
import { createStore } from '../shared'

export const useCTA16Store = createStore<CTA16Fields>([
  'title',
  'subtitle',
  'icon',
  'image',
  'links',
])
