import type { CtaSimpleBlock as CtaSimpleBlockProps } from 'src/payload-types'
import React, { useMemo } from 'react'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & CtaSimpleBlockProps

export const CtaSimpleBlock: React.FC<Props> = React.memo(
  ({
    className,
    backgroundColor = 'primary',
    heading = 'Default Heading',
    description,
    buttonLabel = 'Click Here',
    buttonUrl = '#',
    buttonStyle = 'solid',
  }) => {
    const formattedUrl = useMemo(() => {
      if (!buttonUrl.startsWith('http://') && !buttonUrl.startsWith('https://')) {
        return `https://${buttonUrl}`
      }
      return buttonUrl
    }, [buttonUrl])

    const bgColorClass = useMemo(() => {
      const bgColors: Record<string, string> = {
        primary: 'bg-blue-600 dark:bg-blue-700 text-white',
        secondary: 'bg-gray-700 dark:bg-gray-800 text-white',
        accent: 'bg-yellow-500 dark:bg-yellow-600 text-black dark:text-white',
        light: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100',
        dark: 'bg-gray-900 dark:bg-black text-white',
      }
      return bgColors[backgroundColor] || bgColors.primary
    }, [backgroundColor])

    const buttonStyles = useMemo(
      () => ({
        solid:
          'bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700',
        outline:
          'border border-white text-white hover:bg-white hover:text-black dark:hover:bg-gray-800 dark:hover:text-white',
        ghost: 'text-white underline hover:no-underline',
      }),
      [],
    )

    return (
      <section className={cn('py-12 px-6 text-center rounded-md', bgColorClass, className)}>
        <div className="max-w-2xl mx-auto">
          {heading && <h2 className="text-2xl font-bold mb-4">{heading}</h2>}
          {description && <p className="text-lg mb-6 opacity-90">{description}</p>}

          <a
            href={formattedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-block px-6 py-2 rounded-md transition-colors duration-200',
              buttonStyles[buttonStyle],
            )}
          >
            {buttonLabel}
          </a>
        </div>
      </section>
    )
  },
)

CtaSimpleBlock.displayName = 'CtaSimpleBlock'
