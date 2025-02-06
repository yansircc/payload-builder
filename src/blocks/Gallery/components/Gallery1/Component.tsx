'use client'

import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import type { Gallery1Fields, Media as MediaType } from '@/payload-types'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useState } from 'react'

interface GalleryItem {
  id?: string | null
  title: string
  href: string
  image: string | MediaType
  logo: string | MediaType
  company: string
  badges?: { text: string; id?: string | null }[] | null
}

export default function Gallery1({ gallery }: Gallery1Fields) {
  const { items } = gallery
  const [selection, setSelection] = useState<string | null | undefined>(
    items?.[0]?.id
  )

  if (!items?.length) return null

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-5 lg:aspect-[1336/420] lg:flex-row">
          {items.map((item: GalleryItem) => (
            <div
              key={item.id ?? ''}
              data-state={selection === item.id ? 'open' : 'closed'}
              className='lg:data-[state="open"]:duration-400 group max-lg:w-full max-lg:flex-1 max-md:h-[200px] md:max-lg:aspect-[1336/420] lg:transform-gpu lg:transition-all lg:data-[state="closed"]:w-[20%] lg:data-[state="open"]:w-[60%] lg:data-[state="closed"]:duration-500'
              onMouseEnter={() => {
                setSelection(item.id)
              }}
            >
              <a
                href={item.href}
                className="relative block h-full w-full overflow-hidden rounded-xl bg-primary text-primary-foreground"
              >
                <div className='absolute -inset-[50%] hidden h-[200%] w-[200%] md:block lg:group-data-[state="closed"]:blur-sm'>
                  <div className="absolute top-[calc(25%+40px)] aspect-square h-[calc(50%+40px)] max-lg:right-[calc(50%+40px)] lg:right-[50%]">
                    <div className="h-full w-full overflow-clip rounded-xl">
                      <Media
                        resource={item.image}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-y-[25%] left-[50%] flex aspect-[389/420] h-[50%] items-center justify-center max-lg:hidden">
                    <Media resource={item.logo} className="h-8 invert" />
                  </div>
                  <div className="absolute left-[50%] top-[50%] flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent max-lg:hidden">
                    <Plus className="size-8 text-accent-foreground" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 hidden h-[50%] bg-gradient-to-t from-primary from-50% to-transparent lg:block"></div>
                </div>
                <div className="relative flex flex-col justify-between gap-4 md:absolute md:inset-0 md:max-lg:inset-x-[50%] md:max-lg:w-[50%]">
                  <div className='flex h-[80px] items-center gap-2 p-4 transition-opacity delay-200 duration-500 lg:group-data-[state="closed"]:opacity-0'>
                    {item.badges?.map((badge) => (
                      <Badge key={badge.id ?? badge.text} variant="secondary">
                        {badge.text}
                      </Badge>
                    ))}
                  </div>
                  <div className='delay-250 flex flex-col gap-2 p-4 transition-all delay-200 duration-500 lg:group-data-[state="closed"]:translate-y-4 lg:group-data-[state="closed"]:opacity-0'>
                    <div className="lg:hidden">
                      <Media
                        resource={item.logo}
                        className="h-5 invert lg:h-6"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-base font-medium lg:text-lg">
                        {item.title}
                      </div>
                      <div className="flex size-8 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 lg:size-10">
                        <ArrowUpRight className="size-4 lg:size-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
