import type { TableBlock as TableBlockProps } from 'src/payload-types'
import React from 'react'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & TableBlockProps

export const TableBlock: React.FC<Props> = ({ className, content, wysiwyg, caption }) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      {content && (
        <div className="overflow-x-auto border border-border rounded-md p-4 bg-card">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}

      {wysiwyg && !content && (
        <div className="overflow-x-auto border border-border rounded-md p-4 bg-card">Test</div>
      )}

      {caption && <p className="text-center text-sm text-muted-foreground mt-2">{caption}</p>}
    </div>
  )
}
