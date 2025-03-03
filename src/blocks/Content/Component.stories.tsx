import { Meta, StoryObj } from '@storybook/react'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { ContentBlock } from './Component'

const meta: Meta<typeof ContentBlock> = {
  title: 'Blocks/Content',
  component: ContentBlock,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ContentBlock>

const mockRichText = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ text, type: 'text', version: 1 }],
        direction: 'ltr' as 'ltr' | 'rtl' | null,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    ],
    direction: 'ltr' as 'ltr' | 'rtl' | null,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

export const OneThirdColumn: Story = {
  args: {
    blockType: 'content',
    columns: [
      {
        size: 'oneThird',
        richText: mockRichText(
          '🔍 One Third Column (4/12 grid)\nThis column takes up one-third of the available space.',
        ),
        enableLink: true,
        link: {
          type: 'custom',
          label: 'One Third Example',
          url: '#',
        },
      },
    ],
  },
}

export const HalfColumns: Story = {
  args: {
    blockType: 'content',
    columns: [
      {
        size: 'half',
        richText: mockRichText(
          '📏 First Half Column (6/12 grid)\nThis column occupies half of the container width.',
        ),
        enableLink: true,
        link: {
          type: 'custom',
          label: 'First Half',
          url: '#',
        },
      },
      {
        size: 'half',
        richText: mockRichText(
          '📏 Second Half Column (6/12 grid)\nThis column also takes up half of the width.',
        ),
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Second Half',
          url: '#',
        },
      },
    ],
  },
}

export const TwoThirdsColumn: Story = {
  args: {
    blockType: 'content',
    columns: [
      {
        size: 'twoThirds',
        richText: mockRichText(
          '📐 Two Thirds Column (8/12 grid)\nThis column spans two-thirds of the available width.',
        ),
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Two Thirds Example',
          url: '#',
        },
      },
      {
        size: 'oneThird',
        richText: mockRichText(
          '🔍 One Third Column (4/12 grid)\nComplementary column taking up the remaining space.',
        ),
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Complementary',
          url: '#',
        },
      },
    ],
  },
}

export const FullWidthColumn: Story = {
  args: {
    blockType: 'content',
    columns: [
      {
        size: 'full',
        richText: mockRichText(
          '📏 Full Width Column (12/12 grid)\nThis column takes up the entire width of the container.',
        ),
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Full Width Example',
          url: '#',
        },
      },
    ],
  },
}

export const MixedColumns: Story = {
  args: {
    blockType: 'content',
    columns: [
      {
        size: 'oneThird',
        richText: mockRichText('🔍 One Third\n(4/12)'),
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Learn More',
          url: '#',
        },
      },
      {
        size: 'oneThird',
        richText: mockRichText('🔍 One Third\n(4/12)'),
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Learn More',
          url: '#',
        },
      },
      {
        size: 'oneThird',
        richText: mockRichText('🔍 One Third\n(4/12)'),
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Learn More',
          url: '#',
        },
      },
      {
        size: 'half',
        richText: mockRichText('📏 Half Width\n(6/12)'),
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Learn More',
          url: '#',
        },
      },
      {
        size: 'half',
        richText: mockRichText('📏 Half Width\n(6/12)'),
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Learn More',
          url: '#',
        },
      },
      {
        size: 'twoThirds',
        richText: mockRichText('📐 Two Thirds\n(8/12)'),
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Learn More',
          url: '#',
        },
      },
      {
        size: 'oneThird',
        richText: mockRichText('🔍 One Third\n(4/12)'),
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Learn More',
          url: '#',
        },
      },
      {
        size: 'full',
        richText: mockRichText('📏 Full Width\n(12/12)'),
        enableLink: true,
        link: {
          type: 'custom',
          label: 'Learn More',
          url: '#',
        },
      },
    ],
  },
}
