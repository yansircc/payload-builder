import { ClientMotionDiv, ThemeEffect } from '@/blocks/shared'
import { DynamicIcon } from '@/components/DynamicIcon'
import { CMSLink } from '@/components/Link'
import { Contact3Fields } from '@/payload-types'

export default function Contact3({ contact }: Contact3Fields) {
  const { title, subtitle, links, supportList, officeList } = contact

  return (
    <section className="py-32">
      <ThemeEffect />
      <div className="container">
        <div className="text-center">
          <h1 className="mb-7 text-4xl font-bold md:text-6xl">{title}</h1>
          {links && links.length > 0 && (
            <ClientMotionDiv
              className="flex flex-wrap justify-center gap-4 w-full"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {links.map((linkGroup, index) => (
                <div key={index} className="flex flex-col gap-2 sm:flex-row">
                  {Object.entries(linkGroup).map(
                    ([key, link]) =>
                      link &&
                      typeof link === 'object' && (
                        <CMSLink
                          key={key}
                          {...link}
                          className="bg-background text-foreground hover:bg-accent border border-border [.theme-neon_&]:bg-black [.theme-neon_&]:text-white [.theme-neon_&]:hover:bg-black/90 [.theme-neon_&]:border-primary/30"
                        />
                      ),
                  )}
                </div>
              ))}
            </ClientMotionDiv>
          )}
          <p className="mt-4 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mt-28 grid gap-16 md:grid-cols-2">
          {supportList?.supports?.map((support, idx) => (
            <div key={idx}>
              <DynamicIcon name={support.icon || ''} className="mb-5 h-8 w-auto text-foreground" />
              <p className="mb-2 font-bold md:text-xl">{support.title}</p>
              <p className="mb-6 text-sm text-muted-foreground md:text-base">{support.subtitle}</p>
              {support.link && (
                <CMSLink {...support.link} className="font-semibold hover:underline" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-28">
          <h1 className="mb-16 text-center text-2xl font-bold md:text-4xl">{officeList?.title}</h1>
          <div className="mx-auto grid max-w-screen-xl gap-7 sm:grid-cols-2 md:grid-cols-3 lg:px-14">
            {officeList?.offices?.map((office, idx) => (
              <div key={idx} className="rounded-lg border p-5">
                <div className="mb-2 flex items-center">
                  <p className="font-bold sm:text-lg">{office.title}</p>
                </div>
                <p className="text-sm text-muted-foreground sm:text-base">{office.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
