'use client'

import { useEffect } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'

interface ThemeEffectProps {
  theme?: 'dark' | 'light'
}

export function ThemeEffect({ theme = 'dark' }: ThemeEffectProps) {
  const { setHeaderMode } = useHeaderTheme()

  useEffect(() => {
    setHeaderMode(theme)
  }, [setHeaderMode, theme])

  return null
}
