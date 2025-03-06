import React from 'react'
import Script from 'next/script'
import { defaultMode, defaultTheme, modeLocalStorageKey, themeLocalStorageKey } from '../shared'

export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    function getImplicitModePreference() {
      var mediaQuery = '(prefers-color-scheme: dark)'
      var mql = window.matchMedia(mediaQuery)
      var hasImplicitPreference = typeof mql.matches === 'boolean'

      if (hasImplicitPreference) {
        return mql.matches ? 'dark' : 'light'
      }

      return 'light' // Fallback to light if no preference
    }

    function themeIsValid(theme) {
      return theme === 'cool' || theme === 'brutal' || theme === 'neon'
    }

    function modeIsValid(mode) {
      return mode === 'light' || mode === 'dark'
    }

    // Initialize theme preset
    var themeToSet = '${defaultTheme}'
    var themePreference = window.localStorage.getItem('${themeLocalStorageKey}')

    if (themeIsValid(themePreference)) {
      themeToSet = themePreference
    }

    // Initialize mode
    var modeToSet = '${defaultMode}'
    var modePreference = window.localStorage.getItem('${modeLocalStorageKey}')

    if (modeIsValid(modePreference)) {
      modeToSet = modePreference
    } else {
      var implicitPreference = getImplicitModePreference()
      modeToSet = implicitPreference
    }

    // Set theme and mode attributes
    document.documentElement.setAttribute('data-theme', themeToSet)
    document.documentElement.setAttribute('data-theme-mode', modeToSet)

    // Add listener for system theme changes
    var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', function(e) {
      if (!window.localStorage.getItem('${modeLocalStorageKey}')) {
        var newMode = e.matches ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme-mode', newMode)
      }
    })
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
