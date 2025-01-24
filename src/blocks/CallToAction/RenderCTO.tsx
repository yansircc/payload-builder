import React from 'react'
import * as c from './custom'

const ctos = {
  cta1: c.CTA1,
} as const

type CTOType = keyof typeof ctos

interface CTOProps {
  type: CTOType | 'none'
  cta1?: {
    title: string
    description?: string
    buttons?: Array<{
      label: string
      link: string
      variant: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary'
    }>
  }
}

export const RenderCTO: React.FC<CTOProps> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const CTOToRender = ctos[type as CTOType]

  if (!CTOToRender) return null

  // 获取对应类型的 props
  const ctoProps = props[type]
  if (!ctoProps) return null

  return <CTOToRender {...ctoProps} />
}
