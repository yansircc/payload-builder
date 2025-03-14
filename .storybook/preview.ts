import type { Preview } from '@storybook/react'
import type { ReactElement } from 'react'
import React from 'react'
import '../src/app/(frontend)/globals.css'
import { themeOptions } from '../src/providers/Theme/shared'
import { ThemePreset } from '../src/providers/Theme/types'
import './storybook.css' // Import Storybook-specific styles

// These CSS variables are referenced in the themes and globals.css
const fontVariables = `
  :root {
    --font-geist-sans: 'Geist Sans', system-ui, sans-serif;
    --font-geist-mono: 'Geist Mono', monospace;
    --font-inter: 'Inter', system-ui, sans-serif;
  }
`

// Create a style element to inject font variables
const injectFontVariables = () => {
  const style = document.createElement('style')
  style.innerHTML = fontVariables
  document.head.appendChild(style)
}

// Execute once when Storybook loads
if (typeof document !== 'undefined') {
  injectFontVariables()
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
    // Enable Next.js App Router support
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        segments: [],
      },
    },
    // Apply theme to the HTML element
    docs: {},
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'cool',
      toolbar: {
        icon: 'paintbrush',
        items: themeOptions.map((theme) => ({
          value: theme.value,
          title: theme.label,
        })),
      },
    },
    themeMode: {
      name: 'Theme Mode',
      description: 'Light or dark mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
      },
    },
  },
  decorators: [
    (Story, context): ReactElement => {
      const selectedTheme = context.globals.theme as ThemePreset
      const themeMode = context.globals.themeMode || 'light'

      // Apply theme attributes to HTML element
      React.useEffect(() => {
        if (document && document.documentElement) {
          document.documentElement.setAttribute('data-theme', selectedTheme)
          document.documentElement.setAttribute('data-theme-mode', themeMode)
          document.documentElement.classList.add('sb-show-main')
        }

        return () => {
          if (document && document.documentElement) {
            document.documentElement.removeAttribute(' ')
            document.documentElement.removeAttribute('data-theme-mode')
          }
        }
      }, [selectedTheme, themeMode])

      // Create a div with the appropriate styling
      const wrapperProps = {
        style: {
          minHeight: '100vh',
          padding: '2rem',
        },
      }

      return React.createElement('div', wrapperProps, React.createElement(Story))
    },
  ],
}

export default preview
