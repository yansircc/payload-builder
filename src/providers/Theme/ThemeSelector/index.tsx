'use client'

import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ThemePreset } from '@/themes'
import { themes } from '@/themes'
import { useTheme } from '..'
import { modeLocalStorageKey, themeLocalStorageKey } from '../shared'
import type { Mode } from '../types'

export const ThemeSelector: React.FC = () => {
  const { setTheme, setMode, theme, mode } = useTheme()
  const [themeValue, setThemeValue] = useState<string>('')
  const [modeValue, setModeValue] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'theme' | 'mode'>('theme')

  const onThemeChange = (themeToSet: ThemePreset | 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setThemeValue('auto')
    } else {
      setTheme(themeToSet as ThemePreset)
      setThemeValue(themeToSet)
    }
  }

  const onModeChange = (modeToSet: Mode | 'auto') => {
    if (modeToSet === 'auto') {
      setMode(null)
      setModeValue('auto')
    } else {
      setMode(modeToSet as Mode)
      setModeValue(modeToSet)
    }
  }

  React.useEffect(() => {
    const themePreference = window.localStorage.getItem(themeLocalStorageKey)
    setThemeValue(themePreference ?? 'auto')

    const modePreference = window.localStorage.getItem(modeLocalStorageKey)
    setModeValue(modePreference ?? 'auto')
  }, [])

  React.useEffect(() => {
    if (theme) {
      setThemeValue(theme)
    }
    if (mode) {
      setModeValue(mode)
    }
  }, [theme, mode])

  return (
    <Tabs
      defaultValue="theme"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as 'theme' | 'mode')}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="theme">Theme</TabsTrigger>
        <TabsTrigger value="mode">Mode</TabsTrigger>
      </TabsList>
      <TabsContent value="theme">
        <Select onValueChange={onThemeChange} value={themeValue}>
          <SelectTrigger aria-label="Select a theme preset" className="w-full bg-transparent">
            <SelectValue placeholder="Theme Preset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto</SelectItem>
            {Object.entries(themes).map(([value, theme]) => (
              <SelectItem key={value} value={value}>
                {theme.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TabsContent>
      <TabsContent value="mode">
        <Select onValueChange={onModeChange} value={modeValue}>
          <SelectTrigger aria-label="Select a color mode" className="w-full bg-transparent">
            <SelectValue placeholder="Color Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto</SelectItem>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </TabsContent>
    </Tabs>
  )
}
