import type { ThemePreset } from '@/themes'

export type Mode = 'dark' | 'light'

export interface ThemeContextType {
  setTheme: (theme: ThemePreset | null) => void
  theme?: ThemePreset | null
  setMode: (mode: Mode | null) => void
  mode?: Mode | null
}

export function themeIsValid(string: null | string): string is ThemePreset {
  return string ? ['cool', 'brutal', 'neon'].includes(string) : false
}

export function modeIsValid(string: null | string): string is Mode {
  return string ? ['dark', 'light'].includes(string) : false
}
