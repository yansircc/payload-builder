import { HighImpactHero } from './HighImpact'
import * as heros from './custom'

/**
 * Hero 组件映射表
 * @description 直接将 value 映射到对应的组件
 */
export const HERO_COMPONENTS = {
  none: null,
  highImpact: HighImpactHero,
  hero8: heros.Hero8,
  hero1: heros.Hero1,
  hero7: heros.Hero7,
  hero12: heros.Hero12,
} as const

export type HeroType = keyof typeof HERO_COMPONENTS
