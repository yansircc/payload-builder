import type { ThemePreset } from '@/themes'
import type { Mode } from './types'

export const themeLocalStorageKey = 'payload-theme'
export const modeLocalStorageKey = 'payload-theme-mode'

export const defaultTheme = 'cool' as ThemePreset
export const defaultMode = 'light' as Mode

export const getImplicitModePreference = (): Mode | null => {
  const mediaQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia(mediaQuery)
  const hasImplicitPreference = typeof mql.matches === 'boolean'

  if (hasImplicitPreference) {
    return mql.matches ? 'dark' : 'light'
  }

  return null
}
