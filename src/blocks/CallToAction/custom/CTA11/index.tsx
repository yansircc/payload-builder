import { Button } from '@/components/ui/button'
import { ClientMotionDiv } from '../../share/motion'

export interface CTA11Props {
  title: string
  description?: string | null
  buttons?: {
    label: string
    link: string
    variant?: ('default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary') | null
    id?: string | null
  }[] | null
}

// CTA11 组件 - 居中布局的 CTA，包含标题、描述和按钮组
export const CTA11: React.FC<CTA11Props> = ({ title, description, buttons }) => {
  return (
    <section className="py-32">
      <div className="container">
        <ClientMotionDiv
          className="flex flex-col items-center rounded-lg bg-accent p-8 text-center md:rounded-xl lg:p-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            {title}
          </h3>
          {description && (
            <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
              {description}
            </p>
          )}
          {buttons && buttons.length > 0 && (
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
              {buttons.map(({ label, link, variant }, i) => (
                <Button
                  key={i}
                  variant={variant || 'default'}
                  className="w-full sm:w-auto"
                  asChild
                >
                  <a href={link}>{label}</a>
                </Button>
              ))}
            </div>
          )}
        </ClientMotionDiv>
      </div>
    </section>
  )
} 