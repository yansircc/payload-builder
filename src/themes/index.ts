/** Available theme presets in the design system */
export type ThemePreset = 'cool' | 'brutal' | 'neon'

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
    fontWeights: {
      normal: string
      medium: string
      semibold: string
      bold: string
    }
    /** Letter spacing variations */
    letterSpacing: {
      tight: string
      normal: string
      wide: string
    }
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
    /** Container padding - mobile first */
    containerPadding: string
    /** Container padding on tablet */
    containerPaddingTablet: string
    /** Container padding on desktop */
    containerPaddingDesktop: string
    /** Vertical spacing between sections - mobile first */
    sectionSpacing: string
    /** Section spacing on tablet */
    sectionSpacingTablet: string
    /** Section spacing on desktop */
    sectionSpacingDesktop: string
  }
  /** Component-specific styles */
  components: {
    /** Button styling */
    button: {
      padding: string
      transition: string
      hover: {
        scale: string
        opacity: string
      }
    }
    /** Card styling */
    card: {
      padding: string
      shadow: string
      hover: {
        transform: string
      }
    }
    /** Input field styling */
    input: {
      height: string
      padding: string
    }
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
  cool: {
    name: 'cool',
    label: 'Cool & Professional',
    colors: {
      background: 'hsl(210 50% 98%)',
      foreground: 'hsl(222 47% 12%)',
      card: 'hsl(0 0% 100%)',
      cardForeground: 'hsl(222 47% 12%)',
      popover: 'hsl(0 0% 100%)',
      popoverForeground: 'hsl(222 47% 12%)',
      primary: 'hsl(222 83% 55%)',
      primaryForeground: 'hsl(210 40% 98%)',
      secondary: 'hsl(214 32% 94%)',
      secondaryForeground: 'hsl(222 47% 20%)',
      muted: 'hsl(214 32% 94%)',
      mutedForeground: 'hsl(215 16% 50%)',
      accent: 'hsl(196 89% 48%)',
      accentForeground: 'hsl(210 40% 98%)',
      destructive: 'hsl(0 84% 60%)',
      destructiveForeground: 'hsl(210 40% 98%)',
      border: 'hsl(214 32% 91%)',
      input: 'hsl(214 32% 91%)',
      ring: 'hsl(222 83% 55%)',
    },
    dark: {
      background: 'hsl(222 47% 10%)',
      foreground: 'hsl(210 40% 98%)',
      card: 'hsl(223 47% 12%)',
      cardForeground: 'hsl(210 40% 98%)',
      popover: 'hsl(223 47% 12%)',
      popoverForeground: 'hsl(210 40% 98%)',
      primary: 'hsl(217 91% 65%)',
      primaryForeground: 'hsl(222 47% 10%)',
      secondary: 'hsl(217 33% 18%)',
      secondaryForeground: 'hsl(210 40% 98%)',
      muted: 'hsl(217 33% 18%)',
      mutedForeground: 'hsl(215 20% 70%)',
      accent: 'hsl(196 89% 55%)',
      accentForeground: 'hsl(210 40% 98%)',
      destructive: 'hsl(0 63% 31%)',
      destructiveForeground: 'hsl(210 40% 98%)',
      border: 'hsl(217 33% 20%)',
      input: 'hsl(217 33% 20%)',
      ring: 'hsl(224 76% 55%)',
    },
    radius: {
      small: '0.25rem',
      default: '0.375rem',
      medium: '0.5rem',
      large: '0.75rem',
    },
    typography: {
      fontFamily: 'var(--font-geist-sans)',
      headingFamily: 'var(--font-outfit)',
      baseFontSize: '16px',
      lineHeight: '1.65',
      fontWeights: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tight: '-0.015em',
        normal: '0',
        wide: '0.015em',
      },
    },
    layout: {
      containerWidth: '1280px',
      containerPadding: '1rem',
      containerPaddingTablet: '1.5rem',
      containerPaddingDesktop: '2rem',
      sectionSpacing: '3.5rem',
      sectionSpacingTablet: '5rem',
      sectionSpacingDesktop: '7rem',
    },
    components: {
      button: {
        padding: '0.625rem 1.25rem',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        hover: {
          scale: '1.015',
          opacity: '0.95',
        },
      },
      card: {
        padding: '1.75rem',
        shadow: '0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 6px -2px rgb(0 0 0 / 0.06)',
        hover: {
          transform: 'translateY(-2px)',
        },
      },
      input: {
        height: '2.5rem',
        padding: '0.5rem 0.875rem',
      },
    },
  },
  brutal: {
    name: 'brutal',
    label: 'Modern Brutalism',
    colors: {
      background: 'hsl(0 0% 100%)',
      foreground: 'hsl(0 0% 0%)',
      card: 'hsl(0 0% 100%)',
      cardForeground: 'hsl(0 0% 0%)',
      popover: 'hsl(0 0% 100%)',
      popoverForeground: 'hsl(0 0% 0%)',
      primary: 'hsl(0 0% 0%)',
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(0 0% 93%)',
      secondaryForeground: 'hsl(0 0% 0%)',
      muted: 'hsl(0 0% 93%)',
      mutedForeground: 'hsl(0 0% 40%)',
      accent: 'hsl(0 72% 51%)',
      accentForeground: 'hsl(0 0% 100%)',
      destructive: 'hsl(0 84% 60%)',
      destructiveForeground: 'hsl(0 0% 100%)',
      border: 'hsl(0 0% 0%)',
      input: 'hsl(0 0% 0%)',
      ring: 'hsl(0 0% 0%)',
    },
    dark: {
      background: 'hsl(0 0% 0%)',
      foreground: 'hsl(0 0% 100%)',
      card: 'hsl(0 0% 0%)',
      cardForeground: 'hsl(0 0% 100%)',
      popover: 'hsl(0 0% 0%)',
      popoverForeground: 'hsl(0 0% 100%)',
      primary: 'hsl(0 0% 100%)',
      primaryForeground: 'hsl(0 0% 0%)',
      secondary: 'hsl(0 0% 15%)',
      secondaryForeground: 'hsl(0 0% 100%)',
      muted: 'hsl(0 0% 15%)',
      mutedForeground: 'hsl(0 0% 65%)',
      accent: 'hsl(0 72% 51%)',
      accentForeground: 'hsl(0 0% 100%)',
      destructive: 'hsl(0 63% 31%)',
      destructiveForeground: 'hsl(0 0% 100%)',
      border: 'hsl(0 0% 100%)',
      input: 'hsl(0 0% 100%)',
      ring: 'hsl(0 0% 100%)',
    },
    radius: {
      small: '0',
      default: '0',
      medium: '0',
      large: '0',
    },
    typography: {
      fontFamily: 'var(--font-geist-mono)',
      headingFamily: 'var(--font-geist-mono)',
      baseFontSize: '16px',
      lineHeight: '1.5',
      fontWeights: {
        normal: '400',
        medium: '600',
        semibold: '700',
        bold: '800',
      },
      letterSpacing: {
        tight: '0',
        normal: '0.05em',
        wide: '0.1em',
      },
    },
    layout: {
      containerWidth: '1440px',
      containerPadding: '1rem',
      containerPaddingTablet: '1.5rem',
      containerPaddingDesktop: '2rem',
      sectionSpacing: '4rem',
      sectionSpacingTablet: '6rem',
      sectionSpacingDesktop: '8rem',
    },
    components: {
      button: {
        padding: '1rem 2rem',
        transition: 'all 0.1s ease-in-out',
        hover: {
          scale: '0.98',
          opacity: '1',
        },
      },
      card: {
        padding: '2rem',
        shadow: '4px 4px 0 0 currentColor',
        hover: {
          transform: 'translate(-2px, -2px)',
        },
      },
      input: {
        height: '3rem',
        padding: '0.75rem 1rem',
      },
    },
  },
  neon: {
    name: 'neon',
    label: 'Neon Cyberpunk',
    colors: {
      background: 'hsl(230 25% 5%)',
      foreground: 'hsl(0 0% 100%)',
      card: 'hsl(230 25% 7%)',
      cardForeground: 'hsl(0 0% 100%)',
      popover: 'hsl(230 25% 7%)',
      popoverForeground: 'hsl(0 0% 100%)',
      primary: 'hsl(263 90% 51%)',
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(230 25% 10%)',
      secondaryForeground: 'hsl(0 0% 100%)',
      muted: 'hsl(230 25% 10%)',
      mutedForeground: 'hsl(230 25% 70%)',
      accent: 'hsl(180 100% 50%)',
      accentForeground: 'hsl(230 25% 5%)',
      destructive: 'hsl(0 100% 50%)',
      destructiveForeground: 'hsl(0 0% 100%)',
      border: 'hsl(230 25% 15%)',
      input: 'hsl(230 25% 15%)',
      ring: 'hsl(263 90% 51%)',
    },
    dark: {
      background: 'hsl(230 25% 5%)',
      foreground: 'hsl(0 0% 100%)',
      card: 'hsl(230 25% 7%)',
      cardForeground: 'hsl(0 0% 100%)',
      popover: 'hsl(230 25% 7%)',
      popoverForeground: 'hsl(0 0% 100%)',
      primary: 'hsl(263 90% 51%)',
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(230 25% 10%)',
      secondaryForeground: 'hsl(0 0% 100%)',
      muted: 'hsl(230 25% 10%)',
      mutedForeground: 'hsl(230 25% 70%)',
      accent: 'hsl(180 100% 50%)',
      accentForeground: 'hsl(230 25% 5%)',
      destructive: 'hsl(0 100% 50%)',
      destructiveForeground: 'hsl(0 0% 100%)',
      border: 'hsl(230 25% 15%)',
      input: 'hsl(230 25% 15%)',
      ring: 'hsl(263 90% 51%)',
    },
    radius: {
      small: '0.25rem',
      default: '0.5rem',
      medium: '1rem',
      large: '1.5rem',
    },
    typography: {
      fontFamily: 'var(--font-geist-sans)',
      headingFamily: 'var(--font-geist-mono)',
      baseFontSize: '16px',
      lineHeight: '1.7',
      fontWeights: {
        normal: '400',
        medium: '500',
        semibold: '700',
        bold: '900',
      },
      letterSpacing: {
        tight: '0',
        normal: '0.05em',
        wide: '0.15em',
      },
    },
    layout: {
      containerWidth: '1440px',
      containerPadding: '1rem',
      containerPaddingTablet: '1.5rem',
      containerPaddingDesktop: '2rem',
      sectionSpacing: '4rem',
      sectionSpacingTablet: '6rem',
      sectionSpacingDesktop: '8rem',
    },
    components: {
      button: {
        padding: '0.875rem 2rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        hover: {
          scale: '1.05',
          opacity: '0.9',
        },
      },
      card: {
        padding: '2rem',
        shadow: '0 0 20px rgba(147, 51, 234, 0.3)',
        hover: {
          transform: 'translateY(-4px)',
        },
      },
      input: {
        height: '3rem',
        padding: '0.75rem 1.25rem',
      },
    },
  },
} as const

// Theme Config Type
export type ThemeConfig = typeof themes
