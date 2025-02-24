import type { About1Fields } from '@/payload-types'
import { createStore } from '../shared/store'

export const useAbout1Store = createStore<About1Fields>([
  'mainSection',
  'missionSection',
  'featuresSection',
  'teamSection',
])
