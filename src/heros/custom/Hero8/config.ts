import type { GroupField } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const hero8Config: GroupField = {
  name: 'hero8',
  type: 'group',
  label: false,
  admin: {
    description: '居中布局的大标题Hero，带有底部大图展示',
    condition: (data) => data?.hero?.type === 'hero8',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: '标题',
      defaultValue: 'Build your next project with Blocks',
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
      label: '底部展示图片',
      relationTo: 'media',
      required: true,
      admin: {
        description: '底部大图展示，建议尺寸 1400x700，格式为 WebP',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          description: '按钮组，建议添加1-2个按钮',
        },
      },
    }),
  ],
}
