import type { Preview } from '@storybook/react'
import type { ReactElement } from 'react'
import React from 'react'
import '../src/app/(frontend)/globals.css'
import { themes } from '../src/themes'

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
      },
    },
  },
  decorators: [
    (Story, context): ReactElement => {
      const selectedTheme = themes[context.globals.theme as keyof typeof themes]

      const style = {
        background: selectedTheme.colors.background,
        color: selectedTheme.colors.foreground,
        minHeight: '100vh',
        padding: '2rem',
      }

      return React.createElement('div', { style }, React.createElement(Story))
    },
  ],
}

export default preview
