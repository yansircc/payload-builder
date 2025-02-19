import type { CTA1Fields } from '@/payload-types'
import { createStore } from '../shared'

export const useCTA1Store = createStore<CTA1Fields>(['title', 'subtitle', 'icon', 'btn'])
