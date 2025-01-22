import React from 'react'
import type { Page } from '@/payload-types'
import { heroConfigs } from './config'

type HeroProps = Page['hero']
type HeroType = keyof typeof heroConfigs

export const RenderHero: React.FC<HeroProps> = (props) => {
  const { type } = props

  if (!type || type === 'none') return null
  if (!(type in heroConfigs)) return null

  const config = heroConfigs[type as HeroType]
  const heroProps = props[type as keyof HeroProps]
  if (!heroProps) return null

  return <config.Component {...(heroProps as any)} />
}
