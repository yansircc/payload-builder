export interface DesignTheme {
  label: string
  colors: {
    primary: string
    secondary: string
    background: string
    foreground: string
    muted: string
    accent: string
    border: string
  }
  typography: {
    fontFamily: string
    headingFamily: string
  }
  radius: {
    small: string
    medium: string
    large: string
  }
  spacing: {
    container: string
    section: string
  }
}

export const presetThemes: Record<string, DesignTheme> = {
  modern: {
    label: 'Modern & Clean',
    colors: {
      primary: '#0070f3',
      secondary: '#7928ca',
      background: '#ffffff',
      foreground: '#000000',
      muted: '#f5f5f5',
      accent: '#fafafa',
      border: '#e5e7eb',
    },
    typography: {
      fontFamily: 'Inter',
      headingFamily: 'Inter',
    },
    radius: {
      small: '0.25rem',
      medium: '0.5rem',
      large: '1rem',
    },
    spacing: {
      container: 'max-w-7xl',
      section: '2rem',
    },
  },
  minimal: {
    label: 'Minimal & Elegant',
    colors: {
      primary: '#000000',
      secondary: '#404040',
      background: '#ffffff',
      foreground: '#171717',
      muted: '#fafafa',
      accent: '#f5f5f5',
      border: '#e5e7eb',
    },
    typography: {
      fontFamily: 'Plus Jakarta Sans',
      headingFamily: 'Plus Jakarta Sans',
    },
    radius: {
      small: '0.125rem',
      medium: '0.25rem',
      large: '0.5rem',
    },
    spacing: {
      container: 'max-w-6xl',
      section: '1.5rem',
    },
  },
  bold: {
    label: 'Bold & Dynamic',
    colors: {
      primary: '#6366f1',
      secondary: '#ec4899',
      background: '#ffffff',
      foreground: '#18181b',
      muted: '#f4f4f5',
      accent: '#fafafa',
      border: '#e5e7eb',
    },
    typography: {
      fontFamily: 'Outfit',
      headingFamily: 'Outfit',
    },
    radius: {
      small: '0.5rem',
      medium: '1rem',
      large: '1.5rem',
    },
    spacing: {
      container: 'max-w-7xl',
      section: '2.5rem',
    },
  },
} as const

export type ThemePreset = keyof typeof presetThemes
