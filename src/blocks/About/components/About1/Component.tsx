import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import type { About1Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared'

export default function About1({
  mainSection,
  missionSection,
  featuresSection,
  teamSection,
}: About1Fields) {
  return (
    <section className="relative py-32">
      <div className="container flex flex-col gap-28">
        <div className="flex flex-col gap-7">
          <h1 className="text-4xl font-semibold [.theme-neon_&]:text-black lg:text-7xl">
            {mainSection.title}
          </h1>
          <p className="max-w-xl text-lg [.theme-neon_&]:text-black/90">
            {mainSection.description}
          </p>
        </div>

        <ClientMotionDiv
          className="grid gap-6 md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {missionSection.image && (
            <Media
              resource={missionSection.image}
              imgClassName="size-full max-h-96 rounded-2xl object-cover border border-border/40"
            />
          )}
          <div className="flex flex-col justify-between gap-10 rounded-2xl bg-card/1 p-10 backdrop-blur-sm border border-border/100 [.theme-neon_&]:bg-black/95 [.theme-neon_&]:border-primary/30">
            <p className="text-sm [.theme-neon_&]:text-white/80">{missionSection.label}</p>
            <p className="text-lg font-medium [.theme-neon_&]:text-white">
              {missionSection.description}
            </p>
          </div>
        </ClientMotionDiv>

        {/* Features Section */}
        <ClientMotionDiv
          className="flex flex-col gap-6 md:gap-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="max-w-xl">
            <h2 className="mb-2.5 text-3xl font-semibold [.theme-neon_&]:text-black md:text-5xl">
              {featuresSection.title}
            </h2>
            <p className="[.theme-neon_&]:text-black/80">{featuresSection.description}</p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {featuresSection.features?.map((feature, index: number) => (
              <div key={index} className="flex flex-col">
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent/20 border border-accent/30 [.theme-neon_&]:bg-black/40 [.theme-neon_&]:border-primary/30">
                  {feature.icon && (
                    <DynamicIcon
                      name={feature.icon}
                      className="size-5 [.theme-neon_&]:text-black"
                    />
                  )}
                </div>
                <h3 className="mb-3 mt-2 text-lg font-semibold [.theme-neon_&]:text-black">
                  {feature.title}
                </h3>
                <p className="[.theme-neon_&]:text-black/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </ClientMotionDiv>

        {/* Team Section */}
        <ClientMotionDiv
          className="grid gap-10 md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div>
            <p className="mb-10 text-sm font-medium [.theme-neon_&]:text-black/80">
              {teamSection.label}
            </p>
            <h2 className="mb-2.5 text-3xl font-semibold [.theme-neon_&]:text-black md:text-5xl">
              {teamSection.title}
            </h2>
          </div>
          <div>
            {teamSection.image && (
              <Media
                resource={teamSection.image}
                imgClassName="mb-6 max-h-36 w-full rounded-xl object-cover border border-border/40"
              />
            )}
            <p className="[.theme-neon_&]:text-black/80">{teamSection.description}</p>
          </div>
        </ClientMotionDiv>
      </div>
    </section>
  )
}
