import React from 'react'
import RichText from '@/components/RichText'
import type { Post } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Card } from '../../components/Card'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: any
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12', className)}>
      {introContent && (
        <div className="text-center mb-10  ">
          <RichText data={introContent} enableGutter={false} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <div
              key={index}
              className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <Card
                doc={{
                  ...doc,
                  meta: {
                    ...doc.meta,
                    image: doc.heroImage,
                  },
                }}
                relationTo="posts"
                showCategories
                className="border-none shadow-none"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
