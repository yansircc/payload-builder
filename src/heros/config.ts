import type { Field } from 'payload'

import * as h from '@/heros/custom'

// Hero 配置和组件映射
export const heroConfigs = {
  hero1: {
    config: h.hero1Config,
    Component: h.Hero1,
  },
  hero8: {
    config: h.hero8Config,
    Component: h.Hero8,
  },
  hero7: {
    config: h.hero7Config,
    Component: h.Hero7,
  },
  hero12: {
    config: h.hero12Config,
    Component: h.Hero12,
  },
  Hero34: {
    config: h.hero34Config,
    Component: h.Hero34,
  },
} as const

// 导出配置列表
export const heroes = Object.values(heroConfigs).map(({ config }) => config)

// Hero 选项
const options = [
  { label: 'None', value: 'none' },
  { label: 'Hero 1', value: 'hero1' },
  { label: 'Hero 7', value: 'hero7' },
  { label: 'Hero 8', value: 'hero8' },
  { label: 'Hero 12', value: 'hero12' },
  { label: 'Hero 34', value: 'hero34' },
]

// Payload 字段配置
export const hero: Field = {
  name: 'hero',
  type: 'group',
  label: false,
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      label: 'Type',
      options,
      required: true,
    },
    ...heroes,
  ],
}
