// import React from 'react'
// import type { Page } from '@/payload-types'
// import { heroConfigs } from './config'

// type HeroProps = Page['hero']
// type HeroType = keyof typeof heroConfigs

// export const RenderHero: React.FC<HeroProps> = (props) => {
//   const { type } = props

//   if (!type || type === 'none') return null
//   if (!(type in heroConfigs)) return null

//   const config = heroConfigs[type as HeroType]
//   const heroProps = props[type as keyof HeroProps]
//   if (!heroProps) return null

//   return <config.Component {...(heroProps as any)} />
// }

import React from 'react'

import type { Page } from '@/payload-types'
import * as h from './custom'

const heros = {
  hero1: h.Hero1,
  hero7: h.Hero7,
  hero8: h.Hero8,
  hero12: h.Hero12,
  hero34: h.Hero34,
} as const

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heros[type]

  if (!HeroToRender) return null

  // 获取对应类型的 props
  const heroProps = props[type]
  if (!heroProps) return null

  // @ts-expect-error: 类型安全的处理会在后续版本中完善
  return <HeroToRender {...heroProps} />
}
