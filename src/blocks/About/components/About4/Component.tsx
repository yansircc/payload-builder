import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { About4Fields } from '@/payload-types'

export default function About4({
  mainSection,
  gallerySection,
  contentSection,
  ctaSection,
}: About4Fields) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-screen-md flex-col gap-8 pb-28 text-center">
          <h1 className="text-4xl font-semibold md:text-7xl">{mainSection.title}</h1>
          <p className="text-xl font-medium text-muted-foreground">{mainSection.description}</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {gallerySection?.images?.map(
            (image, index) =>
              image.image && (
                <Media key={index} resource={image.image} imgClassName="h-80 w-full object-cover" />
              ),
          )}
        </div>

        <div className="mx-auto grid max-w-screen-lg gap-28 py-28 md:grid-cols-2">
          <div>
            <h2 className="mb-5 text-4xl font-semibold">{contentSection.vision.title}</h2>
            <p className="text-xl font-medium leading-8 text-muted-foreground whitespace-pre-line">
              {contentSection.vision.description}
            </p>
          </div>
          <div>
            <h2 className="mb-5 text-4xl font-semibold">{contentSection.creators.title}</h2>
            <p className="text-xl font-medium leading-8 text-muted-foreground whitespace-pre-line">
              {contentSection.creators.description}
            </p>
          </div>
        </div>

        <div className="mx-auto flex max-w-screen-lg flex-col items-center justify-between gap-8 rounded-2xl bg-muted/50 p-14 text-center md:flex-row md:text-left">
          <h3 className="text-3xl font-semibold whitespace-pre-line">{ctaSection.title}</h3>
          <CMSLink {...ctaSection.button} />
        </div>
      </div>
    </section>
  )
}
