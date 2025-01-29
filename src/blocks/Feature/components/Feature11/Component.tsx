import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { ClientMotionDiv } from '../shared/motion'
import { Feature11Fields } from '@/payload-types'

export default function Feature11({ feature }: Feature11Fields) {
  const { title, description, image, links, features } = feature

  return (
    <section className="py-32">
      <div className="container max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row">
          {image && (
            <Media
              resource={image}
              imgClassName="max-h-96 w-full rounded-lg object-cover md:max-h-[500px]"
            />
          )}
          <div className="lg:p-10">
            <h2 className="text-balance text-3xl font-medium md:text-5xl">{title}</h2>
            <p className="mt-1 text-muted-foreground md:mt-6">{description}</p>
            {links && links.length > 0 && (
              <ClientMotionDiv
                className="flex flex-wrap gap-4 mt-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
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
              </ClientMotionDiv>
            )}
            <ul className="mt-10 flex-wrap items-center gap-6 space-y-6 md:flex md:space-y-0">
              {features?.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  {feature.icon && <DynamicIcon name={feature.icon} className="size-4" />}
                  {feature.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
