import type { Media, VideoBlock as VideoBlockProps } from 'src/payload-types'
import React from 'react'
import { Media as MediaComponent } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & VideoBlockProps

export const VideoBlock: React.FC<Props> = ({ className, videoType, url, caption, thumbnail }) => {
  const getEmbedUrl = () => {
    if (!url) return null

    const youtubeMatch = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/,
    )
    const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/)

    switch (videoType) {
      case 'youtube':
        return youtubeMatch ? `https://www.youtube.com/embed/${youtubeMatch[1]}` : url
      case 'vimeo':
        return vimeoMatch ? `https://player.vimeo.com/video/${vimeoMatch[1]}` : url
      default:
        return url
    }
  }

  const embedUrl = getEmbedUrl()

  return (
    <div className={cn('my-4', className)}>
      {thumbnail && typeof thumbnail === 'object' && (
        <MediaComponent resource={thumbnail as Media} className="mb-2 h-auto w-full rounded-md" />
      )}

      {embedUrl && (
        <div className="overflow-hidden rounded-md border border-border bg-card">
          <iframe
            src={embedUrl}
            className="w-full aspect-video"
            allowFullScreen
            title="Embedded Video"
          />
        </div>
      )}

      {caption && <p className="mt-2 text-sm text-muted-foreground">{caption}</p>}
    </div>
  )
}
