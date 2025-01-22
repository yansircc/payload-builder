import type { GroupField } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const hero24Config: GroupField = {
  name: 'hero24',
  type: 'group',
  label: false,
  admin: {
    description: '带有功能特性列表的居中布局Hero',
    condition: (data) => data?.hero?.type === 'hero24',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: '标签文本',
      defaultValue: 'PLATFORM',
      admin: {
        description: '显示在标题上方的小标签文本',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: '标题',
      defaultValue: 'Develop, launch, and grow your service with our platform',
      required: true,
      admin: {
        description: '主标题文本，建议不超过50个字',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo图片',
      relationTo: 'media',
      required: true,
      admin: {
        description: '顶部展示的Logo图片，建议尺寸 112x112，格式为 WebP',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 1,
        defaultValue: {
          link: {
            label: 'Start now for free',
            type: 'custom',
            newTab: true,
          },
        },
        admin: {
          description: '按钮配置，建议只添加一个按钮',
        },
      },
    }),
    {
      name: 'features',
      type: 'array',
      label: '功能特性',
      minRows: 4,
      maxRows: 4,
      admin: {
        description: '底部功能特性列表，固定4个特性',
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          defaultValue: 'Globe',
          admin: {
            description: '图标名称，来自 lucide-icons。例如: Globe, Rocket, Wrench, Star 等',
            placeholder: '输入 lucide-icons 图标名称',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: '特性标题，建议2-3个单词',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: '特性描述，建议一句话',
          },
        },
      ],
    },
  ],
}
