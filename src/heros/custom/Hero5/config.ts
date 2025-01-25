import type { GroupField } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

// Hero5 的配置
export const hero5Config: GroupField = {
  name: 'hero5',
  type: 'group',
  label: false,
  admin: {
    description: '左文右图布局的Hero，适合展示产品主要特性',
    condition: (data) => data?.hero?.type === 'hero5',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: '标题',
      defaultValue: 'Bold Features demand attention',
      required: true,
      admin: {
        description: '主标题文本，建议不超过30个字',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: '描述文本',
      defaultValue: 'Lorem ipsum dolor sit amet consectetur.',
      admin: {
        description: '描述文本，建议简短精炼',
      },
    },
    {
      name: 'media',
      type: 'upload',
      label: '右侧图片',
      relationTo: 'media',
      required: true,
      admin: {
        description: '右侧展示图片，建议尺寸 1200x800，格式为 WebP',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 1,
        defaultValue: {
          link: {
            label: 'Primary Button',
            type: 'custom',
            newTab: true,
          },
        },
        admin: {
          description: '按钮配置，建议只添加一个按钮',
        },
      },
    }),
  ],
}
