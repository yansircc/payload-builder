import { Media } from '@/components/Media'
import type { CTA1Fields } from '@/payload-types'
import { DynamicIcon } from '@/components/Link/DynamicIcon'
import { CMSLink } from '@/components/Link'
import { ClientMotionDiv } from '../shared/motion'

export default function CTA1({ cta }: CTA1Fields) {
  const { title, subtitle, links, image, icon } = cta

  return (
    <section className="py-32">
      <div className="container max-w-5xl">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="p-6 md:max-w-96">
            <div className="mb-2 flex items-center gap-2">
              {icon && (
                <span className="flex size-7 items-center justify-center rounded-full bg-muted">
                  <DynamicIcon name={icon} className="size-4" />
                </span>
              )}
              <h4 className="text-2xl font-bold">{title}</h4>
            </div>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
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
                            <CMSLink key={key} {...link} className="w-full sm:w-auto" />
                          ),
                      )}
                  </div>
                ))}
              </ClientMotionDiv>
            )}
          </div>
          <div className="aspect-video md:max-w-96">
            <Media resource={image} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
