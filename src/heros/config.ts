import type { Field } from 'payload'

import Hero1 from '@/heros/custom/Hero1'
import { hero1Config } from '@/heros/custom/Hero1/config'
import Hero7 from '@/heros/custom/Hero7'
import { hero7Config } from '@/heros/custom/Hero7/config'
import Hero12 from '@/heros/custom/Hero12'
import { hero12Config } from '@/heros/custom/Hero12/config'

// Hero 配置和组件映射
export const heroConfigs = {
  hero1: {
    config: hero1Config,
    Component: Hero1,
  },
  hero7: {
    config: hero7Config,
    Component: Hero7,
  },
  hero12: {
    config: hero12Config,
    Component: Hero12,
  },
} as const

// 导出配置列表
const heros = Object.values(heroConfigs).map(({ config }) => config)

// Hero 选项
const options = [
  { label: 'None', value: 'none' },
  { label: 'High Impact', value: 'highImpact' },
  { label: 'Hero 1', value: 'hero1' },
  { label: 'Hero 7', value: 'hero7' },
  { label: 'Hero 12', value: 'hero12' },
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
    ...heros,
  ],
}
