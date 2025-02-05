'use client'

import { type Media } from '@/payload-types'
import { ImageMedia } from '@/components/Media/ImageMedia'

export interface About2Fields {
  title: string
  description: string
  stats: Array<{
    value: string
    label: string
  }>
  images: {
    first: Media
    second: Media
    third: Media
  }
  secondTitle: string
  trustedByTitle: string
  partners: Array<{
    logo: Media
    name: string
  }>
  benefitsTitle: string
  benefitsStats: Array<{
    value: string
    label: string
    description: string
  }>
  testimonial: {
    logo: Media
    companyName: string
    quote: string
    author: {
      name: string
      role: string
    }
  }
  benefitsImages: {
    first: Media
    second: Media
    third: Media
  }
}

export default function About2({
  title,
  description,
  stats,
  images,
  secondTitle,
  trustedByTitle,
  partners,
  benefitsTitle,
  benefitsStats,
  testimonial,
  benefitsImages,
}: About2Fields) {
  return (
    <section className="py-32">
      <div className="flex flex-col gap-28">
        <div className="container flex flex-col gap-10 text-center md:gap-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <h1 className="text-4xl font-medium md:text-6xl">{title}</h1>
            <p className="text-lg text-muted-foreground md:text-xl">{description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <ImageMedia
                resource={images.first}
                className="size-full max-h-96 rounded-xl object-cover"
                imgClassName="size-full max-h-96 rounded-xl object-cover"
              />
            </div>
            <div className="md:col-span-4">
              <ImageMedia
                resource={images.second}
                className="size-full max-h-96 rounded-xl object-cover"
                imgClassName="size-full max-h-96 rounded-xl object-cover"
              />
            </div>
            <div className="md:col-span-3">
              <ImageMedia
                resource={images.third}
                className="size-full max-h-96 rounded-xl object-cover"
                imgClassName="size-full max-h-96 rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
        <div className="container flex flex-col gap-16">
          <h2 className="max-w-3xl text-4xl font-medium md:text-5xl">{secondTitle}</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col gap-6 border-b pb-8">
                <p className="text-4xl font-medium md:text-5xl">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-muted/50 py-24">
          <div className="container flex flex-col items-center gap-11">
            <p className="text-center text-xl font-medium">{trustedByTitle}</p>
            <div className="grid grid-cols-2 gap-x-7 gap-y-12 lg:grid-cols-4">
              {partners.map((partner, index) => (
                <div key={index} className="flex items-center gap-3">
                  <ImageMedia
                    resource={partner.logo}
                    className="h-8 w-auto md:h-14"
                    imgClassName="h-8 w-auto md:h-14"
                  />
                  <p className="text-xl font-semibold md:text-4xl">{partner.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container flex flex-col items-center gap-14">
          <h2 className="text-center text-4xl font-semibold md:text-5xl">{benefitsTitle}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid grid-cols-1 gap-6 md:col-span-2 md:grid-cols-2 md:flex-row lg:col-span-1 lg:grid-cols-1 lg:flex-col">
              <ImageMedia
                resource={benefitsImages.first}
                className="max-h-96 w-full rounded-xl object-cover"
                imgClassName="max-h-96 w-full rounded-xl object-cover"
              />
              <div className="flex flex-col justify-center rounded-xl bg-muted p-8">
                <p className="mb-2 text-4xl font-medium">{benefitsStats[0]?.value}</p>
                <p className="mb-6 font-semibold">{benefitsStats[0]?.label}</p>
                <p className="text-muted-foreground">{benefitsStats[0]?.description}</p>
              </div>
            </div>
            <div className="relative">
              <ImageMedia
                resource={benefitsImages.second}
                className="h-full rounded-xl object-cover"
                imgClassName="h-full rounded-xl object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-background p-4">
                <div className="mb-4 flex items-center gap-2">
                  <ImageMedia
                    resource={testimonial.logo}
                    className="h-7 w-auto"
                    imgClassName="h-7 w-auto"
                  />
                  <span className="text-lg font-semibold">{testimonial.companyName}</span>
                </div>
                <p className="mb-6 text-sm">{testimonial.quote}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-medium">{testimonial.author.name},</span>
                  <span className="text-sm text-muted-foreground">{testimonial.author.role}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="rounded-xl bg-muted p-8">
                <p className="mb-2 text-4xl font-medium">{benefitsStats[1]?.value}</p>
                <p className="mb-6 font-semibold">{benefitsStats[1]?.label}</p>
                <p className="text-muted-foreground">{benefitsStats[1]?.description}</p>
              </div>
              <ImageMedia
                resource={benefitsImages.third}
                className="max-h-96 rounded-xl object-cover"
                imgClassName="max-h-96 rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
