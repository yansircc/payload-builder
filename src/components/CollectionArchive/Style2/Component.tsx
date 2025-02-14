import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import { PaginatedDocs } from 'payload'
import React from 'react'
import { Media } from '@/components/Media'
import { PageRange } from '@/components/PageRange'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Post, Product, Service } from '@/payload-types'
import { getCollectionEndpoint } from '../utils/getCollectionEndpoint'
import { getCollectionTitle } from '../utils/getCollectionTitle'

type Props = {
  items: PaginatedDocs<Post | Product | Service>
  type: 'post' | 'product' | 'service'
}

/**
 * Style2: List Layout for Collection Archive
 *
 * A list-style layout for displaying collection items (posts/products) with:
 * - Large featured image on the left
 * - Content on the right including:
 *   - Categories as badges
 *   - Title with hover effect
 *   - Publication date
 *   - Meta description
 *   - Read more link with arrow
 *
 * @example
 * ```tsx
 * <Style2 items={posts} />
 * ```
 */
const Style2: React.FC<Props> = ({ items, type }) => {
  const { docs } = items
  const title = getCollectionTitle(type)
  const endpoint = getCollectionEndpoint(type)
  return (
    <>
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6">
            Latest Updates
          </Badge>
          <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-5xl lg:mb-6">
            {title}
          </h2>
        </div>
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="mb-8">
            <PageRange
              collection={endpoint}
              currentPage={items?.page}
              limit={12}
              totalDocs={items?.totalDocs}
            />
          </div>
          {docs.map((item) => {
            const title = String(item.title || '')

            return (
              <Card key={item.id} className="overflow-hidden border-0 bg-transparent shadow-none">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="shrink-0">
                    {!item.meta?.image && <div className="">No image</div>}
                    {item.meta?.image && typeof item.meta.image !== 'string' && (
                      <a
                        href={`/posts/${item.slug}`}
                        className="block transition-opacity duration-200 hover:opacity-90"
                      >
                        <Media
                          resource={item.meta.image}
                          size="33vw"
                          className="aspect-[16/9] w-full rounded-lg object-cover object-center sm:w-[260px]"
                        />
                      </a>
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {item.categories?.map((category) => (
                        <Badge
                          key={typeof category === 'string' ? category : category.id}
                          variant="secondary"
                        >
                          {typeof category === 'string' ? category : category.title}
                        </Badge>
                      ))}
                      <span>{format(new Date(item.createdAt), 'MMMM d, yyyy')}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight lg:text-2xl">
                      <a href={`/${endpoint}/${item.slug}`} className="hover:underline">
                        {title}
                      </a>
                    </h3>
                    <p className="text-base text-muted-foreground">{item.meta?.description}</p>
                    <a
                      href={`/posts/${item.slug}`}
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      Read more
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Style2
