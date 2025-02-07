import { heroComponents } from '@/heros'
import type { HeroField } from '@/payload-types'

export const RenderHero: React.FC<HeroField> = (props) => {
  const { style } = props || {}

  if (!style) return null

  const HeroToRender = heroComponents[style]

  if (!HeroToRender) return null

  const heroProps = props[style]
  if (!heroProps) return null

  return <HeroToRender {...heroProps} />
}
