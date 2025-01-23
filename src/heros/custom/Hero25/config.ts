import type { GroupField } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

// Hero25 的配置
export const hero25Config: GroupField = {
  name: 'hero25',
  type: 'group',
  label: false,
  admin: {
    description: '居中布局的系统介绍页面，适合展示产品或系统的主要特点',
    condition: (data) => data?.hero?.type === 'hero25',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo图片',
      relationTo: 'media',
      required: true,
      admin: {
        description: '顶部展示的Logo图片，建议尺寸 112x112',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: '标签文本',
      defaultValue: 'SYSTEMS',
      required: true,
      admin: {
        description: '显示在标题上方的标签文本',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: '标题',
      defaultValue: 'A system crafted for team success and growth',
      required: true,
      admin: {
        description: '主标题文本',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        labels: {
          singular: 'CTA按钮',
          plural: 'CTA按钮',
        },
      },
    }),
    {
      name: 'features',
      type: 'array',
      label: '特性列表',
      admin: {
        description: '底部展示的特性列表',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: '特性文本',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          label: '图标名称',
          required: true,
          admin: {
            description:
              '输入Lucide图标名称，例如: "zap", "blocks", "wrench", "code" 等。访问 https://lucide.dev/icons/ 查看所有图标',
          },
        },
      ],
      defaultValue: [
        { text: 'Quick setup guide', icon: 'zap' },
        { text: 'Fully customizable', icon: 'blocks' },
        { text: 'Easy to use components', icon: 'wrench' },
      ],
    },
  ],
}
