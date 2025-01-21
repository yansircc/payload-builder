import type { Page } from '@/payload-types'
import { HERO_COMPONENTS, type HeroType } from './constants'

export function RenderHero(props: Page['hero']) {
  const type = props?.type as HeroType
  const Hero = HERO_COMPONENTS[type]

  if (!Hero) return null

  return <Hero {...props} />
}
