import type { ListBlock as ListBlockProps } from 'src/payload-types'
import React from 'react'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & ListBlockProps

export const ListBlock: React.FC<Props> = ({ className, type, items }) => {
  if (!items || items.length === 0) return null

  return (
    <div className={cn('my-4', className)}>
      {type === 'ordered' ? (
        <ol className="list-decimal pl-6 space-y-1">
          {items.map((item, index) => (
            <li key={index}>{item.text}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc pl-6 space-y-1">
          {items.map((item, index) => (
            <li key={index}>{item.text}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
