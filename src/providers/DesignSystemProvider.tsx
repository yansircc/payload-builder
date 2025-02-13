'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { DesignTheme, ThemePreset } from '@/themes'
import { presetThemes } from '@/themes'
import { getClientSideURL } from '@/utilities/getURL'

interface DesignSystemContextType {
  theme: DesignTheme
  preset: ThemePreset
  isLoading: boolean
  error: Error | null
  setPreset: (preset: ThemePreset) => void
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
  preset: initialPreset = 'modern' as ThemePreset,
}: DesignSystemProviderProps) {
  const [preset, setPreset] = useState<ThemePreset>(initialPreset)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    async function fetchTenantTheme() {
      try {
        // Get the current hostname without port
        const hostname = window.location.hostname

        // Only fetch if we're on a tenant subdomain
        if (hostname.includes('.localhost.com')) {
          const domain = `${hostname}` // Use hostname without port for local development

          // Use the PayloadCMS REST API with proper query
          const response = await fetch(
            `${getClientSideURL()}/api/tenants?where=${encodeURIComponent(
              JSON.stringify({ domain: { equals: domain } }),
            )}`,
            {
              headers: { 'Content-Type': 'application/json' },
              next: {
                revalidate: 3600, // Cache for 1 hour
                tags: ['tenant-theme'],
              },
            },
          )

          if (!response.ok) {
            throw new Error('Failed to fetch tenant theme')
          }

          const data = await response.json()

          if (data.docs && data.docs.length > 0) {
            const tenant = data.docs[0]
            if (tenant.theme && presetThemes[tenant.theme]) {
              setPreset(tenant.theme)
            }
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
  }, [pathname]) // Re-fetch when pathname changes

  const theme = presetThemes[preset] as DesignTheme

  useEffect(() => {
    if (!theme) {
      console.error('Theme not found:', preset)
      return
    }

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

    // Force a re-render of styles
    root.style.setProperty('--theme-updated', Date.now().toString())
  }, [theme, preset])

  return (
    <DesignSystemContext.Provider value={{ theme, preset, isLoading, error, setPreset }}>
      {children}
    </DesignSystemContext.Provider>
  )
}
