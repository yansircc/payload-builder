import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import type { About1Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared'

interface FeatureItemProps {
  icon: string
  title: string
  description: string
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
        <DynamicIcon name={icon} className="size-5" />
      </div>
      <h3 className="mb-3 mt-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export default function About1({
  mainSection,
  missionSection,
  featuresSection,
  teamSection,
}: About1Fields) {
  return (
    <section className="py-32">
      <div className="container flex flex-col gap-28">
        {/* Main Section */}
        <ClientMotionDiv
          className="flex flex-col gap-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-semibold lg:text-7xl">{mainSection.title}</h1>
          <p className="max-w-xl text-lg">{mainSection.description}</p>
        </ClientMotionDiv>

        {/* Mission Section */}
        <ClientMotionDiv
          className="grid gap-6 md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Media
            resource={missionSection.image}
            imgClassName="size-full max-h-96 rounded-2xl object-cover"
          />
          <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10">
            <p className="text-sm text-muted-foreground">{missionSection.label}</p>
            <p className="text-lg font-medium">{missionSection.description}</p>
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
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">{featuresSection.title}</h2>
            <p className="text-muted-foreground">{featuresSection.description}</p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {featuresSection.features?.map((feature, index) => (
              <FeatureItem
                key={index}
                icon={feature.icon ?? ''}
                title={feature.title}
                description={feature.description}
              />
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
            <p className="mb-10 text-sm font-medium text-muted-foreground">{teamSection.label}</p>
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">{teamSection.title}</h2>
          </div>
          <div>
            <Media
              resource={teamSection.image}
              imgClassName="mb-6 max-h-36 w-full rounded-xl object-cover"
            />
            <p className="text-muted-foreground">{teamSection.description}</p>
          </div>
        </ClientMotionDiv>
      </div>
    </section>
  )
}
