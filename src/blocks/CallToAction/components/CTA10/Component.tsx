import { ClientMotionDiv } from '@/blocks/shared'
import { CMSLink } from '@/components/Link'
import type { CTA10Fields } from '@/payload-types'

export default function CTA10({ title, subtitle, links }: CTA10Fields) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex w-full flex-col gap-16 overflow-hidden rounded-lg bg-accent p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16">
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">{title}</h3>
            {subtitle && <p className="text-muted-foreground lg:text-lg">{subtitle}</p>}
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {links && links.length > 0 && (
              <ClientMotionDiv
                className="flex flex-col gap-2 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {links.map((linkGroup, index) => (
                  <div key={index}>
                    {Object.entries(linkGroup).map(
                      ([key, link]) =>
                        link && typeof link === 'object' && <CMSLink key={key} {...link} />,
                    )}
                  </div>
                ))}
              </ClientMotionDiv>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
