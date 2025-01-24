'use client'

import React from 'react'
import type { CallToActionBlock } from '@/payload-types'
import { ctaConfigs } from './config'

type CTOType = keyof typeof ctaConfigs

interface RenderCTOProps {
  type: CTOType | 'none'
  blockType: string
  [key: string]: any
}

export const RenderCTO: React.FC<RenderCTOProps> = ({ type = 'cta10', ...props }) => {
  if (!type || type === 'none') return null

  // 获取对应的 CTA 组件
  const Component = ctaConfigs[type as CTOType]?.Component

  if (!Component) {
    console.warn(`No component found for CTA type: ${type}`)
    return null
  }

  // 获取对应类型的 props
  const ctoProps = props[type]
  if (!ctoProps) {
    console.warn(`No props found for CTA type: ${type}`)
    return null
  }

  // 渲染对应的 CTA 组件
  return <Component {...ctoProps} />
}
