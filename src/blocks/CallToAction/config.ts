import type { Block } from 'payload'

import * as c from './custom'

// CTA 配置和组件映射
export const ctaConfigs = {
  cta1: {
    Component: c.CTA1,
  },
  cta11: {
    Component: c.CTA11,
  },
} as const

// Payload Block 配置
export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Type',
      required: true,
      options: [
        { label: 'Select CTA Type', value: 'none' },
        { label: 'CTA 1 - 基础按钮', value: 'cta1' },
        { label: 'CTA 11 - 居中布局', value: 'cta11' },
      ],
      admin: {
        description: '选择 CTA 组件类型',
      },
    },
    {
      type: 'group',
      name: 'cta1',
      label: false,
      admin: {
        condition: (data, siblingData) => {
          return siblingData?.type === 'cta1'
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: '主标题文本',
          },
        },
        {
          name: 'description',
          type: 'text',
          admin: {
            description: '描述文本',
          },
        },
        {
          name: 'buttons',
          type: 'array',
          maxRows: 2,
          admin: {
            description: '最多支持两个按钮',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
            {
              name: 'variant',
              type: 'select',
              defaultValue: 'default',
              options: [
                { label: 'Default', value: 'default' },
                { label: 'Outline', value: 'outline' },
                { label: 'Ghost', value: 'ghost' },
                { label: 'Link', value: 'link' },
                { label: 'Destructive', value: 'destructive' },
                { label: 'Secondary', value: 'secondary' },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'cta11',
      label: false,
      admin: {
        condition: (data, siblingData) => {
          return siblingData?.type === 'cta11'
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: '主标题文本',
          },
        },
        {
          name: 'description',
          type: 'text',
          admin: {
            description: '描述文本',
          },
        },
        {
          name: 'buttons',
          type: 'array',
          maxRows: 2,
          admin: {
            description: '最多支持两个按钮',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
            {
              name: 'variant',
              type: 'select',
              defaultValue: 'default',
              options: [
                { label: 'Default', value: 'default' },
                { label: 'Outline', value: 'outline' },
                { label: 'Ghost', value: 'ghost' },
                { label: 'Link', value: 'link' },
                { label: 'Destructive', value: 'destructive' },
                { label: 'Secondary', value: 'secondary' },
              ],
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
