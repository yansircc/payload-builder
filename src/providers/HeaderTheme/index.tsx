'use client'

import React, { createContext, useCallback, useContext, useState } from 'react'
import type { Mode } from '@/providers/Theme/types'
import canUseDOM from '@/utilities/canUseDOM'

export interface ContextType {
  headerMode?: Mode | null
  setHeaderMode: (mode: Mode | null) => void
}

const initialContext: ContextType = {
  headerMode: undefined,
  setHeaderMode: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerMode, setModeState] = useState<Mode | undefined | null>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme-mode') as Mode) : undefined,
  )

  const setHeaderMode = useCallback((modeToSet: Mode | null) => {
    setModeState(modeToSet)
  }, [])

  return (
    <HeaderThemeContext.Provider value={{ headerMode, setHeaderMode }}>
      {children}
    </HeaderThemeContext.Provider>
  )
}

export const useHeaderTheme = (): ContextType => useContext(HeaderThemeContext)
