'use client'

import React from 'react'
import { ThemeProvider } from '../src/providers/Theme'

interface ThemeWrapperProps {
  children: React.ReactNode
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <div className="sb-show-main">
      <ThemeProvider>{children}</ThemeProvider>
    </div>
  )
}

export default ThemeWrapper
