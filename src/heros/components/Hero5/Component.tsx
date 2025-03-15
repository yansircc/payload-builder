import { CMSLink } from '@/components/Link'
import type { Hero5Fields } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'
import { ClientMotionDiv } from '../shared/motion'

export default function Hero5({ title, subtitle, links, image }: Hero5Fields) {
  const link = links?.[0]?.link

  const imageSrc =
    typeof image === 'string'
      ? image
      : image
        ? `${getClientSideURL()}${image.url}?${image.updatedAt}`
        : ''

  return (
    <section className="overflow-hidden py-section md:py-section-md lg:py-section-lg">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-20 lg:flex-row">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <ClientMotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <h1 className="font-heading text-4xl lg:text-6xl tracking-tight font-bold text-foreground">
                {title}
              </h1>
            </ClientMotionDiv>

            {subtitle && (
              <ClientMotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-muted-foreground text-xl lg:text-2xl font-sans font-medium max-w-xl">
                  {subtitle}
                </p>
              </ClientMotionDiv>
            )}

            {link && (
              <ClientMotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex w-full justify-center lg:justify-start"
              >
                <CMSLink
                  {...link}
                  size="lg"
                  className="w-full sm:w-auto transition-button hover:scale-button-hover hover:opacity-button-hover"
                />
              </ClientMotionDiv>
            )}
          </div>

          {imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt="placeholder hero"
              className="aspect-video w-full rounded-md object-cover"
            />
          )}
        </div>
      </div>
    </section>
  )
}
