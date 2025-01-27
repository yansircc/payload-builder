import type { HeroField } from '@/payload-types'
import { heroComponents } from '@/heros'

export const RenderHero: React.FC<HeroField> = (props) => {
  const { style } = props || {}

  if (!style) return null

  const HeroToRender = heroComponents[style]

  if (!HeroToRender) return null

  const heroProps = props[style]
  if (!heroProps) return null

  return <HeroToRender {...heroProps} />
}
