'use client'

import { Media } from '@/components/Media'
import type { About5Fields } from '@/payload-types'

export default function About5({
  mainSection,
  imageSection,
  partnersSection,
  missionSection,
}: About5Fields) {
  return (
    <section className="bg-muted py-32">
      <div className="container">
        <div className="grid gap-14 pb-32 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium">{mainSection.label}</p>
            <h1 className="mt-4 text-3xl font-medium md:text-4xl">{mainSection.title}</h1>
          </div>
          <p className="md:text-lg">{mainSection.description}</p>
        </div>

        <Media
          resource={imageSection.image}
          className="ml-auto aspect-video max-h-[550px] rounded-xl object-cover"
          imgClassName="ml-auto aspect-video max-h-[550px] rounded-xl object-cover"
        />
        <p className="mt-6 text-center text-xl lg:text-right">{imageSection.caption}</p>

        <div className="flex flex-col gap-14 py-40 lg:flex-row">
          <p className="mx-auto max-w-xl text-center text-2xl lg:mx-0 lg:text-left">
            {partnersSection.title}
          </p>
          <div className="grid grid-cols-2 items-center gap-6 md:grid-cols-4 max-w-2xl">
            {partnersSection.partners?.map((partner, index) => (
              <Media
                key={index}
                resource={partner.logo}
                imgClassName="mx-auto h-20 md:mx-0 object-cover"
              />
            ))}
          </div>
        </div>

        <div className="grid gap-14 lg:grid-cols-4 xl:grid-cols-5">
          <div className="md:col-span-2 xl:col-span-3">
            <h2 className="mb-10 text-4xl font-medium">{missionSection.title}</h2>
            <p className="text-lg whitespace-pre-line">{missionSection.description}</p>
            <div className="mt-6 grid grid-cols-2 gap-6 text-center">
              {missionSection.stats?.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border bg-background p-6"
                >
                  <span className="text-2xl md:text-4xl">{stat.value}</span>
                  <span className="text-sm text-muted-foreground md:text-lg">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <Media
            resource={missionSection.image}
            className="rounded-xl md:col-span-2"
            imgClassName="rounded-xl w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
