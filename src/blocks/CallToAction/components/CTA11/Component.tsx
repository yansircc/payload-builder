import { CMSLink } from '@/components/Link'
import type { CTA11Fields } from '@/payload-types'

import { ClientMotionDiv } from '../shared/motion'

export default function CTA11({ cta }: CTA11Fields) {
  const { title, subtitle, links } = cta

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col items-center rounded-lg bg-accent p-8 text-center md:rounded-xl lg:p-16">
          <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            {title}
          </h3>
          {subtitle && (
            <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
              {subtitle}
            </p>
          )}
          {links && links.length > 0 && (
            <ClientMotionDiv
              className="flex w-full flex-col justify-center gap-2 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {links.map((linkGroup, index) => (
                <div key={index} className="w-full sm:w-auto">
                  {Object.entries(linkGroup)
                    .filter(([key]) => key.startsWith('link-'))
                    .map(
                      ([key, link]) =>
                        link &&
                        typeof link === 'object' && (
                          <CMSLink
                            key={key}
                            {...link}
                            className="w-full sm:w-auto"
                          />
                        )
                    )}
                </div>
              ))}
            </ClientMotionDiv>
          )}
        </div>
      </div>
    </section>
  )
}
