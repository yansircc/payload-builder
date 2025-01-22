import type { GroupField } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

// Hero12 的配置
export const hero12Config: GroupField = {
  name: 'hero12',
  type: 'group',
  label: false,
  admin: {
    description: '带有 Logo、徽章和合作伙伴的 Hero 布局',
    condition: (data) => data?.hero?.type === 'hero12',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: {
        description: 'Logo 图片',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: '徽章文本',
      defaultValue: 'UI Blocks',
      admin: {
        description: '显示在 Logo 下方的徽章文本',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: '标题',
      defaultValue: 'Build your next project with Blocks',
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
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
      admin: {
        description: '描述文本，支持多行',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'partners',
      type: 'array',
      label: '合作伙伴',
      admin: {
        description: '合作伙伴 Logo 列表',
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: '合作伙伴 Logo，建议尺寸 100x100',
          },
        },
      ],
    },
  ],
}
