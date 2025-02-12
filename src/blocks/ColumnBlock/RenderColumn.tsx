import type { ColumnsBlock as ColumnsBlockProps } from 'src/payload-types'
import React, { useMemo } from 'react'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & ColumnsBlockProps

type TextNode = {
  type: string
  version: number
  text?: string
}

export const ColumnsBlock: React.FC<Props> = ({ className, layout = '50-50', columns = [] }) => {
  const gridLayout = useMemo(() => {
    const gridLayoutMap: Record<'50-50' | '33-67' | '67-33' | '25-75' | '75-25', string> = {
      '50-50': 'grid-cols-2',
      '33-67': 'grid-cols-[1fr_2fr]',
      '67-33': 'grid-cols-[2fr_1fr]',
      '25-75': 'grid-cols-[1fr_3fr]',
      '75-25': 'grid-cols-[3fr_1fr]',
    }
    return gridLayoutMap[layout as keyof typeof gridLayoutMap] || 'grid-cols-2'
  }, [layout])

  return (
    <div className={cn('grid gap-6 md:gap-8', gridLayout, className)}>
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="space-y-4">
          {column.content.map((content, index) => (
            <ColumnContent key={index} content={content} />
          ))}
        </div>
      ))}
    </div>
  )
}

const ColumnContent: React.FC<{ content: ColumnsBlockProps['columns'][0]['content'][0] }> = ({
  content,
}) => {
  switch (content.blockType) {
    case 'text':
      return content.content ? (
        <div className="prose md:prose-md dark:prose-invert">
          {content.content.root.children.map((child: TextNode, idx: number) => (
            <p key={idx}>{child.text}</p>
          ))}
        </div>
      ) : null

    case 'image':
      return content.image && typeof content.image === 'object' && content.image?.url ? (
        <img
          src={content.image.url}
          alt="Image"
          className="rounded-md w-full h-auto"
          loading="lazy"
        />
      ) : null

    case 'video':
      return content.url ? (
        <div className="relative w-full aspect-video">
          <iframe
            className="w-full h-full rounded-md"
            src={content.url}
            title="Embedded Video"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : null

    default:
      return null
  }
}
