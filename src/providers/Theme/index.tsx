'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ThemePreset } from '@/themes'
import canUseDOM from '@/utilities/canUseDOM'
import { getSiteSettingsFromDomainClient } from '@/utilities/getSiteSettings.client'
import {
  defaultMode,
  defaultTheme,
  getImplicitModePreference,
  modeLocalStorageKey,
  themeLocalStorageKey,
} from './shared'
import type { Mode, ThemeContextType } from './types'
import { modeIsValid, themeIsValid } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
  setMode: () => null,
  mode: undefined,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemePreset | undefined>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme') as ThemePreset) : undefined,
  )
  const [mode, setModeState] = useState<Mode | undefined>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme-mode') as Mode) : undefined,
  )

  // Helper function to set attributes on both html and body
  const setDocumentAttributes = useCallback((attrName: string, value: string) => {
    document.documentElement.setAttribute(attrName, value)
    if (document.body) {
      document.body.setAttribute(attrName, value)
    }
  }, [])

  const setTheme = useCallback(
    (themeToSet: ThemePreset | null) => {
      if (themeToSet === null) {
        window.localStorage.removeItem(themeLocalStorageKey)
        // Fetch theme from site settings
        getSiteSettingsFromDomainClient().then((siteSettings) => {
          const siteTheme = siteSettings?.theme || defaultTheme
          setDocumentAttributes('data-theme', siteTheme)
          setThemeState(siteTheme)
        })
      } else {
        setThemeState(themeToSet)
        window.localStorage.setItem(themeLocalStorageKey, themeToSet)
        setDocumentAttributes('data-theme', themeToSet)
      }
    },
    [setDocumentAttributes],
  )

  const setMode = useCallback(
    (modeToSet: Mode | null) => {
      if (modeToSet === null) {
        window.localStorage.removeItem(modeLocalStorageKey)
        const implicitPreference = getImplicitModePreference()
        setDocumentAttributes('data-theme-mode', implicitPreference || '')
        if (implicitPreference) setModeState(implicitPreference)
      } else {
        setModeState(modeToSet)
        window.localStorage.setItem(modeLocalStorageKey, modeToSet)
        setDocumentAttributes('data-theme-mode', modeToSet)
      }
    },
    [setDocumentAttributes],
  )

  useEffect(() => {
    async function initializeTheme() {
      // Initialize theme
      let themeToSet: ThemePreset = defaultTheme
      const themePreference = window.localStorage.getItem(themeLocalStorageKey)

      // Try to get theme from site settings first
      try {
        const siteSettings = await getSiteSettingsFromDomainClient()
        if (siteSettings?.theme) {
          themeToSet = siteSettings.theme
        } else if (themeIsValid(themePreference)) {
          themeToSet = themePreference
        }
      } catch (error) {
        console.error('Error fetching site theme:', error)
        // Fallback to localStorage or default
        if (themeIsValid(themePreference)) {
          themeToSet = themePreference
        }
      }

      setDocumentAttributes('data-theme', themeToSet)
      setThemeState(themeToSet)

      // Initialize mode
      let modeToSet: Mode = defaultMode
      const modePreference = window.localStorage.getItem(modeLocalStorageKey)

      if (modeIsValid(modePreference)) {
        modeToSet = modePreference
      } else {
        const implicitPreference = getImplicitModePreference()
        if (implicitPreference) {
          modeToSet = implicitPreference
        }
      }

      setDocumentAttributes('data-theme-mode', modeToSet)
      setModeState(modeToSet)
    }

    if (canUseDOM) {
      initializeTheme()
    }
  }, [setDocumentAttributes])

  return (
    <ThemeContext.Provider value={{ setTheme, theme, setMode, mode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => useContext(ThemeContext)
