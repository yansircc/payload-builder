'use client'

import { useEffect, useState } from 'react'
import type { ThemePreset } from '@/themes'

interface UseActiveDesignSystemProps {
  tenantId: string
}

interface TenantResponse {
  docs: Array<{
    theme: ThemePreset
  }>
}

export function useActiveDesignSystem({ tenantId }: UseActiveDesignSystemProps) {
  const [preset, setPreset] = useState<ThemePreset>('modern')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchTenantTheme() {
      try {
        const response = await fetch(`/api/tenants/${tenantId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch tenant theme')
        }
        const data = await response.json()

        if (data.theme) {
          setPreset(data.theme)
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchTenantTheme()
  }, [tenantId])

  return { preset, isLoading, error }
}
