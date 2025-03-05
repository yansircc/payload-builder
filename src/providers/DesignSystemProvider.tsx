'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { ThemePreset } from '@/themes'
import { getSiteSettingsFromDomainClient } from '@/utilities/getSiteSettings.client'
import { useTheme } from './Theme'

interface DesignSystemContextType {
  preset: ThemePreset
  isLoading: boolean
  error: Error | null
  setPreset: (preset: ThemePreset) => void
  isDark: boolean
  setIsDark: (isDark: boolean) => void
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
  preset: initialPreset = 'cool',
}: DesignSystemProviderProps) {
  const { theme: currentTheme, mode, setTheme, setMode } = useTheme()
  const [preset, setPresetState] = useState<ThemePreset>(currentTheme || initialPreset)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isDark, setIsDarkState] = useState(mode === 'dark')
  const pathname = usePathname()

  // Handle system dark mode preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const isDarkMode = mediaQuery.matches
    setIsDarkState(isDarkMode)

    if (!mode) {
      setMode(isDarkMode ? 'dark' : 'light')
    }

    const handler = (e: MediaQueryListEvent) => {
      setIsDarkState(e.matches)
      if (!mode) {
        setMode(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [mode, setMode])

  // Update mode when isDark changes
  useEffect(() => {
    setMode(isDark ? 'dark' : 'light')
  }, [isDark, setMode])

  // Update preset when currentTheme changes
  useEffect(() => {
    if (currentTheme) {
      setPresetState(currentTheme)
    }
  }, [currentTheme])

  // Fetch theme from site settings
  useEffect(() => {
    async function fetchTenantTheme() {
      try {
        const siteSettings = await getSiteSettingsFromDomainClient()

        if (siteSettings?.theme) {
          setPresetState(siteSettings.theme)
          setTheme(siteSettings.theme)
        }
      } catch (err) {
        console.error('Error fetching tenant theme:', err)
        setError(err instanceof Error ? err : new Error('Unknown error occurred'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchTenantTheme()
  }, [pathname, setTheme])

  const setPreset = (newPreset: ThemePreset) => {
    setPresetState(newPreset)
    setTheme(newPreset)
  }

  const setIsDark = (dark: boolean) => {
    setIsDarkState(dark)
    setMode(dark ? 'dark' : 'light')
  }

  return (
    <DesignSystemContext.Provider
      value={{ preset, isLoading, error, setPreset, isDark, setIsDark }}
    >
      {children}
    </DesignSystemContext.Provider>
  )
}
