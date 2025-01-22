import React from 'react'
import type { Page } from '@/payload-types'
import { heroConfigs } from './config'

type HeroProps = Page['hero']
type HeroType = keyof typeof heroConfigs
type HeroData<T extends HeroType> = NonNullable<HeroProps[T & keyof HeroProps]>

export const RenderHero: React.FC<HeroProps> = (props) => {
  const { type } = props

  if (!type || type === 'none') return null
  if (!(type in heroConfigs)) return null

  const config = heroConfigs[type as HeroType]
  const heroProps = props[type as keyof HeroProps] as HeroData<HeroType>
  if (!heroProps) return null

  return <config.Component {...heroProps} />
}
