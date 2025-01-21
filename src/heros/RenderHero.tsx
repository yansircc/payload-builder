import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import * as _ from '@/heros/custom'

const heroes = {
  highImpact: HighImpactHero,
  hero1: _.Hero1,
  hero7: _.Hero7,
  hero8: _.Hero8,
  hero12: _.Hero12,
  hero24: _.Hero24,
  hero34: _.Hero34,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
