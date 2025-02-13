/** Available theme presets in the design system */
export type ThemePreset = 'modern' | 'minimal' | 'bold'

/** Base theme interface defining all customizable aspects of the design system */
export interface BaseTheme {
  /** Color palette for both light and dark modes */
  colors: {
    /** Main background color */
    background: string
    /** Primary text color */
    foreground: string
    /** Card background color */
    card: string
    /** Card text color */
    cardForeground: string
    /** Popover/dropdown background */
    popover: string
    /** Popover/dropdown text color */
    popoverForeground: string
    /** Primary brand color */
    primary: string
    /** Text color on primary background */
    primaryForeground: string
    /** Secondary brand color */
    secondary: string
    /** Text color on secondary background */
    secondaryForeground: string
    /** Background for muted elements */
    muted: string
    /** Text color for muted elements */
    mutedForeground: string
    /** Accent color for highlights */
    accent: string
    /** Text color on accent background */
    accentForeground: string
    /** Color for destructive actions */
    destructive: string
    /** Text color on destructive background */
    destructiveForeground: string
    /** Border color */
    border: string
    /** Input border color */
    input: string
    /** Focus ring color */
    ring: string
  }
  /** Typography settings */
  typography: {
    /** Base font family */
    fontFamily: string
    /** Font family for headings */
    headingFamily: string
    /** Root font size */
    baseFontSize: string
    /** Base line height */
    lineHeight: string
    /** Font weight variations */
    fontWeights: { normal: string; medium: string; semibold: string; bold: string }
    /** Letter spacing variations */
    letterSpacing: { tight: string; normal: string; wide: string }
  }
  /** Border radius settings */
  radius: {
    /** Small border radius (buttons, small elements) */
    small: string
    /** Default border radius */
    default: string
    /** Medium border radius (cards, larger elements) */
    medium: string
    /** Large border radius (modals, full sections) */
    large: string
  }
  /** Layout and spacing settings */
  layout: {
    /** Maximum container width */
    containerWidth: string
    /** Container padding */
    containerPadding: string
    /** Vertical spacing between sections */
    sectionSpacing: string
    /** Gap between grid items */
    gridGap: string
  }
  /** Component-specific styles */
  components: {
    /** Button styling */
    button: { padding: string; transition: string; hover: { scale: string; opacity: string } }
    /** Card styling */
    card: { padding: string; shadow: string; hover: { transform: string } }
    /** Input field styling */
    input: { height: string; padding: string }
  }
}

/** Complete theme definition including metadata */
export interface ThemeDefinition extends BaseTheme {
  /** Theme identifier */
  name: ThemePreset
  /** Human-readable theme name */
  label: string
  /** Dark mode color overrides */
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
    typography: {
      fontFamily: 'var(--font-inter)',
      headingFamily: 'var(--font-cal-sans)',
      baseFontSize: '16px',
      lineHeight: '1.6',
      fontWeights: { normal: '400', medium: '500', semibold: '600', bold: '700' },
      letterSpacing: { tight: '-0.02em', normal: '0', wide: '0.02em' },
    },
    layout: {
      containerWidth: '1280px',
      containerPadding: '2rem',
      sectionSpacing: '6rem',
      gridGap: '2rem',
    },
    components: {
      button: {
        padding: '0.75rem 1.5rem',
        transition: 'all 0.2s ease-in-out',
        hover: { scale: '1.02', opacity: '0.9' },
      },
      card: {
        padding: '2rem',
        shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        hover: { transform: 'translateY(-2px)' },
      },
      input: { height: '2.5rem', padding: '0.5rem 1rem' },
    },
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
    typography: {
      fontFamily: 'var(--font-inter)',
      headingFamily: 'var(--font-inter)',
      baseFontSize: '16px',
      lineHeight: '1.5',
      fontWeights: { normal: '400', medium: '500', semibold: '600', bold: '700' },
      letterSpacing: { tight: '-0.01em', normal: '0', wide: '0.01em' },
    },
    layout: {
      containerWidth: '1200px',
      containerPadding: '1.5rem',
      sectionSpacing: '5rem',
      gridGap: '1.5rem',
    },
    components: {
      button: {
        padding: '0.625rem 1.25rem',
        transition: 'all 0.15s ease-in-out',
        hover: { scale: '1', opacity: '0.8' },
      },
      card: {
        padding: '1.5rem',
        shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        hover: { transform: 'none' },
      },
      input: { height: '2.25rem', padding: '0.5rem 0.75rem' },
    },
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
    typography: {
      fontFamily: 'var(--font-inter)',
      headingFamily: 'var(--font-cal-sans)',
      baseFontSize: '16px',
      lineHeight: '1.7',
      fontWeights: { normal: '400', medium: '500', semibold: '600', bold: '800' },
      letterSpacing: { tight: '-0.03em', normal: '0', wide: '0.03em' },
    },
    layout: {
      containerWidth: '1440px',
      containerPadding: '2.5rem',
      sectionSpacing: '8rem',
      gridGap: '2.5rem',
    },
    components: {
      button: {
        padding: '1rem 2rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        hover: { scale: '1.05', opacity: '0.95' },
      },
      card: {
        padding: '2.5rem',
        shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        hover: { transform: 'translateY(-4px)' },
      },
      input: { height: '3rem', padding: '0.75rem 1.25rem' },
    },
  },
} as const

// Theme Config Type
export type ThemeConfig = typeof themes
