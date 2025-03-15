import type { ColumnsBlock as ColumnsBlockProps, Media } from 'src/payload-types'
import React, { useMemo } from 'react'
import { Media as MediaComponent } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & ColumnsBlockProps

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

// Fungsi untuk mendapatkan URL embed dari YouTube
const getYouTubeEmbedUrl = (url: string): string | null => {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/,
  )
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

const ColumnContent: React.FC<{
  content: ColumnsBlockProps['columns'][number]['content'][number]
}> = ({ content }) => {
  console.log('Debugging content:', content) // 👉 Debugging log

  switch (content.blockType) {
    case 'text':
      console.log('Debugging text content:', content.content)

      if (
        !content.content ||
        !content.content.root ||
        !Array.isArray(content.content.root.children)
      ) {
        console.warn('Text content is missing:', content)
        return <p className="text-gray-500">No text available</p>
      }

      return (
        <div className="prose md:prose-md dark:prose-invert">
          {content.content.root.children.map((child: any, idx: number) => {
            if (child.type === 'paragraph' && Array.isArray(child.children)) {
              return (
                <p key={idx}>
                  {child.children.map((nestedChild: any, subIdx: number) =>
                    typeof nestedChild.text === 'string' ? nestedChild.text : 'No text',
                  )}
                </p>
              )
            }
            return null
          })}
        </div>
      )

    case 'image':
      return content.image && typeof content.image === 'object' ? (
        <MediaComponent resource={content.image as Media} className="rounded-md w-full h-auto" />
      ) : (
        <p className="text-gray-500">No image available</p>
      )

    case 'video':
      console.log('Debugging video URL:', content.url)
      const embedUrl = content.url ? getYouTubeEmbedUrl(content.url) || content.url : null

      return embedUrl ? (
        embedUrl.includes('youtube') ? (
          <iframe
            src={embedUrl}
            className="w-full aspect-video rounded-md"
            allowFullScreen
            title="Embedded Video"
          />
        ) : (
          <MediaComponent
            resource={{
              id: `video-${content.url}`,
              url: content.url,
              mimeType: 'video/mp4',
              updatedAt: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            }}
            className="rounded-md w-full aspect-video"
          />
        )
      ) : (
        <p className="text-gray-500">Video content is missing</p>
      )

    default:
      return null
  }
}
