/**
 * Team components export file
 *
 * This file is responsible for:
 * 1. Exporting all team components and configurations
 * 2. Managing component-to-style mappings
 * 3. Centralizing type definitions
 *
 * By using a centralized export management, we avoid redundant configurations in renderBlocks
 */

import type { TeamBlock } from '@/payload-types'
import type { ComponentType } from 'react'

// Import all Team components
import Team1Component from './components/Team1/Component'
import Team2Component from './components/Team2/Component'
import Team3Component from './components/Team3/Component'
// import Team4Component from './components/Team4/Component'
// import Team5Component from './components/Team5/Component'
// import Team6Component from './components/Team6/Component'
// import Team7Component from './components/Team7/Component'
// import Team8Component from './components/Team8/Component'
// Export config
export { team1Fields } from './components/Team1/config'
export { team2Fields } from './components/Team2/config'
export { team3Fields } from './components/Team3/config'
// export { team4Fields } from './components/Team4/config'
// export { team5Fields } from './components/Team5/config'
// export { team6Fields } from './components/Team6/config'
// export { team7Fields } from './components/Team7/config'
// export { team8Fields } from './components/Team8/config'
// Export components
export const Team1 = Team1Component
export const Team2 = Team2Component
export const Team3 = Team3Component
// export const Team4 = Team4Component
// export const Team5 = Team5Component
// export const Team6 = Team6Component
// export const Team7 = Team7Component
// export const Team8 = Team8Component
// Define Team component props type
type TeamComponentProps<T extends NonNullable<TeamBlock['style']>> = NonNullable<TeamBlock[T]>

// Team component mapping
export const teamComponents: Record<
  NonNullable<Required<TeamBlock>['style']>,
  ComponentType<TeamComponentProps<any>>
> = {
  'team-1': Team1,
  'team-2': Team2,
  'team-3': Team3,
  // 'team-4': Team4,
  // 'team-5': Team5,
  // 'team-6': Team6,
  // 'team-7': Team7,
  // 'team-8': Team8,
}

// Export type
export type { TeamComponentProps }
