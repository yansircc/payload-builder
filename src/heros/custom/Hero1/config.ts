import type { GroupField } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

// Hero1 的配置
export const hero1Config: GroupField = {
  name: 'hero1',
  type: 'group',
  label: false,
  admin: {
    description: '首屏大图布局，适合展示产品主要信息',
    condition: (data) => data?.hero?.type === 'hero1',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: '标题',
      defaultValue: 'Welcome to Our Website',
      required: true,
      admin: {
        description: '主标题文本',
        width: '50%',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: '副标题',
      defaultValue:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
      admin: {
        description: '副标题文本，支持多行',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'media',
          type: 'upload',
          label: '特色图片',
          relationTo: 'media',
          required: true,
          admin: {
            width: '50%',
            description: '用于展示在首屏的特色图片，建议尺寸 1200x800',
          },
        },
        {
          name: 'badge',
          type: 'text',
          label: '标签栏',
          maxLength: 15,
          defaultValue: 'New Release',
          admin: {
            description: '通常用于显示在标题上方的徽章文本，1~3个单词',
            width: '50%',
          },
        },
      ],
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
