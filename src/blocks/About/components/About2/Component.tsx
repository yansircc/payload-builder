import { ImageMedia } from '@/components/Media/ImageMedia'
import type { About2Fields } from '@/payload-types'

export default function About2({
  mainContent,
  images,
  stats,
  partners,
  benefits,
  testimonial,
}: About2Fields) {
  const firstBenefitStat = benefits.benefitsStats?.[0]
  const secondBenefitStat = benefits.benefitsStats?.[1]

  return (
    <section className="py-32">
      <div className="flex flex-col gap-28">
        <div className="container flex flex-col gap-10 text-center md:gap-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <h1 className="text-4xl font-medium [.theme-neon_&]:text-black md:text-6xl">
              {mainContent.title}
            </h1>
            <p className="text-lg [.theme-neon_&]:text-black/80 md:text-xl">
              {mainContent.description}
            </p>
          </div>
        </div>
        <div className="container flex flex-col gap-16">
          <h2 className="max-w-3xl text-4xl font-medium [.theme-neon_&]:text-black md:text-5xl">
            {stats.secondTitle}
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {stats.stats?.map((stat, index) => (
              <div key={index} className="flex flex-col gap-6 border-b pb-8">
                <p className="text-4xl font-medium [.theme-neon_&]:text-black md:text-5xl">
                  {stat.value}
                </p>
                <p className="[.theme-neon_&]:text-black/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className=" backdrop-blur-sm py-24">
          <div className="container flex flex-col items-center gap-11">
            <p className="text-center text-xl font-medium [.theme-neon_&]:text-black">
              {partners.trustedByTitle}
            </p>
            <div className="grid grid-cols-2 gap-x-7 gap-y-12 lg:grid-cols-4">
              {partners.partners?.map((partner, index) => (
                <div key={index} className="flex items-center gap-3">
                  {partner.logo && (
                    <ImageMedia
                      resource={partner.logo}
                      className="h-8 w-auto md:h-14"
                      imgClassName="h-8 w-auto md:h-14"
                    />
                  )}
                  <p className="text-xl font-semibold [.theme-neon_&]:text-black md:text-4xl">
                    {partner.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container flex flex-col items-center gap-14">
          <h2 className="text-center text-4xl font-semibold [.theme-neon_&]:text-black md:text-5xl">
            {benefits.benefitsTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid grid-cols-1 gap-6 md:col-span-2 md:grid-cols-2 md:flex-row lg:col-span-1 lg:grid-cols-1 lg:flex-col">
              {/* ... first benefits image remains unchanged ... */}
              {firstBenefitStat && (
                <div className="flex flex-col justify-center rounded-xl bg-card/1 backdrop-blur-sm p-8 border border-border/40 [.theme-neon_&]:bg-black/95 [.theme-neon_&]:border-primary/30">
                  <p className="mb-2 text-4xl font-medium [.theme-neon_&]:text-white">
                    {firstBenefitStat.value}
                  </p>
                  <p className="mb-6 font-semibold [.theme-neon_&]:text-white">
                    {firstBenefitStat.label}
                  </p>
                  <p className="[.theme-neon_&]:text-white/70">{firstBenefitStat.description}</p>
                </div>
              )}
            </div>
            <div className="relative">
              <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-background/1 backdrop-blur-sm p-4 border border-border/40 [.theme-neon_&]:bg-black/95 [.theme-neon_&]:border-primary/30">
                <div className="mb-4 flex items-center gap-2">
                  {testimonial.logo && (
                    <ImageMedia
                      resource={testimonial.logo}
                      className="h-7 w-auto"
                      imgClassName="h-7 w-auto"
                    />
                  )}
                  <span className="text-lg font-semibold [.theme-neon_&]:text-white">
                    {testimonial.companyName}
                  </span>
                </div>
                <p className="mb-6 text-sm [.theme-neon_&]:text-white/90">{testimonial.quote}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-medium [.theme-neon_&]:text-white">
                    {testimonial.author.name},
                  </span>
                  <span className="text-sm [.theme-neon_&]:text-white/70">
                    {testimonial.author.role}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {secondBenefitStat && (
                <div className="rounded-xl bg-card/1 backdrop-blur-sm p-8 border border-border/40 [.theme-neon_&]:bg-black/95 [.theme-neon_&]:border-primary/30">
                  <p className="mb-2 text-4xl font-medium [.theme-neon_&]:text-white">
                    {secondBenefitStat.value}
                  </p>
                  <p className="mb-6 font-semibold [.theme-neon_&]:text-white">
                    {secondBenefitStat.label}
                  </p>
                  <p className="[.theme-neon_&]:text-white/70">{secondBenefitStat.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
