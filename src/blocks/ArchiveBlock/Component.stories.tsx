import { Meta, StoryObj } from '@storybook/react'
import { PaginatedDocs } from 'payload'
import React from 'react'
import { ArchiveBlock as ArchiveBlockProps, Category, Post } from '@/payload-types'
import { cn } from '@/utilities/ui'

/**
 * IMPORTANT: The original ArchiveBlock component is a server component that uses async/await
 * and server-side data fetching, which isn't directly compatible with Storybook.
 *
 * Instead of creating a wrapper component, we've created a client-side compatible version
 * that mimics the structure and appearance of the original component, allowing us to showcase
 * how it looks with realistic mock data in Storybook.
 *
 * This approach allows us to test the visual appearance of the component while maintaining
 * its expected behavior in the actual application.
 */

// Create a client-side compatible version of the component for Storybook
// This mimics the structure of the original component but works in Storybook
const ArchiveBlockStory: React.FC<ArchiveBlockProps & { id?: string }> = (props) => {
  const { id, introContent, selectedDocs } = props

  // Create mock data similar to what the server component would receive
  const mockPosts =
    selectedDocs && selectedDocs.length > 0
      ? selectedDocs
          .map((doc) => (typeof doc.value === 'object' ? doc.value : null))
          .filter(Boolean as any)
      : mockArchivePosts.docs

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <div className="ml-0 max-w-[48rem]">
            <div className="rich-text-preview">
              <p>📚 Introduction Content (Preview)</p>
              <p className="text-muted-foreground text-sm">
                Rich text would render here in the actual component
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="collection-archive-preview">
        <div className="container">
          <h2 className="text-xl font-semibold mb-4">
            Archive Collection ({mockPosts.length} items)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPosts.map((post: any, i) => (
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
                            className="inline-block rounded-full bg-muted px-2 py-1 text-xs"
                          >
                            {typeof cat === 'object' ? cat.title : cat}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-lg font-medium">{post.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof ArchiveBlockStory> = {
  title: 'Blocks/Archive',
  component: ArchiveBlockStory,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ArchiveBlockStory>

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
  ],
  totalDocs: 3,
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

export const CollectionPosts: Story = {
  args: {
    id: 'archive-block-1',
    blockType: 'archive',
    relationTo: 'posts',
    populateBy: 'collection',
    limit: 3,
    introContent: mockRichText,
  },
}

export const SelectedDocs: Story = {
  args: {
    id: 'archive-block-2',
    blockType: 'archive',
    populateBy: 'selection',
    introContent: mockRichText,
    selectedDocs: mockArchivePosts.docs.map((post) => ({
      relationTo: 'posts',
      value: post,
    })),
  },
}

export const WithCategories: Story = {
  args: {
    id: 'archive-block-3',
    blockType: 'archive',
    relationTo: 'posts',
    populateBy: 'collection',
    limit: 3,
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
    limit: 3,
  },
}
