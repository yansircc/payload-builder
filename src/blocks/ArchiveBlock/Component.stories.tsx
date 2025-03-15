import { Meta, StoryObj } from '@storybook/react'
import { PaginatedDocs } from 'payload'
import React from 'react'
import type { Props as CollectionArchiveProps } from '@/components/CollectionArchive'
import Style1 from '@/components/CollectionArchive/Style1/Component'
import Style2 from '@/components/CollectionArchive/Style2/Component'
import Style3 from '@/components/CollectionArchive/Style3/Component'
import RichText from '@/components/RichText'
import { ArchiveBlock, Post } from '@/payload-types'

// Type definitions
type ArchiveStyle = 'card' | 'list' | 'grid'

type ArchiveStyleComponents = Record<ArchiveStyle, React.ComponentType<CollectionArchiveProps>>

interface MockCollectionArchiveProps extends CollectionArchiveProps {
  archiveStyle?: ArchiveStyle
}

interface ArchiveBlockWrapperProps extends ArchiveBlock {
  id?: string
  archiveStyle?: ArchiveStyle
}

// Constants
const STYLE_COMPONENTS: ArchiveStyleComponents = {
  card: Style1,
  list: Style2,
  grid: Style3,
}

// Mock data utilities
const createMockImage = (id: string) => ({
  id,
  url: '/website-template-OG.webp',
  filename: 'website-template-OG.webp',
  mimeType: 'image/webp',
  filesize: 12345,
  width: 800,
  height: 600,
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01',
  alt: 'Website Template',
})

const createMockRichText = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ text, type: 'text', version: 1 }],
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
})

// Components
const MockCollectionArchive: React.FC<MockCollectionArchiveProps> = ({
  archiveStyle = 'card',
  ...props
}) => {
  const ArchiveComponent = STYLE_COMPONENTS[archiveStyle]
  return <ArchiveComponent {...props} />
}

/**
 * IMPORTANT: The ArchiveBlock component is a server component that uses async/await
 * and server-side data fetching, which isn't directly compatible with Storybook.
 * The CollectionArchive component it uses is also a server component.
 *
 * This file creates a client-side wrapper that mimics the structure of the server component
 * while using the original style components with proper Next.js mocking.
 */
const ArchiveBlockWrapper: React.FC<ArchiveBlockWrapperProps> = ({
  id,
  introContent,
  selectedDocs,
  populateBy,
  categories,
  archiveStyle = 'card',
}) => {
  const mockPosts = selectedDocs?.length
    ? selectedDocs
        .map((doc) => (typeof doc.value === 'object' ? doc.value : null))
        .filter(Boolean as any)
    : mockArchivePosts.docs

  const filteredPosts =
    categories?.length && populateBy === 'collection'
      ? mockPosts.filter((post) =>
          post?.categories?.some((cat: any) =>
            categories.some(
              (c) =>
                (typeof c === 'object' && typeof cat === 'object' && c.id === cat.id) ||
                (typeof c === 'string' && typeof cat === 'string' && c === cat),
            ),
          ),
        )
      : mockPosts

  const displayPosts = filteredPosts.length ? filteredPosts : mockPosts

  const mockResults: PaginatedDocs<Post> = {
    docs: displayPosts as Post[],
    totalDocs: displayPosts.length,
    limit: 10,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <MockCollectionArchive items={mockResults} type="post" archiveStyle={archiveStyle} />
    </div>
  )
}

// Mock Data
const mockArchivePosts: PaginatedDocs<Post> = {
  docs: [
    {
      id: '1',
      title: 'Getting Started with React',
      slug: 'getting-started-with-react',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      content: createMockRichText('Getting started with React development'),
      meta: {
        image: createMockImage('1'),
        description: 'Getting started with React development',
      },
      categories: [
        {
          id: '1',
          title: 'Development',
          type: 'post',
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01',
        },
      ],
    },
    {
      id: '2',
      title: 'Advanced TypeScript Patterns',
      slug: 'advanced-typescript-patterns',
      createdAt: '2023-01-02',
      updatedAt: '2023-01-02',
      content: createMockRichText('Advanced patterns in TypeScript development'),
      meta: {
        image: createMockImage('2'),
        description: 'Advanced patterns in TypeScript development',
      },
      categories: [
        {
          id: '2',
          title: 'TypeScript',
          type: 'post',
          createdAt: '2023-01-02',
          updatedAt: '2023-01-02',
        },
      ],
    },
    // Add more mock posts as needed...
  ],
  totalDocs: 2,
  limit: 10,
  totalPages: 1,
  page: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,
}

// Storybook Configuration
const meta = {
  title: 'Blocks/Archive',
  component: ArchiveBlockWrapper,
  parameters: {
    layout: 'padded',
    // Enable App Router compatibility for this story
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArchiveBlockWrapper>

export default meta
type Story = StoryObj<typeof ArchiveBlockWrapper>

// Stories
export const CardStyle: Story = {
  args: {
    id: 'archive-block-card',
    blockType: 'archive',
    relationTo: 'posts',
    populateBy: 'collection',
    limit: 5,
    introContent: createMockRichText('📚 Archive Block Introduction Content'),
    archiveStyle: 'card',
  },
}

export const ListStyle: Story = {
  args: {
    id: 'archive-block-list',
    blockType: 'archive',
    relationTo: 'posts',
    populateBy: 'collection',
    limit: 5,
    introContent: createMockRichText('📚 Archive Block List Style'),
    archiveStyle: 'list',
  },
}

export const GridStyle: Story = {
  args: {
    id: 'archive-block-grid',
    blockType: 'archive',
    relationTo: 'posts',
    populateBy: 'collection',
    limit: 5,
    introContent: createMockRichText('📚 Archive Block Grid Style'),
    archiveStyle: 'grid',
  },
}

export const NoIntro: Story = {
  args: {
    ...GridStyle.args,
    id: 'archive-block-no-intro',
    introContent: undefined,
  },
}
