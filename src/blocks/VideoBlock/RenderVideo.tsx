import type { VideoBlock as VideoBlockProps } from 'src/payload-types'
import React from 'react'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & VideoBlockProps

export const VideoBlock: React.FC<Props> = ({ className, videoType, url, caption, thumbnail }) => {
  const getEmbedUrl = () => {
    if (videoType === 'youtube') {
      const videoIdMatch = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/,
      )
      return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null
    }

    if (videoType === 'vimeo') {
      const videoIdMatch = url.match(/(?:vimeo\.com\/)(\d+)/)
      return videoIdMatch ? `https://player.vimeo.com/video/${videoIdMatch[1]}` : null
    }

    if (videoType === 'self-hosted') {
      return url
    }

    return null
  }

  const embedUrl = getEmbedUrl()

  return (
    <div className={cn('my-4', className)}>
      {thumbnail && typeof thumbnail === 'object' && (
        <img
          src={thumbnail.url ?? ''}
          alt={caption || 'Video thumbnail'}
          className="w-full h-auto rounded-md mb-2"
        />
      )}

      {embedUrl ? (
        videoType === 'self-hosted' ? (
          <video controls className="w-full rounded-md">
            <source src={embedUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <iframe
            src={embedUrl}
            className="w-full aspect-video rounded-md"
            frameBorder="0"
            allowFullScreen
            title="Embedded Video"
          />
        )
      ) : (
        <p className="text-red-500">Invalid video URL</p>
      )}

      {caption && <p className="text-sm text-gray-600 mt-2">{caption}</p>}
    </div>
  )
}
