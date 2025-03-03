import type { Preview } from '@storybook/react'
import type { ReactElement } from 'react'
import React from 'react'
import '../src/app/(frontend)/globals.css'
import { themes } from '../src/themes'
import './fonts.css'
import ThemeWrapper from './ThemeWrapper'

// Create a wrapper component that applies theme CSS variables
const withThemeProvider = (Story, context): ReactElement => {
  const selectedTheme = themes[context.globals.theme as keyof typeof themes]

  // Apply theme colors
  const style = {
    // Apply theme colors
    '--background': selectedTheme.colors.background,
    '--foreground': selectedTheme.colors.foreground,
    '--card': selectedTheme.colors.card,
    '--cardForeground': selectedTheme.colors.cardForeground,
    '--popover': selectedTheme.colors.popover,
    '--popoverForeground': selectedTheme.colors.popoverForeground,
    '--primary': selectedTheme.colors.primary,
    '--primaryForeground': selectedTheme.colors.primaryForeground,
    '--secondary': selectedTheme.colors.secondary,
    '--secondaryForeground': selectedTheme.colors.secondaryForeground,
    '--muted': selectedTheme.colors.muted,
    '--mutedForeground': selectedTheme.colors.mutedForeground,
    '--accent': selectedTheme.colors.accent,
    '--accentForeground': selectedTheme.colors.accentForeground,
    '--destructive': selectedTheme.colors.destructive,
    '--destructiveForeground': selectedTheme.colors.destructiveForeground,
    '--border': selectedTheme.colors.border,
    '--input': selectedTheme.colors.input,
    '--ring': selectedTheme.colors.ring,

    // Apply typography settings
    '--typography-fontFamily': selectedTheme.typography.fontFamily,
    '--typography-headingFamily': selectedTheme.typography.headingFamily,
    '--typography-baseFontSize': selectedTheme.typography.baseFontSize,
    '--typography-lineHeight': selectedTheme.typography.lineHeight,
    '--typography-fontWeights-normal': selectedTheme.typography.fontWeights.normal,
    '--typography-fontWeights-medium': selectedTheme.typography.fontWeights.medium,
    '--typography-fontWeights-semibold': selectedTheme.typography.fontWeights.semibold,
    '--typography-fontWeights-bold': selectedTheme.typography.fontWeights.bold,
    '--typography-letterSpacing-tight': selectedTheme.typography.letterSpacing.tight,
    '--typography-letterSpacing-normal': selectedTheme.typography.letterSpacing.normal,
    '--typography-letterSpacing-wide': selectedTheme.typography.letterSpacing.wide,

    // Apply radius settings
    '--radius-small': selectedTheme.radius.small,
    '--radius-default': selectedTheme.radius.default,
    '--radius-medium': selectedTheme.radius.medium,
    '--radius-large': selectedTheme.radius.large,

    // Apply layout settings
    '--layout-containerWidth': selectedTheme.layout.containerWidth,
    '--layout-containerPadding': selectedTheme.layout.containerPadding,
    '--layout-containerPaddingTablet': selectedTheme.layout.containerPaddingTablet,
    '--layout-containerPaddingDesktop': selectedTheme.layout.containerPaddingDesktop,
    '--layout-sectionSpacing': selectedTheme.layout.sectionSpacing,
    '--layout-sectionSpacingTablet': selectedTheme.layout.sectionSpacingTablet,
    '--layout-sectionSpacingDesktop': selectedTheme.layout.sectionSpacingDesktop,

    // Apply component settings
    '--components-button-padding': selectedTheme.components.button.padding,
    '--components-button-transition': selectedTheme.components.button.transition,
    '--components-button-hover-scale': selectedTheme.components.button.hover.scale,
    '--components-button-hover-opacity': selectedTheme.components.button.hover.opacity,
    '--components-card-padding': selectedTheme.components.card.padding,
    '--components-card-shadow': selectedTheme.components.card.shadow,
    '--components-input-height': selectedTheme.components.input.height,
    '--components-input-padding': selectedTheme.components.input.padding,

    // Add additional styling for the Storybook container
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: selectedTheme.colors.background,
    color: selectedTheme.colors.foreground,
  }

  // Add data-theme attribute to match the app's theme system
  const wrapperProps = {
    style,
    'data-theme': context.globals.theme,
    className: 'sb-show-main',
  }

  // Apply theme to document root for global styles
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--background', selectedTheme.colors.background)
    document.documentElement.style.setProperty('--foreground', selectedTheme.colors.foreground)
    document.documentElement.setAttribute('data-theme', context.globals.theme)

    // Force body to use theme colors
    document.body.style.backgroundColor = selectedTheme.colors.background
    document.body.style.color = selectedTheme.colors.foreground
  }

  // Wrap the story with both our CSS variables and the ThemeProvider
  return React.createElement(
    'div',
    wrapperProps,
    React.createElement(ThemeWrapper, null, React.createElement(Story)),
  )
}

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
