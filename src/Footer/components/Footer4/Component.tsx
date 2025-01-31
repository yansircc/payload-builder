import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Footer4Fields } from '@/payload-types'
import { Media } from '@/components/Media'

export default function Footer4({ footer }: Footer4Fields) {
  const { sections, logo, leftLinks, copyright, socialLinks, newsletter } = footer
  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 flex h-full items-center justify-between md:items-start lg:col-span-3 lg:flex-col">
              {logo && <Media resource={logo} imgClassName="h-7 w-fit" priority alt="logo" />}
              <ul className="flex items-center space-x-6 text-muted-foreground">
                {socialLinks?.links?.map((linkGroup, index) => (
                  <li key={index} className="font-medium hover:text-primary">
                    {linkGroup.link && (
                      <CMSLink {...linkGroup.link} className="flex items-center justify-center" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <Separator className="col-span-2 my-6 lg:hidden" />
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
          <Separator className="my-14 lg:my-20" />
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="mb-2 text-3xl font-semibold lg:text-4xl">{newsletter?.title}</p>
              <p className="text-muted-foreground">{newsletter?.subtitle}</p>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
          <Separator className="my-14 lg:my-20" />
          <div className="flex flex-col justify-between gap-4 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <ul className="flex gap-4">
              {leftLinks?.links?.map((linkGroup, index) => (
                <li key={index} className="underline hover:text-primary">
                  {linkGroup.link && <CMSLink {...linkGroup.link} />}
                </li>
              ))}
            </ul>
            <p>{copyright?.description}</p>
          </div>
        </footer>
      </div>
    </section>
  )
}
