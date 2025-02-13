'use client'

import { useEffect } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'

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
