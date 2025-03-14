import { Meta, StoryObj } from '@storybook/react'
import { PaginatedDocs } from 'payload'
import React from 'react'
// Import types but not the actual CollectionArchive component since it's a server component
import type { Props as CollectionArchiveProps } from '@/components/CollectionArchive'
// Import style components from the original locations
import Style1 from '@/components/CollectionArchive/Style1/Component'
import Style2 from '@/components/CollectionArchive/Style2/Component'
import Style3 from '@/components/CollectionArchive/Style3/Component'
import RichText from '@/components/RichText'
import { ArchiveBlock as ArchiveBlockProps, Category, Post } from '@/payload-types'

/**
 * IMPORTANT: The ArchiveBlock component is a server component that uses async/await
 * and server-side data fetching, which isn't directly compatible with Storybook.
 * The CollectionArchive component it uses is also a server component.
 *
 * This file creates a client-side wrapper that mimics the structure of the server component
 * while using the original style components with proper Next.js mocking.
 */

// Define the style components mapping exactly like the original CollectionArchive
const STYLE_COMPONENTS = {
  card: Style1,
  list: Style2,
  grid: Style3,
} as const

// Client-side mock of the CollectionArchive component for Storybook
const MockCollectionArchive: React.FC<
  CollectionArchiveProps & { archiveStyle?: 'card' | 'list' | 'grid' }
> = (props) => {
  const { archiveStyle = 'card' } = props

  // Get the appropriate style component - mimicking how the server component works
  const ArchiveComponent = STYLE_COMPONENTS[archiveStyle]

  // Render the selected style component with the props
  return <ArchiveComponent {...props} />
}

// Create a wrapper component specifically for Storybook that matches the exact structure
// of the original component but can be rendered in a client environment
const ArchiveBlockWrapper: React.FC<
  ArchiveBlockProps & {
    id?: string
    archiveStyle?: 'card' | 'list' | 'grid'
  }
> = (props) => {
  const {
    id,
    introContent,
    selectedDocs,
    populateBy,
    relationTo,
    categories,
    archiveStyle = 'card',
  } = props

  // Create mock data similar to what the server component would receive
  const mockPosts =
    selectedDocs && selectedDocs.length > 0
      ? selectedDocs
          .map((doc) => (typeof doc.value === 'object' ? doc.value : null))
          .filter(Boolean as any)
      : mockArchivePosts.docs

  // Filter posts by category if we're in the "WithCategories" story
  const filteredPosts =
    categories && categories.length > 0 && populateBy === 'collection'
      ? mockPosts.filter(
          (post) =>
            post &&
            post.categories?.some((cat: any) =>
              categories.some(
                (c) =>
                  (typeof c === 'object' && typeof cat === 'object' && c.id === cat.id) ||
                  (typeof c === 'string' && typeof cat === 'string' && c === cat),
              ),
            ),
        )
      : mockPosts

  const displayPosts = filteredPosts.length > 0 ? filteredPosts : mockPosts

  // Create paginated mock results similar to what the server component would receive
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
    <>
      {/* Storybook Info Panel - not part of the actual component */}
      <div className="mb-8 px-4 py-3 bg-accent/20 rounded-md mx-auto max-w-7xl flex items-center">
        <div className="bg-primary/10 px-2 py-1 rounded text-xs uppercase tracking-wider font-bold mr-3">
          Storybook Preview
        </div>
        <div className="flex-1">
          {populateBy === 'collection' ? (
            <span className="text-primary-foreground">
              Collection Mode: Posts from{' '}
              <code className="bg-muted/50 px-1 rounded">{relationTo || 'posts'}</code> collection
              {categories && categories.length > 0 && (
                <span className="ml-1">
                  • Categories:{' '}
                  {categories
                    .map((cat: any) => (typeof cat === 'object' ? cat.title : cat))
                    .join(', ')}
                </span>
              )}
            </span>
          ) : (
            <span className="text-primary-foreground">Selection Mode: Manually selected posts</span>
          )}
        </div>
        <div className="text-sm bg-secondary/20 px-3 py-1 rounded-full">
          Style: <span className="font-semibold">{archiveStyle}</span>
        </div>
      </div>

      {/* This is the actual output structure that matches the original component */}
      <div className="my-16" id={`block-${id}`}>
        {introContent && (
          <div className="container mb-16">
            <RichText className="ml-0 max-w-[48rem]" data={introContent} enableGutter={false} />
          </div>
        )}
        {/* Use our mock CollectionArchive with the specified style */}
        <MockCollectionArchive items={mockResults} type="post" archiveStyle={archiveStyle} />
      </div>
    </>
  )
}

const meta: Meta<typeof ArchiveBlockWrapper> = {
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
}

export default meta
type Story = StoryObj<typeof ArchiveBlockWrapper>

const mockRichText = {
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ text: '📚 Archive Block Introduction Content', type: 'text', version: 1 }],
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

