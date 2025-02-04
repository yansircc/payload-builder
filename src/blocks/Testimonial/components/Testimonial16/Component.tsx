'use client'

import { Fragment, useState } from 'react'
import type { Testimonial16Fields } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Media } from '@/components/Media'

interface TweetContentProps {
  content: string
  link?: string | null
  linkText?: string | null
  isCollapsed?: boolean
}

const TweetContent = ({ content, link, linkText, isCollapsed }: TweetContentProps) => {
  if (!link || !linkText) {
    return (
      <p
        className={cn(
          'text-muted-foreground',
          isCollapsed ? 'line-clamp-1 text-base font-medium md:text-xl' : 'text-sm',
        )}
      >
        {content}
      </p>
    )
  }

  const parts = content.split(linkText)
  return (
    <p
      className={cn(
        'text-muted-foreground',
        isCollapsed ? 'line-clamp-1 text-base font-medium md:text-xl' : 'text-sm',
      )}
    >
      {parts[0]}
      <a href={link} className="mx-1 text-blue-600">
        {linkText}
      </a>
      {parts[1]}
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
                          <TweetContent
                            content={tweet.content}
                            link={tweet.link}
                            linkText={tweet.linkText}
                            isCollapsed={false}
                          />
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
                              <TweetContent
                                content={tweet.content}
                                link={tweet.link}
                                linkText={tweet.linkText}
                                isCollapsed={true}
                              />
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
