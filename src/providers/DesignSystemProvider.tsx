'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { ThemeDefinition, ThemePreset } from '@/themes'
import { themes } from '@/themes'
import { getClientSideURL } from '@/utilities/getURL'

interface DesignSystemContextType {
  theme: ThemeDefinition
  preset: ThemePreset
  isLoading: boolean
  error: Error | null
  setPreset: (preset: ThemePreset) => void
  isDark: boolean
  setIsDark: (isDark: boolean) => void
}

interface TenantResponse {
  docs: Array<{ theme?: ThemePreset; domain: string }>
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
  preset: initialPreset = 'modern',
}: DesignSystemProviderProps) {
  const [preset, setPreset] = useState<ThemePreset>(initialPreset)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()

  // Handle system dark mode preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    async function fetchTenantTheme() {
      try {
        const hostname = window.location.hostname

        if (hostname.includes('.localhost.com')) {
          const domain = hostname

          const response = await fetch(
            `${getClientSideURL()}/api/tenants?where=${encodeURIComponent(
              JSON.stringify({ domain: { equals: domain } }),
            )}`,
            {
              headers: { 'Content-Type': 'application/json' },
              next: { revalidate: 3600, tags: ['tenant-theme'] },
            },
          )

          if (!response.ok) {
            throw new Error('Failed to fetch tenant theme')
          }

          const data = (await response.json()) as TenantResponse

          const tenant = data.docs?.[0]
          if (tenant?.theme && themes[tenant.theme]) {
            setPreset(tenant.theme)
          }
        }
      } catch (err) {
        console.error('Error fetching tenant theme:', err)
        setError(err instanceof Error ? err : new Error('Unknown error occurred'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchTenantTheme()
  }, [pathname])

  const theme = themes[preset]

  useEffect(() => {
    if (!theme) {
      console.error('Theme not found:', preset)
      return
    }

    const root = document.documentElement
    const colors = isDark ? theme.dark : theme.colors

    // Apply theme variables
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })

    // Apply radius variables
    Object.entries(theme.radius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value)
    })

    // Update data-theme attribute
    root.setAttribute('data-theme', isDark ? 'dark' : 'light')

    // Force a re-render of styles
    root.style.setProperty('--theme-updated', Date.now().toString())
  }, [theme, preset, isDark])

  return (
    <DesignSystemContext.Provider
      value={{ theme, preset, isLoading, error, setPreset, isDark, setIsDark }}
    >
      {children}
    </DesignSystemContext.Provider>
  )
}
