import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { CTA10Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

interface Props {
  cta: CTA10Fields['cta']
}

const CTA10 = ({ cta }: Props) => {
  const { title, description, buttons } = cta
  if (!buttons?.length) return null

  return (
    <section className="py-32">
      <div className="container">
        <ClientMotionDiv
          className="flex w-full flex-col gap-16 overflow-hidden rounded-lg bg-accent p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {title}
            </h3>
            {description && (
              <p className="text-muted-foreground lg:text-lg">{description}</p>
            )}
          </div>
          {buttons?.length > 0 && (
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant}
                  asChild
                  className={cn('text-sm font-semibold')}
                >
                  <a href={button.link?.url || '#'}>{button.label}</a>
                </Button>
              ))}
            </div>
          )}
        </ClientMotionDiv>
      </div>
    </section>
  )
}

export default CTA10