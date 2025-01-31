import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Footer2Fields } from '@/payload-types'

export default function Footer2({ footer }: Footer2Fields) {
  const { sections, title, subtitle, logo, rightLinks, copyright } = footer
  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                {logo && <Media resource={logo} imgClassName="h-10 w-fit" priority alt="logo" />}
                <p className="text-xl font-semibold">{title}</p>
              </div>
              <p className="mt-4 font-bold">{subtitle}</p>
            </div>
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
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright?.description}</p>
            <ul className="flex gap-4">
              {rightLinks?.links?.map((linkGroup, index) => (
                <li key={index} className="underline hover:text-primary">
                  {linkGroup.link && <CMSLink {...linkGroup.link} className="p-0" />}
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}
