import type { Block } from 'payload'

// CTA1 的配置
export const cta1Config: Block = {
  slug: 'cta1',
  labels: {
    singular: 'CTA 1',
    plural: 'CTA 1s',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: '标题',
      defaultValue: 'Call to Action',
      required: true,
      admin: {
        description: '主标题文本',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: '描述',
      defaultValue: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis!',
      admin: {
        description: '描述文本',
      },
    },
    {
      name: 'buttons',
      type: 'array',
      label: '按钮列表',
      maxRows: 2,
      admin: {
        description: '最多支持两个按钮',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: '按钮文本',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: '按钮链接',
          required: true,
        },
        {
          name: 'variant',
          type: 'select',
          label: '按钮样式',
          defaultValue: 'default',
          options: [
            { label: '默认', value: 'default' },
            { label: '轮廓', value: 'outline' },
            { label: '幽灵', value: 'ghost' },
          ],
        },
      ],
      defaultValue: [
        { label: 'Learn More', link: '#', variant: 'outline' },
        { label: 'Get Started', link: '#', variant: 'default' },
      ],
    },
  ],
} 