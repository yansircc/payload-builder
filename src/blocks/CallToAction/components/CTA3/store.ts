import type { CTA3Fields } from '@/payload-types'
import { createStore } from '../shared'

export const useCTA3Store = createStore<CTA3Fields>(['title', 'subtitle', 'buttons', 'list'])
