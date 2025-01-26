'use client'

import React from 'react'
import { ctaConfigs } from './config'

type CTAType = keyof typeof ctaConfigs

interface RenderCTAProps {
  type: CTAType | 'none'
  blockType: string
  [key: string]: any
}

export const RenderCTA: React.FC<RenderCTAProps> = ({ type = 'cta10', ...props }) => {
  if (!type || type === 'none') return null

  // 获取对应的 CTA 组件
  const Component = ctaConfigs[type as CTAType]?.Component

  if (!Component) {
    console.warn(`No component found for CTA type: ${type}`)
    return null
  }

  // 获取对应类型的 props
  const ctaProps = props[type]
  if (!ctaProps) {
    console.warn(`No props found for CTA type: ${type}`)
    return null
  }

  // 渲染对应的 CTA 组件
  return <Component {...ctaProps} />
}
