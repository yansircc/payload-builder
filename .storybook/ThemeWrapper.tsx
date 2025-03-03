'use client'

import React, { useEffect } from 'react'
import { ThemeProvider } from '../src/providers/Theme'

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  // Ensure fonts are loaded
  useEffect(() => {
    // Add Geist font loading check
    if (typeof document !== 'undefined') {
      // Force font loading
      document.documentElement.classList.add('fonts-loaded')

      // Apply font styles directly to ensure they're available
      const style = document.createElement('style')
      style.textContent = `
        body {
          font-family: var(--font-geist-sans) !important;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-outfit) !important;
        }
        
        code, pre {
          font-family: var(--font-geist-mono) !important;
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  return <ThemeProvider>{children}</ThemeProvider>
}

export default ThemeWrapper
