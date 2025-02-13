// Theme Presets
export type ThemePreset = 'modern' | 'minimal' | 'bold'

// Base Theme Interface
export interface BaseTheme {
  colors: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
  }
  radius: { small: string; default: string; medium: string; large: string }
}

// Theme Definition with metadata
export interface ThemeDefinition extends BaseTheme {
  name: ThemePreset
  label: string
  dark: BaseTheme['colors']
}

// Theme Configuration
export const themes: Record<ThemePreset, ThemeDefinition> = {
  modern: {
    name: 'modern',
    label: 'Modern & Clean',
    colors: {
      background: 'hsl(0 0% 100%)',
      foreground: 'hsl(224 71.4% 4.1%)',
      card: 'hsl(0 0% 100%)',
      cardForeground: 'hsl(224 71.4% 4.1%)',
      popover: 'hsl(0 0% 100%)',
      popoverForeground: 'hsl(224 71.4% 4.1%)',
      primary: 'hsl(220.9 39.3% 11%)',
      primaryForeground: 'hsl(210 20% 98%)',
      secondary: 'hsl(220 14.3% 95.9%)',
      secondaryForeground: 'hsl(220.9 39.3% 11%)',
      muted: 'hsl(220 14.3% 95.9%)',
      mutedForeground: 'hsl(220 8.9% 46.1%)',
      accent: 'hsl(220 14.3% 95.9%)',
      accentForeground: 'hsl(220.9 39.3% 11%)',
      destructive: 'hsl(0 84.2% 60.2%)',
      destructiveForeground: 'hsl(210 20% 98%)',
      border: 'hsl(220 13% 91%)',
      input: 'hsl(220 13% 91%)',
      ring: 'hsl(224 71.4% 4.1%)',
    },
    dark: {
      background: 'hsl(224 71.4% 4.1%)',
      foreground: 'hsl(210 20% 98%)',
      card: 'hsl(224 71.4% 4.1%)',
      cardForeground: 'hsl(210 20% 98%)',
      popover: 'hsl(224 71.4% 4.1%)',
      popoverForeground: 'hsl(210 20% 98%)',
      primary: 'hsl(210 20% 98%)',
      primaryForeground: 'hsl(220.9 39.3% 11%)',
      secondary: 'hsl(215 27.9% 16.9%)',
      secondaryForeground: 'hsl(210 20% 98%)',
      muted: 'hsl(215 27.9% 16.9%)',
      mutedForeground: 'hsl(217.9 10.6% 64.9%)',
      accent: 'hsl(215 27.9% 16.9%)',
      accentForeground: 'hsl(210 20% 98%)',
      destructive: 'hsl(0 62.8% 30.6%)',
      destructiveForeground: 'hsl(210 20% 98%)',
      border: 'hsl(215 27.9% 16.9%)',
      input: 'hsl(215 27.9% 16.9%)',
      ring: 'hsl(216 12.2% 83.9%)',
    },
    radius: { small: '0.25rem', default: '0.5rem', medium: '0.75rem', large: '1rem' },
  },
  minimal: {
    name: 'minimal',
    label: 'Minimal & Elegant',
    colors: {
      background: 'hsl(0 0% 100%)',
      foreground: 'hsl(0 0% 9%)',
      card: 'hsl(0 0% 100%)',
      cardForeground: 'hsl(0 0% 9%)',
      popover: 'hsl(0 0% 100%)',
      popoverForeground: 'hsl(0 0% 9%)',
      primary: 'hsl(0 0% 9%)',
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(0 0% 96.1%)',
      secondaryForeground: 'hsl(0 0% 9%)',
      muted: 'hsl(0 0% 96.1%)',
      mutedForeground: 'hsl(0 0% 45.1%)',
      accent: 'hsl(0 0% 96.1%)',
      accentForeground: 'hsl(0 0% 9%)',
      destructive: 'hsl(0 84.2% 60.2%)',
      destructiveForeground: 'hsl(0 0% 100%)',
      border: 'hsl(0 0% 89.8%)',
      input: 'hsl(0 0% 89.8%)',
      ring: 'hsl(0 0% 9%)',
    },
    dark: {
      background: 'hsl(0 0% 3.9%)',
      foreground: 'hsl(0 0% 98%)',
      card: 'hsl(0 0% 3.9%)',
      cardForeground: 'hsl(0 0% 98%)',
      popover: 'hsl(0 0% 3.9%)',
      popoverForeground: 'hsl(0 0% 98%)',
      primary: 'hsl(0 0% 98%)',
      primaryForeground: 'hsl(0 0% 9%)',
      secondary: 'hsl(0 0% 14.9%)',
      secondaryForeground: 'hsl(0 0% 98%)',
      muted: 'hsl(0 0% 14.9%)',
      mutedForeground: 'hsl(0 0% 63.9%)',
      accent: 'hsl(0 0% 14.9%)',
      accentForeground: 'hsl(0 0% 98%)',
      destructive: 'hsl(0 62.8% 30.6%)',
      destructiveForeground: 'hsl(0 0% 98%)',
      border: 'hsl(0 0% 14.9%)',
      input: 'hsl(0 0% 14.9%)',
      ring: 'hsl(0 0% 83.9%)',
    },
    radius: { small: '0.125rem', default: '0.25rem', medium: '0.375rem', large: '0.5rem' },
  },
  bold: {
    name: 'bold',
    label: 'Bold & Dynamic',
    colors: {
      background: 'hsl(0 0% 100%)',
      foreground: 'hsl(222.2 84% 4.9%)',
      card: 'hsl(0 0% 100%)',
      cardForeground: 'hsl(222.2 84% 4.9%)',
      popover: 'hsl(0 0% 100%)',
      popoverForeground: 'hsl(222.2 84% 4.9%)',
      primary: 'hsl(222.2 47.4% 11.2%)',
      primaryForeground: 'hsl(210 40% 98%)',
      secondary: 'hsl(210 40% 96.1%)',
      secondaryForeground: 'hsl(222.2 47.4% 11.2%)',
      muted: 'hsl(210 40% 96.1%)',
      mutedForeground: 'hsl(215.4 16.3% 46.9%)',
      accent: 'hsl(210 40% 96.1%)',
      accentForeground: 'hsl(222.2 47.4% 11.2%)',
      destructive: 'hsl(0 84.2% 60.2%)',
      destructiveForeground: 'hsl(210 40% 98%)',
      border: 'hsl(214.3 31.8% 91.4%)',
      input: 'hsl(214.3 31.8% 91.4%)',
      ring: 'hsl(222.2 84% 4.9%)',
    },
    dark: {
      background: 'hsl(222.2 84% 4.9%)',
      foreground: 'hsl(210 40% 98%)',
      card: 'hsl(222.2 84% 4.9%)',
      cardForeground: 'hsl(210 40% 98%)',
      popover: 'hsl(222.2 84% 4.9%)',
      popoverForeground: 'hsl(210 40% 98%)',
      primary: 'hsl(210 40% 98%)',
      primaryForeground: 'hsl(222.2 47.4% 11.2%)',
      secondary: 'hsl(217.2 32.6% 17.5%)',
      secondaryForeground: 'hsl(210 40% 98%)',
      muted: 'hsl(217.2 32.6% 17.5%)',
      mutedForeground: 'hsl(215 20.2% 65.1%)',
      accent: 'hsl(217.2 32.6% 17.5%)',
      accentForeground: 'hsl(210 40% 98%)',
      destructive: 'hsl(0 62.8% 30.6%)',
      destructiveForeground: 'hsl(210 40% 98%)',
      border: 'hsl(217.2 32.6% 17.5%)',
      input: 'hsl(217.2 32.6% 17.5%)',
      ring: 'hsl(212.7 26.8% 83.9%)',
    },
    radius: { small: '0.5rem', default: '1rem', medium: '1.25rem', large: '1.5rem' },
  },
} as const

// Theme Config Type
export type ThemeConfig = typeof themes
