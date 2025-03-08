import type { Mode, ThemeOption, ThemePreset } from './types'

export const themeLocalStorageKey = 'payload-theme'
export const modeLocalStorageKey = 'payload-theme-mode'

export const defaultTheme = 'cool' as ThemePreset
export const defaultMode = 'light' as Mode

export const themeOptions = [
  { label: 'Cool & Professional', value: 'cool' },
  { label: 'Modern Brutalism', value: 'brutal' },
  { label: 'Neon Cyberpunk', value: 'neon' },
] as ThemeOption[]

export const getImplicitModePreference = (): Mode | null => {
  const mediaQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia(mediaQuery)
  const hasImplicitPreference = typeof mql.matches === 'boolean'

  if (hasImplicitPreference) {
    return mql.matches ? 'dark' : 'light'
  }

  return null
}
