import { CollectionBeforeChangeHook } from 'payload'

export const updatePreviewImage: CollectionBeforeChangeHook = async ({ data }) => {
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

  const style = data.hero?.style

  const previewImage = heroScreenshots[style] || null

  return {
    ...data,
    previewImage: previewImage,
  }
}
