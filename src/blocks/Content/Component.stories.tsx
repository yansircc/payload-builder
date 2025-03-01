import { Meta, StoryObj } from '@storybook/react'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { ContentBlock } from './Component'

const meta: Meta<typeof ContentBlock> = {
  title: 'Blocks/ContentBlock',
  component: ContentBlock,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ContentBlock>

const defaultContentBlock: ContentBlockProps = {
  blockType: 'content',
  columns: [
    {
      size: 'half',
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: '🚀 We bring your ideas to life with innovative solutions.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: null,
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: null,
          format: '',
          indent: 0,
          version: 1,
        },
      },
      enableLink: true,
      link: {
        type: 'custom',
        label: 'Learn More',
        url: '#',
      },
    },
    {
      size: 'half',
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: '🌟 Trusted by 100+ companies worldwide for seamless digital transformation.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: null,
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: null,
          format: '',
          indent: 0,
          version: 1,
        },
      },
      enableLink: true,
      link: {
        type: 'custom',
        label: 'Our Work',
        url: '#',
      },
    },
  ],
}

export const Default: Story = {
  args: defaultContentBlock,
}

export const SingleColumn: Story = {
  args: {
    blockType: 'content',
    columns: [
      {
        size: 'full',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: '📢 Big announcements coming soon! Stay tuned.',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: null,
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Subscribe Now',
          url: '#',
        },
      },
    ],
  },
}
export const ThreeColumns: Story = {
  args: {
    columns: [
      {
        size: 'oneThird',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: '📊 Data-driven insights to boost your business performance.',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: null,
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Explore Data',
          url: '#',
        },
      },
      {
        size: 'oneThird',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: '🔗 Seamless integration with your favorite tools.',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: null,
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Integrations',
          url: '#',
        },
      },
      {
        size: 'oneThird',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: '💡 AI-powered solutions for smarter decision-making.',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: null,
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        enableLink: true,
        link: {
          type: 'custom',
          label: 'AI Features',
          url: '#',
        },
      },
    ],
  },
}

export const WithoutLinks: Story = {
  args: {
    columns: [
      {
        size: 'half',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  { text: '🎨 Designing experiences that inspire.', type: 'text', version: 1 },
                ],
                direction: null,
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        enableLink: false,
      },
      {
        size: 'half',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: '🔧 Optimized performance with cutting-edge technology.',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: null,
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        enableLink: false,
      },
    ],
  },
}
