'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useEffect } from 'react'

interface ThemeEffectProps {
  theme?: 'dark' | 'light'
}

export function ThemeEffect({ theme = 'dark' }: ThemeEffectProps) {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(theme)
  }, [setHeaderTheme, theme])

  return null
}
