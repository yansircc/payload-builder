import { Media } from '@/components/Media'
import { Contact8Fields } from '@/payload-types'

export default function Contact8({ contact }: Contact8Fields) {
  const { title, subtitle, image, supportList, officeList } = contact

  return (
    <section className="py-32">
      <div className="container">
        <div className="text-center">
          <h1 className="mb-3 text-5xl font-bold">{title}</h1>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mx-auto mt-24 grid max-w-screen-xl gap-4 md:grid-cols-2">
          {image && <Media resource={image} className="h-full rounded-lg object-cover" />}

          <div className="flex flex-col gap-2 rounded-lg bg-accent p-2">
            <div className="flex h-full flex-col justify-between gap-6 rounded-lg bg-background p-6">
              <p className="text-2xl">{supportList?.title}</p>
              <div className="flex flex-col">
                {supportList?.supports?.map((link, idx) => (
                  <a href={link.link.url || ''} key={idx}>
                    {link.link.label}
                  </a>
                ))}
              </div>
            </div>

            {officeList?.title && (
              <div className="flex h-full flex-col justify-between gap-6 rounded-md bg-background p-6">
                <p className="text-2xl">{officeList.title}</p>
                <div className="grid gap-8 md:grid-cols-2 md:gap-4">
                  {officeList.offices?.map((office, idx) => (
                    <div key={idx}>
                      <p className="mb-2 text-xl text-muted-foreground md:mb-4">{office.title}</p>
                      <p>{office.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
