import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Hero47Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function Hero47({ hero }: { hero: Hero47Fields['hero'] }) {
  if (!hero) return null

  const { title: heading, subtitle: subheading, description, image, links } = hero

  return (
    <section className="bg-background py-20 lg:py-32">
      <div className="container flex flex-col items-center gap-10 lg:my-0 lg:flex-row">
        <ClientMotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-7 lg:w-2/3"
        >
          <h2 className="text-5xl font-semibold text-foreground md:text-5xl lg:text-8xl">
            <span>{heading}</span>
            <span className="text-muted-foreground">{subheading}</span>
          </h2>
          <p className="text-base text-muted-foreground md:text-lg lg:text-xl">{description}</p>
          {links && links.length > 0 && (
            <div className="flex flex-wrap items-start gap-5 lg:gap-7">
              {links.map((linkGroup, index) => (
                <div key={index} className="flex flex-col gap-2 sm:flex-row">
                  {Object.entries(linkGroup)
                    .filter(([key]) => key.startsWith('link-'))
                    .map(
                      ([key, link]) =>
                        link && typeof link === 'object' && <CMSLink key={key} {...link} />,
                    )}
                </div>
              ))}
            </div>
          )}
        </ClientMotionDiv>

        <ClientMotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10"
        >
          <div className="absolute !left-1/2 top-2.5 !h-[92%] !w-[69%] -translate-x-[52%] overflow-hidden rounded-[35px]">
            <Media
              resource={image}
              className="size-full object-cover object-[50%_0%]"
              imgClassName="size-full"
            />
          </div>
          <img
            className="relative z-10"
            src="https://shadcnblocks.com/images/block/mockups/phone-2.png"
            width={450}
            height={889}
            alt="iPhone mockup frame"
          />
        </ClientMotionDiv>
      </div>
    </section>
  )
}