// Create posts with different categories to better demonstrate filtering
const mockArchivePosts: PaginatedDocs<Post> = {
  docs: [
    {
      id: '1',
      title: 'Getting Started with React',
      slug: 'getting-started-with-react',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      content: mockRichText,
      meta: {
        image: {
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
      content: mockRichText,
      meta: {
        image: {
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
    {
      id: '3',
      title: 'Building with Next.js',
      slug: 'building-with-nextjs',
      createdAt: '2023-01-03',
      updatedAt: '2023-01-03',
      content: mockRichText,
      meta: {
        image: {
          id: '3',
          url: '/website-template-OG.webp',
          filename: 'website-template-OG.webp',
          mimeType: 'image/webp',
          filesize: 12345,
          width: 800,
          height: 600,
          createdAt: '2023-01-03',
          updatedAt: '2023-01-03',
          alt: 'Website Template',
        },
        description: 'Guide to building applications with Next.js',
      },
      categories: [
        {
          id: '3',
          title: 'Next.js',
          type: 'post',
          createdAt: '2023-01-03',
          updatedAt: '2023-01-03',
        },
      ],
    },
    {
      id: '4',
      title: 'CSS Grid Layouts',
      slug: 'css-grid-layouts',
      createdAt: '2023-01-04',
      updatedAt: '2023-01-04',
      content: mockRichText,
      meta: {
        image: {
          id: '4',
          url: '/website-template-OG.webp',
          filename: 'website-template-OG.webp',
          mimeType: 'image/webp',
          filesize: 12345,
          width: 800,
          height: 600,
          createdAt: '2023-01-04',
          updatedAt: '2023-01-04',
          alt: 'Website Template',
        },
        description: 'Understanding CSS Grid layouts',
      },
      categories: [
        {
          id: '1',
          title: 'Development',
          type: 'post',
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01',
        },
        {
          id: '4',
          title: 'CSS',
          type: 'post',
          createdAt: '2023-01-04',
          updatedAt: '2023-01-04',
        },
      ],
    },
    {
      id: '5',
      title: 'Server Components in Next.js',
      slug: 'server-components-nextjs',
      createdAt: '2023-01-05',
      updatedAt: '2023-01-05',
      content: mockRichText,
      meta: {
        image: {
          id: '5',
          url: '/website-template-OG.webp',
          filename: 'website-template-OG.webp',
          mimeType: 'image/webp',
          filesize: 12345,
          width: 800,
          height: 600,
          createdAt: '2023-01-05',
          updatedAt: '2023-01-05',
          alt: 'Website Template',
        },
        description: 'Deep dive into Next.js Server Components',
      },
      categories: [
        {
          id: '2',
          title: 'TypeScript',
          type: 'post',
          createdAt: '2023-01-02',
          updatedAt: '2023-01-02',
        },
        {
          id: '3',
          title: 'Next.js',
          type: 'post',
          createdAt: '2023-01-03',
          updatedAt: '2023-01-03',
        },
      ],
    },
  ],
  totalDocs: 5,
  limit: 10,
  totalPages: 1,
  page: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,
}

// Define properly typed mock categories
const mockCategories: Category[] = [
  {
    id: '1',
    title: 'Development',
    type: 'post',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
  {
    id: '2',
    title: 'TypeScript',
    type: 'post',
    createdAt: '2023-01-02',
    updatedAt: '2023-01-02',
  },
]

// Subset of posts for selection mode - make sure these are non-null
const selectedPostsMock = [mockArchivePosts.docs[1], mockArchivePosts.docs[3]]

// CARD STYLE STORIES
export const CardStyle: Story = {
  args: {
    id: 'archive-block-card',
    blockType: 'archive',
    relationTo: 'posts',
    populateBy: 'collection',
    limit: 5,
    introContent: mockRichText,
    archiveStyle: 'card',
  },
}

export const CardStyleSelected: Story = {
  args: {
    id: 'archive-block-card-selected',
    blockType: 'archive',
    populateBy: 'selection',
    introContent: mockRichText,
    selectedDocs: selectedPostsMock.map((post) => ({
      relationTo: 'posts',
      value: post,
    })) as any,
    archiveStyle: 'card',
  },
}

// LIST STYLE STORIES
export const ListStyle: Story = {
  args: {
    id: 'archive-block-list',
    blockType: 'archive',
    relationTo: 'posts',
    populateBy: 'collection',
    limit: 5,
    introContent: mockRichText,
    archiveStyle: 'list',
  },
}

export const ListStyleWithCategories: Story = {
  args: {
    id: 'archive-block-list-with-categories',
    blockType: 'archive',
    relationTo: 'posts',
    populateBy: 'collection',
    limit: 5,
    introContent: mockRichText,
    categories: mockCategories,
    archiveStyle: 'list',
  },
}

// GRID STYLE STORIES
export const GridStyle: Story = {
  args: {
    id: 'archive-block-grid',
    blockType: 'archive',
    relationTo: 'posts',
    populateBy: 'collection',
    limit: 5,
    introContent: mockRichText,
    archiveStyle: 'grid',
  },
}

export const GridStyleNoIntro: Story = {
  args: {
    id: 'archive-block-grid-no-intro',
    blockType: 'archive',
    relationTo: 'posts',
    populateBy: 'collection',
    limit: 5,
    archiveStyle: 'grid',
  },
}
