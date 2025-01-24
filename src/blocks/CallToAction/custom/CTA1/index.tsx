import { Button } from '@/components/ui/button'
import { ClientMotionDiv } from '../../share/motion'

interface ButtonType {
  label: string
  link: string
  variant: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary'
}

interface CTA1Props {
  title: string
  description?: string
  buttons?: ButtonType[]
}

// CTA1 组件 - 基础的 CTA 布局，包含标题、描述和按钮组
export default function CTA1({ title, description, buttons }: CTA1Props) {
  return (
    <section className="py-32">
      <div className="container">
        <ClientMotionDiv
          className="flex w-full flex-col gap-16 overflow-hidden rounded-lg bg-accent p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 文本内容区域 */}
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">{title}</h3>
            {description && (
              <p className="text-muted-foreground lg:text-lg">{description}</p>
            )}
          </div>

          {/* 按钮组 */}
          {buttons && buttons.length > 0 && (
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              {buttons.map(({ label, link, variant }, i: number) => (
                <Button key={i} variant={variant} asChild>
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