import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Footer7Fields } from '@/payload-types'

export default function Footer7({ footer }: Footer7Fields) {
  const { sections, title, subtitle, logo, rightLinks, copyright, socialLinks } = footer
  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              <div>
                <span className="flex items-center justify-center gap-4 lg:justify-start">
                  {logo && <Media resource={logo} imgClassName="h-11 w-fit" priority alt="logo" />}
                  <p className="text-3xl font-semibold">{title}</p>
                </span>
                <p className="mt-6 text-sm text-muted-foreground">{subtitle}</p>
              </div>
              <ul className="flex items-center space-x-6 text-muted-foreground">
                {socialLinks?.links?.map((linkGroup, index) => (
                  <li key={index} className="font-medium">
                    {linkGroup.link && (
                      <CMSLink
                        {...linkGroup.link}
                        className="flex size-6 items-center justify-center hover:text-primary"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {sections?.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-6 font-bold">{section.title}</h3>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    {section.links?.map((linkGroup, index) => (
                      <li key={index} className="font-medium hover:text-primary">
                        {linkGroup.link && (
                          <CMSLink
                            {...linkGroup.link}
                            className="text-muted-foreground p-0 h-auto"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
            <p>{copyright}</p>
            <ul className="flex justify-center gap-4 lg:justify-start">
              {rightLinks?.links?.map((linkGroup, index) => (
                <li key={index} className="hover:text-primary">
                  {linkGroup.link && <CMSLink {...linkGroup.link} />}
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}
