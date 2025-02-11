'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { DesignTheme, ThemePreset } from '@/themes'
import { presetThemes } from '@/themes'

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

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

export function DesignSystemProvider({
  children,
  preset: initialPreset = 'modern' as ThemePreset,
}: DesignSystemProviderProps) {
  const [preset, setPreset] = useState<ThemePreset>(initialPreset)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let retryCount = 0
    let timeoutId: NodeJS.Timeout

    async function fetchTenantTheme() {
      try {
        // Get the current hostname
        const hostname = window.location.hostname
        console.log('Current hostname:', hostname)

        // Only fetch if we're on a tenant subdomain
        if (hostname.includes('.localhost.com')) {
          const domain = `${hostname}:3000` // Add port for local development
          console.log('Tenant domain:', domain)

          const queryParams = new URLSearchParams()
          queryParams.set(
            'where',
            JSON.stringify({
              domain: {
                equals: domain,
              },
            }),
          )

          const url = `/api/tenants?${queryParams.toString()}`
          console.log('Fetching tenant theme with URL:', url)

          const response = await fetch(url)
          const data = await response.json()

          if (!response.ok) {
            console.error('Error response:', data)
            throw new Error(data.error || 'Failed to fetch tenant theme')
          }

          console.log('Tenant data:', data)

          if (data.docs && data.docs.length > 0) {
            const tenant = data.docs[0]
            console.log('Found tenant:', tenant)

            if (tenant.theme) {
              console.log('Setting theme from tenant:', tenant.theme)
              setPreset(tenant.theme)
            } else {
              console.log('No theme found in tenant:', tenant)
            }
          } else {
            console.log('No tenant found in response:', data)
            if (retryCount < MAX_RETRIES) {
              retryCount++
              console.log(`Retrying (${retryCount}/${MAX_RETRIES}) in ${RETRY_DELAY}ms...`)
              timeoutId = setTimeout(fetchTenantTheme, RETRY_DELAY)
              return
            }
          }
        } else {
          console.log('Not a tenant subdomain, using default theme')
        }
      } catch (err) {
        console.error('Error fetching tenant theme:', err)
        if (retryCount < MAX_RETRIES) {
          retryCount++
          console.log(`Retrying (${retryCount}/${MAX_RETRIES}) in ${RETRY_DELAY}ms...`)
          timeoutId = setTimeout(fetchTenantTheme, RETRY_DELAY)
          return
        }
        setError(err instanceof Error ? err : new Error('Unknown error occurred'))
      } finally {
        if (retryCount >= MAX_RETRIES) {
          setIsLoading(false)
        }
      }
    }

    fetchTenantTheme()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  const theme = presetThemes[preset] as DesignTheme

  useEffect(() => {
    if (!theme) {
      console.error('Theme not found:', preset)
      return
    }

    console.log('Applying theme:', preset, theme)

    // Apply theme variables to root
    const root = document.documentElement

    // Colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
      console.log(`Setting color ${key}:`, value)
    })

    // Typography
    root.style.setProperty('--font-family', theme.typography.fontFamily)
    root.style.setProperty('--heading-family', theme.typography.headingFamily)
    console.log('Setting typography:', theme.typography)

    // Radius
    Object.entries(theme.radius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value)
      console.log(`Setting radius ${key}:`, value)
    })

    // Spacing
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value)
      console.log(`Setting spacing ${key}:`, value)
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
