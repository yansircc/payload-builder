import { Separator } from '@/components/ui/separator'
import { Footer1Fields } from '@/payload-types'
import { Apple, Twitch, Twitter } from 'lucide-react'

export default function Footer1({ footer }: Footer1Fields) {
  console.log(footer)
  const { sections } = footer || {}
  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <img
              src="https://shadcnblocks.com/images/block/logos/shadcn-ui.svg"
              alt="logo"
              className="mb-8 mr-auto h-7 md:mb-0"
            />
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <p className="text-lg font-medium">Copy the code and make it yours.</p>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg bg-primary p-2.5"
                >
                  <Apple className="size-7 text-background" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg bg-primary p-2.5"
                >
                  <img
                    src="https://shadcnblocks.com/images/block/logos/google-play-icon.svg"
                    className="size-6 text-background"
                    alt="google play"
                  />
                </a>
              </div>
            </div>
          </div>
          <Separator className="my-14" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {sections?.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {/* {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-primary">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))} */}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="mb-4 font-bold">Legal</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href="#">Term of Services</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
              <h3 className="mb-4 mt-8 font-bold">Social</h3>
              <ul className="flex items-center space-x-6 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href="#">
                    <Twitter className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">
                    <Twitch className="size-6" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-14" />
          <p className="text-sm text-muted-foreground">
            © 2024 Shadcnblocks. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  )
}
