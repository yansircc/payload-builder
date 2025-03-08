import React from 'react'
import Script from 'next/script'
import { defaultMode, modeLocalStorageKey } from '../shared'

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

    function modeIsValid(mode) {
      return mode === 'light' || mode === 'dark'
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

    // Set mode attribute
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
