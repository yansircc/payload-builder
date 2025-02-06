'use client'

import type { About6Fields } from '@/payload-types'
import { Media } from '@/components/Media'

export default function About6({
  storySection,
  leftGallery,
  workplaceSection,
  rightGallery,
}: About6Fields) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col items-center justify-start gap-6 lg:flex-row">
          <div className="flex w-full flex-col items-start justify-start gap-24 lg:w-1/2">
            <div className="pr-6">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:mb-10 lg:text-6xl">
                {storySection.title}
              </h1>
              <p className="mb-9 lg:text-xl">{storySection.description}</p>
              <p className="text-muted-foreground">{storySection.content}</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
              <Media
                resource={leftGallery.mainImage}
                className="aspect-[0.7] w-full rounded-lg object-cover md:w-1/2"
                imgClassName="aspect-[0.7] w-full rounded-lg object-cover"
              />
              <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                <Media
                  resource={leftGallery.sideImages.first}
                  className="aspect-[1.1] rounded-lg object-cover"
                  imgClassName="aspect-[1.1] rounded-lg object-cover"
                />
                <Media
                  resource={leftGallery.sideImages.second}
                  className="aspect-[0.7] rounded-lg object-cover"
                  imgClassName="aspect-[0.7] rounded-lg object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-12 pt-12 lg:w-1/2 lg:pt-48">
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
              <Media
                resource={rightGallery.mainImage}
                className="aspect-[0.9] w-full rounded-lg object-cover md:w-1/2"
                imgClassName="aspect-[0.9] w-full rounded-lg object-cover"
              />
              <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                <Media
                  resource={rightGallery.sideImages.first}
                  className="aspect-[0.8] rounded-lg object-cover"
                  imgClassName="aspect-[0.8] rounded-lg object-cover"
                />
                <Media
                  resource={rightGallery.sideImages.second}
                  className="aspect-[0.9] rounded-lg object-cover"
                  imgClassName="aspect-[0.9] rounded-lg object-cover"
                />
              </div>
            </div>

            <div className="px-8">
              <h1 className="mb-8 text-2xl font-semibold lg:mb-6">{workplaceSection.title}</h1>
              <p className="mb-9 lg:text-xl">{workplaceSection.description}</p>
              <p className="text-muted-foreground">{workplaceSection.content}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
