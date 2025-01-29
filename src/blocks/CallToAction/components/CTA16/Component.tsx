import { CMSLink } from '@/components/Link'
import { DynamicIcon } from '@/components/DynamicIcon'
import type { CTA16Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function CTA16({ cta }: CTA16Fields) {
  const { title, subtitle, links, image, icon } = cta

  return (
    <section className="py-32">
      <div className="container">
        <div
          className="flex h-[620px] items-center justify-center rounded-3xl bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)), url(${
              typeof image === 'string' ? image : image?.url
            })`,
          }}
        >
          <div className="flex flex-col gap-8 p-4 text-center text-primary-foreground">
            <div className="flex items-center justify-center gap-2 text-2xl font-medium">
              <DynamicIcon name={icon} className="h-full w-7" /> {subtitle}
            </div>
            <h2 className="text-5xl font-bold">{title}</h2>
            {/* Links */}
            {links && links.length > 0 && (
              <ClientMotionDiv
                className="flex flex-col justify-center gap-2 sm:flex-row"
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
        </div>
      </div>
    </section>
  )
}
