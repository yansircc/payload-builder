'use client'

import React from 'react'
import type { CallToActionBlock } from '@/payload-types'
import * as c from './custom'
import { ctaConfigs } from './config'

const ctos = {
  cta1: c.CTA1,
} as const

type CTOType = keyof typeof ctos

interface RenderCTOProps {
  type: keyof typeof ctaConfigs
  blockType: string
  [key: string]: any
}

export const RenderCTO: React.FC<RenderCTOProps> = ({ type = 'cta1', ...props }) => {
  // 获取对应的 CTA 组件
  const Component = ctaConfigs[type]?.Component

  if (!Component) {
    console.warn(`No component found for CTA type: ${type}`)
    return null
  }

  // 渲染对应的 CTA 组件
  return <Component {...props[type]} />
}
