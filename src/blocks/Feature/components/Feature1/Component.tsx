import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import dynamic from 'next/dynamic'
import type { FeatureComponentProps } from '../..'
import { MessagesSquare, Play } from 'lucide-react'

const Feature1: React.FC<FeatureComponentProps> = ({
  title,
  description,
  icon,
  image,
  primaryButton,
  secondaryButton,
}) => {
  // Function to get the icon component based on name
  const getIcon = (iconName: string) => {
    const icons = {
      MessagesSquare,
      Play,
    }
    return icons[iconName as keyof typeof icons] || MessagesSquare
  }

  const IconComponent = icon ? getIcon(icon) : MessagesSquare
  const PrimaryButtonIcon = primaryButton?.icon ? getIcon(primaryButton.icon) : Play

  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="flex size-12 items-center justify-center rounded-full bg-accent">
              <IconComponent className="size-6" />
            </span>
            <h1 className="my-6 text-pretty text-3xl font-bold lg:text-4xl">{title}</h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">{description}</p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {primaryButton && (
                <Button variant="outline" className="w-full sm:w-auto" size="lg">
                  {primaryButton.icon && <PrimaryButtonIcon className="mr-2 size-4" />}
                  {primaryButton.label}
                </Button>
              )}
              {secondaryButton && (
                <Button className="w-full sm:w-auto" size="lg">
                  {secondaryButton.label}
                </Button>
              )}
            </div>
          </div>
          {image && (
            <Media
              resource={image}
              className="max-h-96 w-full rounded-md object-cover"
              alt={title}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default Feature1
