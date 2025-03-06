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
    /** Success color */
    success: string
    /** Success text color */
    successForeground: string
    /** Warning color */
    warning: string
    /** Warning text color */
    warningForeground: string
    /** Error color */
    error: string
    /** Error text color */
    errorForeground: string
    /** Info color */
    info: string
    /** Info text color */
    infoForeground: string
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
