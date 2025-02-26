'use client'

import type { Media, VideoBlock as VideoBlockProps } from 'src/payload-types'
import React, { useState } from 'react'
import { Media as MediaComponent } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & VideoBlockProps

export const VideoBlock: React.FC<Props> = ({ className, videoType, url, caption, thumbnail }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

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
  const isYouTube = videoType === 'youtube'

  const handlePlayClick = () => {
    setIsVideoLoaded(true)
  }

  return (
    <div className={cn('my-4', className)}>
      {embedUrl && isYouTube && !isVideoLoaded ? (
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          {thumbnail && typeof thumbnail === 'object' ? (
            <MediaComponent
              resource={thumbnail as Media}
              pictureClassName="!m-0"
              imgClassName="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Video thumbnail</span>
            </div>
          )}
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
            aria-label="Play video"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
                style={{ marginLeft: '2px' }}
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        </div>
      ) : embedUrl && (isYouTube ? isVideoLoaded : true) ? (
        <iframe
          src={embedUrl}
          className="w-full aspect-video rounded-md"
          allowFullScreen
          title="Embedded Video"
        />
      ) : null}

      {caption && <p className="text-sm text-gray-600 mt-2">{caption}</p>}
    </div>
  )
}
