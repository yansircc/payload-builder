'use client'

import type { About1Fields } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon } from '@/components/DynamicIcon'

export default function About1({
  mainSection,
  missionSection,
  featuresSection,
  teamSection,
}: About1Fields) {
  return (
    <section className="py-32">
      <div className="container flex flex-col gap-28">
        <div className="flex flex-col gap-7">
          <h1 className="text-4xl font-semibold lg:text-7xl">{mainSection.title}</h1>
          <p className="max-w-xl text-lg">{mainSection.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Media
            resource={teamSection.media}
            className="size-full max-h-96 rounded-2xl object-cover"
          />
          <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10">
            <p className="text-sm text-muted-foreground">{missionSection.label}</p>
            <p className="text-lg font-medium">{missionSection.description}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:gap-20">
          <div className="max-w-xl">
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">{featuresSection.title}</h2>
            <p className="text-muted-foreground">{featuresSection.description}</p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {featuresSection.features?.map((feature, index: number) => (
              <div key={index} className="flex flex-col">
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                  <DynamicIcon name={feature.icon} className="size-5" />
                </div>
                <h3 className="mb-3 mt-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-10 text-sm font-medium text-muted-foreground">{teamSection.label}</p>
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">{teamSection.title}</h2>
          </div>
          <div>
            <Media
              resource={teamSection.media}
              className="mb-6 max-h-36 w-full rounded-xl object-cover"
            />
            <p className="text-muted-foreground">{teamSection.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
