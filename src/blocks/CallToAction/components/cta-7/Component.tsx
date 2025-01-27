import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  cta: {
    title?: string
    features?: Array<{
      text: string
      id?: string | null
    }> | null
    buttons?: Array<{
      label: string
      variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary'
      link?: {
        type?: 'custom' | 'reference' | null
        newTab?: boolean | null
        reference?: {
          relationTo: 'pages' | 'posts'
          value: string
        } | null
        url?: string | null
      } | null
    }> | null
    subtitle?: string
  }
}

const CTA7 = ({ cta }: Props) => {
  const { title = "Feature name", subtitle = "Bullet points introduction", features, buttons } = cta

  const defaultFeatures = [
    { text: "Bullet point 1", id: "1" },
    { text: "Bullet point 1", id: "2" },
    { text: "Bullet point 1", id: "3" },
    { text: "Bullet point 1", id: "4" },
  ]

  const displayFeatures = features?.length ? features : defaultFeatures

  return (
    <section className="py-32">
      <div className="container">
        <div className="relative rounded-xl border border-border bg-accent px-6 py-8 2xl:grid 2xl:grid-cols-2 2xl:px-14 2xl:py-10">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <svg
              fill="none"
              width={404}
              height={384}
              viewBox="0 0 404 384"
              aria-hidden="true"
              className="absolute left-full top-full -translate-x-2/3 -translate-y-1/2 rotate-[60deg]"
            >
              <defs>
                <pattern
                  x={0}
                  y={0}
                  id="dots"
                  width={16}
                  height={16}
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx={2}
                    cy={2}
                    r={2}
                    fill="currentColor"
                    className="text-border"
                  />
                </pattern>
              </defs>
              <rect fill="url(#dots)" width={400} height={400} />
            </svg>
          </div>
          <div className="relative mb-12 2xl:mb-0">
            <h3 className="mb-6 text-2xl font-semibold md:mb-8 md:text-4xl lg:mb-12">
              {title}
            </h3>
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              {subtitle}
            </p>
            <ul className="grid gap-x-8 gap-y-4 text-muted-foreground md:grid-cols-2">
              {displayFeatures.map((feature, index) => (
                <li key={feature.id || index} className="flex items-center gap-2">
                  <Check className="size-5" />
                  {feature.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex items-end 2xl:justify-end">
            {buttons?.[0]?.label ? (
              buttons[0].link ? (
                <Button asChild variant={buttons[0].variant}>
                  <a 
                    href={buttons[0].link.url || '#'} 
                    target={buttons[0].link.newTab ? '_blank' : undefined}
                    rel={buttons[0].link.newTab ? 'noopener noreferrer' : undefined}
                  >
                    {buttons[0].label}
                  </a>
                </Button>
              ) : (
                <Button variant={buttons[0].variant}>{buttons[0].label}</Button>
              )
            ) : (
              <Button>Call to Action</Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA7 