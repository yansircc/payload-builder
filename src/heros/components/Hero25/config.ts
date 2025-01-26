import { GroupField } from 'payload'
import { z } from 'zod'
import { baseSchemas, heroBase } from '../shared/base-field'

/**
 * Hero 25 field validation and type definitions
 */
export const schemas = {
  ...baseSchemas,
  logo: z.object({}).describe('The logo image displayed at the top'),
  badge: z.string().describe('The badge text displayed above the title'),
  features: z
    .array(
      z.object({
        text: z.string().describe('Feature text'),
        icon: z.string().describe('Lucide icon name'),
      }),
    )
    .describe('List of features with icons'),
}

/**
 * Complete configuration for Hero 25
 */
export const hero25Fields: GroupField = {
  name: 'hero-25',
  interfaceName: 'Hero25Fields',
  label: false,
  type: 'group',
  admin: {
    description: '居中布局的系统介绍页面，适合展示产品或系统的主要特点',
    condition: (data) => data?.hero?.type === 'hero25',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: false,
      fields: [
        heroBase,
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
      admin: {
        description: 'The hero content',
      },
    },
  ],
}
