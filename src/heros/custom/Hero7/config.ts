import type { GroupField } from 'payload'

// Hero7 的配置
export const hero7Config: GroupField = {
  name: 'hero7',
  type: 'group',
  label: false,
  admin: {
    description: '带有头像墙和评分的 Hero 布局',
    condition: (data) => data?.hero?.type === 'hero7',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: '标题',
      defaultValue: 'A Collection of Components Built With Shadcn & Tailwind',
      required: true,
      admin: {
        description: '主标题文本',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: '描述',
      defaultValue:
        'Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
      admin: {
        description: '描述文本，支持多行',
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: '按钮',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Discover all components',
          required: true,
          admin: {
            description: '按钮文本',
          },
        },
      ],
    },
    {
      name: 'avatars',
      type: 'array',
      label: '头像墙',
      admin: {
        description: '用户头像展示墙',
      },
      fields: [
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: '用户头像，建议尺寸 100x100',
          },
        },
      ],
    },
    {
      name: 'review',
      type: 'group',
      label: '评分',
      fields: [
        {
          name: 'rating',
          type: 'number',
          label: '评分',
          defaultValue: 5,
          min: 0,
          max: 5,
          admin: {
            step: 0.1,
            description: '评分，0-5分',
          },
        },
        {
          name: 'count',
          type: 'number',
          label: '评价数量',
          defaultValue: 200,
          min: 0,
          admin: {
            description: '评价总数',
          },
        },
      ],
    },
  ],
}
