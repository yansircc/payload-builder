import type { LinkBlock as LinkBlockProps } from 'src/payload-types'
import React from 'react'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & LinkBlockProps

export const LinkBlock: React.FC<Props> = ({
  className,
  text,
  url,
  newTab,
  nofollow,
  image,
  buttonStyle,
}) => {
  return (
    <div className={cn('my-4', className)}>
      {text && !image && (
        <a
          href={url}
          target={newTab ? '_blank' : '_self'}
          rel={nofollow ? 'nofollow' : undefined}
          className="text-blue-500 hover:underline"
        >
          {text}
        </a>
      )}

      {image && (
        <a href={url} target={newTab ? '_blank' : '_self'} rel={nofollow ? 'nofollow' : undefined}>
          <img src={image.url} alt={text || 'Linked image'} className="w-full h-auto rounded-md" />
        </a>
      )}

      {buttonStyle && (
        <a
          href={url}
          target={newTab ? '_blank' : '_self'}
          rel={nofollow ? 'nofollow' : undefined}
          className={cn(
            'inline-block px-4 py-2 rounded-md transition',
            buttonStyle === 'solid' && 'bg-blue-500 text-white hover:bg-blue-700',
            buttonStyle === 'outline' &&
              'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
            buttonStyle === 'ghost' && 'text-blue-500 hover:underline',
          )}
        >
          {text}
        </a>
      )}
    </div>
  )
}
