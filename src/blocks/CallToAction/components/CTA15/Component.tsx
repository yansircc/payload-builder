import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { CTA15Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared'

export default function CTA15({ title, subtitle, links, image, heading }: CTA15Fields) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-20 rounded-2xl border bg-[radial-gradient(ellipse_30%_60%_at_100%_50%,hsla(var(--primary)_/_20%),#ffffff00)] pt-20 sm:pl-16 lg:flex-row lg:bg-[radial-gradient(ellipse_50%_50%_at_50%_120%,hsla(var(--primary)_/_20%),#ffffff00)] lg:pl-20">
          <div className="lg:texlf mx-auto max-w-md px-4 text-center md:px-0 lg:mx-0 lg:pb-20 lg:text-left">
            <p className="mb-6 font-medium">{heading || 'Ready to get started?'}</p>
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">{title}</h2>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
            {links && links.length > 0 && (
              <ClientMotionDiv
                className="flex w-full flex-col gap-2 sm:flex-row mt-6 lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {links.map((linkGroup, index) => (
                  <div key={index} className="w-full sm:w-auto">
                    {Object.entries(linkGroup).map(
                      ([key, link]) =>
                        link &&
                        typeof link === 'object' && (
                          <CMSLink key={key} {...link} className="w-full sm:w-auto" />
                        ),
                    )}
                  </div>
                ))}
              </ClientMotionDiv>
            )}
          </div>
          <div className="w-full pl-4 sm:pl-0">
            {image && (
              <Media
                resource={image}
                imgClassName="h-full max-h-[400px] w-full rounded-br-2xl rounded-tl-2xl object-cover"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
