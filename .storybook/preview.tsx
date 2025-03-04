import type { Preview } from '@storybook/react'
import type { ReactElement } from 'react'
import React, { useEffect } from 'react'
import '../src/app/(frontend)/globals.css'
import { themes } from '../src/themes'
import './fonts.css'
import ThemeWrapper from './ThemeWrapper'

// Create a component to handle theme changes
const StoryWrapper = ({ theme, children }: { theme: string; children: React.ReactNode }) => {
  useEffect(() => {
    const selectedTheme = themes[theme as keyof typeof themes]
    if (!selectedTheme || typeof document === 'undefined') return

    const root = document.documentElement

    // Apply theme colors
    root.style.setProperty('--background', selectedTheme.colors.background)
    root.style.setProperty('--foreground', selectedTheme.colors.foreground)
    root.style.setProperty('--card', selectedTheme.colors.card)
    root.style.setProperty('--cardForeground', selectedTheme.colors.cardForeground)
    root.style.setProperty('--popover', selectedTheme.colors.popover)
    root.style.setProperty('--popoverForeground', selectedTheme.colors.popoverForeground)
    root.style.setProperty('--primary', selectedTheme.colors.primary)
    root.style.setProperty('--primaryForeground', selectedTheme.colors.primaryForeground)
    root.style.setProperty('--secondary', selectedTheme.colors.secondary)
    root.style.setProperty('--secondaryForeground', selectedTheme.colors.secondaryForeground)
    root.style.setProperty('--muted', selectedTheme.colors.muted)
    root.style.setProperty('--mutedForeground', selectedTheme.colors.mutedForeground)
    root.style.setProperty('--accent', selectedTheme.colors.accent)
    root.style.setProperty('--accentForeground', selectedTheme.colors.accentForeground)
    root.style.setProperty('--destructive', selectedTheme.colors.destructive)
    root.style.setProperty('--destructiveForeground', selectedTheme.colors.destructiveForeground)
    root.style.setProperty('--border', selectedTheme.colors.border)
    root.style.setProperty('--input', selectedTheme.colors.input)
    root.style.setProperty('--ring', selectedTheme.colors.ring)

    // Apply typography settings
    root.style.setProperty('--typography-fontFamily', selectedTheme.typography.fontFamily)
    root.style.setProperty('--typography-headingFamily', selectedTheme.typography.headingFamily)
    root.style.setProperty('--typography-baseFontSize', selectedTheme.typography.baseFontSize)
    root.style.setProperty('--typography-lineHeight', selectedTheme.typography.lineHeight)
    root.style.setProperty(
      '--typography-fontWeights-normal',
      selectedTheme.typography.fontWeights.normal,
    )
    root.style.setProperty(
      '--typography-fontWeights-medium',
      selectedTheme.typography.fontWeights.medium,
    )
    root.style.setProperty(
      '--typography-fontWeights-semibold',
      selectedTheme.typography.fontWeights.semibold,
    )
    root.style.setProperty(
      '--typography-fontWeights-bold',
      selectedTheme.typography.fontWeights.bold,
    )
    root.style.setProperty(
      '--typography-letterSpacing-tight',
      selectedTheme.typography.letterSpacing.tight,
    )
    root.style.setProperty(
      '--typography-letterSpacing-normal',
      selectedTheme.typography.letterSpacing.normal,
    )
    root.style.setProperty(
      '--typography-letterSpacing-wide',
      selectedTheme.typography.letterSpacing.wide,
    )

    // Apply radius settings
    root.style.setProperty('--radius-small', selectedTheme.radius.small)
    root.style.setProperty('--radius-default', selectedTheme.radius.default)
    root.style.setProperty('--radius-medium', selectedTheme.radius.medium)
    root.style.setProperty('--radius-large', selectedTheme.radius.large)

    // Apply layout settings
    root.style.setProperty('--layout-containerWidth', selectedTheme.layout.containerWidth)
    root.style.setProperty('--layout-containerPadding', selectedTheme.layout.containerPadding)
    root.style.setProperty(
      '--layout-containerPaddingTablet',
      selectedTheme.layout.containerPaddingTablet,
    )
    root.style.setProperty(
      '--layout-containerPaddingDesktop',
      selectedTheme.layout.containerPaddingDesktop,
    )
    root.style.setProperty('--layout-sectionSpacing', selectedTheme.layout.sectionSpacing)
    root.style.setProperty(
      '--layout-sectionSpacingTablet',
      selectedTheme.layout.sectionSpacingTablet,
    )
    root.style.setProperty(
      '--layout-sectionSpacingDesktop',
      selectedTheme.layout.sectionSpacingDesktop,
    )

    // Apply component settings
    root.style.setProperty('--components-button-padding', selectedTheme.components.button.padding)
    root.style.setProperty(
      '--components-button-transition',
      selectedTheme.components.button.transition,
    )
    root.style.setProperty(
      '--components-button-hover-scale',
      selectedTheme.components.button.hover.scale,
    )
    root.style.setProperty(
      '--components-button-hover-opacity',
      selectedTheme.components.button.hover.opacity,
    )
    root.style.setProperty('--components-card-padding', selectedTheme.components.card.padding)
    root.style.setProperty('--components-card-shadow', selectedTheme.components.card.shadow)
    root.style.setProperty('--components-input-height', selectedTheme.components.input.height)
    root.style.setProperty('--components-input-padding', selectedTheme.components.input.padding)

    // Set data-theme attribute
    root.setAttribute('data-theme', theme)
    localStorage.setItem('storybook-theme', theme)
  }, [theme])

  return <ThemeWrapper>{children}</ThemeWrapper>
}

// Create the decorator that uses our wrapper component
const withThemeProvider = (Story: React.ComponentType, context: any): ReactElement => (
  <StoryWrapper theme={context.globals.theme}>
    <Story />
  </StoryWrapper>
)

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile2: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
    backgrounds: {
      disable: true, // Disable Storybook's background panel to use our theme backgrounds
    },
    themes: {
      default: 'cool',
      list: Object.entries(themes).map(([key, theme]) => ({
        value: key,
        title: theme.label,
        color: theme.colors.primary,
      })),
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'cool',
      toolbar: {
        icon: 'paintbrush',
        items: Object.entries(themes).map(([key, theme]) => ({
          value: key,
          title: theme.label,
        })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [withThemeProvider],
}

export default preview
