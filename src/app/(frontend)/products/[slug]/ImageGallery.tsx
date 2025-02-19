'use client'

import type Slider from 'react-slick'
import ReactSlick from 'react-slick'
import { useState } from 'react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface ImageGalleryProps {
  heroImage?: string | MediaType | null
  productImages?: (string | MediaType)[] | null
}

export function ImageGallery({ heroImage, productImages }: ImageGalleryProps) {
  const [mainSlider, setMainSlider] = useState<Slider | null>(null)
  const [thumbnailSlider, setThumbnailSlider] = useState<Slider | null>(null)

  const allImages = [
    ...(heroImage ? [heroImage] : []),
    ...(productImages?.filter((img): img is MediaType => typeof img !== 'string') ?? []),
  ]

  const mainSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  }

  const thumbnailSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    swipeToSlide: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="space-y-4">
      <style jsx global>{`
        .slick-prev:before,
        .slick-next:before {
          color: var(--primary);
          opacity: 1;
        }
        .slick-prev:hover:before,
        .slick-next:hover:before {
          color: var(--primary) / 0.8);
        }
        .slick-dots li button:before {
          color: var(--primary);
        }
        .slick-dots li.slick-active button:before {
          color: var(--primary);
          opacity: 1;
        }
      `}</style>

      {/* Main Slider */}
      <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
        <ReactSlick
          {...mainSettings}
          asNavFor={thumbnailSlider || undefined}
          ref={(slider: Slider | null) => setMainSlider(slider)}
        >
          {allImages.map((image, index) => (
            <div key={index} className="aspect-square">
              {image && typeof image !== 'string' && (
                <Media
                  resource={image}
                  size="100vw"
                  imgClassName="rounded-lg aspect-square object-cover w-full h-full"
                  priority={index === 0}
                />
              )}
            </div>
          ))}
        </ReactSlick>
      </div>

      {/* Thumbnail Slider */}
      {allImages.length > 1 && (
        <div className="slider-container px-4">
          <ReactSlick
            {...thumbnailSettings}
            asNavFor={mainSlider || undefined}
            ref={(slider: Slider | null) => setThumbnailSlider(slider)}
          >
            {allImages.map((image, index) => (
              <div key={index} className="px-2">
                <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                  {image && typeof image !== 'string' && (
                    <Media
                      resource={image}
                      size="100vw"
                      imgClassName="rounded-lg aspect-square object-cover w-full h-full cursor-pointer"
                    />
                  )}
                </div>
              </div>
            ))}
          </ReactSlick>
        </div>
      )}
    </div>
  )
}
