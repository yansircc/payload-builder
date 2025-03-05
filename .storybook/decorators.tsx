import type { Decorator } from '@storybook/react'
import React from 'react'

/**
 * This decorator adds the necessary font classes to the story container
 * to simulate the Next.js font loading behavior in the actual application.
 */
export const withFonts: Decorator = (Story, context) => {
  // Create a wrapper component to use hooks
  const FontLoader = () => {
    // Load fonts from CDN to simulate Next.js font loading
    React.useEffect(() => {
      // Add Geist Sans font
      const geistSansLink = document.createElement('link')
      geistSansLink.href = 'https://fonts.cdnfonts.com/css/geist-sans'
      geistSansLink.rel = 'stylesheet'
      document.head.appendChild(geistSansLink)

      // Add Geist Mono font
      const geistMonoLink = document.createElement('link')
      geistMonoLink.href = 'https://fonts.cdnfonts.com/css/geist-mono'
      geistMonoLink.rel = 'stylesheet'
      document.head.appendChild(geistMonoLink)

      // Add Inter font (as fallback)
      const interLink = document.createElement('link')
      interLink.href =
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
      interLink.rel = 'stylesheet'
      document.head.appendChild(interLink)

      // Add Outfit font (as fallback)
      const outfitLink = document.createElement('link')
      outfitLink.href =
        'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap'
      outfitLink.rel = 'stylesheet'
      document.head.appendChild(outfitLink)

      // Add font classes to html element
      if (document && document.documentElement) {
        document.documentElement.classList.add('geist-sans', 'geist-mono', 'inter', 'outfit')
      }

      return () => {
        try {
          document.head.removeChild(geistSansLink)
          document.head.removeChild(geistMonoLink)
          document.head.removeChild(interLink)
          document.head.removeChild(outfitLink)

          if (document && document.documentElement) {
            document.documentElement.classList.remove('geist-sans', 'geist-mono', 'inter', 'outfit')
          }
        } catch (error) {
          console.error('Error cleaning up font links:', error)
        }
      }
    }, [])

    return <Story {...context} />
  }

  return <FontLoader />
}
