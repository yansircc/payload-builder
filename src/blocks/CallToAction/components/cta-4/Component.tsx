import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  cta: {
    title: string
    description?: string | null
    features?: Array<{
      text: string
      id?: string | null
    }> | null
    buttons?: Array<{
      label: string
      link?: {
        type?: 'custom' | 'reference' | null
        newTab?: boolean | null
        reference?: {
          relationTo: 'pages' | 'posts'
          value: string
        } | null
        url?: string | null
        appearance?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary'
      } | null
    }> | null
  }
}

const CTA4 = ({ cta }: Props) => {
  const { title, description, features, buttons } = cta
  const button = buttons?.[0]

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 rounded-lg bg-accent p-6 md:flex-row lg:px-20 lg:py-16">
          <div className="w-full">
            <h4 className="mb-1 text-2xl font-bold md:text-3xl">
              {title}
            </h4>
            <p className="text-muted-foreground">
              {description}
            </p>
            {button && (
              <Button className="mt-8 px-0 underline" variant="link" asChild>
                <a href={button.link?.url || '#'}>
                  {button.label} <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
            )}
          </div>
          <div className="w-full">
            <ul className="space-y-2 text-sm font-medium sm:text-base lg:text-lg">
              {features?.map((feature, index) => (
                <li key={feature.id || index} className="flex items-center">
                  <Check className="mr-4 size-5" />
                  {feature.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA4; 