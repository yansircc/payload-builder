'use client'

import { useCallback } from 'react'
import { useDesignSystem } from '@/providers/DesignSystemProvider'
import type { ThemePreset } from '@/themes'

export function useThemeChange() {
  const { setPreset, preset } = useDesignSystem()

  const changeTheme = useCallback(
    async (newTheme: ThemePreset) => {
      try {
        // Get the current hostname
        const hostname = window.location.hostname

        // Only update if we're on a tenant subdomain
        if (hostname.includes('.localhost.com')) {
          const tenantSlug = hostname.split('.')[0]
          const response = await fetch(`/api/tenants/${tenantSlug}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              theme: newTheme,
            }),
          })

          if (!response.ok) {
            throw new Error('Failed to update tenant theme')
          }

          // Update the theme locally
          setPreset(newTheme)
        }
      } catch (error) {
        console.error('Error changing theme:', error)
        throw error
      }
    },
    [setPreset],
  )

  return {
    changeTheme,
    currentTheme: preset,
  }
}
