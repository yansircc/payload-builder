import { CMSLink } from '@/components/Link'
import { Footer5Fields } from '@/payload-types'

export default function Footer5({ footer }: Footer5Fields) {
  const { sections, appLinks, socialLinks, copyright } = footer
  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {sections?.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links?.map((linkGroup, index) => (
                    <li key={index} className="font-medium hover:text-primary">
                      {linkGroup.link && <CMSLink {...linkGroup.link} className="p-0" />}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 gap-10">
            <div className="grid gap-8 lg:grid-cols-4 lg:flex-row">
              <div className="col-span-3">
                <p className="mb-3 font-bold">{socialLinks?.title}</p>
                <ul className="flex items-center gap-2 text-muted-foreground">
                  {socialLinks?.links?.map((linkGroup, index) => (
                    <li key={index} className="font-medium">
                      {linkGroup.link && (
                        <CMSLink
                          {...linkGroup.link}
                          className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 font-bold">{appLinks?.title}</p>
                <ul className="flex items-center gap-2 text-muted-foreground">
                  {appLinks?.links?.map((linkGroup, index) => (
                    <li key={index} className="font-medium">
                      {linkGroup.link && (
                        <CMSLink
                          {...linkGroup.link}
                          className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-24 border-t pt-8">
            <p className="text-center text-sm font-medium text-muted-foreground">{copyright}</p>
          </div>
        </footer>
      </div>
    </section>
  )
}
