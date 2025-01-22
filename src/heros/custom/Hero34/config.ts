import type { GroupField } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const hero34Config: GroupField = {
  name: 'hero34',
  type: 'group',
  label: false,
  admin: {
    description: '左文右图布局的Hero，带有圆角背景和渐变效果',
    condition: (data) => data?.hero?.type === 'hero34',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: '标签文本',
      defaultValue: 'New Release',
      maxLength: 15,
      admin: {
        description: '显示在标题上方的小标签文本，建议1-3个单词',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: '标题',
      defaultValue: 'Welcome to Our Website',
      required: true,
      admin: {
        description: '主标题文本，建议不超过30个字',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: '描述文本',
      defaultValue:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
      admin: {
        description: '描述文本，支持多行',
      },
    },
    {
      name: 'media',
      type: 'upload',
      label: '右侧图片',
      relationTo: 'media',
      required: true,
      admin: {
        description: '右侧展示图片，建议尺寸 800x800，格式为 WebP',
      },
    },
    linkGroup({
      overrides: {
        defaultValue: {
          link: {
            type: 'custom',
            newTab: true,
          },
        },
        maxRows: 2,
        admin: {
          description: '按钮组，建议添加1-2个按钮',
        },
      },
    }),
  ],
}
