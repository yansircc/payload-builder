import { format } from 'date-fns'
import { Calendar, ChevronRight } from 'lucide-react'
import { PaginatedDocs } from 'payload'
import React from 'react'
import { Media } from '@/components/Media'
import { PageRange } from '@/components/PageRange'
import { Badge } from '@/components/ui/badge'
import type { Post, Product, Service } from '@/payload-types'
import { getCollectionEndpoint } from '../utils/getCollectionEndpoint'
import { getCollectionTitle } from '../utils/getCollectionTitle'

type Props = {
  items: PaginatedDocs<Post | Product | Service>
  type: 'post' | 'product' | 'service'
}

/**
 * Style3: Grid Layout for Collection Archive
 *
 * A modern grid layout for displaying collection items with:
 * - Header section with title and description
 * - Grid of cards with:
 *   - Featured image with category badge overlay
 *   - Title
 *   - Publication date
 *   - Read more link
 *
 * @example
 * ```tsx
 * <Style3 items={posts} type="post" />
 * ```
 */
const Style3: React.FC<Props> = ({ items, type }) => {
  const { docs } = items
  const title = getCollectionTitle(type)
  const endpoint = getCollectionEndpoint(type)

  return (
    <section className="py-16">
      <div className="container">
        <div className="mx-auto flex max-w-screen-md flex-col items-center gap-6 text-center">
          <Badge variant="outline">{title}</Badge>
          <h1 className="text-balance text-4xl font-semibold">
            Discover the latest {title.toLowerCase()}
          </h1>
          {/* <p className="text-muted-foreground">
            Explore our collection for insightful {title.toLowerCase()}, personal reflections and
            ideas that inspire action on the topics you care about.
          </p> */}
        </div>

        <div className="mb-8 mt-12">
          <PageRange
            collection={endpoint}
            currentPage={items?.page}
            limit={12}
            totalDocs={items?.totalDocs}
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((item) => {
            const title = String(item.title || '')
            const category = item.categories?.[0]
            const categoryTitle = typeof category === 'string' ? category : category?.title

            return (
              <div key={item.id} className="flex flex-col">
                <div className="relative">
                  {!item.meta?.image && <div className="aspect-video w-full rounded-lg bg-muted" />}
                  {item.meta?.image && typeof item.meta.image !== 'string' && (
                    <Media
                      resource={item.meta.image}
                      size="100vw"
                      imgClassName="aspect-video w-full rounded-lg object-cover"
                    />
                  )}
                  {categoryTitle && (
                    <Badge
                      variant="secondary"
                      className="absolute right-4 top-4 bg-background/70 px-3 py-1 text-sm backdrop-blur-sm"
                    >
                      {categoryTitle}
                    </Badge>
                  )}
                </div>
                <div className="flex h-full flex-col justify-between p-4">
                  <h2 className="mb-5 text-xl font-semibold">{title}</h2>
                  <div className="flex justify-between gap-6 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(item.createdAt), 'MMMM d, yyyy')}
                    </span>
                    <a href={`/${endpoint}/${item.slug}`} className="flex items-center gap-1">
                      Read more
                      <ChevronRight className="h-full w-3" />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="container mt-8">
          {docs && items?.totalPages > 1 && items.page && (
            <div className="flex justify-center">
              <a href="#" className="flex items-center gap-1 text-sm font-semibold">
                View All {title}
                <ChevronRight className="h-full w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Style3
