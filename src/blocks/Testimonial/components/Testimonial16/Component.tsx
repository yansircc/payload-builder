'use client'

import { useState } from 'react'
import type { Media } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { Avatar } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Media as MediaComponent } from '@/components/Media'

type TestimonialItem = {
  author: string
  tag: string
  authorImage?: Media | string | null
  content: string
  excerpt: string
  link?: string | null
  linkText?: string | null
}

type Props = {
  heading: string
  subheading: string
  testimonials: TestimonialItem[]
}

const TweetContent = ({
  content,
  link,
  linkText,
}: Pick<TestimonialItem, 'content' | 'link' | 'linkText'>) => {
  if (!link || !linkText) {
    return <p className="text-sm text-muted-foreground">{content}</p>
  }

  const parts = content.split(linkText)
  return (
    <p className="text-sm text-muted-foreground">
      {parts[0]}
      <a href={link} className="mx-1 text-blue-600">
        {linkText}
      </a>
      {parts[1]}
    </p>
  )
}

const TweetExcerpt = ({
  excerpt,
  link,
  linkText,
}: Pick<TestimonialItem, 'excerpt' | 'link' | 'linkText'>) => {
  if (!link || !linkText) {
    return <p className="line-clamp-1 font-medium md:text-xl">{excerpt}</p>
  }

  const parts = excerpt.split(linkText)
  return (
    <p className="line-clamp-1 font-medium md:text-xl">
      {parts[0]}
      <a href={link} className="mx-1 text-blue-600">
        {linkText}
      </a>
      {parts[1]}
    </p>
  )
}

export default function Testimonial16({ heading, subheading, testimonials }: Props) {
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
            {testimonials?.map((tweet: TestimonialItem, index: number) => (
              <div key={index}>
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
                            <Avatar className="size-9 rounded-full ring-1 ring-input">
                              {tweet.authorImage && (
                                <MediaComponent
                                  resource={tweet.authorImage}
                                  className="size-9 rounded-full object-cover"
                                />
                              )}
                            </Avatar>
                            <div className="text-sm">
                              <p className="font-medium">{tweet.author}</p>
                              <p className="text-muted-foreground">{tweet.tag}</p>
                            </div>
                          </div>
                          <TweetContent
                            content={tweet.content}
                            link={tweet.link}
                            linkText={tweet.linkText}
                          />
                        </div>
                      ) : (
                        <div className="py-4 transition-colors hover:bg-muted">
                          <div className="flex gap-3 px-2">
                            <Avatar className="h-full w-8">
                              {tweet.authorImage && (
                                <MediaComponent
                                  resource={tweet.authorImage}
                                  className="size-8 rounded-full object-cover"
                                />
                              )}
                            </Avatar>
                            <div className="flex w-full flex-col gap-0.5">
                              <div className="flex items-center gap-2 text-base">
                                <span className="font-semibold text-foreground">
                                  {tweet.author}
                                </span>
                                <span className="text-sm text-muted-foreground">{tweet.tag}</span>
                              </div>
                              <TweetExcerpt
                                excerpt={tweet.excerpt}
                                link={tweet.link}
                                linkText={tweet.linkText}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
