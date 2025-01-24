import React from 'react'
import type { CallToActionBlock } from '@/payload-types'
import * as c from './custom'

const ctos = {
  cta1: c.CTA1,
} as const

type CTOType = keyof typeof ctos

export const RenderCTO: React.FC<CallToActionBlock> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const CTOToRender = ctos[type as CTOType]

  if (!CTOToRender) return null

  // 获取对应类型的 props
  const ctoProps = props[type]
  if (!ctoProps) return null

  return <CTOToRender {...ctoProps} />
}
