import React from 'react'
import Script from 'next/script'
import { themes } from '@/themes'
import { defaultTheme, themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    function getImplicitPreference() {
      var mediaQuery = '(prefers-color-scheme: dark)'
      var mql = window.matchMedia(mediaQuery)
      var hasImplicitPreference = typeof mql.matches === 'boolean'

      if (hasImplicitPreference) {
        return mql.matches ? 'dark' : 'light'
      }

      return 'light' // Fallback to light if no preference
    }

    function themeIsValid(theme) {
      return theme === 'light' || theme === 'dark'
    }

    var themeToSet = '${defaultTheme}'
    var preference = window.localStorage.getItem('${themeLocalStorageKey}')

    if (themeIsValid(preference)) {
      themeToSet = preference
    } else {
      var implicitPreference = getImplicitPreference()
      themeToSet = implicitPreference
    }

    // Set theme attribute
    document.documentElement.setAttribute('data-theme', themeToSet)

    // Set initial layout variables from default theme
    var theme = ${JSON.stringify(themes.cool)}
    var root = document.documentElement

    // Apply essential layout variables
    root.style.setProperty('--layout-containerWidth', theme.layout.containerWidth)
    root.style.setProperty('--layout-containerPadding', theme.layout.containerPadding)

    // Apply essential colors from the default theme
    var colors = themeToSet === 'dark' ? theme.dark : theme.colors
    Object.entries(colors).forEach(function(entry) {
      root.style.setProperty('--' + entry[0], entry[1])
    })

    // Apply essential typography
    root.style.setProperty('--font-sans', theme.typography.fontFamily)
    root.style.setProperty('--font-heading', theme.typography.headingFamily || theme.typography.fontFamily)
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
