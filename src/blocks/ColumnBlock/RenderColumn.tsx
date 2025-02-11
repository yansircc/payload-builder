import type { ColumnContent, ColumnsBlock } from 'src/payload-types'
import React from 'react'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & ColumnsBlock

export const RenderColumns: React.FC<Props> = ({ className, layout, column1, column2 }) => {
  // ✅ Pastikan layout memiliki tipe yang sesuai
  const gridLayoutMap: Record<'50-50' | '33-67' | '67-33' | '25-75' | '75-25', string> = {
    '50-50': 'grid-cols-2',
    '33-67': 'grid-cols-[1fr_2fr]',
    '67-33': 'grid-cols-[2fr_1fr]',
    '25-75': 'grid-cols-[1fr_3fr]',
    '75-25': 'grid-cols-[3fr_1fr]',
  }

  // ✅ Pastikan layout memiliki nilai default untuk menghindari undefined
  const gridLayout = gridLayoutMap[layout as keyof typeof gridLayoutMap] || 'grid-cols-2'

  return (
    <div className={cn('grid gap-6 md:gap-8', gridLayout, className)}>
      {/* Column 1 */}
      <div className="space-y-4">
        {column1.map((content: ColumnContent, index: number) =>
          renderColumnContent(content, index),
        )}
      </div>

      {/* Column 2 */}
      <div className="space-y-4">
        {column2.map((content: ColumnContent, index: number) =>
          renderColumnContent(content, index),
        )}
      </div>
    </div>
  )
}

// ✅ Fungsi untuk merender berbagai jenis konten dalam kolom
const renderColumnContent = (content: ColumnContent, index: number) => {
  switch (content.type) {
    case 'text':
      return (
        <div key={index} className="prose md:prose-md dark:prose-invert">
          {content.content?.root.children.map((child, idx) => <p key={idx}>{child.text}</p>)}
        </div>
      )

    case 'image':
      return content.image && typeof content.image.value === 'object' ? (
        <img
          key={index}
          src={content.image.value.url}
          alt={content.image.value.alt || 'Image'}
          className="rounded-md w-full h-auto"
        />
      ) : null

    case 'video':
      return content.url ? (
        <div key={index} className="relative w-full aspect-video">
          <iframe
            className="w-full h-full rounded-md"
            src={content.url}
            title="Embedded Video"
            allowFullScreen
          />
        </div>
      ) : null

    default:
      return null
  }
}
