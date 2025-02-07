'use client'

import { Fragment, useState } from 'react'
import { Media } from '@/components/Media'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import type { Testimonial16Fields } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface TweetContentProps {
  content: string
  isCollapsed?: boolean
}

const TweetContent = ({ content, isCollapsed }: TweetContentProps) => {
  // Split content by Twitter handles (@username)
  const parts = content.split(/(@\w+)/)

  return (
    <p
      className={cn(
        'text-muted-foreground',
        isCollapsed ? 'line-clamp-1 text-base font-medium md:text-xl' : 'text-sm',
      )}
    >
      {parts.map((part, index) => {
        // Check if part is a Twitter handle
        if (part.match(/^@\w+$/)) {
          return (
            <a
              key={index}
              href={`https://x.com/${part}`}
              className="mx-1 text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {part}
            </a>
          )
        }
        return part
      })}
    </p>
  )
}

export default function Testimonial16({ heading, subheading, testimonials }: Testimonial16Fields) {
  const [expandedTweetId, setExpandedTweetId] = useState<number | null>(null)

  return (
    <section className="py-32">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2">
          <h2 className="max-w-md text-3xl font-medium lg:text-[42px] lg:leading-tight">
            {heading}
          </h2>
          <div>
            <p className="mb-4 text-2xl font-medium text-muted-foreground">{subheading}</p>
            <Separator />
            {testimonials?.map((tweet, index: number) => (
              <Fragment key={index}>
                <div className="select-none">
                  <div
                    onClick={() =>
                      setExpandedTweetId((prevId) => (prevId === index ? null : index))
                    }
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-500',
                        expandedTweetId === index ? 'max-h-[500px]' : 'max-h-20',
                      )}
                    >
                      {expandedTweetId === index ? (
                        <div className="py-4">
                          <div className="mb-3 flex gap-4 leading-5">
                            <Avatar className="size-9 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-input">
                              {tweet.authorImage && (
                                <Media
                                  resource={tweet.authorImage}
                                  className="aspect-square h-full w-full object-cover"
                                  alt={tweet.authorName}
                                />
                              )}
                              <AvatarFallback>{tweet.authorName[0]}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <p className="font-medium">{tweet.authorName}</p>
                              <p className="text-muted-foreground">{tweet.tag}</p>
                            </div>
                          </div>
                          <TweetContent content={tweet.content} isCollapsed={false} />
                        </div>
                      ) : (
                        <div className="py-4 transition-colors hover:bg-muted">
                          <div className="flex gap-3 px-2">
                            <Avatar className="size-8 flex-shrink-0 overflow-hidden rounded-full">
                              {tweet.authorImage && (
                                <Media
                                  resource={tweet.authorImage}
                                  className="aspect-square h-full w-full object-cover"
                                  alt={tweet.authorName}
                                />
                              )}
                              <AvatarFallback>{tweet.authorName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <TweetContent content={tweet.content} isCollapsed={true} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Separator />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
