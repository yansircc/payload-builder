import type { LinkBlock as LinkBlockProps } from 'src/payload-types'
import React, { useMemo } from 'react'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & LinkBlockProps

export const LinkBlock: React.FC<Props> = React.memo(
  ({
    className,
    text = 'Click here',
    url = '#',
    newTab = false,
    nofollow = false,
    image,
    buttonStyle,
  }) => {
    const buttonClass = useMemo(() => {
      return cn(
        'inline-block px-4 py-2 rounded-md transition',
        {
          solid: 'bg-blue-500 text-white hover:bg-blue-700',
          outline: 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
          ghost: 'text-blue-500 hover:underline',
        }[buttonStyle || 'solid'],
      )
    }, [buttonStyle])

    const relAttr = nofollow ? 'nofollow' : undefined
    const targetAttr = newTab ? '_blank' : '_self'

    return (
      <div className={cn('my-4', className)}>
        {text && !image && (
          <a href={url} target={targetAttr} rel={relAttr} className="text-blue-500 hover:underline">
            {text}
          </a>
        )}

        {typeof image === 'object' && (
          <a
            href={url}
            target={newTab ? '_blank' : '_self'}
            rel={nofollow ? 'nofollow' : undefined}
          >
            <img
              src={image?.url ?? undefined}
              alt={text || 'Linked image'}
              className="w-full h-auto rounded-md"
            />
          </a>
        )}

        {buttonStyle && (
          <a href={url} target={targetAttr} rel={relAttr} className={buttonClass}>
            {text}
          </a>
        )}
      </div>
    )
  },
)

LinkBlock.displayName = 'LinkBlock'
