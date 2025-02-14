import { PaginatedDocs } from 'payload'
import { Card } from '@/components/Card'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { Post, Product } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { getCollectionEndpoint } from '../utils/getCollectionEndpoint'
import { getCollectionTitle } from '../utils/getCollectionTitle'

type Props = {
  items: PaginatedDocs<Post | Product>
  type: 'post' | 'product' | 'service'
}

export default function Style1({ items, type }: Props) {
  const { docs } = items
  const title = getCollectionTitle(type)
  const endpoint = getCollectionEndpoint(type)

  return (
    <>
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{title}</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection={endpoint}
          currentPage={items?.page}
          limit={12}
          totalDocs={items?.totalDocs}
        />
      </div>
      <div className={cn('container')}>
        <div>
          <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
            {docs?.map((result, index) => {
              if (typeof result === 'object' && result !== null) {
                return (
                  <div className="col-span-4" key={index}>
                    <Card className="h-full" doc={result} relationTo={endpoint} showCategories />
                  </div>
                )
              }

              return null
            })}
          </div>
        </div>
      </div>
      <div className="container">
        {docs && items?.totalPages > 1 && items.page && (
          <Pagination page={items.page} totalPages={items.totalPages} />
        )}
      </div>
    </>
  )
}
