import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Separator } from '@/components/ui/separator'
import { Footer1Fields } from '@/payload-types'

export default function Footer1({ footer }: Footer1Fields) {
  const { sections, logo, rightLinks, copyright } = footer
  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            {logo && <Media resource={logo} imgClassName="h-7 w-fit" priority alt="logo" />}
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <p className="text-lg font-medium">{rightLinks.title}</p>
              {rightLinks?.links?.map((linkGroup, index) => (
                <div key={index} className="flex gap-2">
                  {Object.entries(linkGroup).map(
                    ([key, link]) =>
                      link &&
                      typeof link === 'object' && (
                        <CMSLink key={key} {...link} className="size-7 text-background" />
                      ),
                  )}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-14" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {sections?.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section?.links?.map((linkGroup, index) => (
                    <li key={index} className="font-medium hover:text-primary">
                      {Object.entries(linkGroup).map(
                        ([key, link]) =>
                          link &&
                          typeof link === 'object' && (
                            <CMSLink key={key} {...link} className="p-0" />
                          ),
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-14" />
          <p className="text-sm text-muted-foreground">{copyright?.description}</p>
        </footer>
      </div>
    </section>
  )
}
