import { CMSLink } from '@/components/Link'
import type { CTA17Fields } from '@/payload-types'

import { ClientMotionDiv } from '../shared/motion'

export default function CTA17({ cta }: CTA17Fields) {
  const { title, subtitle, links } = cta

  return (
    <section className="py-32">
      <div className="container">
        <div className='flex items-center justify-center rounded-2xl border bg-[url("https://shadcnblocks.com/images/block/circles.svg")] bg-cover bg-center px-8 py-20 text-center md:p-20'>
          <div className="mx-auto max-w-screen-md">
            <h1 className="mb-4 text-balance text-3xl font-semibold md:text-5xl">
              {title}
            </h1>
            <p className="text-muted-foreground md:text-lg">{subtitle}</p>
            {/* Links */}
            {links && links.length > 0 && (
              <ClientMotionDiv
                className="mt-11 flex flex-col justify-center gap-2 sm:flex-row"
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
      </div>
    </section>
  )
}
