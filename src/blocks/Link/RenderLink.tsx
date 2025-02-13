import type { LinkBlock as LinkBlockProps } from 'src/payload-types'
import React from 'react'
import { CMSLink } from '@/components/Link'
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
    const relAttr = nofollow ? 'nofollow' : undefined

    return (
      <div className={cn('my-4 inline-block', className)}>
        {' '}
        <CMSLink
          url={url}
          newTab={newTab}
          label={text}
          appearance={buttonStyle ? 'outline' : 'inline'}
          className={cn(
            'inline-flex items-center px-4 py-2 rounded-md transition',
            buttonStyle
              ? 'bg-blue-500 text-white hover:bg-blue-700'
              : 'text-blue-500 hover:underline',
          )}
        ></CMSLink>
      </div>
    )
  },
)

LinkBlock.displayName = 'LinkBlock'
