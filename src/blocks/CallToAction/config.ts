import type { Block } from 'payload'

import * as c from './custom'

// CTA 配置和组件映射
export const ctaConfigs = {
  cta1: {
    config: c.cta1Config,
    Component: c.CTA1,
  },
} as const

// 导出配置列表
export const ctas = Object.values(ctaConfigs).map(({ config }) => config)

// CTA 选项
const options = [
  { label: 'None', value: 'none' },
  { label: 'CTA 1', value: 'cta1' },
]

// Payload Block 配置
export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      label: 'Type', 
      options,
      required: true,
      admin: {
        description: '选择 CTA 组件类型',
      },
    },
    {
      type: 'blocks',
      name: 'blocks',
      blocks: ctas,
    },
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
