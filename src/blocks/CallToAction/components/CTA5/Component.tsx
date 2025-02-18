import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { CTA5Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function CTA5({ title, subtitle, image, links }: CTA5Fields) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex w-full flex-col overflow-hidden rounded-lg border border-border bg-accent md:rounded-xl lg:flex-row lg:items-center">
          <div className="w-full shrink-0 self-stretch lg:w-1/2">
            {image && (
              <Media
                imgClassName="aspect-[3/2] w-full rounded-md object-cover"
                resource={image}
                alt={title}
              />
            )}
          </div>
          <div className="w-full shrink-0 px-4 py-6 md:p-8 lg:w-1/2 lg:px-16">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">{title}</h3>
            {subtitle && <p className="mb-8 text-muted-foreground lg:text-lg">{subtitle}</p>}
            {links && links.length > 0 && (
              <ClientMotionDiv
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {links.map((linkGroup, index) => (
                  <div key={index} className="flex flex-col gap-2 sm:flex-row">
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
