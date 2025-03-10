import { Meta, StoryObj } from '@storybook/react'
import { Post } from '@/payload-types'
import { RelatedPosts } from './Component'

const meta: Meta<typeof RelatedPosts> = {
  title: 'Blocks/RelatedPosts',
  component: RelatedPosts,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof RelatedPosts>

const mockRichText = {
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ text: '📚 Related Articles You Might Like', type: 'text', version: 1 }],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    slug: 'getting-started-with-react',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
    content: mockRichText,
    categories: [
      {
        id: '1',
        title: 'Development',
        type: 'post',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      },
    ],
    heroImage: {
      id: '1',
      url: '/website-template-OG.webp',
      filename: 'website-template-OG.webp',
      mimeType: 'image/webp',
      filesize: 12345,
      width: 800,
      height: 600,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      alt: 'Website Template',
    },
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    slug: 'advanced-typescript-patterns',
    createdAt: '2023-01-02',
    updatedAt: '2023-01-02',
    content: mockRichText,
    categories: [
      {
        id: '2',
        title: 'TypeScript',
        type: 'post',
        createdAt: '2023-01-02',
        updatedAt: '2023-01-02',
      },
    ],
    heroImage: {
      id: '2',
      url: '/website-template-OG.webp',
      filename: 'website-template-OG.webp',
      mimeType: 'image/webp',
      filesize: 12345,
      width: 800,
      height: 600,
      createdAt: '2023-01-02',
      updatedAt: '2023-01-02',
      alt: 'Website Template',
    },
  },
]

export const Default: Story = {
  args: {
    docs: mockPosts,
    introContent: mockRichText,
  },
}

export const WithoutIntro: Story = {
  args: {
    docs: mockPosts,
  },
}

export const SinglePost: Story = {
  args: {
    docs: mockPosts.slice(0, 1),
    introContent: mockRichText,
  },
}
