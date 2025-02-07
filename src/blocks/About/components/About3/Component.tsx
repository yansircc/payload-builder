import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { About3Fields } from '@/payload-types'

export default function About3({
  mainSection,
  contentSection,
  clientSection,
  statsSection,
}: About3Fields) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{mainSection.title}</h1>
          <p className="text-muted-foreground">{mainSection.description}</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          <Media
            resource={contentSection.mainImage}
            imgClassName="size-full max-h-[620px] rounded-xl object-cover"
            className="lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto">
              <Media
                resource={contentSection.infoBox.icon}
                imgClassName="mr-auto h-12 w-12 object-cover"
              />
              <div>
                <p className="mb-2 text-lg font-semibold">{contentSection.infoBox.title}</p>
                <p className="text-muted-foreground">{contentSection.infoBox.description}</p>
              </div>
              <CMSLink {...contentSection.infoBox.buttonLink} className="mr-auto" />
            </div>
            <Media
              resource={contentSection.sideImage}
              imgClassName="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>
        <div className="py-32">
          <p className="text-center">{clientSection.title}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {clientSection.clients?.map((client, index) => (
              <div key={index} className="flex items-center gap-3">
                <Media resource={client.logo} imgClassName="h-8 w-auto md:h-12" />
                <p className="text-xl font-semibold md:text-2xl">{client.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-muted p-10 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-4xl font-semibold">{statsSection.title}</h2>
            <p className="max-w-screen-sm text-muted-foreground">{statsSection.description}</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-10 text-center">
            {statsSection.stats?.map((stat, index) => (
              <div key={index} className="flex flex-col gap-4">
                <p>{stat.label}</p>
                <span className="text-4xl font-semibold md:text-5xl">{stat.value}</span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:80px_80px] opacity-15 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block"></div>
        </div>
      </div>
    </section>
  )
}
