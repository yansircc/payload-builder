'use client'

import { useField } from '@payloadcms/ui'
import React from 'react'
import Image from 'next/image'

const StaticPreview: React.FC = () => {
  const { value: heroStyle } = useField<string>({ path: 'hero.style' })

  const heroScreenshots: Record<string, string> = {
    'hero-1': '/preview/hero-1.png',
    'hero-3': '/preview/hero-3.png',
    'hero-5': '/preview/hero-5.png',
    'hero-6': '/preview/hero-6.png',
    'hero-7': '/preview/hero-7.png',
    'hero-8': '/preview/hero-8.png',
    'hero-12': '/preview/hero-12.png',
    'hero-24': '/preview/hero-24.png',
    'hero-25': '/preview/hero-25.png',
    'hero-32': '/preview/hero-32.png',
    'hero-34': '/preview/hero-34.png',
    'hero-45': '/preview/hero-45.png',
    'hero-115': '/preview/hero-115.png',
  }

  if (!heroStyle) {
    return null
  }

  const imagePath = heroScreenshots[heroStyle]
  if (!imagePath) {
    return null
  }

  return (
    <div style={{ textAlign: 'center', width: '100%', padding: '20px 0' }}>
      <Image
        src={imagePath}
        alt="Hero Preview"
        width={500}
        height={300}
        style={{
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
        priority
      />
    </div>
  )
}

export default StaticPreview
