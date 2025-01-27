import { Button } from '@/components/ui/button'
import type { CTA11Fields } from '@/payload-types'

interface Props {
  cta: CTA11Fields['cta']
}

const CTA11 = ({ cta }: Props) => {
  const { title, description, buttons } = cta
  if (!buttons?.length) return null

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col items-center rounded-lg bg-accent p-8 text-center md:rounded-xl lg:p-16">
          <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            {title}
          </h3>
          {description && (
            <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
              {description}
            </p>
          )}
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                className="w-full sm:w-auto"
                asChild
              >
                <a href={button.link?.url || '#'}>{button.label}</a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA11 