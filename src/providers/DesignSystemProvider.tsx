'use client'

import React, { createContext, useContext, useEffect } from 'react'
import type { DesignTheme, ThemePreset } from '@/themes'
import { presetThemes } from '@/themes'

interface DesignSystemContextType {
  theme: DesignTheme
  preset: ThemePreset
}

const DesignSystemContext = createContext<DesignSystemContextType | null>(null)

export function useDesignSystem() {
  const context = useContext(DesignSystemContext)
  if (!context) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider')
  }
  return context
}

interface DesignSystemProviderProps {
  children: React.ReactNode
  preset?: ThemePreset
}

export function DesignSystemProvider({
  children,
  preset = 'modern' as ThemePreset,
}: DesignSystemProviderProps) {
  const theme = presetThemes[preset] as DesignTheme

  useEffect(() => {
    // Apply theme variables to root
    const root = document.documentElement

    // Colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })

    // Typography
    root.style.setProperty('--font-family', theme.typography.fontFamily)
    root.style.setProperty('--heading-family', theme.typography.headingFamily)

    // Radius
    Object.entries(theme.radius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value)
    })

    // Spacing
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value)
    })
  }, [theme])

  return (
    <DesignSystemContext.Provider value={{ theme, preset }}>
      {children}
    </DesignSystemContext.Provider>
  )
}
