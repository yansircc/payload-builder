import { Meta, StoryObj } from '@storybook/react'
import { PaginatedDocs } from 'payload'
import React from 'react'
// Import types but not the actual CollectionArchive component since it's a server component
import type { Props as CollectionArchiveProps } from '@/components/CollectionArchive'
import RichText from '@/components/RichText'
import { ArchiveBlock as ArchiveBlockProps, Category, Post } from '@/payload-types'
import { cn } from '@/utilities/ui'

/**
 * IMPORTANT: The ArchiveBlock component is a server component that uses async/await
 * and server-side data fetching, which isn't directly compatible with Storybook.
 * The CollectionArchive component it uses is also a server component.
 *
 * This file creates wrappers that simulate the output of these server components
 * with a structure that closely matches the original components.
 */

// Client-side mock of the CollectionArchive component for Storybook
const MockCollectionArchive: React.FC<CollectionArchiveProps> = ({ items, type }) => {
  return (
    <div className="collection-archive">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.docs.map((post: any, i) => (
            <div
              key={i}
              className={cn(
                'flex flex-col overflow-hidden rounded-lg shadow-sm',
                'border border-border hover:shadow-md transition-shadow',
              )}
            >
              {post.heroImage && (
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={post.heroImage.url}
                    alt={post.heroImage.alt || post.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  {post.categories?.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2">
                      {post.categories.map((cat: any, catIndex: number) => (
                        <span
                          key={catIndex}
                          className="inline-block rounded-full px-2 py-1 text-xs bg-muted text-muted-foreground"
                        >
                          {typeof cat === 'object' ? cat.title : cat}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3 className="text-lg font-medium">{post.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt || 'Article preview text would appear here'}
                  </p>
                </div>
                <div className="mt-4">
                  <a
                    href={`/posts/${post.slug}`}
                    className="text-sm font-medium text-primary hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Create a wrapper component specifically for Storybook that matches the exact structure
// of the original component but can be rendered in a client environment
const ArchiveBlockWrapper: React.FC<ArchiveBlockProps & { id?: string }> = (props) => {
  const { id, introContent, selectedDocs, populateBy, relationTo, categories } = props

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
        <div>
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
      </div>

      {/* This is the actual output structure that matches the original component */}
      <div className="my-16" id={`block-${id}`}>
        {introContent && (
          <div className="container mb-16">
            <RichText className="ml-0 max-w-[48rem]" data={introContent} enableGutter={false} />
          </div>
        )}
        {/* Use our mock CollectionArchive instead of the server component */}
        <MockCollectionArchive items={mockResults} type="post" />
      </div>
    </>
  )
}

const meta: Meta<typeof ArchiveBlockWrapper> = {
  title: 'Blocks/Archive',
  component: ArchiveBlockWrapper,
  parameters: {
    layout: 'padded',
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
    {
      id: '3',
      title: 'Building with Next.js',
      slug: 'building-with-nextjs',
      createdAt: '2023-01-03',
      updatedAt: '2023-01-03',
      content: mockRichText,
      categories: [
        {
          id: '3',
          title: 'Next.js',
          type: 'post',
          createdAt: '2023-01-03',
          updatedAt: '2023-01-03',
        },
      ],
      heroImage: {
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
    },
    {
      id: '4',
      title: 'CSS Grid Layouts',
      slug: 'css-grid-layouts',
      createdAt: '2023-01-04',
      updatedAt: '2023-01-04',
      content: mockRichText,
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
      heroImage: {
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
    },
    {
      id: '5',
      title: 'Server Components in Next.js',
      slug: 'server-components-nextjs',
      createdAt: '2023-01-05',
      updatedAt: '2023-01-05',
      content: mockRichText,
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
      heroImage: {
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

export const CollectionPosts: Story = {
  args: {
    id: 'archive-block-1',
    blockType: 'archive',
    relationTo: 'posts',
    populateBy: 'collection',
    limit: 5,
    introContent: mockRichText,
  },
}

export const SelectedDocs: Story = {
  args: {
    id: 'archive-block-2',
    blockType: 'archive',
    populateBy: 'selection',
    introContent: mockRichText,
    selectedDocs: selectedPostsMock.map((post) => ({
      relationTo: 'posts',
      value: post,
    })) as any, // Cast to any to avoid type errors since we know the structure is correct
  },
}

export const WithCategories: Story = {
  args: {
    id: 'archive-block-3',
    blockType: 'archive',
    relationTo: 'posts',
    populateBy: 'collection',
    limit: 5,
    introContent: mockRichText,
    categories: mockCategories,
  },
}

export const NoIntro: Story = {
  args: {
    id: 'archive-block-4',
    blockType: 'archive',
    relationTo: 'posts',
    populateBy: 'collection',
    limit: 5,
  },
}
