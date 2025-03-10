import type { TableBlock as TableBlockProps } from 'src/payload-types'
import React from 'react'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & TableBlockProps

export const TableBlock: React.FC<Props> = ({ className, content, caption }) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      {content && (
        <div className="overflow-x-auto rounded-md border border-border bg-card p-4">
          <div
            className="[&_table]:w-full [&_th]:py-2 [&_th]:px-4 [&_th]:text-left [&_th]:text-foreground 
              [&_td]:py-2 [&_td]:px-4 [&_td]:text-foreground [&_tr]:border-b [&_tr]:border-border"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}

      {caption && <p className="mt-2 text-center text-sm text-muted-foreground">{caption}</p>}
    </div>
  )
}
