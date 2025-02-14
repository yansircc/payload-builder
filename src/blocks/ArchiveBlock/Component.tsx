import configPromise from '@payload-config'
import { getPayload, PaginatedDocs } from 'payload'
import React from 'react'
import { CollectionArchive } from '@/components/CollectionArchive'
import RichText from '@/components/RichText'
import type { ArchiveBlock as ArchiveBlockProps, Post } from '@/payload-types'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: PaginatedDocs<Post> | null = null

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    posts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })
  } else if (selectedDocs?.length) {
    // Convert selected docs into PaginatedDocs format
    const validDocs = selectedDocs
      .map((post) => (typeof post.value === 'object' ? post.value : null))
      .filter((doc): doc is Post => doc !== null)

    posts = {
      docs: validDocs,
      totalDocs: validDocs.length,
      limit,
      totalPages: 1,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    }
  }

  if (!posts) return null

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive items={posts} type="post" />
    </div>
  )
}
