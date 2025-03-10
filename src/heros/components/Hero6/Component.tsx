import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Hero6Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function Hero6({
  title,
  subtitle,
  links,
  image,
  secondaryImage,
  partners,
}: Hero6Fields) {
  return (
    <section className="py-section md:py-section-md lg:py-section-lg">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <ClientMotionDiv
            className="z-10 flex flex-col items-center gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-screen-md">
              <h1 className="font-heading text-4xl lg:text-6xl tracking-tight font-bold mb-4">
                {title}
              </h1>
              {subtitle && <p className="text-muted-foreground text-base font-sans">{subtitle}</p>}
            </div>
            {links && links.length > 0 && (
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
                {links.slice(0, 2).map(({ link }, i) => (
                  <CMSLink key={i} {...link} appearance={i === 1 ? 'ghost' : 'default'} />
                ))}
              </div>
            )}
          </ClientMotionDiv>
        </div>

        <ClientMotionDiv
          className={'mx-auto mt-20 max-w-7xl grid-cols-5 md:grid'}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {image && (
            <Media
              resource={image}
              className="col-span-3 h-full max-h-[500px] w-full object-cover"
              priority
            />
          )}

          <div className="relative col-span-2">
            {secondaryImage?.image && (
              <Media
                resource={secondaryImage.image}
                className="h-full max-h-[500px] w-full border-t  md:border-l lg:border-t-0"
                imgClassName="h-full object-cover"
              />
            )}
            {links && links[2] && (
              <CMSLink {...links[2].link} className="absolute bottom-5 right-5" />
            )}
          </div>
        </ClientMotionDiv>

        {partners && partners.length > 0 && (
          <ClientMotionDiv
            className="mx-auto mt-12 max-w-7xl flex flex-wrap items-center justify-between gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {partners.map(
              ({ logo }, i) =>
                logo && (
                  <div key={i} className="inline-flex h-20">
                    <Media resource={logo} imgClassName="h-full w-auto object-cover" />
                  </div>
                ),
            )}
          </ClientMotionDiv>
        )}
      </div>
    </section>
  )
}
